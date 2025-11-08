#!/usr/bin/env node

/**
 * ⚡ БЫСТРОЕ ВОССТАНОВЛЕНИЕ БАЗЫ ДАННЫХ
 *
 * Восстанавливает последний бэкап базы данных
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const backupDir = path.join(__dirname, '..', 'backups', 'db');
const latestBackupPath = path.join(backupDir, 'dev_backup_LATEST.db');

console.log('⚡ БЫСТРОЕ ВОССТАНОВЛЕНИЕ БАЗЫ ДАННЫХ');
console.log('='.repeat(60));

// Проверяем наличие бэкапа
if (!fs.existsSync(latestBackupPath)) {
  console.log('\n❌ Последний бэкап не найден!');
  console.log('💡 Создайте бэкап командой: npm run db:backup');
  process.exit(1);
}

// Показываем информацию о бэкапе
const backupStats = fs.statSync(latestBackupPath);
const backupDate = backupStats.mtime;
const backupSize = (backupStats.size / 1024).toFixed(2);

console.log('\n📦 ИНФОРМАЦИЯ О БЭКАПЕ:');
console.log(`📁 Файл: dev_backup_LATEST.db`);
console.log(`💾 Размер: ${backupSize} KB`);
console.log(`⏰ Дата создания: ${backupDate.toLocaleString('ru-RU')}`);

// Показываем информацию о текущей базе
if (fs.existsSync(dbPath)) {
  const currentStats = fs.statSync(dbPath);
  const currentSize = (currentStats.size / 1024).toFixed(2);
  console.log('\n📊 ТЕКУЩАЯ БАЗА ДАННЫХ:');
  console.log(`💾 Размер: ${currentSize} KB`);
  console.log(`⏰ Изменена: ${currentStats.mtime.toLocaleString('ru-RU')}`);
}

// Спрашиваем подтверждение
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n⚠️  ВНИМАНИЕ: Текущая база данных будет заменена!');
rl.question('Продолжить? (y/n): ', (answer) => {
  rl.close();

  if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'д' && answer.toLowerCase() !== 'да') {
    console.log('\n❌ Восстановление отменено');
    process.exit(0);
  }

  try {
    // Создаем резервную копию текущей базы перед восстановлением
    if (fs.existsSync(dbPath)) {
      const beforeRestoreBackup = path.join(backupDir, 'dev_before_restore.db');
      fs.copyFileSync(dbPath, beforeRestoreBackup);
      console.log('\n📦 Текущая база сохранена: dev_before_restore.db');
    }

    // Восстанавливаем из бэкапа
    fs.copyFileSync(latestBackupPath, dbPath);

    console.log('\n✅ БАЗА ДАННЫХ ВОССТАНОВЛЕНА!');
    console.log('📁 Файл: dev.db');
    console.log(`💾 Размер: ${backupSize} KB`);

    console.log('\n🎉 ГОТОВО!');
    console.log('💡 Перезапустите backend если он запущен:');
    console.log('   1. Остановите: Ctrl+C');
    console.log('   2. Запустите: npm run dev:watch');

  } catch (error) {
    console.log('\n❌ ОШИБКА ПРИ ВОССТАНОВЛЕНИИ:', error.message);
    process.exit(1);
  }
});
