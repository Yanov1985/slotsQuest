const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const slot = await prisma.slots.findUnique({ where: { slug: 'gates-of-olympus' } });
  if (slot) {
    const loc = typeof slot.localizations === 'string' ? JSON.parse(slot.localizations) : slot.localizations;
    console.log("pt-BR primary keywords:", loc['pt-BR']?.seo_keywords_primary);
    console.log("en primary keywords:", loc['en']?.seo_keywords_primary);
  } else {
    console.log("Slot not found");
  }
}
check().finally(() => prisma.$disconnect());
