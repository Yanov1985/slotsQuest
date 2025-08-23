require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Базовые категории слотов
const categoriesData = [
  {
    name: 'Классические слоты',
    slug: 'classic-slots',
    description: 'Традиционные слоты с простой механикой и знакомыми символами',
    is_active: true
  },
  {
    name: 'Видео слоты',
    slug: 'video-slots',
    description: 'Современные слоты с продвинутой графикой и множеством функций',
    is_active: true
  },
  {
    name: 'Мегавейс',
    slug: 'megaways',
    description: 'Слоты с динамическим количеством способов выиграть',
    is_active: true
  },
  {
    name: 'Джекпот слоты',
    slug: 'jackpot-slots',
    description: 'Слоты с прогрессивными и фиксированными джекпотами',
    is_active: true
  },
  {
    name: 'Фруктовые слоты',
    slug: 'fruit-slots',
    description: 'Слоты с фруктовой тематикой и классическими символами',
    is_active: true
  },
  {
    name: 'Приключенческие слоты',
    slug: 'adventure-slots',
    description: 'Слоты с захватывающими сюжетами и приключениями',
    is_active: true
  },
  {
    name: 'Мифологические слоты',
    slug: 'mythology-slots',
    description: 'Слоты на тему древних мифов и легенд',
    is_active: true
  },
  {
    name: 'Египетские слоты',
    slug: 'egyptian-slots',
    description: 'Слоты с тематикой Древнего Египта',
    is_active: true
  },
  {
    name: 'Пиратские слоты',
    slug: 'pirate-slots',
    description: 'Слоты с пиратской тематикой и морскими приключениями',
    is_active: true
  },
  {
    name: 'Космические слоты',
    slug: 'space-slots',
    description: 'Слоты с космической тематикой и футуристическим дизайном',
    is_active: true
  }
];

async function seedCategories() {
  try {
    console.log('Создание категорий слотов...');

    // Проверяем, есть ли уже категории
    const existingCategories = await prisma.slot_categories.findMany();
    
    if (existingCategories.length > 0) {
      console.log(`Найдено ${existingCategories.length} существующих категорий. Обновляем их статус на активный...`);
      
      // Делаем все существующие категории активными
      const result = await prisma.slot_categories.updateMany({
        data: {
          is_active: true,
          updated_at: new Date()
        }
      });
      
      console.log(`✅ Обновлено ${result.count} категорий!`);
    } else {
      console.log('Категории не найдены. Создаем новые...');
      
      // Создаем новые категории
      for (const categoryData of categoriesData) {
        await prisma.slot_categories.upsert({
          where: { slug: categoryData.slug },
          update: {
            name: categoryData.name,
            description: categoryData.description,
            is_active: categoryData.is_active,
            updated_at: new Date()
          },
          create: {
            name: categoryData.name,
            slug: categoryData.slug,
            description: categoryData.description,
            is_active: categoryData.is_active,
            created_at: new Date(),
            updated_at: new Date()
          }
        });
      }
      
      console.log(`✅ Создано ${categoriesData.length} категорий!`);
    }

    // Показываем финальную статистику
    const allCategories = await prisma.slot_categories.findMany({
      orderBy: { name: 'asc' }
    });
    
    const activeCategories = allCategories.filter(cat => cat.is_active);
    
    console.log(`\n📊 Статистика:`);
    console.log(`Всего категорий: ${allCategories.length}`);
    console.log(`Активных категорий: ${activeCategories.length}`);
    
    console.log('\n📋 Все категории:');
    allCategories.forEach(category => {
      const status = category.is_active ? '✅' : '❌';
      console.log(`  ${status} ${category.name} (${category.slug})`);
    });

  } catch (error) {
    console.error('❌ Ошибка при создании категорий:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories();