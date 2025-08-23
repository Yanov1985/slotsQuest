const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const categories = [
  'Top Games',
  'Popular',
  'Live Casino',
  'Slots',
  'New',
  'Kalamba Kash Drops',
  'Evoplay Big Adventures',
  'Endorphina E-Drops',
  '€5,000 from GameBeat',
  'Gamzix Spin-O-Mania',
  '3Oaks Turbo Wins',
  'Original games',
  'New Games',
  'Recommended Games',
  'Crash Games',
  'Roulette',
  'Discount',
  'Instant Games',
  'Quick games',
  'Jackpot Games',
  'Buy Bonus',
  'Megaways',
  'Table Games',
  'TV Games',
  '1w Games',
  'Best Year 2020',
  'Best Year 2021',
  'Best Year 2022',
  'Best Year 2023',
  'Best Year 2024',
  'All Games'
];

async function updateCategories() {
  try {
    console.log('🗑️ Очистка таблицы slot_categories...');

    // Удаляем все существующие категории
    await prisma.slot_categories.deleteMany({});
    console.log('✅ Таблица slot_categories очищена');

    console.log('📝 Добавление новых категорий...');

    // Добавляем новые категории
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      await prisma.slot_categories.create({
        data: {
          name: category,
          slug: category.toLowerCase()
            .replace(/[€$,]/g, '') // Удаляем символы валют и запятые
            .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
            .replace(/[^a-z0-9-]/g, '') // Удаляем все кроме букв, цифр и дефисов
            .replace(/-+/g, '-') // Заменяем множественные дефисы на одинарные
            .replace(/^-|-$/g, ''), // Удаляем дефисы в начале и конце
          description: `Категория ${category}`,
          is_active: true
        }
      });
      console.log(`✅ Добавлена категория: ${category}`);
    }

    console.log(`🎉 Успешно добавлено ${categories.length} категорий`);

    // Выводим все категории для проверки
    const allCategories = await prisma.slot_categories.findMany({
      orderBy: { name: 'asc' }
    });

    console.log('\n📋 Список всех категорий:');
    allCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (slug: ${cat.slug})`);
    });

  } catch (error) {
    console.error('❌ Ошибка при обновлении категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCategories();