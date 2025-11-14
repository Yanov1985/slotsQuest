const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSlotThemes() {
  try {
    const count = await prisma.slot_themes.count();
    console.log('✅ Связи слот-тематики:', count);

    const allLinks = await prisma.slot_themes.findMany({
      include: {
        slots: { select: { name: true } },
        themes: { select: { name: true } },
      },
    });

    console.log('\n📋 Все связи:');
    allLinks.forEach((link, index) => {
      console.log(`${index + 1}. ${link.slots?.name} -> ${link.themes?.name}`);
    });

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkSlotThemes();
