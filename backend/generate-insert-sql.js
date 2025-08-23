const fs = require('fs');
const path = require('path');

// Функция для экранирования SQL значений
function escapeSqlValue(value) {
  if (value === null || value === undefined || value === 'null') {
    return 'NULL';
  }
  
  if (typeof value === 'string') {
    return `'${value.replace(/'/g, "''")}'`;
  }
  
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  
  if (value instanceof Date) {
    return `'${value.toISOString()}'`;
  }
  
  return value;
}

// Функция для генерации INSERT запросов
function generateInsertSQL(tableName, data) {
  if (!data || data.length === 0) {
    return `-- Нет данных для таблицы ${tableName}\n`;
  }
  
  let columns = Object.keys(data[0]);
  
  // Исключаем колонки, которых нет в схеме базы данных
  const excludedColumns = {
    'providers': ['is_recommended'], // Колонка is_recommended отсутствует в схеме
  };
  
  if (excludedColumns[tableName]) {
    columns = columns.filter(col => !excludedColumns[tableName].includes(col));
  }
  
  let sql = `-- Импорт данных для таблицы ${tableName}\n`;
  sql += `-- Количество записей: ${data.length}\n\n`;
  
  // Очистка таблицы
  sql += `DELETE FROM "${tableName}";\n\n`;
  
  // Генерация INSERT запросов
  for (const row of data) {
    const values = columns.map(col => escapeSqlValue(row[col])).join(', ');
    sql += `INSERT INTO "${tableName}" ("${columns.join('", "')}") VALUES (${values});\n`;
  }
  
  sql += '\n';
  return sql;
}

function generateAllSQL() {
  try {
    console.log('🔧 Генерация SQL-команд для импорта данных...');
    
    const dataDir = path.join(__dirname, 'extracted-data');
    const outputFile = path.join(dataDir, 'import-data.sql');
    
    let fullSQL = `-- SQL-скрипт для импорта данных в SlotQuest\n`;
    fullSQL += `-- Сгенерировано: ${new Date().toLocaleString('ru-RU')}\n\n`;
    
    // Отключаем проверку внешних ключей (PostgreSQL)
    fullSQL += `-- Отключаем проверку внешних ключей (PostgreSQL)\n`;
    fullSQL += `SET session_replication_role = replica;\n\n`;
    
    // Порядок импорта важен из-за внешних ключей
    const tables = [
      { name: 'providers', file: 'providers.json', emoji: '🏢' },
      { name: 'slot_categories', file: 'slot_categories.json', emoji: '📂' },
      { name: 'themes', file: 'themes.json', emoji: '🎨' },
      { name: 'slots', file: 'slots.json', emoji: '🎰' }
    ];
    
    for (const table of tables) {
      const filePath = path.join(dataDir, table.file);
      
      if (fs.existsSync(filePath)) {
        console.log(`${table.emoji} Обработка таблицы ${table.name}...`);
        
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        fullSQL += generateInsertSQL(table.name, data);
        
        console.log(`   ✅ Сгенерировано ${data.length} INSERT команд`);
      } else {
        console.warn(`   ⚠️ Файл не найден: ${filePath}`);
      }
    }
    
    // Включаем обратно проверку внешних ключей (PostgreSQL)
    fullSQL += `-- Включаем обратно проверку внешних ключей (PostgreSQL)\n`;
    fullSQL += `SET session_replication_role = DEFAULT;\n\n`;
    
    // Сохраняем SQL файл
    fs.writeFileSync(outputFile, fullSQL, 'utf8');
    
    console.log(`\n💾 SQL-скрипт сохранен: ${outputFile}`);
    console.log(`📊 Размер файла: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);
    
    // Создаем инструкции по использованию
    const instructionsFile = path.join(dataDir, 'SQL_IMPORT_INSTRUCTIONS.md');
    const instructions = `# Инструкции по импорту данных через SQL

## Способ 1: Через Prisma Studio
1. Откройте Prisma Studio: \`npx prisma studio\`
2. Перейдите в раздел "Query" или "SQL"
3. Скопируйте содержимое файла \`import-data.sql\`
4. Выполните SQL-команды

## Способ 2: Через psql (PostgreSQL)
\`\`\`bash
# Подключитесь к базе данных
psql "postgresql://postgres.xxx:[password]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# Выполните SQL-файл
\\i import-data.sql
\`\`\`

## Способ 3: Через Supabase Dashboard
1. Откройте Supabase Dashboard
2. Перейдите в раздел "SQL Editor"
3. Создайте новый запрос
4. Скопируйте содержимое файла \`import-data.sql\`
5. Выполните запрос

## Содержимое данных:
- 🏢 Провайдеры: 93 записи
- 📂 Категории слотов: 31 запись
- 🎨 Темы: 241 запись
- 🎰 Слоты: 5 записей

## Примечания:
- SQL-команды выполняются в правильном порядке с учетом внешних ключей
- Существующие данные будут удалены перед импортом
- Проверка внешних ключей временно отключается для корректного импорта
`;
    
    fs.writeFileSync(instructionsFile, instructions, 'utf8');
    console.log(`📋 Инструкции сохранены: ${instructionsFile}`);
    
    console.log('\n🎉 Генерация SQL-команд завершена!');
    console.log('\n💡 Следующие шаги:');
    console.log('1. Используйте файл import-data.sql для импорта данных');
    console.log('2. Следуйте инструкциям в файле SQL_IMPORT_INSTRUCTIONS.md');
    console.log('3. Или скопируйте SQL-команды в Prisma Studio');
    
  } catch (error) {
    console.error('💥 Ошибка при генерации SQL:', error.message);
    throw error;
  }
}

// Запускаем генерацию
generateAllSQL();