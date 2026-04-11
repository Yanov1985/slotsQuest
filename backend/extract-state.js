const fs = require('fs');

const html = fs.readFileSync('bluechip-html.txt', 'utf8');

// Looking for common patterns like NEXT_DATA or state
let scripts = html.match(/<script[^>]*>.*?<\/script>/igs);
let games = [];

if (scripts) {
  for (const script of scripts) {
    if (script.includes('Gates of Olympus')) {
       console.log('Found script containing "Gates of Olympus", length:', script.length);
       fs.writeFileSync('bluechip-script-state.js', script);
    }
  }
}
