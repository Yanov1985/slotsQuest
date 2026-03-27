const http = require('http');

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

// Since we just want to see validation or Prisma errors from the backend,
// an empty payload or missing fields should trigger the 500 error.
req.write(JSON.stringify({ 
  name: "The Gates Of Olympus",
  // simulate the missing fields
}));
req.end();
