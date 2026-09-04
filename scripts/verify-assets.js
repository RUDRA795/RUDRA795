const http = require('http');

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
  '/assets/hero/hero-blue.svg',
  '/assets/hero/hero-gold.svg',
  '/assets/hero/hero-void.svg',
  '/assets/hero/hero-cyber.svg',
  '/assets/hero/hero-celestial.svg',
  '/assets/projects/dhammu-pipeline.svg',
  '/assets/projects/opticure-graph.svg',
  '/assets/projects/nagarix-command.svg',
  '/assets/projects/nereus-ocean.svg',
  '/assets/projects/dsaura-orb.svg',
  '/assets/system/system-status.svg',
  '/assets/system/build-loop.svg'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, status: res.statusCode, size: data.length });
      });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  console.log('Testing asset endpoints...');
  let allOk = true;
  for (const url of urls) {
    const res = await checkUrl(url);
    const ok = res.status === 200 && res.size > 0;
    console.log(`${ok ? '✓' : '✗'} [${res.status}] ${url} (${res.size || 0} bytes)`);
    if (!ok) allOk = false;
  }
  if (allOk) {
    console.log('\nALL 21 ENDPOINTS RETURNED 200 OK WITH VALID CONTENT!');
    process.exit(0);
  } else {
    console.error('\nSOME ENDPOINTS FAILED!');
    process.exit(1);
  }
}

run();
