const http = require('http');
const fs = require('fs');
console.log('Listening on 8080...');
http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        fs.writeFileSync('bc-popular-subagent.json', body);
        console.log('Received and saved bc-popular-subagent.json!');
        res.end('ok');
        process.exit(0);
    });
}).listen(8080);
