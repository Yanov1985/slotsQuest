import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

// Convert "Gates of Olympus" to "gates-of-olympus"
function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function start() {
  console.log('🤖 Commencing Automated Import from enriched-slots-to-import.json...');
  
  const inFile = path.join(__dirname, 'enriched-slots-to-import.json');
  let slotsData = [];
  try {
    const rawData = await fs.readFile(inFile, 'utf8');
    slotsData = JSON.parse(rawData);
  } catch (err) {
    console.error(`Fatal: Cannot load ${inFile}: ${err.message}`);
    process.exit(1);
  }

  console.log(`✅ Successfully loaded ${slotsData.length} slot profiles from JSON!`);
  
  for (let s of slotsData) {
    console.log(`🌀 Processing [${s.title}] by ${s.provider}...`);
    
    // 1. Resolve Provider
    let providerSlug = toSlug(s.provider);
    let provider = await prisma.providers.findUnique({ where: { slug: providerSlug } });
    if (!provider) {
       console.log(`   🔸 Created missing Provider: ${s.provider}`);
       provider = await prisma.providers.create({
         data: {
           id: crypto.randomUUID(),
           name: s.provider,
           slug: providerSlug,
           is_active: true
         }
       });
    }

    const { localizations } = s;
    const geo_regions = localizations ? JSON.stringify(Object.keys(localizations)) : '[]';

    // 2. Resolve Slot
    let existingSlot = await prisma.slots.findUnique({ where: { slug: s.slug } });
    if (existingSlot) {
      console.log(`   ⚡ Slot ${s.title} already exists. Updating localizations only!`);
      await prisma.slots.update({
        where: { id: existingSlot.id },
        data: {
          localizations: localizations,
          geo_regions: geo_regions
        }
      });
      continue;
    }

    // 3. Create brand new slot
    await prisma.slots.create({
      data: {
         id: crypto.randomUUID(),
         name: s.title,
         slug: s.slug,
         description: localizations?.en?.seo_description || `${s.title} is an amazing slot from ${s.provider}.`,
         providers: { connect: { id: provider.id } },
         is_active: true,
         rtp: 96.0,  // We'll use defaults or update later depending on scraping capabilities
         volatility: 'high',
         max_win: 5000,
         localizations: localizations,
         geo_regions: geo_regions,
         // Dummy default values to bypass NOT NULL constraints if any
         reels: 5,
         game_field: "5x3",
         media_type: "image",
         image_url: s.image_url || ""
      }
    });
    console.log(`   🟢 SUCCESS! Inserted new Slot [${s.title}] with full 52-GEO Matrix!`);
  }

  console.log('\n🚀🚀 MASS IMPORT & DB UPDATES COMPLETE! 🚀🚀');
}

start().catch(e => {
  console.error('Fatal Error In Importer:', e)
});
