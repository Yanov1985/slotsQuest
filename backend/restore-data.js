const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function restoreData() {
  try {
    console.log('🔄 Начинаю восстановление данных из резервной копии...');
    
    // Путь к резервной копии
    const backupPath = path.join(__dirname, '..', 'backups', 'db', 'database_backup_v003_2025-08-23.sql');
    
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Файл резервной копии не найден: ${backupPath}`);
    }
    
    console.log(`📁 Найден файл резервной копии: ${backupPath}`);
    
    // Читаем SQL файл
    const sqlContent = fs.readFileSync(backupPath, 'utf8');
    
    // Разбиваем на отдельные команды
    const sqlCommands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--') && !cmd.startsWith('SET'));
    
    console.log(`📊 Найдено ${sqlCommands.length} SQL команд для выполнения`);
    
    // Выполняем команды через Prisma
    for (let i = 0; i < sqlCommands.length; i++) {
      const command = sqlCommands[i];
      
      if (command.includes('DELETE FROM') || command.includes('INSERT INTO')) {
        try {
          await prisma.$executeRawUnsafe(command);
          if (i % 50 === 0) {
            console.log(`✅ Выполнено ${i + 1}/${sqlCommands.length} команд`);
          }
        } catch (error) {
          console.warn(`⚠️ Ошибка при выполнении команды ${i + 1}: ${error.message}`);
          // Продолжаем выполнение остальных команд
        }
      }
    }
    
    console.log('✅ Восстановление данных завершено!');
    
    // Проверяем результат
    const counts = {
      providers: await prisma.providers.count(),
      categories: await prisma.slot_categories.count(),
      themes: await prisma.themes.count(),
      mechanics: await prisma.mechanics.count(),
      bonuses: await prisma.bonuses.count(),
      slots: await prisma.slots.count()
    };
    
    console.log('\n📈 Статистика восстановленных данных:');
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`  ${table}: ${count} записей`);
    });
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении данных:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

restoreData();