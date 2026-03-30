import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const outputDir = path.join(process.cwd(), '../frontend/public/slots');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImage(url, slug) {
  // Download image buffer
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
  const data = await res.arrayBuffer();

  // Compress and resize
  const outputPath = path.join(outputDir, `${slug}.webp`);
  await sharp(Buffer.from(data))
    .resize({ width: 800, withoutEnlargement: true }) // Standard card size
    .webp({ quality: 85, effort: 6 })
    .toFile(outputPath);

  return `/slots/${slug}.webp`;
}

async function start() {
  console.log('🖼️ Starting Auto Slot Media Engine...');
  const slots = await prisma.slots.findMany({ include: { providers: true } });
  console.log(`Found ${slots.length} slots in DB.`);

  for(let slot of slots) {
    console.log(`🌀 Processing Image for [${slot.name}]...`);
    
    // Construct clashofslots URL
    const providerSlug = slot.providers.slug;
    const clashUrl = `https://clashofslots.com/slots/${providerSlug}/${slot.slug}/`;

    try {
      const res = await fetch(clashUrl);
      if (!res.ok) {
         console.log(`   ❌ Could not find page: ${clashUrl}`);
         continue;
      }
      const html = await res.text();
      const $ = cheerio.load(html);
      
      // Fix: we want the clean thumbnail from the DOM, not the social banner!
      const imgUrl = $('.slot_header_thumb img').first().attr('src');
      if (!imgUrl) {
         console.log(`   ❌ Could not find .slot_header_thumb img on page`);
         continue;
      }

      console.log(`   📥 Downloading from: ${imgUrl}`);
      const newPath = await processImage(imgUrl, slot.slug);

      // Save to database
      await prisma.slots.update({
        where: { id: slot.id },
        data: { image_url: newPath }
      });
      console.log(`   ✅ SUCCESS: Saved as ${newPath} and linked to DB!`);

    } catch (e) {
       console.log(`   🔴 ERROR: ${e.message}`);
    }
  }

  console.log('\\n🚀🚀 MEDIA ENGINE IMPORT COMPLETE! 🚀🚀');
}

start().catch(console.error);
