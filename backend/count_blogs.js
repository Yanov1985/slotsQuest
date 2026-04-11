const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const allBlogs = await prisma.blogs.findMany();
  let countWithContent = 0;
  for (let b of allBlogs) {
    if (b.content_markdown || (b.localizations && Object.keys(b.localizations).length > 0)) {
      countWithContent++;
    }
  }
  console.log(`Total blogs: ${allBlogs.length}`);
  console.log(`Blogs with content: ${countWithContent}`);
}

run().catch(console.error).finally(() => prisma.$disconnect());
