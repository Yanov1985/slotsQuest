const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function restoreSlots() {
  try {
    console.log('🎰 Начинаю восстановление слотов из резервной копии v002...');
    
    // Путь к резервной копии с слотами
    const backupPath = path.join(__dirname, '..', 'backups', 'db', 'database_backup_v002.sql');
    
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Файл резервной копии не найден: ${backupPath}`);
    }
    
    console.log(`📁 Найден файл резервной копии: ${backupPath}`);
    
    // Читаем SQL файл
    const sqlContent = fs.readFileSync(backupPath, 'utf8');
    
    // Извлекаем только команды INSERT для слотов
    const slotInserts = sqlContent
      .split('\n')
      .filter(line => line.trim().startsWith('INSERT INTO slots'))
      .map(line => line.trim().replace(/;$/, ''));
    
    console.log(`🎯 Найдено ${slotInserts.length} слотов для восстановления`);
    
    // Выполняем команды вставки слотов
    for (let i = 0; i < slotInserts.length; i++) {
      const insertCommand = slotInserts[i];
      
      try {
        await prisma.$executeRawUnsafe(insertCommand);
        console.log(`✅ Восстановлен слот ${i + 1}/${slotInserts.length}`);
      } catch (error) {
        console.warn(`⚠️ Ошибка при восстановлении слота ${i + 1}: ${error.message}`);
        // Продолжаем выполнение остальных команд
      }
    }
    
    console.log('🎉 Восстановление слотов завершено!');
    
    // Проверяем результат
    const slotsCount = await prisma.slots.count();
    console.log(`📊 Всего слотов в базе: ${slotsCount}`);
    
    if (slotsCount > 0) {
      // Показываем несколько примеров восстановленных слотов
      const sampleSlots = await prisma.slots.findMany({
        take: 3,
        select: {
          name: true,
          slug: true,
          rtp: true,
          volatility: true
        }
      });
      
      console.log('\n🎰 Примеры восстановленных слотов:');
      sampleSlots.forEach((slot, index) => {
        console.log(`  ${index + 1}. ${slot.name} (${slot.slug}) - RTP: ${slot.rtp}%, Волатильность: ${slot.volatility}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении слотов:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

restoreSlots();