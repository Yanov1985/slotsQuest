<template>
  <!--
    🔍 Keyword Density Checker Component

    Анализирует плотность ключевых слов в контенте:
    - Primary keywords
    - LSI keywords
    - Keyword stuffing detection
    - Recommendations
  -->
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#EC4899]/20 to-[#DB2777]/20 rounded-xl border border-[#EC4899]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#EC4899] to-[#DB2777] rounded-xl flex items-center justify-center">
          <span class="text-2xl">🔍</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">Keyword Density Checker</h3>
          <p class="text-sm text-[#9CA3AF]">Анализ плотности ключевых слов</p>
        </div>
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
        <span>{{ analyzing ? 'Анализ...' : '🔄 Анализировать' }}</span>
      </button>
    </div>

    <!-- Target Keywords Input -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <label class="block text-sm font-medium text-[#E5E7EB] mb-3">
        🎯 Целевые ключевые слова
      </label>
      <div class="space-y-3">
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Primary Keyword</label>
          <input
            type="text"
            v-model="primaryKeyword"
            :placeholder="slotName || 'Gates of Olympus'"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] text-sm"
          />
        </div>
        <div>
          <label class="block text-xs text-[#9CA3AF] mb-1">Secondary Keywords (через запятую)</label>
          <input
            type="text"
            v-model="secondaryKeywords"
            placeholder="free spins, bonus, RTP, slot review"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EC4899] text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Density Score -->
    <div v-if="analysisResult" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-medium text-[#E5E7EB]">📊 Результаты анализа</h4>
        <div
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="scoreClass"
        >
          Score: {{ densityScore }}/100
        </div>
      </div>

      <!-- Primary Keyword Analysis -->
      <div class="space-y-4">
        <div class="p-3 bg-[#161A21] rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-[#E5E7EB]">{{ primaryKeyword || 'Primary Keyword' }}</span>
            <span
              class="text-sm font-mono"
              :class="primaryDensityClass"
            >
              {{ analysisResult.primaryDensity.toFixed(2) }}%
            </span>
          </div>
          <div class="w-full bg-[#353A4A] rounded-full h-2">
            <div
              class="h-2 rounded-full transition-all duration-300"
              :class="primaryDensityBarClass"
              :style="{ width: `${Math.min(analysisResult.primaryDensity * 20, 100)}%` }"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-[#6B7280] mt-1">
            <span>0%</span>
            <span class="text-[#10B981]">1-2% optimal</span>
            <span>5%+</span>
          </div>
        </div>

        <!-- Secondary Keywords -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <h5 class="text-sm font-medium text-[#E5E7EB] mb-3">Secondary Keywords</h5>
          <div class="space-y-2">
            <div
              v-for="(keyword, index) in analysisResult.secondaryKeywords"
              :key="index"
              class="flex items-center justify-between text-sm"
            >
              <span class="text-[#9CA3AF]">{{ keyword.word }}</span>
              <div class="flex items-center gap-2">
                <span class="text-[#6B7280]">{{ keyword.count }}x</span>
                <span
                  class="font-mono"
                  :class="keyword.density > 3 ? 'text-[#EF4444]' : keyword.density > 0.5 ? 'text-[#10B981]' : 'text-[#F59E0B]'"
                >
                  {{ keyword.density.toFixed(2) }}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Word Count Stats -->
        <div class="grid grid-cols-3 gap-3">
          <div class="p-3 bg-[#161A21] rounded-lg text-center">
            <p class="text-2xl font-bold text-[#E5E7EB]">{{ analysisResult.wordCount }}</p>
            <p class="text-xs text-[#9CA3AF]">Слов</p>
          </div>
          <div class="p-3 bg-[#161A21] rounded-lg text-center">
            <p class="text-2xl font-bold text-[#E5E7EB]">{{ analysisResult.uniqueWords }}</p>
            <p class="text-xs text-[#9CA3AF]">Уникальных</p>
          </div>
          <div class="p-3 bg-[#161A21] rounded-lg text-center">
            <p class="text-2xl font-bold text-[#E5E7EB]">{{ analysisResult.sentenceCount }}</p>
            <p class="text-xs text-[#9CA3AF]">Предложений</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Issues & Recommendations -->
    <div v-if="analysisResult && (analysisResult.issues.length > 0 || analysisResult.suggestions.length > 0)"
         class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3">💡 Рекомендации</h4>

      <!-- Issues -->
      <div v-if="analysisResult.issues.length > 0" class="space-y-2 mb-4">
        <div
          v-for="(issue, index) in analysisResult.issues"
          :key="'issue-' + index"
          class="flex items-start gap-2 p-2 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg text-sm"
        >
          <span class="text-[#EF4444]">❌</span>
          <span class="text-[#EF4444]">{{ issue }}</span>
        </div>
      </div>

      <!-- Suggestions -->
      <div v-if="analysisResult.suggestions.length > 0" class="space-y-2">
        <div
          v-for="(suggestion, index) in analysisResult.suggestions"
          :key="'suggestion-' + index"
          class="flex items-start gap-2 p-2 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg text-sm"
        >
          <span class="text-[#F59E0B]">💡</span>
          <span class="text-[#FBBF24]">{{ suggestion }}</span>
        </div>
      </div>
    </div>

    <!-- Keyword Distribution Chart -->
    <div v-if="analysisResult" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3">📈 Топ-10 слов по частоте</h4>
      <div class="space-y-2">
        <div
          v-for="(word, index) in analysisResult.topWords"
          :key="'top-' + index"
          class="flex items-center gap-3"
        >
          <span class="text-xs text-[#6B7280] w-4">{{ index + 1 }}</span>
          <span class="text-sm text-[#E5E7EB] flex-1">{{ word.word }}</span>
          <div class="w-32 bg-[#353A4A] rounded-full h-2">
            <div
              class="h-2 rounded-full bg-gradient-to-r from-[#EC4899] to-[#8B5CF6]"
              :style="{ width: `${(word.count / analysisResult.topWords[0].count) * 100}%` }"
            ></div>
          </div>
          <span class="text-xs text-[#9CA3AF] w-8 text-right">{{ word.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  slotName: { type: String, default: '' },
  description: { type: String, default: '' },
  content: { type: String, default: '' },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  keywords: { type: String, default: '' }
})

// Emits
const emit = defineEmits(['update:analysisResult', 'update:densityScore'])

// State
const analyzing = ref(false)
const analysisResult = ref(null)
const primaryKeyword = ref(props.slotName || '')
const secondaryKeywords = ref(props.keywords || '')

// Watch props
watch(() => props.slotName, (val) => { if (val && !primaryKeyword.value) primaryKeyword.value = val })
watch(() => props.keywords, (val) => { if (val) secondaryKeywords.value = val })

// Computed
const densityScore = computed(() => {
  if (!analysisResult.value) return 0
  return analysisResult.value.score
})

const scoreClass = computed(() => {
  const score = densityScore.value
  if (score >= 80) return 'bg-[#10B981]/20 text-[#10B981]'
  if (score >= 60) return 'bg-[#F59E0B]/20 text-[#F59E0B]'
  return 'bg-[#EF4444]/20 text-[#EF4444]'
})

const primaryDensityClass = computed(() => {
  if (!analysisResult.value) return 'text-[#9CA3AF]'
  const density = analysisResult.value.primaryDensity
  if (density >= 1 && density <= 2) return 'text-[#10B981]'
  if (density > 3) return 'text-[#EF4444]'
  return 'text-[#F59E0B]'
})

const primaryDensityBarClass = computed(() => {
  if (!analysisResult.value) return 'bg-[#9CA3AF]'
  const density = analysisResult.value.primaryDensity
  if (density >= 1 && density <= 2) return 'bg-[#10B981]'
  if (density > 3) return 'bg-[#EF4444]'
  return 'bg-[#F59E0B]'
})

// Methods
function analyzeContent() {
  analyzing.value = true

  // Combine all text content for analysis
  const fullContent = [
    props.seoTitle,
    props.seoDescription,
    props.description,
    props.content
  ].filter(Boolean).join(' ')

  setTimeout(() => {
    analysisResult.value = performAnalysis(fullContent)
    emit('update:analysisResult', JSON.stringify(analysisResult.value))
    emit('update:densityScore', analysisResult.value.score)
    analyzing.value = false
  }, 500)
}

function performAnalysis(text) {
  if (!text) {
    return {
      score: 0,
      wordCount: 0,
      uniqueWords: 0,
      sentenceCount: 0,
      primaryDensity: 0,
      secondaryKeywords: [],
      topWords: [],
      issues: ['Нет контента для анализа'],
      suggestions: ['Добавьте описание и контент для слота']
    }
  }

  // Normalize text
  const normalizedText = text.toLowerCase()
  const words = normalizedText.match(/[a-zA-Zа-яА-ЯёЁ]+/g) || []
  const sentences = text.split(/[.!?]+/).filter(s => s.trim())

  // Count words
  const wordCount = words.length
  const wordFrequency = {}
  words.forEach(word => {
    if (word.length > 2) { // Ignore short words
      wordFrequency[word] = (wordFrequency[word] || 0) + 1
    }
  })

  const uniqueWords = Object.keys(wordFrequency).length

  // Calculate primary keyword density
  const primaryWords = primaryKeyword.value.toLowerCase().split(/\s+/)
  let primaryCount = 0
  primaryWords.forEach(pw => {
    if (pw.length > 2) {
      primaryCount += wordFrequency[pw] || 0
    }
  })
  const primaryDensity = wordCount > 0 ? (primaryCount / wordCount) * 100 : 0

  // Analyze secondary keywords
  const secondaryList = secondaryKeywords.value.split(',').map(k => k.trim().toLowerCase()).filter(k => k)
  const secondaryAnalysis = secondaryList.map(keyword => {
    const keywordWords = keyword.split(/\s+/)
    let count = 0
    keywordWords.forEach(kw => {
      if (kw.length > 2) {
        count += wordFrequency[kw] || 0
      }
    })
    return {
      word: keyword,
      count,
      density: wordCount > 0 ? (count / wordCount) * 100 : 0
    }
  })

  // Get top words
  const sortedWords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }))

  // Generate issues and suggestions
  const issues = []
  const suggestions = []

  // Check primary keyword density
  if (primaryDensity < 0.5) {
    issues.push(`Primary keyword "${primaryKeyword.value}" встречается слишком редко (${primaryDensity.toFixed(2)}%)`)
    suggestions.push(`Добавьте больше упоминаний "${primaryKeyword.value}" в контент`)
  } else if (primaryDensity > 3) {
    issues.push(`Возможный keyword stuffing: "${primaryKeyword.value}" (${primaryDensity.toFixed(2)}%)`)
    suggestions.push(`Уменьшите количество повторений "${primaryKeyword.value}"`)
  }

  // Check content length
  if (wordCount < 300) {
    suggestions.push(`Контент слишком короткий (${wordCount} слов). Рекомендуется минимум 300-500 слов`)
  }

  // Check secondary keywords
  const missingSecondary = secondaryAnalysis.filter(k => k.count === 0)
  if (missingSecondary.length > 0) {
    suggestions.push(`Добавьте ключевые слова: ${missingSecondary.map(k => k.word).join(', ')}`)
  }

  // Calculate score
  let score = 50 // Base score

  // Primary keyword density (up to 30 points)
  if (primaryDensity >= 1 && primaryDensity <= 2) score += 30
  else if (primaryDensity >= 0.5 && primaryDensity <= 3) score += 20
  else if (primaryDensity > 0) score += 10

  // Content length (up to 20 points)
  if (wordCount >= 500) score += 20
  else if (wordCount >= 300) score += 15
  else if (wordCount >= 100) score += 10

  // Secondary keywords coverage (up to 20 points)
  const coveredSecondary = secondaryAnalysis.filter(k => k.count > 0).length
  if (secondaryList.length > 0) {
    score += Math.round((coveredSecondary / secondaryList.length) * 20)
  }

  // Penalties
  if (primaryDensity > 4) score -= 20 // Keyword stuffing
  if (issues.length > 2) score -= 10

  score = Math.max(0, Math.min(100, score))

  return {
    score,
    wordCount,
    uniqueWords,
    sentenceCount: sentences.length,
    primaryDensity,
    secondaryKeywords: secondaryAnalysis,
    topWords: sortedWords,
    issues,
    suggestions
  }
}

// Auto-analyze on mount if content exists
if (props.description || props.content) {
  analyzeContent()
}
</script>
