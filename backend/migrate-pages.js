const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migratePages() {
  try {
    const backupPath = path.join(__dirname, '..', 'backups', 'migrations', 'full_migration_LATEST.json');
    console.log('Чтение бэкапа:', backupPath);
    const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

    const pagesData = backup.data.pages;
    if (!pagesData || pagesData.length === 0) {
      console.log('В бэкапе нет данных таблицы pages.');
      return;
    }

    console.log(`Найдено ${pagesData.length} записей в таблице pages. Начинаю миграцию...`);

    for (const page of pagesData) {
      console.log(`Миграция страницы: ${page.slug}`);
      await prisma.pages.upsert({
        where: { slug: page.slug },
        update: {
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
    }

    console.log('✅ Миграция таблицы pages успешно завершена!');
  } catch (error) {
    console.error('Ошибка миграции:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migratePages();
