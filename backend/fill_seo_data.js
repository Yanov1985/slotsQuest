const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slotId = 'cmeocg6bd0001u5do1jpoas43';
  
  const slot = await prisma.slots.findUnique({ where: { id: slotId } });
  if (!slot) {
    console.log('Slot not found!');
    return;
  }
  
  let locs = {};
  if (slot.localizations && Object.keys(slot.localizations).length > 0) {
    locs = typeof slot.localizations === 'string' ? JSON.parse(slot.localizations) : slot.localizations;
  }
  
  // English (US Market)
  locs['en'] = {
    ...locs['en'],
    seo_title: "Play Gates of Olympus Slot & Demo Free | Pragmatic Play",
    seo_description: "Win up to 5000x in Gates of Olympus by Pragmatic Play. High volatility, tumbling reels, and huge multipliers. Test the demo for free!",
    hero_keyword: "Epic Greek Mythology Slot",
    hero_keyword_2: "Gates of Olympus",
    hero_keyword_3: "x500 Multipliers",
    description: "Enter Zeus's realm with Pragmatic Play's iconic slot. Enjoy cascading reels and massive random multipliers up to x500 in the Free Spins feature.",
    info_pros: JSON.stringify(["Epic x500 Multipliers", "Tumbling Reels", "Buy Bonus Feature Available", "Exceptional graphics and sound"]),
    overview_description_1: "This exciting slot from Pragmatic Play is the perfect combination of innovative mechanics, stunning graphics, and generous wins. Thanks to its unique Scatter Pays system and thrilling bonus features, Gates of Olympus has won the hearts of millions of players in the US and worldwide."
  };

  // Brazil (pt-BR Market) - SEMrush keywords: gates of olympus, gatinho, jogo do velho
  locs['pt-BR'] = {
    ...locs['pt-BR'],
    seo_title: "Gates of Olympus: Jogue o 'Jogo do Velho do Raio' (Pragmatic Play)",
    seo_description: "Descubra como ganhar no Gates of Olympus (o famoso jogo do velho)! Jogue a demonstração gratuita, entenda os multiplicadores de até 5000x.",
    hero_keyword: "Jogo do Velho do Raio",
    hero_keyword_2: "Gates of Olympus",
    hero_keyword_3: "Multiplicadores de Até 5000x",
    description: "Entre no Olimpo com o Zeus da Pragmatic Play. Aproveite as cascatas infinitas e multiplicadores massivos durante os Giros Grátis.",
    info_pros: JSON.stringify(["Multiplicadores épicos de até x500", "Compra de Bônus Disponível", "Altamente Popular no Brasil", "RTP de 96.5%"]),
    overview_description_1: "Este emocionante slot da Pragmatic Play (frequentemente chamado de 'jogo do velho' no Brasil) é a combinação perfeita de mecânicas inovadoras e vitórias generosas. Graças ao seu sistema Pagamento por Scatter (Scatter Pays), conquistou milhões de brasileiros."
  };

  // Turkey (TR Market) - 33k+ volume!
  locs['tr'] = {
    ...locs['tr'],
    seo_title: "Gates of Olympus Oyna | Bedava Slot Demo ve İpuçları (Pragmatic)",
    seo_description: "Pragmatic Play'in en çok kazandıran slot oyunu Gates of Olympus ile tanışın. 5000x çarpan, bedava dönüşler (Free Spins) ve demo modu burada!",
    hero_keyword: "En Çok Kazandıran Slot",
    hero_keyword_2: "Gates of Olympus Oyna",
    hero_keyword_3: "5000x Kazanç Şansı",
    description: "Zeus'un büyüleyici dünyasına adım atın. Pragmatic Play'in efsanevi slot oyununda yüksek kazanç çarpanları sizi bekliyor.",
    info_pros: JSON.stringify(["Türkiye'nin favori slot oyunu", "5000x'e kadar dev kazançlar", "Bedava Demo (Deneme) Modu", "Satın Alınabilir Free Spin"]),
    overview_description_1: "Pragmatic Play'in bu heyecan verici slot oyunu, Türkiye'de 'Dede Oyunu' olarak da bilinir ve muazzam grafikleriyle milyonların kalbini fethetmiştir. Scatter Pays sistemi ve heyecan verici bonuslarıyla eşsizdir."
  };

  // Germany (DE Market)
  locs['de'] = {
    ...locs['de'],
    seo_title: "Gates of Olympus Slot ▶ Kostenlos Spielen & Demo (Pragmatic Play)",
    seo_description: "Spielen Sie Gates of Olympus kostenlos oder um echtes Geld. Sichern Sie sich bis zu 5.000-fache Gewinne im Zeus Slot mit Scatter Pays und Freispielen.",
    hero_keyword: "Griechische Mythologie Slot",
    hero_keyword_2: "Gates of Olympus",
    hero_keyword_3: "x500 Multiplikatoren",
    description: "Betreten Sie das Reich des Zeus mit dem legendären Slot von Pragmatic Play. Genießen Sie fallende Walzen und riesige Zufallsmultiplikatoren.",
    info_pros: JSON.stringify(["Zufällige x500 Multiplikatoren", "Spannendes Tumble-Feature", "Demoversion verfügbar", "Perfekt für Mobilgeräte"]),
    overview_description_1: "Dieser aufregende Slot von Pragmatic Play bietet die perfekte Kombination aus innovativer Mechanik, atemberaubender Grafik und großzügigen Gewinnen. Besonders in Deutschland sehr beliebt!"
  };

  // Spain (ES Market)
  locs['es'] = {
    ...locs['es'],
    seo_title: "Jugar Gates of Olympus: Demo Gratis y Trucos (Pragmatic Play)",
    seo_description: "Gana hasta 5000x en Gates of Olympus. Descubre los mejores trucos, juega la demo gratis y aprovecha los giros gratis de este famoso tragamonedas.",
    hero_keyword: "Tragamonedas Épico de Zeus",
    hero_keyword_2: "Gates of Olympus",
    hero_keyword_3: "Multiplicadores Mágicos",
    description: "Explora el Olimpo con Pragmatic Play. Disfruta de la función Tumble y alcanza multiplicadores locos de hasta x500.",
    info_pros: JSON.stringify(["Multiplicadores de x500", "Giros Gratis", "Sistema Scatter Pays", "Alta Volatilidad"]),
    overview_description_1: "Esta emocionante tragamonedas de Pragmatic Play es la combinación perfecta de mecánica innovadora y premios generosos. Ha cautivado a jugadores en España y en toda Latinoamérica."
  };

  await prisma.slots.update({
    where: { id: slotId },
    data: { localizations: locs }
  });
  
  console.log('Successfully hydrated multi-GEO data for slot!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
