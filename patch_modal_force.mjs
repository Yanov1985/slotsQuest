import fs from 'fs';
let f = fs.readFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue', 'utf8');
let newHTML = `                {{ slotData.name }} ({{ slotData.providers?.name || t('devFallback') }}) {{ t('isA') }} {{ getVolatilityText(slotData.volatility).toLowerCase() }} {{ t('volSlot') }} {{ slotData.rtp || '96.0' }}% {{ t('andMaxWin') }} {{ formatMaxWin(slotData.max_win) }}x.
                {{ slotData.rtp >= 96.5 ? t('aboveRTP') : t('belowRTP') }}
                {{ t('overallRate') }} {{ slotData.rating || 4.5 }} {{ t('forIts') }} {{ slotData.volatility?.toLowerCase() === 'high' ? t('highPot') : t('balPot') }}`;

// We will replace the text between <p v-else> and </p> under the Expert Verdict section
const parts = f.split('<p v-else>');
// The Expert Verdict is the VERY FIRST <p v-else> in the file!
const subParts = parts[1].split('</p>');
subParts[0] = '\n' + newHTML + '\n              ';
parts[1] = subParts.join('</p>');

fs.writeFileSync('d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotInfoModal.vue', parts.join('<p v-else>'));
console.log('Force replaced Expert Verdict!');
