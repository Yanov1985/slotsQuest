const fs = require('fs');
const d = require('./bluechip_next_data.json');
const items = d.props?.pageProps?.initialGamesList?.content || [];
console.log('Items in backup:', items.length);
if (items.length > 100) {
  fs.writeFileSync('bluechip_popular.json', JSON.stringify(items, null, 2));
  console.log('Saved to bluechip_popular.json');
}
