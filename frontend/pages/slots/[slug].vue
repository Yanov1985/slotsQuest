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
            Назад к каталогу слотов
          </NuxtLink>

          <!-- Хлебные крошки -->
          <div class="hidden md:flex items-center text-sm text-gray-500">
            <NuxtLink to="/" class="hover:text-blue-600 transition-colors"
              >Главная</NuxtLink
            >
            <span class="mx-2">/</span>
            <NuxtLink to="/slots" class="hover:text-blue-600 transition-colors"
              >Слоты</NuxtLink
            >
            <span class="mx-2">/</span>
            <span class="text-gray-800 font-medium" v-if="slot">{{
              slot.name || 'Слот'
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
        <p class="mt-6 text-xl text-gray-600">Загрузка слота...</p>
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
          <h2 class="text-3xl font-bold mb-4 text-gray-800">Слот не найден</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
        </div>
        <NuxtLink
          to="/slots"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors font-semibold"
        >
          Перейти к каталогу
        </NuxtLink>
      </div>
    </div>

    <!-- Hero секция - Семантическая разметка с Schema.org -->
    <section
      v-else-if="slot"
      class="relative overflow-x-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 shadow-2xl mb-8"
      itemscope
      itemtype="https://schema.org/Game"
    >
      <!-- Анимированный фон -->
      <div class="absolute inset-0" aria-hidden="true">
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-beam transform skew-x-12"
        ></div>
        <div
          class="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style="animation-delay: 1s"
        ></div>
        <div
          class="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/8 rounded-full blur-2xl animate-pulse"
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
        class="absolute bottom-8 left-8 text-white/5 text-6xl animate-float"
        style="animation-delay: 1.5s"
        aria-hidden="true"
      >
        🏛️
      </div>
      <div
        class="absolute top-1/3 right-1/4 text-white/8 text-4xl animate-float"
        style="animation-delay: 3s"
        aria-hidden="true"
      >
        💎
      </div>

      <div class="relative z-10 max-w-full">
        <div class="flex flex-col lg:flex-row">
          <!-- Левая часть: Игровая информация (липкая) -->
          <main
            class="w-full lg:w-[70%] lg:sticky lg:top-4 p-8 lg:p-12 flex flex-col justify-start min-w-0"
          >
            <!-- Заголовок и основная информация -->
            <header class="mb-8 lg:hidden">
              <!-- Провайдер -->
              <div class="flex items-center gap-3 mb-6 flex-wrap">
                <span
                  class="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-purple-400/30"
                  itemprop="publisher"
                  itemscope
                  itemtype="https://schema.org/Organization"
                >
                  <span itemprop="name">{{
                    slot.provider?.name || 'Pragmatic Play'
                  }}</span>
                </span>
              </div>

              <!-- Заголовок слота -->
              <h1
                class="text-2xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent mb-6 leading-relaxed drop-shadow-md transition-all duration-500 py-2"
                style="line-height: 1.3; padding-bottom: 0.5rem"
                itemprop="name"
              >
                {{ slot.name || 'Загрузка...' }}
              </h1>

              <!-- Описание слота -->
              <p
                class="text-white/80 text-lg lg:text-xl leading-relaxed mb-6 max-w-2xl lg:hidden"
                itemprop="description"
              >
                {{ getShortDescription(slot) }}
              </p>

              <!-- Рейтинг и голосование -->
              <div
                class="flex flex-wrap items-center gap-6 mb-8"
                role="group"
                aria-label="Рейтинг и голосование"
              >
                <!-- Текущий рейтинг -->
                <div
                  class="flex items-center gap-2"
                  itemprop="aggregateRating"
                  itemscope
                  itemtype="https://schema.org/AggregateRating"
                >
                  <div
                    class="flex text-yellow-400"
                    aria-label="Рейтинг 4.8 из 5 звезд"
                  >
                    <svg
                      v-for="n in 5"
                      :key="n"
                      class="w-7 h-7 drop-shadow-lg"
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
                    >4.8</span
                  >
                  <span class="text-white/60"
                    >/ <span itemprop="bestRating">5</span></span
                  >
                  <meta itemprop="ratingCount" content="1247" />
                  <meta itemprop="worstRating" content="1" />
                </div>

                <!-- Кнопка голосования -->
                <button
                  class="px-4 py-2 rounded-full text-sm font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                  @click="toggleRatingPicker"
                  :aria-expanded="showRatingPicker"
                  aria-controls="rating-picker-mobile"
                  type="button"
                >
                  Голосовать!
                </button>
              </div>

              <!-- Панель голосования -->
              <div
                v-if="showRatingPicker"
                id="rating-picker-mobile"
                class="mt-3 p-4 bg-white/10 border border-white/20 rounded-xl"
                role="dialog"
                aria-label="Панель оценки слота"
              >
                <div class="flex items-center justify-between gap-4 flex-wrap">
                  <div
                    class="flex items-center gap-3"
                    role="radiogroup"
                    aria-label="Выберите оценку от 0 до 5 звезд"
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
                      aria-label="0 звезд"
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
                        :aria-label="`${n} звезд${n === 1 ? 'а' : n < 5 ? 'ы' : ''}`"
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
              <div
                class="w-2/5 aspect-[3/4] bg-gradient-to-br from-black/40 via-purple-900/30 to-black/40 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl relative overflow-hidden group"
                role="img"
                :aria-label="`Превью игры ${slot.name || 'слот'}`"
                itemprop="image"
                itemscope
                itemtype="https://schema.org/ImageObject"
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

                <!-- Медиа контент: изображение или видео -->
                <div
                  v-if="slot.media_type === 'image' && slot.image_url"
                  class="absolute inset-0"
                >
                  <img
                    :src="slot.image_url"
                    :alt="`Изображение слота ${slot.name}`"
                    class="w-full h-full object-cover"
                    @error="handleSlotImageError"
                  />
                </div>
                <div
                  v-else-if="slot.media_type === 'video' && slot.video_url"
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
                  class="flex items-center justify-center h-full text-white/60"
                >
                  <span>Изображение слота</span>
                </div>
              </div>

              <!-- Правая колонка: провайдер, h1, рейтинг, описание, CTA (desktop) -->
              <div class="flex-1 min-w-0">
                <!-- Провайдер, Заголовок, Рейтинг (Desktop) -->
                <div class="mb-4">
                  <div class="flex items-center gap-3 mb-3 flex-wrap">
                    <span
                      class="bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-purple-400/30"
                      itemprop="publisher"
                      itemscope
                      itemtype="https://schema.org/Organization"
                    >
                      <span itemprop="name">{{
                        slot.provider?.name || 'Pragmatic Play'
                      }}</span>
                    </span>
                  </div>
                  <h1
                    class="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent leading-tight drop-shadow-md transition-all duration-500 py-1 mb-3"
                    itemprop="name"
                  >
                    {{ slot.name || 'Загрузка...' }}
                  </h1>
                  <div
                    class="flex flex-wrap items-center gap-4 mb-4"
                    role="group"
                    aria-label="Рейтинг и голосование"
                  >
                    <div
                      class="flex items-center gap-2"
                      itemprop="aggregateRating"
                      itemscope
                      itemtype="https://schema.org/AggregateRating"
                    >
                      <div
                        class="flex text-yellow-400"
                        aria-label="Рейтинг 4.8 из 5 звезд"
                      >
                        <svg
                          v-for="n in 5"
                          :key="n"
                          class="w-6 h-6 drop-shadow-lg"
                          :class="n <= 4 ? 'text-yellow-400' : 'text-gray-400'"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.9z"
                          />
                        </svg>
                      </div>
                      <span
                        class="text-white font-bold text-lg"
                        itemprop="ratingValue"
                        >4.8</span
                      >
                      <span class="text-white/60"
                        >/ <span itemprop="bestRating">5</span></span
                      >
                      <meta itemprop="ratingCount" content="1247" />
                      <meta itemprop="worstRating" content="1" />
                    </div>

                    <button
                      class="px-4 py-2 rounded-full text-sm font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                      @click="toggleRatingPicker"
                      :aria-expanded="showRatingPicker"
                      aria-controls="rating-picker"
                      type="button"
                    >
                      Голосовать!
                    </button>
                  </div>

                  <div
                    v-if="showRatingPicker"
                    id="rating-picker"
                    class="mt-3 p-4 bg-white/10 border border-white/20 rounded-xl"
                    role="dialog"
                    aria-label="Панель оценки слота"
                  >
                    <div
                      class="flex items-center justify-between gap-4 flex-wrap"
                    >
                      <div
                        class="flex items-center gap-3"
                        role="radiogroup"
                        aria-label="Выберите оценку от 0 до 5 звезд"
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
                          aria-label="0 звезд"
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
                            :aria-label="`${n} звезд${n === 1 ? 'а' : n < 5 ? 'ы' : ''}`"
                            type="button"
                          >
                            <svg
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              class="w-full h-full"
                              aria-hidden="true"
                            >
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.9z"
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
                </div>
                <p
                  class="text-white/80 text-lg leading-relaxed mb-4"
                  itemprop="description"
                >
                  {{ getShortDescription(slot) }}
                </p>

                <nav
                  class="flex gap-4 items-stretch"
                  aria-label="Варианты игры (десктоп)"
                >
                  <button
                    class="group relative flex-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white text-lg font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
                    @click="playSlot"
                    type="button"
                    itemprop="url"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      aria-hidden="true"
                    ></div>
                    <svg
                      class="w-6 h-6 relative z-10"
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
                    <span class="relative z-10">Играть бесплатно</span>
                    <span
                      class="relative z-10 bg-white/20 text-xs px-2 py-1 rounded-full font-semibold"
                      aria-label="Демо-режим"
                      >DEMO</span
                    >
                  </button>

                  <button
                    class="group relative flex-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white text-lg font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-orange-400/30"
                    @click="playForReal"
                    type="button"
                  >
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      aria-hidden="true"
                    ></div>
                    <svg
                      class="w-6 h-6 relative z-10"
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
                    <span class="relative z-10">Играть на деньги</span>
                  </button>
                </nav>
              </div>
            </div>

            <!-- Игровой экран -->
            <div
              class="lg:hidden aspect-video bg-gradient-to-br from-black/40 via-purple-900/30 to-black/40 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center mb-8 relative overflow-hidden group"
              role="img"
              :aria-label="`Превью игры ${slot.name || 'слот'}`"
              itemprop="image"
              itemscope
              itemtype="https://schema.org/ImageObject"
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
                  :alt="`Изображение слота ${slot.name}`"
                  class="w-full h-full object-contain"
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
                  @error="handleSlotVideoError"
                >
                  <source :src="slot.video_url" type="video/mp4" />
                  <source
                    :src="
                      slot.video_url && slot.video_url.replace('.mp4', '.webm')
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
                >
                  {{ getSlotIcon(slot.name || '') }}
                </div>
                <div
                  class="bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20"
                >
                  <p
                    class="text-white/90 text-lg font-bold mb-2"
                    itemprop="name"
                  >
                    {{ slot.name || 'Загрузка...' }}
                  </p>
                  <p class="text-white/60 text-sm">
                    {{ slot.provider?.name || 'Pragmatic Play' }}
                  </p>
                </div>
              </div>

              <!-- Кнопка Play -->
              <button
                class="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-black/20 transition-all duration-500 group focus:outline-none focus:ring-4 focus:ring-green-400/30"
                @click="playSlot"
                type="button"
                aria-label="Запустить демо-версию игры"
              >
                <div
                  class="w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:shadow-green-500/50 transition-all duration-500"
                >
                  <svg
                    class="w-12 h-12 lg:w-14 lg:h-14 text-white ml-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>

            <!-- Кнопки действий -->
            <nav
              class="space-y-4 lg:hidden"
              aria-label="Варианты игры (моб./планшет)"
            >
              <button
                class="group relative w-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white text-xl font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 transform hover:-translate-y-2 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
                @click="playSlot"
                type="button"
                itemprop="url"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  aria-hidden="true"
                ></div>
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
                <span class="relative z-10">Играть бесплатно</span>
                <span
                  class="relative z-10 bg-white/20 text-xs px-3 py-1 rounded-full font-semibold"
                  aria-label="Демо-режим"
                >
                  DEMO
                </span>
              </button>

              <button
                class="group relative w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white text-xl font-black py-5 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-2 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden focus:outline-none focus:ring-4 focus:ring-orange-400/30"
                @click="playForReal"
                type="button"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  aria-hidden="true"
                ></div>
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
                <span class="relative z-10">Играть на деньги</span>
              </button>

              <!-- Награды и достижения (семантическая разметка) -->
              <aside
                v-if="slot.show_awards && slot.awards && slot.awards.length > 0"
                class="mt-5"
                aria-label="Награды и достижения"
              >
                <div
                  class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4"
                  itemprop="award"
                  itemscope
                  itemtype="https://schema.org/CreativeWork"
                >
                  <header class="flex items-center gap-3 mb-4">
                    <div
                      class="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 shadow-lg flex items-center justify-center ring-2 ring-white/20"
                      aria-hidden="true"
                    >
                      <span class="text-white text-lg">🏆</span>
                    </div>
                    <h3 class="text-white font-extrabold text-lg tracking-wide">
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
          </main>

          <!-- Правая часть: Характеристики и информация (прокручиваемая) -->
          <aside
            class="w-full lg:w-[30%] bg-white/10 backdrop-blur-md p-8 lg:p-10 border-l border-white/20 min-w-0 min-h-[160vh]"
            aria-label="Характеристики и дополнительная информация об игре"
          >
            <div class="space-y-8">
              <!-- Основные характеристики -->
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
                  Характеристики
                </h2>

                <dl class="grid grid-cols-1 gap-4">
                  <!-- RTP -->
                  <div
                    class="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm p-5 rounded-2xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 hover:scale-[1.02]"
                    itemprop="gamePlatform"
                    itemscope
                    itemtype="https://schema.org/Thing"
                  >
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
                        Отдача
                      </dd>
                    </div>
                    <dd
                      class="text-3xl font-black text-white mb-1"
                      itemprop="name"
                    >
                      {{ slot.rtp || '96.50' }}%
                    </dd>
                    <dd class="text-emerald-300 text-sm">Высокий показатель</dd>
                  </div>

                  <!-- Волатильность -->
                  <div
                    class="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm p-5 rounded-2xl border border-orange-400/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-[1.02]"
                  >
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
                        <dt class="text-white font-bold">Волатильность</dt>
                      </div>
                      <dd class="text-orange-300 text-sm font-medium">Риск</dd>
                    </div>
                    <dd class="text-2xl font-black text-white mb-1 capitalize">
                      {{ getVolatilityText(slot.volatility) }}
                    </dd>
                    <dd class="text-orange-300 text-sm">Средние риски</dd>
                  </div>

                  <!-- Максимальный выигрыш -->
                  <div
                    class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-5 rounded-2xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02]"
                  >
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
                        <dt class="text-white font-bold">Макс. выигрыш</dt>
                      </div>
                      <dd class="text-purple-300 text-sm font-medium">
                        Потенциал
                      </dd>
                    </div>
                    <dd class="text-3xl font-black text-white mb-1">
                      {{ getMaxWin(slot) }}
                    </dd>
                    <dd class="text-purple-300 text-sm">От ставки</dd>
                  </div>

                  <!-- Минимальная ставка -->
                  <div
                    class="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm p-5 rounded-2xl border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-[1.02]"
                  >
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
                        <dt class="text-white font-bold">Мин. ставка</dt>
                      </div>
                      <dd class="text-blue-300 text-sm font-medium">За спин</dd>
                    </div>
                    <dd class="text-2xl font-black text-white mb-1">
                      {{ slot.min_bet || '€0.20' }}
                    </dd>
                    <dd class="text-blue-300 text-sm">Доступно всем</dd>
                  </div>

                  <!-- Максимальная ставка -->
                  <div
                    class="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm p-5 rounded-2xl border border-teal-400/30 hover:border-teal-400/50 transition-all duration-300 hover:scale-[1.02]"
                  >
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
                        <dt class="text-white font-bold">Макс. ставка</dt>
                      </div>
                      <dd class="text-teal-300 text-sm font-medium">За спин</dd>
                    </div>
                    <dd class="text-2xl font-black text-white mb-1">
                      {{ slot.max_bet || '€100' }}
                    </dd>
                    <dd class="text-teal-300 text-sm">Хай-роллеры</dd>
                  </div>

                  <!-- Дата релиза -->
                  <div
                    class="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-sm p-5 rounded-2xl border border-amber-400/30 hover:border-amber-400/50 transition-all duration-300 hover:scale-[1.02]"
                  >
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
                        <dt class="text-white font-bold">Дата релиза</dt>
                      </div>
                      <dd class="text-amber-300 text-sm font-medium">Запуск</dd>
                    </div>
                    <dd class="text-2xl font-black text-white mb-1">
                      {{ formatReleaseDate(slot.release_date) || '13.02.2021' }}
                    </dd>
                    <dd class="text-amber-300 text-sm">Pragmatic Play</dd>
                  </div>

                  <!-- Количество барабанов -->
                  <div
                    class="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-sm p-5 rounded-2xl border border-rose-400/30 hover:border-rose-400/50 transition-all duration-300 hover:scale-[1.02]"
                  >
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
                        <dt class="text-white font-bold">Барабаны</dt>
                      </div>
                      <dd class="text-rose-300 text-sm font-medium">
                        Структура
                      </dd>
                    </div>
                    <dd class="text-3xl font-black text-white mb-1">
                      {{ slot.game_field || '6×5' }}
                    </dd>
                    <dd class="text-rose-300 text-sm">Scatter Pays</dd>
                  </div>

                  <!-- Тип выплат -->
                  <div
                    class="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm p-5 rounded-2xl border border-violet-400/30 hover:border-violet-400/50 transition-all duration-300 hover:scale-[1.02]"
                  >
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
                        <dt class="text-white font-bold">Линии выплат</dt>
                      </div>
                      <dd class="text-violet-300 text-sm font-medium">
                        Система
                      </dd>
                    </div>
                    <dd class="text-2xl font-black text-white mb-1">
                      {{ slot.paylines || 'Scatter Pays' }}
                    </dd>
                    <dd class="text-violet-300 text-sm">Все направления</dd>
                  </div>
                </dl>
              </section>

              <!-- Популярность -->
              <section aria-labelledby="popularity-heading">
                <h2
                  id="popularity-heading"
                  class="text-xl font-bold text-white mb-4 flex items-center gap-2"
                >
                  <span class="text-2xl" aria-hidden="true">📊</span>
                  Популярность
                </h2>
                <div
                  class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-5 rounded-2xl border border-yellow-400/30"
                >
                  <div class="flex justify-between items-center mb-3">
                    <span class="text-white font-semibold">Рейтинг</span>
                    <span
                      class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-3 py-1 rounded-full text-sm"
                      >#12 из 2000+</span
                    >
                  </div>
                  <div
                    class="w-full bg-white/20 rounded-full h-3 mb-3 overflow-hidden"
                    role="progressbar"
                    aria-valuenow="94"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label="Рейтинг популярности: 94 из 100"
                  >
                    <div
                      class="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full shadow-lg"
                      style="width: 94%"
                    ></div>
                  </div>
                  <div class="text-yellow-300 text-sm">Топ слот 2024 года</div>
                </div>

                <!-- Дополнительные метрики популярности -->
                <div class="mt-4 grid grid-cols-2 gap-3">
                  <!-- Место в рейтинге новых слотов -->
                  <div
                    class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm p-4 rounded-xl border border-green-400/30"
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <div
                        class="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                      >
                        <span class="text-white text-xs font-bold">🆕</span>
                      </div>
                      <span class="text-green-300 text-xs font-semibold"
                        >Лучшие новые слоты 2021</span
                      >
                    </div>
                    <div class="text-white font-black text-lg">#1</div>
                  </div>

                  <!-- Место среди популярных слотов -->
                  <div
                    class="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm p-4 rounded-xl border border-blue-400/30"
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <div
                        class="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center"
                      >
                        <span class="text-white text-xs font-bold">🔥</span>
                      </div>
                      <span class="text-blue-300 text-xs font-semibold"
                        >Популярные слоты 2023</span
                      >
                    </div>
                    <div class="text-white font-black text-lg">#1</div>
                  </div>

                  <!-- RTP рейтинг -->
                  <div
                    class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-4 rounded-xl border border-purple-400/30"
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <div
                        class="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center"
                      >
                        <span class="text-white text-xs font-bold">📊</span>
                      </div>
                      <span class="text-purple-300 text-xs font-semibold"
                        >Реальный RTP</span
                      >
                    </div>
                    <div class="text-white font-black text-lg">97.45%</div>
                  </div>

                  <!-- Частота бонусов -->
                  <div
                    class="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm p-4 rounded-xl border border-orange-400/30"
                  >
                    <div class="flex items-center gap-2 mb-2">
                      <div
                        class="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center"
                      >
                        <span class="text-white text-xs font-bold">🎰</span>
                      </div>
                      <span class="text-orange-300 text-xs font-semibold"
                        >Частота бонуса</span
                      >
                    </div>
                    <div class="text-white font-black text-lg">1:448</div>
                  </div>
                </div>
              </section>

              <!-- Особенности игры -->
              <section aria-labelledby="features-heading">
                <h2
                  id="features-heading"
                  class="text-xl font-bold text-white mb-4 flex items-center gap-2"
                >
                  <span class="text-2xl" aria-hidden="true">⚡</span>
                  Особенности
                </h2>
                <div class="space-y-3">
                  <!-- Основные особенности -->
                  <div
                    class="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm p-4 rounded-2xl border border-indigo-400/30"
                  >
                    <h3
                      class="text-white font-semibold mb-3 flex items-center gap-2"
                    >
                      <span class="text-lg">🎮</span>
                      Игровая механика
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      <span
                        class="px-3 py-1 bg-indigo-500/30 text-indigo-200 rounded-full text-xs font-medium border border-indigo-400/20"
                      >
                        Cascading Reels
                      </span>
                      <span
                        class="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-xs font-medium border border-purple-400/20"
                      >
                        Scatter Pays
                      </span>
                      <span
                        class="px-3 py-1 bg-pink-500/30 text-pink-200 rounded-full text-xs font-medium border border-pink-400/20"
                      >
                        Random Multiplier
                      </span>
                    </div>
                  </div>

                  <!-- Бонусные функции -->
                  <div
                    class="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm p-4 rounded-2xl border border-emerald-400/30"
                  >
                    <h3
                      class="text-white font-semibold mb-3 flex items-center gap-2"
                    >
                      <span class="text-lg">🎁</span>
                      Бонусы
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      <span
                        class="px-3 py-1 bg-emerald-500/30 text-emerald-200 rounded-full text-xs font-medium border border-emerald-400/20"
                      >
                        Free Spins
                      </span>
                      <span
                        class="px-3 py-1 bg-green-500/30 text-green-200 rounded-full text-xs font-medium border border-green-400/20"
                      >
                        Bonus Buy
                      </span>
                      <span
                        class="px-3 py-1 bg-teal-500/30 text-teal-200 rounded-full text-xs font-medium border border-teal-400/20"
                      >
                        Retrigger
                      </span>
                      <span
                        class="px-3 py-1 bg-cyan-500/30 text-cyan-200 rounded-full text-xs font-medium border border-cyan-400/20"
                      >
                        Increasing Multiplier
                      </span>
                    </div>
                  </div>

                  <!-- Тематика -->
                  <div
                    class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-4 rounded-2xl border border-yellow-400/30"
                  >
                    <h3
                      class="text-white font-semibold mb-3 flex items-center gap-2"
                    >
                      <span class="text-lg">🏛️</span>
                      Тематика
                    </h3>
                    <div class="flex flex-wrap gap-2">
                      <span
                        class="px-3 py-1 bg-yellow-500/30 text-yellow-200 rounded-full text-xs font-medium border border-yellow-400/20"
                      >
                        Ancient
                      </span>
                      <span
                        class="px-3 py-1 bg-orange-500/30 text-orange-200 rounded-full text-xs font-medium border border-orange-400/20"
                      >
                        Greek
                      </span>
                      <span
                        class="px-3 py-1 bg-amber-500/30 text-amber-200 rounded-full text-xs font-medium border border-amber-400/20"
                      >
                        Mythology
                      </span>
                      <span
                        class="px-3 py-1 bg-red-500/30 text-red-200 rounded-full text-xs font-medium border border-red-400/20"
                      >
                        Gods
                      </span>
                      <span
                        class="px-3 py-1 bg-rose-500/30 text-rose-200 rounded-full text-xs font-medium border border-rose-400/20"
                      >
                        Olympus
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Дополнительная информация -->
              <section aria-labelledby="additional-info-heading">
                <h2 id="additional-info-heading" class="sr-only">
                  Дополнительная информация
                </h2>
                <dl class="space-y-4">
                  <div
                    class="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex justify-between items-center"
                  >
                    <dt class="text-white/80 font-medium">Поле игры</dt>
                    <dd class="text-white font-bold">6×5</dd>
                  </div>
                  <div
                    class="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex justify-between items-center"
                  >
                    <dt class="text-white/80 font-medium">Линии выплат</dt>
                    <dd class="text-white font-bold">Scatter Pays</dd>
                  </div>
                  <div
                    class="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex justify-between items-center"
                    itemprop="datePublished"
                    content="2021-02-13"
                  >
                    <dt class="text-white/80 font-medium">Дата выхода</dt>
                    <dd class="text-white font-bold">
                      <time datetime="2021-02-13">13.02.2021</time>
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- Основной контент -->
    <div class="container mx-auto px-4 py-8">
      <!-- Обзор игры -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
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
            {{ slot.name || 'Слот' }} - Полный обзор слота 2025
          </h2>
        </div>

        <!-- Основное описание -->
        <div class="prose max-w-none mb-8">
          <p class="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
            Gates of Olympus — это мощный слот от Pragmatic Play, черпающий
            энергию из бесконечной силы Зевса, короля богов. В мире
            древнегреческой мифологии существуют десятки онлайн-слотов, но
            суперзвездой в этой тематической категории является именно Gates of
            Olympus, разделяющий топовую позицию со своим собратом Gates of
            Olympus 1,000.
          </p>

          <p class="text-lg text-gray-700 leading-relaxed mb-8">
            Это слот с высокой волатильностью и системой scatter pays, где
            выигрыши начисляются за одинаковые символы независимо от их
            положения на сетке. Популярная механика в сочетании с
            неограниченными каскадами и множителями — вот ключевые особенности,
            обеспечивающие успех данного тайтла. Когда игроки входят в
            бесплатные спины, события могут стать по-настоящему дикими благодаря
            Total Multiplier, который не сбрасывается между раундами.
          </p>

          <div
            class="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-l-4 border-amber-400 mb-8"
          >
            <h3 class="font-bold text-amber-800 mb-4 text-xl">
              ⚡ Ключевые характеристики слота:
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul class="text-amber-700 space-y-2">
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span
                  >Механика Tumble с каскадными выигрышами
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span
                  >Случайные множители от x2 до x500
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span>15
                  бесплатных спинов в бонусной игре
                </li>
              </ul>
              <ul class="text-amber-700 space-y-2">
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span
                  >Возможность купить бонус за 100x ставки
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span
                  >Максимальный выигрыш 5,000x от ставки
                </li>
                <li class="flex items-center gap-2">
                  <span class="w-2 h-2 bg-amber-500 rounded-full"></span>Один
                  крупный выигрыш на 697,350 спинов
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
                    Входит в ТОП-3 самых популярных слотов мира уже 3 года
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
                      Лучший новый слот
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
                        >#12</span
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
                  онлайн-слоты. Вам не нужны линии выплат, кластеры или способы
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

          <!-- Особенности слота -->
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
                          >x3 от ставки</span
                        >
                      </div>
                      <div
                        class="flex justify-between items-center p-2 bg-orange-50 rounded"
                      >
                        <span class="font-medium">5 символов Зевса:</span>
                        <span class="font-bold text-orange-600"
                          >x5 от ставки</span
                        >
                      </div>
                      <div
                        class="flex justify-between items-center p-2 bg-orange-100 rounded"
                      >
                        <span class="font-medium">6 символов Зевса:</span>
                        <span class="font-bold text-orange-700"
                          >x100 от ставки</span
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
      </div>

      <!-- Статистика популярности -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Насколько популярен {{ slot.name || 'этот слот' }}?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl"
          >
            <div class="text-3xl font-bold text-blue-600 mb-2">#12</div>
            <div class="text-sm text-gray-600">Рейтинг 2024</div>
          </div>
          <div
            class="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl"
          >
            <div class="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
            <div class="text-sm text-gray-600">Пользовательский рейтинг</div>
          </div>
          <div
            class="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl"
          >
            <div class="text-3xl font-bold text-purple-600 mb-2">2M+</div>
            <div class="text-sm text-gray-600">Игроков в месяц</div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-yellow-800 font-medium">
            🏆 {{ slot.name || 'Этот слот' }} удерживает топовые позиции в
            рейтингах уже несколько лет подряд, что подтверждает его
            исключительное качество и увлекательность геймплея.
          </p>
        </div>
      </div>

      <!-- Рейтинг и награды -->
      <div
        class="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/20 p-4 sm:p-6 lg:p-10 mb-8"
      >
        <!-- Декоративные элементы -->
        <div
          class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
        ></div>

        <!-- Заголовок с анимацией -->
        <div
          class="relative z-10 flex flex-col sm:flex-row items-center gap-4 mb-8 text-center sm:text-left"
        >
          <div class="relative">
            <div
              class="w-16 h-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white drop-shadow-md"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <div
              class="absolute -top-1 -right-1 w-6 h-6 bg-yellow-300 rounded-full animate-pulse"
            ></div>
          </div>
          <div>
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent mb-2"
            >
              Рейтинг и награды
            </h2>
            <p class="text-lg text-gray-600 font-medium">
              {{ slot.name || 'Слот' }}
            </p>
          </div>
        </div>

        <!-- Двухколоночная композиция: слева рейтинг + CTA, справа награды -->
        <div
          class="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start"
        >
          <!-- Левая колонка: рейтинг + кнопки (2/3 ширины) -->
          <div class="w-full lg:w-2/3 xl:w-3/4 space-y-8">
            <!-- Основной рейтинг с улучшенным дизайном -->
            <div
              class="relative bg-gradient-to-br from-yellow-50 via-orange-50/50 to-amber-50 p-6 sm:p-8 lg:p-10 rounded-3xl border-2 border-yellow-200/50 shadow-xl overflow-hidden"
            >
              <!-- Блестящий фон -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full animate-beam"
              ></div>

              <div class="relative z-10 text-center mb-8">
                <!-- Анимированные звезды -->
                <div class="flex justify-center mb-6">
                  <div class="flex gap-1">
                    <svg
                      v-for="n in 5"
                      :key="n"
                      class="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 drop-shadow-lg hover:scale-125 transition-all duration-300 cursor-pointer"
                      :class="{ 'animate-bounce': n <= 3 }"
                      :style="{ animationDelay: n * 0.1 + 's' }"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  class="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4 leading-tight"
                >
                  4.8<span class="text-3xl sm:text-4xl lg:text-5xl">/5</span>
                </div>
                <div class="text-xl sm:text-2xl text-gray-700 font-bold mb-3">
                  Средний рейтинг игроков
                </div>
                <div
                  class="text-sm sm:text-base text-gray-600 bg-white/50 rounded-full px-6 py-2 inline-block"
                >
                  Основано на
                  <span class="font-bold text-gray-800">1,247</span> отзывах
                </div>
              </div>

              <!-- Детализация рейтинга с анимацией -->
              <div
                class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6"
              >
                <div
                  v-for="(item, index) in [
                    { stars: 5, percent: 68, color: 'yellow' },
                    { stars: 4, percent: 22, color: 'yellow' },
                    { stars: 3, percent: 7, color: 'orange' },
                    { stars: 2, percent: 2, color: 'red' },
                    { stars: 1, percent: 1, color: 'red' },
                  ]"
                  :key="index"
                  class="text-center p-4 bg-white/70 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div class="text-sm font-semibold text-gray-700 mb-2">
                    {{ item.stars }} звезд{{
                      item.stars === 1 ? 'а' : item.stars < 5 ? 'ы' : ''
                    }}
                  </div>
                  <div
                    class="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden"
                  >
                    <div
                      class="h-3 rounded-full transition-all duration-1000 ease-out shadow-inner"
                      :class="{
                        'bg-yellow-400': item.color === 'yellow',
                        'bg-orange-400': item.color === 'orange',
                        'bg-red-400': item.color === 'red',
                      }"
                      :style="`width: ${item.percent}%`"
                    ></div>
                  </div>
                  <div class="text-sm font-bold text-gray-800">
                    {{ item.percent }}%
                  </div>
                </div>
              </div>
            </div>

            <!-- Кнопки действий под рейтингом -->
            <div
              class="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                class="group relative w-full sm:w-auto bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-8 lg:px-10 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                ></div>
                <svg
                  class="w-6 h-6 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="relative z-10 text-lg">Играть бесплатно</span>
              </button>

              <button
                class="group relative w-full sm:w-auto bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 lg:px-10 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                ></div>
                <svg
                  class="w-6 h-6 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  ></path>
                </svg>
                <span class="relative z-10 text-lg">Играть на деньги</span>
              </button>

              <button
                class="group relative w-full sm:w-auto bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 text-white font-bold py-4 px-8 lg:px-10 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                ></div>
                <svg
                  class="w-6 h-6 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <span class="relative z-10 text-lg">В избранное</span>
              </button>
            </div>
          </div>

          <!-- Правая колонка: награды (1/3 ширины) -->
          <div class="w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-4">
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6"
            >
              <div
                v-for="(award, index) in [
                  {
                    emoji: '🏆',
                    title: 'Слот года 2024',
                    desc: 'Casino Awards',
                    gradient: 'from-yellow-100 to-amber-100',
                    border: 'border-yellow-300',
                    text: 'text-yellow-800',
                  },
                  {
                    emoji: '🎖️',
                    title: 'Лучший дизайн',
                    desc: 'Gaming Excellence',
                    gradient: 'from-purple-100 to-pink-100',
                    border: 'border-purple-300',
                    text: 'text-purple-800',
                  },
                  {
                    emoji: '💎',
                    title: 'Платиновый статус',
                    desc: '10M+ игроков',
                    gradient: 'from-green-100 to-emerald-100',
                    border: 'border-green-300',
                    text: 'text-green-800',
                  },
                  {
                    emoji: '⭐',
                    title: 'Выбор игроков',
                    desc: 'Народное голосование',
                    gradient: 'from-blue-100 to-indigo-100',
                    border: 'border-blue-300',
                    text: 'text-blue-800',
                  },
                ]"
                :key="index"
                :class="`bg-gradient-to-br ${award.gradient} ${award.border} ${award.text}`"
                class="relative group p-6 rounded-2xl border-2 text-center hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <!-- Блестящий эффект при hover -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"
                ></div>

                <div class="relative z-10">
                  <div
                    class="text-4xl lg:text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300"
                  >
                    {{ award.emoji }}
                  </div>
                  <h3 class="font-black text-lg lg:text-xl mb-2 leading-tight">
                    {{ award.title }}
                  </h3>
                  <p class="text-sm font-medium opacity-80">{{ award.desc }}</p>
                </div>

                <!-- Декоративные элементы -->
                <div
                  class="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full"
                ></div>
                <div
                  class="absolute bottom-2 left-2 w-2 h-2 bg-white/20 rounded-full"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Особенности игры -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Особенности {{ slot.name || 'слота' }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            class="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200"
          >
            <div class="text-purple-600 text-3xl mb-3">⚡</div>
            <h3 class="font-bold text-lg mb-2">Scatter Pays</h3>
            <p class="text-gray-600 text-sm">
              Выигрыши начисляются за 8+ одинаковых символов в любом месте поля
            </p>
          </div>

          <div
            class="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200"
          >
            <div class="text-green-600 text-3xl mb-3">🌊</div>
            <h3 class="font-bold text-lg mb-2">Каскадные выигрыши</h3>
            <p class="text-gray-600 text-sm">
              Бесконечные каскады с удалением выигрышных символов
            </p>
          </div>

          <div
            class="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
          >
            <div class="text-yellow-600 text-3xl mb-3">✨</div>
            <h3 class="font-bold text-lg mb-2">Множители до x500</h3>
            <p class="text-gray-600 text-sm">
              Цветные сферы с множителями от x2 до x500
            </p>
          </div>
        </div>
      </div>

      <!-- Бонусные функции -->
      <div
        class="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-3xl shadow-2xl p-10 mb-8 border border-purple-100/50 overflow-hidden"
      >
        <!-- Фоновые эффекты -->
        <div
          class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239333ea%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/svg%3E')] opacity-60"
        ></div>
        <div
          class="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse"
          style="animation-delay: 2s"
        ></div>
        <div
          class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 rounded-t-3xl"
        >
          <div
            class="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
          ></div>
        </div>

        <div class="relative z-10">
          <!-- Заголовок с новым дизайном -->
          <div class="flex items-center gap-4 mb-8">
            <div class="relative">
              <div
                class="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 animate-pulse"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  ></path>
                </svg>
              </div>
              <div
                class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce"
              >
                <span class="text-white text-xs font-bold">🎁</span>
              </div>
            </div>
            <div>
              <h2
                class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-700 to-pink-700 bg-clip-text text-transparent"
              >
                Бонусные функции
              </h2>
              <div
                class="h-1 w-28 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mt-2"
              ></div>
            </div>
          </div>

          <!-- Основные бонусы -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <!-- Бесплатные спины -->
            <div
              class="group bg-gradient-to-br from-white/80 via-purple-50/50 to-pink-50/50 backdrop-blur-sm p-8 rounded-3xl border border-purple-200/50 shadow-xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              <div class="relative z-10">
                <div class="flex items-center gap-4 mb-6">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                  >
                    <span
                      class="text-3xl animate-spin"
                      style="animation-duration: 3s"
                      >🎰</span
                    >
                  </div>
                  <div>
                    <h3
                      class="text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300"
                    >
                      Бесплатные спины
                    </h3>
                    <div class="text-purple-600 text-sm font-medium">
                      Самый популярный бонус
                    </div>
                  </div>
                </div>
                <p class="text-gray-700 mb-6 text-lg leading-relaxed">
                  Получите 15 бесплатных спинов при выпадении 4 или более
                  scatter-символов Зевса с невероятными множителями.
                </p>
                <div class="space-y-4">
                  <div
                    class="flex items-center gap-3 bg-white/60 p-3 rounded-xl"
                  >
                    <div
                      class="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-pulse"
                    ></div>
                    <span class="text-purple-700 font-semibold"
                      >Увеличенные множители до x500</span
                    >
                  </div>
                  <div
                    class="flex items-center gap-3 bg-white/60 p-3 rounded-xl"
                  >
                    <div
                      class="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-pulse"
                      style="animation-delay: 0.5s"
                    ></div>
                    <span class="text-purple-700 font-semibold"
                      >Возможность повторного запуска</span
                    >
                  </div>
                  <div
                    class="flex items-center gap-3 bg-white/60 p-3 rounded-xl"
                  >
                    <div
                      class="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-pulse"
                      style="animation-delay: 1s"
                    ></div>
                    <span class="text-purple-700 font-semibold"
                      >Дополнительные wild-символы</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Множители -->
            <div
              class="group bg-gradient-to-br from-white/80 via-blue-50/50 to-indigo-50/50 backdrop-blur-sm p-8 rounded-3xl border border-blue-200/50 shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              <div class="relative z-10">
                <div class="flex items-center gap-4 mb-6">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                  >
                    <span class="text-3xl animate-bounce">⚡</span>
                  </div>
                  <div>
                    <h3
                      class="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300"
                    >
                      Множители
                    </h3>
                    <div class="text-blue-600 text-sm font-medium">
                      Случайные усиления
                    </div>
                  </div>
                </div>
                <p class="text-gray-700 mb-6 text-lg leading-relaxed">
                  Случайные множители могут появляться в любой момент игры,
                  значительно увеличивая ваши выигрыши.
                </p>
                <div class="space-y-4">
                  <div
                    class="flex items-center gap-3 bg-white/60 p-3 rounded-xl"
                  >
                    <div
                      class="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"
                    ></div>
                    <span class="text-blue-700 font-semibold"
                      >От x2 до x500</span
                    >
                  </div>
                  <div
                    class="flex items-center gap-3 bg-white/60 p-3 rounded-xl"
                  >
                    <div
                      class="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"
                      style="animation-delay: 0.5s"
                    ></div>
                    <span class="text-blue-700 font-semibold"
                      >Применяются к общему выигрышу</span
                    >
                  </div>
                  <div
                    class="flex items-center gap-3 bg-white/60 p-3 rounded-xl"
                  >
                    <div
                      class="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"
                      style="animation-delay: 1s"
                    ></div>
                    <span class="text-blue-700 font-semibold"
                      >Могут складываться между собой</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Покупка бонуса -->
            <div
              class="group bg-gradient-to-br from-white/80 via-amber-50/50 to-orange-50/50 backdrop-blur-sm p-8 rounded-3xl border border-amber-200/50 shadow-xl hover:shadow-amber-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              ></div>
              <div class="relative z-10">
                <div class="flex items-center gap-4 mb-6">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                  >
                    <span class="text-3xl group-hover:animate-bounce">🛒</span>
                  </div>
                  <div>
                    <h3
                      class="text-2xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors duration-300"
                    >
                      Покупка бонуса
                    </h3>
                    <div class="text-amber-600 text-sm font-medium">
                      Мгновенный доступ
                    </div>
                  </div>
                </div>
                <p class="text-gray-700 mb-6 text-lg leading-relaxed">
                  Не хотите ждать? Купите бонусную игру прямо сейчас за 100x от
                  текущей ставки.
                </p>
                <div class="space-y-4">
                  <div
                    class="flex items-center gap-3 bg-white/60 p-3 rounded-xl"
                  >
                    <div
                      class="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"
                    ></div>
                    <span class="text-amber-700 font-semibold"
                      >Гарантированные 15 фриспинов</span
                    >
                  </div>
                  <div
                    class="flex items-center gap-3 bg-white/60 p-3 rounded-xl"
                  >
                    <div
                      class="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"
                      style="animation-delay: 0.5s"
                    ></div>
                    <span class="text-amber-700 font-semibold"
                      >Повышенные шансы на крупный выигрыш</span
                    >
                  </div>
                  <div
                    class="flex items-center gap-3 bg-white/60 p-3 rounded-xl"
                  >
                    <div
                      class="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"
                      style="animation-delay: 1s"
                    ></div>
                    <span class="text-amber-700 font-semibold"
                      >Доступно в любой момент</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Механика Tumble с новым дизайном -->
          <div
            class="relative bg-gradient-to-br from-white/90 via-emerald-50/60 to-green-50/60 backdrop-blur-sm p-8 rounded-3xl border border-emerald-200/60 shadow-xl overflow-hidden"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-green-400/5"
            ></div>
            <div class="relative z-10">
              <div class="flex items-center gap-4 mb-6">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <span
                    class="text-2xl animate-bounce"
                    style="animation-duration: 2s"
                    >🌊</span
                  >
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    Механика Tumble
                  </h3>
                  <div class="text-emerald-600 font-medium">
                    Каскадные выигрыши
                  </div>
                </div>
              </div>
              <p class="text-gray-700 mb-8 text-lg leading-relaxed">
                После каждого выигрыша выигрышные символы исчезают, а новые
                символы падают сверху, создавая возможности для цепочек
                выигрышей без дополнительных ставок.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center group">
                  <div class="relative">
                    <div
                      class="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    >
                      <span class="text-3xl animate-pulse">1️⃣</span>
                    </div>
                    <div
                      class="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-ping opacity-75"
                    ></div>
                  </div>
                  <div
                    class="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-emerald-200/50"
                  >
                    <p class="text-emerald-700 font-semibold">
                      Выигрышные символы исчезают
                    </p>
                  </div>
                </div>
                <div class="text-center group">
                  <div class="relative">
                    <div
                      class="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    >
                      <span
                        class="text-3xl animate-bounce"
                        style="animation-delay: 0.3s"
                        >2️⃣</span
                      >
                    </div>
                    <div
                      class="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-ping opacity-75"
                      style="animation-delay: 0.5s"
                    ></div>
                  </div>
                  <div
                    class="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-emerald-200/50"
                  >
                    <p class="text-emerald-700 font-semibold">
                      Новые символы падают вниз
                    </p>
                  </div>
                </div>
                <div class="text-center group">
                  <div class="relative">
                    <div
                      class="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    >
                      <span
                        class="text-3xl animate-spin"
                        style="animation-duration: 4s; animation-delay: 0.6s"
                        >3️⃣</span
                      >
                    </div>
                    <div
                      class="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full animate-ping opacity-75"
                      style="animation-delay: 1s"
                    ></div>
                  </div>
                  <div
                    class="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-emerald-200/50"
                  >
                    <p class="text-emerald-700 font-semibold">
                      Процесс повторяется
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Стратегии и советы -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Стратегии и советы
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-green-600">
              ✅ Рекомендации
            </h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Используйте Ante Bet для увеличения частоты бонусов</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Играйте длинными сессиями для максимальной отдачи</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Покупка бонуса оправдана при большом банкролле</span>
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-red-600">❌ Чего избегать</h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Не превышайте 5% банкролла за спин</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Избегайте погони за проигрышами</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Не покупайте бонус при малом банкролле</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Таблица выплат -->
      <div
        class="relative bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30 rounded-3xl shadow-2xl p-10 mb-8 border border-emerald-100/50 overflow-hidden"
      >
        <!-- Фоновая анимация -->
        <div
          class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2310b981%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/svg%3E')] opacity-40"
        ></div>
        <div
          class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 rounded-t-3xl"
        >
          <div
            class="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
          ></div>
        </div>

        <div class="relative z-10">
          <div class="flex items-center gap-4 mb-8">
            <div class="relative">
              <div
                class="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3"
              >
                <svg
                  class="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div
                class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              >
                <span class="text-white text-xs font-bold">💰</span>
              </div>
            </div>
            <div>
              <h2
                class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-emerald-700 to-teal-700 bg-clip-text text-transparent"
              >
                Таблица выплат
              </h2>
              <div
                class="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mt-2"
              ></div>
            </div>
          </div>

          <div class="mb-6">
            <div
              class="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-amber-400"
            >
              <p class="text-amber-800 font-medium">
                💡 Выигрыши формируются при появлении 8 или более одинаковых
                символов в любом месте игрового поля
              </p>
            </div>
          </div>

          <!-- Высокооплачиваемые символы -->
          <div class="mb-8">
            <h3
              class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"
            >
              <span class="text-2xl">💎</span> Высокооплачиваемые символы
            </h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                class="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200"
              >
                <div class="flex items-center gap-4 mb-4">
                  <div
                    class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl"
                  >
                    💎
                  </div>
                  <div>
                    <h4 class="font-bold text-red-800">Кубок (Премиум)</h4>
                    <p class="text-red-600 text-sm">Самый ценный символ</p>
                  </div>
                </div>
                <div class="grid grid-cols-5 gap-2 text-center">
                  <div class="bg-white p-2 rounded">
                    <div class="text-xs text-gray-600">8x</div>
                    <div class="font-bold text-red-600">50x</div>
                  </div>
                  <div class="bg-white p-2 rounded">
                    <div class="text-xs text-gray-600">9x</div>
                    <div class="font-bold text-red-600">25x</div>
                  </div>
                  <div class="bg-white p-2 rounded">
                    <div class="text-xs text-gray-600">10x</div>
                    <div class="font-bold text-red-600">15x</div>
                  </div>
                  <div class="bg-white p-2 rounded">
                    <div class="text-xs text-gray-600">11x</div>
                    <div class="font-bold text-red-600">10x</div>
                  </div>
                  <div class="bg-white p-2 rounded">
                    <div class="text-xs text-gray-600">12+</div>
                    <div class="font-bold text-red-600">5x</div>
                  </div>
                </div>
              </div>

              <div
                class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
              >
                <div class="flex items-center gap-4 mb-4">
                  <div
                    class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl"
                  >
                    ⚱️
                  </div>
                  <div>
                    <h4 class="font-bold text-blue-800">Амфора</h4>
                    <p class="text-blue-600 text-sm">Высокая ценность</p>
                  </div>
                </div>
                <div class="grid grid-cols-5 gap-2 text-center">
                  <div class="bg-white p-2 rounded">
                    <div class="text-xs text-gray-600">8x</div>
                    <div class="font-bold text-blue-600">25x</div>
                  </div>
                  <div class="bg-white p-2 rounded">
                    <div class="text-xs text-gray-600">9x</div>
                    <div class="font-bold text-blue-600">12x</div>
                  </div>
                  <div class="bg-white p-2 rounded">
                    <div class="text-xs text-gray-600">10x</div>
                    <div class="font-bold text-blue-600">8x</div>
                  </div>
                  <div class="bg-white p-2 rounded">
                    <div class="text-xs text-gray-600">11x</div>
                    <div class="font-bold text-blue-600">5x</div>
                  </div>
                  <div class="bg-white p-2 rounded">
                    <div class="text-xs text-gray-600">12+</div>
                    <div class="font-bold text-blue-600">2.5x</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Среднеоплачиваемые символы -->
          <div class="mb-8">
            <h3
              class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"
            >
              <span class="text-2xl">💰</span> Среднеоплачиваемые символы
            </h3>
            <div
              class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-2xl"
                >
                  💍
                </div>
                <div>
                  <h4 class="font-bold text-purple-800">Кольцо</h4>
                  <p class="text-purple-600 text-sm">Базовая ценность</p>
                </div>
              </div>
              <div class="grid grid-cols-5 gap-2 text-center">
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">8x</div>
                  <div class="font-bold text-purple-600">10x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">9x</div>
                  <div class="font-bold text-purple-600">5x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">10x</div>
                  <div class="font-bold text-purple-600">3x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">11x</div>
                  <div class="font-bold text-purple-600">2x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">12+</div>
                  <div class="font-bold text-purple-600">1x</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Специальные символы -->
          <div>
            <h3
              class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"
            >
              <span class="text-2xl">⚡</span> Специальные символы
            </h3>
            <div
              class="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-2xl"
                >
                  ⚡
                </div>
                <div>
                  <h4 class="font-bold text-yellow-800">Зевс (Scatter)</h4>
                  <p class="text-yellow-600 text-sm">
                    Активирует бонусную игру
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-4 rounded-lg text-center">
                  <div class="text-2xl mb-2">4️⃣</div>
                  <div class="font-bold text-yellow-600">15 фриспинов</div>
                  <div class="text-xs text-gray-600">+ выплата 3x</div>
                </div>
                <div class="bg-white p-4 rounded-lg text-center">
                  <div class="text-2xl mb-2">5️⃣</div>
                  <div class="font-bold text-yellow-600">15 фриспинов</div>
                  <div class="text-xs text-gray-600">+ выплата 5x</div>
                </div>
                <div class="bg-white p-4 rounded-lg text-center">
                  <div class="text-2xl mb-2">6️⃣</div>
                  <div class="font-bold text-yellow-600">15 фриспинов</div>
                  <div class="text-xs text-gray-600">+ выплата 10x</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Технические характеристики -->
        <div
          class="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 rounded-3xl shadow-2xl p-10 mb-8 border border-blue-100/50 overflow-hidden"
        >
          <!-- Фоновые эффекты -->
          <div
            class="absolute inset-0 bg-blue-50/20"
            style="
              background-image: radial-gradient(
                circle at 1px 1px,
                rgba(59, 130, 246, 0.1) 1px,
                transparent 0
              );
              background-size: 20px 20px;
            "
          ></div>
          <div
            class="absolute -top-20 -right-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
          ></div>
          <div
            class="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"
            style="animation-delay: 3s"
          ></div>
          <div
            class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 rounded-t-3xl"
          >
            <div
              class="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
            ></div>
          </div>

          <div class="relative z-10">
            <!-- Заголовок с новым дизайном -->
            <div class="flex items-center gap-4 mb-10">
              <div class="relative">
                <div
                  class="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 animate-pulse"
                >
                  <svg
                    class="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div
                  class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce"
                >
                  <span class="text-white text-xs font-bold">⚙️</span>
                </div>
              </div>
              <div>
                <h2
                  class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-700 bg-clip-text text-transparent"
                >
                  Технические характеристики
                </h2>
                <div
                  class="h-1 w-36 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mt-2"
                ></div>
              </div>
            </div>

            <!-- Основная информация -->
            <div class="mb-10">
              <div class="flex items-center gap-3 mb-6">
                <span class="text-2xl animate-bounce">🎮</span>
                <h3 class="text-2xl font-bold text-gray-900">
                  Основная информация
                </h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  class="group bg-gradient-to-br from-white/80 via-purple-50/60 to-pink-50/60 backdrop-blur-sm p-6 rounded-3xl border border-purple-200/60 shadow-xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      >
                        <svg
                          class="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                      <h4
                        class="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors"
                      >
                        Провайдер
                      </h4>
                    </div>
                    <p class="text-purple-600 font-semibold text-xl mb-1">
                      Pragmatic Play
                    </p>
                    <p class="text-purple-500 text-sm">Лидер индустрии</p>
                  </div>
                </div>

                <div
                  class="group bg-gradient-to-br from-white/80 via-green-50/60 to-emerald-50/60 backdrop-blur-sm p-6 rounded-3xl border border-green-200/60 shadow-xl hover:shadow-green-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      >
                        <svg
                          class="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <h4
                        class="font-bold text-gray-900 text-lg group-hover:text-green-700 transition-colors"
                      >
                        Дата выпуска
                      </h4>
                    </div>
                    <p class="text-green-600 font-semibold text-xl mb-1">
                      13 февраля 2021
                    </p>
                    <p class="text-green-500 text-sm">Популярный релиз</p>
                  </div>
                </div>

                <div
                  class="group bg-gradient-to-br from-white/80 via-blue-50/60 to-cyan-50/60 backdrop-blur-sm p-6 rounded-3xl border border-blue-200/60 shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      >
                        <svg
                          class="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                          ></path>
                        </svg>
                      </div>
                      <h4
                        class="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors"
                      >
                        Тип игры
                      </h4>
                    </div>
                    <p class="text-blue-600 font-semibold text-xl mb-1">
                      Видеослот
                    </p>
                    <p class="text-blue-500 text-sm">Современный формат</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Игровые параметры -->
            <div class="mb-10">
              <div class="flex items-center gap-3 mb-6">
                <span
                  class="text-2xl animate-spin"
                  style="animation-duration: 4s"
                  >⚙️</span
                >
                <h3 class="text-2xl font-bold text-gray-900">
                  Игровые параметры
                </h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  class="group bg-gradient-to-br from-white/80 via-orange-50/60 to-red-50/60 backdrop-blur-sm p-6 rounded-3xl border border-orange-200/60 shadow-xl hover:shadow-orange-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300"
                      >
                        6×5
                      </div>
                      <h4
                        class="font-bold text-gray-900 group-hover:text-orange-700 transition-colors"
                      >
                        Поле игры
                      </h4>
                    </div>
                    <p class="text-orange-600 font-semibold text-xl mb-1">
                      6 x 5
                    </p>
                    <p class="text-orange-500 text-sm">Расширенное поле</p>
                  </div>
                </div>

                <div
                  class="group bg-gradient-to-br from-white/80 via-teal-50/60 to-cyan-50/60 backdrop-blur-sm p-6 rounded-3xl border border-teal-200/60 shadow-xl hover:shadow-teal-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-teal-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      >
                        <svg
                          class="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <h4
                        class="font-bold text-gray-900 group-hover:text-teal-700 transition-colors"
                      >
                        Линии выплат
                      </h4>
                    </div>
                    <p class="text-teal-600 font-semibold text-xl mb-1">
                      Scatter Pays
                    </p>
                    <p class="text-teal-500 text-sm">Кластерные выплаты</p>
                  </div>
                </div>

                <div
                  class="group bg-gradient-to-br from-white/80 via-indigo-50/60 to-purple-50/60 backdrop-blur-sm p-6 rounded-3xl border border-indigo-200/60 shadow-xl hover:shadow-indigo-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      >
                        <svg
                          class="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                          ></path>
                        </svg>
                      </div>
                      <h4
                        class="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors"
                      >
                        Диапазон ставок
                      </h4>
                    </div>
                    <p class="text-indigo-600 font-semibold text-xl mb-1">
                      €0.20 - €100
                    </p>
                    <p class="text-indigo-500 text-sm">Широкий диапазон</p>
                  </div>
                </div>

                <div
                  class="group bg-gradient-to-br from-white/80 via-yellow-50/60 to-orange-50/60 backdrop-blur-sm p-6 rounded-3xl border border-yellow-200/60 shadow-xl hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      >
                        <svg
                          class="w-6 h-6 text-white"
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
                      <h4
                        class="font-bold text-gray-900 group-hover:text-yellow-700 transition-colors"
                      >
                        Макс. выигрыш
                      </h4>
                    </div>
                    <p class="text-yellow-600 font-semibold text-xl mb-1">
                      5,000x
                    </p>
                    <p class="text-yellow-500 text-sm">Высокий потенциал</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Дополнительные возможности -->
            <div>
              <div class="flex items-center gap-3 mb-6">
                <span class="text-2xl animate-pulse">📱</span>
                <h3 class="text-2xl font-bold text-gray-900">
                  Дополнительные возможности
                </h3>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  class="group bg-gradient-to-br from-white/80 via-purple-50/60 to-pink-50/60 backdrop-blur-sm p-6 rounded-3xl border border-purple-200/60 shadow-xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      >
                        <svg
                          class="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <h4
                        class="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors"
                      >
                        Автоигра
                      </h4>
                    </div>
                    <p class="text-purple-600 font-semibold text-xl mb-2">
                      ✅ Поддерживается
                    </p>
                    <p class="text-purple-500 text-sm">До 1000 спинов</p>
                  </div>
                </div>

                <div
                  class="group bg-gradient-to-br from-white/80 via-blue-50/60 to-indigo-50/60 backdrop-blur-sm p-6 rounded-3xl border border-blue-200/60 shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 overflow-hidden relative"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-indigo-400/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  ></div>
                  <div class="relative z-10">
                    <div class="flex items-center gap-3 mb-4">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      >
                        <svg
                          class="w-6 h-6 text-white"
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
                      <h4
                        class="font-bold text-gray-900 text-lg group-hover:text-blue-700 transition-colors"
                      >
                        Турбо режим
                      </h4>
                    </div>
                    <p class="text-blue-600 font-semibold text-xl mb-2">
                      ✅ Быстрая игра
                    </p>
                    <p class="text-blue-500 text-sm">Ускоренные спины</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ -->
        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
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
                  Можно ли играть в {{ slot.name || 'этот слот' }} бесплатно?
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
                      Вы можете играть в демо-версию слота без регистрации и
                      депозита. Это отличный способ изучить механику игры и
                      бонусные функции перед игрой на реальные деньги.
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
                  Какова максимальная выплата в {{ slot.name || 'этом слоте' }}?
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
                  Работает ли слот на мобильных устройствах?
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
        </div>

        <!-- Отзывы игроков - Модернизированный дизайн -->
        <div
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
                Реальные мнения от сообщества слот-игроков
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

            <!-- Количество отзывов -->
            <div
              class="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="text-4xl font-black">1.2K+</div>
                <div class="text-2xl">📝</div>
              </div>
              <div class="text-green-100 text-sm font-medium">
                Всего отзывов
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
                      Упоминается в 89% позитивных отзывов
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
                    "Реально крутой слот! Множители действительно работают -
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
                Показать все 1,247 отзывов
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
        </div>

        <!-- Профессиональная оценка - Премиум дизайн -->
        <div
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
                    Превосходный слот с инновационной механикой и высоким
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
                созданию видеослотов. Механика Scatter Pays полностью меняет
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
                    - это выдающийся слот для опытных игроков, которые ценят
                    инновационную механику и готовы к высокой волатильности ради
                    потенциала больших выигрышей.
                    <span class="font-bold text-white"
                      >Новичкам рекомендуем начать с менее волатильных
                      слотов.</span
                    >
                    Этот слот станет идеальным выбором для тех, кто ищет
                    адреналин и готов к серьёзной игре! 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Заключение -->
        <div
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
                  Итоговая оценка {{ slot.name || 'слота' }}
                </h3>
              </div>

              <div class="space-y-4">
                <p class="text-lg text-slate-700 leading-relaxed font-medium">
                  {{ slot.name || 'Этот слот' }} заслуженно считается одним из
                  <span class="text-indigo-600 font-semibold"
                    >лучших слотов от Pragmatic Play</span
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
                    видеослотов. Каскадные выигрыши и множители создают
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
                это не просто слот, это
                <span class="text-yellow-300 font-semibold"
                  >новая эра в мире азартных игр</span
                >. Если вы готовы к вызову и хотите испытать настоящий адреналин
                от игры, этот слот создан именно для вас.
                <span class="text-red-300 font-medium"
                  >Помните: играйте ответственно и наслаждайтесь
                  процессом!</span
                >
                🎰✨
              </p>
            </div>
          </div>
        </div>

        <!-- Призыв к действию - Премиум дизайн -->
        <div
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
                    slot.name || 'этого слота'
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

            <!-- Кнопки действий -->
            <div
              class="flex flex-col lg:flex-row gap-4 justify-center items-center mb-10"
            >
              <!-- Кнопка демо -->
              <button
                class="group relative overflow-hidden bg-white hover:bg-gray-50 text-slate-900 font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-white/20 transform hover:scale-105 flex items-center justify-center gap-3 min-w-[200px]"
                @click="playSlot"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                ></div>
                <span class="text-2xl group-hover:animate-spin">🎮</span>
                <span class="text-lg">Играть демо</span>
              </button>

              <!-- Кнопка на деньги -->
              <button
                class="group relative overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/30 transform hover:scale-105 flex items-center justify-center gap-3 min-w-[200px]"
                @click="playForReal"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                ></div>
                <span class="text-2xl group-hover:animate-bounce">💎</span>
                <span class="text-lg">Играть на деньги</span>
              </button>
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
        </div>

        <!-- Похожие слоты -->
        <div v-if="similarSlots.length > 0" class="mt-12">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Похожие слоты</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="similarSlot in similarSlots"
              :key="similarSlot.id"
              class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div
                class="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"
              >
                <span class="text-white text-3xl font-bold">{{
                  (similarSlot.name || 'S').charAt(0)
                }}</span>
              </div>

              <div class="p-6">
                <h3 class="font-bold text-xl mb-2 text-gray-800">
                  {{ similarSlot.name || 'Слот' }}
                </h3>
                <p class="text-gray-600 mb-3">
                  {{ similarSlot.provider?.name || 'Провайдер' }}
                </p>
                <div class="flex justify-between items-center mb-4">
                  <span
                    class="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full"
                  >
                    RTP: {{ similarSlot.rtp ?? '96' }}%
                  </span>
                  <span class="text-sm text-gray-500 capitalize">{{
                    similarSlot.volatility || 'средняя'
                  }}</span>
                </div>

                <NuxtLink
                  :to="`/slots/${similarSlot.slug}`"
                  class="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-center py-3 px-4 rounded-lg transition-all duration-200 font-semibold"
                >
                  Подробнее
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

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
        (s.provider_id === slot.value.provider_id ||
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
      title: `${slot.value.name || 'Слот'} - SlotQuest`,
      meta: [
        {
          name: 'description',
          content: `Играйте в ${slot.value.name || 'слот'} от ${slot.value.provider?.name || 'провайдера'}. RTP: ${slot.value.rtp || '96'}%, волатильность: ${slot.value.volatility || 'средняя'}`,
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
    // Дефолтные мета-теги для SSR
    useHead({
      title: 'Слот - SlotQuest',
      meta: [
        {
          name: 'description',
          content:
            'Играйте в слот от ведущего провайдера. Отличные возможности для выигрыша!',
        },
      ],
    })
  }
})

// Методы
const loadSlot = async () => {
  try {
    loading.value = true
    error.value = null

    // Загружаем все слоты для поиска по slug
    const slotsResponse = await $fetch('http://localhost:3001/api/slots')

    // API возвращает объект с полем data, содержащим массив слотов
    const slotsData = slotsResponse.data || slotsResponse
    allSlots.value = slotsData

    // Ищем слот по slug
    const foundSlot = slotsData.find((s) => s.slug === slug)

    if (!foundSlot) {
      throw new Error(`Слот с адресом "${slug}" не найден`)
    }

    slot.value = foundSlot
  } catch (err) {
    console.error('Ошибка загрузки слота:', err)
    error.value = err.message || 'Произошла ошибка при загрузке слота'
  } finally {
    loading.value = false
  }
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
      `Демо-версия для игры "${slot.value.name || 'слот'}" временно недоступна. Обратитесь к администратору сайта.`,
    )
  }
}

const playForReal = () => {
  if (!slot.value) return

  // Проверяем, есть ли ссылка для игры на реальные деньги
  if (slot.value.real_play_url && slot.value.real_play_url.trim()) {
    // Открываем страницу казино в новой вкладке
    window.open(slot.value.real_play_url, '_blank', 'noopener,noreferrer')
  } else {
    // Показываем уведомление с предложением связаться с поддержкой
    alert(
      `Игра на реальные деньги для "${slot.value.name || 'слот'}" временно недоступна. Обратитесь к администратору сайта для получения информации о доступных казино.`,
    )
  }
}

const findCasino = () => {
  if (!slot.value) return
  // Здесь будет логика поиска казино с бонусами
  alert(`Поиск лучших казино для игры в ${slot.value.name || 'слот'}`)
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
  img.alt = `Изображение слота ${slot.value.name}`
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
    return 'Увлекательный видеослот с отличными возможностями для выигрыша.'
  if ((slot.name || '').toLowerCase().includes('gates of olympus')) {
    return `${slot.name || 'Слот'} - это революционный слот от Pragmatic Play, который перевернул представление о видеослотах. Игра с полем 6x5 и системой Scatter Pays предлагает уникальный геймплей, где выигрыши начисляются за 8+ одинаковых символов в любом месте экрана.`
  }
  return `${slot.name || 'Слот'} - увлекательный видеослот от ${slot.provider?.name || 'известного провайдера'}, который предлагает захватывающий геймплей и отличные возможности для выигрыша.`
}

const getShortDescription = (slot) => {
  if (!slot || !slot.name)
    return 'Захватывающий видеослот с отличными возможностями для выигрыша и увлекательным геймплеем.'
  if ((slot.name || '').toLowerCase().includes('gates of olympus')) {
    return 'Легендарный слот от Pragmatic Play с уникальной механикой Scatter Pays и множителями до x500. Окунитесь в мир древнегреческих богов и сражайтесь за джекпот до x5,000 от ставки!'
  }
  if ((slot.name || '').toLowerCase().includes('book of dead')) {
    return "Культовый слот от Play'n GO о приключениях археолога Рича Уайлде в Древнем Египте. Бонусная игра с расширяющимися символами может принести выигрыш до x5,000!"
  }
  if ((slot.name || '').toLowerCase().includes('sweet bonanza')) {
    return 'Яркий и сладкий слот от Pragmatic Play с каскадными выигрышами и бонусными множителями. Соберите 4+ леденца для активации бесплатных вращений!'
  }
  return `Захватывающий видеослот от ${slot.provider?.name || 'ведущего провайдера'} с отличными возможностями для выигрыша и увлекательным геймплеем.`
}

const getDetailedDescription = (slot) => {
  if (!slot || !slot.name)
    return 'Этот увлекательный видеослот предлагает игрокам захватывающий геймплей с множеством возможностей для крупных выигрышей. Современная графика и звуковое сопровождение создают неповторимую атмосферу азарта.'
  if ((slot.name || '').toLowerCase().includes('gates of olympus')) {
    return 'Главная особенность слота - множители от x2 до x500, которые появляются случайным образом и могут значительно увеличить ваши выигрыши. В бонусной игре действует система Total Multiplier, где все множители суммируются и не сбрасываются между спинами, что может привести к феноменальным выплатам.'
  }
  return `Этот слот отличается высококачественной графикой, продуманной механикой и отличным балансом между частотой выигрышей и их размером. RTP составляет ${slot.rtp || '96'}%, что делает игру привлекательной для большинства игроков.`
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

// Функция для генерации структурированных данных Schema.org
const getStructuredData = (slot) => {
  if (!slot || !slot.name) return '{}'

  const baseUrl = 'https://slotquest.com'
  const slotUrl = `${baseUrl}/slots/${slot.slug || slug}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: slot.name,
    description: getShortDescription(slot),
    url: slotUrl,
    image: `${baseUrl}/images/slots/${slot.slug || slug}.jpg`,
    datePublished: slot.release_date || '2021-02-13',
    genre: 'Casino Slot Game',
    gamePlatform: 'Web Browser',
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    publisher: {
      '@type': 'Organization',
      name: slot.provider?.name || 'Pragmatic Play',
      url: 'https://pragmaticplay.com',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '1247',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      description: 'Free demo version available',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '4.8',
        bestRating: '5',
      },
      author: {
        '@type': 'Organization',
        name: 'SlotQuest Editorial Team',
      },
      reviewBody: getDetailedDescription(slot),
    },
    keywords: [
      slot.name,
      'онлайн слот',
      'казино игра',
      slot.provider?.name || 'Pragmatic Play',
      'бесплатная игра',
      'демо версия',
      'слот машина',
    ].join(', '),
  }

  return JSON.stringify(structuredData)
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
