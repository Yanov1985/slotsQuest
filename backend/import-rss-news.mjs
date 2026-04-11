import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

const FEEDS = [
  "https://yogonet.com/international/rss",
  "https://www.gamblinginsider.com/rss", // Might need adjustment if format differs
];

function toSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function importRss() {
  console.log("📡 STARTING RSS NEWS IMPORT...");

  for (const url of FEEDS) {
    try {
      console.log(`Fetching feed: ${url}`);
      const { data } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      const $ = cheerio.load(data, { xmlMode: true });

      const items = $('item, entry');
      console.log(`Found ${items.length} items in feed.`);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const title = $(item).find('title').text().trim();
        const link = $(item).find('link').text().trim() || $(item).find('link').attr('href');
        
        if (!title) continue;

        const slug = toSlug(title);

        try {
          await prisma.news.upsert({
            where: { slug },
            update: {},
            create: {
              title,
              slug,
              author_name: "SlotQuest NewsBot",
              is_published: true,
              // We could store the source link in a meta field if needed
            }
          });
          console.log(`  + Imported: ${title}`);
        } catch (e) {
          console.warn(`  - Skipped (conflict): ${title}`);
        }
      }
    } catch (err) {
      console.error(`❌ Error fetching feed ${url}: ${err.message}`);
    }
  }

  console.log("✅ RSS IMPORT COMPLETE!");
}

importRss()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
