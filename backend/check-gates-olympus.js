const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkGatesOfOlympus() {
  console.log('🔍 Поиск слота Gates of Olympus...\n');

  try {
    // Ищем слоты с названием содержащим "Gates of Olympus"
    const slots = await prisma.slots.findMany({
      where: {
        name: {
          contains: 'Gates of Olympus'
        }
      },
      select: {
        id: true,
        name: true,
        slug: true,
        free_spins_title: true,
        free_spins_intro: true,
        ante_bet_title: true,
        ante_bet_description: true,
        ante_bet_warning: true
      }
    });

    console.log('📋 Найденные слоты Gates of Olympus:');
    console.log(JSON.stringify(slots, null, 2));

    if (slots.length === 0) {
      console.log('\n❌ Слоты Gates of Olympus не найдены');
      
      // Попробуем найти все слоты с "olympus" в названии
      const olympusSlots = await prisma.slots.findMany({
        where: {
          name: {
            contains: 'olympus',
            mode: 'insensitive'
          }
        },
        select: {
          id: true,
          name: true,
          slug: true
        }
      });
      
      console.log('\n🔍 Слоты с "olympus" в названии:');
      console.log(JSON.stringify(olympusSlots, null, 2));
    }

  } catch (error) {
    console.error('❌ Ошибка при поиске слота:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkGatesOfOlympus();