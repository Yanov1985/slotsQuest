const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
const content = fs.readFileSync(filePath, 'utf8');

const tStart = content.indexOf('<form');
const tEnd = content.indexOf('</form>');
if (tStart === -1 || tEnd === -1) {
  console.log('Could not find form tags:', tStart, tEnd);
  process.exit(1);
}

const formContent = content.substring(tStart, tEnd);
const openDivMatches = formContent.match(/<div[\s>]/g) || [];
const closeDivMatches = formContent.match(/<\/div>/g) || [];

console.log('Inside <form> block:');
console.log('Total <div opening tags:', openDivMatches.length);
console.log('Total </div> closing tags:', closeDivMatches.length);
console.log('Difference:', openDivMatches.length - closeDivMatches.length);
