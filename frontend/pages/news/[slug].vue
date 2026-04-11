<template>
  <div v-if="postData" class="news-detail-page py-12 px-4 max-w-4xl mx-auto min-h-screen">
    <NuxtLink :to="localePath('/news')" class="text-white/50 hover:text-white font-medium mb-8 inline-flex items-center gap-2 transition-colors">
       <Icon name="solar:arrow-left-linear" class="w-5 h-5" />
       {{ $t('common.back_to_news', 'Back to News') }}
    </NuxtLink>
    
    <article class="mb-12">
      <div class="flex flex-wrap gap-2 mb-6">
        <span v-for="tag in (postData.tags || '').split(',').filter(Boolean)" :key="tag" class="bg-blue-600/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-500/20">
          {{ tag.trim() }}
        </span>
      </div>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-white">{{ localizedData.title || postData.title }}</h1>
      <div class="flex items-center gap-4 text-white/50 text-sm font-medium">
        <div class="flex items-center gap-1.5"><Icon name="solar:calendar-date-bold-duotone" class="w-4 h-4 text-blue-400" /> {{ postData.published_at || postData.created_at ? new Date(postData.published_at || postData.created_at).toLocaleDateString(locale) : '' }}</div>
        <span class="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
        <div class="flex items-center gap-1.5"><Icon name="solar:user-bold-duotone" class="w-4 h-4 text-emerald-400" /> {{ postData.author_name || 'SlotQuest Editorial' }}</div>
      </div>
    </article>

    <!-- Article Content -->
    <div class="bg-white/5 backdrop-blur-sm border border-white/5 rounded-3xl p-6 sm:p-10 mb-16 shadow-xl relative">
       <!-- JSON-LD Tag intentionally placed inside or Head component can inject it -->
       <div class="prose prose-invert prose-blue max-w-none text-lg leading-relaxed text-white/80" v-html="htmlContent"></div>
    </div>

    <!-- Subscribe Widget -->
    <div class="bg-gradient-to-br from-blue-900/40 to-black/60 border border-blue-500/20 rounded-[2rem] p-10 text-center shadow-inner mt-8">
      <h3 class="text-3xl font-bold mb-4 text-white">Stay in the Loop</h3>
      <p class="text-white/60 mb-8 max-w-xl mx-auto">Subscribe to our newsletter to get the latest gambling trends, unique bonuses, and exclusive insights directly to your inbox.</p>
      <div class="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
        <input type="email" placeholder="Email address" class="flex-1 bg-black/50 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500/70 text-white placeholder-white/30 transition-colors shadow-inner" />
        <button class="bg-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50">Join Now</button>
      </div>
    </div>
  </div>
  
  <div v-else-if="pending" class="min-h-screen flex justify-center py-32">
     <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
  <div v-else class="text-center py-32">
     <h1 class="text-4xl text-white font-bold">{{ $t('error_state.title', 'Not found') }}</h1>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import { useNews } from '~/composables/useNews'

const route = useRoute()
const { getNewsBySlug } = useNews()
const { locale } = useI18n()
const localePath = useLocalePath()

const { data: response, pending } = await useAsyncData(`news-${route.params.slug}`, () => getNewsBySlug(route.params.slug))
const postData = computed(() => response.value?.data || null)

const localizedData = computed(() => {
  if (!postData.value) return {}
  const l = postData.value.localizations || {}
  return l[locale.value] || {
    title: postData.value.title,
    content_markdown: postData.value.content_markdown,
    seo_title: postData.value.seo_title,
    seo_desc: postData.value.seo_desc
  }
})

const htmlContent = computed(() => {
  return localizedData.value.content_markdown ? marked(localizedData.value.content_markdown) : ''
})

useHead({
  title: () => localizedData.value.seo_title || localizedData.value.title || 'News',
  meta: [
    { name: 'description', content: () => localizedData.value.seo_desc || localizedData.value.title },
    { property: 'og:title', content: () => localizedData.value.seo_title || localizedData.value.title },
    { property: 'og:description', content: () => localizedData.value.seo_desc || localizedData.value.title },
    { property: 'og:image', content: () => postData.value?.image_url || '/placeholder-news.jpg' },
    { property: 'og:type', content: 'article' },
  ]
})

// Generate JSON-LD for NewsArticle
if (postData.value) {
   useSchemaOrg([
      defineArticle({
         '@type': 'NewsArticle',
         headline: localizedData.value.title || postData.value.title,
         image: postData.value.image_url ? [postData.value.image_url] : [],
         datePublished: postData.value.published_at || postData.value.created_at || new Date().toISOString(),
         dateModified: postData.value.updated_at || postData.value.published_at || postData.value.created_at || new Date().toISOString(),
         author: {
             name: postData.value.author_name || "SlotQuest"
         }
      }),
      defineBreadcrumb({
         itemListElement: [
            { name: 'Home', item: '/' },
            { name: 'News', item: '/news' },
            { name: localizedData.value.title || postData.value.title }
         ]
      })
   ])
}
</script>

<style scoped>
:deep(.prose h2) { @apply text-3xl font-bold mt-12 mb-6 text-white; }
:deep(.prose h3) { @apply text-2xl font-bold mt-10 mb-4 text-white/90; }
:deep(.prose p) { @apply mb-6 text-white/70; }
:deep(.prose ul) { @apply list-disc pl-6 mb-6 text-white/70; }
:deep(.prose li) { @apply mb-2; }
:deep(.prose a) { @apply text-blue-400 font-medium hover:underline; }
:deep(.prose strong) { @apply text-white font-bold; }
</style>
