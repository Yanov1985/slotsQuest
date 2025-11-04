const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Подключение к SQLite базе данных
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./dev.db'
    }
  }
});

async function createPostgreSQLBackup() {
  console.log('\n🔄 СОЗДАНИЕ POSTGRESQL БЕКАПА ИЗ SQLITE ДАННЫХ');
  console.log('===============================================');

  try {
    // Получаем все данные из SQLite
    console.log('📊 Извлечение данных из SQLite...');
    
    const providers = await prisma.provider.findMany();
    const mechanics = await prisma.mechanic.findMany();
    const themes = await prisma.theme.findMany();
    const categories = await prisma.slotCategory.findMany();
    const slots = await prisma.slot.findMany();

    console.log(`   Провайдеры: ${providers.length}`);
    console.log(`   Механики: ${mechanics.length}`);
    console.log(`   Темы: ${themes.length}`);
    console.log(`   Категории: ${categories.length}`);
    console.log(`   Слоты: ${slots.length}`);

    // Создаем PostgreSQL SQL бекап
    let sqlContent = '';
    
    // Заголовок
    sqlContent += `-- PostgreSQL Database Backup\n`;
    sqlContent += `-- Generated from SQLite data on ${new Date().toISOString()}\n`;
    sqlContent += `-- Total records: ${providers.length + mechanics.length + themes.length + categories.length + slots.length}\n\n`;

    // Отключаем проверки внешних ключей
    sqlContent += `SET foreign_key_checks = 0;\n\n`;

    // Очищаем таблицы в правильном порядке
    sqlContent += `-- Clear existing data\n`;
    sqlContent += `DELETE FROM slots;\n`;
    sqlContent += `DELETE FROM slot_categories;\n`;
    sqlContent += `DELETE FROM themes;\n`;
    sqlContent += `DELETE FROM mechanics;\n`;
    sqlContent += `DELETE FROM providers;\n\n`;

    // Функция для экранирования значений
    function escapeValue(value) {
      if (value === null || value === undefined) return 'NULL';
      if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`;
      }
      if (typeof value === 'boolean') return value ? 'true' : 'false';
      if (value instanceof Date) return `'${value.toISOString()}'`;
      return value;
    }

    // Провайдеры
    if (providers.length > 0) {
      sqlContent += `-- Insert providers\n`;
      for (const provider of providers) {
        const values = [
          escapeValue(provider.id),
          escapeValue(provider.name),
          escapeValue(provider.slug),
          escapeValue(provider.description),
          escapeValue(provider.logo_url),
          escapeValue(provider.website_url),
          escapeValue(provider.founded_year),
          escapeValue(provider.country),
          escapeValue(provider.created_at),
          escapeValue(provider.updated_at),
          escapeValue(provider.is_recommended)
        ].join(', ');
        
        sqlContent += `INSERT INTO providers (id, name, slug, description, logo_url, website_url, founded_year, country, created_at, updated_at, is_recommended) VALUES (${values});\n`;
      }
      sqlContent += '\n';
    }

    // Механики
    if (mechanics.length > 0) {
      sqlContent += `-- Insert mechanics\n`;
      for (const mechanic of mechanics) {
        const values = [
          escapeValue(mechanic.id),
          escapeValue(mechanic.name),
          escapeValue(mechanic.slug),
          escapeValue(mechanic.description),
          escapeValue(mechanic.type),
          escapeValue(mechanic.icon),
          escapeValue(mechanic.color),
          escapeValue(mechanic.image_url),
          escapeValue(mechanic.sort_order),
          escapeValue(mechanic.is_active),
          escapeValue(mechanic.is_popular),
          escapeValue(mechanic.is_featured),
          escapeValue(mechanic.created_at),
          escapeValue(mechanic.updated_at)
        ].join(', ');
        
        sqlContent += `INSERT INTO mechanics (id, name, slug, description, type, icon, color, image_url, sort_order, is_active, is_popular, is_featured, created_at, updated_at) VALUES (${values});\n`;
      }
      sqlContent += '\n';
    }

    // Темы
    if (themes.length > 0) {
      sqlContent += `-- Insert themes\n`;
      for (const theme of themes) {
        const values = [
          escapeValue(theme.id),
          escapeValue(theme.name),
          escapeValue(theme.slug),
          escapeValue(theme.description),
          escapeValue(theme.color),
          escapeValue(theme.icon),
          escapeValue(theme.is_featured),
          escapeValue(theme.is_active),
          escapeValue(theme.created_at),
          escapeValue(theme.updated_at)
        ].join(', ');
        
        sqlContent += `INSERT INTO themes (id, name, slug, description, color, icon, is_featured, is_active, created_at, updated_at) VALUES (${values});\n`;
      }
      sqlContent += '\n';
    }

    // Категории
    if (categories.length > 0) {
      sqlContent += `-- Insert slot_categories\n`;
      for (const category of categories) {
        const values = [
          escapeValue(category.id),
          escapeValue(category.name),
          escapeValue(category.slug),
          escapeValue(category.description),
          escapeValue(category.created_at),
          escapeValue(category.is_active),
          escapeValue(category.updated_at)
        ].join(', ');
        
        sqlContent += `INSERT INTO slot_categories (id, name, slug, description, created_at, is_active, updated_at) VALUES (${values});\n`;
      }
      sqlContent += '\n';
    }

    // Слоты
    if (slots.length > 0) {
      sqlContent += `-- Insert slots\n`;
      for (const slot of slots) {
        // Создаем массив всех полей слота
        const fields = [
          'id', 'name', 'slug', 'provider_id', 'category_id', 'theme_id', 'description',
          'thumbnail_url', 'banner_url', 'demo_url', 'play_url', 'rtp', 'volatility',
          'min_bet', 'max_bet', 'max_win', 'paylines', 'reels', 'rows', 'game_field',
          'release_date', 'mobile_compatible', 'desktop_compatible', 'rating',
          'popularity_score', 'play_count', 'is_featured', 'is_new', 'is_popular',
          'is_active', 'created_at', 'updated_at'
        ];

        const values = fields.map(field => escapeValue(slot[field])).join(', ');
        
        sqlContent += `INSERT INTO slots (${fields.join(', ')}) VALUES (${values});\n`;
      }
      sqlContent += '\n';
    }

    // Включаем проверки внешних ключей
    sqlContent += `SET foreign_key_checks = 1;\n`;

    // Сохраняем файл
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `database_backup_postgresql_${timestamp}.sql`;
    const backupPath = path.join(__dirname, '..', 'backups', 'db', filename);
    
    // Создаем директорию если не существует
    const backupDir = path.dirname(backupPath);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    fs.writeFileSync(backupPath, sqlContent, 'utf8');

    console.log('\n✅ POSTGRESQL БЕКАП СОЗДАН УСПЕШНО!');
    console.log(`📁 Файл: ${filename}`);
    console.log(`📍 Путь: ${backupPath}`);
    console.log(`📊 Размер: ${Math.round(fs.statSync(backupPath).size / 1024)} KB`);
    console.log('\n💡 Этот бекап можно использовать для восстановления в PostgreSQL/Supabase');

  } catch (error) {
    console.error('\n❌ Ошибка при создании бекапа:', error.message);
    console.error('📝 Детали:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createPostgreSQLBackup();