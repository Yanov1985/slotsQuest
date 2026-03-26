const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `form.value[key] = newData[key] !== undefined ? newData[key] : ''`;
const replacementStr = `// If locale is missing the field, fallback to English to prevent empty strings for \`name\`, \`slug\` etc.
        form.value[key] = newData[key] !== undefined && newData[key] !== '' ? newData[key] : (localizations.value['en']?.[key] || '')`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  
  // Wait, there might be multiple occurrences. Let's just do a global replace for exactly this line inside the switchLocale function.
  // Actually, string.replace only replaces the first match, which is perfect because we want to replace it in switchLocale.
  // Wait, what if there's another one? Let's replace all.
  content = content.split(targetStr).join(replacementStr);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('SUCCESS: Patched switchLocale to fallback to English fields!');
} else {
  console.log('Target string not found. Trying regex...');
  const regex = /form\.value\[key\] = newData\[key\] !== undefined \? newData\[key\] : ''/g;
  if(regex.test(content)) {
    content = content.replace(regex, replacementStr);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('SUCCESS with regex!');
  } else {
    console.log('ERROR: Couldn\'t find switchLocale target string to replace.');
  }
}
