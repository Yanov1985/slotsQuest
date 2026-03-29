const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slot = await prisma.slots.findUnique({
    where: { slug: 'gates-of-olympus' }
  });
  
  if (!slot) {
    console.log("Slot 'gates-of-olympus' not found.");
    return;
  }

  console.log("Current English Description:", slot.description ? slot.description.substring(0, 50) + "..." : "null");
  
  // Parse existing localizations
  let locs = {};
  if (slot.localizations) {
    if (typeof slot.localizations === 'string') {
      try { locs = JSON.parse(slot.localizations); } catch(e){}
    } else {
      locs = slot.localizations; // already an object
    }
  }

  console.log("Existing locales:", Object.keys(locs));

  // We are going to perform the update now!
  
  // Data definitions based on our seo_content_matrix.md
  
  // 1. English (US/Global) - Update root fields
  const enData = {
    description: "Step into the realm of the gods with the legendary Gates of Olympus. Designed by Pragmatic Play, this highly volatile Gates of Olympus slot offers cascading reels, massive multipliers, and a max win of 5,000x your stake. Whether you want to test the Gates of Olympus free play version or chase real money jackpots, Zeus is waiting. Don't forget to check out the upgraded Gates of Olympus 1000 for even more extreme volatility!",
    info_faq: JSON.stringify([
      {question: "Can I play Gates of Olympus for free?", answer: "Yes! You can enjoy Gates of Olympus free play right here without any registration."},
      {question: "What is the difference between this and Gates of Olympus 1000?", answer: "The Gates of Olympus 1000 version increases the maximum multiplier symbol from 500x to a massive 1,000x for unparalleled win potential!"}
    ]),
    info_how_to_play: "To dominate the Gates of Olympus slot, simply set your bet size and hit spin. Watch for the scatter symbols—landing 4 or more triggers the coveted free spins round where multipliers accumulate permanently.",
    info_reviews: '"The ultimate Gates of Olympus experience. The tumble feature combined with accumulating multipliers makes every bonus round incredibly thrilling. A must-play masterpiece."'
  };

  // 2. Portuguese (Brazil) 
  locs['pt-BR'] = locs['pt-BR'] || {};
  locs['pt-BR'].description = "Descubra a fúria de Zeus! Para quem procura gates of olympus jogar com a melhor qualidade, este sucesso absoluto do cassino pragmatic play entrega multiplicadores de até 500x. Você pode testar suas estratégias na versão super scatter demo antes de apostar dinheiro real em slots pagando no pix.";
  locs['pt-BR'].info_faq = JSON.stringify([
    {question: "Onde posso jogar Gates of Olympus?", answer: "Você pode gates of olympus jogar diretamente em nossa plataforma, seja no modo diversão ou valendo dinheiro real."},
    {question: "O jogo paga via Pix?", answer: "Absolutamente! É um dos melhores slots pagando no pix no Brasil hoje, garantindo saques ultra-rápidos."}
  ]);
  locs['pt-BR'].info_how_to_play = "Configure sua aposta e gire os rolos neste clássico do cassino pragmatic play. Para acessar os multiplicadores épicos, você precisará encontrar 4 símbolos scatter. Quer treinar primeiro? Use o nosso super scatter demo!";
  locs['pt-BR'].info_reviews = '"A melhor experiência para quem quer gates of olympus jogar. A versão super scatter demo ajuda muito a entender a mecânica antes de ir para os slots pagando no pix."';

  // 3. Turkish (Turkey)
  locs['tr'] = locs['tr'] || {};
  locs['tr'].description = "Zeus’un krallığına hoş geldiniz! En popüler oyunlardan biri olan ve kazanma potansiyeliyle bilinen bu efsanede hemen gates of olympus oyna. En güvenilir slot siteleri üzerinden sunulan bu oyunda, çarpanlarla dolu bir efsaneyi keşfedin. Doğru slot taktikleri ile muazzam kazançlar elde etme şansını yakalayın!";
  locs['tr'].info_faq = JSON.stringify([
    {question: "Ücretsiz dönüş (Free Spin) nasıl kazanılır?", answer: "Ekranda 4 veya daha fazla scatter sembolü yakaladığınızda anında 15 bedava dönüş kazanırsınız."},
    {question: "Oyunu nerede güvenle oynayabilirim?", answer: "Yalnızca lisanslı ve güvenilir slot siteleri üzerinden gates of olympus oyna."}
  ]);
  locs['tr'].info_how_to_play = "Başlamak için bahis miktarınızı belirleyin. Oyunda temel amacınız aynı sembollerden en az 8 tane bulmaktır. Ustalaşmak için profesyonel slot taktikleri okumayı ve bedava dönüş turuna stratejik girmeyi unutmayın!";
  locs['tr'].info_reviews = '"Kesinlikle efsanevi! Güvenilir slot siteleri nde oynarken en sevdiğim oyun. 15 bedava dönüş turuna girmek ve gates of olympus oyna mak her zaman heyecan verici."';

  // 4. German (Germany)
  locs['de'] = locs['de'] || {};
  locs['de'].description = "Willkommen im Reich der Götter! Erlebe eines der besten Casino Slot Spiele aller Zeiten. Du kannst Gates of Olympus kostenlos testen oder um echtes Geld spielen. Als eines der beliebtesten Spielautomaten online in jedem Online Casino Deutschland, bietet dieses Spiel gigantische Multiplikatoren und endlose Spannung.";
  locs['de'].info_faq = JSON.stringify([
    {question: "Kann ich das Spiel gratis testen?", answer: "Ja, du kannst jederzeit Gates of Olympus kostenlos im Demo-Modus spielen."},
    {question: "Ist es legal in Deutschland?", answer: "Absolut. Dieses Spiel ist in jedem lizenzierten Online Casino Deutschland verfügbar."}
  ]);
  locs['de'].info_how_to_play = "Wie bei den meisten modernen Spielautomaten online, wählst du deinen Einsatz und drückst den Spin-Button. Sammle 4 Scatter-Symbole, um die epischen Freispiele auszulösen. Entdecke, warum es die Top-Wahl für Casino Slot Spiele ist!";
  locs['de'].info_reviews = '"Das ultimative Erlebnis für jeden Fan von Spielautomaten online. Ich liebe es, Gates of Olympus kostenlos zu üben, bevor ich in einem Online Casino Deutschland Echtgeld einsetze."';

  // 5. India (Indian English)
  locs['en-IN'] = locs['en-IN'] || {};
  locs['en-IN'].description = "Experience the ultimate divine adventure! If you want to play gates of olympus india, you are in the right place. Often affectionately called the olimpis slot by local players, this game allows you to win massive multipliers. Perfect for players looking for premium inr slots in a top-rated online casino rupees.";
  locs['en-IN'].info_faq = JSON.stringify([
    {question: "Can I play with Indian Rupees?", answer: "Yes! As a top-tier game in any online casino rupees, you can easily place bets using INR."},
    {question: "Is this the famous Olimpis game?", answer: "Yes, the olimpis slot is simply the local nickname for the legendary Gates of Olympus!"}
  ]);
  locs['en-IN'].info_how_to_play = "To play gates of olympus india like a pro, simply adjust your bet in INR and spin the reels. The goal of all great inr slots is to hit the Free Spins bonus by landing at least 4 scattered Zeus symbols anywhere on the screen.";
  locs['en-IN'].info_reviews = '"Without a doubt, the best of all inr slots. Whenever I want to play gates of olympus india, I look for an online casino rupees that offers lightning-fast payouts."';

  // 6. Russia
  locs['ru'] = locs['ru'] || {};
  locs['ru'].description = "Добро пожаловать в легендарные врата олимпа! Если вы любите топовые прагматик плей слоты, этот хит с каскадной механикой и сумасшедшими множителями от Зевса создан для вас. Вы можете играть без регистрации в демо-режиме, чтобы поймать легендарный занос х5000 и проверить отдачу автомата перед реальной игрой.";
  locs['ru'].info_faq = JSON.stringify([
    {question: "Как получить максимальный выигрыш?", answer: "Чтобы поймать занос х5000, вам нужно дождаться бонусного раунда с фриспинами, где множители (до x500) суммируются!"},
    {question: "Можно ли протестировать игру бесплатно?", answer: "Да, вы можете играть без регистрации и абсолютно бесплатно прямо на этой странице."}
  ]);
  locs['ru'].info_how_to_play = "Лучшие прагматик плей слоты отличаются простотой: выберите ставку и крутите барабаны. Главная цель игры врата олимпа — поймать 4 символа Скаттера (Зевс), чтобы активировать 15 бесплатных вращений.";
  locs['ru'].info_reviews = '"Шикарный аппарат! Врата олимпа — это классика. Я обожаю играть без регистрации, чтобы тренировать стратегии, а когда ловлю занос х5000, эмоции просто зашкаливают!"';

  await prisma.slots.update({
    where: { slug: 'gates-of-olympus' },
    data: {
      ...enData,
      localizations: JSON.stringify(locs)
    }
  });

  console.log("Successfully injected all optimized Multi-GEO data directly into the database!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
