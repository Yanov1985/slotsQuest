import puppeteer from 'puppeteer';

async function intercept() {
  console.log('Intercepting network requests on ClashOfSlots...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Intercept and print all fetch/xhr requests
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('ajax') || url.includes('api') || url.includes('json') || url.includes('slots')) {
      if (response.request().resourceType() === 'fetch' || response.request().resourceType() === 'xhr') {
        console.log(`[API] ${response.request().method()} ${url}`);
        if (response.request().method() === 'POST' || url.includes('admin-ajax')) {
          console.log(`[POST DATA]: ${response.request().postData()}`);
        }
      }
    }
  });

  await page.goto('https://clashofslots.com/best-online-slots/most-popular-slots-2025/', { waitUntil: 'networkidle2' });

  // Attempt to scroll to the middle of the page to trigger the table lazy-load or load more
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight / 3);
  });
  await new Promise(r => setTimeout(r, 2000));
  
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight / 1.5);
  });
  await new Promise(r => setTimeout(r, 2000));
  
  const html = await page.content();
  console.log('Finding text "Displaying":');
  await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('*'));
    els.forEach(el => {
      if (el.textContent && el.textContent.includes('Displaying') && el.textContent.includes('of')) {
        console.log(`FOUND BUTTON: <${el.tagName} class="${el.className}"> ${el.textContent.trim()} </${el.tagName}>`);
      }
    });
  });

  await browser.close();
}

intercept().catch(console.error);
