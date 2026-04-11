const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function check() {
  const slot = await prisma.slots.findFirst({
    where: { name: { contains: 'Turbo Mines' } }
  });
  console.log('Slot "Turbo Mines":', slot ? 'FOUND' : 'NOT FOUND');
  if (slot) {
    console.log('Localizations:', JSON.parse(slot.localizations || '{}')['ru']?.overview ? 'SEO EXISTS' : 'NO SEO');
  }
}
check().catch(e => console.error(e)).finally(() => prisma.$disconnect());
