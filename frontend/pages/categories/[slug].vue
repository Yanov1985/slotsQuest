<template>
  <div class="relative z-10 flex flex-col min-h-screen pb-12">
    <!-- Breadcrumbs / Nav -->
    <nav class="bg-white/5 backdrop-blur-xl border-b border-white/10 relative z-40 shadow-lg shadow-black/20">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-white font-bold text-lg flex items-center gap-2">
          <NuxtLink to="/" class="text-white/50 hover:text-white transition-colors">Catalog</NuxtLink>
          <span class="text-white/30">/</span>
          <span>{{ category?.name || 'Category' }}</span>
        </h1>
      </div>
    </nav>

    <!-- Error State -->
    <div v-if="error" class="flex items-center justify-center min-h-[50vh]">
      <div class="text-center max-w-md mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4 text-white">Category Not Found</h2>
        <p class="text-white/70 mb-6">{{ error.message || 'Could not load category data' }}</p>
        <NuxtLink to="/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-colors font-semibold">
           Back to Catalog
        </NuxtLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="pending" class="container mx-auto px-4 py-8 animate-pulse">
      <div class="h-20 bg-white/5 rounded-2xl w-full max-w-2xl mb-8"></div>
      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div v-for="i in 8" :key="i" class="aspect-[3/4] bg-white/5 rounded-3xl border border-white/5 overflow-hidden"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="container mx-auto px-4 py-8 flex flex-col gap-8">
      <!-- Category Header -->
      <header class="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm relative overflow-hidden">
        <!-- Glow effect based on category vibe -->
        <div class="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none"></div>
        
        <div v-if="category?.icon" class="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20 text-blue-400 relative z-10">
          <Icon :name="category.icon" class="w-10 h-10" />
        </div>
        <div class="flex-1 text-center md:text-left relative z-10">
          <h1 class="text-3xl sm:text-5xl font-extrabold text-white mb-4">{{ categoryData?.seo_title || category?.name }}</h1>
          <p class="text-white/70 text-sm sm:text-base max-w-3xl leading-relaxed">{{ categoryData?.seo_desc || category?.description }}</p>
        </div>
      </header>

      <!-- Search & Sorting (Optional) -->
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-white flex items-center gap-2">
          <Icon name="solar:star-fall-bold-duotone" class="w-6 h-6 text-yellow-400" />
          {{ category?.name }} Games
          <span class="text-white/30 text-base font-normal">({{ slots?.length || 0 }})</span>
        </h2>
      </div>

      <!-- Slots Grid -->
      <div v-if="slots && slots.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
        <SlotCard 
          v-for="slot in slots" 
          :key="slot.id" 
          :slot="slot"
        />
      </div>
      <div v-else class="text-center py-12 text-white/50 bg-white/5 rounded-2xl border border-white/10 border-dashed">
        No slots found in this category yet.
      </div>

      <!-- SEO Text Sections -->
      <CatalogSeoText 
        v-if="seoSections && seoSections.length > 0"
        :sections="seoSections" 
        :pageData="null" 
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'nuxt/app'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const slug = route.params.slug
const { locale } = useI18n()
const { getPageSEO, applySEO } = usePageSEO()
const { getCategoryBySlug, getSlotsByCategory } = useCategories()

// Fetch Category Setup
const { data: categoryResponse, pending: categoryPending, error: categoryError } = await useAsyncData(
  `category-${slug}`,
  () => getCategoryBySlug(slug)
)

const category = computed(() => categoryResponse.value?.data || null)

// Fetch Slots
const { data: slotsResponse, pending: slotsPending } = await useAsyncData(
  `category-slots-${slug}`,
  () => getSlotsByCategory(slug)
)
const slots = computed(() => slotsResponse.value?.data || [])

const pending = computed(() => categoryPending.value || slotsPending.value)
const error = computed(() => categoryError.value)

// Extract localized data
const categoryData = computed(() => {
  if (!category.value) return null
  const locs = category.value.localizations
  if (locs && locs[locale.value]) {
    return locs[locale.value]
  }
  return {
    seo_title: category.value.seo_title,
    seo_desc: category.value.seo_desc,
    content_markdown: category.value.content_markdown,
    faq_json: category.value.faq_json
  }
})

// Build SEO Sections
const seoSections = computed(() => {
  const sections = []
  if (!categoryData.value) return sections
  
  if (categoryData.value.content_markdown) {
    sections.push({
      id: 'overview',
      title: 'Overview',
      icon: 'solar:info-square-bold-duotone',
      text: categoryData.value.content_markdown
    })
  }

  try {
    const fnRaw = categoryData.value.faq_json
    if (fnRaw) {
      const parsedFaq = typeof fnRaw === 'string' ? JSON.parse(fnRaw) : fnRaw
      if (Array.isArray(parsedFaq)) {
        parsedFaq.forEach((item, i) => {
          sections.push({
            id: `faq-${i}`,
            title: item.title || item.question || `Section ${i + 1}`,
            icon: 'solar:document-text-bold-duotone',
            text: item.text || item.answer || ''
          })
        })
      }
    }
  } catch (e) {
    console.error('Failed to parse FAQ JSON', e)
  }
  
  return sections
})

// Apply Dynamic SEO
watchEffect(() => {
  if (category.value) {
    const title = categoryData.value?.seo_title || `${category.value.name} Slots`
    const desc = categoryData.value?.seo_desc || `Play the best slots in the ${category.value.name} category.`
    applySEO({
      title,
      description: desc,
      ogTitle: title
    })
  }
})
</script>
