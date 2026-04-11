const fs = require('fs');

const data = fs.readFileSync('bluechip_next_data.json', 'utf8');

const apiMatch = data.match(/https?:\/\/[^\"]*api[^\"]*/gi);
if (apiMatch) {
    console.log('Found APIs:', [...new Set(apiMatch)].slice(0, 50));
} else {
    console.log('No obvious API endpoint found in text.');
}

const findPaths = (obj, term, currentPath = '') => {
    if (!obj) return;
    if (typeof obj === 'string' && obj.toLowerCase().includes(term)) {
        console.log(`${currentPath}: ${obj}`);
    } else if (typeof obj === 'object') {
        for (const [key, val] of Object.entries(obj)) {
            findPaths(val, term, `${currentPath}.${key}`);
        }
    }
}
const parsed = JSON.parse(data);
findPaths(parsed.props.pageProps, 'api');
