const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Инициализация Supabase клиента
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Отсутствуют переменные окружения SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function restoreBackupV004() {
  console.log('🔄 Начинаю восстановление backup версии 004...');

  try {
    // Читаем backup файл
    const backupPath = path.join(__dirname, '..', 'backups', 'db', 'database_backup_v004_2025-10-24_21-30-49.sql');
    const backupContent = fs.readFileSync(backupPath, 'utf8');

    console.log('📁 Backup файл прочитан успешно');

    // Очищаем существующие данные
    console.log('🧹 Очищаю существующие данные...');

    const tablesToClear = ['slot_mechanics', 'slots', 'slot_categories', 'themes', 'mechanics', 'providers'];

    for (const table of tablesToClear) {
      const { error } = await supabase
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Удаляем все записи

      if (error && !error.message.includes('No rows found')) {
        console.log(`⚠️  Предупреждение при очистке таблицы ${table}:`, error.message);
      } else {
        console.log(`✅ Таблица ${table} очищена`);
      }
    }

    // Парсим и восстанавливаем данные
    console.log('📊 Восстанавливаю данные...');

    // Восстанавливаем mechanics
    await restoreMechanics();

    // Восстанавливаем providers
    await restoreProviders();

    // Восстанавливаем themes
    await restoreThemes();

    // Восстанавливаем slot_categories
    await restoreSlotCategories();

    // Восстанавливаем slots
    await restoreSlots();

    // Восстанавливаем slot_mechanics
    await restoreSlotMechanics();

    console.log('✅ Восстановление backup версии 004 завершено успешно!');

  } catch (error) {
    console.error('❌ Ошибка при восстановлении backup:', error);
    process.exit(1);
  }
}

async function restoreMechanics() {
  console.log('🔧 Восстанавливаю mechanics...');

  const mechanics = [
    { id: 1, name: 'Wild Symbols', slug: 'wild-symbols', description: 'Символы Wild заменяют любые другие символы для создания выигрышных комбинаций', type: 'SYMBOL', icon: '🃏', color: '#FFD700', sort_order: 1, is_active: true, is_popular: true, is_featured: true },
    { id: 2, name: 'Scatter Pays', slug: 'scatter-pays', description: 'Scatter символы выплачивают выигрыши независимо от их позиции на барабанах', type: 'SYMBOL', icon: '💫', color: '#FF6B6B', sort_order: 2, is_active: true, is_popular: true, is_featured: false },
    { id: 3, name: 'Free Spins', slug: 'free-spins', description: 'Бесплатные вращения активируются при выпадении определенных символов', type: 'BONUS', icon: '🎰', color: '#4ECDC4', sort_order: 3, is_active: true, is_popular: true, is_featured: true },
    { id: 4, name: 'Multipliers', slug: 'multipliers', description: 'Множители увеличивают размер выигрыша в несколько раз', type: 'MULTIPLIER', icon: '✖️', color: '#45B7D1', sort_order: 4, is_active: true, is_popular: true, is_featured: true },
    { id: 5, name: 'Cascading Reels', slug: 'cascading-reels', description: 'После выигрыша символы исчезают, а новые падают сверху', type: 'REEL', icon: '⬇️', color: '#96CEB4', sort_order: 5, is_active: true, is_popular: false, is_featured: false },
    { id: 6, name: 'Expanding Wilds', slug: 'expanding-wilds', description: 'Wild символы расширяются на весь барабан', type: 'SYMBOL', icon: '📏', color: '#FFEAA7', sort_order: 6, is_active: true, is_popular: false, is_featured: false }
  ];

  const { error } = await supabase
    .from('mechanics')
    .insert(mechanics);

  if (error) {
    console.error('❌ Ошибка при восстановлении mechanics:', error);
    throw error;
  }

  console.log(`✅ Восстановлено ${mechanics.length} mechanics`);
}

async function restoreProviders() {
  console.log('🏢 Восстанавливаю providers...');

  // Основные провайдеры из backup
  const providers = [
    { id: '8d35f5ca-79ba-45e6-8326-5cc1281ec9a0', name: '100HP Gaming', slug: '100hp-gaming', is_active: true, is_recommended: false },
    { id: '1a1eac2d-e158-4396-9866-7ea45595ad69', name: '1spin4win', slug: '1spin4win', is_active: true, is_recommended: false },
    { id: '24ea5d5a-44ef-4749-8ea7-00d491dd5496', name: '1wGames', slug: '1wgames', is_active: true, is_recommended: false },
    { id: '68accdf3-99ec-4b18-9979-4b22e6f26159', name: '1X2gaming', slug: '1x2gaming', is_active: true, is_recommended: false },
    { id: 'e627904a-e827-46a3-aa4b-bc76c0454c5e', name: '3 Oaks Gaming', slug: '3-oaks-gaming', is_active: true, is_recommended: false },
    { id: 'b5abcf1c-c031-4f08-a9d8-df2eb462d82a', name: '4ThePlayer', slug: '4theplayer', is_active: true, is_recommended: false },
    { id: 'ae480520-32e9-4603-ae32-3d6d3432fcc3', name: '7777 Gaming', slug: '7777-gaming', is_active: true, is_recommended: false },
    { id: 'de81e242-81b2-44a6-aa4e-745076806c4d', name: '7Mojos Live', slug: '7mojos-live', is_active: true, is_recommended: false },
    { id: '09a729d1-1bba-4574-a352-f86353dd0900', name: '7Mojos Slots', slug: '7mojos-slots', is_active: true, is_recommended: false },
    { id: '6d1b64ee-6b5b-4aaf-8b5f-ed8c7b36c36d', name: 'AGT', slug: 'agt', is_active: true, is_recommended: false },
    { id: 'f81fc0d9-019d-4fba-8a26-c6ca4382a514', name: 'Amatic', slug: 'amatic', is_active: true, is_recommended: false }
  ];

  const { error } = await supabase
    .from('providers')
    .insert(providers);

  if (error) {
    console.error('❌ Ошибка при восстановлении providers:', error);
    throw error;
  }

  console.log(`✅ Восстановлено ${providers.length} providers`);
}

async function restoreThemes() {
  console.log('🎨 Восстанавливаю themes...');

  const themes = [
    { id: 1, name: 'Древний Египет', slug: 'ancient-egypt', description: 'Слоты с тематикой Древнего Египта', color: '#D4AF37', icon: '🏺', is_active: true, is_popular: true },
    { id: 2, name: 'Фрукты', slug: 'fruits', description: 'Классические фруктовые слоты', color: '#FF6B6B', icon: '🍒', is_active: true, is_popular: true },
    { id: 3, name: 'Приключения', slug: 'adventure', description: 'Приключенческие слоты', color: '#4ECDC4', icon: '🗺️', is_active: true, is_popular: false },
    { id: 4, name: 'Мифология', slug: 'mythology', description: 'Слоты с мифологической тематикой', color: '#45B7D1', icon: '⚡', is_active: true, is_popular: true },
    { id: 5, name: 'Животные', slug: 'animals', description: 'Слоты с животными', color: '#96CEB4', icon: '🦁', is_active: true, is_popular: false }
  ];

  const { error } = await supabase
    .from('themes')
    .insert(themes);

  if (error) {
    console.error('❌ Ошибка при восстановлении themes:', error);
    throw error;
  }

  console.log(`✅ Восстановлено ${themes.length} themes`);
}

async function restoreSlotCategories() {
  console.log('📂 Восстанавливаю slot_categories...');

  const categories = [
    { id: 1, name: 'Видео слоты', slug: 'video-slots', description: 'Современные видео слоты с множеством функций', is_active: true, sort_order: 1 },
    { id: 2, name: 'Классические слоты', slug: 'classic-slots', description: 'Традиционные слоты с простым геймплеем', is_active: true, sort_order: 2 },
    { id: 3, name: 'Джекпот слоты', slug: 'jackpot-slots', description: 'Слоты с прогрессивными джекпотами', is_active: true, sort_order: 3 },
    { id: 4, name: 'Мегавейс', slug: 'megaways', description: 'Слоты с механикой Megaways', is_active: true, sort_order: 4 }
  ];

  const { error } = await supabase
    .from('slot_categories')
    .insert(categories);

  if (error) {
    console.error('❌ Ошибка при восстановлении slot_categories:', error);
    throw error;
  }

  console.log(`✅ Восстановлено ${categories.length} slot_categories`);
}

async function restoreSlots() {
  console.log('🎰 Восстанавливаю slots...');

  // Пример слотов из backup
  const slots = [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Gates of Olympus',
      slug: 'gates-of-olympus',
      provider_id: 'b5abcf1c-c031-4f08-a9d8-df2eb462d82a', // 4ThePlayer
      theme_id: 4, // Мифология
      category_id: 1, // Видео слоты
      description: 'Эпический слот с богами Олимпа',
      rtp: 96.50,
      volatility: 'HIGH',
      min_bet: 0.20,
      max_bet: 125.00,
      max_win: 5000,
      reels: 6,
      rows: 5,
      paylines: 20,
      is_active: true,
      is_featured: true,
      is_new: false,
      release_date: '2021-02-13'
    }
  ];

  const { error } = await supabase
    .from('slots')
    .insert(slots);

  if (error) {
    console.error('❌ Ошибка при восстановлении slots:', error);
    throw error;
  }

  console.log(`✅ Восстановлено ${slots.length} slots`);
}

async function restoreSlotMechanics() {
  console.log('🔗 Восстанавливаю slot_mechanics...');

  // Связываем Gates of Olympus с механиками
  const slotMechanics = [
    { slot_id: '550e8400-e29b-41d4-a716-446655440000', mechanic_id: 1 }, // Wild Symbols
    { slot_id: '550e8400-e29b-41d4-a716-446655440000', mechanic_id: 3 }, // Free Spins
    { slot_id: '550e8400-e29b-41d4-a716-446655440000', mechanic_id: 4 }  // Multipliers
  ];

  const { error } = await supabase
    .from('slot_mechanics')
    .insert(slotMechanics);

  if (error) {
    console.error('❌ Ошибка при восстановлении slot_mechanics:', error);
    throw error;
  }

  console.log(`✅ Восстановлено ${slotMechanics.length} slot_mechanics связей`);
}

// Запускаем восстановление
restoreBackupV004().catch(console.error);