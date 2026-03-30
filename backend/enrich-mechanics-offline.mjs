import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function findOrCreateFeature(type, name, prismaModel) {
  const slug = toSlug(name);
  let record = await prismaModel.findUnique({ where: { slug } });
  if (!record) {
    let newId;
    if (type === 'Theme') {
       newId = crypto.randomUUID();
    } else {
       const agg = await prismaModel.aggregate({ _max: { id: true } });
       newId = (agg._max.id || 0) + 1;
    }
    
    // In case of parallel races, we just try to create. 
    // If it fails on Unique id, we add a random offset.
    try {
      record = await prismaModel.create({
        data: {
          id: newId,
          name,
          slug
        }
      });
      console.log(`   🌟 Created New ${type}: ${name} (ID: ${newId})`);
    } catch (e) {
      if (e.code === 'P2002') {
         // Fallback if ID collided during parallel run
         newId = newId + Math.floor(Math.random() * 1000) + 500;
         record = await prismaModel.create({
            data: { id: newId, name, slug }
         });
         console.log(`   🌟 Created New ${type}: ${name} (ID: ${newId} fallback)`);
      } else throw e;
    }
  }
  return record.id;
}

function getHeuristics(name) {
  const t = name.toLowerCase();
  
  let themes = ['Classic'];
  let mechanics = ['Paylines'];
  let bonuses = ['Free Spins', 'Wilds'];

  // Themes
  if (t.includes('mummy') || t.includes('egypt') || t.includes('book of') || t.includes('cleopatra') || t.includes('tome') || t.includes('giza')) {
    themes = ['Ancient Egypt', 'Adventure'];
  } else if (t.includes('zeus') || t.includes('hades') || t.includes('olympus') || t.includes('myth') || t.includes('midas')) {
    themes = ['Mythology', 'Ancient Greece'];
  } else if (t.includes('sugar') || t.includes('sweet') || t.includes('candy') || t.includes('fruit')) {
    themes = ['Sweets', 'Fruits'];
  } else if (t.includes('bass') || t.includes('fish') || t.includes('shark') || t.includes('river')) {
    themes = ['Fishing', 'Water World'];
  } else if (t.includes('dog') || t.includes('cat') || t.includes('animal') || t.includes('bamboo')) {
    themes = ['Animals', 'Nature'];
  } else if (t.includes('wild') || t.includes('west') || t.includes('bandito') || t.includes('bounty') || t.includes('wanted')) {
    themes = ['Wild West', 'Adventure'];
  } else if (t.includes('mental') || t.includes('dark') || t.includes('tomb') || t.includes('blood')) {
    themes = ['Horror', 'Dark'];
  } else if (t.includes('xmas') || t.includes('christmas') || t.includes('santa') || t.includes('winter')) {
    themes = ['Christmas', 'Winter Holiday'];
  } else if (t.includes('fire') || t.includes('hot') || t.includes('blazing') || t.includes('coin')) {
    themes = ['Classic', 'Gems & Coins'];
  }

  // Mechanics
  if (t.includes('megaways')) {
    mechanics = ['Megaways', 'Cascading Reels'];
  } else if (t.includes('sugar') || t.includes('olympus') || t.includes('sweet')) {
    mechanics = ['Pay Anywhere', 'Cascading Reels'];
  } else if (t.includes('book')) {
    mechanics = ['Expanding Symbols', 'Paylines'];
  } else if (t.includes('bass') || t.includes('fish')) {
    mechanics = ['Paylines', 'Money Symbol Collect'];
  } else if (t.includes('x') || t.includes('mental') || t.includes('nolimit')) {
    mechanics = ['xWays', 'xNudge', 'Extreme Volatility'];
  } else if (t.includes('mummyland')) {
    mechanics = ['Cascading Reels', 'Cluster Pays'];
  }

  // Bonuses
  if (t.includes('book')) {
    bonuses = ['Free Spins', 'Expanding Wilds', 'Gamble Feature'];
  } else if (t.includes('olympus') || t.includes('sugar') || t.includes('mummyland')) {
    bonuses = ['Free Spins', 'Multipliers', 'Bonus Buy', 'Tumble Feature'];
  } else if (t.includes('megaways')) {
    bonuses = ['Free Spins', 'Progressive Multiplier', 'Mystery Symbols'];
  } else if (t.includes('bass')) {
    bonuses = ['Free Spins', 'Retriggers', 'Money Collect', 'Wild Upgrades'];
  } else if (t.includes('mental')) {
    bonuses = ['Free Spins', 'Dead Patient', 'Enhancer Cells'];
  } else if (t.includes('xmas')) {
    bonuses = ['Free Spins', 'Bonus Buy', 'Multipliers'];
  } else {
     bonuses = ['Free Spins', 'Bonus Buy', 'Wild Symbols'];
  }

  return { themes, mechanics, bonuses };
}

async function start() {
  console.log('🤖 Heuristic DB Hydration Protocol Started...');
  
  const slots = await prisma.slots.findMany({
    include: {
      providers: true,
      slotThemes: true,
      slot_mechanics: true,
      slot_bonuses: true
    }
  });

  const slotsToHydrate = slots.filter(s => 
     s.slotThemes.length === 0 && 
     s.slot_mechanics.length === 0 && 
     s.slot_bonuses.length === 0
  );

  console.log(`Found ${slotsToHydrate.length} slots missing characteristics!`);

  for (const slot of slotsToHydrate) {
    console.log(`\\n🌀 Processing [${slot.name}] by ${slot.providers.name}...`);
    
    // Use smart heuristic dictionary matching to deduce parameters based on the slot's Name
    const data = getHeuristics(slot.name);

    console.log(`   🧠 Heuristic Match:`, data);

    // Hydrate Themes
    for (const t of data.themes) {
      const themeId = await findOrCreateFeature('Theme', t, prisma.themes);
      await prisma.slot_themes.create({
         data: { slot_id: slot.id, theme_id: themeId }
      }).catch(e => console.log('Link exists'));
    }

    // Hydrate Mechanics
    for (const m of data.mechanics) {
      const mechId = await findOrCreateFeature('Mechanic', m, prisma.mechanics);
      await prisma.slot_mechanics.create({
         data: { slot_id: slot.id, mechanic_id: mechId }
      }).catch(e => console.log('Link exists'));
    }

    // Hydrate Bonuses
    for (const b of data.bonuses) {
      const bonusId = await findOrCreateFeature('Bonus', b, prisma.bonuses);
      await prisma.slot_bonuses.create({
         data: { slot_id: slot.id, bonus_id: bonusId }
      }).catch(e => console.log('Link exists'));
    }

    console.log(`   ✅ Links established natively in DB!`);
  }
}

start().catch(console.error);
