const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const prisma = new PrismaClient();

// Данные из backup файла v004
const mechanicsData = [
  { name: 'Wild Symbol', slug: 'wild-symbol', description: 'Заменяет другие символы для создания выигрышных комбинаций' },
  { name: 'Scatter Symbol', slug: 'scatter-symbol', description: 'Активирует бонусные функции независимо от позиции на барабанах' },
  { name: 'Free Spins', slug: 'free-spins', description: 'Бесплатные вращения барабанов' },
  { name: 'Bonus Game', slug: 'bonus-game', description: 'Дополнительная мини-игра с призами' },
  { name: 'Multiplier', slug: 'multiplier', description: 'Увеличивает выигрыш в несколько раз' },
  { name: 'Expanding Wild', slug: 'expanding-wild', description: 'Wild символ, который расширяется на весь барабан' },
  { name: 'Sticky Wild', slug: 'sticky-wild', description: 'Wild символ, который остается на месте несколько спинов' },
  { name: 'Cascading Reels', slug: 'cascading-reels', description: 'Выигрышные символы исчезают, новые падают сверху' },
  { name: 'Megaways', slug: 'megaways', description: 'Переменное количество способов выиграть' },
  { name: 'Hold & Spin', slug: 'hold-spin', description: 'Удержание определенных символов для дополнительных спинов' }
];

const providersData = [
  { name: 'NetEnt', slug: 'netent', website_url: 'https://www.netent.com', country: 'Sweden' },
  { name: 'Microgaming', slug: 'microgaming', website_url: 'https://www.microgaming.co.uk', country: 'Isle of Man' },
  { name: 'Play\'n GO', slug: 'playngo', website_url: 'https://www.playngo.com', country: 'Sweden' },
  { name: 'Pragmatic Play', slug: 'pragmatic-play', website_url: 'https://www.pragmaticplay.com', country: 'Malta' },
  { name: 'Yggdrasil', slug: 'yggdrasil', website_url: 'https://www.yggdrasilgaming.com', country: 'Malta' },
  { name: 'Big Time Gaming', slug: 'big-time-gaming', website_url: 'https://www.bigtimegaming.com', country: 'Australia' },
  { name: 'Red Tiger', slug: 'red-tiger', website_url: 'https://www.redtiger.com', country: 'Isle of Man' },
  { name: 'Blueprint Gaming', slug: 'blueprint-gaming', website_url: 'https://www.blueprintgaming.com', country: 'United Kingdom' },
  { name: 'Push Gaming', slug: 'push-gaming', website_url: 'https://www.pushgaming.com', country: 'United Kingdom' },
  { name: 'Nolimit City', slug: 'nolimit-city', website_url: 'https://www.nolimitcity.com', country: 'Malta' }
];

const themesData = [
  { name: 'Ancient Egypt', slug: 'ancient-egypt', description: 'Тематика Древнего Египта с фараонами и пирамидами' },
  { name: 'Adventure', slug: 'adventure', description: 'Приключенческая тематика с исследованиями и сокровищами' },
  { name: 'Fantasy', slug: 'fantasy', description: 'Фэнтезийная тематика с магией и мифическими существами' },
  { name: 'Fruit', slug: 'fruit', description: 'Классическая фруктовая тематика' },
  { name: 'Animals', slug: 'animals', description: 'Животная тематика' },
  { name: 'Space', slug: 'space', description: 'Космическая тематика' },
  { name: 'Western', slug: 'western', description: 'Тематика Дикого Запада' },
  { name: 'Asian', slug: 'asian', description: 'Азиатская тематика' },
  { name: 'Horror', slug: 'horror', description: 'Тематика ужасов' },
  { name: 'Music', slug: 'music', description: 'Музыкальная тематика' }
];

const slotCategoriesData = [
  { name: 'Classic Slots', slug: 'classic-slots', description: 'Классические слоты с простой механикой' },
  { name: 'Video Slots', slug: 'video-slots', description: 'Современные видео слоты с богатой графикой' },
  { name: 'Progressive Jackpot', slug: 'progressive-jackpot', description: 'Слоты с прогрессивным джекпотом' },
  { name: 'Megaways', slug: 'megaways', description: 'Слоты с механикой Megaways' },
  { name: 'Cluster Pays', slug: 'cluster-pays', description: 'Слоты с выплатами за кластеры символов' }
];

async function restoreBackupV004() {
  try {
    console.log('🧹 Очищаю существующие данные...');
    
    // Очищаем таблицы в правильном порядке (учитывая внешние ключи)
    await prisma.slot_mechanics.deleteMany({});
    await prisma.slots.deleteMany({});
    await prisma.slot_categories.deleteMany({});
    await prisma.themes.deleteMany({});
    await prisma.mechanics.deleteMany({});
    await prisma.providers.deleteMany({});
    
    console.log('📊 Восстанавливаю данные...');
    
    // Восстанавливаем mechanics
    console.log('🔧 Восстанавливаю mechanics...');
    for (const mechanic of mechanicsData) {
      await prisma.mechanics.create({
        data: mechanic
      });
    }
    console.log(`✅ Восстановлено ${mechanicsData.length} mechanics`);
    
    // Восстанавливаем providers
    console.log('🏢 Восстанавливаю providers...');
    for (const provider of providersData) {
      await prisma.providers.create({
        data: provider
      });
    }
    console.log(`✅ Восстановлено ${providersData.length} providers`);
    
    // Восстанавливаем themes
    console.log('🎨 Восстанавливаю themes...');
    for (const theme of themesData) {
      await prisma.themes.create({
        data: theme
      });
    }
    console.log(`✅ Восстановлено ${themesData.length} themes`);
    
    // Восстанавливаем slot categories
    console.log('📂 Восстанавливаю slot categories...');
    for (const category of slotCategoriesData) {
      await prisma.slot_categories.create({
        data: category
      });
    }
    console.log(`✅ Восстановлено ${slotCategoriesData.length} slot categories`);
    
    console.log('🎉 Восстановление backup v004 завершено успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении backup:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запускаем восстановление
restoreBackupV004();