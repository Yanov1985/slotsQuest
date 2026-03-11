<template>
  <div class="min-h-screen bg-black font-sans selection:bg-blue-500/30 overflow-x-clip">
    <!-- Animated Background from Admin Template -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <BackgroundBeams :intensity="0.9" :speed="1.2" />
    </div>

    <div class="relative z-10 flex flex-col min-h-screen">
    <!-- 📱 Навигация - стеклянный эффект (бывшие хлебные крошки) -->
    <nav class="bg-white/5 backdrop-blur-xl border-b border-white/10 relative z-40 shadow-lg shadow-black/20">
      <div class="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div class="flex items-center justify-between gap-2">
           <h1 class="text-white font-bold text-base sm:text-lg">SlotQuest Casino</h1>
           <span class="text-white/50 text-xs sm:text-sm hidden md:inline">Find your favorite slot game</span>
        </div>
      </div>
    </nav>

    <!-- Загрузка / Skeleton (в стиле [slug].vue) -->
    <div v-if="loading" class="min-h-screen pt-4 sm:pt-8 pb-12 w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
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
             <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
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
    <div v-else class="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-8 flex flex-col lg:flex-row gap-6 sm:gap-8 items-start relative">

      <!-- Off-Canvas / Sidebar Filters -->
      <FilterSidebar
        :providers="providers"
        :categories="categories"
        :mechanics="mechanics"
        :themes="themes"
        @update:filters="applyFilters"
      />

      <!-- Content Column -->
      <div class="flex-1 w-full min-w-0">

        <!-- Category Chips & Controls (Стеклянная панель) -->
        <div ref="chipsAnchor" class="absolute -top-[1px] w-full h-px pointer-events-none"></div>
        <div
          class="sticky top-[10px] z-40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-4 rounded-3xl transition-all duration-300"
          :class="isChipsSticky
            ? 'bg-black/95 border border-white/20 backdrop-blur-3xl shadow-2xl shadow-black/80'
            : 'bg-white/5 border border-white/5 backdrop-blur-md shadow-lg shadow-black/20'"
        >

          <!-- Chips (Scrollable) -->
          <div class="flex flex-1 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-none gap-2 min-w-0">
            <button
              v-for="cat in displayCategories"
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
              <option value="popular" class="bg-zinc-900">Popular</option>
              <option value="newest" class="bg-zinc-900">Newest</option>
              <option value="a-z" class="bg-zinc-900">A - Z</option>
            </select>
            <Icon name="solar:alt-arrow-down-line-duotone" class="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <!-- Empty State (No matches) -->
        <div v-if="filteredSlots.length === 0" class="flex flex-col items-center justify-center py-32 border border-white/10 border-dashed rounded-3xl bg-white/5 backdrop-blur-sm">
          <Icon name="solar:ghost-line-duotone" class="text-white/40 w-24 h-24 mb-6" />
          <h2 class="text-2xl font-bold text-white mb-2">No slots found</h2>
          <p class="text-white/60">Try changing your filters or search terms</p>
        </div>

        <!-- Slots Grid -->
        <div v-else class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          <SlotCard
            v-for="slot in filteredSlots"
            :key="slot.id"
            :slot="slot"
          />
        </div>

        <!-- SEO Text Component -->
        <CatalogSeoText />

      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FilterSidebar from '~/components/slots/FilterSidebar.vue'
import SlotCard from '~/components/slots/SlotCard.vue'
import CatalogSeoText from '~/components/slots/CatalogSeoText.vue'
import BackgroundBeams from '~/components/ui/BackgroundBeams.vue'
import { onMounted, onUnmounted } from 'vue'

// Sticky header logic
const chipsAnchor = ref(null)
const isChipsSticky = ref(false)

const handleScroll = () => {
  if (chipsAnchor.value) {
    const rect = chipsAnchor.value.getBoundingClientRect()
    // The sticky chips have 'top-[10px]'.
    // If the anchor is above that threshold, it's sticky.
    isChipsSticky.value = rect.top <= 10
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  // Run on mount, and schedule a re-check after page transition finishes
  handleScroll()
  setTimeout(handleScroll, 50)
  setTimeout(handleScroll, 300)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Data Fetching (SSR via useAsyncData)
const { getSlots } = useSlotsApi()
const { getProviders } = useProviders()
const { getCategories } = useCategories()
const { getMechanics } = useMechanics()
const { getThemes } = useThemes()

// Load data. Await on Server (for SEO), but Lazy on Client (to show Skeleton during navigation).
const fetchSlotsCb = async () => {
  const data = await getSlots()
  if (import.meta.client) await new Promise(r => setTimeout(r, 600)) // Artificial delay for premium skeleton feel
  return data
}

// Fetch all filter data in parallel
const fetchFiltersCb = async () => {
  const [provs, cats, mechs, thms] = await Promise.all([
     getProviders(),
     getCategories(),
     getMechanics(),
     getThemes()
  ])
  if (import.meta.client) await new Promise(r => setTimeout(r, 600))
  return { providers: provs, categories: cats, mechanics: mechs, themes: thms }
}

const { data: slots, pending: slotsLoading, error: slotsError, refresh: refreshSlots } = await useAsyncData('catalog-slots', fetchSlotsCb, { lazy: import.meta.client })
const { data: filterData, pending: filtersLoading, error: filtersError } = await useAsyncData('catalog-filters', fetchFiltersCb, { lazy: import.meta.client })

const providers = computed(() => filterData.value?.providers || [])
const categories = computed(() => filterData.value?.categories?.data || filterData.value?.categories || [])
const mechanics = computed(() => filterData.value?.mechanics?.data || filterData.value?.mechanics || [])
const themes = computed(() => filterData.value?.themes?.data || filterData.value?.themes || [])

// SEO injection server-side
const siteUrl = 'https://slotquest.com'
useCatalogSEO(
  'Best Online Slots Catalog 2025 | SlotQuest Casino',
  'Huge selection of online slots. Play for free in demo mode or for real money in top casinos. Filter by providers, mechanics, and themes.',
  siteUrl,
  slots.value?.length || 0
)

const loading = computed(() => slotsLoading.value || filtersLoading.value)
const error = computed(() => slotsError.value?.message || filtersError.value?.message || null)

// Filter State
const activeCategory = ref('all')
const sortBy = ref('popular')
const currentSideFilters = ref({
  search: '',
  providerIds: [],
  categoryIds: [],
  mechanicIds: [],
  bonusIds: [],
  themeIds: []
})

const displayCategories = computed(() => {
  const base = [
    { id: 'all', name: 'All Slots', icon: 'solar:gamepad-line-duotone' }
  ]

  if (categories.value && categories.value.length > 0) {
    // Only show active categories and specific requested ones
    const allowedNames = ['Popular', 'New', '1w Games', 'Crash Games', 'Best Year 2024']
    const activeCats = categories.value
      .filter(c => c.is_active && allowedNames.includes(c.name))
      .map(c => {
        let icon = null
        if (c.name === 'Popular') icon = 'solar:fire-line-duotone'
        if (c.name === 'New') icon = 'solar:star-fall-line-duotone'
        return { ...c, icon: icon || c.icon }
      })

    // Sort to maintain desired order
    activeCats.sort((a, b) => allowedNames.indexOf(a.name) - allowedNames.indexOf(b.name))
    return [...base, ...activeCats]
  }

  return base
})

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

  if (f.providerIds && f.providerIds.length > 0) {
    result = result.filter(s => f.providerIds.includes(s.providers?.id))
  }

  // Category Array Filtering
  if (f.categoryIds && f.categoryIds.length > 0) {
    console.log('[DEBUG] Category Filter Active:', f.categoryIds.map(x=>String(x)))
    result = result.filter(s => {
      const isMatch = f.categoryIds.includes(s.category_id) || (s.slot_categories && f.categoryIds.includes(s.slot_categories.id))
      console.log(`[DEBUG] Slot: ${s.name} | category_id: ${s.category_id} | slot_categories_id: ${s.slot_categories?.id} | match: ${isMatch}`)
      return isMatch
    })
  }

  // Feature Array Filtering Logic
  // For each category (mechanics, bonuses, themes), if multiple are selected, it acts as an OR within the category.
  // But between categories, it acts as an AND.

  if (f.mechanicIds && f.mechanicIds.length > 0) {
     result = result.filter(slot => {
        if (!slot.mechanics) return false
        // Check if the slot has at least one of the selected mechanics
        return slot.mechanics.some(m => f.mechanicIds.includes(m.id))
     })
  }

  if (f.themeIds && f.themeIds.length > 0) {
     result = result.filter(slot => {
        if (!slot.themes) return false
        return slot.themes.some(t => f.themeIds.includes(t.id))
     })
  }

  // 2. Chip Categories
  if (activeCategory.value !== 'all') {
    // Exact category match
    const filterId = String(activeCategory.value).trim()
    console.log(`[DEBUG] Exact Category Match Chip Clicked: "${filterId}"`)
    result = result.filter(s => {
      const slotCatId = s.category_id ? String(s.category_id).trim() : null
      const relCatId = s.slot_categories?.id ? String(s.slot_categories.id).trim() : null

      const isMatch = slotCatId === filterId || relCatId === filterId
      if (s.name === 'The Gates Of Olympus') {
         console.log(`[DEBUG] Olympus Check => chip: "${filterId}", my_cat_id: "${slotCatId}", rel_cat_id: "${relCatId}", match: ${isMatch}`)
      }
      return isMatch
    })
  }

  // 3. Sorting
  switch (sortBy.value) {
    case 'popular':
      result.sort((a, b) => (a.popularity_rank || 999) - (b.popularity_rank || 999))
      break
    case 'newest':
      result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
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
