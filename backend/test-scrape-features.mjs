import * as cheerio from 'cheerio';

async function testScrape() {
  console.log('Fetching Mummyland Treasures...');
  const res = await fetch('https://clashofslots.com/slots/bgaming/mummyland-treasures/');
  const html = await res.text();
  const $ = cheerio.load(html);
  
  console.log('\\n--- Features ---');
  // Usually, features are in a list with specific classes.
  // We can search for the text "Features" or "Theme"
  
  $('h3').each((i, el) => {
     const t = $(el).text();
     if(t.includes('Features')) {
         console.log('Found Features block:');
         const list = $(el).next('ul').text();
         console.log(list);
     }
  });

  // Let's print all attributes in the overview table
  console.log('\\n--- Overview Table ---');
  $('.slot_page_tags a').each((i, el) => {
      console.log('Tag:', $(el).text());
  });

  $('.slot_page_features a').each((i, el) => {
      console.log('Feature:', $(el).text());
  });

  // Most of the time, themes and mechanics are just link tags with specific parent wrappers.
  const tags = [];
  $('a[href*="/features/"]').each((i, el) => tags.push('Feature: ' + $(el).text().trim()));
  $('a[href*="/themes/"]').each((i, el) => tags.push('Theme: ' + $(el).text().trim()));
  $('a[href*="/mechanics/"]').each((i, el) => tags.push('Mechanic: ' + $(el).text().trim()));
  
  console.log('\\n--- Direct Links ---');
  console.log([...new Set(tags)].join('\\n'));
}

testScrape().catch(console.error);
