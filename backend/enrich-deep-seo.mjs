import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config({ override: true });

const prisma = new PrismaClient();
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

async function scrapeReview(providerSlug, slotSlug) {
  const url = `https://clashofslots.com/slots/${providerSlug}/${slotSlug}/`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const html = await res.text();
    const $ = cheerio.load(html);
    const paragraphs = [];
    $('.slot_header_text_wrap p, .entry-content p, .entry-content ul').each((i, el) => {
        const text = $(el).text().trim();
        if (text.length > 30) paragraphs.push(text);
    });
    return paragraphs.join('\\n\\n');
  } catch (e) {
    return null;
  }
}

async function generateLanguageSEO(slotName, providerName, reviewText, targetLang) {
  const prompt = `
You are an Elite Semrush SEO Expert specializing in online gambling.
We are creating the ultimate detailed casino review page for the slot "${slotName}" by "${providerName}".
Target Language/Region: ${targetLang.name} (${targetLang.code}).

Based on the original English review text provided below, generate an extremely detailed, hyper-optimized SEO matrix localized for that specific language and gambling culture. Inject high-volume local search slang ONLY if it naturally belongs to the target language (e.g. do not use Turkish slang for English).

Schema Guide:
- seo_title: Optimized Title Tag (around 60 chars)
- seo_description: Compelling Meta Description (around 150 chars)
- seo_keywords_primary: 3 main focus keywords
- seo_keywords_lsi: 5-7 long-tail LSI keywords separated by commas
- overview: A rich, long-form 2-3 paragraph SEO text describing themes, volatility, and gameplay. Use HTML like <strong> and <br>. Must sound written by a true casino expert.
- mechanics: 1 short paragraph summarizing the Tumble/Megaways/Free Spins features.
- expert_verdict: A short analytical expert verdict (paragraph with HTML if needed), giving reasons why this slot is good or bad.
- pros: A list of 3-5 pros/advantages in the target language.
- cons: A list of 2-3 cons/disadvantages in the target language.
- how_to_play: A list of 3-5 simple sequential steps (step name and text) on how to play the game, fully localized.
- faq: An array of 3 FAQ Q&A objects (question and answer strings).
- reviews: Generate 3 realistic mock user reviews. Use local-sounding names where possible, date strings like 'May 12, 2023', ratings out of 5, and the review text itself.
- cta_button: A punchy Call To Action for the Real Money play button (e.g. 'Play ${slotName} for Real!')
- demo_button: A Call to action for the Demo play button

ORIGINAL ENGLISH REVIEW CONTEXT:
${reviewText ? reviewText.substring(0, 3000) : `Detailed information about the slot ${slotName} by ${providerName}. It is a highly popular online casino game.`}
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
    console.error(`     ❌ OpenAI Error on ${targetLang.code}:`, e.message);
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

async function start() {
  console.log('🤖 Starting Enterprise Deep-Text LLM SEO Engine (Google Gemini)...');
  
  const slots = await prisma.slots.findMany({ 
      include: { providers: true }
  });
  console.log(`Found ${slots.length} slots in DB.`);

  for (let slot of slots) {
    // Only target those we recently added and lack a deep overview localized text
    let existingRaw = slot.localizations || {};
    let existingJson = typeof existingRaw === 'string' ? JSON.parse(existingRaw) : existingRaw;
    
    // Check if it already has deep SEO content (e.g., faq is present).
    if (existingJson['en'] && existingJson['en'].faq && Array.isArray(existingJson['en'].faq) && existingJson['en'].faq.length > 0) {
        console.log(`⏩ Skipping [${slot.name}] - Already has deep SEO content.`);
        continue;
    }

    console.log(`\\n==================================================`);
    console.log(`🌀 [${slot.name}] - Initializing SEO Scraper & LLM...`);
    
    let reviewText = await scrapeReview(slot.providers.slug, slot.slug);
    if (!reviewText) {
        console.log(`   ⚠️ Could not scrape full review. Failing back to generative template.`);
    } else {
        console.log(`   ✅ Extracted ${reviewText.length} characters of raw source material.`);
    }

    const baseTranslations = {};
    
    console.log(`   🚀 Dispatching 12 Sequential Gemini workers (15 RPM Safe Limit)...`);
    
    // Sequential execution to perfectly respect 15 RPM
    for (let lang of BASE_LANGUAGES) {
      console.log(`      ... Generating [${lang.code}] - ${lang.name}`);
      const data = await generateLanguageSEO(slot.name, slot.providers.name, reviewText, lang);
      if (data) baseTranslations[lang.code] = data;
      // Sleep 4.5 seconds to ensure we do not exceed 15 RPM (60 / 4.5 = 13 RPM max)
      await sleep(4500);
    }

    console.log(`   🧬 Multiplexing 12 core languages into 52 GEO locales...`);
    const finalGeoMatrix = multiplexLanguage(baseTranslations);
    
    for (let localeKey in finalGeoMatrix) {
        if (!finalGeoMatrix[localeKey]) continue;
        
        existingJson[localeKey] = {
            ...existingJson[localeKey],
            ...finalGeoMatrix[localeKey]
        };
    }

    console.log(`   💾 Injecting Deep JSON into PostgreSQL...`);
    await prisma.slots.update({
        where: { id: slot.id },
        data: { localizations: existingJson }
    });
    
    console.log(`   🏆 SUCCESS! Slot [${slot.name}] is now fully optimized with massive native SEO.`);
  }

  console.log('\\n🚀🚀 MASSIVE DEEP-TEXT ENRICHMENT COMPLETE! 🚀🚀');
}

start().catch(console.error);
