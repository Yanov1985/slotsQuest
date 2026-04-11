import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load directly to be sure
const envPath = fs.existsSync('backend/.env') ? 'backend/.env' : '.env';
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const apiKey = envConfig.OPENAI_API_KEY;

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: apiKey });

const TARGET_GEOS = 52;

async function checkOpenAI() {
    console.log('--- OpenAI Key Check ---');
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "Say 'OK'" }],
            max_tokens: 5
        });
        console.log('✅ New OpenAI key is active and working:', response.choices[0].message.content.trim());
        return true;
    } catch (e) {
        console.error('❌ OpenAI key error:', e.message);
        return false;
    }
}

async function getDetailedStats() {
    const report = [];
    const tables = [
        { name: 'slots', label: 'Slot Reviews/SEO' },
        { name: 'providers', label: 'Provider SEO' },
        { name: 'slot_categories', label: 'Category SEO' },
        { name: 'blogs', label: 'Blog Articles' },
        { name: 'glossary', label: 'Glossary Terms' },
        { name: 'news', label: 'News Articles' },
        { name: 'streamers', label: 'Streamer Bios' },
        { name: 'casinos', label: 'Casino Reviews' },
        { name: 'promotions', label: 'Bonuses/Promos' }
    ];

    console.log('\n--- Generation Progress Report (Target: 52 GEOs) ---');
    
    for (const table of tables) {
        try {
            const records = await prisma[table.name].findMany({
                select: { id: true, localizations: true }
            });

            const totalRecords = records.length;
            if (totalRecords === 0) {
                report.push({ label: table.label, total: 0, geo_avg: 0, progress: 0 });
                continue;
            }

            let totalGeoCount = 0;
            records.forEach(r => {
                let local = r.localizations;
                if (typeof local === 'string') {
                    try { local = JSON.parse(local); } catch(e) {}
                }
                if (local && typeof local === 'object') {
                    totalGeoCount += Object.keys(local).length;
                }
            });

            const maxPossibleGeos = totalRecords * TARGET_GEOS;
            const progress = (totalGeoCount / maxPossibleGeos) * 100;
            const geoAvg = totalGeoCount / totalRecords;

            report.push({ 
                label: table.label, 
                total: totalRecords, 
                geo_avg: geoAvg.toFixed(1), 
                progress: progress.toFixed(2) + '%' 
            });
        } catch (e) {
             // console.error(`Error checking ${table.name}:`, e.message);
        }
    }

    console.table(report);
}

async function main() {
    try {
        await checkOpenAI();
        await getDetailedStats();
    } catch (e) {
        console.error('Fatal error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
