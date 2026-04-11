import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

// Convert name to slug
function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function start() {
  console.log('🤖 Commencing Automated Import from bc-popular.json...');
  
  const inFile = path.join(__dirname, '../bc-popular.json');
  let slotsData = [];
  try {
    const rawData = await fs.readFile(inFile, 'utf8');
    slotsData = JSON.parse(rawData);
  } catch (err) {
    console.error(`Fatal: Cannot load ${inFile}: ${err.message}`);
    process.exit(1);
  }

  console.log(`✅ Successfully loaded ${slotsData.length} slot profiles from JSON!`);

  // Ensure "popular" mechanic exists
  let popMechanic = await prisma.mechanics.findUnique({ where: { slug: 'popular' } });
  if (!popMechanic) {
      console.log('   🔸 Created missing Mechanic: Popular');
      popMechanic = await prisma.mechanics.create({
          data: {
              name: 'Popular',
              slug: 'popular',
              description: 'Popular games according to external rankings.'
          }
      });
  }
  
  let added = 0;
  let linked = 0;

  for (let s of slotsData) {
    console.log(`🌀 Processing [${s.title}] by ${s.provider}...`);
    
    // 1. Resolve Provider
    let providerSlug = toSlug(s.provider);
    let provider = await prisma.providers.findFirst({ where: { slug: providerSlug } });
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

    // 2. Resolve Slot
    let existingSlot = await prisma.slots.findFirst({ where: { slug: s.slug } });
    if (!existingSlot) {
      existingSlot = await prisma.slots.create({
        data: {
           id: crypto.randomUUID(),
           name: s.title,
           slug: s.slug,
           description: `${s.title} is a popular slot game developed by ${s.provider}.`,
           providers: { connect: { id: provider.id } },
           is_active: true,
           rtp: 96.0,
           volatility: 'high',
           max_win: 5000,
           reels: 5,
           game_field: "5x3",
           media_type: "image",
           image_url: ""
        }
      });
      console.log(`   🟢 SUCCESS! Inserted new Slot [${s.title}]`);
      added++;
    }

    // 3. Link Mechanic
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
        console.log(`   🔸 Linked 'Popular' mechanic to ${s.title}`);
    }
  }

  console.log(`\n🚀🚀 MASS IMPORT COMPLETE! Added: ${added}, Linked: ${linked} 🚀🚀`);
}

start().catch(e => {
  console.error('Fatal Error In Importer:', e)
});
