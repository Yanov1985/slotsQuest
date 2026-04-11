import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const s = await prisma.slots.findUnique({ where: { slug: 'fortune-chests' } });
  if (!s) return console.log('SLOT NOT FOUND');
  if (!s.localizations) return console.log('NO LOCALIZATIONS');
  
  let l = typeof s.localizations === 'string' ? JSON.parse(s.localizations) : s.localizations;
  let eng = l['en'] && l['en'].faq && l['en'].faq.length > 0;
  let ru = l['ru'] && l['ru'].faq && l['ru'].faq.length > 0;
  console.log('SLOT EXISTS => EN Deep SEO:', !!eng, '| RU Deep SEO:', !!ru);
}
run().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
