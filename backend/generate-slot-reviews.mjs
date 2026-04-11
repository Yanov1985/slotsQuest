import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config({ override: true });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const aiModel = "gpt-4o-mini";
const prisma = new PrismaClient({ log: ['error'] });

function multiplexLanguageArray(baseMatrix) {
    const geoOutput = {};
    const map = {
        'en': ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-IE', 'en-NZ', 'en-ZA', 'en-IN', 'en-NG', 'it', 'pl'],
        'pt': ['pt', 'pt-BR', 'pt-PT'],
        'es': ['es', 'es-ES', 'es-MX', 'es-AR', 'es-CL', 'es-CO', 'es-PE', 'es-VE'],
        'fr': ['fr', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH', 'fr-CI', 'fr-SN'],
        'ar': ['ar', 'ar-SA', 'ar-AE', 'ar-EG', 'ar-MA'],
        'de': ['de', 'de-DE', 'de-AT', 'de-CH'],
        'ru': ['ru'], 'tr': ['tr'], 'id': ['id'], 'hi': ['hi'], 'bn': ['bn'], 'sw': ['sw']
    };
    
    for (const source in map) {
        if (!baseMatrix[source]) continue;
        for (const target of map[source]) {
            geoOutput[target] = baseMatrix[source];
        }
    }
    return geoOutput;
}

async function generateSimulatedReviews(slotName, providerName) {
  const prompt = `You are a real player community.
Generate 5 realistic, opinionated user reviews for the casino slot game "${slotName}" by "${providerName}".
Make them sound like real gamblers (mentioning volatility, graphics, near misses, or big wins).
Translate these exactly into 12 languages: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar", "hi", "bn", "sw".
You MUST reply with ONLY a valid JSON OBJECT where keys are language codes.
Inside each language object, return an array of 5 objects: {"author": "John D.", "rating": 5, "text": "...", "likes": 12}.
Ratings should be between 3 and 5.
Do not wrap in markdown block tags. Return pure valid JSON.`;
  
  let retries = 0;
  while (retries < 3) {
      try {
        const response = await openai.chat.completions.create({
            model: aiModel,
            response_format: { type: "json_object" },
            messages: [{ role: "user", content: prompt }]
        });
        const text = response.choices[0].message.content;
        return JSON.parse(text);
      } catch (e) {
        console.error(`❌ OpenAI API Error for ${slotName}: ${e.message}`);
        if (e.status === 429 || (e.message && e.message.includes('429'))) {
             console.log(`⏱️ 429 API Rate Limit! Sleeping for 10s...`);
             await new Promise(r => setTimeout(r, 10000));
             retries++;
        } else {
             return null;
        }
      }
  }
  return null;
}

async function start() {
  console.log("🤖 Starting Simulated Reviews Daemon...");
  
  // We will run this for the top 50 slots first
  const slots = await prisma.slots.findMany({
      where: {
          slot_reviews: {
              none: {}
          }
      },
      orderBy: { popularity_rank: 'asc' }, 
      select: { id: true, name: true, providers: { select: { name: true } } }
  });

  let processed = 0;
  for (let slot of slots) {
      processed++;
      
      console.log(`[${processed}/${slots.length}] 🚀 Generating 260 Global Reviews for [${slot.name}]...`);
      const payload = await generateSimulatedReviews(slot.name, slot.providers?.name || 'Unknown');
      
      if (!payload) {
         console.log("⚠️ Generation failed, moving to next.");
         await new Promise(r => setTimeout(r, 5000));
         continue; 
      }

      const geoReviews = multiplexLanguageArray(payload);
      
      const insertData = [];
      for (const lang in geoReviews) {
          const reviewsArray = geoReviews[lang];
          if (Array.isArray(reviewsArray)) {
              for (const r of reviewsArray) {
                  insertData.push({
                      slot_id: slot.id,
                      author_name: r.author || 'Player',
                      rating: r.rating || 5,
                      text: r.text || 'Great game!',
                      likes: r.likes || 0,
                      language: lang
                  });
              }
          }
      }

      if (insertData.length > 0) {
          await prisma.slot_reviews.createMany({ data: insertData });
          console.log(`✅ Inserted ${insertData.length} localized reviews for [${slot.name}]! Waiting 5s...`);
      }
      
      await new Promise(r => setTimeout(r, 5000));
  }

  console.log(`🎉 REVIEWS GENERATION RUN COMPLETE!`);
}

start().catch(console.error).finally(() => prisma.$disconnect());
