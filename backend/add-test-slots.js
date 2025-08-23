const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Тестовые слоты с минимальными данными
const testSlots = [
  {
    name: 'Rich Wilde and the Book of Dead',
    slug: 'rich-wilde-book-of-dead',
    description: 'Приключенческий слот с египетской тематикой',
    rtp: 96.21,
    volatility: 'high',
    min_bet: 0.10,
    max_bet: 100.00,
    max_win: 5000.00,
    reels: 5,
    rows: 3,
    theme: 'Египет',
    features: ['Free Spins', 'Expanding Symbols'],
    is_mobile_compatible: true,
    is_demo_available: true
  },
  {
    name: 'Gonzo\'s Quest',
    slug: 'gonzos-quest',
    description: 'Популярный слот с каскадными барабанами',
    rtp: 95.97,
    volatility: 'medium',
    min_bet: 0.20,
    max_bet: 50.00,
    max_win: 2500.00,
    reels: 5,
    rows: 3,
    theme: 'Приключения',
    features: ['Avalanche', 'Multipliers'],
    is_mobile_compatible: true,
    is_demo_available: true
  },
  {
    name: 'Immortal Romance',
    slug: 'immortal-romance',
    description: 'Вампирский слот с множеством бонусов',
    rtp: 96.86,
    volatility: 'medium',
    min_bet: 0.30,
    max_bet: 60.00,
    max_win: 3600.00,
    reels: 5,
    rows: 3,
    theme: 'Вампиры',
    features: ['Free Spins', 'Wild Transform'],
    is_mobile_compatible: true,
    is_demo_available: true
  },
  {
    name: 'The Dog House',
    slug: 'the-dog-house',
    description: 'Веселый слот с собачьей тематикой',
    rtp: 96.51,
    volatility: 'high',
    min_bet: 0.20,
    max_bet: 125.00,
    max_win: 6750.00,
    reels: 5,
    rows: 3,
    theme: 'Животные',
    features: ['Free Spins', 'Sticky Wilds'],
    is_mobile_compatible: true,
    is_demo_available: true
  },
  {
    name: 'Book of Ra Deluxe',
    slug: 'book-of-ra-deluxe',
    description: 'Классический египетский слот',
    rtp: 95.10,
    volatility: 'high',
    min_bet: 0.04,
    max_bet: 90.00,
    max_win: 5000.00,
    reels: 5,
    rows: 3,
    theme: 'Египет',
    features: ['Free Spins', 'Expanding Symbols'],
    is_mobile_compatible: true,
    is_demo_available: true
  }
];

async function addTestSlots() {
  try {
    console.log('🚀 Начинаю добавление тестовых слотов...');
    
    // Получаем первого доступного провайдера для использования в качестве заглушки
    const firstProvider = await prisma.providers.findFirst({
      where: { is_active: true }
    });
    
    if (!firstProvider) {
      console.log('❌ Не найдено ни одного активного провайдера. Создаю тестового провайдера...');
      
      // Создаем тестового провайдера
      const testProvider = await prisma.providers.create({
        data: {
          name: 'Test Provider',
          slug: 'test-provider',
          description: 'Тестовый провайдер для слотов',
          is_active: true
        }
      });
      
      console.log(`✅ Создан тестовый провайдер: ${testProvider.name}`);
      
      // Используем созданного провайдера
      var providerId = testProvider.id;
    } else {
      console.log(`📋 Использую существующего провайдера: ${firstProvider.name}`);
      var providerId = firstProvider.id;
    }
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const slotData of testSlots) {
      try {
        // Проверяем, существует ли слот с таким slug
        const existingSlot = await prisma.slots.findUnique({
          where: { slug: slotData.slug }
        });
        
        if (existingSlot) {
          console.log(`⚠️  Слот \"${slotData.name}\" уже существует, пропускаю...`);
          skippedCount++;
          continue;
        }
        
        // Добавляем слот с минимальными обязательными данными
        const newSlot = await prisma.slots.create({
          data: {
            ...slotData,
            provider_id: providerId,
            // Остальные поля остаются null или используют значения по умолчанию
          }
        });
        
        console.log(`✅ Добавлен слот: ${newSlot.name}`);
        addedCount++;
        
      } catch (error) {
        console.error(`❌ Ошибка при добавлении слота \"${slotData.name}\":`, error.message);
        skippedCount++;
      }
    }
    
    console.log('\n📊 Результат:');
    console.log(`   Добавлено: ${addedCount} слотов`);
    console.log(`   Пропущено: ${skippedCount} слотов`);
    console.log('\n🎉 Готово!');
    
  } catch (error) {
    console.error('❌ Общая ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestSlots();