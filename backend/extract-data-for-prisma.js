const fs = require('fs');
const path = require('path');

// Функция для парсинга INSERT запросов и извлечения данных
function parseInsertStatement(sql) {
  const insertMatch = sql.match(/INSERT INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\((.+)\)/i);
  if (!insertMatch) return null;
  
  const tableName = insertMatch[1];
  const columns = insertMatch[2].split(',').map(col => col.trim().replace(/`/g, ''));
  const valuesStr = insertMatch[3];
  
  // Простой парсер значений
  const values = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = null;
  let depth = 0;
  
  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i];
    
    if (char === '(' && !inQuotes) {
      depth++;
    } else if (char === ')' && !inQuotes) {
      depth--;
    } else if (!inQuotes && (char === "'" || char === '"')) {
      inQuotes = true;
      quoteChar = char;
      current += char;
    } else if (inQuotes && char === quoteChar) {
      if (i + 1 < valuesStr.length && valuesStr[i + 1] === quoteChar) {
        current += char + char;
        i++;
      } else {
        inQuotes = false;
        quoteChar = null;
        current += char;
      }
    } else if (!inQuotes && char === ',' && depth === 0) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  if (current.trim()) {
    values.push(current.trim());
  }
  
  return { tableName, columns, values };
}

// Функция для преобразования значения
function convertValue(value) {
  if (value === 'NULL' || value === 'null') return null;
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'");
  }
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1).replace(/""/g, '"');
  }
  if (value === 'true' || value === 'TRUE') return true;
  if (value === 'false' || value === 'FALSE') return false;
  if (!isNaN(value) && !isNaN(parseFloat(value))) {
    return parseFloat(value);
  }
  return value;
}

// Функция для фильтрации полей согласно схеме Prisma
function filterFields(tableName, data) {
  const filtered = { ...data };
  
  // Удаляем поля, которых нет в схеме
  if (tableName === 'slots') {
    delete filtered.is_featured; // Отсутствует в новой схеме
    delete filtered.popularity_score; // Отсутствует в новой схеме
    delete filtered.theme; // Заменено на theme_id
  }
  
  return filtered;
}

function extractDataFromSQL(sqlFilePath) {
  try {
    console.log('🔍 Извлечение данных из SQL файла...');
    console.log(`📁 Файл: ${sqlFilePath}`);
    
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`Файл не найден: ${sqlFilePath}`);
    }
    
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    console.log(`📊 Размер файла: ${(fs.statSync(sqlFilePath).size / 1024).toFixed(2)} KB`);
    
    const sqlCommands = sqlContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => 
        cmd.length > 0 && 
        !cmd.startsWith('--') && 
        !cmd.startsWith('SET foreign_key_checks') &&
        !cmd.startsWith('/*') &&
        cmd.toUpperCase().startsWith('INSERT INTO')
      );
    
    console.log(`📝 Найдено ${sqlCommands.length} INSERT команд`);
    
    const extractedData = {
      providers: [],
      slot_categories: [],
      themes: [],
      slots: []
    };
    
    let processedCount = 0;
    
    for (const command of sqlCommands) {
      const parsed = parseInsertStatement(command);
      if (parsed) {
        const { tableName, columns, values } = parsed;
        
        if (extractedData.hasOwnProperty(tableName)) {
          // Создаем объект данных
          const rowData = {};
          for (let j = 0; j < columns.length && j < values.length; j++) {
            rowData[columns[j]] = convertValue(values[j]);
          }
          
          // Фильтруем поля согласно схеме
          const filteredData = filterFields(tableName, rowData);
          
          extractedData[tableName].push(filteredData);
          processedCount++;
          
          if (processedCount % 50 === 0) {
            console.log(`📈 Обработано: ${processedCount} записей`);
          }
        }
      }
    }
    
    console.log('\n📊 === Статистика извлеченных данных ===');
    Object.entries(extractedData).forEach(([table, data]) => {
      const emoji = table === 'providers' ? '🏢' : 
                   table === 'slot_categories' ? '📂' : 
                   table === 'themes' ? '🎨' : '🎰';
      console.log(`${emoji} ${table}: ${data.length} записей`);
    });
    
    // Сохраняем данные в JSON файлы для удобства
    const outputDir = path.join(__dirname, 'extracted-data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    
    Object.entries(extractedData).forEach(([table, data]) => {
      if (data.length > 0) {
        const filePath = path.join(outputDir, `${table}.json`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`💾 Сохранено: ${filePath}`);
      }
    });
    
    // Создаем инструкции для Prisma Studio
    const instructionsPath = path.join(outputDir, 'PRISMA_STUDIO_INSTRUCTIONS.md');
    const instructions = `# Инструкции по импорту данных в Prisma Studio

## Шаг 1: Запустите Prisma Studio
\`\`\`bash
npx prisma studio
\`\`\`

## Шаг 2: Импортируйте данные в следующем порядке:

### 1. Провайдеры (providers)
- Откройте таблицу \`providers\`
- Скопируйте данные из файла \`providers.json\`
- Количество записей: ${extractedData.providers.length}

### 2. Категории слотов (slot_categories)
- Откройте таблицу \`slot_categories\`
- Скопируйте данные из файла \`slot_categories.json\`
- Количество записей: ${extractedData.slot_categories.length}

### 3. Темы (themes)
- Откройте таблицу \`themes\`
- Скопируйте данные из файла \`themes.json\`
- Количество записей: ${extractedData.themes.length}

### 4. Слоты (slots)
- Откройте таблицу \`slots\`
- Скопируйте данные из файла \`slots.json\`
- Количество записей: ${extractedData.slots.length}

## Примечания:
- Импортируйте данные именно в указанном порядке из-за внешних ключей
- В Prisma Studio используйте функцию "Add record" для каждой записи
- Или используйте функцию массового импорта, если она доступна

## Альтернативный способ:
Вы можете использовать готовые JSON файлы для программного импорта через Prisma Client.
`;
    
    fs.writeFileSync(instructionsPath, instructions, 'utf8');
    console.log(`📋 Инструкции сохранены: ${instructionsPath}`);
    
    console.log('\n🎉 Извлечение данных завершено!');
    console.log('\n💡 Следующие шаги:');
    console.log('1. Запустите: npx prisma studio');
    console.log('2. Следуйте инструкциям в файле PRISMA_STUDIO_INSTRUCTIONS.md');
    console.log('3. Или используйте JSON файлы для программного импорта');
    
    return extractedData;
    
  } catch (error) {
    console.error('💥 Ошибка при извлечении данных:', error.message);
    throw error;
  }
}

// Получаем путь к файлу из аргументов командной строки
const sqlFilePath = process.argv[2];

if (!sqlFilePath) {
  console.error('❌ Использование: node extract-data-for-prisma.js <путь_к_sql_файлу>');
  console.error('📝 Пример: node extract-data-for-prisma.js ../backups/db/database_backup_v002.sql');
  process.exit(1);
}

// Запускаем извлечение данных
try {
  extractDataFromSQL(sqlFilePath);
} catch (error) {
  console.error('💥 Критическая ошибка:', error);
  process.exit(1);
}