#!/usr/bin/env node

/**
 * 🎯 ПРОСТОЕ ВОССТАНОВЛЕНИЕ ИЗ JSON
 *
 * Этот скрипт восстанавливает данные из JSON файлов в studio-data
 * Работает даже если Supabase подключение недоступно
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

console.log('🎯 ВОССТАНОВЛЕНИЕ ДАННЫХ ИЗ JSON');
console.log('='.repeat(60));

async function restoreFromJSON() {
  try {
    // Путь к папке с JSON данными
    const dataDir = path.join(__dirname, 'studio-data');

    console.log('\n📂 Проверка папки с данными...');
    if (!fs.existsSync(dataDir)) {
      console.log('❌ Папка studio-data не найдена!');
      console.log('💡 Используем extracted-data...');
      const altDataDir = path.join(__dirname, 'extracted-data');
      if (!fs.existsSync(altDataDir)) {
        throw new Error('Папки с данными не найдены!');
      }
    }

    console.log('✅ Папка с данными найдена');

    // Подключаемся к БД
    console.log('\n🔌 Подключение к базе данных...');
    await prisma.$connect();
    console.log('✅ Подключение установлено');

    // Читаем JSON файлы
    console.log('\n📖 Чтение JSON файлов...');

    const providersPath = path.join(dataDir, 'providers.json');
    const mechanicsPath = path.join(dataDir, 'mechanics.json');
    const themesPath = path.join(dataDir, 'themes.json');
    const categoriesPath = path.join(dataDir, 'slot_categories.json');
    const slotsPath = path.join(dataDir, 'slots.json');

    // Проверяем наличие файлов
    const files = {
      providers: fs.existsSync(providersPath) ? JSON.parse(fs.readFileSync(providersPath, 'utf8')) : [],
      mechanics: fs.existsSync(mechanicsPath) ? JSON.parse(fs.readFileSync(mechanicsPath, 'utf8')) : [],
      themes: fs.existsSync(themesPath) ? JSON.parse(fs.readFileSync(themesPath, 'utf8')) : [],
      categories: fs.existsSync(categoriesPath) ? JSON.parse(fs.readFileSync(categoriesPath, 'utf8')) : [],
      slots: fs.existsSync(slotsPath) ? JSON.parse(fs.readFileSync(slotsPath, 'utf8')) : []
    };

    console.log(`📊 Прочитано:`);
    console.log(`   - Провайдеры: ${files.providers.length} записей`);
    console.log(`   - Механики: ${files.mechanics.length} записей`);
    console.log(`   - Темы: ${files.themes.length} записей`);
    console.log(`   - Категории: ${files.categories.length} записей`);
    console.log(`   - Слоты: ${files.slots.length} записей`);

    // Очищаем существующие данные
    console.log('\n🗑️  Очистка существующих данных...');
    try {
      await prisma.slotMechanic.deleteMany({});
      await prisma.slotFeature.deleteMany({});
      await prisma.slotBonus.deleteMany({});
      await prisma.slot.deleteMany({});
      await prisma.slotCategory.deleteMany({});
      await prisma.theme.deleteMany({});
      await prisma.mechanic.deleteMany({});
      await prisma.provider.deleteMany({});
      console.log('✅ Данные очищены');
    } catch (e) {
      console.log('⚠️ Некоторые таблицы не удалось очистить (возможно, они пусты)');
    }

    // Восстанавливаем данные
    console.log('\n💾 Восстановление данных...');

    // 1. Провайдеры
    if (files.providers.length > 0) {
      console.log('   📦 Восстановление провайдеров...');
      for (const provider of files.providers) {
        try {
          await prisma.provider.create({
            data: {
              id: provider.id,
              name: provider.name,
              slug: provider.slug,
              description: provider.description || null,
              logo_url: provider.logo_url || null,
              website_url: provider.website_url || null,
              founded_year: provider.founded_year || null,
              country: provider.country || null,
              is_active: provider.is_active !== false,
              is_recommended: provider.is_recommended || false,
              created_at: provider.created_at ? new Date(provider.created_at) : new Date(),
              updated_at: provider.updated_at ? new Date(provider.updated_at) : new Date()
            }
          });
        } catch (e) {
          // Игнорируем ошибки дубликатов
          if (!e.message.includes('Unique constraint')) {
            console.log(`   ⚠️ Ошибка: ${provider.name}`);
          }
        }
      }
      console.log(`   ✅ Провайдеры восстановлены: ${files.providers.length}`);
    }

    // 2. Механики
    if (files.mechanics.length > 0) {
      console.log('   🔧 Восстановление механик...');
      for (const mechanic of files.mechanics) {
        try {
          await prisma.mechanic.create({
            data: {
              id: mechanic.id,
              name: mechanic.name,
              slug: mechanic.slug,
              description: mechanic.description || null,
              type: mechanic.type || null,
              icon: mechanic.icon || null,
              color: mechanic.color || '#8b5cf6',
              image_url: mechanic.image_url || null,
              sort_order: mechanic.sort_order || 0,
              is_active: mechanic.is_active !== false,
              is_popular: mechanic.is_popular || false,
              is_featured: mechanic.is_featured || false,
              created_at: mechanic.created_at ? new Date(mechanic.created_at) : new Date(),
              updated_at: mechanic.updated_at ? new Date(mechanic.updated_at) : new Date()
            }
          });
        } catch (e) {
          if (!e.message.includes('Unique constraint')) {
            console.log(`   ⚠️ Ошибка: ${mechanic.name}`);
          }
        }
      }
      console.log(`   ✅ Механики восстановлены: ${files.mechanics.length}`);
    }

    // 3. Темы
    if (files.themes.length > 0) {
      console.log('   🎨 Восстановление тем...');
      for (const theme of files.themes) {
        try {
          await prisma.theme.create({
            data: {
              id: theme.id,
              name: theme.name,
              slug: theme.slug,
              description: theme.description || null,
              color: theme.color || null,
              icon: theme.icon || null,
              is_featured: theme.is_featured || false,
              is_active: theme.is_active !== false,
              created_at: theme.created_at ? new Date(theme.created_at) : new Date(),
              updated_at: theme.updated_at ? new Date(theme.updated_at) : new Date()
            }
          });
        } catch (e) {
          if (!e.message.includes('Unique constraint')) {
            console.log(`   ⚠️ Ошибка: ${theme.name}`);
          }
        }
      }
      console.log(`   ✅ Темы восстановлены: ${files.themes.length}`);
    }

    // 4. Категории
    if (files.categories.length > 0) {
      console.log('   📁 Восстановление категорий...');
      for (const category of files.categories) {
        try {
          await prisma.slotCategory.create({
            data: {
              id: category.id,
              name: category.name,
              slug: category.slug,
              description: category.description || null,
              is_active: category.is_active !== false,
              created_at: category.created_at ? new Date(category.created_at) : new Date(),
              updated_at: category.updated_at ? new Date(category.updated_at) : new Date()
            }
          });
        } catch (e) {
          if (!e.message.includes('Unique constraint')) {
            console.log(`   ⚠️ Ошибка: ${category.name}`);
          }
        }
      }
      console.log(`   ✅ Категории восстановлены: ${files.categories.length}`);
    }

    // 5. Слоты
    if (files.slots.length > 0) {
      console.log('   🎰 Восстановление слотов...');
      for (const slot of files.slots) {
        try {
          await prisma.slot.create({
            data: {
              id: slot.id,
              name: slot.name,
              slug: slot.slug,
              provider_id: slot.provider_id,
              category_id: slot.category_id || null,
              theme_id: slot.theme_id || null,
              description: slot.description || null,
              image_url: slot.image_url || null,
              thumbnail_url: slot.thumbnail_url || null,
              demo_url: slot.demo_url || null,
              rtp: slot.rtp || null,
              volatility: slot.volatility || null,
              min_bet: slot.min_bet || null,
              max_bet: slot.max_bet || null,
              max_win: slot.max_win || null,
              reels: slot.reels || 5,
              rows: slot.rows || 3,
              release_date: slot.release_date ? new Date(slot.release_date) : null,
              is_active: slot.is_active !== false,
              rating: slot.rating || 0,
              play_count: slot.play_count || 0,
              created_at: slot.created_at ? new Date(slot.created_at) : new Date(),
              updated_at: slot.updated_at ? new Date(slot.updated_at) : new Date()
            }
          });
        } catch (e) {
          if (!e.message.includes('Unique constraint')) {
            console.log(`   ⚠️ Ошибка: ${slot.name}`);
          }
        }
      }
      console.log(`   ✅ Слоты восстановлены: ${files.slots.length}`);
    }

    // Проверяем результаты
    console.log('\n📊 ПРОВЕРКА ВОССТАНОВЛЕННЫХ ДАННЫХ:');
    console.log('='.repeat(60));

    const counts = {
      providers: await prisma.provider.count(),
      mechanics: await prisma.mechanic.count(),
      themes: await prisma.theme.count(),
      categories: await prisma.slotCategory.count(),
      slots: await prisma.slot.count()
    };

    console.log(`🏢 Провайдеры:     ${counts.providers} записей`);
    console.log(`🔧 Механики:       ${counts.mechanics} записей`);
    console.log(`🎨 Темы:           ${counts.themes} записей`);
    console.log(`📁 Категории:      ${counts.categories} записей`);
    console.log(`🎰 Слоты:          ${counts.slots} записей`);

    if (counts.providers > 0 || counts.mechanics > 0 || counts.themes > 0) {
      console.log('\n🎉 ВОССТАНОВЛЕНИЕ ЗАВЕРШЕНО УСПЕШНО!');
      console.log('\n💡 Следующие шаги:');
      console.log('   1. Запустите Prisma Studio: npx prisma studio');
      console.log('   2. Запустите backend: npm run start:dev');
      console.log('   3. Проверьте данные в приложении');
    } else {
      console.log('\n⚠️ ВНИМАНИЕ: Данные не восстановлены');
      console.log('   Проверьте наличие JSON файлов в папке studio-data');
    }

  } catch (error) {
    console.error('\n🚨 ОШИБКА:', error.message);
    console.error('📋 Детали:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запускаем восстановление
restoreFromJSON();
