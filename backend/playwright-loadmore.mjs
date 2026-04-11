import { chromium } from 'playwright';
import fs from 'fs';

async function scrape() {
    console.log("Starting Playwright (headless: false)...");
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36"
    });
    const page = await context.newPage();

    let apiGames = [];

    // Intercept JSON responses
    page.on('response', async (response) => {
        try {
            const url = response.url();
            if (url.includes('graphql') || url.includes('/api/') || url.includes('mapi')) {
                const type = response.headers()['content-type'];
                if (type && type.includes('json')) {
                    const json = await response.json().catch(()=>null);
                    if (json && json.content) { 
                        apiGames.push(...json.content);
                        console.log("Intercepted API response length:", json.content.length);
                    }
                }
            }
        } catch(e) {}
    });

    console.log("Navigating to Bluechip...");
    await page.goto('https://bluechip.io/en/games?title=Popular&tag=popular-row', { waitUntil: 'load', timeout: 90000 }).catch(e => console.error("Goto error:", e));
    
    await page.waitForTimeout(5000);

    let count = 0;
    while(count < 8) {
        const btn = await page.$('button:has-text("Load more"), button:has-text("Load More")').catch(()=>null);
        if (btn) {
            console.log("Clicking Load More...");
            await btn.click({force: true}).catch(()=>null);
            await page.waitForTimeout(3500);
            count++;
        } else {
            console.log("No Load More button found. Scrolling...");
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await page.waitForTimeout(2000);
            count++;
        }
    }

    // Attempt to extract from DOM as fallback
    const games = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => {
            const alt = img.getAttribute('alt');
            const src = img.getAttribute('src');
            return { alt, src };
        }).filter(item => item.alt && item.src);
    });

    console.log(`DOM extraction found ${games.length} images.`);
    fs.writeFileSync('bluechip_playwright_games.json', JSON.stringify({ apiGames, domGames: games }, null, 2));

    await browser.close();
}
scrape().catch(err => {
    console.error(err);
    process.exit(1);
});
