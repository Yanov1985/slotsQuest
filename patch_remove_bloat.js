const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');
let originalLength = content.length;

// 1. Remove TitleTemplates UI block
const titleTemplateRegex = /<!-- 🎯 Title Templates - Title Template System \(Phase 2\) -->[\s\S]*?<\/TitleTemplates>\s*<\/div>/g;
content = content.replace(titleTemplateRegex, '<!-- Title Templates Removed -->');

// 2. Remove SEO Health Score UI block
const seoHealthScoreRegex = /<!-- SEO Health Score -->[\s\S]*?<\/SEOHealthScore>\s*<\/div>\s*<\/div>/g;
content = content.replace(seoHealthScoreRegex, '<!-- SEO Health Score Removed -->');

// 3. Remove Imports
content = content.replace(/import TitleTemplates from '~\/components\/admin\/TitleTemplates\.vue'/g, '');
content = content.replace(/import SEOHealthScore from '~\/components\/admin\/SEOHealthScore\.vue'/g, '');

// 4. Remove seoHealthForm definition
const seoHealthFormRegex = /const seoHealthForm = ref\({[\s\S]*?}\)/g;
content = content.replace(seoHealthFormRegex, '');

// 5. Remove seoHealthForm loading in loadSlot
const loadSeoHealthRegex = /\/\/\s*📊 PHASE 3: Load SEO Health Score settings[\s\S]*?\}\)/g;
content = content.replace(loadSeoHealthRegex, '');

// 6. Remove seoHealthForm saving in saveSlot
const saveSeoHealthRegex = /\/\/\s*📊 PHASE 3: Add SEO Health Score fields[\s\S]*?\}\)/g;
content = content.replace(saveSeoHealthRegex, '');

// 7. Remove fields from form.value
content = content.replace(/seo_title_template: '\{name\} Slot by \{provider\} \| Play Free Demo \{year\}',/g, '');
content = content.replace(/seo_title_use_template: false,/g, '');
content = content.replace(/seo_title_power_words: 'best, top, hot, new',/g, '');

// 8. Remove from fieldsToSave array
content = content.replace(/'seo_title_template',/g, '');
content = content.replace(/'seo_title_use_template',/g, '');
content = content.replace(/'seo_title_power_words',/g, '');

// 9. Remove showSEOHealthSection
content = content.replace(/const showSEOHealthSection = ref\(false\)/g, '');

// 10. Remove generatedTitleFromTemplate
content = content.replace(/const generatedTitleFromTemplate = ref\(''\)/g, '');


fs.writeFileSync(filePath, content, 'utf8');

console.log(`Original size: ${originalLength}, New size: ${content.length}`);
console.log('Successfully ripped out TitleTemplates and SEOHealthScore bloat!');
