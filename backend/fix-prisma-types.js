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
  
  // Исправляем PrismaClient типы
  if (content.includes("PrismaClient['providers']")) {
    content = content.replace(/PrismaClient\['providers'\]/g, "PrismaClient['provider']");
    changed = true;
  }
  
  if (content.includes("PrismaClient['slots']")) {
    content = content.replace(/PrismaClient\['slots'\]/g, "PrismaClient['slot']");
    changed = true;
  }
  
  // Исправляем rating как строку
  if (content.includes('rating },') && !content.includes('rating: rating.toString()')) {
    content = content.replace(/rating \}/g, 'rating: rating.toString() }');
    changed = true;
  }
  
  // Исправляем числовые значения rating в фильтрах
  if (content.includes('gte: 8,')) {
    content = content.replace(/gte: 8,/g, "gte: '8',");
    changed = true;
  }
  
  if (content.includes('gte: 4.5')) {
    content = content.replace(/gte: 4\.5/g, "gte: '4.5'");
    changed = true;
  }
  
  // Исправляем другие числовые значения rating
  const ratingNumberRegex = /gte:\s*(\d+(?:\.\d+)?)/g;
  if (ratingNumberRegex.test(content)) {
    content = content.replace(ratingNumberRegex, (match, number) => `gte: '${number}'`);
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
  console.log('🔧 ИСПРАВЛЕНИЕ ТИПОВ PRISMA');
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
    console.log('\n✅ Исправления завершены!');
    console.log('💡 Теперь приложение должно запуститься');
  } else {
    console.log('\n✅ Все файлы уже корректны!');
  }
}

main();