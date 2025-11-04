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
  
  // Исправляем неправильные имена связей в include/select
  const relationFixes = [
    // Неправильные имена связей -> правильные
    { from: /slot_mechanics:/g, to: 'mechanics:' },
    { from: /slot_bonuses:/g, to: 'bonuses:' }, // если есть такая связь
    { from: /slot_features:/g, to: 'features:' }, // если есть такая связь
    { from: /slot_categories:/g, to: 'category:' },
    { from: /themes:/g, to: 'themeRelation:' },
    { from: /providers:/g, to: 'provider:' },
    { from: /categories:/g, to: 'category:' },
  ];
  
  relationFixes.forEach(fix => {
    if (fix.from.test(content)) {
      content = content.replace(fix.from, fix.to);
      changed = true;
    }
  });
  
  // Исправляем доступ к полям в коде
  const fieldAccessFixes = [
    { from: /\.themes\b/g, to: '.themeRelation' },
    { from: /\.providers\b/g, to: '.provider' },
    { from: /\.categories\b/g, to: '.category' },
    { from: /\.slot_mechanics\b/g, to: '.mechanics' },
  ];
  
  fieldAccessFixes.forEach(fix => {
    if (fix.from.test(content)) {
      content = content.replace(fix.from, fix.to);
      changed = true;
    }
  });
  
  // Исправляем проблему с rating - убеждаемся что это строка
  if (content.includes('rating: updatedRating') && !content.includes('rating: updatedRating.toString()')) {
    content = content.replace(/rating: updatedRating([,\s])/g, 'rating: updatedRating.toString()$1');
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
  console.log('🔧 ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ СВЯЗЕЙ PRISMA');
  console.log('=====================================');
  
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
    console.log('\n✅ Финальные исправления завершены!');
    console.log('💡 Теперь приложение должно запуститься без ошибок');
  } else {
    console.log('\n✅ Все связи уже корректны!');
  }
}

main();