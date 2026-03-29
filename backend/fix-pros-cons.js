const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slot = await prisma.slots.findUnique({
    where: { slug: 'gates-of-olympus' }
  });
  
  if (!slot) return;

  function convertToJsonArray(fieldValue) {
    if (!fieldValue) return null;
    // If it's already a JSON array, leave it alone
    if (fieldValue.trim().startsWith('[')) return fieldValue;
    // Otherwise, split by newline and stringify it
    const arr = fieldValue.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    return JSON.stringify(arr);
  }

  // 1. Fix English base fields
  const updateData = {};
  if (slot.info_pros && !slot.info_pros.trim().startsWith('[')) {
    updateData.info_pros = convertToJsonArray(slot.info_pros);
  }
  if (slot.info_cons && !slot.info_cons.trim().startsWith('[')) {
    updateData.info_cons = convertToJsonArray(slot.info_cons);
  }

  // 2. Fix Localizations
  let locs = {};
  if (slot.localizations) {
    if (typeof slot.localizations === 'string') {
      try { locs = JSON.parse(slot.localizations); } catch(e){}
    } else {
      locs = slot.localizations;
    }
  }

  for (const lang of Object.keys(locs)) {
    const data = locs[lang];
    if (data.info_pros) {
      locs[lang].info_pros = convertToJsonArray(data.info_pros);
    }
    if (data.info_cons) {
      locs[lang].info_cons = convertToJsonArray(data.info_cons);
    }
  }

  updateData.localizations = JSON.stringify(locs);

  await prisma.slots.update({
    where: { slug: 'gates-of-olympus' },
    data: updateData
  });

  console.log("Successfully fixed info_pros and info_cons arrays in the database!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
