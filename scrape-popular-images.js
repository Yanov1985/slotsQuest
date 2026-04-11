const { chromium } = require('playwright');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  console.log('Запуск браузера Playwright...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  console.log('Открываю список популярных слотов...');
  await page.goto('https://bluechip.io/games?title=Popular&tag=popular-row', { waitUntil: 'domcontentloaded' });

  // Небольшая задержка, чтобы страница базово загрузилась
  await page.waitForTimeout(5000);

  console.log('\n======================================================');
  console.log('>>> БРАУЗЕР ОТКРЫТ! <<<');
  console.log('1. Перейдите в открывшееся окно браузера.');
  console.log('2. Прокрутите страницу до конца, нажимая "Load More" (или аналогичную кнопку).');
  console.log('3. Как только загрузятся все слоты, вернитесь в терминал.');
  console.log('======================================================\n');

  await new Promise(resolve => rl.question('>>> Нажмите ENTER в этой консоли, чтобы начать парсинг изображений <<<', resolve));

  console.log('Начинаю извлечение данных из страницы...');

  const domGames = await page.evaluate(() => {
    const items = document.querySelectorAll('a[href*="/game/"]');
    const results = {};

    Array.from(items).forEach(item => {
      const img = item.querySelector('img');
      const href = item.getAttribute('href');
      
      // Извлекаем slug, отбрасывая GET-параметры
      let slug = href.split('/').pop().replace(/\?.*/, '');
      
      let src = null;
      if (img) {
        if (img.dataset && img.dataset.src) {
          src = img.dataset.src;
        } else if (img.getAttribute('data-src')) {
          src = img.getAttribute('data-src');
        } else if (img.getAttribute('srcset')) {
          src = img.getAttribute('srcset').split(' ')[0];
        } else {
          src = img.src;
        }
      }
      
      const parent = item.querySelector('.picture, picture');
      if (parent) {
          const source = parent.querySelector('source');
          if (source && source.srcset) {
            src = source.srcset.split(' ')[0];
          }
      }

      if (slug && src && !src.includes('data:image')) {
        results[slug] = src;
      }
    });

    return results;
  });

  const slotsFound = Object.keys(domGames).length;
  console.log(`Успешно получены изображения для ${slotsFound} слотов!`);

  fs.writeFileSync('popular_covers.json', JSON.stringify(domGames, null, 2));
  console.log('Данные сохранены в файл: popular_covers.json');

  await browser.close();
  rl.close();
  
  console.log('\nТеперь перейдите к скрипту: backend/update_popular_images.js (или запустите `node backend/update_popular_images.js`)');
})();
