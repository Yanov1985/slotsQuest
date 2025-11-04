#!/usr/bin/env node

/**
 * 🔄 ВОССТАНОВЛЕНИЕ ДАННЫХ В SQLITE ИЗ БЕКАПА V004
 * Восстанавливает данные из database_backup_v004_2025-10-24_21-30-49.sql в локальную SQLite базу
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

console.log('🔄 ВОССТАНОВЛЕНИЕ ДАННЫХ В SQLITE ИЗ БЕКАПА V004');
console.log('===============================================');

// Путь к бекапу
const backupPath = path.join(__dirname, '..', 'backups', 'db', 'database_backup_v004_2025-10-24_21-30-49.sql');

// Функция для инициализации SQLite базы данных
async function initSQLiteDatabase() {
  console.log('🗄️ Инициализация SQLite базы данных...');
  
  try {
    // Генерируем Prisma клиент для SQLite схемы
    console.log('📦 Генерация Prisma клиента...');
    await execAsync('npx prisma generate --schema=schema-sqlite.prisma');
    
    // Создаем базу данных и таблицы
    console.log('🏗️ Создание таблиц...');
    await execAsync('npx prisma db push --schema=schema-sqlite.prisma --accept-data-loss');
    
    console.log('✅ SQLite база данных инициализирована');
    return true;
    
  } catch (error) {
    console.error('❌ Ошибка при инициализации SQLite:', error.message);
    return false;
  }
}

// Функция для парсинга SQL INSERT запросов
function parseInsertStatements(sqlContent) {
  const tables = {};
  const lines = sqlContent.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Парсим INSERT запросы
    const insertMatch = trimmedLine.match(/INSERT INTO "(\w+)" \(([^)]+)\) VALUES \((.+)\);/);
    if (insertMatch) {
      const tableName = insertMatch[1];
      const columns = insertMatch[2].split(',').map(col => col.trim().replace(/"/g, ''));
      const valuesStr = insertMatch[3];
      
      // Парсим значения (упрощенный парсер)
      const values = [];
      let current = '';
      let inQuotes = false;
      let quoteChar = null;
      
      for (let i = 0; i < valuesStr.length; i++) {
        const char = valuesStr[i];
        
        if (!inQuotes && (char === "'" || char === '"')) {
          inQuotes = true;
          quoteChar = char;
          current += char;
        } else if (inQuotes && char === quoteChar) {
          // Проверяем на экранированную кавычку
          if (i + 1 < valuesStr.length && valuesStr[i + 1] === quoteChar) {
            current += char + char;
            i++; // пропускаем следующую кавычку
          } else {
            inQuotes = false;
            quoteChar = null;
            current += char;
          }
        } else if (!inQuotes && char === ',') {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      
      if (current.trim()) {
        values.push(current.trim());
      }
      
      // Создаем объект записи
      const record = {};
      columns.forEach((col, index) => {
        let value = values[index];
        if (value) {
          value = value.trim();
          
          // Обработка различных типов значений
          if (value === 'NULL') {
            record[col] = null;
          } else if (value === 'true') {
            record[col] = true;
          } else if (value === 'false') {
            record[col] = false;
          } else if (value.startsWith("'") && value.endsWith("'")) {
            // Строковое значение
            record[col] = value.slice(1, -1).replace(/''/g, "'");
          } else if (!isNaN(value) && !value.includes('.')) {
            // Целое число
            record[col] = parseInt(value);
          } else if (!isNaN(value)) {
            // Число с плавающей точкой
            record[col] = parseFloat(value);
          } else {
            // Оставляем как есть
            record[col] = value;
          }
        }
      });
      
      if (!tables[tableName]) {
        tables[tableName] = [];
      }
      tables[tableName].push(record);
    }
  }
  
  return tables;
}

// Функция для восстановления данных в SQLite
async function restoreToSQLite(tables) {
  console.log('📥 Восстановление данных в SQLite...');
  
  // Динамически импортируем Prisma клиент
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'file:./dev.db'
      }
    }
  });
  
  try {
    // Порядок восстановления (независимые таблицы первыми)
    const restoreOrder = ['providers', 'mechanics', 'themes', 'slot_category', 'slots'];
    
    for (const tableName of restoreOrder) {
      if (tables[tableName] && tables[tableName].length > 0) {
        console.log(`📋 Восстановление таблицы: ${tableName} (${tables[tableName].length} записей)`);
        
        try {
          switch (tableName) {
            case 'providers':
              for (const record of tables[tableName]) {
                await prisma.provider.create({ data: record });
              }
              break;
              
            case 'mechanics':
              for (const record of tables[tableName]) {
                await prisma.mechanic.create({ data: record });
              }
              break;
              
            case 'themes':
              for (const record of tables[tableName]) {
                await prisma.theme.create({ data: record });
              }
              break;
              
            case 'slot_category':
              for (const record of tables[tableName]) {
                await prisma.slotCategory.create({ data: record });
              }
              break;
              
            case 'slots':
              for (const record of tables[tableName]) {
                // Обрабатываем специальные поля
                if (record.created_at && typeof record.created_at === 'string') {
                  record.created_at = new Date(record.created_at);
                }
                if (record.updated_at && typeof record.updated_at === 'string') {
                  record.updated_at = new Date(record.updated_at);
                }
                if (record.release_date && typeof record.release_date === 'string') {
                  record.release_date = new Date(record.release_date);
                }
                
                await prisma.slot.create({ data: record });
              }
              break;
              
            default:
              console.log(`⚠️ Пропуск таблицы ${tableName} - не реализовано`);
          }
          
          console.log(`✅ Восстановлено: ${tableName}`);
          
        } catch (error) {
          console.error(`❌ Ошибка при восстановлении ${tableName}:`, error.message);
        }
      }
    }
    
    // Проверяем восстановленные данные
    const providers = await prisma.provider.count();
    const mechanics = await prisma.mechanic.count();
    const themes = await prisma.theme.count();
    const slots = await prisma.slot.count();
    
    console.log('\n📊 СТАТИСТИКА ВОССТАНОВЛЕННЫХ ДАННЫХ:');
    console.log(`   Провайдеры: ${providers}`);
    console.log(`   Механики: ${mechanics}`);
    console.log(`   Темы: ${themes}`);
    console.log(`   Слоты: ${slots}`);
    
    if (providers > 0 && mechanics > 0 && themes > 0) {
      console.log('\n✅ Данные успешно восстановлены в SQLite!');
      console.log('💡 База данных сохранена в файл: dev.db');
      return true;
    } else {
      console.log('\n⚠️ Некоторые данные могут быть не восстановлены');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении данных:', error.message);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Основная функция
async function main() {
  try {
    // Проверяем существование файла бекапа
    if (!fs.existsSync(backupPath)) {
      console.error('❌ Файл бекапа не найден:', backupPath);
      process.exit(1);
    }
    
    console.log('📂 Загрузка бекапа:', backupPath);
    
    // Инициализируем SQLite базу данных
    const dbInitialized = await initSQLiteDatabase();
    if (!dbInitialized) {
      console.error('❌ Не удалось инициализировать SQLite базу данных');
      process.exit(1);
    }
    
    // Читаем файл бекапа
    const sqlContent = fs.readFileSync(backupPath, 'utf8');
    console.log(`📄 Размер файла: ${Math.round(sqlContent.length / 1024)} KB`);
    
    // Парсим SQL запросы
    console.log('🔍 Парсинг SQL запросов...');
    const tables = parseInsertStatements(sqlContent);
    
    console.log('📋 Найденные таблицы:');
    Object.keys(tables).forEach(tableName => {
      console.log(`   ${tableName}: ${tables[tableName].length} записей`);
    });
    
    // Восстанавливаем данные в SQLite
    const success = await restoreToSQLite(tables);
    
    if (success) {
      console.log('\n🎉 ВОССТАНОВЛЕНИЕ В SQLITE ЗАВЕРШЕНО УСПЕШНО!');
      console.log('💡 Теперь можно использовать локальную базу данных');
      console.log('📝 Для использования SQLite в приложении, обновите .env:');
      console.log('   DATABASE_URL="file:./dev.db"');
    } else {
      console.log('\n⚠️ Восстановление завершено с предупреждениями');
    }
    
  } catch (error) {
    console.error('❌ Критическая ошибка:', error);
    process.exit(1);
  }
}

// Запуск скрипта
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };