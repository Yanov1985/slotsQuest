const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportData() {
  try {
    console.log('Экспортирую данные из базы данных...');
    
    const providers = await prisma.providers.findMany();
    const categories = await prisma.slot_categories.findMany();
    const slots = await prisma.slots.findMany();
    const themes = await prisma.themes.findMany();
    
    console.log(`Найдено: ${providers.length} провайдеров, ${categories.length} категорий, ${slots.length} слотов, ${themes.length} тем`);
    
    let sql = '-- Экспорт данных SlotQuest\n';
    sql += '-- Создано: ' + new Date().toISOString() + '\n\n';
    
    // Очистка таблиц
    sql += '-- Очистка существующих данных\n';
    sql += 'DELETE FROM slots;\n';
    sql += 'DELETE FROM themes;\n';
    sql += 'DELETE FROM slot_categories;\n';
    sql += 'DELETE FROM providers;\n\n';
    
    // Провайдеры
    if (providers.length > 0) {
      sql += '-- Провайдеры\n';
      for (const provider of providers) {
        const name = provider.name.replace(/'/g, "''");
        const slug = provider.slug.replace(/'/g, "''");
        const description = provider.description ? provider.description.replace(/'/g, "''") : null;
        
        sql += `INSERT INTO providers (id, name, slug, logo_url, website_url, description, created_at, updated_at) VALUES `;
        sql += `('${provider.id}', '${name}', '${slug}', `;
        sql += `${provider.logo_url ? `'${provider.logo_url}'` : 'NULL'}, `;
        sql += `${provider.website_url ? `'${provider.website_url}'` : 'NULL'}, `;
        sql += `${description ? `'${description}'` : 'NULL'}, `;
        const createdAt = provider.created_at ? provider.created_at.toISOString() : new Date().toISOString();
        const updatedAt = provider.updated_at ? provider.updated_at.toISOString() : new Date().toISOString();
        sql += `'${createdAt}', '${updatedAt}');\n`;
      }
      sql += '\n';
    }
    
    // Категории
    if (categories.length > 0) {
      sql += '-- Категории слотов\n';
      for (const category of categories) {
        const name = category.name.replace(/'/g, "''");
        const slug = category.slug.replace(/'/g, "''");
        const description = category.description ? category.description.replace(/'/g, "''") : null;
        
        sql += `INSERT INTO slot_categories (id, name, slug, description, created_at, updated_at) VALUES `;
        sql += `('${category.id}', '${name}', '${slug}', `;
        sql += `${description ? `'${description}'` : 'NULL'}, `;
        const createdAt = category.created_at ? category.created_at.toISOString() : new Date().toISOString();
        const updatedAt = category.updated_at ? category.updated_at.toISOString() : new Date().toISOString();
        sql += `'${createdAt}', '${updatedAt}');\n`;
      }
      sql += '\n';
    }
    
    // Темы
    if (themes.length > 0) {
      sql += '-- Темы\n';
      for (const theme of themes) {
        const name = theme.name.replace(/'/g, "''");
        const slug = theme.slug.replace(/'/g, "''");
        const description = theme.description ? theme.description.replace(/'/g, "''") : null;
        
        sql += `INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES `;
        sql += `('${theme.id}', '${name}', '${slug}', `;
        sql += `${description ? `'${description}'` : 'NULL'}, `;
        const createdAt = theme.created_at ? theme.created_at.toISOString() : new Date().toISOString();
        const updatedAt = theme.updated_at ? theme.updated_at.toISOString() : new Date().toISOString();
        sql += `'${createdAt}', '${updatedAt}');\n`;
      }
      sql += '\n';
    }
    
    // Слоты
    if (slots.length > 0) {
      sql += '-- Слоты\n';
      for (const slot of slots) {
        const name = slot.name.replace(/'/g, "''");
        const slug = slot.slug.replace(/'/g, "''");
        const description = slot.description ? slot.description.replace(/'/g, "''") : null;
        
        sql += `INSERT INTO slots (id, name, slug, provider_id, category_id, theme_id, description, image_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, release_date, is_active, is_featured, popularity_score, play_count, created_at, updated_at) VALUES `;
        sql += `('${slot.id}', '${name}', '${slug}', '${slot.provider_id}', '${slot.category_id}', `;
        sql += `${slot.theme_id ? `'${slot.theme_id}'` : 'NULL'}, `;
        sql += `${description ? `'${description}'` : 'NULL'}, `;
        sql += `${slot.image_url ? `'${slot.image_url}'` : 'NULL'}, `;
        sql += `${slot.rtp}, '${slot.volatility}', ${slot.min_bet}, ${slot.max_bet}, ${slot.max_win}, `;
        const releaseDate = slot.release_date ? slot.release_date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        sql += `${slot.reels}, ${slot.rows}, '${releaseDate}', `;
        sql += `${slot.is_active}, ${slot.is_featured}, ${slot.popularity_score}, ${slot.play_count}, `;
        const createdAt = slot.created_at ? slot.created_at.toISOString() : new Date().toISOString();
        const updatedAt = slot.updated_at ? slot.updated_at.toISOString() : new Date().toISOString();
        sql += `'${createdAt}', '${updatedAt}');\n`;
      }
    }
    
    const outputFile = path.join(__dirname, '..', 'current_database_backup.sql');
    fs.writeFileSync(outputFile, sql);
    
    console.log(`\nБаза данных успешно экспортирована в: ${outputFile}`);
    console.log(`Размер файла: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('Ошибка при экспорте:', error);
  } finally {
    await prisma.$disconnect();
  }
}

exportData();