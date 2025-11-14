const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkAllData() {
  console.log('📊 Проверка всех данных в БД...\n');

  try {
    // Проверяем слоты
    const slotsCount = await prisma.slots.count();
    console.log(`✅ Слоты: ${slotsCount}`);

    // Проверяем провайдеров
    const providersCount = await prisma.providers.count();
    console.log(`✅ Провайдеры: ${providersCount}`);

    // Проверяем категории
    const categoriesCount = await prisma.slot_categories.count();
    console.log(`✅ Категории: ${categoriesCount}`);

    // Проверяем механики
    const mechanicsCount = await prisma.mechanics.count();
    console.log(`✅ Механики: ${mechanicsCount}`);

    // Проверяем бонусы
    const bonusesCount = await prisma.bonuses.count();
    console.log(`✅ Бонусы: ${bonusesCount}`);

    // Проверяем тематики
    const themesCount = await prisma.themes.count();
    console.log(`✅ Тематики: ${themesCount}`);

    console.log('\n📊 Проверка связей:');

    // Проверяем связи слот-механики
    const slotMechanicsCount = await prisma.slot_mechanics.count();
    console.log(`✅ Связи слот-механики: ${slotMechanicsCount}`);

    // Проверяем связи слот-бонусы
    const slotBonusesCount = await prisma.slot_bonuses.count();
    console.log(`✅ Связи слот-бонусы: ${slotBonusesCount}`);

    // Проверяем связи слот-тематики
    const slotThemesCount = await prisma.slot_themes.count();
    console.log(`✅ Связи слот-тематики: ${slotThemesCount}`);

    // Проверяем конкретный слот
    console.log('\n📊 Проверка слота "Gates of Olympus":');
    const slot = await prisma.slots.findFirst({
      where: { slug: 'gate-of-olympus' },
      include: {
        providers: true,
        slot_categories: true,
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
        slotThemes: {
          include: {
            themes: true,
          },
        },
      },
    });

    if (slot) {
      console.log(`✅ Слот найден: ${slot.name}`);
      console.log(`   Провайдер: ${slot.providers?.name || 'нет'}`);
      console.log(`   Категория: ${slot.slot_categories?.name || 'нет'}`);
      console.log(`   Механики: ${slot.slot_mechanics?.length || 0}`);
      console.log(`   Бонусы: ${slot.slot_bonuses?.length || 0}`);
      console.log(`   Тематики: ${slot.slotThemes?.length || 0}`);

      if (slot.slotThemes && slot.slotThemes.length > 0) {
        console.log('\n   📝 Тематики:');
        slot.slotThemes.forEach((st, index) => {
          console.log(`   ${index + 1}. ${st.themes?.name || 'нет'}`);
        });
      }
    } else {
      console.log('❌ Слот "Gates of Olympus" не найден!');
    }

    // Проверяем все слоты
    console.log('\n📊 Список всех слотов:');
    const allSlots = await prisma.slots.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        is_active: true,
      },
      take: 10,
    });

    allSlots.forEach((s, index) => {
      console.log(`${index + 1}. ${s.name} (${s.slug}) - ${s.is_active ? 'активен' : 'неактивен'}`);
    });

  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAllData();
