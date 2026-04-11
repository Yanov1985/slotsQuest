const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  try {
    const blogCount = await prisma.blogs.count();
    const glossaryCount = await prisma.glossary.count();
    const newsCount = await prisma.news.count();
    const casinoCount = await prisma.casinos.count();
    const streamerCount = await prisma.streamers.count();

    console.log('--- DB Check ---');
    console.log('Blogs:', blogCount);
    console.log('Glossary:', glossaryCount);
    console.log('News:', newsCount);
    console.log('Casinos:', casinoCount);
    console.log('Streamers:', streamerCount);

    const pendingBlogs = await prisma.blogs.count({
      where: {
        OR: [
          { localizations: { equals: null } },
          { localizations: { equals: {} } }
        ]
      }
    });
    console.log('Pending Blogs (Simple Check):', pendingBlogs);

  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

check();
