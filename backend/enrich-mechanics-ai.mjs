import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI("AIzaSyBumteDFfUqb4F0YKkuGTdbqWb4wXFpCvE");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.1,
    topP: 0.95,
    maxOutputTokens: 2048,
    responseMimeType: "application/json",
  }
});

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function findOrCreateFeature(type, name, prismaModel) {
  const slug = toSlug(name);
  let record = await prismaModel.findUnique({ where: { slug } });
  if (!record) {
    record = await prismaModel.create({
      data: {
        id: crypto.randomUUID(),
        name,
        slug
      }
    });
    console.log(`   🌟 Created New ${type}: ${name}`);
  }
  return record.id;
}

async function start() {
  console.log('🤖 AI Mechanics & Themes Hydration Protocol Started...');
  
  // Find slots that have no Mechanics, Themes, or Bonuses
  const slots = await prisma.slots.findMany({
    include: {
      providers: true,
      slotThemes: true,
      slot_mechanics: true,
      slot_bonuses: true
    }
  });

  const slotsToHydrate = slots.filter(s => 
     s.slotThemes.length === 0 && 
     s.slot_mechanics.length === 0 && 
     s.slot_bonuses.length === 0
  );

  console.log(`Found ${slotsToHydrate.length} slots missing characteristics!`);

  for (const slot of slotsToHydrate) {
    console.log(`\\n🌀 Processing [${slot.name}] by ${slot.providers.name}...`);
    
    const prompt = `Act as an expert casino slot reviewer. I have a popular online slot named "${slot.name}" developed by "${slot.providers.name}".
Please provide its core Themes, Mechanics, and Bonus Features as concise strings. Try to reuse common casino industry terms.

Output exactly a JSON object:
{
  "themes": ["string"],
  "mechanics": ["string"],
  "bonuses": ["string"]
}

Examples for themes: "Ancient Egypt", "Mythology", "Fruits", "Sweets", "Horror"
Examples for mechanics: "Megaways", "Cluster Pays", "Cascading Reels", "Avalanche", "Pay Anywhere"
Examples for bonuses: "Free Spins", "Multipliers", "Bonus Buy", "Sticky Wilds"
Keep lists to 1-4 standard items maximum.`;

    try {
      const response = await model.generateContent(prompt);
      const outputText = response.response.text();
      const data = JSON.parse(outputText);

      console.log(`   🧠 AI Output:`, data);

      // Hydrate Themes
      if (data.themes && Array.isArray(data.themes)) {
        for (const t of data.themes) {
          const themeId = await findOrCreateFeature('Theme', t, prisma.themes);
          await prisma.slot_themes.create({
             data: { id: crypto.randomUUID(), slot_id: slot.id, theme_id: themeId }
          });
        }
      }

      // Hydrate Mechanics
      if (data.mechanics && Array.isArray(data.mechanics)) {
        for (const m of data.mechanics) {
          const mechId = await findOrCreateFeature('Mechanic', m, prisma.mechanics);
          await prisma.slot_mechanics.create({
             data: { id: crypto.randomUUID(), slot_id: slot.id, mechanic_id: mechId }
          });
        }
      }

      // Hydrate Bonuses
      if (data.bonuses && Array.isArray(data.bonuses)) {
        for (const b of data.bonuses) {
          const bonusId = await findOrCreateFeature('Bonus', b, prisma.bonuses);
          await prisma.slot_bonuses.create({
             data: { id: crypto.randomUUID(), slot_id: slot.id, bonus_id: bonusId }
          });
        }
      }

      console.log(`   ✅ Links established in DB!`);

      // Gentle pause to avoid rate limits (15 RPM limit -> ~4.5 seconds per request required)
      await new Promise(r => setTimeout(r, 5000));
      
    } catch (e) {
       console.error(`   ❌ Failed to process ${slot.name}:`, e.message);
    }
  }
}

start().catch(console.error);
