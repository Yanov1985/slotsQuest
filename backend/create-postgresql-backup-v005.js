const fs = require('fs');
const path = require('path');

async function createPostgreSQLBackup() {
  console.log('\n🔄 СОЗДАНИЕ POSTGRESQL БЕКАПА V005');
  console.log('==================================');

  try {
    // Читаем последний бекап
    const backupPath = path.join(__dirname, '..', 'backups', 'db', 'database_backup_v004_2025-10-24_21-30-49.sql');
    console.log(`📂 Чтение бекапа: ${backupPath}`);
    
    if (!fs.existsSync(backupPath)) {
      throw new Error('Файл бекапа не найден');
    }

    const backupContent = fs.readFileSync(backupPath, 'utf8');
    console.log(`📄 Размер файла: ${Math.round(backupContent.length / 1024)} KB`);

    // Создаем PostgreSQL версию бекапа
    let postgresContent = '';
    
    // Заголовок
    postgresContent += `-- PostgreSQL Database Backup v005\n`;
    postgresContent += `-- Generated from v004 backup on ${new Date().toISOString()}\n`;
    postgresContent += `-- Compatible with Supabase PostgreSQL\n\n`;

    // Добавляем расширения PostgreSQL
    postgresContent += `-- Enable UUID extension\n`;
    postgresContent += `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";\n\n`;

    // Отключаем проверки внешних ключей
    postgresContent += `-- Disable foreign key checks\n`;
    postgresContent += `SET session_replication_role = replica;\n\n`;

    // Очищаем таблицы в правильном порядке
    postgresContent += `-- Clear existing data\n`;
    postgresContent += `TRUNCATE TABLE slots CASCADE;\n`;
    postgresContent += `TRUNCATE TABLE slot_mechanics CASCADE;\n`;
    postgresContent += `TRUNCATE TABLE slot_categories CASCADE;\n`;
    postgresContent += `TRUNCATE TABLE themes CASCADE;\n`;
    postgresContent += `TRUNCATE TABLE mechanics CASCADE;\n`;
    postgresContent += `TRUNCATE TABLE providers CASCADE;\n\n`;

    // Извлекаем INSERT запросы из оригинального бекапа
    const lines = backupContent.split('\n');
    let currentTable = '';
    let insertCount = 0;

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Пропускаем комментарии и пустые строки
      if (!trimmedLine || trimmedLine.startsWith('--') || trimmedLine.startsWith('/*')) {
        continue;
      }

      // Пропускаем DELETE запросы и системные таблицы
      if (trimmedLine.startsWith('DELETE') || trimmedLine.includes('_prisma_migrations')) {
        continue;
      }

      // Обрабатываем INSERT запросы
      if (trimmedLine.startsWith('INSERT INTO')) {
        // Определяем таблицу (с кавычками или без)
        const tableMatch = trimmedLine.match(/INSERT INTO "?(\w+)"?/);
        if (tableMatch) {
          const tableName = tableMatch[1];
          
          // Пропускаем системные таблицы
          if (tableName === '_prisma_migrations') {
            continue;
          }

          if (currentTable !== tableName) {
            if (currentTable) {
              postgresContent += `\n`;
            }
            currentTable = tableName;
            postgresContent += `-- Insert ${tableName}\n`;
          }

          // Конвертируем INSERT запрос для PostgreSQL
          let postgresInsert = trimmedLine;
          
          // Заменяем специфичные для SQLite функции на PostgreSQL
          postgresInsert = postgresInsert.replace(/uuid\(\)/g, 'uuid_generate_v4()');
          
          // Добавляем ON CONFLICT для предотвращения дублирования
          if (postgresInsert.endsWith(';')) {
            postgresInsert = postgresInsert.slice(0, -1) + ' ON CONFLICT (id) DO NOTHING;\n';
          } else {
            postgresInsert += ' ON CONFLICT (id) DO NOTHING;\n';
          }

          postgresContent += postgresInsert;
          insertCount++;
        }
      }
    }

    // Включаем проверки внешних ключей
    postgresContent += `\n-- Enable foreign key checks\n`;
    postgresContent += `SET session_replication_role = DEFAULT;\n\n`;

    // Обновляем последовательности
    postgresContent += `-- Update sequences\n`;
    postgresContent += `SELECT setval(pg_get_serial_sequence('providers', 'id'), COALESCE(MAX(id::integer), 1), false) FROM providers WHERE id ~ '^[0-9]+$';\n`;
    postgresContent += `SELECT setval(pg_get_serial_sequence('mechanics', 'id'), COALESCE(MAX(id::integer), 1), false) FROM mechanics WHERE id ~ '^[0-9]+$';\n`;
    postgresContent += `SELECT setval(pg_get_serial_sequence('themes', 'id'), COALESCE(MAX(id::integer), 1), false) FROM themes WHERE id ~ '^[0-9]+$';\n`;
    postgresContent += `SELECT setval(pg_get_serial_sequence('slot_categories', 'id'), COALESCE(MAX(id::integer), 1), false) FROM slot_categories WHERE id ~ '^[0-9]+$';\n`;
    postgresContent += `SELECT setval(pg_get_serial_sequence('slots', 'id'), COALESCE(MAX(id::integer), 1), false) FROM slots WHERE id ~ '^[0-9]+$';\n\n`;

    postgresContent += `-- Backup completed successfully\n`;
    postgresContent += `-- Total INSERT statements: ${insertCount}\n`;

    // Сохраняем файл
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `database_backup_postgresql_v005_${timestamp}.sql`;
    const outputPath = path.join(__dirname, '..', 'backups', 'db', filename);
    
    // Создаем директорию если не существует
    const backupDir = path.dirname(outputPath);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, postgresContent, 'utf8');

    console.log('\n✅ POSTGRESQL БЕКАП V005 СОЗДАН УСПЕШНО!');
    console.log(`📁 Файл: ${filename}`);
    console.log(`📍 Путь: ${outputPath}`);
    console.log(`📊 Размер: ${Math.round(fs.statSync(outputPath).size / 1024)} KB`);
    console.log(`🔢 INSERT запросов: ${insertCount}`);
    console.log('\n💡 Этот бекап совместим с PostgreSQL и Supabase');
    console.log('🚀 Можно использовать для восстановления через Prisma Studio или pgAdmin');

  } catch (error) {
    console.error('\n❌ Ошибка при создании бекапа:', error.message);
    console.error('📝 Детали:', error);
  }
}

createPostgreSQLBackup();