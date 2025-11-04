#!/usr/bin/env node

/**
 * 🔄 ЛОКАЛЬНОЕ ВОССТАНОВЛЕНИЕ ДАННЫХ ИЗ SQL БЕКАПА
 * Парсит SQL файл и восстанавливает данные локально
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 ЛОКАЛЬНОЕ ВОССТАНОВЛЕНИЕ ДАННЫХ');
console.log('==================================');

// Путь к SQL бекапу
const backupPath = path.join(__dirname, '..', 'backups', 'db', 'database_backup_v002.sql');

// Проверяем существование файла
if (!fs.existsSync(backupPath)) {
  console.error('❌ SQL бекап не найден:', backupPath);
  process.exit(1);
}

console.log('📁 Найден SQL бекап:', backupPath);

// Читаем SQL файл
const sqlContent = fs.readFileSync(backupPath, 'utf8');
console.log('📖 SQL файл прочитан, размер:', sqlContent.length, 'символов');

// Парсим INSERT запросы
function parseInsertStatements(sql) {
  const insertStatements = [];
  const lines = sql.split('\n');
  
  let currentStatement = '';
  let inInsert = false;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Пропускаем комментарии и пустые строки
    if (trimmedLine.startsWith('--') || trimmedLine === '') {
      continue;
    }
    
    // Начало INSERT
    if (trimmedLine.startsWith('INSERT INTO')) {
      inInsert = true;
      currentStatement = trimmedLine;
    } else if (inInsert) {
      currentStatement += ' ' + trimmedLine;
      
      // Конец INSERT (заканчивается на ;)
      if (trimmedLine.endsWith(';')) {
        insertStatements.push(currentStatement);
        currentStatement = '';
        inInsert = false;
      }
    }
  }
  
  return insertStatements;
}

// Извлекаем данные из INSERT запросов
function extractDataFromInsert(insertStatement) {
  // Парсим INSERT INTO table_name (columns) VALUES (values);
  const match = insertStatement.match(/INSERT INTO\s+(\w+)\s*\((.*?)\)\s+VALUES\s*\((.*?)\);/i);
  
  if (!match) {
    console.warn('⚠️ Не удалось парсить INSERT:', insertStatement.substring(0, 100) + '...');
    return null;
  }
  
  const tableName = match[1];
  const columns = match[2].split(',').map(col => col.trim().replace(/['"]/g, ''));
  const valuesStr = match[3];
  
  // Простой парсинг значений (может потребоваться улучшение для сложных случаев)
  const values = [];
  let currentValue = '';
  let inQuotes = false;
  let quoteChar = '';
  
  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i];
    
    if (!inQuotes && (char === "'" || char === '"')) {
      inQuotes = true;
      quoteChar = char;
      currentValue += char;
    } else if (inQuotes && char === quoteChar) {
      // Проверяем на экранированную кавычку
      if (i + 1 < valuesStr.length && valuesStr[i + 1] === quoteChar) {
        currentValue += char + char;
        i++; // пропускаем следующую кавычку
      } else {
        inQuotes = false;
        currentValue += char;
      }
    } else if (!inQuotes && char === ',') {
      values.push(currentValue.trim());
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  
  // Добавляем последнее значение
  if (currentValue.trim()) {
    values.push(currentValue.trim());
  }
  
  // Очищаем значения от кавычек
  const cleanValues = values.map(val => {
    const trimmed = val.trim();
    if ((trimmed.startsWith("'") && trimmed.endsWith("'")) ||
        (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
      return trimmed.slice(1, -1);
    }
    return trimmed === 'NULL' ? null : trimmed;
  });
  
  return {
    table: tableName,
    columns,
    values: cleanValues
  };
}

// Создаем JSON данные для каждой таблицы
function createJsonData(insertStatements) {
  const tableData = {};
  
  for (const statement of insertStatements) {
    const data = extractDataFromInsert(statement);
    if (!data) continue;
    
    if (!tableData[data.table]) {
      tableData[data.table] = [];
    }
    
    // Создаем объект из колонок и значений
    const record = {};
    for (let i = 0; i < data.columns.length; i++) {
      record[data.columns[i]] = data.values[i];
    }
    
    tableData[data.table].push(record);
  }
  
  return tableData;
}

// Основная функция
async function main() {
  try {
    console.log('🔍 Парсинг INSERT запросов...');
    const insertStatements = parseInsertStatements(sqlContent);
    console.log('✅ Найдено INSERT запросов:', insertStatements.length);
    
    console.log('📊 Извлечение данных...');
    const tableData = createJsonData(insertStatements);
    
    console.log('📋 НАЙДЕННЫЕ ТАБЛИЦЫ И ДАННЫЕ:');
    console.log('==============================');
    
    for (const [tableName, records] of Object.entries(tableData)) {
      console.log(`📄 ${tableName}: ${records.length} записей`);
      
      // Показываем первую запись как пример
      if (records.length > 0) {
        console.log('   Пример записи:', JSON.stringify(records[0], null, 2));
      }
    }
    
    // Сохраняем данные в JSON файлы для дальнейшего использования
    const outputDir = path.join(__dirname, 'extracted-data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    
    for (const [tableName, records] of Object.entries(tableData)) {
      const outputPath = path.join(outputDir, `${tableName}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(records, null, 2));
      console.log(`💾 Сохранено: ${outputPath}`);
    }
    
    console.log('');
    console.log('🎉 ДАННЫЕ УСПЕШНО ИЗВЛЕЧЕНЫ!');
    console.log('Теперь можно использовать JSON файлы для восстановления данных');
    
    return tableData;
    
  } catch (error) {
    console.error('❌ Ошибка при парсинге SQL:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, parseInsertStatements, extractDataFromInsert, createJsonData };