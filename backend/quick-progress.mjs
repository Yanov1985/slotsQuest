import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import fs from 'fs';

const envPath = fs.existsSync('backend/.env') ? 'backend/.env' : '.env';
dotenv.config({ path: envPath });

const prisma = new PrismaClient();

async function main() {
  const tables = ['blogs', 'news', 'glossary', 'streamers', 'casinos', 'slots'];
  const results = [];
  
  for (const table of tables) {
    let total = 0;
    let done = 0;

    if (table === 'slots') {
        total = await prisma.slots.count();
        // Count how many slots have at least one review
        const slotStats = await prisma.$queryRaw`SELECT COUNT(DISTINCT slot_id) as count FROM slot_reviews`;
        done = Number(slotStats[0].count);
    } else {
        const all = await prisma[table].findMany({ select: { localizations: true } });
        total = all.length;
        all.forEach(item => {
          let local = item.localizations;
          if (typeof local === 'string') {
            try { local = JSON.parse(local); } catch(e) {}
          }
          if (local && typeof local === 'object' && Object.keys(local).length > 0) {
            done++;
          }
        });
    }
    
    results.push({ table, total, done, percent: total > 0 ? ((done/total)*100).toFixed(1) + '%' : '0%' });
  }
  
  console.table(results);
  
  const totalItems = results.reduce((acc, r) => acc + r.total, 0);
  const totalDone = results.reduce((acc, r) => acc + r.done, 0);
  const overallPercent = ((totalDone / totalItems) * 100).toFixed(1);
  
  console.log(`\nOVERALL PROGRESS: ${overallPercent}% (${totalDone}/${totalItems} main items localized)`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
