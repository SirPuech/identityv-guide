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

function parseSection(wikitext) {
  const rows = wikitext.split('|-');
  const list = [];
  for (const r of rows) {
    if (!r.includes('[[File:')) continue;
    const parts = r.split(/\n\|/).map((p) => p.trim());
    const fileCell = parts.find((p) => p.includes('[[File:'));
    if (!fileCell) continue;

    const fileMatch = fileCell.match(/\[\[File:([^|\]]+)/i);
    const linkMatch = fileCell.match(/link=([^|\]]+)/i);

    const fileIdx = parts.indexOf(fileCell);
    const nameCell = parts[fileIdx + 1] || '';
    const rumorCell = parts[fileIdx + 2] || '';

    const cleanName = nameCell.replace(/^style="[^"]*"\s*\|\s*/, '');
    let realName = '';
    let title = '';
    if (cleanName.includes('<br>')) {
      const sp = cleanName.split(/<br\s*\/?>/i);
      realName = sp[0]
        .replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1')
        .replace(/['\n]/g, '')
        .trim();
      title = sp[1]
        .replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1')
        .replace(/['\n]/g, '')
        .trim();
    } else {
      realName = cleanName
        .replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1')
        .replace(/['\n]/g, '')
        .trim();
      title = realName;
    }

    const cleanRumor = rumorCell
      .replace(/^style="[^"]*"\s*\|\s*/, '')
      .replace(/''/g, '')
      .replace(/\n/g, ' ')
      .trim();

    list.push({
      fileName: fileMatch ? fileMatch[1].trim() : '',
      link: linkMatch ? linkMatch[1].trim() : title,
      realName,
      title,
      rumor: cleanRumor,
    });
  }
  return list;
}

async function run() {
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

  const survs = [...parseSection(s9), ...parseSection(s10)];
  const hunts = [...parseSection(h7), ...parseSection(h8)];

  fs.writeFileSync(
    path.join(__dirname, 'official_roster.json'),
    JSON.stringify({ survs, hunts }, null, 2),
    'utf8'
  );

  console.log(`Saved official roster: ${survs.length} Survivors, ${hunts.length} Hunters.`);
}

run();
