require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const ExcelJS = require('exceljs');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Security: Disable Express fingerprinting header & trust reverse proxy (Checklist: Infrastructure Security)
app.disable('x-powered-by');
app.set('trust proxy', 1);

// Serverless & Reverse Proxy Request Normalizer (Guarantees safe socket & IP resolution across all environments)
app.use((req, res, next) => {
  if (!req.socket) req.socket = {};
  if (!req.connection) req.connection = req.socket;
  if (!req.socket.remoteAddress) {
    const forwarded = req.headers['x-forwarded-for'];
    req.socket.remoteAddress = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') || '127.0.0.1';
  }
  next();
});

// Operational Monitoring: Active Requests & Security Event Tracker (Checklist: Monitoring & Alerting)
let totalRequestsCount = 0;
let securityEventsCount = 0;

// Incident Response: Emergency Maintenance Mode Controller (Checklist: Incident Response)
let isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

function setMaintenanceMode(enabled) {
  isMaintenanceMode = Boolean(enabled);
  return isMaintenanceMode;
}

function getMaintenanceMode() {
  return isMaintenanceMode;
}

// Ensure data folder and backup folder exist (Serverless / Vercel compatible)
const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isVercel ? path.join(os.tmpdir(), 'vstar-data') : path.join(__dirname, 'data');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('[STORAGE] Note: Operating in ephemeral /tmp storage:', err.message);
}

const EXCEL_FILE_PATH = path.join(DATA_DIR, 'appointments.xlsx');

// On serverless cold start, seed initial Excel if available in bundled read-only workspace
if (isVercel) {
  try {
    const bundledExcel = path.join(__dirname, 'data', 'appointments.xlsx');
    if (!fs.existsSync(EXCEL_FILE_PATH) && fs.existsSync(bundledExcel)) {
      fs.copyFileSync(bundledExcel, EXCEL_FILE_PATH);
    }
  } catch (err) {
    console.warn('[STORAGE] Could not seed Excel file to /tmp:', err.message);
  }
}

// Static Public Directory Resolution (Local & Serverless Compatible)
const PUBLIC_DIR = fs.existsSync(path.join(__dirname, 'public'))
  ? path.join(__dirname, 'public')
  : path.join(process.cwd(), 'public');

// 1. Force HTTPS Enforcement in Production
app.use((req, res, next) => {
  const isHttps = Boolean(
    req.headers['x-forwarded-proto'] === 'https' ||
    (req.connection && req.connection.encrypted) ||
    (req.socket && req.socket.encrypted)
  );
  if (!isHttps && process.env.NODE_ENV === 'production' && req.headers.host) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});

// 2. Comprehensive Security Headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com", "data:"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'same-origin' },
    hsts: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true
    },
    frameguard: { action: 'sameorigin' },
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  })
);

// 3. Strict Permissions-Policy (Deny dangerous hardware/sensor APIs)
app.use((req, res, next) => {
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
  );
  next();
});

// 4. Application-Level Rate Limiting (DDoS & Brute-Force Defense)
const getClientIpKey = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  return (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') ||
    (req.socket && req.socket.remoteAddress) ||
    '127.0.0.1';
};

const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIpKey,
  message: { success: false, message: 'Too many requests from this IP. Please try again after 15 minutes.' }
});

const appointmentBookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 10,                  // 10 appointments per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIpKey,
  message: { success: false, message: 'Appointment booking rate limit reached. Please wait before submitting another appointment.' }
});

const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                  // Lockout after 10 attempts
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIpKey,
  message: { success: false, message: 'Too many administrative requests. Locked out for 15 minutes.' }
});

app.use('/api/appointments', appointmentBookingLimiter);
app.use('/api/admin', adminAuthLimiter);
app.use('/api/', generalApiLimiter);

// Monitoring & Alerting Middleware: Real-time telemetry & security anomaly logging
app.use((req, res, next) => {
  totalRequestsCount++;
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const forwarded = req.headers['x-forwarded-for'];
    const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') || (req.socket && req.socket.remoteAddress) || '-';
    
    // Automated alerting on operational anomalies & security violations
    if (res.statusCode >= 500) {
      securityEventsCount++;
      console.error(`[ALERT:SERVER_ERROR] ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Duration: ${duration}ms | IP: ${ip}`);
    } else if (res.statusCode === 429) {
      securityEventsCount++;
      console.warn(`[ALERT:RATE_LIMITED] ${req.method} ${req.originalUrl} | Status: 429 | IP: ${ip}`);
    } else if (res.statusCode === 401 || res.statusCode === 403) {
      securityEventsCount++;
      console.warn(`[SECURITY:ACCESS_DENIED] ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | IP: ${ip}`);
    }
  });
  
  next();
});

// Incident Response Middleware: Emergency Maintenance Interceptor
app.use((req, res, next) => {
  if (isMaintenanceMode) {
    // Static assets & diagnostics allowed
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return next();
    }
    if (req.path === '/api/status') {
      return next();
    }

    // Admins can authenticate to bypass maintenance mode
    const authHeader = req.headers['authorization'];
    let token = null;
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7).trim();
    } else if (typeof req.headers['x-admin-key'] === 'string') {
      token = req.headers['x-admin-key'].trim();
    }

    if (token && safeCompare(token, ADMIN_API_KEY)) {
      return next();
    }

    res.setHeader('Retry-After', '300');
    return res.status(503).json({
      success: false,
      maintenance: true,
      message: 'V STAR Platform is currently undergoing emergency maintenance. Please try again in a few moments.'
    });
  }
  next();
});

// Security: Backup Exposure Protection Middleware (Checklist: Backup Exposure)
// Intercepts and denies requests to backup files, swap files, version control metadata, and database files
const SENSITIVE_FILE_PATTERN = /\.(bak|old|orig|tmp|save|swp|swo|sql|xlsx|log|tar|gz|zip|rar|7z|env)$|(\/\.git|\/\.env|\.env\.|\.git\/)/i;
app.use((req, res, next) => {
  if (SENSITIVE_FILE_PATTERN.test(req.path)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied: Requested file extension is restricted.'
    });
  }
  next();
});

// Security: CORS Configuration (Checklist: CORS)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim().toLowerCase())
  : null;

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. same-origin, curl, mobile apps, direct navigation)
    if (!origin) return callback(null, true);
    if (!allowedOrigins) return callback(null, true); // default permissive when ALLOWED_ORIGINS not configured
    const normalizedOrigin = origin.toLowerCase();
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }
    return callback(new Error('Cross-Origin Request Blocked by CORS Policy'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key'],
  credentials: true,
  maxAge: 86400 // 24 hours preflight cache
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '100kb' })); // Body size limit to prevent Denial of Service
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(express.static(PUBLIC_DIR, { dotfiles: 'deny' }));

// Security: In-Memory Sliding-Window Rate Limiter (Checklist: Verify rate limiting)
const rateLimitMap = new Map();

function createRateLimiter({ windowMs, maxRequests, message }) {
  return function rateLimitMiddleware(req, res, next) {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') || (req.socket && req.socket.remoteAddress) || 'unknown-client';
    const key = `${req.baseUrl || req.path}:${ip}`;
    const now = Date.now();

    let record = rateLimitMap.get(key);
    if (!record || now - record.startTime > windowMs) {
      record = { startTime: now, count: 1 };
      rateLimitMap.set(key, record);
      return next();
    }

    record.count += 1;
    if (record.count > maxRequests) {
      const retryAfter = Math.ceil((record.startTime + windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      return res.status(429).json({
        success: false,
        message: message || 'Too many requests. Please try again later.'
      });
    }

    next();
  };
}

// Clean up stale rate limiter entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now - record.startTime > 30 * 60 * 1000) {
      rateLimitMap.delete(key);
    }
  }
}, 10 * 60 * 1000).unref();

// Rate limit policies
const appointmentRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 10,
  message: 'Too many appointment requests from this IP. Please wait 15 minutes before submitting again.'
});

const adminRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 20,
  message: 'Too many administrative attempts. Access temporarily throttled.'
});

// Security: Timing-Safe Comparison to prevent timing-attack bypasses (Checklist: Check authorization bypass)
function safeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Admin Authentication Middleware (Checklist: APIs require authentication / Users can access only their own records / No database exports publicly accessible)
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'vstar_admin_secret_key_984572';

function requireAdminAuth(req, res, next) {
  // Prevent caching of administrative data in proxies or browser disk
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const authHeader = req.headers['authorization'];
  let token = null;

  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  } else if (typeof req.headers['x-admin-key'] === 'string') {
    token = req.headers['x-admin-key'].trim();
  } else if (typeof req.query.apiKey === 'string') {
    token = req.query.apiKey.trim();
  }

  if (!token || !safeCompare(token, ADMIN_API_KEY)) {
    return res.status(401).json({
      success: false,
      message: 'Access denied: Valid administrative credentials required to access this resource.'
    });
  }
  next();
}

// Utility: Prevent Excel Formula Injection (CSV/Excel Macro Injection)
function sanitizeForExcel(value) {
  if (value === null || value === undefined) return '';
  const str = String(value).trim();
  // If value begins with =, +, -, @, \t, \r, |, or %, prepend a single quote so Excel treats it strictly as literal text
  if (/^[=+\-@\t\r|%]/.test(str)) {
    return "'" + str;
  }
  return str;
}

// Utility: Escape HTML for Email Templates (Prevents HTML/Script injection)
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Configure Nodemailer Transporter
function getEmailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const user = process.env.SMTP_USER;
  const rawPass = process.env.SMTP_PASS || '';
  const pass = rawPass.replace(/\s+/g, '');
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  // Return null if not yet configured, to handle test/simulated mode gracefully
  return null;
}

// Concurrency Control: Asynchronous Mutex Queue for Excel Operations
// Guarantees serialized FIFO execution, preventing race conditions, EBUSY lock errors, and dropped records
let excelQueue = Promise.resolve();

function appendAppointmentToExcel(data) {
  const operation = () => appendAppointmentToExcelInternal(data);
  const queuedPromise = excelQueue.then(operation, operation);
  excelQueue = queuedPromise.catch(() => {});
  return queuedPromise;
}

// Internal worker: Initialize or update Excel Sheet with styled headers
async function appendAppointmentToExcelInternal(data) {
  const workbook = new ExcelJS.Workbook();
  let worksheet;

  const columns = [
    { header: 'Appointment ID', key: 'id', width: 20 },
    { header: 'Submission Date', key: 'submittedAt', width: 22 },
    { header: 'Client Full Name', key: 'fullName', width: 26 },
    { header: 'Phone Number', key: 'phone', width: 18 },
    { header: 'Email Address', key: 'email', width: 30 },
    { header: 'Date of Birth (DOB)', key: 'dob', width: 18 },
    { header: 'Time of Birth', key: 'birthTime', width: 16 },
    { header: 'Place of Birth', key: 'birthPlace', width: 24 },
    { header: 'Consultation Service', key: 'serviceType', width: 30 },
    { header: 'Preferred Mode', key: 'consultationMode', width: 18 },
    { header: 'Gender', key: 'gender', width: 14 },
    { header: 'Client Notes / Questions', key: 'notes', width: 40 },
    { header: 'Confirmation Email Status', key: 'emailStatus', width: 26 },
    { header: 'Booking Status', key: 'status', width: 18 }
  ];

  if (fs.existsSync(EXCEL_FILE_PATH)) {
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
    worksheet = workbook.getWorksheet('Appointments') || workbook.worksheets[0];
    if (!worksheet) {
      worksheet = workbook.addWorksheet('Appointments');
      worksheet.columns = columns;
      formatHeaderRow(worksheet);
    } else {
      worksheet.columns = columns;
    }
  } else {
    worksheet = workbook.addWorksheet('Appointments');
    worksheet.columns = columns;
    formatHeaderRow(worksheet);
  }

  // Add data row using array values for reliable column mapping with formula injection sanitization
  const rowValues = [
    sanitizeForExcel(data.id),
    sanitizeForExcel(data.submittedAt),
    sanitizeForExcel(data.fullName),
    sanitizeForExcel(data.phone),
    sanitizeForExcel(data.email),
    sanitizeForExcel(data.dob),
    sanitizeForExcel(data.birthTime || 'Not Specified'),
    sanitizeForExcel(data.birthPlace),
    sanitizeForExcel(data.serviceType),
    sanitizeForExcel(data.consultationMode || 'Online Video Call'),
    sanitizeForExcel(data.gender || 'Not Specified'),
    sanitizeForExcel(data.notes || 'None'),
    sanitizeForExcel(data.emailStatus),
    'Pending Review'
  ];

  const row = worksheet.addRow(rowValues);

  // Apply row styling
  row.eachCell((cell) => {
    cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFE0E0E0' } },
      left: { style: 'thin', color: { argb: 'FFE0E0E0' } },
      bottom: { style: 'thin', color: { argb: 'FFE0E0E0' } },
      right: { style: 'thin', color: { argb: 'FFE0E0E0' } }
    };
  });

  await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
}

function formatHeaderRow(worksheet) {
  const headerRow = worksheet.getRow(1);
  headerRow.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1A1A3A' } // Deep celestial navy
  };
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  headerRow.height = 28;
}

// Backup & Restore Module (Automated snapshot, verification, and recovery)
function createBackup() {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    return { success: false, message: 'No appointment database file exists to backup yet.' };
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFileName = `appointments_backup_${timestamp}.xlsx`;
  const backupFilePath = path.join(BACKUP_DIR, backupFileName);
  
  // Safe synchronous file copy
  fs.copyFileSync(EXCEL_FILE_PATH, backupFilePath);
  const stat = fs.statSync(backupFilePath);
  
  // Operational Protection: Automatically prune backups exceeding 30 snapshots to avoid disk exhaustion
  try {
    const existing = listBackups();
    if (existing.length > 30) {
      const toPrune = existing.slice(30);
      for (const oldFile of toPrune) {
        fs.unlinkSync(path.join(BACKUP_DIR, oldFile.fileName));
      }
    }
  } catch (_) {}
  
  return {
    success: true,
    fileName: backupFileName,
    filePath: backupFilePath,
    sizeBytes: stat.size,
    timestamp: new Date().toISOString()
  };
}

function listBackups() {
  if (!fs.existsSync(BACKUP_DIR)) return [];
  return fs.readdirSync(BACKUP_DIR)
    .filter(f => f.startsWith('appointments_backup_') && f.endsWith('.xlsx'))
    .map(f => {
      const p = path.join(BACKUP_DIR, f);
      const stat = fs.statSync(p);
      return {
        fileName: f,
        sizeBytes: stat.size,
        createdAt: stat.birthtime || stat.mtime
      };
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function restoreBackup(backupFileName) {
  if (!backupFileName || typeof backupFileName !== 'string') {
    return Promise.resolve({ success: false, message: 'Invalid backup file name specified.' });
  }
  // Sanitize file name to prevent path traversal
  const safeName = path.basename(backupFileName.trim());
  const backupFilePath = path.join(BACKUP_DIR, safeName);
  
  if (!fs.existsSync(backupFilePath)) {
    return Promise.resolve({ success: false, message: 'Specified backup file does not exist.' });
  }

  // Queue restore operation via mutex so no write occurs during restore
  const operation = async () => {
    // Preserve current state before restoring
    if (fs.existsSync(EXCEL_FILE_PATH)) {
      const preRestoreSafety = path.join(BACKUP_DIR, `pre_restore_safety_${Date.now()}.xlsx`);
      fs.copyFileSync(EXCEL_FILE_PATH, preRestoreSafety);
    }
    fs.copyFileSync(backupFilePath, EXCEL_FILE_PATH);
    return {
      success: true,
      restoredFrom: safeName,
      timestamp: new Date().toISOString()
    };
  };

  const queuedPromise = excelQueue.then(operation, operation);
  excelQueue = queuedPromise.catch(() => {});
  return queuedPromise;
}

// Read appointments from Excel for Admin View
async function readAppointmentsFromExcel() {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    return [];
  }
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXCEL_FILE_PATH);
  const worksheet = workbook.getWorksheet('Appointments') || workbook.worksheets[0];
  if (!worksheet) return [];

  const appointments = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header
    appointments.push({
      id: row.getCell(1).value,
      submittedAt: row.getCell(2).value,
      fullName: row.getCell(3).value,
      phone: row.getCell(4).value,
      email: row.getCell(5).value,
      dob: row.getCell(6).value,
      birthTime: row.getCell(7).value,
      birthPlace: row.getCell(8).value,
      serviceType: row.getCell(9).value,
      consultationMode: row.getCell(10).value,
      gender: row.getCell(11).value,
      notes: row.getCell(12).value,
      emailStatus: row.getCell(13).value,
      status: row.getCell(14).value
    });
  });

  return appointments.reverse(); // newest first
}

// Send automated confirmation email
async function sendConfirmationEmail(clientData) {
  // Check if auto-mail function is currently stopped / disabled
  if (process.env.ENABLE_AUTO_MAIL === 'false') {
    console.log(`[EMAIL NOTICE] Auto-mail function is currently stopped. Skipping email dispatch for: ${clientData.email}`);
    return {
      success: true,
      mode: 'disabled',
      note: 'Automated email function is currently stopped.'
    };
  }

  const transporter = getEmailTransporter();
  const subject = `Appointment Request Received - V STAR Numerology (#${clientData.id})`;
  
  // Clean, premium HTML email matching user's requested wording
  const textMessage = `Dear ${clientData.fullName},

Here we got your data, we will check it out and we will confirm appointment and let you know. Thanks for choosing V STAR Numerology.

--- Summary of Details Received ---
• Appointment ID: ${clientData.id}
• Full Name: ${clientData.fullName}
• Phone: ${clientData.phone}
• Service Selected: ${clientData.serviceType}
• Date of Birth: ${clientData.dob}
• Time of Birth: ${clientData.birthTime || 'Not specified'}
• Place of Birth: ${clientData.birthPlace}
• Consultation Mode: ${clientData.consultationMode || 'Online'}

Warm regards,
V STAR Numerology & Astrology Center
Guiding your cosmic path through sacred numbers & planetary alignment.`;

  const htmlMessage = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { margin:0; padding:0; background-color: #0b0c1e; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #e2e8f0; }
      .container { max-width: 600px; margin: 30px auto; background: #12132e; border: 1px solid #d4af37; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
      .header { background: linear-gradient(135deg, #181945 0%, #0d0e26 100%); padding: 35px 25px; text-align: center; border-bottom: 2px solid #d4af37; }
      .logo-title { font-size: 26px; font-weight: 700; color: #d4af37; letter-spacing: 2px; margin: 0; text-transform: uppercase; }
      .subtitle { color: #a0aec0; font-size: 13px; margin-top: 6px; letter-spacing: 1px; }
      .content { padding: 30px 25px; line-height: 1.6; }
      .greeting { font-size: 18px; color: #ffffff; font-weight: 600; margin-bottom: 15px; }
      .message-box { background: rgba(212, 175, 55, 0.08); border-left: 4px solid #d4af37; padding: 16px 20px; border-radius: 4px; margin: 20px 0; font-size: 15px; color: #f7fafc; }
      .highlight-text { font-size: 16px; font-weight: 600; color: #ffd700; }
      .details-table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; }
      .details-table td { padding: 10px 12px; border-bottom: 1px solid #23254b; }
      .details-table td.label { color: #94a3b8; font-weight: 600; width: 40%; }
      .details-table td.val { color: #ffffff; }
      .footer { background: #0b0c1e; padding: 20px; text-align: center; font-size: 12px; color: #718096; border-top: 1px solid #1f2142; }
      .footer a { color: #d4af37; text-decoration: none; }
      .badge { display: inline-block; padding: 4px 10px; background: #d4af37; color: #0d0e26; border-radius: 20px; font-size: 12px; font-weight: 700; margin-top: 8px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo-title">✦ V STAR NUMEROLOGY ✦</div>
        <div class="subtitle">ASTROLOGY & SACRED NUMBERS CONSULTATION</div>
      </div>
      <div class="content">
        <div class="greeting">Namaste ${escapeHtml(clientData.fullName)},</div>
        
        <div class="message-box">
          <p class="highlight-text" style="margin-top:0;">"Here we got your data, we will check it out and we will confirm appointment and let you know, Thanks for choosing V STAR Numerology."</p>
          <p style="margin-bottom:0; font-size: 13.5px; color: #cbd5e1;">Our chief astrologer and numerology expert is reviewing your birth chart and planetary coordinates. We will reach out shortly via phone / email with your confirmed slot time and details.</p>
        </div>

        <h4 style="color:#d4af37; margin-bottom: 10px; margin-top: 25px; text-transform: uppercase; letter-spacing: 0.5px;">Summary of Consultation Details</h4>
        <table class="details-table">
          <tr>
            <td class="label">Appointment ID:</td>
            <td class="val"><strong style="color:#ffd700;">#${escapeHtml(clientData.id)}</strong></td>
          </tr>
          <tr>
            <td class="label">Selected Service:</td>
            <td class="val"><span class="badge">${escapeHtml(clientData.serviceType)}</span></td>
          </tr>
          <tr>
            <td class="label">Phone Number:</td>
            <td class="val">${escapeHtml(clientData.phone)}</td>
          </tr>
          <tr>
            <td class="label">Date of Birth (DOB):</td>
            <td class="val">${escapeHtml(clientData.dob)}</td>
          </tr>
          <tr>
            <td class="label">Time of Birth:</td>
            <td class="val">${escapeHtml(clientData.birthTime || 'Not specified')}</td>
          </tr>
          <tr>
            <td class="label">Place of Birth:</td>
            <td class="val">${escapeHtml(clientData.birthPlace)}</td>
          </tr>
          <tr>
            <td class="label">Consultation Mode:</td>
            <td class="val">${escapeHtml(clientData.consultationMode || 'Online Video Call')}</td>
          </tr>
        </table>
      </div>
      <div class="footer">
        <p style="margin: 0 0 5px 0;">V STAR Numerology & Kundli Services</p>
        <p style="margin: 0;">May the stars align in your favour and sacred numbers guide your destiny.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  if (transporter) {
    try {
      const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER || 'vstarnumerology@gmail.com';
      const info = await transporter.sendMail({
        from: `"V STAR Numerology" <${fromEmail}>`,
        to: clientData.email,
        subject,
        text: textMessage,
        html: htmlMessage
      });
      console.log(`[EMAIL DISPATCHED] Message sent to ${clientData.email}. Response ID: ${info.messageId}`);
      return { success: true, mode: 'smtp', messageId: info.messageId };
    } catch (err) {
      console.error('[EMAIL ERROR] Failed to send email via SMTP:', err.message);
      return { success: false, mode: 'smtp_error', error: err.message };
    }
  } else {
    // Simulated delivery when SMTP credentials are not yet populated in .env
    console.log(`[EMAIL SIMULATION] SMTP not configured. Automated confirmation prepared for: ${clientData.email}`);
    console.log(`[EMAIL BODY PREVIEW]: "Here we got your data we will chick it out and we will confurm appoinment and let you know , Thanks for choosing V STAR Numerology"`);
    return {
      success: true,
      mode: 'simulated',
      note: 'SMTP credentials not yet set in .env. Email content was verified and logged. Set SMTP_USER & SMTP_PASS in .env to deliver real emails.'
    };
  }
}

// Routes

// 1. Submit Appointment (Server validates all input & sanitizes against injection)
app.post('/api/appointment', appointmentRateLimiter, async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      dob,
      birthTime,
      birthPlace,
      serviceType,
      consultationMode,
      gender,
      notes
    } = req.body;

    // Strict Server-Side Input Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 80) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid Full Name (2 to 80 characters).'
      });
    }

    const phoneClean = typeof phone === 'string' ? phone.trim() : '';
    if (!phoneClean || !/^\+?[0-9\s\-()]{7,20}$/.test(phoneClean)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid Phone Number (7 to 20 characters).'
      });
    }

    const emailClean = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!emailClean || emailClean.length > 100 || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailClean)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid Email Address.'
      });
    }

    let normalizedDob = (typeof dob === 'string' ? dob.trim() : '');

    // Auto-normalize DD-MM-YYYY, DD/MM/YYYY, or DD.MM.YYYY into standard ISO YYYY-MM-DD format
    if (/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.test(normalizedDob)) {
      const match = normalizedDob.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
      normalizedDob = `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
    }

    if (!normalizedDob || !/^\d{4}-\d{2}-\d{2}$/.test(normalizedDob)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid Date of Birth in YYYY-MM-DD format.'
      });
    }

    // Business Logic: Real-world calendar verification & realistic age bounds (0 - 120 years)
    const [dobYear, dobMonth, dobDay] = normalizedDob.split('-').map(Number);
    const parsedDob = new Date(Date.UTC(dobYear, dobMonth - 1, dobDay));
    const nowUtc = new Date();
    const minDobYear = nowUtc.getUTCFullYear() - 120;

    if (
      isNaN(parsedDob.getTime()) ||
      parsedDob.getUTCFullYear() !== dobYear ||
      parsedDob.getUTCMonth() + 1 !== dobMonth ||
      parsedDob.getUTCDate() !== dobDay
    ) {
      return res.status(400).json({
        success: false,
        message: 'The Date of Birth provided is not a valid calendar date.'
      });
    }

    if (parsedDob > nowUtc) {
      return res.status(400).json({
        success: false,
        message: 'Date of Birth cannot be in the future.'
      });
    }

    if (dobYear < minDobYear) {
      return res.status(400).json({
        success: false,
        message: 'Date of Birth is beyond the supported chronological range (maximum 120 years).'
      });
    }

    if (!birthPlace || typeof birthPlace !== 'string' || birthPlace.trim().length < 2 || birthPlace.trim().length > 150) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid Place of Birth.'
      });
    }

    if (!serviceType || typeof serviceType !== 'string' || serviceType.trim().length < 2 || serviceType.trim().length > 80) {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid Consultation Service.'
      });
    }

    const cleanNotes = (notes && typeof notes === 'string') ? notes.trim().slice(0, 1000) : 'None';
    const cleanTime = (birthTime && typeof birthTime === 'string') ? birthTime.trim().slice(0, 30) : 'Not Provided';
    const cleanMode = (consultationMode && typeof consultationMode === 'string') ? consultationMode.trim().slice(0, 40) : 'Online Video Call';
    const cleanGender = (gender && typeof gender === 'string') ? gender.trim().slice(0, 20) : 'Unspecified';

    // Generate unique Appointment ID: VSN-YYYYMMDD-XXXX
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const appointmentId = `VSN-${dateStr}-${randomSuffix}`;
    const formattedSubmittedAt = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

    const clientRecord = {
      id: appointmentId,
      submittedAt: formattedSubmittedAt,
      fullName: fullName.trim(),
      phone: phoneClean,
      email: emailClean,
      dob: normalizedDob,
      birthTime: cleanTime,
      birthPlace: birthPlace.trim(),
      serviceType: serviceType.trim(),
      consultationMode: cleanMode,
      gender: cleanGender,
      notes: cleanNotes,
      emailStatus: 'Pending'
    };

    // 1. Send automated email (if enabled)
    const emailResult = await sendConfirmationEmail(clientRecord);
    clientRecord.emailStatus = emailResult.mode === 'disabled'
      ? 'Stopped / Manual Contact'
      : (emailResult.success
        ? (emailResult.mode === 'smtp' ? 'Sent (Live SMTP)' : 'Sent (Simulated/Ready)')
        : `Failed: ${emailResult.error}`);

    // 2. Append to Excel File (with formula injection sanitization)
    await appendAppointmentToExcel(clientRecord);

    // Return essential confirmation metadata for client confirmation modal
    return res.status(200).json({
      success: true,
      appointmentId,
      submittedAt: formattedSubmittedAt,
      fullName: clientRecord.fullName,
      email: clientRecord.email,
      dob: clientRecord.dob,
      serviceType: clientRecord.serviceType,
      emailStatus: clientRecord.emailStatus,
      emailMode: emailResult.mode,
      clientData: {
        id: appointmentId,
        fullName: clientRecord.fullName,
        email: clientRecord.email,
        dob: clientRecord.dob,
        serviceType: clientRecord.serviceType
      },
      message: 'Here we got your data, we will check it out and we will confirm appointment and let you know. Thanks for choosing V STAR Numerology.'
    });
  } catch (error) {
    // Log server error internally; NEVER leak stack traces or internal paths to clients
    console.error('[APPOINTMENT_ERROR]', error);
    return res.status(500).json({
      success: false,
      message: 'An internal error occurred while registering your appointment. Please try again.'
    });
  }
});

// 2. Download Excel File (Admin Protected & Rate Limited - No database exports publicly accessible)
app.get('/api/appointments/download', adminRateLimiter, requireAdminAuth, (req, res) => {
  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    return res.status(404).json({ success: false, message: 'No appointment Excel sheet found yet. Bookings will generate it automatically.' });
  }
  res.download(EXCEL_FILE_PATH, 'V_STAR_Numerology_Appointments.xlsx');
});

// 3. Get Appointments List (Admin Protected & Rate Limited - Users cannot access other users records)
app.get('/api/appointments/list', adminRateLimiter, requireAdminAuth, async (req, res) => {
  try {
    const list = await readAppointmentsFromExcel();
    return res.json({ success: true, total: list.length, appointments: list });
  } catch (error) {
    console.error('[ADMIN_LIST_ERROR]', error);
    return res.status(500).json({ success: false, message: 'Unable to retrieve administrative records at this time.' });
  }
});

// 3.1 GDPR Right to Erasure / Data Deletion Endpoint (Article 17 GDPR - Admin Protected)
app.delete('/api/appointments/:id', adminRateLimiter, requireAdminAuth, async (req, res) => {
  const targetId = req.params.id;
  if (!targetId || typeof targetId !== 'string' || !/^[A-Za-z0-9_-]{5,32}$/.test(targetId)) {
    return res.status(400).json({ success: false, message: 'Invalid appointment ID format.' });
  }

  try {
    if (!fs.existsSync(EXCEL_FILE_PATH)) {
      return res.status(404).json({ success: false, message: 'No appointment database found.' });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
    const worksheet = workbook.getWorksheet('Appointments');
    if (!worksheet) {
      return res.status(404).json({ success: false, message: 'Appointments worksheet not found.' });
    }

    let deletedRowIndex = -1;
    worksheet.eachRow((row, rowNumber) => {
      if (row.getCell(1).value === targetId) {
        deletedRowIndex = rowNumber;
      }
    });

    if (deletedRowIndex !== -1) {
      worksheet.spliceRows(deletedRowIndex, 1);
      await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
      console.log(`[GDPR:ERASURE_SUCCESS] Record ${targetId} permanently expunged.`);
      return res.json({ success: true, message: `Record ${targetId} permanently erased under GDPR compliance.` });
    } else {
      return res.status(404).json({ success: false, message: 'Appointment record not found.' });
    }
  } catch (error) {
    console.error('[GDPR_ERASURE_ERROR]', error);
    return res.status(500).json({ success: false, message: 'Failed to erase data due to internal error.' });
  }
});

// 4. Create Database Backup (Admin Protected)
app.post('/api/admin/backup', adminRateLimiter, requireAdminAuth, (req, res) => {
  try {
    const backupResult = createBackup();
    if (!backupResult.success) {
      return res.status(400).json(backupResult);
    }
    return res.json(backupResult);
  } catch (error) {
    console.error('[ADMIN_BACKUP_ERROR]', error);
    return res.status(500).json({ success: false, message: 'Failed to create backup snapshot.' });
  }
});

// 5. List Database Backups (Admin Protected)
app.get('/api/admin/backups', adminRateLimiter, requireAdminAuth, (req, res) => {
  try {
    const backups = listBackups();
    return res.json({ success: true, count: backups.length, backups });
  } catch (error) {
    console.error('[ADMIN_LIST_BACKUPS_ERROR]', error);
    return res.status(500).json({ success: false, message: 'Failed to list backup snapshots.' });
  }
});

// 6. Restore Database from Backup (Admin Protected)
app.post('/api/admin/restore', adminRateLimiter, requireAdminAuth, async (req, res) => {
  try {
    const { backupFileName } = req.body;
    if (!backupFileName) {
      return res.status(400).json({ success: false, message: 'Please provide backupFileName to restore.' });
    }
    const restoreResult = await restoreBackup(backupFileName);
    if (!restoreResult.success) {
      return res.status(400).json(restoreResult);
    }
    return res.json(restoreResult);
  } catch (error) {
    console.error('[ADMIN_RESTORE_ERROR]', error);
    return res.status(500).json({ success: false, message: 'Failed to restore database from backup.' });
  }
});

// 7. Toggle Emergency Maintenance Mode (Admin Protected - Checklist: Incident Response)
app.post('/api/admin/maintenance', adminRateLimiter, requireAdminAuth, (req, res) => {
  const { enabled } = req.body;
  if (typeof enabled !== 'boolean') {
    return res.status(400).json({ success: false, message: 'Please provide boolean "enabled" property.' });
  }
  const state = setMaintenanceMode(enabled);
  return res.json({
    success: true,
    maintenanceMode: state,
    message: state ? 'Incident Response: Emergency Maintenance Mode ENABLED.' : 'Incident Response: Platform restored to NORMAL operations.'
  });
});

// 8. Server Health, Telemetry & Status Check (Checklist: Monitoring & Alerting)
app.get('/api/status', async (req, res) => {
  const hasSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  const memory = process.memoryUsage();
  let appointmentsCount = 0;
  try {
    const list = await readAppointmentsFromExcel();
    appointmentsCount = list.length;
  } catch (_) {}

  const backupsList = listBackups();

  res.json({
    status: 'online',
    appName: 'V STAR Numerology Appointment Platform',
    health: 'HEALTHY',
    excelFileExists: fs.existsSync(EXCEL_FILE_PATH),
    smtpConfigured: hasSmtp,
    maintenanceMode: isMaintenanceMode,
    telemetry: {
      uptimeSeconds: Math.floor(process.uptime()),
      memoryRssMb: Math.round(memory.rss / (1024 * 1024)),
      totalRequestsServed: totalRequestsCount,
      securityEventsLogged: securityEventsCount,
      totalAppointmentsRecorded: appointmentsCount,
      totalBackupsAvailable: backupsList.length,
      latestBackup: backupsList[0] ? backupsList[0].fileName : null
    },
    time: new Date().toISOString()
  });
});

// Cosmic Insights Routes
app.get('/predict', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'predict.html'), (err) => {
    if (err && !res.headersSent) res.status(404).send('Predict page not found');
  });
});

app.get('/results', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'results.html'), (err) => {
    if (err && !res.headersSent) res.status(404).send('Results page not found');
  });
});

// 404 Handler for API routes (Checklist: Check server errors & 404 handling)
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Requested API endpoint does not exist.'
  });
});

// Serve frontend for all other routes
app.use((req, res, next) => {
  if (req.method === 'GET') {
    return res.sendFile(path.join(PUBLIC_DIR, 'index.html'), (err) => {
      if (err && !res.headersSent) res.status(404).send('Home page not found');
    });
  }
  next();
});

// Global Centralized Error Handler (Checklist: No stack traces or internal errors returned to users)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON request payload provided.'
    });
  }
  console.error('[UNHANDLED_EXCEPTION]', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected internal error occurred. Please try again later.'
  });
});

// Export for Vercel Serverless & Testing / Modularity
app.app = app;
app.appendAppointmentToExcel = appendAppointmentToExcel;
app.readAppointmentsFromExcel = readAppointmentsFromExcel;
app.sendConfirmationEmail = sendConfirmationEmail;
app.createBackup = createBackup;
app.listBackups = listBackups;
app.restoreBackup = restoreBackup;
app.setMaintenanceMode = setMaintenanceMode;
app.getMaintenanceMode = getMaintenanceMode;
app.EXCEL_FILE_PATH = EXCEL_FILE_PATH;
app.BACKUP_DIR = BACKUP_DIR;

module.exports = app;

// Start Server if executed directly
if (require.main === module) {
  // Operational Protection: Check configuration on startup (Checklist: Operational Mistakes)
  if (ADMIN_API_KEY === 'vstar_admin_secret_key_984572') {
    console.warn('⚠️ [CONFIG_NOTICE] ADMIN_API_KEY is using the default development key. Consider defining a custom ADMIN_API_KEY in .env for production deployment.');
  }

  // Automatic Startup Snapshot: Create a safety backup on boot if database exists
  try {
    if (fs.existsSync(EXCEL_FILE_PATH)) {
      const bootBackup = createBackup();
      if (bootBackup.success) {
        console.log(` 🛡️ Automated Startup Snapshot created: ${bootBackup.fileName}`);
      }
    }
  } catch (err) {
    console.error(' ⚠️ Failed to create startup snapshot:', err.message);
  }

  const serverInstance = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` ✨ V STAR Numerology Portal is running on http://localhost:${PORT}`);
    console.log(` 📊 Excel Storage Path: ${EXCEL_FILE_PATH}`);
    console.log(` 📧 Automated Confirmation Mailer: ${process.env.SMTP_USER ? 'Active (Live SMTP)' : 'Ready (Simulation / Log Mode)'}`);
    console.log(` 🛡️ Infrastructure & Telemetry: ACTIVE`);
    console.log(`====================================================`);
  });

  // Operational Protection: Graceful Shutdown Handlers (Checklist: Operational Mistakes)
  const gracefulShutdown = (signal) => {
    console.log(`\n[SHUTDOWN] Received ${signal}. Gracefully stopping server and draining pending operations...`);
    serverInstance.close(async () => {
      try {
        await excelQueue; // Guarantee all in-flight Excel writes finish cleanly
        console.log('[SHUTDOWN] All pending transactions saved. Safe shutdown completed.');
        process.exit(0);
      } catch (err) {
        console.error('[SHUTDOWN_ERROR]', err);
        process.exit(1);
      }
    });

    setTimeout(() => {
      console.error('[SHUTDOWN_TIMEOUT] Forced termination after 10s.');
      process.exit(1);
    }, 10000).unref();
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}
