import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env'), override: true });

const prisma = new PrismaClient();

async function main() {
  console.log("Syncing Sequences...");
  
  try {
    await prisma.$executeRawUnsafe(`SELECT setval('mechanics_id_seq', COALESCE((SELECT MAX(id) FROM mechanics), 1));`);
    console.log("Mechanics sequence synced!");
  } catch(e) { console.error(e) }
  
  try {
    await prisma.$executeRawUnsafe(`SELECT setval('bonuses_id_seq', COALESCE((SELECT MAX(id) FROM bonuses), 1));`);
    console.log("Bonuses sequence synced!");
  } catch(e) { console.error(e) }
  
  try {
    await prisma.$executeRawUnsafe(`SELECT setval('features_id_seq', COALESCE((SELECT MAX(id) FROM features), 1));`);
    console.log("Features sequence synced!");
  } catch(e) { console.error(e) }
  
  console.log("Done.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
