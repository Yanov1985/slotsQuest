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
  
  // Исправляем slot_categories на category
  if (content.includes('slot_categories: true')) {
    content = content.replace(/slot_categories: true/g, 'category: true');
    changed = true;
  }
  
  // Исправляем доступ к slots в theme
  if (content.includes('theme?.slots')) {
    content = content.replace(/theme\?\.slots/g, 'theme?.slots');
    changed = true;
  }
  
  // Исправляем проблему с rating - конвертируем number в string
  if (content.includes('rating: updatedRating,')) {
    // Ищем строку с updatedRating и заменяем на toString()
    content = content.replace(/rating: updatedRating,/g, 'rating: updatedRating.toString(),');
    changed = true;
  }
  
  // Дополнительные исправления для связей
  const fixes = [
    // Исправляем неправильные имена связей
    { from: /mechanics: true,(\s*)\}/g, to: 'mechanics: true,$1}' },
    { from: /themeRelation: true/g, to: 'themeRelation: true' },
  ];
  
  fixes.forEach(fix => {
    if (fix.from.test(content)) {
      content = content.replace(fix.from, fix.to);
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
  console.log('🔧 ИСПРАВЛЕНИЕ ОСТАВШИХСЯ ПРОБЛЕМ');
  console.log('=================================');
  
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