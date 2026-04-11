const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sharp = require('sharp');
const path = require('path');

async function check() {
  const slot = await prisma.slots.findFirst({
    where: { slug: { contains: 'astronaut' } }
  });
  console.log('Slot "Astronaut":', slot ? slot.name : 'NOT FOUND');
  if (slot && slot.image_url) {
    const imgPath = path.join(__dirname, '../frontend/public', slot.image_url);
    console.log('Path:', imgPath);
    try {
      const metadata = await sharp(imgPath).metadata();
      console.log(`GOOD IMAGE DIMENSIONS: ${metadata.width}x${metadata.height}`);
    } catch(e) { console.error('Image Error:', e.message); }
  }

  // check one of ours
  const ourSlot = await prisma.slots.findFirst({
    where: { slug: { contains: 'turbo-mines' } }
  });
  if (ourSlot && ourSlot.image_url) {
    const ourPath = path.join(__dirname, '../frontend/public', ourSlot.image_url);
    try {
      const meta = await sharp(ourPath).metadata();
      console.log(`OUR IMAGE DIMENSIONS: ${meta.width}x${meta.height}`);
    } catch(e) {}
  }
}
check().catch(e => console.error(e)).finally(() => prisma.$disconnect());
