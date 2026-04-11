const fs = require('fs');

const file = 'd:/www/Projects/2025/SlotQuest/frontend/utils/slotFormatters.js';
let content = fs.readFileSync(file, 'utf8');

let lines = content.split(/\r?\n/);
let out = [];
let patched = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('// 🚨 PREVENT ENGLISH BLEEDING:') && !patched) {
        patched = true;
        out.push(`        // 🚨 GEMINI-COMPATIBILITY MAPPING
        if (targetLocalization['overview'] && !targetLocalization['overview_description_1']) {
            mergedSlot['overview_description_1'] = targetLocalization['overview'];
        }
        if (targetLocalization['overview'] && !targetLocalization['description']) {
            mergedSlot['description'] = targetLocalization['overview'];
        }
        if (targetLocalization['mechanics'] && !targetLocalization['info_expert_verdict']) {
            mergedSlot['info_expert_verdict'] = targetLocalization['mechanics'];
        }`);
    }
    out.push(lines[i]);
}

// Check if we need to add fields to fieldsToMerge array
let fieldsStart = false;
for (let i = 0; i < out.length; i++) {
    if (out[i].includes('const fieldsToMerge = [')) {
        fieldsStart = true;
    }
    if (fieldsStart && out[i].includes('];')) {
        // Found end of array
        out.splice(i, 0, `            'overview_title', 'mechanics_title', 'free_spins_title', 'seo_h1', 'overview', 'mechanics', 'faq', 'cta_button', 'demo_button',`);
        break;
    }
}

fs.writeFileSync(file, out.join('\n'));
console.log("Patched successfully via lines array!");
