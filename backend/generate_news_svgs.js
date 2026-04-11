const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const OUTPUT_DIR = path.join(__dirname, '..', 'frontend', 'public', 'images', 'news');

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function generateSVG(title) {
  // Random dynamic gradient colors based on title length or hash to give variety
  const hash = Array.from(title).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue1 = hash % 360;
  const hue2 = (hash + 60) % 360;

  return `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${hash}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl(${hue1}, 60%, 20%)" />
      <stop offset="100%" stop-color="hsl(${hue2}, 70%, 35%)" />
    </linearGradient>
    
    <pattern id="pattern${hash}" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.03)" />
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="600" fill="url(#grad${hash})" />
  <rect width="800" height="600" fill="url(#pattern${hash})" />
</svg>
  `.trim();
}

(async () => {
  try {
    const newsItems = await prisma.news.findMany({
      select: { id: true, slug: true, title: true }
    });

    console.log(`Found ${newsItems.length} news articles. Generating SVGs...`);

    let updatedCount = 0;
    for (const item of newsItems) {
      if (!item.slug || !item.title) continue;

      const svgContent = generateSVG(item.title);
      const filename = `${item.slug}.svg`;
      const filepath = path.join(OUTPUT_DIR, filename);

      fs.writeFileSync(filepath, svgContent);

      const publicUrl = `/images/news/${filename}`;

      await prisma.news.update({
        where: { id: item.id },
        data: { image_url: publicUrl }
      });
      
      console.log(`Generated and updated: ${item.slug}`);
      updatedCount++;
    }

    console.log(`Successfully generated and associated ${updatedCount} SVG images.`);

  } catch (err) {
    console.error('Error generating SVGs:', err);
  } finally {
    await prisma.$disconnect();
  }
})();
