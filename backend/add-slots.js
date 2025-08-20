const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addSlots() {
  try {
    // Получаем провайдеров
    const netent = await prisma.providers.findUnique({ where: { slug: 'netent' } });
    const microgaming = await prisma.providers.findUnique({ where: { slug: 'microgaming' } });
    const pragmaticPlay = await prisma.providers.findUnique({ where: { slug: 'pragmatic-play' } });
    const playNGo = await prisma.providers.findUnique({ where: { slug: 'play-n-go' } });

    // Получаем категории
    const videoSlots = await prisma.slot_categories.findUnique({ where: { slug: 'video-slots' } });
    const jackpotSlots = await prisma.slot_categories.findUnique({ where: { slug: 'jackpot-slots' } });

    console.log('Провайдеры:', { netent: !!netent, microgaming: !!microgaming, pragmaticPlay: !!pragmaticPlay, playNGo: !!playNGo });
    console.log('Категории:', { videoSlots: !!videoSlots, jackpotSlots: !!jackpotSlots });

    if (!netent || !videoSlots) {
      console.error('Не найдены необходимые провайдеры или категории');
      return;
    }

    // Добавляем слоты
    const slots = [
      {
        name: 'Starburst',
        slug: 'starburst',
        provider_id: netent.id,
        category_id: videoSlots.id,
        description: 'Classic NetEnt slot with expanding wilds and re-spins',
        thumbnail_url: 'https://picsum.photos/300/200?random=1',
        rtp: 96.09,
        volatility: 'low',
        min_bet: 0.10,
        max_bet: 100.00,
        max_win: 50000.00,
        reels: 5,
        rows: 3,
        theme: 'Space',
        release_date: new Date('2012-01-01'),
        rating: 8.5,
        play_count: 25000
      },
      {
        name: 'Mega Moolah',
        slug: 'mega-moolah',
        provider_id: microgaming?.id,
        category_id: jackpotSlots?.id,
        description: 'Famous progressive jackpot slot with life-changing wins',
        thumbnail_url: 'https://picsum.photos/300/200?random=2',
        rtp: 88.12,
        volatility: 'medium',
        min_bet: 0.25,
        max_bet: 6.25,
        max_win: 1000000.00,
        reels: 5,
        rows: 3,
        theme: 'Safari',
        release_date: new Date('2006-01-01'),
        rating: 8.8,
        play_count: 32000
      },
      {
        name: 'Sweet Bonanza',
        slug: 'sweet-bonanza',
        provider_id: pragmaticPlay?.id,
        category_id: videoSlots.id,
        description: 'Candy-themed slot with tumble feature and multipliers',
        thumbnail_url: 'https://picsum.photos/300/200?random=3',
        rtp: 96.51,
        volatility: 'high',
        min_bet: 0.20,
        max_bet: 125.00,
        max_win: 21100.00,
        reels: 6,
        rows: 5,
        theme: 'Candy',
        release_date: new Date('2019-01-01'),
        rating: 8.6,
        play_count: 16800
      }
    ];

    for (const slot of slots) {
      if (slot.provider_id && slot.category_id) {
        try {
          const result = await prisma.slots.upsert({
            where: { slug: slot.slug },
            update: slot,
            create: slot
          });
          console.log(`Добавлен слот: ${result.name}`);
        } catch (error) {
          console.error(`Ошибка при добавлении слота ${slot.name}:`, error.message);
        }
      } else {
        console.log(`Пропущен слот ${slot.name} - отсутствуют провайдер или категория`);
      }
    }

    console.log('Готово!');
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addSlots();