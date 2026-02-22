<template>
  <!--
    🔍 Keyword Density Checker Component v2.0

    Enhanced with:
    - GEO-location tabs for keywords from Semrush
    - Quick import from CSV/text
    - Keyword Score indicator
    - Integration with SEO keywords fields
  -->
  <div class="space-y-6">
    <!-- Header with Score -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-[#EC4899]/20 to-[#DB2777]/20 rounded-xl border border-[#EC4899]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#EC4899] to-[#DB2777] rounded-xl flex items-center justify-center">
          <span class="text-2xl">🔍</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">Keyword Density Checker</h3>
          <p class="text-sm text-[#9CA3AF]">Keyword analysis by GEO location</p>
        </div>
      </div>
      <!-- Keyword Score -->
      <div class="flex items-center gap-4">
        <div
          class="relative w-14 h-14 rounded-full flex items-center justify-center"
          :class="{
            'bg-[#EF4444]/20': keywordScore < 40,
            'bg-[#F59E0B]/20': keywordScore >= 40 && keywordScore < 70,
            'bg-[#EC4899]/20': keywordScore >= 70,
          }"
        >
          <span
            class="text-lg font-bold"
            :class="{
              'text-[#EF4444]': keywordScore < 40,
              'text-[#F59E0B]': keywordScore >= 40 && keywordScore < 70,
              'text-[#EC4899]': keywordScore >= 70,
            }"
          >{{ keywordScore }}%</span>
        </div>
        <button
          type="button"
          @click="analyzeAllLocations"
          :disabled="analyzing"
          class="px-4 py-2 bg-[#EC4899] text-white rounded-lg text-sm font-medium hover:bg-[#DB2777] transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <svg v-if="analyzing" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span>{{ analyzing ? 'Analyzing...' : '🔄 Analyze' }}</span>
        </button>
      </div>
    </div>

    <!-- Score Details Grid -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div v-for="geo in geoLocations" :key="geo.code" class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-lg">{{ geo.flag }}</span>
          <span
            class="text-xs font-medium px-2 py-0.5 rounded-full"
            :class="getGeoScoreClass(geo.code)"
          >
            {{ getGeoKeywordCount(geo.code) }} keywords
          </span>
        </div>
        <p class="text-xs text-[#9CA3AF]">{{ geo.name }}</p>
        <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden mt-2">
          <div
            class="h-full rounded-full transition-all bg-[#EC4899]"
            :style="{ width: `${Math.min((getGeoKeywordCount(geo.code) / 10) * 100, 100)}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- GEO Tabs -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl overflow-hidden">
      <!-- Tab Headers -->
      <div class="flex overflow-x-auto border-b border-[#353A4A]">
        <button
          v-for="geo in geoLocations"
          :key="geo.code"
          type="button"
          @click="activeGeo = geo.code"
          class="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2"
          :class="{
            'text-[#EC4899] border-[#EC4899] bg-[#EC4899]/10': activeGeo === geo.code,
            'text-[#9CA3AF] border-transparent hover:text-[#E5E7EB] hover:bg-[#353A4A]/50': activeGeo !== geo.code
          }"
        >
          <span class="text-lg">{{ geo.flag }}</span>
          <span>{{ geo.code }}</span>
          <span
            v-if="getGeoKeywordCount(geo.code) > 0"
            class="px-1.5 py-0.5 text-xs rounded-full bg-[#EC4899]/20 text-[#EC4899]"
          >
            {{ getGeoKeywordCount(geo.code) }}
          </span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="p-4 space-y-4">
        <!-- Import Section -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          <button
            type="button"
            @click="showImportModal = true"
            class="flex items-center gap-2 px-3 py-2 bg-[#EC4899]/20 text-[#EC4899] rounded-lg text-sm font-medium hover:bg-[#EC4899]/30 border border-[#EC4899]/30 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            Import from Semrush
          </button>
          <button
            type="button"
            @click="copyFromPrimary"
            class="flex items-center gap-2 px-3 py-2 bg-[#353A4A] text-[#9CA3AF] rounded-lg text-sm hover:text-[#E5E7EB] hover:bg-[#353A4A]/70 transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Copy from Primary
          </button>
          <span class="text-xs text-[#6B7280]">
            Active location: <strong class="text-[#EC4899]">{{ getActiveGeoName() }}</strong>
          </span>
        </div>

        <!-- Keywords Input for Active GEO -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-[#E5E7EB]">
            🎯 Keywords for {{ getActiveGeoName() }} ({{ activeGeo }})
          </label>
          <textarea
            v-model="geoKeywords[activeGeo]"
            rows="6"
            :placeholder="getPlaceholder()"
            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] text-sm font-mono resize-none"
          ></textarea>
          <div class="flex items-center justify-between text-xs">
            <span class="text-[#9CA3AF]">
              One phrase per line or comma-separated. Semrush CSV format supported.
            </span>
            <span
              class="font-medium"
              :class="getGeoKeywordCount(activeGeo) > 0 ? 'text-[#EC4899]' : 'text-[#6B7280]'"
            >
              {{ getGeoKeywordCount(activeGeo) }} keywords
            </span>
          </div>
        </div>

        <!-- Quick Add Tags -->
        <div class="space-y-2">
          <label class="block text-xs font-medium text-[#9CA3AF]">
            Quick add popular phrases:
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="phrase in getSuggestedPhrases()"
              :key="phrase"
              type="button"
              @click="addQuickPhrase(phrase)"
              class="px-3 py-1.5 text-xs rounded-full bg-[#353A4A] text-[#9CA3AF] hover:bg-[#EC4899]/20 hover:text-[#EC4899] transition-all"
            >
              + {{ phrase }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Analysis Results for Active GEO -->
    <div v-if="geoAnalysis[activeGeo]" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4 space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-medium text-[#E5E7EB]">📊 Analysis results for {{ getActiveGeoName() }}</h4>
        <div
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="getScoreClass(geoAnalysis[activeGeo]?.score || 0)"
        >
          Score: {{ geoAnalysis[activeGeo]?.score || 0 }}/100
        </div>
      </div>

      <!-- Keyword Coverage -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Found Keywords -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <h5 class="text-sm font-medium text-[#10B981] mb-3 flex items-center gap-2">
            <span>✅</span> Found in content
          </h5>
          <div class="space-y-2 max-h-48 overflow-y-auto">
            <div
              v-for="(kw, index) in geoAnalysis[activeGeo]?.found || []"
              :key="'found-' + index"
              class="flex items-center justify-between text-sm px-2 py-1 bg-[#10B981]/10 rounded"
            >
              <span class="text-[#E5E7EB]">{{ kw.word }}</span>
              <div class="flex items-center gap-2">
                <span class="text-[#6B7280]">{{ kw.count }}x</span>
                <span class="text-[#10B981] font-mono text-xs">{{ kw.density.toFixed(2) }}%</span>
              </div>
            </div>
            <p v-if="!(geoAnalysis[activeGeo]?.found?.length)" class="text-xs text-[#6B7280]">
              No keywords found
            </p>
          </div>
        </div>

        <!-- Missing Keywords -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <h5 class="text-sm font-medium text-[#EF4444] mb-3 flex items-center gap-2">
            <span>❌</span> Missing in content
          </h5>
          <div class="space-y-2 max-h-48 overflow-y-auto">
            <div
              v-for="(kw, index) in geoAnalysis[activeGeo]?.missing || []"
              :key="'missing-' + index"
              class="flex items-center justify-between text-sm px-2 py-1 bg-[#EF4444]/10 rounded"
            >
              <span class="text-[#EF4444]">{{ kw }}</span>
              <button
                type="button"
                @click="suggestAddKeyword(kw)"
                class="text-xs text-[#F59E0B] hover:underline"
              >
                + Add
              </button>
            </div>
            <p v-if="!(geoAnalysis[activeGeo]?.missing?.length)" class="text-xs text-[#10B981]">
              All keywords found! 🎉
            </p>
          </div>
        </div>
      </div>

      <!-- Content Stats -->
      <div class="grid grid-cols-4 gap-3">
        <div class="p-3 bg-[#161A21] rounded-lg text-center">
          <p class="text-2xl font-bold text-[#E5E7EB]">{{ geoAnalysis[activeGeo]?.wordCount || 0 }}</p>
          <p class="text-xs text-[#9CA3AF]">Words</p>
        </div>
        <div class="p-3 bg-[#161A21] rounded-lg text-center">
          <p class="text-2xl font-bold text-[#E5E7EB]">{{ geoAnalysis[activeGeo]?.coverage || 0 }}%</p>
          <p class="text-xs text-[#9CA3AF]">Coverage</p>
        </div>
        <div class="p-3 bg-[#161A21] rounded-lg text-center">
          <p class="text-2xl font-bold text-[#10B981]">{{ geoAnalysis[activeGeo]?.found?.length || 0 }}</p>
          <p class="text-xs text-[#9CA3AF]">Found</p>
        </div>
        <div class="p-3 bg-[#161A21] rounded-lg text-center">
          <p class="text-2xl font-bold text-[#EF4444]">{{ geoAnalysis[activeGeo]?.missing?.length || 0 }}</p>
          <p class="text-xs text-[#9CA3AF]">Missing</p>
        </div>
      </div>

      <!-- Recommendations -->
      <div v-if="geoAnalysis[activeGeo]?.suggestions?.length" class="space-y-2">
        <h5 class="text-sm font-medium text-[#E5E7EB]">💡 Recommendations</h5>
        <div
          v-for="(suggestion, index) in geoAnalysis[activeGeo]?.suggestions"
          :key="'suggestion-' + index"
          class="flex items-start gap-2 p-2 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg text-sm"
        >
          <span class="text-[#F59E0B]">💡</span>
          <span class="text-[#FBBF24]">{{ suggestion }}</span>
        </div>
      </div>
    </div>

    <!-- Import Modal -->
    <Teleport to="body">
      <div
        v-if="showImportModal"
        class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        @click.self="showImportModal = false"
      >
        <div class="bg-[#1B1E26] border border-[#353A4A] rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          <div class="flex items-center justify-between p-4 border-b border-[#353A4A]">
            <h3 class="text-lg font-medium text-[#E5E7EB]">
              📥 Import Keywords from Semrush
            </h3>
            <button
              type="button"
              @click="showImportModal = false"
              class="p-2 hover:bg-[#353A4A] rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="p-4 space-y-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-[#E5E7EB]">
                Select location to import:
              </label>
              <select
                v-model="importGeo"
                class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#EC4899]"
              >
                <option v-for="geo in geoLocations" :key="geo.code" :value="geo.code">
                  {{ geo.flag }} {{ geo.name }} ({{ geo.code }})
                </option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-[#E5E7EB]">
                Paste data from Semrush (Keyword, Search Volume, etc.):
              </label>
              <textarea
                v-model="importData"
                rows="10"
                placeholder="Keyword;Search Volume;CPC;Competition&#10;gates of olympus;135000;1.20;0.85&#10;gates of olympus free;45000;0.80;0.65&#10;gates of olympus demo;32000;0.50;0.40&#10;&#10;Or just a list of keywords (one per line):"
                class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] font-mono text-sm resize-none"
              ></textarea>
              <p class="text-xs text-[#6B7280]">
                Supported Semrush CSV export (with ; or , delimiter) or simple list.
              </p>
            </div>
          </div>

          <div class="flex justify-end gap-3 p-4 border-t border-[#353A4A]">
            <button
              type="button"
              @click="showImportModal = false"
              class="px-4 py-2 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="processImport"
              class="px-4 py-2 bg-[#EC4899] text-white rounded-lg font-medium hover:bg-[#DB2777] transition-colors"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue'

// Props
const props = defineProps({
  slotName: { type: String, default: '' },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  keywords: { type: String, default: '' },
  keywordsGeo: { type: String, default: '' },
  keywordsLsi: { type: String, default: '' },
  keywordsLongtail: { type: String, default: '' },
  activeRegions: { type: Array, default: () => [] }
})

// Emits
const emit = defineEmits([
  'update:analysisResult',
  'update:densityScore',
  'update:geoKeywords'
])

// Master GEO Locations Config
const allGeoLocations = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'RU', flag: '🇷🇺', name: 'Russia' },
  { code: 'BR', flag: '🇧🇷', name: 'Brasil' },
  { code: 'IN', flag: '🇮🇳', name: 'India' },
  { code: 'TR', flag: '🇹🇷', name: 'Türkiye' },
  { code: 'DE', flag: '🇩🇪', name: 'Deutschland' },
  { code: 'AZ', flag: '🇦🇿', name: 'Azərbaycan' },
  { code: 'UZ', flag: '🇺🇿', name: 'Oʻzbekiston' },
  { code: 'KZ', flag: '🇰🇿', name: 'Kazakhstan' },
  { code: 'ES', flag: '🇪🇸', name: 'España' },
  { code: 'PT', flag: '🇵🇹', name: 'Portugal' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'IT', flag: '🇮🇹', name: 'Italia' },
  { code: 'PL', flag: '🇵🇱', name: 'Polska' },
  { code: 'EN', flag: '🇬🇧', name: 'Global English' }
]

// Computed GEO Locations based on active regions
const defaultRegions = ['US', 'RU', 'BR', 'IN', 'TR', 'DE']

const geoLocations = computed(() => {
  const regionsToUse = props.activeRegions && props.activeRegions.length > 0
    ? props.activeRegions
    : defaultRegions;

  return regionsToUse.map(code => {
    const found = allGeoLocations.find(g => g.code === code)
    if (found) return found;
    // Fallback dictionary for regions not in allGeoLocations
    const fallbacks = {
      'CL': { code: 'CL', flag: '🇨🇱', name: 'Chile' },
      'AR': { code: 'AR', flag: '🇦🇷', name: 'Argentina' },
      'CA': { code: 'CA', flag: '🇨🇦', name: 'Canada' },
      'CO': { code: 'CO', flag: '🇨🇴', name: 'Colombia' },
      'ID': { code: 'ID', flag: '🇮🇩', name: 'Indonesia' },
      'BD': { code: 'BD', flag: '🇧🇩', name: 'Bangladesh' }
    };
    return fallbacks[code] || { code, flag: '🌍', name: code }
  })
})

// State
const analyzing = ref(false)
const activeGeo = ref('US')
const showImportModal = ref(false)
const importData = ref('')
const importGeo = ref('US')

// Maintain active tab
watch(geoLocations, (newLocs) => {
  if (newLocs.length > 0 && !newLocs.some(g => g.code === activeGeo.value)) {
    activeGeo.value = newLocs[0].code;
  }
  if (!importGeo.value || !newLocs.some(g => g.code === importGeo.value)) {
    importGeo.value = newLocs.length > 0 ? newLocs[0].code : 'US';
  }
}, { immediate: true })

// Keywords per GEO
const geoKeywords = reactive({})

// Analysis results per GEO
const geoAnalysis = reactive({})

// Initialize from props
watch(() => props.keywordsGeo, (val) => {
  if (val) {
    try {
      // Try to parse as JSON format: {"US": "keywords", "RU": "keywords", ...}
      const parsed = JSON.parse(val)
      Object.keys(parsed).forEach(geo => {
        if (geoKeywords[geo] !== undefined) {
          geoKeywords[geo] = parsed[geo]
        }
      })
    } catch {
      // If not JSON, assume it's for active geo
      geoKeywords[activeGeo.value] = val
    }
  }
}, { immediate: true })

// Watch keywords and emit updates
watch(geoKeywords, (val) => {
  emit('update:geoKeywords', JSON.stringify(val))
}, { deep: true })

// Computed
const keywordScore = computed(() => {
  let totalScore = 0
  let geoCount = 0

  for (const geo of geoLocations.value) {
    if (geoAnalysis[geo.code]?.score) {
      totalScore += geoAnalysis[geo.code].score
      geoCount++
    }
  }

  if (geoCount === 0) {
    // Calculate based on keyword presence
    let hasKeywords = 0
    for (const geo of geoLocations.value) {
      if (getGeoKeywordCount(geo.code) > 0) hasKeywords++
    }
    return geoLocations.value.length > 0
      ? Math.round((hasKeywords / geoLocations.value.length) * 50)
      : 0
  }

  return Math.round(totalScore / geoCount)
})

// Methods
function getGeoKeywordCount(geoCode) {
  const keywords = geoKeywords[geoCode] || ''
  if (!keywords.trim()) return 0

  // Split by newlines or commas
  const items = keywords.split(/[\n,]/).filter(k => k.trim())
  return items.length
}

function getGeoScoreClass(geoCode) {
  const count = getGeoKeywordCount(geoCode)
  if (count === 0) return 'bg-[#353A4A] text-[#6B7280]'
  if (count < 3) return 'bg-[#F59E0B]/20 text-[#F59E0B]'
  return 'bg-[#10B981]/20 text-[#10B981]'
}

function getActiveGeoName() {
  return geoLocations.value.find(g => g.code === activeGeo.value)?.name || activeGeo.value
}

function getPlaceholder() {
  const examples = {
    US: 'gates of olympus free\ngates of olympus demo\nslot machine online',
    RU: 'врата олимпа бесплатно\nигровой автомат врата олимпа\ngates of olympus демо',
    BR: 'gates of olympus grátis\njogo de cassino online\nslot gates of olympus',
    IN: 'gates of olympus india\nonline slot games\nfree casino slots',
    TR: 'gates of olympus ücretsiz\nçevrimiçi slot oyunları\n',
    DE: 'gates of olympus kostenlos\nspielautomaten online\ncasino slot spiele'
  }
  return examples[activeGeo.value] || 'keyword phrase 1\nkeyword phrase 2'
}

function getSuggestedPhrases() {
  const slotName = props.slotName || 'slot'
  const base = [
    `${slotName} free`,
    `${slotName} demo`,
    `${slotName} online`,
    `${slotName} rtp`,
    `play ${slotName}`,
  ]

  const localized = {
    US: [...base, 'free spins', 'real money'],
    RU: [`${slotName} бесплатно`, `${slotName} демо`, 'игровой автомат'],
    BR: [`${slotName} grátis`, 'jogo de cassino', 'rodadas grátis'],
    IN: [...base, 'indian casino', 'rupee slots'],
    TR: [`${slotName} ücretsiz`, 'bedava slot', 'çevrimiçi casino'],
    DE: [`${slotName} kostenlos`, 'freispiele', 'spielautomaten']
  }

  return localized[activeGeo.value] || base
}

function addQuickPhrase(phrase) {
  const current = geoKeywords[activeGeo.value] || ''
  const phrases = current.split('\n').map(p => p.trim()).filter(p => p)

  if (!phrases.includes(phrase.toLowerCase())) {
    phrases.push(phrase.toLowerCase())
    geoKeywords[activeGeo.value] = phrases.join('\n')
  }
}

function copyFromPrimary() {
  const primary = props.keywords || props.slotName || ''
  if (primary) {
    geoKeywords[activeGeo.value] = primary.split(',').map(k => k.trim()).join('\n')
  }
}

function processImport() {
  if (!importData.value.trim()) {
    showImportModal.value = false
    return
  }

  const lines = importData.value.split('\n').filter(l => l.trim())
  const keywords = []

  for (const line of lines) {
    // Try to parse as CSV (Semrush format)
    const parts = line.split(/[;,]/)
    if (parts.length > 0) {
      // First column is usually the keyword
      const keyword = parts[0].trim()
      // Skip header rows
      if (keyword && keyword.toLowerCase() !== 'keyword' && !keyword.includes('Search Volume')) {
        keywords.push(keyword.toLowerCase())
      }
    }
  }

  // Append to existing keywords for the geo
  const current = geoKeywords[importGeo.value] || ''
  const existing = current.split('\n').map(k => k.trim()).filter(k => k)
  const merged = [...new Set([...existing, ...keywords])]

  geoKeywords[importGeo.value] = merged.join('\n')

  showImportModal.value = false
  importData.value = ''
  activeGeo.value = importGeo.value
}

function analyzeAllLocations() {
  analyzing.value = true

  // Combine all content for analysis
  const fullContent = [
    props.seoTitle,
    props.seoDescription,
    props.description,
    props.content
  ].filter(Boolean).join(' ').toLowerCase()

  setTimeout(() => {
    for (const geo of geoLocations.value) {
      geoAnalysis[geo.code] = analyzeGeo(geo.code, fullContent)
    }

    emit('update:analysisResult', JSON.stringify(geoAnalysis))
    emit('update:densityScore', keywordScore.value)
    analyzing.value = false
  }, 500)
}

function analyzeGeo(geoCode, content) {
  const keywords = (geoKeywords[geoCode] || '').split(/[\n,]/).map(k => k.trim().toLowerCase()).filter(k => k)

  if (keywords.length === 0) {
    return null
  }

  const words = content.match(/[a-zA-Zа-яА-ЯёЁ]+/gi) || []
  const wordCount = words.length

  const found = []
  const missing = []

  for (const keyword of keywords) {
    const keywordRegex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    const matches = content.match(keywordRegex)
    const count = matches ? matches.length : 0

    if (count > 0) {
      found.push({
        word: keyword,
        count,
        density: wordCount > 0 ? (count / wordCount) * 100 : 0
      })
    } else {
      missing.push(keyword)
    }
  }

  const coverage = Math.round((found.length / keywords.length) * 100)

  // Calculate score
  let score = 50

  // Coverage bonus (up to 30 points)
  score += Math.round(coverage * 0.3)

  // Keyword count bonus (up to 10 points)
  if (keywords.length >= 5) score += 10
  else if (keywords.length >= 3) score += 5

  // Density check (up to 10 points)
  const avgDensity = found.reduce((sum, k) => sum + k.density, 0) / (found.length || 1)
  if (avgDensity >= 0.5 && avgDensity <= 2) score += 10
  else if (avgDensity > 0) score += 5

  score = Math.min(100, Math.max(0, score))

  // Generate suggestions
  const suggestions = []

  if (missing.length > 0) {
    suggestions.push(`Add to content: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? '...' : ''}`)
  }

  if (found.some(k => k.density > 3)) {
    suggestions.push('Possible keyword stuffing. Reduce repetitions of some keywords.')
  }

  if (keywords.length < 5) {
    suggestions.push(`Add more keywords for ${geoCode} (recommended minimum 5)`)
  }

  return {
    score,
    wordCount,
    coverage,
    found,
    missing,
    suggestions
  }
}

function getScoreClass(score) {
  if (score >= 70) return 'bg-[#10B981]/20 text-[#10B981]'
  if (score >= 40) return 'bg-[#F59E0B]/20 text-[#F59E0B]'
  return 'bg-[#EF4444]/20 text-[#EF4444]'
}

function suggestAddKeyword(keyword) {
  // This could trigger a suggestion to add to description
  console.log('Suggest adding keyword:', keyword)
}
</script>
