const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateSlotDescription() {
  console.log('🔄 Обновление описания слота с плейсхолдерами...\n');

  try {
    // Обновляем описание слота Gates of Olympus
    const slot = await prisma.slots.update({
      where: { slug: 'gates-of-olympus-review' },
      data: {
        description: 'We have dozens of Ancient Greek mythology online slots, but the superstar in this theme category is [keyword_2]. It shares the top position with its sibling, [keyword_3]. This is a powerful game that feeds from the endless energy of Zeus. And when the king of the gods is in the mood, players can land up to x500 multipliers, which can significantly boost even the smallest payout.',
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        hero_keyword: true,
        hero_keyword_2: true,
        hero_keyword_3: true,
      }
    });

    console.log('✅ Описание слота обновлено!');
    console.log('\n📝 Текущее состояние:');
    console.log('Название:', slot.name);
    console.log('Slug:', slot.slug);
    console.log('\n🎯 Hero Keywords:');
    console.log('hero_keyword:', slot.hero_keyword);
    console.log('hero_keyword_2:', slot.hero_keyword_2);
    console.log('hero_keyword_3:', slot.hero_keyword_3);
    console.log('\n📄 Описание с плейсхолдерами:');
    console.log(slot.description);
    console.log('\n✨ Результат после замены:');

    // Показываем, как будет выглядеть описание после замены
    let result = slot.description;
    if (slot.hero_keyword_2) {
      result = result.replace(/\[keyword_2\]/g, slot.hero_keyword_2);
    }
    if (slot.hero_keyword_3) {
      result = result.replace(/\[keyword_3\]/g, slot.hero_keyword_3);
    }
    console.log(result);

  } catch (error) {
    console.error('❌ Ошибка при обновлении:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateSlotDescription();


