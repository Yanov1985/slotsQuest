const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const slots = await prisma.slots.findMany({ select: { localizations: true } });
    const localized = slots.filter(s => {
      if (!s.localizations) return false;
      let loc = s.localizations;
      if (typeof loc === 'string') {
        try { loc = JSON.parse(loc); } catch(e) { return false; }
      }
      return loc && Object.keys(loc).length > 0;
    });
    console.log('Total slots:', slots.length);
    console.log('Localized slots (Reviews):', localized.length);
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}
main();
