import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const replaceIcons = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) {
    return obj.map(replaceIcons);
  }
  const newObj = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k === 'icon' && typeof v === 'string') {
      if (v === 'solar:wallet-bold-duotone') newObj[k] = 'solar:wad-of-money-bold-duotone';
      else if (v === 'solar:ranking-line-duotone') newObj[k] = 'solar:medal-ribbon-line-duotone';
      else if (v === 'solar:flame-line-duotone') newObj[k] = 'solar:fire-line-duotone';
      else if (v === 'solar:crown-line-duotone') newObj[k] = 'solar:crown-star-line-duotone';
      else newObj[k] = v;
    } else {
      newObj[k] = replaceIcons(v);
    }
  }
  return newObj;
};

async function start() {
  console.log('Fixing icons in DB for home page...');
  const page = await prisma.pages.findUnique({ where: { slug: 'home' } });
  
  if (!page) {
    console.error('Home page not found!');
    return;
  }

  const localizations = replaceIcons(page.localizations || {});
  // Sometimes fast_filters might be at the top level or within localizations.
  // We'll replace both just in case:
  let updateData = { localizations };
  
  if (page.fast_filters) {
    updateData.fast_filters = replaceIcons(page.fast_filters);
  }

  await prisma.pages.update({
    where: { slug: 'home' },
    data: updateData
  });

  console.log('✅ Icons fixed successfully!');
}

start()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
