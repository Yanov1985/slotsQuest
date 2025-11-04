#!/usr/bin/env node

/**
 * 🔄 ВОССТАНОВЛЕНИЕ ДАННЫХ ИЗ JSON ФАЙЛОВ
 * Использует извлеченные данные для восстановления в базу данных
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

console.log('🔄 ВОССТАНОВЛЕНИЕ ДАННЫХ ИЗ JSON');
console.log('================================');

const prisma = new PrismaClient();
const extractedDataDir = path.join(__dirname, 'extracted-data');

// Проверяем существование директории с данными
if (!fs.existsSync(extractedDataDir)) {
  console.error('❌ Директория с извлеченными данными не найдена:', extractedDataDir);
  console.log('💡 Сначала запустите: node restore-local.js');
  process.exit(1);
}

// Загружаем данные из JSON файлов
function loadJsonData() {
  const data = {};
  const files = fs.readdirSync(extractedDataDir);
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const tableName = file.replace('.json', '');
      const filePath = path.join(extractedDataDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      data[tableName] = JSON.parse(content);
      console.log(`📄 Загружено ${data[tableName].length} записей из ${tableName}`);
    }
  }
  
  return data;
}

// Очищаем таблицы перед восстановлением
async function clearTables() {
  console.log('🧹 Очистка таблиц...');
  
  try {
    // Удаляем в правильном порядке (учитывая внешние ключи)
    await prisma.slot.deleteMany({});
    console.log('✅ Очищена таблица slots');
    
    await prisma.slotCategory.deleteMany({});
    console.log('✅ Очищена таблица slot_categories');
    
    await prisma.theme.deleteMany({});
    console.log('✅ Очищена таблица themes');
    
    await prisma.provider.deleteMany({});
    console.log('✅ Очищена таблица providers');
    
  } catch (error) {
    console.warn('⚠️ Ошибка при очистке таблиц (возможно, они уже пусты):', error.message);
  }
}

// Восстанавливаем провайдеров
async function restoreProviders(providers) {
  console.log('🏢 Восстановление провайдеров...');
  
  for (const provider of providers) {
    try {
      await prisma.provider.create({
        data: {
          id: provider.id,
          name: provider.name,
          slug: provider.slug,
          description: provider.description,
          website_url: provider.website_url,
          logo_url: provider.logo_url,
          is_active: provider.is_active === 'true',
          is_recommended: provider.is_recommended === 'true',
          created_at: new Date(provider.created_at),
          updated_at: new Date(provider.updated_at)
        }
      });
      console.log(`✅ Создан провайдер: ${provider.name}`);
    } catch (error) {
      console.error(`❌ Ошибка создания провайдера ${provider.name}:`, error.message);
    }
  }
}

// Восстанавливаем категории
async function restoreCategories(categories) {
  console.log('📂 Восстановление категорий...');
  
  for (const category of categories) {
    try {
      await prisma.slotCategory.create({
        data: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          created_at: new Date(category.created_at),
          updated_at: new Date(category.updated_at)
        }
      });
      console.log(`✅ Создана категория: ${category.name}`);
    } catch (error) {
      console.error(`❌ Ошибка создания категории ${category.name}:`, error.message);
    }
  }
}

// Восстанавливаем темы
async function restoreThemes(themes) {
  console.log('🎨 Восстановление тем...');
  
  for (const theme of themes) {
    try {
      await prisma.theme.create({
        data: {
          id: theme.id,
          name: theme.name,
          slug: theme.slug,
          description: theme.description,
          created_at: new Date(theme.created_at),
          updated_at: new Date(theme.updated_at)
        }
      });
      console.log(`✅ Создана тема: ${theme.name}`);
    } catch (error) {
      console.error(`❌ Ошибка создания темы ${theme.name}:`, error.message);
    }
  }
}

// Восстанавливаем слоты
async function restoreSlots(slots) {
  console.log('🎰 Восстановление слотов...');
  
  for (const slot of slots) {
    try {
      await prisma.slot.create({
        data: {
          id: slot.id,
          name: slot.name,
          slug: slot.slug,
          provider_id: slot.provider_id,
          category_id: slot.category_id === 'null' ? null : slot.category_id,
          theme_id: slot.theme_id,
          description: slot.description,
          image_url: slot.image_url,
          rtp: parseFloat(slot.rtp),
          volatility: slot.volatility,
          min_bet: parseFloat(slot.min_bet),
          max_bet: parseFloat(slot.max_bet),
          max_win: parseFloat(slot.max_win),
          reels: parseInt(slot.reels),
          rows: parseInt(slot.rows),
          release_date: new Date(slot.release_date),
          is_active: slot.is_active === 'true',
          is_featured: slot.is_featured === 'true',
          popularity_score: parseInt(slot.popularity_score),
          play_count: parseInt(slot.play_count),
          created_at: new Date(slot.created_at),
          updated_at: new Date(slot.updated_at)
        }
      });
      console.log(`✅ Создан слот: ${slot.name}`);
    } catch (error) {
      console.error(`❌ Ошибка создания слота ${slot.name}:`, error.message);
    }
  }
}

// Проверяем результат
async function verifyData() {
  console.log('🔍 Проверка восстановленных данных...');
  
  const providersCount = await prisma.provider.count();
  const categoriesCount = await prisma.slotCategory.count();
  const themesCount = await prisma.theme.count();
  const slotsCount = await prisma.slot.count();
  
  console.log('📊 РЕЗУЛЬТАТЫ ВОССТАНОВЛЕНИЯ:');
  console.log(`   Провайдеры: ${providersCount}`);
  console.log(`   Категории: ${categoriesCount}`);
  console.log(`   Темы: ${themesCount}`);
  console.log(`   Слоты: ${slotsCount}`);
  
  return {
    providers: providersCount,
    categories: categoriesCount,
    themes: themesCount,
    slots: slotsCount
  };
}

// Основная функция
async function main() {
  try {
    console.log('📖 Загрузка данных из JSON файлов...');
    const data = loadJsonData();
    
    console.log('🔗 Подключение к базе данных...');
    await prisma.$connect();
    console.log('✅ Подключение установлено');
    
    // Очищаем таблицы
    await clearTables();
    
    // Восстанавливаем данные в правильном порядке
    if (data.providers) {
      await restoreProviders(data.providers);
    }
    
    if (data.slot_categories) {
      await restoreCategories(data.slot_categories);
    }
    
    if (data.themes) {
      await restoreThemes(data.themes);
    }
    
    if (data.slots) {
      await restoreSlots(data.slots);
    }
    
    // Проверяем результат
    const stats = await verifyData();
    
    console.log('');
    console.log('🎉 ВОССТАНОВЛЕНИЕ ЗАВЕРШЕНО УСПЕШНО!');
    console.log('Теперь данные должны быть видны в Prisma Studio');
    console.log('');
    console.log('💡 Для просмотра данных запустите:');
    console.log('   npx prisma studio');
    
    return stats;
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении данных:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };