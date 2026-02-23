<template>
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
          <Icon
            name="solar:hamburger-menu-bold-duotone"
            class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white"
            aria-hidden="true"
          />
        </div>
        Characteristics
      </h2>

      <!-- 📱 Адаптивная сетка: 2 колонки на планшете в горизонтальном режиме, 1 на остальных в sidebar -->
      <dl class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
        <!-- 📱 RTP - адаптивная карточка -->
        <div
          class="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
                  <Icon
                    name="solar:restart-circle-bold-duotone"
                    class="w-5 h-5 md:w-6 md:h-6 text-white"
                    aria-hidden="true"
                  />
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
          class="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-orange-400/30 hover:border-orange-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
                  <Icon
                    name="solar:graph-up-bold-duotone"
                    class="w-5 h-5 md:w-6 md:h-6 text-white"
                    aria-hidden="true"
                  />
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
          class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
                  <Icon
                    name="solar:cup-star-bold-duotone"
                    class="w-5 h-5 md:w-6 md:h-6 text-white"
                    aria-hidden="true"
                  />
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
          class="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-blue-400/30 hover:border-blue-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
                  <Icon
                    name="solar:dollar-bold-duotone"
                    class="w-5 h-5 md:w-6 md:h-6 text-white"
                    aria-hidden="true"
                  />
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
          class="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-teal-400/30 hover:border-teal-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
                  <Icon
                    name="solar:wad-of-money-bold-duotone"
                    class="w-5 h-5 md:w-6 md:h-6 text-white"
                    aria-hidden="true"
                  />
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
          class="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-amber-400/30 hover:border-amber-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
                  <Icon
                    name="solar:calendar-date-bold-duotone"
                    class="w-5 h-5 md:w-6 md:h-6 text-white"
                    aria-hidden="true"
                  />
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
          class="bg-gradient-to-br from-rose-500/20 to-pink-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-rose-400/30 hover:border-rose-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
                  <Icon
                    name="solar:widget-3-bold-duotone"
                    class="w-5 h-5 md:w-6 md:h-6 text-white"
                    aria-hidden="true"
                  />
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
          class="bg-gradient-to-br from-violet-500/20 to-purple-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-violet-400/30 hover:border-violet-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
                  <Icon
                    name="solar:routing-2-bold-duotone"
                    class="w-5 h-5 md:w-6 md:h-6 text-white"
                    aria-hidden="true"
                  />
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
        <Icon name="solar:chart-square-bold" class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" aria-hidden="true" />
        Popularity
      </h2>
      <div
        class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
          class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-4 rounded-xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
                <Icon name="solar:chart-2-bold-duotone" class="w-4 h-4 text-white" />
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
          class="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm p-4 rounded-xl border border-orange-400/30 hover:border-orange-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
                <Icon name="solar:gamepad-old-bold-duotone" class="w-4 h-4 text-white" />
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
        <Icon name="solar:bolt-bold-duotone" class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" aria-hidden="true" />
        Features
      </h2>
      <div class="space-y-2 sm:space-y-3">
        <!-- 📱 Main features - адаптивная карточка + SEO ОПТИМИЗАЦИЯ -->
        <!-- 🎯 SEO: Секция механик с Schema.org разметкой -->
        <section
          class="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-indigo-400/30 hover:border-indigo-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
            <Icon name="solar:gamepad-bold-duotone" class="w-5 h-5 text-indigo-300" aria-hidden="true" />
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
          class="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
            <Icon name="solar:gift-bold-duotone" class="w-5 h-5 text-emerald-300" aria-hidden="true" />
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
          class="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
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
            <Icon name="solar:stars-bold-duotone" class="w-5 h-5 text-yellow-300" aria-hidden="true" />
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
</template>

<script setup>
import { computed } from 'vue'
import CanvasRevealEffect from '~/components/ui/CanvasRevealEffect.vue'
import {
  getEffectColorsFor,
  getVolatilityText,
  getMaxWin,
  formatReleaseDate,
  getSlotThemesFromDB,
  getSlotBonuses
} from '@/utils/slotFormatters'

const props = defineProps({
  slot: {
    type: Object,
    required: true
  }
})
</script>
