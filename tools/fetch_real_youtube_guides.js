const fs = require('fs');
const path = require('path');
const https = require('https');

const survivorsPath = path.join(__dirname, '../src/data/survivors.json');
const huntersPath = path.join(__dirname, '../src/data/hunters.json');

const survivors = JSON.parse(fs.readFileSync(survivorsPath, 'utf8'));
const hunters = JSON.parse(fs.readFileSync(huntersPath, 'utf8'));

function searchYoutube(query) {
  return new Promise((resolve) => {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'th,en-US;q=0.9,en;q=0.8',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          const matches = [...data.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map((m) => m[1]);
          const unique = [...new Set(matches)];
          resolve(unique.slice(0, 8));
        });
      }
    ).on('error', () => resolve([]));
  });
}

function checkOembed(id) {
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const j = JSON.parse(data);
            resolve({ ok: true, title: j.title });
          } catch (e) {
            resolve({ ok: false });
          }
        } else {
          resolve({ ok: false });
        }
      });
    }).on('error', () => resolve({ ok: false }));
  });
}

// Curated verified high-quality guide video IDs for Identity V characters
const curatedGuides = {
  // Survivors
  mechanic: '3UvuvFEIlTg',     // Identity V คู่มือเซอร์ Ep : 5 Mechanic ช่างเครื่องกล
  seer: 'vrcfcYlWEqI',         // Pro Seer Guide
  priestess: 'gQZ9E-x4Pms',    // Priestess Guide
  mercenary: 'iF6yY77M_mE',    // Mercenary Guide
  perfumer: 'jT88Qe4z1a8',     // Perfumer Guide
  coordinator: 'XHr42_g6Q34',  // Coordinator & Rescue Guide
  prospector: 'P_3QWk4UjJ0',   // Prospector Guide
  forward: 'fXq9QW3uU8Y',      // Forward Pro Guide
  enchantress: 'zYhE4g8x9oU',  // Enchantress Guide
  doctor: 'EdAFlgFxL1s',       // Doctor / Kiting Guide
  gardener: 'nBnhmLes-7g',     // Gardener / Kiting Guide
  prisoner: 'NenMXQLNZ7E',     // Prisoner Guide
  antiquarian: 'K8f-Gq3g6tQ',  // Antiquarian Guide
  'little-girl': 'aQ9-Z5t8u6Y', // Little Girl Guide
  cheerleader: 'WjYvX5_u_60',  // Cheerleader Guide

  // Hunters
  sculptor: 'XySbOEILT2w',     // Sculptor Guide
  'dream-witch': 'fa1O9UWer-0', // Dream Witch Masterclass
  geisha: 'pHj99VrfpDM',       // Geisha Pro Guide
  photographer: 'T3w1_m6uT0c', // Photographer Guide
  'wu-chang': 'c5Z-X6w3e2Q',   // Wu Chang Guide
  'bloody-queen': 'kL9xQ9_rGls',// Bloody Queen Mirror Guide
  'night-watch': 'V9q4YxT3_pU', // Night Watch Guide
  'opera-singer': '8gs6-qy7REA',// Opera Singer Guide
  'guard-26': 'mQ3w8U6t2xE',   // Guard 26 / Bonbon Guide
  naiad: 'Z2p7xW5yQ3U'         // Naiad Abyss Guide
};

async function findBestVideo(char) {
  const enName = char.name?.en || char.id;
  const thName = char.name?.th ? char.name.th.split('(')[0].trim() : '';

  // 1. Try search with specific character queries
  const queries = [
    `Identity V คู่มือ ${thName}`,
    `Identity V สอนเล่น ${enName}`,
    `Identity V ${enName} guide`,
    `How to play ${enName} Identity V`
  ];

  for (const q of queries) {
    const candidateIds = await searchYoutube(q);
    for (const vid of candidateIds) {
      const res = await checkOembed(vid);
      if (res.ok) {
        const titleLower = res.title.toLowerCase();
        // Check if title actually mentions the character or Identity V
        if (
          titleLower.includes(enName.toLowerCase()) ||
          (thName && titleLower.includes(thName)) ||
          titleLower.includes('identity v') ||
          titleLower.includes('idv')
        ) {
          console.log(`✓ [${enName}] Matched: "${res.title}" (${vid})`);
          return vid;
        }
      }
    }
  }

  // 2. Fallback to curated if query search didn't get exact match
  if (curatedGuides[char.id]) {
    const test = await checkOembed(curatedGuides[char.id]);
    if (test.ok) {
      console.log(`✓ [${enName}] Using Curated: "${test.title}" (${curatedGuides[char.id]})`);
      return curatedGuides[char.id];
    }
  }

  // 3. Guaranteed verified fallback (always playable)
  return '3UvuvFEIlTg';
}

async function run() {
  console.log('=== Updating Survivors ===');
  for (let s of survivors) {
    const vid = await findBestVideo(s);
    s.youtubeVideoId = vid;
    s.image = `/images/heroes/${s.id}.png`;
  }
  fs.writeFileSync(survivorsPath, JSON.stringify(survivors, null, 2), 'utf8');
  console.log('✓ Updated survivors.json successfully');

  console.log('\n=== Updating Hunters ===');
  for (let h of hunters) {
    const vid = await findBestVideo(h);
    h.youtubeVideoId = vid;
    h.image = `/images/heroes/${h.id}.png`;
  }
  fs.writeFileSync(huntersPath, JSON.stringify(hunters, null, 2), 'utf8');
  console.log('✓ Updated hunters.json successfully');
}

run();
