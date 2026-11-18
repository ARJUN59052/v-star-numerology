const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\Users\\Arjun GS\\.chrome-debug';
const activePortFile = 'C:\\Users\\Arjun GS\\AppData\\Local\\Google\\Chrome\\User Data\\DevToolsActivePort';

console.log('[CHROME-DAEMON] Launching Chrome...');
const chrome = spawn(chromePath, [
  '--remote-debugging-port=9222',
  '--remote-allow-origins=*',
  '--user-data-dir=' + userDataDir,
  '--no-first-run',
  '--no-default-browser-check',
  'https://v-star-numerology.vercel.app/'
], {
  stdio: 'inherit'
});

chrome.on('exit', (code, signal) => {
  console.log(`[CHROME-DAEMON] Chrome exited with code ${code}, signal ${signal}`);
  process.exit(code || 0);
});

// Repeatedly verify 9222 and keep DevToolsActivePort up-to-date
let configured = false;
const interval = setInterval(() => {
  http.get('http://127.0.0.1:9222/json/version', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        const wsUrl = json.webSocketDebuggerUrl;
        const wsPath = wsUrl.replace(/^ws:\/\/[^\/]+\//, '');
        const portContent = '9222\n/' + wsPath;
        fs.writeFileSync(activePortFile, portContent, 'utf8');
        if (!configured) {
          configured = true;
          console.log('[CHROME-DAEMON] Successfully bound remote debugging on 9222!');
          console.log('[CHROME-DAEMON] DevToolsActivePort written:', portContent.replace('\n', ' '));
        }
      } catch (e) {
        console.error('[CHROME-DAEMON] Error parsing version JSON:', e.message);
      }
    });
  }).on('error', () => {
    // waiting for Chrome to bind
  });
}, 1000);
