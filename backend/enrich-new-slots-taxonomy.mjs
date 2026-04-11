import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env'), override: true });

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const schema = {
  type: "object",
  properties: {
    themes: { type: "array", items: { type: "string" } },
    mechanics: { type: "array", items: { type: "string" } },
    bonuses: { type: "array", items: { type: "string" } },
    features: { type: "array", items: { type: "string" } }
  },
  required: ["themes", "mechanics", "bonuses", "features"],
  additionalProperties: false
};

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function findOrCreateCategory(name) {
  const slug = toSlug(name);
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

async function findOrCreateTag(type, name, prismaModel, isAutoIncrement) {
  const slug = toSlug(name);
  let record = await prismaModel.findUnique({ where: { slug } });
  
  if (!record) {
    const data = { name, slug };
    record = await prismaModel.create({ data });
    console.log(`   🌟 Created New ${type}: ${name}`);
  }
  return record.id;
}

async function start() {
  console.log('🤖 Starting Taxonomy Enrichment via OpenAI for new slots...');
  
  // 1. Ensure "Top Games" category exists
  const categoryId = await findOrCreateCategory("Top Games");
  
  // 2. Read the new slots
  const inFile = path.join(__dirname, 'new-slots-to-import.json');
  let slotsData = [];
  try {
    const rawData = await fs.readFile(inFile, 'utf8');
    slotsData = JSON.parse(rawData);
  } catch (err) {
    console.error(`Fatal: Cannot load ${inFile}: ${err.message}`);
    process.exit(1);
  }

  console.log(`✅ Loaded ${slotsData.length} target slots...`);

  for (const s of slotsData) {
    console.log(`\n🌀 Processing [${s.title}] by ${s.provider}...`);
    
    // Fetch from DB
    const dbSlot = await prisma.slots.findUnique({
      where: { slug: s.slug },
      include: {
        slotThemes: true,
        slot_mechanics: true,
        slot_bonuses: true,
        slot_features: true
      }
    });

    if (!dbSlot) {
      console.log(`   ❌ Slot ${s.slug} not found in DB! Skipping...`);
      continue;
    }

    // Assign Category First
    if (dbSlot.category_id !== categoryId) {
      await prisma.slots.update({
        where: { id: dbSlot.id },
        data: { category_id: categoryId }
      });
      console.log(`   🎯 Assigned Category: Top Games`);
    }

    // Call OpenAI for this slot
    const prompt = `Act as an expert casino slot reviewer. I have a popular online slot named "${s.title}" developed by "${s.provider}".
Please provide its core Themes, Mechanics, Bonuses, and General Features as concise strings. Try to reuse common casino industry terms.

Examples for themes: "Ancient Egypt", "Mythology", "Fruits", "Sweets", "Horror"
Examples for mechanics: "Megaways", "Cluster Pays", "Cascading Reels", "Avalanche", "Pay Anywhere"
Examples for bonuses: "Free Spins", "Multipliers", "Bonus Buy", "Sticky Wilds"
Examples for features: "Auto Play", "Quick Spin", "Double Chance", "Bonus Bet"
Keep lists to 1-4 standard items maximum.`;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "taxonomy",
                strict: true,
                schema: schema
            }
        }
      });
      
      const content = response.choices[0].message.content;
      const data = JSON.parse(content);

      console.log(`   🧠 AI Output:`, data);

      // Hydrate Themes
      if (data.themes && Array.isArray(data.themes)) {
        for (const t of data.themes) {
          const themeId = await findOrCreateTag('Theme', t, prisma.themes, false);
          try {
            await prisma.slot_themes.create({
              data: { slot_id: dbSlot.id, theme_id: themeId }
            });
          } catch(e) { /* Ignore unique constraint violations */ }
        }
      }

      // Hydrate Mechanics
      if (data.mechanics && Array.isArray(data.mechanics)) {
        for (const m of data.mechanics) {
          const mechId = await findOrCreateTag('Mechanic', m, prisma.mechanics, true);
          try {
            await prisma.slot_mechanics.create({
              data: { slot_id: dbSlot.id, mechanic_id: mechId }
            });
          } catch(e) { }
        }
      }

      // Hydrate Bonuses
      if (data.bonuses && Array.isArray(data.bonuses)) {
        for (const b of data.bonuses) {
          const bonusId = await findOrCreateTag('Bonus', b, prisma.bonuses, true);
          try {
            await prisma.slot_bonuses.create({
              data: { slot_id: dbSlot.id, bonus_id: bonusId }
            });
          } catch(e) { }
        }
      }

      // Hydrate Features
      if (data.features && Array.isArray(data.features)) {
          for (const f of data.features) {
            const featId = await findOrCreateTag('Feature', f, prisma.features, true);
            try {
              await prisma.slot_features.create({
                data: { slot_id: dbSlot.id, feature_id: featId }
              });
            } catch(e) { }
          }
      }

      console.log(`   ✅ Links established in DB!`);

    } catch (e) {
       console.error(`   ❌ Failed processing AI for ${s.title}:`, e.message);
    }
  }

  console.log('\n🚀🚀 TAXONOMY ENRICHMENT COMPLETE! 🚀🚀');
}

start().catch(console.error);
