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
  
  // Исправляем mechanic обратно на mechanics в include/select
  if (content.includes('mechanic: {') && content.includes('include:')) {
    content = content.replace(/mechanic: \{([^}]*)\}/g, 'mechanics: {$1}');
    changed = true;
  }
  
  if (content.includes('mechanic: true') && content.includes('include:')) {
    content = content.replace(/mechanic: true/g, 'mechanics: true');
    changed = true;
  }
  
  // Исправляем проблемы с форматированием
  if (content.includes('mechanic: true,themeRelation: true,')) {
    content = content.replace(/mechanic: true,themeRelation: true,/g, 'mechanics: true,\n          themeRelation: true,');
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
  console.log('🔧 ИСПРАВЛЕНИЕ MECHANICS ОБРАТНО');
  console.log('================================');
  
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