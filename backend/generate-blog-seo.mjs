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

async function generateBlogArticle(title, keywords) {
  const prompt = `You are a Senior Gambling SEO Writer.
Write a comprehensive, professional blog article on the topic: "${title}".
Focus on keywords: ${keywords}.
The article must be expert-level, localized for Google Search in 52 GEOs.
You MUST reply with ONLY a JSON OBJECT where keys are language codes: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar", "hi", "bn", "sw".
Inside each language object, include: "title", "seo_title", "seo_description", "content_html" (use h2, p, strong).
Do not wrap in markdown block tags. Return pure valid JSON.`;

  try {
    const response = await openai.chat.completions.create({
        model: aiModel,
        response_format: { type: "json_object" },
        messages: [{ role: "user", content: prompt }]
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (e) {
    console.error(`❌ OpenAI Error for blog ${title}:`, e.message);
    return null;
  }
}

async function start() {
  console.log("🤖 Starting Blog Generation Daemon (DB Mode)...");
  
  const pendingBlogs = await prisma.$queryRaw`SELECT * FROM blogs 
    WHERE localizations IS NULL 
    OR localizations = '{}'::jsonb 
    OR NOT (localizations ? 'en')`;

  console.log(`Found ${pendingBlogs.length} pending blogs to process.`);

  for (let article of pendingBlogs) {
      console.log(`🚀 AI Writing Blog: [${article.slug}]...`);
      // Use tags or title as keyword context
      const keywords = article.tags || article.title;
      const payload = await generateBlogArticle(article.title, keywords);
      
      if (!payload) {
         console.log("⚠️ Generation failed, moving to next.");
         await new Promise(r => setTimeout(r, 5000));
         continue; 
      }

      const finalMatrix = multiplexLanguage(payload);
      
      await prisma.blogs.update({
          where: { id: article.id },
          data: {
              title: finalMatrix['en']?.title || article.title,
              content_markdown: finalMatrix['en']?.content_html || '',
              seo_title: finalMatrix['en']?.seo_title || '',
              seo_desc: finalMatrix['en']?.seo_description || '',
              localizations: finalMatrix
          }
      });

      console.log(`✅ Successfully published [${article.slug}] in 52 GEOs! Waiting 3s...`);
      await new Promise(r => setTimeout(r, 3000));
  }

  console.log(`🎉 BLOG GENERATION RUN COMPLETE!`);
}

start().catch(console.error).finally(() => prisma.$disconnect());

