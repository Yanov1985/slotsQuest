const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Инициализация Prisma с разными настройками подключения
async function createPrismaClient() {
  const configs = [
    // Стандартная конфигурация
    {},
    // С таймаутом
    {
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    },
    // С DIRECT_URL
    {
      datasources: {
        db: {
          url: process.env.DIRECT_URL
        }
      }
    }
  ];

  for (let i = 0; i < configs.length; i++) {
    try {
      console.log(`🔄 Попытка подключения ${i + 1}/${configs.length}...`);
      const prisma = new PrismaClient(configs[i]);
      
      // Тестируем подключение
      await prisma.$connect();
      await prisma.$queryRaw`SELECT 1`;
      
      console.log(`✅ Подключение успешно (конфигурация ${i + 1})`);
      return prisma;
    } catch (error) {
      console.log(`❌ Конфигурация ${i + 1} не работает:`, error.message);
      if (i === configs.length - 1) {
        throw new Error(`Все попытки подключения неудачны. Последняя ошибка: ${error.message}`);
      }
    }
  }
}

// Загрузка данных из JSON файлов
function loadJsonData(filename) {
  try {
    const filePath = path.join(__dirname, 'studio-data', filename);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Файл ${filename} не найден`);
      return [];
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`📁 Загружено ${data.length} записей из ${filename}`);
    return data;
  } catch (error) {
    console.error(`❌ Ошибка загрузки ${filename}:`, error.message);
    return [];
  }
}

// Восстановление данных с батчами
async function restoreDataInBatches(prisma, model, data, batchSize = 10) {
  if (!data || data.length === 0) {
    console.log(`⚠️  Нет данных для восстановления в ${model}`);
    return 0;
  }

  let restored = 0;
  const total = data.length;
  
  console.log(`🔄 Восстанавливаю ${total} записей в ${model} батчами по ${batchSize}...`);

  for (let i = 0; i < total; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    
    try {
      // Пытаемся создать записи по одной, чтобы избежать конфликтов
      for (const item of batch) {
        try {
          await prisma[model].create({
            data: item
          });
          restored++;
          process.stdout.write(`\r📊 Прогресс: ${restored}/${total} (${Math.round(restored/total*100)}%)`);
        } catch (itemError) {
          // Если запись уже существует, пропускаем
          if (itemError.code === 'P2002') {
            console.log(`\n⚠️  Запись с ID ${item.id} уже существует в ${model}, пропускаю...`);
          } else {
            console.log(`\n❌ Ошибка создания записи в ${model}:`, itemError.message);
          }
        }
      }
    } catch (batchError) {
      console.log(`\n❌ Ошибка обработки батча в ${model}:`, batchError.message);
    }
  }
  
  console.log(`\n✅ Восстановлено ${restored}/${total} записей в ${model}`);
  return restored;
}

// Проверка существующих данных
async function checkExistingData(prisma) {
  const tables = ['providers', 'mechanics', 'themes', 'slot_categories', 'slots'];
  const counts = {};
  
  console.log('\n📊 Проверка существующих данных:');
  for (const table of tables) {
    try {
      const count = await prisma[table].count();
      counts[table] = count;
      console.log(`   ${table}: ${count} записей`);
    } catch (error) {
      console.log(`   ${table}: ошибка (${error.message})`);
      counts[table] = 0;
    }
  }
  
  return counts;
}

// Основная функция восстановления
async function main() {
  console.log('🚀 Финальное автоматическое восстановление данных');
  console.log('='.repeat(50));
  
  let prisma;
  
  try {
    // Подключение к базе данных
    prisma = await createPrismaClient();
    
    // Проверяем существующие данные
    const existingCounts = await checkExistingData(prisma);
    
    // Загружаем данные из JSON файлов
    console.log('\n📁 Загрузка данных из JSON файлов...');
    const providersData = loadJsonData('providers.json');
    const mechanicsData = loadJsonData('mechanics.json');
    const themesData = loadJsonData('themes.json');
    const categoriesData = loadJsonData('slot_categories.json');
    const slotsData = loadJsonData('slots.json');
    
    // Восстанавливаем данные в правильном порядке (учитывая зависимости)
    console.log('\n🔄 Начинаю восстановление данных...');
    
    const results = {};
    
    // 1. Провайдеры (независимые)
    if (providersData.length > 0) {
      results.providers = await restoreDataInBatches(prisma, 'providers', providersData);
    }
    
    // 2. Механики (независимые)
    if (mechanicsData.length > 0) {
      results.mechanics = await restoreDataInBatches(prisma, 'mechanics', mechanicsData);
    }
    
    // 3. Темы (независимые)
    if (themesData.length > 0) {
      results.themes = await restoreDataInBatches(prisma, 'themes', themesData);
    }
    
    // 4. Категории слотов (независимые)
    if (categoriesData.length > 0) {
      results.slot_categories = await restoreDataInBatches(prisma, 'slot_categories', categoriesData);
    }
    
    // 5. Слоты (зависят от провайдеров и категорий)
    if (slotsData.length > 0) {
      results.slots = await restoreDataInBatches(prisma, 'slots', slotsData);
    }
    
    // Финальная проверка
    console.log('\n📊 Финальная проверка данных:');
    const finalCounts = await checkExistingData(prisma);
    
    // Отчет о результатах
    console.log('\n📈 Отчет о восстановлении:');
    console.log('='.repeat(50));
    for (const [table, restored] of Object.entries(results)) {
      const before = existingCounts[table] || 0;
      const after = finalCounts[table] || 0;
      const added = after - before;
      console.log(`${table}: ${restored} обработано, ${added} добавлено (было: ${before}, стало: ${after})`);
    }
    
    console.log('\n✅ Восстановление данных завершено успешно!');
    
  } catch (error) {
    console.error('\n❌ Критическая ошибка:', error.message);
    
    if (error.message.includes('Tenant or user not found')) {
      console.log('\n🔧 Рекомендации по исправлению:');
      console.log('1. Проверьте, что Supabase проект активен');
      console.log('2. Убедитесь, что DATABASE_URL корректен');
      console.log('3. Проверьте пароль и имя пользователя');
      console.log('4. Попробуйте сбросить пароль в Supabase Dashboard');
    }
    
    process.exit(1);
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
}

// Запуск скрипта
main().catch(console.error);