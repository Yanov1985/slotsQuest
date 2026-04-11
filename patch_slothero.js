const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotHero.vue';
let content = fs.readFileSync(filePath, 'utf-8');

const newHtml = `<div id="slot-description" class="text-sm sm:text-base lg:text-lg leading-relaxed lg:leading-loose text-justify text-white/90 font-normal tracking-wide max-w-prose">
                    <div class="text-white/85 space-y-3" v-html="shortDescriptionHtml"></div>
                  </div>`;

const newJs = `const shortDescriptionHtml = computed(() => {
  const s = props.slot
  if (s.overview_description_1 || s.overview_description_2) {
    const parts = []
    if (s.overview_description_1) parts.push(s.overview_description_1)
    if (s.overview_description_2) parts.push(s.overview_description_2)
    return parts.join('<br><br>')
  }
  return s.seo_description || s.description || getShortDescription(s, true)
})

const shortDescriptionRaw = computed(() => {
  const s = props.slot
  if (s.overview_description_1 || s.overview_description_2) {
    const parts = []
    if (s.overview_description_1) parts.push(s.overview_description_1)
    if (s.overview_description_2) parts.push(s.overview_description_2)
    return parts.join(' ').replace(/<[^>]*>?/gm, '')
  }
  return getShortDescription(s, false)
})`;

// Replace HTML
content = content.replace(/<p id="slot-description"[\s\S]*?<\/p>/, newHtml);

// Replace JS
content = content.replace(/const shortDescriptionHtml = [\s\S]*?getShortDescription\(props\.slot, false\)\)/, newJs);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Regex patch applied");
