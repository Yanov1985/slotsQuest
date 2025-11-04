const fs = require('fs');
const path = require('path');

// Функция для исправления файла mechanics.service.ts
function fixMechanicsService() {
  const filePath = path.join(__dirname, 'src', 'mechanics', 'mechanics.service.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Исправляем работу с SlotMechanic через prisma.slotMechanic
  if (content.includes('await prisma.mechanics.delete({')) {
    content = content.replace(/await prisma\.mechanics\.delete\(\{/g, 'await prisma.slotMechanic.delete({');
    changed = true;
  }
  
  // Исправляем поиск связи SlotMechanic
  if (content.includes('await this.prisma.mechanics.findFirst({')) {
    content = content.replace(/await this\.prisma\.mechanics\.findFirst\(\{/g, 'await this.prisma.slotMechanic.findFirst({');
    changed = true;
  }
  
  // Исправляем создание связи SlotMechanic
  if (content.includes('await this.prisma.mechanics.create({')) {
    content = content.replace(/await this\.prisma\.mechanics\.create\(\{/g, 'await this.prisma.slotMechanic.create({');
    changed = true;
  }
  
  // Исправляем удаление связи SlotMechanic
  if (content.includes('await this.prisma.mechanics.delete({')) {
    content = content.replace(/await this\.prisma\.mechanics\.delete\(\{/g, 'await this.prisma.slotMechanic.delete({');
    changed = true;
  }
  
  // Убираем provider из SlotMechanicInclude (его там нет)
  if (content.includes('provider: true,')) {
    content = content.replace(/\s*provider: true,/g, '');
    changed = true;
  }
  
  // Исправляем where условие для SlotMechanic
  if (content.includes('slot_id: slotId,') && content.includes('mechanic_id: mechanicId')) {
    // Это правильно для SlotMechanic
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
  console.log('🔧 ИСПРАВЛЕНИЕ СЕРВИСА MECHANICS');
  console.log('================================');
  
  if (fixMechanicsService()) {
    console.log('\n✅ Исправления завершены!');
    console.log('💡 Теперь приложение должно запуститься');
  } else {
    console.log('\n✅ Файл уже корректен!');
  }
}

main();