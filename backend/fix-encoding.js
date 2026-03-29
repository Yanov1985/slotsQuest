const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'migration.sql');
const targetFile = 'C:\\Users\\yanov\\.gemini\\antigravity\\brain\\7fc4105c-9963-4b80-8c1c-de67646cef7e\\browser\\migration.sql';

try {
  // Проще всего прочитать файл как буфер и проверить BOM (Byte Order Mark)
  const buffer = fs.readFileSync(sourceFile);
  
  let content = '';
  // Если это UTF-16LE (BOM: FF FE) или PowerShell default
  if ((buffer[0] === 0xFF && buffer[1] === 0xFE) || buffer.length > 0 && buffer[1] === 0) {
      content = buffer.toString('utf16le');
  } else {
      content = buffer.toString('utf8');
  }

  // Очищаем потенциальные артефакты от BOM
  content = content.replace(/^\uFEFF/, '');
  
  fs.writeFileSync(targetFile, content, 'utf8');
  console.log('✅ File converted and copied to sandbox as UTF-8!');
} catch (err) {
  console.error('❌ Error converting file:', err);
}
