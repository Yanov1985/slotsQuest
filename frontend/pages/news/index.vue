<template>
  <div class="news-page py-12 px-4 max-w-7xl mx-auto min-h-screen">
    <div class="header mb-12 text-center">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
        {{ $t('news.title', 'Gambling News & Trends') }}
      </h1>
      <p class="text-white/60 text-lg max-w-2xl mx-auto">{{ $t('news.subtitle', 'Stay updated with the latest in the world of slots and casinos.') }}</p>
    </div>

    <div v-if="pending" class="flex justify-center py-32">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="!newsList || newsList.length === 0" class="text-center py-20 text-white/50">
       {{ $t('news.empty', 'No news published yet.') }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <NuxtLink v-for="item in newsList" :key="item.id" :to="localePath(`/news/${item.slug}`)" 
                class="group bg-white/5 border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-black/40 flex flex-col">
        <div class="p-6 sm:p-8 flex-1 flex flex-col relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 z-0 pointer-events-none"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -ml-16 -mb-16 z-0 pointer-events-none"></div>
          
          <div class="relative z-10 flex flex-col flex-1">
            <div class="flex items-center justify-between mb-4">
              <div class="text-xs text-blue-400 font-medium flex items-center gap-2">
                 <Icon name="solar:calendar-date-bold-duotone" class="w-4 h-4 text-blue-400" />
                 {{ item.published_at || item.created_at ? new Date(item.published_at || item.created_at).toLocaleDateString(locale) : '' }}
              </div>
              <div class="flex gap-1.5 flex-wrap">
                <span v-for="tag in (item.tags || '').split(',').filter(Boolean).slice(0, 2)" :key="tag" class="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2 py-1 rounded-[6px] border border-blue-500/20 uppercase tracking-wider">
                  {{ tag.trim() }}
                </span>
              </div>
            </div>
            <h3 class="text-lg font-bold mb-3 line-clamp-2 text-white group-hover:text-blue-400 transition-colors">{{ getLoc(item)?.title || item.title }}</h3>
            <p class="text-white/60 text-sm line-clamp-3 mb-6 flex-1">{{ getLoc(item)?.seo_desc || item.seo_desc || 'Read the latest updates.' }}</p>
            <div class="flex items-center gap-2 text-blue-400 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all mt-auto">
              {{ $t('common.read_more', 'Read More') }} <Icon name="solar:arrow-right-linear" class="w-4 h-4" />
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNews } from '~/composables/useNews'

const { getNews } = useNews()
const { locale } = useI18n()
const localePath = useLocalePath()

const { data: response, pending } = await useAsyncData('news-list', () => getNews())
const newsList = computed(() => response.value?.data || [])

const getLoc = (item) => {
  if (!item.localizations) return null;
  return item.localizations[locale.value] || null;
}

useHead({
  title: 'Gambling News & Trends - SlotQuest',
  meta: [
    { name: 'description', content: 'Explore the latest news, regulations and trends in the gambling industry.' }
  ]
})

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
    name: 'Gambling News & Trends - SlotQuest',
    description: 'Explore the latest news, regulations and trends in the gambling industry.',
    url: 'https://slotquest.com/news',
  })
])
</script>
