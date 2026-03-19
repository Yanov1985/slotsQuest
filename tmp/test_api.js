const axios = require('axios');

async function test() {
    try {
        const response = await axios.get('http://localhost:3001/api/pages/home');
        console.log('API Response for home page:');
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error fetching page:', error.message);
    }
}

test();
