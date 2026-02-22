<template>
  <!--
    🎯 SERP Preview Component - Preview in Google Search Results

    Shows how the page will look in Google results:
    - Desktop preview (standard view)
    - Mobile preview (mobile search)
    - Rich Snippet preview (with rating, FAQ, breadcrumbs)
  -->
  <div class="space-y-4">
    <!-- Заголовок секции -->
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-medium text-[#E5E7EB] flex items-center gap-2">
        <svg class="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        SERP Preview (Google)
      </h4>

      <!-- Переключатель Desktop/Mobile -->
      <div class="flex items-center gap-2 bg-[#1B1E26] rounded-lg p-1">
        <button
          type="button"
          @click="viewMode = 'desktop'"
          :class="[
            'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
            viewMode === 'desktop'
              ? 'bg-[#10B981] text-white'
              : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
          ]"
        >
          🖥️ Desktop
        </button>
        <button
          type="button"
          @click="viewMode = 'mobile'"
          :class="[
            'px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
            viewMode === 'mobile'
              ? 'bg-[#10B981] text-white'
              : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
          ]"
        >
          📱 Mobile
        </button>
      </div>
    </div>

    <!-- Preview Container -->
    <div
      class="bg-white rounded-xl p-6 border border-[#353A4A]"
      :class="{ 'max-w-[400px]': viewMode === 'mobile' }"
    >
      <!-- Google Search Bar (декоративная) -->
      <div class="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold">
            <span class="text-[#4285F4]">G</span>
            <span class="text-[#EA4335]">o</span>
            <span class="text-[#FBBC05]">o</span>
            <span class="text-[#4285F4]">g</span>
            <span class="text-[#34A853]">l</span>
            <span class="text-[#EA4335]">e</span>
          </span>
        </div>
        <div class="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500">
          {{ searchQuery }}
        </div>
      </div>

      <!-- Search Result Preview -->
      <div class="space-y-1">
        <!-- Breadcrumbs (если включены) -->
        <div v-if="showBreadcrumbs" class="flex items-center gap-1 text-sm">
          <span class="text-[#202124]">{{ siteUrl }}</span>
          <span class="text-[#5F6368]">›</span>
          <span class="text-[#5F6368]">slots</span>
          <span class="text-[#5F6368]">›</span>
          <span class="text-[#5F6368]">{{ slug }}</span>
        </div>

        <!-- URL без breadcrumbs -->
        <div v-else class="text-sm text-[#202124]">
          {{ fullUrl }}
        </div>

        <!-- Title -->
        <h3
          class="text-xl leading-tight cursor-pointer hover:underline"
          :class="titleClass"
        >
          {{ displayTitle }}
        </h3>

        <!-- Rating Stars (Rich Snippet) -->
        <div v-if="showRating" class="flex items-center gap-2 text-sm">
          <span class="text-[#FBBC05]">★★★★☆</span>
          <span class="text-[#70757A]">{{ rating }} ({{ ratingCount }} reviews)</span>
          <span v-if="showPrice" class="text-[#70757A]">· Free to play</span>
        </div>

        <!-- Description -->
        <p
          class="text-sm leading-relaxed"
          :class="descriptionClass"
        >
          {{ displayDescription }}
        </p>

        <!-- FAQ Snippet (если включён) -->
        <div v-if="showFaq && faqItems.length > 0" class="mt-3 space-y-2">
          <div
            v-for="(faq, index) in faqItems.slice(0, 2)"
            :key="index"
            class="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button class="w-full flex items-center justify-between px-4 py-2 text-left bg-gray-50 hover:bg-gray-100 transition-colors">
              <span class="text-sm font-medium text-[#1A0DAB]">{{ faq.question }}</span>
              <svg class="w-4 h-4 text-[#70757A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Sitelinks (опционально для брендовых запросов) -->
        <div v-if="showSitelinks" class="mt-3 grid grid-cols-2 gap-x-8 gap-y-1">
          <a href="#" class="text-sm text-[#1A0DAB] hover:underline">Free Demo</a>
          <a href="#" class="text-sm text-[#1A0DAB] hover:underline">Real Money</a>
          <a href="#" class="text-sm text-[#1A0DAB] hover:underline">RTP & Features</a>
          <a href="#" class="text-sm text-[#1A0DAB] hover:underline">Reviews</a>
        </div>
      </div>
    </div>

    <!-- Character Counters & Warnings -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Title Counter -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-[#9CA3AF]">Title Length</span>
          <span
            class="text-xs font-mono"
            :class="titleLengthClass"
          >
            {{ titleLength }}/60
          </span>
        </div>
        <div class="w-full bg-[#353A4A] rounded-full h-1.5">
          <div
            class="h-1.5 rounded-full transition-all duration-300"
            :class="titleProgressClass"
            :style="{ width: titleProgressWidth }"
          ></div>
        </div>
        <p v-if="titleLength > 60" class="text-xs text-[#EF4444] mt-2">
          ⚠️ Title will be truncated in SERP
        </p>
        <p v-else-if="titleLength < 30" class="text-xs text-[#F59E0B] mt-2">
          💡 Too short, add keywords
        </p>
        <p v-else-if="titleLength >= 50 && titleLength <= 60" class="text-xs text-[#10B981] mt-2">
          ✅ Ideal length for SEO
        </p>
      </div>

      <!-- Description Counter -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-[#9CA3AF]">Description Length</span>
          <span
            class="text-xs font-mono"
            :class="descriptionLengthClass"
          >
            {{ descriptionLength }}/160
          </span>
        </div>
        <div class="w-full bg-[#353A4A] rounded-full h-1.5">
          <div
            class="h-1.5 rounded-full transition-all duration-300"
            :class="descriptionProgressClass"
            :style="{ width: descriptionProgressWidth }"
          ></div>
        </div>
        <p v-if="descriptionLength > 160" class="text-xs text-[#EF4444] mt-2">
          ⚠️ Description will be truncated
        </p>
        <p v-else-if="descriptionLength < 120" class="text-xs text-[#F59E0B] mt-2">
          💡 Add CTA or keywords
        </p>
        <p v-else-if="descriptionLength >= 150 && descriptionLength <= 160" class="text-xs text-[#10B981] mt-2">
          ✅ Ideal length for SERP
        </p>
      </div>
    </div>

    <!-- SEO Score & Tips -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-medium text-[#E5E7EB]">SEO Score</span>
        <div class="flex items-center gap-2">
          <span
            class="text-2xl font-bold"
            :class="seoScoreClass"
          >
            {{ seoScore }}
          </span>
          <span class="text-xs text-[#9CA3AF]">/ 100</span>
        </div>
      </div>

      <!-- Score Bar -->
      <div class="w-full bg-[#353A4A] rounded-full h-2 mb-4">
        <div
          class="h-2 rounded-full transition-all duration-500"
          :class="seoScoreBarClass"
          :style="{ width: `${seoScore}%` }"
        ></div>
      </div>

      <!-- Tips -->
      <div v-if="seoTips.length > 0" class="space-y-2">
        <p class="text-xs font-medium text-[#9CA3AF]">Recommendations:</p>
        <ul class="space-y-1">
          <li
            v-for="(tip, index) in seoTips"
            :key="index"
            class="text-xs flex items-start gap-2"
            :class="tip.type === 'error' ? 'text-[#EF4444]' : tip.type === 'warning' ? 'text-[#F59E0B]' : 'text-[#10B981]'"
          >
            <span>{{ tip.type === 'error' ? '❌' : tip.type === 'warning' ? '⚠️' : '✅' }}</span>
            <span>{{ tip.message }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  // Основные SEO данные
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    default: 'slot-name'
  },
  // Данные для генерации
  slotName: {
    type: String,
    default: ''
  },
  providerName: {
    type: String,
    default: ''
  },
  rtp: {
    type: [String, Number],
    default: '96.50'
  },
  volatility: {
    type: String,
    default: 'High'
  },
  maxWin: {
    type: [String, Number],
    default: '5000'
  },
  rating: {
    type: [String, Number],
    default: '4.8'
  },
  ratingCount: {
    type: [String, Number],
    default: '1247'
  },
  // Rich Snippets toggles
  showRating: {
    type: Boolean,
    default: true
  },
  showBreadcrumbs: {
    type: Boolean,
    default: true
  },
  showFaq: {
    type: Boolean,
    default: false
  },
  showSitelinks: {
    type: Boolean,
    default: false
  },
  showPrice: {
    type: Boolean,
    default: true
  },
  // FAQ данные
  faqItems: {
    type: Array,
    default: () => []
  },
  // Настройки сайта
  siteUrl: {
    type: String,
    default: 'slotquest.com'
  }
})

// State
const viewMode = ref('desktop')

// Computed
const searchQuery = computed(() => {
  return props.slotName || 'slot name'
})

const fullUrl = computed(() => {
  return `https://${props.siteUrl}/slots/${props.slug}`
})

// Display Title with truncation indicator
const displayTitle = computed(() => {
  const title = props.title || generateDefaultTitle()
  if (title.length > 60) {
    return title.substring(0, 57) + '...'
  }
  return title
})

// Display Description with truncation
const displayDescription = computed(() => {
  const desc = props.description || generateDefaultDescription()
  if (desc.length > 160) {
    return desc.substring(0, 157) + '...'
  }
  return desc
})

// Character lengths
const titleLength = computed(() => {
  return (props.title || generateDefaultTitle()).length
})

const descriptionLength = computed(() => {
  return (props.description || generateDefaultDescription()).length
})

// Title classes
const titleClass = computed(() => {
  return titleLength.value > 60 ? 'text-[#1A0DAB]' : 'text-[#1A0DAB]'
})

const titleLengthClass = computed(() => {
  if (titleLength.value > 60) return 'text-[#EF4444]'
  if (titleLength.value >= 50 && titleLength.value <= 60) return 'text-[#10B981]'
  if (titleLength.value < 30) return 'text-[#F59E0B]'
  return 'text-[#9CA3AF]'
})

const titleProgressClass = computed(() => {
  if (titleLength.value > 60) return 'bg-[#EF4444]'
  if (titleLength.value >= 50) return 'bg-[#10B981]'
  if (titleLength.value < 30) return 'bg-[#F59E0B]'
  return 'bg-[#3B82F6]'
})

const titleProgressWidth = computed(() => {
  return `${Math.min((titleLength.value / 60) * 100, 100)}%`
})

// Description classes
const descriptionClass = computed(() => {
  return 'text-[#4D5156]'
})

const descriptionLengthClass = computed(() => {
  if (descriptionLength.value > 160) return 'text-[#EF4444]'
  if (descriptionLength.value >= 150 && descriptionLength.value <= 160) return 'text-[#10B981]'
  if (descriptionLength.value < 120) return 'text-[#F59E0B]'
  return 'text-[#9CA3AF]'
})

const descriptionProgressClass = computed(() => {
  if (descriptionLength.value > 160) return 'bg-[#EF4444]'
  if (descriptionLength.value >= 150) return 'bg-[#10B981]'
  if (descriptionLength.value < 120) return 'bg-[#F59E0B]'
  return 'bg-[#3B82F6]'
})

const descriptionProgressWidth = computed(() => {
  return `${Math.min((descriptionLength.value / 160) * 100, 100)}%`
})

// SEO Score calculation
const seoScore = computed(() => {
  let score = 0

  // Title checks (max 30 points)
  if (titleLength.value >= 30 && titleLength.value <= 60) score += 15
  else if (titleLength.value > 0) score += 5

  if (props.title?.toLowerCase().includes(props.slotName?.toLowerCase())) score += 10
  if (props.title?.includes('|') || props.title?.includes('-')) score += 5

  // Description checks (max 30 points)
  if (descriptionLength.value >= 120 && descriptionLength.value <= 160) score += 15
  else if (descriptionLength.value > 0) score += 5

  if (props.description?.toLowerCase().includes(props.slotName?.toLowerCase())) score += 10
  if (props.description?.includes('%') || props.description?.toLowerCase().includes('rtp')) score += 5

  // Rich Snippets (max 20 points)
  if (props.showRating) score += 10
  if (props.showBreadcrumbs) score += 5
  if (props.showFaq && props.faqItems?.length > 0) score += 5

  // Keywords (max 20 points)
  const powerWords = ['free', 'demo', 'play', 'bonus', 'win', 'spins']
  const titleLower = (props.title || '').toLowerCase()
  const descLower = (props.description || '').toLowerCase()

  powerWords.forEach(word => {
    if (titleLower.includes(word) || descLower.includes(word)) score += 2
  })

  return Math.min(score, 100)
})

const seoScoreClass = computed(() => {
  if (seoScore.value >= 80) return 'text-[#10B981]'
  if (seoScore.value >= 60) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
})

const seoScoreBarClass = computed(() => {
  if (seoScore.value >= 80) return 'bg-[#10B981]'
  if (seoScore.value >= 60) return 'bg-[#F59E0B]'
  return 'bg-[#EF4444]'
})

// SEO Tips
const seoTips = computed(() => {
  const tips = []

  // Title tips
  if (titleLength.value > 60) {
    tips.push({ type: 'error', message: 'Title is too long, will be truncated' })
  } else if (titleLength.value < 30) {
    tips.push({ type: 'warning', message: 'Title is too short, add keywords' })
  } else if (titleLength.value >= 50 && titleLength.value <= 60) {
    tips.push({ type: 'success', message: 'Optimal title length' })
  }

  if (!props.title?.toLowerCase().includes(props.slotName?.toLowerCase()) && props.slotName) {
    tips.push({ type: 'warning', message: 'Add slot name to Title' })
  }

  // Description tips
  if (descriptionLength.value > 160) {
    tips.push({ type: 'error', message: 'Description will be truncated in search results' })
  } else if (descriptionLength.value < 120) {
    tips.push({ type: 'warning', message: 'Description can be expanded for better CTR' })
  }

  // Rich Snippets tips
  if (!props.showRating) {
    tips.push({ type: 'warning', message: 'Enable Review Schema for stars in SERP' })
  }

  if (props.showFaq && (!props.faqItems || props.faqItems.length === 0)) {
    tips.push({ type: 'warning', message: 'FAQ is enabled, but no questions added' })
  }

  // Power words check
  const powerWords = ['free', 'demo', 'play', 'bonus']
  const hasPowerWord = powerWords.some(w =>
    props.title?.toLowerCase().includes(w) ||
    props.description?.toLowerCase().includes(w)
  )

  if (!hasPowerWord) {
    tips.push({ type: 'warning', message: 'Add power words (Free, Demo, Bonus)' })
  }

  return tips
})

// Helper functions
function generateDefaultTitle() {
  if (!props.slotName) return 'Slot Name | Play Free Demo | SlotQuest'
  return `${props.slotName} Slot by ${props.providerName || 'Provider'} | Play Free Demo 2025`
}

function generateDefaultDescription() {
  if (!props.slotName) return 'Play this exciting slot game for free or real money. Great RTP, bonus features, and big win potential!'
  return `🎰 Play ${props.slotName} by ${props.providerName || 'Provider'} - RTP ${props.rtp}%, ${props.volatility} volatility. Free demo & real money. Max win ${props.maxWin}x! ⭐`
}
</script>
