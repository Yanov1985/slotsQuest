import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function check() {
  const page = await prisma.pages.findUnique({ where: { slug: 'home' } });
  let loc = typeof page.localizations === 'string' ? JSON.parse(page.localizations) : (page.localizations || {});
  console.log('Current DB keys (' + Object.keys(loc).length + '):', Object.keys(loc).join(', '));
}
check().finally(() => prisma.$disconnect());
