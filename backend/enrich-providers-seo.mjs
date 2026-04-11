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

async function generateProviderSEO(name, country, year) {
  const prompt = `You are an Elite Semrush Casino SEO Expert.
Write identical massive JSON for slot provider "${name}" (Country: ${country || 'Unknown'}, Founded: ${year || 'Unknown'}).
The goal is to rank for "play ${name} slots free" and "${name} casino games".
Include slang, HTML formatting (h2, p, ul, strong), and native translations for all 12 cultural regions.
You MUST reply with ONLY a JSON OBJECT where keys are language codes: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar", "hi", "bn", "sw".
Inside each language object, include exact string keys: 
"seo_title", 
"seo_desc", 
"seo_keywords", 
"content_markdown", 
"faq" (an array of 3 { question, answer } objects),
"pros" (an array of 3 strings),
"cons" (an array of 3 strings).
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
  console.log("🤖 Starting Provider SEO Enrichment Daemon...");

  const total = await prisma.providers.count();
  let processed = 0;
  let enriched = 0;
  let skipped = 0;
  
  console.log(`TOTAL DB PROVIDERS: ${total}`);

  const providers = await prisma.providers.findMany({
      select: { id: true, name: true, country: true, founded_year: true, localizations: true },
      orderBy: { id: 'asc' }
  });

  for (let provider of providers) {
      processed++;
      let local = safeParse(provider.localizations);

      if (local['en'] && local['en'].content_markdown) {
          skipped++;
          console.log(`[${processed}/${total}] Skipping existing provider: ${provider.name}`);
          continue;
      }

      console.log(`[${processed}/${total}] 🚀 AI SEO Generating for Provider [${provider.name}]...`);
      const payload = await generateProviderSEO(provider.name, provider.country, provider.founded_year);
      
      if (!payload) {
         console.log("⚠️ Generation failed, will retry next run.");
         await new Promise(r => setTimeout(r, 5000));
         continue; 
      }

      const finalMatrix = multiplexLanguage(payload);
      for (let code in finalMatrix) {
          local[code] = { ...(local[code] || {}), ...finalMatrix[code] };
      }

      await prisma.providers.update({
          where: { id: provider.id },
          data: { localizations: JSON.stringify(local) }
      });

      enriched++;
      console.log(`✅ Fully SEO Hybridized Provider [${provider.name}]! Waiting 3s API limit...`);
      await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`🎉 RUN COMPLETE! Enriched: ${enriched}, Skipped: ${skipped}`);
}

start().catch(console.error).finally(() => prisma.$disconnect());
