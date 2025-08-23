#!/usr/bin/env node

/**
 * 🛠️ АЛЬТЕРНАТИВНЫЙ СКРИПТ ВОССТАНОВЛЕНИЯ ЧЕРЕЗ PRISMA
 *
 * Этот скрипт использует прямое подключение к PostgreSQL через Prisma
 * без использования Supabase RPC функций, которые могут быть заблокированы
 *
 * Представь это как "черный вход" в казино для IT специалистов! 🎰
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * Создаем клиент Prisma для прямого доступа к базе данных
 */
const prisma = new PrismaClient();

/**
 * Функция для выполнения "сырых" SQL запросов через Prisma
 * @param {string} sql - SQL запрос
 * @param {string} description - Описание операции
 * @returns {Promise<boolean>} - Успех операции
 */
async function executePrismaSQL(sql, description) {
  try {
    console.log(`🔄 ${description}...`);

    await prisma.$executeRawUnsafe(sql);

    console.log(`✅ Успешно: ${description}`);
    return true;

  } catch (error) {
    // Некоторые ошибки можно игнорировать (например, "таблица уже существует")
    if (error.message.includes('already exists') ||
        error.message.includes('does not exist') ||
        error.message.includes('duplicate key')) {
      console.log(`⚠️ Предупреждение (игнорируем): ${description} - ${error.message.substring(0, 100)}...`);
      return true;
    }

    console.error(`❌ Ошибка: ${description}`);
    console.error('Детали:', error.message.substring(0, 200) + '...');
    return false;
  }
}

/**
 * Очистка базы данных через Prisma
 */
async function clearDatabaseViaPrisma() {
  console.log('🧹 Очищаем базу данных через Prisma...');

  const tables = [
    'slot_mechanics',
    'slot_bonuses',
    'slot_features',
    'slots',
    'mechanics',
    'bonuses',
    'features',
    'themes',
    'slot_categories',
    'providers'
  ];

  // Отключаем проверки внешних ключей
  await executePrismaSQL('SET foreign_key_checks = 0;', 'Отключение проверок внешних ключей');

  for (const table of tables) {
    await executePrismaSQL(`DROP TABLE IF EXISTS "${table}" CASCADE;`, `Удаление таблицы ${table}`);
  }

  // Включаем обратно проверки
  await executePrismaSQL('SET foreign_key_checks = 1;', 'Включение проверок внешних ключей');

  console.log('✅ База данных очищена через Prisma');
}

/**
 * Создание таблиц через Prisma push
 */
async function createTablesViaPrisma() {
  console.log('🏗️ Создаем структуру таблиц через Prisma...');

  try {
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);

    // Выполняем prisma db push для создания структуры
    console.log('📝 Выполняем: npx prisma db push --force-reset');
    const { stdout, stderr } = await execAsync('npx prisma db push --force-reset', {
      cwd: __dirname,
      env: { ...process.env }
    });

    if (stdout) console.log('📤 Результат:', stdout);
    if (stderr && !stderr.includes('warn')) console.log('⚠️ Предупреждения:', stderr);

    console.log('✅ Структура таблиц создана');
    return true;

  } catch (error) {
    console.error('❌ Ошибка создания структуры:', error.message);
    return false;
  }
}

/**
 * Загрузка данных из бекапа в массивы
 */
function parseBackupData(backupPath) {
  console.log('📖 Парсим данные из бекапа...');

  const content = fs.readFileSync(backupPath, 'utf8');
  const lines = content.split('\n');

  const data = {
    providers: [],
    categories: [],
    themes: [],
    slots: []
  };

  let currentTable = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.includes('DELETE FROM providers')) {
      currentTable = 'providers';
      continue;
    } else if (trimmedLine.includes('DELETE FROM slot_categories')) {
      currentTable = 'categories';
      continue;
    } else if (trimmedLine.includes('DELETE FROM themes')) {
      currentTable = 'themes';
      continue;
    } else if (trimmedLine.includes('DELETE FROM slots')) {
      currentTable = 'slots';
      continue;
    }

    if (trimmedLine.startsWith('INSERT INTO') && currentTable) {
      // Парсим INSERT statements
      const match = trimmedLine.match(/VALUES \((.*)\);?$/);
      if (match) {
        try {
          const values = match[1];
          data[currentTable].push(values);
        } catch (e) {
          console.warn(`⚠️ Не удалось распарсить строку: ${trimmedLine.substring(0, 100)}...`);
        }
      }
    }
  }

  console.log(`📊 Найдено данных:`);
  console.log(`   🏪 Провайдеров: ${data.providers.length}`);
  console.log(`   📁 Категорий: ${data.categories.length}`);
  console.log(`   🎨 Тем: ${data.themes.length}`);
  console.log(`   🎰 Слотов: ${data.slots.length}`);

  return data;
}

/**
 * Вставка провайдеров
 */
async function insertProviders(providersData) {
  console.log('🏪 Вставляем провайдеров...');

  let successCount = 0;

  for (const [index, providerValues] of providersData.entries()) {
    try {
      // Простая вставка через Prisma raw query
      const sql = `INSERT INTO providers (id, name, slug, logo_url, website_url, country, founded_year, description, is_active, is_recommended, created_at, updated_at) VALUES (${providerValues})`;

      await prisma.$executeRawUnsafe(sql);
      successCount++;

      if ((index + 1) % 10 === 0) {
        console.log(`📈 Прогресс провайдеров: ${index + 1}/${providersData.length}`);
      }

    } catch (error) {
      console.warn(`⚠️ Ошибка вставки провайдера ${index + 1}: ${error.message.substring(0, 100)}...`);
    }
  }

  console.log(`✅ Вставлено провайдеров: ${successCount}/${providersData.length}`);
}

/**
 * Вставка категорий
 */
async function insertCategories(categoriesData) {
  console.log('📁 Вставляем категории...');

  let successCount = 0;

  for (const [index, categoryValues] of categoriesData.entries()) {
    try {
      const sql = `INSERT INTO slot_categories (id, name, slug, description, created_at, updated_at) VALUES (${categoryValues})`;

      await prisma.$executeRawUnsafe(sql);
      successCount++;

    } catch (error) {
      console.warn(`⚠️ Ошибка вставки категории ${index + 1}: ${error.message.substring(0, 100)}...`);
    }
  }

  console.log(`✅ Вставлено категорий: ${successCount}/${categoriesData.length}`);
}

/**
 * Вставка тем
 */
async function insertThemes(themesData) {
  console.log('🎨 Вставляем темы...');

  let successCount = 0;

  for (const [index, themeValues] of themesData.entries()) {
    try {
      const sql = `INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES (${themeValues})`;

      await prisma.$executeRawUnsafe(sql);
      successCount++;

      if ((index + 1) % 20 === 0) {
        console.log(`📈 Прогресс тем: ${index + 1}/${themesData.length}`);
      }

    } catch (error) {
      console.warn(`⚠️ Ошибка вставки темы ${index + 1}: ${error.message.substring(0, 100)}...`);
    }
  }

  console.log(`✅ Вставлено тем: ${successCount}/${themesData.length}`);
}

/**
 * Проверка результата
 */
async function verifyData() {
  console.log('🔍 Проверяем результат...');

  try {
    const providersCount = await prisma.providers.count();
    const categoriesCount = await prisma.slot_categories.count();
    const themesCount = await prisma.themes.count();

    console.log('📊 Результат восстановления:');
    console.log(`   🏪 Провайдеров: ${providersCount}`);
    console.log(`   📁 Категорий: ${categoriesCount}`);
    console.log(`   🎨 Тем: ${themesCount}`);

    return { providersCount, categoriesCount, themesCount };

  } catch (error) {
    console.error('❌ Ошибка проверки:', error.message);
    return null;
  }
}

/**
 * Главная функция
 */
async function main() {
  const startTime = Date.now();

  try {
    console.log('🚀 ЗАПУСКАЕМ ВОССТАНОВЛЕНИЕ ЧЕРЕЗ PRISMA!');
    console.log('=' * 60);

    // Шаг 1: Подключение к базе данных
    console.log('🔌 Подключаемся к базе данных...');
    await prisma.$connect();
    console.log('✅ Подключение установлено');

    // Шаг 2: Создание структуры таблиц
    const structureCreated = await createTablesViaPrisma();
    if (!structureCreated) {
      throw new Error('Не удалось создать структуру таблиц');
    }

    // Шаг 3: Парсинг данных из бекапа
    const backupPath = path.join(__dirname, '../backups/db/database_backup_v002.sql');
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Файл бекапа не найден: ${backupPath}`);
    }

    const data = parseBackupData(backupPath);

    // Шаг 4: Вставка данных
    await insertProviders(data.providers);
    await insertCategories(data.categories);
    await insertThemes(data.themes);

    // Шаг 5: Проверка результата
    const result = await verifyData();

    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    console.log('=' * 60);
    console.log('🎉 ВОССТАНОВЛЕНИЕ ЧЕРЕЗ PRISMA ЗАВЕРШЕНО!');
    console.log(`⏱️ Время выполнения: ${duration} секунд`);

    if (result && (result.providersCount > 50 && result.categoriesCount > 10 && result.themesCount > 100)) {
      console.log('✅ Данные успешно восстановлены!');
      console.log('');
      console.log('🚀 Следующие шаги:');
      console.log('1. npx prisma generate - обновить клиент Prisma');
      console.log('2. npm run start:dev - запустить backend');
      console.log('3. npm run db:studio - проверить данные');
    } else {
      console.log('⚠️ Восстановление частичное - некоторые данные могли не загрузиться');
    }

  } catch (error) {
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    console.error('💥 КРИТИЧЕСКАЯ ОШИБКА:');
    console.error(error.message);
    console.error(`⏱️ Время до ошибки: ${duration} секунд`);

    process.exit(1);

  } finally {
    await prisma.$disconnect();
  }
}

// Запуск
if (require.main === module) {
  main();
}

module.exports = { main };
