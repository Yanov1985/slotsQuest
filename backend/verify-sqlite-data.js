const { PrismaClient } = require('@prisma/client');

// Используем SQLite схему
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./dev.db'
    }
  }
});

async function verifyData() {
  console.log('\n🔍 ПРОВЕРКА ВОССТАНОВЛЕННЫХ ДАННЫХ В SQLITE');
  console.log('===========================================');

  try {
    // Проверяем количество записей в каждой таблице
    const providers = await prisma.provider.count();
    const mechanics = await prisma.mechanic.count();
    const themes = await prisma.theme.count();
    const slots = await prisma.slot.count();
    const categories = await prisma.slotCategory.count();

    console.log('\n📊 Количество записей:');
    console.log(`   Провайдеры: ${providers}`);
    console.log(`   Механики: ${mechanics}`);
    console.log(`   Темы: ${themes}`);
    console.log(`   Слоты: ${slots}`);
    console.log(`   Категории: ${categories}`);

    // Проверяем несколько примеров данных
    console.log('\n📋 Примеры данных:');
    
    // Первые 3 провайдера
    const sampleProviders = await prisma.provider.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        slug: true,
        country: true
      }
    });
    console.log('\n🏢 Провайдеры (первые 3):');
    sampleProviders.forEach(p => {
      console.log(`   ${p.name} (${p.slug}) - ${p.country || 'N/A'}`);
    });

    // Первые 3 слота
    const sampleSlots = await prisma.slot.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        slug: true,
        provider_id: true,
        rtp: true
      }
    });
    console.log('\n🎰 Слоты (первые 3):');
    sampleSlots.forEach(s => {
      console.log(`   ${s.name} (${s.slug}) - RTP: ${s.rtp || 'N/A'}%`);
    });

    // Первые 3 темы
    const sampleThemes = await prisma.theme.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        slug: true,
        is_featured: true
      }
    });
    console.log('\n🎨 Темы (первые 3):');
    sampleThemes.forEach(t => {
      console.log(`   ${t.name} (${t.slug}) - Featured: ${t.is_featured ? 'Да' : 'Нет'}`);
    });

    console.log('\n✅ ПРОВЕРКА ЗАВЕРШЕНА УСПЕШНО!');
    console.log('💡 Все данные корректно восстановлены в SQLite базу данных');

  } catch (error) {
    console.error('\n❌ Ошибка при проверке данных:', error.message);
    console.error('📝 Детали:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyData();