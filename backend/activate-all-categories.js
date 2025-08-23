require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function activateAllCategories() {
  try {
    console.log('Подключаюсь к базе данных...');

    // Получаем все категории
    const categories = await prisma.slot_categories.findMany();
    console.log(`Найдено категорий: ${categories.length}`);

    // Обновляем все категории, делая их активными
    const result = await prisma.slot_categories.updateMany({
      data: {
        is_active: true,
        updated_at: new Date()
      }
    });

    console.log(`✅ Успешно активировано ${result.count} категорий!`);

    // Проверяем результат
    const activeCategories = await prisma.slot_categories.findMany({
      where: { is_active: true }
    });
    
    console.log(`\n📊 Статистика:`);
    console.log(`Всего категорий: ${categories.length}`);
    console.log(`Активных категорий: ${activeCategories.length}`);
    
    console.log('\n📋 Активированные категории:');
    activeCategories.forEach(category => {
      console.log(`  - ${category.name} (${category.slug})`);
    });

  } catch (error) {
    console.error('❌ Ошибка при активации категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

activateAllCategories();