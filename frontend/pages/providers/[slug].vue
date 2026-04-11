<template>
  <div class="relative z-10 flex flex-col min-h-screen pb-12">
    <!-- Breadcrumbs / Nav -->
    <nav class="bg-white/5 backdrop-blur-xl border-b border-white/10 relative z-40 shadow-lg shadow-black/20">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-white font-bold text-lg flex items-center gap-2">
          <NuxtLink to="/" class="text-white/50 hover:text-white transition-colors">Catalog</NuxtLink>
          <span class="text-white/30">/</span>
          <span>{{ provider?.name || 'Provider' }}</span>
        </h1>
      </div>
    </nav>

    <!-- Error State -->
    <div v-if="error" class="flex items-center justify-center min-h-[50vh]">
      <div class="text-center max-w-md mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4 text-white">Provider Not Found</h2>
        <p class="text-white/70 mb-6">{{ error.message || 'Could not load provider data' }}</p>
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
      <!-- Provider Header -->
      <header class="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
        <div v-if="provider?.icon" class="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-white/20 p-4">
          <img :src="provider.icon" :alt="provider.name" class="w-full h-full object-contain" />
        </div>
        <div class="flex-1 text-center md:text-left">
          <h1 class="text-3xl sm:text-5xl font-extrabold text-white mb-4">{{ providerData?.seo_title || provider?.name }}</h1>
          <p class="text-white/70 text-sm sm:text-base max-w-3xl leading-relaxed">{{ providerData?.seo_desc || provider?.description }}</p>
        </div>
      </header>

      <!-- Search & Sorting (Optional) -->
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-white flex items-center gap-2">
          <Icon name="solar:gamepad-bold-duotone" class="w-6 h-6 text-blue-400" />
          Games by {{ provider?.name }}
          <span class="text-white/30 text-base font-normal">({{ slots?.length || 0 }})</span>
        </h2>
      </div>

      <!-- Slots Grid -->
      <div v-if="slots && slots.length > 0" class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <SlotCard 
          v-for="slot in slots" 
          :key="slot.id" 
          :slot="slot"
        />
      </div>
      <div v-else class="text-center py-12 text-white/50 bg-white/5 rounded-2xl border border-white/10 border-dashed">
        No slots found for this provider yet.
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
const { getProviderBySlug, getProviderSlots } = useProviders()

// Fetch Provider Setup
const { data: providerResponse, pending: providerPending, error: providerError } = await useAsyncData(
  `provider-${slug}`,
  () => getProviderBySlug(slug)
)

const provider = computed(() => providerResponse.value?.data || null)

// Fetch Slots
const { data: slotsResponse, pending: slotsPending } = await useAsyncData(
  `provider-slots-${slug}`,
  () => getProviderSlots(slug)
)
const slots = computed(() => slotsResponse.value?.data || [])

const pending = computed(() => providerPending.value || slotsPending.value)
const error = computed(() => providerError.value)

// Extract localized data
const providerData = computed(() => {
  if (!provider.value) return null
  const locs = provider.value.localizations
  if (locs && locs[locale.value]) {
    return locs[locale.value]
  }
  return {
    seo_title: provider.value.seo_title,
    seo_desc: provider.value.seo_desc,
    content_markdown: provider.value.content_markdown,
    faq_json: provider.value.faq_json
  }
})

// Build SEO Sections
const seoSections = computed(() => {
  const sections = []
  if (!providerData.value) return sections
  
  if (providerData.value.content_markdown) {
    sections.push({
      id: 'overview',
      title: 'Overview',
      icon: 'solar:info-square-bold-duotone',
      text: providerData.value.content_markdown
    })
  }

  try {
    const fnRaw = providerData.value.faq_json
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
  if (provider.value) {
    const title = providerData.value?.seo_title || `${provider.value.name} Slots`
    const desc = providerData.value?.seo_desc || `Play the best slots by ${provider.value.name}.`
    applySEO({
      title,
      description: desc,
      ogTitle: title
    })
  }
})
</script>
