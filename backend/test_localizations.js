const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slot = await prisma.slots.findUnique({
    where: { slug: 'gates-of-olympus' },
    select: { localizations: true }
  });
  console.log("=== RAW DB LOCALIZATIONS ===");
  if (!slot) {
      console.log("Slot not found");
  } else if (!slot.localizations) {
      console.log("localizations is NULL or EMPTY");
  } else {
      const locs = typeof slot.localizations === 'string' ? JSON.parse(slot.localizations) : slot.localizations;
      console.log(JSON.stringify(locs, null, 2));
      const ptBr = locs.find(l => l.code === 'pt-BR');
      console.log("--- pt-BR object ---");
      console.log(JSON.stringify(ptBr, null, 2));
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
