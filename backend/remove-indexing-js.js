const fs = require('fs');
const path = require('path');

const vuePath = path.resolve(__dirname, '../frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(vuePath, 'utf8');

// 1. Remove import
content = content.replace("import IndexingStatus from '~/components/admin/IndexingStatus.vue'\n", "");

// 2. Remove ref
content = content.replace("const showIndexingStatusSection = ref(false)\n", "");

// 3. Remove from turboMountedSections
content = content.replace("  indexingStatusSection: false,\n", "");

// 4. Remove from turboTrackedSections
content = content.replace("  ['indexingStatusSection', showIndexingStatusSection],\n", "");

// 5. Remove indexingForm
const formStr = `// Indexing Status форма
const indexingForm = ref({
  indexing_status: 'unknown',
  indexing_first_date: null,
  indexing_last_crawl: null,
  indexing_crawl_frequency: 'weekly',
  indexing_impressions: 0,
  indexing_clicks: 0,
  indexing_position: null,
  indexing_internal_links: 0,
  indexing_external_links: 0,
  indexing_last_check: null,
  indexing_errors: null
})
`;
content = content.replace(formStr, "");

// 6. Remove hydration logic
const hydrationStr = `    // 📈 PHASE 3: Load Indexing Status settings
    const indexingFields = [
      'indexing_status', 'indexing_first_date', 'indexing_last_crawl', 'indexing_crawl_frequency',
      'indexing_impressions', 'indexing_clicks', 'indexing_position', 'indexing_internal_links',
      'indexing_external_links', 'indexing_last_check', 'indexing_errors'
    ]
    indexingFields.forEach(field => {
      if (slot.value?.[field] !== undefined && slot.value[field] !== null) {
        indexingForm.value[field] = slot.value[field]
      }
    })
`;
content = content.replace(hydrationStr, "");

fs.writeFileSync(vuePath, content, 'utf8');

// 7. Delete the component file
const compPath = path.resolve(__dirname, '../frontend/components/admin/IndexingStatus.vue');
if (fs.existsSync(compPath)) {
  fs.unlinkSync(compPath);
  console.log('Deleted IndexingStatus.vue successfully.');
}

console.log('Cleaned up JS exactly in [id].vue.');
