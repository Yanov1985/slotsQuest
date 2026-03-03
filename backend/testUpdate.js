const { PrismaClient } = require('@prisma/client');

async function main() {
    const prisma = new PrismaClient();
    try {
        const slotId = 'cmeocg6bd0001u5do1jpoas43';
        const catId = '6a14b501-46fd-4305-be29-aab2cdc483ff';

        console.log(`Updating slot ${slotId} with category_id ${catId}`);

        const res = await prisma.slots.update({
            where: { id: slotId },
            data: { category_id: catId }
        });
        console.log('Success:', res.category_id);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
