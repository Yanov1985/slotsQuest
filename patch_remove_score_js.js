const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

function removeFunction(html, startString) {
  let funcIndex = html.indexOf(startString);
  if (funcIndex === -1) return html;
  
  // Find preceding comment
  let commentIndex = html.lastIndexOf('// Calculate', funcIndex);
  let startIndex = (commentIndex !== -1 && (funcIndex - commentIndex) < 150) ? commentIndex : funcIndex;
  
  let openBrackets = 0;
  let hasStarted = false;
  let currentIndex = funcIndex;
  
  while(currentIndex < html.length) {
    if (html[currentIndex] === '{') {
      openBrackets++;
      hasStarted = true;
    } else if (html[currentIndex] === '}') {
      openBrackets--;
    }
    
    if (hasStarted && openBrackets === 0) {
      console.log('Removed function starting at index ' + startIndex);
      return html.substring(0, startIndex) + html.substring(currentIndex + 1);
    }
    currentIndex++;
  }
  return html;
}

content = removeFunction(content, 'const calculateMetaScore = () => {');
content = removeFunction(content, 'const calculateOgScore = () => {');
content = removeFunction(content, 'const calculateTwitterScore = () => {');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully removed javascript score functions!');
