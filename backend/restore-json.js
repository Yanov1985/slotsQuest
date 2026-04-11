const fs = require('fs');
const data = JSON.parse(fs.readFileSync('bluechip_playwright_games.json'));
const unique = {};
for(let g of (data.apiGames || [])) {
  if(g && g.name) {
    g.slug = (g.name+'-'+g.brandName).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    unique[g.slug] = g;
  }
}
const finalGames = Object.values(unique);
fs.writeFileSync('bluechip_popular.json', JSON.stringify(finalGames, null, 2));
console.log('Restored slots:', finalGames.length);
