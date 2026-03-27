const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `    // Switch to EN by default to make sure all is in sync
    currentLocale.value = 'en'
    // ======================================================`;

const replacementStr = `    // Switch to EN by default to make sure all is in sync
    const initData = localizations.value['en'] || {}
    Object.keys(form.value).forEach(key => {
      if (initData[key] !== undefined && typeof form.value[key] === 'string' && !key.includes('url') && !key.includes('_id') && key !== 'slug') {
        form.value[key] = initData[key]
      }
    })
    currentLocale.value = 'en'
    // ======================================================`;

if(content.includes(targetStr)) {
   content = content.replace(targetStr, replacementStr);
   fs.writeFileSync(filePath, content, 'utf8');
   console.log('Successfully patched loadSlot to hydrate initial EN form state!');
} else {
   console.log('Target string did NOT match!');
}
