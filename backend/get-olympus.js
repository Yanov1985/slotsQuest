const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slot = await prisma.slot.findUnique({
    where: { slug: 'gates-of-olympus' }
  });
  if (slot) {
    console.log(JSON.stringify(slot, null, 2));
  } else {
    console.log("Not found in dev.db");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
