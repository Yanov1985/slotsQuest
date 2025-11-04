const fs = require('fs');
const path = require('path');

// Функция для парсинга SQL INSERT запросов
function parseInsertStatement(line) {
  // Поддерживаем как MySQL (`table`) так и PostgreSQL ("table") синтаксис
  const insertMatch = line.match(/INSERT INTO ["`](\w+)["`] \(([^)]+)\) VALUES (.+);/);
  if (!insertMatch) return null;

  const tableName = insertMatch[1];
  const columns = insertMatch[2].split(',').map(col => col.trim().replace(/["`]/g, ''));
  const valuesString = insertMatch[3];

  // Парсим значения (поддерживаем множественные VALUES)
  const valueGroups = [];
  let currentPos = 0;
  let parenCount = 0;
  let currentGroup = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < valuesString.length; i++) {
    const char = valuesString[i];
    
    if (!inString && (char === '"' || char === "'")) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && valuesString[i-1] !== '\\') {
      inString = false;
      stringChar = '';
    }
    
    if (!inString) {
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
      
      if (parenCount === 0 && char === ',') {
        // Конец группы значений
        valueGroups.push(currentGroup.trim());
        currentGroup = '';
        continue;
      }
    }
    
    currentGroup += char;
  }
  
  if (currentGroup.trim()) {
    valueGroups.push(currentGroup.trim());
  }

  const records = valueGroups.map(group => {
    // Убираем внешние скобки
    const cleanGroup = group.replace(/^\(|\)$/g, '');
    const values = [];
    let current = '';
    let inString = false;
    let stringChar = '';
    let parenCount = 0;

    for (let i = 0; i < cleanGroup.length; i++) {
      const char = cleanGroup[i];
      
      if (!inString && (char === '"' || char === "'")) {
        inString = true;
        stringChar = char;
        current += char;
      } else if (inString && char === stringChar && cleanGroup[i-1] !== '\\') {
        inString = false;
        stringChar = '';
        current += char;
      } else if (!inString && char === ',' && parenCount === 0) {
        values.push(current.trim());
        current = '';
      } else {
        if (!inString && char === '(') parenCount++;
        if (!inString && char === ')') parenCount--;
        current += char;
      }
    }
    
    if (current.trim()) {
      values.push(current.trim());
    }

    const record = {};
    columns.forEach((col, index) => {
      let value = values[index];
      if (value === 'NULL') {
        record[col] = null;
      } else if (value.startsWith("'") && value.endsWith("'")) {
        record[col] = value.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"');
      } else if (value.startsWith('"') && value.endsWith('"')) {
        record[col] = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
      } else if (value === 'true') {
        record[col] = true;
      } else if (value === 'false') {
        record[col] = false;
      } else if (!isNaN(value) && value !== '') {
        record[col] = parseFloat(value);
      } else {
        record[col] = value;
      }
    });

    return record;
  });

  return { tableName, records };
}

// Основная функция
async function main() {
  const backupFile = path.join(__dirname, '..', 'backups', 'db', 'database_backup_v004_2025-10-24_21-30-49.sql');
  
  console.log('🚀 Подготовка данных для Prisma Studio...');
  console.log(`📁 Файл бэкапа: ${backupFile}`);
  
  if (!fs.existsSync(backupFile)) {
    console.error('❌ Файл бэкапа не найден!');
    return;
  }

  try {
    // Читаем файл бэкапа
    const backupContent = fs.readFileSync(backupFile, 'utf8');
    const lines = backupContent.split('\n');
    
    const data = {
      providers: [],
      mechanics: [],
      themes: [],
      slot_categories: [],
      slots: []
    };
    
    // Парсим SQL файл
    console.log('📖 Парсинг SQL файла...');
    for (const line of lines) {
      if (line.trim().startsWith('INSERT INTO')) {
        const parsed = parseInsertStatement(line.trim());
        if (parsed && data[parsed.tableName]) {
          data[parsed.tableName].push(...parsed.records);
        }
      }
    }
    
    console.log('📊 Найдено данных:');
    console.log(`   Провайдеры: ${data.providers.length}`);
    console.log(`   Механики: ${data.mechanics.length}`);
    console.log(`   Темы: ${data.themes.length}`);
    console.log(`   Категории: ${data.slot_categories.length}`);
    console.log(`   Слоты: ${data.slots.length}`);
    
    // Сохраняем данные в отдельные JSON файлы для удобства
    const outputDir = path.join(__dirname, 'studio-data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    
    // Сохраняем каждую таблицу в отдельный файл
    for (const [tableName, records] of Object.entries(data)) {
      if (records.length > 0) {
        const outputFile = path.join(outputDir, `${tableName}.json`);
        fs.writeFileSync(outputFile, JSON.stringify(records, null, 2));
        console.log(`✅ Сохранено ${records.length} записей в ${tableName}.json`);
      }
    }
    
    // Создаем краткую сводку для быстрого просмотра
    const summary = {
      providers: data.providers.slice(0, 5).map(p => ({ id: p.id, name: p.name, slug: p.slug })),
      mechanics: data.mechanics.map(m => ({ id: m.id, name: m.name, slug: m.slug, description: m.description })),
      themes: data.themes.slice(0, 10).map(t => ({ id: t.id, name: t.name, slug: t.slug })),
      slot_categories: data.slot_categories.slice(0, 10).map(c => ({ id: c.id, name: c.name, slug: c.slug })),
      slots: data.slots.map(s => ({ id: s.id, name: s.name, slug: s.slug, provider_id: s.provider_id }))
    };
    
    const summaryFile = path.join(outputDir, 'summary.json');
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    console.log(`📋 Создана сводка в summary.json`);
    
    console.log('\n🎯 Инструкции для восстановления через Prisma Studio:');
    console.log('1. Откройте Prisma Studio: http://localhost:5555');
    console.log('2. Данные подготовлены в папке backend/studio-data/');
    console.log('3. Рекомендуемый порядок восстановления:');
    console.log('   - Сначала: providers.json (провайдеры)');
    console.log('   - Затем: mechanics.json (механики)');
    console.log('   - Затем: themes.json (темы)');
    console.log('   - Затем: slot_categories.json (категории)');
    console.log('   - Последними: slots.json (слоты)');
    console.log('4. Скопируйте данные из JSON файлов и вставьте в Prisma Studio');
    
    console.log('\n✅ Подготовка данных завершена!');
    
  } catch (error) {
    console.error('❌ Ошибка при подготовке данных:', error);
  }
}

// Запускаем подготовку
main().catch(console.error);