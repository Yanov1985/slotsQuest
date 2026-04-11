import OpenAI from 'openai';
import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv';
dotenv.config({ override: true });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const aiModel = "gpt-4o-mini";

// Direct PG client for efficiency since we are in a daemon
const client = new Client({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL
});

function safeParse(str) {
    if (!str) return {};
    try { return typeof str === 'string' ? JSON.parse(str) : str; } catch(e) { return {}; }
}

function multiplexLanguage(baseMatrix) {
    const geoOutput = {};
    const map = {
        'en': ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-IE', 'en-NZ', 'en-ZA', 'en-IN', 'en-NG', 'it', 'pl', 'hi', 'bn', 'sw'],
        'pt': ['pt', 'pt-BR', 'pt-PT'],
        'es': ['es', 'es-ES', 'es-MX', 'es-AR', 'es-CL', 'es-CO', 'es-PE', 'es-VE'],
        'fr': ['fr', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH', 'fr-CI', 'fr-SN'],
        'ar': ['ar', 'ar-SA', 'ar-AE', 'ar-EG', 'ar-MA'],
        'de': ['de', 'de-DE', 'de-AT', 'de-CH'],
        'ru': ['ru'], 'tr': ['tr'], 'id': ['id']
    };
    for (const source in map) {
        if (!baseMatrix[source]) continue;
        for (const target of map[source]) geoOutput[target] = baseMatrix[source];
    }
    return geoOutput;
}

async function generatePromoSEO(title, type, amount, casinoName) {
  const prompt = `You are a Senior Gambling Affiliate SEO Content Creator.
Write high-converting massive JSON for promotion "${title}" (Type: ${type}, Amount: ${amount}) at Casino "${casinoName}".
The goal is to rank for "${casinoName} ${type} bonus" and "${casinoName} promo code".
Focus on "how to claim", wagering requirements, and value for the player.
Use HTML tags (h2, p, strong, ul, li).
You MUST reply with ONLY a JSON OBJECT where keys are language codes: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar".
Inside each language object, include exact string keys: 
"seo_title", 
"seo_desc", 
"seo_keywords", 
"content_markdown", 
"faq" (array of 3 { question, answer }),
"steps" (array of 3 strings on how to claim).`;

  try {
    const completion = await openai.chat.completions.create({
      model: aiModel,
      messages: [
        { role: "system", content: "You output valid JSON only." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content);
  } catch (err) {
    console.error(`❌ OpenAI API Error for ${title}:`, err.message);
    return null;
  }
}

async function start() {
  console.log('🤖 Starting Promotions SEO Enrichment Daemon (Phase 5)...');
  await client.connect();

  const res = await client.query(`
    SELECT p.*, c.name as casino_name 
    FROM promotions p
    JOIN casinos c ON p.casino_id = c.id
    WHERE p.localizations IS NULL OR p.localizations = '{}'::jsonb
  `);
  
  console.log(`TOTAL PENDING PROMOS: ${res.rows.length}`);

  for (let i = 0; i < res.rows.length; i++) {
    const p = res.rows[i];
    console.log(`[${i+1}/${res.rows.length}] 🚀 AI SEO Generating for Promo [${p.title}]...`);

    const seoMatrix = await generatePromoSEO(p.title, p.promo_type, p.amount, p.casino_name);
    
    if (seoMatrix) {
      const fullGeoMatrix = multiplexLanguage(seoMatrix);
      const firstLang = seoMatrix.en || seoMatrix.ru || Object.values(seoMatrix)[0];
      
      await client.query(
        `UPDATE promotions SET 
            localizations = $1, 
            seo_title = $2, 
            seo_desc = $3, 
            content_markdown = $4,
            updated_at = NOW() 
         WHERE id = $5`,
        [
          JSON.stringify(fullGeoMatrix),
          firstLang.seo_title,
          firstLang.seo_desc,
          firstLang.content_markdown,
          p.id
        ]
      );
      console.log(`✅ Enriched: ${p.title}`);
    } else {
      console.log(`⚠️ Generation failed for ${p.title}, will retry next run.`);
    }
  }

  console.log('🎉 PROMOTIONS RUN COMPLETE!');
  await client.end();
}

start().catch(console.error);
