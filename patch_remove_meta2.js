const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

function removeDivBlock(html, startString) {
  let startIndex = html.indexOf(startString);
  if (startIndex === -1) return html;
  
  // Find the exact `<div` that starts the block
  let divStartIndex = html.indexOf('<div', startIndex);
  if (divStartIndex === -1 || divStartIndex - startIndex > 150) return html; // fallback
  
  let depth = 0;
  let currentIndex = divStartIndex;
  
  while(currentIndex < html.length) {
    let nextOpen = html.indexOf('<div', currentIndex);
    let nextClose = html.indexOf('</div', currentIndex);
    
    if (nextClose === -1) break; // Should not happen
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      currentIndex = nextOpen + 4;
    } else {
      depth--;
      currentIndex = nextClose + 5;
      if (depth === 0) {
        // Cut out the block plus any trailing whitespace
        let endIdx = currentIndex + 1; // including >
        return html.substring(0, startIndex) + html.substring(endIdx);
      }
    }
  }
  return html;
}

// 1. Remove Alternative Names
content = removeDivBlock(content, '<!-- 🌐 Alternative Slot Names -->');

// 2. Remove Video Duration
content = removeDivBlock(content, '<!-- ⏱️ Video Duration -->');

// 3. Remove Gameplay Video
content = removeDivBlock(content, '<!-- 🎬 Gameplay Video (for VideoObject Schema) -->');


// Remove from `const form = ref(...)`
content = content.replace(/seo_keywords:\s*'',?\s*\/\/\s*Old field[^\n]*\n/g, '');
content = content.replace(/seo_keywords_longtail:\s*'',?\s*\/\/\s*Long-tail[^\n]*\n/g, '');
content = content.replace(/video_url:\s*'',?\n/g, '');
content = content.replace(/video_duration:\s*'',?\n/g, '');
content = content.replace(/alternative_names:\s*'',?\n/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully extracted the 3 remaining UI blocks and state properties!');
