import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const slots = await prisma.slots.findMany({
    select: { slot_mechanics: { select: { id: true }}, slotThemes: { select: { id: true }}, slot_bonuses: { select: { id: true }} }
  });

  let valid = 0;
  slots.forEach(s => {
    if (s.slot_mechanics.length > 0 && s.slotThemes.length > 0 && s.slot_bonuses.length > 0) {
      valid++;
    }
  });

  console.log(`\n=== PROGRESS REPORT ===`);
  console.log(`Total slots: ${slots.length}`);
  console.log(`Relations generated (Mechanics/Themes/Bonuses): ${valid}`);
  console.log(`Pending relations: ${slots.length - valid}`);
  console.log(`=======================\n`);
  process.exit(0);
}

check().catch(console.error);
