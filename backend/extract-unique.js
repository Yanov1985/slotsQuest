const fs = require('fs');

const ssrData = JSON.parse(fs.readFileSync('bluechip_next_data.json', 'utf8'));
const pwData = JSON.parse(fs.readFileSync('bluechip_playwright_games.json', 'utf8'));

let finalGames = [];
let seen = new Set();

// Add from SSR first (highest quality metadata)
const ssrGamesList = ssrData?.props?.pageProps?.initialGamesList?.content || [];
for (let g of ssrGamesList) {
    if (!g.name) continue;
    if (!seen.has(g.name)) {
        seen.add(g.name);
        finalGames.push({
            name: g.name,
            brandName: g.brandName || "Unknown",
            mobileImage: g.mobileImage,
            source: "ssr"
        });
    }
}

// Add from API interception
for (let g of pwData.apiGames || []) {
    if (!g.name) continue;
    if (!seen.has(g.name)) {
        seen.add(g.name);
        finalGames.push({
            name: g.name,
            brandName: g.brandName || "Unknown",
            mobileImage: g.mobileImage,
            source: "api"
        });
    }
}

// Add from DOM
for (let g of pwData.domGames || []) {
    let alt = g.alt;
    if (!alt || !alt.includes(' by ')) continue;
    let [name, brandName] = alt.split(' by ');
    name = name.trim();
    brandName = brandName.trim();
    if (!seen.has(name)) {
        seen.add(name);
        let src = g.src;
        // Fix relative URLs if any
        if (src.startsWith('/')) src = `https://bluechip.io${src}`;
        
        finalGames.push({
            name,
            brandName,
            mobileImage: src,
            source: "dom"
        });
    }
}

console.log(`Total unique games found: ${finalGames.length}`);
fs.writeFileSync('bluechip_popular.json', JSON.stringify(finalGames, null, 2));

