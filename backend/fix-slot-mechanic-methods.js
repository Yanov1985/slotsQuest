const fs = require('fs');
const path = require('path');

// Функция для исправления файла mechanics.service.ts
function fixSlotMechanicMethods() {
  const filePath = path.join(__dirname, 'src', 'mechanics', 'mechanics.service.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Исправляем тип в начале файла
  if (content.includes("PrismaClient['mechanics']['findFirst']")) {
    content = content.replace(/PrismaClient\['mechanics'\]\['findFirst'\]/g, "PrismaClient['mechanic']['findFirst']");
    changed = true;
  }
  
  // Исправляем методы addMechanicToSlot и removeMechanicFromSlot
  // Заменяем this.prisma.mechanic на this.prisma.slotMechanic в контексте связей
  
  // Исправляем поиск существующей связи
  const existingRelationPattern = /const existingRelation = await this\.prisma\.mechanic\.findFirst\(\{\s*where: \{\s*slot_id: slotId,\s*mechanic_id: mechanicId\s*\}\s*\}\);/g;
  if (existingRelationPattern.test(content)) {
    content = content.replace(existingRelationPattern, 
      `const existingRelation = await this.prisma.slotMechanic.findFirst({
      where: {
        slot_id: slotId,
        mechanic_id: mechanicId
      }
    });`);
    changed = true;
  }
  
  // Исправляем создание связи
  const createRelationPattern = /const relation = await this\.prisma\.mechanic\.create\(\{\s*data: \{\s*slot_id: slotId,\s*mechanic_id: mechanicId,\s*created_at: new Date\(\)\s*\},\s*include: \{\s*mechanics: true,\s*slots: \{\s*include: \{\s*themeRelation: true,\s*category: true\s*\}\s*\}\s*\}\s*\}\);/g;
  if (createRelationPattern.test(content)) {
    content = content.replace(createRelationPattern,
      `const relation = await this.prisma.slotMechanic.create({
        data: {
          slot_id: slotId,
          mechanic_id: mechanicId
        },
        include: {
          mechanic: true,
          slot: {
            include: {
              themeRelation: true,
              category: true
            }
          }
        }
      });`);
    changed = true;
  }
  
  // Исправляем поиск связи для удаления
  const findRelationPattern = /const relation = await this\.prisma\.mechanic\.findFirst\(\{\s*where: \{\s*slot_id: slotId,\s*mechanic_id: mechanicId\s*\}\s*\}\);/g;
  if (findRelationPattern.test(content)) {
    content = content.replace(findRelationPattern,
      `const relation = await this.prisma.slotMechanic.findFirst({
      where: {
        slot_id: slotId,
        mechanic_id: mechanicId
      }
    });`);
    changed = true;
  }
  
  // Исправляем удаление связи
  const deleteRelationPattern = /await this\.prisma\.mechanic\.delete\(\{\s*where: \{\s*slot_id_mechanic_id: \{\s*slot_id: slotId,\s*mechanic_id: mechanicId\s*\}\s*\}\s*\}\);/g;
  if (deleteRelationPattern.test(content)) {
    content = content.replace(deleteRelationPattern,
      `await this.prisma.slotMechanic.delete({
      where: {
        slot_id_mechanic_id: {
          slot_id: slotId,
          mechanic_id: mechanicId
        }
      }
    });`);
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
  console.log('🔧 ИСПРАВЛЕНИЕ МЕТОДОВ SLOTMECHANIC');
  console.log('===================================');
  
  if (fixSlotMechanicMethods()) {
    console.log('\n✅ Исправления завершены!');
    console.log('💡 Теперь приложение должно запуститься');
  } else {
    console.log('\n✅ Файл уже корректен!');
  }
}

main();