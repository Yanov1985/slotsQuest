const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `alert(\`Save error: \${error.message || error}\\n\\nDetails: \${error.response?._data?.message || 'None'}\`)`;
const replaceStr = `prompt('Ошибка сохранения! Нажмите Ctrl+C / Cmd+C чтобы скопировать этот текст и отправьте мне:', error.response?._data?.message || error.message)`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully changed alert to prompt!');
} else {
  console.log('Could not find the target alert string.');
}
