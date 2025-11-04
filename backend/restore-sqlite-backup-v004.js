#!/usr/bin/env node

/**
 * 🔄 ВОССТАНОВЛЕНИЕ ДАННЫХ ИЗ БЕКАПА V004 В SQLITE
 * Восстанавливает данные из database_backup_v004_2025-10-24_21-30-49.sql в локальную SQLite базу
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Инициализация Prisma с SQLite схемой
const prisma = new PrismaClient();

console.log('🔄 ВОССТАНОВЛЕНИЕ ДАННЫХ ИЗ БЕКАПА V004 В SQLITE');
console.log('===============================================');

// Путь к бекапу
const backupPath = path.join(__dirname, '..', 'backups', 'db', 'database_backup_v004_2025-10-24_21-30-49.sql');

// Функция для парсинга SQL INSERT запросов
function parseInsertStatements(sqlContent) {
  const tables = {};
  const lines = sqlContent.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Парсим INSERT запросы
    const insertMatch = trimmedLine.match(/INSERT INTO "(\w+)" \(([^)]+)\) VALUES \((.+)\);/);
    if (insertMatch) {
      const tableName = insertMatch[1];
      const columns = insertMatch[2].split(',').map(col => col.trim().replace(/"/g, ''));
      const valuesStr = insertMatch[3];
      
      // Парсим значения
      const values = [];
      let current = '';
      let inQuotes = false;
      let quoteChar = null;
      
      for (let i = 0; i < valuesStr.length; i++) {
        const char = valuesStr[i];
        
        if (!inQuotes && (char === "'" || char === '"')) {
          inQuotes = true;
          quoteChar = char;
          current += char;
        } else if (inQuotes && char === quoteChar) {
          if (i + 1 < valuesStr.length && valuesStr[i + 1] === quoteChar) {
            current += char + char;
            i++;
          } else {
            inQuotes = false;
            quoteChar = null;
            current += char;
          }
        } else if (!inQuotes && char === ',') {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      
      if (current.trim()) {
        values.push(current.trim());
      }
      
      // Создаем объект записи
      const record = {};
      columns.forEach((col, index) => {
        let value = values[index];
        if (value) {
          value = value.trim();
          
          if (value === 'NULL') {
            record[col] = null;
          } else if (value === 'true') {
            record[col] = true;
          } else if (value === 'false') {
            record[col] = false;
          } else if (value.startsWith("'") && value.endsWith("'")) {
            record[col] = value.slice(1, -1).replace(/''/g, "'");
          } else if (!isNaN(value) && !value.includes('.')) {
            record[col] = parseInt(value);
          } else if (!isNaN(value)) {
            record[col] = parseFloat(value);
          } else {
            record[col] = value;
          }
        }
      });
      
      if (!tables[tableName]) {
        tables[tableName] = [];
      }
      tables[tableName].push(record);
    }
  }
  
  return tables;
}

// Функция для очистки таблиц
async function clearTables() {
  console.log('🧹 Очистка существующих данных...');
  
  try {
    // Очищаем таблицы в правильном порядке (только те, что есть в SQLite схеме)
    await prisma.slotCategory.deleteMany({});
    await prisma.theme.deleteMany({});
    await prisma.provider.deleteMany({});
    
    console.log('✅ Все таблицы очищены');
    
  } catch (error) {
    console.error('❌ Ошибка при очистке таблиц:', error.message);
  }
}

// Функция для восстановления данных
async function restoreData(tables) {
  console.log('📥 Восстановление данных...');
  
  // Восстанавливаем провайдеров
  if (tables.providers && tables.providers.length > 0) {
    console.log(`📋 Восстановление providers (${tables.providers.length} записей)`);
    
    for (const record of tables.providers) {
      try {
        // Адаптируем данные под SQLite схему
        const providerData = {
          name: record.name,
          slug: record.slug,
          description: record.description,
          logo_url: record.logo_url,
          website_url: record.website_url,
          founded_year: record.founded_year,
          country: record.country,
          is_active: record.is_active !== false,
          is_recommended: record.is_recommended === true
        };
        
        await prisma.provider.create({ data: providerData });
      } catch (error) {
        console.error(`❌ Ошибка при создании провайдера ${record.name}:`, error.message);
      }
    }
    console.log('✅ Providers восстановлены');
  }
  
  // Восстанавливаем механики
  if (tables.mechanics && tables.mechanics.length > 0) {
    console.log(`📋 Восстановление mechanics (${tables.mechanics.length} записей)`);
    
    for (const record of tables.mechanics) {
      try {
        const mechanicData = {
          name: record.name,
          slug: record.slug,
          description: record.description,
          is_active: record.is_active !== false
        };
        
        await prisma.mechanic.create({ data: mechanicData });
      } catch (error) {
        console.error(`❌ Ошибка при создании механики ${record.name}:`, error.message);
      }
    }
    console.log('✅ Mechanics восстановлены');
  }
  
  // Восстанавливаем темы
  if (tables.themes && tables.themes.length > 0) {
    console.log(`📋 Восстановление themes (${tables.themes.length} записей)`);
    
    for (const record of tables.themes) {
      try {
        const themeData = {
          name: record.name,
          slug: record.slug,
          description: record.description,
          color: record.color
        };
        
        await prisma.theme.create({ data: themeData });
      } catch (error) {
        console.error(`❌ Ошибка при создании темы ${record.name}:`, error.message);
      }
    }
    console.log('✅ Themes восстановлены');
  }
  
  // Восстанавливаем категории слотов
  if (tables.slot_categories && tables.slot_categories.length > 0) {
    console.log(`📋 Восстановление slot_categories (${tables.slot_categories.length} записей)`);
    
    for (const record of tables.slot_categories) {
      try {
        const categoryData = {
          name: record.name,
          slug: record.slug,
          description: record.description,
          is_active: record.is_active !== false
        };
        
        await prisma.slotCategory.create({ data: categoryData });
      } catch (error) {
        console.error(`❌ Ошибка при создании категории ${record.name}:`, error.message);
      }
    }
    console.log('✅ Slot categories восстановлены');
  }
  
  // Восстанавливаем слоты
  if (tables.slots && tables.slots.length > 0) {
    console.log(`📋 Восстановление slots (${tables.slots.length} записей)`);
    
    for (const record of tables.slots) {
      try {
        // Находим провайдера и категорию по slug
        const provider = await prisma.provider.findUnique({
          where: { slug: record.provider_slug }
        });
        
        const category = await prisma.slotCategory.findUnique({
          where: { slug: record.category_slug }
        });
        
        if (!provider) {
          console.error(`❌ Провайдер не найден для слота ${record.name}: ${record.provider_slug}`);
          continue;
        }
        
        if (!category) {
          console.error(`❌ Категория не найдена для слота ${record.name}: ${record.category_slug}`);
          continue;
        }
        
        const slotData = {
          name: record.name,
          slug: record.slug,
          description: record.description,
          rtp: record.rtp,
          volatility: record.volatility,
          min_bet: record.min_bet,
          max_bet: record.max_bet,
          max_win: record.max_win,
          paylines: record.paylines,
          reels: record.reels,
          rows: record.rows,
          is_active: record.is_active !== false,
          is_featured: record.is_featured === true,
          provider_id: provider.id,
          category_id: category.id
        };
        
        await prisma.slot.create({ data: slotData });
      } catch (error) {
        console.error(`❌ Ошибка при создании слота ${record.name}:`, error.message);
      }
    }
    console.log('✅ Slots восстановлены');
  }
}

// Функция для проверки восстановленных данных
async function verifyData() {
  console.log('🔍 Проверка восстановленных данных...');
  
  try {
    const providers = await prisma.provider.count();
    const mechanics = await prisma.mechanic.count();
    const themes = await prisma.theme.count();
    const categories = await prisma.slotCategory.count();
    const slots = await prisma.slot.count();
    
    console.log('📊 СТАТИСТИКА ВОССТАНОВЛЕННЫХ ДАННЫХ:');
    console.log(`   Провайдеры: ${providers}`);
    console.log(`   Механики: ${mechanics}`);
    console.log(`   Темы: ${themes}`);
    console.log(`   Категории: ${categories}`);
    console.log(`   Слоты: ${slots}`);
    
    if (providers > 0 && mechanics > 0 && themes > 0) {
      console.log('✅ Данные успешно восстановлены в SQLite!');
      return true;
    } else {
      console.log('⚠️ Некоторые данные могут быть не восстановлены');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Ошибка при проверке данных:', error.message);
    return false;
  }
}

// Основная функция
async function main() {
  try {
    // Проверяем существование файла бекапа
    if (!fs.existsSync(backupPath)) {
      console.error('❌ Файл бекапа не найден:', backupPath);
      process.exit(1);
    }
    
    console.log('📂 Загрузка бекапа:', backupPath);
    
    // Читаем файл бекапа
    const sqlContent = fs.readFileSync(backupPath, 'utf8');
    console.log(`📄 Размер файла: ${Math.round(sqlContent.length / 1024)} KB`);
    
    // Парсим SQL запросы
    console.log('🔍 Парсинг SQL запросов...');
    const tables = parseInsertStatements(sqlContent);
    
    console.log('📋 Найденные таблицы:');
    Object.keys(tables).forEach(tableName => {
      console.log(`   ${tableName}: ${tables[tableName].length} записей`);
    });
    
    // Очищаем существующие данные
    await clearTables();
    
    // Восстанавливаем данные
    await restoreData(tables);
    
    // Проверяем результат
    const success = await verifyData();
    
    if (success) {
      console.log('\n🎉 ВОССТАНОВЛЕНИЕ В SQLITE ЗАВЕРШЕНО УСПЕШНО!');
      console.log('💡 Теперь можно использовать локальную базу данных');
      console.log('📁 База данных сохранена в: ./dev.db');
    } else {
      console.log('\n⚠️ Восстановление завершено с предупреждениями');
    }
    
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Запуск скрипта
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };