const fs = require('fs');

const diff = fs.readFileSync('d:/www/Projects/2025/SlotQuest/diff2.txt', 'utf8');
const lines = diff.split('\n');

let capturing = false;
let twitterCardHtml = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Find where Twitter Card starts in the deleted block
  if (line.includes('-                    <!-- Twitter Card -->')) {
    capturing = true;
  }
  
  if (capturing) {
    if (line.startsWith('-')) {
      twitterCardHtml.push(line.substring(1));
    } else if (line.startsWith(' ') || line.startsWith('+')) {
      // Keep going if it's space, stop if we hit Main Hero section
      if (line.includes('<!-- Main Hero section')) {
        break;
      }
      if (line.startsWith('+')) {
        continue;
      }
      twitterCardHtml.push(line.substring(1));
    }
  }
  
  if (capturing && line.includes('<!-- Main Hero section (collapsible) -->')) {
    break;
  }
}

fs.writeFileSync('d:/www/Projects/2025/SlotQuest/twitter_card_original.txt', twitterCardHtml.join('\n'));
console.log('Extracted ' + twitterCardHtml.length + ' lines for Twitter Card.');
