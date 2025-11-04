const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Функция для парсинга SQL INSERT запросов
function parseInsertStatement(line) {
  // Поддерживаем как MySQL (`table`) так и PostgreSQL ("table") синтаксис
  const insertMatch = line.match(/INSERT INTO ["`](\w+)["`] \(([^)]+)\) VALUES (.+);/);
  if (!insertMatch) return null;

  const tableName = insertMatch[1];
  const columns = insertMatch[2].split(',').map(col => col.trim().replace(/["`]/g, ''));
  const valuesString = insertMatch[3];

  // Парсим значения (поддерживаем множественные VALUES)
  const valueGroups = [];
  let currentPos = 0;
  let parenCount = 0;
  let currentGroup = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < valuesString.length; i++) {
    const char = valuesString[i];
    
    if (!inString && (char === '"' || char === "'")) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && valuesString[i-1] !== '\\') {
      inString = false;
      stringChar = '';
    }
    
    if (!inString) {
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
      
      if (parenCount === 0 && char === ',') {
        // Конец группы значений
        valueGroups.push(currentGroup.trim());
        currentGroup = '';
        continue;
      }
    }
    
    currentGroup += char;
  }
  
  if (currentGroup.trim()) {
    valueGroups.push(currentGroup.trim());
  }

  const records = valueGroups.map(group => {
    // Убираем внешние скобки
    const cleanGroup = group.replace(/^\(|\)$/g, '');
    const values = [];
    let current = '';
    let inString = false;
    let stringChar = '';
    let parenCount = 0;

    for (let i = 0; i < cleanGroup.length; i++) {
      const char = cleanGroup[i];
      
      if (!inString && (char === '"' || char === "'")) {
        inString = true;
        stringChar = char;
        current += char;
      } else if (inString && char === stringChar && cleanGroup[i-1] !== '\\') {
        inString = false;
        stringChar = '';
        current += char;
      } else if (!inString && char === ',' && parenCount === 0) {
        values.push(current.trim());
        current = '';
      } else {
        if (!inString && char === '(') parenCount++;
        if (!inString && char === ')') parenCount--;
        current += char;
      }
    }
    
    if (current.trim()) {
      values.push(current.trim());
    }

    const record = {};
    columns.forEach((col, index) => {
      let value = values[index];
      if (value === 'NULL') {
        record[col] = null;
      } else if (value.startsWith("'") && value.endsWith("'")) {
        record[col] = value.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"');
      } else if (value.startsWith('"') && value.endsWith('"')) {
        record[col] = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
      } else if (!isNaN(value) && value !== '') {
        record[col] = parseFloat(value);
      } else {
        record[col] = value;
      }
    });

    return record;
  });

  return { tableName, records };
}

// Функция для очистки таблиц
async function clearTables() {
  console.log('🗑️ Очистка существующих данных...');
  
  try {
    // Очищаем связующие таблицы сначала
    await prisma.slot_mechanics.deleteMany({});
    console.log('✅ Очищена таблица slot_mechanics');
    
    await prisma.slot_features.deleteMany({});
    console.log('✅ Очищена таблица slot_features');
    
    await prisma.slot_bonuses.deleteMany({});
    console.log('✅ Очищена таблица slot_bonuses');
    
    // Очищаем основные таблицы
    await prisma.slots.deleteMany({});
    console.log('✅ Очищена таблица slots');
    
    await prisma.slot_categories.deleteMany({});
    console.log('✅ Очищена таблица slot_categories');
    
    await prisma.themes.deleteMany({});
    console.log('✅ Очищена таблица themes');
    
    await prisma.mechanics.deleteMany({});
    console.log('✅ Очищена таблица mechanics');
    
    await prisma.providers.deleteMany({});
    console.log('✅ Очищена таблица providers');
    
    await prisma.features.deleteMany({});
    console.log('✅ Очищена таблица features');
    
    await prisma.bonuses.deleteMany({});
    console.log('✅ Очищена таблица bonuses');
    
  } catch (error) {
    console.error('❌ Ошибка при очистке таблиц:', error.message);
    throw error;
  }
}

// Функция для восстановления провайдеров
async function restoreProviders(records) {
  console.log(`📦 Восстановление ${records.length} провайдеров...`);
  
  for (const record of records) {
    try {
      await prisma.providers.create({
        data: {
          id: record.id,
          name: record.name,
          slug: record.slug,
          description: record.description,
          website: record.website,
          logo_url: record.logo_url,
          founded_year: record.founded_year,
          headquarters: record.headquarters,
          license: record.license,
          is_active: record.is_active === 1,
          is_featured: record.is_featured === 1,
          sort_order: record.sort_order,
          created_at: new Date(record.created_at),
          updated_at: new Date(record.updated_at)
        }
      });
      console.log(`✅ Создан провайдер: ${record.name}`);
    } catch (error) {
      console.error(`❌ Ошибка создания провайдера ${record.name}:`, error.message);
    }
  }
}

// Функция для восстановления механик
async function restoreMechanics(records) {
  console.log(`⚙️ Восстановление ${records.length} механик...`);
  
  for (const record of records) {
    try {
      await prisma.mechanics.create({
        data: {
          id: record.id,
          name: record.name,
          slug: record.slug,
          description: record.description,
          type: record.type,
          icon: record.icon,
          color: record.color,
          image_url: record.image_url,
          sort_order: record.sort_order,
          is_active: record.is_active === 1,
          is_popular: record.is_popular === 1,
          is_featured: record.is_featured === 1,
          created_at: new Date(record.created_at),
          updated_at: new Date(record.updated_at)
        }
      });
      console.log(`✅ Создана механика: ${record.name}`);
    } catch (error) {
      console.error(`❌ Ошибка создания механики ${record.name}:`, error.message);
    }
  }
}

// Функция для восстановления тем
async function restoreThemes(records) {
  console.log(`🎨 Восстановление ${records.length} тем...`);
  
  for (const record of records) {
    try {
      await prisma.themes.create({
        data: {
          id: record.id,
          name: record.name,
          slug: record.slug,
          description: record.description,
          color: record.color,
          icon: record.icon,
          is_featured: record.is_featured === 1,
          is_active: record.is_active === 1,
          created_at: new Date(record.created_at),
          updated_at: new Date(record.updated_at)
        }
      });
      console.log(`✅ Создана тема: ${record.name}`);
    } catch (error) {
      console.error(`❌ Ошибка создания темы ${record.name}:`, error.message);
    }
  }
}

// Функция для восстановления категорий слотов
async function restoreSlotCategories(records) {
  console.log(`📂 Восстановление ${records.length} категорий слотов...`);
  
  for (const record of records) {
    try {
      await prisma.slot_categories.create({
        data: {
          id: record.id,
          name: record.name,
          slug: record.slug,
          description: record.description,
          icon: record.icon,
          color: record.color,
          image_url: record.image_url,
          sort_order: record.sort_order,
          is_active: record.is_active === 1,
          is_featured: record.is_featured === 1,
          created_at: new Date(record.created_at),
          updated_at: new Date(record.updated_at)
        }
      });
      console.log(`✅ Создана категория: ${record.name}`);
    } catch (error) {
      console.error(`❌ Ошибка создания категории ${record.name}:`, error.message);
    }
  }
}

// Функция для восстановления слотов
async function restoreSlots(records) {
  console.log(`🎰 Восстановление ${records.length} слотов...`);
  
  for (const record of records) {
    try {
      // Проверяем существование связанных записей
      const provider = await prisma.providers.findUnique({
        where: { id: record.provider_id }
      });
      
      if (!provider) {
        console.warn(`⚠️ Провайдер с ID ${record.provider_id} не найден для слота ${record.name}`);
        continue;
      }

      const slotData = {
        id: record.id,
        name: record.name,
        slug: record.slug,
        description: record.description,
        provider_id: record.provider_id,
        rtp: record.rtp ? parseFloat(record.rtp) : null,
        volatility: record.volatility,
        max_win: record.max_win ? parseFloat(record.max_win) : null,
        min_bet: record.min_bet ? parseFloat(record.min_bet) : null,
        max_bet: record.max_bet ? parseFloat(record.max_bet) : null,
        paylines: record.paylines,
        reels: record.reels,
        rows: record.rows,
        release_date: record.release_date ? new Date(record.release_date) : null,
        is_active: record.is_active === 1,
        is_featured: record.is_featured === 1,
        rating: record.rating ? parseFloat(record.rating) : null,
        popularity_score: record.popularity_score ? parseFloat(record.popularity_score) : null,
        image_url: record.image_url,
        demo_url: record.demo_url,
        created_at: new Date(record.created_at),
        updated_at: new Date(record.updated_at)
      };

      // Добавляем опциональные связи
      if (record.category_id) {
        const category = await prisma.slot_categories.findUnique({
          where: { id: record.category_id }
        });
        if (category) {
          slotData.category_id = record.category_id;
        }
      }

      if (record.theme_id) {
        const theme = await prisma.themes.findUnique({
          where: { id: record.theme_id }
        });
        if (theme) {
          slotData.theme_id = record.theme_id;
        }
      }

      await prisma.slots.create({ data: slotData });
      console.log(`✅ Создан слот: ${record.name}`);
    } catch (error) {
      console.error(`❌ Ошибка создания слота ${record.name}:`, error.message);
    }
  }
}

// Функция для проверки восстановленных данных
async function verifyData() {
  console.log('\n🔍 Проверка восстановленных данных...');
  
  try {
    const providersCount = await prisma.providers.count();
    const mechanicsCount = await prisma.mechanics.count();
    const themesCount = await prisma.themes.count();
    const categoriesCount = await prisma.slot_categories.count();
    const slotsCount = await prisma.slots.count();
    
    console.log(`📊 Статистика восстановления:`);
    console.log(`   Провайдеры: ${providersCount}`);
    console.log(`   Механики: ${mechanicsCount}`);
    console.log(`   Темы: ${themesCount}`);
    console.log(`   Категории: ${categoriesCount}`);
    console.log(`   Слоты: ${slotsCount}`);
    
    if (providersCount > 0) {
      const sampleProvider = await prisma.providers.findFirst();
      console.log(`   Пример провайдера: ${sampleProvider.name}`);
    }
    
    if (slotsCount > 0) {
      const sampleSlot = await prisma.slots.findFirst({
        include: {
          providers: true,
          slot_categories: true,
          themes: true
        }
      });
      console.log(`   Пример слота: ${sampleSlot.name} (${sampleSlot.providers.name})`);
    }
    
  } catch (error) {
    console.error('❌ Ошибка при проверке данных:', error.message);
  }
}

// Основная функция
async function main() {
  const backupFile = path.join(__dirname, '..', 'backups', 'db', 'database_backup_v004_2025-10-24_21-30-49.sql');
  
  console.log('🚀 Начинаем восстановление данных из backup v004...');
  console.log(`📁 Файл бэкапа: ${backupFile}`);
  
  if (!fs.existsSync(backupFile)) {
    console.error('❌ Файл бэкапа не найден!');
    return;
  }

  try {
    // Читаем файл бэкапа
    const backupContent = fs.readFileSync(backupFile, 'utf8');
    const lines = backupContent.split('\n');
    
    const data = {
      providers: [],
      mechanics: [],
      themes: [],
      slot_categories: [],
      slots: []
    };
    
    // Парсим SQL файл
    console.log('📖 Парсинг SQL файла...');
    for (const line of lines) {
      if (line.trim().startsWith('INSERT INTO')) {
        const parsed = parseInsertStatement(line.trim());
        if (parsed && data[parsed.tableName]) {
          data[parsed.tableName].push(...parsed.records);
        }
      }
    }
    
    console.log('📊 Найдено данных:');
    console.log(`   Провайдеры: ${data.providers.length}`);
    console.log(`   Механики: ${data.mechanics.length}`);
    console.log(`   Темы: ${data.themes.length}`);
    console.log(`   Категории: ${data.slot_categories.length}`);
    console.log(`   Слоты: ${data.slots.length}`);
    
    // Очищаем существующие данные
    await clearTables();
    
    // Восстанавливаем данные в правильном порядке
    if (data.providers.length > 0) {
      await restoreProviders(data.providers);
    }
    
    if (data.mechanics.length > 0) {
      await restoreMechanics(data.mechanics);
    }
    
    if (data.themes.length > 0) {
      await restoreThemes(data.themes);
    }
    
    if (data.slot_categories.length > 0) {
      await restoreSlotCategories(data.slot_categories);
    }
    
    if (data.slots.length > 0) {
      await restoreSlots(data.slots);
    }
    
    // Проверяем результат
    await verifyData();
    
    console.log('\n✅ Восстановление данных завершено успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении данных:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запускаем восстановление
main().catch(console.error);