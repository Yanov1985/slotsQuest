const fs = require('fs');
const sharp = require('sharp');
const fetch = require('node-fetch');

async function testSrc() {
  const data = JSON.parse(fs.readFileSync('bluechip_popular.json', 'utf8'));
  console.log('Testing ALL images for weird ratios:');
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    try {
        const res = await fetch(item.mobileImage);
        const buf = Buffer.from(await res.arrayBuffer());
        const meta = await sharp(buf).metadata();
        const ratio = meta.width / meta.height;
        if (ratio > 0.8) {
             console.log(`[${item.name}] IRREGULAR: ${meta.width}x${meta.height} (Ratio: ${ratio.toFixed(2)})`);
        }
    } catch(e) {}
  }
  console.log('Done.');
}
testSrc();
