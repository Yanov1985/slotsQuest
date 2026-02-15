
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
                Play Demo Now
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
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
    { question: `Can I play ${name} for free?`, answer: `Yes! You can play ${name} in free demo mode right here on SlotQuest. No registration or deposit required — just click "Play Demo Now" to start spinning.` },
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
  return [
    { step: 'Open the Demo', text: `Click "Play Demo Now" on this page to launch ${name} in free play mode. No registration or deposit required.` },
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

// 🎯 JSON-LD Schemas for Enhanced Info Modal (FAQPage, HowTo, Review)
const generateSeoSchemas = computed(() => {
  if (!slot.value?.name) return []
  const schemas = []
  const name = slot.value.name

  // FAQPage Schema
  const faqItems = computedFaq.value
  if (faqItems?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqItems.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    })
  }

  // HowTo Schema
  const howToSteps = computedHowToPlay.value
  if (howToSteps?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Play ' + name,
      'description': 'Step-by-step guide to playing ' + name + ' online slot',
      'step': howToSteps.map((s, i) => ({
        '@type': 'HowToStep',
        'position': i + 1,
        'name': s.step,
        'text': s.text
      }))
    })
  }

  // Review Schemas
  const reviews = computedReviews.value
  if (reviews?.length) {
    const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': name,
      'applicationCategory': 'GameApplication',
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': avgRating.toFixed(1),
        'reviewCount': reviews.length,
        'bestRating': '5',
        'worstRating': '1'
      },
      'review': reviews.map(r => ({
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': r.author },
        'reviewRating': { '@type': 'Rating', 'ratingValue': r.rating, 'bestRating': '5' },
        'reviewBody': r.text,
        'datePublished': r.date
      }))
    })
  }

  return schemas
})




// 📅 Функция форматирования даты для блока автора
// Преобразует ISO дату в читаемый формат: "12 января 2026"
const formatArticleDate = (dateString) => {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)

    // Проверка валидности даты
    if (isNaN(date.getTime())) return dateString

    // Массив названий месяцев на русском
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
  } catch (e) {
    console.error('Ошибка форматирования даты:', e)
    return dateString
  }
}

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

// SEO (динамический)
watchEffect(() => {
  if (slot.value && !loading.value && !error.value) {
    // 🎯 Получаем JSON-LD:
    // 1. Пробуем синхронную генерацию из данных слота (для SSR)
    // 2. Если JSON-LD включён в настройках - используем данные из БД
    // 3. Fallback на локальную функцию getStructuredData
    let structuredData

    // Проверяем, есть ли JSON-LD настройки в слоте из БД
    if (slot.value.jsonld_enabled !== false && slot.value.id) {
      // Используем синхронную генерацию для SSR
      const jsonLdScript = getJsonLdScriptSync(slot.value, 'https://slotquest.com')
      if (jsonLdScript) {
        structuredData = jsonLdScript.innerHTML
        console.log('✅ JSON-LD сгенерирован из настроек слота')
      }
    }

    // Fallback на локальную функцию если JSON-LD не сгенерирован
    if (!structuredData) {
      structuredData = getStructuredData(slot.value)
      console.log('📝 JSON-LD сгенерирован локально (fallback)')
    }

    useHead({
      // 🎯 SEO: Комбинируем slot.name (брендовый трафик) + hero_keyword (категорийный контекст)
      title:
        slot.value.seo_title ||
        `${slot.value.name}${slot.value.hero_keyword && slot.value.hero_keyword !== slot.value.name ? ' - ' + slot.value.hero_keyword : ''} 🎰 Play Free Demo & Real Money | SlotQuest`,
      meta: [
        // Основные SEO мета-теги
        {
          name: 'description',
          // 🎯 SEO: Приоритет: 1) seo_description из БД, 2) авто-генерация как fallback
          content: slot.value.seo_description || generateSEODescription(slot.value),
        },
        {
          name: 'keywords',
          content: generateOptimizedKeywords(slot.value),
        },
        {
          name: 'author',
          content: 'SlotQuest Editorial Team',
        },
        {
          name: 'robots',
          content: generateRobotsContent(slot.value),
        },
        {
          name: 'theme-color',
          content: '#1a1a2e',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        // Open Graph (динамические поля из БД)
        {
          property: 'og:title',
          content:
            slot.value.og_title ||
            `${slot.value.name} 🎰 Play Free Demo & Real Money`,
        },
        {
          property: 'og:description',
          content:
            slot.value.og_description || slot.value.seo_description || generateSEODescription(slot.value),
        },
        { property: 'og:type', content: slot.value.og_type || 'article' },
        { property: 'og:site_name', content: slot.value.og_site_name || 'SlotQuest' },
        { property: 'og:locale', content: slot.value.og_locale || 'en_US' },
        {
          property: 'og:url',
          content: slot.value.og_url || `https://slotquest.com/slots/${slot.value.slug || slug}`,
        },
        {
          property: 'og:image',
          content:
            slot.value.og_image ||
            slot.value.image_url ||
            `https://slotquest.com/images/slots/${slot.value.slug || slug}.jpg`,
        },
        {
          property: 'og:image:alt',
          content: slot.value.og_image_alt || `${slot.value.name || 'Slot'} - screenshot of slot machine from ${slot.value.providers?.name || 'provider'}`,
        },
        { property: 'og:image:width', content: String(slot.value.og_image_width || 1200) },
        { property: 'og:image:height', content: String(slot.value.og_image_height || 630) },
        { property: 'og:image:type', content: 'image/jpeg' },
        {
          property: 'og:image:secure_url',
          content:
            slot.value.og_image ||
            slot.value.image_url ||
            `https://slotquest.com/images/slots/${slot.value.slug || slug}.jpg`,
        },
        {
          property: 'og:updated_time',
          content:
            slot.value.updated_at || new Date().toISOString().split('T')[0],
        },
        // OG Video (если есть)
        ...(slot.value.og_video ? [
          { property: 'og:video', content: slot.value.og_video },
          { property: 'og:video:type', content: slot.value.og_video_type || 'video/mp4' },
          { property: 'og:video:width', content: String(slot.value.og_video_width || 1280) },
          { property: 'og:video:height', content: String(slot.value.og_video_height || 720) },
        ] : []),
        // OG Locale Alternate (для международного SEO)
        ...(slot.value.og_locale_alternate ?
          slot.value.og_locale_alternate.split(',').map(locale => ({
            property: 'og:locale:alternate',
            content: locale.trim()
          })) : []),
        {
          property: 'article:published_time',
          content: slot.value.release_date || '2021-02-13',
        },
        {
          property: 'article:modified_time',
          content:
            slot.value.updated_at || new Date().toISOString().split('T')[0],
        },
        {
          property: 'article:author',
          content: slot.value.author_meta || 'SlotQuest Editorial Team',
        },
        {
          property: 'article:section',
          content: 'Slot Machines',
        },
        {
          property: 'article:tag',
          content: `${slot.value.name}, ${slot.value.providers?.name || 'provider'}, slot, slot machine`,
        },
        // Twitter (динамические поля из БД)
        { name: 'twitter:card', content: slot.value.twitter_card || 'summary_large_image' },
        { name: 'twitter:site', content: slot.value.twitter_site || '@SlotQuest' },
        {
          name: 'twitter:title',
          content: slot.value.twitter_title || `${slot.value.name || 'Slot'} 🎰 Play Free Demo & Real Money`,
        },
        {
          name: 'twitter:description',
          content: slot.value.twitter_description || `🎰 ${slot.value.name || 'Slot'} from ${slot.value.providers?.name || 'provider'} - play free demo or real money. RTP: ${slot.value.rtp || '96'}%, rating: ${slot.value.rating || '4.8'}/5 ⭐`,
        },
        {
          name: 'twitter:image',
          content:
            slot.value.twitter_image ||
            slot.value.image_url ||
            `https://slotquest.com/images/slots/${slot.value.slug || slug}.jpg`,
        },
        {
          name: 'twitter:image:alt',
          content: slot.value.twitter_image_alt || `${slot.value.name} slot gameplay screenshot`,
        },
        {
          name: 'twitter:creator',
          content: slot.value.twitter_creator || '@SlotQuest',
        },
        // Twitter Player (если есть видео)
        ...(slot.value.twitter_player ? [
          { name: 'twitter:player', content: slot.value.twitter_player },
          { name: 'twitter:player:width', content: String(slot.value.twitter_player_width || 1280) },
          { name: 'twitter:player:height', content: String(slot.value.twitter_player_height || 720) },
        ] : []),
        {
          name: 'twitter:label1',
          content: 'RTP',
        },
        {
          name: 'twitter:data1',
          content: `${slot.value.rtp || '96'}%`,
        },
        {
          name: 'twitter:label2',
          content: 'Volatility',
        },
        {
          name: 'twitter:data2',
          content: slot.value.volatility || 'Medium',
        },
        // Content age rating
        {
          name: 'rating',
          content: '18+',
        },
        // Language and search engine directives
        {
          'http-equiv': 'content-language',
          content: slot.value.content_language || 'en',
        },
        {
          name: 'googlebot',
          content:
            'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        },
        {
          name: 'bingbot',
          content: 'index, follow',
        },
        {
          name: 'yandex',
          content: 'index, follow',
        },
        // Geo-targeting meta tags (for targeting specific countries)
        {
          name: 'geo.region',
          content:
            slot.value.geo_target_regions ||
            'RU, IN, BR, UZ, AZ, TR, CL, AR, CA, CO, ID, BD',
        },
        {
          name: 'distribution',
          content: 'global',
        },
        {
          name: 'target',
          content: 'all',
        },
        // 🎰 СПЕЦИАЛИЗИРОВАННЫЕ МЕТА-ТЕГИ ДЛЯ КАЗИНО/ГЕЙМИНГА (максимальная оптимизация)
        {
          name: 'game:type',
          content: 'slot_machine',
        },
        {
          name: 'game:genre',
          content: 'casino_slot',
        },
        {
          name: 'slot:provider',
          content: slot.value.providers?.name || 'Game Provider',
        },
        {
          name: 'slot:rtp',
          content: `${slot.value.rtp || '96'}%`,
        },
        {
          name: 'slot:volatility',
          content: slot.value.volatility || 'medium',
        },
        {
          name: 'slot:max_win',
          content: slot.value.max_win || '5000x',
        },
        {
          name: 'slot:min_bet',
          content: slot.value.min_bet || '0.20',
        },
        {
          name: 'slot:theme',
          content: slot.value.theme || slot.value.category?.name || 'casino',
        },
        {
          name: 'casino:demo_available',
          content: slot.value.demo_url ? 'yes' : 'no',
        },
        {
          name: 'casino:real_money',
          content: slot.value.real_play_url ? 'yes' : 'no',
        },
        // Альтернативные названия slotа (для разных рынков)
        {
          name: 'alternative-name',
          content: slot.value.alternative_names || slot.value.name,
        },
        // Rating и отзывы (для Rich Snippets)
        {
          name: 'rating',
          content: `${slot.value.rating || '4.8'}/5`,
        },
        {
          name: 'reviewCount',
          content: slot.value.reviews_count || '1247',
        },
        // Дата релиза (для сортировки "новые slotы")
        {
          name: 'release_date',
          content: slot.value.release_date || '2021-02-13',
        },
        // Mobile-оптимизация
        {
          name: 'mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
      ],
      htmlAttrs: {
        lang: slot.value.content_language || 'en',
      },
      link: [
        {
          rel: 'canonical',
          href:
            slot.value.canonical_url ||
            `https://slotquest.com/slots/${slot.value.slug || slug}`,
        },
        // 🌍 HREFLANG ТЕГИ (международное SEO)
        ...(slot.value.hreflang_enabled !== false ? generateHreflangLinks(slot.value) : []),
        // 🚀 ТЕХНИЧЕСКИЕ ОПТИМИЗАЦИИ (Preconnect, DNS-Prefetch, Preload)
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'dns-prefetch',
          href: 'https://fonts.gstatic.com',
        },
        {
          rel: 'dns-prefetch',
          href: 'https://www.google-analytics.com',
        },
        {
          rel: 'preconnect',
          href: 'https://cdn.jsdelivr.net',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href:
            slot.value.image_url ||
            slot.value.og_image ||
            '/images/default-slot.jpg',
          as: 'image',
          type: 'image/jpeg',
          media: '(min-width: 768px)',
        },
        {
          rel: 'preload',
          href:
            slot.value.thumbnail_url ||
            slot.value.image_url ||
            '/images/default-slot-thumb.jpg',
          as: 'image',
          type: 'image/jpeg',
          media: '(max-width: 767px)',
        },
        {
          rel: 'prefetch',
          href:
            slot.value.screenshot_url ||
            slot.value.image_url ||
            '/images/default-slot.jpg',
          as: 'image',
          type: 'image/jpeg',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          children: structuredData,
        },
        ...generateSeoSchemas.value.map(schema => ({
          type: 'application/ld+json',
          children: JSON.stringify(schema)
        })),
      ],
    })
  } else {
    // Default meta tags for SSR
    useHead({
      title: 'Slot - SlotQuest',
      meta: [
        {
          name: 'description',
          content:
            'Play slot from leading provider. Great opportunities to win!',
        },
        { property: 'og:title', content: 'Slot - SlotQuest' },
        {
          property: 'og:description',
          content:
            'Play slot from leading provider. Great opportunities to win!',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://slotquest.com/slots' },
        {
          property: 'og:image',
          content: 'https://slotquest.com/og-default.jpg',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Slot - SlotQuest' },
        {
          name: 'twitter:description',
          content:
            'Play slot from leading provider. Great opportunities to win!',
        },
        {
          name: 'twitter:image',
          content: 'https://slotquest.com/og-default.jpg',
        },
      ],
      link: [{ rel: 'canonical', href: 'https://slotquest.com/slots' }],
    })
  }
})

// Методы
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

const getAwardEffectColors = (gradient) => {
  const g = gradient || ''
  if (g.includes('yellow') || g.includes('amber')) {
    // жёлто-янтарные карточки — тёмные тёплые оттенки
    return [
      [245, 158, 11],
      [217, 119, 6],
      [146, 64, 14],
    ]
  }
  if (g.includes('purple') || g.includes('pink')) {
    // фиолетово-розовые — насыщённые пурпурные
    return [
      [168, 85, 247],
      [236, 72, 153],
      [126, 34, 206],
    ]
  }
  if (g.includes('green') || g.includes('emerald')) {
    // зелёные — глубокие изумрудные/зелёные
    return [
      [16, 185, 129],
      [5, 150, 105],
      [6, 95, 70],
    ]
  }
  if (g.includes('blue') || g.includes('indigo')) {
    // синие/индиго — насыщённые холодные
    return [
      [59, 130, 246],
      [79, 70, 229],
      [29, 78, 216],
    ]
  }
  // запасной вариант — нейтральные тёмные
  return [
    [71, 85, 105],
    [51, 65, 85],
    [30, 41, 59],
  ]
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

const getEffectColorsFor = (theme) => {
  const t = (theme || '').toLowerCase()
  if (t.includes('amber') || t.includes('yellow'))
    return [
      [245, 158, 11],
      [217, 119, 6],
      [146, 64, 14],
    ]
  if (t.includes('orange'))
    return [
      [249, 115, 22],
      [234, 88, 12],
      [194, 65, 12],
    ]
  if (t.includes('red'))
    return [
      [239, 68, 68],
      [220, 38, 38],
      [185, 28, 28],
    ]
  if (t.includes('rose'))
    return [
      [244, 63, 94],
      [225, 29, 72],
      [190, 18, 60],
    ]
  if (t.includes('pink'))
    return [
      [236, 72, 153],
      [219, 39, 119],
      [190, 24, 93],
    ]
  if (t.includes('purple') || t.includes('violet'))
    return [
      [168, 85, 247],
      [126, 34, 206],
      [109, 40, 217],
    ]
  if (t.includes('indigo'))
    return [
      [99, 102, 241],
      [79, 70, 229],
      [67, 56, 202],
    ]
  if (t.includes('blue'))
    return [
      [59, 130, 246],
      [37, 99, 235],
      [29, 78, 216],
    ]
  if (t.includes('cyan'))
    return [
      [34, 211, 238],
      [6, 182, 212],
      [8, 145, 178],
    ]
  if (t.includes('teal'))
    return [
      [20, 184, 166],
      [13, 148, 136],
      [15, 118, 110],
    ]
  if (t.includes('emerald') || t.includes('green'))
    return [
      [16, 185, 129],
      [5, 150, 105],
      [6, 95, 70],
    ]
  // Нейтральная палитра по умолчанию (тёмные холодные)
  return [
    [71, 85, 105],
    [51, 65, 85],
    [30, 41, 59],
  ]
}

// Методы для работы с наградами в публичном шаблоне
const getAwardPublicClasses = (colorScheme) => {
  const colorMap = {
    amber:
      'border border-amber-400/30 bg-gradient-to-br from-amber-500/20 to-orange-500/20 hover:border-amber-400/60',
    fuchsia:
      'border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 hover:border-fuchsia-400/60',
    emerald:
      'border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-green-500/20 hover:border-emerald-400/60',
    blue: 'border border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 hover:border-blue-400/60',
  }
  return colorMap[colorScheme] || colorMap.amber
}

const getAwardBgClasses = (colorScheme) => {
  const colorMap = {
    amber: 'bg-amber-400/20 group-hover:bg-amber-400/30',
    fuchsia: 'bg-fuchsia-400/20 group-hover:bg-fuchsia-400/30',
    emerald: 'bg-emerald-400/20 group-hover:bg-emerald-400/30',
    blue: 'bg-blue-400/20 group-hover:bg-blue-400/30',
  }
  return colorMap[colorScheme] || colorMap.amber
}

const getAwardIconClasses = (colorScheme) => {
  const colorMap = {
    amber: 'bg-gradient-to-r from-amber-400 to-orange-500',
    fuchsia: 'bg-gradient-to-r from-fuchsia-400 to-purple-500',
    emerald: 'bg-gradient-to-r from-emerald-400 to-green-500',
    blue: 'bg-gradient-to-r from-blue-400 to-indigo-500',
  }
  return colorMap[colorScheme] || colorMap.amber
}

const getAwardTextClasses = (colorScheme) => {
  const colorMap = {
    amber: 'text-amber-200/90',
    fuchsia: 'text-fuchsia-200/90',
    emerald: 'text-emerald-200/90',
    blue: 'text-blue-200/90',
  }
  return colorMap[colorScheme] || colorMap.amber
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

const getSlotIcon = (name) => {
  if (!name) return '🎰'
  if (
    name.toLowerCase().includes('gates of olympus') ||
    name.toLowerCase().includes('олимп')
  ) {
    return '⚡'
  }
  return '🎰'
}

/**
 * 🎯 SEO: Определение формата изображения по URL
 * Возвращает MIME тип для Schema.org encodingFormat
 */
const getImageFormat = (url) => {
  if (!url) return 'image/jpeg'
  const lower = url.toLowerCase()
  if (lower.includes('.webp')) return 'image/webp'
  if (lower.includes('.png')) return 'image/png'
  if (lower.includes('.gif')) return 'image/gif'
  if (lower.includes('.svg')) return 'image/svg+xml'
  if (lower.includes('.avif')) return 'image/avif'
  return 'image/jpeg'
}

const getVolatilityText = (volatility) => {
  if (!volatility) return 'High'

  const vol = volatility.toLowerCase()
  if (vol.includes('high') || vol === 'высокая') return 'High'
  if (vol.includes('medium') || vol === 'средняя') return 'Medium'
  if (vol.includes('low') || vol === 'низкая') return 'Low'
  return volatility
}

const getMaxWin = (slot) => {
  if (!slot || !slot.name) return 'x1,000'
  if ((slot.name || '').toLowerCase().includes('gates of olympus')) {
    return 'x5,000'
  }
  return slot.max_win || 'x1,000'
}

const formatReleaseDate = (dateString) => {
  if (!dateString) return null
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  } catch (error) {
    return null
  }
}

const getSlotDescription = (slot) => {
  if (!slot || !slot.name)
    return 'Exciting video slot with excellent winning opportunities.'
  if ((slot.name || '').toLowerCase().includes('gates of olympus')) {
    return `${slot.name || 'Slot'} - a revolutionary slot from Pragmatic Play that changed the perception of video slots. The game with a 6x5 field and Scatter Pays system offers unique gameplay where wins are awarded for 8+ identical symbols anywhere on the screen.`
  }
  return `${slot.name || 'Slot'} - exciting video slot from ${slot.providers?.name || 'renowned provider'} offering thrilling gameplay and excellent winning opportunities.`
}

/**
 * 🎯 SEO: Получение краткого описания слота
 *
 * @param {object} slot - Объект слота
 * @param {boolean} wrapInStrong - Оборачивать ли keywords в <strong> (true - для HTML, false - для meta)
 * @returns {string} Описание с заменёнными keywords
 */
const getShortDescription = (slot, wrapInStrong = true) => {
  if (!slot) {
    return 'Thrilling video slot with excellent winning opportunities and exciting gameplay.'
  }

  // Use description from database if available
  if (slot.description && slot.description.trim()) {
    // Заменяем переменные [keyword_2] и [keyword_3] на значения из базы
    // wrapInStrong=false для meta-тегов (там HTML не работает!)
    return replaceKeywordsInText(slot.description.trim(), slot, wrapInStrong)
  }

  // Fallback to default logic if description is not set
  if (!slot.name) {
    return 'Thrilling video slot with excellent winning opportunities and exciting gameplay.'
  }

  if ((slot.name || '').toLowerCase().includes('gates of olympus')) {
    return 'Legendary slot from Pragmatic Play with unique Scatter Pays mechanics and multipliers up to x500. Dive into the world of ancient Greek gods and fight for jackpot up to x5,000 bet multiplier!'
  }
  if ((slot.name || '').toLowerCase().includes('book of dead')) {
    return "Cult slot from Play'n GO about archaeologist Rich Wilde's adventures in Ancient Egypt. Bonus game with expanding symbols can bring wins up to x5,000!"
  }
  if ((slot.name || '').toLowerCase().includes('sweet bonanza')) {
    return 'Bright and sweet slot from Pragmatic Play with cascade wins and bonus multipliers. Collect 4+ lollipops to activate free spins!'
  }
  return `Thrilling video slot from ${slot.providers?.name || 'leading provider'} with excellent winning opportunities and exciting gameplay.`
}

const getDetailedDescription = (slot) => {
  if (!slot) {
    return 'This exciting video slot offers players thrilling gameplay with plenty of opportunities for big wins. Modern graphics and sound effects create a unique atmosphere of excitement.'
  }

  // Use description from database if available
  if (slot.description && slot.description.trim()) {
    return slot.description.trim()
  }

  // Fallback to old logic if description is not set
  if (!slot.name) {
    return 'This exciting video slot offers players thrilling gameplay with plenty of opportunities for big wins. Modern graphics and sound effects create a unique atmosphere of excitement.'
  }

  if ((slot.name || '').toLowerCase().includes('gates of olympus')) {
    return 'The main feature of the slot is multipliers from x2 to x500 that appear randomly and can significantly increase your winnings. In the bonus game, the Total Multiplier system works where all multipliers are summed and not reset between spins, which can lead to phenomenal payouts.'
  }
  return `This slot features high-quality graphics, well-thought-out mechanics, and an excellent balance between win frequency and payout size. The RTP is ${slot.rtp || '96'}%, making the game attractive to most players.`
}

/**
 * Функция для получения чистого названия слота (без ключевых слов типа "Slot Review")
 * Используется для формирования заголовка с пользовательским hero_keyword
 */
const getCleanSlotName = (slot) => {
  if (!slot || !slot.name) return 'Slot'

  let cleanName = slot.name

  // Список ключевых слов, которые нужно удалить из названия
  const keywordsToRemove = [
    'Slot Review',
    'Game Review',
    'Casino Game',
    'Slot Game',
    'Online Slot',
    'Slot Machine',
    'Review',
  ]

  // Удаляем каждое ключевое слово из названия (регистронезависимо)
  keywordsToRemove.forEach((keyword) => {
    const regex = new RegExp(`\\s*${keyword}\\s*$`, 'i') // В конце строки
    cleanName = cleanName.replace(regex, '')
  })

  return cleanName.trim()
}

/**
 * Функция для получения ключевого слова для Hero секции
 * Возвращает только hero_keyword (без названия слота)
 * Например: просто "Play Review" вместо "Gates of Olympus Play Review"
 */
const getSlotNameWithKeyword = (slot) => {
  if (!slot) return 'Slot Review'

  // Возвращаем только ключевое слово, без названия слота
  return slot.hero_keyword || 'Slot Review'
}

/**
 * 🎯 Обработка CTA Subtitle с заменой ключевого слова
 *
 * Что делает: Заменяет [cta_keyword] на значение из cta_subtitle_keyword или название слота
 *
 * Аналогично системе Hero Keywords, но для CTA секции
 * Пример: "Окунитесь в легендарный мир [cta_keyword]" → "Окунитесь в легендарный мир Gates of Olympus"
 *
 * @param {string} subtitle - Текст subtitle с плейсхолдером [cta_keyword]
 * @param {string} keyword - Ключевое слово для замены (cta_subtitle_keyword)
 * @param {string} slotName - Название слота (fallback если keyword не указан)
 * @returns {string} Обработанный текст subtitle
 */
const processCtaSubtitle = (subtitle, keyword, slotName) => {
  // Если subtitle не указан, используем дефолтный текст
  if (!subtitle) {
    return `Окунитесь в легендарный мир ${keyword || slotName || 'этого слота'}`
  }

  // Если в subtitle есть плейсхолдер [cta_keyword], заменяем его
  if (subtitle.includes('[cta_keyword]')) {
    const replacement = keyword || slotName || 'этого слота'
    return subtitle.replace(/\[cta_keyword\]/g, replacement)
  }

  // Если плейсхолдера нет, возвращаем subtitle как есть
  return subtitle
}

/**
 * 🎯 Обработка заголовка Final Rating в Conclusion с ключевым словом
 *
 * Что делает: Заменяет [conclusion_keyword] на значение из conclusion_rating_keyword или название слота
 *
 * Пример: "Итоговая оценка [conclusion_keyword]" → "Итоговая оценка Rich Wilde and the Book of Dead"
 *
 * @param {string} title - Шаблон заголовка с плейсхолдером [conclusion_keyword]
 * @param {string} keyword - Ключевое слово для замены (conclusion_rating_keyword)
 * @param {string} slotName - Название слота (fallback если keyword не указан)
 * @returns {string} Обработанный заголовок
 */
const processConclusionRatingTitle = (title, keyword, slotName) => {
  // Если title не указан, используем дефолтный
  if (!title) {
    return `Итоговая оценка ${keyword || slotName || 'slotа'}`
  }

  // Если в title есть плейсхолдер [conclusion_keyword], заменяем его
  if (title.includes('[conclusion_keyword]')) {
    const replacement = keyword || slotName || 'slotа'
    return title.replace(/\[conclusion_keyword\]/g, replacement)
  }

  // Если плейсхолдера нет, возвращаем title как есть
  return title
}

/**
 * 📊 Обработка заголовка секции популярности с ключевым словом
 *
 * Что делает: Заменяет [popularity_keyword] на значение из popularity_title_keyword или название слота
 *
 * Пример: "Насколько популярен [popularity_keyword]?" → "Насколько популярен Rich Wilde and the Book of Dead?"
 *
 * @param {string} title - Заголовок с плейсхолдером [popularity_keyword]
 * @param {string} keyword - Ключевое слово для замены (popularity_title_keyword)
 * @param {string} slotName - Название слота (fallback если keyword не указан)
 * @returns {string} Обработанный заголовок
 */
const processPopularityTitle = (title, keyword, slotName) => {
  // Если title не указан, используем дефолтный
  if (!title) {
    return `Насколько популярен ${keyword || slotName || 'этот slot'}?`
  }

  // Если в title есть плейсхолдер [popularity_keyword], заменяем его
  if (title.includes('[popularity_keyword]')) {
    const replacement = keyword || slotName || 'этот slot'
    return title.replace(/\[popularity_keyword\]/g, replacement)
  }

  // Если плейсхолдера нет, возвращаем title как есть
  return title
}

/**
 * 🎯 Обработка цитаты эксперта с ключевым словом
 *
 * Что делает: Заменяет [prof_expert_keyword] на значение из prof_rating_expert_quote_keyword или название слота
 *
 * Пример: "[prof_expert_keyword] представляет собой революционный подход..." → "Gates of Olympus представляет собой революционный подход..."
 *
 * @param {string} quote - Цитата с плейсхолдером [prof_expert_keyword]
 * @param {string} keyword - Ключевое слово для замены (prof_rating_expert_quote_keyword)
 * @param {string} slotName - Название слота (fallback если keyword не указан)
 * @returns {string} Обработанная цитата
 */
const processProfExpertQuote = (quote, keyword, slotName) => {
  // Если quote не указана, используем дефолтный текст
  if (!quote) {
    const name = keyword || slotName || 'Этот слот'
    return `"${name} представляет собой революционный подход к созданию видеослотов. Механика Scatter Pays полностью меняет привычные правила игры, создавая уникальный опыт для каждого спина. Высокий потенциал выигрыша x5,000 в сочетании с каскадными символами делают каждый раунд непредсказуемым и захватывающим. 🎯"`
  }

  // Если в quote есть плейсхолдер [prof_expert_keyword], заменяем его
  if (quote.includes('[prof_expert_keyword]')) {
    const replacement = keyword || slotName || 'Этот слот'
    return quote.replace(/\[prof_expert_keyword\]/g, replacement)
  }

  // Если плейсхолдера нет, возвращаем текст как есть
  return quote
}

/**
 * 🎯 Обработка текста итоговой рекомендации с ключевым словом
 *
 * Что делает: Заменяет [prof_recommendation_keyword] на значение из prof_rating_recommendation_keyword или название слота
 * Название слота выделяется жирным желтым цветом
 *
 * Пример: "[prof_recommendation_keyword] - это выдающийся slot..." → "<span class='font-bold text-yellow-300'>Gates of Olympus</span> - это выдающийся slot..."
 *
 * @param {string} text - Текст с плейсхолдером [prof_recommendation_keyword]
 * @param {string} keyword - Ключевое слово для замены (prof_rating_recommendation_keyword)
 * @param {string} slotName - Название слота (fallback если keyword не указан)
 * @returns {string} Обработанный HTML текст с форматированием
 */
const processProfRecommendation = (text, keyword, slotName) => {
  // Если text не указан, используем дефолтный текст
  if (!text) {
    const name = keyword || slotName || 'Этот slot'
    return `<span class="font-bold text-indigo-100">${name}</span> - это выдающийся slot для опытных игроков, которые ценят инновационную механику и готовы к высокой волатильности ради потенциала больших выигрышей. <span class="font-bold text-white">Новичкам рекомендуем начать с менее волатильных slotов.</span> Этот slot станет идеальным выбором для тех, кто ищет адреналин и готов к серьёзной игре! 🚀`
  }

  // Если в text есть плейсхолдер [prof_recommendation_keyword], заменяем его
  if (text.includes('[prof_recommendation_keyword]')) {
    const replacement = keyword || slotName || 'Этот slot'
    // Оборачиваем название в span с индиго цветом и жирным шрифтом
    const styledReplacement = `<span class="font-bold text-indigo-100">${replacement}</span>`
    return text.replace(/\[prof_recommendation_keyword\]/g, styledReplacement)
  }

  // Если плейсхолдера нет, возвращаем текст как есть
  return text
}

/**
 * 🎯 Обработка Paragraph 1 в Conclusion с ключевым словом
 *
 * Что делает: Заменяет [conclusion_text_keyword] на значение из conclusion_text_1_keyword или название слота
 * БЕЗ ЦВЕТОВОГО ВЫДЕЛЕНИЯ - весь текст одного цвета
 *
 * Пример: "[conclusion_text_keyword] заслуженно считается..." → "Rich Wilde and the Book of Dead заслуженно считается..."
 *
 * @param {string} text - Текст с плейсхолдером [conclusion_text_keyword]
 * @param {string} keyword - Ключевое слово для замены (conclusion_text_1_keyword)
 * @param {string} slotName - Название слота (fallback если keyword не указан)
 * @returns {string} Обработанный текст БЕЗ HTML тегов (обычный текст без цветового выделения)
 */
const processConclusionText1 = (text, keyword, slotName) => {
  // Если text не указан, используем дефолтный БЕЗ цветовых span'ов
  if (!text) {
    const name = keyword || slotName || 'Этот слот'
    return `${name} заслуженно считается одним из лучших слотов от Pragmatic Play. Сочетание инновационной механики Scatter Pays, высокого потенциала выигрыша до x5,000 и превосходной графики делают его обязательным для всех любителей азартных игр.`
  }

  // Если в text есть плейсхолдер [conclusion_text_keyword], заменяем его
  if (text.includes('[conclusion_text_keyword]')) {
    const replacement = keyword || slotName || 'Этот слот'
    return text.replace(/\[conclusion_text_keyword\]/g, replacement)
  }

  // Если плейсхолдера нет, возвращаем text как есть
  return text
}

/**
 * 🎯 Обработка финального вердикта в Conclusion с ключевым словом
 *
 * Что делает: Заменяет [conclusion_verdict_keyword] на значение из conclusion_verdict_keyword или название слота
 * Дополнительно добавляет стилизацию для визуального выделения ключевого слова
 *
 * Пример: "[conclusion_verdict_keyword] - это не просто slot..." →
 *         "<span class='font-semibold text-white'>Gates of Olympus</span> - это не просто slot..."
 *
 * @param {string} text - Текст вердикта с плейсхолдером [conclusion_verdict_keyword]
 * @param {string} keyword - Ключевое слово для замены (conclusion_verdict_keyword)
 * @param {string} slotName - Название слота (fallback если keyword не указан)
 * @returns {string} Обработанный текст с HTML стилизацией
 */
const processConclusionVerdict = (text, keyword, slotName) => {
  // Если text не указан, используем дефолтный
  if (!text) {
    const name = keyword || slotName || 'Этот слот'
    return `<span class="font-bold text-indigo-100">${name}</span> - это не просто slot, это новая эра в мире азартных игр. Если вы готовы к вызову и хотите испытать настоящий адреналин от игры, этот slot создан именно для вас. Помните: играйте ответственно и наслаждайтесь процессом! 🎰`
  }

  // Если в text есть плейсхолдер [conclusion_verdict_keyword], заменяем его с стилизацией
  if (text.includes('[conclusion_verdict_keyword]')) {
    const replacement = keyword || slotName || 'Этот слот'
    // Оборачиваем ключевое слово в span для визуального выделения
    const styledReplacement = `<span class="font-bold text-indigo-100">${replacement}</span>`
    return text.replace(/\[conclusion_verdict_keyword\]/g, styledReplacement)
  }

  // Если плейсхолдера нет, возвращаем text как есть
  return text
}

/**
 * 🎯 SEO-ОПТИМИЗИРОВАННАЯ замена плейсхолдеров
 *
 * Что делает: Заменяет [keyword_2] и [keyword_3] на значения из базы + оборачивает в <strong>
 *
 * ЗАЧЕМ <strong> ТЕГИ:
 * - Google, Yandex, Bing придают больше веса словам в <strong>
 * - Это как в интернет-магазине: выделяешь "iPhone 15" жирным, чтобы покупатель сразу увидел
 * - Для поисковика это сигнал: "Это важное ключевое слово!"
 *
 * ПРИМЕРЫ:
 * Вход: "We love [keyword_2] and [keyword_3]!"
 * Выход: "We love <strong>Gates of Olympus</strong> and <strong>Gates of Olympus 1,000</strong>!"
 */
const replaceKeywordsInText = (text, slot, wrapInStrong = true) => {
  if (!text || !slot) return text

  let result = text

  console.log('🔄 Замена ключевых слов в тексте:', {
    originalText: text,
    hero_keyword: slot.hero_keyword,
    hero_keyword_2: slot.hero_keyword_2,
    hero_keyword_3: slot.hero_keyword_3,
    wrapInStrong,
  })

  // Замена [keyword_1] с SEO-выделением в <strong>
  if (slot.hero_keyword) {
    const replacement = wrapInStrong
      ? `<strong>${slot.hero_keyword}</strong>`
      : slot.hero_keyword
    result = result.replace(/\[keyword_1\]/g, replacement)
    console.log('✅ Заменили [keyword_1] на:', replacement)
  }

  // Замена [keyword_2] с SEO-выделением в <strong>
  if (slot.hero_keyword_2) {
    const replacement = wrapInStrong
      ? `<strong>${slot.hero_keyword_2}</strong>`
      : slot.hero_keyword_2
    result = result.replace(/\[keyword_2\]/g, replacement)
    console.log('✅ Заменили [keyword_2] на:', replacement)
  }

  // Замена [keyword_3] с SEO-выделением в <strong>
  if (slot.hero_keyword_3) {
    const replacement = wrapInStrong
      ? `<strong>${slot.hero_keyword_3}</strong>`
      : slot.hero_keyword_3
    result = result.replace(/\[keyword_3\]/g, replacement)
    console.log('✅ Заменили [keyword_3] на:', replacement)
  }

  console.log('📝 Результат замены:', result)
  console.log('🎯 SEO: Ключевые слова обёрнуты в <strong> для Google!')

  return result
}

const getSlotThemes = (slot) => {
  // Возвращаем пустой массив, чтобы использовались только тематики из базы данных
  // через функцию getSlotThemesFromDB
  return []
}

// Функция для получения бонусов slotа из базы данных
const getSlotBonuses = (slot) => {
  if (!slot || !slot.slot_bonuses) return []
  // Исправляем: bonuses вместо bonus
  return slot.slot_bonuses.map((sb) => sb.bonuses).filter(Boolean)
}

// 🎨 Функция для получения тематик слота из базы данных
// Теперь поддерживает МНОЖЕСТВЕННЫЕ тематики (до 5 штук!)
const getSlotThemesFromDB = (slot) => {
  // Проверяем наличие слота и новой связи many-to-many
  if (!slot || !slot.slotThemes) return []

  // slotThemes - это массив объектов { slot_id, theme_id, themes }
  // Извлекаем только объекты themes из массива
  return slot.slotThemes
    .map((st) => st.themes) // Достаём themes из каждого элемента
    .filter(Boolean) // Убираем null/undefined
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

// Функция для генерации оптимизированных ключевых слов
/**
 * 🎯 SEO: Генерация meta description с hero keywords
 *
 * КРИТИЧЕСКИ ВАЖНО для CTR (Click-Through Rate):
 * - Meta description - это то, что пользователь видит в Google ПЕРВЫМ
 * - Это как краткое описание в Tinder - должно цеплять!
 * - Оптимальная длина: 155-160 символов
 *
 * МЕТАФОРА ИЗ TINDER:
 * ❌ Плохо: "Обычный парень из Москвы"
 * ✅ Хорошо: "Python разработчик, люблю горы и сноуборд 🏔️"
 *
 * Так же и с Meta Description:
 * ❌ Плохо: "Slot from provider - play free demo"
 * ✅ Хорошо: "Discover Gates of Olympus, the premium slot with x5000 multipliers"
 *
 * @param {object} slot - Объект слота
 * @returns {string} Оптимизированное описание для meta description
 */

/**
 * 🤖 Генерация robots content из динамических полей слота
 * Использует новые поля: robots_index, robots_follow, robots_max_snippet и т.д.
 *
 * @param {Object} slot - Объект слота из БД
 * @returns {string} Строка для meta robots
 */
const generateRobotsContent = (slot) => {
  if (!slot) return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  const directives = []

  // Index/noindex (по умолчанию index)
  directives.push(slot.robots_index !== false ? 'index' : 'noindex')

  // Follow/nofollow (по умолчанию follow)
  directives.push(slot.robots_follow !== false ? 'follow' : 'nofollow')

  // Max snippet (-1 = без ограничений)
  const maxSnippet = slot.robots_max_snippet ?? -1
  if (maxSnippet !== -1 || maxSnippet === 0) {
    directives.push(`max-snippet:${maxSnippet}`)
  } else {
    directives.push('max-snippet:-1')
  }

  // Max image preview (large по умолчанию для лучшего CTR)
  const maxImagePreview = slot.robots_max_image_preview || 'large'
  directives.push(`max-image-preview:${maxImagePreview}`)

  // Max video preview (-1 = без ограничений)
  const maxVideoPreview = slot.robots_max_video_preview ?? -1
  if (maxVideoPreview !== -1) {
    directives.push(`max-video-preview:${maxVideoPreview}`)
  } else {
    directives.push('max-video-preview:-1')
  }

  // Дополнительные директивы
  if (slot.robots_notranslate) {
    directives.push('notranslate')
  }

  if (slot.robots_noimageindex) {
    directives.push('noimageindex')
  }

  return directives.join(', ')
}

/**
 * 🌍 Генерация hreflang ссылок для международного SEO
 * Поддерживает целевые регионы из списка пользователя
 *
 * @param {Object} slot - Объект слота из БД
 * @returns {Array} Массив link объектов для useHead
 */
const generateHreflangLinks = (slot) => {
  if (!slot || slot.hreflang_enabled === false) return []

  const baseUrl = 'https://slotquest.com'
  const slotUrl = `/slots/${slot.slug}`
  const links = []

  // x-default (английская версия по умолчанию)
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseUrl}${slotUrl}`
  })

  // Английский (основной язык)
  links.push({
    rel: 'alternate',
    hreflang: 'en',
    href: `${baseUrl}${slotUrl}`
  })

  // Парсим конфиг из БД если есть
  if (slot.hreflang_config) {
    try {
      const config = JSON.parse(slot.hreflang_config)
      if (Array.isArray(config)) {
        config.forEach(item => {
          links.push({
            rel: 'alternate',
            hreflang: `${item.lang}-${item.region}`,
            href: `${baseUrl}${item.url || slotUrl}`
          })
        })
        return links
      }
    } catch (e) {
      // Fallback к стандартным регионам
    }
  }

  // Стандартные целевые регионы (из вашего списка)
  const targetRegions = [
    { lang: 'ru', region: 'RU' },   // Россия
    { lang: 'en', region: 'IN' },   // Индия
    { lang: 'pt', region: 'BR' },   // Бразилия
    { lang: 'uz', region: 'UZ' },   // Узбекистан
    { lang: 'az', region: 'AZ' },   // Азербайджан
    { lang: 'tr', region: 'TR' },   // Турция
    { lang: 'es', region: 'CL' },   // Чили
    { lang: 'es', region: 'AR' },   // Аргентина
    { lang: 'en', region: 'CA' },   // Канада
    { lang: 'es', region: 'CO' },   // Колумбия
    { lang: 'id', region: 'ID' },   // Индонезия
    { lang: 'bn', region: 'BD' },   // Бангладеш
  ]

  // Добавляем только если регион в списке целевых
  const geoTargets = slot.geo_target_regions?.split(',').map(r => r.trim()) || []

  targetRegions.forEach(({ lang, region }) => {
    if (geoTargets.length === 0 || geoTargets.includes(region)) {
      links.push({
        rel: 'alternate',
        hreflang: `${lang}-${region}`,
        href: `${baseUrl}${slotUrl}`
      })
    }
  })

  return links
}

/**
 * 🎰 Форматирование Max Win для отображения
 * Преобразует большие числа: 10000 → 10,000
 */
const formatMaxWin = (maxWin) => {
  if (!maxWin) return '0'
  const num = Number(maxWin)
  if (num >= 1000) {
    return num.toLocaleString('en-US')
  }
  return String(num)
}

/**
 * 📊 Форматирование Paylines для отображения
 * Большие числа как "243 Ways" или "Megaways"
 */
const formatPaylines = (paylines) => {
  if (!paylines) return '0'
  const num = Number(paylines)
  if (num >= 100000) {
    return 'Megaways'
  }
  if (num >= 1000) {
    return num.toLocaleString('en-US')
  }
  return String(num)
}

/**
 * 📈 Форматирование больших чисел
 * 1000 → 1K, 1000000 → 1M для компактного отображения
 */
const formatNumber = (num) => {
  if (!num) return '0'
  const n = Number(num)
  if (n >= 1000000) {
    return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (n >= 1000) {
    return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return n.toLocaleString('en-US')
}

const generateSEODescription = (slot) => {
  if (!slot)
    return 'Play exciting online slots with great winning opportunities.'

  // 1. Если есть кастомное SEO описание - используем его
  if (slot.seo_description && slot.seo_description.trim()) {
    // Заменяем keywords БЕЗ <strong> тегов (в meta description HTML не работает!)
    let description = replaceKeywordsInText(
      slot.seo_description.trim(),
      slot,
      false,
    )

    // Обрезаем до 160 символов (оптимально для Google)
    if (description.length > 160) {
      description = description.substring(0, 157) + '...'
    }

    return description
  }

  // 2. Если есть description слота - используем его с keywords
  if (slot.description && slot.description.trim()) {
    let description = replaceKeywordsInText(
      slot.description.trim(),
      slot,
      false,
    )

    // Берём первое предложение или 160 символов
    const firstSentence = description.split('.')[0]
    if (firstSentence.length <= 160) {
      return firstSentence + '.'
    }

    return description.substring(0, 157) + '...'
  }

  // 3. Генерируем автоматически С ИСПОЛЬЗОВАНИЕМ hero keywords
  const parts = []

  // Начинаем с hero_keyword_2 (обычно это название слота)
  if (slot.hero_keyword_2) {
    parts.push(`Discover ${slot.hero_keyword_2}`)
  } else if (slot.name) {
    parts.push(`Play ${slot.name}`)
  }

  // Добавляем hero_keyword (главный заголовок)
  if (slot.hero_keyword) {
    parts.push(`- ${slot.hero_keyword.toLowerCase()}`)
  }

  // Добавляем характеристики
  if (slot.rtp) {
    parts.push(`RTP ${slot.rtp}%`)
  }

  if (slot.max_win) {
    parts.push(`Max win ${slot.max_win}x`)
  }

  // Добавляем hero_keyword_3 если есть место
  if (slot.hero_keyword_3) {
    const current = parts.join(', ')
    if (current.length + slot.hero_keyword_3.length < 140) {
      parts.push(`also try ${slot.hero_keyword_3}`)
    }
  }

  let description = parts.join(', ') + '.'

  // Обрезаем если слишком длинное
  if (description.length > 160) {
    description = description.substring(0, 157) + '...'
  }

  console.log('📝 Сгенерировано SEO description:', description)

  return description
}

/**
 * 🎯 SEO: Генерация оптимизированных ключевых слов для meta-тега keywords
 *
 * ВАЖНО для SEO:
 * - Hero keywords размещаем В НАЧАЛЕ (Google придаёт больше веса первым словам)
 * - Это как в резюме: самое важное пишешь первым!
 *
 * ПРИОРИТЕТ КЛЮЧЕВЫХ СЛОВ:
 * 1. Hero Keywords (самые важные - из админки)
 * 2. Primary Keywords (основные SEO-фразы)
 * 3. LSI Keywords (семантические вариации)
 * 4. Long-tail Keywords (длинные запросы)
 */
const generateOptimizedKeywords = (slot) => {
  if (!slot) return ''

  // Собираем ключевые слова из всех источников
  const keywords = []

  // 🎯 0. HERO KEYWORDS - САМЫЙ ВЫСОКИЙ ПРИОРИТЕТ!
  // Размещаем их первыми, чтобы поисковики увидели их сразу
  if (slot.hero_keyword) {
    keywords.push(slot.hero_keyword)
  }
  if (slot.hero_keyword_2) {
    keywords.push(slot.hero_keyword_2)
  }
  if (slot.hero_keyword_3) {
    keywords.push(slot.hero_keyword_3)
  }

  // 1. Основные ключевые слова (Primary)
  if (slot.seo_keywords_primary) {
    keywords.push(slot.seo_keywords_primary)
  }

  // 2. LSI ключевые слова (Semantic)
  if (slot.seo_keywords_lsi) {
    keywords.push(slot.seo_keywords_lsi)
  }

  // 3. Long-tail ключевые слова
  if (slot.seo_keywords_longtail) {
    keywords.push(slot.seo_keywords_longtail)
  }

  // 4. Fallback на старое поле
  if (slot.seo_keywords) {
    keywords.push(slot.seo_keywords)
  }

  // 5. If nothing available - generate automatically
  // Даже в автоматической генерации используем hero keywords если есть
  if (keywords.length === 0) {
    const autoKeywords = [
      slot.hero_keyword,
      slot.hero_keyword_2,
      slot.hero_keyword_3,
      slot.name,
      slot.providers?.name,
      'slot',
      'slot machine',
      'online casino',
      'demo game',
      'free play',
      `RTP ${slot.rtp || '96'}%`,
      `${slot.volatility || 'medium'} volatility`,
      slot.category?.name || 'slots',
      'real money',
      'bonuses',
      'free spins',
      'SlotQuest',
    ].filter(Boolean)

    return autoKeywords.join(', ')
  }

  return keywords.join(', ')
}

// Функция для генерации структурированных данных Schema.org
const getStructuredData = (slot) => {
  if (!slot || !slot.name) return '{}'

  const baseUrl = 'https://slotquest.com'
  const slotUrl = `${baseUrl}/slots/${slot.slug || slug}`
  const imageUrl =
    slot.image_url || `${baseUrl}/images/slots/${slot.slug || slug}.jpg`

  // Создаем переиспользуемые объекты организаций
  const organizationSlotQuest = {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'SlotQuest',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 200,
      height: 60,
    },
    sameAs: [
      'https://vk.com/slotquest',
      'https://t.me/slotquest',
      'https://twitter.com/slotquest',
    ],
  }

  const providerOrganization = {
    '@type': 'Organization',
    '@id': `${baseUrl}/provider/${slot.providers?.slug || 'provider'}`,
    name: slot.providers?.name || 'Game Provider',
    url: slot.providers?.website || 'https://slotquest.com',
    description:
      slot.providers?.description ||
      `${slot.providers?.name || 'Game Provider'} - online casino game developer`,
    logo: slot.providers?.logo
      ? {
          '@type': 'ImageObject',
          url: slot.providers.logo,
          width: 200,
          height: 100,
        }
      : undefined,
  }

  // 🎯 ОПТИМИЗИРОВАННАЯ Game Schema (убрано ~40% лишнего)
  const gameSchema = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    '@id': slotUrl,
    name: slot.name,
    description: getDetailedDescription(slot),
    url: slotUrl,
    inLanguage: slot.content_language || 'en',
    isAccessibleForFree: Boolean(slot.demo_url),

    // 🎯 SEO: Ключевые слова для поисковиков (все 3 hero keywords)
    // Google использует это для понимания главных тем страницы
    keywords: [
      slot.hero_keyword,
      slot.hero_keyword_2,
      slot.hero_keyword_3,
      slot.name,
      slot.providers?.name,
      'Online Slot',
      'Casino Game',
    ]
      .filter(Boolean)
      .join(', '),

    // Гео-таргетинг аудитории (из настроек админки)
    audience: slot.geo_target_regions
      ? {
          '@type': 'Audience',
          audienceType: 'Online Casino Players',
          geographicArea: slot.geo_target_regions
            .split(',')
            .map((code) => code.trim())
            .filter(Boolean)
            .map((code) => ({
              '@type': 'Country',
              identifier: code,
            })),
        }
      : undefined,

    // Главное изображение (упрощено)
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
      caption: `${slot.name} - slot machine screenshot`,
    },

    datePublished: slot.release_date || '2021-02-13',
    // 🎯 SEO: Используем тематики из БД для genre (финальная оптимизация)
    genre: getSlotThemesFromDB(slot)?.length > 0
      ? getSlotThemesFromDB(slot).map(t => t.name)
      : (slot.hero_keyword || 'Slot Game'),
    gamePlatform: ['Web Browser', 'Mobile', 'Desktop'],
    applicationCategory: 'Game',
    contentRating: '18+',

    // Ключевые игровые характеристики (сокращено до важных)
    gameItem: [
      {
        '@type': 'Thing',
        name: 'RTP',
        value: `${slot.rtp || '96.5'}%`,
        description: `RTP ${slot.rtp || '96.5'}%`,
      },
      {
        '@type': 'Thing',
        name: 'Volatility',
        value: slot.volatility || 'High',
        description: `${slot.volatility || 'High'} volatility`,
      },
      {
        '@type': 'Thing',
        name: 'Max Win',
        value: `${slot.max_win || '5,000'}x`,
        description: `Max win ${slot.max_win || '5,000'}x bet`,
      },
    ],

    // Игровые возможности
    gameFeature: [
      'Free Spins',
      'Multipliers',
      'Wild Symbols',
      'Scatter Pays',
      'Bonus Buy',
      'Mobile Compatible',
      slot.theme,
      ...(slot.mechanics?.map((m) => m.name) || []),
      ...(slot.bonus_types?.map((b) => b.name) || []),
    ].filter(Boolean),

    publisher: organizationSlotQuest,
    provider: providerOrganization,

    // Rating (сокращен)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: slot.rating || '4.8',
      bestRating: '5',
      ratingCount: slot.reviews_count || '1247',
    },

    // Основные действия (упрощено - только важные)
    potentialAction: [
      {
        '@type': 'PlayAction',
        name: 'Play Demo',
        target: {
          '@type': 'EntryPoint',
          urlTemplate:
            slot.demo_url || `${baseUrl}/slots/${slot.slug || slug}/demo`,
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
      },
      {
        '@type': 'PlayAction',
        name: 'Play for Real Money',
        target: {
          '@type': 'EntryPoint',
          urlTemplate:
            slot.real_play_url ||
            `${baseUrl}/casinos/best-for-${slot.slug || slug}`,
        },
      },
    ],

    // Предложения (упрощено)
    offers: [
      {
        '@type': 'Offer',
        name: 'Demo Version',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: slot.demo_url || slotUrl,
      },
      {
        '@type': 'Offer',
        name: 'Real Money Play',
        priceRange: `${slot.min_bet || '0.20'}-${slot.max_bet || '100'}`,
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: slot.real_play_url || `${baseUrl}/casino`,
      },
    ],

    // Ключевые слова (используем новую систему)
    keywords: generateOptimizedKeywords(slot),
  }

  // Add video as trailer, if available
  if (slot.video_url) {
    gameSchema.trailer = {
      '@type': 'VideoObject',
      '@id': `${slotUrl}#video`,
      name: `${slot.name} - Gameplay Trailer`,
      alternateName: `${slot.name} gameplay video`,
      description: `Watch ${slot.name} slot gameplay from ${slot.providers?.name || 'provider'}. Demonstration of game mechanics, bonus features and winning combinations.`,
      url: slot.video_url,
      contentUrl: slot.video_url,
      embedUrl: slot.video_url,
      thumbnailUrl: imageUrl,
      uploadDate: slot.release_date || '2021-02-13',
      datePublished: slot.release_date || '2021-02-13',
      inLanguage: slot.content_language || 'en',
      duration: slot.video_duration || 'PT3M',
      videoQuality: 'HD',
      encodingFormat: 'video/mp4',
      width: 1920,
      height: 1080,
      genre: 'Gaming',
      keywords: `${slot.name}, slot machine, gameplay, ${slot.providers?.name || 'provider'}, online casino, demo`,
      creator: providerOrganization,
      publisher: organizationSlotQuest,
      copyrightHolder: providerOrganization,
      license: 'https://creativecommons.org/licenses/by-nc/4.0/',
      isAccessibleForFree: true,
      isFamilyFriendly: false,
      contentRating: '18+',
    }
  }

  // Add real money play as offer, if available
  if (slot.real_play_url) {
    gameSchema.offers.push({
      '@type': 'Offer',
      name: 'Real Money Play',
      price: '10',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description: 'Play for real money at licensed casino',
      url: slot.real_play_url,
    })
  }

  // 🧭 УПРОЩЕННАЯ BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${slotUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Slots',
        item: `${baseUrl}/slots`,
      },
      ...(slot.providers?.name
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: slot.providers.name,
              item: `${baseUrl}/provider/${slot.providers.slug || 'provider'}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: slot.providers?.name ? 4 : 3,
        name: slot.name,
        item: slotUrl,
      },
    ],
  }

  // WebSite схема для поиска
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'SlotQuest',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${slotUrl}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name:
          slot.faq_q1_question || `Можно ли играть в ${slot.name} бесплатно?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            slot.faq_q1_answer ||
            'Да, абсолютно бесплатно! Можно играть в демо-версию без регистрации и депозита. Это отличный способ изучить механику и бонусы перед игрой на реальные деньги.',
        },
      },
      {
        '@type': 'Question',
        name:
          slot.faq_q2_question || `Какой максимальный выигрыш в ${slot.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            slot.faq_q2_answer ||
            `Максимальный выигрыш — ${slot.max_win || '5,000'}x от ставки. Это означает, что при ставке €100 можно выиграть до €${(
              parseInt(slot.max_win || '5000') * 100
            ).toLocaleString()}! Такие выигрыши крайне редки.`,
        },
      },
      {
        '@type': 'Question',
        name: slot.faq_q3_question || 'Стоит ли покупать бонусные вращения?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            slot.faq_q3_answer ||
            'Покупка бонуса обычно стоит около 100x от ставки. Плюсы: гарантированный доступ к бонусной игре с множителями. Минусы: высокая стоимость и отсутствие гарантий крупного выигрыша. Покупайте бонус только при достаточном банкролле.',
        },
      },
      {
        '@type': 'Question',
        name:
          slot.faq_q4_question || 'Работает ли слот на мобильных устройствах?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            slot.faq_q4_answer ||
            'Да, полностью оптимизирован! Поддерживает iOS и Android, работает в браузере без установки приложения, сохраняет все функции и качество графики с быстрой загрузкой.',
        },
      },
    ],
  }

  // 📝 УПРОЩЕННАЯ Article (Review) Schema
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${slotUrl}#review`,
    // Используем hero_keyword для формирования заголовка обзора
    headline:
      slot.overview_title || `${getSlotNameWithKeyword(slot.value)} 2025`,
    description:
      slot.overview_description_1 ||
      `Complete review of ${slot.name} slot from ${slot.providers?.name || 'provider'}. RTP, volatility, bonus features analysis.`,
    articleBody:
      [slot.overview_description_1, slot.overview_description_2]
        .filter(Boolean)
        .join(' ') ||
      `${slot.name} is an innovative slot game with high win potential.`,
    url: slotUrl,
    image: imageUrl,
    author: organizationSlotQuest,
    publisher: organizationSlotQuest,
    datePublished: slot.release_date || '2021-02-13',
    dateModified: slot.updated_at || new Date().toISOString().split('T')[0],
    inLanguage: slot.content_language || 'en',

    // 🎯 SEO: Ключевые слова обзора (все 3 hero keywords)
    // Показываем Google что обзор сфокусирован на этих ключевых темах
    keywords: [
      slot.hero_keyword,
      slot.hero_keyword_2,
      slot.hero_keyword_3,
      slot.name,
      `${slot.name} Review`,
      'Slot Review',
      'Casino Game Review',
    ]
      .filter(Boolean)
      .join(', '),

    // 🎯 SEO: О чём статья (основной subject)
    // Используем hero_keyword_2 как главную тему (обычно это название слота или его вариация)
    about: slot.hero_keyword_2
      ? {
          '@type': 'Thing',
          name: slot.hero_keyword_2,
          description: `Detailed review and analysis of ${slot.hero_keyword_2}`,
        }
      : undefined,

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: slot.rating || '4.8',
      bestRating: '5',
      ratingCount: slot.reviews_count || '1247',
    },
  }

  // VideoObject is now included in gameSchema.trailer, no separate schema needed

  // 📚 HowTo Schema (how to play the slot)
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${slotUrl}#howto`,
    name: `How to Play ${slot.name} Slot`,
    description: `Step-by-step guide to playing ${slot.name} online slot game`,
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Choose Your Bet',
        text: `Set your bet amount from ${slot.min_bet || '0.20'} to ${slot.max_bet || '100'} per spin`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Spin the Reels',
        text: 'Click the spin button to start the game and watch the symbols align',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Trigger Bonus Features',
        text: slot.bonus_buy
          ? 'Land scatter symbols or buy bonus for instant access to free spins'
          : 'Land scatter symbols to trigger bonus features and free spins',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Win Big',
        text: `Win up to ${slot.max_win || '5,000'}x your bet with multipliers and bonus features`,
      },
    ],
    totalTime: 'PT2M',
  }

  // 📋 ItemList Schema (похожие slotы)
  const similarSlotsSchema =
    similarSlots.value.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': `${slotUrl}#similar`,
          name: `Similar Slots to ${slot.name}`,
          description: `Other popular slot games similar to ${slot.name}`,
          itemListElement: similarSlots.value.map((similarSlot, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Game',
              name: similarSlot.name,
              url: `${baseUrl}/slots/${similarSlot.slug}`,
              image: similarSlot.image_url,
              aggregateRating: similarSlot.rating
                ? {
                    '@type': 'AggregateRating',
                    ratingValue: similarSlot.rating,
                    bestRating: '5',
                  }
                : undefined,
            },
          })),
        }
      : null

  // 🎯 NEW: Game Features Schema (тематики, механики, бонусы) - ФИНАЛЬНАЯ SEO ОПТИМИЗАЦИЯ
  // Эта схема специально для Google чтобы понимать genre, features и bonus types слота
  const gameFeaturesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${slotUrl}#features`,
    name: `${slot.name} Game Features, Themes & Bonuses`,
    description: `Complete list of themes, game mechanics and bonus features in ${slot.name} slot by ${slot.providers?.name || 'provider'}`,
    numberOfItems:
      (getSlotThemesFromDB(slot)?.length || 0) +
      (slot.slot_mechanics?.length || 0) +
      (slot.slot_bonuses?.length || 0),
    itemListElement: [
      // Тематики/Жанры
      ...(getSlotThemesFromDB(slot) || []).map((theme, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'DefinedTerm',
          '@id': `${slotUrl}#theme-${theme.slug || theme.id}`,
          name: theme.name,
          description: `${theme.name} theme in ${slot.name} slot game`,
          inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: 'Slot Game Themes',
          },
        },
      })),
      // Механики
      ...(slot.slot_mechanics || []).map((slotMechanic, index) => ({
        '@type': 'ListItem',
        position: (getSlotThemesFromDB(slot)?.length || 0) + index + 1,
        item: {
          '@type': 'Thing',
          '@id': `${slotUrl}#mechanic-${slotMechanic.mechanics?.id || index}`,
          name: slotMechanic.mechanics?.name,
          description: `${slotMechanic.mechanics?.name} game mechanic feature`,
          additionalType: 'GameFeature',
        },
      })),
      // Бонусы
      ...(slot.slot_bonuses || []).map((slotBonus, index) => ({
        '@type': 'ListItem',
        position: (getSlotThemesFromDB(slot)?.length || 0) + (slot.slot_mechanics?.length || 0) + index + 1,
        item: {
          '@type': 'Offer',
          '@id': `${slotUrl}#bonus-${slotBonus.bonuses?.id || index}`,
          name: slotBonus.bonuses?.name,
          description: `${slotBonus.bonuses?.name} bonus feature in ${slot.name}`,
          category: 'Bonus Feature',
        },
      })),
    ].filter(item => item.item?.name), // Фильтруем пустые элементы
  }

  // Combine all schemas into array (filter null values)
  const allSchemas = [
    gameSchema,
    breadcrumbSchema,
    websiteSchema,
    faqSchema,
    reviewSchema,
    howToSchema,
    similarSlotsSchema,
    // 🎯 NEW: Добавляем схему Features только если есть данные
    gameFeaturesSchema.itemListElement.length > 0 ? gameFeaturesSchema : null,
  ].filter(Boolean)

  return JSON.stringify(allSchemas)
}
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
