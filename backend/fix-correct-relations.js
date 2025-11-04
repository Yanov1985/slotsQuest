const fs = require('fs');
const path = require('path');

console.log('🔧 ПРАВИЛЬНОЕ ИСПРАВЛЕНИЕ ОТНОШЕНИЙ');
console.log('===================================');

const filePath = path.join(__dirname, 'src', 'mechanics', 'mechanics.service.ts');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Исправляем все _count.mechanics на _count.slots (для Mechanic модели)
  content = content.replace(/mechanics:\s*true\s*}\s*}\s*}\s*\)\);/g, 'slots: true } } } });');
  
  // Исправляем where.slotMechanics обратно на where.mechanics (для Slot модели)
  content = content.replace(/where:\s*{\s*slotMechanics:\s*{/g, 'where: {\n        mechanics: {');
  
  // Исправляем where.mechanics на where.slots (для Mechanic модели в findSlotsByMechanic)
  // Ищем метод findSlotsByMechanic и исправляем там
  content = content.replace(
    /(async findSlotsByMechanic[\s\S]*?where:\s*{\s*)mechanics(\s*:\s*{[\s\S]*?some:\s*{[\s\S]*?mechanic_id:\s*mechanicId)/,
    '$1slots$2'
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Исправлен файл: ${filePath}`);
} else {
  console.log(`❌ Файл не найден: ${filePath}`);
}

console.log('\n✅ Правильные исправления отношений завершены!');
console.log('💡 Теперь приложение должно запуститься без ошибок');