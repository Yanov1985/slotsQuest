const fs = require('fs');
const path = require('path');

console.log('🔧 ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ MECHANICS SERVICE');
console.log('==========================================');

const filePath = path.join(__dirname, 'src', 'mechanics', 'mechanics.service.ts');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Исправляем _count.mechanics на _count.slotMechanics
  content = content.replace(/_count:\s*{\s*mechanics:\s*true\s*}/g, '_count: { slotMechanics: true }');
  
  // Исправляем prisma.mechanics на prisma.mechanic
  content = content.replace(/prisma\.mechanics/g, 'prisma.mechanic');
  
  // Исправляем where: { id } для SlotMechanic на правильный composite key
  content = content.replace(
    /await\s+prisma\.slotMechanic\.delete\(\s*{\s*where:\s*{\s*id\s*}\s*}\s*\);/g,
    `await prisma.slotMechanic.deleteMany({
        where: {
          slot_id: slotId
        }
      });`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Исправлен файл: ${filePath}`);
} else {
  console.log(`❌ Файл не найден: ${filePath}`);
}

console.log('\n✅ Финальные исправления завершены!');
console.log('💡 Теперь приложение должно запуститься без ошибок');