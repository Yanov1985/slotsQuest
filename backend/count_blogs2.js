const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const total = await prisma.blogs.count();
  const published = await prisma.blogs.count({ where: { is_published: true } });
  const complete = await prisma.blogs.count({ where: { is_published: true, seo_desc: { not: null } } });
  console.log(`blogs | ${total} | ${published} | ${((published/total)*100).toFixed(1)}% |`);
  console.log(`complete (published + seo_desc) | ${complete}`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
