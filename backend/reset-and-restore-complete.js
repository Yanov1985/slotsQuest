#!/usr/bin/env node

/**
 * 🔄 ПОЛНЫЙ СБРОС И ВОССТАНОВЛЕНИЕ
 *
 * Этот скрипт выполняет полный цикл:
 * 1. Генерирует Prisma Client
 * 2. Пересоздает базу данных
 * 3. Восстанавливает данные
 *
 * ВАЖНО: Закройте все процессы (backend, prisma studio) перед запуском!
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 ПОЛНЫЙ СБРОС И ВОССТАНОВЛЕНИЕ');
console.log('='.repeat(60));

function runCommand(command, description) {
  console.log(`\n📝 ${description}...`);
  try {
    execSync(command, {
      stdio: 'inherit',
      cwd: __dirname
    });
    console.log(`   ✅ ${description} - завершено`);
    return true;
  } catch (error) {
    console.log(`   ❌ ${description} - ошибка`);
    return false;
  }
}

async function main() {
  // Проверяем, что backend не запущен
  console.log('\n⚠️  ВНИМАНИЕ: Убедитесь, что backend сервер остановлен!');
  console.log('   Если он запущен, нажмите Ctrl+C в терминале с backend');
  console.log('   Подождите 5 секунд...');

  await new Promise(resolve => setTimeout(resolve, 5000));

  // Шаг 1: Удаляем старую базу
  const dbPath = path.join(__dirname, 'dev.db');
  if (fs.existsSync(dbPath)) {
    console.log('\n🗑️  Удаление старой базы данных...');
    try {
      fs.unlinkSync(dbPath);
      console.log('   ✅ Старая база данных удалена');
    } catch (e) {
      console.log('   ⚠️ Не удалось удалить базу (возможно, используется)');
    }
  }

  // Шаг 2: Генерация Prisma Client
  if (!runCommand('npx prisma generate', 'Генерация Prisma Client')) {
    console.log('\n❌ Не удалось сгенерировать Prisma Client');
    console.log('💡 Остановите все процессы и попробуйте снова');
    process.exit(1);
  }

  // Шаг 3: Создание базы данных
  if (!runCommand('npx prisma db push --force-reset --skip-generate', 'Создание базы данных')) {
    console.log('\n❌ Не удалось создать базу данных');
    process.exit(1);
  }

  // Шаг 4: Восстановление данных
  console.log('\n📦 Восстановление данных из JSON...');
  if (!runCommand('node restore-from-json-simple.js', 'Восстановление данных')) {
    console.log('\n⚠️ Проблема с восстановлением данных');
  }

  console.log('\n' + '🎉'.repeat(30));
  console.log('     ВСЕ ГОТОВО!');
  console.log('🎉'.repeat(30));

  console.log('\n✅ База данных пересоздана и данные восстановлены!');
  console.log('\n📝 Следующие шаги:');
  console.log('   1. Запустите backend: npm run start:dev');
  console.log('   2. Запустите frontend: cd ../frontend && npm run dev');
  console.log('   3. Откройте админку: http://localhost:3000/admin');
  console.log('   4. Откройте Prisma Studio: npx prisma studio');
}

main().catch(console.error);
