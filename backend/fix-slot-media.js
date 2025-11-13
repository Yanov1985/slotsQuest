const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixSlotMedia() {
  try {
    console.log('🔧 Исправление media_type для слотов...\n');

    // Находим слоты с image_url, но без правильного media_type
    const slotsToFix = await prisma.slots.findMany({
      where: {
        OR: [
          {
            image_url: { not: null },
            media_type: { not: 'image' },
          },
          {
            image_url: { not: null },
            media_type: null,
          },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        media_type: true,
        image_url: true,
      },
    });

    console.log(`📊 Найдено слотов для исправления: ${slotsToFix.length}\n`);

    if (slotsToFix.length === 0) {
      console.log('✅ Все слоты в порядке! Исправлений не требуется.');
      return;
    }

    let fixedCount = 0;

    for (const slot of slotsToFix) {
      console.log(`\n🔄 Исправляю слот: ${slot.name}`);
      console.log(`   Slug: ${slot.slug}`);
      console.log(`   Старый media_type: ${slot.media_type || 'null'}`);
      console.log(`   Image URL: ${slot.image_url}`);

      try {
        await prisma.slots.update({
          where: { id: slot.id },
          data: {
            media_type: 'image',
            updated_at: new Date(),
          },
        });

        console.log(`   ✅ Обновлён media_type: "image"`);
        fixedCount++;
      } catch (error) {
        console.error(`   ❌ Ошибка при обновлении:`, error.message);
      }
    }

    console.log('\n\n📊 ИТОГИ:');
    console.log(`   ✅ Успешно исправлено: ${fixedCount}`);
    console.log(`   ❌ Ошибок: ${slotsToFix.length - fixedCount}`);

    if (fixedCount > 0) {
      console.log('\n✨ Готово! Теперь изображения должны отображаться на клиенте!');
      console.log('🔄 Обновите страницу слота в браузере (Ctrl+F5)');
    }

  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixSlotMedia();
