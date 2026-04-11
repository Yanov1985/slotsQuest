import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config({ override: true });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const aiModel = "gpt-4o-mini";
const prisma = new PrismaClient({ log: ['error'] });

function safeParse(str) {
    if (!str) return {};
    if (typeof str !== 'string') return str || {};
    try { return JSON.parse(str); } catch(e) { return {}; }
}

function multiplexLanguage(baseMatrix) {
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

async function generateCategorySEO(name) {
  const prompt = `You are an Elite Casino SEO Content Strategist.
Write identical massive JSON describing the slot category/theme "${name}".
Target ranking for queries like "best ${name} slots", "play ${name} slots free".
Include HTML formatting (h2, p) and native translations for exactly 12 cultural regions.
You MUST reply with ONLY a JSON OBJECT where keys are language codes: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar", "hi", "bn", "sw".
Inside each language object, include exact string keys: 
"seo_title", 
"seo_desc", 
"seo_keywords", 
"content_markdown" (about 200 words explaining the category), 
"faq_json" (an array of 2 { question, answer } objects).
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
        console.error(`❌ OpenAI API Error for ${name}: ${e.message}`);
        if (e.status === 429 || (e.message && e.message.includes('429'))) {
             console.log(`⏱️ 429 Rate Limit. Sleeping for 10 seconds...`);
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
  console.log("🤖 Starting Categories SEO Enrichment Daemon...");

  const categories = await prisma.slot_categories.findMany({
      select: { id: true, name: true, localizations: true },
      orderBy: { name: 'asc' }
  });

  let processed = 0;
  for (let cat of categories) {
      processed++;
      let local = safeParse(cat.localizations);

      if (local['en'] && local['en'].content_markdown) {
          console.log(`[${processed}/${categories.length}] ⏭️ Skipping existing category: ${cat.name}`);
          continue;
      }

      console.log(`[${processed}/${categories.length}] 🚀 AI SEO Generating for Category [${cat.name}]...`);
      const payload = await generateCategorySEO(cat.name);
      
      if (!payload) {
         console.log("⚠️ Generation failed, will retry next run.");
         await new Promise(r => setTimeout(r, 5000));
         continue; 
      }

      const finalMatrix = multiplexLanguage(payload);
      for (let code in finalMatrix) {
          local[code] = { ...(local[code] || {}), ...finalMatrix[code] };
      }

      await prisma.slot_categories.update({
          where: { id: cat.id },
          data: { localizations: JSON.stringify(local) }
      });

      console.log(`✅ Fully SEO Hybridized Category [${cat.name}]! Waiting 3s...`);
      await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`🎉 CATEGORIES ENRICHMENT RUN COMPLETE!`);
}

start().catch(console.error).finally(() => prisma.$disconnect());
