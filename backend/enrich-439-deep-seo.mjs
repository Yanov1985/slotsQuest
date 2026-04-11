import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const aiModel = "gpt-4o-mini";

// Initialize minimal prisma client to avoid pool exhaustion
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
Include slang, <p> tags, and native translations for all 12 cultural regions.
You MUST reply with ONLY a JSON OBJECT where keys are language codes: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar", "hi", "bn", "sw".
Inside each language object, include exact string keys: "seo_title", "seo_description", "seo_keywords_primary", "seo_keywords_lsi", "overview", "mechanics", "faq", "cta_button", "demo_button".
Do not wrap in markdown tags. Return pure JSON.`;
  
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
             console.log(`⏱️ 429 API Rate Limit Hit! Sleeping for 10 seconds... (Retry ${retries + 1}/3)`);
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
  console.log("🤖 Resuming Resilient 439-Slot AI Enrichment Loop...");

  // Count total for progress
  const total = await prisma.slots.count();
  let cursor = null;
  let batchSize = 10;
  let processed = 0;
  let enriched = 0;
  let skipped = 0;
  
  console.log(`TOTAL DB SLOTS: ${total}`);

  while (true) {
      // Chunked fetching to avoid memory limits and connection stalling
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

          if (local['en'] && local['en'].seo_keywords_lsi) {
              skipped++;
              if(processed % 20 === 0) console.log(`[${processed}/${total}] Skipping already enriched... (Skipped: ${skipped})`);
              continue;
          }

          console.log(`[${processed}/${total}] 🚀 AI SEO Generating for [${slot.name}]...`);
          const payload = await generateGlobalSEO(slot.name, slot.providers?.name || 'Unknown', slot.rtp, slot.max_win);
          
          if (!payload) {
             console.log("⚠️ Generation failed, will retry next run.");
             await new Promise(r => setTimeout(r, 5000));
             continue; // try next
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
          console.log(`✅ Fully SEO Hybridized [${slot.name}]! Waiting 3s API limit...`);
          await new Promise(r => setTimeout(r, 3000));
      }
  }

  console.log(`🎉 RUN COMPLETE! Enriched: ${enriched}, Skipped: ${skipped}`);
}

start().catch(console.error).finally(() => prisma.$disconnect());
