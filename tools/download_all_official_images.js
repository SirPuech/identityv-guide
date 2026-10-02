const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, '../public/images/heroes');
const roster = require('./official_roster.json');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

// Convert character name/title into clean kebab-case id
function toId(str) {
  return str
    .toLowerCase()
    .replace(/["']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  const allChars = [
    ...roster.survs.map((s) => ({ ...s, type: 'survivor' })),
    ...roster.hunts.map((h) => ({ ...h, type: 'hunter' })),
  ];

  console.log(`Starting portrait download for ${allChars.length} characters...`);

  // Batch queries in chunks of 20
  const chunkSize = 20;
  for (let i = 0; i < allChars.length; i += chunkSize) {
    const chunk = allChars.slice(i, i + chunkSize);
    const titles = chunk.map((c) => encodeURIComponent(`File:${c.fileName}`)).join('|');
    const apiUrl = `https://id5.fandom.com/api.php?action=query&titles=${titles}&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json`;

    try {
      const data = await fetchJson(apiUrl);
      const pages = data.query ? Object.values(data.query.pages) : [];

      for (const char of chunk) {
        const page = pages.find(
          (p) =>
            p.title &&
            p.title.toLowerCase().replace(/file:/i, '') === char.fileName.toLowerCase()
        );

        if (page && page.imageinfo && page.imageinfo[0]) {
          const info = page.imageinfo[0];
          const imgUrl = info.thumburl || info.url;

          // Compute id
          const id = toId(char.title.split('<br')[0].trim());
          const dest = path.join(outputDir, `${id}.png`);

          if (!fs.existsSync(dest) || fs.statSync(dest).size < 1000) {
            console.log(`Downloading ${id}.png from ${imgUrl}`);
            try {
              await downloadFile(imgUrl, dest);
              console.log(`✓ Saved ${id}.png (${fs.statSync(dest).size} bytes)`);
            } catch (err) {
              console.error(`Error saving ${id}:`, err.message);
            }
          } else {
            console.log(`- Already have ${id}.png (${fs.statSync(dest).size} bytes)`);
          }
        } else {
          console.warn(`No image info found for ${char.fileName}`);
        }
      }
    } catch (e) {
      console.error('Batch error:', e.message);
    }
  }

  console.log('Finished downloading portraits!');
}

run();
