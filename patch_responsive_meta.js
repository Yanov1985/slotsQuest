const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Meta tags header
content = content.replace(
  /<div class="flex items-center justify-between mb-4">\s*(<div class="flex items-center gap-3">[\s\S]*?<h3[\s\S]*?Meta tags[\s\S]*?<\/h3>[\s\S]*?<\/div>)\s*<button/g,
  '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4">\n                        $1\n                        <button'
);

// 2. Label + Auto-generate button wrappers
// Replace standard flex items-center justify-between for inputs
const labelRegex = /<div class="flex items-center justify-between">\s*(<label[\s\S]*?<\/label>)\s*(<button[\s\S]*?Auto-generate[\s\S]*?<\/button>)\s*<\/div>/g;
content = content.replace(labelRegex, '<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">\n                            $1\n                            $2\n                          </div>');

// 3. Keyword System buttons
const kwRegex = /<div class="flex items-center justify-between">\s*(<label[\s\S]*?Primary Keywords[\s\S]*?<\/label>)\s*(<button[\s\S]*?Auto-generate All[\s\S]*?<\/button>)\s*<\/div>/g;
content = content.replace(kwRegex, '<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">\n                              $1\n                              $2\n                            </div>');

// 4. Progress bar rows (Recommended: 50-60 characters + count)
const progressRegex = /<div class="flex justify-between text-xs">\s*(<div class="flex items-center gap-2">[\s\S]*?<\/div>)\s*(<span[\s\S]*?<\/span>)\s*<\/div>/g;
content = content.replace(progressRegex, '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 text-xs">\n                              $1\n                              $2\n                            </div>');

// 5. SEO Score Indicator header
const seoHeaderRegex = /<div class="flex items-center justify-between mb-3">\s*(<div class="flex items-center gap-2">[\s\S]*?SEO Score[\s\S]*?<\/div>)\s*(<div class="flex items-center gap-3">[\s\S]*?<\/div>)\s*<\/div>/g;
content = content.replace(seoHeaderRegex, '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-3">\n                            $1\n                            $2\n                          </div>');

// 6. Fix Search Intent field if it shares this structure
const searchIntentRegex = /<div class="flex items-center justify-between">\s*(<label[\s\S]*?Search Intent[\s\S]*?<\/label>)\s*<\/div>/g;
content = content.replace(searchIntentRegex, '<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">\n                            $1\n                          </div>');

// 7. Make textareas inside the block resize correctly on mobile
// (Already w-full, but let's ensure padding is responsive)
// content = content.replace(/class="w-full px-4 py-3/g, 'class="w-full px-3 sm:px-4 py-2 sm:py-3');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Responsive classes applied to Meta tags block!');
