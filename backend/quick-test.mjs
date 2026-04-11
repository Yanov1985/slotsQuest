import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const starlight = await prisma.slots.findFirst({ where: { slug: 'starlight-princess' }, include: { slot_content: true } });
    const fortune = await prisma.slots.findFirst({ where: { slug: 'fortune-chests' }, include: { slot_content: true } });
    console.log('Starlight:', starlight?.slot_content?.length, '| Fortune:', fortune?.slot_content?.length);
}
main().finally(() => prisma.$disconnect());
