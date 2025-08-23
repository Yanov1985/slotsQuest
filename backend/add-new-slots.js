const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addNewSlots() {
  try {
    // Получаем провайдеров
    const playNGo = await prisma.providers.findUnique({ where: { slug: 'play-n-go' } });
    const netent = await prisma.providers.findUnique({ where: { slug: 'netent' } });
    const microgaming = await prisma.providers.findUnique({ where: { slug: 'microgaming' } });
    const pragmaticPlay = await prisma.providers.findUnique({ where: { slug: 'pragmatic-play' } });
    const novomatic = await prisma.providers.findUnique({ where: { slug: 'novomatic' } });
    const igt = await prisma.providers.findUnique({ where: { slug: 'igt' } });
    const quickspin = await prisma.providers.findUnique({ where: { slug: 'quickspin' } });
    const yggdrasil = await prisma.providers.findUnique({ where: { slug: 'yggdrasil' } });
    const redTiger = await prisma.providers.findUnique({ where: { slug: 'red-tiger' } });
    const bigTimeGaming = await prisma.providers.findUnique({ where: { slug: 'big-time-gaming' } });

    // Получаем категории
    const videoSlots = await prisma.slot_categories.findUnique({ where: { slug: 'video-slots' } });
    const classicSlots = await prisma.slot_categories.findUnique({ where: { slug: 'classic-slots' } });
    const jackpotSlots = await prisma.slot_categories.findUnique({ where: { slug: 'jackpot-slots' } });

    console.log('Провайдеры найдены:', {
      playNGo: !!playNGo,
      netent: !!netent,
      microgaming: !!microgaming,
      pragmaticPlay: !!pragmaticPlay,
      novomatic: !!novomatic,
      igt: !!igt,
      quickspin: !!quickspin,
      yggdrasil: !!yggdrasil,
      redTiger: !!redTiger,
      bigTimeGaming: !!bigTimeGaming
    });
    console.log('Категории найдены:', { videoSlots: !!videoSlots, classicSlots: !!classicSlots, jackpotSlots: !!jackpotSlots });

    // Добавляем новые слоты
    const newSlots = [
      {
        name: 'Rich Wilde and the Book of Dead',
        slug: 'rich-wilde-book-of-dead',
        provider_id: playNGo?.id,
        category_id: videoSlots?.id,
        description: 'Adventure-themed slot with expanding symbols and free spins',
        thumbnail_url: 'https://picsum.photos/300/200?random=101',
        rtp: 96.21,
        volatility: 'high',
        min_bet: 0.01,
        max_bet: 100.00,
        max_win: 250000.00,
        reels: 5,
        rows: 3,
        theme: 'Adventure',
        release_date: new Date('2016-01-01'),
        rating: 9.2,
        play_count: 45000
      },
      {
        name: 'Gonzo\'s Quest',
        slug: 'gonzos-quest',
        provider_id: netent?.id,
        category_id: videoSlots?.id,
        description: 'Avalanche feature slot with increasing multipliers',
        thumbnail_url: 'https://picsum.photos/300/200?random=102',
        rtp: 95.97,
        volatility: 'medium',
        min_bet: 0.20,
        max_bet: 50.00,
        max_win: 37500.00,
        reels: 5,
        rows: 3,
        theme: 'Adventure',
        release_date: new Date('2010-01-01'),
        rating: 8.9,
        play_count: 38000
      },
      {
        name: 'Immortal Romance',
        slug: 'immortal-romance',
        provider_id: microgaming?.id,
        category_id: videoSlots?.id,
        description: 'Vampire-themed slot with multiple free spin features',
        thumbnail_url: 'https://picsum.photos/300/200?random=103',
        rtp: 96.86,
        volatility: 'medium',
        min_bet: 0.30,
        max_bet: 6.00,
        max_win: 12150.00,
        reels: 5,
        rows: 3,
        theme: 'Horror',
        release_date: new Date('2011-01-01'),
        rating: 8.7,
        play_count: 29000
      },
      {
        name: 'The Dog House',
        slug: 'the-dog-house',
        provider_id: pragmaticPlay?.id,
        category_id: videoSlots?.id,
        description: 'Dog-themed slot with sticky wilds and multipliers',
        thumbnail_url: 'https://picsum.photos/300/200?random=104',
        rtp: 96.51,
        volatility: 'high',
        min_bet: 0.20,
        max_bet: 125.00,
        max_win: 6750.00,
        reels: 5,
        rows: 3,
        theme: 'Animals',
        release_date: new Date('2019-01-01'),
        rating: 8.4,
        play_count: 22000
      },
      {
        name: 'Book of Ra Deluxe',
        slug: 'book-of-ra-deluxe',
        provider_id: novomatic?.id,
        category_id: videoSlots?.id,
        description: 'Egyptian-themed classic with expanding symbols',
        thumbnail_url: 'https://picsum.photos/300/200?random=105',
        rtp: 95.10,
        volatility: 'high',
        min_bet: 0.04,
        max_bet: 5.00,
        max_win: 5000.00,
        reels: 5,
        rows: 3,
        theme: 'Egyptian',
        release_date: new Date('2009-01-01'),
        rating: 8.1,
        play_count: 35000
      },
      {
        name: 'Da Vinci Diamonds',
        slug: 'da-vinci-diamonds',
        provider_id: igt?.id,
        category_id: videoSlots?.id,
        description: 'Art-themed slot with tumbling reels feature',
        thumbnail_url: 'https://picsum.photos/300/200?random=106',
        rtp: 94.93,
        volatility: 'high',
        min_bet: 1.00,
        max_bet: 300.00,
        max_win: 25000.00,
        reels: 5,
        rows: 3,
        theme: 'Art',
        release_date: new Date('2012-01-01'),
        rating: 7.8,
        play_count: 18000
      },
      {
        name: 'Big Bad Wolf',
        slug: 'big-bad-wolf',
        provider_id: quickspin?.id,
        category_id: videoSlots?.id,
        description: 'Fairy tale slot with swooping reels and blowing down houses',
        thumbnail_url: 'https://picsum.photos/300/200?random=107',
        rtp: 97.34,
        volatility: 'medium',
        min_bet: 0.25,
        max_bet: 100.00,
        max_win: 129600.00,
        reels: 5,
        rows: 3,
        theme: 'Fairy Tale',
        release_date: new Date('2013-01-01'),
        rating: 8.6,
        play_count: 21000
      },
      {
        name: 'Vikings Go Berzerk',
        slug: 'vikings-go-berzerk',
        provider_id: yggdrasil?.id,
        category_id: videoSlots?.id,
        description: 'Viking-themed slot with rage collection and free spins',
        thumbnail_url: 'https://picsum.photos/300/200?random=108',
        rtp: 96.10,
        volatility: 'high',
        min_bet: 0.25,
        max_bet: 125.00,
        max_win: 78125.00,
        reels: 5,
        rows: 4,
        theme: 'Viking',
        release_date: new Date('2016-01-01'),
        rating: 8.8,
        play_count: 27000
      },
      {
        name: 'Dragon\'s Luck',
        slug: 'dragons-luck',
        provider_id: redTiger?.id,
        category_id: videoSlots?.id,
        description: 'Asian-themed slot with mega coin feature',
        thumbnail_url: 'https://picsum.photos/300/200?random=109',
        rtp: 96.29,
        volatility: 'medium',
        min_bet: 0.10,
        max_bet: 20.00,
        max_win: 5000.00,
        reels: 5,
        rows: 3,
        theme: 'Asian',
        release_date: new Date('2017-01-01'),
        rating: 8.0,
        play_count: 15000
      },
      {
        name: 'Bonanza',
        slug: 'bonanza',
        provider_id: bigTimeGaming?.id,
        category_id: videoSlots?.id,
        description: 'Mining-themed Megaways slot with cascading reels',
        thumbnail_url: 'https://picsum.photos/300/200?random=110',
        rtp: 96.00,
        volatility: 'high',
        min_bet: 0.20,
        max_bet: 20.00,
        max_win: 12000.00,
        reels: 6,
        rows: 7,
        theme: 'Mining',
        release_date: new Date('2016-01-01'),
        rating: 9.0,
        play_count: 41000
      }
    ];

    let addedCount = 0;
    let skippedCount = 0;

    for (const slot of newSlots) {
      if (slot.provider_id && slot.category_id) {
        try {
          const result = await prisma.slots.upsert({
            where: { slug: slot.slug },
            update: slot,
            create: slot
          });
          console.log(`✅ Добавлен слот: ${result.name}`);
          addedCount++;
        } catch (error) {
          console.error(`❌ Ошибка при добавлении слота ${slot.name}:`, error.message);
        }
      } else {
        console.log(`⚠️  Пропущен слот ${slot.name} - отсутствуют провайдер или категория`);
        skippedCount++;
      }
    }

    console.log(`\n📊 Результат:`);
    console.log(`   Добавлено: ${addedCount} слотов`);
    console.log(`   Пропущено: ${skippedCount} слотов`);
    console.log('\n🎉 Готово!');
  } catch (error) {
    console.error('❌ Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addNewSlots();