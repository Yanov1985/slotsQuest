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
  
  // Исправляем названия моделей Prisma
  if (content.includes('this.prisma.mechanics')) {
    content = content.replace(/this\.prisma\.mechanics/g, 'this.prisma.mechanic');
    changed = true;
  }
  
  if (content.includes('this.prisma.bonuses')) {
    content = content.replace(/this\.prisma\.bonuses/g, 'this.prisma.bonus');
    changed = true;
  }
  
  if (content.includes('this.prisma.features')) {
    content = content.replace(/this\.prisma\.features/g, 'this.prisma.feature');
    changed = true;
  }
  
  if (content.includes('this.prisma.themes')) {
    content = content.replace(/this\.prisma\.themes/g, 'this.prisma.theme');
    changed = true;
  }
  
  if (content.includes('this.prisma.providers')) {
    content = content.replace(/this\.prisma\.providers/g, 'this.prisma.provider');
    changed = true;
  }
  
  if (content.includes('this.prisma.slots')) {
    content = content.replace(/this\.prisma\.slots/g, 'this.prisma.slot');
    changed = true;
  }
  
  if (content.includes('this.prisma.categories')) {
    content = content.replace(/this\.prisma\.categories/g, 'this.prisma.category');
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
  console.log('🔧 ИСПРАВЛЕНИЕ НАЗВАНИЙ МОДЕЛЕЙ PRISMA');
  console.log('======================================');
  
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