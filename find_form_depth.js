const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
const content = fs.readFileSync(filePath, 'utf8');

const tStart = content.indexOf('<template>');
const tEnd = content.indexOf('</template>');
const htmlContent = content.substring(tStart, tEnd);

let stack = [];
const regex = /<\/?([a-zA-Z0-9\-]+)(?:[^>]*?(\/))?>|<!--[\s\S]*?-->/g;
let match;
const selfClosingTags = new Set(['br','hr','input','img','meta','link','path','circle','line','rect','use','stop','polygon']);

let formOpenedAt = -1;

while ((match = regex.exec(htmlContent)) !== null) {
  if (match[0].startsWith('<!--')) continue;
  
  const tag = match[1];
  const isClosing = match[0].startsWith('</');
  const isSelfClosing = match[2] === '/' || selfClosingTags.has(tag);
  
  if (isSelfClosing && !isClosing) continue;
  
  if (!isClosing) {
    stack.push(tag);
    if (tag === 'form') {
      formOpenedAt = stack.length - 1;
      console.log(`[LOG] <form> opened at depth ${formOpenedAt}. Stack: ${stack.join(' > ')}`);
    }
  } else {
    if (tag === 'form') {
      console.log(`[LOG] </form> found at depth ${stack.length - 1}. Original opened depth: ${formOpenedAt}. Stack at close: ${stack.join(' > ')}`);
      // What tags are open inside form?
      const tagsInsideForm = stack.slice(formOpenedAt + 1);
      console.log(`[LOG] Tags still open inside form: ${tagsInsideForm.join(', ')}`);
    }
    
    // We strictly pop the matching tag.
    // If it doesn't match, we assume self-closing or component and pop until match
    let found = false;
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i] === tag) {
        stack.length = i; // Pop everything after
        found = true;
        break;
      }
    }
    if (!found) {
      console.log(`[WARNING] Unmatched closing tag </${tag}> string: ${match[0]}`);
    }
  }
}
