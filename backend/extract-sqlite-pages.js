const sqlite3 = require('sqlite3').verbose();
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();
const dbPath = path.join(__dirname, 'prisma', 'dev.db');

console.log('Opening SQLite DB:', dbPath);

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error opening database:', err);
    process.exit(1);
  }
});

db.all('SELECT * FROM pages', async (err, rows) => {
  if (err) {
    console.error('Error reading pages from SQLite:', err);
    return;
  }
  
  console.log(`Найдено ${rows.length} записей в таблице pages (SQLite). Начинается перенос в Supabase...`);
  
  for (const page of rows) {
    // В Supabase таблице pages поля JSON хранятся как String, поэтому мы передаем их как есть из SQLite
    try {
      await prisma.pages.upsert({
        where: { slug: page.slug },
        update: {
          title: page.title,
          hero_title: page.hero_title,
          hero_desc: page.hero_desc,
          content: page.content, // Сырая строка JSON
          meta_title: page.meta_title,
          meta_desc: page.meta_desc,
          fast_filters: page.fast_filters,
          sidebar_title: page.sidebar_title,
          contact_email: page.contact_email,
          contact_telegram: page.contact_telegram,
          footer_text: page.footer_text,
          footer_company_name: page.footer_company_name,
          footer_company_address: page.footer_company_address,
          footer_license: page.footer_license,
          logo_url: page.logo_url
        },
        create: {
          id: page.id,
          slug: page.slug,
          title: page.title,
          hero_title: page.hero_title,
          hero_desc: page.hero_desc,
          content: page.content,
          meta_title: page.meta_title,
          meta_desc: page.meta_desc,
          fast_filters: page.fast_filters,
          sidebar_title: page.sidebar_title,
          contact_email: page.contact_email,
          contact_telegram: page.contact_telegram,
          footer_text: page.footer_text,
          footer_company_name: page.footer_company_name,
          footer_company_address: page.footer_company_address,
          footer_license: page.footer_license,
          logo_url: page.logo_url
        }
      });
      console.log(`✅ Скопирована страница: ${page.slug}`);
    } catch (upsertError) {
      console.error(`❌ Ошибка копирования страницы ${page.slug}:`, upsertError);
    }
  }
  
  console.log('✅ ИМПОРТ ТАБЛИЦЫ PAGES ИЗ SQLITE ЗАВЕРШЕН!');
  db.close();
  await prisma.$disconnect();
});
