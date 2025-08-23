#!/usr/bin/env node

/**
 * Скрипт для полного восстановления базы данных SlotQuest
 *
 * Этот скрипт выполняет следующие задачи:
 * 1. Подключается к Supabase с использованием сервисной роли
 * 2. Полностью очищает все таблицы базы данных
 * 3. Устанавливает необходимые расширения PostgreSQL
 * 4. Восстанавливает данные из бекапа
 * 5. Синхронизирует схему Prisma
 *
 * Использование: node restore-database-complete.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Настройка подключения к Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Ошибка: Не найдены переменные окружения SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY');
  console.error('💡 Проверьте файл .env в корне проекта');
  process.exit(1);
}

// Создаем клиент Supabase с сервисными правами
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Функция для выполнения SQL запросов через Supabase
 * @param {string} sql - SQL запрос для выполнения
 * @param {string} description - Описание операции для логирования
 * @returns {Promise<boolean>} - Результат выполнения
 */
async function executeSql(sql, description) {
  try {
    console.log(`🔄 ${description}...`);

    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      console.error(`❌ Ошибка при выполнении: ${description}`);
      console.error('Детали ошибки:', error);
      return false;
    }

    console.log(`✅ Успешно: ${description}`);
    return true;
  } catch (err) {
    console.error(`❌ Исключение при выполнении: ${description}`);
    console.error('Детали:', err);
    return false;
  }
}

/**
 * Функция для создания SQL функции exec_sql если она не существует
 * Эта функция позволяет выполнять произвольные SQL команды через RPC
 */
async function createExecSqlFunction() {
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

  return await executeSql(createFunctionSql, 'Создание вспомогательной функции exec_sql');
}

/**
 * Функция для установки необходимых расширений PostgreSQL
 * uuid-ossp требуется для генерации UUID
 */
async function installExtensions() {
  const extensions = [
    'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    'CREATE EXTENSION IF NOT EXISTS "pgcrypto";'
  ];

  for (const ext of extensions) {
    const success = await executeSql(ext, `Установка расширения: ${ext}`);
    if (!success) {
      console.warn(`⚠️ Не удалось установить расширение, но продолжаем...`);
    }
  }
}

/**
 * Функция для полной очистки базы данных
 * Удаляет все таблицы, последовательности и другие объекты
 */
async function clearDatabase() {
  console.log('🧹 Начинаем полную очистку базы данных...');

  // Список всех таблиц в правильном порядке для удаления (учитывая внешние ключи)
  const dropTablesQueries = [
    'DROP TABLE IF EXISTS slot_mechanics CASCADE;',
    'DROP TABLE IF EXISTS slot_bonuses CASCADE;',
    'DROP TABLE IF EXISTS slot_features CASCADE;',
    'DROP TABLE IF EXISTS slots CASCADE;',
    'DROP TABLE IF EXISTS mechanics CASCADE;',
    'DROP TABLE IF EXISTS bonuses CASCADE;',
    'DROP TABLE IF EXISTS features CASCADE;',
    'DROP TABLE IF EXISTS themes CASCADE;',
    'DROP TABLE IF EXISTS slot_categories CASCADE;',
    'DROP TABLE IF EXISTS providers CASCADE;',

    // Удаляем системные таблицы Prisma
    'DROP TABLE IF EXISTS _prisma_migrations CASCADE;',

    // Удаляем последовательности
    'DROP SEQUENCE IF EXISTS features_id_seq CASCADE;',
    'DROP SEQUENCE IF EXISTS bonuses_id_seq CASCADE;',
    'DROP SEQUENCE IF EXISTS mechanics_id_seq CASCADE;',
    'DROP SEQUENCE IF EXISTS slot_features_id_seq CASCADE;',
    'DROP SEQUENCE IF EXISTS slot_bonuses_id_seq CASCADE;',
    'DROP SEQUENCE IF EXISTS slot_mechanics_id_seq CASCADE;'
  ];

  for (const query of dropTablesQueries) {
    await executeSql(query, `Удаление: ${query}`);
  }

  console.log('✅ База данных полностью очищена');
}

/**
 * Функция для чтения и обработки SQL файла бекапа
 * @param {string} filePath - Путь к файлу бекапа
 * @returns {string[]} - Массив SQL команд
 */
function readBackupFile(filePath) {
  try {
    console.log(`📖 Читаем файл бекапа: ${filePath}`);

    const content = fs.readFileSync(filePath, 'utf8');

    // Разбиваем на отдельные команды
    const commands = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('--')) // Убираем комментарии и пустые строки
      .join('\n')
      .split(';')
      .filter(cmd => cmd.trim());

    console.log(`📊 Найдено ${commands.length} SQL команд в бекапе`);
    return commands;

  } catch (error) {
    console.error('❌ Ошибка при чтении файла бекапа:', error);
    throw error;
  }
}

/**
 * Функция для восстановления данных из бекапа
 * @param {string} backupPath - Путь к файлу бекапа
 */
async function restoreFromBackup(backupPath) {
  console.log('🔄 Начинаем восстановление данных из бекапа...');

  const commands = readBackupFile(backupPath);
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i].trim();
    if (!command) continue;

    const progress = `(${i + 1}/${commands.length})`;
    const success = await executeSql(command, `Выполнение команды ${progress}`);

    if (success) {
      successCount++;
    } else {
      errorCount++;
      console.warn(`⚠️ Ошибка в команде ${progress}: ${command.substring(0, 50)}...`);
    }
  }

  console.log(`📊 Результат восстановления: ${successCount} успешных, ${errorCount} ошибок`);

  if (errorCount > successCount) {
    throw new Error('Слишком много ошибок при восстановлении данных');
  }
}

/**
 * Основная функция восстановления
 */
async function main() {
  try {
    console.log('🚀 Начинаем полное восстановление базы данных SlotQuest');
    console.log('=' * 60);

    // Шаг 1: Создаем вспомогательную функцию
    await createExecSqlFunction();

    // Шаг 2: Устанавливаем расширения
    await installExtensions();

    // Шаг 3: Полная очистка базы данных
    await clearDatabase();

    // Шаг 4: Восстановление из бекапа
    const backupPath = path.join(__dirname, '../backups/db/database_backup_v002.sql');
    await restoreFromBackup(backupPath);

    console.log('=' * 60);
    console.log('🎉 База данных успешно восстановлена!');
    console.log('');
    console.log('📋 Следующие шаги:');
    console.log('1. Запустите: npm run prisma:db:push - для синхронизации схемы Prisma');
    console.log('2. Запустите: npm run prisma:generate - для генерации клиента Prisma');
    console.log('3. Проверьте работу приложения');
    console.log('');
    console.log('💡 Если возникнут проблемы, проверьте логи выше на наличие ошибок');

  } catch (error) {
    console.error('💥 Критическая ошибка при восстановлении базы данных:');
    console.error(error);
    console.log('');
    console.log('🔧 Рекомендации по устранению:');
    console.log('1. Проверьте подключение к интернету');
    console.log('2. Убедитесь, что Supabase проект активен');
    console.log('3. Проверьте правильность переменных окружения');
    console.log('4. Убедитесь, что у сервисной роли есть все необходимые права');

    process.exit(1);
  }
}

// Запускаем основную функцию
if (require.main === module) {
  main();
}

module.exports = { main };
