import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function start() {
  console.log('🤖 Fixing hallucinations locally without AI...');
  const slots = await prisma.slots.findMany();
  
  let corrupted = [];
  for (const s of slots) {
    if (!s.localizations) continue;
    const l = typeof s.localizations === 'string' ? JSON.parse(s.localizations) : s.localizations;
    if (l['en'] && l['en'].faq && l['en'].faq.length > 0) {
      if (typeof l['en'].faq[0].answer === 'string' &&
          (l['en'].faq[0].answer.includes('oyun') || l['en'].faq[0].answer.includes('bu') || l['en'].faq[0].answer.includes('evet') || l['en'].faq[0].answer.includes('hayır'))) {
        corrupted.push(s);
      }
    }
  }

  console.log(`Found ${corrupted.length} corrupted slots. Wiping Turkish fields from EN...`);

  let p = 0;
  for (let slot of corrupted) {
    p++;
    let existingRaw = slot.localizations || {};
    let existingJson = typeof existingRaw === 'string' ? JSON.parse(existingRaw) : existingRaw;
    
    // Wipe and replace the messed up locales
    const localesToFix = ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-IE', 'en-NZ', 'en-ZA', 'en-IN', 'en-NG', 'it', 'pl'];
    for (let loc of localesToFix) {
        if (existingJson[loc]) {
             delete existingJson[loc].faq;
             delete existingJson[loc].pros;
             delete existingJson[loc].cons;
             delete existingJson[loc].reviews;
             delete existingJson[loc].how_to_play;
             delete existingJson[loc].expert_verdict;
        }
    }

    await prisma.slots.update({
        where: { id: slot.id },
        data: { localizations: JSON.stringify(existingJson) } 
    });
    
    if (p % 10 === 0) console.log(`   🏆 Fixed ${p}/${corrupted.length}...`);
  }
  console.log('DONE!');
}

start().catch(console.error).finally(() => prisma.$disconnect());
