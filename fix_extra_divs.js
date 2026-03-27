const fs = require('fs');
const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// I will just replace the 5 </div>s with 2 </div>s
const searchStr = `                        <!-- Twitter Score Removed -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <!-- Main Hero section (collapsible) -->`;

const replaceStr = `                        <!-- Twitter Score Removed -->
                      </div>
                    </div>
                    <!-- Main Hero section (collapsible) -->`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully adjusted closing tags for Twitter section (removed 3 extra div closures).');
} else {
  console.log('CRITICAL: Could not find the exactly string to replace! Trying robust replace...');
  
  // Robust replace in case indentation differs
  const indexRemoved = content.indexOf('<!-- Twitter Score Removed -->');
  const indexHero = content.indexOf('<!-- Main Hero section (collapsible) -->');
  
  if (indexRemoved !== -1 && indexHero !== -1 && indexHero > indexRemoved && (indexHero - indexRemoved < 300)) {
    const newContent = content.substring(0, indexRemoved + 30) + 
      '\n                      </div>\n                    </div>\n                    ' + 
      content.substring(indexHero);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Successfully applied robust fix for the tags!');
  } else {
    console.log('Fatal error: could not locate the tags');
  }
}
