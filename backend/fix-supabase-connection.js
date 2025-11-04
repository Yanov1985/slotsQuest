#!/usr/bin/env node

/**
 * 🔧 ДИАГНОСТИКА И ИСПРАВЛЕНИЕ ПОДКЛЮЧЕНИЯ К SUPABASE
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

console.log('🔧 ДИАГНОСТИКА ПОДКЛЮЧЕНИЯ К SUPABASE');
console.log('====================================');

// Текущие настройки
const currentUrl = process.env.SUPABASE_URL;
const currentAnonKey = process.env.SUPABASE_ANON_KEY;
const currentServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const currentDatabaseUrl = process.env.DATABASE_URL;
const currentDirectUrl = process.env.DIRECT_URL;

console.log('📋 ТЕКУЩИЕ НАСТРОЙКИ:');
console.log('SUPABASE_URL:', currentUrl);
console.log('DATABASE_URL:', currentDatabaseUrl ? 'Установлен' : 'Не найден');
console.log('DIRECT_URL:', currentDirectUrl ? 'Установлен' : 'Не найден');

// Извлекаем проект ID из URL
function extractProjectId(url) {
  if (!url) return null;
  const match = url.match(/https:\/\/([^.]+)\.supabase\.co/);
  return match ? match[1] : null;
}

const projectId = extractProjectId(currentUrl);
console.log('Проект ID:', projectId);

// Тестируем различные варианты подключения
async function testConnection(url, description) {
  return new Promise((resolve) => {
    console.log(`🔍 Тестирование ${description}...`);
    
    const req = https.request(url, (res) => {
      console.log(`✅ ${description}: статус ${res.statusCode}`);
      resolve(true);
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${description}: ${err.message}`);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log(`⏱️ ${description}: таймаут`);
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

// Генерируем новые строки подключения
function generateConnectionStrings(projectId) {
  if (!projectId) return null;
  
  const host = `aws-0-eu-central-1.pooler.supabase.com`;
  const directHost = `aws-0-eu-central-1.pooler.supabase.com`;
  
  return {
    // Попробуем разные варианты
    variants: [
      {
        name: 'Стандартный pgbouncer',
        DATABASE_URL: `postgresql://postgres.${projectId}:${process.env.DB_PASSWORD || '[PASSWORD]'}@${host}:6543/postgres`,
        DIRECT_URL: `postgresql://postgres.${projectId}:${process.env.DB_PASSWORD || '[PASSWORD]'}@${directHost}:5432/postgres`
      },
      {
        name: 'Прямое подключение',
        DATABASE_URL: `postgresql://postgres.${projectId}:${process.env.DB_PASSWORD || '[PASSWORD]'}@${directHost}:5432/postgres`,
        DIRECT_URL: `postgresql://postgres.${projectId}:${process.env.DB_PASSWORD || '[PASSWORD]'}@${directHost}:5432/postgres`
      },
      {
        name: 'Альтернативный хост',
        DATABASE_URL: `postgresql://postgres:${process.env.DB_PASSWORD || '[PASSWORD]'}@db.${projectId}.supabase.co:5432/postgres`,
        DIRECT_URL: `postgresql://postgres:${process.env.DB_PASSWORD || '[PASSWORD]'}@db.${projectId}.supabase.co:5432/postgres`
      }
    ]
  };
}

// Создаем новый .env файл с исправленными настройками
function createFixedEnvFile() {
  console.log('🔧 Создание исправленного .env файла...');
  
  const envPath = path.join(__dirname, '.env');
  const backupPath = path.join(__dirname, '.env.backup');
  
  // Создаем бекап текущего .env
  if (fs.existsSync(envPath)) {
    fs.copyFileSync(envPath, backupPath);
    console.log('✅ Создан бекап .env файла');
  }
  
  const connectionStrings = generateConnectionStrings(projectId);
  
  if (!connectionStrings) {
    console.error('❌ Не удалось извлечь проект ID из SUPABASE_URL');
    return false;
  }
  
  console.log('🔧 ПРЕДЛАГАЕМЫЕ ВАРИАНТЫ ПОДКЛЮЧЕНИЯ:');
  console.log('=====================================');
  
  connectionStrings.variants.forEach((variant, index) => {
    console.log(`\n${index + 1}. ${variant.name}:`);
    console.log(`   DATABASE_URL="${variant.DATABASE_URL}"`);
    console.log(`   DIRECT_URL="${variant.DIRECT_URL}"`);
  });
  
  // Создаем .env файл с первым вариантом
  const newEnvContent = `# Server configuration
PORT=3001

# Supabase configuration
SUPABASE_URL="${currentUrl}"
SUPABASE_ANON_KEY="${currentAnonKey}"
SUPABASE_SERVICE_ROLE_KEY="${currentServiceKey}"

# Prisma configuration (ИСПРАВЛЕНО)
DATABASE_URL="${connectionStrings.variants[0].DATABASE_URL}"
DIRECT_URL="${connectionStrings.variants[0].DIRECT_URL}"

# Примечание: Замените [PASSWORD] на реальный пароль из Supabase Dashboard
# Project Settings -> Database -> Connection string
`;

  fs.writeFileSync(envPath, newEnvContent);
  console.log('\n✅ Создан новый .env файл с исправленными настройками');
  console.log('⚠️ ВАЖНО: Замените [PASSWORD] на реальный пароль из Supabase Dashboard');
  
  return true;
}

// Основная функция
async function main() {
  console.log('🌐 Тестирование подключений...');
  
  // Тестируем основные сервисы
  await testConnection('https://www.google.com', 'Google (интернет)');
  await testConnection('https://supabase.com', 'Supabase (основной сайт)');
  
  if (currentUrl) {
    await testConnection(currentUrl, 'Ваш проект Supabase');
  }
  
  console.log('\n🔧 Анализ проблемы...');
  
  if (!projectId) {
    console.log('❌ Проблема: Неверный формат SUPABASE_URL');
    console.log('💡 Решение: Проверьте SUPABASE_URL в Supabase Dashboard');
    return;
  }
  
  console.log('✅ SUPABASE_URL имеет правильный формат');
  console.log('❌ Проблема скорее всего в строках подключения к базе данных');
  
  // Создаем исправленный .env файл
  createFixedEnvFile();
  
  console.log('\n📋 СЛЕДУЮЩИЕ ШАГИ:');
  console.log('==================');
  console.log('1. Откройте Supabase Dashboard: https://supabase.com/dashboard');
  console.log('2. Выберите ваш проект');
  console.log('3. Перейдите в Project Settings -> Database');
  console.log('4. Скопируйте пароль из Connection string');
  console.log('5. Замените [PASSWORD] в .env файле на реальный пароль');
  console.log('6. Запустите: npx prisma migrate status');
  console.log('7. Если подключение работает, запустите: node restore-from-json.js');
  
  console.log('\n🚨 АЛЬТЕРНАТИВНОЕ РЕШЕНИЕ:');
  console.log('Если проблемы продолжаются, создайте новый проект Supabase:');
  console.log('1. Перейдите на https://supabase.com/dashboard');
  console.log('2. Создайте новый проект');
  console.log('3. Обновите все настройки в .env файле');
}

if (require.main === module) {
  main().catch(console.error);
}