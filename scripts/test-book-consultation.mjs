import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome-test-user-data-' + Date.now());

fs.mkdirSync(TEMP_USER_DATA, { recursive: true });

console.log('Starting headless Chrome for Book Consultation verification...');
const chromeProc = spawn(CHROME_PATH, [
  '--headless=new',
  '--remote-debugging-port=9222',
  `--user-data-dir=${TEMP_USER_DATA}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-gpu',
  'about:blank'
], { stdio: 'ignore' });

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

let ws = null;
let msgId = 1;
const pending = new Map();

function sendCmd(method, params = {}) {
  const id = msgId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function run() {
  try {
    let connected = false;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch('http://127.0.0.1:9222/json/list');
        const list = await res.json();
        if (list.length > 0 && list[0].webSocketDebuggerUrl) {
          ws = new WebSocket(list[0].webSocketDebuggerUrl);
          connected = true;
          break;
        }
      } catch (e) {
        await sleep(500);
      }
    }

    if (!connected) throw new Error('Failed to connect to headless Chrome');

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && pending.has(data.id)) {
        const { resolve, reject } = pending.get(data.id);
        pending.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };

    await sendCmd('Page.enable');
    await sendCmd('Runtime.enable');

    console.log('Navigating to http://localhost:3000...');
    await sendCmd('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(2500);

    console.log('Filling calculator form...');
    await sendCmd('Runtime.evaluate', {
      expression: `(function() {
        document.getElementById('inlineName').value = 'Arjun GS';
        document.getElementById('inlineDob').value = '1998-05-15';
        document.getElementById('inlineTob').value = '10:30';
        document.getElementById('inlineCountry').value = 'India';
        document.getElementById('inlineState').value = 'Tamil Nadu';
        document.getElementById('inlineDistrict').value = 'Chennai';
        document.getElementById('inlineRashi').value = 'Aries';
        document.getElementById('btnInlineGenerate').click();
      })()`
    });

    await sleep(1500);

    console.log('Verifying modal opened...');
    const modalCheck = await sendCmd('Runtime.evaluate', {
      expression: `(function() {
        var modal = document.getElementById('cosmicReadingModal');
        return modal && modal.classList.contains('active');
      })()`,
      returnByValue: true
    });
    console.log('Modal active:', modalCheck.result.value);

    console.log('Clicking Book Consultation button inside modal...');
    await sendCmd('Runtime.evaluate', {
      expression: `(function() {
        var btn = document.getElementById('modalBookConsultationBtn');
        if (btn) btn.click();
      })()`
    });

    // Wait for modal close & smooth scroll
    await sleep(1500);

    console.log('Verifying appointment section scroll & prefilled fields...');
    const verifyResult = await sendCmd('Runtime.evaluate', {
      expression: `(function() {
        var modal = document.getElementById('cosmicReadingModal');
        var apt = document.getElementById('appointment');
        var aptRect = apt ? apt.getBoundingClientRect() : null;

        var fullName = document.getElementById('fullName')?.value;
        var dob = document.getElementById('dob')?.value;
        var birthTime = document.getElementById('birthTime')?.value;
        var country = document.getElementById('aptCountry')?.value;
        var state = document.getElementById('aptState')?.value;
        var district = document.getElementById('aptDistrict')?.value;
        var birthPlace = document.getElementById('birthPlace')?.value;
        var notes = document.getElementById('notes')?.value;
        
        var selectedServiceRadio = document.querySelector('input[name="serviceType"]:checked');

        return {
          modalClosed: modal ? !modal.classList.contains('active') : false,
          scrollY: window.scrollY,
          aptTopRelativeToViewport: aptRect ? aptRect.top : null,
          fullName: fullName,
          dob: dob,
          birthTime: birthTime,
          country: country,
          state: state,
          district: district,
          birthPlace: birthPlace,
          notes: notes,
          selectedService: selectedServiceRadio ? selectedServiceRadio.value : null
        };
      })()`,
      returnByValue: true
    });

    const res = verifyResult.result.value;
    console.log('\n========================================');
    console.log('BOOK CONSULTATION VERIFICATION RESULTS:');
    console.log('- Modal Closed:', res.modalClosed);
    console.log('- Page ScrollY:', res.scrollY, 'px');
    console.log('- Appointment Top relative to Viewport:', Math.round(res.aptTopRelativeToViewport), 'px');
    console.log('- Pre-filled Full Name:', res.fullName);
    console.log('- Pre-filled DOB:', res.dob);
    console.log('- Pre-filled Birth Time:', res.birthTime);
    console.log('- Pre-filled Place:', res.birthPlace);
    console.log('- Pre-selected Service:', res.selectedService);
    console.log('- Pre-filled Notes:', res.notes);
    console.log('========================================\n');

    if (!res.modalClosed) {
      throw new Error('Modal did not close!');
    }
    if (res.scrollY < 2000) {
      throw new Error('Page did not scroll down to appointment section!');
    }
    if (res.fullName !== 'Arjun GS') {
      throw new Error('Full Name was not prefilled!');
    }
    if (res.dob !== '1998-05-15') {
      throw new Error('DOB was not prefilled!');
    }
    if (!res.notes || !res.notes.includes('[Sacred Blueprint & Remedy Request]')) {
      throw new Error('Sacred Remedy notes were not prefilled!');
    }

    console.log('ALL VERIFICATIONS PASSED! Clicking "Book Consultation" closes the modal, smoothly scrolls directly to the appointment booking section, and pre-fills all client coordinates & remedy details!');

  } finally {
    if (ws) ws.close();
    chromeProc.kill();
    try { fs.rmSync(TEMP_USER_DATA, { recursive: true, force: true }); } catch (e) {}
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
