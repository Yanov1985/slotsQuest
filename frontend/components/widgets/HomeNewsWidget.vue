<template>
  <div v-if="newsItems && newsItems.length > 0" class="mt-16 mb-8 w-full">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
        <Icon name="solar:document-text-bold-duotone" class="text-blue-500 w-8 h-8" />
        {{ $t('news.latest_news', 'Latest News') }}
      </h2>
      <NuxtLink :to="localePath('/news')" class="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 transition-colors">
        {{ $t('common.view_all', 'View All') }}
        <Icon name="solar:arrow-right-linear" class="w-4 h-4" />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <NuxtLink 
        v-for="item in newsItems.slice(0, 4)" 
        :key="item.id"
        :to="localePath(`/news/${item.slug}`)"
        class="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg shadow-black/20 block transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
      >
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80"></div>
        <img :src="item.image_url || '/placeholder-news.jpg'" :alt="getLoc(item)?.title || item.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        
        <div class="absolute inset-0 z-20 flex flex-col justify-end p-5">
           <div class="flex items-center gap-2 mb-2">
              <span class="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-blue-600/80 text-white rounded-lg backdrop-blur-md">News</span>
              <span class="text-xs text-white/70">{{ new Date(item.created_at).toLocaleDateString(locale) }}</span>
           </div>
           <h3 class="text-white font-bold text-lg sm:text-base leading-tight w-full line-clamp-3 text-shadow-md decoration-white/30 group-hover:underline underline-offset-4">{{ getLoc(item)?.title || item.title }}</h3>
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

const { data: result } = await useAsyncData('home-latest-news', () => getNews(), { lazy: import.meta.client })
const newsItems = computed(() => result.value?.data || [])

const getLoc = (item) => {
  if (!item.localizations) return null
  return item.localizations[locale.value] || null
}
</script>
