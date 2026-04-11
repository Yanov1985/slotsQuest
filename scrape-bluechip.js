const { chromium } = require('playwright');

(async () => {
  console.log('Starting browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const games = [];

  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('/api/') || url.includes('graphql') || url.includes('.json')) {
      try {
        const text = await response.text();
        if (text.includes('provider') && text.includes('image')) {
            console.log('Found potential API response:', url);
            // We just grab the text and exit because we don't know the exact structure
            require('fs').writeFileSync('bluechip-data.json', text);
        }
      } catch (e) {}
    }
  });

  console.log('Navigating to Bluechip...');
  await page.goto('https://bluechip.io/games?title=Top%20Games&tag=top-row', { waitUntil: 'networkidle' });

  // Optionally wait a bit
  await page.waitForTimeout(5000);

  // We can also extract elements from the DOM just in case the API intercept fails
  const domGames = await page.evaluate(() => {
    const items = document.querySelectorAll('a[href*="/game/"]');
    return Array.from(items).map(item => {
      const img = item.querySelector('img');
      const href = item.getAttribute('href');
      // usually structure has a span or div with game name and provider
      return {
        url: href,
        image: img ? img.src : null,
        alt: img ? img.alt : null
      };
    });
  });

  require('fs').writeFileSync('bluechip-dom.json', JSON.stringify(domGames, null, 2));
  console.log(`Saved ${domGames.length} games from DOM`);

  await browser.close();
  console.log('Done.');
})();
