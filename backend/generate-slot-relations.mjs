import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config({ override: true });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const aiModel = "gpt-4o-mini";
const prisma = new PrismaClient({ log: ['error'] });

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

async function matchOrCreate(dbModel, cacheList, inputNames) {
    if(!inputNames || !Array.isArray(inputNames)) return [];
    let results = [];
    for(let name of inputNames) {
        if(!name) continue;
        const slugMatch = slugify(name);
        if(!slugMatch) continue;
        
        let existing = cacheList.find(x => slugify(x.name) === slugMatch);
        if(existing) {
            results.push(existing);
        } else {
            try {
                // If not in cache, try finding by slug from db directly just in case
                existing = await dbModel.findUnique({ where: { slug: slugMatch }});
                if(!existing) {
                    existing = await dbModel.create({
                        data: { name, slug: slugMatch }
                    });
                }
                cacheList.push(existing); // add to cache
                results.push(existing);
            } catch (e) {
                console.error(`Error matching/creating relation for ${name}: `, e.message);
            }
        }
    }
    return results;
}

async function start() {
    console.log("🤖 Starting Relations Daemon...");
    
    // Pre-cache lists
    const themes = await prisma.themes.findMany({ select: { id: true, name: true, slug: true }});
    const mechanics = await prisma.mechanics.findMany({ select: { id: true, name: true, slug: true }});
    const bonuses = await prisma.bonuses.findMany({ select: { id: true, name: true, slug: true }});
    
    const themeNames = themes.map(t=>t.name).join(", ");
    const mechanicNames = mechanics.map(t=>t.name).join(", ");
    const bonusNames = bonuses.map(t=>t.name).join(", ");

    // For testing/quick execution, we process slots that have NO themes or NO mechanics
    const slots = await prisma.slots.findMany({
        where: {
            OR: [
                { slot_mechanics: { none: {} } },
                { slot_bonuses: { none: {} } },
                { slotThemes: { none: {} } }
            ]
        },
        select: { id: true, name: true, providers: { select: { name: true } } },
        orderBy: { popularity_rank: 'asc' },
        take: 300 // Process first 300
    });

    console.log(`Found ${slots.length} slots to process.`);

    for(let i=0; i<slots.length; i++) {
        const slot = slots[i];
        console.log(`\n[${i+1}/${slots.length}] 🚀 Processing [${slot.name}]...`);
        
        const prompt = `You are an expert on casino slot games.
Target Slot: "${slot.name}" by provider "${slot.providers?.name || 'Unknown'}".
Identify the appropriate Mechanics, Bonuses, and Themes for this slot.
Please ONLY select from the following existing lists wherever possible. If you must add a highly common mechanic/bonus/theme that is missing from the list, you may do so, but heavily prefer the existing standard nomenclature.

Existing Themes: ${themeNames}
Existing Mechanics: ${mechanicNames}
Existing Bonuses: ${bonusNames}

Return a pure JSON OBJECT in this exact format:
{
  "themes": ["Theme1", "Theme2"],
  "mechanics": ["Mechanic1", "Mechanic2"],
  "bonuses": ["Bonus1", "Bonus2"]
}
Limit to max 5 in each array. Return purely JSON with no markdown tags such as \`\`\`json.`;

        let retries = 0;
        let payload = null;
        while(retries < 3) {
            try {
                const response = await openai.chat.completions.create({
                    model: aiModel,
                    response_format: { type: "json_object" },
                    messages: [{ role: "user", content: prompt }]
                });
                const text = response.choices[0].message.content;
                payload = JSON.parse(text);
                break;
            } catch (e) {
                console.error(`❌ OpenAI API Error: ${e.message}`);
                await new Promise(r => setTimeout(r, 5000));
                retries++;
            }
        }
        
        if(!payload) {
            console.log("⚠️ Failed to generate for " + slot.name);
            continue;
        }

        // Process Payload
        const connectOrCreateThemes = await matchOrCreate(prisma.themes, themes, payload.themes);
        const connectOrCreateMechanics = await matchOrCreate(prisma.mechanics, mechanics, payload.mechanics);
        const connectOrCreateBonuses = await matchOrCreate(prisma.bonuses, bonuses, payload.bonuses);

        // Update DB
        for(const t of connectOrCreateThemes) {
            await prisma.slot_themes.upsert({
                where: { slot_id_theme_id: { slot_id: slot.id, theme_id: t.id } },
                create: { slot_id: slot.id, theme_id: t.id },
                update: {}
            });
        }
        
        for(const m of connectOrCreateMechanics) {
            await prisma.slot_mechanics.upsert({
                where: { slot_id_mechanic_id: { slot_id: slot.id, mechanic_id: m.id } },
                create: { slot_id: slot.id, mechanic_id: m.id },
                update: {}
            });
        }

        for(const b of connectOrCreateBonuses) {
            await prisma.slot_bonuses.upsert({
                where: { slot_id_bonus_id: { slot_id: slot.id, bonus_id: b.id } },
                create: { slot_id: slot.id, bonus_id: b.id },
                update: {}
            });
        }
        
        console.log(`✅ Updated ${slot.name} (${connectOrCreateThemes.length} themes, ${connectOrCreateMechanics.length} mechanics, ${connectOrCreateBonuses.length} bonuses). Waiting 1s...`);
        await new Promise(r => setTimeout(r, 1000));
    }
    
    console.log("🎉 Relations Generation Complete!");
}

start().catch(console.error).finally(()=> prisma.$disconnect());
