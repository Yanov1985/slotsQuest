<template>
  <main
    v-if="slot"
    role="main"
    class="relative min-h-screen bg-zinc-950 text-slate-100 border border-white/10"
  >
    <!-- Анимированный фон -->
    <div class="absolute inset-0 overflow-hidden hidden xs:block" aria-hidden="true">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-beam transform skew-x-12"></div>
      <div class="absolute top-0 left-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-40 sm:w-56 md:w-72 lg:w-80 h-40 sm:h-56 md:h-72 lg:h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 left-1/3 w-32 sm:w-48 md:w-56 lg:w-64 h-32 sm:h-48 md:h-56 lg:h-64 bg-pink-500/15 rounded-full blur-2xl animate-pulse" style="animation-delay: 2s"></div>
    </div>

    <!-- Декоративные элементы -->
    <div class="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-white/10 text-4xl sm:text-5xl md:text-6xl lg:text-8xl animate-float" aria-hidden="true">⚡</div>
    <div class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 text-white/10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-float" style="animation-delay: 1.5s" aria-hidden="true">🏛️</div>
    <div class="absolute top-1/3 right-1/4 text-white/10 text-2xl sm:text-3xl md:text-4xl animate-float hidden sm:block" style="animation-delay: 3s" aria-hidden="true">💎</div>

    <div class="relative z-10 max-w-full flex flex-col lg:flex-row lg:min-h-screen">
      <!-- 📱 Левая часть: Игровая информация с Aurora Background -->
      <section class="dark w-full lg:w-[70%] lg:sticky lg:top-0 lg:self-start order-1">
        <AuroraBackground
          class="!h-auto !min-h-fit sm:!min-h-[60vh] lg:!min-h-screen !flex-col !justify-start !items-stretch"
          :show-radial-gradient="true"
        >
          <article
            class="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-start min-w-0 h-full"
            role="article"
            aria-labelledby="slot-title"
            itemscope
            itemtype="https://schema.org/Game"
          >
            <!-- 🎯 SEO Meta tags for Game schema -->
            <template v-if="slotThemes.length > 0">
              <meta v-for="theme in slotThemes" :key="`game-genre-${theme.id}`" itemprop="genre" :content="theme.name" />
            </template>
            <meta v-else itemprop="genre" :content="slot.hero_keyword || 'Slot Game'" />
            <meta itemprop="datePublished" :content="slot.release_date || '2024-01-01'" />
            <meta itemprop="inLanguage" :content="slot.content_language || 'en'" />
            <meta itemprop="isAccessibleForFree" :content="slot.demo_url ? 'true' : 'false'" />
            <link itemprop="url" :href="`https://slotquest.com/slots/${slot.slug}`" />

            <!-- Title and main information -->
            <header class="mb-2 xs:mb-3 sm:mb-4 lg:mb-8" role="banner">
              <!-- Provider (mobile version) -->
              <section class="flex items-center gap-3 mb-3 sm:mb-4 flex-wrap lg:hidden" aria-labelledby="provider-label" role="region" itemprop="provider" itemscope itemtype="https://schema.org/Organization">
                <meta itemprop="name" :content="slot.providers?.name || 'Pragmatic Play'" />
                <link v-if="slot.providers?.website" itemprop="url" :href="slot.providers.website" />
                <h2 id="provider-label" class="sr-only">Game Provider Information</h2>
                <address class="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-purple-400/30 not-italic transition-all duration-300 hover:from-purple-500/40 hover:to-pink-500/40 hover:border-purple-400/50" role="contentinfo" aria-label="Game developer and publisher information">
                  <span class="font-semibold" title="Game Provider" itemprop="name">{{ slot.providers?.name || 'Pragmatic Play' }}</span>
                </address>
              </section>

              <!-- Main Title (mobile) -->
              <h1 id="slot-title" class="text-xl xs:text-2xl sm:text-3xl lg:hidden font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent mb-1 xs:mb-2 sm:mb-3 leading-tight drop-shadow-md transition-all duration-500" style="line-height: 1.3" tabindex="0" role="heading" aria-level="1" :aria-label="`${slot.name || 'Slot'} - Online slot game`" itemprop="name">
                <span class="block sm:inline" itemprop="headline">{{ slot.name || 'Slot' }}</span>
                <span v-if="slot.providers?.name" class="hidden sm:inline text-base sm:text-lg font-medium opacity-90">
                  by <span itemprop="creator">{{ slot.providers.name }}</span>
                </span>
                <span v-if="slot.rtp" class="hidden sm:inline text-sm sm:text-base font-normal opacity-80">
                  • RTP <span>{{ slot.rtp }}%</span>
                </span>
              </h1>

              <!-- Slot description (mobile) -->
              <section class="lg:hidden mb-2 xs:mb-3 sm:mb-4" role="region" aria-labelledby="slot-description">
                <div id="slot-description" class="space-y-1.5 xs:space-y-2 sm:space-y-2.5" role="text" aria-label="Detailed slot machine description with specifications">
                  <!-- Schema.org Microdata -->
                  <meta itemprop="description" :content="shortDescriptionRaw" />

                  <!-- SEO description -->
                  <p class="text-sm xs:text-base sm:text-lg leading-relaxed xs:leading-relaxed sm:leading-loose text-justify text-white/90 font-normal tracking-wide" style="text-align-last: left; hyphens: auto;">
                    <span class="text-white/85" v-html="shortDescriptionHtml"></span>
                  </p>

                  <!-- 📊 Characteristics Tags (Mobile) -->
                  <section class="flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 pt-1 xs:pt-2" v-if="hasStats" role="region" aria-label="Game specifications and technical characteristics" itemscope itemtype="https://schema.org/PropertyValueSpecification">
                    <!-- RTP -->
                    <span v-if="slot.rtp" class="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-white/10 backdrop-blur-sm rounded-md xs:rounded-lg border border-white/20 hover:bg-white/15 transition-colors" itemprop="additionalProperty" itemscope itemtype="https://schema.org/PropertyValue" role="listitem" :aria-label="`Return to Player: ${slot.rtp} percent`">
                      <meta itemprop="name" content="Return to Player (RTP)" />
                      <meta itemprop="value" :content="String(slot.rtp)" />
                      <meta itemprop="unitCode" content="P1" />
                      <span class="text-[10px] xs:text-xs sm:text-sm font-medium text-white/70" aria-hidden="true">RTP:</span>
                      <span class="text-xs xs:text-sm sm:text-base font-bold text-emerald-400">{{ slot.rtp }}%</span>
                    </span>

                    <!-- Volatility -->
                    <span v-if="slot.volatility" class="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-white/10 backdrop-blur-sm rounded-md xs:rounded-lg border border-white/20 hover:bg-white/15 transition-colors" itemprop="additionalProperty" itemscope itemtype="https://schema.org/PropertyValue" role="listitem" :aria-label="`Volatility level: ${slot.volatility}`">
                      <meta itemprop="name" content="Volatility" />
                      <meta itemprop="value" :content="slot.volatility" />
                      <span class="text-[10px] xs:text-xs sm:text-sm font-medium text-white/70" aria-hidden="true">Vol:</span>
                      <span class="text-xs xs:text-sm sm:text-base font-bold capitalize" :class="volatilityClass">{{ slot.volatility }}</span>
                    </span>

                    <!-- Max Win -->
                    <span v-if="slot.max_win" class="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-md xs:rounded-lg border border-yellow-400/30 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all" itemprop="additionalProperty" itemscope itemtype="https://schema.org/PropertyValue" role="listitem" :aria-label="`Maximum win: ${maxWinFormatted} times your bet`">
                      <meta itemprop="name" content="Maximum Win Multiplier" />
                      <meta itemprop="value" :content="String(slot.max_win)" />
                      <meta itemprop="unitText" content="x bet" />
                      <span class="text-[10px] xs:text-xs sm:text-sm font-medium text-yellow-300/80" aria-hidden="true">Max:</span>
                      <span class="text-xs xs:text-sm sm:text-base font-bold text-yellow-400">{{ maxWinFormatted }}x</span>
                    </span>

                    <!-- Missing stats: Layout, Paylines, Min Bet, Max Bet (simplified for brevity here, similar structures) -->
                    <span v-if="slot.reels && slot.rows" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                      <span class="text-xs font-medium text-white/70">Layout:</span>
                      <span class="text-sm font-bold text-purple-400">{{ slot.reels }}×{{ slot.rows }}</span>
                    </span>
                    <span v-if="slot.paylines" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                      <span class="text-xs font-medium text-white/70">Lines:</span>
                      <span class="text-sm font-bold text-cyan-400">{{ paylinesFormatted }}</span>
                    </span>
                    <span v-if="slot.min_bet" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                      <span class="text-xs font-medium text-white/70">Min:</span>
                      <span class="text-sm font-bold text-amber-400">{{ slot.min_bet }}</span>
                    </span>
                  </section>
                </div>
              </section>

              <!-- Rating and voting (mobile version) -->
              <div class="flex flex-wrap items-center gap-4 mb-2 xs:mb-3 lg:hidden" role="group" aria-label="Rating, popularity and voting" itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
                <meta itemprop="ratingValue" :content="String(slot.rating || 4.5)" />
                <meta itemprop="bestRating" content="5" />
                <meta itemprop="worstRating" content="1" />
                <meta itemprop="ratingCount" :content="String(slot.reviews_count || 100)" />
                <meta itemprop="reviewCount" :content="String(slot.reviews_count || 100)" />

                <!-- Current rating -->
                <div class="flex items-center gap-2" :aria-label="`Rating ${slot.rating || 4.5} out of 5 stars`">
                  <div class="flex text-yellow-400" aria-hidden="true">
                    <svg v-for="n in 5" :key="n" class="w-6 h-6 xs:w-7 xs:h-7 drop-shadow-lg" :class="n <= Math.round(slot.rating || 4.5) ? 'text-yellow-400' : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-white font-bold text-lg">{{ slot.rating || 4.5 }}</span>
                  <span class="text-white/50 text-sm">({{ formatNumber(slot.reviews_count || 100) }})</span>
                </div>

                <!-- Popularity (mobile) -->
                <div v-if="slot.play_count && slot.play_count > 100" class="flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/20 rounded-full border border-orange-400/30">
                  <span class="text-xs font-bold text-orange-300">🔥 {{ formatNumber(slot.play_count) }}</span>
                </div>

                <!-- Vote button -->
                <button
                  class="px-3 py-1.5 rounded-full text-sm font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
                  @click="$emit('toggle-rating')"
                  :aria-expanded="showRatingPicker"
                  type="button"
                >
                  ⭐ Rate
                </button>
              </div>

              <!-- Voting panel (mobile) -->
              <div v-if="showRatingPicker" class="mt-3 p-4 bg-white/10 border border-white/20 rounded-xl lg:hidden">
                <div class="flex items-center justify-between gap-4 flex-wrap">
                  <div class="flex items-center gap-3">
                    <button
                      class="px-3 py-1 rounded-full text-sm font-semibold bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 transition-colors"
                      :class="{'bg-white/20 text-white': hoverStars === 0 || selectedStars === 0}"
                      @mouseenter="setHover(0)" @mouseleave="setHover(selectedStars ?? 0)" @click="$emit('pick-rating', 0)"
                    >0</button>
                    <div class="flex text-yellow-400">
                      <button
                        v-for="n in 5" :key="n"
                        class="w-7 h-7 cursor-pointer transition-all duration-200"
                        :class="[hoverStars >= n || (hoverStars === 0 && (selectedStars || 0) >= n) ? 'opacity-100 scale-110' : 'opacity-40']"
                        @mouseenter="setHover(n)" @mouseleave="setHover(selectedStars || 0)" @click="$emit('pick-rating', n)"
                      >
                        <svg fill="currentColor" viewBox="0 0 20 20" class="w-full h-full"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      </button>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <button
                      class="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-md disabled:opacity-50"
                      :disabled="selectedStars === null || ratingSubmitting"
                      @click="$emit('submit-rating')"
                    >
                      {{ ratingSubmitting ? 'Submitting…' : 'Submit' }}
                    </button>
                    <div v-if="ratingSubmitted" class="flex items-center gap-2 text-emerald-300 font-semibold">✔ Vote counted!</div>
                  </div>
                </div>
              </div>
            </header>

            <!-- 🖥️ Медиа + описание + кнопки (Desktop: в ряд) -->
            <div class="hidden lg:flex gap-6 items-start mb-8">
              <!-- Вертикальная обложка (портрет 3:4) -->
              <figure class="w-2/5">
                <CometCard :rotate-depth="17.5" :translate-depth="20" containerClassName="w-full h-full rounded-2xl" className="relative aspect-[3/4] rounded-2xl overflow-hidden backdrop-blur-md border border-white/20 shadow-2xl">
                  <div class="absolute inset-0">
                    <div class="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-blue-500/10 pointer-events-none" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                    <div v-if="slot.media_type === 'image' && slot.image_url" class="absolute inset-0">
                      <img :src="slot.image_url" :alt="slot.name" class="w-full h-full object-cover" :style="`object-position: ${slot.image_focus_point || 'center 20%'}`" loading="eager" @error="$emit('image-error', $event)" />
                    </div>
                    <div v-else-if="slot.media_type === 'video' && slot.video_url" class="absolute inset-0">
                      <video :src="slot.video_url" class="w-full h-full object-cover" controls autoplay loop muted :poster="slot.image_url || ''" @error="$emit('video-error', $event)"></video>
                    </div>
                    <div v-if="!slot.image_url && !slot.video_url" class="flex items-center justify-center h-full text-white/70 bg-black/30">
                      <span>Image Placeholder</span>
                    </div>
                  </div>
                </CometCard>
              </figure>

              <!-- Правая колонка: провайдер, h1, рейтинг, описание, CTA (desktop) -->
              <section class="flex-1 min-w-0">
                <!-- Provider (desktop) -->
                <section class="flex items-center gap-3 mb-6 flex-wrap">
                  <address class="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-purple-400/30 not-italic">
                    {{ slot.providers?.name || 'Pragmatic Play' }}
                  </address>
                </section>

                <!-- Главный заголовок (desktop) -->
                <h1 class="hidden lg:block text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-md">
                  <span>{{ slot.name || 'Slot' }}</span>
                </h1>

                <!-- Rating and voting (desktop) -->
                <section class="flex flex-wrap items-center gap-6 mb-8">
                  <div class="flex items-center gap-2">
                    <div class="flex text-yellow-400">
                      <svg v-for="n in 5" :key="n" class="w-6 h-6 drop-shadow-lg" :class="n <= Math.round(slot.rating || 4.5) ? 'text-yellow-400' : 'text-gray-400'" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                    <span class="text-white font-bold text-lg">{{ slot.rating || 4.5 }}</span>
                    <span class="text-white/60">/ 5</span>
                    <span class="text-white/40 text-sm ml-2">({{ formatNumber(slot.reviews_count || 100) }} reviews)</span>
                  </div>

                  <div v-if="slot.play_count && slot.play_count > 0" class="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-400/30">
                    <span class="text-sm font-bold text-orange-300">{{ formatNumber(slot.play_count) }} plays</span>
                  </div>

                  <button
                    class="px-4 py-2 rounded-full text-sm font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20"
                    @click="$emit('toggle-rating')"
                  >⭐ Rate</button>
                </section>

                <!-- Voting panel (desktop) -->
                <div v-if="showRatingPicker" class="mt-3 mb-6 p-4 bg-white/10 border border-white/20 rounded-xl">
                  <div class="flex items-center justify-between gap-4 flex-wrap">
                    <div class="flex items-center gap-3">
                      <button
                        class="px-3 py-1 rounded-full text-sm font-semibold bg-white/10 text-white/80 border border-white/20 hover:bg-white/20"
                        :class="{'bg-white/20 text-white': hoverStars === 0 || selectedStars === 0}"
                        @mouseenter="setHover(0)" @mouseleave="setHover(selectedStars ?? 0)" @click="$emit('pick-rating', 0)"
                      >0</button>
                      <div class="flex text-yellow-400">
                        <button
                          v-for="n in 5" :key="n"
                          class="w-6 h-6 cursor-pointer"
                          :class="[hoverStars >= n || (hoverStars === 0 && (selectedStars || 0) >= n) ? 'opacity-100 scale-110' : 'opacity-40']"
                          @mouseenter="setHover(n)" @mouseleave="setHover(selectedStars || 0)" @click="$emit('pick-rating', n)"
                        >
                          <svg fill="currentColor" viewBox="0 0 20 20" class="w-full h-full"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        </button>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <button
                        class="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500/90 hover:bg-emerald-500 text-white"
                        :disabled="selectedStars === null || ratingSubmitting"
                        @click="$emit('submit-rating')"
                      >{{ ratingSubmitting ? 'Submitting...' : 'Submit' }}</button>
                      <button class="px-4 py-2 rounded-xl text-sm font-bold bg-white/10 text-white" @click="$emit('toggle-rating')">Cancel</button>
                    </div>
                  </div>
                </div>

                <!-- 🖥️ Описание слота (desktop) -->
                <section class="mb-4 md:mb-5 lg:mb-6">
                  <p class="text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose text-justify text-white/90 font-normal tracking-wide max-w-prose">
                    <span class="text-white/85" v-html="shortDescriptionHtml"></span>
                  </p>
                </section>

                <!-- Game option buttons (desktop) -->
                <nav class="flex flex-col gap-4 w-full max-w-md mx-auto">
                  <BackgroundGradient :animate="true" className="rounded-2xl" containerClassName="w-full">
                    <component
                      :is="slot.demo_url ? 'a' : 'button'"
                      :href="slot.demo_url ? slot.demo_url : null"
                      target="_blank"
                      rel="nofollow noopener"
                      class="group relative w-full bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-sm border border-emerald-400/30 text-white text-lg font-black py-4 px-6 rounded-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.03] flex items-center justify-center gap-3"
                      @click="!slot.demo_url ? $emit('play-demo') : null"
                    >
                      <span class="relative z-10 whitespace-nowrap font-extrabold tracking-wide">Play Free Demo</span>
                      <span class="relative z-10 bg-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold border border-emerald-400/50 shadow-lg">DEMO</span>
                    </component>
                  </BackgroundGradient>

                  <BackgroundGradient :animate="true" className="rounded-2xl" containerClassName="w-full">
                    <component
                      :is="slot.real_play_url ? 'a' : 'button'"
                      :href="slot.real_play_url ? slot.real_play_url : null"
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      class="group relative w-full bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm border border-orange-400/30 text-white text-lg font-black py-4 px-6 rounded-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.03] flex items-center justify-center gap-3"
                      @click="!slot.real_play_url ? $emit('play-real') : null"
                    >
                      <span class="relative z-10 whitespace-nowrap font-extrabold tracking-wide">Play for Real Money</span>
                      <span class="relative z-10 bg-orange-500/30 text-xs px-3 py-1 rounded-full font-bold border border-orange-400/50 shadow-lg">REAL</span>
                    </component>
                  </BackgroundGradient>
                </nav>
              </section>
            </div>

            <!-- ЗДЕСЬ был мобильный плеер с кнопкой плей.
                 Я помещу его в слот, как и задумывалось, но нужно перенести UI?
                 Mobile image + Buttons -->
            <!-- Награды и достижения вырежем и оставим в основном слоте. -->

            <section class="mt-4 sm:mt-8">
               <slot name="after-hero"></slot>
            </section>

          </article>
        </AuroraBackground>
      </section>

      <!-- Правая панель уйдет в другой слот или компонент -->
      <slot name="right-column"></slot>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'

import AuroraBackground from '~/components/ui/AuroraBackground.vue'
import BackgroundGradient from '~/components/ui/BackgroundGradient.vue'
import CometCard from '~/components/ui/CometCard.vue'

import {
  formatNumber,
  formatMaxWin,
  formatPaylines,
  getAwardPublicClasses,
  getAwardBgClasses,
  getAwardIconClasses,
  getAwardTextClasses,
  getSlotIcon,
  getShortDescription
} from '@/utils/slotFormatters'

const props = defineProps({
  slot: {
    type: Object,
    required: true
  },
  showRatingPicker: {
    type: Boolean,
    default: false
  },
  hoverStars: {
    type: Number,
    default: 0
  },
  selectedStars: {
    type: Number,
    default: null
  },
  ratingSubmitting: {
    type: Boolean,
    default: false
  },
  ratingSubmitted: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'toggle-rating',
  'pick-rating',
  'submit-rating',
  'play-demo',
  'play-real',
  'image-error',
  'video-error',
  'hover-star'
])

// Refs & Computed

const slotThemes = computed(() => {
  if (!props.slot || !props.slot.slot_themes) return []
  return props.slot.slot_themes
    .filter(st => st.themes)
    .map(st => ({
      id: st.themes.id,
      name: st.themes.name,
      slug: st.themes.slug,
      icon: st.themes.icon
    }))
})

const shortDescriptionHtml = computed(() => getShortDescription(props.slot, true))
const shortDescriptionRaw = computed(() => getShortDescription(props.slot, false))

const hasStats = computed(() => {
  const s = props.slot
  return s.rtp || s.volatility || s.min_bet || s.max_win || s.reels || s.paylines
})

const volatilityClass = computed(() => {
  const v = props.slot.volatility?.toLowerCase()
  if (v === 'low') return 'text-green-400'
  if (v === 'medium') return 'text-yellow-400'
  if (v === 'medium-high') return 'text-orange-400'
  if (v === 'high') return 'text-red-400'
  return 'text-sky-400'
})

const maxWinFormatted = computed(() => formatMaxWin(props.slot.max_win))
const paylinesFormatted = computed(() => formatPaylines(props.slot.paylines))

const setHover = (n) => {
  emit('hover-star', n)
}

</script>
