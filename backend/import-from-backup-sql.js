#!/usr/bin/env node

/**
 * 📦 ИМПОРТ ДАННЫХ ИЗ ПОСЛЕДНЕГО POSTGRESQL БЭКАПА
 *
 * Берет последний PostgreSQL бэкап и импортирует только INSERT команды
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

console.log('📦 ИМПОРТ ДАННЫХ ИЗ POSTGRESQL БЭКАПА');
console.log('='.repeat(60));

async function importFromBackup() {
  try {
    // Находим последний бэкап
    const backupsDir = path.join(__dirname, '..', 'backups', 'db');
    const files = fs.readdirSync(backupsDir);

    const postgresBackups = files
      .filter(file => file.includes('postgresql_v005') && file.endsWith('.sql'))
      .sort()
      .reverse();

    if (postgresBackups.length === 0) {
      throw new Error('PostgreSQL бэкапы не найдены');
    }

    const backupFile = postgresBackups[0];
    const backupPath = path.join(backupsDir, backupFile);

    console.log(`\n📁 Используем бэкап: ${backupFile}`);
    console.log(`📍 Путь: ${backupPath}\n`);

    // Читаем бэкап
    const backupContent = fs.readFileSync(backupPath, 'utf8');

    // Извлекаем только INSERT команды
    const insertStatements = backupContent
      .split('\n')
      .filter(line => line.startsWith('INSERT INTO'))
      .map(line => {
        // Убираем "ON CONFLICT" часть
        return line.replace(/\s+ON CONFLICT.*?;/, ';').trim();
      });

    console.log(`📊 Найдено ${insertStatements.length} INSERT команд\n`);

    // Выполняем вставку
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < insertStatements.length; i++) {
      const statement = insertStatements[i];

      try {
        await prisma.$executeRawUnsafe(statement);
        successCount++;

        if ((i + 1) % 50 === 0) {
          process.stdout.write(`\r⏳ Вставлено: ${i + 1}/${insertStatements.length}`);
        }
      } catch (error) {
        errorCount++;
        // Игнорируем ошибки дубликатов
        if (!error.message.includes('UNIQUE constraint')) {
          console.log(`\n⚠️  Ошибка в строке ${i + 1}: ${error.message.substring(0, 100)}`);
        }
      }
    }

    console.log(`\n\n📊 РЕЗУЛЬТАТЫ ИМПОРТА:`);
    console.log(`✅ Успешно: ${successCount}`);
    console.log(`⚠️  Ошибок: ${errorCount}`);

    // Проверяем результат
    console.log(`\n📊 ПРОВЕРКА ДАННЫХ:`);
    const counts = {
      providers: await prisma.providers.count(),
      mechanics: await prisma.mechanics.count(),
      themes: await prisma.themes.count(),
      categories: await prisma.slot_categories.count(),
      slots: await prisma.slots.count()
    };

    console.log(`🏢 Провайдеры:     ${counts.providers}`);
    console.log(`🔧 Механики:       ${counts.mechanics}`);
    console.log(`🎨 Темы:           ${counts.themes}`);
    console.log(`📁 Категории:      ${counts.categories}`);
    console.log(`🎰 Слоты:          ${counts.slots}`);

    if (counts.providers > 0 || counts.slots > 0) {
      console.log(`\n🎉 ДАННЫЕ УСПЕШНО ИМПОРТИРОВАНЫ!`);
      console.log(`\n💡 Теперь запустите:`);
      console.log(`   npm run start:dev`);
    } else {
      console.log(`\n⚠️  ДАННЫЕ НЕ ИМПОРТИРОВАНЫ`);
    }

  } catch (error) {
    console.error(`\n❌ ОШИБКА:`, error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

importFromBackup();
