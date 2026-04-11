const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ override: true });

const prisma = new PrismaClient();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const sleep = (ms) => new Promise(fill => setTimeout(fill, ms));

async function downloadImage(url, dest) {
  const writer = fs.createWriteStream(dest);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function main() {
  const blogs = await prisma.blogs.findMany({
    where: { seo_desc: { not: null }, is_published: true, OR: [{ cover_image_url: null }, { cover_image_url: '' }] }
  });

  console.log(`Found ${blogs.length} blogs needing images.`);

  const publicDir = path.join(__dirname, '../frontend/public/images/blogs');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    console.log(`Generating image ${i+1}/${blogs.length} for: ${blog.title}`);

    const prompt = `Create a high-quality, modern, visually striking 16:9 illustration for a casino blog article titled "${blog.title}". The style should be premium, neon dark-mode aesthetic (like cyber-casino or modern digital marketing) with vibrant colors (cyan, magenta, gold) on a dark background. NO text or typography in the image. Premium sleek look. Context: ${blog.excerpt || ''}`;

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const imageUrl = res.data.data[0].url;
      const fileName = `${blog.slug}-${Date.now()}.png`;
      const filePath = path.join(publicDir, fileName);

      await downloadImage(imageUrl, filePath);
      const relativeUrl = `/images/blogs/${fileName}`;

      await prisma.blogs.update({
        where: { id: blog.id },
        data: { cover_image_url: relativeUrl }
      });

      console.log(`Successfully generated and saved: ${relativeUrl}`);
      // DALL-E tier 1 often allows only 5 images / min = 12 seconds per image, I will wait 15 sec just to be safe
      await sleep(15000); 
    } catch (err) {
      console.error(`Failed for ${blog.title}. Error: ${err.response?.data?.error?.message || err.message}`);
      await sleep(15000);
    }
  }

  console.log('Finished image generation process.');
  await prisma.$disconnect();
}

main().catch(console.error);
