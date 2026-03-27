const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

const searchStr = `                        <!-- Twitter Score Removed -->
                        <div class="space-y-2">
                    <!-- Main Hero section (collapsible) -->`;

const replaceStr = `                        <!-- Twitter Score Removed -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <!-- Main Hero section (collapsible) -->`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully replaced broken string with proper closing tags.');
} else {
  console.log('Could not find the exact string format. Maybe it was already fixed?');
  // fallback search
  const fallbackStr = `<!-- Twitter Score Removed -->\n                        <div class="space-y-2">\n                    <!-- Main Hero section`;
  if (content.indexOf(fallbackStr) !== -1) {
    console.log('Found with fallback string!');
  }
}
