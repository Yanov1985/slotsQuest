const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
    try {
        // Find the 'popular' mechanic ID
        const popularMechanic = await prisma.mechanics.findUnique({
            where: { slug: 'popular' }
        });

        if (!popularMechanic) {
            throw new Error("Mechanic 'popular' not found");
        }

        // Count all slots with the 'popular' mechanic
        const popularSlots = await prisma.slot_mechanics.findMany({
            where: { mechanic_id: popularMechanic.id },
            include: { slots: true }
        });

        const totalPopular = popularSlots.length;
        
        // Count enriched ones (checking for Russian overview in localizations JSON)
        const enrichedCount = popularSlots.filter(ms => {
            const local = typeof ms.slots.localizations === 'string' 
                ? JSON.parse(ms.slots.localizations) 
                : (ms.slots.localizations || {});
            return local && local.ru && local.ru.overview;
        }).length;

        const result = {
            timestamp: new Date().toISOString(),
            enriched: enrichedCount,
            totalPopular: totalPopular,
            status: 'success'
        };
        fs.writeFileSync('db-progress.json', JSON.stringify(result, null, 2));
        console.log(`Progress: ${enrichedCount}/${totalPopular} enriched`);
    } catch (error) {
        console.error('Error:', error.message);
        fs.writeFileSync('db-progress.json', JSON.stringify({ status: 'error', error: error.message }, null, 2));
    } finally {
        await prisma.$disconnect();
    }
}

main();
