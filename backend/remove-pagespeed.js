const fs = require('fs');
const path = require('path');

const vuePath = path.resolve(__dirname, '../frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(vuePath, 'utf8');

// 1. Remove import
content = content.replace("import PageSpeedMetrics from '~/components/admin/PageSpeedMetrics.vue'\n", "");

// 2. Remove ref
content = content.replace("const showPageSpeedSection = ref(false)\n", "");

// 3. Remove from turboMountedSections
content = content.replace("  pageSpeedSection: false,\n", "");

// 4. Remove from turboTrackedSections
content = content.replace("  ['pageSpeedSection', showPageSpeedSection],\n", "");

// 5. Remove pageSpeedForm
const formStr = `// Page Speed / Core Web Vitals форма
const pageSpeedForm = ref({
  cwv_lcp: null,
  cwv_fid: null,
  cwv_cls: null,
  cwv_ttfb: null,
  cwv_fcp: null,
  cwv_inp: null,
  cwv_score_mobile: 0,
  cwv_score_desktop: 0,
  cwv_last_check: null,
  cwv_issues: null,
  cwv_opportunities: null
})
`;
content = content.replace(formStr, "");

// 6. Remove hydration logic
const hydrationStr = `    // ⚡ PHASE 3: Load Page Speed / Core Web Vitals settings
    const pageSpeedFields = [
      'cwv_lcp', 'cwv_fid', 'cwv_cls', 'cwv_ttfb', 'cwv_fcp', 'cwv_inp',
      'cwv_score_mobile', 'cwv_score_desktop', 'cwv_last_check', 'cwv_issues', 'cwv_opportunities'
    ]
    pageSpeedFields.forEach(field => {
      if (slot.value?.[field] !== undefined && slot.value[field] !== null) {
        pageSpeedForm.value[field] = slot.value[field]
      }
    })
`;
content = content.replace(hydrationStr, "");

// 7. Remove HTML Block
const uiRegex = /[\s]*<!-- Page Speed Metrics -->[\s\S]*?<\/div>[\s]*<\/div>[\s]*(?=<!-- Sitemap Configuration -->)/;
content = content.replace(uiRegex, "\n\n                    ");

fs.writeFileSync(vuePath, content, 'utf8');

// 8. Delete the component file
const compPath = path.resolve(__dirname, '../frontend/components/admin/PageSpeedMetrics.vue');
if (fs.existsSync(compPath)) {
  fs.unlinkSync(compPath);
  console.log('Deleted PageSpeedMetrics.vue successfully.');
}

console.log('Cleaned up [id].vue successfully for Page Speed Metrics.');
