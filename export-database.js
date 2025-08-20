const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Загружаем переменные окружения
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL не найден в .env файле');
  process.exit(1);
}

// Парсим URL базы данных
const url = new URL(DATABASE_URL);
const dbConfig = {
  host: url.hostname,
  port: url.port || 5432,
  database: url.pathname.slice(1),
  username: url.username,
  password: url.password
};

console.log('Экспортирую базу данных...');

try {
  // Создаем команду pg_dump
  const pgDumpCommand = `pg_dump -h ${dbConfig.host} -p ${dbConfig.port} -U ${dbConfig.username} -d ${dbConfig.database} --no-password --clean --if-exists --create`;
  
  // Устанавливаем пароль через переменную окружения
  const env = { ...process.env, PGPASSWORD: dbConfig.password };
  
  // Выполняем экспорт
  const result = execSync(pgDumpCommand, { 
    env: env,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 10 // 10MB buffer
  });
  
  // Сохраняем в файл
  const outputFile = path.join(__dirname, 'database_backup.sql');
  fs.writeFileSync(outputFile, result);
  
  console.log(`База данных успешно экспортирована в: ${outputFile}`);
  console.log(`Размер файла: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);
  
} catch (error) {
  console.error('Ошибка при экспорте базы данных:', error.message);
  
  // Альтернативный способ - экспорт через Prisma
  console.log('\nПробую альтернативный способ через Prisma...');
  
  try {
    const { PrismaClient } = require('./backend/node_modules/@prisma/client');
    const prisma = new PrismaClient();
    
    async function exportData() {
      const providers = await prisma.provider.findMany();
      const categories = await prisma.slotCategory.findMany();
      const slots = await prisma.slot.findMany();
      const themes = await prisma.theme.findMany();
      
      let sql = '-- Экспорт данных SlotQuest\n\n';
      
      // Провайдеры
      sql += '-- Провайдеры\n';
      for (const provider of providers) {
        sql += `INSERT INTO providers (id, name, slug, logo_url, website_url, description, created_at, updated_at) VALUES ('${provider.id}', '${provider.name}', '${provider.slug}', ${provider.logo_url ? `'${provider.logo_url}'` : 'NULL'}, ${provider.website_url ? `'${provider.website_url}'` : 'NULL'}, ${provider.description ? `'${provider.description}'` : 'NULL'}, '${provider.created_at.toISOString()}', '${provider.updated_at.toISOString()}');\n`;
      }
      
      // Категории
      sql += '\n-- Категории\n';
      for (const category of categories) {
        sql += `INSERT INTO slot_categories (id, name, slug, description, created_at, updated_at) VALUES ('${category.id}', '${category.name}', '${category.slug}', ${category.description ? `'${category.description}'` : 'NULL'}, '${category.created_at.toISOString()}', '${category.updated_at.toISOString()}');\n`;
      }
      
      // Темы
      sql += '\n-- Темы\n';
      for (const theme of themes) {
        sql += `INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('${theme.id}', '${theme.name}', '${theme.slug}', ${theme.description ? `'${theme.description}'` : 'NULL'}, '${theme.created_at.toISOString()}', '${theme.updated_at.toISOString()}');\n`;
      }
      
      // Слоты
      sql += '\n-- Слоты\n';
      for (const slot of slots) {
        sql += `INSERT INTO slots (id, name, slug, provider_id, category_id, theme_id, description, image_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, release_date, is_active, is_featured, popularity_score, play_count, created_at, updated_at) VALUES ('${slot.id}', '${slot.name}', '${slot.slug}', '${slot.provider_id}', '${slot.category_id}', ${slot.theme_id ? `'${slot.theme_id}'` : 'NULL'}, ${slot.description ? `'${slot.description}'` : 'NULL'}, ${slot.image_url ? `'${slot.image_url}'` : 'NULL'}, ${slot.rtp}, '${slot.volatility}', ${slot.min_bet}, ${slot.max_bet}, ${slot.max_win}, ${slot.reels}, ${slot.rows}, '${slot.release_date.toISOString().split('T')[0]}', ${slot.is_active}, ${slot.is_featured}, ${slot.popularity_score}, ${slot.play_count}, '${slot.created_at.toISOString()}', '${slot.updated_at.toISOString()}');\n`;
      }
      
      const outputFile = path.join(__dirname, 'database_backup.sql');
      fs.writeFileSync(outputFile, sql);
      
      console.log(`База данных успешно экспортирована через Prisma в: ${outputFile}`);
      console.log(`Размер файла: ${(fs.statSync(outputFile).size / 1024).toFixed(2)} KB`);
      
      await prisma.$disconnect();
    }
    
    exportData().catch(console.error);
    
  } catch (prismaError) {
    console.error('Ошибка при экспорте через Prisma:', prismaError.message);
  }
}