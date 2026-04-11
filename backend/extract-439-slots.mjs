import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';

async function extract439Slots() {
  console.log('🚀 Launching Puppeteer Headless Browser...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('🔗 Navigating to ClashOfSlots...');
  // Go to page
  await page.goto('https://clashofslots.com/best-online-slots/most-popular-slots-2025/', { waitUntil: 'networkidle0' });

  // First, wait 5 seconds for Cloudflare just in case
  await new Promise(r => setTimeout(r, 5000));
  
  console.log('⏳ Entering Auto-Scroll & Load More loop...');
  
  let totalClicks = 0;
  let staleCount = 0;
  
  while (totalClicks < 50) {
    // Extract current slot count for logging
    let currentSlots = await page.evaluate(() => {
      return document.querySelectorAll('a[href*="/slots/"]').length;
    });
    console.log(`📡 Current links count: ${currentSlots}`);
    
    // Check if we hit the button
    const success = await page.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      
      // We know there's a text containing "[number] of 439 slots"
      const textMatches = allElements.filter(el => {
        const text = el.textContent || '';
        return text.toLowerCase().includes('of 439 slots') && ['DIV', 'SPAN', 'P'].includes(el.tagName);
      });

      if (textMatches.length > 0) {
        // The text is just an indicator. The actual Load More button is nearby.
        // Let's traverse up a bit and find a button.
        const textMatch = textMatches[0];
        let parent = textMatch.parentElement;
        for (let i = 0; i < 3; i++) {
          if (!parent) break;
          const btns = Array.from(parent.querySelectorAll('a, button, [role="button"], .btn'));
          const loadMoreBtn = btns.find(b => (b.textContent || '').toLowerCase().includes('load more'));
          if (loadMoreBtn && loadMoreBtn.offsetParent !== null) {
            // Scroll to it and click
            loadMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            loadMoreBtn.click();
            return true;
          }
          parent = parent.parentElement;
        }
      }
      return false;
    });

    if (success) {
      console.log('🔘 Clicked "Load More" button! Waiting for slots to render...');
      totalClicks++;
      await new Promise(r => setTimeout(r, 3000));
    } else {
      console.log('🛑 No visible "Load More" button found. Trying small scroll...');
      await page.evaluate('window.scrollBy(0, 500)');
      await new Promise(r => setTimeout(r, 1000));
      // check if we hit bottom
      const isBottom = await page.evaluate(() => (window.innerHeight + window.scrollY) >= document.body.scrollHeight);
      if (isBottom) {
        console.log('🛑 Reached absolute bottom and no button found. Breaking loop.');
        break;
      }
    }
    
    if (currentSlots > 2000) break; // We got plenty
  }

  console.log('🛑 Extraction loop finished. Parsing DOM into Cheerio...');
  const html = await page.content();
  await browser.close();

  const $ = cheerio.load(html);
  
  const slotsData = [];
  const uniqueSlugs = new Set();

  $('a[href*="/slots/"]').each((i, el) => {
    const link = $(el).attr('href') || '';
    const parts = link.split('/');
    
    if (parts.length >= 7 && parts[3] === 'slots') {
      const providerSlug = parts[4];
      const slotSlug = parts[5];
      const name = $(el).text().trim();
      
      if (!name || name === '') return;
      if (uniqueSlugs.has(slotSlug)) return;

      let container = $(el).parent();
      for(let j = 0; j < 8; j++) {
        if (container.length === 0) break;
        if (container.text().includes('RTP:')) break;
        container = container.parent();
      }
      
      const fullText = container.text().replace(/\n/g, ' ');
      
      let rtpMatch = fullText.match(/RTP:\s*([\d.]+)/);
      let winMatch = fullText.match(/Max Win:\s*x([\d,]+)/);
      let volMatch = fullText.match(/Volatility:\s*([\w\s]+?)[\n\r]*Features:/);
      if (!volMatch) volMatch = fullText.match(/Volatility:\s*([A-Za-z\s]+)/);

      let providerName = providerSlug.split('-').map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(' ');

      uniqueSlugs.add(slotSlug);
      slotsData.push({
        name: name,
        slug: slotSlug,
        providerName,
        rtp: rtpMatch ? parseFloat(rtpMatch[1]) : 96.0,
        volatility: volMatch ? volMatch[1].trim().toLowerCase() : 'high',
        maxWin: winMatch ? parseInt(winMatch[1].replace(/,/g, '')) : 5000
      });
    }
  });

  console.log(`🎯 Successfully Extracted ${slotsData.length} unique slot records!`);
  
  await fs.writeFile('clash_439_slots.json', JSON.stringify(slotsData, null, 2));
  console.log('💾 Saved to backend/clash_439_slots.json');
}

extract439Slots().catch(e => {
  console.error('Fatal Puppeteer Error:', e);
});
