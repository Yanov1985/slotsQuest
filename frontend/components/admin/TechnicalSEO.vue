<template>
  <!--
    🌍 Technical SEO Component v3.0 (i18n Multi-GEO Ready)

    Features:
    - Technical SEO Score indicator
    - Advanced Robots Directives (index, follow, max-snippet, image/video rules, notranslate)
    - Sitemap Configuration (Priority, Frequency)
    - Auto-Managed Canonical URL preview & manual override
    - Hreflang Status (Managed by Nuxt i18n)
  -->
  <div class="space-y-6">
    <!-- Header with Score -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#059669]/20 to-[#047857]/20 rounded-xl border border-[#059669]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#059669] to-[#047857] rounded-xl flex items-center justify-center">
          <span class="text-2xl">⚙️</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">Technical SEO</h3>
          <p class="text-sm text-[#9CA3AF]">Advanced Robots, Sitemap & Canonical Routing</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <!-- Technical SEO Score -->
        <div
          class="relative w-14 h-14 rounded-full flex items-center justify-center"
          :class="{
            'bg-[#EF4444]/20': techScore < 40,
            'bg-[#F59E0B]/20': techScore >= 40 && techScore < 70,
            'bg-[#10B981]/20': techScore >= 70,
          }"
        >
          <span
            class="text-lg font-bold"
            :class="{
              'text-[#EF4444]': techScore < 40,
              'text-[#F59E0B]': techScore >= 40 && techScore < 70,
              'text-[#10B981]': techScore >= 70,
            }"
          >{{ techScore }}%</span>
        </div>
      </div>
    </div>

    <!-- Hreflang Status Panel (Managed by i18n) -->
    <div class="bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-2xl">🌍</span>
          <div>
            <h4 class="text-sm font-medium text-[#10B981]">Hreflang Configuration</h4>
            <p class="text-xs text-[#E5E7EB] mt-0.5">Automated Multi-GEO Routing via Database Localizations.</p>
          </div>
        </div>
        <div class="px-3 py-1.5 bg-[#10B981]/20 rounded-lg border border-[#10B981]/40 text-[#10B981] text-xs font-semibold tracking-wide">
          ✓ MANAGED BY NUXT I18N
        </div>
      </div>
      <p class="text-xs text-[#9CA3AF] mt-3">
        The international routing map (Hreflang tags) is now generated dynamically based on the translated regions stored in the <b>Localizations JSON</b>. Googlebot will automatically discover all active GEO variations.
      </p>
    </div>

    <!-- Sitemap Configuration -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <h4 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-4">
        <span class="text-lg">🗺️</span>
        Sitemap Priority & Indexing
      </h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Include in Sitemap -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-[#E5E7EB]">Include in XML Sitemap</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="sitemapConfig.include" class="sr-only peer"/>
              <div class="w-9 h-5 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10B981]"></div>
            </label>
          </div>
          <p class="text-xs text-[#6B7280]">When disabled, this page is excluded from all sitemaps.</p>
        </div>
        
        <!-- Priority -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-[#E5E7EB]">Priority (0.0 to 1.0)</span>
            <span class="text-xs font-bold text-[#10B981]">{{ sitemapConfig.priority }}</span>
          </div>
          <input 
            type="range" 
            v-model.number="sitemapConfig.priority" 
            min="0.1" max="1.0" step="0.1" 
            class="w-full h-2 bg-[#353A4A] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
          />
        </div>
        
        <!-- Frequency -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A] md:col-span-2">
          <label class="text-sm text-[#E5E7EB] block mb-2">Change Frequency</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="freq in ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']"
              :key="freq"
              type="button"
              @click="sitemapConfig.frequency = freq"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              :class="sitemapConfig.frequency === freq ? 'bg-[#10B981] text-white' : 'bg-[#1B1E26] border border-[#353A4A] text-[#9CA3AF] hover:border-[#10B981]/50'"
            >
              {{ freq }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Robots Configuration -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <h4 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-4">
        <span class="text-lg">🤖</span>
        Advanced Robots Meta Directives
      </h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <!-- Index Toggle -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-[#E5E7EB]">Index</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="robotsConfig.index" class="sr-only peer"/>
              <div class="w-9 h-5 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10B981]"></div>
            </label>
          </div>
          <p class="text-xs text-[#6B7280]">{{ robotsConfig.index ? 'Page is indexed' : 'Noindex' }}</p>
        </div>
        <!-- Follow Toggle -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-[#E5E7EB]">Follow</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="robotsConfig.follow" class="sr-only peer"/>
              <div class="w-9 h-5 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10B981]"></div>
            </label>
          </div>
          <p class="text-xs text-[#6B7280]">{{ robotsConfig.follow ? 'Links follow' : 'Nofollow' }}</p>
        </div>
        <!-- NoTranslate Toggle -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-[#E5E7EB]">NoTranslate</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="robotsConfig.notranslate" class="sr-only peer"/>
              <div class="w-9 h-5 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3B82F6]"></div>
            </label>
          </div>
          <p class="text-xs text-[#6B7280]">Blocks Chrome translation prompts</p>
        </div>
        <!-- NoImageIndex Toggle -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-[#E5E7EB]">NoImageIndex</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="robotsConfig.noimageindex" class="sr-only peer"/>
              <div class="w-9 h-5 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#EF4444]"></div>
            </label>
          </div>
          <p class="text-xs text-[#6B7280]">Removes images from Google Image</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Max Snippet -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <label class="text-sm text-[#E5E7EB] block mb-2">Max Text Snippet (Chars)</label>
          <select v-model="robotsConfig.maxSnippet" class="w-full px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-sm text-[#E5E7EB]">
            <option value="-1">No limit (-1)</option>
            <option value="0">No snippet (0)</option>
            <option value="160">160 chars (Meta Desc limit)</option>
            <option value="320">320 chars</option>
          </select>
        </div>
        <!-- Max Image Preview -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <label class="text-sm text-[#E5E7EB] block mb-2">Max Image Preview</label>
          <select v-model="robotsConfig.maxImagePreview" class="w-full px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-sm text-[#E5E7EB]">
            <option value="large">Large (Recommended)</option>
            <option value="standard">Standard</option>
            <option value="none">None</option>
          </select>
        </div>
        <!-- Max Video Preview -->
        <div class="p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
          <label class="text-sm text-[#E5E7EB] block mb-2">Max Video Preview (Secs)</label>
          <select v-model.number="robotsConfig.maxVideoPreview" class="w-full px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-sm text-[#E5E7EB]">
            <option value="-1">No limit (-1)</option>
            <option value="0">Disabled (0)</option>
            <option value="15">15 Seconds</option>
            <option value="30">30 Seconds</option>
          </select>
        </div>
      </div>
      
      <!-- Robots Meta Preview -->
      <div class="mt-4 p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-[#9CA3AF]">Output Preview:</span>
          <button type="button" @click="copyRobots" class="text-xs text-[#059669] hover:text-[#10B981]">📋 Copy</button>
        </div>
        <code class="text-xs text-[#10B981]">{{ robotsMetaTag }}</code>
      </div>
    </div>

    <!-- Canonical URL -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-start justify-between">
        <div>
          <h4 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-1">
            <span class="text-lg">🔗</span>
            Canonical URL Override
          </h4>
          <p class="text-xs text-[#9CA3AF] max-w-2xl mb-4">
            By default, the <b>canonical URL is automatically handled</b> by the routing system to point to the correct regional URL (e.g. <code>/pt-BR/slots/...</code>). Only fill this field if you want to FORCE a static cross-domain canonical or force all regions to cannibalize to a single explicit link.
          </p>
        </div>
        <div v-if="!canonicalUrl" class="px-2 py-1 bg-[#10B981]/20 text-[#10B981] text-xs font-semibold rounded border border-[#10B981]/40">
          AUTO MODE
        </div>
      </div>
      
      <div class="flex gap-3">
        <div class="flex-1">
          <input
            v-model="canonicalUrl"
            type="url"
            placeholder="Warning: Leave empty for automatic i18n dynamic routing."
            class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          />
        </div>
        <button
          type="button"
          @click="canonicalUrl = ''"
          v-if="canonicalUrl"
          class="px-4 py-2 bg-[#353A4A] text-white rounded-lg text-sm hover:bg-[#4B5563] transition-all"
        >Clear</button>
      </div>
    </div>

    <!-- ⚠️ Live Validation -->
    <div v-if="validationWarnings.length > 0" class="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4">
      <h4 class="flex items-center gap-2 text-sm font-medium text-[#F59E0B] mb-3">
        <span class="text-lg">⚠️</span>
        Warnings
      </h4>
      <div class="space-y-2">
        <div v-for="(warning, idx) in validationWarnings" :key="idx"
          class="flex items-start gap-2 text-sm text-[#E5E7EB]">
          <span class="text-[#F59E0B]">•</span>
          <span>{{ warning }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  slug: { type: String, default: 'slot-name' },
  baseUrl: { type: String, default: 'https://Brand.com' },
  modelValue: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

// State mapping
const robotsConfig = ref({
  index: props.modelValue?.robots?.index ?? true,
  follow: props.modelValue?.robots?.follow ?? true,
  notranslate: props.modelValue?.robots?.notranslate ?? false,
  noimageindex: props.modelValue?.robots?.noimageindex ?? false,
  maxSnippet: props.modelValue?.robots?.maxSnippet ?? '-1',
  maxImagePreview: props.modelValue?.robots?.maxImagePreview ?? 'large',
  maxVideoPreview: props.modelValue?.robots?.maxVideoPreview ?? -1,
})

const sitemapConfig = ref({
  include: props.modelValue?.sitemap?.include ?? true,
  priority: props.modelValue?.sitemap?.priority ?? 0.8,
  frequency: props.modelValue?.sitemap?.frequency ?? 'weekly'
})

const canonicalUrl = ref(props.modelValue?.canonical || '')

// Sync incoming
watch(() => props.modelValue, (newVal) => {
  if (newVal?.robots) robotsConfig.value = { ...robotsConfig.value, ...newVal.robots }
  if (newVal?.sitemap) sitemapConfig.value = { ...sitemapConfig.value, ...newVal.sitemap }
  if (newVal?.canonical !== undefined) canonicalUrl.value = newVal.canonical
}, { deep: true })

// Computed
const techScore = computed(() => {
  let score = 20 // Auto routing base score
  
  if (robotsConfig.value.index) score += 20
  if (robotsConfig.value.follow) score += 20
  if (robotsConfig.value.maxImagePreview === 'large') score += 10
  if (sitemapConfig.value.include) score += 20
  if (sitemapConfig.value.priority >= 0.5) score += 10
  
  return Math.min(score, 100)
})

const robotsMetaTag = computed(() => {
  const parts = []
  parts.push(robotsConfig.value.index ? 'index' : 'noindex')
  parts.push(robotsConfig.value.follow ? 'follow' : 'nofollow')
  if (robotsConfig.value.notranslate) parts.push('notranslate')
  if (robotsConfig.value.noimageindex) parts.push('noimageindex')
  if (robotsConfig.value.maxSnippet !== '-1') parts.push(`max-snippet:${robotsConfig.value.maxSnippet}`)
  if (robotsConfig.value.maxImagePreview !== 'none') parts.push(`max-image-preview:${robotsConfig.value.maxImagePreview}`)
  if (robotsConfig.value.maxVideoPreview !== -1) parts.push(`max-video-preview:${robotsConfig.value.maxVideoPreview}`)
  return `<meta name="robots" content="${parts.join(', ')}">`
})

function copyRobots() {
  navigator.clipboard.writeText(robotsMetaTag.value)
}

// Validation
const validationWarnings = computed(() => {
  const warnings = []
  if (!robotsConfig.value.index) warnings.push('Page marked as noindex — will not be indexed by Google')
  if (!robotsConfig.value.follow) warnings.push('Links are nofollow — PageRank is not passed')
  if (canonicalUrl.value) warnings.push('Manual Canonical URL override active. Ensure this does not break i18n multi-language dynamic canonicals.')
  if (!sitemapConfig.value.include) warnings.push('Page excluded from XML Sitemap.')
  if (robotsConfig.value.maxImagePreview === 'none') warnings.push('Google Discover traffic relies on max-image-preview:large. You have disabled it.')
  return warnings
})

// Emit changes
watch([robotsConfig, sitemapConfig, canonicalUrl], () => {
  emit('update:modelValue', {
    robots: robotsConfig.value,
    sitemap: sitemapConfig.value,
    canonical: canonicalUrl.value
  })
}, { deep: true })

</script>
