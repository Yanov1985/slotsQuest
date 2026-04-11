import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  console.log('Navigating...');
  await page.goto('https://clashofslots.com/best-online-slots/most-popular-slots-2025/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 5000));
  
  // Scroll a bit
  for (let i = 0; i < 5; i++) {
    await page.evaluate('window.scrollBy(0, 1000)');
    await new Promise(r => setTimeout(r, 500));
  }
  
  await page.screenshot({ path: 'clash_full.png', fullPage: true });
  console.log('Saved clash_full.png');
  await browser.close();
})();
