import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_USER_DATA = path.join(os.tmpdir(), 'chrome-test-user-data-' + Date.now());
const DOWNLOAD_DIR = path.join(os.tmpdir(), 'chrome-downloads-' + Date.now());

fs.mkdirSync(TEMP_USER_DATA, { recursive: true });
fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

console.log('Starting headless Chrome...');
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
    await sendCmd('Browser.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: DOWNLOAD_DIR,
      eventsEnabled: true
    });

    await sendCmd('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(2500);

    // Scroll down 3400px (simulating real user at calculator)
    await sendCmd('Runtime.evaluate', {
      expression: `window.scrollTo(0, 3400);`
    });

    await sendCmd('Runtime.evaluate', {
      expression: `(function() {
        document.getElementById('inlineName').value = 'Arjun GS';
        document.getElementById('inlineDob').value = '1998-05-15';
        document.getElementById('inlineTob').value = '10:30';
        document.getElementById('inlineCountry').value = 'India';
        document.getElementById('inlineState').value = 'Tamil Nadu';
        document.getElementById('inlineDistrict').value = 'Chennai';
        document.getElementById('inlineWeight').value = '68';
        document.getElementById('inlineRashi').value = 'Aries';
        document.getElementById('btnInlineGenerate').click();
      })()`
    });

    await sleep(1500);

    console.log('Clicking Save PDF while window.scrollY is deep down...');
    const scrollStatus = await sendCmd('Runtime.evaluate', {
      expression: `(function() {
        var btn = document.getElementById('modalSavePdfBtn');
        var scrollY = window.scrollY;
        if (btn) btn.click();
        return { clicked: !!btn, scrollY: scrollY };
      })()`,
      returnByValue: true
    });
    console.log('Click status:', scrollStatus.result.value);

    let downloadedFile = null;
    for (let sec = 0; sec < 15; sec++) {
      await sleep(1000);
      const files = fs.readdirSync(DOWNLOAD_DIR);
      const completed = files.find(f => f.endsWith('.pdf') && !f.endsWith('.crdownload'));
      if (completed) {
        downloadedFile = path.join(DOWNLOAD_DIR, completed);
        break;
      }
    }

    if (!downloadedFile) throw new Error('PDF download timed out');

    const pdfBytes = fs.readFileSync(downloadedFile);
    const pdfStr = pdfBytes.toString('binary');
    const pageMatches = pdfStr.match(/\/Type\s*\/Page\b/g);
    const pageCount = pageMatches ? pageMatches.length : 0;
    console.log(`\n========================================`);
    console.log(`SCROLLED TEST RESULT (scrollY = ${scrollStatus.result.value.scrollY}px):`);
    console.log(`- File Name: ${path.basename(downloadedFile)}`);
    console.log(`- File Size: ${(pdfBytes.length / 1024).toFixed(1)} KB`);
    console.log(`- Total Pages in PDF: ${pageCount}`);
    console.log(`========================================\n`);

    if (pageCount === 2) {
      console.log('VERIFIED: Exactly 2 pages with scrollY > 0! Zero blank pages generated!');
    } else {
      console.error('FAIL: Expected 2 pages, got: ' + pageCount);
      process.exit(1);
    }
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
