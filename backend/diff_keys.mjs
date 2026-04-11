import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function diff() {
  const slot = await prisma.slots.findFirst({ where: { slug: 'gates-of-olympus' }});
  const page = await prisma.pages.findUnique({ where: { slug: 'home' }});
  
  const slotKeys = Object.keys(typeof slot.localizations === 'string' ? JSON.parse(slot.localizations) : slot.localizations);
  const pageKeys = Object.keys(typeof page.localizations === 'string' ? JSON.parse(page.localizations) : page.localizations);
  
  const missing = slotKeys.filter(k => !pageKeys.includes(k));
  console.log("Missing keys on Homepage:", missing);
}
diff().finally(() => prisma.$disconnect());
