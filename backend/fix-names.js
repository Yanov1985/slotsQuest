const fs=require('fs');
let dom = JSON.parse(fs.readFileSync('bluechip_manual_dom.json', 'utf8'));
const api = JSON.parse(fs.readFileSync('bluechip_manual_api.json', 'utf8'));
let apiGames = {};

api.forEach(r => {
  if (r.data && typeof r.data === 'object') {
     try {
       JSON.stringify(r.data, (k,v) => { if (v && v.slug && v.name && typeof v.name==='string') apiGames[v.slug] = v.name; return v; });
     } catch(e){}
  }
});

let c = 0;
dom.forEach(d => {
  let old = d.name;
  if(apiGames[d.slug]) {
       d.name = apiGames[d.slug];
  } else if (d.name === 'Remote image' || !d.name || d.name === 'undefined') {
       d.name = d.slug.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ');
  }
  if (old !== d.name) c++;
});

fs.writeFileSync('bluechip_manual_dom.json', JSON.stringify(dom, null, 2));
console.log('Fixed names count:', c);
console.log('Fixed names head:', dom.slice(0,5).map(d => d.name));
