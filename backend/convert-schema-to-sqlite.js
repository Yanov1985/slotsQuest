#!/usr/bin/env node

/**
 * 🔄 КОНВЕРТАЦИЯ PRISMA СХЕМЫ ДЛЯ SQLITE
 *
 * Этот скрипт конвертирует PostgreSQL схему в SQLite,
 * сохраняя все имена моделей и полей
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 КОНВЕРТАЦИЯ PRISMA СХЕМЫ ДЛЯ SQLITE');
console.log('='.repeat(60));

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
const backupPath = path.join(__dirname, 'prisma', 'schema.prisma.postgresql.backup');

// Создаем бэкап
if (fs.existsSync(schemaPath)) {
  fs.copyFileSync(schemaPath, backupPath);
  console.log('✅ Создан бэкап: schema.prisma.postgresql.backup');
}

// Читаем схему
let schema = fs.readFileSync(backupPath, 'utf8');

console.log('\n🔧 Применяем изменения для SQLite...');

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

// 3. Убираем extensions
schema = schema.replace(/previewFeatures\s*=\s*\[.*?\]/g, '');
schema = schema.replace(/extensions\s*=\s*\[.*?\]/g, '');
console.log('   ✅ Удалены extensions');

// 4. Заменяем UUID генерацию
schema = schema.replace(/uuid_generate_v4\(\)/g, 'cuid()');
console.log('   ✅ UUID генерация заменена на cuid()');

// 5. Убираем лишние пустые строки
schema = schema.replace(/\n\n\n+/g, '\n\n');

// Записываем новую схему
fs.writeFileSync(schemaPath, schema);
console.log('   ✅ Схема сохранена');

console.log('\n✅ КОНВЕРТАЦИЯ ЗАВЕРШЕНА!');
console.log('\n📝 Следующие шаги:');
console.log('   1. Сгенерировать Prisma Client: npx prisma generate');
console.log('   2. Применить схему: npx prisma db push --force-reset');
console.log('   3. Восстановить данные: node restore-from-json-simple.js');
console.log('   4. Перезапустить backend: npm run start:dev');
