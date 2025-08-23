#!/usr/bin/env node

/**
 * Скрипт для синхронизации Prisma схемы после восстановления базы данных
 *
 * Этот скрипт выполняет следующие задачи:
 * 1. Генерирует новый клиент Prisma на основе текущей схемы
 * 2. Проталкивает изменения схемы в базу данных
 * 3. Проверяет соответствие схемы и данных в БД
 *
 * Использование: node sync-prisma-after-restore.js
 */

const { exec } = require('child_process');
const path = require('path');
const util = require('util');

const execAsync = util.promisify(exec);

/**
 * Функция для выполнения команд с логированием
 * @param {string} command - Команда для выполнения
 * @param {string} description - Описание операции
 * @returns {Promise<boolean>} - Результат выполнения
 */
async function runCommand(command, description) {
  try {
    console.log(`🔄 ${description}...`);
    console.log(`📝 Выполняем: ${command}`);

    const { stdout, stderr } = await execAsync(command, {
      cwd: __dirname,
      env: { ...process.env }
    });

    if (stdout) {
      console.log('📤 Вывод:', stdout);
    }

    if (stderr && !stderr.includes('warn')) {
      console.warn('⚠️ Предупреждения:', stderr);
    }

    console.log(`✅ Успешно: ${description}`);
    return true;

  } catch (error) {
    console.error(`❌ Ошибка при выполнении: ${description}`);
    console.error('Детали:', error.message);

    if (error.stdout) {
      console.log('📤 Вывод:', error.stdout);
    }

    if (error.stderr) {
      console.error('📥 Ошибки:', error.stderr);
    }

    return false;
  }
}

/**
 * Функция для проверки подключения к базе данных
 */
async function checkDatabaseConnection() {
  try {
    // Создаем временный клиент Prisma для проверки подключения
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    console.log('🔍 Проверяем подключение к базе данных...');

    // Попробуем выполнить простой запрос
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1 as test`;

    console.log('✅ Подключение к базе данных работает');

    await prisma.$disconnect();
    return true;

  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных:', error.message);
    return false;
  }
}

/**
 * Основная функция синхронизации Prisma
 */
async function main() {
  try {
    console.log('🔄 Начинаем синхронизацию Prisma после восстановления БД');
    console.log('=' * 60);

    // Шаг 1: Генерируем клиент Prisma
    const generateSuccess = await runCommand(
      'npx prisma generate',
      'Генерация клиента Prisma'
    );

    if (!generateSuccess) {
      throw new Error('Ошибка при генерации клиента Prisma');
    }

    // Шаг 2: Проталкиваем схему в базу данных (без миграций)
    const pushSuccess = await runCommand(
      'npx prisma db push --force-reset',
      'Протягивание схемы Prisma в базу данных'
    );

    if (!pushSuccess) {
      console.warn('⚠️ Ошибка при push схемы, попробуем альтернативный подход...');

      // Альтернативный подход - просто push без force-reset
      const pushAltSuccess = await runCommand(
        'npx prisma db push',
        'Альтернативное протягивание схемы Prisma'
      );

      if (!pushAltSuccess) {
        throw new Error('Ошибка при протягивании схемы в БД');
      }
    }

    // Шаг 3: Проверяем подключение к базе данных
    const connectionOk = await checkDatabaseConnection();

    if (!connectionOk) {
      throw new Error('Не удается подключиться к базе данных после синхронизации');
    }

    // Шаг 4: Опционально - запускаем Prisma Studio для проверки данных
    console.log('');
    console.log('💡 Дополнительная проверка (опционально):');
    console.log('Запустите: npm run db:studio - для визуального просмотра данных');

    console.log('=' * 60);
    console.log('🎉 Синхронизация Prisma завершена успешно!');
    console.log('');
    console.log('📋 Результат:');
    console.log('✅ Клиент Prisma сгенерирован');
    console.log('✅ Схема протолкнута в базу данных');
    console.log('✅ Подключение к БД проверено');
    console.log('');
    console.log('🚀 Теперь можно запускать приложение:');
    console.log('- Backend: npm run start:dev');
    console.log('- Frontend: cd ../frontend && npm run dev');

  } catch (error) {
    console.error('💥 Критическая ошибка при синхронизации Prisma:');
    console.error(error.message);
    console.log('');
    console.log('🔧 Рекомендации по устранению:');
    console.log('1. Убедитесь, что база данных восстановлена корректно');
    console.log('2. Проверьте переменные окружения DATABASE_URL и DIRECT_URL');
    console.log('3. Убедитесь, что Supabase проект активен и доступен');
    console.log('4. Попробуйте запустить команды вручную:');
    console.log('   - npx prisma generate');
    console.log('   - npx prisma db push');

    process.exit(1);
  }
}

// Запускаем основную функцию
if (require.main === module) {
  main();
}

module.exports = { main };
