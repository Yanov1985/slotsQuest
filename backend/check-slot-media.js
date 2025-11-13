const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkSlotMedia() {
  try {
    console.log('🔍 Проверка медиа данных слотов...\n');

    // Получаем все слоты с их media данными
    const slots = await prisma.slots.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        media_type: true,
        image_url: true,
        video_url: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 10, // Показываем последние 10 слотов
    });

    console.log(`📊 Найдено слотов: ${slots.length}\n`);

    slots.forEach((slot, index) => {
      console.log(`\n${index + 1}. 🎰 ${slot.name}`);
      console.log(`   Slug: ${slot.slug}`);
      console.log(`   ID: ${slot.id}`);
      console.log(`   📺 Media Type: ${slot.media_type || '❌ НЕ УСТАНОВЛЕН'}`);
      console.log(`   🖼️  Image URL: ${slot.image_url || '❌ ОТСУТСТВУЕТ'}`);
      console.log(`   🎬 Video URL: ${slot.video_url || '❌ ОТСУТСТВУЕТ'}`);

      // Диагностика проблем
      if (!slot.media_type) {
        console.log(`   ⚠️  ПРОБЛЕМА: Media Type не установлен!`);
      }
      if (slot.image_url && slot.media_type !== 'image') {
        console.log(`   ⚠️  ПРОБЛЕМА: Есть image_url, но media_type = "${slot.media_type}" вместо "image"!`);
      }
      if (!slot.image_url && !slot.video_url) {
        console.log(`   ⚠️  ПРОБЛЕМА: Нет ни изображения, ни видео!`);
      }

      console.log('   ' + '─'.repeat(70));
    });

    console.log('\n\n📋 ИТОГОВАЯ СТАТИСТИКА:');
    const noMediaType = slots.filter(s => !s.media_type).length;
    const noMedia = slots.filter(s => !s.image_url && !s.video_url).length;
    const wrongMediaType = slots.filter(s => s.image_url && s.media_type !== 'image').length;

    console.log(`   ❌ Слотов без media_type: ${noMediaType}`);
    console.log(`   ❌ Слотов без медиа: ${noMedia}`);
    console.log(`   ⚠️  Слотов с неправильным media_type: ${wrongMediaType}`);

    if (noMediaType > 0 || wrongMediaType > 0) {
      console.log('\n\n💡 РЕШЕНИЕ:');
      console.log('   Запустите скрипт fix-slot-media.js для автоматического исправления!');
    }

  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSlotMedia();
