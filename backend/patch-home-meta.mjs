import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function start() {
  console.log('📝 Updating Prisma global Meta schema for Homepage...');
  
  await prisma.pages.update({
    where: { slug: 'home' },
    data: { 
        jsonld_enabled: true,
        jsonld_type: 'CollectionPage',
        robots_index: true,
        robots_follow: true,
        hreflang_enabled: true,
        og_image: '/og-image-default.webp',
        seo_canonical_url: null // null triggers dynamic generation automatically
    }
  });

  console.log('✅ Homepage DB schema is perfectly configured for Google indexing!');
}

start()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
