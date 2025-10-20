const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const slot = await prisma.slots.findFirst({
      select: {
        id: true,
        name: true,
        overview_features_title: true,
      },
    });

    console.log('Slot:', slot);
    console.log('Field works!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

check();
