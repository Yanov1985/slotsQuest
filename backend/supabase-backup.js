const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function createCloudBackup() {
  console.log('🔄 Начинается создание бекапа из Supabase Cloud (PostgreSQL)...');
  
  try {
    const data = {
      pages: await prisma.pages.findMany(),
      providers: await prisma.providers.findMany(),
      slot_categories: await prisma.slot_categories.findMany(),
      themes: await prisma.themes.findMany(),
      mechanics: await prisma.mechanics.findMany(),
      features: await prisma.features.findMany(),
      bonuses: await prisma.bonuses.findMany(),
      slots: await prisma.slots.findMany({
         include: {
            slotThemes: true,
            slot_mechanics: true,
            slot_features: true,
            slot_bonuses: true
         }
      })
    };

    const backupsDir = path.join(__dirname, 'backups', 'cloud');
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `supabase_backup_${timestamp}.json`;
    const latestFilename = `supabase_backup_LATEST.json`;
    
    const filePath = path.join(backupsDir, filename);
    const latestPath = path.join(backupsDir, latestFilename);

    const json = JSON.stringify({ meta: { timestamp, type: 'postgres' }, data }, null, 2);
    
    fs.writeFileSync(filePath, json, 'utf8');
    fs.writeFileSync(latestPath, json, 'utf8'); // Обновляем симлинк/копию файла "последнего бэкапа"

    console.log(`✅ Бэкап успешно сохранен!`);
    console.log(`📁 Файл: ${filePath}`);
    console.log(`📊 Всего сохранено таблиц: ${Object.keys(data).length}`);
    console.log(`🎰 Сохранено слотов: ${data.slots.length}`);
  } catch (err) {
    console.error('❌ Ошибка при создании бекапа:', err);
  } finally {
    await prisma.$disconnect();
  }
}

createCloudBackup();
