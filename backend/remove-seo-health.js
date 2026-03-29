const fs = require('fs');
const path = require('path');

const vuePath = path.resolve(__dirname, '../frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(vuePath, 'utf8');

// 1. Remove the UI block
// Find the exact block between PHASE 3 and Indexing Status
const uiRegex = /<!-- ========== PHASE 3: ANALYTICS AND PERFORMANCE ========== -->[\s\S]*?(?=<!-- Indexing Status -->)/;
content = content.replace(uiRegex, '<!-- ========== PHASE 3: ANALYTICS AND PERFORMANCE ========== -->\n\n                    ');

// 2. Remove the import
content = content.replace(/import SEOHealthScore from '~\/components\/admin\/SEOHealthScore\.vue'\n?/g, '');

// 3. Remove the ref declarations if they exist
content = content.replace(/const showSEOHealthSection = ref\([^)]+\)\n?/g, '');
content = content.replace(/const seoHealthForm = ref\(\{[\s\S]*?\}\)\n?/g, '');

fs.writeFileSync(vuePath, content, 'utf8');

// 4. Delete the component file
const compPath = path.resolve(__dirname, '../frontend/components/admin/SEOHealthScore.vue');
if (fs.existsSync(compPath)) {
  fs.unlinkSync(compPath);
  console.log('Deleted SEOHealthScore.vue successfully.');
}

console.log('Cleaned up [id].vue successfully.');
