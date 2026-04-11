import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function start() {
  console.log('📝 Updating SEO Titles and Descriptions for Homepage...');
  const page = await prisma.pages.findUnique({ where: { slug: 'home' } });
  
  if (!page || !page.localizations) {
    console.error('❌ Home page or localizations not found in DB!');
    return;
  }

  const enTitle = "Best Online Slots Rating 2026 | Play Demo & Real Money at SlotQuest";
  const enDesc = "Discover the most popular online slots of 2026 at SlotQuest. Explore comprehensive reviews, track real-time RTP data, expert strategies, and play thousands of free demo versions natively before betting real money.";

  const ruTitle = "Лучшие Онлайн Слоты 2026 | Играть Бесплатно и на Деньги | SlotQuest";
  const ruDesc = "Изучайте рейтинг самых популярных онлайн слотов 2026 года на SlotQuest. Читайте глубокие обзоры, отслеживайте отдачу RTP и играйте в тысячи бесплатных демо версий без регистрации.";

  const localizations = page.localizations;

  // Update English
  if (localizations.en) {
    localizations.en.seo_title = enTitle;
    localizations.en.seo_description = enDesc;
  }
  
  // Update Russian
  if (localizations.ru) {
    localizations.ru.seo_title = ruTitle;
    localizations.ru.seo_description = ruDesc;
  }

  // Update Global / Fallback database columns as well just in case component checks them
  await prisma.pages.update({
    where: { slug: 'home' },
    data: { 
        seo_title: enTitle,
        seo_desc: enDesc,
        localizations 
    }
  });

  console.log('✅ Title and Description updated successfully across the Database!');
}

start()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
