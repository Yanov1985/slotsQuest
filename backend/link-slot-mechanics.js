const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function linkSlotMechanics() {
  try {
    console.log('🔗 Связываем слот с механиками...');

    // Находим слот "Book of Ra Deluxe"
    const slot = await prisma.slots.findFirst({
      where: {
        slug: 'book-of-ra-deluxe'
      }
    });

    if (!slot) {
      console.log('❌ Слот "Book of Ra Deluxe" не найден');
      return;
    }

    console.log(`📍 Найден слот: ${slot.name} (ID: ${slot.id})`);

    // Находим механики для связывания
    const mechanics = await prisma.mechanics.findMany({
      where: {
        slug: {
          in: ['wild-symbols', 'scatter-pays', 'free-spins', 'multipliers']
        }
      }
    });

    console.log(`🔧 Найдено механик: ${mechanics.length}`);

    // Связываем слот с механиками
    for (const mechanic of mechanics) {
      const existing = await prisma.slot_mechanics.findFirst({
        where: {
          slot_id: slot.id,
          mechanic_id: mechanic.id
        }
      });

      if (!existing) {
        await prisma.slot_mechanics.create({
          data: {
            slot_id: slot.id,
            mechanic_id: mechanic.id
          }
        });
        console.log(`✅ Связан слот с механикой: ${mechanic.name}`);
      } else {
        console.log(`⚠️ Связь уже существует: ${mechanic.name}`);
      }
    }

    console.log('🎉 Связывание завершено!');
    
    // Проверяем результат
    const slotMechanics = await prisma.slot_mechanics.findMany({
      where: { slot_id: slot.id },
      include: {
        mechanics: true
      }
    });

    console.log(`📊 Слот связан с ${slotMechanics.length} механиками:`);
    slotMechanics.forEach(sm => {
      console.log(`  - ${sm.mechanics.name}`);
    });

  } catch (error) {
    console.error('❌ Ошибка при связывании:', error);
  } finally {
    await prisma.$disconnect();
  }
}

linkSlotMechanics();