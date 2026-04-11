import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as dotenv from 'dotenv';
import fs from 'fs';

const envPath = fs.existsSync('backend/.env') ? 'backend/.env' : '.env';
dotenv.config({ path: envPath });

const prisma = new PrismaClient();

const RSS_FEEDS = [
    { name: 'Casino.org', url: 'https://www.casino.org/news/feed/' },
    { name: 'SlotBeats', url: 'https://slotbeats.com/feed/' },
    { name: 'Yogonet', url: 'https://www.yogonet.com/international/rss' },
    { name: 'InterGame', url: 'https://www.intergameonline.com/rss' }
];

function localSlugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

async function syncFeed(feed) {
    console.log(`\nSyncing feed: ${feed.name} (${feed.url})...`);
    try {
        const response = await axios.get(feed.url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        const items = [];
        $('item').each((i, el) => {
            if (i >= 5) return; // Limit to 5 latest per feed to avoid spam
            const title = $(el).find('title').text();
            const link = $(el).find('link').text();
            const pubDate = $(el).find('pubDate').text();
            const description = $(el).find('description').text();
            const content = $(el).find('content\\:encoded').text() || description;
            
            items.push({
                title,
                link,
                pubDate: pubDate ? new Date(pubDate) : new Date(),
                content: content.replace(/<[^>]*>?/gm, '').substring(0, 2000) // Basic cleanup
            });
        });

        console.log(`Found ${items.length} items.`);

        for (const item of items) {
            const slug = localSlugify(item.title);
            
            // Check if exists
            const existing = await prisma.news.findFirst({
                where: { 
                    OR: [
                        { slug: slug },
                        { source_url: item.link }
                    ]
                }
            });

            if (existing) {
                console.log(`[SKIP] Already exists: ${item.title}`);
                continue;
            }

            await prisma.news.create({
                data: {
                    title: item.title,
                    slug: slug,
                    content_markdown: item.content,
                    source_url: item.link,
                    published_at: item.pubDate,
                    author_name: feed.name + ' via SlotQuest Bot',
                    is_published: true,
                    localizations: {} // Empty for generator to pick up
                }
            });
            console.log(`[NEW] Imported: ${item.title}`);
        }
    } catch (error) {
        console.error(`Error syncing feed ${feed.name}:`, error.message);
    }
}

async function main() {
    for (const feed of RSS_FEEDS) {
        await syncFeed(feed);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
