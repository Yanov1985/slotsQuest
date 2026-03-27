const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

function removeDivBlock(html, startString) {
  let startIndex = html.indexOf(startString);
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

// 1. Remove HTML block
content = removeDivBlock(content, '<!-- 🎯 Title Templates - Title Template System (Phase 2) -->');

// 2. Remove SerpPreview ternary condition
content = content.replace(
  /:title="form\.seo_title_use_template \? generatedTitleFromTemplate : \(form\.seo_title \|\| generateAutoTitle\(\)\)"/g, 
  ':title="form.seo_title || generateAutoTitle()"'
);

// 3. Remove JS component import
content = content.replace(/import TitleTemplates from '[^']+'\s*\n/g, '');

// 4. Remove ref
content = content.replace(/const generatedTitleFromTemplate = ref\(''\)\s*\n/g, '');

// 5. Remove form struct attributes
content = content.replace(/seo_title_template:[^\n]+\n/g, '');
content = content.replace(/seo_title_power_words:[^\n]+\n/g, '');
content = content.replace(/seo_title_use_template:[^\n]+\n/g, '');

// 6. Remove array items (like in localization cloning)
content = content.replace(/'seo_title_template',\s*\n/g, '');
content = content.replace(/'seo_title_power_words',\s*\n/g, '');
content = content.replace(/'seo_title_use_template',\s*\n/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully removed Title Template System!');
