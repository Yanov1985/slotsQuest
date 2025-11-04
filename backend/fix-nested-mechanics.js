const fs = require('fs');
const path = require('path');

// Функция для рекурсивного поиска файлов
function findFiles(dir, extension = '.ts') {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(filePath, extension));
    } else if (file.endsWith(extension)) {
      results.push(filePath);
    }
  });
  
  return results;
}

// Функция для исправления файла
function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Исправляем вложенные mechanics в include
  // mechanics: { include: { mechanics: true } } -> mechanics: { include: { mechanic: true } }
  if (content.includes('mechanics: {\n            include: {\n              mechanics: true,')) {
    content = content.replace(/mechanics: \{\s*include: \{\s*mechanics: true,/g, 'mechanics: {\n            include: {\n              mechanic: true,');
    changed = true;
  }
  
  // Удаляем несуществующие bonuses include
  if (content.includes('bonuses: {\n            include: {},\n          },')) {
    content = content.replace(/bonuses: \{\s*include: \{\},?\s*\},?\s*/g, '');
    changed = true;
  }
  
  // Исправляем mode для SQLite (SQLite не поддерживает mode: 'insensitive')
  if (content.includes("mode: 'insensitive'")) {
    content = content.replace(/mode: 'insensitive'/g, '');
    // Убираем лишние запятые
    content = content.replace(/,\s*\}/g, ' }');
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Исправлен файл: ${filePath}`);
    return true;
  }
  
  return false;
}

// Основная функция
function main() {
  console.log('🔧 ИСПРАВЛЕНИЕ ВЛОЖЕННЫХ MECHANICS');
  console.log('==================================');
  
  const srcDir = path.join(__dirname, 'src');
  const files = findFiles(srcDir);
  
  let fixedCount = 0;
  
  files.forEach(file => {
    if (fixFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n📊 РЕЗУЛЬТАТ:`);
  console.log(`   Проверено файлов: ${files.length}`);
  console.log(`   Исправлено файлов: ${fixedCount}`);
  
  if (fixedCount > 0) {
    console.log('\n✅ Исправления завершены!');
    console.log('💡 Теперь приложение должно запуститься');
  } else {
    console.log('\n✅ Все файлы уже корректны!');
  }
}

main();