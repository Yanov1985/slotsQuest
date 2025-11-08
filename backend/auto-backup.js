#!/usr/bin/env node

/**
 * 🔄 АВТОМАТИЧЕСКИЙ БЭКАП
 *
 * Создает бэкап базы данных и данных в JSON
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

console.log('🔄 АВТОМАТИЧЕСКИЙ БЭКАП');
console.log('='.repeat(60));

async function createFullBackup() {
  try {
    // 1. Копируем файл базы данных
    console.log('\n1️⃣ Копирование файла базы данных...');
    const dbPath = path.join(__dirname, 'prisma', 'dev.db');
    const backupDir = path.join(__dirname, '..', 'backups', 'db');

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const dbBackupPath = path.join(backupDir, `dev_backup_${timestamp}.db`);
    fs.copyFileSync(dbPath, dbBackupPath);

    const dbSize = (fs.statSync(dbBackupPath).size / 1024).toFixed(2);
    console.log(`   ✅ База данных: ${path.basename(dbBackupPath)} (${dbSize} KB)`);

    // Копируем как LATEST
    const latestPath = path.join(backupDir, 'dev_backup_LATEST.db');
    fs.copyFileSync(dbPath, latestPath);

    // 2. Экспортируем данные в JSON
    console.log('\n2️⃣ Экспорт данных в JSON...');

    const providers = await prisma.providers.findMany();
    const mechanics = await prisma.mechanics.findMany();
    const themes = await prisma.themes.findMany();
    const categories = await prisma.slot_categories.findMany();
    const slots = await prisma.slots.findMany();

    const jsonBackupDir = path.join(__dirname, 'studio-data');
    if (!fs.existsSync(jsonBackupDir)) {
      fs.mkdirSync(jsonBackupDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(jsonBackupDir, 'providers.json'),
      JSON.stringify(providers, null, 2)
    );
    fs.writeFileSync(
      path.join(jsonBackupDir, 'mechanics.json'),
      JSON.stringify(mechanics, null, 2)
    );
    fs.writeFileSync(
      path.join(jsonBackupDir, 'themes.json'),
      JSON.stringify(themes, null, 2)
    );
    fs.writeFileSync(
      path.join(jsonBackupDir, 'slot_categories.json'),
      JSON.stringify(categories, null, 2)
    );
    fs.writeFileSync(
      path.join(jsonBackupDir, 'slots.json'),
      JSON.stringify(slots, null, 2)
    );

    console.log(`   ✅ Провайдеры: ${providers.length} записей`);
    console.log(`   ✅ Механики: ${mechanics.length} записей`);
    console.log(`   ✅ Темы: ${themes.length} записей`);
    console.log(`   ✅ Категории: ${categories.length} записей`);
    console.log(`   ✅ Слоты: ${slots.length} записей`);

    // 3. Создаем сводку
    const summary = {
      timestamp: new Date().toISOString(),
      dbFile: path.basename(dbBackupPath),
      dbSize: `${dbSize} KB`,
      counts: {
        providers: providers.length,
        mechanics: mechanics.length,
        themes: themes.length,
        categories: categories.length,
        slots: slots.length
      }
    };

    fs.writeFileSync(
      path.join(jsonBackupDir, 'backup-summary.json'),
      JSON.stringify(summary, null, 2)
    );

    console.log('\n✅ АВТОМАТИЧЕСКИЙ БЭКАП ЗАВЕРШЕН!');
    console.log('\n📦 Создано:');
    console.log(`   📁 База данных: backups/db/${path.basename(dbBackupPath)}`);
    console.log(`   📁 JSON данные: backend/studio-data/`);
    console.log(`   📁 Актуальная копия: backups/db/dev_backup_LATEST.db`);

    console.log('\n💡 Для восстановления:');
    console.log('   npm run db:restore  - восстановить из .db файла');
    console.log('   npm run db:restore-json  - восстановить из JSON');

  } catch (error) {
    console.error('\n❌ ОШИБКА:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createFullBackup();
