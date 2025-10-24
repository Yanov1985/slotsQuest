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
    
    // Сначала очищаем таблицу слотов
    await prisma.slots.deleteMany({});
    console.log('🗑️ Очистил таблицу слотов');
    
    // Восстанавливаем слоты по одному, исключая поле is_featured
    for (let i = 0; i < slotInserts.length; i++) {
      const insertCommand = slotInserts[i];
      
      try {
        // Парсим INSERT команду и извлекаем данные
        const match = insertCommand.match(/INSERT INTO slots \(([^)]+)\) VALUES \(([^)]+)\)/);
        if (!match) {
          console.warn(`⚠️ Не удалось распарсить команду: ${insertCommand}`);
          continue;
        }
        
        const columns = match[1].split(',').map(col => col.trim());
        const values = match[2].split(',').map(val => val.trim());
        
        // Создаем объект данных, исключая is_featured
        const slotData = {};
        for (let j = 0; j < columns.length; j++) {
          const column = columns[j];
          const value = values[j];
          
          // Пропускаем поле is_featured
          if (column === 'is_featured') {
            continue;
          }
          
          // Обрабатываем значения
          if (value === 'NULL' || value === 'null') {
            slotData[column] = null;
          } else if (value.startsWith("'") && value.endsWith("'")) {
            slotData[column] = value.slice(1, -1);
          } else if (!isNaN(value) && value !== '') {
            slotData[column] = parseFloat(value);
          } else if (value === 'true') {
            slotData[column] = true;
          } else if (value === 'false') {
            slotData[column] = false;
          } else {
            slotData[column] = value;
          }
        }
        
        // Создаем слот через Prisma
        await prisma.slots.create({
          data: {
            id: slotData.id,
            name: slotData.name,
            slug: slotData.slug,
            provider_id: slotData.provider_id,
            category_id: slotData.category_id === 'null' ? null : slotData.category_id,
            theme_id: slotData.theme_id,
            description: slotData.description,
            image_url: slotData.image_url,
            rtp: slotData.rtp ? parseFloat(slotData.rtp) : null,
            volatility: slotData.volatility,
            min_bet: slotData.min_bet ? parseFloat(slotData.min_bet) : null,
            max_bet: slotData.max_bet ? parseFloat(slotData.max_bet) : null,
            max_win: slotData.max_win ? parseFloat(slotData.max_win) : null,
            reels: slotData.reels ? parseInt(slotData.reels) : null,
            rows: slotData.rows ? parseInt(slotData.rows) : null,
            release_date: slotData.release_date ? new Date(slotData.release_date) : null,
            is_active: slotData.is_active !== false,
            play_count: slotData.play_count ? parseInt(slotData.play_count) : 0,
            created_at: slotData.created_at ? new Date(slotData.created_at) : new Date(),
            updated_at: slotData.updated_at ? new Date(slotData.updated_at) : new Date()
          }
        });
        
        console.log(`✅ Восстановлен слот ${i + 1}/${slotInserts.length}: ${slotData.name}`);
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
        take: 5,
        select: {
          name: true,
          slug: true,
          rtp: true,
          volatility: true,
          providers: {
            select: {
              name: true
            }
          }
        }
      });
      
      console.log('\n🎰 Примеры восстановленных слотов:');
      sampleSlots.forEach((slot, index) => {
        console.log(`  ${index + 1}. ${slot.name} (${slot.slug})`);
        console.log(`     Провайдер: ${slot.providers?.name || 'Неизвестно'}`);
        console.log(`     RTP: ${slot.rtp}%, Волатильность: ${slot.volatility}`);
        console.log('');
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