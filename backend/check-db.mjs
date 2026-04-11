import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const slots = await prisma.slots.findMany({ select: { slug: true, localizations: true }, take: 10 });
  for (let s of slots) {
    if (!s.localizations) {
      console.log(s.slug, '=> No localizations at all');
      continue;
    }
    let l = typeof s.localizations === 'string' ? JSON.parse(s.localizations) : s.localizations;
    let engDeep = l['en'] && l['en'].faq && l['en'].faq.length > 0;
    let rusDeep = l['ru'] && l['ru'].faq && l['ru'].faq.length > 0;
    console.log(s.slug, '=> EN deep SEO:', !!engDeep, '| RU deep SEO:', !!rusDeep);
  }
}
run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
