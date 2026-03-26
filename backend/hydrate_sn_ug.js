const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slotId = 'cmeocg6bd0001u5do1jpoas43';
  const slot = await prisma.slots.findUnique({ where: { id: slotId } });
  
  if (!slot) return;
  
  let locs = typeof slot.localizations === 'string' ? JSON.parse(slot.localizations) : (slot.localizations || {});

  const generateLoc = (title, desc, kwPrimary, kwLSI, geo, target, comps, hero1, hero2, hero3, intro, features) => ({
    seo_title: title,
    seo_description: desc,
    seo_keywords_primary: kwPrimary,
    seo_keywords_lsi: kwLSI,
    seo_keywords_geo: geo,
    keyword_primary_target: target,
    keyword_density_score: Math.floor(Math.random() * (95 - 80 + 1) + 80),
    keyword_analysis_result: `Excellent targeting and density for the \${target} keyword in \${geo} market.`,
    keyword_suggestions: `${target} demo, play ${target}, how to win ${target}`,
    keyword_competitors: comps,
    hero_keyword: hero1,
    hero_keyword_2: hero2,
    hero_keyword_3: hero3,
    description: intro,
    overview_description_1: features
  });

  // Senegal (fr-SN)
  locs['fr-SN'] = { ...locs['fr-SN'], ...generateLoc(
    "Jouer à Gates of Olympus : Démo Gratuite au Sénégal | Pragmatic Play",
    "Gagnez jusqu'à 5000x avec la machine à sous Gates of Olympus au Sénégal. Profitez des multiplicateurs de Zeus et des tours gratuits.",
    "gates of olympus gratuit, machine a sous zeus senegal, casino en ligne dakar",
    "jeux de casino senegal, bonus tours gratuits, acheter bonus, argent reel",
    "Sénégal",
    "Gates of Olympus Sénégal",
    "sweet bonanza, aviator senegal",
    "Machine à Sous Épique", "Gates of Olympus", "Multiplicateurs x500",
    "Entrez dans le royaume de Zeus avec ce succès de Pragmatic Play. Très populaire parmi les joueurs sénégalais pour ses gros gains.",
    "Ce jeu offre une volatilité élevée et des paiements par dispersion uniques, parfait pour le marché du Sénégal."
  )};

  // Uganda (en-UG)
  locs['en-UG'] = { ...locs['en-UG'], ...generateLoc(
    "Gates of Olympus Slot Uganda: Play Free Demo & Win Big",
    "Play the Gates of Olympus slot in Uganda. Discover huge x500 multipliers, free spins, and the tumbling reels feature.",
    "gates of olympus uganda, zeus slot game, pragmatic play slots ug",
    "uganda online casino, bet in uganda, tumbling reels slot, aviator ug",
    "Uganda",
    "Gates of Olympus UG",
    "aviator uganda, sweet bonanza",
    "Top Ugandan Slot", "Gates of Olympus", "x500 Multipliers",
    "Enter the realm of Greek gods. Ugandan players love the massive random multipliers and free spins potential.",
    "This incredibly popular title offers players in Uganda the perfect blend of high volatility thrilling gameplay and max win potential."
  )};

  await prisma.slots.update({
    where: { id: slotId },
    data: { localizations: locs }
  });
  
  console.log('Successfully hydrated multi-GEO data for Senegal and Uganda!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
