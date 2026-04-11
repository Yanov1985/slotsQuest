import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { responseMimeType: "application/json" } });

const prisma = new PrismaClient({ log: ['error'] });

function safeParse(str) {
    if (typeof str !== 'string') return str || {};
    try { return JSON.parse(str || '{}'); } catch(e) { return {}; }
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
        for (const target of map[source]) {
            geoOutput[target] = baseMatrix[source];
        }
    }
    return geoOutput;
}

async function generateGlobalSEO(slotName, providerName, rtp, maxWin) {
  const prompt = `You are an Elite Semrush SEO Expert.
Write identical massive JSON for slot "${slotName}" by "${providerName}".
RTP: ${rtp}%, Max Win: ${maxWin}x.
Include slang, HTML formatting with bold tags, and native translations for all 12 cultural regions.
Reply with ONLY a JSON OBJECT where keys are language codes: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar", "hi", "bn", "sw".
Inside each language object, include exact specific structure:
{
  "seo_title": "string",
  "seo_description": "string",
  "seo_keywords_primary": "string",
  "seo_keywords_lsi": "string",
  "overview": "string (5-6 sentence promotional review with <p> and <strong> tags)",
  "mechanics": "string (explains core features)",
  "expert_verdict": "string",
  "pros": ["string", "string", "string"],
  "cons": ["string", "string"],
  "faq": [{"q": "string", "a": "string"}],
  "reviews": [{"author": "string", "date": "string", "rating": 5, "text": "string"}],
  "cta_button": "string",
  "demo_button": "string"
}
Do not wrap in markdown tags. Return pure JSON.`;
  
  let retries = 0;
  while (retries < 3) {
      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return JSON.parse(text);
      } catch (e) {
        console.error(`❌ Gemini API Error for ${slotName}: ${e.message}`);
        console.log(`⏱️ API Error! Sleeping for 5 seconds... (Retry ${retries + 1}/3)`);
        await new Promise(r => setTimeout(r, 5000));
        retries++;
      }
  }
  return null;
}

async function start() {
  console.log("🤖 Starting Gemini-Powered 439-Slot AI Enrichment Loop...");
  const total = await prisma.slots.count();
  let cursor = null;
  let batchSize = 5;
  let processed = 0;
  let enriched = 0;
  let skipped = 0;
  
  console.log(`TOTAL DB SLOTS: ${total}`);

  while (true) {
      const slots = await prisma.slots.findMany({
          take: batchSize,
          ...(cursor && { skip: 1, cursor: { id: cursor } }),
          select: { id: true, name: true, rtp: true, max_win: true, localizations: true, providers: { select: { name: true } } },
          orderBy: { id: 'asc' }
      });

      if (slots.length === 0) break;
      cursor = slots[slots.length-1].id;

      for (let slot of slots) {
          processed++;
          let local = safeParse(slot.localizations);

          if (local['ru'] && local['ru'].overview) {
              skipped++;
              if(processed % 20 === 0) console.log(`[${processed}/${total}] Skipping already enriched... (Skipped: ${skipped})`);
              continue;
          }

          console.log(`[${processed}/${total}] 🚀 AI SEO Generating for [${slot.name}]...`);
          const payload = await generateGlobalSEO(slot.name, slot.providers?.name || 'Unknown', slot.rtp, slot.max_win);
          
          if (!payload) {
             console.log("⚠️ Generation failed, will retry next run.");
             continue;
          }

          const finalMatrix = multiplexLanguage(payload);
          for (let code in finalMatrix) {
              local[code] = { ...(local[code] || {}), ...finalMatrix[code] };
          }

          await prisma.slots.update({
              where: { id: slot.id },
              data: { localizations: JSON.stringify(local) }
          });

          enriched++;
          console.log(`✅ Fully SEO Hybridized [${slot.name}]!`);
          await new Promise(r => setTimeout(r, 1000));
      }
  }

  console.log(`🎉 RUN COMPLETE! Enriched: ${enriched}, Skipped: ${skipped}`);
}

start().catch(console.error).finally(() => prisma.$disconnect());
