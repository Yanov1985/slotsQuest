const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

// Insert </form> right before <!-- Hero Section Preview -->
if (!content.includes('</form>')) {
  // Try to find Hero Section Preview
  const heroPreviewIdx = content.indexOf('<!-- Hero Section Preview -->');
  if (heroPreviewIdx !== -1) {
    // Insert </form> before it
    content = content.substring(0, heroPreviewIdx) + '</form>\n\n                  ' + content.substring(heroPreviewIdx);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully restored </form> tag before Hero Section Preview!');
  } else {
    // If not found, insert right before </template>
    const templateIdx = content.lastIndexOf('</template>');
    content = content.substring(0, templateIdx) + '</form>\n' + content.substring(templateIdx);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully restored </form> tag before </template>!');
  }
} else {
  console.log('</form> already exists in the file.');
}
