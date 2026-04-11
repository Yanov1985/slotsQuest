import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function safeParse(str) {
    if (typeof str !== 'string') return str || {};
    try { return JSON.parse(str || '{}'); } catch(e) { return {}; }
}

function drawProgressBar(current, total, width = 40) {
    const percentage = current / total;
    const progressChars = Math.round(width * percentage);
    const emptyChars = width - progressChars;
    const bar = '█'.repeat(progressChars) + '░'.repeat(emptyChars);
    return `[${bar}] ${(percentage * 100).toFixed(1)}%`;
}

async function getProgress() {
    try {
        console.log("📊 Fetching live AI Translation metrics from Database...");

        // 1. Slots Progress
        // Use Prisma's chunking again just to be safe from memory issues
        const totalSlots = await prisma.slots.count();
        
        let enrichedSlots = 0;
        let cursor = null;
        while (true) {
            const batch = await prisma.slots.findMany({ 
                take: 50, 
                ...(cursor && { skip: 1, cursor: { id: cursor } }),
                select: { id: true, localizations: true },
                orderBy: { id: 'asc' }
            });
            if (batch.length === 0) break;
            cursor = batch[batch.length - 1].id;

            for (let slot of batch) {
                let loc = safeParse(slot.localizations);
                if (loc && loc['en'] && loc['en'].seo_keywords_lsi) enrichedSlots++;
            }
        }

        // 2. Homepage Progress
        const home = await prisma.pages.findUnique({ where: { slug: 'home' }});
        let homeLoc = safeParse(home.localizations);
        let homeLangsCount = Object.keys(homeLoc).length;
        
        // Output Dashboard
        console.log("\\n=======================================================");
        console.log("       🤖 SLOTQUEST AI TRANSLATION DASHBOARD 🤖       ");
        console.log("=======================================================\\n");
        
        console.log("🎯 439-SLOT DEEP SEO GENERATION:");
        console.log(`   ${drawProgressBar(enrichedSlots, totalSlots)}`);
        console.log(`   Slots Completed: ${enrichedSlots} / ${totalSlots}`);
        console.log(`   Remaining Slots: ${totalSlots - enrichedSlots}`);
        const avgSecPerSlot = 18; // 15s delay + 3s generation
        const slotsTimeLeftSec = (totalSlots - enrichedSlots) * avgSecPerSlot;
        console.log(`   ⏱️ ETA: ~${(slotsTimeLeftSec / 60).toFixed(1)} minutes\\n`);

        console.log("🏡 HOMEPAGE 70-GEO MULTIPLEXER:");
        const maxGeoTags = 70;
        // The script targets 16 core languages which map to ~70 geo tags
        console.log(`   ${drawProgressBar(homeLangsCount, maxGeoTags)}`);
        console.log(`   GEO Regions Generated: ${homeLangsCount} / ${maxGeoTags}`);
        const avgSecPerLang = 15; // 10s wait + 5s gen (11 times)
        // Approximate time left based on remaining core languages
        // 52 geos / 11 core langs = roughly 4.7 geos per core lang round
        const remainingRounds = Math.ceil((maxGeoTags - homeLangsCount) / 4.7);
        const homeTimeLeftSec = Math.max(0, remainingRounds * avgSecPerLang);
        console.log(`   ⏱️ ETA: ~${(homeTimeLeftSec / 60).toFixed(1)} minutes\\n`);

        console.log("=======================================================");

    } catch (e) {
        console.error("Failed to fetch progress:", e);
    } finally {
        await prisma.$disconnect();
    }
}

getProgress();
