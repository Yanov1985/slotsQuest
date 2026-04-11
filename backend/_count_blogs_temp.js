const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const total = await prisma.blog.count();
  const published = await prisma.blog.count({ where: { published: true } });
  console.log(`blogs | ${total} | ${published} | ${((published/total)*100).toFixed(1)}% |`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
