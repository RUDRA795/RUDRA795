const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const BASE_DIR = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '/web' || reqPath === '/web/') {
    reqPath = '/web/index.html';
  }

  const filePath = path.join(BASE_DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const urls = [
  '/web/index.html',
  '/web/style.css',
  '/web/js/config.js',
  '/web/js/audio.js',
  '/web/js/particles.js',
  '/web/js/characters.js',
  '/web/js/sequence.js',
  '/web/js/app.js',
  '/assets/hero/hero-main.svg',
  '/assets/hero/hero-blue.jpg',
  '/assets/hero/hero-gold.jpg',
  '/assets/hero/hero-void.jpg',
  '/assets/hero/hero-cyber.jpg',
  '/assets/hero/hero-celestial.jpg',
  '/assets/projects/dhammu-pipeline.svg',
  '/assets/projects/opticure-graph.svg',
  '/assets/projects/nagarix-command.svg',
  '/assets/projects/nereus-ocean.svg',
  '/assets/projects/dsaura-orb.svg',
  '/assets/system/system-status.svg',
  '/assets/system/build-loop.svg'
];

server.listen(PORT, async () => {
  console.log(`Self-test server running at http://localhost:${PORT}`);
  let allOk = true;

  for (const url of urls) {
    const ok = await new Promise((resolve) => {
      http.get(`http://localhost:${PORT}${url}`, (res) => {
        let size = 0;
        res.on('data', chunk => size += chunk.length);
        res.on('end', () => {
          const pass = res.statusCode === 200 && size > 0;
          console.log(`${pass ? '✓' : '✗'} [${res.statusCode}] ${url} (${size} bytes)`);
          resolve(pass);
        });
      }).on('error', (err) => {
        console.log(`✗ [ERROR] ${url} : ${err.message}`);
        resolve(false);
      });
    });
    if (!ok) allOk = false;
  }

  server.close(() => {
    if (allOk) {
      console.log('\nALL 21 ENDPOINTS VERIFIED & WORKING PERFECTLY!');
      process.exit(0);
    } else {
      console.error('\nSOME ENDPOINTS FAILED!');
      process.exit(1);
    }
  });
});
