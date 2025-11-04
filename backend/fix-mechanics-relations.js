const fs = require('fs');
const path = require('path');

console.log('🔧 ИСПРАВЛЕНИЕ ОТНОШЕНИЙ MECHANICS');
console.log('==================================');

const filePath = path.join(__dirname, 'src', 'mechanics', 'mechanics.service.ts');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Исправляем все _count.mechanics на _count.slotMechanics
  content = content.replace(/mechanics:\s*true\s*}\s*}\s*}\s*\)\);/g, 'slotMechanics: true } } } });');
  
  // Исправляем where.mechanics на where.slotMechanics
  content = content.replace(/where:\s*{\s*mechanics:\s*{/g, 'where: {\n        slotMechanics: {');
  
  // Исправляем mechanic_id в where для Mechanic модели
  content = content.replace(/where:\s*{\s*mechanic_id:\s*id\s*}/g, 'where: { id: id }');
  
  // Исправляем deleteMany для slotMechanics
  content = content.replace(
    /await\s+prisma\.slotMechanic\.deleteMany\(\s*{\s*where:\s*{\s*slot_id:\s*slotId\s*}\s*}\s*\);/g,
    `await this.prisma.slotMechanic.deleteMany({
        where: {
          mechanic_id: id
        }
      });`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Исправлен файл: ${filePath}`);
} else {
  console.log(`❌ Файл не найден: ${filePath}`);
}

console.log('\n✅ Исправления отношений завершены!');
console.log('💡 Теперь приложение должно запуститься без ошибок');