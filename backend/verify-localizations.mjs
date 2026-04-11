import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const turkishKeywords = [' hilesi ', ' taktikleri ', ' oyna ', ' bedava ', ' nasil oynanir ', ' avantajlari ', ' dezavantajlari '];

async function checkLocalizations() {
  console.log('🔍 Starting comprehensive localization verification...');
  const slots = await prisma.slots.findMany({
    select: { id: true, name: true, slug: true, localizations: true }
  });

  let totalSlots = slots.length;
  let bleedingDetected = [];
  let duplicationDetected = [];

  for (let slot of slots) {
    if (!slot.localizations) continue;
    const l = typeof slot.localizations === 'string' ? JSON.parse(slot.localizations) : slot.localizations;

    const locales = Object.keys(l);
    if (!locales.includes('en')) continue;

    // 1. Check for Turkish bleeding in non-Turkish locales
    let slotHasBleeding = false;
    for (let loc of locales) {
      if (loc === 'tr') continue; // Turkish is allowed to have Turkish
      const dataStr = JSON.stringify(l[loc]).toLowerCase();
      
      for (let keyword of turkishKeywords) {
        if (dataStr.includes(keyword)) {
          console.log(`🚨 Turkish bleeding in [${slot.name}] under locale [${loc}] - Keyword: "${keyword.trim()}"`);
          slotHasBleeding = true;
        }
      }
    }
    if (slotHasBleeding) {
      bleedingDetected.push(slot.name);
    }
  }

  console.log('\\n📊 Verification Summary:');
  console.log(`Total Slots Scanned: ${totalSlots}`);
  console.log(`Slots with Turkish Bleeding: ${bleedingDetected.length}`);

  if (bleedingDetected.length === 0 && duplicationDetected.length === 0) {
    console.log('✅ All checked slots appear healthy! No cross-language bleeding detected.');
  } else {
    console.log('❌ Issues found. Please manually check the flagged slots.');
  }
}

checkLocalizations().catch(console.error).finally(() => prisma.$disconnect());
