
<template>
  <div
    class="min-h-screen bg-zinc-950"
  >
    <!-- 📱 Навигация - адаптивная для всех устройств с эффектом стекла -->
    <nav
      class="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-lg shadow-black/20"
    >
      <div class="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div class="flex items-center justify-between gap-2">
          <!-- Кнопка назад - компактная на mobile -->
          <NuxtLink
            to="/slots"
            class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm sm:text-base min-w-0"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span class="hidden xs:inline">Back to </span>Slots<span class="hidden sm:inline"> Catalog</span>
          </NuxtLink>

          <!-- Хлебные крошки - показываем на планшетах и выше -->
          <div class="hidden md:flex items-center text-xs sm:text-sm text-white/50 truncate">
            <NuxtLink to="/" class="hover:text-blue-400 transition-colors whitespace-nowrap"
              >Home</NuxtLink
            >
            <span class="mx-1 sm:mx-2">/</span>
            <NuxtLink to="/slots" class="hover:text-blue-400 transition-colors whitespace-nowrap"
              >Slots</NuxtLink
            >
            <span class="mx-1 sm:mx-2">/</span>
            <span class="text-white font-medium truncate max-w-[120px] lg:max-w-[200px]" v-if="slot">{{
              slot.name || 'Slot'
            }}</span>
          </div>

          <!-- Мобильные хлебные крошки - только название слота -->
          <div class="md:hidden text-xs text-white/70 truncate max-w-[140px] sm:max-w-[200px]" v-if="slot">
            {{ slot.name || 'Slot' }}
          </div>
        </div>
      </div>
    </nav>

    <!-- Загрузка -->
    <!-- 💀 Skeleton Loading -->
    <div v-if="loading" class="min-h-screen bg-zinc-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="container mx-auto">
        <div class="flex flex-col lg:flex-row gap-8 animate-pulse">
          <!-- Левая колонка (Основной контент) -->
          <div class="w-full lg:w-[70%] space-y-8">

            <!-- Mobile Layout (Visible only on mobile) -->
            <div class="lg:hidden space-y-6">
               <div class="h-8 w-3/4 bg-white/5 rounded-lg"></div>
               <div class="h-6 w-1/2 bg-white/5 rounded-full"></div>
               <div class="space-y-2">
                 <div class="h-4 w-full bg-white/5 rounded"></div>
                 <div class="h-4 w-full bg-white/5 rounded"></div>
                 <div class="h-4 w-2/3 bg-white/5 rounded"></div>
               </div>
               <div class="grid grid-cols-2 gap-3 mt-4">
                 <div class="h-10 bg-white/5 rounded-lg"></div>
                 <div class="h-10 bg-white/5 rounded-lg"></div>
                 <div class="h-10 bg-white/5 rounded-lg"></div>
                 <div class="h-10 bg-white/5 rounded-lg"></div>
               </div>
               <div class="h-12 w-full bg-white/5 rounded-xl mt-4"></div>
            </div>

            <!-- Desktop Layout (Visible only on desktop) -->
            <div class="hidden lg:flex gap-8 items-start">
               <!-- Portrait Image Column (2/5) -->
               <div class="w-2/5 aspect-[3/4] bg-white/5 rounded-2xl border border-white/5"></div>

               <!-- Content Column (3/5) -->
               <div class="flex-1 space-y-6">
                 <div class="h-8 w-1/3 bg-white/5 rounded-full"></div>
                 <div class="h-12 w-3/4 bg-white/5 rounded-xl"></div>
                 <div class="space-y-3">
                   <div class="h-4 w-full bg-white/5 rounded"></div>
                   <div class="h-4 w-full bg-white/5 rounded"></div>
                   <div class="h-4 w-5/6 bg-white/5 rounded"></div>
                 </div>
                 <div class="flex gap-4 pt-4">
                   <div class="h-14 w-40 bg-white/5 rounded-xl"></div>
                   <div class="h-14 w-40 bg-white/5 rounded-xl"></div>
                 </div>
               </div>
            </div>

             <!-- Bottom Content (Common) -->
             <div class="hidden lg:grid grid-cols-2 gap-6 mt-8">
                 <div class="h-32 bg-white/5 rounded-2xl"></div>
                 <div class="h-32 bg-white/5 rounded-2xl"></div>
             </div>

          </div>

          <!-- Правая колонка (Сайдбар) -->
          <div class="hidden lg:block w-[30%] space-y-6">
            <div class="w-full h-80 bg-white/5 rounded-3xl border border-white/5"></div>
            <div class="w-full h-96 bg-white/5 rounded-3xl border border-white/5"></div>
          </div>
        </div>
      </div>
    </div>


    <!-- Ошибка -->
    <div
      v-else-if="error"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center max-w-md mx-auto px-4">
        <div class="text-red-500 mb-6">
          <svg
            class="w-20 h-20 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
          <h2 class="text-3xl font-bold mb-4 text-gray-800">Slot Not Found</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
        </div>
        <NuxtLink
          to="/slots"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors font-semibold"
        >
          Go to Catalog
        </NuxtLink>
      </div>
    </div>

    <!-- 📱 Hero секция - полностью адаптивная -->
    <main
      v-else-if="slot"
      role="main"
      class="relative min-h-screen bg-zinc-950 text-slate-100 border border-white/10"
    >
      <!-- Анимированный фон - скрываем на очень маленьких экранах для производительности -->
      <div class="absolute inset-0 overflow-hidden hidden xs:block" aria-hidden="true">
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-beam transform skew-x-12"
        ></div>
        <div
          class="absolute top-0 left-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-40 sm:w-56 md:w-72 lg:w-80 h-40 sm:h-56 md:h-72 lg:h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style="animation-delay: 1s"
        ></div>
        <div
          class="absolute top-1/2 left-1/3 w-32 sm:w-48 md:w-56 lg:w-64 h-32 sm:h-48 md:h-56 lg:h-64 bg-pink-500/15 rounded-full blur-2xl animate-pulse"
          style="animation-delay: 2s"
        ></div>
      </div>

      <!-- Декоративные элементы - адаптивные размеры и позиции -->
      <div
        class="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 text-white/10 text-4xl sm:text-5xl md:text-6xl lg:text-8xl animate-float"
        aria-hidden="true"
      >
        ⚡
      </div>
      <div
        class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 text-white/10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-float"
        style="animation-delay: 1.5s"
        aria-hidden="true"
      >
        🏛️
      </div>
      <div
        class="absolute top-1/3 right-1/4 text-white/10 text-2xl sm:text-3xl md:text-4xl animate-float hidden sm:block"
        style="animation-delay: 3s"
        aria-hidden="true"
      >
        💎
      </div>

      <div class="relative z-10 max-w-full flex flex-col lg:flex-row lg:min-h-screen">
        <!-- 📱 Левая часть: Игровая информация с Aurora Background (в dark-контейнере) -->
        <section
          class="dark w-full lg:w-[70%] lg:sticky lg:top-0 lg:self-start order-1"
        >
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
              <!-- 🎯 SEO: Дополнительные мета-теги для Game schema -->
              <!-- Genre теги - динамически генерируются из тематик слота -->
              <template v-if="getSlotThemesFromDB(slot).length > 0">
                <meta
                  v-for="theme in getSlotThemesFromDB(slot)"
                  :key="`game-genre-${theme.id}`"
                  itemprop="genre"
                  :content="theme.name"
                />
              </template>
              <!-- Fallback если тематик нет -->
              <meta
                v-else
                itemprop="genre"
                :content="slot.hero_keyword || 'Slot Game'"
              />
              <meta
                itemprop="datePublished"
                :content="slot.release_date || '2024-01-01'"
              />
              <meta
                itemprop="inLanguage"
                :content="slot.content_language || 'en'"
              />
              <meta
                itemprop="isAccessibleForFree"
                :content="slot.demo_url ? 'true' : 'false'"
              />
              <link
                itemprop="url"
                :href="`https://slotquest.com/slots/${slot.slug}`"
              />

              <!-- Title and main information -->
              <header class="mb-2 xs:mb-3 sm:mb-4 lg:mb-8" role="banner">
                <!-- Provider (mobile version) -->
                <section
                  class="flex items-center gap-3 mb-3 sm:mb-4 flex-wrap lg:hidden"
                  aria-labelledby="provider-label"
                  role="region"
                  itemprop="provider"
                  itemscope
                  itemtype="https://schema.org/Organization"
                >
                  <meta
                    itemprop="name"
                    :content="slot.providers?.name || 'Pragmatic Play'"
                  />
                  <link
                    v-if="slot.providers?.website"
                    itemprop="url"
                    :href="slot.providers.website"
                  />
                  <h2 id="provider-label" class="sr-only">
                    Game Provider Information
                  </h2>
                  <address
                    class="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-purple-400/30 not-italic transition-all duration-300 hover:from-purple-500/40 hover:to-pink-500/40 hover:border-purple-400/50"
                    role="contentinfo"
                    aria-label="Game developer and publisher information"
                  >
                    <span
                      class="font-semibold"
                      title="Game Provider"
                      itemprop="name"
                    >
                      {{ slot.providers?.name || 'Pragmatic Play' }}
                    </span>
                  </address>
                </section>

                <!-- 📱 Главный заголовок - адаптивные размеры для всех устройств -->
                <h1
                  id="slot-title"
                  class="text-xl xs:text-2xl sm:text-3xl lg:hidden font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent mb-1 xs:mb-2 sm:mb-3 leading-tight drop-shadow-md transition-all duration-500"
                  style="line-height: 1.3"
                  tabindex="0"
                  role="heading"
                  aria-level="1"
                  :aria-label="`${slot.name || 'Slot'} - Online slot game`"
                  itemprop="name"
                >
                  <span class="block sm:inline" itemprop="headline">{{ slot.name || 'Slot' }}</span>
                  <span
                    v-if="slot.providers?.name"
                    class="hidden sm:inline text-base sm:text-lg font-medium opacity-90"
                  >
                    by <span itemprop="creator">{{ slot.providers.name }}</span>
                  </span>
                  <span
                    v-if="slot.rtp"
                    class="hidden sm:inline text-sm sm:text-base font-normal opacity-80"
                  >
                    • RTP <span>{{ slot.rtp }}%</span>
                  </span>
                </h1>

                <!-- 📱 Slot description (mobile version) - Полностью адаптивное -->
                <section
                  class="lg:hidden mb-2 xs:mb-3 sm:mb-4"
                  role="region"
                  aria-labelledby="slot-description"
                >
                  <div
                    id="slot-description"
                    class="space-y-1.5 xs:space-y-2 sm:space-y-2.5"
                    role="text"
                    aria-label="Detailed slot machine description with specifications"
                  >
                    <!-- 🎯 SEO: description с microdata для Google -->
                    <meta
                      itemprop="description"
                      :content="getShortDescription(slot, false)"
                    />

                    <!-- 📝 Основное SEO-описание с улучшенной типографикой -->
                    <p
                      class="text-sm xs:text-base sm:text-lg leading-relaxed xs:leading-relaxed sm:leading-loose text-justify text-white/90 font-normal tracking-wide"
                      style="text-align-last: left; hyphens: auto;"
                    >
                      <!-- 🎯 SEO: v-html позволяет отображать <strong> теги для выделения keywords -->
                      <span
                        class="text-white/85"
                        v-html="getShortDescription(slot)"
                      ></span>
                    </p>

                    <!-- 📊 Характеристики с Schema.org microdata - полная SEO оптимизация -->
                    <section
                      class="flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 pt-1 xs:pt-2"
                      v-if="slot.rtp || slot.volatility || slot.min_bet || slot.max_win || slot.reels || slot.paylines"
                      role="region"
                      aria-label="Game specifications and technical characteristics"
                      itemscope
                      itemtype="https://schema.org/PropertyValueSpecification"
                    >
                      <!-- 🎯 SEO: RTP (Return to Player) -->
                      <span
                        v-if="slot.rtp"
                        class="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-white/10 backdrop-blur-sm rounded-md xs:rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
                        itemprop="additionalProperty"
                        itemscope
                        itemtype="https://schema.org/PropertyValue"
                        role="listitem"
                        :aria-label="`Return to Player: ${slot.rtp} percent`"
                      >
                        <meta itemprop="name" content="Return to Player (RTP)" />
                        <meta itemprop="value" :content="String(slot.rtp)" />
                        <meta itemprop="unitCode" content="P1" />
                        <span class="text-[10px] xs:text-xs sm:text-sm font-medium text-white/70" aria-hidden="true">RTP:</span>
                        <span class="text-xs xs:text-sm sm:text-base font-bold text-emerald-400">{{ slot.rtp }}%</span>
                      </span>

                      <!-- 🎯 SEO: Volatility / Variance -->
                      <span
                        v-if="slot.volatility"
                        class="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-white/10 backdrop-blur-sm rounded-md xs:rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
                        itemprop="additionalProperty"
                        itemscope
                        itemtype="https://schema.org/PropertyValue"
                        role="listitem"
                        :aria-label="`Volatility level: ${slot.volatility}`"
                      >
                        <meta itemprop="name" content="Volatility" />
                        <meta itemprop="value" :content="slot.volatility" />
                        <span class="text-[10px] xs:text-xs sm:text-sm font-medium text-white/70" aria-hidden="true">Vol:</span>
                        <span
                          class="text-xs xs:text-sm sm:text-base font-bold capitalize"
                          :class="{
                            'text-green-400': slot.volatility?.toLowerCase() === 'low',
                            'text-yellow-400': slot.volatility?.toLowerCase() === 'medium',
                            'text-orange-400': slot.volatility?.toLowerCase() === 'medium-high',
                            'text-red-400': slot.volatility?.toLowerCase() === 'high',
                            'text-sky-400': !['low', 'medium', 'medium-high', 'high'].includes(slot.volatility?.toLowerCase())
                          }"
                        >{{ slot.volatility }}</span>
                      </span>

                      <!-- 🎯 SEO: Max Win (ключевой показатель!) -->
                      <span
                        v-if="slot.max_win"
                        class="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-md xs:rounded-lg border border-yellow-400/30 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all"
                        itemprop="additionalProperty"
                        itemscope
                        itemtype="https://schema.org/PropertyValue"
                        role="listitem"
                        :aria-label="`Maximum win: ${formatMaxWin(slot.max_win)} times your bet`"
                      >
                        <meta itemprop="name" content="Maximum Win Multiplier" />
                        <meta itemprop="value" :content="String(slot.max_win)" />
                        <meta itemprop="unitText" content="x bet" />
                        <span class="text-[10px] xs:text-xs sm:text-sm font-medium text-yellow-300/80" aria-hidden="true">Max:</span>
                        <span class="text-xs xs:text-sm sm:text-base font-bold text-yellow-400">{{ formatMaxWin(slot.max_win) }}x</span>
                      </span>

                      <!-- 🎯 SEO: Game Layout (Reels × Rows) -->
                      <span
                        v-if="slot.reels && slot.rows"
                        class="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-white/10 backdrop-blur-sm rounded-md xs:rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
                        itemprop="additionalProperty"
                        itemscope
                        itemtype="https://schema.org/PropertyValue"
                        role="listitem"
                        :aria-label="`Game layout: ${slot.reels} reels by ${slot.rows} rows`"
                      >
                        <meta itemprop="name" content="Game Layout" />
                        <meta itemprop="value" :content="`${slot.reels}x${slot.rows}`" />
                        <span class="text-[10px] xs:text-xs sm:text-sm font-medium text-white/70" aria-hidden="true">Layout:</span>
                        <span class="text-xs xs:text-sm sm:text-base font-bold text-purple-400">{{ slot.reels }}×{{ slot.rows }}</span>
                      </span>

                      <!-- 🎯 SEO: Paylines / Ways -->
                      <span
                        v-if="slot.paylines"
                        class="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-white/10 backdrop-blur-sm rounded-md xs:rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
                        itemprop="additionalProperty"
                        itemscope
                        itemtype="https://schema.org/PropertyValue"
                        role="listitem"
                        :aria-label="`${formatPaylines(slot.paylines)} pay lines or ways to win`"
                      >
                        <meta itemprop="name" content="Paylines" />
                        <meta itemprop="value" :content="String(slot.paylines)" />
                        <span class="text-[10px] xs:text-xs sm:text-sm font-medium text-white/70" aria-hidden="true">Lines:</span>
                        <span class="text-xs xs:text-sm sm:text-base font-bold text-cyan-400">{{ formatPaylines(slot.paylines) }}</span>
                      </span>

                      <!-- 🎯 SEO: Min Bet -->
                      <span
                        v-if="slot.min_bet"
                        class="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-white/10 backdrop-blur-sm rounded-md xs:rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
                        itemprop="additionalProperty"
                        itemscope
                        itemtype="https://schema.org/PropertyValue"
                        role="listitem"
                        :aria-label="`Minimum bet: ${slot.min_bet} currency units`"
                      >
                        <meta itemprop="name" content="Minimum Bet" />
                        <meta itemprop="value" :content="String(slot.min_bet)" />
                        <meta itemprop="unitCode" content="currency" />
                        <span class="text-[10px] xs:text-xs sm:text-sm font-medium text-white/70" aria-hidden="true">Min:</span>
                        <span class="text-xs xs:text-sm sm:text-base font-bold text-amber-400">{{ slot.min_bet }}</span>
                      </span>

                      <!-- 🎯 SEO: Max Bet (если есть) -->
                      <span
                        v-if="slot.max_bet"
                        class="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 bg-white/10 backdrop-blur-sm rounded-md xs:rounded-lg border border-white/20 hover:bg-white/15 transition-colors"
                        itemprop="additionalProperty"
                        itemscope
                        itemtype="https://schema.org/PropertyValue"
                        role="listitem"
                        :aria-label="`Maximum bet: ${slot.max_bet} currency units`"
                      >
                        <meta itemprop="name" content="Maximum Bet" />
                        <meta itemprop="value" :content="String(slot.max_bet)" />
                        <meta itemprop="unitCode" content="currency" />
                        <span class="text-[10px] xs:text-xs sm:text-sm font-medium text-white/70" aria-hidden="true">Max Bet:</span>
                        <span class="text-xs xs:text-sm sm:text-base font-bold text-rose-400">{{ slot.max_bet }}</span>
                      </span>
                    </section>
                  </div>
                </section>

                <!-- Rating and voting (mobile version) - полностью динамическое -->
                <div
                  class="flex flex-wrap items-center gap-4 mb-2 xs:mb-3 lg:hidden"
                  role="group"
                  aria-label="Rating, popularity and voting"
                  itemprop="aggregateRating"
                  itemscope
                  itemtype="https://schema.org/AggregateRating"
                >
                  <!-- 🎯 SEO: Meta-теги для Google Rich Snippets -->
                  <meta itemprop="ratingValue" :content="String(slot.rating || 4.5)" />
                  <meta itemprop="bestRating" content="5" />
                  <meta itemprop="worstRating" content="1" />
                  <meta itemprop="ratingCount" :content="String(slot.reviews_count || 100)" />
                  <meta itemprop="reviewCount" :content="String(slot.reviews_count || 100)" />

                  <!-- 🎯 SEO: itemReviewed - связь рейтинга с игрой -->
                  <span itemprop="itemReviewed" itemscope itemtype="https://schema.org/Game" class="hidden">
                    <meta itemprop="name" :content="slot.name" />
                    <link itemprop="url" :href="`https://slotquest.com/slots/${slot.slug}`" />
                  </span>

                  <!-- Current rating - динамическое -->
                  <div
                    class="flex items-center gap-2"
                    :aria-label="`Rating ${slot.rating || 4.5} out of 5 stars`"
                  >
                    <!-- Динамические звёзды -->
                    <div class="flex text-yellow-400" aria-hidden="true">
                      <svg
                        v-for="n in 5"
                        :key="n"
                        class="w-6 h-6 xs:w-7 xs:h-7 drop-shadow-lg"
                        :class="n <= Math.round(slot.rating || 4.5) ? 'text-yellow-400' : 'text-gray-400'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </div>
                    <span class="text-white font-bold text-lg">{{ slot.rating || 4.5 }}</span>
                    <span class="text-white/50 text-sm">({{ formatNumber(slot.reviews_count || 100) }})</span>
                  </div>

                  <!-- 🔥 Popularity (mobile) -->
                  <div
                    v-if="slot.play_count && slot.play_count > 100"
                    class="flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/20 rounded-full border border-orange-400/30"
                  >
                    <span class="text-xs font-bold text-orange-300">🔥 {{ formatNumber(slot.play_count) }}</span>
                  </div>

                  <!-- Vote button с Schema.org VoteAction -->
                  <button
                    class="px-3 py-1.5 rounded-full text-sm font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
                    @click="toggleRatingPicker"
                    :aria-expanded="showRatingPicker"
                    aria-controls="rating-picker"
                    aria-describedby="vote-description-mobile"
                    type="button"
                    itemprop="potentialAction"
                    itemscope
                    itemtype="https://schema.org/VoteAction"
                  >
                    <meta itemprop="name" content="Rate this slot game" />
                    <meta itemprop="actionStatus" content="https://schema.org/PotentialActionStatus" />
                    <span itemprop="target" itemscope itemtype="https://schema.org/EntryPoint" class="hidden">
                      <meta itemprop="urlTemplate" :content="`https://slotquest.com/slots/${slot.slug}#rate`" />
                    </span>
                    ⭐ Rate
                  </button>
                  <span id="vote-description-mobile" class="sr-only">Click to rate this slot from 0 to 5 stars</span>
                </div>

                <!-- Voting panel (mobile version) -->
                <div
                  v-if="showRatingPicker"
                  id="rating-picker"
                  class="mt-3 p-4 bg-white/10 border border-white/20 rounded-xl lg:hidden"
                  role="dialog"
                  aria-label="Slot rating panel"
                >
                  <div
                    class="flex items-center justify-between gap-4 flex-wrap"
                  >
                    <div
                      class="flex items-center gap-3"
                      role="radiogroup"
                      aria-label="Choose rating from 0 до 5 stars"
                    >
                      <button
                        class="px-3 py-1 rounded-full text-sm font-semibold bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                        :class="{
                          'bg-white/20 text-white':
                            hoverStars === 0 || selectedStars === 0,
                        }"
                        @mouseenter="setHover(0)"
                        @mouseleave="setHover(selectedStars ?? 0)"
                        @click="pickRating(0)"
                        role="radio"
                        :aria-checked="selectedStars === 0"
                        aria-label="0 stars"
                        type="button"
                      >
                        0
                      </button>
                      <div class="flex text-yellow-400">
                        <button
                          v-for="n in 5"
                          :key="n"
                          class="w-7 h-7 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 rounded"
                          :class="[
                            hoverStars >= n ||
                            (hoverStars === 0 && (selectedStars || 0) >= n)
                              ? 'opacity-100 scale-110'
                              : 'opacity-40',
                          ]"
                          @mouseenter="setHover(n)"
                          @mouseleave="setHover(selectedStars || 0)"
                          @click="pickRating(n)"
                          role="radio"
                          :aria-checked="selectedStars === n"
                          :aria-label="`${n} stars${n === 1 ? 'а' : n < 5 ? 'ы' : ''}`"
                          type="button"
                        >
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            class="w-full h-full"
                            aria-hidden="true"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <button
                        class="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        :disabled="selectedStars === null || ratingSubmitting"
                        @click="submitRating"
                        type="button"
                        :aria-label="
                          ratingSubmitting
                            ? 'Submitting rating'
                            : 'Submit your rating'
                        "
                      >
                        {{ ratingSubmitting ? 'Submitting…' : 'Submit' }}
                      </button>
                      <div
                        v-if="ratingSubmitted"
                        class="flex items-center gap-2 text-emerald-300 font-semibold"
                        role="status"
                        aria-live="polite"
                      >
                        <span aria-hidden="true">✔</span>
                        <span>Vote counted!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <!-- Медиа + описание + кнопки (Desktop: в ряд) -->
              <div class="hidden lg:flex gap-6 items-start mb-8">
                <!-- Вертикальная обложка (портрет 3:4) -->
                <figure class="w-2/5">
                  <CometCard
                    :rotate-depth="17.5"
                    :translate-depth="20"
                    containerClassName="w-full h-full rounded-2xl"
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden backdrop-blur-md border border-white/20 shadow-2xl"
                  >
                    <div
                      class="absolute inset-0"
                      role="img"
                      :aria-label="`Game preview ${slot.name || 'slot'}`"
                    >
                      <!-- Изображение slotа (desktop) -->

                      <!-- Внутренние градиенты поверх медиаконтента -->
                      <div
                        class="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-blue-500/10 pointer-events-none"
                        aria-hidden="true"
                      />
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
                        aria-hidden="true"
                      />

                      <!-- Медиа контент: изображение или видео -->
                      <div
                        v-if="slot.media_type === 'image' && slot.image_url"
                        class="absolute inset-0"
                        itemprop="image"
                        itemscope
                        itemtype="https://schema.org/ImageObject"
                      >
                        <!-- 🎯 SEO: Метаданные изображения для Google -->
                        <meta itemprop="url" :content="slot.image_url" />
                        <meta itemprop="contentUrl" :content="slot.image_url" />
                        <meta itemprop="thumbnail" :content="slot.image_url" />
                        <meta
                          itemprop="name"
                          :content="`${slot.name} - Slot Screenshot`"
                        />
                        <meta
                          itemprop="description"
                          :content="`High-quality screenshot of ${slot.name} slot game from ${slot.providers?.name || 'provider'}`"
                        />
                        <meta
                          itemprop="caption"
                          :content="`${slot.name} slot machine gameplay`"
                        />
                        <!-- 🎯 SEO: Дополнительные метаданные для максимальной оптимизации -->
                        <meta itemprop="representativeOfPage" content="true" />
                        <meta itemprop="encodingFormat" :content="getImageFormat(slot.image_url)" />
                        <meta itemprop="uploadDate" :content="slot.created_at || new Date().toISOString()" />
                        <meta itemprop="width" content="1200" />
                        <meta itemprop="height" content="630" />

                        <img
                          :src="slot.image_url"
                          :alt="`${slot.name} - Slot Screenshot | ${slot.providers?.name || 'Provider'} | Play Free Demo`"
                          class="w-full h-full object-cover"
                          :style="`object-position: ${slot.image_focus_point || 'center 20%'}`"
                          loading="eager"
                          decoding="async"
                          fetchpriority="high"
                          itemprop="contentUrl"
                          @error="handleSlotImageError"
                        />
                      </div>
                      <div
                        v-else-if="
                          slot.media_type === 'video' && slot.video_url
                        "
                        class="absolute inset-0"
                      >
                        <video
                          :src="slot.video_url"
                          class="w-full h-full object-cover"
                          controls
                          autoplay
                          loop
                          muted
                          preload="metadata"
                          :poster="slot.image_url || ''"
                          @error="handleSlotVideoError"
                        >
                          <source :src="slot.video_url" type="video/mp4" />
                          <source
                            :src="
                              slot.video_url &&
                              slot.video_url.replace('.mp4', '.webm')
                            "
                            type="video/webm"
                          />
                        </video>
                      </div>

                      <!-- Плейсхолдер -->
                      <div
                        v-if="!slot.image_url && !slot.video_url"
                        class="flex items-center justify-center h-full text-white/70 bg-black/30"
                      >
                        <span>Изображение slotа</span>
                      </div>
                    </div>
                  </CometCard>
                </figure>

                <!-- Правая колонка: провайдер, h1, рейтинг, описание, CTA (desktop) -->
                <section class="flex-1 min-w-0">
                  <!-- Provider (desktop) - SEO оптимизированный с полной Schema.org разметкой -->
                  <section
                    class="flex items-center gap-3 mb-6 flex-wrap"
                    aria-labelledby="provider-label-desktop"
                    role="region"
                    itemprop="provider"
                    itemscope
                    itemtype="https://schema.org/Organization"
                  >
                    <!-- 🎯 SEO: Meta-теги для Schema.org Organization -->
                    <meta itemprop="name" :content="slot.providers?.name || 'Pragmatic Play'" />
                    <link
                      v-if="slot.providers?.website"
                      itemprop="url"
                      :href="slot.providers.website"
                    />
                    <link
                      v-if="slot.providers?.slug"
                      itemprop="sameAs"
                      :href="`https://slotquest.com/providers/${slot.providers.slug}`"
                    />

                    <h3 id="provider-label-desktop" class="sr-only">
                      Game Provider Information
                    </h3>
                    <address
                      class="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-purple-400/30 not-italic transition-all duration-300 hover:from-purple-500/40 hover:to-pink-500/40 hover:border-purple-400/50"
                      role="contentinfo"
                      aria-label="Game developer and publisher information"
                    >
                      <span
                        class="font-semibold"
                        title="Game Provider"
                        itemprop="name"
                      >
                        {{ slot.providers?.name || 'Pragmatic Play' }}
                      </span>
                    </address>
                  </section>

                  <!-- Главный заголовок (desktop) - SEO оптимизированный -->
                  <h1
                    class="hidden lg:block text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-md transition-all duration-500"
                    style="line-height: 1.3"
                    tabindex="0"
                    role="heading"
                    aria-level="1"
                    :aria-label="`${slot.name || 'Slot'} - Online slot game by ${slot.providers?.name || 'Provider'}`"
                    aria-describedby="game-description"
                    itemprop="name"
                  >
                    <span itemprop="headline">{{ slot.name || 'Slot' }}</span>
                  </h1>

                  <!-- Rating and voting (desktop) - полностью динамическое с Schema.org -->
                  <section
                    class="flex flex-wrap items-center gap-6 mb-8"
                    role="group"
                    aria-label="Rating, popularity and voting"
                    itemprop="aggregateRating"
                    itemscope
                    itemtype="https://schema.org/AggregateRating"
                  >
                    <!-- 🎯 SEO: Meta-теги для Google Rich Snippets -->
                    <meta itemprop="ratingValue" :content="String(slot.rating || 4.5)" />
                    <meta itemprop="bestRating" content="5" />
                    <meta itemprop="worstRating" content="1" />
                    <meta itemprop="ratingCount" :content="String(slot.reviews_count || 100)" />
                    <meta itemprop="reviewCount" :content="String(slot.reviews_count || 100)" />

                    <!-- 🎯 SEO: itemReviewed - связь рейтинга с игрой -->
                    <span itemprop="itemReviewed" itemscope itemtype="https://schema.org/Game" class="hidden">
                      <meta itemprop="name" :content="slot.name" />
                      <link itemprop="url" :href="`https://slotquest.com/slots/${slot.slug}`" />
                    </span>

                    <!-- Current rating - динамическое -->
                    <div
                      class="flex items-center gap-2"
                      role="img"
                      :aria-label="`Rating ${slot.rating || 4.5} out of 5 stars based on ${slot.reviews_count || 100} reviews`"
                    >
                      <!-- Динамические звёзды -->
                      <div
                        class="flex text-yellow-400"
                        role="presentation"
                        aria-hidden="true"
                        :title="`${slot.rating || 4.5} stars out of 5`"
                      >
                        <svg
                          v-for="n in 5"
                          :key="n"
                          class="w-6 h-6 drop-shadow-lg transition-colors duration-200"
                          :class="n <= Math.round(slot.rating || 4.5) ? 'text-yellow-400' : 'text-gray-400'"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      </div>
                      <span class="text-white font-bold text-lg">{{ slot.rating || 4.5 }}</span>
                      <span class="text-white/60">/ 5</span>
                      <span
                        class="text-white/40 text-sm ml-2"
                        :title="`Based on ${slot.reviews_count || 100} user reviews`"
                      >
                        ({{ formatNumber(slot.reviews_count || 100) }} reviews)
                      </span>
                    </div>

                    <!-- 🔥 Popularity indicator (если есть play_count) -->
                    <div
                      v-if="slot.play_count && slot.play_count > 0"
                      class="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-400/30"
                      role="status"
                      :aria-label="`Played ${formatNumber(slot.play_count)} times`"
                    >
                      <svg class="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
                      </svg>
                      <span class="text-sm font-bold text-orange-300">{{ formatNumber(slot.play_count) }} plays</span>
                    </div>

                    <!-- 📊 InteractionCounter для отзывов -->
                    <span
                      itemprop="interactionStatistic"
                      itemscope
                      itemtype="https://schema.org/InteractionCounter"
                      class="hidden"
                    >
                      <meta itemprop="interactionType" content="https://schema.org/ReviewAction" />
                      <meta itemprop="userInteractionCount" :content="String(slot.reviews_count || 100)" />
                    </span>

                    <!-- Vote button с Schema.org VoteAction -->
                    <button
                      class="px-4 py-2 rounded-full text-sm font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                      @click="toggleRatingPicker"
                      :aria-expanded="showRatingPicker"
                      aria-controls="rating-picker-desktop"
                      aria-describedby="vote-description-desktop"
                      type="button"
                      :aria-label="`Rate ${slot?.name || 'this slot'} - current rating ${slot.rating || 4.5}/5`"
                      :title="`Rate ${slot?.name || 'this slot'}`"
                      itemprop="potentialAction"
                      itemscope
                      itemtype="https://schema.org/VoteAction"
                    >
                      <meta itemprop="name" content="Rate this slot game" />
                      <meta itemprop="description" content="Submit your rating from 0 to 5 stars" />
                      <meta itemprop="actionStatus" content="https://schema.org/PotentialActionStatus" />
                      <span itemprop="target" itemscope itemtype="https://schema.org/EntryPoint" class="hidden">
                        <meta itemprop="urlTemplate" :content="`https://slotquest.com/slots/${slot.slug}#rate`" />
                        <meta itemprop="actionPlatform" content="https://schema.org/DesktopWebPlatform" />
                      </span>
                      <span aria-hidden="true">⭐ Rate</span>
                    </button>
                    <span id="vote-description-desktop" class="sr-only">Click to rate this slot from 0 to 5 stars. Your vote affects the overall rating.</span>
                  </section>

                  <!-- Voting panel (desktop) -->
                  <div
                    v-if="showRatingPicker"
                    id="rating-picker-desktop"
                    class="mt-3 mb-6 p-4 bg-white/10 border border-white/20 rounded-xl"
                    role="dialog"
                    aria-label="Slot rating panel"
                  >
                    <div
                      class="flex items-center justify-between gap-4 flex-wrap"
                    >
                      <div
                        class="flex items-center gap-3"
                        role="radiogroup"
                        aria-label="Choose rating from 0 до 5 stars"
                      >
                        <button
                          class="px-3 py-1 rounded-full text-sm font-semibold bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                          :class="{
                            'bg-white/20 text-white':
                              hoverStars === 0 || selectedStars === 0,
                          }"
                          @mouseenter="setHover(0)"
                          @mouseleave="setHover(selectedStars ?? 0)"
                          @click="pickRating(0)"
                          role="radio"
                          :aria-checked="selectedStars === 0"
                          aria-label="0 stars"
                          type="button"
                        >
                          0
                        </button>
                        <div class="flex text-yellow-400">
                          <button
                            v-for="n in 5"
                            :key="n"
                            class="w-6 h-6 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 rounded"
                            :class="[
                              hoverStars >= n ||
                              (hoverStars === 0 && (selectedStars || 0) >= n)
                                ? 'opacity-100 scale-110'
                                : 'opacity-40',
                            ]"
                            @mouseenter="setHover(n)"
                            @mouseleave="setHover(selectedStars || 0)"
                            @click="pickRating(n)"
                            role="radio"
                            :aria-checked="selectedStars === n"
                            :aria-label="`${n} stars${n === 1 ? 'а' : n < 5 ? 'ы' : ''}`"
                            type="button"
                          >
                            <svg
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              class="w-full h-full"
                              aria-hidden="true"
                            >
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <button
                          class="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-400"
                          :disabled="selectedStars === null || ratingSubmitting"
                          @click="submitRating"
                          type="button"
                        >
                          {{ ratingSubmitting ? 'Submitting...' : 'Submit' }}
                        </button>
                        <button
                          class="px-4 py-2 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                          @click="toggleRatingPicker"
                          type="button"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- 🖥️ Описание slotа (desktop) - SEO оптимизированное с улучшенной типографикой -->
                  <section
                    class="mb-4 md:mb-5 lg:mb-6"
                    role="region"
                    aria-labelledby="slot-description-desktop"
                    itemprop="abstract"
                  >
                    <!-- 🎯 SEO: Meta description для Schema.org -->
                    <meta itemprop="description" :content="getShortDescription(slot, false)" />

                    <p
                      id="slot-description-desktop"
                      class="text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose text-justify text-white/90 font-normal tracking-wide max-w-prose"
                      style="text-align-last: left; hyphens: auto;"
                      role="text"
                      aria-label="Slot game description"
                    >
                      <!-- 🎯 SEO: v-html для отображения <strong> тегов вокруг keywords -->
                      <span class="text-white/85" v-html="getShortDescription(slot)"></span>
                    </p>
                  </section>

                  <!-- Game option buttons (desktop) -->
                  <nav
                    class="flex flex-col gap-4 w-full max-w-md mx-auto"
                    role="navigation"
                    aria-label="Game options"
                  >
                    <!-- Demo game button with full SEO markup + Offer schema -->
                    <BackgroundGradient
                      :animate="true"
                      className="rounded-2xl"
                      containerClassName="w-full"
                      itemprop="offers"
                      itemscope
                      itemtype="https://schema.org/Offer"
                    >
                      <!-- 🎯 SEO: Demo Offer метаданные -->
                      <meta
                        itemprop="name"
                        :content="`${slot.name} - Free Demo`"
                      />
                      <meta
                        itemprop="description"
                        :content="`Play ${slot.name} for free in demo mode. No deposit required.`"
                      />
                      <meta itemprop="price" content="0" />
                      <meta itemprop="priceCurrency" content="USD" />
                      <link itemprop="url" :href="slot.demo_url || '#'" />
                      <link
                        itemprop="availability"
                        href="https://schema.org/InStock"
                      />

                      <a
                        v-if="slot.demo_url && slot.demo_url.trim()"
                        :href="slot.demo_url"
                        target="_blank"
                        rel="nofollow noopener"
                        class="group relative w-full bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-sm border border-emerald-400/30 text-white text-lg font-black py-4 px-6 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-emerald-500/60 transform hover:-translate-y-2 hover:scale-[1.03] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-emerald-400/50 active:scale-[0.98] min-h-[60px] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                        :aria-label="`Play ${slot.name} free demo mode`"
                        itemprop="url"
                        :data-game-name="slot.name"
                        :data-game-provider="slot.provider?.name"
                        :data-game-category="slot.category?.name"
                        :data-game-type="'demo'"
                        :data-game-url="slot.demo_url"
                        data-action-type="demo-play"
                        data-cost="free"
                        data-currency="none"
                        data-risk-level="none"
                        data-age-restriction="18+"
                        data-game-mode="demo"
                        data-requires-registration="false"
                        data-requires-deposit="false"
                      >
                        <svg
                          class="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span
                          class="relative z-10 whitespace-nowrap font-extrabold tracking-wide"
                          >Play Free Demo</span
                        >
                        <span
                          class="relative z-10 bg-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold border border-emerald-400/50 shadow-lg"
                          aria-label="Demo mode"
                        >
                          DEMO
                        </span>
                      </a>
                      <button
                        v-else
                        class="group relative w-full bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-sm border border-emerald-400/30 text-white text-lg font-black py-4 px-6 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-emerald-500/60 transform hover:-translate-y-2 hover:scale-[1.03] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-emerald-400/50 active:scale-[0.98] min-h-[60px] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                        @click="playSlot"
                        type="button"
                        :aria-label="`Play ${slot.name} free demo mode`"
                        :data-game-name="slot.name"
                        :data-game-provider="slot.provider?.name"
                        :data-game-category="slot.category?.name"
                        :data-game-type="'demo'"
                        data-action-type="demo-play"
                        data-cost="free"
                        data-currency="none"
                        data-risk-level="none"
                        data-age-restriction="18+"
                        data-game-mode="demo"
                        data-requires-registration="false"
                        data-requires-deposit="false"
                      >
                        <svg
                          class="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span
                          class="relative z-10 whitespace-nowrap font-extrabold tracking-wide"
                          >Play Free Demo</span
                        >
                        <span
                          class="relative z-10 bg-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold border border-emerald-400/50 shadow-lg"
                          aria-label="Demo mode"
                        >
                          DEMO
                        </span>
                      </button>
                    </BackgroundGradient>

                    <!-- Real money game button with full SEO markup -->
                    <BackgroundGradient
                      :animate="true"
                      className="rounded-2xl"
                      containerClassName="w-full"
                    >
                      <a
                        v-if="slot.real_play_url && slot.real_play_url.trim()"
                        :href="slot.real_play_url"
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        class="group relative w-full bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm border border-orange-400/30 text-white text-lg font-black py-4 px-6 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-orange-500/60 transform hover:-translate-y-2 hover:scale-[1.03] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-orange-400/50 active:scale-[0.98] min-h-[60px] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                        :aria-label="`Play ${slot.name} for real money`"
                        :data-game-name="slot.name"
                        :data-game-provider="slot.provider?.name"
                        :data-game-category="slot.category?.name"
                        :data-game-type="'real'"
                        :data-game-url="slot.real_play_url"
                        data-action-type="real-money-play"
                        data-cost="variable"
                        data-currency="RUB"
                        data-risk-level="high"
                        data-age-restriction="18+"
                        data-game-mode="real"
                        data-requires-registration="true"
                        data-requires-deposit="true"
                        data-gambling-warning="true"
                      >
                        <svg
                          class="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                        <span
                          class="relative z-10 whitespace-nowrap font-extrabold tracking-wide"
                          >Play for Real Money</span
                        >
                        <span
                          class="relative z-10 bg-orange-500/30 text-xs px-3 py-1 rounded-full font-bold border border-orange-400/50 shadow-lg"
                        >
                          REAL
                        </span>
                      </a>
                      <button
                        v-else
                        class="group relative w-full bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm border border-orange-400/30 text-white text-lg font-black py-4 px-6 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-orange-500/60 transform hover:-translate-y-2 hover:scale-[1.03] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-orange-400/50 active:scale-[0.98] min-h-[60px] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                        @click="playForReal"
                        type="button"
                        :aria-label="`Play ${slot.name} for real money`"
                      >
                        <svg
                          class="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                        <span
                          class="relative z-10 whitespace-nowrap font-extrabold tracking-wide"
                          >Play for Real Money</span
                        >
                        <span
                          class="relative z-10 bg-orange-500/30 text-xs px-3 py-1 rounded-full font-bold border border-orange-400/50 shadow-lg"
                          aria-label="Реальная игра"
                        >
                          REAL
                        </span>
                      </button>
                    </BackgroundGradient>
                  </nav>
                </section>
              </div>

              <!-- 📱 Игровой экран - адаптивный для всех устройств -->
              <div
                class="lg:hidden aspect-[4/3] sm:aspect-[3/2] bg-gradient-to-br from-black/40 via-purple-900/30 to-black/40 rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center mb-4 sm:mb-6 md:mb-8 relative overflow-hidden group"
                role="img"
                :aria-label="`Game preview ${slot.name || 'slot'}`"
                :data-media-type="slot.media_type"
                :data-slot-name="slot.name"
              >
                <!-- Внутренний градиент -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-blue-500/10"
                  aria-hidden="true"
                ></div>
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                  aria-hidden="true"
                ></div>

                <!-- Медиа контент: изображение или видео, растягивается по контейнеру без искажений -->
                <div
                  v-if="slot.media_type === 'image' && slot.image_url"
                  class="absolute inset-0"
                >
                  <img
                    :src="slot.image_url"
                    :alt="`${slot.name} slot game preview - ${slot.providers?.name || 'Pragmatic Play'}`"
                    :title="`${slot.name} - Demo version slot machine`"
                    class="w-full h-full object-cover"
                    :style="`object-position: ${slot.image_focus_point || 'center 20%'}`"
                    loading="lazy"
                    decoding="async"
                    :data-slot-id="slot.id"
                    :data-provider="slot.providers?.name"
                    @error="handleSlotImageError"
                  />
                </div>
                <div
                  v-else-if="slot.media_type === 'video' && slot.video_url"
                  class="absolute inset-0"
                >
                  <video
                    :src="slot.video_url"
                    class="w-full h-full object-contain"
                    controls
                    autoplay
                    loop
                    muted
                    preload="metadata"
                    :poster="slot.image_url || ''"
                    :title="`${slot.name} - Demo video slot machine`"
                    :aria-label="`Демонстрационное видео slotа ${slot.name}`"
                    :data-slot-id="slot.id"
                    :data-provider="slot.providers?.name"
                    @error="handleSlotVideoError"
                  >
                    <source :src="slot.video_url" type="video/mp4" />
                    <source
                      :src="
                        slot.video_url &&
                        slot.video_url.replace('.mp4', '.webm')
                      "
                      type="video/webm"
                    />
                    <source
                      :src="
                        slot.video_url && slot.video_url.replace('.mp4', '.ogg')
                      "
                      type="video/ogg"
                    />
                    Ваш браузер не поддерживает воспроизведение видео.
                  </video>
                </div>

                <!-- 📱 Содержимое экрана - адаптивные размеры -->
                <div class="text-center relative z-10 px-2">
                  <div
                    class="text-white text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-black mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl animate-float"
                    aria-hidden="true"
                    role="presentation"
                  >
                    {{ getSlotIcon(slot.name || '') }}
                  </div>
                  <div
                    class="bg-black/30 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border border-white/20 max-w-xs sm:max-w-sm mx-auto"
                  >
                    <h3 class="text-white/90 text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 truncate">
                      {{ slot.name || 'Слот' }}
                    </h3>
                    <p class="text-white/60 text-xs sm:text-sm truncate">
                      {{ slot.providers?.name || 'Pragmatic Play' }}
                    </p>
                  </div>
                </div>

                <!-- 📱 Кнопка Play - адаптивные размеры и touch-friendly -->
                <a
                  v-if="slot.demo_url && slot.demo_url.trim()"
                  :href="slot.demo_url"
                  target="_blank"
                  rel="nofollow noopener"
                  class="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-black/20 active:bg-black/30 transition-all duration-500 group focus:outline-none focus:ring-4 focus:ring-green-400/30"
                  :aria-label="`Launch game demo version ${slot.name}`"
                  :title="`Play ${slot.name} - Demo version`"
                  :data-game-name="slot.name"
                  :data-game-provider="slot.providers?.name"
                  :data-action-type="demo"
                >
                  <div
                    class="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-active:scale-95 group-hover:shadow-green-500/50 transition-all duration-300"
                    role="button"
                    tabindex="-1"
                  >
                    <svg
                      class="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="presentation"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </a>
                <button
                  v-else
                  class="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-black/20 active:bg-black/30 transition-all duration-500 group focus:outline-none focus:ring-4 focus:ring-green-400/30"
                  @click="playSlot"
                  type="button"
                  :aria-label="`Launch game demo version ${slot.name}`"
                  :title="`Play ${slot.name} - Demo version`"
                  :data-game-name="slot.name"
                  :data-game-provider="slot.providers?.name"
                  :data-action-type="demo"
                >
                  <div
                    class="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-active:scale-95 group-hover:shadow-green-500/50 transition-all duration-300"
                    role="presentation"
                  >
                    <svg
                      class="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="presentation"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </div>

              <!-- Action buttons -->
              <!-- Game actions (мобильная/планшетная версия) -->
              <nav
                class="space-y-4 lg:hidden"
                aria-label="Game options (mobile/tablet)"
                role="navigation"
              >
                <!-- Demo game -->
                <section class="relative" aria-labelledby="demo-play-heading">
                  <h3 id="demo-play-heading" class="sr-only">
                    Демо-версия игры
                  </h3>

                  <BackgroundGradient
                    :animate="true"
                    className="rounded-2xl"
                    containerClassName="w-full"
                  >
                    <a
                      v-if="slot.demo_url && slot.demo_url.trim()"
                      :href="slot.demo_url"
                      target="_blank"
                      rel="nofollow noopener"
                      class="group relative w-full bg-black/30 backdrop-blur-sm border border-white/10 text-white text-xl font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 transform hover:-translate-y-2 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-emerald-400/30 min-h-[64px]"
                      :data-game-name="slot.name"
                      :data-game-type="'demo'"
                      :data-game-provider="slot.providers?.name"
                      :data-game-category="slot.slot_categories?.name"
                      :data-action-type="'play-demo'"
                      :data-cost="'free'"
                      :data-registration-required="'false'"
                      :data-download-required="'false'"
                      :data-platform="'web'"
                      :data-mobile-compatible="slot.is_mobile_compatible"
                      :data-instant-play="'true'"
                      :aria-label="`Play ${slot.name || 'slot'} free demo mode`"
                      role="button"
                    >
                      <svg
                        class="w-7 h-7 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span class="relative z-10 whitespace-nowrap"
                        >Play Free Demo</span
                      >
                      <span
                        class="relative z-10 bg-white/20 text-xs px-3 py-1 rounded-full font-semibold"
                        aria-label="Demo mode"
                      >
                        DEMO
                      </span>
                    </a>
                    <button
                      v-else
                      class="group relative w-full bg-black/30 backdrop-blur-sm border border-white/10 text-white text-xl font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 transform hover:-translate-y-2 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-emerald-400/30 min-h-[64px]"
                      @click="playSlot"
                      type="button"
                      :data-game-name="slot.name"
                      :data-game-type="'demo'"
                      :data-game-provider="slot.providers?.name"
                      :data-game-category="slot.slot_categories?.name"
                      :data-action-type="'play-demo'"
                      :data-cost="'free'"
                      :data-registration-required="'false'"
                      :data-download-required="'false'"
                      :data-platform="'web'"
                      :data-mobile-compatible="slot.is_mobile_compatible"
                      :data-instant-play="'true'"
                      :aria-label="`Play ${slot.name || 'slot'} free demo mode`"
                      role="button"
                    >
                      <svg
                        class="w-7 h-7 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span class="relative z-10 whitespace-nowrap"
                        >Play Free Demo</span
                      >
                      <span
                        class="relative z-10 bg-white/20 text-xs px-3 py-1 rounded-full font-semibold"
                        aria-label="Demo mode"
                      >
                        DEMO
                      </span>
                    </button>
                  </BackgroundGradient>
                </section>

                <!-- Real Money Play -->
                <section class="relative" aria-labelledby="real-play-heading">
                  <h3 id="real-play-heading" class="sr-only">
                    Play for Real Money
                  </h3>

                  <BackgroundGradient
                    :animate="true"
                    className="rounded-2xl"
                    containerClassName="w-full"
                  >
                    <a
                      v-if="slot.real_play_url && slot.real_play_url.trim()"
                      :href="slot.real_play_url"
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      class="group relative w-full bg-black/30 backdrop-blur-sm border border-white/10 text-white text-xl font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-2 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-orange-400/30 min-h-[64px]"
                      :data-game-name="slot.name"
                      :data-game-type="'real-money'"
                      :data-game-provider="slot.providers?.name"
                      :data-game-category="slot.slot_categories?.name"
                      :data-action-type="'play-real'"
                      :data-cost="'paid'"
                      :data-registration-required="'true'"
                      :data-download-required="'false'"
                      :data-platform="'web'"
                      :data-mobile-compatible="slot.is_mobile_compatible"
                      :data-instant-play="'true'"
                      :data-min-bet="slot.min_bet"
                      :data-max-bet="slot.max_bet"
                      :data-max-win="slot.max_win"
                      :data-rtp="slot.rtp"
                      :data-volatility="slot.volatility"
                      :data-license-required="'true'"
                      :data-age-restriction="'18+'"
                      :aria-label="`Play ${slot.name || 'slot'} for real money`"
                      role="button"
                    >
                      <svg
                        class="w-7 h-7 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        ></path>
                      </svg>
                      <span class="relative z-10 whitespace-nowrap"
                        >Play for Real Money</span
                      >
                      <span
                        class="relative z-10 bg-orange-500/20 text-xs px-3 py-1 rounded-full font-semibold"
                        aria-label="Real Money"
                      >
                        18+
                      </span>
                    </a>
                    <button
                      v-else
                      class="group relative w-full bg-black/30 backdrop-blur-sm border border-white/10 text-white text-xl font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-2 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-orange-400/30 min-h-[64px]"
                      @click="playForReal"
                      type="button"
                      :data-game-name="slot.name"
                      :data-game-type="'real-money'"
                      :data-game-provider="slot.providers?.name"
                      :data-game-category="slot.slot_categories?.name"
                      :data-action-type="'play-real'"
                      :data-cost="'paid'"
                      :data-registration-required="'true'"
                      :data-download-required="'false'"
                      :data-platform="'web'"
                      :data-mobile-compatible="slot.is_mobile_compatible"
                      :data-instant-play="'true'"
                      :data-min-bet="slot.min_bet"
                      :data-max-bet="slot.max_bet"
                      :data-max-win="slot.max_win"
                      :data-rtp="slot.rtp"
                      :data-volatility="slot.volatility"
                      :data-license-required="'true'"
                      :data-age-restriction="'18+'"
                      :aria-label="`Play ${slot.name || 'slot'} for real money`"
                      role="button"
                    >
                      <svg
                        class="w-7 h-7 relative z-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        ></path>
                      </svg>
                      <span class="relative z-10 whitespace-nowrap"
                        >Play for Real Money</span
                      >
                      <span
                        class="relative z-10 bg-orange-500/20 text-xs px-3 py-1 rounded-full font-semibold"
                        aria-label="Real Money"
                      >
                        18+
                      </span>
                    </button>
                  </BackgroundGradient>
                </section>

                <!-- Награды и достижения -->
                <aside
                  v-if="
                    slot.show_awards && slot.awards && slot.awards.length > 0
                  "
                  class="mt-5"
                  aria-label="Награды и достижения"
                >
                  <div
                    class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
                  >
                    <header class="flex items-center gap-3 mb-4">
                      <div
                        class="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 shadow-lg flex items-center justify-center ring-2 ring-white/20"
                        aria-hidden="true"
                      >
                        <span class="text-white text-lg">🏆</span>
                      </div>
                      <h3
                        class="text-white font-extrabold text-lg tracking-wide"
                      >
                        Награды и достижения
                      </h3>
                    </header>

                    <div class="grid grid-cols-2 gap-3" role="list">
                      <div
                        v-for="(award, index) in slot.awards"
                        :key="index"
                        :class="getAwardPublicClasses(award.color_scheme)"
                        class="group relative overflow-hidden rounded-xl p-4 hover:scale-105 transition-all duration-300"
                        role="listitem"
                        :data-award-index="index"
                        :data-award-type="award.type || 'achievement'"
                        :data-award-category="award.category || 'general'"
                      >
                        <div
                          :class="getAwardBgClasses(award.color_scheme)"
                          class="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl transition-colors"
                          aria-hidden="true"
                        ></div>
                        <div class="flex items-center gap-3 relative z-10">
                          <div
                            :class="getAwardIconClasses(award.color_scheme)"
                            class="w-9 h-9 rounded-lg flex items-center justify-center shadow"
                            aria-hidden="true"
                          >
                            <span class="text-white text-base">{{
                              award.emoji || '🏆'
                            }}</span>
                          </div>
                          <div>
                            <div
                              class="text-white font-bold text-sm leading-snug"
                            >
                              {{ award.title || 'Награда' }}
                            </div>
                            <div
                              :class="getAwardTextClasses(award.color_scheme)"
                              class="text-xs"
                            >
                              {{ award.description || 'Описание награды' }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </nav>
            </article>
          </AuroraBackground>
        </section>

        <!-- 📱 Правая часть: Характеристики и информация (прокручиваемая) -->
        <aside
          class="w-full lg:w-[30%] bg-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-white/20 min-w-0 order-2"
          style="min-height: auto"
          aria-label="Game characteristics and additional information"
        >
          <div class="space-y-4 sm:space-y-6 md:space-y-8">
            <!-- 📱 Main characteristics - адаптивная сетка -->
            <section aria-labelledby="characteristics-heading">
              <h2
                id="characteristics-heading"
                class="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3"
              >
                <div
                  class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <svg
                    class="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                  </svg>
                </div>
                Characteristics
              </h2>

              <!-- 📱 Адаптивная сетка: 2 колонки на планшете в горизонтальном режиме, 1 на остальных в sidebar -->
              <dl class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
                <!-- 📱 RTP - адаптивная карточка -->
                <div
                  class="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <!-- Canvas Reveal Effect - скрываем на mobile для производительности -->
                  <CanvasRevealEffect
                    class="hidden sm:block"
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('emerald')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-2 sm:mb-3">
                      <div class="flex items-center gap-2 sm:gap-3">
                        <div
                          class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                          aria-hidden="true"
                        >
                          <svg
                            class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">RTP</dt>
                      </div>
                      <dd class="text-emerald-300 text-xs sm:text-sm font-medium hidden xs:block px-2 py-0.5 bg-black/30 rounded-md backdrop-blur-sm">
                        Return
                      </dd>
                    </div>
                    <!-- Значение с подложкой для контрастности -->
                    <div class="inline-block px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm mb-1">
                      <dd class="text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {{ slot.rtp || '96.50' }}%
                      </dd>
                    </div>
                    <dd class="text-emerald-300 text-xs sm:text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">High rate</dd>
                  </div>
                </div>

                <!-- 📱 Volatility - адаптивная карточка -->
                <div
                  class="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <!-- Canvas Reveal Effect - скрываем на mobile для производительности -->
                  <CanvasRevealEffect
                    class="hidden sm:block"
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('orange')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-2 sm:mb-3">
                      <div class="flex items-center gap-2 sm:gap-3">
                        <div
                          class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                          aria-hidden="true"
                        >
                          <svg
                            class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Volatility</dt>
                      </div>
                      <dd class="text-orange-300 text-xs sm:text-sm font-medium hidden xs:block px-2 py-0.5 bg-black/30 rounded-md backdrop-blur-sm">Risk</dd>
                    </div>
                    <!-- Значение с подложкой для контрастности -->
                    <div class="inline-block px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm mb-1">
                      <dd class="text-lg sm:text-xl md:text-2xl font-black text-white capitalize drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {{ getVolatilityText(slot.volatility) }}
                      </dd>
                    </div>
                    <dd class="text-orange-300 text-xs sm:text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Medium risk</dd>
                  </div>
                </div>

                <!-- 📱 Maximum win - адаптивная карточка -->
                <div
                  class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <!-- Canvas Reveal Effect - скрываем на mobile для производительности -->
                  <CanvasRevealEffect
                    class="hidden sm:block"
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('purple')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-2 sm:mb-3">
                      <div class="flex items-center gap-2 sm:gap-3">
                        <div
                          class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                          aria-hidden="true"
                        >
                          <svg
                            class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            ></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Max win</dt>
                      </div>
                      <dd class="text-purple-300 text-xs sm:text-sm font-medium hidden xs:block px-2 py-0.5 bg-black/30 rounded-md backdrop-blur-sm">
                        Potential
                      </dd>
                    </div>
                    <!-- Значение с подложкой для контрастности -->
                    <div class="inline-block px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm mb-1">
                      <dd class="text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {{ getMaxWin(slot) }}
                      </dd>
                    </div>
                    <dd class="text-purple-300 text-xs sm:text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Per bet</dd>
                  </div>
                </div>

                <!-- 📱 Minimum bet - адаптивная карточка -->
                <div
                  class="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <CanvasRevealEffect
                    class="hidden sm:block"
                    :animationSpeed="0.8"
                    :opacities="[0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]"
                    :colors="getEffectColorsFor('blue')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-2 sm:mb-3">
                      <div class="flex items-center gap-2 sm:gap-3">
                        <div
                          class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                          aria-hidden="true"
                        >
                          <svg class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Min bet</dt>
                      </div>
                      <dd class="text-blue-300 text-xs sm:text-sm font-medium hidden xs:block px-2 py-0.5 bg-black/30 rounded-md backdrop-blur-sm">Per spin</dd>
                    </div>
                    <!-- Значение с подложкой для контрастности -->
                    <div class="inline-block px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm mb-1">
                      <dd class="text-lg sm:text-xl md:text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {{ slot.min_bet || '€0.20' }}
                      </dd>
                    </div>
                    <dd class="text-blue-300 text-xs sm:text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Available to all</dd>
                  </div>
                </div>

                <!-- 📱 Maximum bet - адаптивная карточка -->
                <div
                  class="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-teal-400/30 hover:border-teal-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <CanvasRevealEffect
                    class="hidden sm:block"
                    :animationSpeed="0.8"
                    :opacities="[0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]"
                    :colors="getEffectColorsFor('teal')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-2 sm:mb-3">
                      <div class="flex items-center gap-2 sm:gap-3">
                        <div
                          class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                          aria-hidden="true"
                        >
                          <svg class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Max bet</dt>
                      </div>
                      <dd class="text-teal-300 text-xs sm:text-sm font-medium hidden xs:block px-2 py-0.5 bg-black/30 rounded-md backdrop-blur-sm">Per spin</dd>
                    </div>
                    <!-- Значение с подложкой для контрастности -->
                    <div class="inline-block px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm mb-1">
                      <dd class="text-lg sm:text-xl md:text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {{ slot.max_bet || '€100' }}
                      </dd>
                    </div>
                    <dd class="text-teal-300 text-xs sm:text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">High rollers</dd>
                  </div>
                </div>

                <!-- 📱 Release date - адаптивная карточка -->
                <div
                  class="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-amber-400/30 hover:border-amber-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <CanvasRevealEffect
                    class="hidden sm:block"
                    :animationSpeed="0.8"
                    :opacities="[0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]"
                    :colors="getEffectColorsFor('amber')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-2 sm:mb-3">
                      <div class="flex items-center gap-2 sm:gap-3">
                        <div
                          class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                          aria-hidden="true"
                        >
                          <svg class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Release</dt>
                      </div>
                      <dd class="text-amber-300 text-xs sm:text-sm font-medium hidden xs:block px-2 py-0.5 bg-black/30 rounded-md backdrop-blur-sm">Launch</dd>
                    </div>
                    <!-- Значение с подложкой для контрастности -->
                    <div class="inline-block px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm mb-1">
                      <dd class="text-base sm:text-lg md:text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {{ formatReleaseDate(slot.release_date) || '13.02.2021' }}
                      </dd>
                    </div>
                    <dd class="text-amber-300 text-xs sm:text-sm font-medium truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{{ slot.providers?.name || 'Pragmatic Play' }}</dd>
                  </div>
                </div>

                <!-- 📱 Number of reels - адаптивная карточка -->
                <div
                  class="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-rose-400/30 hover:border-rose-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <CanvasRevealEffect
                    class="hidden sm:block"
                    :animationSpeed="0.8"
                    :opacities="[0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]"
                    :colors="getEffectColorsFor('rose')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-2 sm:mb-3">
                      <div class="flex items-center gap-2 sm:gap-3">
                        <div
                          class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                          aria-hidden="true"
                        >
                          <svg class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Reels</dt>
                      </div>
                      <dd class="text-rose-300 text-xs sm:text-sm font-medium hidden xs:block px-2 py-0.5 bg-black/30 rounded-md backdrop-blur-sm">Structure</dd>
                    </div>
                    <!-- Значение с подложкой для контрастности -->
                    <div class="inline-block px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm mb-1">
                      <dd class="text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {{ slot.reels && slot.rows ? `${slot.reels}×${slot.rows}` : slot.game_field || '5×3' }}
                      </dd>
                    </div>
                    <dd class="text-rose-300 text-xs sm:text-sm font-medium truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">{{ slot.paylines || 'Scatter Pays' }}</dd>
                  </div>
                </div>

                <!-- 📱 Payout type - адаптивная карточка -->
                <div
                  class="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-violet-400/30 hover:border-violet-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <CanvasRevealEffect
                    class="hidden sm:block"
                    :animationSpeed="0.8"
                    :opacities="[0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]"
                    :colors="getEffectColorsFor('violet')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-2 sm:mb-3">
                      <div class="flex items-center gap-2 sm:gap-3">
                        <div
                          class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                          aria-hidden="true"
                        >
                          <svg class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">Paylines</dt>
                      </div>
                      <dd class="text-violet-300 text-xs sm:text-sm font-medium hidden xs:block px-2 py-0.5 bg-black/30 rounded-md backdrop-blur-sm">System</dd>
                    </div>
                    <!-- Значение с подложкой для контрастности -->
                    <div class="inline-block px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm mb-1">
                      <dd class="text-lg sm:text-xl md:text-2xl font-black text-white truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {{ slot.paylines || 'Scatter Pays' }}
                      </dd>
                    </div>
                    <dd class="text-violet-300 text-xs sm:text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">All directions</dd>
                  </div>
                </div>
              </dl>
            </section>

            <!-- 📱 Popularity - адаптивная секция -->
            <section aria-labelledby="popularity-heading">
              <h2
                id="popularity-heading"
                class="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2"
              >
                <span class="text-lg sm:text-xl md:text-2xl" aria-hidden="true">📊</span>
                Popularity
              </h2>
              <div
                class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-yellow-400/30 relative overflow-hidden"
              >
                <!-- Canvas Reveal Effect -->
                <CanvasRevealEffect
                  :animationSpeed="0.5"
                  :opacities="[
                    0.12, 0.14, 0.16, 0.18, 0.22, 0.28, 0.34, 0.42, 0.5, 0.6,
                  ]"
                  :colors="getEffectColorsFor('amber')"
                  :dotSize="4"
                  :showGradient="false"
                  blendMode="overlay"
                  :intensity="1.4"
                  containerClassName="absolute inset-0 pointer-events-none"
                />
                <div class="relative z-10">
                  <div class="flex justify-between items-center mb-3">
                    <span class="text-white font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] px-2 py-0.5 bg-black/30 rounded-md backdrop-blur-sm">Rating</span>
                    <span
                      class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-3 py-1 rounded-full text-sm shadow-lg"
                      >#{{ slot.popularity_rank || '12' }} of 2000+</span
                    >
                  </div>
                  <div
                    class="w-full bg-black/30 rounded-full h-3 mb-3 overflow-hidden backdrop-blur-sm"
                    role="progressbar"
                    :aria-valuenow="
                      Math.round(
                        ((2000 - (slot.popularity_rank || 12)) / 2000) * 100,
                      )
                    "
                    aria-valuemin="0"
                    aria-valuemax="100"
                    :aria-label="`Popularity rating: ${Math.round(((2000 - (slot.popularity_rank || 12)) / 2000) * 100)}%`"
                  >
                    <div
                      class="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full shadow-lg"
                      :style="`width: ${Math.round(((2000 - (slot.popularity_rank || 12)) / 2000) * 100)}%`"
                    ></div>
                  </div>
                  <div class="inline-block px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm">
                    <span class="text-yellow-300 text-sm font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      {{
                        Math.round(
                          ((2000 - (slot.popularity_rank || 12)) / 2000) * 100,
                        )
                      }}% popularity
                    </span>
                  </div>
                </div>
              </div>

              <!-- Additional popularity metrics -->
              <div class="mt-4 grid grid-cols-2 gap-3">
                <!-- RTP rating -->
                <div
                  class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-4 rounded-xl border border-purple-400/30 relative overflow-hidden"
                >
                  <CanvasRevealEffect
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('purple')"
                    :dotSize="5"
                    :showGradient="false"
                    blendMode="multiply"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center gap-2 mb-2">
                      <div
                        class="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <span class="text-white text-xs font-bold">📊</span>
                      </div>
                      <span class="text-purple-300 text-xs font-semibold px-2 py-0.5 bg-black/30 rounded-md backdrop-blur-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                        >Real RTP</span
                      >
                    </div>
                    <div class="inline-block px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm">
                      <span class="text-white font-black text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {{ slot.real_rtp || '97.45' }}%
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Bonus frequency -->
                <div
                  class="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm p-4 rounded-xl border border-orange-400/30 relative overflow-hidden"
                >
                  <CanvasRevealEffect
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('orange')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center gap-2 mb-2">
                      <div
                        class="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <span class="text-white text-xs font-bold">🎰</span>
                      </div>
                      <span class="text-orange-300 text-xs font-semibold px-2 py-0.5 bg-black/30 rounded-md backdrop-blur-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                        >Bonus frequency</span
                      >
                    </div>
                    <div class="inline-block px-3 py-1 bg-black/40 rounded-lg backdrop-blur-sm">
                      <span class="text-white font-black text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {{ slot.bonus_frequency || '1:448' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- 📱 Game features - адаптивная секция -->
            <section aria-labelledby="features-heading">
              <h2
                id="features-heading"
                class="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2"
              >
                <span class="text-lg sm:text-xl md:text-2xl" aria-hidden="true">⚡</span>
                Features
              </h2>
              <div class="space-y-2 sm:space-y-3">
                <!-- 📱 Main features - адаптивная карточка + SEO ОПТИМИЗАЦИЯ -->
                <!-- 🎯 SEO: Секция механик с Schema.org разметкой -->
                <section
                  class="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-400/30 relative overflow-hidden"
                  aria-labelledby="mechanics-heading"
                  role="region"
                  itemscope
                  itemtype="https://schema.org/ItemList"
                  :data-mechanics-count="slot?.slot_mechanics?.length || 0"
                >
                  <!-- 🎯 SEO: Мета-информация для Schema.org -->
                  <meta itemprop="name" :content="`${slot.name} Game Mechanics`">
                  <meta itemprop="description" :content="`Special game features and mechanics in ${slot.name} slot`">
                  <meta itemprop="numberOfItems" :content="slot?.slot_mechanics?.length || 0">

                  <CanvasRevealEffect
                    class="hidden sm:block"
                    :animationSpeed="0.8"
                    :opacities="[0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]"
                    :colors="getEffectColorsFor('indigo')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <h3
                    id="mechanics-heading"
                    class="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 relative z-10 text-sm sm:text-base"
                    itemprop="alternateName"
                  >
                    <span class="text-base sm:text-lg" aria-hidden="true">🎮</span>
                    <span>Game mechanics</span>
                    <span class="sr-only">- Special features of {{ slot.name }}</span>
                  </h3>
                  <div
                    class="flex flex-wrap gap-1.5 sm:gap-2 relative z-10"
                    role="list"
                    aria-label="Slot game mechanics and features"
                  >
                    <span
                      v-for="(slotMechanic, index) in slot?.slot_mechanics || []"
                      :key="slotMechanic.mechanics.id"
                      class="px-3 py-1 rounded-full text-xs font-medium border text-white"
                      :style="{
                        backgroundColor: `${slotMechanic.mechanics.color}30`,
                        borderColor: `${slotMechanic.mechanics.color}40`,
                      }"
                      role="listitem"
                      itemprop="itemListElement"
                      itemscope
                      itemtype="https://schema.org/ListItem"
                      :data-mechanic-id="slotMechanic.mechanics.id"
                      :data-mechanic-name="slotMechanic.mechanics.name"
                      :title="`${slot.name} - ${slotMechanic.mechanics.name} feature`"
                      :aria-label="`Mechanic: ${slotMechanic.mechanics.name}`"
                    >
                      <meta itemprop="position" :content="index + 1">
                      <span itemprop="item" itemscope itemtype="https://schema.org/Thing">
                        <meta itemprop="name" :content="slotMechanic.mechanics.name">
                        <span aria-hidden="true">{{ slotMechanic.mechanics.icon }}</span>
                        <span itemprop="alternateName">{{ slotMechanic.mechanics.name }}</span>
                      </span>
                    </span>
                    <span
                      v-if="!slot?.slot_mechanics?.length"
                      class="px-3 py-1 bg-gray-500/30 text-gray-400 rounded-full text-xs font-medium border border-gray-500/40"
                      role="listitem"
                    >
                      Mechanics not specified
                    </span>
                  </div>
                  <!-- 🎯 SEO: gameFeature для Schema.org Game -->
                  <template v-if="slot?.slot_mechanics?.length">
                    <meta
                      v-for="slotMechanic in slot.slot_mechanics"
                      :key="`feature-${slotMechanic.mechanics.id}`"
                      itemprop="gameFeature"
                      :content="slotMechanic.mechanics.name"
                    >
                  </template>
                </section>

                <!-- 📱 Bonus features - адаптивная карточка + SEO ОПТИМИЗАЦИЯ -->
                <!-- 🎯 SEO: Секция бонусов с Schema.org разметкой -->
                <section
                  class="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-400/30 relative overflow-hidden"
                  aria-labelledby="bonuses-heading"
                  role="region"
                  itemscope
                  itemtype="https://schema.org/ItemList"
                  :data-bonuses-count="slot?.slot_bonuses?.length || 0"
                >
                  <!-- 🎯 SEO: Мета-информация для Schema.org -->
                  <meta itemprop="name" :content="`${slot.name} Bonus Features`">
                  <meta itemprop="description" :content="`Bonus features and special rewards in ${slot.name} slot game`">
                  <meta itemprop="numberOfItems" :content="slot?.slot_bonuses?.length || 0">

                  <CanvasRevealEffect
                    class="hidden sm:block"
                    :animationSpeed="0.8"
                    :opacities="[0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]"
                    :colors="getEffectColorsFor('emerald')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <h3
                    id="bonuses-heading"
                    class="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 relative z-10 text-sm sm:text-base"
                    itemprop="alternateName"
                  >
                    <span class="text-base sm:text-lg" aria-hidden="true">🎁</span>
                    <span>Bonuses</span>
                    <span class="sr-only">- Special bonus features in {{ slot.name }}</span>
                  </h3>
                  <div
                    class="flex flex-wrap gap-1.5 sm:gap-2 relative z-10"
                    role="list"
                    aria-label="Slot game bonus features"
                  >
                    <!-- New implementation: use slot_bonuses directly like in mechanics -->
                    <span
                      v-for="(slotBonus, index) in slot?.slot_bonuses || []"
                      :key="slotBonus.bonuses?.id || slotBonus.id"
                      class="px-3 py-1 bg-emerald-500/30 text-white rounded-full text-xs font-medium border border-emerald-400/20"
                      role="listitem"
                      itemprop="itemListElement"
                      itemscope
                      itemtype="https://schema.org/ListItem"
                      :data-bonus-id="slotBonus.bonuses?.id"
                      :data-bonus-name="slotBonus.bonuses?.name"
                      :title="`${slot.name} - ${slotBonus.bonuses?.name} bonus`"
                      :aria-label="`Bonus: ${slotBonus.bonuses?.name}`"
                    >
                      <meta itemprop="position" :content="index + 1">
                      <span itemprop="item" itemscope itemtype="https://schema.org/Thing">
                        <meta itemprop="name" :content="slotBonus.bonuses?.name">
                        <span aria-hidden="true">{{ slotBonus.bonuses?.icon }}</span>
                        <span itemprop="alternateName">{{ slotBonus.bonuses?.name }}</span>
                      </span>
                    </span>
                    <!-- Fallback through function for compatibility -->
                    <template
                      v-if="
                        (!slot?.slot_bonuses ||
                          slot.slot_bonuses.length === 0) &&
                        getSlotBonuses(slot).length > 0
                      "
                    >
                      <span
                        v-for="(bonus, index) in getSlotBonuses(slot)"
                        :key="bonus.id || bonus.name"
                        class="px-3 py-1 bg-emerald-500/30 text-white rounded-full text-xs font-medium border border-emerald-400/20"
                        role="listitem"
                        itemprop="itemListElement"
                        itemscope
                        itemtype="https://schema.org/ListItem"
                        :aria-label="`Bonus: ${bonus.name}`"
                      >
                        <meta itemprop="position" :content="index + 1">
                        <span itemprop="item" itemscope itemtype="https://schema.org/Thing">
                          <meta itemprop="name" :content="bonus.name">
                          <span itemprop="alternateName">{{ bonus.name }}</span>
                        </span>
                      </span>
                    </template>
                    <!-- Show message if no bonuses -->
                    <span
                      v-if="
                        (!slot?.slot_bonuses ||
                          slot.slot_bonuses.length === 0) &&
                        (!getSlotBonuses(slot) ||
                          getSlotBonuses(slot).length === 0)
                      "
                      class="px-3 py-1 bg-gray-500/30 text-gray-300 rounded-full text-xs font-medium border border-gray-400/20"
                      role="listitem"
                    >
                      Bonuses not specified
                    </span>
                  </div>
                  <!-- 🎯 SEO: Bonus feature keywords для SEO -->
                  <template v-if="slot?.slot_bonuses?.length">
                    <meta
                      itemprop="keywords"
                      :content="slot.slot_bonuses.map(b => `${b.bonuses?.name} bonus, ${slot.name} ${b.bonuses?.name}`).join(', ')"
                    >
                  </template>
                </section>

                <!-- 📱 Themes - адаптивная карточка + МАКСИМАЛЬНАЯ SEO ОПТИМИЗАЦИЯ -->
                <!-- 🎯 SEO: Секция тематик с полной Schema.org разметкой -->
                <section
                  class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-yellow-400/30 relative overflow-hidden"
                  aria-labelledby="themes-heading"
                  role="region"
                  itemscope
                  itemtype="https://schema.org/ItemList"
                  :data-themes-count="getSlotThemesFromDB(slot).length"
                  :data-slot-name="slot.name"
                  :data-slot-provider="slot.providers?.name"
                >
                  <!-- 🎯 SEO: Мета-информация для Schema.org ItemList -->
                  <meta itemprop="name" :content="`${slot.name} Game Themes`">
                  <meta itemprop="description" :content="`Slot game themes and categories for ${slot.name}: ${getSlotThemesFromDB(slot).map(t => t.name).join(', ') || 'Various themes'}`">
                  <meta itemprop="numberOfItems" :content="getSlotThemesFromDB(slot).length || 0">

                  <CanvasRevealEffect
                    class="hidden sm:block"
                    :animationSpeed="0.8"
                    :opacities="[0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]"
                    :colors="getEffectColorsFor('amber')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />

                  <!-- 🎯 SEO: Заголовок секции с семантикой -->
                  <h3
                    id="themes-heading"
                    class="text-white font-semibold mb-2 sm:mb-3 flex items-center gap-2 relative z-10 text-sm sm:text-base"
                    itemprop="alternateName"
                  >
                    <span class="text-base sm:text-lg" aria-hidden="true">🏛️</span>
                    <span>Themes</span>
                    <!-- 🎯 SEO: Скрытый текст для поисковиков -->
                    <span class="sr-only">- Game genre and categories for {{ slot.name }}</span>
                  </h3>

                  <!-- 🎯 SEO: Список тематик с полной разметкой -->
                  <div
                    class="flex flex-wrap gap-1.5 sm:gap-2 relative z-10"
                    role="list"
                    aria-label="Slot game themes and genres"
                  >
                    <!-- 🎨 Отображаем ВСЕ выбранные тематики с Schema.org разметкой -->
                    <template v-if="getSlotThemesFromDB(slot).length > 0">
                      <span
                        v-for="(theme, index) in getSlotThemesFromDB(slot)"
                        :key="theme.id"
                        class="px-3 py-1 bg-yellow-500/30 text-white rounded-full text-xs font-medium border border-yellow-400/20 hover:bg-yellow-500/50 transition-colors cursor-default"
                        role="listitem"
                        itemprop="itemListElement"
                        itemscope
                        itemtype="https://schema.org/ListItem"
                        :data-theme-id="theme.id"
                        :data-theme-name="theme.name"
                        :data-theme-slug="theme.slug"
                        :data-theme-color="theme.color"
                        :data-position="index + 1"
                        :title="`${slot.name} - ${theme.name} theme slot game`"
                        :aria-label="`Theme: ${theme.name}`"
                      >
                        <!-- 🎯 SEO: Schema.org ListItem мета-данные -->
                        <meta itemprop="position" :content="index + 1">
                        <span itemprop="item" itemscope itemtype="https://schema.org/Thing">
                          <meta itemprop="@type" content="DefinedTerm">
                          <meta itemprop="name" :content="theme.name">
                          <meta itemprop="identifier" :content="theme.slug || theme.id">
                          <link v-if="theme.slug" itemprop="url" :href="`https://slotquest.com/themes/${theme.slug}`">
                          <span aria-hidden="true">{{ theme.icon }}</span>
                          <span itemprop="alternateName">{{ theme.name }}</span>
                        </span>
                      </span>
                    </template>

                    <!-- ⚠️ Сообщение если тематики не указаны -->
                    <span
                      v-else
                      class="px-3 py-1 bg-gray-500/30 text-gray-300 rounded-full text-xs font-medium border border-gray-400/20"
                      role="listitem"
                      aria-label="No themes specified"
                    >
                      Themes not specified
                    </span>
                  </div>

                  <!-- 🎯 SEO: Дополнительные мета-теги для связи с Game schema -->
                  <!-- Эти теги связывают тематики со слотом через itemprop="genre" и "keywords" -->
                  <template v-if="getSlotThemesFromDB(slot).length > 0">
                    <!-- Genre для Schema.org Game -->
                    <meta
                      v-for="theme in getSlotThemesFromDB(slot)"
                      :key="`genre-${theme.id}`"
                      itemprop="genre"
                      :content="theme.name"
                    >
                    <!-- Keywords для SEO -->
                    <meta
                      itemprop="keywords"
                      :content="getSlotThemesFromDB(slot).map(t => `${t.name} slot, ${t.name} game, ${slot.name} ${t.name}`).join(', ')"
                    >
                  </template>
                </section>
              </div>
            </section>
          </div>
        </aside>
      </div>
      <!-- 📱 Info Popup & Like Button Control Panel -->
      <div
        class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[60] flex flex-col gap-3 print:hidden safe-area-pb"
        v-if="slot"
      >
        <!-- Info Button -->
        <button
          @click="showInfoModal = true"
          class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg hover:bg-white/20 transition-all hover:scale-105 group animated-gradient-border"
          aria-label="Slot Information"
        >
          <span class="text-2xl group-hover:animate-pulse">ⓘ</span>
        </button>

        <!-- Like Button -->
        <button
          @click="toggleLike"
          class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg hover:bg-white/20 transition-all hover:scale-105 group animated-gradient-border"
          :class="{ '!bg-red-500/20 !border-red-500/50': isLiked }"
          aria-label="Add to Favorites"
        >
          <span
            class="text-2xl transition-transform duration-300"
            :class="{ 'scale-125': isLiked, 'animate-[heartbeat_1s_ease-in-out_infinite]': isLiked }"
          >
            {{ isLiked ? '❤️' : '🤍' }}
          </span>
        </button>
      </div>

      <!-- 📋 Info Modal -->
      <div
        v-if="showInfoModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        @click.self="showInfoModal = false"
      >
        <div
          class="relative w-full max-w-[95vw] sm:max-w-2xl bg-[#161A21] border border-[#353A4A] rounded-2xl shadow-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto custom-scrollbar safe-area-pb"
        >
          <!-- Header -->
          <div class="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-[#161A21]/95 backdrop-blur border-b border-[#353A4A]">
            <h2 class="text-lg sm:text-xl font-bold text-white truncate pr-2">
              <span class="text-[#8B5CF6]">#{{ slot.popularity_rank || '1' }}</span>
              {{ slot.name }}
            </h2>
            <button
              @click="showInfoModal = false"
              class="text-gray-400 hover:text-white transition-colors p-2 -mr-2"
              aria-label="Close modal"
            >
              <span class="text-2xl">✕</span>
            </button>
          </div>

          <!-- Content -->
          <div class="p-4 sm:p-6 space-y-6 sm:space-y-8">
            <!-- 🏆 1. Expert Verdict -->
            <section>
              <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span class="text-yellow-400">🏆</span> Expert Verdict
              </h3>
              <div class="text-gray-300 leading-relaxed text-sm sm:text-base bg-[#1F2937]/50 p-4 rounded-xl border border-[#374151]">
                <p v-if="slot.info_expert_verdict" v-html="slot.info_expert_verdict"></p>
                <p v-else>
                  {{ slot.name }} by {{ slot.providers?.name || 'the developer' }} is a {{ getVolatilityText(slot.volatility).toLowerCase() }}-volatility slot with an RTP of {{ slot.rtp || '96.0' }}% and a maximum win of {{ formatMaxWin(slot.max_win) }}x.
                  {{ slot.rtp >= 96.5 ? 'The above-average RTP makes it a solid choice for long sessions.' : 'It delivers a balanced gaming experience suitable for most players.' }}
                  Overall, we rate it {{ slot.rating || 4.5 }}/5 for its {{ slot.volatility?.toLowerCase() === 'high' ? 'thrilling high-reward potential' : 'balanced gameplay and consistent payouts' }}.
                </p>
              </div>
            </section>

            <!-- ✅❌ 2. Pros & Cons -->
            <section>
              <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span>✅❌</span> Pros & Cons
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <!-- Pros -->
                <div class="bg-emerald-500/5 p-3 sm:p-4 rounded-xl border border-emerald-500/20">
                  <h4 class="font-semibold text-emerald-400 text-sm mb-2">✅ Pros</h4>
                  <ul class="space-y-1.5 text-gray-300 text-xs sm:text-sm">
                    <li v-for="(pro, i) in computedPros" :key="'pro-'+i" class="flex items-start gap-2">
                      <span class="text-emerald-400 mt-0.5 shrink-0">+</span>
                      <span>{{ pro }}</span>
                    </li>
                  </ul>
                </div>
                <!-- Cons -->
                <div class="bg-red-500/5 p-3 sm:p-4 rounded-xl border border-red-500/20">
                  <h4 class="font-semibold text-red-400 text-sm mb-2">❌ Cons</h4>
                  <ul class="space-y-1.5 text-gray-300 text-xs sm:text-sm">
                    <li v-for="(con, i) in computedCons" :key="'con-'+i" class="flex items-start gap-2">
                      <span class="text-red-400 mt-0.5 shrink-0">−</span>
                      <span>{{ con }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- ❓ 3. FAQ (Accordion) -->
            <section>
              <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span class="text-blue-400">❓</span> Frequently Asked Questions
              </h3>
              <div class="space-y-2">
                <details
                  v-for="(item, i) in computedFaq"
                  :key="'faq-'+i"
                  class="group bg-[#1F2937]/50 rounded-xl border border-[#374151] overflow-hidden"
                >
                  <summary class="flex items-center justify-between p-3 sm:p-4 cursor-pointer text-white font-medium text-sm sm:text-base hover:bg-white/5 transition-colors select-none list-none">
                    <span>{{ item.question }}</span>
                    <span class="text-gray-400 transition-transform duration-300 group-open:rotate-180 ml-2 shrink-0">▼</span>
                  </summary>
                  <div class="px-3 sm:px-4 pb-3 sm:pb-4 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-[#374151]">
                    <p class="pt-3">{{ item.answer }}</p>
                  </div>
                </details>
              </div>
            </section>

            <!-- 📝 4. Player Reviews -->
            <section>
              <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span class="text-pink-400">📝</span> Player Reviews
              </h3>
              <div class="space-y-3">
                <div
                  v-for="(review, i) in computedReviews"
                  :key="'review-'+i"
                  class="bg-[#1F2937]/50 p-3 sm:p-4 rounded-xl border border-[#374151]"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                        {{ review.author?.charAt(0)?.toUpperCase() || 'U' }}
                      </div>
                      <div>
                        <div class="text-white text-sm font-medium">{{ review.author }}</div>
                        <div class="text-gray-500 text-xs">{{ review.date }}</div>
                      </div>
                    </div>
                    <div class="flex text-yellow-400 text-sm">
                      <span v-for="n in 5" :key="'star-'+i+'-'+n">{{ n <= review.rating ? '★' : '☆' }}</span>
                    </div>
                  </div>
                  <p class="text-gray-300 text-xs sm:text-sm leading-relaxed">{{ review.text }}</p>
                </div>
              </div>
            </section>

            <!-- 🎮 5. How to Play -->
            <section>
              <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span class="text-green-400">🎮</span> How to Play {{ slot.name }}
              </h3>
              <div class="space-y-3">
                <div
                  v-for="(step, i) in computedHowToPlay"
                  :key="'step-'+i"
                  class="flex items-start gap-3 sm:gap-4"
                >
                  <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {{ i + 1 }}
                  </div>
                  <div class="pt-1">
                    <h4 class="text-white font-medium text-sm sm:text-base mb-1">{{ step.step }}</h4>
                    <p class="text-gray-400 text-xs sm:text-sm leading-relaxed">{{ step.text }}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- 🔗 6. Similar Slots -->
            <section v-if="similarSlots.length > 0">
              <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span class="text-orange-400">🔗</span> Similar Slots You May Like
              </h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                <NuxtLink
                  v-for="sim in similarSlots.slice(0, 6)"
                  :key="sim.id"
                  :to="`/slots/${sim.slug}`"
                  class="bg-[#1F2937]/50 p-3 rounded-xl border border-[#374151] hover:border-[#8B5CF6]/50 transition-colors group text-center"
                  @click="showInfoModal = false"
                >
                  <div class="text-white text-xs sm:text-sm font-medium group-hover:text-[#8B5CF6] transition-colors truncate">{{ sim.name }}</div>
                  <div class="text-gray-500 text-[10px] sm:text-xs mt-1">{{ sim.providers?.name || 'Provider' }}</div>
                </NuxtLink>
              </div>
            </section>


            <!-- CTA -->
            <section class="bg-gradient-to-r from-[#8B5CF6]/10 to-[#EC4899]/10 p-4 rounded-xl border border-[#8B5CF6]/20">
              <h3 class="text-lg font-bold text-white mb-2">Free Play or Demo</h3>
              <p class="text-gray-300 mb-4 text-sm">
                {{ slot.info_demo_cta || `You can easily try out ${slot.name} online slot at SlotQuest without paying real money. Take advantage of our free demo mode and dive right in!` }}
              </p>
              <button
                @click="playSlot(); showInfoModal = false"
                class="w-full py-3 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-[1.02]"
              >
                {{ slot.info_demo_btn_text || 'Play Demo Now' }}
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSlotSEO } from '~/composables/useSlotSEO'
import {
  formatArticleDate,
  getEffectColorsFor,
  getAwardEffectColors,
  getAwardPublicClasses,
  getAwardBgClasses,
  getAwardIconClasses,
  getAwardTextClasses,
  getSlotIcon,
  getImageFormat,
  getVolatilityText,
  getMaxWin,
  formatReleaseDate,
  getSlotDescription,
  getShortDescription,
  getDetailedDescription,
  getCleanSlotName,
  getSlotNameWithKeyword,
  processCtaSubtitle,
  processConclusionRatingTitle,
  processPopularityTitle,
  processProfExpertQuote,
  processProfRecommendation,
  processConclusionText1,
  processConclusionVerdict,
  replaceKeywordsInText,
  getSlotThemes,
  getSlotBonuses,
  getSlotThemesFromDB,
  formatMaxWin,
  formatPaylines,
  formatNumber
} from '~/utils/slotFormatters'

import AuroraBackground from '~/components/ui/AuroraBackground.vue'
import BackgroundGradient from '~/components/ui/BackgroundGradient.vue'
import CometCard from '~/components/ui/CometCard.vue'
import CanvasRevealEffect from '~/components/ui/CanvasRevealEffect.vue'

// 🎯 Импорт composable для JSON-LD
const { getJsonLdScriptSync, fetchRawJsonLd } = useJsonLd()

// Получаем slug из роута
const route = useRoute()
const slug = route.params.slug

// Состояние
const slot = ref({})
const allSlots = ref([])
const slotMechanics = ref([])
const loading = ref(true)
const error = ref(null)

// 🎯 Состояние для JSON-LD
const jsonLdSchemas = ref(null)

// Состояние для рейтинга
const showRatingPicker = ref(false)
const selectedStars = ref(null)
const hoverStars = ref(0)
const ratingSubmitting = ref(false)
const ratingSubmitted = ref(false)

// 🆕 Computed properties for Enhanced Info Modal
const computedPros = computed(() => {
  if (slot.value.info_pros) {
    try { return JSON.parse(slot.value.info_pros) } catch(e) { /* fallback */ }
  }
  const s = slot.value
  const pros = []
  if (s.rtp >= 96.5) pros.push(`Above-average RTP of ${s.rtp}%`)
  else if (s.rtp) pros.push(`Competitive RTP of ${s.rtp}%`)
  if (s.max_win >= 5000) pros.push(`Massive max win of ${formatMaxWin(s.max_win)}x`)
  else if (s.max_win) pros.push(`Max win potential of ${formatMaxWin(s.max_win)}x`)
  if (s.demo_url) pros.push('Free demo mode available')
  if (s.slot_bonuses?.length > 0) pros.push(`${s.slot_bonuses.length} bonus features`)
  else pros.push('Engaging gameplay mechanics')
  if (s.paylines) pros.push(`${formatPaylines(s.paylines)} ways to win`)
  return pros.slice(0, 4)
})

const computedCons = computed(() => {
  if (slot.value.info_cons) {
    try { return JSON.parse(slot.value.info_cons) } catch(e) { /* fallback */ }
  }
  const s = slot.value
  const cons = []
  if (s.volatility?.toLowerCase() === 'high') cons.push('High volatility — not for cautious players')
  else if (s.volatility?.toLowerCase() === 'low') cons.push('Low volatility — smaller win potential')
  if (s.rtp && s.rtp < 96.0) cons.push(`Below-average RTP of ${s.rtp}%`)
  if (!s.slot_bonuses?.length) cons.push('Limited bonus features')
  if (cons.length === 0) cons.push('May not appeal to all play styles')
  cons.push('Requires stable internet connection')
  return cons.slice(0, 3)
})

const computedFaq = computed(() => {
  if (slot.value.info_faq) {
    try { return JSON.parse(slot.value.info_faq) } catch(e) { /* fallback */ }
  }
  const s = slot.value
  const name = s.name || 'this slot'
  const provider = s.providers?.name || 'the developer'
  return [
    { question: `Is ${name} safe to play online?`, answer: `Yes, ${name} is developed by ${provider}, a licensed and regulated game provider. All games are tested by independent auditing agencies to ensure fair play and random outcomes.` },
    { question: `What is the RTP of ${name}?`, answer: `The Return to Player (RTP) of ${name} is ${s.rtp || '96.0'}%. This means that, on average, for every $100 wagered, the game returns $${s.rtp || '96.0'} to players over time.` },
    { question: `Can I play ${name} for free?`, answer: `Yes! You can play ${name} in free demo mode right here on SlotQuest. No registration or deposit required — just click "${s.info_demo_btn_text || 'Play Demo Now'}" to start spinning.` },
    { question: `What is the maximum win in ${name}?`, answer: `The maximum win in ${name} is ${formatMaxWin(s.max_win)}x your bet. ${s.max_win >= 5000 ? 'This is a very high max win potential!' : 'This offers solid winning potential for players.'}` },
    { question: `What is the volatility of ${name}?`, answer: `${name} has ${getVolatilityText(s.volatility).toLowerCase()} volatility. ${s.volatility?.toLowerCase() === 'high' ? 'This means wins are less frequent but can be much larger when they hit.' : s.volatility?.toLowerCase() === 'low' ? 'This means you can expect frequent, smaller wins.' : 'This provides a balanced mix of win frequency and size.'}` }
  ]
})

const computedReviews = computed(() => {
  if (slot.value.info_reviews) {
    try { return JSON.parse(slot.value.info_reviews) } catch(e) { /* fallback */ }
  }
  const s = slot.value
  const name = s.name || 'this slot'
  return [
    { author: 'Alex R.', rating: 5, text: `${name} is one of my favorite slots! The graphics are stunning and the bonus features keep me coming back. Highly recommended for anyone who enjoys ${s.volatility?.toLowerCase() === 'high' ? 'high-risk, high-reward' : 'engaging'} gameplay.`, date: '2024-12-15' },
    { author: 'Maria K.', rating: 4, text: `Great slot with solid RTP of ${s.rtp || '96.0'}%. The free spins feature is especially exciting. I play it regularly on SlotQuest in demo mode before wagering real money.`, date: '2024-11-28' },
    { author: 'James T.', rating: 4, text: `Decent slot from ${s.providers?.name || 'the developer'}. The ${formatMaxWin(s.max_win)}x max win potential is attractive. Love the theme and sound design. Would recommend trying the demo first.`, date: '2024-10-10' }
  ]
})

const computedHowToPlay = computed(() => {
  if (slot.value.info_how_to_play) {
    try { return JSON.parse(slot.value.info_how_to_play) } catch(e) { /* fallback */ }
  }
  const name = slot.value.name || 'the slot'
  const btnText = slot.value.info_demo_btn_text || 'Play Demo Now'
  return [
    { step: 'Open the Demo', text: `Click "${btnText}" on this page to launch ${name} in free play mode. No registration or deposit required.` },
    { step: 'Set Your Bet', text: `Use the controls at the bottom of the game screen to adjust your bet size. Start with the minimum bet to learn the mechanics.` },
    { step: 'Spin the Reels', text: `Click the Spin button or press Space. Watch for winning combinations across the ${formatPaylines(slot.value.paylines)} paylines.` },
    { step: 'Trigger Bonuses', text: `Land special symbols to activate bonus features like free spins, multipliers, and other rewards. Check the paytable (ℹ) for details.` }
  ]
})

const similarSlots = computed(() => {
  if (!allSlots.value?.length || !slot.value?.id) return []
  const currentProvider = slot.value.providers?.id
  const currentId = slot.value.id
  return allSlots.value
    .filter(s => s.id !== currentId && (s.providers?.id === currentProvider || s.provider_id === currentProvider))
    .slice(0, 6)
})

// 🌍 Geo Targeting: Парсинг регионов из БД
const parsedGeoRegions = computed(() => {
  if (!slot.value?.geo_regions) return []
  try {
    const regions = JSON.parse(slot.value.geo_regions)
    return Array.isArray(regions) ? regions : []
  } catch (e) {
    return []
  }
})






// Вычисляемые свойства для текстов с заменой ключевых слов
// 🔑 Работает аналогично replaceKeywordsInText для hero_keyword
const overviewDescription1 = computed(() => {
  if (!slot.value.overview_description_1) return ''

  let result = slot.value.overview_description_1

  // Замена [keyword_1] с усиленной SEO-разметкой
  // Используем itemprop="keywords" для Schema.org + стилизацию
  if (slot.value.overview_keyword_1) {
    result = result.replace(
      /\[keyword_1\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${slot.value.overview_keyword_1}</strong>`,
    )
  }

  // Замена [keyword_2] с усиленной SEO-разметкой
  if (slot.value.overview_keyword_2) {
    result = result.replace(
      /\[keyword_2\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${slot.value.overview_keyword_2}</strong>`,
    )
  }

  // Замена [keyword_3] с усиленной SEO-разметкой
  if (slot.value.overview_keyword_3) {
    result = result.replace(
      /\[keyword_3\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${slot.value.overview_keyword_3}</strong>`,
    )
  }

  console.log('🔄 Overview замена:', {
    исходный: slot.value.overview_description_1,
    результат: result,
    keywords: {
      k1: slot.value.overview_keyword_1,
      k2: slot.value.overview_keyword_2,
      k3: slot.value.overview_keyword_3,
    },
  })

  return result
})

const overviewDescription2 = computed(() => {
  if (!slot.value.overview_description_2) return ''

  let result = slot.value.overview_description_2

  // Замена [keyword_1] с усиленной SEO-разметкой
  if (slot.value.overview_keyword_1) {
    result = result.replace(
      /\[keyword_1\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${slot.value.overview_keyword_1}</strong>`,
    )
  }

  // Замена [keyword_2] с усиленной SEO-разметкой
  if (slot.value.overview_keyword_2) {
    result = result.replace(
      /\[keyword_2\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${slot.value.overview_keyword_2}</strong>`,
    )
  }

  // Замена [keyword_3] с усиленной SEO-разметкой
  if (slot.value.overview_keyword_3) {
    result = result.replace(
      /\[keyword_3\]/g,
      `<strong class="text-blue-700 font-bold" itemprop="keywords">${slot.value.overview_keyword_3}</strong>`,
    )
  }

  return result
})


// Награды теперь управляются через админку (убрали хардкод для Gates of Olympus)



// Методы

// 🎯 Initialize SEO
useSlotSEO({
  slot,
  parsedGeoRegions,
  computedFaq,
  computedHowToPlay,
  computedReviews,
  similarSlots,
  loading,
  error
})

const loadSlot = async () => {
  try {
    loading.value = true
    error.value = null

    console.log('🔄 Загрузка слота по slug:', slug)

    // Загружаем конкретный слот по slug с полными данными включая hero_keyword поля
    const slotData = await $fetch(`http://localhost:3001/api/slots/${slug}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    })

    console.log('✅ Слот загружен:', {
      name: slotData.name,
      hero_keyword: slotData.hero_keyword,
      hero_keyword_2: slotData.hero_keyword_2,
      hero_keyword_3: slotData.hero_keyword_3,
      description: slotData.description?.substring(0, 100) + '...',
    })

    // 🔍 ДИАГНОСТИКА: Проверяем overview keywords
    console.log('🔑 Overview Keywords:', {
      overview_keyword_1: slotData.overview_keyword_1,
      overview_keyword_2: slotData.overview_keyword_2,
      overview_keyword_3: slotData.overview_keyword_3,
      overview_description_1:
        slotData.overview_description_1?.substring(0, 50) + '...',
    })

    if (!slotData) {
      throw new Error(`Слот с адресом "${slug}" не найден`)
    }

    slot.value = slotData

    // Загружаем механики для этого слота
    try {
      const mechanicsData = await $fetch(
        `http://localhost:3001/api/mechanics/slot/${slotData.id}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        },
      )
      slotMechanics.value = mechanicsData || []
      console.log('✅ Механики слота загружены:', slotMechanics.value)
    } catch (mechanicsError) {
      console.warn('⚠️ Не удалось загрузить механики слота:', mechanicsError)
      slotMechanics.value = []
    }

    // Также загружаем все слоты для похожих слотов (без блокировки основной загрузки)
    $fetch('http://localhost:3001/api/slots', {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    })
      .then((slotsResponse) => {
        const slotsData = slotsResponse.data || slotsResponse
        allSlots.value = slotsData
      })
      .catch((err) => {
        console.warn('Не удалось загрузить список всех слотов:', err)
      })

    // 🎯 Асинхронно загружаем JSON-LD с сервера (если слот имеет id)
    if (slot.value.id) {
      fetchRawJsonLd(slot.value.id)
        .then((schemas) => {
          if (schemas && schemas.length > 0) {
            jsonLdSchemas.value = schemas
            console.log(`✅ JSON-LD загружен с сервера: ${schemas.length} схем`)
          }
        })
        .catch((err) => {
          console.warn('⚠️ Не удалось загрузить JSON-LD с сервера:', err)
        })
    }
  } catch (err) {
    console.error('❌ Ошибка загрузки slotа:', err)
    error.value = err.message || 'Произошла ошибка при загрузке slotа'
  } finally {
    loading.value = false
  }
}

// Функция для принудительного обновления данных slotа
const refreshSlot = async () => {
  await loadSlot()
}

const playSlot = () => {
  if (!slot.value) return

  // Проверяем, есть ли ссылка для демо-версии
  if (slot.value.demo_url && slot.value.demo_url.trim()) {
    // Открываем демо-версию в новой вкладке
    window.open(slot.value.demo_url, '_blank', 'noopener,noreferrer')
  } else {
    // Показываем уведомление, что демо-версия пока недоступна
    alert(
      `Демо-версия для игры "${slot.value.name || 'slot'}" временно недоступна. Обратитесь к администратору сайта.`,
    )
  }
}

const playForReal = () => {
  if (!slot.value) return

  // Проверяем, есть ли ссылка для игры for real money
  if (slot.value.real_play_url && slot.value.real_play_url.trim()) {
    // Открываем страницу казино в новой вкладке
    window.open(slot.value.real_play_url, '_blank', 'noopener,noreferrer')
  } else {
    // Показываем уведомление с предложением связаться с поддержкой
    alert(
      `Игра for real money для "${slot.value.name || 'slot'}" временно недоступна. Обратитесь к администратору сайта для получения информации о доступных казино.`,
    )
  }
}

const findCasino = () => {
  if (!slot.value) return
  // Здесь будет логика поиска казино с бонусами
  alert(`Поиск лучших казино для игры в ${slot.value.name || 'slot'}`)
}

// Обработчики медиа событий
const handleSlotImageError = (event) => {
  event.target.parentElement.innerHTML =
    '<div class="flex items-center justify-center h-full text-white/60"><svg class="w-12 h-12 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span>Изображение не найдено</span></div>'
}

const handleSlotVideoError = (event) => {
  event.target.parentElement.innerHTML =
    '<div class="flex items-center justify-center h-full text-white/60"><svg class="w-12 h-12 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg><span>Видео не найдено</span></div>'
}

// Функция для открытия изображения в полноэкранном режиме
const openImageFullscreen = () => {
  if (!slot.value?.image_url) return

  // Создаем модальное окно для полноэкранного изображения
  const modal = document.createElement('div')
  modal.className =
    'fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4'
  modal.onclick = () => modal.remove()

  const img = document.createElement('img')
  img.src = slot.value.image_url
  img.alt = `Изображение slotа ${slot.value.name}`
  img.className = 'max-w-full max-h-full object-contain rounded-xl shadow-2xl'
  img.onclick = (e) => e.stopPropagation()

  const closeBtn = document.createElement('button')
  closeBtn.innerHTML = '✕'
  closeBtn.className =
    'absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 text-white text-xl font-bold rounded-full transition-colors'
  closeBtn.onclick = () => modal.remove()

  modal.appendChild(img)
  modal.appendChild(closeBtn)
  document.body.appendChild(modal)
}


// 📱 Info Popup & Like State
const showInfoModal = ref(false)
const isLiked = ref(false)

// Инициализация лайка из localStorage
onMounted(() => {
  if (process.client && slot.value?.id) {
    const key = `slot_like_${slot.value.id}`
    isLiked.value = localStorage.getItem(key) === 'true'
  }
})

// Отслеживание изменения слота для обновления статуса лайка
watch(
  () => slot.value?.id,
  (newId) => {
    if (process.client && newId) {
      const key = `slot_like_${newId}`
      isLiked.value = localStorage.getItem(key) === 'true'
    }
  }
)

const toggleLike = () => {
  if (!process.client || !slot.value?.id) return

  isLiked.value = !isLiked.value
  const key = `slot_like_${slot.value.id}`

  if (isLiked.value) {
    localStorage.setItem(key, 'true')
    // Можно добавить аналитику или отправку на сервер в будущем
  } else {
    localStorage.removeItem(key)
  }
}






// Методы для рейтинга
const toggleRatingPicker = () => {
  showRatingPicker.value = !showRatingPicker.value
  if (!showRatingPicker.value) {
    selectedStars.value = null
    hoverStars.value = 0
    ratingSubmitted.value = false
  }
}

const setHover = (value) => {
  hoverStars.value = value
}

const clearHover = () => {
  hoverStars.value = 0
}

const pickRating = (value) => {
  selectedStars.value = value
}

const submitRating = async () => {
  if (selectedStars.value === null || !slot.value?.id) return
  try {
    ratingSubmitting.value = true
    // Заглушка отправки. При появлении API заменить на реальный вызов
    await new Promise((resolve) => setTimeout(resolve, 700))
    ratingSubmitted.value = true
  } finally {
    ratingSubmitting.value = false
  }
}



















// Загружаем данные при монтировании
onMounted(() => {
  loadSlot()
})

// Перезагружаем при изменении slug
watch(
  () => route.params.slug,
  () => {
    if (route.params.slug !== slug) {
      loadSlot()
    }
  },
)


</script>

<style scoped>
@keyframes scaleX {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* Анимация градиента для заголовка */
@keyframes gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1.2); }
  50% { transform: scale(1.35); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Улучшение читаемости first-letter */
.first-letter\:text-5xl::first-letter {
  line-height: 0.8;
}

/* Плавное появление контента */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

article {
  animation: fadeInUp 0.6s ease-out;
}

/* Улучшенный фокус для accessibility */
*:focus-visible {
  outline: 3px solid #4f46e5;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Animated Gradient Border for Icons */
@keyframes spin-gradient {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animated-gradient-border {
  position: relative;
  z-index: 10;
  border: none !important; /* Remove defaults if any */
}

.animated-gradient-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: conic-gradient(from 0deg, #3B82F6, #8B5CF6, #EC4899, #EF4444, #F59E0B, #10B981, #3B82F6);
  z-index: -1;
  animation: spin-gradient 4s linear infinite;

  /* Create a hollow ring */
  padding: 2px;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
}

/* Optional: Glow effect */
.animated-gradient-border::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: inherit;
  filter: blur(5px);
  z-index: -2;
  opacity: 0.5;
}
</style>
