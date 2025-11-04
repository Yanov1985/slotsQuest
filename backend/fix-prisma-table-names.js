const fs = require('fs');
const path = require('path');

// Маппинг неправильных имен на правильные
const tableNameMapping = {
  'providers': 'provider',
  'mechanics': 'mechanic', 
  'themes': 'theme',
  'slots': 'slot'
};

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
  
  // Заменяем неправильные имена таблиц
  Object.entries(tableNameMapping).forEach(([wrongName, correctName]) => {
    const regex = new RegExp(`\\.prisma\\.${wrongName}\\b`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `.prisma.${correctName}`);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Исправлен файл: ${filePath}`);
    return true;
  }
  
  return false;
}

// Основная функция
function main() {
  console.log('🔧 ИСПРАВЛЕНИЕ ИМЕН ТАБЛИЦ PRISMA');
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
    console.log('\n✅ Исправления завершены успешно!');
    console.log('💡 Теперь можно перезапустить приложение');
  } else {
    console.log('\n✅ Все файлы уже корректны!');
  }
}

main();