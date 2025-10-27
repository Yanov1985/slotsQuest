const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateFreeSpinsData() {
  try {
    console.log('🔄 Обновляем данные Free Spins для слота Book of Ra Deluxe...');

    const result = await prisma.slots.update({
      where: {
        slug: 'book-of-ra-deluxe'
      },
      data: {
        free_spins_title: 'Бесплатные вращения',
        free_spins_intro: 'Активируйте режим бесплатных вращений, получив 3 или более символов Книги на барабанах.',
        free_spins_instant_title: 'Мгновенные выплаты за скаттеры',
        free_spins_4_scatter: '4 символа Зевса = 2x ставка',
        free_spins_5_scatter: '5 символов Зевса = 20x ставка',
        free_spins_6_scatter: '6 символов Зевса = 200x ставка',
        free_spins_features_title: 'Особенности бонусной игры',
        free_spins_feature_1: 'Случайный расширяющийся символ',
        free_spins_feature_2: '10 бесплатных вращений',
        free_spins_feature_3: 'Возможность повторной активации',
        free_spins_feature_4: 'Увеличенные множители',
        ante_bet_title: 'Анте-ставка и покупка бонуса',
        ante_bet_description: 'Увеличьте свои шансы на активацию бонусной игры, используя анте-ставку в размере 25% от основной ставки.',
        ante_bet_warning: 'Покупка бонусов - это стратегия высокого риска. Играйте ответственно!'
      }
    });

    console.log('✅ Данные успешно обновлены!');
    console.log('📋 Обновленный слот:', result.name);
    
  } catch (error) {
    console.error('❌ Ошибка при обновлении данных:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateFreeSpinsData();