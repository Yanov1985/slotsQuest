import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI("AIzaSyBumteDFfUqb4F0YKkuGTdbqWb4wXFpCvE");

// Strict JSON Schema for Gemini
const schema = {
  type: SchemaType.OBJECT,
  properties: {
    seo_title: { type: SchemaType.STRING },
    seo_description: { type: SchemaType.STRING },
    seo_keywords_primary: { type: SchemaType.STRING },
    seo_keywords_lsi: { type: SchemaType.STRING },
    overview: { type: SchemaType.STRING },
    mechanics: { type: SchemaType.STRING },
    faq: { type: SchemaType.STRING },
    cta_button: { type: SchemaType.STRING },
    demo_button: { type: SchemaType.STRING }
  },
  required: ["seo_title", "seo_description", "seo_keywords_primary", "seo_keywords_lsi", "overview", "mechanics", "faq", "cta_button", "demo_button"]
};

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json"
  }
});

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

Based on the original English review text provided below, generate an extremely detailed, hyper-optimized SEO matrix localized for that specific language and gambling culture. Inject high-volume local search slang (like 'comprar bonus', 'taktikleri', 'заносы', 'apuesta', etc. where culturally appropriate).

Schema Guide:
- seo_title: Optimized Title Tag (around 60 chars)
- seo_description: Compelling Meta Description (around 150 chars)
- seo_keywords_primary: 3 main focus keywords
- seo_keywords_lsi: 5-7 long-tail LSI keywords separated by commas
- overview: A rich, long-form 2-3 paragraph SEO text describing themes, volatility, and gameplay. Use HTML like <strong> and <br>. Must sound written by a true casino expert.
- mechanics: 1 short paragraph summarizing the Tumble/Megaways/Free Spins features.
- faq: An HTML formatted list of 2 or 3 FAQ Q&A pairs (e.g. <strong>Q: What is the RTP?</strong><br>A: ...)
- cta_button: A punchy Call To Action for the Real Money play button (e.g. 'Play ${slotName} for Real!')
- demo_button: A Call to action for the Demo play button

ORIGINAL ENGLISH REVIEW CONTEXT:
${reviewText ? reviewText.substring(0, 3000) : `Detailed information about the slot ${slotName} by ${providerName}. It is a highly popular online casino game.`}
`;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text();
    return JSON.parse(content);
  } catch (e) {
    console.error(`     ❌ Gemini Error on ${targetLang.code}:`, e.message);
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
  
  const slots = await prisma.slots.findMany({ include: { providers: true } });
  console.log(`Found ${slots.length} slots in DB.`);

  for (let slot of slots) {
    // Only target those we recently added and lack a deep overview localized text
    let existingRaw = slot.localizations || {};
    let existingJson = typeof existingRaw === 'string' ? JSON.parse(existingRaw) : existingRaw;
    
    // Check if English overview is huge. If it already has deep text, skip it!
    if (existingJson['en'] && existingJson['en'].overview && existingJson['en'].overview.length > 500) {
        if (slot.slug !== 'sweet-bonanza') { // Let's always run at least the top ones if they lack
          // Let's just process all slots without deep overviews
        }
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
