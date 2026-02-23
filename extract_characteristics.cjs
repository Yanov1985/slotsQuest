const fs = require('fs');
const path = require('path');

const slugPath = path.join(__dirname, 'frontend/pages/slots/[slug].vue');
const componentPath = path.join(__dirname, 'frontend/components/slots/SlotCharacteristics.vue');

let content = fs.readFileSync(slugPath, 'utf-8');

// The start is at <!-- 📱 Main characteristics - адаптивная сетка -->
const startString = '            <!-- 📱 Main characteristics - адаптивная сетка -->\n            <section aria-labelledby="characteristics-heading">';
const startIndex = content.indexOf(startString);

// The end is after the game features section inside <aside>...
// To be safe, let's find the Exact tag for Info Popup to bound our search
const endMarker = '<!-- 📱 Info Popup & Like Button Control Panel -->';
const endMarkerIndex = content.indexOf(endMarker);

// Let's find the end of the features section which is near line 1060.
// Look for the last `</section>` before `<!-- 📱 Info Popup`
let exactEndIndex = content.lastIndexOf('            </section>', endMarkerIndex);
if (exactEndIndex !== -1) {
    exactEndIndex += '            </section>'.length;
}

if (startIndex === -1 || exactEndIndex === -1) {
    console.error('Failed to find boundaries');
    process.exit(1);
}

const extractedHtml = content.substring(startIndex, exactEndIndex);

const newComponentContent = `<template>
  <div class="space-y-4 sm:space-y-6 md:space-y-8">
${extractedHtml.replace(/^            /gm, '    ')}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CanvasRevealEffect from '~/components/ui/CanvasRevealEffect.vue'
import {
  getEffectColorsFor,
  getVolatilityText,
  getMaxWin,
  formatReleaseDate,
  getSlotThemesFromDB,
  getSlotBonuses
} from '@/utils/slotFormatters'

const props = defineProps({
  slot: {
    type: Object,
    required: true
  }
})
</script>
`;

fs.writeFileSync(componentPath, newComponentContent);

// Replace the extracted part with <SlotCharacteristics :slot="slot" />
const replacedContent = content.substring(0, startIndex) +
    `            <SlotCharacteristics :slot="slot" />` +
    content.substring(exactEndIndex);

// Add the import to [slug].vue if it's not already there
// Also remove CanvasRevealEffect from [slug].vue if it's no longer used, but we can leave it
let finalContent = replacedContent.replace(
    `import SlotHero from '~/components/slots/SlotHero.vue'`,
    `import SlotHero from '~/components/slots/SlotHero.vue'\nimport SlotCharacteristics from '~/components/slots/SlotCharacteristics.vue'`
);

fs.writeFileSync(slugPath, finalContent);

console.log('Successfully extracted SlotCharacteristics.vue');
