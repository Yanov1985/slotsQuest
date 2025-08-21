const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.themes.count();
    console.log(`Текущее количество тем в базе данных: ${count}`);
    
    const themes = await prisma.themes.findMany({
      select: {
        id: true,
        name: true,
        slug: true
      },
      take: 10
    });
    
    console.log('\nПервые 10 тем:');
    themes.forEach((theme, index) => {
      console.log(`${index + 1}. ${theme.name} (${theme.slug})`);
    });
    
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();