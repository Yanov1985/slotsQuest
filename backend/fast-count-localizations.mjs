import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const all = await prisma.slots.findMany();
  let count = 0;
  let broken = 0;
  for (let s of all) {
      const locStr = s.localizations;
      if (!locStr || locStr === 'null') continue;
      try {
          const locObj = typeof locStr === 'string' ? JSON.parse(locStr) : locStr;
          if (locObj['en'] && locObj['en'].faq && locObj['en'].faq.length > 0) count++;
      } catch(e) {
          broken++;
      }
  }
  console.log(`Total deep SEO slots: ${count} / ${all.length}`);
  console.log(`Total broken JSON: ${broken}`);
}
run().catch(console.error).finally(()=>prisma.$disconnect());
