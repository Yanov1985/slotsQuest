import fetch from 'node-fetch';

async function run() {
  console.log("Fetching API directly...");
  // Try directly hitting their paginated API: 
  // It usually is https://bluechip.io/api/v1/games?tags=popular-row&limit=150
  try {
     const res = await fetch("https://bluechip.io/api/v2/games?tags=popular-row&limit=150", {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 10000
     });
     if (res.ok) {
        const json = await res.json();
        console.log("Games from v2 API:", json?.content?.length || json?.games?.length || "No games field");
        process.exit(0);
     }
  } catch(e) { }

  try {
      const res = await fetch("https://bluechip.io/api/v1/games?tags=popular-row&limit=150", {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 10000
      });
      if (res.ok) {
         const json = await res.json();
         console.log("Games from v1 API:", json?.content?.length || json?.games?.length || "No games field");
         process.exit(0);
      }
  } catch(e) {}
  
  console.log("Fetching SSR state instead...");
  try {
      const res = await fetch('https://bluechip.io/fi-fi/games?title=Popular&tag=popular-row', {
          headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
          },
          timeout: 15000
      });
      const t = await res.text();
      const m = t.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
      if(m){
          const json = JSON.parse(m[1]);
          console.log('initialGamesList len:', json.props.pageProps.initialGamesList?.content?.length);
          console.log('totalElements:', json.props.pageProps.initialGamesList?.totalElements);
      }
  } catch(e) { console.error(e) }
}
run();
