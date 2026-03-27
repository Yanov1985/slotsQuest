const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/components/admin/SerpPreview.vue';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove HTML block
function removeBlock(text, startString, endStringOrRegex) {
  const startIndex = text.indexOf(startString);
  if (startIndex === -1) return text;
  
  let endIndex = -1;
  if (typeof endStringOrRegex === 'string') {
    endIndex = text.indexOf(endStringOrRegex, startIndex);
    if (endIndex !== -1) endIndex += endStringOrRegex.length;
  } else {
    // Regex
    endStringOrRegex.lastIndex = startIndex;
    const match = endStringOrRegex.exec(text);
    if (match) {
      endIndex = match.index + match[0].length;
    }
  }

  if (endIndex !== -1) {
    return text.substring(0, startIndex) + text.substring(endIndex);
  }
  return text;
}

// Remove the HTML div block for SEO Score & Tips
const htmlStart = '    <!-- SEO Score & Tips -->';
content = removeBlock(content, htmlStart, /    <\/div>\s*<\/div>\s*<\/template>/);

// Add the closing template tags back since the regex matched they end of the template
if (!content.includes('</template>')) {
  // Wait, my regex matched `</div> \n </div> \n </template>`! I should just re-append it.
  content += '  </div>\n</template>\n';
} else {
  // If my regex didn't remove it or I do it more safely
}

// Let's do a safer block removal using my custom div depth parser for HTML
function removeDivSafe(html, startStr) {
  let startIndex = html.indexOf(startStr);
  if (startIndex === -1) return html;
  
  let divStartIndex = html.indexOf('<div', startIndex);
  if (divStartIndex === -1 || divStartIndex - startIndex > 150) return html; 
  
  let depth = 0;
  let currentIndex = divStartIndex;
  
  while(currentIndex < html.length) {
    let nextOpen = html.indexOf('<div', currentIndex);
    let nextClose = html.indexOf('</div', currentIndex);
    if (nextClose === -1) break; 
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      currentIndex = nextOpen + 4;
    } else {
      depth--;
      currentIndex = nextClose + 5;
      if (depth === 0) {
        let endIdx = currentIndex + 1; 
        return html.substring(0, startIndex) + html.substring(endIdx);
      }
    }
  }
  return html;
}

// Reload since I messed with content above slightly
content = fs.readFileSync(filePath, 'utf8');
content = removeDivSafe(content, '<!-- SEO Score & Tips -->');

// 2. Remove JS computed properties: seoScore, seoScoreClass, seoScoreBarClass, seoTips
const jsStart1 = '// SEO Score calculation\n';
content = removeBlock(content, jsStart1, /\}\)\s*\n/g); // removes seoScore
// But it's better to replace them directly by string extraction or regex
content = content.replace(/\/\/ SEO Score calculation[\s\S]*?return Math\.min\(score, 100\)\n\}\)\n/g, '');
content = content.replace(/const seoScoreClass = computed\(\(\) => \{[\s\S]*?\}\)\n/g, '');
content = content.replace(/const seoScoreBarClass = computed\(\(\) => \{[\s\S]*?\}\)\n/g, '');
content = content.replace(/\/\/ SEO Tips\nconst seoTips = computed\(\(\) => \{[\s\S]*?return tips\n\}\)\n/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully removed SEO Score from SERP Preview!');
