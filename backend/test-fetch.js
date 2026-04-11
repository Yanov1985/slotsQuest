fetch('http://127.0.0.1:3001/api/slots/starlight-princess')
  .then(r => r.text())
  .then(text => require('fs').writeFileSync('starlight.json', text))
  .catch(console.error);
