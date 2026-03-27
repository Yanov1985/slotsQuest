const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the SEO Health Score block accurately
const seoHealthScoreRegex = /<!-- SEO Health Score -->[\s\S]*?<SEOHealthScore[\s\S]*?\/>\s*<\/div>\s*<\/div>/g;
if (content.match(seoHealthScoreRegex)) {
  content = content.replace(seoHealthScoreRegex, '<!-- SEO Health Score Removed -->');
  console.log('Successfully removed SEO Health Score HTML.');
} else {
  console.log('Failed to match SEO Health Score HTML!');
}

// 2. Remove the lingering array tuple
const turboArrayRegex = /\['seoHealthSection', showSEOHealthSection\],/g;
if (content.match(turboArrayRegex)) {
  content = content.replace(turboArrayRegex, '');
  console.log('Successfully removed turbo array tuple.');
}

fs.writeFileSync(filePath, content, 'utf8');
