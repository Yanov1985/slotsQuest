<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
  >
    <!-- Навигация -->
    <nav
      class="bg-white/95 backdrop-blur-sm shadow-lg border-b sticky top-0 z-50"
    >
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/slots"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <svg
              class="w-5 h-5 mr-2"
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
            Back to Slots Catalog
          </NuxtLink>

          <!-- Хлебные крошки -->
          <div class="hidden md:flex items-center text-sm text-gray-500">
            <NuxtLink to="/" class="hover:text-blue-600 transition-colors"
              >Home</NuxtLink
            >
            <span class="mx-2">/</span>
            <NuxtLink to="/slots" class="hover:text-blue-600 transition-colors"
              >Slots</NuxtLink
            >
            <span class="mx-2">/</span>
            <span class="text-gray-800 font-medium" v-if="slot">{{
              slot.name || 'Slot'
            }}</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Загрузка -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"
        ></div>
        <p class="mt-6 text-xl text-gray-600">Loading slot game...</p>
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

    <!-- Hero секция -->
    <main
      v-else-if="slot"
      role="main"
      class="relative shadow-2xl mb-8 bg-zinc-950 text-slate-100 border border-white/10"
    >
      <!-- Анимированный фон -->
      <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-beam transform skew-x-12"
        ></div>
        <div
          class="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style="animation-delay: 1s"
        ></div>
        <div
          class="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/15 rounded-full blur-2xl animate-pulse"
          style="animation-delay: 2s"
        ></div>
      </div>

      <!-- Декоративные элементы -->
      <div
        class="absolute top-8 right-8 text-white/10 text-8xl animate-float"
        aria-hidden="true"
      >
        ⚡
      </div>
      <div
        class="absolute bottom-8 left-8 text-white/10 text-6xl animate-float"
        style="animation-delay: 1.5s"
        aria-hidden="true"
      >
        🏛️
      </div>
      <div
        class="absolute top-1/3 right-1/4 text-white/10 text-4xl animate-float"
        style="animation-delay: 3s"
        aria-hidden="true"
      >
        💎
      </div>

      <div class="relative z-10 max-w-full lg:flex lg:min-h-screen">
        <!-- Левая часть: Игровая информация с Aurora Background (в dark-контейнере) -->
        <section
          class="dark w-full lg:w-[70%] lg:sticky lg:top-0 lg:self-start"
        >
          <AuroraBackground
            class="!h-auto !min-h-screen !flex-col !justify-start !items-stretch"
            :show-radial-gradient="true"
          >
            <article
              class="p-8 lg:p-12 flex flex-col justify-start min-w-0 h-full"
              role="article"
              aria-labelledby="slot-title"
              itemscope
              itemtype="https://schema.org/Game"
            >
              <!-- 🎯 SEO: Дополнительные мета-теги для Game schema -->
              <meta
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
              <header class="mb-8" role="banner">
                <!-- Provider (mobile version) -->
                <section
                  class="flex items-center gap-3 mb-6 flex-wrap lg:hidden"
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

                <!-- Главный заголовок -->
                <h1
                  id="slot-title"
                  class="text-2xl lg:hidden font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent mb-6 leading-relaxed drop-shadow-md transition-all duration-500 py-2"
                  style="line-height: 1.3; padding-bottom: 0.5rem"
                  tabindex="0"
                  role="heading"
                  aria-level="1"
                  aria-label="Название slot machine"
                  itemprop="name"
                >
                  <span>{{ slot.name || 'Слот' }}</span>
                  <span
                    v-if="slot.provider?.name"
                    class="text-lg font-medium opacity-90"
                  >
                    от <span>{{ slot.provider.name }}</span>
                  </span>
                  <span
                    v-if="slot.rtp"
                    class="text-base font-normal opacity-80"
                  >
                    • RTP <span>{{ slot.rtp }}%</span>
                  </span>
                </h1>

                <!-- Slot description (mobile version) -->
                <section
                  class="lg:hidden mb-6"
                  role="region"
                  aria-labelledby="slot-description"
                >
                  <div
                    id="slot-description"
                    class="text-white/80 text-lg lg:text-xl leading-relaxed max-w-2xl space-y-2"
                    role="text"
                    aria-label="Подробное описание slot machine с характеристиками"
                  >
                    <!-- 🎯 SEO: description с microdata для Google -->
                    <meta
                      itemprop="description"
                      :content="getShortDescription(slot, false)"
                    />

                    <!-- Основное SEO-описание -->
                    <p class="font-medium">
                      <strong class="text-white">{{
                        getSlotNameWithKeyword(slot)
                      }}</strong>
                      <span v-if="slot.provider?.name" class="text-white/90">
                        от <span>{{ slot.provider.name }}</span>
                      </span>
                      —
                      <!-- 🎯 SEO: v-html позволяет отображать <strong> теги для выделения keywords -->
                      <span v-html="getShortDescription(slot)"></span>
                    </p>

                    <!-- Характеристики с Schema.org microdata -->
                    <p
                      class="text-base text-white/70"
                      v-if="slot.rtp || slot.volatility || slot.min_bet"
                    >
                      <!-- 🎯 SEO: RTP как PropertyValue -->
                      <span
                        v-if="slot.rtp"
                        class="inline-block mr-4"
                        itemprop="gameFeature"
                        itemscope
                        itemtype="https://schema.org/PropertyValue"
                      >
                        <meta itemprop="name" content="RTP" />
                        <meta itemprop="value" :content="String(slot.rtp)" />
                        <span class="font-medium text-white/80">RTP:</span>
                        <span class="text-green-400" itemprop="value"
                          >{{ slot.rtp }}%</span
                        >
                      </span>

                      <!-- 🎯 SEO: Volatility как PropertyValue -->
                      <span
                        v-if="slot.volatility"
                        class="inline-block mr-4"
                        itemprop="gameFeature"
                        itemscope
                        itemtype="https://schema.org/PropertyValue"
                      >
                        <meta itemprop="name" content="Volatility" />
                        <meta itemprop="value" :content="slot.volatility" />
                        <span class="font-medium text-white/80"
                          >Volatility:</span
                        >
                        <span class="text-blue-400" itemprop="value">{{
                          slot.volatility
                        }}</span>
                      </span>

                      <!-- 🎯 SEO: Min Bet как PropertyValue -->
                      <span
                        v-if="slot.min_bet"
                        class="inline-block"
                        itemprop="gameFeature"
                        itemscope
                        itemtype="https://schema.org/PropertyValue"
                      >
                        <meta itemprop="name" content="Min Bet" />
                        <meta
                          itemprop="value"
                          :content="String(slot.min_bet)"
                        />
                        <span class="font-medium text-white/80">Min Bet:</span>
                        <span class="text-yellow-400" itemprop="value">{{
                          slot.min_bet
                        }}</span>
                      </span>
                    </p>
                  </div>
                </section>

                <!-- Rating and voting (mobile version) -->
                <div
                  class="flex flex-wrap items-center gap-6 mb-8 lg:hidden"
                  role="group"
                  aria-label="Rating and voting"
                  itemprop="aggregateRating"
                  itemscope
                  itemtype="https://schema.org/AggregateRating"
                >
                  <!-- 🎯 SEO: Meta-теги для Google Rich Snippets (звёздочки в поиске!) -->
                  <meta
                    itemprop="ratingValue"
                    :content="String(slot.rating || 4.8)"
                  />
                  <meta itemprop="bestRating" content="5" />
                  <meta
                    itemprop="ratingCount"
                    :content="String(slot.reviews_count || 1247)"
                  />
                  <meta itemprop="worstRating" content="1" />

                  <!-- Current rating -->
                  <div class="flex items-center gap-2">
                    <div
                      class="flex text-yellow-400"
                      aria-label="Rating 4.8 out of 5 stars"
                    >
                      <svg
                        v-for="n in 5"
                        :key="n"
                        class="w-7 h-7 lg:w-6 lg:h-6 drop-shadow-lg"
                        :class="n <= 4 ? 'text-yellow-400' : 'text-gray-400'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        :aria-hidden="true"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </div>
                    <span
                      class="text-white font-bold text-lg"
                      itemprop="ratingValue"
                      >{{ slot.rating || 4.8 }}</span
                    >
                    <span class="text-white/60">/ 5</span>
                  </div>

                  <!-- Vote button -->
                  <button
                    class="px-4 py-2 rounded-full text-sm font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                    @click="toggleRatingPicker"
                    :aria-expanded="showRatingPicker"
                    aria-controls="rating-picker"
                    type="button"
                  >
                    Vote!
                  </button>
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
                            ? 'Отправка оценки'
                            : 'Отправить оценку'
                        "
                      >
                        {{ ratingSubmitting ? 'Отправка…' : 'Голосовать' }}
                      </button>
                      <div
                        v-if="ratingSubmitted"
                        class="flex items-center gap-2 text-emerald-300 font-semibold"
                        role="status"
                        aria-live="polite"
                      >
                        <span aria-hidden="true">✔</span>
                        <span>Голос учтён</span>
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
                        <meta itemprop="width" content="1200" />
                        <meta itemprop="height" content="630" />

                        <img
                          :src="slot.image_url"
                          :alt="`${slot.name} - Slot Screenshot | ${slot.providers?.name || 'Provider'} | Play Free Demo`"
                          class="w-full h-full object-cover"
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
                  <!-- Provider (desktop) - SEO оптимизированный -->
                  <section
                    class="flex items-center gap-3 mb-6 flex-wrap"
                    aria-labelledby="provider-label-desktop"
                    role="region"
                  >
                    <h3 id="provider-label-desktop" class="sr-only">
                      Game Provider Information
                    </h3>
                    <address
                      class="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-purple-400/30 not-italic transition-all duration-300 hover:from-purple-500/40 hover:to-pink-500/40 hover:border-purple-400/50"
                      role="contentinfo"
                      aria-label="Game developer and publisher information"
                    >
                      <span class="font-semibold" title="Game Provider">
                        {{ slot.providers?.name || 'Pragmatic Play' }}
                      </span>
                    </address>
                  </section>

                  <!-- Главный заголовок (desktop) -->
                  <h1
                    class="hidden lg:block text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-md transition-all duration-500"
                    style="line-height: 1.3"
                    tabindex="0"
                    :data-game-name="slot.name"
                    :data-game-provider="slot.providers?.name"
                    :data-game-category="slot.slot_categories?.name"
                    :data-game-rtp="slot.rtp"
                    :data-game-volatility="slot.volatility"
                    :data-game-min-bet="slot.min_bet"
                    :data-game-max-bet="slot.max_bet"
                    :data-game-max-win="slot.max_win"
                    :data-game-reels="slot.reels"
                    :data-game-rows="slot.rows"
                    :data-game-paylines="slot.paylines"
                    :data-game-release-date="slot.release_date"
                    :data-game-mobile="slot.is_mobile_compatible"
                    :data-game-demo="slot.is_demo_available"
                    :data-game-rating="slot.rating"
                    :data-game-play-count="slot.play_count"
                    role="heading"
                    aria-level="1"
                    aria-describedby="game-description"
                  >
                    {{ slot.name || 'Слот' }}
                  </h1>

                  <!-- Rating and voting (desktop) -->
                  <section
                    class="flex flex-wrap items-center gap-6 mb-8"
                    role="group"
                    aria-label="Rating and voting"
                    :data-rating-value="4.8"
                    :data-rating-count="1247"
                    :data-best-rating="5"
                    :data-worst-rating="1"
                  >
                    <!-- Current rating -->
                    <div
                      class="flex items-center gap-2"
                      role="img"
                      :aria-label="`Rating ${4.8} из ${5} stars на основе ${1247} reviews`"
                      :data-rating="4.8"
                      :data-max-rating="5"
                      :data-review-count="1247"
                    >
                      <div
                        class="flex text-yellow-400"
                        role="presentation"
                        aria-hidden="true"
                        :title="`${4.8} stars из ${5}`"
                      >
                        <svg
                          v-for="n in 5"
                          :key="n"
                          class="w-6 h-6 drop-shadow-lg transition-colors duration-200"
                          :class="n <= 4 ? 'text-yellow-400' : 'text-gray-400'"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          :data-star-number="n"
                          :data-star-filled="n <= 4"
                          role="presentation"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      </div>
                      <span
                        class="text-white font-bold text-lg"
                        aria-label="Rating 4.8"
                        >4.8</span
                      >
                      <span class="text-white/60" aria-label="из 5 максимум">
                        / <span aria-label="максимальный рейтинг">5</span>
                      </span>
                      <span
                        class="text-white/40 text-sm ml-2"
                        aria-label="количество reviews"
                        :title="`Based on ${1247} отзывах users`"
                      >
                        ({{ 1247 }} reviews)
                      </span>
                    </div>

                    <!-- Vote button -->
                    <button
                      class="px-4 py-2 rounded-full text-sm font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                      @click="toggleRatingPicker"
                      :aria-expanded="showRatingPicker"
                      aria-controls="rating-picker-desktop"
                      type="button"
                      :aria-label="`Проголосовать за slot ${slot?.name || 'игру'}`"
                      :title="`Оценить ${slot?.name || 'игру'} - текущий рейтинг ${4.8}/5`"
                      role="button"
                      :data-action-type="'vote'"
                      :data-target-item="slot?.name"
                      :data-current-rating="4.8"
                      :data-vote-count="1247"
                    >
                      <span role="presentation" aria-hidden="true">Vote!</span>
                    </button>
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
                          {{ ratingSubmitting ? 'Отправка...' : 'Отправить' }}
                        </button>
                        <button
                          class="px-4 py-2 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                          @click="toggleRatingPicker"
                          type="button"
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Описание slotа (desktop) - SEO оптимизированное -->
                  <section
                    class="mb-4"
                    role="region"
                    aria-labelledby="slot-description-desktop"
                  >
                    <p
                      id="slot-description-desktop"
                      class="text-white/80 text-lg leading-relaxed"
                      role="text"
                      aria-label="Подробное описание slot machine"
                    >
                      <strong>{{ getSlotNameWithKeyword(slot) }}</strong> -
                      <!-- 🎯 SEO: v-html для отображения <strong> тегов вокруг keywords -->
                      <span v-html="getShortDescription(slot)"></span>
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
                          >Demo slot</span
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
                          >Demo Slot</span
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
                          >Real Slot</span
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
                          >Real Slot</span
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

              <!-- Игровой экран -->
              <div
                class="lg:hidden aspect-video bg-gradient-to-br from-black/40 via-purple-900/30 to-black/40 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center mb-8 relative overflow-hidden group"
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
                    :alt="`Изображение slotа ${slot.name} - Превью slot machine от ${slot.providers?.name || 'Pragmatic Play'}`"
                    :title="`${slot.name} - Demo version slot machine`"
                    class="w-full h-full object-contain"
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

                <!-- Содержимое экрана -->
                <div class="text-center relative z-10">
                  <div
                    class="text-white text-9xl lg:text-[12rem] font-black mb-6 drop-shadow-2xl animate-float"
                    aria-hidden="true"
                    role="presentation"
                  >
                    {{ getSlotIcon(slot.name || '') }}
                  </div>
                  <div
                    class="bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20"
                  >
                    <h3 class="text-white/90 text-lg font-bold mb-2">
                      {{ slot.name || 'Слот' }}
                    </h3>
                    <p class="text-white/60 text-sm">
                      {{ slot.providers?.name || 'Pragmatic Play' }}
                    </p>
                  </div>
                </div>

                <!-- Кнопка Play -->
                <a
                  v-if="slot.demo_url && slot.demo_url.trim()"
                  :href="slot.demo_url"
                  target="_blank"
                  rel="nofollow noopener"
                  class="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-black/20 transition-all duration-500 group focus:outline-none focus:ring-4 focus:ring-green-400/30"
                  :aria-label="`Launch game demo version ${slot.name}`"
                  :title="`Play ${slot.name} - Demo version`"
                  :data-game-name="slot.name"
                  :data-game-provider="slot.providers?.name"
                  :data-action-type="demo"
                >
                  <div
                    class="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:shadow-green-500/50 transition-all duration-500"
                    role="button"
                    tabindex="-1"
                  >
                    <svg
                      class="w-12 h-12 lg:w-14 lg:h-14 text-white ml-2"
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
                  class="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-black/20 transition-all duration-500 group focus:outline-none focus:ring-4 focus:ring-green-400/30"
                  @click="playSlot"
                  type="button"
                  :aria-label="`Launch game demo version ${slot.name}`"
                  :title="`Play ${slot.name} - Demo version`"
                  :data-game-name="slot.name"
                  :data-game-provider="slot.providers?.name"
                  :data-action-type="demo"
                >
                  <div
                    class="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:shadow-green-500/50 transition-all duration-500"
                    role="presentation"
                  >
                    <svg
                      class="w-12 h-12 lg:w-14 lg:h-14 text-white ml-2"
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
                        >Играть бесплатно</span
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
                        >Играть бесплатно</span
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

                <!-- Реальная игра -->
                <section class="relative" aria-labelledby="real-play-heading">
                  <h3 id="real-play-heading" class="sr-only">
                    Игра for real money
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
                        >Играть на деньги</span
                      >
                      <span
                        class="relative z-10 bg-orange-500/20 text-xs px-3 py-1 rounded-full font-semibold"
                        aria-label="Реальные деньги"
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
                        >Играть на деньги</span
                      >
                      <span
                        class="relative z-10 bg-orange-500/20 text-xs px-3 py-1 rounded-full font-semibold"
                        aria-label="Реальные деньги"
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

        <!-- Правая часть: Характеристики и информация (прокручиваемая) -->
        <aside
          class="w-full lg:w-[30%] bg-white/10 backdrop-blur-md p-8 lg:p-10 border-l border-white/20 min-w-0"
          style="min-height: 150vh"
          aria-label="Game characteristics and additional information"
        >
          <div class="space-y-8">
            <!-- Main characteristics -->
            <section aria-labelledby="characteristics-heading">
              <h2
                id="characteristics-heading"
                class="text-2xl font-bold text-white mb-6 flex items-center gap-3"
              >
                <div
                  class="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    class="w-4 h-4 text-white"
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

              <dl class="grid grid-cols-1 gap-4">
                <!-- RTP -->
                <div
                  class="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm p-5 rounded-2xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <!-- Canvas Reveal Effect -->
                  <CanvasRevealEffect
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
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <svg
                            class="w-5 h-5 text-white"
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
                        <dt class="text-white font-bold">RTP</dt>
                      </div>
                      <dd class="text-emerald-300 text-sm font-medium">
                        Return
                      </dd>
                    </div>
                    <dd class="text-3xl font-black text-white mb-1">
                      {{ slot.rtp || '96.50' }}%
                    </dd>
                    <dd class="text-emerald-300 text-sm">High rate</dd>
                  </div>
                </div>

                <!-- Volatility -->
                <div
                  class="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm p-5 rounded-2xl border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <!-- Canvas Reveal Effect -->
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
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <svg
                            class="w-5 h-5 text-white"
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
                        <dt class="text-white font-bold">Volatility</dt>
                      </div>
                      <dd class="text-orange-300 text-sm font-medium">Risk</dd>
                    </div>
                    <dd class="text-2xl font-black text-white mb-1 capitalize">
                      {{ getVolatilityText(slot.volatility) }}
                    </dd>
                    <dd class="text-orange-300 text-sm">Medium risk</dd>
                  </div>
                </div>

                <!-- Maximum win -->
                <div
                  class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-5 rounded-2xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <!-- Canvas Reveal Effect -->
                  <CanvasRevealEffect
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
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <svg
                            class="w-5 h-5 text-white"
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
                        <dt class="text-white font-bold">Max win</dt>
                      </div>
                      <dd class="text-purple-300 text-sm font-medium">
                        Potential
                      </dd>
                    </div>
                    <dd class="text-3xl font-black text-white mb-1">
                      {{ getMaxWin(slot) }}
                    </dd>
                    <dd class="text-purple-300 text-sm">Per bet</dd>
                  </div>
                </div>

                <!-- Minimum bet -->
                <div
                  class="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm p-5 rounded-2xl border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <!-- Canvas Reveal Effect -->
                  <CanvasRevealEffect
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('blue')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <svg
                            class="w-5 h-5 text-white"
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
                        </div>
                        <dt class="text-white font-bold">Min bet</dt>
                      </div>
                      <dd class="text-blue-300 text-sm font-medium">
                        Per spin
                      </dd>
                    </div>
                    <dd class="text-2xl font-black text-white mb-1">
                      {{ slot.min_bet || '€0.20' }}
                    </dd>
                    <dd class="text-blue-300 text-sm">Available to all</dd>
                  </div>
                </div>

                <!-- Maximum bet -->
                <div
                  class="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm p-5 rounded-2xl border border-teal-400/30 hover:border-teal-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <!-- Canvas Reveal Effect -->
                  <CanvasRevealEffect
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('teal')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <svg
                            class="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold">Max bet</dt>
                      </div>
                      <dd class="text-teal-300 text-sm font-medium">
                        Per spin
                      </dd>
                    </div>
                    <dd class="text-2xl font-black text-white mb-1">
                      {{ slot.max_bet || '€100' }}
                    </dd>
                    <dd class="text-teal-300 text-sm">High rollers</dd>
                  </div>
                </div>

                <!-- Release date -->
                <div
                  class="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-sm p-5 rounded-2xl border border-amber-400/30 hover:border-amber-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <!-- Canvas Reveal Effect -->
                  <CanvasRevealEffect
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('amber')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <svg
                            class="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold">Release date</dt>
                      </div>
                      <dd class="text-amber-300 text-sm font-medium">Launch</dd>
                    </div>
                    <dd class="text-2xl font-black text-white mb-1">
                      {{ formatReleaseDate(slot.release_date) || '13.02.2021' }}
                    </dd>
                    <dd class="text-amber-300 text-sm">Pragmatic Play</dd>
                  </div>
                </div>

                <!-- Number of reels -->
                <div
                  class="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-sm p-5 rounded-2xl border border-rose-400/30 hover:border-rose-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <!-- Canvas Reveal Effect -->
                  <CanvasRevealEffect
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('rose')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <svg
                            class="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                            ></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold">Reels</dt>
                      </div>
                      <dd class="text-rose-300 text-sm font-medium">
                        Structure
                      </dd>
                    </div>
                    <dd class="text-3xl font-black text-white mb-1">
                      {{
                        slot.reels && slot.rows
                          ? `${slot.reels}×${slot.rows}`
                          : slot.game_field || '5×3'
                      }}
                    </dd>
                    <dd class="text-rose-300 text-sm">
                      {{ slot.paylines || 'Scatter Pays' }}
                    </dd>
                  </div>
                </div>

                <!-- Payout type -->
                <div
                  class="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm p-5 rounded-2xl border border-violet-400/30 hover:border-violet-400/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <!-- Canvas Reveal Effect -->
                  <CanvasRevealEffect
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('violet')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <div class="relative z-10">
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <svg
                            class="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            ></path>
                          </svg>
                        </div>
                        <dt class="text-white font-bold">Paylines</dt>
                      </div>
                      <dd class="text-violet-300 text-sm font-medium">
                        System
                      </dd>
                    </div>
                    <dd class="text-2xl font-black text-white mb-1">
                      {{ slot.paylines || 'Scatter Pays' }}
                    </dd>
                    <dd class="text-violet-300 text-sm">All directions</dd>
                  </div>
                </div>
              </dl>
            </section>

            <!-- Popularity -->
            <section aria-labelledby="popularity-heading">
              <h2
                id="popularity-heading"
                class="text-xl font-bold text-white mb-4 flex items-center gap-2"
              >
                <span class="text-2xl" aria-hidden="true">📊</span>
                Popularity
              </h2>
              <div
                class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-5 rounded-2xl border border-yellow-400/30 relative overflow-hidden"
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
                    <span class="text-white font-semibold">Rating</span>
                    <span
                      class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-3 py-1 rounded-full text-sm"
                      >#{{ slot.popularity_rank || '12' }} of 2000+</span
                    >
                  </div>
                  <div
                    class="w-full bg-white/20 rounded-full h-3 mb-3 overflow-hidden"
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
                  <div class="text-yellow-300 text-sm font-medium">
                    {{
                      Math.round(
                        ((2000 - (slot.popularity_rank || 12)) / 2000) * 100,
                      )
                    }}% popularity
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
                        class="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center"
                      >
                        <span class="text-white text-xs font-bold">📊</span>
                      </div>
                      <span class="text-purple-300 text-xs font-semibold"
                        >Real RTP</span
                      >
                    </div>
                    <div class="text-white font-black text-lg">
                      {{ slot.real_rtp || '97.45' }}%
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
                        class="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center"
                      >
                        <span class="text-white text-xs font-bold">🎰</span>
                      </div>
                      <span class="text-orange-300 text-xs font-semibold"
                        >Bonus frequency</span
                      >
                    </div>
                    <div class="text-white font-black text-lg">
                      {{ slot.bonus_frequency || '1:448' }}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Game features -->
            <section aria-labelledby="features-heading">
              <h2
                id="features-heading"
                class="text-xl font-bold text-white mb-4 flex items-center gap-2"
              >
                <span class="text-2xl" aria-hidden="true">⚡</span>
                Features
              </h2>
              <div class="space-y-3">
                <!-- Main features -->
                <div
                  class="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm p-4 rounded-2xl border border-indigo-400/30 relative overflow-hidden"
                >
                  <CanvasRevealEffect
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('indigo')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <h3
                    class="text-white font-semibold mb-3 flex items-center gap-2 relative z-10"
                  >
                    <span class="text-lg">🎮</span>
                    Game mechanics
                  </h3>
                  <div class="flex flex-wrap gap-2 relative z-10">
                    <span
                      v-for="slotMechanic in slot?.slot_mechanics || []"
                      :key="slotMechanic.mechanics.id"
                      class="px-3 py-1 rounded-full text-xs font-medium border text-white"
                      :style="{
                        backgroundColor: `${slotMechanic.mechanics.color}30`,
                        borderColor: `${slotMechanic.mechanics.color}40`,
                      }"
                    >
                      {{ slotMechanic.mechanics.icon }}
                      {{ slotMechanic.mechanics.name }}
                    </span>
                    <span
                      v-if="!slot?.slot_mechanics?.length"
                      class="px-3 py-1 bg-gray-500/30 text-gray-400 rounded-full text-xs font-medium border border-gray-500/40"
                    >
                      Mechanics not specified
                    </span>
                  </div>
                </div>

                <!-- Bonus features -->
                <div
                  class="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm p-4 rounded-2xl border border-emerald-400/30 relative overflow-hidden"
                >
                  <CanvasRevealEffect
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
                  <h3
                    class="text-white font-semibold mb-3 flex items-center gap-2 relative z-10"
                  >
                    <span class="text-lg">🎁</span>
                    Bonuses
                  </h3>
                  <div class="flex flex-wrap gap-2 relative z-10">
                    <!-- New implementation: use slot_bonuses directly like in mechanics -->
                    <span
                      v-for="slotBonus in slot?.slot_bonuses || []"
                      :key="slotBonus.bonuses?.id || slotBonus.id"
                      class="px-3 py-1 bg-emerald-500/30 text-white rounded-full text-xs font-medium border border-emerald-400/20"
                    >
                      {{ slotBonus.bonuses?.icon }}
                      {{ slotBonus.bonuses?.name }}
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
                        v-for="bonus in getSlotBonuses(slot)"
                        :key="bonus.id || bonus.name"
                        class="px-3 py-1 bg-emerald-500/30 text-white rounded-full text-xs font-medium border border-emerald-400/20"
                      >
                        {{ bonus.name }}
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
                    >
                      Bonuses not specified
                    </span>
                  </div>
                </div>

                <!-- Themes -->
                <div
                  class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-4 rounded-2xl border border-yellow-400/30 relative overflow-hidden"
                >
                  <CanvasRevealEffect
                    :animationSpeed="0.8"
                    :opacities="[
                      0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85,
                    ]"
                    :colors="getEffectColorsFor('amber')"
                    :dotSize="6"
                    :showGradient="false"
                    blendMode="overlay"
                    :intensity="2.0"
                    containerClassName="absolute inset-0 pointer-events-none"
                  />
                  <h3
                    class="text-white font-semibold mb-3 flex items-center gap-2 relative z-10"
                  >
                    <span class="text-lg">🏛️</span>
                    Themes
                  </h3>
                  <div class="flex flex-wrap gap-2 relative z-10">
                    <!-- New implementation: use themes directly -->
                    <span
                      v-if="slot?.themes"
                      :key="slot.themes.id"
                      class="px-3 py-1 bg-yellow-500/30 text-white rounded-full text-xs font-medium border border-yellow-400/20"
                    >
                      {{ slot.themes.icon }} {{ slot.themes.name }}
                    </span>
                    <!-- Fallback through function for compatibility -->
                    <template
                      v-if="
                        !slot?.themes && getSlotThemesFromDB(slot).length > 0
                      "
                    >
                      <span
                        v-for="theme in getSlotThemesFromDB(slot)"
                        :key="theme.id || theme.name"
                        class="px-3 py-1 bg-yellow-500/30 text-white rounded-full text-xs font-medium border border-yellow-400/20"
                      >
                        {{ theme.name }}
                      </span>
                    </template>
                    <!-- Message if no themes -->
                    <span
                      v-if="
                        !slot?.themes &&
                        (!getSlotThemesFromDB(slot) ||
                          getSlotThemesFromDB(slot).length === 0)
                      "
                      class="px-3 py-1 bg-gray-500/30 text-gray-300 rounded-full text-xs font-medium border border-gray-400/20"
                    >
                      Themes not specified
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </main>

    <!-- Основной контент -->
    <section class="container mx-auto px-4 py-8">
      <!-- Обзор игры -->
      <article class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center gap-3 mb-8">
          <div
            class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h2 class="text-4xl font-bold text-gray-800">
            {{
              slot.overview_title ||
              `${slot.name || 'Слот'} - Полный обзор slotа 2025`
            }}
          </h2>
        </div>

        <!-- Основное описание -->
        <div class="prose max-w-none mb-8">
          <!-- Первый абзац описания -->
          <p
            v-if="slot.overview_description_1"
            class="text-xl text-gray-700 leading-relaxed mb-6 font-medium"
          >
            {{ slot.overview_description_1 }}
          </p>
          <p
            v-else
            class="text-xl text-gray-700 leading-relaxed mb-6 font-medium"
          >
            {{ slot.name }} — это мощный slot от
            {{ slot.providers?.name || 'провайдера' }}, предлагающий уникальный
            игровой опыт.
          </p>

          <!-- Второй абзац описания -->
          <p
            v-if="slot.overview_description_2"
            class="text-lg text-gray-700 leading-relaxed mb-8"
          >
            {{ slot.overview_description_2 }}
          </p>
          <p v-else class="text-lg text-gray-700 leading-relaxed mb-8">
            Это slot с {{ slot.volatility || 'средней' }} волатильностью и RTP
            {{ slot.rtp || '96' }}%, предлагающий отличные возможности для
            выигрыша.
          </p>

          <!-- Ключевые характеристики слота -->
          <div
            v-if="
              slot.overview_features_1 ||
              slot.overview_features_2 ||
              slot.overview_features_3 ||
              slot.overview_features_4 ||
              slot.overview_features_5 ||
              slot.overview_features_6
            "
            class="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-l-4 border-amber-400 mb-8"
          >
            <h3 class="font-bold text-amber-800 mb-4 text-xl">
              ⚡ Ключевые характеристики slotа:
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul class="text-amber-700 space-y-2">
                <li
                  v-if="slot.overview_features_1"
                  class="flex items-center gap-2"
                >
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                  {{ slot.overview_features_1 }}
                </li>
                <li
                  v-if="slot.overview_features_2"
                  class="flex items-center gap-2"
                >
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                  {{ slot.overview_features_2 }}
                </li>
                <li
                  v-if="slot.overview_features_3"
                  class="flex items-center gap-2"
                >
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                  {{ slot.overview_features_3 }}
                </li>
              </ul>
              <ul class="text-amber-700 space-y-2">
                <li
                  v-if="slot.overview_features_4"
                  class="flex items-center gap-2"
                >
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                  {{ slot.overview_features_4 }}
                </li>
                <li
                  v-if="slot.overview_features_5"
                  class="flex items-center gap-2"
                >
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                  {{ slot.overview_features_5 }}
                </li>
                <li
                  v-if="slot.overview_features_6"
                  class="flex items-center gap-2"
                >
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span>
                  {{ slot.overview_features_6 }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Детальные разделы со спойлерами -->
        <div class="space-y-6">
          <!-- Популярность и статистика -->
          <details
            class="group border-2 border-gradient-to-r from-blue-400 to-purple-500 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50"
          >
            <summary
              class="p-8 cursor-pointer font-bold text-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all duration-300 flex items-center justify-between border-b border-blue-200"
            >
              <span class="flex items-center gap-4">
                <span class="text-4xl animate-pulse">📊</span>
                <span
                  class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Насколько популярен Gates of Olympus?
                </span>
              </span>
              <svg
                class="w-6 h-6 text-blue-600 group-open:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </summary>

            <div class="p-8 bg-gradient-to-br from-slate-50 to-blue-50">
              <!-- Популярность метрики -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <!-- Общий рейтинг -->
                <div
                  class="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-xl text-white transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="bg-white/20 p-3 rounded-lg">
                      <svg
                        class="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        />
                      </svg>
                    </div>
                    <span class="text-3xl font-bold">TOP 3</span>
                  </div>
                  <h3 class="font-bold text-lg mb-2">Глобальный рейтинг</h3>
                  <p class="text-blue-100 text-sm">
                    Входит в ТОП-3 самых популярных slotов мира уже 3 года
                    подряд
                  </p>
                </div>

                <!-- Количество игроков -->
                <div
                  class="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-xl text-white transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="bg-white/20 p-3 rounded-lg">
                      <svg
                        class="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4ZM8 6C9.65685 6 11 7.34315 11 9C11 10.6569 9.65685 12 8 12C6.34315 12 5 10.6569 5 9C5 7.34315 6.34315 6 8 6ZM8 13C10.7614 13 13 15.2386 13 18V21H3V18C3 15.2386 5.23858 13 8 13ZM16 13C18.7614 13 21 15.2386 21 18V21H15V18.1679C15 16.4949 14.2393 15.0027 13.0307 14.0064C13.3441 14.0022 13.6588 14 13.9756 14H16Z"
                        />
                      </svg>
                    </div>
                    <span class="text-3xl font-bold">2.4M+</span>
                  </div>
                  <h3 class="font-bold text-lg mb-2">Активные игроки</h3>
                  <p class="text-green-100 text-sm">
                    Ежемесячно играют более 2.4 млн уникальных игроков
                  </p>
                </div>

                <!-- RTP и волатильность -->
                <div
                  class="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-xl text-white transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="bg-white/20 p-3 rounded-lg">
                      <svg
                        class="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2L13.09 8.26L20 9.27L15 14.14L16.18 21.02L12 17.77L7.82 21.02L9 14.14L4 9.27L10.91 8.26L12 2Z"
                        />
                      </svg>
                    </div>
                    <span class="text-3xl font-bold">96.5%</span>
                  </div>
                  <h3 class="font-bold text-lg mb-2">RTP + Волатильность</h3>
                  <p class="text-purple-100 text-sm">
                    Высокая отдача и захватывающие колебания выигрышей
                  </p>
                </div>
              </div>

              <!-- Статистика популярности -->
              <div
                class="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-100 mb-6"
              >
                <h3
                  class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
                >
                  <span class="text-3xl">📈</span>
                  Статистика популярности по годам
                </h3>

                <div class="space-y-4">
                  <!-- 2021 -->
                  <div class="flex items-center gap-4">
                    <div class="w-20 text-lg font-bold text-gray-700">2021</div>
                    <div
                      class="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden"
                    >
                      <div
                        class="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full shadow-inner"
                        style="width: 100%"
                      >
                        <div
                          class="absolute inset-0 bg-white/20 animate-pulse"
                        ></div>
                      </div>
                    </div>
                    <div class="w-16 text-right">
                      <span
                        class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold"
                        >#1</span
                      >
                    </div>
                    <div class="text-sm text-gray-600 w-32">
                      Лучший новый slot
                    </div>
                  </div>

                  <!-- 2022 -->
                  <div class="flex items-center gap-4">
                    <div class="w-20 text-lg font-bold text-gray-700">2022</div>
                    <div
                      class="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden"
                    >
                      <div
                        class="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full shadow-inner"
                        style="width: 95%"
                      >
                        <div
                          class="absolute inset-0 bg-white/20 animate-pulse"
                        ></div>
                      </div>
                    </div>
                    <div class="w-16 text-right">
                      <span
                        class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold"
                        >#1</span
                      >
                    </div>
                    <div class="text-sm text-gray-600 w-32">
                      Самый популярный
                    </div>
                  </div>

                  <!-- 2023 -->
                  <div class="flex items-center gap-4">
                    <div class="w-20 text-lg font-bold text-gray-700">2023</div>
                    <div
                      class="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden"
                    >
                      <div
                        class="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full shadow-inner"
                        style="width: 90%"
                      >
                        <div
                          class="absolute inset-0 bg-white/20 animate-pulse"
                        ></div>
                      </div>
                    </div>
                    <div class="w-16 text-right">
                      <span
                        class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold"
                        >#1</span
                      >
                    </div>
                    <div class="text-sm text-gray-600 w-32">Рекордсмен</div>
                  </div>

                  <!-- 2024 -->
                  <div class="flex items-center gap-4">
                    <div class="w-20 text-lg font-bold text-gray-700">2024</div>
                    <div
                      class="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden"
                    >
                      <div
                        class="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full shadow-inner"
                        style="width: 70%"
                      >
                        <div
                          class="absolute inset-0 bg-white/20 animate-pulse"
                        ></div>
                      </div>
                    </div>
                    <div class="w-16 text-right">
                      <span
                        class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-bold"
                        >#{{ slot.popularity_rank || '12' }}</span
                      >
                    </div>
                    <div class="text-sm text-gray-600 w-32">Стабильный хит</div>
                  </div>
                </div>
              </div>

              <!-- Мини-график тренда -->
              <div
                class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200 mb-6"
              >
                <h4
                  class="font-bold text-indigo-800 mb-4 text-xl flex items-center gap-3"
                >
                  <span class="text-2xl">📊</span>
                  Тренд популярности (симулированный график)
                </h4>

                <div
                  class="relative h-32 bg-white rounded-lg p-4 border border-indigo-100"
                >
                  <!-- Простая SVG диаграмма -->
                  <svg class="w-full h-full" viewBox="0 0 400 100">
                    <defs>
                      <linearGradient
                        id="trendGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style="stop-color: #6366f1; stop-opacity: 0.8"
                        />
                        <stop
                          offset="100%"
                          style="stop-color: #6366f1; stop-opacity: 0.1"
                        />
                      </linearGradient>
                    </defs>
                    <!-- Линия тренда -->
                    <polyline
                      points="20,80 120,20 220,15 320,40"
                      stroke="#6366f1"
                      stroke-width="3"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <!-- Область под линией -->
                    <polygon
                      points="20,80 120,20 220,15 320,40 320,90 20,90"
                      fill="url(#trendGradient)"
                    />
                    <!-- Точки данных -->
                    <circle cx="20" cy="80" r="4" fill="#6366f1" />
                    <circle cx="120" cy="20" r="4" fill="#10b981" />
                    <circle cx="220" cy="15" r="4" fill="#10b981" />
                    <circle cx="320" cy="40" r="4" fill="#8b5cf6" />
                  </svg>

                  <!-- Подписи годов -->
                  <div
                    class="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500"
                  >
                    <span>2021</span>
                    <span>2022</span>
                    <span>2023</span>
                    <span>2024</span>
                  </div>
                </div>
              </div>

              <!-- Ключевые факты -->
              <div
                class="bg-white p-6 rounded-xl shadow-lg border-2 border-green-100"
              >
                <h4
                  class="font-bold text-green-800 mb-4 text-xl flex items-center gap-3"
                >
                  <span class="text-2xl">✨</span>
                  Ключевые факты популярности
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    class="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <span class="text-green-600 font-bold">🎯</span>
                    <p class="text-gray-700 text-sm">
                      <strong>Мгновенный успех:</strong> Попал в ТОП-10 уже в
                      первую неделю после релиза
                    </p>
                  </div>
                  <div
                    class="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <span class="text-green-600 font-bold">🌍</span>
                    <p class="text-gray-700 text-sm">
                      <strong>Глобальная популярность:</strong> Лидер в более
                      чем 50 странах мира
                    </p>
                  </div>
                  <div
                    class="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <span class="text-green-600 font-bold">📱</span>
                    <p class="text-gray-700 text-sm">
                      <strong>Мобильный хит:</strong> 73% игроков предпочитают
                      играть на мобильных устройствах
                    </p>
                  </div>
                  <div
                    class="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <span class="text-green-600 font-bold">🎮</span>
                    <p class="text-gray-700 text-sm">
                      <strong>Долгосрочная привлекательность:</strong> Средняя
                      сессия игры составляет 45 минут
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </details>

          <!-- Секрет успеха -->
          <details
            class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <summary
              class="p-6 cursor-pointer font-semibold text-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 flex items-center justify-between"
            >
              <span class="flex items-center gap-3">
                <span class="text-2xl">🔑</span>
                В чем секрет такого огромного успеха?
              </span>
              <svg
                class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </summary>
            <div
              class="p-6 border-t border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50"
            >
              <div class="prose max-w-none">
                <p class="text-gray-700 mb-6 font-medium">
                  Одним из ключей к такому огромному успеху является механика
                  Scatter Pays — то, что объединяет многие популярные
                  онлайн-slotы. Вам не нужны линии выплат, кластеры или способы
                  выигрыша... Одинаковые символы могут появиться в любом месте
                  сетки и принести вам выигрыши.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="bg-white p-4 rounded-lg border border-green-200">
                    <h4 class="font-bold text-green-800 mb-3">
                      🍭 Связь с Sweet Bonanza
                    </h4>
                    <p class="text-gray-700 text-sm">
                      Sweet Bonanza был тайтлом, который протестировал воды для
                      Gates of Olympus. Эти две игры имеют много общих
                      геймплейных сходств. И кажется, что игроки больше любят
                      эпическую тему греческих богов, чем сладкую природу Sweet
                      Bonanza.
                    </p>
                  </div>

                  <div class="bg-white p-4 rounded-lg border border-green-200">
                    <h4 class="font-bold text-green-800 mb-3">
                      ⚖️ Идеальный баланс
                    </h4>
                    <p class="text-gray-700 text-sm">
                      Pragmatic Play использовала проверенный и испытанный
                      рецепт для достижения идеального баланса между сложностью
                      и простотой. Три элемента — scatter pays, tumbles и
                      множители — создают идеальную основу для захватывающего,
                      но не слишком сложного геймплея.
                    </p>
                  </div>
                </div>

                <p class="text-gray-700">
                  Эта комбинация творит чудеса, и наши рейтинги, основанные на
                  реальных данных казино, подтверждают это. Количество tumbles
                  не ограничено, и у вас может быть один раунд, который
                  продолжается намного дольше обычного спина.
                </p>
              </div>
            </div>
          </details>

          <!-- Особенности slotа -->
          <details
            class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <summary
              class="p-6 cursor-pointer font-semibold text-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 flex items-center justify-between"
            >
              <span class="flex items-center gap-3">
                <span class="text-2xl">🎰</span>
                Основные особенности и механики игры
              </span>
              <svg
                class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </summary>
            <div
              class="p-6 border-t border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50"
            >
              <div class="prose max-w-none">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <!-- Scatter Pays -->
                  <div class="bg-white p-5 rounded-lg border border-purple-200">
                    <div class="flex items-center gap-3 mb-3">
                      <span class="text-2xl">🎯</span>
                      <h4 class="font-bold text-purple-800">Scatter Pays</h4>
                    </div>
                    <p class="text-gray-700 text-sm mb-3">
                      Движок scatter pays довольно популярен, поскольку делает
                      все намного проще. Вам не нужно ждать, пока символы
                      приземлятся на определенные позиции.
                    </p>
                    <p class="text-purple-700 font-medium text-sm">
                      8+ одинаковых символов = выигрыш! Scatter символ (Зевс)
                      срабатывает от 4+ символов.
                    </p>
                  </div>

                  <!-- Tumbles -->
                  <div class="bg-white p-5 rounded-lg border border-purple-200">
                    <div class="flex items-center gap-3 mb-3">
                      <span class="text-2xl">⬇️</span>
                      <h4 class="font-bold text-purple-800">
                        Tumbles (Каскады)
                      </h4>
                    </div>
                    <p class="text-gray-700 text-sm mb-3">
                      Любой выигрыш в Gates of Olympus запускает каскад.
                      Выигрышные символы удаляются, а гравитация заполняет
                      пробелы новыми символами.
                    </p>
                    <p class="text-purple-700 font-medium text-sm">
                      Обычно 1-2 каскада подряд, но иногда цепочка может
                      продолжаться очень долго!
                    </p>
                  </div>

                  <!-- Множители -->
                  <div class="bg-white p-5 rounded-lg border border-purple-200">
                    <div class="flex items-center gap-3 mb-3">
                      <span class="text-2xl">✨</span>
                      <h4 class="font-bold text-purple-800">Множители</h4>
                    </div>
                    <p class="text-gray-700 text-sm mb-3">
                      Четыре орба разных цветов (зеленый, синий, фиолетовый и
                      красный) могут умножить ваши выплаты до 500x. Каждый
                      символ множителя принимает случайное значение.
                    </p>
                    <p class="text-purple-700 font-medium text-sm">
                      Множители применяются к общему выигрышу раунда после всех
                      каскадов!
                    </p>
                  </div>
                </div>

                <div class="bg-white p-4 rounded-lg border border-purple-200">
                  <h4
                    class="font-bold text-purple-800 mb-3 flex items-center gap-2"
                  >
                    💡 Важная особенность множителей
                  </h4>
                  <p class="text-gray-700">
                    Стоит отметить, что множители не применяются сразу к
                    выигрышу одного каскада. Gates of Olympus ждет, пока все
                    каскады завершатся, а затем применяет сумму всех собранных
                    множителей к общему выигрышу раунда. Это гораздо более
                    перспективно, чем один множитель, усиливающий один выигрыш.
                  </p>
                </div>
              </div>
            </div>
          </details>

          <!-- Бесплатные спины -->
          <details
            class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <summary
              class="p-6 cursor-pointer font-semibold text-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 flex items-center justify-between"
            >
              <span class="flex items-center gap-3">
                <span class="text-2xl">⚡</span>
                Бесплатные спины Gates of Olympus
              </span>
              <svg
                class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </summary>
            <div
              class="p-6 border-t border-gray-200 bg-gradient-to-r from-orange-50 to-red-50"
            >
              <div class="prose max-w-none">
                <p class="text-gray-700 mb-6 font-medium">
                  Четыре символа Зевса предоставляют игрокам вход в самую сочную
                  часть игры. Не важно, получите ли вы 4 или больше символов —
                  количество спинов всегда составляет 15. Но больше
                  scatter-символов все же предпочтительнее, поскольку они дают
                  мгновенную выплату.
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="bg-white p-5 rounded-lg border border-orange-200">
                    <h4
                      class="font-bold text-orange-800 mb-4 flex items-center gap-2"
                    >
                      💰 Мгновенные выплаты за Scatter
                    </h4>
                    <div class="space-y-2">
                      <div
                        class="flex justify-between items-center p-2 bg-orange-50 rounded"
                      >
                        <span class="font-medium">4 символа Зевса:</span>
                        <span class="font-bold text-orange-600"
                          >x3 bet multiplier</span
                        >
                      </div>
                      <div
                        class="flex justify-between items-center p-2 bg-orange-50 rounded"
                      >
                        <span class="font-medium">5 символов Зевса:</span>
                        <span class="font-bold text-orange-600"
                          >x5 bet multiplier</span
                        >
                      </div>
                      <div
                        class="flex justify-between items-center p-2 bg-orange-100 rounded"
                      >
                        <span class="font-medium">6 символов Зевса:</span>
                        <span class="font-bold text-orange-700"
                          >x100 bet multiplier</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="bg-white p-5 rounded-lg border border-orange-200">
                    <h4
                      class="font-bold text-orange-800 mb-4 flex items-center gap-2"
                    >
                      🚀 Особенности бонусной игры
                    </h4>
                    <ul class="space-y-2 text-gray-700">
                      <li class="flex items-start gap-2">
                        <span
                          class="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"
                        ></span>
                        <span
                          >15 бесплатных спинов независимо от количества
                          scatter-символов</span
                        >
                      </li>
                      <li class="flex items-start gap-2">
                        <span
                          class="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"
                        ></span>
                        <span
                          >Total Multiplier не сбрасывается между раундами</span
                        >
                      </li>
                      <li class="flex items-start gap-2">
                        <span
                          class="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"
                        ></span>
                        <span
                          >Возможность получить дополнительные бесплатные
                          спины</span
                        >
                      </li>
                      <li class="flex items-start gap-2">
                        <span
                          class="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"
                        ></span>
                        <span>Опция купить бонус за 100x от общей ставки</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="bg-white p-4 rounded-lg border border-orange-200">
                  <h4
                    class="font-bold text-orange-800 mb-3 flex items-center gap-2"
                  >
                    🎯 Ante Bet и покупка бонуса
                  </h4>
                  <p class="text-gray-700 mb-3">
                    Игроки могут купить бесплатные спины, заплатив 100x от общей
                    ставки, или ускорить процесс, включив Ante Bet и платя
                    немного больше за каждый спин. Эта высоковолатильная игра
                    может принести выигрыши в x5,000 в среднем каждые 1 из
                    697,350 спинов.
                  </p>
                  <div
                    class="bg-orange-50 p-3 rounded border-l-4 border-orange-400"
                  >
                    <p class="text-orange-800 font-medium text-sm">
                      ⚠️ Внимание: покупка бонуса — это высокорискованная
                      стратегия. Убедитесь, что у вас достаточный банкролл для
                      таких экспериментов.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </details>

          <!-- Стратегии игры -->
          <details
            class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <summary
              class="p-6 cursor-pointer font-semibold text-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-all duration-300 flex items-center justify-between"
            >
              <span class="flex items-center gap-3">
                <span class="text-2xl">🎯</span>
                Стратегии и советы для игры
              </span>
              <svg
                class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </summary>
            <div
              class="p-6 border-t border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50"
            >
              <div class="prose max-w-none">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div class="bg-white p-5 rounded-lg border border-indigo-200">
                    <h4
                      class="font-bold text-indigo-800 mb-4 flex items-center gap-2"
                    >
                      💡 Рекомендации для новичков
                    </h4>
                    <ul class="space-y-3 text-gray-700">
                      <li class="flex items-start gap-2">
                        <span
                          class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <span class="text-white text-xs font-bold">1</span>
                        </span>
                        <span>Начните с демо-версии для изучения механик</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span
                          class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <span class="text-white text-xs font-bold">2</span>
                        </span>
                        <span>Устанавливайте лимиты перед началом игры</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span
                          class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <span class="text-white text-xs font-bold">3</span>
                        </span>
                        <span>Начинайте с минимальных ставок</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span
                          class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <span class="text-white text-xs font-bold">4</span>
                        </span>
                        <span>Изучите таблицу выплат перед игрой</span>
                      </li>
                    </ul>
                  </div>

                  <div class="bg-white p-5 rounded-lg border border-indigo-200">
                    <h4
                      class="font-bold text-indigo-800 mb-4 flex items-center gap-2"
                    >
                      ⚡ Продвинутые стратегии
                    </h4>
                    <ul class="space-y-3 text-gray-700">
                      <li class="flex items-start gap-2">
                        <span
                          class="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <span class="text-white text-xs font-bold">💰</span>
                        </span>
                        <span
                          >Управление банкроллом: не более 1-2% от банка на
                          спин</span
                        >
                      </li>
                      <li class="flex items-start gap-2">
                        <span
                          class="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <span class="text-white text-xs font-bold">🎲</span>
                        </span>
                        <span
                          >Ante Bet увеличивает шансы на бонус, но требует
                          больших ставок</span
                        >
                      </li>
                      <li class="flex items-start gap-2">
                        <span
                          class="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <span class="text-white text-xs font-bold">🛒</span>
                        </span>
                        <span
                          >Покупка бонуса оправдана только при достаточном
                          банке</span
                        >
                      </li>
                      <li class="flex items-start gap-2">
                        <span
                          class="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                          <span class="text-white text-xs font-bold">📊</span>
                        </span>
                        <span
                          >Ведите статистику сессий для анализа
                          результатов</span
                        >
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  class="bg-white p-5 rounded-lg border border-indigo-200 mt-6"
                >
                  <h4
                    class="font-bold text-indigo-800 mb-4 flex items-center gap-2"
                  >
                    ⚠️ Важные предупреждения
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400"
                    >
                      <h5 class="font-bold text-red-800 mb-2">
                        Высокая волатильность
                      </h5>
                      <p class="text-red-700 text-sm">
                        Длительные периоды без крупных выигрышей — это
                        нормально. Будьте готовы к затяжным потерям.
                      </p>
                    </div>
                    <div
                      class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400"
                    >
                      <h5 class="font-bold text-yellow-800 mb-2">
                        Покупка бонуса
                      </h5>
                      <p class="text-yellow-700 text-sm">
                        100x ставка за бонус не гарантирует прибыль. Используйте
                        эту функцию разумно.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      </article>

      <!-- Основной контент -->
      <article
        class="relative bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30 rounded-3xl shadow-2xl p-10 mb-8 border border-emerald-100/50 overflow-hidden"
      >
        <!-- FAQ -->
        <section class="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-gray-800">
              Часто задаваемые вопросы
            </h2>
          </div>

          <div class="space-y-4">
            <details
              class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <summary
                class="p-6 cursor-pointer font-semibold text-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 flex items-center justify-between"
              >
                <span class="flex items-center gap-3">
                  <span class="text-2xl">🎮</span>
                  Можно ли играть в {{ slot.name || 'этот slot' }} бесплатно?
                </span>
                <svg
                  class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <div
                class="p-6 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-700 font-medium mb-2">
                      Да, абсолютно бесплатно!
                    </p>
                    <p class="text-gray-600">
                      Вы можете играть в демо-версию slotа без регистрации и
                      депозита. Это отличный способ изучить механику игры и
                      бонусные функции перед игрой for real money.
                    </p>
                  </div>
                </div>
              </div>
            </details>

            <details
              class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <summary
                class="p-6 cursor-pointer font-semibold text-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 flex items-center justify-between"
              >
                <span class="flex items-center gap-3">
                  <span class="text-2xl">💰</span>
                  Какова максимальная выплата в {{ slot.name || 'этом slotе' }}?
                </span>
                <svg
                  class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <div
                class="p-6 border-t border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-700 font-medium mb-2">
                      Максимальная выплата:
                      <span class="text-yellow-600 font-bold">5,000x</span> от
                      ставки
                    </p>
                    <p class="text-gray-600 mb-2">
                      Это означает, что при ставке €100 вы можете выиграть до
                      €500,000!
                    </p>
                    <p class="text-gray-500 text-sm">
                      ⚠️ Такие выигрыши случаются крайне редко - примерно 1 раз
                      в 697,350 спинов
                    </p>
                  </div>
                </div>
              </div>
            </details>

            <details
              class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <summary
                class="p-6 cursor-pointer font-semibold text-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 flex items-center justify-between"
              >
                <span class="flex items-center gap-3">
                  <span class="text-2xl">🛒</span>
                  Стоит ли покупать бонусные спины?
                </span>
                <svg
                  class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <div
                class="p-6 border-t border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-700 font-medium mb-2">
                      Покупка бонуса стоит
                      <span class="text-purple-600 font-bold">100x</span> от
                      ставки
                    </p>
                    <div class="space-y-2 text-gray-600">
                      <p>
                        ✅ <strong>Плюсы:</strong> Гарантированный доступ к
                        бонусной игре с множителями
                      </p>
                      <p>
                        ❌ <strong>Минусы:</strong> Высокая стоимость и нет
                        гарантии большого выигрыша
                      </p>
                      <p class="text-purple-600 font-medium">
                        💡 <strong>Совет:</strong> Покупайте бонус только при
                        достаточном банкролле и помните о высокой волатильности
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </details>

            <details
              class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <summary
                class="p-6 cursor-pointer font-semibold text-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 flex items-center justify-between"
              >
                <span class="flex items-center gap-3">
                  <span class="text-2xl">📱</span>
                  Работает ли slot на мобильных устройствах?
                </span>
                <svg
                  class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <div
                class="p-6 border-t border-gray-200 bg-gradient-to-r from-orange-50 to-red-50"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-gray-700 font-medium mb-2">
                      Да, полностью оптимизирован!
                    </p>
                    <div class="space-y-1 text-gray-600">
                      <p>📱 Поддерживает iOS и Android</p>
                      <p>🌐 Работает в браузере без установки приложений</p>
                      <p>🎮 Сохраняет все функции и качество графики</p>
                      <p>⚡ Быстрая загрузка и плавная анимация</p>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </section>

        <!-- Отзывы игроков - Модернизированный дизайн -->
        <section
          class="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-3xl shadow-2xl p-8 mb-8 border border-blue-100/50"
        >
          <!-- Заголовок с анимацией -->
          <div class="flex items-center gap-4 mb-8">
            <div class="relative">
              <div
                class="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-3 shadow-lg"
              >
                <svg
                  class="w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"
                  ></path>
                </svg>
              </div>
              <div
                class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span class="text-white text-xs font-bold">💬</span>
              </div>
            </div>
            <div>
              <h2
                class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent"
              >
                Отзывы игроков
              </h2>
              <p class="text-gray-600 mt-1">
                Реальные мнения от сообщества slot-игроков
              </p>
            </div>
          </div>

          <!-- Топ метрики в горизонтальном формате -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <!-- Общий рейтинг -->
            <div
              class="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="text-4xl font-black">4.3</div>
                <div class="text-2xl">⭐</div>
              </div>
              <div class="text-yellow-100 text-sm font-medium">
                Общий рейтинг
              </div>
              <div class="flex text-yellow-200 text-lg mt-1">★★★★☆</div>
            </div>

            <!-- Количество reviews -->
            <div
              class="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="text-4xl font-black">1.2K+</div>
                <div class="text-2xl">📝</div>
              </div>
              <div class="text-green-100 text-sm font-medium">
                Всего reviews
              </div>
              <div class="text-green-200 text-sm mt-1">активное сообщество</div>
            </div>

            <!-- Положительные отзывы -->
            <div
              class="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="text-4xl font-black">75%</div>
                <div class="text-2xl">👍</div>
              </div>
              <div class="text-blue-100 text-sm font-medium">Положительные</div>
              <div class="text-blue-200 text-sm mt-1">4-5 звёзд</div>
            </div>

            <!-- Рекомендации -->
            <div
              class="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="text-4xl font-black">68%</div>
                <div class="text-2xl">🎯</div>
              </div>
              <div class="text-purple-100 text-sm font-medium">Рекомендуют</div>
              <div class="text-purple-200 text-sm mt-1">друзьям играть</div>
            </div>
          </div>

          <!-- Статистика с улучшенной визуализацией -->
          <div class="grid md:grid-cols-2 gap-8 mb-8">
            <!-- Детальная статистика -->
            <div
              class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg"
            >
              <h3
                class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3"
              >
                <span class="text-2xl">📊</span>
                Распределение оценок
              </h3>
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <span class="text-sm font-semibold text-gray-700 w-8"
                    >5★</span
                  >
                  <div
                    class="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner"
                  >
                    <div
                      class="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full relative"
                      style="width: 45%"
                    >
                      <div
                        class="absolute inset-0 bg-white/30 animate-pulse"
                      ></div>
                    </div>
                  </div>
                  <span class="text-sm font-bold text-green-600 w-12">45%</span>
                  <span class="text-xs text-gray-500 w-12">562</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-sm font-semibold text-gray-700 w-8"
                    >4★</span
                  >
                  <div
                    class="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner"
                  >
                    <div
                      class="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full relative"
                      style="width: 30%"
                    >
                      <div
                        class="absolute inset-0 bg-white/30 animate-pulse"
                      ></div>
                    </div>
                  </div>
                  <span class="text-sm font-bold text-blue-600 w-12">30%</span>
                  <span class="text-xs text-gray-500 w-12">374</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-sm font-semibold text-gray-700 w-8"
                    >3★</span
                  >
                  <div
                    class="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner"
                  >
                    <div
                      class="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full"
                      style="width: 15%"
                    ></div>
                  </div>
                  <span class="text-sm font-bold text-yellow-600 w-12"
                    >15%</span
                  >
                  <span class="text-xs text-gray-500 w-12">187</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-sm font-semibold text-gray-700 w-8"
                    >2★</span
                  >
                  <div
                    class="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner"
                  >
                    <div
                      class="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full"
                      style="width: 7%"
                    ></div>
                  </div>
                  <span class="text-sm font-bold text-orange-600 w-12">7%</span>
                  <span class="text-xs text-gray-500 w-12">87</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-sm font-semibold text-gray-700 w-8"
                    >1★</span
                  >
                  <div
                    class="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner"
                  >
                    <div
                      class="bg-gradient-to-r from-red-400 to-red-600 h-full rounded-full"
                      style="width: 3%"
                    ></div>
                  </div>
                  <span class="text-sm font-bold text-red-600 w-12">3%</span>
                  <span class="text-xs text-gray-500 w-12">37</span>
                </div>
              </div>
            </div>

            <!-- Анализ настроений -->
            <div
              class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100 shadow-lg"
            >
              <h3
                class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3"
              >
                <span class="text-2xl">🎭</span>
                Анализ настроений
              </h3>
              <div class="space-y-4">
                <div
                  class="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200"
                >
                  <div
                    class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-green-800">
                      Потрясающая графика
                    </div>
                    <div class="text-sm text-green-600">
                      Упоминается в 89% позитивных reviews
                    </div>
                  </div>
                </div>

                <div
                  class="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200"
                >
                  <div
                    class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-blue-800">Мегавыигрыши</div>
                    <div class="text-sm text-blue-600">
                      Крупные множители в бонусах
                    </div>
                  </div>
                </div>

                <div
                  class="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200"
                >
                  <div
                    class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-purple-800">
                      Стабильная работа
                    </div>
                    <div class="text-sm text-purple-600">Без лагов и багов</div>
                  </div>
                </div>

                <div
                  class="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200"
                >
                  <div
                    class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="font-semibold text-yellow-800">
                      Высокая волатильность
                    </div>
                    <div class="text-sm text-yellow-600">Требует терпения</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Избранные отзывы с современным дизайном -->
          <div class="space-y-6">
            <h3
              class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
            >
              <span class="text-3xl">⭐</span>
              Избранные отзывы игроков
            </h3>

            <!-- Отзыв 1 - Позитивный -->
            <div
              class="group bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-green-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div class="flex items-start gap-4">
                <div class="relative">
                  <div
                    class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  >
                    А
                  </div>
                  <div
                    class="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-3">
                    <h4 class="font-bold text-gray-800 text-lg">
                      Александр К.
                    </h4>
                    <div class="flex text-yellow-400 text-lg">★★★★★</div>
                    <span
                      class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold"
                      >Проверенный игрок</span
                    >
                  </div>
                  <p class="text-gray-700 mb-4 leading-relaxed">
                    "Реально крутой slot! Множители действительно работают -
                    словил x1200 на бонусе, эмоции зашкаливали! Графика топ,
                    анимации плавные. Играю полгода, очень доволен. Каскады
                    постоянно продлевают удовольствие 🎰⚡"
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4 text-sm text-gray-600">
                      <span
                        class="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"
                      >
                        <svg
                          class="w-4 h-4 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        47 лайков
                      </span>
                      <span class="bg-white/50 px-3 py-1 rounded-full"
                        >💬 12 ответов</span
                      >
                    </div>
                    <span
                      class="text-sm text-gray-500 bg-white/30 px-3 py-1 rounded-full"
                      >2 дня назад</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Отзыв 2 - Сбалансированный -->
            <div
              class="group bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div class="flex items-start gap-4">
                <div class="relative">
                  <div
                    class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  >
                    М
                  </div>
                  <div
                    class="absolute -top-1 -right-1 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center"
                  >
                    <span class="text-white text-xs">✓</span>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-3">
                    <h4 class="font-bold text-gray-800 text-lg">Мария В.</h4>
                    <div class="flex text-yellow-400 text-lg">★★★★☆</div>
                    <span
                      class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
                      >Активный игрок</span
                    >
                  </div>
                  <p class="text-gray-700 mb-4 leading-relaxed">
                    "Визуально великолепно! Тематика Олимпа реализована шикарно.
                    Геймплей затягивает, но волатильность зашкаливает - нужен
                    большой банкролл. Когда заходят бонусы - сказка! 🏛️✨"
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4 text-sm text-gray-600">
                      <span
                        class="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"
                      >
                        <svg
                          class="w-4 h-4 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        31 лайк
                      </span>
                      <span class="bg-white/50 px-3 py-1 rounded-full"
                        >💬 8 ответов</span
                      >
                    </div>
                    <span
                      class="text-sm text-gray-500 bg-white/30 px-3 py-1 rounded-full"
                      >1 неделю назад</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Отзыв 3 - Восторженный -->
            <div
              class="group bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div class="flex items-start gap-4">
                <div class="relative">
                  <div
                    class="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  >
                    Д
                  </div>
                  <div
                    class="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                  >
                    <span class="text-white text-xs">🏆</span>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-3">
                    <h4 class="font-bold text-gray-800 text-lg">Дмитрий С.</h4>
                    <div class="flex text-yellow-400 text-lg">★★★★★</div>
                    <span
                      class="bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold"
                      >VIP игрок</span
                    >
                  </div>
                  <p class="text-gray-700 mb-4 leading-relaxed">
                    "ЭПИК! Pragmatic Play превзошли сами себя! Максимальный
                    выигрыш 3,200x - чуть со стула не упал! 😱 Звук, графика,
                    математика - всё идеально. Мой фаворит уже 2 года! 🎮👑"
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4 text-sm text-gray-600">
                      <span
                        class="flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full"
                      >
                        <svg
                          class="w-4 h-4 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        93 лайка
                      </span>
                      <span class="bg-white/50 px-3 py-1 rounded-full"
                        >💬 25 ответов</span
                      >
                      <span
                        class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs"
                        >🔥 Топ отзыв</span
                      >
                    </div>
                    <span
                      class="text-sm text-gray-500 bg-white/30 px-3 py-1 rounded-full"
                      >3 дня назад</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Интерактивная кнопка "Показать все отзывы" -->
          <div class="mt-8 text-center">
            <button
              class="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              <span class="flex items-center gap-3">
                <svg
                  class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Показать все 1,247 reviews
                <svg
                  class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-2xl"
              ></div>
            </button>
          </div>
        </section>

        <!-- Профессиональная оценка - Премиум дизайн -->
        <section
          class="relative overflow-hidden bg-white rounded-3xl shadow-2xl border border-gray-100 mb-8"
        >
          <!-- Декоративный фон с анимациями -->
          <div class="absolute inset-0 opacity-5">
            <div
              class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400 to-purple-600 rounded-full blur-3xl animate-pulse"
            ></div>
            <div
              class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full blur-3xl animate-pulse"
              style="animation-delay: 1s"
            ></div>
          </div>

          <div class="relative z-10 p-8 lg:p-12">
            <!-- Заголовок с анимированной иконкой -->
            <div class="flex items-center gap-4 mb-10">
              <div class="relative">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 rounded-2xl animate-pulse opacity-70"
                  ></div>
                  <svg
                    class="relative w-8 h-8 text-white animate-spin"
                    style="animation-duration: 8s"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <h2
                  class="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-800 via-blue-700 to-purple-800 bg-clip-text text-transparent mb-2"
                >
                  Профессиональная оценка
                </h2>
                <p class="text-gray-600 text-lg font-medium">
                  Детальный анализ от экспертов индустрии 🎯
                </p>
              </div>
            </div>

            <!-- Общая оценка с впечатляющим дизайном -->
            <div
              class="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-3xl p-8 mb-12 border border-yellow-200 shadow-xl"
            >
              <div
                class="absolute top-4 right-4 text-6xl opacity-10 animate-bounce"
              >
                ⚡
              </div>

              <div
                class="flex flex-col lg:flex-row items-center justify-between gap-8"
              >
                <div class="text-center lg:text-left">
                  <h3 class="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                    Общая экспертная оценка
                  </h3>
                  <p class="text-gray-600 text-lg leading-relaxed max-w-md">
                    Превосходный slot с инновационной механикой и высоким
                    потенциалом выигрыша 🏆
                  </p>
                </div>

                <div class="text-center">
                  <div class="relative inline-block">
                    <div
                      class="w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300"
                    >
                      <div
                        class="absolute inset-2 bg-white rounded-full flex items-center justify-center"
                      >
                        <span
                          class="text-4xl font-black bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent"
                          >8.5</span
                        >
                      </div>
                    </div>
                    <div
                      class="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    >
                      <span
                        class="bg-white px-4 py-1 rounded-full text-sm font-semibold text-gray-600 shadow-lg border"
                        >из 10</span
                      >
                    </div>
                  </div>

                  <div class="flex items-center justify-center gap-1 mt-6">
                    <div
                      v-for="n in 5"
                      :key="n"
                      class="text-3xl transition-transform hover:scale-125 duration-300"
                    >
                      {{ n <= 4 ? '⭐' : '☆' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Детальные метрики в современном стиле -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <!-- Левая колонка -->
              <div class="space-y-6">
                <!-- Графика -->
                <div
                  class="group bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center"
                      >
                        <span class="text-xl">🎨</span>
                      </div>
                      <span class="font-bold text-gray-800 text-lg"
                        >Графика и анимация</span
                      >
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-black text-blue-600">9.0</div>
                      <div class="text-sm text-gray-500">из 10</div>
                    </div>
                  </div>
                  <div
                    class="relative w-full bg-blue-200 rounded-full h-3 overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transform origin-left scale-x-90 transition-transform duration-1000 group-hover:scale-x-100"
                    ></div>
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"
                    ></div>
                  </div>
                </div>

                <!-- Геймплей -->
                <div
                  class="group bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300"
                >
                  <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center"
                      >
                        <span class="text-xl">🎮</span>
                      </div>
                      <span class="font-bold text-gray-800 text-lg"
                        >Геймплей</span
                      >
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-black text-green-600">8.0</div>
                      <div class="text-sm text-gray-500">из 10</div>
                    </div>
                  </div>
                  <div
                    class="relative w-full bg-green-200 rounded-full h-3 overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transform origin-left scale-x-80 transition-transform duration-1000 group-hover:scale-x-90"
                    ></div>
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"
                    ></div>
                  </div>
                </div>

                <!-- Потенциал выигрыша -->
                <div
                  class="group bg-gradient-to-r from-purple-50 to-pink-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300"
                >
                  <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-700 rounded-xl flex items-center justify-center"
                      >
                        <span class="text-xl">💎</span>
                      </div>
                      <span class="font-bold text-gray-800 text-lg"
                        >Потенциал выигрыша</span
                      >
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-black text-purple-600">9.0</div>
                      <div class="text-sm text-gray-500">из 10</div>
                    </div>
                  </div>
                  <div
                    class="relative w-full bg-purple-200 rounded-full h-3 overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full transform origin-left scale-x-90 transition-transform duration-1000 group-hover:scale-x-100"
                    ></div>
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Правая колонка -->
              <div class="space-y-6">
                <!-- Бонусы -->
                <div
                  class="group bg-gradient-to-r from-orange-50 to-red-100 p-6 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300"
                >
                  <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-700 rounded-xl flex items-center justify-center"
                      >
                        <span class="text-xl">🎁</span>
                      </div>
                      <span class="font-bold text-gray-800 text-lg"
                        >Бонусные функции</span
                      >
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-black text-orange-600">8.0</div>
                      <div class="text-sm text-gray-500">из 10</div>
                    </div>
                  </div>
                  <div
                    class="relative w-full bg-orange-200 rounded-full h-3 overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-600 rounded-full transform origin-left scale-x-80 transition-transform duration-1000 group-hover:scale-x-90"
                    ></div>
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"
                    ></div>
                  </div>
                </div>

                <!-- Частота выплат -->
                <div
                  class="group bg-gradient-to-r from-red-50 to-pink-100 p-6 rounded-2xl border border-red-200 hover:shadow-lg transition-all duration-300"
                >
                  <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-700 rounded-xl flex items-center justify-center"
                      >
                        <span class="text-xl">⏰</span>
                      </div>
                      <span class="font-bold text-gray-800 text-lg"
                        >Частота выплат</span
                      >
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-black text-red-600">7.0</div>
                      <div class="text-sm text-gray-500">из 10</div>
                    </div>
                  </div>
                  <div
                    class="relative w-full bg-red-200 rounded-full h-3 overflow-hidden"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-600 rounded-full transform origin-left scale-x-70 transition-transform duration-1000 group-hover:scale-x-80"
                    ></div>
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Экспертное мнение в карточке эксперта -->
            <div
              class="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl p-8 mb-10 border-l-8 border-blue-500 shadow-xl"
            >
              <div
                class="absolute top-6 right-6 text-5xl opacity-20 animate-pulse"
              >
                💬
              </div>

              <div class="flex items-start gap-6 mb-6">
                <div class="relative">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span class="text-2xl text-white">👨‍💼</span>
                  </div>
                  <div
                    class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
                  >
                    <svg
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div>
                  <h3
                    class="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2"
                  >
                    <span>Экспертное заключение</span>
                    <div
                      class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full"
                    >
                      Сертифицированный эксперт
                    </div>
                  </h3>
                  <p class="text-gray-600 font-medium">
                    Ведущий аналитик игровой индустрии • 8+ лет опыта
                  </p>
                </div>
              </div>

              <blockquote
                class="text-lg text-blue-900 leading-relaxed font-medium italic border-l-4 border-blue-300 pl-6"
              >
                "Gates of Olympus представляет собой революционный подход к
                созданию видеоslotов. Механика Scatter Pays полностью меняет
                привычные правила игры, создавая уникальный опыт для каждого
                спина. Высокий потенциал выигрыша x5,000 в сочетании с
                каскадными символами делают каждый раунд непредсказуемым и
                захватывающим. 🎯"
              </blockquote>
            </div>

            <!-- Предупреждение в стиле важного уведомления -->
            <div
              class="relative bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-2 border-yellow-300 rounded-2xl p-6 mb-10"
            >
              <div class="absolute -top-3 left-6">
                <div
                  class="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg"
                >
                  ⚠️ ВАЖНО
                </div>
              </div>

              <div class="flex items-start gap-4 mt-2">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 class="text-xl font-bold text-yellow-800 mb-3">
                    Предупреждение о волатильности
                  </h4>
                  <p class="text-yellow-900 leading-relaxed font-medium">
                    Слот имеет высокую волатильность, что означает редкие, но
                    крупные выигрыши.
                    <span class="font-bold"
                      >Рекомендуется иметь достаточный банкролл и играть
                      ответственно.</span
                    >
                    Устанавливайте лимиты и никогда не играйте деньгами, которые
                    не можете позволить себе потерять. 💰
                  </p>
                </div>
              </div>
            </div>

            <!-- Преимущества и недостатки в современном стиле -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <!-- Преимущества -->
              <div
                class="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl p-8 border-2 border-green-200 shadow-xl"
              >
                <div class="absolute -top-4 left-6">
                  <div
                    class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-bold shadow-lg"
                  >
                    ✅ ПРЕИМУЩЕСТВА
                  </div>
                </div>

                <div class="mt-4">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  >
                    <svg
                      class="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>

                  <ul class="space-y-4">
                    <li class="flex items-start gap-4 group">
                      <div
                        class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      >
                        <span class="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <div class="font-bold text-green-800 text-lg">
                          Инновационная механика Scatter Pays
                        </div>
                        <div class="text-green-700 text-sm">
                          Революционная система выплат
                        </div>
                      </div>
                    </li>

                    <li class="flex items-start gap-4 group">
                      <div
                        class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      >
                        <span class="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <div class="font-bold text-green-800 text-lg">
                          Потенциал выигрыша x5,000
                        </div>
                        <div class="text-green-700 text-sm">
                          Огромные возможности для выигрыша
                        </div>
                      </div>
                    </li>

                    <li class="flex items-start gap-4 group">
                      <div
                        class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      >
                        <span class="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <div class="font-bold text-green-800 text-lg">
                          Превосходная графика
                        </div>
                        <div class="text-green-700 text-sm">
                          Визуальное наслаждение на высоком уровне
                        </div>
                      </div>
                    </li>

                    <li class="flex items-start gap-4 group">
                      <div
                        class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      >
                        <span class="text-white font-bold text-sm">4</span>
                      </div>
                      <div>
                        <div class="font-bold text-green-800 text-lg">
                          Каскадные выигрыши
                        </div>
                        <div class="text-green-700 text-sm">
                          Множественные выплаты в одном спине
                        </div>
                      </div>
                    </li>

                    <li class="flex items-start gap-4 group">
                      <div
                        class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      >
                        <span class="text-white font-bold text-sm">5</span>
                      </div>
                      <div>
                        <div class="font-bold text-green-800 text-lg">
                          Мобильная оптимизация
                        </div>
                        <div class="text-green-700 text-sm">
                          Идеальная работа на всех устройствах
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Недостатки -->
              <div
                class="relative bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 rounded-3xl p-8 border-2 border-red-200 shadow-xl"
              >
                <div class="absolute -top-4 left-6">
                  <div
                    class="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-full font-bold shadow-lg"
                  >
                    ❌ НЕДОСТАТКИ
                  </div>
                </div>

                <div class="mt-4">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                  >
                    <svg
                      class="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>

                  <ul class="space-y-4">
                    <li class="flex items-start gap-4 group">
                      <div
                        class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      >
                        <span class="text-white font-bold text-sm">1</span>
                      </div>
                      <div>
                        <div class="font-bold text-red-800 text-lg">
                          Высокая волатильность
                        </div>
                        <div class="text-red-700 text-sm">
                          Редкие, но крупные выигрыши
                        </div>
                      </div>
                    </li>

                    <li class="flex items-start gap-4 group">
                      <div
                        class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      >
                        <span class="text-white font-bold text-sm">2</span>
                      </div>
                      <div>
                        <div class="font-bold text-red-800 text-lg">
                          Требует большой банкролл
                        </div>
                        <div class="text-red-700 text-sm">
                          Необходим солидный стартовый капитал
                        </div>
                      </div>
                    </li>

                    <li class="flex items-start gap-4 group">
                      <div
                        class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      >
                        <span class="text-white font-bold text-sm">3</span>
                      </div>
                      <div>
                        <div class="font-bold text-red-800 text-lg">
                          Не для новичков
                        </div>
                        <div class="text-red-700 text-sm">
                          Сложно для консервативных игроков
                        </div>
                      </div>
                    </li>

                    <li class="flex items-start gap-4 group">
                      <div
                        class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      >
                        <span class="text-white font-bold text-sm">4</span>
                      </div>
                      <div>
                        <div class="font-bold text-red-800 text-lg">
                          Редкие бонусы
                        </div>
                        <div class="text-red-700 text-sm">
                          Бонусные раунды активируются нечасто
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Итоговая рекомендация в премиум стиле -->
            <div
              class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl"
            >
              <div
                class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl"
              ></div>
              <div
                class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl"
              ></div>

              <div class="relative z-10">
                <div class="flex items-center gap-4 mb-6">
                  <div
                    class="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <span class="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h3 class="text-3xl font-black mb-2">
                      Итоговая рекомендация
                    </h3>
                    <p class="text-blue-100 font-medium">
                      От экспертов SlotQuest
                    </p>
                  </div>
                </div>

                <div
                  class="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <p class="text-lg leading-relaxed text-blue-50 font-medium">
                    <span class="font-bold text-yellow-300"
                      >Gates of Olympus</span
                    >
                    - это выдающийся slot для опытных игроков, которые ценят
                    инновационную механику и готовы к высокой волатильности ради
                    потенциала больших выигрышей.
                    <span class="font-bold text-white"
                      >Новичкам рекомендуем начать с менее волатильных
                      slotов.</span
                    >
                    Этот slot станет идеальным выбором для тех, кто ищет
                    адреналин и готов к серьёзной игре! 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Заключение -->
        <section
          class="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-3xl shadow-2xl p-8 mb-8 border border-indigo-100"
        >
          <!-- Анимированный фон -->
          <div class="absolute inset-0 opacity-5">
            <div
              class="absolute top-4 left-8 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-xl animate-pulse"
            ></div>
            <div
              class="absolute bottom-8 right-12 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-lg animate-bounce"
              style="animation-duration: 4s; animation-delay: 1s"
            ></div>
            <div
              class="absolute top-16 right-4 w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full blur-md animate-pulse"
              style="animation-delay: 2s"
            ></div>
          </div>

          <!-- Заголовок с премиум иконкой -->
          <div class="relative z-10 flex items-center gap-4 mb-8">
            <div class="relative">
              <div
                class="w-14 h-14 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl blur opacity-40 animate-pulse"
                ></div>
                <svg
                  class="relative z-10 w-7 h-7 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <!-- Блик -->
              <div
                class="absolute -top-1 -right-1 w-3 h-3 bg-white/60 rounded-full animate-ping"
              ></div>
            </div>
            <div>
              <h2
                class="text-4xl font-bold bg-gradient-to-r from-slate-800 via-indigo-900 to-purple-800 bg-clip-text text-transparent"
              >
                Заключение
              </h2>
              <div
                class="h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full mt-2 transform scale-x-0 animate-pulse"
                style="animation: scaleX 2s ease-out 0.5s forwards"
              ></div>
            </div>
          </div>

          <!-- Главная карточка с итоговой оценкой -->
          <div
            class="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl border border-white/50"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/10 to-purple-500/5 rounded-2xl"
            ></div>

            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-6">
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                  ></div>
                  <div
                    class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                    style="animation-delay: 0.2s"
                  ></div>
                  <div
                    class="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                    style="animation-delay: 0.4s"
                  ></div>
                </div>
                <h3
                  class="text-2xl font-bold bg-gradient-to-r from-slate-700 to-indigo-800 bg-clip-text text-transparent"
                >
                  Итоговая оценка {{ slot.name || 'slotа' }}
                </h3>
              </div>

              <div class="space-y-4">
                <p class="text-lg text-slate-700 leading-relaxed font-medium">
                  {{ slot.name || 'Этот slot' }} заслуженно считается одним из
                  <span class="text-indigo-600 font-semibold"
                    >лучших slotов от Pragmatic Play</span
                  >. Сочетание инновационной механики Scatter Pays, высокого
                  потенциала выигрыша до
                  <span class="text-emerald-600 font-bold">x5,000</span> и
                  превосходной графики делают его обязательным для всех
                  любителей азартных игр.
                </p>
                <div
                  class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border-l-4 border-indigo-400"
                >
                  <p class="text-slate-700 leading-relaxed">
                    Революционная система выплат, где выигрыши начисляются за
                    <span class="font-semibold text-indigo-700"
                      >8+ одинаковых символов</span
                    >
                    в любом месте экрана, открывает новые горизонты в мире
                    видеоslotов. Каскадные выигрыши и множители создают
                    уникальную атмосферу постоянного ожидания больших выплат.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Карточки рекомендаций - улучшенный дизайн -->
          <div class="relative z-10 grid md:grid-cols-2 gap-6 mb-8">
            <div
              class="group bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 border border-emerald-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h4 class="text-lg font-bold text-emerald-800">
                  Кому подходит
                </h4>
              </div>
              <div class="space-y-3">
                <div class="flex items-center gap-3 text-emerald-700">
                  <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span class="font-medium">Опытным игрокам</span>
                </div>
                <div class="flex items-center gap-3 text-emerald-700">
                  <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span class="font-medium"
                    >Любителям высокой волатильности</span
                  >
                </div>
                <div class="flex items-center gap-3 text-emerald-700">
                  <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span class="font-medium">Игрокам с большим банкроллом</span>
                </div>
                <div class="flex items-center gap-3 text-emerald-700">
                  <div class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span class="font-medium">Поклонникам инноваций</span>
                </div>
              </div>
            </div>

            <div
              class="group bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-6 border border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h4 class="text-lg font-bold text-amber-800">Важно помнить</h4>
              </div>
              <div class="space-y-3">
                <div class="flex items-center gap-3 text-amber-700">
                  <div class="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  <span class="font-medium">Высокая волатильность</span>
                </div>
                <div class="flex items-center gap-3 text-amber-700">
                  <div class="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  <span class="font-medium">Нужен большой банкролл</span>
                </div>
                <div class="flex items-center gap-3 text-amber-700">
                  <div class="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  <span class="font-medium">Играйте ответственно</span>
                </div>
                <div class="flex items-center gap-3 text-amber-700">
                  <div class="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  <span class="font-medium">Устанавливайте лимиты</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Финальный вердикт - премиум дизайн -->
          <div
            class="relative z-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl overflow-hidden"
          >
            <!-- Анимированный фон для финального блока -->
            <div class="absolute inset-0 opacity-20">
              <div
                class="absolute top-2 left-4 w-20 h-20 bg-white/30 rounded-full blur-xl animate-pulse"
              ></div>
              <div
                class="absolute bottom-2 right-8 w-16 h-16 bg-white/20 rounded-full blur-lg animate-bounce"
                style="animation-duration: 3s"
              ></div>
              <div
                class="absolute top-8 right-4 w-12 h-12 bg-white/25 rounded-full blur-md animate-pulse"
                style="animation-delay: 1s"
              ></div>
            </div>

            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white">Финальный вердикт</h3>
              </div>
              <p class="text-white/90 leading-relaxed text-lg">
                <span class="font-semibold text-white">Gates of Olympus</span> -
                это не просто slot, это
                <span class="text-yellow-300 font-semibold"
                  >новая эра в мире азартных игр</span
                >. Если вы готовы к вызову и хотите испытать настоящий адреналин
                от игры, этот slot создан именно для вас.
                <span class="text-red-300 font-medium"
                  >Помните: играйте ответственно и наслаждайтесь
                  процессом!</span
                >
                🎰✨
              </p>
            </div>
          </div>
        </section>

        <!-- Призыв к действию - Премиум дизайн -->
        <section
          class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl border border-purple-500/20"
        >
          <!-- Динамический фон с анимированными элементами -->
          <div class="absolute inset-0">
            <!-- Основной градиент-оверлей -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/30 to-pink-600/20"
            ></div>

            <!-- Анимированные орбы -->
            <div
              class="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-xl animate-pulse"
            ></div>
            <div
              class="absolute top-20 right-16 w-24 h-24 bg-gradient-to-r from-purple-400/25 to-pink-500/25 rounded-full blur-lg animate-bounce"
              style="animation-delay: 1s; animation-duration: 3s"
            ></div>
            <div
              class="absolute bottom-16 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-full blur-lg animate-pulse"
              style="animation-delay: 2s"
            ></div>
            <div
              class="absolute bottom-10 right-1/4 w-16 h-16 bg-gradient-to-r from-emerald-400/25 to-teal-500/25 rounded-full blur-md animate-bounce"
              style="animation-delay: 0.5s; animation-duration: 4s"
            ></div>

            <!-- Геометрические узоры -->
            <div class="absolute top-0 left-0 w-full h-full opacity-5">
              <svg class="w-full h-full" viewBox="0 0 400 300" fill="none">
                <pattern
                  id="grid"
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>

          <!-- Основной контент -->
          <div class="relative z-10 px-8 py-12 lg:px-16 lg:py-16">
            <!-- Заголовочный блок -->
            <div class="text-center mb-12">
              <!-- Иконка с анимацией -->
              <div
                class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full shadow-2xl mb-6 animate-pulse"
              >
                <div
                  class="w-16 h-16 bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-inner"
                >
                  <span class="text-3xl animate-bounce">⚡</span>
                </div>
              </div>

              <!-- Заголовок -->
              <h2 class="text-4xl lg:text-6xl font-black mb-4">
                <span
                  class="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent"
                >
                  Время побеждать!
                </span>
              </h2>

              <!-- Подзаголовок -->
              <div class="space-y-2">
                <p class="text-xl lg:text-2xl text-gray-200 font-medium">
                  Окунитесь в легендарный мир
                  <span class="text-yellow-300 font-bold">{{
                    slot.name || 'этого slotа'
                  }}</span>
                </p>
                <div
                  class="flex items-center justify-center gap-2 text-lg lg:text-xl"
                >
                  <span class="text-gray-300">Потенциал выигрыша до</span>
                  <span
                    class="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-black text-xl shadow-lg animate-pulse"
                  >
                    x5,000
                  </span>
                  <span class="text-gray-300">ждёт вас!</span>
                </div>
              </div>
            </div>

            <!-- Карточки преимуществ -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div
                class="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:-translate-y-1"
              >
                <div class="text-center">
                  <div
                    class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300"
                  >
                    <span class="text-2xl text-white">🎰</span>
                  </div>
                  <h3 class="text-lg font-bold text-white mb-2">Демо режим</h3>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    Изучите все механики игры совершенно бесплатно
                  </p>
                </div>
              </div>

              <div
                class="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:-translate-y-1"
                style="transition-delay: 100ms"
              >
                <div class="text-center">
                  <div
                    class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300"
                  >
                    <span class="text-2xl text-white">💰</span>
                  </div>
                  <h3 class="text-lg font-bold text-white mb-2">
                    Реальные деньги
                  </h3>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    Играйте на деньги в лучших онлайн казино
                  </p>
                </div>
              </div>

              <div
                class="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:-translate-y-1"
                style="transition-delay: 200ms"
              >
                <div class="text-center">
                  <div
                    class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300"
                  >
                    <span class="text-2xl text-white">🎁</span>
                  </div>
                  <h3 class="text-lg font-bold text-white mb-2">
                    Эксклюзивные бонусы
                  </h3>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    Получите дополнительные средства для игры
                  </p>
                </div>
              </div>
            </div>

            <!-- Action buttons -->
            <div
              class="flex flex-col lg:flex-row gap-4 justify-center items-center mb-10"
            >
              <!-- Demo button -->
              <NuxtLink
                :to="
                  slot.cta_button_demo_url ||
                  '/slots/' + (slot.slug || slug) + '/demo'
                "
                class="group relative overflow-hidden bg-white hover:bg-gray-50 text-slate-900 font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-white/20 transform hover:scale-105 flex items-center justify-center gap-3 min-w-[200px]"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                ></div>
                <span class="text-2xl group-hover:animate-spin">{{
                  slot.cta_button_demo_emoji || '🎮'
                }}</span>
                <span class="text-lg">{{
                  slot.cta_button_demo_text || 'Играть демо'
                }}</span>
              </NuxtLink>

              <!-- Кнопка на деньги -->
              <NuxtLink
                :to="
                  slot.cta_button_real_url ||
                  '/casinos/best-for-' + (slot.slug || slug)
                "
                class="group relative overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/30 transform hover:scale-105 flex items-center justify-center gap-3 min-w-[200px]"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                ></div>
                <span class="text-2xl group-hover:animate-bounce">{{
                  slot.cta_button_real_emoji || '💎'
                }}</span>
                <span class="text-lg">{{
                  slot.cta_button_real_text || 'Играть на деньги'
                }}</span>
              </NuxtLink>
            </div>

            <!-- Индикаторы доверия -->
            <div
              class="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
            >
              <div
                class="flex items-center gap-2 group hover:text-green-400 transition-colors duration-300"
              >
                <div
                  class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span class="font-medium">Лицензированные операторы</span>
              </div>

              <div
                class="flex items-center gap-2 group hover:text-blue-400 transition-colors duration-300"
              >
                <div
                  class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <svg
                    class="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span class="font-medium">Безопасность SSL</span>
              </div>

              <div
                class="flex items-center gap-2 group hover:text-yellow-400 transition-colors duration-300"
              >
                <div
                  class="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <span class="text-white text-xs font-bold">24</span>
                </div>
                <span class="font-medium">Поддержка 24/7</span>
              </div>
            </div>
          </div>

          <!-- Декоративная нижняя граница -->
          <div
            class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          ></div>
        </section>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AuroraBackground from '~/components/ui/AuroraBackground.vue'
import BackgroundGradient from '~/components/ui/BackgroundGradient.vue'
import CometCard from '~/components/ui/CometCard.vue'
import CanvasRevealEffect from '~/components/ui/CanvasRevealEffect.vue'

// Получаем slug из роута
const route = useRoute()
const slug = route.params.slug

// Состояние
const slot = ref({})
const allSlots = ref([])
const loading = ref(true)
const error = ref(null)

// Состояние для рейтинга
const showRatingPicker = ref(false)
const selectedStars = ref(null)
const hoverStars = ref(0)
const ratingSubmitting = ref(false)
const ratingSubmitted = ref(false)

// Вычисляемые свойства
const similarSlots = computed(() => {
  if (!slot.value || !slot.value.id || !allSlots.value.length) return []

  return allSlots.value
    .filter(
      (s) =>
        s &&
        s.id &&
        s.id !== slot.value.id &&
        (s.providers?.id === slot.value.providers?.id ||
          s.category_id === slot.value.category_id),
    )
    .slice(0, 3)
})

// Награды теперь управляются через админку (убрали хардкод для Gates of Olympus)

// SEO (динамический)
watchEffect(() => {
  if (slot.value && !loading.value && !error.value) {
    const structuredData = getStructuredData(slot.value)

    useHead({
      // 🎯 SEO: Комбинируем slot.name (брендовый трафик) + hero_keyword (категорийный контекст)
      title:
        slot.value.seo_title ||
        `${slot.value.name}${slot.value.hero_keyword && slot.value.hero_keyword !== slot.value.name ? ' - ' + slot.value.hero_keyword : ''} 🎰 Play Free Demo & Real Money | SlotQuest`,
      meta: [
        // Основные SEO мета-теги
        {
          name: 'description',
          // 🎯 SEO: Используем функцию с hero keywords для максимального CTR
          content: generateSEODescription(slot.value),
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
          content:
            'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
          name: 'theme-color',
          content: '#1a1a2e',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        // Open Graph
        {
          property: 'og:title',
          // 🎯 SEO: Используем slot.name (брендовый) для соц. сетей
          content:
            slot.value.og_title ||
            `${slot.value.name} 🎰 Play Free Demo & Real Money`,
        },
        {
          property: 'og:description',
          // 🎯 SEO: Используем то же описание с hero keywords для соц. сетей
          content:
            slot.value.og_description || generateSEODescription(slot.value),
        },
        { property: 'og:type', content: 'article' },
        { property: 'og:site_name', content: 'SlotQuest' },
        { property: 'og:locale', content: 'en_US' },
        {
          property: 'og:url',
          content: `https://slotquest.com/slots/${slot.value.slug || slug}`,
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
          content: `${slot.value.name || 'Slot'} - screenshot of slot machine from ${slot.value.providers?.name || 'provider'}`,
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
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
          content: 'SlotQuest Editorial Team',
        },
        {
          property: 'article:section',
          content: 'Slot Machines',
        },
        {
          property: 'article:tag',
          content: `${slot.value.name}, ${slot.value.providers?.name || 'provider'}, slot, slot machine`,
        },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@SlotQuest' },
        {
          name: 'twitter:title',
          content: `${slot.value.name || 'Slot'} 🎰 Play Free Demo & Real Money`,
        },
        {
          name: 'twitter:description',
          content: `🎰 ${slot.value.name || 'Slot'} from ${slot.value.providers?.name || 'provider'} - play free demo or real money. RTP: ${slot.value.rtp || '96'}%, rating: ${slot.value.rating || '4.8'}/5 ⭐`,
        },
        {
          name: 'twitter:image',
          content:
            slot.value.image_url ||
            `https://slotquest.com/images/slots/${slot.value.slug || slug}.jpg`,
        },
        {
          name: 'twitter:creator',
          content: '@SlotQuest',
        },
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

    if (!slotData) {
      throw new Error(`Слот с адресом "${slug}" не найден`)
    }

    slot.value = slotData

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

const getVolatilityText = (volatility) => {
  if (!volatility) return 'Высокая'

  const vol = volatility.toLowerCase()
  if (vol.includes('high') || vol === 'высокая') return 'Высокая'
  if (vol.includes('medium') || vol === 'средняя') return 'Средняя'
  if (vol.includes('low') || vol === 'низкая') return 'Низкая'
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
    hero_keyword_2: slot.hero_keyword_2,
    hero_keyword_3: slot.hero_keyword_3,
    wrapInStrong,
  })

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

// Функция для получения тематик slotа из базы данных
const getSlotThemesFromDB = (slot) => {
  if (!slot || !slot.themes) return []
  // themes - это объект темы, а не массив
  return slot.themes ? [slot.themes] : []
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
    // Используем hero_keyword для определения жанра
    genre: slot.hero_keyword || 'Slot Game',
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
        name: `Can I play ${slot.name} for free?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, absolutely free! You can play the demo version of the slot without registration or deposit. This is a great way to learn the game mechanics and bonus features before playing for real money.',
        },
      },
      {
        '@type': 'Question',
        name: `What is the maximum payout in ${slot.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The maximum payout is ${slot.max_win || '5,000'}x bet multiplier. This means that with a €100 bet you can win up to €${(parseInt(slot.max_win || '5000') * 100).toLocaleString()}! Such wins are extremely rare.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is it worth buying bonus spins?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bonus buy costs 100x bet multiplier. Pros: guaranteed access to bonus game with multipliers. Cons: high cost and no guarantee of big win. Only buy bonus with sufficient bankroll.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the slot work on mobile devices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, fully optimized! Supports iOS and Android, works in browser without app installation, retains all features and graphics quality with fast loading.',
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
      slot.schema_review_title || `${getSlotNameWithKeyword(slot.value)} 2025`,
    description:
      slot.schema_review_description_1 ||
      `Complete review of ${slot.name} slot from ${slot.providers?.name || 'provider'}. RTP, volatility, bonus features analysis.`,
    articleBody:
      [slot.schema_review_description_1, slot.schema_review_description_2]
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

  // Combine all schemas into array (filter null values)
  const allSchemas = [
    gameSchema,
    breadcrumbSchema,
    websiteSchema,
    faqSchema,
    reviewSchema,
    howToSchema,
    similarSlotsSchema,
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

/* Дополнительные стили при необходимости */
</style>
