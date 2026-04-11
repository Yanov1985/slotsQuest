const fs = require('fs');
const path = require('path');

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function scrapeBluechip() {
  let existingSlugs = new Set();
  try {
    const existing = JSON.parse(fs.readFileSync(path.join(__dirname, 'existing-slots.json'), 'utf8'));
    existing.forEach(slot => {
      existingSlugs.add(slot.slug);
      existingSlugs.add(generateSlug(slot.title));
    });
    console.log(`✅ Loaded ${existingSlugs.size} existing slugs.`);
  } catch (err) {
    console.warn('⚠️ Could not load existing-slots.json');
  }

  console.log('🌐 Fetching Bluechip Top Games HTML...');
  const res = await fetch('https://bluechip.io/games?title=Top%20Games&tag=top-row');
  const html = await res.text();
  
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) {
    console.error('❌ Could not find __NEXT_DATA__ script in HTML.');
    return;
  }
  
  let json;
  try {
    json = JSON.parse(match[1]);
  } catch (e) {
    console.error('❌ Failed to parse __NEXT_DATA__ JSON:', e.message);
    return;
  }
  
  const gamesList = json?.props?.pageProps?.initialGamesList?.content;
  if (!gamesList || !Array.isArray(gamesList)) {
    console.error('❌ Could not find initialGamesList.content in JSON');
    return;
  }
  
  console.log(`🔥 Extracted ${gamesList.length} games from SSR state.`);
  
  const extracted = [];
  for (const item of gamesList) {
      if (item.name && item.mobileImage) {
         extracted.push({
             title: item.name,
             slug: generateSlug(item.name),
             provider: item.providerName || 'Unknown',
             image_url: item.mobileImage
         });
      }
  }

  // Deduplicate
  const uniqueSlugs = new Set();
  const cleanedGames = [];
  
  for (const game of extracted) {
    if (!uniqueSlugs.has(game.slug)) {
      uniqueSlugs.add(game.slug);
      cleanedGames.push(game);
    }
  }
  
  console.log(`✅ Extracted ${cleanedGames.length} unique, valid games from State.`);
  
  // Filter against DB
  const newGames = cleanedGames.filter(g => !existingSlugs.has(g.slug));
  console.log(`🎉 Found ${newGames.length} NEW games not in database.`);
  
  fs.writeFileSync(path.join(__dirname, 'new-slots-to-import.json'), JSON.stringify(newGames, null, 2));
  console.log('📁 Saved to new-slots-to-import.json');
}

scrapeBluechip().catch(console.error);
