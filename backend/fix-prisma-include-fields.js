const fs = require('fs');
const path = require('path');

// Маппинг неправильных имен полей на правильные
const fieldNameMapping = {
  'providers: true': 'provider: true',
  'mechanics: true': 'slot_mechanics: true', // Это связь через промежуточную таблицу
  'themes: true': 'theme: true',
  'slots: true': 'slot: true'
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
  
  // Заменяем неправильные имена полей в include/select
  Object.entries(fieldNameMapping).forEach(([wrongField, correctField]) => {
    if (content.includes(wrongField)) {
      // Специальная обработка для mechanics - не заменяем если уже есть slot_mechanics
      if (wrongField === 'mechanics: true' && content.includes('slot_mechanics: true')) {
        return;
      }
      
      content = content.replace(new RegExp(wrongField.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), correctField);
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
  console.log('🔧 ИСПРАВЛЕНИЕ ИМЕН ПОЛЕЙ В INCLUDE/SELECT');
  console.log('==========================================');
  
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