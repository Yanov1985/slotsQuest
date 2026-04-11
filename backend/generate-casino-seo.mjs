import OpenAI from 'openai';
import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv';
dotenv.config({ override: true });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const aiModel = "gpt-4o-mini";
const dbClient = new Client({ connectionString: process.env.DATABASE_URL });

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

async function generateCasinoSEO(name) {
  const prompt = `You are an Elite Casino SEO Expert.
Write a massive, expert SEO review for casino brand "${name}".
The goal is to rank for "is ${name} safe", "${name} bonus promo code", and "${name} casino review".
Include slang (RTP, Wagering, KYC, Fast Payouts), HTML formatting (h2, p, ul, strong), and native translations for all 1 regions.
You MUST reply with ONLY a JSON OBJECT where keys are language codes: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar", "hi", "bn", "sw".
Inside each language object, include exact string keys: 
"seo_title", 
"seo_desc", 
"content_markdown", 
"faq_json" (an array of 3 { question, answer } objects),
"pros_cons_json" (an object with { pros: [3 strings], cons: [3 strings] }).
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
  console.log("🤖 Starting Casino SEO Enrichment Daemon (Phase 5)...");
  await dbClient.connect();

  const res = await dbClient.query(`SELECT id, name, localizations FROM casinos 
    WHERE localizations IS NULL OR localizations = '{}'::jsonb 
    OR NOT (localizations ? 'en') 
    ORDER BY id ASC`);
  const casinos = res.rows;
  const total = casinos.length;
  let processed = 0;
  let enriched = 0;
  
  console.log(`TOTAL PENDING CASINOS: ${total}`);

  for (let casino of casinos) {
      processed++;
      let local = safeParse(casino.localizations);

      console.log(`[${processed}/${total}] 🚀 AI SEO Generating for Casino [${casino.name}]...`);
      const payload = await generateCasinoSEO(casino.name);
      
      if (!payload) {
         console.log("⚠️ Generation failed, will retry next run.");
         await new Promise(r => setTimeout(r, 5000));
         continue; 
      }

      const finalMatrix = multiplexLanguage(payload);
      for (let code in finalMatrix) {
          local[code] = { ...(local[code] || {}), ...finalMatrix[code] };
      }

      await dbClient.query(
        'UPDATE casinos SET localizations = $1, updated_at = NOW() WHERE id = $2',
        [JSON.stringify(local), casino.id]
      );

      enriched++;
      console.log(`✅ Fully SEO Hybridized Casino [${casino.name}]! Waiting 3s...`);
      await new Promise(r => setTimeout(r, 3000));
  }

  await dbClient.end();
  console.log(`🎉 RUN COMPLETE! Enriched: ${enriched}`);
}

start().catch(console.error);
