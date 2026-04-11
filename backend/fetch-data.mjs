import fetch from 'node-fetch';
import fs from 'fs';

async function start() {
    console.log("Fetching...");
    const res = await fetch('https://bluechip.io/fi-fi/games?title=Popular&tag=popular-row', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html'
        }
    });
    const html = await res.text();
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
    if (match) {
        fs.writeFileSync('bluechip_next_data.json', match[1]);
        console.log('Saved bluechip_next_data.json');
    } else {
        console.log('No next data found!');
    }
}
start();
