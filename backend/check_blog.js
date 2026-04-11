const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  const slug = 'slot-trends-2025-what-s-next-for-the-industry';
  const blog = await prisma.blogs.findUnique({ where: { slug } });
  if (!blog) {
    console.log('Blog not found');
  } else {
    console.log('Blog ID:', blog.id);
    console.log('Content HTML length:', blog.content_html ? blog.content_html.length : 0);
    console.log('Content HTML snippet:', blog.content_html ? blog.content_html.slice(0, 500) : 'none');
    console.log('Content Markdown length:', blog.content_markdown ? blog.content_markdown.length : 0);
    console.log('Localizations keys:', blog.localizations ? Object.keys(blog.localizations).join(', ') : 'none');
  }
  await prisma.$disconnect();
})();
