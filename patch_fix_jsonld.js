const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

const regex1 = /jsonld_jsonld_video_thumbnail:\s*'',?\n\s*/g;
const regex2 = /jsonld_jsonld_video_description:\s*'',?\n\s*/g;

let changed = false;

if (content.match(regex1)) {
  content = content.replace(regex1, '');
  changed = true;
  console.log('Removed jsonld_jsonld_video_thumbnail');
}

if (content.match(regex2)) {
  content = content.replace(regex2, '');
  changed = true;
  console.log('Removed jsonld_jsonld_video_description');
}

if (changed) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully fixed the Prisma Unknown Argument error!');
} else {
  console.log('No jsonld_jsonld variables found.');
}
