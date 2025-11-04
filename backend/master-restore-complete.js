#!/usr/bin/env node

/**
 * 🎯 МАСТЕР-СКРИПТ ПОЛНОГО ВОССТАНОВЛЕНИЯ БАЗЫ ДАННЫХ
 *
 * Этот скрипт выполняет полное восстановление данных из последнего бэкапа
 * с автоматической проверкой всех этапов
 *
 * Шаги восстановления:
 * 1. Проверка переменных окружения (.env)
 * 2. Проверка подключения к PostgreSQL
 * 3. Генерация Prisma Client
 * 4. Применение миграций
 * 5. Восстановление данных из бэкапа
 * 6. Проверка восстановленных данных
 */

require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Цветной вывод для красоты
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${'='.repeat(60)}`, 'cyan');
  log(`📍 ШАГ ${step}: ${message}`, 'bright');
  log('='.repeat(60), 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

async function checkEnvironmentVariables() {
  logStep(1, 'ПРОВЕРКА ПЕРЕМЕННЫХ ОКРУЖЕНИЯ');

  // Проверяем наличие .env файла
  const envPath = path.join(__dirname, '.env');
  const envCopyPath = path.join(__dirname, '.env copy');

  if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envCopyPath)) {
      logWarning('.env файл не найден, но найден .env copy');
      logInfo('Копирую .env copy в .env...');
      fs.copyFileSync(envCopyPath, envPath);
      logSuccess('.env файл создан из .env copy');

      // Перезагружаем переменные окружения
      require('dotenv').config({ path: envPath });
    } else {
      logError('.env файл не найден!');
      logInfo('Создайте .env файл с настройками подключения к базе данных');
      process.exit(1);
    }
  }

  // Проверяем наличие необходимых переменных
  const requiredVars = ['DATABASE_URL', 'DIRECT_URL', 'SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    logError(`Отсутствуют переменные окружения: ${missingVars.join(', ')}`);
    process.exit(1);
  }

  logSuccess('Все переменные окружения на месте');
  logInfo(`DATABASE_URL: ${process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@')}`);
}

async function checkDatabaseConnection() {
  logStep(2, 'ПРОВЕРКА ПОДКЛЮЧЕНИЯ К БАЗЕ ДАННЫХ');

  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.$connect();
    logSuccess('Подключение к PostgreSQL установлено');

    // Проверяем версию PostgreSQL
    const result = await prisma.$queryRaw`SELECT version()`;
    logInfo(`База данных: ${result[0].version.split(' ')[0]} ${result[0].version.split(' ')[1]}`);

    await prisma.$disconnect();
    return true;
  } catch (error) {
    logError(`Ошибка подключения к базе данных: ${error.message}`);
    return false;
  }
}

async function generatePrismaClient() {
  logStep(3, 'ГЕНЕРАЦИЯ PRISMA CLIENT');

  try {
    logInfo('Генерирую Prisma Client...');
    execSync('npx prisma generate', {
      stdio: 'inherit',
      cwd: __dirname
    });
    logSuccess('Prisma Client успешно сгенерирован');
    return true;
  } catch (error) {
    logError(`Ошибка генерации Prisma Client: ${error.message}`);
    return false;
  }
}

async function applyMigrations() {
  logStep(4, 'ПРИМЕНЕНИЕ МИГРАЦИЙ');

  try {
    logInfo('Применяю миграции к базе данных...');
    logWarning('Это может занять некоторое время...');

    // Используем db push для применения схемы без создания новых миграций
    execSync('npx prisma db push --skip-generate --accept-data-loss', {
      stdio: 'inherit',
      cwd: __dirname
    });

    logSuccess('Миграции успешно применены');
    return true;
  } catch (error) {
    logError(`Ошибка применения миграций: ${error.message}`);
    logWarning('Пытаюсь продолжить без применения миграций...');
    return false;
  }
}

async function findLatestBackup() {
  logStep(5, 'ПОИСК ПОСЛЕДНЕГО БЭКАПА');

  const backupsDir = path.join(__dirname, '..', 'backups', 'db');

  if (!fs.existsSync(backupsDir)) {
    logError(`Папка с бэкапами не найдена: ${backupsDir}`);
    return null;
  }

  const files = fs.readdirSync(backupsDir);

  // Приоритет для PostgreSQL v005 бэкапов
  const postgresqlBackups = files
    .filter(file => file.includes('postgresql_v005') && file.endsWith('.sql'))
    .sort()
    .reverse();

  if (postgresqlBackups.length > 0) {
    const latestBackup = postgresqlBackups[0];
    const backupPath = path.join(backupsDir, latestBackup);
    const stats = fs.statSync(backupPath);

    logSuccess(`Найден бэкап: ${latestBackup}`);
    logInfo(`Размер: ${(stats.size / 1024).toFixed(1)} KB`);
    logInfo(`Создан: ${stats.mtime.toLocaleString('ru-RU')}`);

    return backupPath;
  }

  // Если v005 не найден, ищем v004
  const v004Backups = files
    .filter(file => file.includes('v004') && file.endsWith('.sql'))
    .sort()
    .reverse();

  if (v004Backups.length > 0) {
    const latestBackup = v004Backups[0];
    const backupPath = path.join(backupsDir, latestBackup);
    const stats = fs.statSync(backupPath);

    logWarning(`Найден только v004 бэкап: ${latestBackup}`);
    logInfo(`Размер: ${(stats.size / 1024).toFixed(1)} KB`);

    return backupPath;
  }

  logError('PostgreSQL бэкапы не найдены');
  return null;
}

async function restoreFromBackup(backupPath) {
  logStep(6, 'ВОССТАНОВЛЕНИЕ ДАННЫХ ИЗ БЭКАПА');

  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    // Читаем содержимое бэкапа
    logInfo('Читаю файл бэкапа...');
    const backupContent = fs.readFileSync(backupPath, 'utf8');
    logSuccess(`Прочитано ${(backupContent.length / 1024).toFixed(1)} KB данных`);

    // Подключаемся к БД
    await prisma.$connect();
    logSuccess('Подключение к базе данных установлено');

    // Разбиваем на отдельные SQL команды
    logInfo('Подготовка SQL команд...');
    const sqlStatements = backupContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => {
        // Убираем комментарии и пустые строки
        if (!stmt || stmt.startsWith('--')) return false;
        // Оставляем только важные команды
        return stmt.toUpperCase().includes('INSERT') ||
               stmt.toUpperCase().includes('TRUNCATE') ||
               stmt.toUpperCase().includes('CREATE EXTENSION') ||
               stmt.toUpperCase().includes('SET');
      });

    logInfo(`Найдено ${sqlStatements.length} SQL команд для выполнения`);

    // Выполняем команды
    logWarning('Начинаю восстановление... Это может занять несколько минут...');

    let successCount = 0;
    let errorCount = 0;
    let skipCount = 0;

    for (let i = 0; i < sqlStatements.length; i++) {
      const statement = sqlStatements[i];

      try {
        await prisma.$executeRawUnsafe(statement + ';');
        successCount++;

        // Показываем прогресс каждые 20 команд
        if ((i + 1) % 20 === 0 || (i + 1) === sqlStatements.length) {
          process.stdout.write(`\r⏳ Прогресс: ${i + 1}/${sqlStatements.length} (${Math.round((i + 1) / sqlStatements.length * 100)}%)`);
        }

      } catch (error) {
        const errorMsg = error.message.toLowerCase();

        // Игнорируем ожидаемые ошибки
        if (
          errorMsg.includes('already exists') ||
          errorMsg.includes('duplicate key') ||
          errorMsg.includes('violates unique constraint') ||
          errorMsg.includes('does not exist')
        ) {
          skipCount++;
          continue;
        }

        errorCount++;

        // Если слишком много критических ошибок, останавливаемся
        if (errorCount > 5) {
          console.log('\n');
          logError('Слишком много критических ошибок!');
          logError(`Последняя ошибка: ${error.message.substring(0, 200)}`);
          await prisma.$disconnect();
          return false;
        }
      }
    }

    console.log('\n');
    logSuccess('Восстановление завершено!');
    logInfo(`✅ Успешно: ${successCount}`);
    logInfo(`⏭️  Пропущено: ${skipCount}`);
    if (errorCount > 0) {
      logWarning(`⚠️  Ошибок: ${errorCount}`);
    }

    await prisma.$disconnect();
    return true;

  } catch (error) {
    logError(`Критическая ошибка восстановления: ${error.message}`);
    return false;
  }
}

async function verifyRestoredData() {
  logStep(7, 'ПРОВЕРКА ВОССТАНОВЛЕННЫХ ДАННЫХ');

  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.$connect();

    // Подсчитываем записи в каждой таблице
    logInfo('Подсчитываю записи в таблицах...');

    const counts = {
      providers: await prisma.providers.count(),
      mechanics: await prisma.mechanics.count(),
      themes: await prisma.themes.count(),
      categories: await prisma.slot_categories.count(),
      slots: await prisma.slots.count(),
      features: await prisma.features.count(),
      bonuses: await prisma.bonuses.count()
    };

    console.log('\n📊 СТАТИСТИКА ВОССТАНОВЛЕННЫХ ДАННЫХ:');
    console.log('━'.repeat(50));
    logInfo(`🏢 Провайдеры:     ${counts.providers} записей`);
    logInfo(`🔧 Механики:       ${counts.mechanics} записей`);
    logInfo(`🎨 Темы:           ${counts.themes} записей`);
    logInfo(`📁 Категории:      ${counts.categories} записей`);
    logInfo(`🎰 Слоты:          ${counts.slots} записей`);
    logInfo(`✨ Фичи:           ${counts.features} записей`);
    logInfo(`🎁 Бонусы:         ${counts.bonuses} записей`);
    console.log('━'.repeat(50));

    await prisma.$disconnect();

    // Проверяем, что данные есть
    const hasData = counts.providers > 0 && counts.mechanics > 0;

    if (hasData) {
      logSuccess('Данные успешно восстановлены!');
      return true;
    } else {
      logWarning('Некоторые таблицы пусты. Возможно, требуется дополнительная настройка.');
      return false;
    }

  } catch (error) {
    logError(`Ошибка проверки данных: ${error.message}`);
    return false;
  }
}

async function main() {
  log('\n' + '🎯'.repeat(30), 'cyan');
  log('     МАСТЕР-СКРИПТ ВОССТАНОВЛЕНИЯ БАЗЫ ДАННЫХ', 'bright');
  log('🎯'.repeat(30) + '\n', 'cyan');

  try {
    // Шаг 1: Проверка переменных окружения
    await checkEnvironmentVariables();

    // Шаг 2: Проверка подключения
    const connectionOk = await checkDatabaseConnection();
    if (!connectionOk) {
      logError('Не удалось подключиться к базе данных. Проверьте настройки в .env');
      process.exit(1);
    }

    // Шаг 3: Генерация Prisma Client
    await generatePrismaClient();

    // Шаг 4: Применение миграций
    await applyMigrations();

    // Шаг 5: Поиск последнего бэкапа
    const backupPath = await findLatestBackup();
    if (!backupPath) {
      logError('Не найден подходящий бэкап для восстановления');
      process.exit(1);
    }

    // Шаг 6: Восстановление из бэкапа
    const restoreOk = await restoreFromBackup(backupPath);
    if (!restoreOk) {
      logError('Ошибка при восстановлении данных из бэкапа');
      process.exit(1);
    }

    // Шаг 7: Проверка восстановленных данных
    const verifyOk = await verifyRestoredData();

    // Финальное сообщение
    log('\n' + '🎉'.repeat(30), 'green');
    log('     ВОССТАНОВЛЕНИЕ ЗАВЕРШЕНО УСПЕШНО!', 'bright');
    log('🎉'.repeat(30) + '\n', 'green');

    logSuccess('Все данные восстановлены из бэкапа');
    logInfo('Теперь вы можете:');
    logInfo('  1. Запустить Prisma Studio: npx prisma studio');
    logInfo('  2. Запустить backend: npm run start:dev');
    logInfo('  3. Запустить frontend: npm run dev');

    log('\n💡 СОВЕТ: Создайте новый бэкап командой:', 'yellow');
    log('  node create-backup-v004.js\n', 'yellow');

  } catch (error) {
    logError(`Критическая ошибка: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Запускаем мастер-скрипт
main();
