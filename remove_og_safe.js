const fs = require('fs');

function removeHtmlBlock(content, startComment) {
    let commentIndex = content.indexOf(startComment);
    if (commentIndex === -1) return content;
    
    // Find the first <div after the comment
    let divStartIndex = content.indexOf('<div', commentIndex);
    if (divStartIndex === -1) return content;
    
    // Find the matching closing </div>
    let depth = 0;
    let i = divStartIndex;
    let lastDivEnd = -1;
    
    while (i < content.length) {
        if (content.substring(i, i + 4) === '<div') {
            depth++;
            i += 4;
        } else if (content.substring(i, i + 6) === '</div') {
            depth--;
            // wait, the actual tag might be </div>
            let j = i + 5;
            while(content[j] !== '>' && j < content.length) j++;
            i = j + 1; // advance past '>'
            
            if (depth === 0) {
                lastDivEnd = i;
                break;
            }
        } else {
            i++;
        }
    }
    
    if (depth === 0 && lastDivEnd !== -1) {
        console.log(`Removed ${startComment}`);
        return content.substring(0, commentIndex) + content.substring(lastDivEnd);
    }
    
    return content;
}

let filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

content = removeHtmlBlock(content, '<!-- Open Graph -->');
content = removeHtmlBlock(content, '<!-- Twitter Card -->');

const varsToRemove = [
  "og_title: '',",
  "og_description: '',",
  "og_image: '',",
  "og_type: '',",
  "og_locale: '',",
  "og_video: '',",
  "twitter_card: 'summary_large_image',",
  "twitter_site: '',",
  "twitter_title: '',",
  "twitter_description: '',",
  "twitter_image: '',",
  "og_title: null,",
  "og_description: null,",
  "og_image: null,",
  "og_type: null,",
  "og_locale: null,",
  "og_video: null,",
  "twitter_card: null,",
  "twitter_site: null,",
  "twitter_title: null,",
  "twitter_description: null,",
  "twitter_image: null,"
];

varsToRemove.forEach(v => {
  const regex = new RegExp(`\\s*${v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}`, 'g');
  content = content.replace(regex, '');
});

const payloadVars = [
  "og_title:", "og_description:", "og_image:", "og_type:", "og_locale:", "og_video:",
  "twitter_card:", "twitter_site:", "twitter_title:", "twitter_description:", "twitter_image:"
];

payloadVars.forEach(v => {
  const regex = new RegExp(`\\s*${v}\\s*form\\.value\\.${v.replace(':', '')},`, 'g');
  content = content.replace(regex, '');
});

content = content.replace(/import SocialPreviewCards[\s\S]*?\n/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned securely!');
