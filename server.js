/**
 * Roster Manager – Local Server
 * ─────────────────────────────
 * Requirements: Node.js (https://nodejs.org) — no npm install needed.
 *
 * Start:  node server.js
 * Then open in your browser:
 *   Admin  → http://localhost:3000/roster-admin.html
 *   Viewer → http://localhost:3000/roster-viewer.html
 *
 * Data is saved to roster-data.json in the same folder.
 * Stop the server with Ctrl+C.
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT      = 3000;
const DATA_FILE = path.join(__dirname, 'roster-data.json');
const DIR       = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js'  : 'application/javascript',
  '.json': 'application/json',
  '.css' : 'text/css',
  '.ico' : 'image/x-icon',
};

// Create an empty data file if one doesn't exist yet
if (!fs.existsSync(DATA_FILE)) {
  const empty = {
    version: 3,
    savedAt: null,
    startDate: null,
    sectors: [],
    stations: [],
    units: [],
    users: [],
    roster: {}
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(empty, null, 2), 'utf8');
  console.log('✔  Created roster-data.json');
}

function sendResponse(res, status, contentType, body) {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-cache',
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let buf = '';
    req.on('data', c => buf += c);
    req.on('end', () => resolve(buf));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = req.url.split('?')[0];

  // CORS pre-flight
  if (req.method === 'OPTIONS') {
    sendResponse(res, 204, 'text/plain', '');
    return;
  }

  // ── GET /api/data  →  return the JSON file ─────────────────────────────
  if (req.method === 'GET' && url === '/api/data') {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      sendResponse(res, 200, 'application/json', data);
    } catch (e) {
      sendResponse(res, 500, 'application/json', JSON.stringify({ error: 'Read failed: ' + e.message }));
    }
    return;
  }

  // ── POST /api/data  →  save JSON to file ───────────────────────────────
  if (req.method === 'POST' && url === '/api/data') {
    try {
      const body   = await readBody(req);
      const parsed = JSON.parse(body);
      parsed.savedAt = new Date().toISOString();
      const pretty   = JSON.stringify(parsed, null, 2);
      fs.writeFileSync(DATA_FILE, pretty, 'utf8');
      const kb = (Buffer.byteLength(pretty) / 1024).toFixed(1);
      console.log(`[${new Date().toLocaleTimeString()}]  💾  Saved  (${kb} KB)`);
      sendResponse(res, 200, 'application/json', JSON.stringify({ ok: true, savedAt: parsed.savedAt }));
    } catch (e) {
      console.error('Save error:', e.message);
      sendResponse(res, 400, 'application/json', JSON.stringify({ error: e.message }));
    }
    return;
  }

  // ── Static files (HTML etc.) ───────────────────────────────────────────
  let filePath = (url === '/') ? '/roster-admin.html' : url;
  filePath = path.normalize(path.join(DIR, filePath));

  if (!filePath.startsWith(DIR)) {
    sendResponse(res, 403, 'text/plain', 'Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      sendResponse(res, 404, 'text/plain', '404 Not Found: ' + url);
      return;
    }
    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    sendResponse(res, 200, mime, data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const line = '═'.repeat(50);
  console.log('');
  console.log('╔' + line + '╗');
  console.log('║          ROSTER MANAGER  –  Local Server         ║');
  console.log('╠' + line + '╣');
  console.log(`║  Admin  →  http://localhost:${PORT}/roster-admin.html   ║`);
  console.log(`║  Viewer →  http://localhost:${PORT}/roster-viewer.html  ║`);
  console.log('╠' + line + '╣');
  console.log('║  Data saved to  →  roster-data.json              ║');
  console.log('║  Stop server    →  Ctrl + C                      ║');
  console.log('╚' + line + '╝');
  console.log('');
});
