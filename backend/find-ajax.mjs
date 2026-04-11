import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Set larger viewport to see more
  await page.setViewport({ width: 1920, height: 1080 });

  page.on('response', async res => {
    const url = res.url();
    // Only care about XHR or Fetch
    if (['xhr', 'fetch'].includes(res.request().resourceType())) {
      console.log(`[NETWORK] ${res.request().method()} ${url}`);
    }
  });

  console.log('Navigating...');
  await page.goto('https://clashofslots.com/best-online-slots/most-popular-slots-2025/', { waitUntil: 'networkidle0' });

  // Scroll down multiple times
  console.log('Scrolling to trigger lazy load / infinite scroll...');
  for (let i = 0; i < 5; i++) {
    await page.evaluate('window.scrollBy(0, 1000)');
    await new Promise(r => setTimeout(r, 1000));
  }
  
  // Try to find any element with "Show more", "Load more" or "Displaying"
  console.log('Hunting for buttons...');
  const clicked = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('*'));
    const target = els.find(el => {
      const text = el.textContent || '';
      return (text.includes('Show more') || text.includes('Load more') || text.includes('Displaying')) && ['DIV', 'A', 'BUTTON', 'SPAN', 'P'].includes(el.tagName);
    });
    
    if (target) {
      console.log(`Found candidate tag: ${target.tagName}, text: ${target.textContent.trim().slice(0, 40)}`);
      // find closest clickable
      const btn = target.closest('a, button, [role="button"], .btn, .button, [onclick]') || target;
      btn.click();
      return true;
    }
    return false;
  });
  
  if (clicked) {
    console.log('Clicked a "Load More" candidate! Waiting for network...');
    await new Promise(r => setTimeout(r, 4000));
  } else {
    console.log('Could not find any obvious "Load More" button.');
    // Let's dump all text that has numbers
    await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('*'));
      const txt = els.find(el => el.textContent && el.textContent.includes('of 439 slots'));
      if (txt) {
        console.log(`Found text node "of 439 slots" in: <${txt.tagName} class="${txt.className}">`);
        if (txt.offsetParent !== null) txt.click();
      }
    });
    await new Promise(r => setTimeout(r, 2000));
  }

  await browser.close();
})();
