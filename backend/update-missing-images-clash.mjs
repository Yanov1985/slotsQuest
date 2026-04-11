import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

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

async function fetchClashOfSlotsImage(providerSlug, slotSlug) {
  const url = `https://clashofslots.com/slots/${providerSlug}/${slotSlug}/`;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });
    if (!res.ok) return null;
    const html = await res.text();
    const $ = cheerio.load(html);
    const ogImage = $('meta[property="og:image"]').attr('content');
    return ogImage || null;
  } catch (e) {
    return null;
  }
}

async function start() {
  console.log('🌐 Fetching slots with missing images...');
  const slots = await prisma.slots.findMany({
    where: { OR: [{ image_url: '' }, { image_url: null }] },
    include: { providers: true }
  });
  
  console.log(`Found ${slots.length} slots with missing images.`);
  
  let updatedCount = 0;
  for (const slot of slots) {
    console.log(`Processing [${slot.name}]...`);
    const providerSlug = slot.providers ? slot.providers.slug : "unknown";
    
    // Attempt clashofslots
    let imageUrl = await fetchClashOfSlotsImage(providerSlug, slot.slug);
    
    // If provider name is needed, some providers have different slugs on clashofslots, e.g. pragmatic-play vs pragmatic
    if (!imageUrl) {
        // Fallback: try removing dashes or other common variations
        let altProvider = providerSlug.replace("-", "");
        imageUrl = await fetchClashOfSlotsImage(altProvider, slot.slug);
    }
    
    if (imageUrl) {
        try {
            console.log(`   Found image at ${imageUrl}, downloading...`);
            const localPath = await processImage(imageUrl, slot.slug);
            
            await prisma.slots.update({
                where: { id: slot.id },
                data: {
                    image_url: localPath,
                    thumbnail_url: localPath
                }
            });
            console.log(`   ✅ Successfully updated Image for ${slot.name}`);
            updatedCount++;
        } catch (e) {
            console.error(`   ❌ Failed to download or save image for ${slot.name}: ${e.message}`);
        }
    } else {
        console.log(`   ⚠️ Could not find image for ${slot.name} on clashofslots.`);
    }
    
    // Anti-rate-limit sleep
    await new Promise(r => setTimeout(r, 1000));
  }
  
  console.log(`\n🚀🚀 SUCCESS! Updated ${updatedCount} slots with new images. 🚀🚀`);
}

start().catch(console.error).finally(() => prisma.$disconnect());
