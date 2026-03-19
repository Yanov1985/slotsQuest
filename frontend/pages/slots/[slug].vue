<template>
  <div class="flex-1 flex flex-col">
    <!-- 📱 Навигация - адаптивная для всех устройств с эффектом стекла -->
    <nav
      class="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-lg shadow-black/20"
    >
      <div class="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div class="flex items-center justify-between gap-2">
          <!-- Кнопка назад - компактная на mobile -->
          <NuxtLink
            to="/"
            class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm sm:text-base min-w-0"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span class="hidden xs:inline">Back to </span>Slots<span class="hidden sm:inline"> Catalog</span>
          </NuxtLink>

          <!-- Хлебные крошки - показываем на планшетах и выше -->
          <div class="hidden md:flex items-center text-xs sm:text-sm text-white/50 truncate">
            <NuxtLink to="/" class="hover:text-blue-400 transition-colors whitespace-nowrap"
              >Home</NuxtLink
            >
            <span class="mx-1 sm:mx-2">/</span>
            <NuxtLink to="/" class="hover:text-blue-400 transition-colors whitespace-nowrap"
              >Slots</NuxtLink
            >
            <span class="mx-1 sm:mx-2">/</span>
            <span class="text-white font-medium truncate max-w-[120px] lg:max-w-[200px]" v-if="gameSlot">{{
              gameSlot.name || 'Slot'
            }}</span>
          </div>

          <!-- Мобильные хлебные крошки - только название слота -->
          <div class="md:hidden text-xs text-white/70 truncate max-w-[140px] sm:max-w-[200px]" v-if="gameSlot">
            {{ gameSlot.name || 'Slot' }}
          </div>
        </div>
      </div>
    </nav>

    <!-- Загрузка -->
    <!-- 💀 Skeleton Loading -->
    <div v-if="loading" class="min-h-screen bg-zinc-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto">
        <div class="flex flex-col lg:flex-row gap-8 animate-pulse">
          <!-- Левая колонка (Основной контент) -->
          <div class="w-full lg:w-[70%] space-y-8">

            <!-- Mobile Layout (Visible only on mobile) -->
            <div class="lg:hidden space-y-6">
               <div class="h-8 w-3/4 bg-white/5 rounded-lg"></div>
               <div class="h-6 w-1/2 bg-white/5 rounded-full"></div>
               <div class="space-y-2">
                 <div class="h-4 w-full bg-white/5 rounded"></div>
                 <div class="h-4 w-full bg-white/5 rounded"></div>
                 <div class="h-4 w-2/3 bg-white/5 rounded"></div>
               </div>
               <div class="grid grid-cols-2 gap-3 mt-4">
                 <div class="h-10 bg-white/5 rounded-lg"></div>
                 <div class="h-10 bg-white/5 rounded-lg"></div>
                 <div class="h-10 bg-white/5 rounded-lg"></div>
                 <div class="h-10 bg-white/5 rounded-lg"></div>
               </div>
               <div class="h-12 w-full bg-white/5 rounded-xl mt-4"></div>
            </div>

            <!-- Desktop Layout (Visible only on desktop) -->
            <div class="hidden lg:flex gap-8 items-start">
               <!-- Portrait Image Column (2/5) -->
               <div class="w-2/5 aspect-[3/4] bg-white/5 rounded-2xl border border-white/5"></div>

               <!-- Content Column (3/5) -->
               <div class="flex-1 space-y-6">
                 <div class="h-8 w-1/3 bg-white/5 rounded-full"></div>
                 <div class="h-12 w-3/4 bg-white/5 rounded-xl"></div>
                 <div class="space-y-3">
                   <div class="h-4 w-full bg-white/5 rounded"></div>
                   <div class="h-4 w-full bg-white/5 rounded"></div>
                   <div class="h-4 w-5/6 bg-white/5 rounded"></div>
                 </div>
                 <div class="flex gap-4 pt-4">
                   <div class="h-14 w-40 bg-white/5 rounded-xl"></div>
                   <div class="h-14 w-40 bg-white/5 rounded-xl"></div>
                 </div>
               </div>
            </div>

             <!-- Bottom Content (Common) -->
             <div class="hidden lg:grid grid-cols-2 gap-6 mt-8">
                 <div class="h-32 bg-white/5 rounded-2xl"></div>
                 <div class="h-32 bg-white/5 rounded-2xl"></div>
             </div>

          </div>

          <!-- Правая колонка (Сайдбар) -->
          <div class="hidden lg:block w-[30%] space-y-6">
            <div class="w-full h-80 bg-white/5 rounded-3xl border border-white/5"></div>
            <div class="w-full h-96 bg-white/5 rounded-3xl border border-white/5"></div>
          </div>
        </div>
      </div>
    </div>


    <!-- Ошибка -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center max-w-md mx-auto px-4">
        <div class="text-red-500 mb-6">
          <svg
            class="w-20 h-20 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
          <h2 class="text-3xl font-bold mb-4 text-gray-800">Slot Not Found</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
        </div>
        <NuxtLink
          to="/"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors font-semibold"
        >
          Go to Catalog
        </NuxtLink>
      </div>
    </div>

    <!-- 📱 Hero секция -->
    <SlotHero
      :slot="gameSlot"
      :show-rating-picker="showRatingPicker"
      :hover-stars="hoverStars"
      :selected-stars="selectedStars"
      :rating-submitting="ratingSubmitting"
      :rating-submitted="ratingSubmitted"
      @toggle-rating="toggleRatingPicker"
      @pick-rating="pickRating"
      @submit-rating="submitRating"
      @play-demo="playSlot"
      @play-real="playForReal"
      @image-error="handleSlotImageError"
      @video-error="handleSlotVideoError"
      @hover-star="setHover"
    >
      <template #after-hero>
        <!-- Награды и достижения (мобильные и десктоп) -->
        <aside
          v-if="gameSlot.show_awards && gameSlot.awards && gameSlot.awards.length > 0"
          class="mt-5 lg:mt-0"
          aria-label="Награды и достижения"
        >
          <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
            <header class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 shadow-lg flex items-center justify-center ring-2 ring-white/20" aria-hidden="true">
                <span class="text-white text-lg">🏆</span>
              </div>
              <h2 class="text-white font-extrabold text-lg tracking-wide">Награды и достижения</h2>
            </header>

            <div class="grid grid-cols-2 gap-3" role="list">
              <div
                v-for="(award, index) in gameSlot.awards"
                :key="index"
                :class="getAwardPublicClasses(award.color_scheme)"
                class="group relative overflow-hidden rounded-xl p-4 hover:scale-105 transition-all duration-300"
                role="listitem"
              >
                <div :class="getAwardBgClasses(award.color_scheme)" class="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl transition-colors" aria-hidden="true"></div>
                <div class="flex items-center gap-3 relative z-10">
                  <div :class="getAwardIconClasses(award.color_scheme)" class="w-9 h-9 rounded-lg flex items-center justify-center shadow" aria-hidden="true">
                    <span class="text-white text-base">{{ award.emoji || '🏆' }}</span>
                  </div>
                  <div>
                    <div class="text-white font-bold text-sm leading-snug">{{ award.title || 'Награда' }}</div>
                    <div :class="getAwardTextClasses(award.color_scheme)" class="text-xs">{{ award.description || 'Описание награды' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </template>

      <template #right-column>
        <!-- 📱 Правая часть: Характеристики и информация (прокручиваемая) -->
        <aside
          class="w-full lg:w-[30%] bg-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-white/20 min-w-0 order-2"
          style="min-height: auto"
          aria-label="Game characteristics and additional information"
        >
          <div class="space-y-4 sm:space-y-6 md:space-y-8">
            <SlotCharacteristics :slot="gameSlot" />
          </div>
        </aside>
      </template>
    </SlotHero>

    <!-- 📱 Info Popup & Like Button Control Panel -->
    <div
      class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[100] flex flex-col gap-3 print:hidden safe-area-pb"
      v-if="gameSlot && gameSlot.id"
    >
      <!-- Info Button -->
      <button
        @click="showInfoModal = true"
        class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg hover:bg-white/20 transition-all hover:scale-105 group animated-gradient-border pointer-events-auto"
        aria-label="Slot Information"
      >
        <Icon name="solar:info-circle-bold" class="text-2xl group-hover:animate-pulse" />
      </button>

      <!-- Like Button -->
      <button
        @click="toggleLike"
        class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg hover:bg-white/20 transition-all hover:scale-105 group animated-gradient-border pointer-events-auto"
        :class="{ '!bg-red-500/20 !border-red-500/50': isLiked }"
        aria-label="Add to Favorites"
      >
        <span
          class="text-2xl transition-transform duration-300"
          :class="{ 'scale-125': isLiked, 'animate-[heartbeat_1s_ease-in-out_infinite]': isLiked }"
        >
          {{ isLiked ? '❤️' : '🤍' }}
        </span>
      </button>
    </div>

    <!-- 📋 Info Modal (Lazy Loaded for TTI Optimization) -->
    <SlotInfoModal
      v-if="showInfoModal"
      :slot-data="gameSlot"
      :pros="computedPros"
      :cons="computedCons"
      :faq="computedFaq"
      :reviews="computedReviews"
      :how-to="computedHowToPlay"
      :similar="similarSlots"
      @close="showInfoModal = false"
      @play="playSlot(); showInfoModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSlotSEO } from '~/composables/useSlotSEO'
import {
  formatArticleDate,
  getEffectColorsFor,
  getAwardEffectColors,
  getAwardPublicClasses,
  getAwardBgClasses,
  getAwardIconClasses,
  getAwardTextClasses,
  getSlotIcon,
  getImageFormat,
  getVolatilityText,
  getMaxWin,
  formatReleaseDate,
  getSlotDescription,
  getShortDescription,
  getDetailedDescription,
  getCleanSlotName,
  getSlotNameWithKeyword,
  processCtaSubtitle,
  processConclusionRatingTitle,
  processPopularityTitle,
  processProfExpertQuote,
  processProfRecommendation,
  processConclusionText1,
  processConclusionVerdict,
  replaceKeywordsInText,
  getSlotThemes,
  getSlotBonuses,
  getSlotThemesFromDB,
  formatMaxWin,
  formatPaylines,
  formatNumber
} from '~/utils/slotFormatters'

import SlotHero from '~/components/slots/SlotHero.vue'
import SlotCharacteristics from '~/components/slots/SlotCharacteristics.vue'
import SlotInfoModal from '~/components/slots/SlotInfoModal.vue'

// 🎯 Импорт composable для JSON-LD
const { getJsonLdScriptSync, fetchRawJsonLd } = useJsonLd()

// Получаем slug из роута
const route = useRoute()
const slug = route.params.slug

// Инициализация реактивных состояний ДО await для сохранения контекста
const gameSlot = ref({})
const allSlots = ref([])
const slotMechanics = ref([])
const jsonLdSchemas = ref(null)
const loading = ref(true)
const error = ref(null)

// Dynamic OG Image Generation (Must be declared before any await)
defineOgImageComponent('NuxtSeo', {
  title: computed(() => gameSlot.value?.name || (gameSlot.value?.footer_company_name ? `${gameSlot.value.footer_company_name} Game` : 'Brand Game')),
  description: computed(() => `RTP: ${gameSlot.value?.rtp || '96'}% | Volatility: ${gameSlot.value?.volatility || 'Medium'} | Max Win: ${gameSlot.value?.max_win || '5000'}x`),
  theme: '#8B5CF6',
  colorMode: 'dark',
  siteName: computed(() => gameSlot.value?.footer_company_name || 'Brand'),
})

// --- SSR Data Fetching (Phase 4 SEO Optimization) ---
const { data: pageData, pending, error: fetchError, refresh } = await useAsyncData(
  'slot-page-data',
  async () => {
    const currentSlug = route.params.slug
    const slotRes = await $fetch(`http://localhost:3001/api/slots/${currentSlug}`)
    if (!slotRes) throw new Error(`Слот с адресом "${currentSlug}" не найден`)

    const [mechanicsRes, slotsRes, jsonLdRes] = await Promise.all([
      $fetch(`http://localhost:3001/api/mechanics/slot/${slotRes.id}`).catch(() => []),
      $fetch('http://localhost:3001/api/slots').catch(() => []),
      fetchRawJsonLd ? fetchRawJsonLd(slotRes.id).catch(() => null) : Promise.resolve(null)
    ])

    return {
      slot: slotRes,
      mechanics: mechanicsRes || [],
      allSlots: slotsRes?.data || slotsRes || [],
      jsonLd: jsonLdRes
    }
  },
  { watch: [() => route.params.slug] }
)

// Синхронизация данных при клиентских переходах или обновлении
watch(pageData, (newData) => {
  if (newData && newData.slot) {
    gameSlot.value = newData.slot
    slotMechanics.value = newData.mechanics
    allSlots.value = newData.allSlots
    jsonLdSchemas.value = newData.jsonLd
  }
}, { deep: true, immediate: true })

watch(pending, (v) => loading.value = v)
watch(fetchError, (v) => error.value = v?.message || null)

// Первичная инициализация после первого рендера
if (pageData.value) {
  gameSlot.value = pageData.value.slot || {}
  allSlots.value = pageData.value.allSlots || []
  slotMechanics.value = pageData.value.mechanics || []
  jsonLdSchemas.value = pageData.value.jsonLd || null
  loading.value = pending.value
  error.value = fetchError.value?.message || null
}

// Состояние для рейтинга
const showRatingPicker = ref(false)
const selectedStars = ref(null)
const hoverStars = ref(0)
const ratingSubmitting = ref(false)
const ratingSubmitted = ref(false)

// State for animated FAQ accordion
const openFaqIndex = ref(null)
const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

// 🆕 Computed properties for Enhanced Info Modal
const computedPros = computed(() => {
  if (gameSlot.value.info_pros) {
    try { return JSON.parse(gameSlot.value.info_pros) } catch(e) { /* fallback */ }
  }
  const s = gameSlot.value
  const pros = []
  if (s.rtp >= 96.5) pros.push(`Above-average RTP of ${s.rtp}%`)
  else if (s.rtp) pros.push(`Competitive RTP of ${s.rtp}%`)
  if (s.max_win >= 5000) pros.push(`Massive max win of ${formatMaxWin(s.max_win)}x`)
  else if (s.max_win) pros.push(`Max win potential of ${formatMaxWin(s.max_win)}x`)
  if (s.demo_url) pros.push('Free demo mode available')
  if (s.slot_bonuses?.length > 0) pros.push(`${s.slot_bonuses.length} bonus features`)
  else pros.push('Engaging gameplay mechanics')
  if (s.paylines) pros.push(`${formatPaylines(s.paylines)} ways to win`)
  return pros.slice(0, 4)
})

const computedCons = computed(() => {
  if (gameSlot.value.info_cons) {
    try { return JSON.parse(gameSlot.value.info_cons) } catch(e) { /* fallback */ }
  }
  const s = gameSlot.value
  const cons = []
  if (s.volatility?.toLowerCase() === 'high') cons.push('High volatility — not for cautious players')
  else if (s.volatility?.toLowerCase() === 'low') cons.push('Low volatility — smaller win potential')
  if (s.rtp && s.rtp < 96.0) cons.push(`Below-average RTP of ${s.rtp}%`)
  if (!s.slot_bonuses?.length) cons.push('Limited bonus features')
  if (cons.length === 0) cons.push('May not appeal to all play styles')
  cons.push('Requires stable internet connection')
  return cons.slice(0, 3)
})

const computedFaq = computed(() => {
  if (gameSlot.value.info_faq) {
    try { return JSON.parse(gameSlot.value.info_faq) } catch(e) { /* fallback */ }
  }
  const s = gameSlot.value
  const name = s.name || 'this slot'
  const provider = s.providers?.name || 'the developer'
  return [
    { question: `Is ${name} safe to play online?`, answer: `Yes, ${name} is developed by ${provider}, a licensed and regulated game provider. All games are tested by independent auditing agencies to ensure fair play and random outcomes.` },
    { question: `What is the RTP of ${name}?`, answer: `The Return to Player (RTP) of ${name} is ${s.rtp || '96.0'}%. This means that, on average, for every $100 wagered, the game returns $${s.rtp || '96.0'} to players over time.` },
    { question: `Can I play ${name} for free?`, answer: `Yes! You can play ${name} in free demo mode right here on our site. No registration or deposit required — just click "${s.info_demo_btn_text || 'Play Demo Now'}" to start spinning.` },
    { question: `What is the maximum win in ${name}?`, answer: `The maximum win in ${name} is ${formatMaxWin(s.max_win)}x your bet. ${s.max_win >= 5000 ? 'This is a very high max win potential!' : 'This offers solid winning potential for players.'}` },
    { question: `What is the volatility of ${name}?`, answer: `${name} has ${getVolatilityText(s.volatility).toLowerCase()} volatility. ${s.volatility?.toLowerCase() === 'high' ? 'This means wins are less frequent but can be much larger when they hit.' : s.volatility?.toLowerCase() === 'low' ? 'This means you can expect frequent, smaller wins.' : 'This provides a balanced mix of win frequency and size.'}` }
  ]
})

const computedReviews = computed(() => {
  if (gameSlot.value.info_reviews) {
    try { return JSON.parse(gameSlot.value.info_reviews) } catch(e) { /* fallback */ }
  }
  const s = gameSlot.value
  const name = s.name || 'this slot'
  return [
    { author: 'Alex R.', rating: 5, text: `${name} is one of my favorite slots! The graphics are stunning and the bonus features keep me coming back. Highly recommended for anyone who enjoys ${s.volatility?.toLowerCase() === 'high' ? 'high-risk, high-reward' : 'engaging'} gameplay.`, date: '2024-12-15' },
    { author: 'Maria K.', rating: 4, text: `Great slot with solid RTP of ${s.rtp || '96.0'}%. The free spins feature is especially exciting. I play it regularly on our site in demo mode before wagering real money.`, date: '2024-11-28' },
    { author: 'James T.', rating: 4, text: `Decent slot from ${s.providers?.name || 'the developer'}. The ${formatMaxWin(s.max_win)}x max win potential is attractive. Love the theme and sound design. Would recommend trying the demo first.`, date: '2024-10-10' }
  ]
})

const computedHowToPlay = computed(() => {
  if (gameSlot.value.info_how_to_play) {
    try { return JSON.parse(gameSlot.value.info_how_to_play) } catch(e) { /* fallback */ }
  }
  const name = gameSlot.value.name || 'the slot'
  const btnText = gameSlot.value.info_demo_btn_text || 'Play Demo Now'
  return [
    { step: 'Open the Demo', text: `Click "${btnText}" on this page to launch ${name} in free play mode. No registration or deposit required.` },
    { step: 'Set Your Bet', text: `Use the controls at the bottom of the game screen to adjust your bet size. Start with the minimum bet to learn the mechanics.` },
    { step: 'Spin the Reels', text: `Click the Spin button or press Space. Watch for winning combinations across the ${formatPaylines(gameSlot.value.paylines)} paylines.` },
    { step: 'Trigger Bonuses', text: `Land special symbols to activate bonus features like free spins, multipliers, and other rewards. Check the paytable (ℹ) for details.` }
  ]
})

const similarSlots = computed(() => {
  if (!allSlots.value?.length || !gameSlot.value?.id) return []
  const currentProvider = gameSlot.value.providers?.id
  const currentId = gameSlot.value.id
  return allSlots.value
    .filter(s => s.id !== currentId && (s.providers?.id === currentProvider || s.provider_id === currentProvider))
    .slice(0, 6)
})

// 🌍 Geo Targeting: Парсинг регионов из БД
const parsedGeoRegions = computed(() => {
  if (!gameSlot.value?.geo_regions) return []
  try {
    const regions = JSON.parse(gameSlot.value.geo_regions)
    return Array.isArray(regions) ? regions : []
  } catch (e) {
    return []
  }
})






// Вычисляемые свойства для текстов с заменой ключевых слов
// 🔑 Работает аналогично replaceKeywordsInText для hero_keyword
const overviewDescription1 = computed(() => {
  if (!gameSlot.value.overview_description_1) return ''

  let result = gameSlot.value.overview_description_1

  // Замена [keyword_1] с усиленной SEO-разметкой
  // Используем itemprop="keywords" для Schema.org + стилизацию
  if (gameSlot.value.overview_keyword_1) {
    result = result.replace(
      /\[keyword_1\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_1}</strong>`,
    )
  }

  // Замена [keyword_2] с усиленной SEO-разметкой
  if (gameSlot.value.overview_keyword_2) {
    result = result.replace(
      /\[keyword_2\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_2}</strong>`,
    )
  }

  // Замена [keyword_3] с усиленной SEO-разметкой
  if (gameSlot.value.overview_keyword_3) {
    result = result.replace(
      /\[keyword_3\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_3}</strong>`,
    )
  }

  return result
})

const overviewDescription2 = computed(() => {
  if (!gameSlot.value.overview_description_2) return ''

  let result = gameSlot.value.overview_description_2

  // Замена [keyword_1] с усиленной SEO-разметкой
  if (gameSlot.value.overview_keyword_1) {
    result = result.replace(
      /\[keyword_1\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_1}</strong>`,
    )
  }

  // Замена [keyword_2] с усиленной SEO-разметкой
  if (gameSlot.value.overview_keyword_2) {
    result = result.replace(
      /\[keyword_2\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_2}</strong>`,
    )
  }

  // Замена [keyword_3] с усиленной SEO-разметкой
  if (gameSlot.value.overview_keyword_3) {
    result = result.replace(
      /\[keyword_3\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${gameSlot.value.overview_keyword_3}</strong>`,
    )
  }

  return result
})


// Награды теперь управляются через админку (убрали хардкод для Gates of Olympus)



// Методы

// 🎯 Initialize SEO
useSlotSEO({
  slot: gameSlot,
  parsedGeoRegions,
  computedFaq,
  computedHowToPlay,
  computedReviews,
  similarSlots,
  loading,
  error
})

// Функция для принудительного обновления данных slotа
const refreshSlot = async () => {
  await refresh()
}

const playSlot = () => {
  if (!gameSlot.value) return

  // Проверяем, есть ли ссылка для демо-версии
  if (gameSlot.value.demo_url && gameSlot.value.demo_url.trim()) {
    // Открываем демо-версию в новой вкладке
    window.open(gameSlot.value.demo_url, '_blank', 'noopener,noreferrer')
  } else {
    // Показываем уведомление, что демо-версия пока недоступна
    alert(
      `Демо-версия для игры "${gameSlot.value.name || 'slot'}" временно недоступна. Обратитесь к администратору сайта.`,
    )
  }
}

const playForReal = () => {
  if (!gameSlot.value) return

  // Проверяем, есть ли ссылка для игры for real money
  if (gameSlot.value.real_play_url && gameSlot.value.real_play_url.trim()) {
    // Открываем страницу казино в новой вкладке
    window.open(gameSlot.value.real_play_url, '_blank', 'noopener,noreferrer')
  } else {
    // Показываем уведомление с предложением связаться с поддержкой
    alert(
      `Игра for real money для "${gameSlot.value.name || 'slot'}" временно недоступна. Обратитесь к администратору сайта для получения информации о доступных казино.`,
    )
  }
}

const findCasino = () => {
  if (!gameSlot.value) return
  // Здесь будет логика поиска казино с бонусами
  alert(`Поиск лучших казино для игры в ${gameSlot.value.name || 'slot'}`)
}

// Обработчики медиа событий
const handleSlotImageError = (event) => {
  event.target.parentElement.innerHTML =
    '<div class="flex items-center justify-center h-full text-white/60"><svg class="w-12 h-12 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span>Изображение не найдено</span></div>'
}

const handleSlotVideoError = (event) => {
  event.target.parentElement.innerHTML =
    '<div class="flex items-center justify-center h-full text-white/60"><svg class="w-12 h-12 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg><span>Видео не найдено</span></div>'
}

// Функция для открытия изображения в полноэкранном режиме
const openImageFullscreen = () => {
  if (!gameSlot.value?.image_url) return

  // Создаем модальное окно для полноэкранного изображения
  const modal = document.createElement('div')
  modal.className =
    'fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4'
  modal.onclick = () => modal.remove()

  const img = document.createElement('img')
  img.src = gameSlot.value.image_url
  img.alt = `Изображение slotа ${gameSlot.value.name}`
  img.className = 'max-w-full max-h-full object-contain rounded-xl shadow-2xl'
  img.onclick = (e) => e.stopPropagation()

  const closeBtn = document.createElement('button')
  closeBtn.innerHTML = '✕'
  closeBtn.className =
    'absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white text-xl font-bold rounded-full transition-colors'
  closeBtn.onclick = () => modal.remove()

  modal.appendChild(img)
  modal.appendChild(closeBtn)
  document.body.appendChild(modal)
}


// 📱 Info Popup & Like State
const showInfoModal = ref(false)
const isLiked = ref(false)

// Инициализация лайка из localStorage
onMounted(() => {
  if (process.client && gameSlot.value?.id) {
    const key = `slot_like_${gameSlot.value.id}`
    isLiked.value = localStorage.getItem(key) === 'true'
  }
})

// Отслеживание изменения слота для обновления статуса лайка
watch(
  () => gameSlot.value?.id,
  (newId) => {
    if (process.client && newId) {
      const key = `slot_like_${newId}`
      isLiked.value = localStorage.getItem(key) === 'true'
    }
  }
)

const toggleLike = () => {
  if (!process.client || !gameSlot.value?.id) return

  isLiked.value = !isLiked.value
  const key = `slot_like_${gameSlot.value.id}`

  if (isLiked.value) {
    localStorage.setItem(key, 'true')
    // Можно добавить аналитику или отправку на сервер в будущем
  } else {
    localStorage.removeItem(key)
  }
}






// Методы для рейтинга
const toggleRatingPicker = () => {
  showRatingPicker.value = !showRatingPicker.value
  if (!showRatingPicker.value) {
    selectedStars.value = null
    hoverStars.value = 0
    ratingSubmitted.value = false
  }
}

const setHover = (value) => {
  hoverStars.value = value
}

const clearHover = () => {
  hoverStars.value = 0
}

const pickRating = (value) => {
  selectedStars.value = value
}

const submitRating = async () => {
  if (selectedStars.value === null || !gameSlot.value?.id) return
  try {
    ratingSubmitting.value = true
    // Заглушка отправки. При появлении API заменить на реальный вызов
    await new Promise((resolve) => setTimeout(resolve, 700))
    ratingSubmitted.value = true
  } finally {
    ratingSubmitting.value = false
  }
}



















// Note: `useAsyncData` automatically handles data fetching on route parameter changes due to the `watch` option.


</script>

<style scoped>
@keyframes scaleX {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* Анимация градиента для заголовка */
@keyframes gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1.2); }
  50% { transform: scale(1.35); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Улучшение читаемости first-letter */
.first-letter\:text-5xl::first-letter {
  line-height: 0.8;
}

/* Плавное появление контента */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

article {
  animation: fadeInUp 0.6s ease-out;
}

/* Улучшенный фокус для accessibility */
*:focus-visible {
  outline: 3px solid #4f46e5;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Animated Gradient Border for Icons */
@keyframes spin-gradient {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animated-gradient-border {
  position: relative;
  z-index: 10;
  border: none !important; /* Remove defaults if any */
}

.animated-gradient-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: conic-gradient(from 0deg, #3B82F6, #8B5CF6, #EC4899, #EF4444, #F59E0B, #10B981, #3B82F6);
  z-index: -1;
  animation: spin-gradient 4s linear infinite;

  /* Create a hollow ring */
  padding: 2px;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}

/* Optional: Glow effect */
.animated-gradient-border::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
  filter: blur(5px);
  z-index: -2;
  opacity: 0.5;
}

/* Modal Transitions */
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.3s ease;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}

.fade-modal-enter-active .relative,
.fade-modal-leave-active .relative {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}
.fade-modal-enter-from .relative {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}
.fade-modal-leave-to .relative {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}
</style>
