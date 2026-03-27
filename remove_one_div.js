const fs = require('fs');
const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// The file ends with:
// 3698:         </div>
// 3699:       </div>
// 3700:     </div>
// 3701: </template>

// We have an "Invalid end tag" which means too many </div>s.
// Let's remove exactly ONE </div> from the bottom-most sequence.

const parts = content.split('</template>');
if (parts.length > 1) {
  let templateBody = parts[0];
  const lastDivIndex = templateBody.lastIndexOf('</div>');
  if (lastDivIndex !== -1) {
    // remove the last </div> and any following whitespace
    templateBody = templateBody.substring(0, lastDivIndex) + templateBody.substring(lastDivIndex + 6).trimEnd();
    content = templateBody + '\n</template>' + parts[1];
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully removed 1 extra </div> from the end of the template.');
  }
}
