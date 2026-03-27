const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// The file should cleanly have NO </form> tags. We made sure of that.
// Let's find the closing </template> tag, and step back exactly 2 </div> tags.

const parts = content.split('</template>');
if (parts.length > 1) {
  let templateBody = parts[0];
  
  // Find the exact positions of the last 2 </div> tags
  let count = 0;
  let insertionIndex = -1;
  let i = templateBody.length - 1;
  
  while (i >= 0) {
    if (templateBody.substring(i, i + 6) === '</div>') {
      count++;
      if (count === 2) {
        // We want to insert right before the 2nd to last </div>
        // Which means count === 2 is the </div> we want to insert BEFORE!
        // wait! If count === 1 is the LAST </div>
        // count === 2 is the SECOND TO LAST </div>
        insertionIndex = i;
        break;
      }
    }
    i--;
  }

  if (insertionIndex !== -1) {
    // Determine the indentation
    // In Vue, typically it's 4 spaces. We'll just do 4 spaces.
    let newTemplateBody = templateBody.substring(0, insertionIndex) + '    </form>\n  ' + templateBody.substring(insertionIndex);
    content = newTemplateBody + '</template>' + parts[1];
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully inserted </form> before the last 2 </div> tags!');
  } else {
    console.log('Failed to find 2 </div> tags at the end of the template.');
  }
}
