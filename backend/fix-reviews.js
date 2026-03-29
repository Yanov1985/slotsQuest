const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slot = await prisma.slots.findUnique({
    where: { slug: 'gates-of-olympus' }
  });
  
  if (!slot) return;

  // 1. Fix English version
  const oldEnReview = slot.info_reviews;
  let newEnReview = null;
  if (oldEnReview && !oldEnReview.startsWith('[')) {
    newEnReview = JSON.stringify([{
      author: "SlotQuest Team",
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      text: oldEnReview.replace(/^"|"$/g, '')
    }]);
  }

  // 2. Fix Localizations
  let locs = {};
  if (slot.localizations) {
    if (typeof slot.localizations === 'string') {
      try { locs = JSON.parse(slot.localizations); } catch(e){}
    } else {
      locs = slot.localizations;
    }
  }

  // Define authors for realistic reviews
  const reviewMeta = {
    'pt-BR': { author: 'Jogador BR', rating: 5 },
    'tr': { author: 'TR Oyuncu', rating: 5 },
    'de': { author: 'DE Spieler', rating: 5 },
    'en-IN': { author: 'IN Player', rating: 5 },
    'ru': { author: 'Игрок RU', rating: 5 }
  };

  for (const [lang, data] of Object.entries(locs)) {
    if (data.info_reviews && !data.info_reviews.startsWith('[')) {
      const pureText = data.info_reviews.replace(/^"|"$/g, '');
      const meta = reviewMeta[lang] || { author: 'User', rating: 5 };
      locs[lang].info_reviews = JSON.stringify([{
        author: meta.author,
        rating: meta.rating,
        date: new Date().toISOString().split('T')[0],
        text: pureText
      }]);
    }
  }

  const updateData = { localizations: JSON.stringify(locs) };
  if (newEnReview) {
    updateData.info_reviews = newEnReview;
  }

  await prisma.slots.update({
    where: { slug: 'gates-of-olympus' },
    data: updateData
  });

  console.log("Successfully fixed info_reviews arrays in the database!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
