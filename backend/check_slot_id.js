const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const slot = await prisma.slots.findUnique({ where: { id: 'cmeocg6bd0001u5do1jpoas43' } });
  if (slot) {
    console.log("Slot name:", slot.name);
    console.log("Slot slug:", slot.slug);
  } else {
    console.log("Slot ID not found in database.");
  }
}
check().finally(() => prisma.$disconnect());
