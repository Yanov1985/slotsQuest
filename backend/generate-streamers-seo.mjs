import OpenAI from 'openai';
import pkg from 'pg';
const { Client } = pkg;
import * as dotenv from 'dotenv';
dotenv.config({ override: true });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const aiModel = "gpt-4o-mini";

const client = new Client({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL
});

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

async function generateStreamerSEO(name, bio) {
  const prompt = `You are an Expert Casino Streamer Journalist.
Translate and localize this streamer bio "name: ${name}" and "bio: ${bio}" for 52 GEOs.
Include SEO titles (e.g., "${name} Kick Channel & Big Wins") and descriptions.
Use HTML for the bio (p, strong).
You MUST reply with ONLY a JSON OBJECT where keys are language codes: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar".
Inside each language object, include exact string keys: 
"seo_title", 
"seo_desc", 
"bio_markdown" (localized bio).`;

  try {
    const completion = await openai.chat.completions.create({
      model: aiModel,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content);
  } catch (err) {
    console.error(`❌ OpenAI Error for ${name}:`, err.message);
    return null;
  }
}

async function start() {
  console.log('🤖 Starting Streamers SEO Enrichment Daemon (Phase 5)...');
  await client.connect();

  const res = await client.query(`SELECT * FROM streamers WHERE localizations IS NULL OR localizations = '{}'::jsonb`);
  console.log(`TOTAL PENDING STREAMERS: ${res.rows.length}`);

  for (const s of res.rows) {
    console.log(`🚀 Localizing Streamer [${s.name}]...`);
    const seoMatrix = await generateStreamerSEO(s.name, s.bio_markdown);
    if (seoMatrix) {
      const fullGeoMatrix = multiplexLanguage(seoMatrix);
      const firstLang = seoMatrix.en || Object.values(seoMatrix)[0];
      await client.query(
        `UPDATE streamers SET localizations = $1, seo_title = $2, seo_desc = $3, bio_markdown = $4, updated_at = NOW() WHERE id = $5`,
        [JSON.stringify(fullGeoMatrix), firstLang.seo_title, firstLang.seo_desc, firstLang.bio_markdown, s.id]
      );
      console.log(`✅ Localized: ${s.name}`);
    }
  }

  console.log('🎉 STREAMERS RUN COMPLETE!');
  await client.end();
}

start().catch(console.error);
