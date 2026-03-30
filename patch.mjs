import fs from 'fs';

// Patch slotFormatters.js
let f1 = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/utils/slotFormatters.js', 'utf8');
const f1Target = `        fieldsToMerge.forEach(field => {
            if (targetLocalization[field] !== undefined && targetLocalization[field] !== '') {
                mergedSlot[field] = targetLocalization[field];
            }
        });

        return mergedSlot;`;
const f1Replacement = `        fieldsToMerge.forEach(field => {
            if (targetLocalization[field] !== undefined && targetLocalization[field] !== '') {
                mergedSlot[field] = targetLocalization[field];
            }
        });

        // 🧠 AI LLM Output Mapping
        if (targetLocalization.overview) {
            mergedSlot.overview_description_1 = targetLocalization.overview;
            mergedSlot.overview = targetLocalization.overview;
        }
        if (targetLocalization.mechanics) {
            mergedSlot.mechanics = targetLocalization.mechanics;
        }
        if (targetLocalization.faq) {
            mergedSlot.raw_faq_html = targetLocalization.faq;
        }
        if (targetLocalization.cta_button) {
            mergedSlot.info_real_btn_text = targetLocalization.cta_button;
        }
        if (targetLocalization.demo_button) {
            mergedSlot.info_demo_btn_text = targetLocalization.demo_button;
        }

        return mergedSlot;`;
f1 = f1.split(f1Target.replace(/\r\n/g, '\n')).join(f1Replacement);
f1 = f1.split(f1Target).join(f1Replacement); // Try exact match with \r\n
if(f1.includes('AI LLM Output Mapping')) {
    fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/utils/slotFormatters.js', f1);
    console.log('Patched slotFormatters.js');
}

// Patch SlotInfoModal.vue
let f2 = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue', 'utf8');
const f2Target = `            <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:question-square-bold" class="text-blue-400 w-6 h-6" /> {{ t('faq') }}
            </h2>
            <div class="space-y-2">`;
const f2Replacement = `            <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:question-square-bold" class="text-blue-400 w-6 h-6" /> {{ t('faq') }}
            </h2>
            <div v-if="slotData.raw_faq_html" class="prose prose-invert prose-sm sm:prose-base max-w-none text-gray-300 leading-relaxed bg-[#1F2937]/50 p-4 sm:p-6 rounded-xl border border-[#374151]" v-html="slotData.raw_faq_html"></div>
            <div v-else class="space-y-2">`;
f2 = f2.split(f2Target.replace(/\r\n/g, '\n')).join(f2Replacement);
f2 = f2.split(f2Target).join(f2Replacement);
if(f2.includes('v-if="slotData.raw_faq_html"')) {
    fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue', f2);
    console.log('Patched SlotInfoModal.vue target 1');
}

// Need to add closing div for v-else in SlotInfoModal.vue
const f3Target = `                  <div class="overflow-hidden">
                    <div class="px-3 sm:px-4 pb-3 sm:pb-4 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-[#374151]">
                      <p class="pt-3">{{ item.answer }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>`;
const f3Replacement = `                  <div class="overflow-hidden">
                    <div class="px-3 sm:px-4 pb-3 sm:pb-4 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-[#374151]">
                      <p class="pt-3">{{ item.answer }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div> <!-- Close v-else -->
          </section>`;
f2 = f2.split(f3Target.replace(/\r\n/g, '\n')).join(f3Replacement);
f2 = f2.split(f3Target).join(f3Replacement);
fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue', f2);
console.log('Patched SlotInfoModal.vue target 2');
