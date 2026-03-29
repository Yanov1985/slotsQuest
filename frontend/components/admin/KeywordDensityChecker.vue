<template>
  <!--
    🔍 Keyword Density Checker Component v3.0 (Multi-GEO Ready)

    Enhanced with:
    - Native Multi-GEO support (analyzes only the active locale)
    - Unicode Regex (\p{L}) for PT-BR, TR, HI-IN accurate word counting
    - Import from Semrush specifically for the active locale
    - Consolidated Keyword Scoring UI without duplicate tabs
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
          <p class="text-sm text-[#9CA3AF]">Active locale content analysis</p>
        </div>
      </div>
      <!-- Keyword Score -->
      <div class="flex items-center gap-4">
        <div
          class="relative w-14 h-14 rounded-full flex items-center justify-center"
          :class="{
            'bg-[#EF4444]/20': finalScore < 40,
            'bg-[#F59E0B]/20': finalScore >= 40 && finalScore < 70,
            'bg-[#10B981]/20': finalScore >= 70,
          }"
        >
          <span
            class="text-lg font-bold"
            :class="{
              'text-[#EF4444]': finalScore < 40,
              'text-[#F59E0B]': finalScore >= 40 && finalScore < 70,
              'text-[#10B981]': finalScore >= 70,
            }"
          >{{ finalScore }}%</span>
        </div>
        <button
          type="button"
          @click="analyzeContent"
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

    <!-- Active Analyzer Panel -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl overflow-hidden">
      <!-- Toolbar -->
      <div class="p-4 border-b border-[#353A4A] bg-[#161A21] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div class="flex items-center gap-3">
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
        </div>
        
        <div class="flex items-center gap-2 text-sm text-[#9CA3AF]">
          <span>Checking <strong class="text-[#EC4899]">{{ totalKeywordsCount }}</strong> keywords</span>
        </div>
      </div>

      <!-- Analysis Results -->
      <div v-if="analysisResult" class="p-4 space-y-4">
        <!-- Content Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="p-3 bg-[#161A21] rounded-lg text-center border border-[#353A4A]/50">
            <p class="text-2xl font-bold text-[#E5E7EB] font-mono">{{ analysisResult.wordCount || 0 }}</p>
            <p class="text-xs text-[#9CA3AF] uppercase tracking-wider mt-1">Words</p>
          </div>
          <div class="p-3 bg-[#161A21] rounded-lg text-center border border-[#353A4A]/50">
            <p class="text-2xl font-bold font-mono" :class="analysisResult.coverage >= 70 ? 'text-[#10B981]' : (analysisResult.coverage >= 40 ? 'text-[#F59E0B]' : 'text-[#EF4444]')">
              {{ analysisResult.coverage || 0 }}%
            </p>
            <p class="text-xs text-[#9CA3AF] uppercase tracking-wider mt-1">Coverage</p>
          </div>
          <div class="p-3 bg-[#161A21] rounded-lg text-center border border-[#10B981]/20">
            <p class="text-2xl font-bold text-[#10B981] font-mono">{{ analysisResult.found?.length || 0 }}</p>
            <p class="text-xs text-[#10B981] uppercase tracking-wider mt-1">Found</p>
          </div>
          <div class="p-3 bg-[#161A21] rounded-lg text-center border border-[#EF4444]/20">
            <p class="text-2xl font-bold text-[#EF4444] font-mono">{{ analysisResult.missing?.length || 0 }}</p>
            <p class="text-xs text-[#EF4444] uppercase tracking-wider mt-1">Missing</p>
          </div>
        </div>

        <!-- Keyword Coverage Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <!-- Found Keywords -->
          <div class="p-3 bg-[#161A21] border border-[#10B981]/20 rounded-lg">
            <h5 class="text-sm font-medium text-[#10B981] mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Found in Content
            </h5>
            <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
              <div
                v-for="(kw, index) in analysisResult.found || []"
                :key="'found-' + index"
                class="flex items-center justify-between text-sm px-3 py-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg hover:bg-[#10B981]/20 transition-colors"
              >
                <span class="text-[#E5E7EB] truncate mr-2" :title="kw.word">{{ kw.word }}</span>
                <div class="flex items-center gap-3 shrink-0">
                  <span class="text-[#9CA3AF] text-xs font-mono">{{ kw.count }}x</span>
                  <span class="text-[#10B981] font-mono text-xs w-12 text-right" :class="{'text-[#F59E0B] font-bold': kw.density > 3}">
                    {{ kw.density.toFixed(2) }}%
                  </span>
                </div>
              </div>
              <p v-if="!(analysisResult.found?.length)" class="text-xs text-[#6B7280] p-2 text-center border border-dashed border-[#353A4A] rounded-lg">
                No keywords found in content.
              </p>
            </div>
          </div>

          <!-- Missing Keywords -->
          <div class="p-3 bg-[#161A21] border border-[#EF4444]/20 rounded-lg">
            <h5 class="text-sm font-medium text-[#EF4444] mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              Missing in Content
            </h5>
            <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
              <div
                v-for="(kw, index) in analysisResult.missing || []"
                :key="'missing-' + index"
                class="flex items-center justify-between text-sm px-3 py-2 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg"
              >
                <span class="text-[#E5E7EB] truncate mr-2" :title="kw">{{ kw }}</span>
                <span class="text-[#EF4444] text-xs px-2 py-0.5 rounded-full bg-[#EF4444]/20 shrink-0">Missing</span>
              </div>
              <p v-if="!(analysisResult.missing?.length)" class="text-xs text-[#10B981] p-4 text-center border border-dashed border-[#10B981]/30 rounded-lg bg-[#10B981]/5">
                🎉 Excellent! All targeted keywords were found in the content!
              </p>
            </div>
          </div>
        </div>

        <!-- Recommendations Alert -->
        <div v-if="analysisResult.suggestions?.length" class="mt-4 p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-lg space-y-2">
          <h5 class="text-sm font-medium text-[#FBBF24] flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            Recommendations
          </h5>
          <ul class="list-disc list-inside text-sm text-[#E5E7EB] space-y-1">
            <li v-for="(suggestion, index) in analysisResult.suggestions" :key="'suggestion-' + index">
              {{ suggestion }}
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Blank State -->
      <div v-else class="p-12 flex flex-col items-center justify-center text-center border-t border-[#353A4A]">
        <div class="w-16 h-16 bg-[#353A4A]/50 rounded-full flex items-center justify-center mb-4 text-3xl">🤖</div>
        <h4 class="text-[#E5E7EB] font-medium mb-2">Ready for Analysis</h4>
        <p class="text-sm text-[#9CA3AF] max-w-sm mb-6">
          Click the analyze button to scan your localized content against your primary, geo, and LSI keywords.
        </p>
        <button
          type="button"
          @click="analyzeContent"
          class="px-5 py-2.5 bg-[#EC4899] text-white rounded-lg font-medium hover:bg-[#DB2777] transition-all"
        >
          Run Analysis Now
        </button>
      </div>
    </div>

    <!-- Import Modal (Semrush) -->
    <Teleport to="body">
      <div
        v-if="showImportModal"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
        @click.self="showImportModal = false"
      >
        <div class="bg-[#1B1E26] border border-[#353A4A] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
          <div class="flex items-center justify-between p-5 border-b border-[#353A4A]/80">
            <h3 class="text-lg font-medium text-[#E5E7EB] flex items-center gap-3">
              <span class="p-2 bg-[#EC4899]/20 rounded-lg text-[#EC4899]">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              </span>
              Import Keywords (Semrush)
            </h3>
            <button
              type="button"
              @click="showImportModal = false"
              class="p-2 hover:bg-[#353A4A] rounded-lg transition-colors text-[#9CA3AF] hover:text-white"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="p-5 space-y-5 overflow-y-auto">
            <div class="bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg p-4 flex gap-3 text-sm text-[#10B981]">
              <svg class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <p>These keywords will be appended to the <strong>Multi-GEO Local Keywords</strong> list for the currently active locale.</p>
            </div>

            <div class="space-y-3">
              <label class="block text-sm font-medium text-[#E5E7EB]">
                Paste data from Semrush (Keyword List or CSV export):
              </label>
              <textarea
                v-model="importData"
                rows="10"
                placeholder="Keyword;Search Volume;CPC;Competition
gates of olympus;135000;1.20;0.85
gates of olympus grátis;45000;0.80;0.65
gates of olympus jogar;32000;0.50;0.40

Or simply paste a pure list of keywords (one per line)..."
                class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] rounded-xl text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent font-mono text-sm resize-none shadow-inner"
              ></textarea>
              <p class="text-xs text-[#6B7280]">
                Supports direct paste from Semrush Excel/CSV exports (;) or Google Sheets. The tool automatically extracts the keywords column.
              </p>
            </div>
          </div>

          <div class="flex justify-end gap-3 p-5 border-t border-[#353A4A]/80 bg-[#161A21] rounded-b-2xl">
            <button
              type="button"
              @click="showImportModal = false"
              class="px-5 py-2.5 text-[#9CA3AF] font-medium hover:text-[#E5E7EB] hover:bg-[#353A4A] rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="processImport"
              class="px-6 py-2.5 bg-[#EC4899] text-white rounded-lg font-medium hover:bg-[#DB2777] shadow-lg shadow-[#EC4899]/20 transition-all flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              Append Keywords
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

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

const emit = defineEmits([
  'update:analysisResult',
  'update:densityScore',
  'update:geoKeywords'
])

// State
const analyzing = ref(false)
const showImportModal = ref(false)
const importData = ref('')

// The singular analysis result for the current locale context
const analysisResult = ref(null)

// Computed total pooled keywords
const allLocalKeywords = computed(() => {
  const stringsToParse = [
    props.keywords || '',
    props.keywordsGeo || '',
    props.keywordsLsi || '',
    props.keywordsLongtail || ''
  ].join('\n')
  
  // Split by comma, newline, or semicolon
  const rawList = stringsToParse.split(/[\n,;]/)
  // Clean and deduplicate
  const cleanedList = rawList.map(k => k.trim().toLowerCase()).filter(k => k.length > 1)
  return [...new Set(cleanedList)]
})

const totalKeywordsCount = computed(() => allLocalKeywords.value.length)

const finalScore = computed(() => {
  if (!analysisResult.value) return 0
  return analysisResult.value.score || 0
})

// Process Import from Semrush
function processImport() {
  if (!importData.value.trim()) {
    showImportModal.value = false
    return
  }

  const lines = importData.value.split('\n').filter(l => l.trim())
  const newKeywords = []

  for (const line of lines) {
    // Parse Semrush format (delimiters: ; , \t)
    const parts = line.split(/[;,\t]/)
    if (parts.length > 0) {
      // The first cell is consistently the Keyword in Semrush outputs
      const keyword = parts[0].trim()
      // Exclude Header rows
      if (keyword && keyword.toLowerCase() !== 'keyword' && !keyword.toLowerCase().includes('search volume')) {
        newKeywords.push(keyword)
      }
    }
  }

  // Combine with existing geo keywords to append cleanly
  const currentGeo = (props.keywordsGeo || '').split(/[\n,;]/).map(k => k.trim()).filter(k => k)
  const merged = [...new Set([...currentGeo, ...newKeywords])]
  
  // Emit to parent to update form state!
  emit('update:geoKeywords', merged.join('\n'))

  showImportModal.value = false
  importData.value = ''
  
  // Automatically trigger an analysis after import
  setTimeout(() => analyzeContent(), 100)
}

function analyzeContent() {
  analyzing.value = true

  // Combine content (Title + Meta Description + Slot Description + Main Content)
  // This represents the entire "On-Page Text" payload the Search Engine crawls.
  const fullContent = [
    props.seoTitle,
    props.seoDescription,
    props.description,
    props.content
  ].filter(Boolean).join(' ').toLowerCase()

  setTimeout(() => {
    analysisResult.value = runAnalysis(allLocalKeywords.value, fullContent)
    
    // Bubble results up to parent so it can save them to the DB (for Analytics table)
    emit('update:analysisResult', JSON.stringify(analysisResult.value))
    emit('update:densityScore', analysisResult.value.score)
    analyzing.value = false
  }, 300)
}

function runAnalysis(keywordsArray, textBlob) {
  if (keywordsArray.length === 0) {
    return { score: 0, wordCount: 0, coverage: 0, found: [], missing: [], suggestions: ['Provide keywords to begin analysis.'] }
  }

  // 🌍 FULL UNICODE REGEX SUPPORT: \p{L} matches ANY letter in any alphabet (Portuguese, Hindi, Cyrillic, etc.)
  // \p{N} matches numbers. This completely replaces the broken /[a-zA-Zа-яА-ЯёЁ]/gi regex.
  const words = textBlob.match(/[\p{L}\p{N}]+/gui) || []
  const wordCount = words.length

  const found = []
  const missing = []

  for (const keyword of keywordsArray) {
    // Escape regex characters for exact phrase matching
    const keywordRegex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    const matches = textBlob.match(keywordRegex)
    const count = matches ? matches.length : 0

    if (count > 0) {
      // Calculate Density = (Keyword Occurrence * Words in Keyword) / Total Words
      // E.g., "gates of olympus" is 3 words. If found 5 times, it accounts for 15 words out of 500 = 3% density.
      const wordsInKeyword = (keyword.match(/[\p{L}\p{N}]+/gui) || []).length || 1
      const density = wordCount > 0 ? ((count * wordsInKeyword) / wordCount) * 100 : 0
      
      found.push({
        word: keyword,
        count,
        density
      })
    } else {
      missing.push(keyword)
    }
  }

  // Sort found by highest density
  found.sort((a, b) => b.density - a.density)

  const coverage = Math.round((found.length / keywordsArray.length) * 100)

  // Calculate score (out of 100)
  let score = 50

  // Coverage bonus (up to 30 points)
  score += Math.round(coverage * 0.3)

  // Keyword count bonus (Reward extensive targeting)
  if (keywordsArray.length >= 10) score += 10
  else if (keywordsArray.length >= 5) score += 5

  // Average Density Scoring
  const avgDensity = found.length > 0 ? found.reduce((sum, k) => sum + k.density, 0) / found.length : 0;
  if (avgDensity > 0) {
    if (avgDensity >= 0.5 && avgDensity <= 3) score += 10
    else if (avgDensity > 3 && avgDensity <= 5) score += 5
    // Density > 5 is dangerous (spam), deduct points
    else if (avgDensity > 5) score -= 15
  }

  score = Math.min(100, Math.max(0, score))

  // Smart Recommendations
  const suggestions = []

  if (missing.length > 0) {
    const missingSample = missing.slice(0, 3).join(', ')
    suggestions.push(`Try incorporating: "${missingSample}" into your Content or Meta Description to improve coverage.`)
  }

  const stuffedKeywords = found.filter(k => k.density > 4)
  if (stuffedKeywords.length > 0) {
    suggestions.push(`Warning: Keyword stuffing detected for "${stuffedKeywords[0].word}" (${stuffedKeywords[0].density.toFixed(1)}%). Consider using synonyms.`)
  }

  if (keywordsArray.length < 5) {
    suggestions.push(`Your keyword list is quite small. Consider adding more Semantic (LSI) or Geo-targeted keywords.`)
  }
  
  if (wordCount < 100) {
    suggestions.push(`Content is incredibly thin (${wordCount} words). Search engines prefer in-depth content. Consider expanding the slot review.`)
  } else if (wordCount < 300) {
    suggestions.push(`Content is slightly thin (${wordCount} words). Aim for at least 300+ words for better SEO ranking potential.`)
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
</script>
