import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function start() {
  console.log('📝 Synchronizing Homepage Content Object with Admin Panel Root...');
  
  const page = await prisma.pages.findUnique({ where: { slug: 'home' } });
  if (!page || !page.localizations) {
    console.log('❌ Page or localizations not found!');
    return;
  }

  const localizations = typeof page.localizations === 'string' 
    ? JSON.parse(page.localizations) 
    : page.localizations;

  // Extract the English localized content
  const enContent = localizations.en?.content;
  if (!enContent) {
    console.log('❌ No English content found in localizations to sync.');
    return;
  }

  // Delete the local EN override so that the frontend falls back to the ROOT content
  delete localizations.en.content;

  // Additionally, ensure root SEO titles match English fallback so admin panel sees them
  const seoTitle = localizations.en.seo_title || page.seo_title;
  const seoDesc = localizations.en.seo_description || page.seo_desc;

  await prisma.pages.update({
    where: { slug: 'home' },
    data: { 
        content: JSON.stringify(enContent),
        seo_title: seoTitle,
        seo_desc: seoDesc,
        localizations: localizations
    }
  });

  console.log('✅ Synchronization complete! Admin panel now controls the main 8-section English landing content.');
}

start()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
