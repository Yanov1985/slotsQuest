<template>
  <div class="min-h-screen bg-black font-sans selection:bg-blue-500/30">
    <!-- Animated Background from Admin Template -->
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <BackgroundBeams :intensity="0.9" :speed="1.2" />
    </div>

    <div class="relative z-10 flex flex-col min-h-screen">
    <!-- 📱 Навигация - стеклянный эффект (в точности как в [slug].vue) -->
    <nav class="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-lg shadow-black/20">
      <div class="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div class="flex items-center justify-between gap-2">
          <!-- Кнопка назад -->
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span class="hidden xs:inline">Back to </span><span class="hidden sm:inline">Home</span>
          </NuxtLink>

          <!-- Хлебные крошки -->
          <div class="hidden md:flex items-center text-xs sm:text-sm text-white/50 truncate">
            <NuxtLink to="/" class="hover:text-blue-400 transition-colors whitespace-nowrap">Home</NuxtLink>
            <span class="mx-1 sm:mx-2">/</span>
            <span class="text-white font-medium truncate">Slots Catalog</span>
          </div>

          <!-- Мобильные хлебные крошки -->
          <div class="md:hidden text-xs text-white/70 truncate">
            Slots Catalog
          </div>
        </div>
      </div>
    </nav>

    <!-- Загрузка / Skeleton (в стиле [slug].vue) -->
    <div v-if="loading" class="min-h-screen pt-8 pb-12 w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div class="w-full">
        <div class="flex flex-col lg:flex-row gap-8 animate-pulse">
          <!-- Фильтры skeleton -->
          <div class="w-full lg:w-[280px] space-y-4 shrink-0 hidden lg:block">
            <div class="h-10 bg-white/5 rounded-xl w-full"></div>
            <div class="h-10 bg-white/5 rounded-xl w-full"></div>
            <div class="h-64 bg-white/5 rounded-3xl w-full"></div>
          </div>

          <!-- Сетка слотов skeleton -->
          <div class="flex-1">
             <!-- Top bar skeleton -->
             <div class="h-14 bg-white/5 rounded-2xl w-full mb-8"></div>
             <!-- Grid -->
             <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                <!-- Slot Card Skeletons -->
                <div v-for="i in 12" :key="'skel-' + i" class="aspect-[3/4] bg-white/5 rounded-3xl border border-white/5 overflow-hidden flex flex-col">
                   <div class="w-full h-[60%] bg-white/10"></div>
                   <div class="p-4 space-y-3 flex-1 flex flex-col justify-end">
                     <div class="h-5 w-3/4 bg-white/10 rounded-full"></div>
                     <div class="h-4 w-1/2 bg-white/10 rounded-full"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-[70vh]">
      <div class="text-center max-w-md mx-auto px-4">
        <div class="text-red-500 mb-6">
          <svg class="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <h2 class="text-3xl font-bold mb-4 text-white">Error Loading Catalog</h2>
          <p class="text-white/70 mb-6">{{ error }}</p>
        </div>
        <button @click="refreshSlots" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors font-semibold">
           Try Again
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div v-else class="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 flex flex-col lg:flex-row gap-8 items-start relative">

      <!-- Off-Canvas / Sidebar Filters -->
      <FilterSidebar
        :providers="providers"
        @update:filters="applyFilters"
      />

      <!-- Content Column -->
      <div class="flex-1 w-full min-w-0">

        <!-- Category Chips & Controls (Стеклянная панель) -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white/5 p-3 sm:p-4 rounded-3xl border border-white/10 backdrop-blur-xl shadow-lg shadow-black/20">

          <!-- Chips (Scrollable) -->
          <div class="flex flex-1 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-none gap-2 min-w-0">
            <button
              v-for="cat in quickCategories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              class="whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-semibold tracking-wide transition-all duration-300 transform active:scale-95 border shrink-0 flex items-center gap-2"
              :class="activeCategory === cat.id
                ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                : 'bg-white/5 text-white/70 hover:text-white border-white/5 hover:border-white/20 hover:bg-white/10'"
            >
              <Icon v-if="cat.icon" :name="cat.icon" class="w-4 h-4" />
              {{ cat.name }}
            </button>
          </div>

          <!-- Sort Select -->
          <div class="relative shrink-0 w-full sm:w-auto">
            <Icon name="solar:sort-from-top-to-bottom-line-duotone" class="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4 pointer-events-none" />
            <select
              v-model="sortBy"
              class="appearance-none bg-white/5 border border-white/10 text-white/90 text-sm font-medium py-2.5 pl-9 pr-10 rounded-2xl focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors cursor-pointer w-full sm:w-[180px] hover:bg-white/10"
            >
              <option value="popular" class="bg-zinc-900">Популярные</option>
              <option value="newest" class="bg-zinc-900">Новые</option>
              <option value="rtp" class="bg-zinc-900">Высокий RTP</option>
              <option value="a-z" class="bg-zinc-900">А - Я</option>
            </select>
            <Icon name="solar:alt-arrow-down-line-duotone" class="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <!-- Empty State (No matches) -->
        <div v-if="filteredSlots.length === 0" class="flex flex-col items-center justify-center py-32 border border-white/10 border-dashed rounded-3xl bg-white/5 backdrop-blur-sm">
          <Icon name="solar:ghost-line-duotone" class="text-white/40 w-24 h-24 mb-6" />
          <h2 class="text-2xl font-bold text-white mb-2">Ничего не найдено</h2>
          <p class="text-white/60">Попробуйте изменить фильтры или условия поиска</p>
        </div>

        <!-- Slots Grid -->
        <div v-else class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" v-auto-animate>
          <SlotCard
            v-for="slot in filteredSlots"
            :key="slot.id"
            :slot="slot"
          />
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FilterSidebar from '~/components/slots/FilterSidebar.vue'
import SlotCard from '~/components/slots/SlotCard.vue'
import BackgroundBeams from '~/components/ui/BackgroundBeams.vue'

// Data Fetching (SSR via useAsyncData)
const { getSlots } = useSlotsApi()
const { getProviders } = useProviders()

// Wait for this data on the server
const { data: slots, pending: slotsLoading, error: slotsError, refresh: refreshSlots } = await useAsyncData('catalog-slots', () => getSlots())
const { data: providers, pending: providersLoading, error: providersError } = await useAsyncData('catalog-providers', () => getProviders())

// SEO injection server-side
const siteUrl = 'https://slotquest.com/slots'
useCatalogSEO(
  'Каталог лучших игровых автоматов 2025 | SlotQuest',
  'Огромный выбор игровых автоматов онлайн. Играйте бесплатно в демо версиях или на реальные деньги в лучших казино. Фильтр по провайдерам, RTP и бонусам.',
  siteUrl,
  slots.value?.length || 0
)

const loading = computed(() => slotsLoading.value || providersLoading.value)
const error = computed(() => slotsError.value?.message || providersError.value?.message || null)

// Filter State
const activeCategory = ref('all')
const sortBy = ref('popular')
const currentSideFilters = ref({
  search: '',
  providerId: '',
  volatility: '',
  bonusBuy: false,
  megaways: false
})

const quickCategories = [
  { id: 'all', name: 'Все слоты', icon: 'solar:gamepad-line-duotone' },
  { id: 'popular', name: 'Популярные', icon: 'solar:fire-line-duotone' },
  { id: 'new', name: 'Новинки', icon: 'solar:star-fall-line-duotone' },
  { id: 'megaways', name: 'Megaways', icon: 'solar:bomb-emoji-line-duotone' },
  { id: 'bonus-buy', name: 'Покупка бонуса', icon: 'solar:cart-large-line-duotone' }
]

const applyFilters = (filters) => {
  currentSideFilters.value = filters
}

// Computed Filtered List
const filteredSlots = computed(() => {
  if (!slots.value) return []

  let result = [...slots.value]

  // 1. Sidebar Filters
  const f = currentSideFilters.value

  if (f.search) {
    const term = f.search.toLowerCase()
    result = result.filter(s => s.name?.toLowerCase().includes(term) || s.providers?.name?.toLowerCase().includes(term))
  }

  if (f.providerId) {
    result = result.filter(s => s.providers?.id === f.providerId)
  }

  if (f.volatility) {
    result = result.filter(s => s.volatility?.toLowerCase() === f.volatility)
  }

  // Very simplified feature logic (assuming these might be embedded in description or categories for now if no specific column)
  if (f.bonusBuy) {
    result = result.filter(s => s.description?.toLowerCase().includes('buy') || s.name?.toLowerCase().includes('bonus'))
  }

  if (f.megaways) {
    result = result.filter(s => s.name?.toLowerCase().includes('megaways'))
  }

  // 2. Chip Categories
  if (activeCategory.value === 'popular') {
    result = result.filter(s => s.popularity_rank && s.popularity_rank <= 20)
  } else if (activeCategory.value === 'new') {
    result = result.sort((a,b) => b.id - a.id).slice(0, 50)
  } else if (activeCategory.value === 'megaways') {
    result = result.filter(s => s.name?.toLowerCase().includes('megaways'))
  } else if (activeCategory.value === 'bonus-buy') {
     result = result.filter(s => s.description?.toLowerCase().includes('buy'))
  }

  // 3. Sorting
  switch (sortBy.value) {
    case 'popular':
      result.sort((a, b) => (a.popularity_rank || 999) - (b.popularity_rank || 999))
      break
    case 'newest':
      result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      break
    case 'rtp':
      result.sort((a, b) => (b.rtp || 0) - (a.rtp || 0))
      break
    case 'a-z':
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
      break
  }

  return result
})
</script>

<style scoped>
/* Custom Scrollbar for chips area */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
