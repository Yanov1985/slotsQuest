import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const slots = await prisma.slots.findMany({
    select: { name: true, localizations: true }
  });
  
  let corrupted = 0;
  for (const s of slots) {
    if (!s.localizations) continue;
    const l = typeof s.localizations === 'string' ? JSON.parse(s.localizations) : s.localizations;
    if (l['en'] && l['en'].faq && l['en'].faq.length > 0) {
      if (typeof l['en'].faq[0].answer === 'string' &&
          (l['en'].faq[0].answer.includes('oyun') || l['en'].faq[0].answer.includes('bu') || l['en'].faq[0].answer.includes('evet') || l['en'].faq[0].answer.includes('hayır'))) {
        
        console.log('--- Corrupted Slot:', s.name);
        corrupted++;
      }
    }
  }
  console.log(`Total corrupted: ${corrupted}`);
}
check().catch(console.error).finally(() => prisma.$disconnect());
