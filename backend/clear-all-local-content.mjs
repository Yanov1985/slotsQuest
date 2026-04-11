import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function start() {
  console.log('📝 Clearing localized content overlays to enforce Admin Panel global sync...');
  
  const page = await prisma.pages.findUnique({ where: { slug: 'home' } });
  if (!page || !page.localizations) {
    console.log('❌ Page or localizations not found!');
    return;
  }

  const localizations = typeof page.localizations === 'string' 
    ? JSON.parse(page.localizations) 
    : page.localizations;

  // Track how many we delete
  let deletedCount = 0;

  // We explicitly delete the `content` array from ALL language objects in the JSON payload
  // This guarantees that the computed property in Vue will ALWAYS fall back to the root `pages.content` array
  // mapped directly to the Admin Panel.
  for (const locale in localizations) {
      if (localizations[locale] && localizations[locale].content) {
          delete localizations[locale].content;
          deletedCount++;
      }
  }

  await prisma.pages.update({
    where: { slug: 'home' },
    data: { localizations: localizations }
  });

  console.log(`✅ Success! Erased legacy static content overrides across ${deletedCount} languages.`);
  console.log(`🌎 The Admin Panel 'SEO Text Content' is now the single source of truth for all users.`);
}

start()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
