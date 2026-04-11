const fs = require('fs');

const data = JSON.parse(fs.readFileSync('bluechip_next_data.json', 'utf8'));

// Explore the object
const gamesList = data.props.pageProps.initialGamesList;
console.log('Total Elements from backend:', gamesList?.totalElements);
console.log('Items in list:', gamesList?.content?.length);
console.log('Next cursor or page info:', gamesList?.pageable);

const allKeys = Object.keys(data.props.pageProps);
console.log('Other pageProps keys:', allKeys);

