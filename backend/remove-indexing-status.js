const fs = require('fs');
const path = require('path');

const vuePath = path.resolve(__dirname, '../frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(vuePath, 'utf8');

// 1. Remove the UI block
// First, find what's immediately after it. Is it Page Speed?
const uiRegex = /<!-- Indexing Status -->[\s\S]*?(?=<!-- Page Speed)/i;
content = content.replace(uiRegex, '');

// 2. Remove the import
content = content.replace(/import IndexingStatus from '~\/components\/admin\/IndexingStatus\.vue'\n?/g, '');

// 3. Remove refs
content = content.replace(/const showIndexingStatusSection = ref\([^)]+\)\n?/g, '');
content = content.replace(/\n\/\/\s*Indexing Status форма\nconst indexingForm = ref\(\{[\s\S]*?\}\)\n/g, '');

// 4. Remove from turboTrackedSections array
content = content.replace(/[\s]*\['indexingStatusSection', showIndexingStatusSection\],/g, '');

// 5. Remove hydration logic
content = content.replace(/\n\s*\/\/\s*📈 PHASE 3: Load Indexing Status settings[\s\S]*?\}\)\n/g, '');

fs.writeFileSync(vuePath, content, 'utf8');

// 6. Delete the component file
const compPath = path.resolve(__dirname, '../frontend/components/admin/IndexingStatus.vue');
if (fs.existsSync(compPath)) {
  fs.unlinkSync(compPath);
  console.log('Deleted IndexingStatus.vue successfully.');
}

console.log('Cleaned up [id].vue successfully for Indexing Status.');
