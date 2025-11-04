#!/usr/bin/env node

/**
 * ⚡ БЫСТРАЯ НАСТРОЙКА ЛОКАЛЬНОЙ SQLITE БАЗЫ
 *
 * Этот скрипт настраивает локальную SQLite базу данных для разработки
 * и восстанавливает данные из JSON файлов
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('⚡ БЫСТРАЯ НАСТРОЙКА ЛОКАЛЬНОЙ БАЗЫ ДАННЫХ');
console.log('='.repeat(60));

// Шаг 1: Создаем локальный .env файл
console.log('\n📝 Шаг 1: Настройка переменных окружения...');

const envLocal = `
# Локальная SQLite база данных для разработки
DATABASE_URL="file:./dev.db"
DIRECT_URL="file:./dev.db"

# Supabase configuration (для будущего использования)
SUPABASE_URL="https://hxwyfdjfugcogpkjpjot.supabase.co"
SUPABASE_ANON_KEY="ваш_ключ_здесь"
SUPABASE_SERVICE_ROLE_KEY="ваш_ключ_здесь"
`.trim();

const envPath = path.join(__dirname, '.env');
const envBackupPath = path.join(__dirname, '.env.supabase.backup');

// Создаем бэкап текущего .env
if (fs.existsSync(envPath)) {
  console.log('   📦 Создание бэкапа текущего .env...');
  fs.copyFileSync(envPath, envBackupPath);
  console.log(`   ✅ Бэкап сохранен: .env.supabase.backup`);
}

// Записываем новый .env
fs.writeFileSync(envPath, envLocal);
console.log('   ✅ Файл .env обновлен для локальной базы данных');

// Шаг 2: Обновляем schema.prisma для SQLite
console.log('\n📝 Шаг 2: Настройка Prisma схемы для SQLite...');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
const schemaBackupPath = path.join(__dirname, 'prisma', 'schema.prisma.postgresql.backup');

// Создаем бэкап текущей схемы
if (fs.existsSync(schemaPath)) {
  fs.copyFileSync(schemaPath, schemaBackupPath);
  console.log('   ✅ Бэкап схемы сохранен: schema.prisma.postgresql.backup');
}

// Проверяем, есть ли уже готовая SQLite схема
const schemaSqlitePath = path.join(__dirname, 'schema-sqlite.prisma');
if (fs.existsSync(schemaSqlitePath)) {
  console.log('   📦 Найдена готовая SQLite схема');
  fs.copyFileSync(schemaSqlitePath, schemaPath);
  console.log('   ✅ SQLite схема применена');
} else {
  // Читаем текущую схему и модифицируем для SQLite
  let schema = fs.readFileSync(schemaPath, 'utf8');

  // Заменяем datasource для SQLite
  schema = schema.replace(
    /datasource db \{[\s\S]*?\}/,
    `datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}`
  );

  // Убираем PostgreSQL специфичные штуки
  schema = schema.replace(/@db\.Uuid/g, '');
  schema = schema.replace(/@db\.VarChar\(\d+\)/g, '');
  schema = schema.replace(/@db\.Timestamptz\(\d+\)/g, '@db.DateTime');
  schema = schema.replace(/@db\.Decimal\(\d+,\s*\d+\)/g, '');
  schema = schema.replace(/@db\.Date/g, '');
  schema = schema.replace(/uuid_generate_v4\(\)/g, 'cuid()');
  schema = schema.replace(/extensions = \[.*?\]/g, '');
  schema = schema.replace(/previewFeatures = \[.*?\]/g, '');

  fs.writeFileSync(schemaPath, schema);
  console.log('   ✅ Схема адаптирована для SQLite');
}

// Шаг 3: Генерируем Prisma Client
console.log('\n📝 Шаг 3: Генерация Prisma Client...');
try {
  execSync('npx prisma generate', {
    stdio: 'inherit',
    cwd: __dirname
  });
  console.log('   ✅ Prisma Client сгенерирован');
} catch (error) {
  console.log('   ⚠️ Ошибка генерации Prisma Client');
}

// Шаг 4: Применяем миграции
console.log('\n📝 Шаг 4: Создание базы данных...');
try {
  execSync('npx prisma db push --force-reset --skip-generate', {
    stdio: 'inherit',
    cwd: __dirname
  });
  console.log('   ✅ База данных создана');
} catch (error) {
  console.log('   ⚠️ Ошибка создания базы данных');
}

console.log('\n✅ ЛОКАЛЬНАЯ БАЗА ДАННЫХ НАСТРОЕНА!');
console.log('\n💡 Следующие шаги:');
console.log('   1. Запустите восстановление данных:');
console.log('      node restore-from-json-simple.js');
console.log('   2. Или запустите Prisma Studio:');
console.log('      npx prisma studio');
console.log('\n📌 Примечание:');
console.log('   - Данные хранятся в файле: backend/dev.db');
console.log('   - Для возврата к PostgreSQL используйте бэкап: .env.supabase.backup');
