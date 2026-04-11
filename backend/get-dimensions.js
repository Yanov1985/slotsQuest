const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function go() {
  const dir = path.join(__dirname, '../frontend/public/slots');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg'));
  
  const searchPattern = ['astronaut', 'turbo-mines', 'sweet-bonanza'];
  for(let pattern of searchPattern) {
    const matched = files.find(f => f.includes(pattern));
    if(matched) {
      try {
        const meta = await sharp(path.join(dir, matched)).metadata();
        console.log(`[${matched}] -> ${meta.width}x${meta.height}`);
      } catch(e) {
        console.log(`[${matched}] -> ERR: ${e.message}`);
      }
    }
  }
}
go().catch(console.error);
