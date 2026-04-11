import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function findOrCreateCategory(name) {
  const slug = generateSlug(name);
  let category = await prisma.slot_categories.findUnique({ where: { slug } });
  
  if (!category) {
    category = await prisma.slot_categories.create({
      data: {
        id: crypto.randomUUID(),
        name,
        slug,
        is_active: true
      }
    });
    console.log(`   🌟 Created Category: ${name}`);
  }
  return category.id;
}

const outputDir = path.join(process.cwd(), '../frontend/public/slots');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

async function processImage(url, slug) {
  const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
  });
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
  const data = await res.arrayBuffer();

  const outputPath = path.join(outputDir, `${slug}.webp`);
  await sharp(Buffer.from(data))
    .resize({ width: 800, withoutEnlargement: true }) // Standard card size
    .webp({ quality: 85, effort: 6 })
    .toFile(outputPath);

  return `/slots/${slug}.webp`;
}

async function start() {
  console.log('🌐 Fetching Bluechip Top Games HTML...');
  const res = await fetch('https://bluechip.io/games?title=Top%20Games&tag=top-row', {
      headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
      }
  });
  if (!res.ok) {
     console.error('Failed to fetch:', res.status, res.statusText);
     return;
  }
  const html = await res.text();
  
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) {
    console.error('❌ Could not find __NEXT_DATA__ script in HTML.');
    return;
  }
  
  let json;
  try {
    json = JSON.parse(match[1]);
  } catch (e) {
    console.error('❌ Failed to parse __NEXT_DATA__ JSON:', e.message);
    return;
  }
  
  const gamesList = json?.props?.pageProps?.initialGamesList?.content;
  if (!gamesList || !Array.isArray(gamesList)) {
    console.error('❌ Could not find initialGamesList.content in JSON');
    return;
  }
  
  console.log(`🔥 Extracted ${gamesList.length} games from SSR state.`);
  
  const categoryId = await findOrCreateCategory("Top Games");

  let updatedCount = 0;
  for (const item of gamesList) {
      if (!item.name || !item.mobileImage) continue;

      const slug = generateSlug(item.name);
      
      // Look for the slot in the database
      const existingSlot = await prisma.slots.findUnique({
          where: { slug }
      });
      
      if (existingSlot) {
          console.log(`\n🌀 Found EXISTING Slot: [${existingSlot.name}]. Assigning 'Top Games' and updating image...`);
          
          try {
             const newImgPath = await processImage(item.mobileImage, slug);
             
             await prisma.slots.update({
                 where: { id: existingSlot.id },
                 data: { 
                     category_id: categoryId,
                     image_url: newImgPath,
                     thumbnail_url: newImgPath
                 }
             });
             
             console.log(`   ✅ Successfully updated Image: ${item.mobileImage} -> ${newImgPath} & Category assigned!`);
             updatedCount++;
          } catch(e) {
              console.error(`   ❌ Error updating ${existingSlot.name}:`, e.message);
          }
      }
  }

  console.log(`\n🚀🚀 SUCCESS! Updated ${updatedCount} existing slots with new images and categories. 🚀🚀`);
}

start().catch(console.error).finally(() => prisma.$disconnect());
