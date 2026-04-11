import fs from 'fs';

const data = JSON.parse(fs.readFileSync('node_modules/@iconify-json/solar/icons.json', 'utf8'));
const icons = Object.keys(data.icons);
const search = [
  'sort-from-top-to-bottom-line-duotone',
  'alt-arrow-down-line-duotone',
  'ghost-line-duotone',
  'gamepad-line-duotone',
  'fire-line-duotone',
  'star-fall-line-duotone',
  'crown-line-duotone',
  'ranking-line-duotone',
  'gamepad-bold',
  'fire-bold',
  'star-fall-bold'
];

console.log('--- FOUND ICONS ---');
search.forEach(s => {
  if (icons.includes(s)) console.log(`[OK] ${s}`);
  else console.log(`[MISSING] ${s}`);
});

const possibleMatches = (term) => icons.filter(i => i.includes(term));
console.log('\n--- SUGGESTIONS ---');
['sort', 'arrow', 'ghost', 'gamepad', 'fire', 'star', 'crown', 'ranking'].forEach(term => {
   console.log(`Searching for "${term}":`);
   console.log(possibleMatches(term).slice(0, 5).join(', '));
});
