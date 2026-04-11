const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const allSlots = await prisma.slots.findMany({
    orderBy: { created_at: 'asc' } // Keep the first created slot
  });
  
  const uniqueKeys = new Map();
  const toDelete = [];

  for (const slot of allSlots) {
    const key = `${slot.name.trim().toLowerCase()}-${slot.providerId}`;
    if (uniqueKeys.has(key)) {
      toDelete.push(slot.id);
    } else {
      uniqueKeys.set(key, slot);
    }
  }

  console.log(`Total slots: ${allSlots.length}`);
  console.log(`Found ${toDelete.length} duplicates.`);
  
  if (toDelete.length > 0) {
    // We must ensure slots can be deleted without constraint errors.
    console.log("Deleting duplicates...");
    let deletedCount = 0;
    for (const id of toDelete) {
      try {
        await prisma.slots.delete({ where: { id } });
        deletedCount++;
      } catch (err) {
        console.error(`Failed to delete slot ${id}: ${err.message}`);
      }
    }
    console.log(`Successfully deleted ${deletedCount} duplicated slots.`);
  } else {
    console.log('No duplicates found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
