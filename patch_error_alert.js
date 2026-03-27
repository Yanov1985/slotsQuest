const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `alert(\`Save error: \${error.message || error}\`)`;
const replaceStr = `alert(\`Save error: \${error.message || error}\\n\\nDetails: \${error.response?._data?.message || 'None'}\`)`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully enhanced error reporting!');
} else {
  console.log('Failed to find error reporting line!');
}
