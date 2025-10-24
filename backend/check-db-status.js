const { PrismaClient } = require('@prisma/client');

async function checkDatabaseStatus() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Проверяю состояние базы данных...\n');
    
    const slots = await prisma.slots.count();
    const providers = await prisma.providers.count();
    const categories = await prisma.slot_categories.count();
    const themes = await prisma.themes.count();
    const mechanics = await prisma.mechanics.count();
    const bonuses = await prisma.bonuses.count();
    
    console.log('📊 Количество записей в таблицах:');
    console.log(`   Слоты (slots): ${slots}`);
    console.log(`   Провайдеры (providers): ${providers}`);
    console.log(`   Категории (categories): ${categories}`);
    console.log(`   Темы (themes): ${themes}`);
    console.log(`   Механики (mechanics): ${mechanics}`);
    console.log(`   Бонусы (bonuses): ${bonuses}`);
    
    const totalRecords = slots + providers + categories + themes + mechanics + bonuses;
    console.log(`\n📈 Общее количество записей: ${totalRecords}`);
    
    if (totalRecords === 0) {
      console.log('\n❌ База данных пуста! Все данные потеряны.');
    } else if (slots === 0) {
      console.log('\n⚠️  Слоты отсутствуют, но другие данные есть.');
    } else {
      console.log('\n✅ Данные присутствуют в базе.');
    }
    
  } catch (error) {
    console.error('❌ Ошибка при проверке базы данных:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabaseStatus();