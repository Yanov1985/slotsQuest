const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function importBackup(sqlFilePath) {
  try {
    console.log('Импорт данных из резервной копии...');
    console.log(`Файл: ${sqlFilePath}`);
    
    // Проверяем существование файла
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`Файл не найден: ${sqlFilePath}`);
    }
    
    // Читаем SQL файл
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    console.log(`Размер файла: ${(fs.statSync(sqlFilePath).size / 1024).toFixed(2)} KB`);
    
    // Разбиваем на отдельные SQL команды
    const sqlCommands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--') && !cmd.startsWith('SET foreign_key_checks'));
    
    console.log(`Найдено ${sqlCommands.length} SQL команд`);
    
    // Выполняем команды по порядку
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < sqlCommands.length; i++) {
      const command = sqlCommands[i];
      
      try {
        // Пропускаем пустые команды и комментарии
        if (!command || command.startsWith('--') || command.length < 10) {
          continue;
        }
        
        // Выполняем SQL команду через Prisma
        await prisma.$executeRawUnsafe(command);
        successCount++;
        
        // Показываем прогресс каждые 50 команд
        if (successCount % 50 === 0) {
          console.log(`Выполнено: ${successCount}/${sqlCommands.length} команд`);
        }
        
      } catch (error) {
        errorCount++;
        console.warn(`Ошибка в команде ${i + 1}: ${error.message}`);
        
        // Если слишком много ошибок, останавливаемся
        if (errorCount > 10) {
          console.error('Слишком много ошибок, остановка импорта');
          break;
        }
      }
    }
    
    console.log('\n=== Результаты импорта ===');
    console.log(`Успешно выполнено: ${successCount} команд`);
    console.log(`Ошибок: ${errorCount}`);
    
    // Проверяем результаты
    const providers = await prisma.providers.count();
    const categories = await prisma.slot_categories.count();
    const themes = await prisma.themes.count();
    const slots = await prisma.slots.count();
    
    console.log('\n=== Статистика данных ===');
    console.log(`Провайдеры: ${providers}`);
    console.log(`Категории: ${categories}`);
    console.log(`Темы: ${themes}`);
    console.log(`Слоты: ${slots}`);
    
    console.log('\n✅ Импорт завершен успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при импорте:', error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Получаем путь к файлу из аргументов командной строки
const sqlFilePath = process.argv[2];

if (!sqlFilePath) {
  console.error('Использование: node import-backup.js <путь_к_sql_файлу>');
  console.error('Пример: node import-backup.js ../backups/db/database_backup_v002.sql');
  process.exit(1);
}

// Запускаем импорт
importBackup(sqlFilePath).catch(error => {
  console.error('Критическая ошибка:', error);
  process.exit(1);
});