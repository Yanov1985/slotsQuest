const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Intercept the API call to get the exact JSON data
  const gamesData = [];
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/api/v2/games') || url.includes('/graphql') || url.includes('api.bluechip.io')) {
      try {
        const json = await response.json();
        // Just dump the entire json if it seems to contain games
        if (JSON.stringify(json).includes('provider') && JSON.stringify(json).includes('image')) {
            gamesData.push({ url, data: json });
            console.log('Got API response from', url);
        }
      } catch (e) {}
    }
  });

  console.log('Navigating to Bluechip Tops...');
  await page.goto('https://bluechip.io/games?title=Top%20Games&tag=top-row', { waitUntil: 'networkidle' });
  
  await page.waitForTimeout(5000); // Give it time to load and fetch API
  
  // Scroll down a bunch of times to trigger lazy loading if needed
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(1000);
  }

  // Also extract from DOM reading data-src or background-image
  const domGames = await page.evaluate(() => {
    const items = document.querySelectorAll('a[href*="/game/"]');
    return Array.from(items).map(item => {
      const img = item.querySelector('img');
      const href = item.getAttribute('href');
      let src = img ? img.src : null;
      if (img && img.dataset && img.dataset.src) {
        src = img.dataset.src;
      } else if (img && img.getAttribute('data-src')) {
        src = img.getAttribute('data-src');
      } else if (img && img.getAttribute('srcset')) {
          src = img.getAttribute('srcset').split(' ')[0];
      }
      
      const parent = item.querySelector('.picture, picture');
      if (parent) {
          const source = parent.querySelector('source');
          if (source && source.srcset) src = source.srcset.split(' ')[0];
      }

      return {
        url: href,
        image: src,
        alt: img ? img.alt : null
      };
    }).filter(g => g.image && !g.image.includes('data:image'));
  });

  fs.writeFileSync('bc-games-api.json', JSON.stringify(gamesData, null, 2));
  fs.writeFileSync('bc-games-dom.json', JSON.stringify(domGames, null, 2));
  console.log(`Saved API data and ${domGames.length} DOM games`);
  
  await browser.close();
})();
