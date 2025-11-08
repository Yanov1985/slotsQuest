#!/usr/bin/env node

/**
 * ⚡ БЫСТРЫЙ БЭКАП БАЗЫ ДАННЫХ
 *
 * Создает копию текущей базы данных SQLite
 */

const fs = require('fs');
const path = require('path');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const backupDir = path.join(__dirname, '..', 'backups', 'db');
const backupPath = path.join(backupDir, `dev_backup_${timestamp}.db`);

console.log('⚡ БЫСТРЫЙ БЭКАП БАЗЫ ДАННЫХ');
console.log('='.repeat(60));

// Проверяем существование базы данных
if (!fs.existsSync(dbPath)) {
  console.log('❌ База данных dev.db не найдена!');
  process.exit(1);
}

// Создаем папку для бэкапов если её нет
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Копируем базу данных
try {
  fs.copyFileSync(dbPath, backupPath);

  const stats = fs.statSync(backupPath);
  const sizeKB = (stats.size / 1024).toFixed(2);

  console.log('\n✅ БЭКАП СОЗДАН УСПЕШНО!');
  console.log(`📁 Файл: ${path.basename(backupPath)}`);
  console.log(`📍 Путь: ${backupPath}`);
  console.log(`💾 Размер: ${sizeKB} KB`);
  console.log(`⏰ Время: ${new Date().toLocaleString('ru-RU')}`);

  // Также создаем копию как "latest"
  const latestPath = path.join(backupDir, 'dev_backup_LATEST.db');
  fs.copyFileSync(dbPath, latestPath);
  console.log(`\n📌 Актуальная копия: dev_backup_LATEST.db`);

  // Показываем список всех бэкапов
  const backups = fs.readdirSync(backupDir)
    .filter(f => f.endsWith('.db'))
    .sort()
    .reverse()
    .slice(0, 5);

  console.log('\n📦 Последние 5 бэкапов:');
  backups.forEach((file, index) => {
    const filePath = path.join(backupDir, file);
    const fileStats = fs.statSync(filePath);
    const fileSize = (fileStats.size / 1024).toFixed(2);
    console.log(`   ${index + 1}. ${file} (${fileSize} KB)`);
  });

  console.log('\n💡 Для восстановления запустите:');
  console.log('   npm run db:restore');

} catch (error) {
  console.log('\n❌ ОШИБКА ПРИ СОЗДАНИИ БЭКАПА:', error.message);
  process.exit(1);
}
