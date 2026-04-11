import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deepCheck() {
  try {
    const slots = await prisma.slots.findMany({
      select: { id: true, name: true, localizations: true }
    });
    
    let fullyDone = 0;
    let missingOrPartial = 0;
    let notDone = 0;
    
    let sampleMissing = [];

    slots.forEach(s => {
      if (!s.localizations) {
        notDone++;
      } else {
        // localizations should be an object with keys like "1", "2", "3" parsing from string if needed
        const locs = typeof s.localizations === 'string' ? JSON.parse(s.localizations) : s.localizations;
        const keys = Object.keys(locs);
        
        // As long as we have some keys, let's consider it processed, but let's check how many
        if (keys.length > 0) {
          fullyDone++;
        } else {
          missingOrPartial++;
          if (sampleMissing.length < 5) sampleMissing.push(s.name);
        }
      }
    });

    console.log(`\n============================`);
    console.log(`🔍 DEEP LOCALIZATION CHECK`);
    console.log(`============================`);
    console.log(`Total slots: ${slots.length}`);
    console.log(`Successfully Localized (has data): ${fullyDone}`);
    console.log(`Empty JSON object: ${missingOrPartial}`);
    console.log(`Null localizations: ${notDone}`);
    
    if (sampleMissing.length > 0) {
      console.log(`\nSample of slots with empty JSON:`);
      sampleMissing.forEach(n => console.log(`- ${n}`));
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deepCheck();
