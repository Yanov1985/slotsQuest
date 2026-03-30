import * as cheerio from 'cheerio';

async function probe() {
  const res = await fetch('https://clashofslots.com/best-online-slots/year-2023/');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  // Try several common class names for slot grids
  console.log('Total a tags with /slots/:', $('a[href*="/slots/"]').length);
  
  const slots = [];
  // Find all elements looking like a slot card
  $('a[href*="/slots/"]').each((i, el) => {
    const link = $(el).attr('href');
    const name = $(el).text().trim();
    if (name && link && link.split('/').length >= 5 && link.includes('clashofslots.com/slots/')) {
       // Filter out /pragmatic-play/ direct links etc.
       slots.push({ name, link });
    }
  });

  // Print first 5 unique
  const unique = Array.from(new Set(slots.map(s => s.link)))
                      .map(link => slots.find(s => s.link === link));
  
  console.log('Unique slots found:', unique.length);
  console.log(unique.slice(0, 5));
}

probe().catch(console.error);
