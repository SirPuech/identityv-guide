const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, '../public/images/heroes');

const characterWikiTitles = {
  // Survivors
  mechanic: 'Mechanic',
  seer: 'Seer',
  priestess: 'Priestess',
  mercenary: 'Mercenary',
  perfumer: 'Perfumer',
  coordinator: 'Coordinator',
  prospector: 'Prospector',
  forward: 'Forward',
  enchantress: 'Enchantress',
  doctor: 'Doctor',
  gardener: 'Gardener',
  prisoner: '"Prisoner"',
  antiquarian: 'Antiquarian',
  'little-girl': '"Little Girl"',
  cheerleader: 'Cheerleader',

  // Hunters
  sculptor: 'Sculptor',
  'dream-witch': 'Dream Witch',
  geisha: 'Geisha',
  photographer: 'Photographer',
  'wu-chang': 'Wu Chang',
  'bloody-queen': 'Bloody Queen',
  'night-watch': 'Night Watch',
  'opera-singer': 'Opera Singer',
  'guard-26': 'Guard 26',
  naiad: 'Naiad'
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
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

async function run() {
  const titles = Object.values(characterWikiTitles).map(encodeURIComponent).join('|');
  const apiUrl = `https://id5.fandom.com/api.php?action=query&titles=${titles}&prop=pageimages&format=json&pithumbsize=400`;

  console.log('Querying MediaWiki API for official portraits...');

  https.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', (chunk) => (data += chunk));
    res.on('end', async () => {
      try {
        const json = JSON.parse(data);
        const pages = json.query ? Object.values(json.query.pages) : [];

        for (const [id, title] of Object.entries(characterWikiTitles)) {
          const cleanTitle = title.replace(/"/g, '');
          const page = pages.find(
            (p) => p.title.toLowerCase() === title.toLowerCase() || p.title.toLowerCase() === cleanTitle.toLowerCase()
          );

          if (page && page.thumbnail && page.thumbnail.source) {
            const dest = path.join(outputDir, `${id}.png`);
            console.log(`Downloading portrait for ${id} from ${page.thumbnail.source}`);
            try {
              await downloadFile(page.thumbnail.source, dest);
              console.log(`✓ Saved ${id}.png (${fs.statSync(dest).size} bytes)`);
            } catch (err) {
              console.error(`Failed to download for ${id}:`, err.message);
            }
          } else {
            console.warn(`No thumbnail found for ${id} (${title})`);
          }
        }
      } catch (e) {
        console.error('Error parsing response:', e);
      }
    });
  });
}

run();
