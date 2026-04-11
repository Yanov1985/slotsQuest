<template>
  <div class="relative z-10 flex flex-col min-h-screen pb-12 bg-[#050814]">
    <!-- Spectacular Article Hero Banner -->
    <header class="relative overflow-hidden min-h-[60vh] flex flex-col justify-end pb-16 border-b border-purple-500/20 shadow-[0_10px_40px_rgba(168,85,247,0.15)] bg-[#050814]">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#0a0f24] via-purple-900/40 to-[#050814]">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.2),transparent_60%)]"></div>
        <div class="absolute w-full h-full bg-[url('/img/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      </div>
      <!-- Gradual Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/80 to-transparent"></div>
      
      <div class="container mx-auto px-4 relative z-10 lg:px-8">
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-sm text-white/50 mb-8 font-medium">
          <NuxtLink to="/" class="hover:text-white transition-colors drop-shadow-md">Home</NuxtLink>
          <span class="text-white/20">/</span>
          <NuxtLink to="/blogs" class="hover:text-white transition-colors drop-shadow-md">Blogs</NuxtLink>
          <span class="text-white/20">/</span>
          <span class="text-white/80 truncate max-w-xs drop-shadow-md">{{ pageContent.seoTitle }}</span>
        </nav>

        <div class="max-w-4xl">
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <span class="text-xs font-bold bg-purple-600 border border-purple-400 text-white px-4 py-1.5 rounded-sm shadow-[0_0_15px_rgba(168,85,247,0.5)] uppercase tracking-wider">
              Expert Guide
            </span>
            <span class="text-sm font-medium text-white/60 drop-shadow-md">Updated: 2026</span>
            <span class="w-1.5 h-1.5 rounded-full bg-purple-500/50"></span>
            <span class="text-sm font-bold text-gradient bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-md">15 min read</span>
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl mb-6">
            {{ pageContent.h1 }}
          </h1>

          <p class="text-lg md:text-xl lg:text-2xl text-white/70 font-light leading-relaxed max-w-3xl drop-shadow-xl border-l-4 border-purple-500 pl-6 bg-gradient-to-r from-purple-500/10 to-transparent py-3">
            {{ pageContent.intro }}
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content Grid -->
    <div class="container mx-auto px-4 py-12 lg:px-8">
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start relative">
        
        <!-- Sticky Table of Contents (Desktop) -->
        <aside class="hidden lg:block w-72 flex-shrink-0 sticky top-4">
          <div class="bg-[#0a0f24] rounded-2xl border border-white/5 shadow-xl p-6 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h3 class="text-white font-bold text-xl mb-4 border-b border-white/10 pb-4">{{ pageContent.tocTitle }}</h3>
            <ul class="space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar pr-2 relative z-10">
              <li>
                <a href="#how-we-rank" class="text-white/60 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group mb-2 border-b border-white/5 pb-2">
                  <span class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors"><Icon name="solar:medal-ribbon-bold-duotone" /></span>
                  {{ pageContent.howWeRank.title }}
                </a>
              </li>
              <li v-if="pageContent.typesOfSlots">
                <a href="#types-of-slots" class="text-white/60 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group mb-2 border-b border-white/5 pb-2">
                  <span class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors"><Icon name="solar:layers-bold-duotone" /></span>
                  {{ pageContent.typesOfSlots.title }}
                </a>
              </li>
              <li v-if="pageContent.topProviders">
                <a href="#top-providers" class="text-white/60 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group mb-2 border-b border-white/5 pb-2">
                  <span class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors"><Icon name="solar:crown-bold-duotone" /></span>
                  {{ pageContent.topProviders.title }}
                </a>
              </li>
              <li v-for="(slotData, index) in allSlots" :key="`toc-${slotData.slug}`">
                <a :href="`#slot-${slotData.slug}`" class="text-white/60 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group">
                  <span class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                    {{ index + 1 }}
                  </span>
                  {{ slotData.name }}
                </a>
              </li>
              <li>
                <a href="#key-features" class="text-white/60 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group mt-4 pt-4 border-t border-white/10">
                  <span class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors"><Icon name="solar:settings-bold-duotone" /></span>
                  {{ pageContent.keyFeatures.title }}
                </a>
              </li>
              <li>
                <a href="#tips" class="text-white/60 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group mt-2">
                  <span class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors"><Icon name="solar:lightbulb-minimalistic-bold-duotone" /></span>
                  {{ pageContent.tipsForPlayers.title }}
                </a>
              </li>
              <li v-if="pageContent.howToPlayForRealMoney">
                <a href="#how-to-play" class="text-white/60 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group mt-2 pt-2 border-t border-white/5">
                  <span class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors"><Icon name="solar:gamepad-bold-duotone" /></span>
                  {{ pageContent.howToPlayForRealMoney.title }}
                </a>
              </li>
              <li v-if="pageContent.popularThemes">
                <a href="#popular-themes" class="text-white/60 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group mt-2">
                  <span class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors"><Icon name="solar:ghost-bold-duotone" /></span>
                  {{ pageContent.popularThemes.title }}
                </a>
              </li>
              <li>
                <a href="#faq" class="text-white/60 hover:text-purple-400 transition-colors text-sm font-medium flex items-center gap-2 group mt-2 pt-4 border-t border-white/10">
                  <span class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-xs group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                    ?
                  </span>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Slots List -->
        <article class="flex-1 min-w-0 w-full space-y-16 lg:space-y-24 mt-4 lg:mt-8">
          
          <!-- How We Rank Section -->
          <section id="how-we-rank" class="scroll-mt-24 bg-[#0a0f24] rounded-3xl border border-white/5 p-8 lg:p-12 shadow-xl">
            <h2 class="text-3xl lg:text-4xl font-black text-white mb-6 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Icon name="solar:medal-ribbon-bold-duotone" class="text-purple-400 text-2xl" />
              </div>
              {{ pageContent.howWeRank.title }}
            </h2>
            <div class="prose prose-invert prose-lg max-w-none text-white/80" v-html="pageContent.howWeRank.content"></div>
          </section>

          <!-- Types of Slots Section -->
          <section id="types-of-slots" class="scroll-mt-24 bg-[#0a0f24] rounded-3xl border border-white/5 p-8 lg:p-12 shadow-xl" v-if="pageContent.typesOfSlots">
            <h2 class="text-3xl lg:text-4xl font-black text-white mb-6 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Icon name="solar:layers-bold-duotone" class="text-purple-400 text-2xl" />
              </div>
              {{ pageContent.typesOfSlots.title }}
            </h2>
            <div class="prose prose-invert prose-lg max-w-none text-white/80" v-html="pageContent.typesOfSlots.content"></div>
          </section>

          <!-- Top Providers Section -->
          <section id="top-providers" class="scroll-mt-24 bg-[#0a0f24] rounded-3xl border border-white/5 p-8 lg:p-12 shadow-xl" v-if="pageContent.topProviders">
            <h2 class="text-3xl lg:text-4xl font-black text-white mb-6 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Icon name="solar:crown-bold-duotone" class="text-purple-400 text-2xl" />
              </div>
              {{ pageContent.topProviders.title }}
            </h2>
            <div class="prose prose-invert prose-lg max-w-none text-white/80" v-html="pageContent.topProviders.content"></div>
          </section>

          <!-- Individual Slot Review Blocks -->
          <section
            v-for="(slotData, index) in allSlots"
            :key="slotData.slug"
            :id="`slot-${slotData.slug}`"
            class="scroll-mt-24 group relative"
          >
            <!-- Rank Badge -->
            <div class="absolute -top-6 -left-4 lg:-left-8 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg border border-white/20 z-20 group-hover:rotate-0 transition-transform duration-300">
              <span class="text-2xl lg:text-3xl font-black text-black -rotate-12 group-hover:rotate-0 transition-transform duration-300">#{{ index + 1 }}</span>
            </div>

            <!-- Content Card -->
            <div class="bg-white/[0.02] border border-white/10 rounded-3xl p-6 lg:p-10 relative overflow-hidden backdrop-blur-sm transition-all duration-500">
              <!-- Glow fx -->
               <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div class="flex flex-col xl:flex-row gap-8 lg:gap-12 relative z-10">
                <!-- Slot Presentation (Image & Stats) -->
                <div class="w-full xl:w-2/5 flex flex-col gap-6">
                  <NuxtLink :to="`/slots/${slotData.slug}`" class="block rounded-2xl overflow-hidden border border-white/10 aspect-[3/4] sm:aspect-[4/5] sm:max-h-[400px] mx-auto w-full sm:w-3/4 xl:w-full relative hover:scale-[1.02] transition-transform duration-500 shadow-xl group/img">
                    <img v-if="slotData.cover_image" :src="slotData.cover_image" :alt="slotData.name" loading="lazy" class="w-full h-full object-cover" />
                    <!-- Placeholder if image is somehow missing -->
                    <div v-else class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
                       <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-3xl text-white/20 whitespace-nowrap">{{ slotData.name }}</span>
                    </div>
                    <!-- Icon Overlay -->
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                      <div class="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white scale-75 group-hover/img:scale-100 transition-transform duration-300 shadow-xl">
                        <Icon name="solar:play-circle-bold" class="text-4xl" />
                      </div>
                    </div>
                  </NuxtLink>

                  <!-- Mini Stats Grid -->
                  <div class="grid grid-cols-2 gap-3">
                    <div class="bg-black/30 rounded-xl p-3 border border-white/5">
                      <div class="text-white/50 text-xs font-semibold mb-1 uppercase tracking-widest">RTP</div>
                      <div class="text-white font-bold text-lg">{{ slotData.rtp }}</div>
                    </div>
                    <div class="bg-black/30 rounded-xl p-3 border border-white/5">
                      <div class="text-white/50 text-xs font-semibold mb-1 uppercase tracking-widest">Provider</div>
                      <div class="text-white font-bold text-lg truncate">{{ slotData.provider }}</div>
                    </div>
                    <div class="bg-black/30 rounded-xl p-3 border border-white/5">
                      <div class="text-white/50 text-xs font-semibold mb-1 uppercase tracking-widest">Max Win</div>
                      <div class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-black text-xl">{{ slotData.maxWin }}</div>
                    </div>
                    <div class="bg-black/30 rounded-xl p-3 border border-white/5">
                      <div class="text-white/50 text-xs font-semibold mb-1 uppercase tracking-widest">Volatility</div>
                      <div class="text-white font-bold text-lg">{{ slotData.volatility }}</div>
                    </div>
                  </div>
                </div>

                <!-- Review Content -->
                <div class="w-full xl:w-3/5 flex flex-col">
                  <h2 class="text-3xl lg:text-4xl font-black text-white mb-6 tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text">{{ slotData.name }}</h2>
                  
                  <div class="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed mb-8 custom-prose" v-html="slotData.description"></div>

                  <!-- Pros / Cons -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" v-if="slotData.pros.length || slotData.cons.length">
                    <div class="bg-emerald-500/5 rounded-xl p-5 border border-emerald-500/20" v-if="slotData.pros.length">
                      <h4 class="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                        <Icon name="solar:check-circle-bold" class="text-xl" /> Pros
                      </h4>
                      <ul class="space-y-2">
                        <li v-for="pro in slotData.pros" :key="pro" class="text-white/80 text-sm flex items-start gap-2">
                          <span class="text-emerald-500 mt-0.5">•</span> {{ pro }}
                        </li>
                      </ul>
                    </div>
                     <div class="bg-red-500/5 rounded-xl p-5 border border-red-500/20" v-if="slotData.cons.length">
                      <h4 class="text-red-400 font-bold mb-3 flex items-center gap-2">
                        <Icon name="solar:close-circle-bold" class="text-xl" /> Cons
                      </h4>
                      <ul class="space-y-2">
                        <li v-for="con in slotData.cons" :key="con" class="text-white/80 text-sm flex items-start gap-2">
                          <span class="text-red-500 mt-0.5">•</span> {{ con }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- CTAs -->
                  <div class="mt-auto flex flex-col xs:flex-row gap-4 pt-4 border-t border-white/10">
                    <NuxtLink :to="`/slots/${slotData.slug}`" class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] text-center flex items-center justify-center gap-2 group">
                      <Icon name="solar:gamepad-bold" class="text-xl group-hover:scale-110 transition-transform" /> {{ pageContent.playDemo }}
                    </NuxtLink>
                    <NuxtLink :to="`/slots/${slotData.slug}`" class="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 px-6 rounded-xl transition-all text-center flex items-center justify-center gap-2 group">
                      {{ pageContent.playReal }} <Icon name="solar:arrow-right-line-duotone" class="text-xl group-hover:translate-x-1 transition-transform" />
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Divider -->
          <div class="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-16"></div>

          <!-- Key Features Section -->
          <section id="key-features" class="scroll-mt-24 bg-[#0a0f24] rounded-3xl border border-white/5 p-8 lg:p-12 shadow-xl">
            <h2 class="text-3xl lg:text-4xl font-black text-white mb-6 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Icon name="solar:settings-bold-duotone" class="text-purple-400 text-2xl" />
              </div>
              {{ pageContent.keyFeatures.title }}
            </h2>
            <div class="prose prose-invert prose-lg max-w-none" v-html="pageContent.keyFeatures.content"></div>
          </section>

          <!-- Tips Section -->
          <section id="tips" class="scroll-mt-24 mt-16 bg-[#0a0f24] rounded-3xl border border-white/5 p-8 lg:p-12 shadow-xl">
            <h2 class="text-3xl lg:text-4xl font-black text-white mb-6 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Icon name="solar:lightbulb-minimalistic-bold-duotone" class="text-purple-400 text-2xl" />
              </div>
              {{ pageContent.tipsForPlayers.title }}
            </h2>
            <div class="prose prose-invert prose-lg max-w-none" v-html="pageContent.tipsForPlayers.content"></div>
          </section>

          <!-- Divider -->
          <div class="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-16"></div>

          <!-- How to Play Section -->
          <section id="how-to-play" class="scroll-mt-24 bg-[#0a0f24] rounded-3xl border border-white/5 p-8 lg:p-12 shadow-xl" v-if="pageContent.howToPlayForRealMoney">
            <h2 class="text-3xl lg:text-4xl font-black text-white mb-6 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Icon name="solar:gamepad-bold-duotone" class="text-purple-400 text-2xl" />
              </div>
              {{ pageContent.howToPlayForRealMoney.title }}
            </h2>
            <div class="prose prose-invert prose-lg max-w-none text-white/80" v-html="pageContent.howToPlayForRealMoney.content"></div>
          </section>

          <!-- Popular Themes Section -->
          <section id="popular-themes" class="scroll-mt-24 mt-16 bg-[#0a0f24] rounded-3xl border border-white/5 p-8 lg:p-12 shadow-xl" v-if="pageContent.popularThemes">
            <h2 class="text-3xl lg:text-4xl font-black text-white mb-6 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Icon name="solar:ghost-bold-duotone" class="text-purple-400 text-2xl" />
              </div>
              {{ pageContent.popularThemes.title }}
            </h2>
            <div class="prose prose-invert prose-lg max-w-none text-white/80" v-html="pageContent.popularThemes.content"></div>
          </section>

          <!-- Divider -->
          <div class="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-16"></div>

          <!-- FAQ Section -->
          <section id="faq" class="scroll-mt-24">
            <h2 class="text-3xl lg:text-4xl font-black text-white mb-8 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Icon name="solar:question-circle-bold-duotone" class="text-purple-400 text-2xl" />
              </div>
              {{ pageContent.faqTitle }}
            </h2>
            
            <div class="space-y-4">
              <div v-for="(faq, index) in pageContent.faqs" :key="`faq-${index}`" class="bg-[#0a0f24] rounded-2xl border border-white/5 p-6 md:p-8 hover:border-purple-500/30 transition-colors">
                <h3 class="text-xl font-bold text-white mb-3">{{ faq.q }}</h3>
                <p class="text-white/70 leading-relaxed">{{ faq.a }}</p>
              </div>
            </div>
          </section>

        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getBestSlotsContent } from '~/data/bestSlotsContent'

const { locale } = useI18n()
const { getSlots } = useSlotsApi()

// Fetch Content (SEO & Semantic rules)
const pageContent = computed(() => getBestSlotsContent(locale.value))

// Fetch Top Games dynamically (using 'top-games' category)
const { data: dbSlotsResponse } = await useAsyncData('best-slots-top-games', () => getSlots({ category: 'top-games', limit: 135 }))
const dbSlots = computed(() => Array.isArray(dbSlotsResponse.value) ? dbSlotsResponse.value : (dbSlotsResponse.value?.data || []))

// Combine DB payload with Custom Semantic Blocks
const allSlots = computed(() => {
  return dbSlots.value.map((slot) => {
     // Pull manual overrides if we have an expertly written review for this slot
     const expertData = pageContent.value.slots.find(s => s.slug === slot.slug)
     
     const loc = slot.localizations?.[locale.value] || {}
     let dbDescription = loc.overview || loc.description || slot.description || ''
     if (dbDescription.trim() === '') {
       dbDescription = pageContent.value.intro_fallback_desc.replace('{name}', slot.name)
     } else {
       dbDescription = `<p>${dbDescription}</p>`
     }

     return {
        slug: slot.slug,
        name: slot.name,
        provider: slot.provider?.name || expertData?.provider || 'Premium Provider',
        rtp: expertData?.rtp || (slot.rtp ? `${slot.rtp}%` : '96.00%'),
        volatility: expertData?.volatility || slot.volatility || 'High',
        maxWin: expertData?.maxWin || (slot.max_multiplier ? `${slot.max_multiplier}x` : '5,000x'),
        description: expertData?.description || dbDescription,
        pros: expertData?.pros || loc.pros || [],
        cons: expertData?.cons || loc.cons || [],
        cover_image: slot.image_url || slot.thumbnail_url || null
     }
  })
})

// JSON-LD SEO Generation
useSchemaOrg([
  defineArticle({
    '@type': 'Article',
    headline: pageContent.value.seoTitle,
    description: pageContent.value.seoDescription,
    image: ['/img/best-slots-cover.png'],
    author: {
      name: 'SlotQuest Editorial'
    },
    datePublished: '2026-04-09T00:00:00.000Z',
    dateModified: '2026-04-09T00:00:00.000Z'
  }),
  defineItemList({
    name: 'Top Online Slots Ranked By Experts',
    itemListElement: allSlots.value.map((slot, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Game',
        name: slot.name,
        url: `https://brand.com/slots/${slot.slug}`
      }
    }))
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageContent.value.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  }
])

// Meta SEO
const i18nHead = useLocaleHead({ addDirAttribute: true, identifierAttribute: 'id', addSeoAttributes: true })
useHead({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs.lang, dir: i18nHead.value.htmlAttrs.dir },
  link: i18nHead.value.link,
  meta: i18nHead.value.meta
})

useSeoMeta({
  title: () => pageContent.value.seoTitle,
  description: () => pageContent.value.seoDescription,
  ogTitle: () => pageContent.value.seoTitle,
  ogDescription: () => pageContent.value.seoDescription,
  ogType: 'article',
  twitterCard: 'summary_large_image',
})

</script>

<style scoped>
.custom-prose p {
  margin-bottom: 1rem;
}
.custom-prose strong {
  color: white;
}
.custom-prose em {
  color: #c084fc;
  font-style: normal;
  font-weight: bold;
}
</style>
