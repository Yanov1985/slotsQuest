const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

console.log('🔄 ПОЛНЫЙ РЕЛЯЦИОННЫЙ ЭКСПОРТ (ДЛЯ МИГРАЦИИ НА POSTGRESQL)');
console.log('='.repeat(60));

async function exportFullDatabase() {
  try {
    console.log('\n1️⃣ Экспорт базовых справочников...');
    
    const providers = await prisma.providers.findMany();
    const categories = await prisma.slot_categories.findMany();
    const themes = await prisma.themes.findMany();
    const mechanics = await prisma.mechanics.findMany();
    const features = await prisma.features.findMany();
    const bonuses = await prisma.bonuses.findMany();

    console.log(`   ✅ Провайдеры: ${providers.length}`);
    console.log(`   ✅ Категории: ${categories.length}`);
    console.log(`   ✅ Темы: ${themes.length}`);
    console.log(`   ✅ Механики: ${mechanics.length}`);
    console.log(`   ✅ Особенности (Features): ${features.length}`);
    console.log(`   ✅ Бонусы (Bonuses): ${bonuses.length}`);

    console.log('\n2️⃣ Экспорт слотов со всеми связями многие-ко-многим...');
    
    // Экспортируем слоты со всеми вложенными связями, чтобы при миграции
    // легко было создать записи в junction-таблицах
    const slots = await prisma.slots.findMany({
      include: {
        slotThemes: true,
        slot_mechanics: true,
        slot_features: true,
        slot_bonuses: true
      }
    });

    console.log(`   ✅ Слоты (с полными связями): ${slots.length}`);

    console.log('\n3️⃣ Фомирование единого файла миграции...');
    
    const migrationData = {
      meta: {
        exported_at: new Date().toISOString(),
        engine: 'sqlite',
        target_engine: 'postgresql',
        tables_count: 7,
        total_records: providers.length + categories.length + themes.length + mechanics.length + features.length + bonuses.length + slots.length
      },
      data: {
        providers,
        slot_categories: categories,
        themes,
        mechanics,
        features,
        bonuses,
        slots
      }
    };

    const backupDir = path.join(__dirname, '..', 'backups', 'migrations');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const backupFile = path.join(backupDir, `full_migration_${timestamp}.json`);
    fs.writeFileSync(backupFile, JSON.stringify(migrationData, null, 2));
    
    // Создаем LATEST копию для удобства импорта
    const latestFile = path.join(backupDir, `full_migration_LATEST.json`);
    fs.writeFileSync(latestFile, JSON.stringify(migrationData, null, 2));

    const fileSize = (fs.statSync(backupFile).size / 1024 / 1024).toFixed(2);

    console.log('\n✅ ЭКСПОРТ УСПЕШНО ЗАВЕРШЕН!');
    console.log(`📦 Файл: backups/migrations/full_migration_${timestamp}.json`);
    console.log(`💾 Размер: ${fileSize} MB`);
    console.log(`\n💡 ИСПОЛЬЗОВАНИЕ ПРИ ПЕРЕЕЗДЕ НА POSTGRES:`);
    console.log('Этот JSON файл содержит АБСОЛЮТНО ВСЕ данные, включая связи многие-ко-многим (junction tables).');
    console.log('Для импорта в чистую базу Postgres вам потребуется написать простой скрипт-импортер, который будет читать `data.slots` и создавать слоты вместе со связями `create: { slotThemes: { ... } }`.');

  } catch (error) {
    console.error('\n❌ ОШИБКА ЭКСПОРТА:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

exportFullDatabase();
