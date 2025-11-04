const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function executeSQLScript() {
  try {
    console.log('🔄 Подключаюсь к базе данных...');
    
    // Проверяем подключение
    await prisma.$connect();
    console.log('✅ Подключение к базе данных установлено');
    
    console.log('🧹 Очищаю существующие данные...');
    
    // Очищаем таблицы в правильном порядке (учитывая внешние ключи)
    await prisma.$executeRaw`DELETE FROM slot_mechanics;`;
    await prisma.$executeRaw`DELETE FROM slots;`;
    await prisma.$executeRaw`DELETE FROM slot_categories;`;
    await prisma.$executeRaw`DELETE FROM themes;`;
    await prisma.$executeRaw`DELETE FROM mechanics;`;
    await prisma.$executeRaw`DELETE FROM providers;`;
    
    console.log('✅ Данные очищены');
    
    console.log('📥 Восстанавливаю данные mechanics...');
    await prisma.$executeRaw`
      INSERT INTO mechanics (name, slug, description) VALUES
      ('Wild Symbols', 'wild-symbols', 'Символы, которые заменяют другие символы для создания выигрышных комбинаций'),
      ('Free Spins', 'free-spins', 'Бесплатные вращения, активируемые специальными символами'),
      ('Bonus Rounds', 'bonus-rounds', 'Дополнительные игровые раунды с особыми правилами'),
      ('Multipliers', 'multipliers', 'Множители, увеличивающие размер выигрыша'),
      ('Scatter Symbols', 'scatter-symbols', 'Символы, которые активируют бонусные функции независимо от линий выплат');
    `;
    console.log('✅ Mechanics восстановлены');
    
    console.log('📥 Восстанавливаю данные providers...');
    await prisma.$executeRaw`
      INSERT INTO providers (name, slug, website, description) VALUES
      ('NetEnt', 'netent', 'https://www.netent.com', 'Ведущий разработчик игр для онлайн-казино'),
      ('Microgaming', 'microgaming', 'https://www.microgaming.co.uk', 'Пионер в области разработки игрового программного обеспечения'),
      ('Play''n GO', 'playn-go', 'https://www.playngo.com', 'Инновационный разработчик мобильных казино игр'),
      ('Pragmatic Play', 'pragmatic-play', 'https://www.pragmaticplay.com', 'Многопрофильный поставщик игр для iGaming индустрии'),
      ('Yggdrasil', 'yggdrasil', 'https://yggdrasilgaming.com', 'Инновационный разработчик премиальных игровых решений');
    `;
    console.log('✅ Providers восстановлены');
    
    console.log('📥 Восстанавливаю данные themes...');
    await prisma.$executeRaw`
      INSERT INTO themes (name, slug, description) VALUES
      ('Древний Египет', 'ancient-egypt', 'Игры с тематикой древнего Египта, фараонов и пирамид'),
      ('Фэнтези', 'fantasy', 'Магические миры с драконами, волшебниками и мифическими существами'),
      ('Приключения', 'adventure', 'Захватывающие приключенческие сюжеты и исследования'),
      ('Фрукты', 'fruits', 'Классические фруктовые слоты в ретро стиле'),
      ('Животные', 'animals', 'Игры с различными животными и природной тематикой');
    `;
    console.log('✅ Themes восстановлены');
    
    console.log('📥 Восстанавливаю данные slot_categories...');
    await prisma.$executeRaw`
      INSERT INTO slot_categories (name, slug, description) VALUES
      ('Классические слоты', 'classic-slots', 'Традиционные слоты с простой механикой'),
      ('Видео слоты', 'video-slots', 'Современные слоты с продвинутой графикой и анимацией'),
      ('Прогрессивные джекпоты', 'progressive-jackpots', 'Слоты с накопительными джекпотами'),
      ('Мегавейс', 'megaways', 'Слоты с динамическим количеством способов выиграть'),
      ('3D слоты', '3d-slots', 'Слоты с трёхмерной графикой и эффектами');
    `;
    console.log('✅ Slot categories восстановлены');
    
    console.log('🔍 Проверяю восстановленные данные...');
    const mechanicsCount = await prisma.mechanics.count();
    const providersCount = await prisma.providers.count();
    const themesCount = await prisma.themes.count();
    const categoriesCount = await prisma.slot_categories.count();
    
    console.log(`📊 Результаты восстановления:`);
    console.log(`   - Mechanics: ${mechanicsCount}`);
    console.log(`   - Providers: ${providersCount}`);
    console.log(`   - Themes: ${themesCount}`);
    console.log(`   - Slot Categories: ${categoriesCount}`);
    
    console.log('🎉 Backup v004 успешно восстановлен!');
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении backup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запуск восстановления
executeSQLScript();