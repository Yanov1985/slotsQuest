const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend/pages/admin/slots/[id].vue');

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split(/\r?\n/);

console.log(`Original: ${lines.length} lines`);

// Keep lines 1-2107 (indexes 0-2106) and 2628-end (indexes 2627+)
// This removes lines 2108-2627 (indexes 2107-2626) - the author info section
const newLines = [...lines.slice(0, 2107), ...lines.slice(2627)];

console.log(`New: ${newLines.length} lines`);
console.log(`Removed: ${lines.length - newLines.length} lines`);

fs.writeFileSync(filePath, newLines.join('\r\n'), 'utf8');

console.log('Done!');
