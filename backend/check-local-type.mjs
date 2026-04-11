import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const p = await prisma.providers.findFirst({
    select: { id: true, name: true, localizations: true }
  });
  console.log('Provider:', p.name);
  console.log('Type of localizations:', typeof p.localizations);
  console.log('Value:', JSON.stringify(p.localizations, null, 2));
  await prisma.$disconnect();
}

check();
