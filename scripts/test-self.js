const https = require('https');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const BASE_URL = 'https://v-star-numerology.vercel.app';

function request(method, reqPath, body = null, headers = {}) {
  return new Promise((resolve) => {
    const url = new URL(reqPath, BASE_URL);
    const reqHeaders = { ...headers };
    if (body) {
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(body);
    }
    const req = https.request(url, { method, headers: reqHeaders }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    req.on('error', (err) => resolve({ status: 0, error: err.message }));
    if (body) req.write(body);
    req.end();
  });
}

async function runTests() {
  console.log('=====================================================');
  console.log('       V STAR NUMEROLOGY AUTOMATED SITE AUDIT        ');
  console.log('=====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(title, condition, extra = '') {
    if (condition) {
      console.log('  [PASS] ' + title + (extra ? ' -> ' + extra : ''));
      passed++;
    } else {
      console.error('  [FAIL] ' + title + (extra ? ' -> ' + extra : ''));
      failed++;
    }
  }

  // 1. Health & Status
  console.log('--- 1. API Status & Server Health ---');
  const statusRes = await request('GET', '/api/status');
  assert('GET /api/status returns HTTP 200', statusRes.status === 200, 'Status: ' + statusRes.status);
  let statusJson = {};
  try { statusJson = JSON.parse(statusRes.data); } catch (e) {}
  assert('Platform health is HEALTHY', statusJson.health === 'HEALTHY', 'Health: ' + statusJson.health);
  assert('SMTP Service is Configured', statusJson.smtpConfigured === true, 'smtpConfigured: ' + statusJson.smtpConfigured);

  // 2. SEO & Manifests
  console.log('\n--- 2. SEO, ARD Manifest & Static Discovery ---');
  const robotsRes = await request('GET', '/robots.txt');
  assert('GET /robots.txt returns 200 text/plain', robotsRes.status === 200 && (robotsRes.headers['content-type'] || '').includes('text/plain'));
  assert('/robots.txt contains sitemap', robotsRes.data.includes('sitemap.xml'));

  const sitemapRes = await request('GET', '/sitemap.xml');
  assert('GET /sitemap.xml returns 200 application/xml', sitemapRes.status === 200 && (sitemapRes.headers['content-type'] || '').includes('xml'));
  assert('/sitemap.xml contains valid urlset', sitemapRes.data.includes('<urlset') && sitemapRes.data.includes('https://v-star-numerology.vercel.app/'));

  const llmsRes = await request('GET', '/llms.txt');
  assert('GET /llms.txt returns 200 text/plain', llmsRes.status === 200 && (llmsRes.headers['content-type'] || '').includes('text/plain'));
  assert('/llms.txt has compliant H1 header', llmsRes.data.startsWith('# V STAR Numerology & Astrology'));

  const ardRes = await request('GET', '/.well-known/ard.json');
  assert('GET /.well-known/ard.json returns 200 application/json', ardRes.status === 200 && (ardRes.headers['content-type'] || '').includes('json'));
  let ardJson = {};
  try { ardJson = JSON.parse(ardRes.data); } catch (e) {}
  assert('ARD schema valid', Boolean(ardJson['$schema']) && ardJson.name === 'V STAR Numerology & Astrology');

  // 3. Security Headers
  console.log('\n--- 3. Production Security Headers ---');
  const homeRes = await request('GET', '/');
  assert('GET / returns 200 OK', homeRes.status === 200);
  const csp = homeRes.headers['content-security-policy'] || '';
  assert('CSP contains script-src-attr unsafe-inline', csp.includes("script-src-attr 'unsafe-inline'"));
  assert("CSP script-src is strict 'self' (unsafe-inline removed)", csp.includes("script-src 'self'") && !csp.includes("script-src 'self' 'unsafe-inline'"));
  assert('HSTS header is enabled', Boolean(homeRes.headers['strict-transport-security']));
  assert('X-Content-Type-Options is nosniff', homeRes.headers['x-content-type-options'] === 'nosniff');
  assert('Permissions-Policy configured', Boolean(homeRes.headers['permissions-policy']));
  assert('COEP is configured with credentialless', homeRes.headers['cross-origin-embedder-policy'] === 'credentialless');

  // 4. Cosmic Calculation Engine Logic Test
  console.log('\n--- 4. Cosmic Calculator Engine Logic ---');
  const cosmicPath = path.join(__dirname, '..', 'public', 'js', 'cosmic.js');
  const cosmicCode = fs.readFileSync(cosmicPath, 'utf8');
  const mockWindow = {};
  const cosmicSandbox = { window: mockWindow, console: console };
  vm.createContext(cosmicSandbox);
  vm.runInContext(cosmicCode, cosmicSandbox);

  const testProfile = mockWindow.CosmicEngine.generateCosmicProfile(
    'Arjun GS',
    '2005-01-20',
    '09:12',
    'Tiruchirappalli (Trichy), Tamil Nadu, India'
  );

  assert('Western Zodiac is Capricorn', testProfile.zodiac && testProfile.zodiac.sign === 'Capricorn', 'Sign: ' + (testProfile.zodiac && testProfile.zodiac.sign));
  assert('Planetary ruler is Saturn', testProfile.zodiac && testProfile.zodiac.rulingPlanet === 'Saturn', 'Ruler: ' + (testProfile.zodiac && testProfile.zodiac.rulingPlanet));
  assert('Element is Earth', testProfile.zodiac && testProfile.zodiac.element === 'Earth', 'Element: ' + (testProfile.zodiac && testProfile.zodiac.element));
  assert('Life Path Number is 1', testProfile.lifePath && testProfile.lifePath.number === 1, 'Life Path: ' + (testProfile.lifePath && testProfile.lifePath.number));
  assert('Destiny Number is calculated', testProfile.destiny && typeof testProfile.destiny.number === 'number', 'Destiny: ' + (testProfile.destiny && testProfile.destiny.number));
  assert('Core traits and tagline generated', Boolean(testProfile.zodiac && testProfile.zodiac.tagline), 'Tagline: ' + (testProfile.zodiac && testProfile.zodiac.tagline));

  // 5. Place of Birth Autocomplete DB Check
  console.log('\n--- 5. Place of Birth Database Verification ---');
  const pobPath = path.join(__dirname, '..', 'public', 'js', 'pob-autocomplete.js');
  const pobCode = fs.readFileSync(pobPath, 'utf8');
  assert('POB database file exists and contains Tiruchirappalli', pobCode.includes('Tiruchirappalli') || pobCode.includes('Trichy'));

  // 6. Live Appointment Booking Flow Test
  console.log('\n--- 6. Live Appointment Booking API Flow ---');
  const appointmentPayload = JSON.stringify({
    fullName: 'Automated Test Client',
    phone: '9842140995',
    countryCode: '+91',
    email: 'vstarnumerology@gmail.com',
    dob: '2005-01-20',
    birthTime: '09:12',
    birthPlace: 'Tiruchirappalli, Tamil Nadu, India',
    serviceType: 'Full Astrology & Numerology',
    consultationMode: 'Online Video Call',
    notes: 'Automated end-to-end self test run'
  });

  const bookRes = await request('POST', '/api/appointment', appointmentPayload);
  assert('POST /api/appointment returns HTTP 200', bookRes.status === 200, 'Status: ' + bookRes.status);
  let bookJson = {};
  try { bookJson = JSON.parse(bookRes.data); } catch (e) {}
  assert('Booking response reports success: true', bookJson.success === true, 'Success: ' + bookJson.success);
  assert('Appointment ID generated with correct prefix', typeof bookJson.appointmentId === 'string' && bookJson.appointmentId.startsWith('VSN-'), 'Appointment ID: ' + bookJson.appointmentId);
  assert('Email dispatched via live SMTP', bookJson.emailMode === 'smtp' && bookJson.emailStatus.includes('Sent'), 'emailStatus: ' + bookJson.emailStatus);
  assert('Confirmation message matches exact required wording', bookJson.message && bookJson.message.includes('Here we got your data'), 'Message: ' + bookJson.message);

  // 7. Sacred Remedy & Ratna Recommender Verification
  console.log('\n--- 7. Sacred Remedy & Ratna Recommender Engine ---');
  const remediesPath = path.join(__dirname, '..', 'public', 'js', 'remedies.js');
  const remediesCode = fs.readFileSync(remediesPath, 'utf8');
  const remedyMockWin = { document: { readyState: 'complete' } };
  const remSandbox = { window: remedyMockWin, console: console, document: remedyMockWin.document };
  vm.createContext(remSandbox);
  vm.runInContext(remediesCode, remSandbox);

  const remProfile = remedyMockWin.RemedyEngine.prescribeVedicRemedies({
    name: 'Arjun GS',
    dob: '2005-01-20',
    rashiName: 'Capricorn',
    intention: 'wealth',
    weightKg: 65
  });

  assert('Life Path 1 maps to Sun / Surya', remProfile.graha && remProfile.graha.planet === 'Sun');
  assert('Primary Gemstone is Natural Ruby (Manikya)', remProfile.graha && remProfile.graha.gemstone === 'Natural Ruby');
  assert('Recommended Carat size adheres to auspicious Vedic standard', remProfile.caratSize && remProfile.caratSize.includes('5.25'));
  assert('Beej Mantra matches Surya Gayatri/Beej', remProfile.graha && remProfile.graha.beejMantra.includes('Om Hram Hreem'));
  assert('Harmonic synergy detects Sun-Saturn friction', remProfile.synergy && remProfile.synergy.status === 'synergy-caution');
  assert('Rudraksha and Yantra prescribed', remProfile.graha && remProfile.graha.rudraksha.includes('Mukhi') && remProfile.graha.yantra.includes('Surya Yantra'));

  // 8. Unified Calculator & Remedy Card Integrity Test
  console.log('\n--- 8. Unified Calculator & Remedy Card Integrity ---');
  const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  assert('Input form contains Full Name, DOB, TOB', indexHtml.includes('id="inlineName"') && indexHtml.includes('id="inlineDob"') && indexHtml.includes('id="inlineTob"'));
  assert('Input form streamlined: redundant weight input removed', !indexHtml.includes('id="inlineWeight"'));
  assert('Input form contains Birth Rashi / Moon Sign select', indexHtml.includes('id="inlineRashi"'));
  assert('Input form contains Primary Intention selector pills', indexHtml.includes('id="inlineIntentionPills"') && indexHtml.includes('data-intention="wealth"'));
  assert('Unified button: Generate Blueprint & Sacred Remedies', indexHtml.includes('Generate Blueprint &amp; Sacred Remedies') || indexHtml.includes('Generate Blueprint & Sacred Remedies'));
  assert('Results card embeds Vedic Remedy prescription block', indexHtml.includes('id="remedySynergyBox"') && indexHtml.includes('id="remedyGemCard"') && indexHtml.includes('id="remedyRudraCard"'));
  assert('Duplicate standalone remedies section removed', !indexHtml.includes('<section class="remedies-section branch-section" id="remedies">'));
  assert('Top-slide Cosmic Reading Modal exists with close button and card', indexHtml.includes('id="cosmicReadingModal"') && indexHtml.includes('cosmic-reading-modal-card'));
  assert('Active reading banner exists for quick reopen', indexHtml.includes('id="activeReadingBanner"') && indexHtml.includes('openCosmicReadingModal()'));

  console.log('\n=====================================================');
  console.log(`TOTAL AUDIT CHECKS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('=====================================================');
}

runTests();
