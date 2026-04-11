import re

file_path = "d:/www/Projects/2025/SlotQuest/frontend/components/slots/SlotHero.vue"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the HTML block safely
old_html = """<p id="slot-description" class="text-sm sm:text-base lg:text-lg leading-relaxed lg:leading-loose text-justify text-white/90 font-normal tracking-wide max-w-prose">
                    <span class="text-white/85" v-html="shortDescriptionHtml"></span>
                  </p>"""

new_html = """<div id="slot-description" class="text-sm sm:text-base lg:text-lg leading-relaxed lg:leading-loose text-justify text-white/90 font-normal tracking-wide max-w-prose">
                    <div class="text-white/85 space-y-3" v-html="shortDescriptionHtml"></div>
                  </div>"""

if old_html in content:
    content = content.replace(old_html, new_html)

# Replace the javascript block safely
old_js = """const shortDescriptionHtml = computed(() => props.slot.seo_description || props.slot.description || getShortDescription(props.slot, true))
const shortDescriptionRaw = computed(() => getShortDescription(props.slot, false))"""

new_js = """const shortDescriptionHtml = computed(() => {
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
})"""

if old_js in content:
    content = content.replace(old_js, new_js)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch applied.")
