const fs = require('fs');
const content = fs.readFileSync('frontend/pages/admin/slots/[id].vue', 'utf8');
const template = content.split('<template>')[1].split('</template>')[0];
const lines = template.split('\n');
const tags = [];
const regex = /<\/?(div|form)[^>]*>/gi;

let match;
while ((match = regex.exec(template)) !== null) {
    const tagStr = match[0];
    if (tagStr.endsWith('/>')) continue;
    const tagName = match[1].toLowerCase();
    const isClosing = tagStr.startsWith('</');

    // Calculate line number
    const prefix = template.substring(0, match.index);
    const lineNum = prefix.split('\n').length + 1; // +1 because <template> is line 1 usually, though let's just say relative to template content

    if (isClosing) {
        if (tags.length && tags[tags.length - 1].tag === tagName) {
            tags.pop();
        } else {
            console.log(`Mismatch at line ${lineNum}! Found ${tagStr} but expected ${tags.length ? tags[tags.length - 1].tag : 'none'} (Opened at line ${tags.length ? tags[tags.length - 1].line : '?'})`);
            break;
        }
    } else {
        tags.push({ tag: tagName, line: lineNum, content: tagStr.replace(/\s+/g, ' ').substring(0, 50) });
    }
}
