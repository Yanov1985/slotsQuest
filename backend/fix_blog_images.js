const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const blogs = await prisma.blogs.findMany({ where: { is_published: true } });
  
  for (const blog of blogs) {
    if (!blog.content_markdown || !blog.content_markdown.includes('<img')) continue;
    
    const imgRegex = /<img.*?src="\/images\/blogs\/internal\/[^"]+".*?>/g;
    const images = [];
    let match;
    while ((match = imgRegex.exec(blog.content_markdown)) !== null) {
      images.push(match[0]);
    }
    
    if (images.length === 0) continue;
    
    if (blog.localizations && typeof blog.localizations === 'object') {
      let updatedLocs = { ...blog.localizations };
      let isUpdated = false;
      
      for (const lang in updatedLocs) {
        let locContent = updatedLocs[lang].content_markdown;
        if (!locContent) continue;
        if (locContent.includes('<img')) continue; // already has images?
        
        // Strategy to inject images into localizations:
        // Just append them evenly throughout the article.
        // Let's break text into chunks separated by \n\n.
        const chunks = locContent.split(/\n\n+/);
        
        if (chunks.length > images.length) {
          const step = Math.floor(chunks.length / (images.length + 1));
          for (let i = 0; i < images.length; i++) {
            const targetIndex = step * (i + 1) + i; // adjust index as array grows
            chunks.splice(targetIndex, 0, images[i]);
          }
          updatedLocs[lang].content_markdown = chunks.join('\n\n');
          isUpdated = true;
        } else {
          // Just append at the end (fallback)
          updatedLocs[lang].content_markdown = locContent + '\n\n' + images.join('\n\n');
          isUpdated = true;
        }
      }
      
      if (isUpdated) {
        await prisma.blogs.update({
          where: { id: blog.id },
          data: { localizations: updatedLocs }
        });
        console.log(`Updated images for localizations of ${blog.slug}`);
      }
    }
  }
  console.log('Done');
}

main().then(() => prisma.$disconnect()).catch(console.error);
