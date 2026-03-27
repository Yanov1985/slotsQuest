const fs = require('fs');
const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// Extract generateAllSeoKeywords block to safely replace just inside it
const startFn = 'const generateAllSeoKeywords = () => {';
const endFn = '\n}';
const startIndex = content.indexOf(startFn);
if (startIndex !== -1) {
  const endIndex = content.indexOf(endFn, startIndex) + endFn.length;
  let fnBody = content.substring(startIndex, endIndex);
  
  // Replace form. with form.value.
  fnBody = fnBody.replace(/form\./g, 'form.value.');
  
  content = content.substring(0, startIndex) + fnBody + content.substring(endIndex);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully added .value to form references inside generateAllSeoKeywords!');
} else {
  console.log('Could not find generateAllSeoKeywords function.');
}
