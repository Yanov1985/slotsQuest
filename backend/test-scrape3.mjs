import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function start() {
    const res = await fetch('https://clashofslots.com/slots/pragmatic-play/gates-of-olympus/');
    const html = await res.text();
    const $ = cheerio.load(html);

    const candidates = [];
    $('img').each((i, el) => {
        const src = $(el).attr('src');
        if (src && src.includes('Gates-of-Olympus-foto')) {
            candidates.push({
                src: src,
                class: $(el).attr('class'),
                parentId: $(el).parent().attr('id'),
                parentClass: $(el).parent().attr('class')
            });
        }
    });

    console.log("Found target image in DOM elements:", candidates);
}

start().catch(console.error);
