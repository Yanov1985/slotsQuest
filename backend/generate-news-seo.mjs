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

async function generateNewsSEO(title, content) {
  const prompt = `You are a Global Gambling News Editor.
Translate and localize this news "title: ${title}" and "content: ${content}" for 52 GEOs.
Include catchy SEO titles and meta descriptions.
Use HTML for the content (h2, p, strong).
You MUST reply with ONLY a JSON OBJECT where keys are language codes: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar".
Inside each language object, include exact string keys: 
"seo_title", 
"seo_desc", 
"content_markdown" (localized full article).`;

  try {
    const completion = await openai.chat.completions.create({
      model: aiModel,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content);
  } catch (err) {
    console.error(`❌ OpenAI Error for ${title}:`, err.message);
    return null;
  }
}

async function start() {
  console.log('🤖 Starting News SEO Enrichment Daemon (Phase 5)...');
  await client.connect();

  const res = await client.query(`SELECT * FROM news WHERE localizations IS NULL OR localizations = '{}'::jsonb`);
  console.log(`TOTAL PENDING NEWS: ${res.rows.length}`);

  for (const n of res.rows) {
    console.log(`🚀 Localizing News [${n.title}]...`);
    const seoMatrix = await generateNewsSEO(n.title, n.content_markdown);
    if (seoMatrix) {
      const fullGeoMatrix = multiplexLanguage(seoMatrix);
      const firstLang = seoMatrix.en || Object.values(seoMatrix)[0];
      await client.query(
        `UPDATE news SET localizations = $1, seo_title = $2, seo_desc = $3, content_markdown = $4, updated_at = NOW() WHERE id = $5`,
        [JSON.stringify(fullGeoMatrix), firstLang.seo_title, firstLang.seo_desc, firstLang.content_markdown, n.id]
      );
      console.log(`✅ Localized: ${n.title}`);
    }
  }

  console.log('🎉 NEWS RUN COMPLETE!');
  await client.end();
}

start().catch(console.error);
