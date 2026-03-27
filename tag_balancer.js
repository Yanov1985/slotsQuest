const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
const content = fs.readFileSync(filePath, 'utf8');

const tStart = content.indexOf('<template>');
const tEnd = content.indexOf('</template>');
if (tStart === -1) process.exit(1);

const htmlContent = content.substring(tStart, tEnd);
const offsetLine = content.substring(0, tStart).split('\n').length - 1;

let stack = [];
const regex = /<\/?([a-zA-Z0-9\-]+)(?:[^>]*?(\/))?>|<!--[\s\S]*?-->/g;
let match;

// Self closing SVG tags and standard ones
const selfClosingTags = new Set(['br','hr','input','img','meta','link','path','circle','line','rect','use','stop','polygon']);

function getLine(idx) {
  return htmlContent.substring(0, idx).split('\n').length + offsetLine;
}

while ((match = regex.exec(htmlContent)) !== null) {
  if (match[0].startsWith('<!--')) continue;
  
  // Skip strings inside javascript handlers (very rough but usually not containing full tags)
  
  const tag = match[1];
  const isClosing = match[0].startsWith('</');
  const isSelfClosing = match[2] === '/' || selfClosingTags.has(tag);
  
  // In Vue, standard components can be self closing `<HeroPreview />`
  if (isSelfClosing && !isClosing) continue;
  
  if (!isClosing) {
    stack.push({ tag, line: getLine(match.index), full: match[0] });
  } else {
    if (stack.length === 0) {
      console.log(`EXTRA: </${tag}> at line ${getLine(match.index)}`);
      break;
    }
    const pop = stack.pop();
    if (pop.tag !== tag) {
      console.log(`MISMATCH: Expected </${pop.tag}> (opened line ${pop.line}) but found </${tag}> at line ${getLine(match.index)}`);
      break;
    }
  }
}

console.log('Final stack size:', stack.length);
if (stack.length > 0) {
  console.log('First unclosed tag:', stack[0].tag, 'at line', stack[0].line);
}
