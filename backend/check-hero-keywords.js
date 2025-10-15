const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkHeroKeywords() {
  console.log('🔍 Проверка Hero Keywords в базе данных...\n');

  try {
    // Проверяем структуру таблицы через Prisma
    const slot = await prisma.slots.findFirst({
      select: {
        id: true,
        name: true,
        hero_keyword: true,
        hero_keyword_2: true,
        hero_keyword_3: true,
      }
    });

    if (slot) {
      console.log('✅ Поля Hero Keywords существуют в базе данных!');
      console.log('\nПример слота:');
      console.log('- ID:', slot.id);
      console.log('- Название:', slot.name);
      console.log('- hero_keyword:', slot.hero_keyword || '(пусто)');
      console.log('- hero_keyword_2:', slot.hero_keyword_2 || '(пусто)');
      console.log('- hero_keyword_3:', slot.hero_keyword_3 || '(пусто)');
    } else {
      console.log('⚠️  В базе данных нет слотов');
    }

    console.log('\n✅ Проверка завершена успешно!');
    console.log('Prisma Client знает о новых полях.');

  } catch (error) {
    console.error('\n❌ Ошибка при проверке:', error.message);

    if (error.message.includes('hero_keyword_2') || error.message.includes('hero_keyword_3')) {
      console.log('\n⚠️  Prisma Client не обновлён!');
      console.log('Следуйте инструкциям в HERO_KEYWORDS_INSTALLATION.md');
    }
  } finally {
    await prisma.$disconnect();
  }
}

checkHeroKeywords();


