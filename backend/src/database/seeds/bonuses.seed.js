const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const bonusesData = [
  {
    name: 'Free Spins',
    slug: 'free-spins',
    description: 'Бесплатные вращения барабанов без дополнительных ставок. Позволяют игрокам крутить барабаны без использования собственных средств.',
    type: 'free_spins',
    icon: '🎰',
    color: '#10B981',
    sort_order: 1,
    is_active: true,
    is_popular: true,
    is_featured: true
  },
  {
    name: 'Multiplier',
    slug: 'multiplier',
    description: 'Увеличивает выигрыш в определенное количество раз. Может применяться к отдельным символам или всему выигрышу.',
    type: 'multiplier',
    icon: '✖️',
    color: '#EF4444',
    sort_order: 2,
    is_active: true,
    is_popular: true,
    is_featured: true
  },
  {
    name: 'Cash Bonus',
    slug: 'cash-bonus',
    description: 'Денежный бонус, который добавляется к выигрышу игрока. Может быть фиксированной суммой или процентом от ставки.',
    type: 'cash_bonus',
    icon: '💰',
    color: '#F59E0B',
    sort_order: 3,
    is_active: true,
    is_popular: true,
    is_featured: true
  },
  {
    name: 'Pick Bonus',
    slug: 'pick-bonus',
    description: 'Интерактивный бонус, где игрок выбирает из нескольких вариантов для получения призов.',
    type: 'pick_bonus',
    icon: '🎯',
    color: '#8B5CF6',
    sort_order: 4,
    is_active: true,
    is_popular: true,
    is_featured: false
  },
  {
    name: 'Wheel Bonus',
    slug: 'wheel-bonus',
    description: 'Бонусное колесо фортуны с различными призами. Игрок крутит колесо для получения случайного приза.',
    type: 'wheel_bonus',
    icon: '🎡',
    color: '#06B6D4',
    sort_order: 5,
    is_active: true,
    is_popular: true,
    is_featured: false
  },
  {
    name: 'Mini Game',
    slug: 'mini-game',
    description: 'Дополнительная мини-игра с уникальными правилами и механиками для получения дополнительных призов.',
    type: 'mini_game',
    icon: '🎮',
    color: '#EC4899',
    sort_order: 6,
    is_active: true,
    is_popular: false,
    is_featured: false
  },
  {
    name: 'Progressive Jackpot',
    slug: 'progressive-jackpot',
    description: 'Прогрессивный джекпот, который увеличивается с каждой ставкой до тех пор, пока кто-то его не выиграет.',
    type: 'progressive_jackpot',
    icon: '💎',
    color: '#DC2626',
    sort_order: 7,
    is_active: true,
    is_popular: true,
    is_featured: true
  },
  {
    name: 'Expanding Wilds',
    slug: 'expanding-wilds',
    description: 'Wild символы, которые расширяются на весь барабан, увеличивая шансы на выигрыш.',
    type: 'multiplier',
    icon: '🌟',
    color: '#7C3AED',
    sort_order: 8,
    is_active: true,
    is_popular: true,
    is_featured: false
  },
  {
    name: 'Sticky Wilds',
    slug: 'sticky-wilds',
    description: 'Wild символы, которые остаются на месте в течение нескольких спинов.',
    type: 'multiplier',
    icon: '🔒',
    color: '#059669',
    sort_order: 9,
    is_active: true,
    is_popular: false,
    is_featured: false
  },
  {
    name: 'Cascading Reels',
    slug: 'cascading-reels',
    description: 'После выигрышной комбинации символы исчезают, а новые падают сверху, создавая возможность для дополнительных выигрышей.',
    type: 'mini_game',
    icon: '⬇️',
    color: '#0891B2',
    sort_order: 10,
    is_active: true,
    is_popular: true,
    is_featured: false
  },
  {
    name: 'Respins',
    slug: 'respins',
    description: 'Дополнительные бесплатные вращения, которые активируются при определенных условиях.',
    type: 'free_spins',
    icon: '🔄',
    color: '#DB2777',
    sort_order: 11,
    is_active: true,
    is_popular: false,
    is_featured: false
  },
  {
    name: 'Mystery Symbols',
    slug: 'mystery-symbols',
    description: 'Загадочные символы, которые превращаются в одинаковые символы для создания выигрышных комбинаций.',
    type: 'pick_bonus',
    icon: '❓',
    color: '#9333EA',
    sort_order: 12,
    is_active: true,
    is_popular: false,
    is_featured: false
  }
];

async function seedBonuses() {
  try {
    console.log('🌱 Начинаем заполнение таблицы bonuses...');
    
    // Очищаем существующие данные
    await prisma.bonuses.deleteMany({});
    console.log('🗑️ Очистили существующие бонусы');
    
    // Добавляем новые данные
    for (const bonusData of bonusesData) {
      await prisma.bonuses.create({
        data: bonusData
      });
    }
    
    console.log(`✅ Успешно добавлено ${bonusesData.length} бонусов`);
    
    // Выводим статистику
    const totalBonuses = await prisma.bonuses.count();
    const activeBonuses = await prisma.bonuses.count({ where: { is_active: true } });
    const popularBonuses = await prisma.bonuses.count({ where: { is_popular: true } });
    const featuredBonuses = await prisma.bonuses.count({ where: { is_featured: true } });
    
    console.log('📊 Статистика бонусов:');
    console.log(`   Всего: ${totalBonuses}`);
    console.log(`   Активных: ${activeBonuses}`);
    console.log(`   Популярных: ${popularBonuses}`);
    console.log(`   Рекомендуемых: ${featuredBonuses}`);
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении бонусов:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedBonuses()
    .then(() => {
      console.log('🎉 Заполнение бонусов завершено!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Ошибка:', error);
      process.exit(1);
    });
}

module.exports = { seedBonuses, bonusesData };