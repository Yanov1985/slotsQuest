const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Отсутствуют настройки Supabase в .env файле');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Маппинг полей из SQL в схему Prisma
const fieldMapping = {
  slots: {
    'is_featured': null, // Это поле отсутствует в новой схеме
    'theme': 'theme_id' // Изменено на связь с таблицей themes
  }
};

// Функция для парсинга INSERT запросов
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

// Функция для фильтрации полей согласно схеме
function filterFields(tableName, data) {
  const filtered = { ...data };
  
  // Удаляем поля, которых нет в схеме
  if (tableName === 'slots') {
    delete filtered.is_featured; // Это поле отсутствует в новой схеме
    
    // Если есть theme как строка, попробуем найти соответствующую тему
    if (filtered.theme && typeof filtered.theme === 'string') {
      // Пока просто удалим, позже можно добавить логику поиска theme_id
      delete filtered.theme;
    }
  }
  
  return filtered;
}

async function importBackupSupabase(sqlFilePath) {
  try {
    console.log('🚀 Импорт данных из резервной копии через Supabase...');
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
        !cmd.startsWith('/*')
      );
    
    console.log(`📝 Найдено ${sqlCommands.length} SQL команд`);
    
    let successCount = 0;
    let errorCount = 0;
    let insertCount = 0;
    let deleteCount = 0;
    const tableStats = {};
    
    for (let i = 0; i < sqlCommands.length; i++) {
      const command = sqlCommands[i].trim();
      
      try {
        if (!command || command.length < 5) continue;
        
        // Обрабатываем DELETE команды
        if (command.toUpperCase().startsWith('DELETE FROM')) {
          const tableMatch = command.match(/DELETE FROM\s+(\w+)/i);
          if (tableMatch) {
            const tableName = tableMatch[1];
            console.log(`🗑️  Очистка таблицы: ${tableName}`);
            
            // Используем более безопасный способ очистки
            const { error } = await supabase
              .from(tableName)
              .delete()
              .gte('created_at', '1900-01-01'); // Удаляем все записи
            
            if (error && !error.message.includes('No rows found')) {
              console.warn(`⚠️  Ошибка при очистке ${tableName}:`, error.message);
            } else {
              deleteCount++;
              console.log(`✅ Таблица ${tableName} очищена`);
            }
          }
          successCount++;
          continue;
        }
        
        // Обрабатываем INSERT команды
        if (command.toUpperCase().startsWith('INSERT INTO')) {
          const parsed = parseInsertStatement(command);
          if (parsed) {
            const { tableName, columns, values } = parsed;
            
            // Создаем объект для вставки
            const insertData = {};
            for (let j = 0; j < columns.length && j < values.length; j++) {
              insertData[columns[j]] = convertValue(values[j]);
            }
            
            // Фильтруем поля согласно схеме
            const filteredData = filterFields(tableName, insertData);
            
            // Вставляем данные
            const { error } = await supabase
              .from(tableName)
              .insert(filteredData);
            
            if (error) {
              console.warn(`⚠️  Ошибка вставки в ${tableName}:`, error.message);
              errorCount++;
            } else {
              insertCount++;
              tableStats[tableName] = (tableStats[tableName] || 0) + 1;
              
              if (insertCount % 25 === 0) {
                console.log(`📈 Вставлено записей: ${insertCount}`);
              }
            }
          }
          successCount++;
        }
        
      } catch (error) {
        errorCount++;
        console.warn(`❌ Ошибка в команде ${i + 1}: ${error.message}`);
        
        if (errorCount > 50) {
          console.error('🛑 Слишком много ошибок, остановка импорта');
          break;
        }
      }
    }
    
    console.log('\n📊 === Результаты импорта ===');
    console.log(`✅ Успешно выполнено: ${successCount} команд`);
    console.log(`🗑️  Операций удаления: ${deleteCount}`);
    console.log(`📝 Операций вставки: ${insertCount}`);
    console.log(`❌ Ошибок: ${errorCount}`);
    
    console.log('\n📈 === Статистика по таблицам ===');
    Object.entries(tableStats).forEach(([table, count]) => {
      console.log(`${table}: ${count} записей`);
    });
    
    // Проверяем финальные результаты
    try {
      const tables = ['providers', 'slot_categories', 'themes', 'slots'];
      console.log('\n🔍 === Финальная статистика ===');
      
      for (const table of tables) {
        try {
          const { count } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });
          
          const emoji = table === 'providers' ? '🏢' : 
                       table === 'slot_categories' ? '📂' : 
                       table === 'themes' ? '🎨' : '🎰';
          
          console.log(`${emoji} ${table}: ${count || 0}`);
        } catch (tableError) {
          console.log(`❓ ${table}: не удалось получить статистику`);
        }
      }
      
    } catch (statsError) {
      console.warn('⚠️  Не удалось получить финальную статистику:', statsError.message);
    }
    
    console.log('\n🎉 Импорт завершен!');
    
    if (insertCount > 0) {
      console.log('\n💡 Теперь вы можете открыть Prisma Studio и увидеть импортированные данные:');
      console.log('   npx prisma studio');
    }
    
  } catch (error) {
    console.error('💥 Критическая ошибка при импорте:', error.message);
    throw error;
  }
}

// Получаем путь к файлу из аргументов командной строки
const sqlFilePath = process.argv[2];

if (!sqlFilePath) {
  console.error('❌ Использование: node import-backup-supabase.js <путь_к_sql_файлу>');
  console.error('📝 Пример: node import-backup-supabase.js ../backups/db/database_backup_v002.sql');
  process.exit(1);
}

// Запускаем импорт
importBackupSupabase(sqlFilePath).catch(error => {
  console.error('💥 Критическая ошибка:', error);
  process.exit(1);
});