require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Список новых категорий
const categories = [
  { name: 'Top Games', slug: 'top-games', description: 'Лучшие игры казино' },
  { name: 'Popular', slug: 'popular', description: 'Популярные игры' },
  { name: 'Live Casino', slug: 'live-casino', description: 'Игры с живыми дилерами' },
  { name: 'Slots', slug: 'slots', description: 'Игровые автоматы' },
  { name: 'New', slug: 'new', description: 'Новые игры' },
  { name: 'Kalamba Kash Drops', slug: 'kalamba-kash-drops', description: 'Турниры Kalamba Kash Drops' },
  { name: 'Evoplay Big Adventures', slug: 'evoplay-big-adventures', description: 'Большие приключения от Evoplay' },
  { name: 'Endorphina E-Drops', slug: 'endorphina-e-drops', description: 'E-Drops от Endorphina' },
  { name: '€5,000 from GameBeat', slug: 'gamebeat-5000', description: 'Турнир на €5,000 от GameBeat' },
  { name: 'Gamzix Spin-O-Mania', slug: 'gamzix-spin-o-mania', description: 'Spin-O-Mania от Gamzix' },
  { name: '3Oaks Turbo Wins', slug: '3oaks-turbo-wins', description: 'Турбо выигрыши от 3Oaks' },
  { name: 'Original games', slug: 'original-games', description: 'Оригинальные игры' },
  { name: 'New Games', slug: 'new-games', description: 'Новые игры' },
  { name: 'Recommended Games', slug: 'recommended-games', description: 'Рекомендуемые игры' },
  { name: 'Crash Games', slug: 'crash-games', description: 'Краш игры' },
  { name: 'Roulette', slug: 'roulette', description: 'Рулетка' },
  { name: 'Discount', slug: 'discount', description: 'Игры со скидкой' },
  { name: 'Instant Games', slug: 'instant-games', description: 'Мгновенные игры' },
  { name: 'Quick games', slug: 'quick-games', description: 'Быстрые игры' },
  { name: 'Jackpot Games', slug: 'jackpot-games', description: 'Джекпот игры' },
  { name: 'Buy Bonus', slug: 'buy-bonus', description: 'Игры с покупкой бонуса' },
  { name: 'Megaways', slug: 'megaways', description: 'Игры с механикой Megaways' },
  { name: 'Table Games', slug: 'table-games', description: 'Настольные игры' },
  { name: 'TV Games', slug: 'tv-games', description: 'ТВ игры' },
  { name: '1w Games', slug: '1w-games', description: 'Игры от 1w' },
  { name: 'Best Year 2020', slug: 'best-year-2020', description: 'Лучшие игры 2020 года' },
  { name: 'Best Year 2021', slug: 'best-year-2021', description: 'Лучшие игры 2021 года' },
  { name: 'Best Year 2022', slug: 'best-year-2022', description: 'Лучшие игры 2022 года' },
  { name: 'Best Year 2023', slug: 'best-year-2023', description: 'Лучшие игры 2023 года' },
  { name: 'Best Year 2024', slug: 'best-year-2024', description: 'Лучшие игры 2024 года' },
  { name: 'All Games', slug: 'all-games', description: 'Все игры' }
];

async function updateCategories() {
  try {
    console.log('Подключаюсь к базе данных...');

    // Очищаем существующие категории
    console.log('Очищаю существующие категории...');
    await prisma.slot_categories.deleteMany({});

    console.log('Добавляю новые категории...');

    // Добавляем новые категории
    for (const category of categories) {
      await prisma.slot_categories.create({
        data: {
          name: category.name,
          slug: category.slug,
          description: category.description
        }
      });
      console.log(`✓ Добавлена категория: ${category.name}`);
    }

    console.log(`\n🎉 Успешно обновлено ${categories.length} категорий!`);

    // Проверяем результат
    const count = await prisma.slot_categories.count();
    console.log(`Всего категорий в базе: ${count}`);

  } catch (error) {
    console.error('Ошибка при обновлении категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCategories();
