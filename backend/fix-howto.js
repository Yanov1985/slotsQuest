const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slot = await prisma.slots.findUnique({
    where: { slug: 'gates-of-olympus' }
  });
  
  if (!slot) return;

  function formatHowTo(plainText, lang) {
    if (!plainText) return null;
    if (plainText.trim().startsWith('[')) return plainText; // Already JSON array

    // We will break the paragraph into simple generic steps to match the UI.
    const stepsMeta = {
      'en': ['Set Bet', 'Spin', 'Special Features'],
      'pt-BR': ['Configurar Aposta', 'Girar', 'Recursos Especiais'],
      'tr': ['Bahis Ayarla', 'Çevir', 'Özel Özellikler'],
      'de': ['Einsatz festlegen', 'Drehen', 'Sonderfunktionen'],
      'en-IN': ['Set Bet', 'Spin', 'Special Features'],
      'ru': ['Ставка', 'Вращение', 'Бонусы']
    };

    const keys = stepsMeta[lang] || stepsMeta['en'];
    // We just split the text into roughly 3 sentences (or just put it as one step if short)
    const sentences = plainText.match(/[^.!?]+[.!?]+/g) || [plainText];
    
    const arr = [];
    for(let i=0; i<sentences.length && i<3; i++) {
        arr.push({
            step: keys[i] || `Step ${i+1}`,
            text: sentences[i].trim()
        });
    }
    
    return JSON.stringify(arr);
  }

  // 1. Fix English base fields
  const updateData = {};
  if (slot.info_how_to_play && !slot.info_how_to_play.trim().startsWith('[')) {
    updateData.info_how_to_play = formatHowTo(slot.info_how_to_play, 'en');
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

  for (const lang of Object.keys(locs)) {
    const data = locs[lang];
    if (data.info_how_to_play) {
      locs[lang].info_how_to_play = formatHowTo(data.info_how_to_play, lang);
    }
  }

  updateData.localizations = JSON.stringify(locs);

  await prisma.slots.update({
    where: { slug: 'gates-of-olympus' },
    data: updateData
  });

  console.log("Successfully fixed info_how_to_play arrays in the database!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
