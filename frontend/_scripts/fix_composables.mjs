import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const composablesDir = path.join(__dirname, '../composables');
const files = fs.readdirSync(composablesDir).filter(f => f.endsWith('.js') || f.endsWith('.ts'));

let totalReplaced = 0;

for (const file of files) {
    const filePath = path.join(composablesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let newContent = content.replace(/catch\s*\(([^)]+)\)\s*{([\s\S]*?)throw\s+[a-zA-Z0-9$_]+(.*?);?\s*}/g, (match, errVar, beforeThrow, afterThrow) => {
        if (beforeThrow.includes('return ') || afterThrow.includes('return ')) {
            return match;
        }
        
        // simpler approach: just replace throw err or throw createError with return null
        return `catch (${errVar}) {${beforeThrow}console.error('API Error in ${file}:', ${errVar});\n      return null; // fallback\n    }`;
    });

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Replaced in ${file}`);
        totalReplaced++;
    }
}

console.log(`Total files modified: ${totalReplaced}`);
