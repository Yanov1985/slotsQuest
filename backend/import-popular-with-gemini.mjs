import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import crypto from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { responseMimeType: "application/json" } });

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
  const prompt = `You are an Elite Semrush SEO Expert.
Write identical JSON for slot "${slotName}" by "${providerName}".
Include slang, HTML formatting with bold tags, and native translations for all 12 cultural regions.
Reply with ONLY a JSON OBJECT where keys are language codes: "en", "es", "fr", "pt", "tr", "ru", "id", "de", "ar", "hi", "bn", "sw".
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
  while (retries < 3) {
      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return JSON.parse(text);
      } catch (e) {
        console.error(`❌ Gemini API Error for ${slotName}: ${e.message}`);
        console.log(`⏱️ API Error! Sleeping for 8 seconds... (Retry ${retries + 1}/3)`);
        await new Promise(r => setTimeout(r, 8000));
        retries++;
      }
  }
  return null;
}

async function processImage(url, slug) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText} (${url})`);
  const data = await res.arrayBuffer();
  const outputPath = path.join(outputDir, `${slug}.webp`);
  await sharp(Buffer.from(data))
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(outputPath);
  return `/slots/${slug}.webp`;
}

async function start() {
    console.log("Reading bluechip_popular.json...");
    const raw = await fs.readFile('bluechip_popular.json', 'utf8');
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

            let provider = await prisma.providers.findFirst({ where: { slug: providerSlug } });
            if (!provider) {
                provider = await prisma.providers.create({
                    data: { id: crypto.randomUUID(), name: providerName, slug: providerSlug, is_active: true }
                });
            }

            let existingSlot = await prisma.slots.findFirst({ where: { slug: slotSlug } });
            if (!existingSlot) existingSlot = await prisma.slots.findFirst({ where: { name: item.name } });

            let newImgPath = existingSlot?.image_url || "";
            if (!existingSlot || !existingSlot.image_url || existingSlot.image_url.includes('placeholder')) {
               console.log("   📸 Download and process image...");
               try { newImgPath = await processImage(item.mobileImage, slotSlug); }
               catch(e) { console.error(`   Failed to dl image: ${item.mobileImage}`, e.message); }
            }

            let local = existingSlot ? safeParse(existingSlot.localizations) : {};
            if (!local['ru'] || !local['ru'].overview) {
                console.log("   🤖 Generating Gemini SEO...");
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
                    data: { localizations: JSON.stringify(local), image_url: newImgPath, thumbnail_url: newImgPath }
                });
            }

            const link = await prisma.slot_mechanics.findUnique({
                where: { slot_id_mechanic_id: { slot_id: existingSlot.id, mechanic_id: popMechanic.id } }
            });
            if (!link) {
                await prisma.slot_mechanics.create({ data: { slot_id: existingSlot.id, mechanic_id: popMechanic.id } });
                console.log("   🔗 Linked to Popular tag.");
            }
            
        } catch(e) {
            console.error(`❌ Global error on ${item.name}:`, e.message);
        }
    }
    console.log("🎉 All 136 games fully processed!");
}
start().catch(e => console.error(e)).finally(() => prisma.$disconnect());
