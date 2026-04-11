import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function test() {
    try {
        console.log("Connecting to Prisma...");
        const count = await prisma.slots.count();
        console.log(`Connection successful! Total slots: ${count}`);
    } catch (e) {
        console.error("Prisma connection failed:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}
test();
