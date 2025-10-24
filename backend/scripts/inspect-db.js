const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔎 Inspecting database contents...');
  const tables = [
    'slots',
    'providers',
    'slot_categories',
    'mechanics',
    'slot_mechanics',
    'bonuses',
    'slot_bonuses',
    'themes'
  ];

  for (const table of tables) {
    try {
      const count = await prisma[table].count();
      console.log(`📊 ${table}: count=${count}`);
    } catch (e) {
      console.log(`⚠️ Could not count ${table}:`, e.message);
    }
  }

  try {
    const slots = await prisma.slots.findMany({
      take: 3,
      include: {
        providers: true,
        slot_categories: true,
        slot_mechanics: { include: { mechanics: true } },
        slot_bonuses: { include: { bonuses: true } },
        themes: true,
      },
      orderBy: { created_at: 'desc' }
    });
    console.log('🧩 Sample slots (up to 3):');
    for (const s of slots) {
      console.log({
        id: s.id,
        name: s.name,
        slug: s.slug,
        is_active: s.is_active,
        providers: s.providers?.name,
        category: s.slot_categories?.name,
        mechanics_multipliers_important_title: s.mechanics_multipliers_important_title,
      });
    }
  } catch (e) {
    console.log('❌ Error fetching sample slots:', e.message);
  }

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});