const fs = require('fs');

const diff = fs.readFileSync('d:/www/Projects/2025/SlotQuest/diff2.txt', 'utf8');

// The file shows all deleted lines with a '-' prefix.
// We want to find the big chunk of deleted lines near the end of the file.
const lines = diff.split('\n');

let inTargetFile = false;
let deletedChunk = [];
let maxDeletedChunk = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('+++ b/frontend/pages/admin/slots/[id].vue')) {
    inTargetFile = true;
    continue;
  }
  if (line.startsWith('diff --git') && inTargetFile) {
    inTargetFile = false;
  }
  
  if (inTargetFile) {
    if (line.startsWith('-') && !line.startsWith('---')) {
      deletedChunk.push(line.substring(1)); // remove the '-'
    } else if (line.startsWith('+') || line.startsWith(' ')) {
      if (deletedChunk.length > maxDeletedChunk.length) {
        maxDeletedChunk = [...deletedChunk];
      }
      deletedChunk = [];
    }
  }
}

if (deletedChunk.length > maxDeletedChunk.length) {
  maxDeletedChunk = [...deletedChunk];
}

console.log(`Largest deleted chunk has ${maxDeletedChunk.length} lines.`);
console.log('--- START OF CHUNK ---');
console.log(maxDeletedChunk.slice(0, 10).join('\n'));
console.log('...');
console.log(maxDeletedChunk.slice(-10).join('\n'));
console.log('--- END OF CHUNK ---');

// Write out the largest deleted chunk to a file so we can inspect it
fs.writeFileSync('d:/www/Projects/2025/SlotQuest/massive_deleted_chunk.txt', maxDeletedChunk.join('\n'));
