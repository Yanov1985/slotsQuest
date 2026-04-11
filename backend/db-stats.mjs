import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const slotsTotal = await prisma.slots.count();
  const slotsDone = await prisma.slots.count({ where: { NOT: { localizations: { equals: {} } } } }); // Approximation or just use NOT Prisma.AnyNull depending on what Prisma version.

  const newsTotal = await prisma.news.count();
  const newsDone = await prisma.news.count({ where: { is_published: true } }); // or has localizations? I'll just check all.

  const blogsTotal = await prisma.blogs.count();
  
  const glossaryTotal = await prisma.glossary.count();
  
  const streamersTotal = await prisma.streamers.count();
  const casinosTotal = await prisma.casinos.count();

  console.log(`Slots: ${slotsDone}/${slotsTotal}`);
  console.log(`News: ${newsTotal}`);
  console.log(`Blogs: ${blogsTotal}`);
  console.log(`Glossary: ${glossaryTotal}`);
  console.log(`Streamers: ${streamersTotal}`);
  console.log(`Casinos: ${casinosTotal}`);
  
  await prisma.$disconnect();
}
check().catch(console.error);
