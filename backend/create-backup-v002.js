require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportData() {
  try {
    console.log('Подключаюсь к базе данных...');
    
    // Получаем все данные
    const providers = await prisma.providers.findMany();
    const categories = await prisma.slot_categories.findMany();
    const slots = await prisma.slots.findMany();
    const themes = await prisma.themes.findMany();
    
    console.log(`Найдено: ${providers.length} провайдеров, ${categories.length} категорий, ${slots.length} слотов, ${themes.length} тем`);
    
    let sql = '-- Резервная копия базы данных SlotQuest v002\n';
    sql += `-- Создано: ${new Date().toISOString()}\n\n`;
    
    // Отключаем проверки внешних ключей
    sql += 'SET foreign_key_checks = 0;\n\n';
    
    // Провайдеры
    if (providers.length > 0) {
      sql += '-- Провайдеры\n';
      sql += 'DELETE FROM providers;\n';
      for (const provider of providers) {
        const name = provider.name ? provider.name.replace(/'/g, "''") : '';
        const slug = provider.slug ? provider.slug.replace(/'/g, "''") : '';
        const description = provider.description ? provider.description.replace(/'/g, "''") : null;
        const logoUrl = provider.logo_url ? provider.logo_url.replace(/'/g, "''") : null;
        const websiteUrl = provider.website_url ? provider.website_url.replace(/'/g, "''") : null;
        const country = provider.country ? provider.country.replace(/'/g, "''") : null;
        
        const createdAt = provider.created_at ? provider.created_at.toISOString() : new Date().toISOString();
        const updatedAt = provider.updated_at ? provider.updated_at.toISOString() : new Date().toISOString();
        sql += `INSERT INTO providers (id, name, slug, logo_url, website_url, country, founded_year, description, is_active, is_recommended, created_at, updated_at) VALUES ('${provider.id}', '${name}', '${slug}', ${logoUrl ? `'${logoUrl}'` : 'NULL'}, ${websiteUrl ? `'${websiteUrl}'` : 'NULL'}, ${country ? `'${country}'` : 'NULL'}, ${provider.founded_year || 'NULL'}, ${description ? `'${description}'` : 'NULL'}, ${provider.is_active || false}, ${provider.is_recommended || false}, '${createdAt}', '${updatedAt}');
`;
      }
      sql += '\n';
    }
    
    // Категории
    if (categories.length > 0) {
      sql += '-- Категории\n';
      sql += 'DELETE FROM slot_categories;\n';
      for (const category of categories) {
        const name = category.name ? category.name.replace(/'/g, "''") : '';
        const slug = category.slug ? category.slug.replace(/'/g, "''") : '';
        const description = category.description ? category.description.replace(/'/g, "''") : null;
        
        const createdAt = category.created_at ? category.created_at.toISOString() : new Date().toISOString();
        const updatedAt = category.updated_at ? category.updated_at.toISOString() : new Date().toISOString();
        sql += `INSERT INTO slot_categories (id, name, slug, description, created_at, updated_at) VALUES ('${category.id}', '${name}', '${slug}', ${description ? `'${description}'` : 'NULL'}, '${createdAt}', '${updatedAt}');
`;
      }
      sql += '\n';
    }
    
    // Темы
    if (themes.length > 0) {
      sql += '-- Темы\n';
      sql += 'DELETE FROM themes;\n';
      for (const theme of themes) {
        const name = theme.name ? theme.name.replace(/'/g, "''") : '';
        const slug = theme.slug ? theme.slug.replace(/'/g, "''") : '';
        const description = theme.description ? theme.description.replace(/'/g, "''") : null;
        
        const createdAt = theme.created_at ? theme.created_at.toISOString() : new Date().toISOString();
        const updatedAt = theme.updated_at ? theme.updated_at.toISOString() : new Date().toISOString();
        sql += `INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('${theme.id}', '${name}', '${slug}', ${description ? `'${description}'` : 'NULL'}, '${createdAt}', '${updatedAt}');
`;
      }
      sql += '\n';
    }
    
    // Слоты
    if (slots.length > 0) {
      sql += '-- Слоты\n';
      sql += 'DELETE FROM slots;\n';
      for (const slot of slots) {
        const name = slot.name ? slot.name.replace(/'/g, "''") : '';
        const slug = slot.slug ? slot.slug.replace(/'/g, "''") : '';
        const description = slot.description ? slot.description.replace(/'/g, "''") : null;
        const imageUrl = slot.image_url ? slot.image_url.replace(/'/g, "''") : null;
        
        const createdAt = slot.created_at ? slot.created_at.toISOString() : new Date().toISOString();
        const updatedAt = slot.updated_at ? slot.updated_at.toISOString() : new Date().toISOString();
        sql += `INSERT INTO slots (id, name, slug, provider_id, category_id, theme_id, description, image_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, release_date, is_active, is_featured, popularity_score, play_count, created_at, updated_at) VALUES ('${slot.id}', '${name}', '${slug}', '${slot.provider_id}', '${slot.category_id}', ${slot.theme_id ? `'${slot.theme_id}'` : 'NULL'}, ${description ? `'${description}'` : 'NULL'}, ${imageUrl ? `'${imageUrl}'` : 'NULL'}, ${slot.rtp || 0}, '${slot.volatility || 'medium'}', ${slot.min_bet || 0}, ${slot.max_bet || 0}, ${slot.max_win || 0}, ${slot.reels || 5}, ${slot.rows || 3}, '${slot.release_date ? slot.release_date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}', ${slot.is_active || false}, ${slot.is_featured || false}, ${slot.popularity_score || 0}, ${slot.play_count || 0}, '${createdAt}', '${updatedAt}');
`;
      }
      sql += '\n';
    }
    
    // Включаем обратно проверки внешних ключей
    sql += 'SET foreign_key_checks = 1;\n';
    
    // Сохраняем файл
    const backupDir = path.join(__dirname, '..', 'backups', 'db');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const outputFile = path.join(backupDir, 'database_backup_v002.sql');
    fs.writeFileSync(outputFile, sql);
    
    console.log(`✅ Резервная копия успешно создана: ${outputFile}`);
    console.log(`📁 Размер файла: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);
    
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('❌ Ошибка при создании резервной копии:', error.message);
    console.error(error.stack);
    await prisma.$disconnect();
    process.exit(1);
  }
}

exportData();