const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove ALL </form> tags to start clean
content = content.replace(/<\/form>/g, '');

// We know the vite error was `Invalid end tag </div>` at the end of the file.
// Which means right now, without </form>, there is a perfect balance of <div and </div!
// Wait, if <form> is completely unclosed, Vue will just say Element is missing end tag <form>
// Which is EXACTLY what we want! Then we just put exactly ONE </form> at the very end of the <form>'s children.

// Since the Vue compiler enforces that elements close in the order they were opened,
// we just need to find where <form> was opened, and what div wraps it.
// If it wraps the entire grid, we put it before the divs that wrap the grid.

// Let's just find the last </div> tags at the end of the file, and we will place </form> there.
// If <form> is a child of the outermost 3 divs, we place it before the last 3 </div>s.

const tStart = content.indexOf('<template>');
const tEnd = content.indexOf('</template>');
const htmlContent = content.substring(tStart, tEnd);

// let's do a strict tag stack!
let stack = [];
const regex = /<\/?([a-zA-Z0-9\-]+)(?:[^>]*?(\/))?>/g;
let match;
const selfClosing = new Set(['br','hr','input','img','meta','link','path','circle','line','rect','use','stop','polygon','SocialPreviewCards','HeroPreview','SitemapConfig','SearchSelect']);

let formOpenedDepth = -1;

// Because Vue components like HeroPreview can be self-closing <HeroPreview />
// but some regex might fail if there are attributes with `/` inside strings,
// a robust way is to just find the indentation of <form>.
// Wait, let's just place </form> right before the very last </div>? No, <form> must close before its parent </div> closes.

// Instead of guessing, let's just insert </form> BEFORE the last 2 </div> tags!
// Because if <Teleport> was heavily nested or not, let's just print the last 15 lines of the file.
fs.writeFileSync('d:/www/Projects/2025/SlotQuest/clean_form.js', '/* script written */', 'utf8');
