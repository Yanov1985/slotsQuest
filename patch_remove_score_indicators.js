const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove SEO Score Indicator
const seoScoreRegex = /<!-- 📊 SEO Score Indicator -->[\s\S]*?<!-- Score Details Grid -->[\s\S]*?<\/div>\s*<\/div>\s*(?=<!-- Meta Title -->|<!-- Open Graph Card -->|<!-- SEO Keywords)/g;
content = content.replace(seoScoreRegex, '<!-- SEO Score Removed -->\n                        ');

// 2. Remove OG Score Indicator
const ogScoreRegex = /<!-- 📊 OG Score Indicator -->[\s\S]*?<!-- Score Details Grid -->[\s\S]*?<\/div>\s*<\/div>\s*(?=<!-- OG Title -->)/g;
content = content.replace(ogScoreRegex, '<!-- OG Score Removed -->\n                        ');

// 3. Remove Twitter Score Indicator
const twitterScoreRegex = /<!-- 📊 Twitter Score Indicator -->[\s\S]*?<!-- Score Details Grid -->[\s\S]*?<\/div>\s*<\/div>\s*(?=<!-- Twitter Title -->|<div class="space-y)/g;
content = content.replace(twitterScoreRegex, '<!-- Twitter Score Removed -->\n                        ');


fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully removed all Score Indicator blocks from the UI!');
