import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env', override: true });

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
  const prompt = `You are an Elite Semrush SEO Expert specializing in online gambling.
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
  console.log('🤖 Fixing hallucinations with OpenAI...');
  const slots = await prisma.slots.findMany({ include: { providers: true } });
  
  let corrupted = [];
  for (const s of slots) {
    if (!s.localizations) continue;
    const l = typeof s.localizations === 'string' ? JSON.parse(s.localizations) : s.localizations;
    // We already wiped 'faq', so we must detect by other fields or just rely on 'is it fully absent?'
    // Wait, the new logic shouldn't rely on Turkish text, it should just find the ones missing `faq` in EN!
    if (l['en'] && !l['en'].faq) {
         corrupted.push(s);
    }
  }

  console.log(`Found ${corrupted.length} slots without EN faq. Regenerating English only...`);

  let p = 0;
  for (let slot of corrupted) {
    p++;
    let existingRaw = slot.localizations || {};
    let existingJson = typeof existingRaw === 'string' ? JSON.parse(existingRaw) : existingRaw;
    
    console.log(`[${p}/${corrupted.length}] 🌀 Regenerating English for [${slot.name}]...`);
    let reviewText = await scrapeReview(slot.providers.slug, slot.slug);
    
    const enData = await generateLanguageSEO(slot.name, slot.providers.name, reviewText, { code: 'en', name: 'English (UK/Global)' });
    if (!enData) {
        console.log("Failed to generate EN. Skipping.");
        continue;
    }
    
    // Wipe and replace the messed up locales
    const localesToFix = ['en', 'en-US', 'en-GB', 'en-CA', 'en-AU', 'en-IE', 'en-NZ', 'en-ZA', 'en-IN', 'en-NG', 'it', 'pl'];
    for (let loc of localesToFix) {
        if (existingJson[loc]) {
             existingJson[loc] = { ...existingJson[loc], ...enData };
        }
    }

    await prisma.slots.update({
        where: { id: slot.id },
        data: { localizations: JSON.stringify(existingJson) } 
    });
    
    console.log(`   🏆 Fixed! Waiting 2s...`);
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('DONE!');
}

start().catch(console.error).finally(() => prisma.$disconnect());
