import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import crypto from 'crypto';

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
  console.log('🌐 Fetching Bluechip Popular Games HTML...');
  const res = await fetch('https://bluechip.io/fi-fi/games?title=Popular&tag=popular-row', {
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
  
  // Ensure "popular" mechanic exists
  let popMechanic = await prisma.mechanics.findUnique({ where: { slug: 'popular' } });
  if (!popMechanic) {
      popMechanic = await prisma.mechanics.create({
          data: {
              id: crypto.randomUUID(),
              name: 'Popular',
              slug: 'popular',
              description: 'Popular games according to external rankings.'
          }
      });
  }

  let added = 0;
  let linked = 0;
  let imgUpdated = 0;

  for (const item of gamesList) {
      try {
          if (!item.name || !item.mobileImage || item.name === "Remote image") continue;

          const providerName = item.brandName || "Unknown Provider";
          const slug = `${generateSlug(item.name)}-${generateSlug(providerName)}`;
          const providerSlug = generateSlug(providerName);
          
          let provider = await prisma.providers.findFirst({ where: { slug: providerSlug } });
          if (!provider) {
             console.log(`   🔸 Created missing Provider: ${providerName}`);
             provider = await prisma.providers.create({
               data: {
                 id: crypto.randomUUID(),
                 name: providerName,
                 slug: providerSlug,
                 is_active: true
               }
             });
          }

          let existingSlot = await prisma.slots.findFirst({ where: { slug } });
          
          if (!existingSlot) {
             existingSlot = await prisma.slots.findFirst({ where: { name: item.name } });
          }

          if (!existingSlot) {
            console.log(`   🔸 Creating new Slot [${item.name}]...`);
            let newImgPath = "";
            try {
                newImgPath = await processImage(item.mobileImage, slug);
                imgUpdated++;
            } catch(e) { console.error(`Failed to DL image for ${item.name} (${item.mobileImage}): ${e.message}`); }

            existingSlot = await prisma.slots.create({
              data: {
                 id: crypto.randomUUID(),
                 name: item.name,
                 slug: slug,
                 description: `${item.name} is a popular slot game developed by ${providerName}.`,
                 providers: { connect: { id: provider.id } },
                 is_active: true,
                 rtp: 96.0,
                 volatility: 'high',
                 max_win: 5000,
                 reels: 5,
                 game_field: "5x3",
                 media_type: "image",
                 image_url: newImgPath,
                 thumbnail_url: newImgPath
              }
            });
            added++;
            console.log(`   🟢 SUCCESS! Inserted new Slot [${item.name}]`);
          } else {
            if (!existingSlot.image_url || existingSlot.image_url.includes("placeholder") || existingSlot.image_url === "") {
                console.log(`   📸 Fetching missing image for EXISTING Slot [${item.name}]...`);
                try {
                    const newImgPath = await processImage(item.mobileImage, existingSlot.slug);
                    await prisma.slots.update({
                      where: { id: existingSlot.id },
                      data: { image_url: newImgPath, thumbnail_url: newImgPath }
                    });
                    console.log(`   ✅ Successfully updated Image for ${item.name}`);
                    imgUpdated++;
                } catch(e) {
                    console.error(`Failed to DL image for ${item.name} (${item.mobileImage}): ${e.message}`);
                }
            }
          }

          // Link to Popular mechanic
          const mechanicLink = await prisma.slot_mechanics.findUnique({
              where: {
                  slot_id_mechanic_id: {
                      slot_id: existingSlot.id,
                      mechanic_id: popMechanic.id
                  }
              }
          });

          if (!mechanicLink) {
              await prisma.slot_mechanics.create({
                  data: {
                      slot_id: existingSlot.id,
                      mechanic_id: popMechanic.id
                  }
              });
              linked++;
          }
          
          await new Promise(r => setTimeout(r, 200));
      } catch (err) {
          console.error(`❌ CRITICAL ERROR ON ITEM ${item.name}: ${err.stack}`);
      }
  }

  console.log(`\n🚀🚀 MASS IMPORT COMPLETE! Added: ${added}, Linked: ${linked}, Images Fetched: ${imgUpdated} 🚀🚀`);
}

start().catch(console.error).finally(() => prisma.$disconnect());
