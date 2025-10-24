const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

function isUuid(value) {
  if (typeof value !== 'string') return false;
  // UUID v4/v5 pattern (generic)
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value);
}

async function importData() {
  try {
    console.log('🚀 Начинаем импорт данных в базу данных...');
    
    const dataDir = path.join(__dirname, 'extracted-data');
    
    // Проверяем существование файлов
    const files = ['providers.json', 'slot_categories.json', 'themes.json', 'slots.json'];
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Файл не найден: ${filePath}`);
      }
    }
    
    // 1. Импорт провайдеров
    console.log('\n🏢 Импорт провайдеров...');
    const providersData = JSON.parse(fs.readFileSync(path.join(dataDir, 'providers.json'), 'utf8'));
    
    // Очищаем существующие данные
    await prisma.providers.deleteMany({});
    console.log('🗑️ Очищены существующие провайдеры');
    
    // Импортируем новые данные
    for (const provider of providersData) {
      await prisma.providers.create({
        data: {
          id: provider.id,
          name: provider.name,
          slug: provider.slug,
          logo_url: provider.logo_url,
          website_url: provider.website_url,
          description: provider.description,
          founded_year: provider.founded_year,
          headquarters: provider.headquarters,
          is_active: provider.is_active ?? true
        }
      });
    }
    console.log(`✅ Импортировано ${providersData.length} провайдеров`);
    
    // 2. Импорт категорий слотов
    console.log('\n📂 Импорт категорий слотов...');
    const categoriesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'slot_categories.json'), 'utf8'));
    
    await prisma.slot_categories.deleteMany({});
    console.log('🗑️ Очищены существующие категории');
    
    for (const category of categoriesData) {
      await prisma.slot_categories.create({
        data: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          // Некоторые поля могли быть удалены в текущей схеме Prisma
          // icon_url и sort_order добавляйте только если они существуют в схеме
          // icon_url: category.icon_url,
          // sort_order: category.sort_order ?? 0,
          is_active: category.is_active ?? true
        }
      });
    }
    console.log(`✅ Импортировано ${categoriesData.length} категорий`);
    
    // 3. Импорт тем
    console.log('\n🎨 Импорт тем...');
    const themesData = JSON.parse(fs.readFileSync(path.join(dataDir, 'themes.json'), 'utf8'));
    
    await prisma.themes.deleteMany({});
    console.log('🗑️ Очищены существующие темы');
    
    for (const theme of themesData) {
      await prisma.themes.create({
        data: {
          id: theme.id,
          name: theme.name,
          slug: theme.slug,
          description: theme.description,
          color_scheme: theme.color_scheme,
          icon_url: theme.icon_url,
          is_active: theme.is_active ?? true
        }
      });
    }
    console.log(`✅ Импортировано ${themesData.length} тем`);
    
    // 4. Импорт слотов
    console.log('\n🎰 Импорт слотов...');
    const slotsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'slots.json'), 'utf8'));
    
    await prisma.slots.deleteMany({});
    console.log('🗑️ Очищены существующие слоты');
    
    for (const slot of slotsData) {
      // Проверяем существование связанных записей
      const provider = await prisma.providers.findUnique({ where: { id: slot.provider_id } });
      const categoryId = isUuid(slot.category_id) ? slot.category_id : null;
      const category = categoryId ? await prisma.slot_categories.findUnique({ where: { id: categoryId } }) : null;
      
      if (!provider) {
        console.warn(`⚠️ Провайдер с ID ${slot.provider_id} не найден для слота ${slot.name}`);
        continue;
      }
      
      if (categoryId && !category) {
        console.warn(`⚠️ Категория с ID ${slot.category_id} не найдена для слота ${slot.name}`);
      }
      
      await prisma.slots.create({
        data: {
          id: slot.id,
          name: slot.name,
          slug: slot.slug,
          provider_id: slot.provider_id,
          category_id: categoryId,
          theme_id: slot.theme_id,
          description: slot.description,
          min_bet: slot.min_bet ? parseFloat(slot.min_bet) : null,
          max_bet: slot.max_bet ? parseFloat(slot.max_bet) : null,
          max_win: slot.max_win ? parseFloat(slot.max_win) : null,
          rtp: slot.rtp ? parseFloat(slot.rtp) : null,
          volatility: slot.volatility,
          paylines: slot.paylines ? parseInt(slot.paylines) : null,
          reels: slot.reels ? parseInt(slot.reels) : null,
          rows: slot.rows ? parseInt(slot.rows) : null,
          release_date: slot.release_date ? new Date(slot.release_date) : null,
          demo_url: slot.demo_url,
          thumbnail_url: slot.thumbnail_url,
          banner_url: slot.banner_url,
          is_active: slot.is_active ?? true
        }
      });
    }
    console.log(`✅ Импортировано ${slotsData.length} слотов`);
    
    // Статистика
    console.log('\n📊 === Финальная статистика ===');
    const stats = {
      providers: await prisma.providers.count(),
      slot_categories: await prisma.slot_categories.count(),
      themes: await prisma.themes.count(),
      slots: await prisma.slots.count()
    };
    
    Object.entries(stats).forEach(([table, count]) => {
      const emoji = table === 'providers' ? '🏢' : 
                   table === 'slot_categories' ? '📂' : 
                   table === 'themes' ? '🎨' : '🎰';
      console.log(`${emoji} ${table}: ${count} записей`);
    });
    
    console.log('\n🎉 Импорт данных успешно завершен!');
    console.log('💡 Теперь вы можете просмотреть данные в Prisma Studio: http://localhost:5556');
    
  } catch (error) {
    console.error('💥 Ошибка при импорте данных:', error.message);
    console.error('📋 Детали ошибки:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запускаем импорт
importData();