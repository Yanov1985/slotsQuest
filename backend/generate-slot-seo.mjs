import fs from 'fs/promises';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env'), override: true });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Strict JSON Schema for OpenAI Structured Outputs
const schema = {
  type: "object",
  properties: {
    seo_title: { type: "string" },
    seo_description: { type: "string" },
    seo_keywords_primary: { type: "string" },
    seo_keywords_lsi: { type: "string" },
    overview: { type: "string" },
    mechanics: { type: "string" },
    expert_verdict: { type: "string" },
    pros: { type: "array", items: { type: "string" } },
    cons: { type: "array", items: { type: "string" } },
    how_to_play: { type: "array", items: { type: "object", properties: { step: { type: "string" }, text: { type: "string" } }, required: ["step", "text"], additionalProperties: false } },
    faq: { type: "array", items: { type: "object", properties: { question: { type: "string" }, answer: { type: "string" } }, required: ["question", "answer"], additionalProperties: false } },
    reviews: { type: "array", items: { type: "object", properties: { author: { type: "string" }, date: { type: "string" }, rating: { type: "number" }, text: { type: "string" } }, required: ["author", "date", "rating", "text"], additionalProperties: false } },
    cta_button: { type: "string" },
    demo_button: { type: "string" }
  },
  required: [
    "seo_title", "seo_description", "seo_keywords_primary", "seo_keywords_lsi", 
    "overview", "mechanics", "expert_verdict", "pros", "cons", "how_to_play", 
    "faq", "reviews", "cta_button", "demo_button"
  ],
  additionalProperties: false
};

const BASE_LANGUAGES = [
  { code: 'en', name: 'English (UK/Global)' },
  { code: 'pt', name: 'Portuguese (Brazil)' },
  { code: 'tr', name: 'Turkish' },
  { code: 'ru', name: 'Russian' },
  { code: 'es', name: 'Spanish (Latam & Spain)' },
  { code: 'id', name: 'Indonesian' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi (India)' },
  { code: 'bn', name: 'Bengali' },
  { code: 'sw', name: 'Swahili' }
];

async function generateLanguageSEO(slotName, providerName, targetLang) {
  const prompt = `
You are an Elite Semrush SEO Expert specializing in online gambling.
We are creating the ultimate detailed casino review page for the slot "${slotName}" by "${providerName}".
Target Language/Region: ${targetLang.name} (${targetLang.code}).

Generate an extremely detailed, hyper-optimized SEO matrix localized for that specific language and gambling culture. Inject high-volume local search slang ONLY if it naturally belongs to the target language (e.g. do not use Turkish slang for English).

Schema Guide:
- seo_title: Optimized Title Tag (around 60 chars)
- seo_description: Compelling Meta Description (around 150 chars)
- seo_keywords_primary: 3 main focus keywords
- seo_keywords_lsi: 5-7 long-tail LSI keywords separated by commas
- overview: A rich, long-form 2-3 paragraph SEO text describing themes, volatility, and gameplay. Use HTML like <strong> and <br>. Must sound written by a true casino expert.
- mechanics: 1 short paragraph summarizing the game mechanics.
- expert_verdict: A short analytical expert verdict (paragraph with HTML if needed), giving reasons why this slot is good or bad.
- pros: A list of 3-5 pros/advantages in the target language.
- cons: A list of 2-3 cons/disadvantages in the target language.
- how_to_play: A list of 3-5 simple sequential steps (step name and text) on how to play the game, fully localized.
- faq: An array of 3 FAQ Q&A objects (question and answer strings).
- reviews: Generate 3 realistic mock user reviews. Use local-sounding names where possible, date strings like 'May 12, 2023', ratings out of 5, and the review text itself.
- cta_button: A punchy Call To Action for the Real Money play button (e.g. 'Play ${slotName} for Real!')
- demo_button: A Call to action for the Demo play button
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: {
          type: "json_schema",
          json_schema: {
              name: "seo_matrix",
              strict: true,
              schema: schema
          }
      }
    });
    
    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (e) {
    console.error(`     [x] OpenAI Error on ${targetLang.code}:`, e.message);
    return null;
  }
}

function multiplexLanguage(baseMatrix) {
  const geoOutput = {};
  
  const enArray = ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-IE', 'en-NZ', 'en-ZA', 'en-IN', 'en-NG'];
  enArray.forEach(k => geoOutput[k] = baseMatrix['en']);
  
  geoOutput['pt'] = baseMatrix['pt'];
  geoOutput['pt-BR'] = baseMatrix['pt'];
  geoOutput['pt-PT'] = baseMatrix['pt'];
  
  const esArray = ['es', 'es-ES', 'es-MX', 'es-AR', 'es-CL', 'es-CO', 'es-PE', 'es-VE'];
  esArray.forEach(k => geoOutput[k] = baseMatrix['es']);
  
  const frArray = ['fr', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH', 'fr-CI', 'fr-SN'];
  frArray.forEach(k => geoOutput[k] = baseMatrix['fr']);
  
  geoOutput['ar'] = baseMatrix['ar'];
  geoOutput['ar-SA'] = baseMatrix['ar'];
  geoOutput['ar-AE'] = baseMatrix['ar'];
  geoOutput['ar-EG'] = baseMatrix['ar'];
  geoOutput['ar-MA'] = baseMatrix['ar'];
  
  geoOutput['de'] = baseMatrix['de'];
  geoOutput['de-DE'] = baseMatrix['de'];
  geoOutput['de-AT'] = baseMatrix['de'];
  geoOutput['de-CH'] = baseMatrix['de'];
  
  geoOutput['ru'] = baseMatrix['ru'];
  geoOutput['tr'] = baseMatrix['tr'];
  geoOutput['id'] = baseMatrix['id'];
  geoOutput['hi'] = baseMatrix['hi'];
  geoOutput['bn'] = baseMatrix['bn'];
  geoOutput['sw'] = baseMatrix['sw'];
  
  geoOutput['it'] = baseMatrix['en'];
  geoOutput['pl'] = baseMatrix['en'];

  return geoOutput;
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log('Starting SEO Generation Pipeline for New Slots...');
  
  const IN_FILE = 'new-slots-to-import.json';
  const OUT_FILE = 'enriched-slots-to-import.json';
  
  let slots = [];
  try {
    const rawData = await fs.readFile(IN_FILE, 'utf8');
    slots = JSON.parse(rawData);
  } catch (err) {
    console.error(`[x] Could not read ${IN_FILE}: `, err.message);
    process.exit(1);
  }
  
  console.log(`Found ${slots.length} new slots to enrich.`);
  
  // Read existing out file if it exists to resume progress
  let enrichedSlots = [];
  try {
    const existingOut = await fs.readFile(OUT_FILE, 'utf8');
    enrichedSlots = JSON.parse(existingOut);
    console.log(`[OK] Resuming! Found ${enrichedSlots.length} already enriched slots.`);
  } catch (e) {
    // File doesn't exist, start fresh
  }
  
  const processedSlugs = new Set(enrichedSlots.map(s => s.slug));

  for (let slot of slots) {
    if (processedSlugs.has(slot.slug)) {
      console.log(`>> Skipping [${slot.title}] - Already enriched.`);
      continue;
    }

    console.log(`\n==================================================`);
    console.log(`[>>] [${slot.title} / ${slot.provider}] - Initializing LLM...`);
    
    const baseTranslations = {};
    console.log(`   [->] Dispatching Sequential OpenAI workers...`);
    
    // Sequential execution
    for (let lang of BASE_LANGUAGES) {
      console.log(`      ... Generating [${lang.code}] - ${lang.name}`);
      
      let success = false;
      let retries = 3;
      while (retries > 0 && !success) {
        try {
          const data = await generateLanguageSEO(slot.title, slot.provider, lang);
          if (data) {
            baseTranslations[lang.code] = data;
            success = true;
          } else {
            console.log(`      [!] Failed to generate ${lang.code}. Retries left: ${retries - 1}`);
          }
        } catch (e) {
             console.log(`      [!] Error on ${lang.code}: ${e.message}. Retries left: ${retries - 1}`);
             if(e.status === 429) {
                 console.log("      [!] Rate Limit Hit! Sleeping for 15s...");
                 await sleep(15000);
             }
        }
        retries--;
        await sleep(2000); // 2 seconds between retries
      }
    }

    console.log(`   [~] Multiplexing core languages into full GEO locales...`);
    const localizations = multiplexLanguage(baseTranslations);
    
    const enrichedSlot = {
      ...slot,
      localizations
    };
    
    enrichedSlots.push(enrichedSlot);
    
    // Auto-save after every slot
    await fs.writeFile(OUT_FILE, JSON.stringify(enrichedSlots, null, 2));
    console.log(`   [+] Progress saved to ${OUT_FILE}. [${enrichedSlots.length}/${slots.length}]`);
  }

  console.log('\n[DONE] MASSIVE SEO ENRICHMENT COMPLETE!');
}

main().catch(console.error);
