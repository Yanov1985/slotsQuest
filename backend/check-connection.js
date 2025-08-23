#!/usr/bin/env node

/**
 * 🔍 ДИАГНОСТИКА ПОДКЛЮЧЕНИЯ К SUPABASE
 *
 * Этот скрипт проверяет все настройки подключения
 * и помогает найти проблему
 */

require('dotenv').config();

console.log('🔍 ДИАГНОСТИКА ПОДКЛЮЧЕНИЯ К SUPABASE');
console.log('=' * 50);

// Проверяем переменные окружения
console.log('📋 Проверка переменных окружения:');
console.log('');

const requiredVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'DATABASE_URL',
  'DIRECT_URL'
];

let hasAllVars = true;

for (const varName of requiredVars) {
  const value = process.env[varName];
  if (value) {
    // Показываем только первые и последние символы для безопасности
    const masked = value.length > 20
      ? value.substring(0, 10) + '...' + value.substring(value.length - 10)
      : value.substring(0, 5) + '...';
    console.log(`✅ ${varName}: ${masked}`);
  } else {
    console.log(`❌ ${varName}: НЕ НАЙДЕНА`);
    hasAllVars = false;
  }
}

console.log('');

if (!hasAllVars) {
  console.log('🚨 ПРОБЛЕМА: Не все переменные окружения настроены!');
  console.log('');
  console.log('🔧 ЧТО ДЕЛАТЬ:');
  console.log('1. Проверь, что файл .env находится в папке backend/');
  console.log('2. Убедись, что в .env есть все нужные переменные');
  console.log('3. Получи данные из Supabase Dashboard:');
  console.log('   - Settings → API → URL и service_role key');
  console.log('   - Settings → Database → Connection string');
  console.log('');
  process.exit(1);
}

// Проверяем формат URL
console.log('🌐 Проверка формата URL:');
const supabaseUrl = process.env.SUPABASE_URL;
const dbUrl = process.env.DATABASE_URL;

if (supabaseUrl && supabaseUrl.includes('supabase.co')) {
  console.log('✅ SUPABASE_URL выглядит правильно');
} else {
  console.log('❌ SUPABASE_URL имеет неправильный формат');
  console.log('   Должен быть: https://твой-проект.supabase.co');
}

if (dbUrl && dbUrl.includes('postgresql://') && dbUrl.includes('supabase.co')) {
  console.log('✅ DATABASE_URL выглядит правильно');
} else {
  console.log('❌ DATABASE_URL имеет неправильный формат');
  console.log('   Должен быть: postgresql://postgres:пароль@db.проект.supabase.co:5432/postgres');
}

console.log('');

// Пробуем подключиться к Supabase
console.log('🔌 Проверка подключения к Supabase API:');

async function testSupabaseConnection() {
  try {
    const { createClient } = require('@supabase/supabase-js');

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Простая проверка подключения
    const { data, error } = await supabase.from('_prisma_migrations').select('*').limit(1);

    if (error) {
      console.log(`⚠️ Supabase API доступен, но есть ошибка: ${error.message}`);
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.log('💡 Это нормально - таблицы еще не созданы');
        return true;
      }
      return false;
    } else {
      console.log('✅ Supabase API работает отлично');
      return true;
    }

  } catch (error) {
    console.log(`❌ Ошибка подключения к Supabase API: ${error.message}`);
    return false;
  }
}

// Пробуем подключиться через Prisma
console.log('🔧 Проверка подключения через Prisma:');

async function testPrismaConnection() {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.$connect();
    console.log('✅ Prisma подключение работает');

    // Пробуем выполнить простой запрос
    await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Prisma может выполнять запросы');

    await prisma.$disconnect();
    return true;

  } catch (error) {
    console.log(`❌ Ошибка подключения Prisma: ${error.message}`);

    if (error.message.includes("Can't reach database server")) {
      console.log('');
      console.log('🚨 ПРОБЛЕМА: Не можем подключиться к серверу базы данных');
      console.log('');
      console.log('🔧 ВОЗМОЖНЫЕ ПРИЧИНЫ:');
      console.log('1. 🌐 Проблемы с интернетом');
      console.log('2. 🔒 Supabase проект приостановлен или удален');
      console.log('3. 🔑 Неправильный пароль в DATABASE_URL');
      console.log('4. 📍 Неправильный адрес сервера');
      console.log('');
      console.log('🛠️ ЧТО ПОПРОБОВАТЬ:');
      console.log('1. Зайди в Supabase Dashboard и убедись, что проект активен');
      console.log('2. Проверь статус Supabase: https://status.supabase.com');
      console.log('3. Скопируй заново CONNECTION STRING из Settings → Database');
      console.log('4. Убедись, что пароль в URL правильный (без спецсимволов)');
    }

    return false;
  }
}

// Запускаем все тесты
async function runDiagnostics() {
  console.log('🔄 Запускаем диагностику...');
  console.log('');

  const supabaseOk = await testSupabaseConnection();
  const prismaOk = await testPrismaConnection();

  console.log('');
  console.log('📊 РЕЗУЛЬТАТ ДИАГНОСТИКИ:');
  console.log(`   Переменные окружения: ${hasAllVars ? '✅' : '❌'}`);
  console.log(`   Supabase API: ${supabaseOk ? '✅' : '❌'}`);
  console.log(`   Prisma подключение: ${prismaOk ? '✅' : '❌'}`);

  if (hasAllVars && supabaseOk && prismaOk) {
    console.log('');
    console.log('🎉 ВСЕ ОТЛИЧНО! Можно запускать восстановление базы данных!');
    console.log('');
    console.log('🚀 Следующий шаг: node restore-via-prisma.js');
  } else {
    console.log('');
    console.log('🚨 ЕСТЬ ПРОБЛЕМЫ! Исправь их перед восстановлением базы данных.');
    console.log('');
    console.log('💬 Нужна помощь? Скинь скриншот этого результата в чат!');
  }
}

runDiagnostics().catch(error => {
  console.error('💥 Ошибка диагностики:', error.message);
  process.exit(1);
});
