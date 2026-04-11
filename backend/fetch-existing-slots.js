const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slots = await prisma.slots.findMany({
    select: { id: true, slug: true, name: true, providers: { select: { name: true } } }
  });
  console.log('Total slots:', slots.length);
  
  const formatted = slots.map(s => ({ title: s.name, provider: s.providers?.name || 'Unknown', slug: s.slug }));
  require('fs').writeFileSync('existing-slots.json', JSON.stringify(formatted, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
