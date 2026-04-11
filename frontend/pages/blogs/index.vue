<template>
  <div class="relative z-10 flex flex-col min-h-screen pb-12">
    <!-- Spectacular Hero Banner -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-indigo-950/40 to-slate-900 border-b border-indigo-500/20 shadow-[0_10px_40px_rgba(79,70,229,0.1)]">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.25),transparent_60%)] pointer-events-none"></div>
      <div class="absolute inset-0 bg-[url('/img/grid.svg')] opacity-20 pointer-events-none"></div>
      <div class="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <nav class="flex items-center gap-2 text-sm text-white/50 mb-8 font-medium tracking-wide">
          <NuxtLink to="/" class="hover:text-indigo-300 transition-colors">Home</NuxtLink>
          <span class="text-white/20">/</span>
          <span class="text-white/80">Blogs</span>
        </nav>
        <div class="max-w-3xl">
          <h1 class="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            The <span class="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">SlotQuest</span> Journal
          </h1>
          <p class="text-white/70 text-xl font-light max-w-2xl leading-relaxed">
            Exclusive insights, expert strategies, and the latest news from the global network of premium online slots and casinos.
          </p>
        </div>
      </div>
    </section>

    <!-- Category Filter Chips -->
    <div class="container mx-auto px-4 py-8 relative z-20 mt-8">
      <div class="flex flex-wrap gap-3 pb-2 overflow-x-auto no-scrollbar">
        <button
          @click="selectedCategory = null"
          :class="[
            'px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border flex-shrink-0',
            !selectedCategory
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-105'
              : 'bg-slate-900/80 backdrop-blur-md border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
          ]"
        >
          All Intel
        </button>
        <button
          v-for="cat in categories"
          :key="cat.name"
          @click="selectedCategory = cat.name"
          :class="[
            'px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border flex-shrink-0',
            selectedCategory === cat.name
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] scale-105'
              : 'bg-slate-900/80 backdrop-blur-md border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
          ]"
        >
          {{ cat.name }} <span class="text-white/30 ml-1.5 align-middle">({{ cat.count }})</span>
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="container mx-auto px-4 py-8 animate-pulse">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="bg-white/5 rounded-3xl h-96 border border-white/10 shadow-xl"></div>
      </div>
    </div>

    <!-- Blog Grid -->
    <div v-else class="container mx-auto px-4 pb-16">
      <!-- Ultimate Guides (Static Features) -->
      <div v-if="!selectedCategory" class="mb-16">
        <h2 class="text-3xl font-black text-white mb-8 flex items-center gap-3 tracking-tight">
          <Icon name="solar:stars-minimalistic-bold-duotone" class="text-4xl text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
          Ultimate Guides
        </h2>
        <div class="grid grid-cols-1 mb-8">
          <NuxtLink
            to="/blogs/best-online-slots"
            class="group relative bg-[#050814] rounded-3xl border border-purple-500/30 overflow-hidden hover:border-purple-400 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(168,85,247,0.25)] hover:-translate-y-1 block"
          >
            <!-- Background Image for the Guide -->
            <div class="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#0a0f24] to-[#050814]">
               <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.2),transparent_60%)]"></div>
            </div>
            
            <div class="flex flex-col md:flex-row relative z-10">
              <div class="p-8 md:p-12 md:w-2/3 flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-6">
                  <span class="text-xs font-bold uppercase tracking-wider bg-purple-600 text-white px-4 py-1.5 rounded-sm shadow-[0_0_15px_rgba(168,85,247,0.5)]">Pillar Guide</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-purple-500/50"></span>
                  <span class="text-sm font-bold text-gradient bg-gradient-to-r from-purple-400 to-pink-400">15 min read</span>
                </div>
                <h3 class="text-3xl md:text-4xl font-black text-white mb-4 group-hover:text-purple-300 transition-colors drop-shadow-md">Best Online Slots in 2026: Our Expert Picks</h3>
                <p class="text-white/70 text-lg line-clamp-3 leading-relaxed mb-8 max-w-2xl">Finding the truly best online slots can be overwhelming with thousands of options. Our experts ranked the top-performing games based on RTP, volatility, bonus features, and design.</p>
                <div class="flex items-center text-purple-400 font-bold group-hover:px-2 transition-all">
                  Read Full Guide <Icon name="solar:arrow-right-line-duotone" class="text-xl ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
              <div class="hidden md:flex w-1/3 relative items-center justify-center p-8">
                 <div class="w-full aspect-square rounded-full bg-purple-500/10 border border-purple-500/20 blur-[2px] absolute"></div>
                 <div class="w-48 h-48 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl rotate-12 flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.3)] border border-white/20 z-20 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-500">
                    <span class="text-7xl">🎰</span>
                 </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Premium Featured Section -->
      <div v-if="!selectedCategory && featuredBlogs?.length" class="mb-16">
        <h2 class="text-3xl font-black text-white mb-8 flex items-center gap-3 tracking-tight">
          <Icon name="solar:crown-star-bold-duotone" class="text-4xl text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          Featured Intel
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NuxtLink
            v-for="blog in featuredBlogs.slice(0, 2)"
            :key="blog.id"
            :to="`/blogs/${blog.slug}`"
            class="group relative bg-[#0d1124] rounded-3xl border border-white/10 overflow-hidden hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.2)] hover:-translate-y-1"
          >
            <div class="aspect-video bg-gradient-to-br from-indigo-600/20 to-purple-600/20 overflow-hidden relative">
              <img v-if="blog.cover_image_url" :src="blog.cover_image_url" :alt="localizedField(blog, 'title')" class="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-1000 ease-out opacity-90 group-hover:opacity-100" />
              <div v-else class="w-full h-full flex items-center justify-center">
                <span class="text-7xl opacity-20 drop-shadow-lg">📝</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-[#0d1124] via-transparent to-transparent"></div>
            </div>
            <div class="p-8 relative z-10 -mt-10">
              <div class="flex items-center gap-3 mb-4">
                <span v-if="blog.category" class="text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white px-3 py-1 rounded-sm shadow-[0_0_10px_rgba(79,70,229,0.5)]">{{ blog.category }}</span>
                <span class="text-sm font-medium text-white/50">{{ formatDate(blog.published_at) }}</span>
                <span class="w-1 h-1 rounded-full bg-white/20"></span>
                <span v-if="blog.reading_time" class="text-sm font-medium text-indigo-300">{{ blog.reading_time }} min read</span>
              </div>
              <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-tight drop-shadow-md">{{ localizedField(blog, 'title') }}</h3>
              <p class="text-white/60 text-base line-clamp-3 leading-relaxed">{{ localizedField(blog, 'excerpt') }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- All Posts Grid -->
      <h2 class="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
        <Icon name="solar:layers-bold-duotone" class="text-4xl text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
        {{ selectedCategory ? selectedCategory : 'Latest Journals' }}
      </h2>
      <div v-if="blogs?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="blog in blogs"
          :key="blog.id"
          :to="`/blogs/${blog.slug}`"
          class="group bg-[#0f1429] rounded-[2rem] border border-white/5 overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)] hover:-translate-y-2 flex flex-col h-full"
        >
          <div class="aspect-[16/10] bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden relative">
            <img v-if="blog.cover_image_url" :src="blog.cover_image_url" :alt="localizedField(blog, 'title')" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" />
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="text-5xl opacity-10 drop-shadow-md">📰</span>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0f1429] via-transparent to-transparent opacity-80"></div>
          </div>
          <div class="p-6 flex-1 flex flex-col relative z-10 -mt-6">
            <div class="flex items-center gap-3 mb-4">
              <span v-if="blog.category" class="text-xs font-bold uppercase tracking-widest text-blue-400">{{ blog.category }}</span>
              <span class="w-1 h-1 rounded-full bg-white/20"></span>
              <span class="text-xs font-medium text-white/40">{{ formatDate(blog.published_at) }}</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2 leading-tight drop-shadow-sm">{{ localizedField(blog, 'title') }}</h3>
            <p class="text-white/50 text-sm line-clamp-2 leading-relaxed flex-1">{{ localizedField(blog, 'excerpt') }}</p>
            <div class="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                  {{ (blog.author_name || 'S')[0] }}
                </div>
                <span class="text-xs font-medium text-white/60">{{ blog.author_name || 'SlotQuest' }}</span>
              </div>
              <span v-if="blog.reading_time" class="text-xs font-bold text-white/30">{{ blog.reading_time }} MIN</span>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="text-center py-24 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] border border-white/10 backdrop-blur-sm">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 mb-6">
          <Icon name="solar:document-text-line-duotone" class="text-5xl text-white/20" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-3">No articles tracked</h3>
        <p class="text-white/40 max-w-sm mx-auto">Our intel network is currently searching for new {{ selectedCategory || 'data' }}...</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center gap-3 mt-16 pb-8">
        <button
          v-for="p in totalPages"
          :key="p"
          @click="currentPage = p"
          :class="[
            'w-12 h-12 rounded-2xl text-sm font-black transition-all duration-300 border flex items-center justify-center',
            currentPage === p
              ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-110'
              : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white hover:scale-105'
          ]"
        >
          {{ p }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const { getBlogs, getFeaturedBlogs, getBlogCategories } = useBlogs()

const selectedCategory = ref(null)
const currentPage = ref(1)

// Fetch blogs
const { data: blogsResponse, pending } = await useAsyncData(
  () => `blogs-${selectedCategory.value}-${currentPage.value}`,
  () => getBlogs({ page: currentPage.value, limit: 12, category: selectedCategory.value }),
  { watch: [selectedCategory, currentPage] }
)

const blogs = computed(() => blogsResponse.value?.data || [])
const totalPages = computed(() => blogsResponse.value?.pages || 1)

// Fetch featured
const { data: featuredResponse } = await useAsyncData('blogs-featured', () => getFeaturedBlogs())
const featuredBlogs = computed(() => featuredResponse.value?.data || [])

// Fetch categories
const { data: categoriesResponse } = await useAsyncData('blog-categories', () => getBlogCategories())
const categories = computed(() => categoriesResponse.value?.data || [])

// Helpers
const localizedField = (blog, field) => {
  if (blog.localizations && blog.localizations[locale.value]) {
    const loc = blog.localizations[locale.value]
    if (loc[field]) return loc[field]
    if (field === 'excerpt' && loc.seo_desc) return loc.seo_desc
    if (field === 'title' && loc.seo_title) return loc.seo_title
  }
  return blog[field]
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Reset page on category change
watch(selectedCategory, () => { currentPage.value = 1 })

// SEO & Full i18n integration
const i18nHead = useLocaleHead({ addDirAttribute: true, identifierAttribute: 'id', addSeoAttributes: true })
useHead({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs.lang, dir: i18nHead.value.htmlAttrs.dir },
  link: i18nHead.value.link,
  meta: i18nHead.value.meta
})

const seoTitle = 'Gambling Blog & Expert Reviews | SlotQuest Journal'
const seoDesc = 'Dive into expert gambling guides, slot strategies, highly detailed RTP analysis, and exclusive industry news. Your ultimate resource for online casino knowledge.'

useSeoMeta({
  title: seoTitle,
  description: seoDesc,
  ogTitle: seoTitle,
  ogDescription: seoDesc,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
    name: seoTitle,
    description: seoDesc,
  })
])
</script>
