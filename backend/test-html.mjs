import fs from 'fs';
async function run() {
  const r = await fetch('https://clashofslots.com/slots/bgaming/mummyland-treasures/');
  const t = await r.text();
  fs.writeFileSync('d:/www/Projects/2025/SlotQuest/backend/test.html', t);
  console.log('Saved to test.html');
}
run();
