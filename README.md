# ✦ V STAR Numerology & Astrology Platform ✦

[![Production Status](https://img.shields.io/badge/Status-Operational%20(Healthy)-success?style=flat-square)](https://v-star-numerology.vercel.app/)
[![Security Grade](https://img.shields.io/badge/Security-A%2B%20Compliant-gold?style=flat-square)](https://v-star-numerology.vercel.app/)
[![Audit Checks](https://img.shields.io/badge/Audit%20Checks-45%2F45%20Passed-blue?style=flat-square)](scripts/test-self.js)
[![License: ISC](https://img.shields.io/badge/License-ISC-purple?style=flat-square)](package.json)

A bespoke, production-grade consultation platform for **V STAR Numerology & Astrology**. Built with **Node.js, Express, ExcelJS, and Nodemailer**, featuring a luxury dark celestial aesthetic (`#070814`, `#dfb872`), deterministic Pythagorean numerology, planetary ephemeris, and automated client appointment pipelines.

---

## 📁 Structured Project Layout

```text
D:\V STAR
│
├── api/                                # Serverless Cloud Deployment Layer
│   └── index.js                        # Vercel serverless function entrypoint
│
├── data/                               # Excel Database & Storage Layer
│   ├── .gitkeep                        # Folder structure persistence
│   ├── appointments.xlsx               # Master consultation spreadsheet
│   └── backups/                        # AES-256 automated encrypted snapshots
│       └── .gitkeep
│
├── public/                             # Client Presentation Layer (Static Assets)
│   ├── css/
│   │   └── style.css                   # Master stylesheet (Glassmorphic, luxury gold)
│   ├── images/                         # Compressed SVG & Web-optimized raster artwork
│   │   ├── hero-zodiac-arch.png
│   │   ├── numerology-sacred-mandala.jpg
│   │   └── ...
│   ├── js/                             # Modular Frontend JavaScript Engines
│   │   ├── cosmic.js                   # Pythagorean Blueprint & 2-page PDF generator
│   │   ├── remedies.js                 # Vedic Ratna & Sacred Remedies calculation engine
│   │   ├── pob-autocomplete.js         # Multi-tiered Country/State/District autocompletion
│   │   ├── html2pdf.bundle.min.js      # Bundled local PDF compilation library
│   │   └── main.js                     # Core UI logic, modal lifecycle, appointment pipeline
│   ├── .well-known/
│   │   └── ard.json                    # Agent Resource Descriptor (AI Discovery)
│   ├── index.html                      # Primary responsive landing page
│   ├── predict.html                    # Single-feature prediction page
│   ├── results.html                    # Shareable consultation reading page
│   ├── robots.txt                      # Crawler instructions & sitemap mapping
│   ├── sitemap.xml                     # Search engine XML index
│   └── llms.txt                        # Standardized AI / LLM crawler reference
│
├── scripts/                            # Operational & DevOps Tooling
│   ├── test-self.js                    # 45-point comprehensive automated audit suite
│   └── backup-encrypted.js             # AES-256-CBC encrypted backup manager (30-day retention)
│
├── .env                                # Local secrets & environment configuration
├── .env.example                        # Documented environment template
├── .gitattributes                      # Line-ending normalization (LF)
├── .gitignore                          # Strict ignore rules (PII, sensitive data, binaries)
├── package.json                        # Node.js manifest, dependencies, and npm scripts
├── package-lock.json                   # Dependency lockfile
├── server.js                           # Master Express application & REST API server
├── vercel.json                         # Edge routing & static rewrite rules
└── README.md                           # Comprehensive documentation & architecture guide
```

---

## 🌟 Core Architecture & Capabilities

### 1. Unified Cosmic Blueprint & Sacred Remedies (`#calculator`)
- **Deterministic Pythagorean Engine**: Computes Life Path (1–9, Master Numbers 11, 22, 33) and Destiny Expression frequencies.
- **Vedic Ratna Shastra Recommender**: Prescribes authentic gemstones (5.25–6.5 Carats auspicious adult standard), ruling Graha, consecrated metals, wearing fingers, auspicious day/hora, and Beej Mantras.
- **Planetary Synergy Evaluation**: Real-time compatibility check between Life Path planet and Moon Sign ruler.
- **Top-Slide Reading Modal**: Interactive 10-section reading overlay with zero page reload.
- **Luxury 2-Page PDF Generation**: Edge-to-edge dark celestial styling rendered at origin-locked document coordinates (`html2pdf.bundle.min.js`), guaranteeing exactly 2 pages with zero blank pages.

### 2. Client Appointment Pipeline (`#appointment`)
- **Auto-Sync Metadata**: Clicking "Book Consultation" inside the Cosmic Reading pre-populates the booking form with user coordinates and generated remedy notes.
- **Input Validation**: Strict RFC-compliant email, phone, age bounds (0–120 years), and sanitization.
- **Excel Spreadsheet Database (`data/appointments.xlsx`)**: Formatted with celestial styling, frozen headers, and formula injection defenses (`=`, `@`, `+`, `-`).
- **Automated Live SMTP Mailer**: Dispatches confirmation emails containing complete booking details and sacred remedy prescriptions.

### 3. Production Security & Compliance
- **Content Security Policy (CSP Level 3)**:
  - `script-src: 'self'` (Zero `'unsafe-inline'` in script tags for maximum XSS protection).
  - `script-src-attr: 'unsafe-inline'` (Safe UI event attributes).
  - `object-src: 'none'`, `base-uri: 'self'`, `frame-ancestors: 'self'`.
- **COEP & CORP**: Cross-Origin Embedder Policy set to `credentialless`; Cross-Origin Resource Policy set to `same-origin`.
- **HSTS**: `max-age=63072000; includeSubDomains; preload`.
- **Subresource Integrity (SRI)**: SHA-512 cryptographic hashes on external stylesheet assets.
- **Rate Limiting**: Sliding-window rate limiters across API endpoints (`express-rate-limit`).

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/ARJUN59052/v-star-numerology.git
cd "v-star-numerology"

# Install production dependencies
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and populate your SMTP credentials:
```bash
cp .env.example .env
```

### 3. Available NPM Scripts
| Command | Action |
| :--- | :--- |
| `npm start` | Starts the production server on `http://localhost:3000` |
| `npm run dev` | Starts server in development mode |
| `npm test` | Runs the 45-point automated site, security, and API audit suite |
| `npm run backup` | Creates an AES-256 encrypted database snapshot in `data/backups/` |

---

## 🧪 Automated Testing & Verification
Run the comprehensive test suite at any time:
```bash
npm test
```
The suite automatically validates:
1. Server health and live SMTP configuration
2. SEO, robots, sitemap, llms.txt, and ARD endpoints
3. Security headers (CSP strictness, COEP, HSTS, Nosniff, Permissions-Policy)
4. Western Zodiac & Pythagorean numerology algorithms
5. Place of Birth multi-tiered database resolution
6. Live appointment booking, Excel storage, and email delivery
7. Sacred Remedy & Ratna calculation engine
8. UI layout and modal integrity

---

## 🌐 Production Deployment
The platform is deployed serverless on **Vercel** with automatic GitHub continuous deployment:
- **Production URL**: [https://v-star-numerology.vercel.app/](https://v-star-numerology.vercel.app/)
- **Repository**: [https://github.com/ARJUN59052/v-star-numerology](https://github.com/ARJUN59052/v-star-numerology)

---

&copy; 2026 **V STAR Numerology & Astrology**. All Rights Reserved.
