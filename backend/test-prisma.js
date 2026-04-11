const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

async function main() {
  console.log('Connecting...');
  const slots = await prisma.slots.findMany({ take: 1 });
  console.log('Found slots:', slots.length);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
