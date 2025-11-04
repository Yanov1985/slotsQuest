const fs = require('fs');
const path = require('path');

// Правильные имена связей согласно схеме Prisma
const relationMapping = {
  'provider: true': 'provider: true', // Правильно
  'theme: true': 'themeRelation: true', // В схеме это themeRelation
  'slot: true': 'slots: true', // Для обратной связи (один ко многим)
  'slot_mechanics: true': 'mechanics: true', // В схеме Slot это mechanics (SlotMechanic[])
};

// Дополнительные исправления для доступа к полям
const fieldAccessMapping = {
  'theme?.slots': 'theme?.slot', // Исправляем доступ к полям
  'theme?.slot': 'theme?.slots', // Обратно, если нужно
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
  
  // Исправляем связи в include/select
  Object.entries(relationMapping).forEach(([wrongRel, correctRel]) => {
    if (content.includes(wrongRel) && wrongRel !== correctRel) {
      content = content.replace(new RegExp(wrongRel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), correctRel);
      changed = true;
    }
  });
  
  // Исправляем доступ к полям
  Object.entries(fieldAccessMapping).forEach(([wrongAccess, correctAccess]) => {
    if (content.includes(wrongAccess)) {
      content = content.replace(new RegExp(wrongAccess.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), correctAccess);
      changed = true;
    }
  });
  
  // Исправляем тип rating с number на string
  if (content.includes('rating: updatedRating,') && content.includes('const updatedRating = Math.round')) {
    content = content.replace('rating: updatedRating,', 'rating: updatedRating.toString(),');
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
  console.log('🔧 ИСПРАВЛЕНИЕ СВЯЗЕЙ PRISMA');
  console.log('============================');
  
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