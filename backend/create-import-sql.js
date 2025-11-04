const fs = require('fs');
const path = require('path');

// Загрузка данных из JSON файлов
function loadJsonData(filename) {
  try {
    const filePath = path.join(__dirname, 'studio-data', filename);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Файл ${filename} не найден`);
      return [];
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`📁 Загружено ${data.length} записей из ${filename}`);
    return data;
  } catch (error) {
    console.error(`❌ Ошибка загрузки ${filename}:`, error.message);
    return [];
  }
}

// Экранирование строк для SQL
function escapeString(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${str.toString().replace(/'/g, "''")}'`;
}

// Форматирование даты для PostgreSQL
function formatDate(dateStr) {
  if (!dateStr) return 'NOW()';
  return `'${new Date(dateStr).toISOString()}'`;
}

// Генерация INSERT запросов для провайдеров
function generateProvidersSQL(providers) {
  if (!providers || providers.length === 0) return '';
  
  let sql = '-- Провайдеры\\n';
  sql += 'INSERT INTO "providers" ("id", "name", "slug", "description", "logo_url", "website_url", "founded_year", "country", "is_active", "created_at", "updated_at", "is_recommended") VALUES\\n';
  
  const values = providers.map(p => {
    return `(${escapeString(p.id)}, ${escapeString(p.name)}, ${escapeString(p.slug)}, ${escapeString(p.description)}, ${escapeString(p.logo_url)}, ${escapeString(p.website_url)}, ${p.founded_year || 'NULL'}, ${escapeString(p.country)}, ${p.is_active}, ${formatDate(p.created_at)}, ${formatDate(p.updated_at)}, ${p.is_recommended})`;
  }).join(',\\n');
  
  sql += values + ';\\n\\n';
  return sql;
}

// Генерация INSERT запросов для механик
function generateMechanicsSQL(mechanics) {
  if (!mechanics || mechanics.length === 0) return '';
  
  let sql = '-- Механики\\n';
  sql += 'INSERT INTO "mechanics" ("id", "name", "slug", "description", "created_at", "updated_at") VALUES\\n';
  
  const values = mechanics.map(m => {
    return `(${escapeString(m.id)}, ${escapeString(m.name)}, ${escapeString(m.slug)}, ${escapeString(m.description)}, ${formatDate(m.created_at)}, ${formatDate(m.updated_at)})`;
  }).join(',\\n');
  
  sql += values + ';\\n\\n';
  return sql;
}

// Генерация INSERT запросов для тем
function generateThemesSQL(themes) {
  if (!themes || themes.length === 0) return '';
  
  let sql = '-- Темы\\n';
  sql += 'INSERT INTO "themes" ("id", "name", "slug", "created_at", "updated_at") VALUES\\n';
  
  const values = themes.map(t => {
    return `(${escapeString(t.id)}, ${escapeString(t.name)}, ${escapeString(t.slug)}, ${formatDate(t.created_at)}, ${formatDate(t.updated_at)})`;
  }).join(',\\n');
  
  sql += values + ';\\n\\n';
  return sql;
}

// Генерация INSERT запросов для категорий
function generateCategoriesSQL(categories) {
  if (!categories || categories.length === 0) return '';
  
  let sql = '-- Категории слотов\\n';
  sql += 'INSERT INTO "slot_categories" ("id", "name", "slug", "created_at", "updated_at") VALUES\\n';
  
  const values = categories.map(c => {
    return `(${escapeString(c.id)}, ${escapeString(c.name)}, ${escapeString(c.slug)}, ${formatDate(c.created_at)}, ${formatDate(c.updated_at)})`;
  }).join(',\\n');
  
  sql += values + ';\\n\\n';
  return sql;
}

// Генерация INSERT запросов для слотов
function generateSlotsSQL(slots) {
  if (!slots || slots.length === 0) return '';
  
  let sql = '-- Слоты\\n';
  sql += 'INSERT INTO "slots" ("id", "name", "slug", "provider_id", "category_id", "theme_id", "rtp", "volatility", "min_bet", "max_bet", "max_win", "paylines", "reels", "rows", "has_free_spins", "has_bonus_game", "has_wild", "has_scatter", "has_multiplier", "description", "image_url", "demo_url", "is_active", "created_at", "updated_at") VALUES\\n';
  
  const values = slots.map(s => {
    return `(${escapeString(s.id)}, ${escapeString(s.name)}, ${escapeString(s.slug)}, ${escapeString(s.provider_id)}, ${escapeString(s.category_id)}, ${escapeString(s.theme_id)}, ${s.rtp || 'NULL'}, ${escapeString(s.volatility)}, ${s.min_bet || 'NULL'}, ${s.max_bet || 'NULL'}, ${s.max_win || 'NULL'}, ${s.paylines || 'NULL'}, ${s.reels || 'NULL'}, ${s.rows || 'NULL'}, ${s.has_free_spins}, ${s.has_bonus_game}, ${s.has_wild}, ${s.has_scatter}, ${s.has_multiplier}, ${escapeString(s.description)}, ${escapeString(s.image_url)}, ${escapeString(s.demo_url)}, ${s.is_active}, ${formatDate(s.created_at)}, ${formatDate(s.updated_at)})`;
  }).join(',\\n');
  
  sql += values + ';\\n\\n';
  return sql;
}

// Основная функция
function main() {
  console.log('🚀 Генерация SQL файла для импорта данных');
  console.log('='.repeat(50));
  
  try {
    // Загружаем данные
    const providers = loadJsonData('providers.json');
    const mechanics = loadJsonData('mechanics.json');
    const themes = loadJsonData('themes.json');
    const categories = loadJsonData('slot_categories.json');
    const slots = loadJsonData('slots.json');
    
    // Генерируем SQL
    let sql = '-- Автоматически сгенерированный SQL файл для восстановления данных\\n';
    sql += `-- Дата создания: ${new Date().toISOString()}\\n\\n`;
    
    // Добавляем команды для очистки таблиц (опционально)
    sql += '-- Очистка таблиц (раскомментируйте при необходимости)\\n';
    sql += '-- DELETE FROM "slot_mechanics";\\n';
    sql += '-- DELETE FROM "slots";\\n';
    sql += '-- DELETE FROM "slot_categories";\\n';
    sql += '-- DELETE FROM "themes";\\n';
    sql += '-- DELETE FROM "mechanics";\\n';
    sql += '-- DELETE FROM "providers";\\n\\n';
    
    // Генерируем INSERT запросы в правильном порядке
    sql += generateProvidersSQL(providers);
    sql += generateMechanicsSQL(mechanics);
    sql += generateThemesSQL(themes);
    sql += generateCategoriesSQL(categories);
    sql += generateSlotsSQL(slots);
    
    // Сохраняем файл
    const outputPath = path.join(__dirname, 'import-data.sql');
    fs.writeFileSync(outputPath, sql);
    
    console.log('\\n✅ SQL файл успешно создан!');
    console.log(`📁 Файл сохранен: ${outputPath}`);
    console.log('\\n📊 Статистика:');
    console.log(`   Провайдеры: ${providers.length} записей`);
    console.log(`   Механики: ${mechanics.length} записей`);
    console.log(`   Темы: ${themes.length} записей`);
    console.log(`   Категории: ${categories.length} записей`);
    console.log(`   Слоты: ${slots.length} записей`);
    
    console.log('\\n🔧 Инструкции по использованию:');
    console.log('1. Откройте Supabase SQL Editor');
    console.log('2. Скопируйте содержимое import-data.sql');
    console.log('3. Выполните SQL запросы');
    console.log('4. Проверьте результат');
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

main();