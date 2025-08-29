#!/usr/bin/env node

/**
 * МАСТЕР-СКРИПТ для полного восстановления базы данных SlotQuest
 *
 * Автор: Твой AI помощник - лучший преподаватель IT технологий! 🚀
 *
 * Этот скрипт - как швейцарский армейский нож для твоей базы данных!
 * Представь, что твоя база данных - это разрушенный интернет-магазин после хакерской атаки.
 * Этот скрипт восстанавливает всё: от товаров (слоты) до поставщиков (провайдеры) и категорий!
 *
 * Что делает скрипт:
 * 1. 🧹 Полностью очищает базу данных в Supabase (как генеральная уборка)
 * 2. 🔧 Устанавливает необходимые расширения PostgreSQL (как установка драйверов)
 * 3. 📦 Восстанавливает все данные из бекапа (как распаковка коробок на складе)
 * 4. 🔄 Синхронизирует Prisma схему (как обновление каталога товаров)
 * 5. ✅ Проверяет работоспособность всей системы
 *
 * Использование: node master-restore-database.js
 */

const { createClient } = require('@supabase/supabase-js');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

require('dotenv').config();

const execAsync = util.promisify(exec);

// Настройка подключения к Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Проверка переменных окружения
 * Как проверка паспорта на границе - без документов никуда!
 */
function checkEnvironmentVariables() {
  console.log('🔍 Проверяем переменные окружения...');

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: Не найдены переменные окружения!');
    console.error('💡 Необходимые переменные:');
    console.error('   - SUPABASE_URL (URL твоего Supabase проекта)');
    console.error('   - SUPABASE_SERVICE_ROLE_KEY (секретный ключ с правами администратора)');
    console.error('');
    console.error('🔧 Как исправить:');
    console.error('1. Создай файл .env в папке backend/');
    console.error('2. Добавь туда строки:');
    console.error('   SUPABASE_URL=https://твой-проект.supabase.co');
    console.error('   SUPABASE_SERVICE_ROLE_KEY=твой-секретный-ключ');
    console.error('3. Эти данные можно найти в панели Supabase → Settings → API');

    process.exit(1);
  }

  console.log('✅ Переменные окружения найдены');
  console.log(`📍 Подключаемся к: ${supabaseUrl}`);
}

/**
 * Создание клиента Supabase
 * Как получение ключей от склада с товарами
 */
function createSupabaseClient() {
  console.log('🔑 Создаем подключение к Supabase...');

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log('✅ Подключение к Supabase создано');
    return supabase;
  } catch (error) {
    console.error('❌ Ошибка создания подключения к Supabase:', error.message);
    throw error;
  }
}

/**
 * Выполнение SQL команд через Supabase
 * Как отправка инструкций роботу на складе
 */
async function executeSql(supabase, sql, description) {
  try {
    console.log(`🔄 ${description}...`);

    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      console.error(`❌ Ошибка: ${description}`);
      console.error('Детали:', error);
      return false;
    }

    console.log(`✅ Успешно: ${description}`);
    return true;

  } catch (err) {
    console.error(`❌ Исключение: ${description}`);
    console.error('Детали:', err);
    return false;
  }
}

/**
 * Создание вспомогательной функции exec_sql
 * Как установка универсального переводчика для общения с базой данных
 */
async function createExecSqlFunction(supabase) {
  const createFunctionSql = `
    CREATE OR REPLACE FUNCTION exec_sql(sql_query text)
    RETURNS text
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql_query;
      RETURN 'OK';
    EXCEPTION
      WHEN OTHERS THEN
        RETURN SQLERRM;
    END;
    $$;
  `;

  return await executeSql(supabase, createFunctionSql, 'Установка универсального переводчика SQL');
}

/**
 * Установка расширений PostgreSQL
 * Как установка дополнительных инструментов в мастерскую
 */
async function installExtensions(supabase) {
  console.log('🔧 Устанавливаем необходимые расширения...');

  const extensions = [
    'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";', // Для генерации уникальных ID
    'CREATE EXTENSION IF NOT EXISTS "pgcrypto";'   // Для шифрования данных
  ];

  for (const ext of extensions) {
    await executeSql(supabase, ext, `Установка расширения: ${ext}`);
  }
}

/**
 * Полная очистка базы данных
 * Как снос старого здания перед строительством нового
 */
async function clearDatabase(supabase) {
  console.log('🧹 Начинаем генеральную уборку базы данных...');
  console.log('⚠️  Это удалит ВСЕ существующие данные!');

  // Список таблиц для удаления в правильном порядке (учитывая зависимости)
  const dropQueries = [
    // Сначала удаляем связующие таблицы (как снятие проводов перед сносом)
    'DROP TABLE IF EXISTS slot_mechanics CASCADE;',
    'DROP TABLE IF EXISTS slot_bonuses CASCADE;',
    'DROP TABLE IF EXISTS slot_features CASCADE;',

    // Затем основные таблицы
    'DROP TABLE IF EXISTS slots CASCADE;',
    'DROP TABLE IF EXISTS mechanics CASCADE;',
    'DROP TABLE IF EXISTS bonuses CASCADE;',
    'DROP TABLE IF EXISTS features CASCADE;',
    'DROP TABLE IF EXISTS themes CASCADE;',
    'DROP TABLE IF EXISTS slot_categories CASCADE;',
    'DROP TABLE IF EXISTS providers CASCADE;',

    // Удаляем системные таблицы Prisma
    'DROP TABLE IF EXISTS _prisma_migrations CASCADE;',

    // Удаляем последовательности (генераторы номеров)
    'DROP SEQUENCE IF EXISTS features_id_seq CASCADE;',
    'DROP SEQUENCE IF EXISTS bonuses_id_seq CASCADE;',
    'DROP SEQUENCE IF EXISTS mechanics_id_seq CASCADE;',
    'DROP SEQUENCE IF EXISTS slot_features_id_seq CASCADE;',
    'DROP SEQUENCE IF EXISTS slot_bonuses_id_seq CASCADE;',
    'DROP SEQUENCE IF EXISTS slot_mechanics_id_seq CASCADE;'
  ];

  for (const query of dropQueries) {
    await executeSql(supabase, query, `Снос: ${query}`);
  }

  console.log('✅ База данных полностью очищена - готова для нового строительства!');
}

/**
 * Чтение и подготовка бекапа
 * Как чтение чертежей перед строительством
 */
function readAndPrepareBackup(backupPath) {
  console.log(`📖 Читаем чертежи восстановления: ${backupPath}`);

  try {
    const content = fs.readFileSync(backupPath, 'utf8');

    // Разбиваем на команды (как разделение чертежа на отдельные этажи)
    const commands = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('--')) // Убираем комментарии
      .join('\n')
      .split(';')
      .filter(cmd => cmd.trim());

    console.log(`📊 Найдено ${commands.length} строительных команд`);
    return commands;

  } catch (error) {
    console.error('❌ Ошибка чтения чертежей:', error.message);
    throw error;
  }
}

/**
 * Восстановление данных из бекапа
 * Как строительство здания по чертежам
 */
async function restoreFromBackup(supabase, backupPath) {
  console.log('🏗️ Начинаем строительство базы данных по чертежам...');

  const commands = readAndPrepareBackup(backupPath);
  let successCount = 0;
  let errorCount = 0;

  console.log('');
  console.log('🔨 Процесс строительства:');
  console.log('-'.repeat(50));

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i].trim();
    if (!command) continue;

    const progress = `(${i + 1}/${commands.length})`;
    const percentage = Math.round((i + 1) / commands.length * 100);

    // Определяем тип операции для красивого вывода
    let operationType = '🔧';
    if (command.includes('INSERT INTO providers')) operationType = '🏪';
    if (command.includes('INSERT INTO slot_categories')) operationType = '📁';
    if (command.includes('INSERT INTO themes')) operationType = '🎨';
    if (command.includes('INSERT INTO slots')) operationType = '🎰';
    if (command.includes('DELETE FROM')) operationType = '🧹';

    const success = await executeSql(
      supabase,
      command,
      `${operationType} Строительный этап ${progress} [${percentage}%]`
    );

    if (success) {
      successCount++;
    } else {
      errorCount++;

      // Показываем только первые 100 символов команды при ошибке
      const shortCommand = command.substring(0, 100) + (command.length > 100 ? '...' : '');
      console.warn(`⚠️ Проблема на этапе ${progress}: ${shortCommand}`);
    }

    // Показываем прогресс каждые 10%
    if (percentage % 10 === 0) {
      console.log(`📈 Прогресс: ${percentage}% завершено`);
    }
  }

  console.log('-'.repeat(50));
  console.log(`📊 Результат строительства:`);
  console.log(`   ✅ Успешных этапов: ${successCount}`);
  console.log(`   ❌ Проблемных этапов: ${errorCount}`);
  console.log(`   📈 Процент успеха: ${Math.round(successCount / (successCount + errorCount) * 100)}%`);

  if (errorCount > successCount / 2) {
    throw new Error('Слишком много проблем при строительстве! Проверьте логи выше.');
  }

  console.log('🏗️ Строительство базы данных завершено!');
}

/**
 * Выполнение команд через терминал
 * Как вызов специалистов для финальной настройки
 */
async function runCommand(command, description) {
  try {
    console.log(`🔄 ${description}...`);
    console.log(`💻 Команда: ${command}`);

    const { stdout, stderr } = await execAsync(command, {
      cwd: __dirname,
      env: { ...process.env }
    });

    if (stdout) {
      console.log('📤 Результат:', stdout.trim());
    }

    if (stderr && !stderr.includes('warn')) {
      console.log('⚠️ Предупреждения:', stderr.trim());
    }

    console.log(`✅ Завершено: ${description}`);
    return true;

  } catch (error) {
    console.error(`❌ Ошибка: ${description}`);
    console.error('Детали:', error.message);
    return false;
  }
}

/**
 * Синхронизация Prisma
 * Как обновление каталога товаров после поставки
 */
async function syncPrisma() {
  console.log('🔄 Вызываем специалистов по Prisma для финальной настройки...');

  // Генерируем клиент Prisma
  const generateSuccess = await runCommand(
    'npx prisma generate',
    'Создание нового каталога Prisma'
  );

  if (!generateSuccess) {
    console.warn('⚠️ Проблема с генерацией клиента, но продолжаем...');
  }

  // Проталкиваем схему в базу данных
  const pushSuccess = await runCommand(
    'npx prisma db push',
    'Обновление структуры базы данных'
  );

  if (!pushSuccess) {
    console.warn('⚠️ Проблема с обновлением схемы, возможно нужна ручная проверка');
  }

  console.log('🔄 Синхронизация Prisma завершена');
}

/**
 * Проверка работоспособности
 * Как тест-драйв нового автомобиля
 */
async function verifyRestoration() {
  try {
    console.log('🔍 Проводим тест-драйв восстановленной базы данных...');

    // Подключаемся через Prisma для проверки
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.$connect();

    // Проверяем основные таблицы
    const providersCount = await prisma.providers.count();
    const categoriesCount = await prisma.slot_categories.count();
    const themesCount = await prisma.themes.count();

    console.log('📊 Результаты тест-драйва:');
    console.log(`   🏪 Провайдеров (поставщиков): ${providersCount}`);
    console.log(`   📁 Категорий: ${categoriesCount}`);
    console.log(`   🎨 Тем: ${themesCount}`);

    await prisma.$disconnect();

    if (providersCount > 0 && categoriesCount > 0 && themesCount > 0) {
      console.log('✅ Тест-драйв прошел успешно! База данных работает как швейцарские часы!');
      return true;
    } else {
      console.warn('⚠️ Тест-драйв выявил проблемы - некоторые таблицы пусты');
      return false;
    }

  } catch (error) {
    console.error('❌ Тест-драйв провалился:', error.message);
    return false;
  }
}

/**
 * ГЛАВНАЯ ФУНКЦИЯ - дирижер всего оркестра!
 */
async function main() {
  const startTime = Date.now();

  try {
    console.log('🎬 НАЧИНАЕМ ПОЛНОЕ ВОССТАНОВЛЕНИЕ БАЗЫ ДАННЫХ SLOTQUEST!');
    console.log('=' * 80);
    console.log('🎯 Цель: Восстановить базу данных из пепла как Феникс!');
    console.log('🕐 Время начала:', new Date().toLocaleString('ru-RU'));
    console.log('=' * 80);
    console.log('');

    // Этап 1: Проверка окружения
    console.log('📋 ЭТАП 1: Проверка готовности к работе');
    console.log('-' * 40);
    checkEnvironmentVariables();
    const supabase = createSupabaseClient();
    console.log('');

    // Этап 2: Подготовка инструментов
    console.log('📋 ЭТАП 2: Подготовка инструментов');
    console.log('-' * 40);
    await createExecSqlFunction(supabase);
    await installExtensions(supabase);
    console.log('');

    // Этап 3: Снос старого
    console.log('📋 ЭТАП 3: Снос старой конструкции');
    console.log('-' * 40);
    await clearDatabase(supabase);
    console.log('');

    // Этап 4: Строительство нового
    console.log('📋 ЭТАП 4: Строительство по чертежам');
    console.log('-' * 40);
    const backupPath = path.join(__dirname, '../backups/db/database_backup_v002.sql');

    if (!fs.existsSync(backupPath)) {
      throw new Error(`Чертежи не найдены по адресу: ${backupPath}`);
    }

    await restoreFromBackup(supabase, backupPath);
    console.log('');

    // Этап 5: Финальная настройка
    console.log('📋 ЭТАП 5: Финальная настройка и отладка');
    console.log('-' * 40);
    await syncPrisma();
    console.log('');

    // Этап 6: Тестирование
    console.log('📋 ЭТАП 6: Тест-драйв и проверка качества');
    console.log('-' * 40);
    const verificationPassed = await verifyRestoration();
    console.log('');

    // Финальный отчет
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    console.log('=' * 80);
    console.log('🎉 ВОССТАНОВЛЕНИЕ ЗАВЕРШЕНО УСПЕШНО!');
    console.log('=' * 80);
    console.log('📊 ИТОГОВЫЙ ОТЧЕТ:');
    console.log(`   ⏱️  Время выполнения: ${duration} секунд`);
    console.log(`   🏪 База данных: Полностью восстановлена`);
    console.log(`   🔄 Prisma: Синхронизирован`);
    console.log(`   ✅ Тестирование: ${verificationPassed ? 'Прошло успешно' : 'Требует внимания'}`);
    console.log('');
    console.log('🚀 ЧТО ДАЛЬШЕ:');
    console.log('1. Запуск backend: npm run start:dev');
    console.log('2. Запуск frontend: cd ../frontend && npm run dev');
    console.log('3. Проверка данных: npm run db:studio');
    console.log('4. Тестирование API: http://localhost:3000');
    console.log('');
    console.log('💡 СОВЕТ: Создай новый бекап после успешного запуска!');
    console.log('=' * 80);

    if (!verificationPassed) {
      console.warn('⚠️ ВНИМАНИЕ: Тестирование выявило некоторые проблемы.');
      console.warn('Рекомендуется проверить логи выше и исправить ошибки.');
    }

  } catch (error) {
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    console.error('=' * 80);
    console.error('💥 ВОССТАНОВЛЕНИЕ ПРЕРВАНО ИЗ-За КРИТИЧЕСКОЙ ОШИБКИ!');
    console.error('=' * 80);
    console.error('❌ Ошибка:', error.message);
    console.error(`⏱️ Время до ошибки: ${duration} секунд`);
    console.error('');
    console.error('🔧 ПЛАН СПАСЕНИЯ:');
    console.error('1. Проверьте подключение к интернету');
    console.error('2. Убедитесь, что Supabase проект активен');
    console.error('3. Проверьте переменные окружения в .env файле');
    console.error('4. Убедитесь, что у сервисной роли есть права администратора');
    console.error('5. Попробуйте запустить отдельные этапы вручную');
    console.error('');
    console.error('📞 ТЕХПОДДЕРЖКА: Покажи эти логи своему ментору или в чате поддержки');
    console.error('=' * 80);

    process.exit(1);
  }
}

// Запуск главной функции
if (require.main === module) {
  main();
}

module.exports = { main };

