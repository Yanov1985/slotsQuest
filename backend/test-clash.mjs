import * as cheerio from 'cheerio';

async function check() {
  const res = await fetch('https://clashofslots.com/best-online-slots/most-popular-slots-2025/');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const uniqueUrls = new Set();
  $('a[href*="/slots/"]').each((i, el) => {
    uniqueUrls.add($(el).attr('href'));
  });
  
  console.log('Unique /slots/ URLs:', uniqueUrls.size);
  
  const slotsList = Array.from(uniqueUrls).slice(0, 10);
  console.log('Sample URLs:');
  console.log(slotsList.join('\n'));
}

check().catch(console.error);
