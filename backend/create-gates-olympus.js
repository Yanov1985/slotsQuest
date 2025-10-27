const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createGatesOfOlympus() {
  console.log('🎰 Создание слота Gates of Olympus...\n');

  try {
    // Сначала найдем провайдера Pragmatic Play
    let provider = await prisma.providers.findFirst({
      where: { name: 'Pragmatic Play' }
    });

    if (!provider) {
      console.log('📝 Создаем провайдера Pragmatic Play...');
      provider = await prisma.providers.create({
        data: {
          name: 'Pragmatic Play',
          slug: 'pragmatic-play',
          logo_url: '/images/providers/pragmatic-play.png',
          description: 'Pragmatic Play - ведущий разработчик игр для онлайн-казино'
        }
      });
    }

    // Создаем слот Gates of Olympus
    const slot = await prisma.slots.create({
      data: {
        name: 'Gates of Olympus',
        slug: 'gates-of-olympus',
        description: 'Погрузитесь в мир древнегреческой мифологии с Gates of Olympus от Pragmatic Play. Этот захватывающий слот с каскадными барабанами и множителями до 500x предлагает невероятные возможности для выигрыша.',
        rtp: 96.5,
        volatility: 'high',
        max_win: 5000,
        min_bet: 0.20,
        max_bet: 125.00,
        paylines: '20',
        reels: 6,
        rows: 5,
        theme: 'mythology',
        release_date: new Date('2021-02-13'),
        provider_id: provider.id,
        
        // Hero Keywords для SEO
        hero_keyword: 'Premium Slot Review',
        hero_keyword_2: 'Gates of Olympus',
        hero_keyword_3: 'Gates of Olympus 1000',
        
        // Free Spins данные
        free_spins_title: 'Бесплатные спины Gates of Olympus',
        free_spins_intro: 'Активируйте режим бесплатных спинов и получите шанс на огромные выигрыши с множителями от Зевса!',
        free_spins_instant_title: 'Мгновенные бесплатные спины',
        free_spins_4_scatter: '4 символа Зевса = 15 бесплатных спинов',
        free_spins_5_scatter: '5 символов Зевса = 20 бесплатных спинов',
        free_spins_6_scatter: '6 символов Зевса = 25 бесплатных спинов',
        free_spins_features_title: 'Особенности бесплатных спинов',
        free_spins_feature_1: 'Каскадные выигрыши с увеличивающимися множителями',
        free_spins_feature_2: 'Множители до 500x в одном спине',
        free_spins_feature_3: 'Возможность повторной активации бонуса',
        free_spins_feature_4: 'Дополнительные символы Зевса на барабанах',
        
        // Ante Bet данные
        ante_bet_title: 'Ante Bet - удвойте шансы',
        ante_bet_description: 'Увеличьте ставку на 25% и удвойте шансы на активацию бесплатных спинов',
        ante_bet_warning: 'Ante Bet увеличивает ставку, но значительно повышает частоту бонусов',
        
        // Дополнительные поля
        is_active: true,
        demo_url: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20olympgate&websiteUrl=https%3A%2F%2Fwww.pragmaticplay.com',
        image_url: '/images/slots/gates-of-olympus.jpg',
        thumbnail_url: '/images/slots/gates-of-olympus-thumb.jpg'
      }
    });

    console.log('✅ Слот Gates of Olympus успешно создан!');
    console.log('\n📋 Данные слота:');
    console.log('ID:', slot.id);
    console.log('Название:', slot.name);
    console.log('Slug:', slot.slug);
    console.log('Провайдер:', provider.name);
    console.log('\n🎯 Free Spins данные:');
    console.log('Заголовок:', slot.free_spins_title);
    console.log('Описание:', slot.free_spins_intro);
    console.log('\n💰 Ante Bet данные:');
    console.log('Заголовок:', slot.ante_bet_title);
    console.log('Описание:', slot.ante_bet_description);

  } catch (error) {
    console.error('❌ Ошибка при создании слота:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createGatesOfOlympus();