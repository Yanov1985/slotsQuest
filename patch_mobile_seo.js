const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Headers of sections (Open Graph, Twitter, Robots, Hreflang)
// Currently: <div class="flex items-center justify-between mb-4">
// Make sure it applies to the accordion section headers.
content = content.replace(
  /<div class="flex items-center justify-between mb-4">\s*(<div class="flex items-center gap-3">[\s\S]*?<\/div>)\s*<button/g,
  '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4">\n                        $1\n                        <button'
);

// 2. Label + Auto-generate/From SEO buttons
// We already patched some, but let's patch the rest globally by matching <label> and <button>
const labelRegex = /<div class="flex items-center justify-between">\s*(<label[^>]*>[\s\S]*?<\/label>)\s*(<button[^>]*>[\s\S]*?<\/button>)\s*<\/div>/g;
content = content.replace(labelRegex, '<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">\n                            $1\n                            $2\n                          </div>');

// 3. SEO Score / OG Score Indicator headers
const scoreHeaderRegex = /<div class="flex items-center justify-between mb-3">\s*(<div class="flex items-center gap-2">[\s\S]*?Score[\s\S]*?<\/div>)\s*(<div class="flex items-center gap-3">[\s\S]*?<\/div>)\s*<\/div>/g;
content = content.replace(scoreHeaderRegex, '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-3">\n                            $1\n                            $2\n                          </div>');

// 4. Score Grid columns
// Change: class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs" -> class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-2 text-xs"
// Currently, on 300px phones, 2 columns can squish the title/description bars. 1 column is safer.
const gridRegex = /class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs"/g;
content = content.replace(gridRegex, 'class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-2 text-xs"');

// 5. Length indicators (e.g. 50-60 characters vs score)
// Currently: <div class="flex justify-between text-xs">
const progressRegex = /<div class="flex justify-between text-xs">\s*(<div class="flex items-center gap-2">[\s\S]*?<\/div>)\s*(<span[^>]*>[\s\S]*?<\/span>)\s*<\/div>/g;
content = content.replace(progressRegex, '<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 text-xs">\n                              $1\n                              $2\n                            </div>');

// 6. The <textarea>s should shrink padding on small screens 
content = content.replace(/class="w-full px-4 py-3/g, 'class="w-full px-3 sm:px-4 py-2 sm:py-3');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Mobile-responsive utilities applied across all SEO sections!');
