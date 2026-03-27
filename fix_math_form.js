const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// The exact <form> string
const formOpenStr = '<form @submit.prevent="saveSlot" class="w-full space-y-6 sm:space-y-8">';
const formOpenIndex = content.indexOf(formOpenStr);

if (formOpenIndex === -1) {
  console.log('Form not found!?');
  process.exit(1);
}

// 1. Calculate how many net <div> are open BEFORE <form>
const beforeForm = content.substring(0, formOpenIndex);
const opensBefore = beforeForm.match(/<div[\s>]/g) || [];
const closesBefore = beforeForm.match(/<\/div>/g) || [];
const netOpenDivsBeforeForm = opensBefore.length - closesBefore.length;

console.log('Net open <div> tags before <form>:', netOpenDivsBeforeForm);

// Since all tags inside the template MUST physically close at the end of the template
// the last `netOpenDivsBeforeForm` `</div>` tags at the end of the file BELONG to the parents of <form>!
// Therefore, </form> MUST be inserted EXACTLY before the `netOpenDivsBeforeForm` `</div>` tags at the end of the file.

content = content.replace(/<\/form>/g, '');
const tEnd = content.indexOf('</template>');
let beforeTemplateEnd = content.substring(0, tEnd);

let divCount = 0;
let insertionIndex = -1;
let i = beforeTemplateEnd.length - 1;

while (i >= 0) {
  if (beforeTemplateEnd.substring(i, i + 6) === '</div>') {
    divCount++;
    if (divCount === netOpenDivsBeforeForm) {
      insertionIndex = i;
      break;
    }
  }
  i--;
}

if (insertionIndex !== -1) {
  let newContent = beforeTemplateEnd.substring(0, insertionIndex) + '          </form>\n' + beforeTemplateEnd.substring(insertionIndex) + content.substring(tEnd);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Successfully placed </form> EXACTLY before the ' + netOpenDivsBeforeForm + ' final </div> tags!');
} else {
  console.log('Could not find enough </div> tags at the end of the file.');
}
