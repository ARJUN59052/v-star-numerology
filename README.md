# ✦ V STAR Numerology & Astrology Platform ✦

A bespoke, full-stack appointment booking and astrological consultation platform tailored for **V STAR Numerology**. Built with Node.js, Express, ExcelJS, and Nodemailer with a modern celestial & starry astrology aesthetic.

---

## 🌟 Key Features

1. **Client Details Collection**:
   - Full Name
   - Phone Number
   - Email ID
   - Date of Birth (DOB)
   - Time of Birth (with AM/PM)
   - Place of Birth (City, State, Country)
   - Gender & Preferred Consultation Mode (Video Call / Direct Call / In-Person)

2. **Specialized Consultation Options**:
   - ☀️ **Full Astrology & Numerology**: Complete 360° Kundli, 12 Houses & Numerology
   - ✍️ **Only Name Numerology**: Name Correction, Baby Names & Pythagorean Vibrations
   - 💼 **Only for Business Numerology**: Brand Names, Auspicious Launch Dates & Partner Harmony
   - 💖 **Only of Relationship Compatibility**: Partner Synastry & Emotional Wavelength
   - 💍 **Only for Marriage & Kundli Matching**: 36 Gun Milan, Manglik Dosha & Vivah Muhurtham
   - 💎 **Career, Wealth & Gemstone**: Wealth Houses & Planetary Remedies
   - 🏛️ **Only for Vasthu Consultation**: Home & Commercial Spatial Energy Balance & Remedies
   - 🩺 **Only for Health Astrology**: 6th House Diseases, Longevity & Ayurvedic Planetary Remedies

3. **Automated Excel Sheet Storage (`data/appointments.xlsx`)**:
   - Every booking is automatically appended to an Excel file formatted with celestial midnight-indigo headers, borders, and column widths.
   - Built-in **Admin / Astrologer Portal** with a one-click button to download the latest `.xlsx` sheet at any time (`/api/appointments/download`).

4. **Automated Email Confirmation**:
   - Sends the client an automated confirmation containing the requested message:
     > *"Here we got your data, we will check it out and we will confirm appointment and let you know, Thanks for choosing V STAR Numerology."*
   - Includes appointment ID, selected service, and consultation summary.
   - Configurable for Gmail or any SMTP provider via `.env`. Runs in safe simulation/logging mode if SMTP credentials are not yet entered.

5. **Astrology & Numerology Theme**:
   - Deep midnight navy (`#070814`, `#0c0e27`) with golden metallic accents (`#d4af37`, `#ffd700`).
   - Interactive live **Starry Canvas Particle System**.
   - Sacred geometry & rotating yantra motifs.
   - **Interactive Life Path Number Calculator**: Visitors can enter their DOB to reveal their Life Path Number (1–9, Master Numbers 11, 22, 33) and archetypes before booking.

---

## 🚀 How to Run the Website

### 1. Install Dependencies (Already completed in this directory)
```bash
npm install
```

### 2. Start the Server
```bash
npm start
# or
node server.js
```

### 3. Open in Browser
Visit:
```
http://localhost:3000
```

---

## 📧 How to Configure Live Gmail / SMTP Delivery

1. Open `.env` in the root folder.
2. Fill in your Gmail address and 16-character **App Password**:
   ```ini
   PORT=3000
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_16_character_app_password
   EMAIL_FROM="V STAR Numerology" <your_email@gmail.com>
   ```
   *(To get a Google App Password: Go to your Google Account -> Security -> 2-Step Verification -> App Passwords -> Generate).*
3. When `SMTP_USER` and `SMTP_PASS` are provided, real emails will be delivered directly to the client's inbox.
4. If left blank, the system runs in safe simulation mode (all appointment details are still saved in Excel, confirmation details appear on-screen in the modal, and the email payload is logged to the server console).

---

## 📊 Where is the Excel Sheet Stored?

- Path on disk: `data/appointments.xlsx`
- Direct download link from website: Click the green **"Admin / Excel Portal"** button in the navbar or visit:
  ```
  http://localhost:3000/api/appointments/download
  ```

---

## 📂 Project Directory Structure

```
d:\V STAR\
├── data/
│   └── appointments.xlsx      # Master Excel sheet storing all client details
├── public/
│   ├── css/
│   │   └── style.css          # Celestial theme styles, animations, responsive rules
│   ├── js/
│   │   └── main.js            # Frontend interactivity, calculator, booking & modal
│   └── index.html             # Main website landing page & booking portal
├── .env                       # Environment & SMTP configuration
├── .env.example               # Example template for SMTP setup
├── package.json               # Dependencies (Express, ExcelJS, Nodemailer, CORS, Dotenv)
├── server.js                  # Express backend, Excel generator & email dispatcher
└── README.md                  # System guide
```

