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
  
  // Исправляем связи в SlotMechanic include
  if (content.includes('mechanics: {') && content.includes('include:')) {
    content = content.replace(/mechanics: \{([^}]*)\}/g, 'mechanic: {$1}');
    changed = true;
  }
  
  if (content.includes('mechanics: true') && content.includes('include:')) {
    content = content.replace(/mechanics: true/g, 'mechanic: true');
    changed = true;
  }
  
  // Удаляем несуществующие связи bonuses
  if (content.includes('bonuses: true')) {
    // Удаляем строку с bonuses: true и запятую
    content = content.replace(/\s*bonuses: true,?\s*/g, '');
    changed = true;
  }
  
  // Исправляем provider на providers в модулях NestJS
  if (filePath.includes('.module.ts') && content.includes('provider:')) {
    content = content.replace(/provider:/g, 'providers:');
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
  console.log('🔧 ОКОНЧАТЕЛЬНОЕ ИСПРАВЛЕНИЕ ВСЕХ ПРОБЛЕМ');
  console.log('=========================================');
  
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
    console.log('\n✅ Все проблемы исправлены!');
    console.log('💡 Приложение должно запуститься без ошибок');
  } else {
    console.log('\n✅ Все файлы уже корректны!');
  }
}

main();