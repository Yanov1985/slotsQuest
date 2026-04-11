import { chromium } from 'playwright';
import fs from 'fs';

let games = [];

async function scrape() {
    console.log("Starting Playwright...");
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36"
    });
    const page = await context.newPage();

    console.log("Navigating to Bluechip...");
    await page.goto('https://bluechip.io/fi-fi/games?title=Popular&tag=popular-row', { waitUntil: 'load', timeout: 60000 });
    
    // Wait for at least one game card
    await page.waitForSelector('div[class*="GameCard_gameCard"]', { timeout: 15000 }).catch(() => console.log("No card found"));

    let previousCount = 0;
    while (true) {
        // Collect current games
        const items = await page.$$('div[class*="GameCard_gameCard"]');
        console.log(`Current items loaded: ${items.length}`);
        if (items.length > previousCount) {
             previousCount = items.length;
        }

        // Click Load More if it exists
        const btn = await page.$('button:has-text("Load more"), button:has-text("Load More")');
        if (btn) {
            console.log("Clicking 'Load More'...");
            await btn.click({ force: true }).catch(err => console.error(err));
            await page.waitForTimeout(3000); // give time to load network
        } else {
            console.log("No more 'Load More' buttons.");
            break;
        }
    }

    // Now extract data from all
    console.log("Extracting titles, providers, and images...");
    const elements = await page.locator('div[class*="GameCard_gameCard"]').all();
    for (const el of elements) {
         try {
             // Depending on DOM structure
             // The image might be inside a picture > img or similar
             const imgEl = el.locator('img').first();
             const mobileImage = await imgEl.getAttribute('src').catch(()=>null);
             
             // In bluechip card, name is usually in a div or span with 'title' or 'name' class, or it's visually present
             // However, hover state might hide it
             // Actually, often getting the `alt` tag of the image is the easiest!
             const altText = await imgEl.getAttribute('alt').catch(()=>"");
             // Example altText: "Gates of Olympus by Pragmatic Play" or just "Gates of Olympus"
             
             // A more reliable way: check elements with text inside card
             const texts = await el.allInnerTexts();
             const allText = texts.join(' ').split('\n');
             let name = altText || allText[0] || "Unknown";
             let brandName = "Unknown Provider";
             // Usually on Bluechip, provider is at the bottom, or in the alt text
             if (altText && altText.includes(' by ')) {
                 const split = altText.split(' by ');
                 name = split[0];
                 brandName = split[1];
             }

             if (mobileImage) {
                 games.push({ name, brandName, mobileImage, mobileId: games.length });
             }
         } catch(e) {}
    }

    // Remove duplicates
    const finalGames = [];
    const seen = new Set();
    for (let g of games) {
         if (!seen.has(g.name)) {
             seen.add(g.name);
             finalGames.push(g);
         }
    }

    console.log(`Extracted ${finalGames.length} unique games!`);
    fs.writeFileSync('bluechip_popular.json', JSON.stringify(finalGames, null, 2));

    await browser.close();
}
scrape().catch(err => {
    console.error(err);
    process.exit(1);
});
