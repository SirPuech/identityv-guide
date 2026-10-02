const https = require('https');
const fs = require('fs');
const path = require('path');

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

function parseWikiTable(wikitext) {
  const characters = [];
  const rows = wikitext.split('|-');
  for (const row of rows) {
    const fileMatch = row.match(/\[\[File:([^|\]]+)/i);
    if (!fileMatch) continue;
    const fileName = fileMatch[1].trim();

    // Check cells
    const cells = row.split('\n|').map((c) => c.trim()).filter(Boolean);
    let nameText = '';
    let rumorText = '';

    for (const cell of cells) {
      if (cell.includes('<br>') || cell.includes("'''")) {
        nameText = cell;
      } else if (cell.includes("''") && cell.length > 25) {
        rumorText = cell;
      }
    }

    let realName = '';
    let career = '';

    const cleanName = nameText
      .replace(/style="[^"]*"/g, '')
      .replace(/^\|/, '')
      .trim();

    const brParts = cleanName.split(/<br\s*\/?>/i);
    if (brParts.length >= 2) {
      realName = brParts[0]
        .replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1')
        .replace(/[\[\]']/g, '')
        .trim();
      career = brParts[1]
        .replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1')
        .replace(/[\[\]']/g, '')
        .trim();
    } else {
      realName = cleanName
        .replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1')
        .replace(/[\[\]']/g, '')
        .trim();
      career = realName;
    }

    const rumor = rumorText
      .replace(/style="[^"]*"/g, '')
      .replace(/^\|/, '')
      .replace(/''/g, '')
      .trim();

    characters.push({
      fileName,
      realName,
      career,
      rumor,
    });
  }
  return characters;
}

async function run() {
  console.log('Fetching wiki tables...');
  const s9 = (await fetchJson(
    'https://id5.fandom.com/api.php?action=parse&page=Survivor&prop=wikitext&section=9&format=json'
  )).parse.wikitext['*'];
  const s10 = (await fetchJson(
    'https://id5.fandom.com/api.php?action=parse&page=Survivor&prop=wikitext&section=10&format=json'
  )).parse.wikitext['*'];
  const h7 = (await fetchJson(
    'https://id5.fandom.com/api.php?action=parse&page=Hunter&prop=wikitext&section=7&format=json'
  )).parse.wikitext['*'];
  const h8 = (await fetchJson(
    'https://id5.fandom.com/api.php?action=parse&page=Hunter&prop=wikitext&section=8&format=json'
  )).parse.wikitext['*'];

  const survs = [...parseWikiTable(s9), ...parseWikiTable(s10)];
  const hunts = [...parseWikiTable(h7), ...parseWikiTable(h8)];

  console.log(`Found ${survs.length} Survivors and ${hunts.length} Hunters.`);
  fs.writeFileSync(
    path.join(__dirname, 'wiki_characters_extracted.json'),
    JSON.stringify({ survs, hunts }, null, 2),
    'utf8'
  );
  console.log('Saved to tools/wiki_characters_extracted.json');
}

run();
