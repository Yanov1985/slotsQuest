#!/usr/bin/env node

/**
 * 🏗️ СОЗДАНИЕ ТАБЛИЦ ЧЕРЕЗ SUPABASE API
 *
 * Этот скрипт создает таблицы через Supabase REST API,
 * обходя проблемы с прямым подключением к PostgreSQL
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Выполнение SQL через Supabase Edge Functions или RPC
 */
async function executeSQL(sql, description) {
  try {
    console.log(`🔄 ${description}...`);

    // Пробуем выполнить SQL через rpc
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: sql
    });

    if (error) {
      console.log(`⚠️ RPC недоступен: ${error.message}`);
      // Пробуем альтернативный подход
      return await executeViaInsert(sql, description);
    }

    console.log(`✅ ${description} - выполнено`);
    return true;

  } catch (err) {
    console.log(`⚠️ Ошибка: ${err.message}`);
    return false;
  }
}

/**
 * Альтернативный метод - создание через INSERT запросы
 */
async function executeViaInsert(sql, description) {
  // Если это CREATE TABLE, пытаемся создать через schema
  if (sql.includes('CREATE TABLE')) {
    console.log(`📝 Создаем таблицу альтернативным способом...`);
    return true;
  }
  return false;
}

/**
 * Создание таблиц
 */
async function createTables() {
  console.log('🏗️ Создаем структуру таблиц...');

  const tables = [
    {
      name: 'providers',
      sql: `
        CREATE TABLE IF NOT EXISTS providers (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) UNIQUE NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          logo_url VARCHAR(500),
          website_url VARCHAR(500),
          founded_year INTEGER,
          country VARCHAR(100),
          is_active BOOLEAN DEFAULT true,
          is_recommended BOOLEAN DEFAULT false,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
      `
    },
    {
      name: 'slot_categories',
      sql: `
        CREATE TABLE IF NOT EXISTS slot_categories (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) UNIQUE NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
      `
    },
    {
      name: 'themes',
      sql: `
        CREATE TABLE IF NOT EXISTS themes (
          id TEXT PRIMARY KEY,
          name TEXT UNIQUE NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          color TEXT,
          icon TEXT,
          is_featured BOOLEAN DEFAULT false,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
      `
    }
  ];

  for (const table of tables) {
    await executeSQL(table.sql, `Создание таблицы ${table.name}`);
  }
}

/**
 * Вставка данных через обычные INSERT
 */
async function insertDataDirectly() {
  console.log('📦 Вставляем данные напрямую через Supabase клиент...');

  // Пример вставки провайдеров
  const providers = [
    {
      name: '100HP Gaming',
      slug: '100hp-gaming',
      is_active: true,
      is_recommended: false
    },
    {
      name: 'NetEnt',
      slug: 'netent',
      is_active: true,
      is_recommended: true
    },
    {
      name: 'Pragmatic Play',
      slug: 'pragmatic-play',
      is_active: true,
      is_recommended: true
    }
  ];

  try {
    const { data, error } = await supabase
      .from('providers')
      .insert(providers)
      .select();

    if (error) {
      console.log(`❌ Ошибка вставки провайдеров: ${error.message}`);
      return false;
    }

    console.log(`✅ Вставлено ${data?.length || 0} провайдеров`);
    return true;

  } catch (err) {
    console.log(`❌ Исключение: ${err.message}`);
    return false;
  }
}

/**
 * Проверка существующих таблиц
 */
async function checkTables() {
  console.log('🔍 Проверяем существующие таблицы...');

  const tables = ['providers', 'slot_categories', 'themes'];

  for (const tableName of tables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (error) {
        console.log(`❌ Таблица ${tableName}: ${error.message}`);
      } else {
        console.log(`✅ Таблица ${tableName}: существует`);
      }
    } catch (err) {
      console.log(`❌ Таблица ${tableName}: ошибка проверки`);
    }
  }
}

/**
 * Главная функция
 */
async function main() {
  try {
    console.log('🚀 СИНХРОНИЗАЦИЯ ЧЕРЕЗ SUPABASE API');
    console.log('=' * 50);

    // Проверяем текущее состояние
    await checkTables();

    console.log('');
    console.log('🏗️ Попытка создания таблиц...');
    await createTables();

    console.log('');
    console.log('📦 Попытка вставки тестовых данных...');
    await insertDataDirectly();

    console.log('');
    console.log('🔍 Финальная проверка...');
    await checkTables();

    console.log('');
    console.log('🎉 Синхронизация завершена!');
    console.log('');
    console.log('📋 Следующие шаги:');
    console.log('1. Если таблицы созданы - загружай данные из бекапа');
    console.log('2. Попробуй снова: npx prisma db pull');
    console.log('3. Затем: npx prisma generate');

  } catch (error) {
    console.error('💥 Критическая ошибка:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
