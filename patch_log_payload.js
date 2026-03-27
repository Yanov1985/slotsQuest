const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// Inject console.log before the fetch
const searchStr = `    const response = await fetch(\`http://localhost:3001/api/slots/\${slotId}\``;
const replaceStr = `    console.log('Sending payload:', JSON.stringify(payload, null, 2));\n    const response = await fetch(\`http://localhost:3001/api/slots/\${slotId}\``;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully injected payload logger!');
} else {
  console.log('Failed to find fetch call!');
}
