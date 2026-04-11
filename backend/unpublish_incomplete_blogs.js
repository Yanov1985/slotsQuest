const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.blogs.updateMany({
    where: { seo_desc: null },
    data: { is_published: false }
  });
  console.log(`Unpublished ${result.count} incomplete blogs.`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
