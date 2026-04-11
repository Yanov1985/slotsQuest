const http = require('http');
function checkApi(slug) {
  http.get(`http://localhost:3001/api/slots/${slug}`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const d = JSON.parse(data);
        const slot = d.data || d;
        console.log(`=== ${slug} ===`);
        console.log('overview_description_1:', slot.overview_description_1 ? slot.overview_description_1.length : 'MISSING');
        console.log('overview:', slot.overview ? slot.overview.length : 'MISSING');
        console.log('mechanics:', slot.mechanics ? slot.mechanics.length : 'MISSING');
        const locs = typeof slot.localizations === 'string' ? JSON.parse(slot.localizations) : slot.localizations;
        let ruLoc = null;
        if (Array.isArray(locs)) {
          ruLoc = locs.find(l => l.code === 'ru' || l.region === 'ru');
        } else if (locs && typeof locs === 'object') {
          ruLoc = locs['ru'];
        }
        console.log('RU overview_desc_1:', ruLoc?.overview_description_1?.substring(0, 30));
        console.log('RU description:', ruLoc?.description?.substring(0, 30));
        console.log('RU info_expert_verdict:', ruLoc?.info_expert_verdict?.substring(0, 30));
        console.log('RU keys:', ruLoc ? Object.keys(ruLoc) : 'No ru object');
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', e => console.error(e.message));
}
checkApi('gates-of-olympus');
checkApi('sweet-bonanza');
checkApi('sugar-rush');
checkApi('starlight-princess');
