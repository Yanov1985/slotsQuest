const fs = require('fs');
const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

let depth = 0;
let inTemplate = false;
let stack = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.includes('<template>')) inTemplate = true;
  if (!inTemplate) continue;
  if (line.includes('</template>')) break;

  // We roughly count <div and </div
  // A better way is using regex matching all tags to see what tag is unbalanced!
  const openTags = (line.match(/<div[>\s]/g) || []).length;
  const closeTags = (line.match(/<\/div>/g) || []).length;
  
  const formOpen = (line.match(/<form[>\s]/g) || []).length;
  const formClose = (line.match(/<\/form>/g) || []).length;
  
  if (formOpen) stack.push('form');
  if (formClose) {
    if (stack[stack.length-1] === 'form') stack.pop();
    else console.log(`Unbalanced form close at line ${i+1}`);
  }

  depth += openTags;
  depth -= closeTags;

  if (depth < 0) {
    console.log(`Div depth went negative at line ${i+1}: ${line.trim()}`);
    depth = 0; // reset
  }
}

console.log('Final div depth: ' + depth);
console.log('Final stack length: ' + stack.length);
