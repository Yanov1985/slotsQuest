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
  if (locs['en']) {
    locs['en'] = {
      ...locs['en'],
      seo_keywords_primary: "Gates of Olympus slot, play Gates of Olympus, slots Pragmatic Play",
      seo_keywords_lsi: "Zeus slot game, tumble feature, buy bonus Pragmatic, 5000x max win",
      seo_keywords_geo: "US, UK, Canada, Australia",
      keyword_primary_target: "Gates of Olympus",
      keyword_density_score: 85,
      keyword_analysis_result: "Good keyword optimization for US market. High search intent for demo play.",
      keyword_suggestions: "Gates of Olympus demo, how to win gates of olympus, pragmatic play free slots",
      keyword_competitors: "sweet bonanza, starlight princess"
    };
  }

  // Brazil (pt-BR Market)
  if (locs['pt-BR']) {
    locs['pt-BR'] = {
      ...locs['pt-BR'],
      seo_keywords_primary: "Gates of Olympus, jogo do velho, gates of olympus demo",
      seo_keywords_lsi: "pragmatic play cassino, jogo do raio, slots que pagam, comprar bonus",
      seo_keywords_geo: "Brasil",
      keyword_primary_target: "Jogo do Velho",
      keyword_density_score: 92,
      keyword_analysis_result: "Excellent localization. 'Jogo do velho' is a massive search term in BR.",
      keyword_suggestions: "gates of olympus demo grátis, como ganhar no gates of olympus, melhor horario para jogar gates of olympus",
      keyword_competitors: "fortune tiger, fortune rabbit, sweet bonanza"
    };
  }

  // Turkey (TR Market)
  if (locs['tr']) {
    locs['tr'] = {
      ...locs['tr'],
      seo_keywords_primary: "Gates of Olympus oyna, dede oyunu, gates of olympus demo",
      seo_keywords_lsi: "pragmatic slot, bedava dönüş, max win, dede slot",
      seo_keywords_geo: "Türkiye",
      keyword_primary_target: "Gates of Olympus Oyna",
      keyword_density_score: 88,
      keyword_analysis_result: "33k+ volume for 'oyna'. 'Dede oyunu' is also strongly targeted.",
      keyword_suggestions: "gates of olympus taktik, dede oyunu oyna, pragmatic demo tr",
      keyword_competitors: "sweet bonanza tr, fruit party tr"
    };
  }

  // Germany (DE Market)
  if (locs['de']) {
    locs['de'] = {
      ...locs['de'],
      seo_keywords_primary: "Gates of Olympus kostenlos, zeus slot",
      seo_keywords_lsi: "pragmatic play de, freispiele kaufen, casino spiele",
      seo_keywords_geo: "Deutschland, Österreich",
      keyword_primary_target: "Gates of Olympus kostenlos",
      keyword_density_score: 80,
      keyword_analysis_result: "Solid optimization for German players seeking free play.",
      keyword_suggestions: "gates of olympus echtgeld, gates of olympus trick, pragmatic slots online",
      keyword_competitors: "book of ra, book of dead"
    };
  }

  // Spain (ES Market)
  if (locs['es']) {
    locs['es'] = {
      ...locs['es'],
      seo_keywords_primary: "Gates of Olympus jugar, tragamonedas zeus gratis",
      seo_keywords_lsi: "casino pragmatic play, giros gratis, comprar bono tragamonedas",
      seo_keywords_geo: "España, Colombia, México",
      keyword_primary_target: "Gates of Olympus tragamonedas",
      keyword_density_score: 84,
      keyword_analysis_result: "Hispanic markets correctly targeted with 'tragamonedas' and 'giros gratis'.",
      keyword_suggestions: "gates of olympus demo gratis, trucos gates of olympus",
      keyword_competitors: "sweet bonanza es, wolf gold"
    };
  }

  await prisma.slots.update({
    where: { id: slotId },
    data: { localizations: locs }
  });
  
  console.log('Successfully hydrated Keyword Density Checker data for all GEOs!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
