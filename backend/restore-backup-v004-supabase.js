const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Инициализация Supabase клиента
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Отсутствуют переменные окружения SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Данные для восстановления из backup v004
const mechanicsData = [
  { name: 'Wild Symbols', slug: 'wild-symbols', description: 'Символы, которые заменяют другие символы для создания выигрышных комбинаций' },
  { name: 'Free Spins', slug: 'free-spins', description: 'Бесплатные вращения, активируемые специальными символами' },
  { name: 'Bonus Rounds', slug: 'bonus-rounds', description: 'Дополнительные игровые раунды с особыми правилами' },
  { name: 'Multipliers', slug: 'multipliers', description: 'Множители, увеличивающие размер выигрыша' },
  { name: 'Scatter Symbols', slug: 'scatter-symbols', description: 'Символы, которые активируют бонусные функции независимо от линий выплат' }
];

const providersData = [
  { name: 'NetEnt', slug: 'netent', website: 'https://www.netent.com', description: 'Ведущий разработчик игр для онлайн-казино' },
  { name: 'Microgaming', slug: 'microgaming', website: 'https://www.microgaming.co.uk', description: 'Пионер в области разработки игрового программного обеспечения' },
  { name: 'Play\'n GO', slug: 'playn-go', website: 'https://www.playngo.com', description: 'Инновационный разработчик мобильных казино игр' },
  { name: 'Pragmatic Play', slug: 'pragmatic-play', website: 'https://www.pragmaticplay.com', description: 'Многопрофильный поставщик игр для iGaming индустрии' },
  { name: 'Yggdrasil', slug: 'yggdrasil', website: 'https://yggdrasilgaming.com', description: 'Инновационный разработчик премиальных игровых решений' }
];

const themesData = [
  { name: 'Древний Египет', slug: 'ancient-egypt', description: 'Игры с тематикой древнего Египта, фараонов и пирамид' },
  { name: 'Фэнтези', slug: 'fantasy', description: 'Магические миры с драконами, волшебниками и мифическими существами' },
  { name: 'Приключения', slug: 'adventure', description: 'Захватывающие приключенческие сюжеты и исследования' },
  { name: 'Фрукты', slug: 'fruits', description: 'Классические фруктовые слоты в ретро стиле' },
  { name: 'Животные', slug: 'animals', description: 'Игры с различными животными и природной тематикой' }
];

const slotCategoriesData = [
  { name: 'Классические слоты', slug: 'classic-slots', description: 'Традиционные слоты с простой механикой' },
  { name: 'Видео слоты', slug: 'video-slots', description: 'Современные слоты с продвинутой графикой и анимацией' },
  { name: 'Прогрессивные джекпоты', slug: 'progressive-jackpots', description: 'Слоты с накопительными джекпотами' },
  { name: 'Мегавейс', slug: 'megaways', description: 'Слоты с динамическим количеством способов выиграть' },
  { name: '3D слоты', slug: '3d-slots', description: 'Слоты с трёхмерной графикой и эффектами' }
];

async function restoreBackupV004() {
  try {
    console.log('🧹 Очищаю существующие данные...');
    
    // Очищаем таблицы в правильном порядке (учитывая внешние ключи)
    await supabase.from('slot_mechanics').delete().neq('id', 0);
    await supabase.from('slots').delete().neq('id', 0);
    await supabase.from('slot_categories').delete().neq('id', 0);
    await supabase.from('themes').delete().neq('id', 0);
    await supabase.from('mechanics').delete().neq('id', 0);
    await supabase.from('providers').delete().neq('id', 0);
    
    console.log('✅ Данные очищены');
    
    console.log('📥 Восстанавливаю данные mechanics...');
    const { error: mechanicsError } = await supabase
      .from('mechanics')
      .insert(mechanicsData);
    
    if (mechanicsError) {
      console.error('❌ Ошибка при вставке mechanics:', mechanicsError);
      return;
    }
    console.log('✅ Mechanics восстановлены');
    
    console.log('📥 Восстанавливаю данные providers...');
    const { error: providersError } = await supabase
      .from('providers')
      .insert(providersData);
    
    if (providersError) {
      console.error('❌ Ошибка при вставке providers:', providersError);
      return;
    }
    console.log('✅ Providers восстановлены');
    
    console.log('📥 Восстанавливаю данные themes...');
    const { error: themesError } = await supabase
      .from('themes')
      .insert(themesData);
    
    if (themesError) {
      console.error('❌ Ошибка при вставке themes:', themesError);
      return;
    }
    console.log('✅ Themes восстановлены');
    
    console.log('📥 Восстанавливаю данные slot_categories...');
    const { error: categoriesError } = await supabase
      .from('slot_categories')
      .insert(slotCategoriesData);
    
    if (categoriesError) {
      console.error('❌ Ошибка при вставке slot_categories:', categoriesError);
      return;
    }
    console.log('✅ Slot categories восстановлены');
    
    console.log('🎉 Backup v004 успешно восстановлен!');
    
  } catch (error) {
    console.error('❌ Ошибка при восстановлении backup:', error);
  }
}

// Запуск восстановления
restoreBackupV004();