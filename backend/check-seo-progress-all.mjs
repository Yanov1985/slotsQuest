import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDetailedProgress() {
  const stats = {};
  
  const tables = [
    'providers',
    'slot_categories',
    'blogs',
    'slot_reviews',
    'glossary',
    'casinos',
    'promotions',
    'news',
    'streamers',
    'slots'
  ];

  console.log('📊 SEO GENERATION PROGRESS REPORT\n');
  console.log('--------------------------------------------------');
  console.log('| Table           | Total | Localized | Progress |');
  console.log('--------------------------------------------------');

  for (const table of tables) {
    try {
      const total = await prisma[table].count();
      let localized = 0;
      
      // Special handling for slot_reviews which might not have localizations field but has language
      if (table === 'slot_reviews') {
        localized = await prisma[table].count({
          where: { language: { not: 'en' } }
        });
      } else {
        const records = await prisma[table].findMany({
          select: { localizations: true }
        });
        
        localized = records.filter(r => {
          if (!r.localizations || typeof r.localizations !== 'object') return false;
          return Object.keys(r.localizations).length > 0;
        }).length;
      }

      const progress = total > 0 ? (localized / total) * 100 : 0;
      console.log(`| ${table.padEnd(15)} | ${total.toString().padEnd(5)} | ${localized.toString().padEnd(9)} | ${progress.toFixed(1).padStart(7)}% |`);
      
      stats[table] = { total, localized, progress };
    } catch (e) {
      console.log(`| ${table.padEnd(15)} | ERROR | ERROR     | ERROR   |`);
    }
  }
  console.log('--------------------------------------------------\n');

  // Check recent OpenAI errors in logs if possible, or just check the key
  console.log('🔑 OPENAI KEY STATUS');
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      console.log(`Key found: ${apiKey.substring(0, 7)}...${apiKey.substring(apiKey.length - 4)}`);
      // We can't easily test it without making a request, but we can check recent logs for "401" or "insufficient_quota"
    } else {
      console.log('❌ OPENAI_API_KEY NOT FOUND IN ENV');
    }
  } catch (e) {
    console.log('Error checking key:', e.message);
  }

  await prisma.$disconnect();
}

checkDetailedProgress();
