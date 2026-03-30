import fs from 'fs';

let f1 = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/utils/slotFormatters.js', 'utf8');

const bleedPatch = `        // 🚨 PREVENT ENGLISH BLEEDING:
        // If the AI didn't provide these deep fields, nullify the root English DB values 
        // so that the frontend components cleanly fall back to our localized tf() arrays
        const strictFields = ['info_expert_verdict', 'info_pros', 'info_cons', 'info_faq', 'info_reviews', 'info_how_to_play'];
        strictFields.forEach(f => {
            if (!targetLocalization[f] && targetLocalization[f.replace('info_', '')] === undefined) {
                mergedSlot[f] = null;
            }
        });

        return mergedSlot;`;

if (!f1.includes("PREVENT ENGLISH BLEEDING")) {
    f1 = f1.replace('        return mergedSlot;', bleedPatch);
    fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/utils/slotFormatters.js', f1);
    console.log('Successfully patched slotFormatters.js !');
} else {
    console.log('Already patched!');
}
