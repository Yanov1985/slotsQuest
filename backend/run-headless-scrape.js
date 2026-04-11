const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('Starting headless browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  const page = await context.newPage();
  
  // Navigate
  await page.goto('https://bluechip.io/fi-fi/games?title=Popular&tag=popular-row', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000); 

  console.log('Scrolling to load more games...');
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => {
      window.scrollBy({ top: window.innerHeight * 2, behavior: 'smooth' });
    });
    
    // Attempt clicking 'Load More' buttons if they exist
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div, span'));
      const btn = btns.find(b => b.textContent && (
        b.textContent.toLowerCase().includes('lisää') ||
        b.textContent.toLowerCase().includes('more') ||
        b.textContent.toLowerCase().includes('show')
      ) && b.offsetHeight > 0 && b.tagName !== 'A');
      if (btn) btn.click();
    });

    await page.waitForTimeout(2000);
  }
  
  const domGames = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll('.ListItem-Overlay').forEach(e => {
        const slug = e.getAttribute('href').split('/').pop();
        const pElem = e.parentElement ? e.parentElement.innerText.split('\\n')[0] : '';
        const imgElem = e.parentElement ? e.parentElement.querySelector('img') : null;
        let title = imgElem ? imgElem.getAttribute('alt') : '';
        if (!title || title.toLowerCase() === 'game') title = slug.replace(/-/g, ' ');
        let imgUrl = imgElem ? imgElem.src : '';
        if (imgElem && imgElem.srcset) {
            imgUrl = imgElem.srcset.split(' ')[0];
        }
        
        if (slug) {
            results.push({
                name: title,
                brandName: pElem,
                mobileImage: imgUrl,
                slug: slug
            });
        }
      });
      return results;
  });

  const uniqueMap = {};
  for(let g of domGames) {
      if(g.slug && !uniqueMap[g.slug]) {
          uniqueMap[g.slug] = g;
      }
  }

  const finalGames = Object.values(uniqueMap);
  fs.writeFileSync('bluechip_popular.json', JSON.stringify(finalGames, null, 2));
  console.log(`Saved ${finalGames.length} Popular games from DOM API.`);

  await browser.close();
})();
