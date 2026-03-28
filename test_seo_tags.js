const http = require('http');
http.get('http://localhost:3000/slots/gates-of-olympus', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descMatch = body.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i) || body.match(/<meta[^>]+content="([^"]+)"[^>]+name="description"/i);
    const kwsMatch = body.match(/<meta[^>]+name="keywords"[^>]+content="([^"]+)"/i) || body.match(/<meta[^>]+content="([^"]+)"[^>]+name="keywords"/i);
    const ogTitleMatch = body.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i) || body.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:title"/i);
    const ogDescMatch = body.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i) || body.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:description"/i);
    const twTitleMatch = body.match(/<meta[^>]+name="twitter:title"[^>]+content="([^"]+)"/i) || body.match(/<meta[^>]+content="([^"]+)"[^>]+name="twitter:title"/i);
    
    console.log("=== SEO TAGS EXTRACTED FROM HTML ===");
    console.log("Title: " + (titleMatch ? titleMatch[1] : "NOT FOUND"));
    console.log("Description: " + (descMatch ? descMatch[1] : "NOT FOUND"));
    console.log("Keywords: " + (kwsMatch ? kwsMatch[1] : "NOT FOUND"));
    console.log("OG Title: " + (ogTitleMatch ? ogTitleMatch[1] : "NOT FOUND"));
    console.log("OG Desc: " + (ogDescMatch ? ogDescMatch[1] : "NOT FOUND"));
    console.log("Twitter Title: " + (twTitleMatch ? twTitleMatch[1] : "NOT FOUND"));
  });
});
