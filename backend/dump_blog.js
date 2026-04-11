const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.blogs.findFirst({
  where: { slug: 'las-vegas-vs-macau-comparing-the-world-s-gambling-hubs' }
}).then(b => {
  console.log(JSON.stringify(b, null, 2));
}).catch(console.error).finally(() => prisma.$disconnect());
