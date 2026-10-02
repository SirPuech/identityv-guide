const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../public/images/heroes');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const characters = [
  // Survivors
  { id: 'mechanic', name: 'Mechanic', role: 'Decoder', color1: '#059669', color2: '#10B981', glyph: '⚙️', type: 'survivor' },
  { id: 'seer', name: 'Seer', role: 'Support', color1: '#2563EB', color2: '#38BDF8', glyph: '🦉', type: 'survivor' },
  { id: 'priestess', name: 'Priestess', role: 'Support', color1: '#7C3AED', color2: '#A78BFA', glyph: '🌀', type: 'survivor' },
  { id: 'mercenary', name: 'Mercenary', role: 'Rescuer', color1: '#0D9488', color2: '#2DD4BF', glyph: '🛡️', type: 'survivor' },
  { id: 'perfumer', name: 'Perfumer', role: 'Kiter', color1: '#DB2777', color2: '#F472B6', glyph: '✨', type: 'survivor' },
  { id: 'coordinator', name: 'Coordinator', role: 'Rescuer', color1: '#D97706', color2: '#FBBF24', glyph: '🔫', type: 'survivor' },
  { id: 'prospector', name: 'Prospector', role: 'Kiter', color1: '#EA580C', color2: '#FB923C', glyph: '🧲', type: 'survivor' },
  { id: 'forward', name: 'Forward', role: 'Rescuer', color1: '#DC2626', color2: '#F87171', glyph: '🏈', type: 'survivor' },
  { id: 'enchantress', name: 'Enchantress', role: 'Kiter', color1: '#6D28D9', color2: '#9333EA', glyph: '💀', type: 'survivor' },
  { id: 'doctor', name: 'Doctor', role: 'Support', color1: '#0891B2', color2: '#22D3EE', glyph: '💉', type: 'survivor' },
  { id: 'gardener', name: 'Gardener', role: 'Support', color1: '#16A34A', color2: '#4ADE80', glyph: '🧰', type: 'survivor' },
  { id: 'thief', name: 'Thief', role: 'Kiter', color1: '#CA8A04', color2: '#FACC15', glyph: '🔦', type: 'survivor' },
  { id: 'lawyer', name: 'Lawyer', role: 'Decoder', color1: '#475569', color2: '#94A3B8', glyph: '🗺️', type: 'survivor' },
  { id: 'magician', name: 'Magician', role: 'Kiter', color1: '#4338CA', color2: '#818CF8', glyph: '🎩', type: 'survivor' },
  { id: 'explorer', name: 'Explorer', role: 'Decoder', color1: '#65A30D', color2: '#A3E635', glyph: '📖', type: 'survivor' },
  { id: 'minds-eye', name: "Mind's Eye", role: 'Decoder', color1: '#0284C7', color2: '#38BDF8', glyph: '🦯', type: 'survivor' },
  { id: 'cowboy', name: 'Cowboy', role: 'Support', color1: '#B45309', color2: '#F59E0B', glyph: '🤠', type: 'survivor' },
  { id: 'female-dancer', name: 'Female Dancer', role: 'Support', color1: '#C026D3', color2: '#E879F9', glyph: '🎵', type: 'survivor' },
  { id: 'embalmer', name: 'Embalmer', role: 'Support', color1: '#334155', color2: '#64748B', glyph: '⚰️', type: 'survivor' },
  { id: 'acrobat', name: 'Acrobat', role: 'Kiter', color1: '#E11D48', color2: '#FB7185', glyph: '🎪', type: 'survivor' },
  { id: 'first-officer', name: 'First Officer', role: 'Rescuer', color1: '#1E40AF', color2: '#60A5FA', glyph: '⚓', type: 'survivor' },
  { id: 'barmaid', name: 'Barmaid', role: 'Support', color1: '#B91C1C', color2: '#F87171', glyph: '🍸', type: 'survivor' },
  { id: 'postman', name: 'Postman', role: 'Support', color1: '#D97706', color2: '#FCD34D', glyph: '✉️', type: 'survivor' },
  { id: 'grave-keeper', name: 'Grave Keeper', role: 'Rescuer', color1: '#4B5563', color2: '#9CA3AF', glyph: '⛏️', type: 'survivor' },
  { id: 'prisoner', name: '"Prisoner"', role: 'Decoder', color1: '#0D9488', color2: '#2DD4BF', glyph: '⚡', type: 'survivor' },
  { id: 'batter', name: 'Batter', role: 'Rescuer', color1: '#C2410C', color2: '#FB923C', glyph: '🏏', type: 'survivor' },
  { id: 'patient', name: 'Patient', role: 'Kiter', color1: '#1F2937', color2: '#4B5563', glyph: '🪝', type: 'survivor' },
  { id: 'psychologist', name: '"Psychologist"', role: 'Support', color1: '#BE185D', color2: '#F472B6', glyph: '🔔', type: 'survivor' },
  { id: 'little-girl', name: '"Little Girl"', role: 'Support', color1: '#EC4899', color2: '#FBCFE8', glyph: '🎀', type: 'survivor' },
  { id: 'antiquarian', name: 'Antiquarian', role: 'Kiter', color1: '#047857', color2: '#34D399', glyph: '🎋', type: 'survivor' },
  { id: 'composer', name: 'Composer', role: 'Decoder', color1: '#4338CA', color2: '#A5B4FC', glyph: '🎼', type: 'survivor' },
  { id: 'journalist', name: 'Journalist', role: 'Rescuer', color1: '#9A3412', color2: '#FDBA74', glyph: '📸', type: 'survivor' },
  { id: 'cheerleader', name: 'Cheerleader', role: 'Support', color1: '#E11D48', color2: '#FDA4AF', glyph: '📣', type: 'survivor' },
  { id: 'puppet-master', name: 'Puppet Master', role: 'Rescuer', color1: '#701A75', color2: '#D946EF', glyph: '🎭', type: 'survivor' },

  // Hunters
  { id: 'sculptor', name: 'Sculptor', role: 'Control', color1: '#991B1B', color2: '#EF4444', glyph: '🗿', type: 'hunter' },
  { id: 'dream-witch', name: 'Dream Witch', role: 'Control', color1: '#581C87', color2: '#A855F7', glyph: '🐍', type: 'hunter' },
  { id: 'geisha', name: 'Geisha', role: 'Chase', color1: '#B91C1C', color2: '#F87171', glyph: '🦋', type: 'hunter' },
  { id: 'photographer', name: 'Photographer', role: 'Control', color1: '#1E3A8A', color2: '#60A5FA', glyph: '📷', type: 'hunter' },
  { id: 'wu-chang', name: 'Wu Chang', role: 'Patrol', color1: '#111827', color2: '#6B7280', glyph: '☂️', type: 'hunter' },
  { id: 'hell-ember', name: 'Hell Ember', role: 'Camp', color1: '#7F1D1D', color2: '#DC2626', glyph: '🔥', type: 'hunter' },
  { id: 'ripper', name: 'The Ripper', role: 'Chase', color1: '#0F172A', color2: '#38BDF8', glyph: '🗡️', type: 'hunter' },
  { id: 'smiley-face', name: 'Smiley Face', role: 'Chase', color1: '#9A3412', color2: '#F97316', glyph: '🚀', type: 'hunter' },
  { id: 'gamekeeper', name: 'Gamekeeper', role: 'Chase', color1: '#78350F', color2: '#D97706', glyph: '⛓️', type: 'hunter' },
  { id: 'soul-weaver', name: 'Soul Weaver', role: 'Chase', color1: '#312E81', color2: '#6366F1', glyph: '🕸️', type: 'hunter' },
  { id: 'feaster', name: 'The Feaster', role: 'Camp', color1: '#14532D', color2: '#22C55E', glyph: '🐙', type: 'hunter' },
  { id: 'axe-boy', name: 'Axe Boy', role: 'Chase', color1: '#713F12', color2: '#EAB308', glyph: '🪓', type: 'hunter' },
  { id: 'bloody-queen', name: 'Bloody Queen', role: 'Chase', color1: '#831843', color2: '#F43F5E', glyph: '🪞', type: 'hunter' },
  { id: 'guard-26', name: 'Guard 26', role: 'Camp', color1: '#451A03', color2: '#F59E0B', glyph: '💣', type: 'hunter' },
  { id: 'disciple', name: '"Disciple"', role: 'Chase', color1: '#1E1B4B', color2: '#818CF8', glyph: '🐈‍⬛', type: 'hunter' },
  { id: 'violinist', name: 'Violinist', role: 'Chase', color1: '#4A044E', color2: '#C026D3', glyph: '🎻', type: 'hunter' },
  { id: 'breaking-wheel', name: 'Breaking Wheel', role: 'Chase', color1: '#3F3F46', color2: '#A1A1AA', glyph: '☸️', type: 'hunter' },
  { id: 'naiad', name: 'Naiad', role: 'Control', color1: '#064E3B', color2: '#10B981', glyph: '🔱', type: 'hunter' },
  { id: 'wax-artist', name: 'Wax Artist', role: 'Control', color1: '#78350F', color2: '#FBBF24', glyph: '🕯️', type: 'hunter' },
  { id: 'night-watch', name: 'Night Watch', role: 'Chase', color1: '#0C4A6E', color2: '#38BDF8', glyph: '❄️', type: 'hunter' },
  { id: 'opera-singer', name: 'Opera Singer', role: 'Chase', color1: '#4C0519', color2: '#E11D48', glyph: '🎭', type: 'hunter' },
  { id: 'hermit', name: 'Hermit', role: 'Control', color1: '#1E293B', color2: '#38BDF8', glyph: '⚡', type: 'hunter' },
  { id: 'clerk', name: 'Clerk', role: 'Control', color1: '#1C1917', color2: '#78716C', glyph: '⚖️', type: 'hunter' },
  { id: 'fools-gold', name: '"Fool\'s Gold"', role: 'Chase', color1: '#7C2D12', color2: '#F97316', glyph: '⛏️', type: 'hunter' },
  { id: 'the-shadow', name: 'The Shadow', role: 'Control', color1: '#2E1065', color2: '#8B5CF6', glyph: '👁️', type: 'hunter' }
];

characters.forEach((char) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 400" width="320" height="400">
  <defs>
    <linearGradient id="bgGrad_${char.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${char.color1}" />
      <stop offset="100%" stop-color="${char.color2}" />
    </linearGradient>
    <radialGradient id="glow_${char.id}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.22)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.6)" />
    </radialGradient>
    <filter id="shadow_${char.id}">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(0,0,0,0.7)" />
    </filter>
  </defs>

  <!-- Deep Onyx Canvas -->
  <rect width="320" height="400" fill="#0F172A" rx="16" />
  <rect width="320" height="400" fill="url(#bgGrad_${char.id})" opacity="0.28" rx="16" />
  <rect width="320" height="400" fill="url(#glow_${char.id})" rx="16" />

  <!-- Outer Kinetic Border -->
  <rect x="2" y="2" width="316" height="396" fill="none" stroke="${char.color2}" stroke-width="2" opacity="0.4" rx="14" />
  
  <!-- Identity V Corner Stitches / Accent Lines -->
  <line x1="16" y1="26" x2="36" y2="26" stroke="${char.color2}" stroke-width="3" stroke-linecap="round" />
  <line x1="26" y1="16" x2="26" y2="36" stroke="${char.color2}" stroke-width="3" stroke-linecap="round" />
  
  <line x1="284" y1="26" x2="304" y2="26" stroke="${char.color2}" stroke-width="3" stroke-linecap="round" />
  <line x1="294" y1="16" x2="294" y2="36" stroke="${char.color2}" stroke-width="3" stroke-linecap="round" />

  <!-- Role Emblem Badge -->
  <rect x="18" y="44" width="80" height="24" rx="12" fill="rgba(15,23,42,0.85)" stroke="${char.color2}" stroke-width="1" />
  <text x="58" y="60" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${char.color2}" text-anchor="middle" letter-spacing="1">
    ${char.role.toUpperCase()}
  </text>

  <!-- Type Badge -->
  <circle cx="286" cy="56" r="8" fill="${char.type === 'survivor' ? '#10B981' : '#EF4444'}" />

  <!-- Central Silhouette / Avatar Circle -->
  <g filter="url(#shadow_${char.id})">
    <circle cx="160" cy="180" r="84" fill="#111827" stroke="${char.color2}" stroke-width="3" />
    <circle cx="160" cy="180" r="76" fill="url(#bgGrad_${char.id})" opacity="0.85" />
    
    <!-- Identity V Button Eyes motif -->
    <circle cx="140" cy="165" r="14" fill="#0F172A" stroke="#F8FAFC" stroke-width="3" />
    <line x1="135" y1="160" x2="145" y2="170" stroke="#F8FAFC" stroke-width="2" />
    <line x1="145" y1="160" x2="135" y2="170" stroke="#F8FAFC" stroke-width="2" />

    <circle cx="180" cy="165" r="14" fill="#0F172A" stroke="#F8FAFC" stroke-width="3" />
    <line x1="175" y1="160" x2="185" y2="170" stroke="#F8FAFC" stroke-width="2" />
    <line x1="185" y1="160" x2="175" y2="170" stroke="#F8FAFC" stroke-width="2" />

    <!-- Stitched Smile -->
    <path d="M 132 205 Q 160 220 188 205" fill="none" stroke="#0F172A" stroke-width="4" stroke-linecap="round" />
    <line x1="142" y1="202" x2="142" y2="216" stroke="#0F172A" stroke-width="2" />
    <line x1="152" y1="205" x2="152" y2="219" stroke="#0F172A" stroke-width="2" />
    <line x1="168" y1="205" x2="168" y2="219" stroke="#0F172A" stroke-width="2" />
    <line x1="178" y1="202" x2="178" y2="216" stroke="#0F172A" stroke-width="2" />

    <!-- Feature Glyph Badge -->
    <circle cx="216" cy="236" r="22" fill="#0F172A" stroke="${char.color2}" stroke-width="2" />
    <text x="216" y="244" font-size="20" text-anchor="middle">${char.glyph}</text>
  </g>

  <!-- Hero Name Label -->
  <text x="160" y="318" font-family="'Outfit', sans-serif" font-size="26" font-weight="800" fill="#F8FAFC" text-anchor="middle" letter-spacing="0.5">
    ${char.name}
  </text>
  
  <text x="160" y="342" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" fill="${char.color2}" text-anchor="middle" letter-spacing="2">
    IDENTITY V • ${char.type.toUpperCase()}
  </text>

  <!-- Bottom Accent bar -->
  <rect x="60" y="366" width="200" height="4" rx="2" fill="${char.color2}" opacity="0.6" />
</svg>`;

  fs.writeFileSync(path.join(targetDir, `${char.id}.svg`), svg, 'utf8');
});

console.log(`Generated ${characters.length} character portraits in ${targetDir}`);
