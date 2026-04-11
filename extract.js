const fs = require('fs');
const html = fs.readFileSync('bcdom.html', 'utf8');
const regex = /https:\/\/cms-cdn\.bc-bn\.net[^"\\'>\s]+/g;
const matches = html.match(regex) || [];
console.log('Found urls: ', matches.length);
fs.writeFileSync('urls2.txt', [...new Set(matches)].join('\n'));
