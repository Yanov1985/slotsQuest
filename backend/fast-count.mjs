import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
    try {
        let done = 0;
        let total = 0;
        let lastId = null;
        
        console.log("📊 Counting strictly via Node.js chunks...");
        
        while (true) {
            const slots = await prisma.slots.findMany({
                take: 100,
                select: { id: true, localizations: true },
                ...(lastId ? { skip: 1, cursor: { id: lastId } } : {})
            });
            
            if (slots.length === 0) break;
            
            for (const slot of slots) {
                total++;
                let local = (slot.localizations !== null && slot.localizations !== undefined) ? slot.localizations : {};
                if (typeof local === 'string') {
                    try { local = JSON.parse(local); } catch(e) {}
                }
                if (typeof local === 'string') { // handle double nested
                    try { local = JSON.parse(local); } catch(e) {} 
                }
                
                if (local && typeof local === 'object' && local['ru'] && local['ru'].seo_keywords_lsi) {
                    done++;
                }
            }
            lastId = slots[slots.length - 1].id;
        }

        const pct = ((done / total) * 100).toFixed(1);
        console.log(`\n✅ ACCURATE AI SLOTS (RU/52-GEO): ${done} / ${total}`);
        console.log(`📊 PROGRESS: ${pct}%\n`);

    } catch(e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
run();
