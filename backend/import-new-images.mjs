import fetch from 'node-fetch';
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
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
  const data = await res.arrayBuffer();

  const outputPath = path.join(outputDir, `${slug}.webp`);
  await sharp(Buffer.from(data))
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(outputPath);

  return `/slots/${slug}.webp`;
}

async function start() {
  console.log('🖼️ Starting Dynamic Image Importer...');
  const slots = await prisma.slots.findMany({ 
    where: { 
      image_url: { startsWith: 'http' } 
    } 
  });
  console.log(`Found ${slots.length} total slots needing image optimization in DB.`);

  let downloaded = 0;
  let skipped = 0;

  for(let slot of slots) {
    console.log(`🌀 Processing Image for [${slot.name}]...`);
    
    const outputPath = path.join(outputDir, `${slot.slug}.webp`);
    if (fs.existsSync(outputPath)) {
      console.log(`   ⏭️ Image already exists locally. Fixing DB reference.`);
      skipped++;
      await prisma.slots.update({
        where: { id: slot.id },
        data: { image_url: `/slots/${slot.slug}.webp` }
      });
      continue;
    }
    
    try {
      console.log(`   📥 Downloading from: ${slot.image_url}`);
      const newPath = await processImage(slot.image_url, slot.slug);

      await prisma.slots.update({
        where: { id: slot.id },
        data: { image_url: newPath }
      });
      console.log(`   ✅ SUCCESS: Saved as ${newPath} and linked to DB!`);
      downloaded++;

      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
       console.log(`   🔴 ERROR: ${e.message}`);
    }
  }

  console.log(`\n🚀🚀 MEDIA ENGINE IMPORT COMPLETE! 🚀🚀`);
  console.log(`Downloaded: ${downloaded} | Skipped: ${skipped}`);
}

start().catch(console.error);
