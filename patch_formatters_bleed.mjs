import fs from 'fs';

let f1 = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/utils/slotFormatters.js', 'utf8');

const targetStr = `        if (targetLocalization.cta_button) {
            mergedSlot.info_real_btn_text = targetLocalization.cta_button;
        }
        if (targetLocalization.demo_button) {
            mergedSlot.info_demo_btn_text = targetLocalization.demo_button;
        }`;

const replaceStr = `        if (targetLocalization.cta_button) {
            mergedSlot.info_real_btn_text = targetLocalization.cta_button;
        }
        if (targetLocalization.demo_button) {
            mergedSlot.info_demo_btn_text = targetLocalization.demo_button;
        }

        // 🚨 PREVENT ENGLISH BLEEDING:
        // If the AI didn't provide these deep fields, nullify the root English DB values 
        // so that the frontend components cleanly fall back to our localized tf() arrays
        const strictFields = ['info_expert_verdict', 'info_pros', 'info_cons', 'info_faq', 'info_reviews', 'info_how_to_play'];
        strictFields.forEach(f => {
            if (!targetLocalization[f] && !targetLocalization[f.replace('info_', '')]) {
                mergedSlot[f] = null;
            }
        });`;

f1 = f1.split(targetStr.replace(/\r\n/g, '\n')).join(replaceStr);
f1 = f1.split(targetStr).join(replaceStr);

fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/utils/slotFormatters.js', f1);
console.log('Successfully patched slotFormatters.js to prevent English bleed!');
