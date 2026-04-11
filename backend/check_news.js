const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const news = await prisma.news.findMany({ take: 3, select: { id: true, slug: true, image_url: true, title: true } });
  console.log(news);
  await prisma.$disconnect();
})();
