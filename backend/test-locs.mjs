import fetch from 'node-fetch';

async function test() {
  const r = await fetch('http://127.0.0.1:3001/api/slots/starlight-princess');
  const d = await r.json();
  const locs = d.localizations;
  const parsed = typeof locs === 'string' ? JSON.parse(locs) : locs;
  
  let ruLoc;
  if (Array.isArray(parsed)) {
    ruLoc = parsed.find(l => l.code === 'ru' || l.region === 'ru');
  } else {
    ruLoc = parsed['ru'] || Object.values(parsed).find(l => l.region === 'ru');
  }
  
  console.log("FAQ IS:", JSON.stringify(ruLoc.faq, null, 2));
  console.log("EXPERT VERDICT IS:", JSON.stringify(ruLoc.expert_verdict, null, 2));
}

test();
