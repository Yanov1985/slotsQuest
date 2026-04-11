import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function report() {
    try {
        const slotsWithReviews = await prisma.slots.count({
            where: { slot_reviews: { some: {} } }
        });
        const totalSlots = await prisma.slots.count();
        const reviewPercent = ((slotsWithReviews / totalSlots) * 100).toFixed(2);
        
        console.log(`\n--- CONTENT COMPLETION REPORT ---`);
        console.log(`Total Slots in DB: ${totalSlots}`);
        console.log(`Slots with Generated Reviews: ${slotsWithReviews} (${reviewPercent}%)`);
        console.log(`Slots left without Reviews: ${totalSlots - slotsWithReviews}`);

        const updatedSlots = await prisma.slots.findMany({
            where: {
                AND: [
                    { slot_mechanics: { some: {} } },
                    { slotThemes: { some: {} } }
                ]
            },
            take: 10,
            orderBy: { popularity_rank: 'asc' }, // The order the generator uses
            select: { name: true, slug: true }
        });
        
        console.log(`\n--- FIRST 10 SLOTS UPDATED BY SCRIPT ---`);
        updatedSlots.forEach((slot, i) => {
            console.log(`${i+1}. ${slot.name} (http://localhost:3000/ru/slots/${slot.slug})`);
        });
    } catch(e) {
        console.error("Error:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

report();
