import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const slot = await prisma.slots.findUnique({
    where: { id: 'cmeocg6bd0001u5do1jpoas43' }
  });
  console.log('GEO_REGIONS:', slot?.geo_regions);
  console.log('TARGET_REGIONS:', slot?.geo_target_regions);
  console.log('LOCALIZATION_KEYS:', slot?.localizations ? Object.keys(slot.localizations) : 'none');
  process.exit(0);
}
check();
