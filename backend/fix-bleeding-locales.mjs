import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env', override: true });

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const turkishKeywords = [' hilesi ', ' taktikleri ', ' oyna ', ' bedava ', ' nasil oynanir ', ' avantajlari ', ' dezavantajlari '];

const LOCALE_NAMES = {
    'pt': 'Portuguese',
    'pt-BR': 'Portuguese (Brazil)',
    'pt-PT': 'Portuguese (Portugal)',
    'sw': 'Swahili',
    'bn': 'Bengali'
};

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

async function generateLanguageSEO(slotName, providerName, englishTranslationJSON, targetLangCode) {
  const targetName = LOCALE_NAMES[targetLangCode] || targetLangCode;
  
  const prompt = `You are an Elite SEO Translator for online casinos.
We have an extremely detailed English SEO matrix for the slot "${slotName}" by "${providerName}".
Your task is to perfectly TRAnSLATE and LOCALIZE this JSON into ${targetName} (${targetLangCode}).

CRITICAL MANDATORY INSTRUCTION: DO NOT USE TURKISH SLANG OR TURKISH WORDS IN THIS GENERATION. DO NOT USE WORDS LIKE "taktikleri", "hilesi", "oyna", "bedava". THIS IS ${targetName}, SO USE ${targetName} NATIVE GAMBLING TERMS ONLY.

Schema Guide: Translate ALL values strictly into ${targetName}, except for the provider name or slot name which should remain globally recognizable. 
Return the exact same JSON keys matching the schema.

ENGLISH SOURCE JSON:
${JSON.stringify(englishTranslationJSON, null, 2)}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: {
          type: "json_schema",
          json_schema: { name: "seo_matrix", strict: true, schema: schema }
      }
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (e) {
    console.error(`     ❌ OpenAI Error:`, e.message);
    return null;
  }
}

async function start() {
  console.log('🤖 Fixing Turkish bleeding in secondary locales...');
  const slots = await prisma.slots.findMany({ include: { providers: true } });
  
  let corrupted = [];
  
  for (let slot of slots) {
    if (!slot.localizations) continue;
    const l = typeof slot.localizations === 'string' ? JSON.parse(slot.localizations) : slot.localizations;

    const locales = Object.keys(l);
    if (!locales.includes('en')) continue;

    let badLocales = [];
    for (let loc of locales) {
      if (loc === 'tr') continue; 
      const dataStr = JSON.stringify(l[loc]).toLowerCase();
      
      for (let keyword of turkishKeywords) {
        if (dataStr.includes(keyword)) {
          if (!badLocales.includes(loc)) badLocales.push(loc);
        }
      }
    }
    
    if (badLocales.length > 0) {
      corrupted.push({ slot, badLocales, sourceEn: l['en'] });
    }
  }

  console.log(`Found ${corrupted.length} slots with Turkish bleeding in secondary locales.`);

  let p = 0;
  for (let item of corrupted) {
    p++;
    let { slot, badLocales, sourceEn } = item;
    
    let existingRaw = slot.localizations || {};
    let existingJson = typeof existingRaw === 'string' ? JSON.parse(existingRaw) : existingRaw;
    
    console.log(`[${p}/${corrupted.length}] 🌀 Scrubbing [${slot.name}]... Bad Locales: ${badLocales.join(', ')}`);
    
    for (let loc of badLocales) {
      console.log(`     -> Generating clean ${loc} localization...`);
      const cleanData = await generateLanguageSEO(slot.name, slot.providers.name, sourceEn, loc);
      if (!cleanData) {
          console.log(`     ❌ Failed to generate ${loc}. Skipping.`);
          continue;
      }
      existingJson[loc] = { ...existingJson[loc], ...cleanData };
      console.log(`     ✅ Success for ${loc}!`);
      await new Promise(r => setTimeout(r, 1500));
    }

    await prisma.slots.update({
        where: { id: slot.id },
        data: { localizations: JSON.stringify(existingJson) } 
    });
    
    console.log(`   🏆 Updated ${slot.name} securely!`);
  }
  console.log('DONE!');
}

start().catch(console.error).finally(() => prisma.$disconnect());
