import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function detailedCheck() {
    console.log('Fetching all slots for detailed analysis (in batches)...');
    
    const count = await prisma.slots.count();
    let processedCount = 0;
    const missingSlots = [];
    const languageCounts = {};

    for (let i = 0; i < count; i += 50) {
        const slotsBatch = await prisma.slots.findMany({
            select: { id: true, slug: true, name: true, localizations: true },
            skip: i,
            take: 50
        });
        
        for (const slot of slotsBatch) {
            if (!slot.localizations) {
                missingSlots.push(slot.slug);
                continue;
            }
            
            const locs = typeof slot.localizations === 'string' 
                ? JSON.parse(slot.localizations) 
                : slot.localizations;
            
            let isProcessed = false;
            
            if (locs && locs['en'] && locs['en'].faq && Array.isArray(locs['en'].faq) && locs['en'].faq.length > 0) {
                isProcessed = true;
                processedCount++;
                
                // Count languages populated for this slot
                for (const lang in locs) {
                    if (locs[lang] && locs[lang].faq) {
                        languageCounts[lang] = (languageCounts[lang] || 0) + 1;
                    }
                }
            } else {
                missingSlots.push(slot.slug);
            }
        }
    }
    
    const reviewsCount = await prisma.slot_reviews.count();
    
    console.log(`\n======================================`);
    console.log(`✅ FINAL COMPLETION STATUS ✅`);
    console.log(`======================================`);
    console.log(`TOTAL SLOTS IN DB: ${count}`);
    console.log(`SUCCESSFULLY ENRICHED SLOTS: ${processedCount}`);
    console.log(`SKIPPED / FAILED SLOTS: ${missingSlots.length}`);
    console.log(`\n======================================`);
    console.log(`📚 CONTENT VOLUME REPORT`);
    console.log(`======================================`);
    console.log(`TOTAL GENERATED USER REVIEWS: ${reviewsCount}`);
    
    console.log(`\n🔍 MISSING SLOTS LIST (${missingSlots.length}):`);
    missingSlots.forEach(s => console.log(`  - ${s}`));
}

detailedCheck()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
