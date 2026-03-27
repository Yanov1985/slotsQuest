const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// Fix the typo (seo_keywords -> seo_keywords_longtail)
if (content.includes('form.seo_keywords = "melhor horario para jogar gates of olympus')) {
  content = content.replace(/form\.seo_keywords = "/g, 'form.seo_keywords_longtail = "');
  content = content.replace(/form\.seo_keywords = \`/g, 'form.seo_keywords_longtail = `');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed seo_keywords_longtail typo in auto-generate script!');
}
