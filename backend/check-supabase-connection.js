#!/usr/bin/env node

/**
 * 🔍 ПРОВЕРКА ПОДКЛЮЧЕНИЯ К SUPABASE
 *
 * Проверяет доступность проекта Supabase
 */

require('dotenv').config();
const https = require('https');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

console.log('🔍 ПРОВЕРКА ПОДКЛЮЧЕНИЯ К SUPABASE');
console.log('='.repeat(60));

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.log('❌ Переменные окружения не найдены!');
  console.log('   Проверьте файл .env');
  process.exit(1);
}

console.log(`\n📍 Supabase URL: ${SUPABASE_URL}`);
console.log(`🔑 Anon Key: ${SUPABASE_ANON_KEY.substring(0, 20)}...`);

// Проверяем доступность URL
console.log('\n🌐 Проверка доступности...');

const url = new URL(`${SUPABASE_URL}/rest/v1/`);

const options = {
  hostname: url.hostname,
  port: 443,
  path: url.pathname,
  method: 'GET',
  headers: {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
  }
};

const req = https.request(options, (res) => {
  console.log(`📊 Статус ответа: ${res.statusCode} ${res.statusMessage}`);

  if (res.statusCode === 200 || res.statusCode === 401 || res.statusCode === 404) {
    console.log('✅ Supabase проект доступен!');
    console.log('\n💡 Проблема может быть в:');
    console.log('   1. Неверный пароль в DATABASE_URL');
    console.log('   2. База данных была сброшена');
    console.log('   3. Нужно применить миграции Prisma');
    console.log('\n📝 Рекомендации:');
    console.log('   1. Зайдите в Supabase Dashboard');
    console.log('   2. Проверьте, что база данных создана');
    console.log('   3. Запустите: npx prisma db push');
    console.log('   4. Затем восстановите данные');
  } else {
    console.log('❌ Проблема с подключением');
  }

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (data && res.statusCode !== 200) {
      console.log('\n📋 Ответ сервера:');
      try {
        const json = JSON.parse(data);
        console.log(JSON.stringify(json, null, 2));
      } catch {
        console.log(data.substring(0, 500));
      }
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Ошибка подключения:', error.message);
  console.log('\n💡 Возможные причины:');
  console.log('   1. Нет интернет-соединения');
  console.log('   2. Supabase проект удален или недоступен');
  console.log('   3. Неверный URL в .env');
});

req.end();
