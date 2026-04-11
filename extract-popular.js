const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  const gamesData = [];
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('api.bluechip') || url.includes('/v2/games') || url.includes('/api/ssr/games')) {
      try {
        const json = await response.json();
        gamesData.push({ url, data: json });
      } catch (e) {}
    }
  });

  console.log('Navigating to Bluechip Popular...');
  try {
    await page.goto('https://bluechip.io/fi-fi/games?title=Popular&tag=popular-row', { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch(e) { console.error('Goto error:', e.message); }
  
  await page.waitForTimeout(8000); 
  
  console.log('Scrolling / Clicking Load More...');
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => {
      window.scrollBy({ top: 3000, left: 0, behavior: 'smooth' });
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);

      const btns = Array.from(document.querySelectorAll('button, div, span'));
      const btn = btns.find(b => b.textContent && (
        b.textContent.toLowerCase().includes('lisää') ||
        b.textContent.toLowerCase().includes('more') ||
        b.textContent.toLowerCase().includes('load') ||
        b.textContent.toLowerCase().includes('show')
      ) && b.offsetHeight > 0 && b.tagName !== 'A');
      if (btn) btn.click();

      // Accumulate games
      window.allGames = window.allGames || {};
      Array.from(document.querySelectorAll('.ListItem-Overlay')).forEach(e => {
        const s = e.getAttribute('href').split('/').pop();
        const p = e.parentElement ? e.parentElement.innerText.split('\n')[0] : '';
        const i = e.parentElement ? e.parentElement.querySelector('img') : null;
        let t = i ? i.getAttribute('alt') : '';
        if (!t || t.toLowerCase() === 'game') t = s.replace(/-/g, ' ');
        if (s && !window.allGames[s]) {
           window.allGames[s] = { title: t, provider: p, slug: s };
        }
      });
    });
    await page.waitForTimeout(3000);
  }
  
  const domGames = await page.evaluate(() => {
    return Object.values(window.allGames || {});
  });

  const uniqueMap = {};
  for(let g of domGames) {
      if(g.slug && !uniqueMap[g.slug]) {
          uniqueMap[g.slug] = g;
      }
  }

  fs.writeFileSync('backend/bluechip_popular.json', JSON.stringify(Object.values(uniqueMap), null, 2));
  fs.writeFileSync('backend/bluechip_popular_api.json', JSON.stringify(gamesData, null, 2));
  console.log(`Saved ${Object.keys(uniqueMap).length} Popular games from DOM`);
  console.log(`Saved ${gamesData.length} Popular games API responses`);

  await browser.close();
})();
