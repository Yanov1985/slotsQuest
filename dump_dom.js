const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/slots');
    await page.waitForLoadState('networkidle');
    const content = await page.content();
    fs.writeFileSync('dom_dump.html', content);
    await browser.close();
})();
