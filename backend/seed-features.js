const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Необходимо настроить SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY в .env файле');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const testFeatures = [
  {
    name: 'Бесплатные спины',
    slug: 'free-spins',
    description: 'Возможность получить бесплатные вращения барабанов',
    type: 'bonus',
    icon: '🎰',
    color: '#ff6b6b',
    is_popular: true,
    is_featured: true,
    sort_order: 1
  },
  {
    name: 'Множители выигрыша',
    slug: 'win-multipliers',
    description: 'Специальные символы, увеличивающие размер выигрыша',
    type: 'mechanic',
    icon: '✖️',
    color: '#4ecdc4',
    is_popular: true,
    sort_order: 2
  },
  {
    name: 'Дикие символы',
    slug: 'wild-symbols',
    description: 'Символы, которые могут заменить любые другие символы',
    type: 'symbol',
    icon: '🃏',
    color: '#45b7d1',
    is_popular: true,
    is_featured: true,
    sort_order: 3
  },
  {
    name: 'Скаттер символы',
    slug: 'scatter-symbols',
    description: 'Специальные символы, запускающие бонусные функции',
    type: 'symbol',
    icon: '💎',
    color: '#f9ca24',
    is_popular: true,
    sort_order: 4
  },
  {
    name: 'Прогрессивный джекпот',
    slug: 'progressive-jackpot',
    description: 'Джекпот, который растет с каждой ставкой игроков',
    type: 'jackpot',
    icon: '💰',
    color: '#f0932b',
    is_featured: true,
    sort_order: 5
  },
  {
    name: 'Каскадные барабаны',
    slug: 'cascading-reels',
    description: 'Выигрышные символы исчезают, освобождая место для новых',
    type: 'mechanic',
    icon: '⬇️',
    color: '#eb4d4b',
    sort_order: 6
  },
  {
    name: 'Расширяющиеся символы',
    slug: 'expanding-symbols',
    description: 'Символы, которые могут расширяться на весь барабан',
    type: 'symbol',
    icon: '📏',
    color: '#6c5ce7',
    sort_order: 7
  },
  {
    name: 'Мегавейс',
    slug: 'megaways',
    description: 'Динамическая система с изменяющимся количеством способов выиграть',
    type: 'mechanic',
    icon: '🔀',
    color: '#a29bfe',
    is_popular: true,
    sort_order: 8
  },
  {
    name: 'Бонусная игра',
    slug: 'bonus-game',
    description: 'Дополнительный игровой раунд с особыми правилами',
    type: 'bonus',
    icon: '🎮',
    color: '#fd79a8',
    is_popular: true,
    sort_order: 9
  },
  {
    name: 'Покупка бонуса',
    slug: 'bonus-buy',
    description: 'Возможность купить доступ к бонусной функции',
    type: 'feature',
    icon: '💳',
    color: '#00b894',
    sort_order: 10
  }
];

async function seedFeatures() {
  try {
    console.log('🌱 Начинаем заполнение таблицы features тестовыми данными...');

    // Проверяем существующие записи
    const { data: existingFeatures, error: checkError } = await supabase
      .from('features')
      .select('id, name');

    if (checkError) {
      console.error('❌ Ошибка при проверке существующих features:', checkError);
      return;
    }

    console.log(`📊 Найдено существующих features: ${existingFeatures?.length || 0}`);

    // Если уже есть данные, спрашиваем у пользователя
    if (existingFeatures && existingFeatures.length > 0) {
      console.log('⚠️ В таблице features уже есть данные:');
      existingFeatures.forEach(feature => {
        console.log(`  - ${feature.name} (ID: ${feature.id})`);
      });
      console.log('✅ Данные уже есть, заполнение не требуется.');
      return;
    }

    // Добавляем тестовые данные
    const { data, error } = await supabase
      .from('features')
      .insert(testFeatures)
      .select();

    if (error) {
      console.error('❌ Ошибка при добавлении features:', error);
      return;
    }

    console.log('✅ Успешно добавлено features:', data?.length || 0);
    console.log('🎉 Заполнение завершено!');

    // Показываем добавленные записи
    if (data && data.length > 0) {
      console.log('\n📋 Добавленные особенности:');
      data.forEach((feature, index) => {
        console.log(`  ${index + 1}. ${feature.name} (${feature.icon}) - ${feature.description}`);
      });
    }

  } catch (error) {
    console.error('💥 Критическая ошибка:', error);
  }
}

// Запускаем заполнение
seedFeatures().then(() => {
  console.log('\n🏁 Скрипт завершен.');
  process.exit(0);
}).catch(error => {
  console.error('💥 Необработанная ошибка:', error);
  process.exit(1);
});
