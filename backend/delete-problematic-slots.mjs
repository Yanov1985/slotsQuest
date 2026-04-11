import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env', override: true });

const prisma = new PrismaClient();

async function deleteSlots() {
  const slotNames = [
    'Big Bamboo',
    'Book of Admiral',
    'Spear of Athena',
    '3 China Pots',
    'Nitropolis 4',
    'Bizarre',
    'Super Cash Boost Hold & Win',
    'Skibblings'
  ];

  try {
    const result = await prisma.slots.deleteMany({
      where: {
        name: {
          in: slotNames
        }
      }
    });
    console.log(`Successfully deleted ${result.count} slots.`);
  } catch (error) {
    console.error('Error deleting slots:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteSlots();
