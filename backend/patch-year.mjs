import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function start() {
  console.log('📝 Fetching home page from DB...');
  const page = await prisma.pages.findUnique({ where: { slug: 'home' } });
  
  if (!page || !page.localizations) {
    console.error('❌ Home page or localizations not found in DB!');
    return;
  }

  // Convert the entire localizations object to a string
  let locStr = JSON.stringify(page.localizations);
  
  // Replace all occurrences of 2025 with 2026
  locStr = locStr.replace(/2025/g, '2026');

  await prisma.pages.update({
    where: { slug: 'home' },
    data: { localizations: JSON.parse(locStr) }
  });

  console.log('✅ Replaced all 2025 references with 2026 on the homepage!');
}

start()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
