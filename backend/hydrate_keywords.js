const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function hydrateKeywords() {
  console.log('Fetching Gates of Olympus...');
  const slot = await prisma.slots.findUnique({
    where: { slug: 'gates-of-olympus' }
  });

  if (!slot) {
    console.error('Gates of Olympus not found in database.');
    return;
  }

  const localizations = typeof slot.localizations === 'string' 
    ? JSON.parse(slot.localizations) 
    : (slot.localizations || {});

  // 🇧🇷 BRAZIL (pt-BR) Keywords - Highly customized to SEMrush intent
  if (!localizations['pt-BR']) localizations['pt-BR'] = {};
  localizations['pt-BR'].seo_keywords_primary = 'gates of olympus, jogar gates of olympus, gates of olympus demo, velho do raio';
  localizations['pt-BR'].seo_keywords_lsi = 'pragmatic play, slot 1000, super scatter, rtp 96.5%, max win 5000x, bônus de compra, giros grátis';
  localizations['pt-BR'].seo_keywords_geo = 'slots no brasil, cassino online brasil, jogar com reais, pix cassino';
  localizations['pt-BR'].seo_keywords_longtail = 'como jogar gates of olympus, melhor horario para jogar gates of olympus, gates of olympus ganhar dinheiro, qual o rtp do gates of olympus';

  // 🇺🇸 GLOBAL / ENGLISH (en) Keywords - Focus on US/Global search volume
  if (!localizations['en']) localizations['en'] = {};
  localizations['en'].seo_keywords_primary = 'gates of olympus, gates of olympus slot, play gates of olympus, gates of olympus demo';
  localizations['en'].seo_keywords_lsi = 'pragmatic play, zeus slot, multiplier symbols, freespin feature, tumble feature, max win 5000x';
  localizations['en'].seo_keywords_geo = 'us online casinos, play slots for real money, sweepstakes casinos us';
  localizations['en'].seo_keywords_longtail = 'how to win on gates of olympus, gates of olympus slot review, gates of olympus rtp and volatility, how to trigger free spins gates of olympus';

  // 🇷🇺 RUSSIA / CIS (ru) Keywords - Highly customized to Yandex/CIS Google
  if (!localizations['ru']) localizations['ru'] = {};
  localizations['ru'].seo_keywords_primary = 'gates of olympus, врата олимпа, gates of olympus демо, играть gates of olympus';
  localizations['ru'].seo_keywords_lsi = 'pragmatic play, слот зевс, купить бонус, заносы, rtp 96.5%, множители x500, фриспины';
  localizations['ru'].seo_keywords_geo = 'онлайн казино рубли, слоты без регистрации, казино крипта';
  localizations['ru'].seo_keywords_longtail = 'как выиграть в gates of olympus, тактика gates of olympus, gates of olympus максимальный выигрыш, поймать х500 зевс';

  console.log('Injecting perfectly formulated SEMrush keywords back into database...');
  await prisma.slots.update({
    where: { id: slot.id },
    data: { localizations } // Store the JSON directly!
  });

  console.log('✅ Success! Keywords perfectly hydrated across EN, pt-BR, and RU locales.');
}

hydrateKeywords()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
