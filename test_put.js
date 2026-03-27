const fetch = require('node-fetch');

async function testPut() {
  try {
    const res = await fetch('http://localhost:3001/api/slots/cmeocg6bd0001u5do1jpoas43', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "Test",
        seo_title: "Test"
        // Minimal payload
      })
    });
    
    if (!res.ok) {
      const text = await res.text();
      console.log('Error 500 text:', text);
    } else {
      console.log('Success!');
    }
  } catch(e) {
    console.log('Fetch crash:', e.message);
  }
}

testPut();
