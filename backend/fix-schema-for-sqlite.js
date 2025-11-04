#!/usr/bin/env node

/**
 * 🔧 ИСПРАВЛЕНИЕ СХЕМЫ ДЛЯ SQLITE
 *
 * Конвертирует правильную PostgreSQL схему в SQLite
 * с сохранением всех имен моделей
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 ИСПРАВЛЕНИЕ PRISMA СХЕМЫ ДЛЯ SQLITE');
console.log('='.repeat(60));

// Используем правильную PostgreSQL схему
const postgresSchemaPath = path.join(__dirname, 'prisma', 'schema-postgresql-backup.prisma');
const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');

if (!fs.existsSync(postgresSchemaPath)) {
  console.log('❌ Файл schema-postgresql-backup.prisma не найден!');
  process.exit(1);
}

console.log('📖 Читаем PostgreSQL схему...');
let schema = fs.readFileSync(postgresSchemaPath, 'utf8');

console.log('🔧 Применяем изменения для SQLite...\n');

// 1. Меняем datasource на SQLite
schema = schema.replace(
  /datasource db \{[\s\S]*?\}/,
  `datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}`
);
console.log('   ✅ Datasource изменен на SQLite');

// 2. Убираем PostgreSQL специфичные атрибуты
schema = schema.replace(/@db\.Uuid/g, '');
schema = schema.replace(/@db\.VarChar\(\d+\)/g, '');
schema = schema.replace(/@db\.Timestamptz\(\d+\)/g, '');
schema = schema.replace(/@db\.Decimal\(\d+,\s*\d+\)/g, '');
schema = schema.replace(/@db\.Date/g, '');
schema = schema.replace(/@db\.DateTime/g, '');
console.log('   ✅ Удалены PostgreSQL типы данных');

// 3. Убираем extensions и previewFeatures
schema = schema.replace(/previewFeatures\s*=\s*\[.*?\]/g, '');
schema = schema.replace(/extensions\s*=\s*\[.*?\]/g, '');
console.log('   ✅ Удалены extensions');

// 4. Заменяем UUID генерацию
schema = schema.replace(/dbgenerated\("uuid_generate_v4\(\)"\)/g, 'cuid()');
schema = schema.replace(/@default\(dbgenerated\("uuid_generate_v4\(\)"\)\)/g, '@default(cuid())');
console.log('   ✅ UUID генерация заменена на cuid()');

// 5. Убираем лишние пустые строки
schema = schema.replace(/\n\n\n+/g, '\n\n');

// Записываем новую схему
fs.writeFileSync(schemaPath, schema);
console.log('   ✅ Схема сохранена\n');

console.log('✅ СХЕМА УСПЕШНО ИСПРАВЛЕНА!');
console.log('\n💾 Файл: prisma/schema.prisma');
console.log('📦 Модели используют правильные имена (providers, slots, etc.)');
