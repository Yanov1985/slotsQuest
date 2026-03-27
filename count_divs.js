const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
const content = fs.readFileSync(filePath, 'utf8');

const tStart = content.indexOf('<template>');
const tEnd = content.indexOf('</template>');
if (tStart === -1) process.exit(1);

const htmlContent = content.substring(tStart, tEnd);

// Find all <div... and </div>
const openDivMatches = htmlContent.match(/<div[\s>]/g) || [];
const closeDivMatches = htmlContent.match(/<\/div>/g) || [];

console.log('Total <div opening tags:', openDivMatches.length);
console.log('Total </div> closing tags:', closeDivMatches.length);
console.log('Difference:', openDivMatches.length - closeDivMatches.length);
