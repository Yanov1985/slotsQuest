import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
    const totalSlots = await prisma.slots.count();
    
    // Slots with reviews generated
    const slotsWithReviews = await prisma.slots.count({
        where: { slot_reviews: { some: {} } }
    });
    
    const slotsWithoutReviews = totalSlots - slotsWithReviews;
    const reviewPercent = ((slotsWithReviews / totalSlots) * 100).toFixed(2);
    
    // Slots with mechanics/bonuses/themes (the new script we are running)
    const slotsWithRelations = await prisma.slots.count({
        where: {
            AND: [
                { slot_mechanics: { some: {} } },
                { slot_bonuses: { some: {} } },
                { slotThemes: { some: {} } }
            ]
        }
    });
    
    const slotsMissingRelations = await prisma.slots.count({
        where: {
            OR: [
                { slot_mechanics: { none: {} } },
                { slot_bonuses: { none: {} } },
                { slotThemes: { none: {} } }
            ]
        }
    });
    const relationsPercent = ((slotsWithRelations / totalSlots) * 100).toFixed(2);

    console.log(`--- CONTENT COMPLETION REPORT ---`);
    console.log(`Total Slots: ${totalSlots}`);
    console.log(`Slots WITH Reviews (Text content): ${slotsWithReviews} (${reviewPercent}%)`);
    console.log(`Slots WITHOUT Reviews: ${slotsWithoutReviews}`);
    console.log(`\nSlots WITH Mechanics/Bonuses/Themes: ${slotsWithRelations} (${relationsPercent}%)`);
    console.log(`Slots MISSING Mechanics/Bonuses/Themes: ${slotsMissingRelations}`);
}
check().catch(console.error).finally(()=>prisma.$disconnect());
