const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./bc-popular.json'));

function titleCase(str) { 
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' '); 
}

for (let item of data) {
    if (item.title === 'Remote image' || item.title === 'game' || !item.title) {
        let cleanSlug = item.slug;
        let provSlug = item.provider.toLowerCase().replace(/[^a-z0-9]+/g, '');
        
        let parts = cleanSlug.split('-');
        let lastPart = parts[parts.length - 1];
        
        if (provSlug.includes(lastPart) || lastPart.includes(provSlug)) {
             parts.pop();
             cleanSlug = parts.join('-');
        } else if (cleanSlug.endsWith('-' + provSlug)) {
             cleanSlug = cleanSlug.slice(0, -(provSlug.length + 1));
        }

        item.title = titleCase(cleanSlug.replace(/-/g, ' '));
        console.log(`Fixed: ${item.slug} -> ${item.title}`);
    }
}
fs.writeFileSync('./bc-popular.json', JSON.stringify(data, null, 2));
console.log('Fixed bc-popular.json titles!');
