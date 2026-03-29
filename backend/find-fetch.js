const fs = require('fs');
const path = require('path');

const vuePath = path.resolve(__dirname, '../frontend/pages/admin/slots/[id].vue');
const content = fs.readFileSync(vuePath, 'utf8');

const match = content.match(/async function[^)]+\) {[\s\S]{0,1000}catch/);
if (match) {
  console.log(content.substring(match.index, match.index + 2000));
} else {
  const match2 = content.match(/try {[\s\S]{0,1000}catch[\s\S]{0,1000}router\./);
  if (match2) {
    console.log(content.substring(match2.index, match2.index + 2000));
  } else {
    console.log("Could not find fetch logic.");
  }
}
