const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addTestMechanics() {
  try {
    console.log('🔧 Добавляем тестовые механики...');

    const mechanics = [
      {
        name: 'Wild Symbols',
        slug: 'wild-symbols',
        description: 'Символы Wild заменяют любые другие символы для создания выигрышных комбинаций',
        type: 'SYMBOL',
        icon: '🃏',
        color: '#FFD700',
        sort_order: 1,
        is_active: true,
        is_popular: true,
        is_featured: true
      },
      {
        name: 'Scatter Pays',
        slug: 'scatter-pays',
        description: 'Scatter символы выплачивают выигрыши независимо от их позиции на барабанах',
        type: 'SYMBOL',
        icon: '💫',
        color: '#FF6B6B',
        sort_order: 2,
        is_active: true,
        is_popular: true,
        is_featured: false
      },
      {
        name: 'Free Spins',
        slug: 'free-spins',
        description: 'Бесплатные вращения активируются при выпадении определенных символов',
        type: 'BONUS',
        icon: '🎰',
        color: '#4ECDC4',
        sort_order: 3,
        is_active: true,
        is_popular: true,
        is_featured: true
      },
      {
        name: 'Multipliers',
        slug: 'multipliers',
        description: 'Множители увеличивают размер выигрыша в несколько раз',
        type: 'MULTIPLIER',
        icon: '✖️',
        color: '#45B7D1',
        sort_order: 4,
        is_active: true,
        is_popular: true,
        is_featured: true
      },
      {
        name: 'Cascading Reels',
        slug: 'cascading-reels',
        description: 'После выигрыша символы исчезают, а новые падают сверху',
        type: 'REEL',
        icon: '⬇️',
        color: '#96CEB4',
        sort_order: 5,
        is_active: true,
        is_popular: false,
        is_featured: false
      },
      {
        name: 'Expanding Wilds',
        slug: 'expanding-wilds',
        description: 'Wild символы расширяются на весь барабан',
        type: 'SYMBOL',
        icon: '📏',
        color: '#FFEAA7',
        sort_order: 6,
        is_active: true,
        is_popular: false,
        is_featured: false
      }
    ];

    for (const mechanic of mechanics) {
      const created = await prisma.mechanics.create({
        data: mechanic
      });
      console.log(`✅ Создана механика: ${created.name}`);
    }

    console.log('🎉 Все тестовые механики успешно добавлены!');
    
    // Проверяем результат
    const count = await prisma.mechanics.count();
    console.log(`📊 Всего механик в базе: ${count}`);

  } catch (error) {
    console.error('❌ Ошибка при добавлении механик:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestMechanics();