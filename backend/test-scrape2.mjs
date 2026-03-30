import * as cheerio from 'cheerio';

async function probe() {
  const res = await fetch('https://clashofslots.com/best-online-slots/year-2023/');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const blocks = [];
  $('*').each((i, el) => {
    const text = $(el).text();
    if (text.includes('RTP:') && text.includes('Max Win:') && $(el).children().length <= 5) {
       blocks.push(text.trim());
    }
  });

  console.log('Found blocks:', blocks.length);
  console.log(blocks.slice(0, 3));
}

probe().catch(console.error);
