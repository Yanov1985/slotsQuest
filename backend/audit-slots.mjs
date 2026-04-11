import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  console.log("Analyzing localizations for all slots...");
  const slots = await prisma.slots.findMany({ select: { slug: true, localizations: true } });
  let total = slots.length;
  let hasContent = 0;
  let missingContent = 0;
  
  for (let s of slots) {
    if (!s.localizations) {
      missingContent++;
      continue;
    }
    
    let l = typeof s.localizations === 'string' ? JSON.parse(s.localizations) : s.localizations;
    if (l['en'] && l['en'].faq && l['en'].faq.length > 0) {
      hasContent++;
    } else {
      missingContent++;
    }
  }
  
  const percentage = ((hasContent / total) * 100).toFixed(2);
  console.log(`\n=== PROGRESS REPORT ===`);
  console.log(`Total slots in DB: ${total}`);
  console.log(`Fully generated: ${hasContent}`);
  console.log(`Missing/Incomplete: ${missingContent}`);
  console.log(`Completion rate: ${percentage}%`);
  console.log(`=======================\n`);
}
run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
