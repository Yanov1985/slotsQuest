import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const slots = await prisma.slots.findMany({ select: { name: true, localizations: true } });
  let localized = [];
  for(let s of slots) {
    if (s.localizations && typeof s.localizations === 'string' && s.localizations.includes('seo_keywords_lsi')) localized.push(s.name);
    else if (s.localizations && typeof s.localizations === 'object' && JSON.stringify(s.localizations).includes('seo_keywords_lsi')) localized.push(s.name);
  }
  console.log(`\nLOCALIZED_SLOTS:\n${localized.join('\n')}\n`);
  process.exit();
}
check();
