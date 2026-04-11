const fetch = require('node-fetch');
const fs = require('fs');

async function run() {
  const res = await fetch('https://bluechip.io/fi-fi/games?title=Popular&tag=popular-row', {
      headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
  });
  const html = await res.text();
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (match) {
    const json = JSON.parse(match[1]);
    const games = json.props.pageProps.initialGamesList.content;
    console.log("Scraped games:", games.length);
    fs.writeFileSync('bluechip_popular.json', JSON.stringify(games, null, 2));
  } else {
    console.log("no match");
  }
}
run();
