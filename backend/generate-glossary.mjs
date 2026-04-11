import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config({ override: true });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const aiModel = "gpt-4o-mini";
const prisma = new PrismaClient({ log: ['error'] });

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

async function generateGlossaryTerm(term) {
  const prompt = `You are a Casino Encyclopedia expert.
Define the gambling term: "${term}" in a professional and SEO-friendly way.
Explain what it means for the player and any strategy context.
The definition must be localized for 52 GEOs.
You MUST reply with ONLY a JSON OBJECT where keys are language codes: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar", "hi", "bn", "sw".
Inside each language object, include: "term" (localized name), "definition_html" (use p, strong), "seo_title", "seo_description".
Do not wrap in markdown block tags. Return pure valid JSON.`;

  try {
    const response = await openai.chat.completions.create({
        model: aiModel,
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }]
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (e) {
    console.error(`❌ OpenAI Error for glossary term ${term}:`, e.message);
    return null;
  }
}

async function start() {
  console.log("🤖 Starting Glossary Generation Daemon (DB Mode)...");
  
  const pendingTerms = await prisma.$queryRaw`SELECT * FROM glossary 
    WHERE localizations IS NULL 
    OR localizations = '{}'::jsonb 
    OR NOT (localizations ? 'en')`;

  console.log(`Found ${pendingTerms.length} pending glossary terms.`);

  for (let termRecord of pendingTerms) {
      console.log(`🚀 AI Writing Encyclopedia Entry: [${termRecord.term}]...`);
      const payload = await generateGlossaryTerm(termRecord.term);
      
      if (!payload) {
         console.log("⚠️ Generation failed, moving to next.");
         await new Promise(r => setTimeout(r, 5000));
         continue; 
      }

      const finalMatrix = multiplexLanguage(payload);
      
      await prisma.glossary.update({
          where: { id: termRecord.id },
          data: {
              term: finalMatrix['en']?.term_localized || termRecord.term,
              brief_definition: finalMatrix['en']?.brief_definition || '',
              detailed_explanation: finalMatrix['en']?.detailed_explanation || '',
              seo_title: finalMatrix['en']?.seo_title || '',
              seo_desc: finalMatrix['en']?.seo_desc || '',
              localizations: finalMatrix
          }
      });

      console.log(`✅ Successfully published [${termRecord.term}] in 52 GEOs! Waiting 3s...`);
      await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`🎉 GLOSSARY GENERATION RUN COMPLETE!`);
}

start().catch(console.error).finally(() => prisma.$disconnect());

