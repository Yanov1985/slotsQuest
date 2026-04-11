import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Find or create Popular category
  let category = await prisma.slot_categories.findUnique({ where: { slug: 'popular' } });
  if (!category) {
    category = await prisma.slot_categories.create({
      data: {
        id: 'cat_popular_' + Date.now(),
        name: 'Popular',
        slug: 'popular',
        is_active: true
      }
    });
    console.log('Created category: Popular');
  } else {
    console.log('Category Popular already exists');
  }

  // Find the popular mechanic
  const popularMechanic = await prisma.mechanics.findUnique({ where: { slug: 'popular' } });
  if (!popularMechanic) {
    console.log('Popular mechanic not found. Cannot find the imported 136 slots via mechanic.');
    return;
  }

  // Get all slots with this mechanic
  const links = await prisma.slot_mechanics.findMany({
    where: { mechanic_id: popularMechanic.id }
  });

  const slotIds = links.map(l => l.slot_id);
  
  if (slotIds.length === 0) {
    console.log('No slots found with the popular mechanic.');
    return;
  }

  console.log(`Found ${slotIds.length} slots with popular mechanic tag. Updating their category_id...`);

  const res = await prisma.slots.updateMany({
    where: { id: { in: slotIds } },
    data: { category_id: category.id }
  });

  console.log(`Updated ${res.count} slots successfully to category "Popular".`);
}

main().catch(console.error).finally(()=>prisma.$disconnect());
