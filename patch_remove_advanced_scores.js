const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

function removeDivBlock(html, startString) {
  let startIndex = html.indexOf(startString);
  if (startIndex === -1) return html;
  
  let divStart = html.indexOf('<div', startIndex);
  if (divStart === -1) return html;

  let currentIndex = divStart;
  let depth = 0;
  
  while(currentIndex < html.length) {
    let nextOpen = html.indexOf('<div', currentIndex);
    let nextClose = html.indexOf('</div', currentIndex);
    
    if (nextClose === -1) break;
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      currentIndex = nextOpen + 4;
    } else {
      depth--;
      currentIndex = nextClose + 6;
    }
    
    if (depth === 0) {
      console.log('Removed block starting at index ' + startIndex);
      return html.substring(0, startIndex) + html.substring(currentIndex);
    }
  }
  return html;
}

// Remove the HTML blocks
content = removeDivBlock(content, '<!-- 📊 SEO Score Indicator -->');
content = removeDivBlock(content, '<!-- 📊 OG Score Indicator -->');
content = removeDivBlock(content, '<!-- 📊 Twitter Score Indicator -->');

// Remove the Script functions
let metaScoreRegex = /\/\/ Calculate SEO Score for Meta tags \([\s\S]*?return Math\.min\(100, Math\.floor\(score\)\)\s*\}/g;
content = content.replace(metaScoreRegex, '');

let ogScoreRegex = /\/\/ Calculate OG Score \([\s\S]*?return Math\.min\(100, Math\.floor\(score\)\)\s*\}/g;
content = content.replace(ogScoreRegex, '');

let twScoreRegex = /\/\/ Calculate Twitter Score \([\s\S]*?return Math\.min\(100, Math\.floor\(score\)\)\s*\}/g;
content = content.replace(twScoreRegex, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully completed DOM-aware stripping!');
