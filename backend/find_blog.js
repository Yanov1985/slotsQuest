const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.blogs.findFirst({
  where: { 
    OR: [
      { content_markdown: { not: null } },
      { localizations: { not: null } }
    ]
  }
}).then(b => {
  if (b) {
    console.log("Found blog:", b.slug);
  } else {
    console.log("No blog with content or localizations found.");
  }
}).catch(console.error).finally(() => prisma.$disconnect());
