const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  try {
    console.log('\n📊 Проверка данных в базе...\n');

    // Подсчёт записей
    const slotsCount = await prisma.slots.count();
    const mechanicsCount = await prisma.mechanics.count();
    const bonusesCount = await prisma.bonuses.count();
    const themesCount = await prisma.themes.count();
    const providersCount = await prisma.providers.count();
    const categoriesCount = await prisma.slot_categories.count();

    // Подсчёт связей
    const slotMechanicsCount = await prisma.slot_mechanics.count();
    const slotBonusesCount = await prisma.slot_bonuses.count();

    console.log('=== Основные таблицы ===');
    console.log(`Слоты: ${slotsCount}`);
    console.log(`Провайдеры: ${providersCount}`);
    console.log(`Категории: ${categoriesCount}`);
    console.log(`Механики: ${mechanicsCount}`);
    console.log(`Бонусы: ${bonusesCount}`);
    console.log(`Тематики: ${themesCount}`);

    console.log('\n=== Связи ===');
    console.log(`Связи слот-механика: ${slotMechanicsCount}`);
    console.log(`Связи слот-бонус: ${slotBonusesCount}`);

    // Проверка конкретного слота
    const gatesSlot = await prisma.slots.findFirst({
      where: {
        OR: [
          { slug: 'gate-of-olympus' },
          { slug: 'gates-of-olympus' },
          { name: { contains: 'Gates' } },
        ],
      },
      include: {
        slot_mechanics: {
          include: {
            mechanics: true,
          },
        },
        slot_bonuses: {
          include: {
            bonuses: true,
          },
        },
        themes: true,
      },
    });

    if (gatesSlot) {
      console.log('\n=== Gates of Olympus ===');
      console.log(`ID: ${gatesSlot.id}`);
      console.log(`Slug: ${gatesSlot.slug}`);
      console.log(`Механик: ${gatesSlot.slot_mechanics?.length || 0}`);
      console.log(`Бонусов: ${gatesSlot.slot_bonuses?.length || 0}`);
      console.log(`Тематика: ${gatesSlot.themes?.name || 'Не указана'}`);

      if (gatesSlot.slot_mechanics && gatesSlot.slot_mechanics.length > 0) {
        console.log('\nМеханики:');
        gatesSlot.slot_mechanics.forEach((sm, i) => {
          console.log(`  ${i + 1}. ${sm.mechanics.name} (${sm.mechanics.icon})`);
        });
      }
    } else {
      console.log('\n⚠️ Слот "Gates of Olympus" не найден!');
    }

    // Общая статистика
    console.log('\n=== Итог ===');
    if (slotsCount === 0) {
      console.log('❌ ДАННЫЕ ОТСУТСТВУЮТ! Нужно восстановить из бэкапа!');
    } else {
      console.log(`✅ В базе ${slotsCount} слотов`);
    }

    await prisma.$disconnect();
  } catch (error) {
    console.error('\n❌ Ошибка при проверке данных:', error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

checkData();
