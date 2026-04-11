const fs = require('fs');

async function checkHTML() {
    console.log('Fetching...');
    const res = await fetch('https://bluechip.io/games?title=Top%20Games&tag=top-row');
    const text = await res.text();
    fs.writeFileSync('bluechip-html.txt', text);
    console.log('Saved to bluechip-html.txt');
    console.log('Gates of Olympus count:', (text.match(/Gates of Olympus/ig) || []).length);
    console.log('img src count:', (text.match(/<img[^>]*src/ig) || []).length);
}

checkHTML();
