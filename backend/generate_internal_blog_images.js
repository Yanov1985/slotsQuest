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
  // Find blogs that don't have internal images yet
  const blogs = await prisma.blogs.findMany({
    where: { 
      is_published: true,
      content_markdown: { not: { contains: '/images/blogs/internal/' } }
    }
  });

  console.log(`Found ${blogs.length} blogs needing internal images.`);

  const publicDir = path.join(__dirname, '../frontend/public/images/blogs/internal');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i];
    console.log(`Processing ${i+1}/${blogs.length}: ${blog.title}`);

    try {
      // Step 1: Ask GPT-4o to analyze content and decide where to put images and what prompts to use
      const gptMsg = `You are a blog editor. Here is the HTML content of a casino blog article titled "${blog.title}". 
Your task is to insert 1 or 2 high-quality contextual images into the HTML to break up the text.
Do NOT modify the existing text or HTML structure. Just insert the following exact tag where appropriate:
<img class="w-full h-auto rounded-3xl my-8 object-cover shadow-2xl border border-white/10" src="DALL_E_PROMPT(Your detailed prompt here in DALL-E style)" alt="Good SEO alt text here" />

Rules for the prompt:
- DALL-E style: "A high-quality, modern, visually striking 16:9 illustration for a casino blog. Premium neon dark-mode aesthetic (cyber-casino style) with vibrant colors (cyan, magenta, gold) on a dark background. NO text or typography. [Specific scene based on context]".

Return the complete HTML exactly as provided, but with the <img> tags injected.`;

      const gptRes = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are an HTML editor.' },
            { role: 'user', content: gptMsg + "\n\nHTML:\n" + blog.content_markdown }
          ],
          temperature: 0.2
        },
        {
          headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' }
        }
      );

      let updatedHtml = gptRes.data.choices[0].message.content;

      // Extract all DALL_E_PROMPT(prompt) from the HTML
      const regex = /DALL_E_PROMPT\((.*?)\)/g;
      let match;
      let promptIndex = 1;

      while ((match = regex.exec(updatedHtml)) !== null) {
        const fullMatch = match[0];
        const prompt = match[1];

        console.log(`  -> Generating internal image ${promptIndex}: ${prompt.substring(0, 50)}...`);

        // Step 2: Generate with DALL-E
        const dallERes = await axios.post(
          'https://api.openai.com/v1/images/generations',
          {
            model: 'dall-e-3',
            prompt: prompt,
            n: 1,
            size: '1024x1024', // DALL-E 3 default, 16:9 would be 1024x1792 but let's stick to standard if needed
          },
          {
            headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' }
          }
        );

        const imageUrl = dallERes.data.data[0].url;
        const fileName = `${blog.slug}-internal-${promptIndex}-${Date.now()}.png`;
        const filePath = path.join(publicDir, fileName);

        await downloadImage(imageUrl, filePath);
        const relativeUrl = `/images/blogs/internal/${fileName}`;

        // Replace the DALL_E_PROMPT with the actual relative URL
        updatedHtml = updatedHtml.replace(fullMatch, relativeUrl);
        promptIndex++;
        
        await sleep(15000); // Respect rate limits
      }

      // Step 3: Update DB with the new HTML
      await prisma.blogs.update({
        where: { id: blog.id },
        data: { content_html: updatedHtml }
      });

      console.log(`Successfully updated internal images for: ${blog.title}`);
    } catch (err) {
      console.error(`Failed processing internal images for ${blog.title}. Error:`, err.response?.data?.error || err.message);
      await sleep(10000);
    }
  }

  console.log('Finished internal image generation process.');
  await prisma.$disconnect();
}

main().catch(console.error);
