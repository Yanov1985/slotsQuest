
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  console.log('--- Checking Latest SEO Activity (Entity Updates) ---');
  const tables = ['slots', 'providers', 'slot_categories', 'blogs', 'glossary', 'news', 'streamers', 'casinos'];
  
  const activity = [];

  for (const table of tables) {
    try {
      const latest = await prisma[table].findFirst({
        orderBy: { updated_at: 'desc' },
        select: { updated_at: true, localizations: true }
      });
      
      if (latest) {
        let geoCount = 0;
        let local = latest.localizations;
        if (typeof local === 'string') { try { local = JSON.parse(local); } catch(e) {} }
        if (local && typeof local === 'object') {
          geoCount = Object.keys(local).length;
        }

        activity.push({
          table,
          last_update: latest.updated_at,
          geos_in_latest: geoCount
        });
      }
    } catch (e) {
      // console.error(`Error checking ${table}:`, e.message);
    }
  }

  console.table(activity.sort((a, b) => b.last_update - a.last_update));

  const now = new Date();
  if (activity.length > 0) {
    const mostRecent = Math.max(...activity.map(a => a.last_update.getTime()));
    const diffMins = Math.floor((now.getTime() - mostRecent) / 60000);
    console.log(`\nLast project activity: ${diffMins} minutes ago`);
  }

  await prisma.$disconnect();
}

check().catch(console.error);
