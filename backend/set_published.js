const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.blogs.updateMany({ data: { is_published: true } })
  .then(res => {
    console.log('Updated:', res.count);
    prisma.$disconnect();
  })
  .catch(console.error);
