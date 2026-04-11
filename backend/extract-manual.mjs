import { chromium } from 'playwright';
import fs from 'fs';
import readline from 'readline';

(async () => {
  console.log('Starting browser in headful mode (visible)...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: null
  });
  const page = await context.newPage();
  
  const gamesData = [];
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('graphql') || url.includes('api.bluechip') || url.includes('/v2/games')) {
      try {
        const json = await response.json();
        gamesData.push({ url, data: json });
      } catch (e) {}
    }
  });

  console.log('Navigating to Bluechip...');
  try {
    await page.goto('https://bluechip.io/games?title=Popular&tag=popular-row', { waitUntil: 'domcontentloaded' });
  } catch(e) {}
  
  console.log('БРАУЗЕР ОТКРЫТ! Пожалуйста, прокрутите список слотов ("Load More") вручную.');
  console.log('Скрипт автоматически сохранит данные, как только на странице появится 135+ слотов...');
  console.log('У вас есть 3 минуты!');
  console.log('=====================================================================');
  
  try {
      await page.waitForFunction(() => {
         return document.querySelectorAll('.ListItem-Overlay').length >= 135;
      }, { timeout: 180000 });
      console.log('\nУспех! 136 слотов найдено. Extracting from DOM...');
  } catch(e) {
      console.log('\nВремя вышло или ошибка. Сохраняю то, что успели загрузить...');
  }

  const domGames = await page.evaluate(() => {
      const unique = {};
      document.querySelectorAll('.ListItem-Overlay').forEach(a => {
          const slug = a.getAttribute('href').split('/').pop();
          const provider = a.parentElement ? a.parentElement.innerText.split('\n')[0] : 'Unknown';
          const img = a.parentElement ? a.parentElement.querySelector('img') : null;
          
          unique[slug] = { 
              slug,
              brandName: provider,
              name: img ? img.alt : slug,
              mobileImage: img && img.src ? img.src : null
          };
      });
      return Object.values(unique);
  });

  console.log(`Found ${domGames.length} slots in the DOM.`);
  fs.writeFileSync('bluechip_manual_dom.json', JSON.stringify(domGames, null, 2));
  fs.writeFileSync('bluechip_manual_api.json', JSON.stringify(gamesData, null, 2));
  
  console.log('Data saved to bluechip_manual_dom.json and bluechip_manual_api.json');
  await browser.close();
  process.exit(0);
})();
