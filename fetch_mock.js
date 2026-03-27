const http = require('http');

const payload = {
  // Let's grab some typical data that [id].vue sends
  name: "The Gates Of Olympus",
  seo_title_use_template: null,
  seo_title_template: null,
  seo_title_power_words: null,
};

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/slots/cmeocg6bd0001u5do1jpoas43',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(JSON.stringify(payload));
req.end();
