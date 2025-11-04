#!/usr/bin/env node

/**
 * 🌐 ТЕСТ СЕТЕВОГО ПОДКЛЮЧЕНИЯ
 */

const https = require('https');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log('🌐 ТЕСТИРОВАНИЕ СЕТЕВОГО ПОДКЛЮЧЕНИЯ');
console.log('=====================================');

// Тест 1: Проверка подключения к Google
function testGoogle() {
  return new Promise((resolve) => {
    console.log('🔍 Тест 1: Подключение к Google...');
    
    const req = https.request('https://www.google.com', (res) => {
      console.log('✅ Google доступен, статус:', res.statusCode);
      resolve(true);
    });
    
    req.on('error', (err) => {
      console.log('❌ Google недоступен:', err.message);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Google: таймаут');
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

// Тест 2: Проверка подключения к Supabase
function testSupabase() {
  return new Promise((resolve) => {
    console.log('🔍 Тест 2: Подключение к Supabase...');
    
    const supabaseUrl = process.env.SUPABASE_URL;
    if (!supabaseUrl) {
      console.log('❌ SUPABASE_URL не найден');
      resolve(false);
      return;
    }
    
    const url = new URL(supabaseUrl);
    const req = https.request(url, (res) => {
      console.log('✅ Supabase доступен, статус:', res.statusCode);
      resolve(true);
    });
    
    req.on('error', (err) => {
      console.log('❌ Supabase недоступен:', err.message);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log('❌ Supabase: таймаут');
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

// Тест 3: Проверка Supabase клиента
async function testSupabaseClient() {
  console.log('🔍 Тест 3: Supabase клиент...');
  
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    
    // Простой запрос
    const { data, error } = await supabase
      .from('_prisma_migrations')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('⚠️ Supabase клиент: ошибка -', error.message);
      return false;
    }
    
    console.log('✅ Supabase клиент работает');
    return true;
    
  } catch (err) {
    console.log('❌ Supabase клиент: исключение -', err.message);
    return false;
  }
}

async function main() {
  console.log('Переменные окружения:');
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Установлен' : '❌ Не найден');
  console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Установлен' : '❌ Не найден');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Установлен' : '❌ Не найден');
  console.log('');
  
  const googleOk = await testGoogle();
  const supabaseOk = await testSupabase();
  const clientOk = await testSupabaseClient();
  
  console.log('');
  console.log('📊 РЕЗУЛЬТАТЫ:');
  console.log('Google:', googleOk ? '✅' : '❌');
  console.log('Supabase URL:', supabaseOk ? '✅' : '❌');
  console.log('Supabase Client:', clientOk ? '✅' : '❌');
  
  if (!googleOk) {
    console.log('');
    console.log('🚨 ПРОБЛЕМА: Нет подключения к интернету');
    console.log('Проверьте сетевое подключение, прокси или брандмауэр');
  } else if (!supabaseOk) {
    console.log('');
    console.log('🚨 ПРОБЛЕМА: Supabase недоступен');
    console.log('Проверьте SUPABASE_URL или статус сервиса Supabase');
  } else if (!clientOk) {
    console.log('');
    console.log('🚨 ПРОБЛЕМА: Проблемы с аутентификацией Supabase');
    console.log('Проверьте SUPABASE_ANON_KEY или настройки проекта');
  } else {
    console.log('');
    console.log('🎉 ВСЕ ТЕСТЫ ПРОШЛИ УСПЕШНО!');
  }
}

if (require.main === module) {
  main().catch(console.error);
}