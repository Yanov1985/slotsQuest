import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
   const res = await prisma.slots.deleteMany({ where: { name: 'Remote image' } });
   console.log('Deleted slots:', res.count);
}
run();
