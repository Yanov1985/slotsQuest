#!/usr/bin/env node

/**
 * 🔧 НАСТРОЙКА ЛОКАЛЬНОЙ БАЗЫ ДАННЫХ
 * 
 * Этот скрипт помогает настроить локальную базу данных
 * для разработки когда Supabase недоступен
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log('🔧 НАСТРОЙКА ЛОКАЛЬНОЙ БАЗЫ ДАННЫХ');
console.log('=' * 50);

const envPath = path.join(__dirname, '.env');
const sqliteSchemaPath = path.join(__dirname, 'schema-sqlite.prisma');
const postgresSchemaPath = path.join(__dirname, 'prisma', 'schema.prisma');

async function setupLocalDatabase() {
  try {
    console.log('📋 Выберите тип базы данных:');
    console.log('1. SQLite (локальная, быстрая настройка)');
    console.log('2. PostgreSQL (Supabase, требует настройки)');
    console.log('');
    
    // Проверяем текущее состояние
    const envContent = fs.readFileSync(envPath, 'utf8');
    const currentDb = envContent.includes('file:./dev.db') ? 'SQLite' : 'PostgreSQL';
    
    console.log(`📊 Текущая БД: ${currentDb}`);
    console.log('');
    
    // Автоматически выбираем SQLite, так как Supabase недоступен
    console.log('🔄 Переключаемся на SQLite (Supabase недоступен)...');
    
    // 1. Обновляем .env для SQLite
    console.log('📝 Обновляем .env файл...');
    const newEnvContent = `# Server configuration
PORT=3001

# Supabase configuration (временно отключено)
# SUPABASE_URL="https://hxwyfdjfugcogpkjpjot.supabase.co"
# SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4d3lmZGpmdWdjb2dwa2pwam90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTc1MDIsImV4cCI6MjA2ODgzMzUwMn0.eljiuE2k8zkokrX7M73Xdz1lZ-pK8e1TkE7PFN3iqw0"
# SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4d3lmZGpmdWdjb2dwa2pwam90Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzI1NzUwMiwiZXhwIjoyMDY4ODMzNTAyfQ.02LWAZ20WKzqUNKoFDRhewykDX6g66WDBEOCXRhGbJQ"

# Prisma configuration - SQLite (локальная разработка)
DATABASE_URL="file:./dev.db"
DIRECT_URL="file:./dev.db"
`;
    
    fs.writeFileSync(envPath, newEnvContent);
    console.log('✅ .env файл обновлен для SQLite');
    
    // 2. Копируем SQLite схему
    console.log('📋 Обновляем Prisma схему...');
    if (fs.existsSync(sqliteSchemaPath)) {
      fs.copyFileSync(sqliteSchemaPath, postgresSchemaPath);
      console.log('✅ Prisma схема обновлена для SQLite');
    } else {
      console.log('⚠️ SQLite схема не найдена, используем текущую');
    }
    
    // 3. Проверяем наличие данных
    const dbPath = path.join(__dirname, 'dev.db');
    if (fs.existsSync(dbPath)) {
      const stats = fs.statSync(dbPath);
      console.log(`📊 База данных SQLite найдена (${(stats.size / 1024).toFixed(1)} KB)`);
      console.log('✅ Данные уже восстановлены');
    } else {
      console.log('📁 База данных SQLite не найдена');
      console.log('🔄 Нужно восстановить данные из бекапа');
    }
    
    console.log('');
    console.log('🎉 НАСТРОЙКА ЗАВЕРШЕНА!');
    console.log('');
    console.log('📋 СЛЕДУЮЩИЕ ШАГИ:');
    console.log('1. Запустите: npm run dev (для запуска приложения)');
    console.log('2. Или: npx prisma studio (для просмотра данных)');
    console.log('');
    console.log('💡 ПРИМЕЧАНИЕ:');
    console.log('- Используется локальная SQLite база данных');
    console.log('- Все данные сохраняются в файле dev.db');
    console.log('- Для продакшена настройте Supabase подключение');
    
  } catch (error) {
    console.error('🚨 ОШИБКА НАСТРОЙКИ:', error.message);
    process.exit(1);
  }
}

setupLocalDatabase();