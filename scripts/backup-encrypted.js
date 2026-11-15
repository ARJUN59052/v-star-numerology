// scripts/backup-encrypted.js - Automated AES-256 Encrypted Database Snapshots with Retention Management
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '../data');
const SOURCE_FILE = path.join(DATA_DIR, 'appointments.xlsx');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const MAX_BACKUPS_TO_KEEP = 30; // 30-day retention policy

function runEncryptedBackup() {
  if (!fs.existsSync(SOURCE_FILE)) {
    console.log('[BACKUP_NOTICE] No appointment database found to snapshot.');
    return { success: false, reason: 'Source file does not exist' };
  }

  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFileName = `appointments_encrypted_${timestamp}.xlsx.enc`;
  const backupFilePath = path.join(BACKUP_DIR, backupFileName);

  const fileBuffer = fs.readFileSync(SOURCE_FILE);

  // Encrypt with AES-256-CBC using salted key derivation
  const passphrase = process.env.BACKUP_PASSPHRASE || 'VStarCosmicSecurity2026MasterKey!';
  const cipherKey = crypto.scryptSync(passphrase, 'vstar_cosmic_salt', 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', cipherKey, iv);

  const encrypted = Buffer.concat([iv, cipher.update(fileBuffer), cipher.final()]);
  fs.writeFileSync(backupFilePath, encrypted);

  console.log(`🔒 [ENCRYPTED_BACKUP] Created secure snapshot: ${backupFileName} (${encrypted.length} bytes)`);

  // Enforce retention policy: Purge snapshots older than MAX_BACKUPS_TO_KEEP
  try {
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('appointments_encrypted_') && f.endsWith('.xlsx.enc'))
      .map(f => ({ name: f, time: fs.statSync(path.join(BACKUP_DIR, f)).mtime.getTime() }))
      .sort((a, b) => b.time - a.time);

    if (files.length > MAX_BACKUPS_TO_KEEP) {
      const toDelete = files.slice(MAX_BACKUPS_TO_KEEP);
      toDelete.forEach(file => {
        fs.unlinkSync(path.join(BACKUP_DIR, file.name));
        console.log(`🧹 [BACKUP_RETENTION] Purged expired snapshot: ${file.name}`);
      });
    }
  } catch (cleanErr) {
    console.warn('[BACKUP_RETENTION_WARNING] Could not purge old snapshots:', cleanErr.message);
  }

  return { success: true, fileName: backupFileName, path: backupFilePath, size: encrypted.length };
}

if (require.main === module) {
  runEncryptedBackup();
}

module.exports = { runEncryptedBackup };
