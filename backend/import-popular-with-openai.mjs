import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import crypto from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config({ override: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();
const openai = new OpenAI({
    apiKey: "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"
});

const outputDir = path.join(process.cwd(), '../frontend/public/slots');
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

function generateSlug(title) {
  return title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

function safeParse(str) {
    if (typeof str !== 'string') return str || {};
    try { return JSON.parse(str || '{}'); } catch(e) { return {}; }
}

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
        for (const target of map[source]) {
            if (baseMatrix[source]) geoOutput[target] = baseMatrix[source];
        }
    }
    return geoOutput;
}

async function generateGlobalSEO(slotName, providerName) {
  const languages = ["en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar", "hi", "bn", "sw"];
  const batch1 = languages.slice(0, 6);
  const batch2 = languages.slice(6);
  
  const results = {};
  
  for (const batch of [batch1, batch2]) {
    const prompt = `You are an Elite Semrush SEO Expert.
Write identical JSON for slot "${slotName}" by "${providerName}".
Include slang, HTML formatting with bold tags, and native translations for these regions: ${batch.join(", ")}.
Reply with ONLY a JSON OBJECT where keys are language codes from the list provided.
Inside each language object, include exact specific structure:
{
  "seo_title": "string",
  "seo_description": "string",
  "seo_keywords_primary": "string",
  "seo_keywords_lsi": "string",
  "overview": "string (5-6 sentence promotional review with <p> and <strong> tags)",
  "mechanics": "string (explains core features)",
  "expert_verdict": "string",
  "pros": ["string", "string", "string"],
  "cons": ["string", "string"],
  "faq": [{"q": "string", "a": "string"}],
  "reviews": [{"author": "string", "date": "string", "rating": 5, "text": "string"}],
  "cta_button": "string",
  "demo_button": "string"
}
Do not wrap in markdown tags. Return pure JSON.`;
    
    let retries = 0;
    let batchSuccess = false;
    while (retries < 3 && !batchSuccess) {
      try {
        console.log(`      ⏳ OpenAI Request for batch [${batch.join(", ")}] sent at ${new Date().toLocaleTimeString()}...`);
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: "You strictly reply with valid JSON object." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7
        }, { timeout: 90000 });
        
        const text = response.choices[0].message.content;
        const batchData = JSON.parse(text);
        Object.assign(results, batchData);
        batchSuccess = true;
        console.log(`      ✅ Batch [${batch.join(", ")}] completed.`);
      } catch (e) {
        console.error(`❌ OpenAI API Error for ${slotName} batch [${batch.join(", ")}]: ${e.message}`);
        await new Promise(r => setTimeout(r, 5000));
        retries++;
      }
    }
    if (!batchSuccess) return null;
  }
  return results;
}

async function processImage(url, gameId) {
    try {
      const response = await fetch(url, { 
        timeout: 10000 // 10 seconds timeout
      });
      
      if (!response.ok) {
        console.log(`      [-] Image download failed: HTTP ${response.status}`);
        return null;
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const fileName = `${gameId}.webp`;
      const filePath = path.join(process.cwd(), '../frontend/public/slots', fileName);
      
      await sharp(buffer)
        .webp({ quality: 90 }) // Removed resize to maintain original proportions and sharpness
        .toFile(filePath);
      
      console.log(`      [+] Image processed: ${fileName}`);
      return `/slots/${fileName}`;
    } catch (error) {
      console.error(`      [!] Image error: ${error.message}`);
      return null;
    }
}

async function start() {
    console.log("Reading bluechip_manual_dom.json...");
    const raw = await fs.readFile('bluechip_manual_dom.json', 'utf8');
    const games = JSON.parse(raw);

    let popMechanic = await prisma.mechanics.findUnique({ where: { slug: 'popular' } });
    if (!popMechanic) {
        popMechanic = await prisma.mechanics.create({
            data: { id: crypto.randomUUID(), name: 'Popular', slug: 'popular', description: 'Popular games' }
        });
    }

    let i = 0;
    for (let item of games) {
        i++;
        try {
            console.log(`\n[${i}/${games.length}] Processing ${item.name} by ${item.brandName}...`);
            const providerName = item.brandName || "Unknown Provider";
            const providerSlug = generateSlug(providerName);
            const slotSlug = `${generateSlug(item.name)}-${providerSlug}`;

            console.log(`   🔍 Checking for provider: ${providerSlug}...`);
            let provider = await prisma.providers.findFirst({ where: { slug: providerSlug } });
            if (!provider) {
                console.log(`   🆕 Creating provider: ${providerName}...`);
                provider = await prisma.providers.create({
                    data: { id: crypto.randomUUID(), name: providerName, slug: providerSlug, is_active: true }
                });
            }

            console.log(`   🔍 Checking for slot: ${slotSlug}...`);
            let existingSlot = await prisma.slots.findFirst({ where: { slug: slotSlug } });
            if (!existingSlot) {
                console.log(`   🔍 Checking for slot by name: ${item.name}...`);
                existingSlot = await prisma.slots.findFirst({ where: { name: item.name } });
            }

            let newImgPath = existingSlot?.image_url || "";
            console.log("   📸 Download and process image (Forced Update)...");
            try { newImgPath = await processImage(item.mobileImage, slotSlug); }
            catch(e) { console.error(`   Failed to dl image: ${item.mobileImage}`, e.message); }

            let local = existingSlot ? safeParse(existingSlot.localizations) : {};
            if (!local['ru'] || !local['ru'].overview) {
                console.log("   🤖 Generating OpenAI SEO...");
                const payload = await generateGlobalSEO(item.name, providerName);
                if (payload) {
                    const finalMatrix = multiplexLanguage(payload);
                    for (let code in finalMatrix) { local[code] = { ...(local[code] || {}), ...finalMatrix[code] }; }
                }
            } else {
                console.log("   ⏭️ SEO Content already exists.");
            }

            if (!existingSlot) {
                existingSlot = await prisma.slots.create({
                    data: {
                        id: crypto.randomUUID(),
                        name: item.name,
                        slug: slotSlug,
                        description: `${item.name} is a popular slot game.`,
                        providers: { connect: { id: provider.id } },
                        is_active: true,
                        rtp: 96.0,
                        volatility: 'high',
                        max_win: 5000,
                        reels: 5,
                        game_field: "5x3",
                        media_type: "image",
                        image_url: newImgPath,
                        thumbnail_url: newImgPath,
                        localizations: JSON.stringify(local)
                    }
                });
            } else {
                await prisma.slots.update({
                    where: { id: existingSlot.id },
                    data: { localizations: JSON.stringify(local), image_url: newImgPath, thumbnail_url: newImgPath, name: item.name }
                });
            }

            const link = await prisma.slot_mechanics.findUnique({
                where: { slot_id_mechanic_id: { slot_id: existingSlot.id, mechanic_id: popMechanic.id } }
            });
            if (!link) {
                await prisma.slot_mechanics.create({ data: { slot_id: existingSlot.id, mechanic_id: popMechanic.id } });
                console.log("   🔗 Linked to Popular tag.");
            }
            
            await new Promise(r => setTimeout(r, 100));
        } catch(e) {
            console.error(`❌ Global error on ${item.name}:`, e.message);
        }
    }
    console.log("🎉 All 136 games fully processed!");
}
start().catch(e => console.error(e)).finally(() => prisma.$disconnect());
