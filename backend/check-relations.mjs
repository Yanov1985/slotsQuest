import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
    const themes = await prisma.themes.findMany({ select: { id: true, name: true, slug: true }});
    const mechanics = await prisma.mechanics.findMany({ select: { id: true, name: true, slug: true }});
    const bonuses = await prisma.bonuses.findMany({ select: { id: true, name: true, slug: true }});
    const features = await prisma.features.findMany({ select: { id: true, name: true, slug: true }});
    
    console.log("Themes:", JSON.stringify(themes, null, 2));
    console.log("Mechanics:", JSON.stringify(mechanics, null, 2));
    console.log("Bonuses:", JSON.stringify(bonuses, null, 2));
    console.log("Features:", JSON.stringify(features, null, 2));
}

check().catch(console.error).finally(()=> prisma.$disconnect());
