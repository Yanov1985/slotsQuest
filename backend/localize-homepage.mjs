import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const aiModel = "gpt-4o-mini";

const prisma = new PrismaClient();

const CORE_LANGS = [
    { code: 'ru', name: 'Russian' },
    { code: 'es', name: 'Spanish' },
    { code: 'pt', name: 'Portuguese (Brazilian focus)' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ar', name: 'Arabic' },
    { code: 'tr', name: 'Turkish' },
    { code: 'id', name: 'Indonesian' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'sw', name: 'Swahili' },
    { code: 'it', name: 'Italian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'th', name: 'Thai' }
];

function multiplexLanguage(locCode, payload, existingLocalizations) {
    const geoOutput = { ...existingLocalizations };
    const map = {
        'pt': ['pt', 'pt-BR', 'pt-PT', 'pt-AO', 'pt-MZ'],
        'es': ['es', 'es-ES', 'es-MX', 'es-AR', 'es-CL', 'es-CO', 'es-PE', 'es-VE'],
        'fr': ['fr', 'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH', 'fr-CI', 'fr-SN', 'fr-LU', 'fr-MA'],
        'ar': ['ar', 'ar-SA', 'ar-AE', 'ar-EG', 'ar-MA', 'ar-DZ'],
        'de': ['de', 'de-DE', 'de-AT', 'de-CH'],
        'ru': ['ru', 'ru-BY', 'ru-KZ', 'ru-RU', 'uk-UA'],
        'tr': ['tr'],
        'id': ['id', 'id-ID', 'ms-MY'],
        'hi': ['hi', 'hi-IN', 'bn-IN', 'te-IN'],
        'bn': ['bn'], 'sw': ['sw'],
        'it': ['it', 'it-IT', 'it-CH'],
        'zh': ['zh', 'zh-CN', 'zh-HK', 'zh-SG', 'zh-TW'],
        'ja': ['ja', 'ja-JP'],
        'vi': ['vi', 'vi-VN'],
        'th': ['th', 'th-TH']
    };
    
    const targets = map[locCode] || [locCode];
    for (const target of targets) {
        geoOutput[target] = { ...(geoOutput[target] || {}), ...payload };
    }
    return geoOutput;
}

async function translatePayload(langName, sourcePayload) {
  const prompt = `You are an elite native ${langName} SEO copywriter and Casino Expert.
Translate and localize the following JSON payload representing our Casino Homepage into perfectly fluent, native ${langName}.
Keep all HTML formatting, icons, and JSON keys identically named. 
Adapt slang where necessary to fit the target casino demographic (e.g. maxwins, rtp, slots, bonus buy).
You MUST reply with ONLY a JSON OBJECT representing the translated payload. Do not wrap in markdown tags. Return pure JSON.

Source JSON:
${JSON.stringify(sourcePayload, null, 2)}
`;

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
        console.error(`❌ OpenAI API Error for ${langName}: ${e.message}`);
        if (e.status === 429 || e.message.includes('429')) {
             console.log(`⏱️ Rate limit hit. Waiting 10 seconds before retry ${retries + 1}/3...`);
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
  console.log("🤖 Commencing Exclusive Homepage Iterative Localization...");
  
  const page = await prisma.pages.findUnique({ where: { slug: 'home' } });
  if (!page) { console.log("Home page not found"); return; }

  let localizations = typeof page.localizations === 'string' ? JSON.parse(page.localizations) : (page.localizations || {});

  // Construct the ideal English Source Payload
  const sourcePayload = {
      hero_title: page.hero_title || 'SlotQuest Catalog',
      hero_desc: page.hero_desc || 'The best online slots simulator',
      seo_title: page.seo_title || 'Best Online Slots Rating 2026',
      seo_desc: page.seo_desc || 'Discover the most popular online slots...',
      seo_keywords_primary: page.seo_keywords_primary || '',
      seo_keywords_lsi: page.seo_keywords_lsi || '',
      seo_keywords_longtail: page.seo_keywords_longtail || '',
      og_title: page.og_title || '',
      og_desc: page.og_desc || '',
      footer_description: page.footer_description || '',
      fast_filters: typeof page.fast_filters === 'string' ? JSON.parse(page.fast_filters || '[]') : (page.fast_filters || []),
      content: typeof page.content === 'string' ? JSON.parse(page.content || '[]') : (page.content || []),
      seo_keywords_list: typeof page.seo_keywords_list === 'string' ? JSON.parse(page.seo_keywords_list || '[]') : (page.seo_keywords_list || [])
  };

  for (const lang of CORE_LANGS) {
      if (localizations[lang.code]) {
          console.log(`✅ ${lang.name} already localized. Skipping...`);
          continue;
      }
      console.log(`\\n🌍 Localizing into [${lang.name}]...`);
      
      const translated = await translatePayload(lang.name, sourcePayload);
      if (!translated) {
          console.log(`⚠️ Skipped ${lang.code} due to API error.`);
          continue;
      }

      console.log(`✅ Translated ${lang.name} successfully! Multiplexing across regional sub-tags...`);
      localizations = multiplexLanguage(lang.code, translated, localizations);
      
      // Save progressively in case API crashes
      await prisma.pages.update({
          where: { slug: 'home' },
          data: { localizations }
      });
      console.log(`💾 Saved ${lang.code} matrix to database.`);
      
      console.log('⏱️ Waiting 3 seconds for API limits...');
      await new Promise(r => setTimeout(r, 3000));
  }

  console.log("\\n🚀🚀 HOMEPAGE 52-GEO FULL LOCALIZATION COMPLETELY FINISHED! 🚀🚀");
}

start().catch(console.error).finally(() => prisma.$disconnect());
