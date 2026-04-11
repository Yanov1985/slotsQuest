const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log(`[NETWORK FAILED] ${response.status()} ${response.url()}`);
      errors.push(`[NETWORK FAILED] ${response.status()} ${response.url()}`);
    }
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[CONSOLE ERROR] ${msg.text()}`);
      errors.push(`[CONSOLE ERROR] ${msg.text()}`);
    }
  });

  try {
    console.log('Navigating to http://127.0.0.1:3000/');
    await page.goto('http://127.0.0.1:3000/');
    
    console.log('Waiting for network idle...');
    await page.waitForLoadState('networkidle');

    console.log('Clicking on a slot link...');
    // Click the first link that goes to /slots/
    await page.click('a[href^="/slots/"]');
    
    console.log('Waiting for network idle after navigation...');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
  } catch (err) {
    console.log(`[SCRIPT ERROR] ${err.message}`);
  } finally {
    await browser.close();
  }
})();
