<template>
  <div
    class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white font-sans"
  >
    <!-- Навигация -->
    <nav
      class="bg-[#161A21]/80 backdrop-blur-sm border-b border-[#353A4A] sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/admin/slots"
            class="inline-flex items-center text-[#9CA3AF] hover:text-[#FF6E48] transition-colors font-medium"
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
              />
            </svg>
            Назад к управлению слотами
          </NuxtLink>

          <!-- Заголовок -->
          <div class="flex items-center">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] rounded-xl flex items-center justify-center"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </div>
              <div>
                <h1 class="text-xl font-bold text-[#E5E7EB] font-display">
                  Редактирование Hero секции
                </h1>
                <p class="text-sm text-[#9CA3AF]">
                  {{ slot?.name || 'Новый слот' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Кнопки действий -->
          <div class="flex items-center gap-3">
            <button
              @click="resetForm"
              class="px-4 py-2 border border-[#353A4A] text-[#9CA3AF] bg-[#1B1E26] rounded-lg hover:bg-[#353A4A] hover:border-[#63F3AB]/40 hover:text-[#E5E7EB] font-medium transition-all duration-200"
            >
              Сброс
            </button>
            <button
              @click="saveSlot"
              :disabled="saving"
              class="px-6 py-2 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#CD5A3C] hover:to-[#FF6E48] disabled:from-[#353A4A] disabled:to-[#353A4A] text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100"
            >
              {{ saving ? 'Сохранение...' : 'Сохранить изменения' }}
            </button>
            <NuxtLink
              :to="`/slots/${slot?.slug || 'preview'}`"
              target="_blank"
              class="px-4 py-2 bg-gradient-to-r from-[#63F3AB] to-[#51C58B] hover:from-[#51C58B] hover:to-[#63F3AB] text-black rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Предпросмотр
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Основной контент -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Левая панель: Редактирование -->
        <div class="xl:col-span-2 space-y-8">
          <div
            class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#353A4A] relative overflow-hidden"
          >
            <!-- Декоративный фон -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-[#FF6E48]/5 via-transparent to-[#00EDFF]/5"
            ></div>
            <div
              class="absolute top-0 right-0 w-64 h-64 bg-[#FF6E48]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"
            ></div>

            <div class="relative z-10">
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-4">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-[#FF6E48] to-[#CD5A3C] rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 animate-pulse"
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
                    <span class="text-white text-xs font-bold">🏆</span>
                  </div>
                </div>
                <div>
                  <h2
                    class="text-4xl font-bold bg-gradient-to-r from-[#E5E7EB] via-[#FF6E48] to-[#00EDFF] bg-clip-text text-transparent font-display"
                  >
                    Hero Секция
                  </h2>
                  <div
                    class="h-1 w-28 bg-gradient-to-r from-[#FF6E48] to-[#00EDFF] rounded-full mt-2"
                  ></div>
                </div>
              </div>

              <form @submit.prevent="saveSlot" class="space-y-6">
                <!-- Основная информация -->
                <div
                  class="group bg-gradient-to-r from-[#FF6E48]/10 to-[#CD5A3C]/10 border border-[#FF6E48]/20 rounded-xl p-6 hover:border-[#FF6E48]/40 transition-all duration-300"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-[#FF6E48] to-[#CD5A3C] rounded-xl flex items-center justify-center"
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
                      <div>
                        <h3
                          class="text-xl font-bold text-[#E5E7EB] font-display"
                        >
                          Основная информация
                        </h3>
                        <p class="text-sm text-[#FF6E48]">
                          Базовые данные слота
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="showBasicSection = !showBasicSection"
                      class="text-xs px-4 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#FF6E48]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                      :aria-expanded="showBasicSection"
                    >
                      {{ showBasicSection ? 'Скрыть' : 'Показать' }}
                    </button>
                  </div>
                  <div v-show="showBasicSection" class="space-y-4">
                    <!-- Название слота -->
                    <div>
                      <label
                        class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                      >
                        <svg
                          class="w-4 h-4 text-[#FF6E48]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          ></path>
                        </svg>
                        Название слота *
                      </label>
                      <input
                        v-model="form.name"
                        type="text"
                        required
                        class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all duration-200"
                        placeholder="Например: Gates of Olympus"
                      />
                    </div>

                    <!-- Slug (URL) -->
                    <div>
                      <label
                        class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                      >
                        <svg
                          class="w-4 h-4 text-[#00EDFF]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          ></path>
                        </svg>
                        URL адрес (slug) *
                      </label>
                      <input
                        v-model="form.slug"
                        type="text"
                        required
                        class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#00EDFF] focus:border-[#00EDFF] transition-all duration-200"
                        placeholder="gates-of-olympus"
                      />
                      <p class="mt-1 text-xs text-[#9CA3AF]">
                        Будет доступен по адресу: /slots/{{
                          form.slug || 'your-slug'
                        }}
                      </p>
                    </div>

                    <!-- Провайдер -->
                    <div>
                      <label
                        class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                      >
                        <svg
                          class="w-4 h-4 text-[#CD0F8B]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          ></path>
                        </svg>
                        Провайдер *
                      </label>
                      <select
                        v-model="form.provider_id"
                        required
                        class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#CD0F8B] focus:border-[#CD0F8B] transition-all duration-200"
                      >
                        <option value="">Выберите провайдера</option>
                        <option
                          v-for="provider in providers"
                          :key="provider.id"
                          :value="provider.id"
                        >
                          {{ provider.name }}
                        </option>
                      </select>
                    </div>

                    <!-- Описание -->
                    <div>
                      <label
                        class="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Описание для Hero секции
                      </label>
                      <div class="text-xs text-gray-400 mb-2">
                        Максимум 200 символов
                      </div>
                      <textarea
                        v-model="form.description"
                        rows="4"
                        maxlength="200"
                        class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Краткое описание слота, которое будет отображаться в Hero секции"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Ссылки кнопок действий Hero секции -->
                <div
                  class="group bg-gradient-to-r from-[#00EDFF]/10 to-[#01BFCF]/10 border border-[#00EDFF]/20 rounded-xl p-6 hover:border-[#00EDFF]/40 transition-all duration-300"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-[#00EDFF] to-[#01BFCF] rounded-xl flex items-center justify-center"
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
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3
                          class="text-xl font-bold text-[#E5E7EB] font-display"
                        >
                          Ссылки кнопок действий
                        </h3>
                        <p class="text-sm text-[#00EDFF]">
                          Кнопки в Hero секции
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="showHeroLinksSection = !showHeroLinksSection"
                      class="text-xs px-4 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#00EDFF]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                      :aria-expanded="showHeroLinksSection"
                    >
                      {{ showHeroLinksSection ? 'Скрыть' : 'Показать' }}
                    </button>
                  </div>
                  <div v-show="showHeroLinksSection" class="space-y-4">
                    <div class="grid grid-cols-1 gap-4">
                      <!-- Ссылка для кнопки "Играть бесплатно" -->
                      <div>
                        <label
                          class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                        >
                          <svg
                            class="w-4 h-4 text-[#00EDFF]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-5.5 2a3 3 0 105 0m-5 0a3 3 0 105 0m7.744-1.245l-.001.001m-7.743-1.245l-.001.001"
                            ></path>
                          </svg>
                          Ссылка кнопки "Играть бесплатно" (демо-режим)
                        </label>
                        <input
                          v-model="form.demo_url"
                          type="url"
                          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#00EDFF] focus:border-[#00EDFF] transition-all duration-200"
                          placeholder="https://demo.provider.com/gates-of-olympus"
                        />
                        <p class="mt-1 text-xs text-[#9CA3AF]">
                          URL для запуска демо-версии игры. Если не указано,
                          будет показано предупреждение.
                        </p>
                      </div>

                      <!-- Ссылка для кнопки "Играть на деньги" -->
                      <div>
                        <label
                          class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                        >
                          <svg
                            class="w-4 h-4 text-[#00EDFF]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          Ссылка кнопки "Играть на деньги"
                        </label>
                        <input
                          v-model="form.real_play_url"
                          type="url"
                          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#00EDFF] focus:border-[#00EDFF] transition-all duration-200"
                          placeholder="https://casino.com/games/gates-of-olympus"
                        />
                        <p class="mt-1 text-xs text-[#9CA3AF]">
                          URL для игры на реальные деньги в казино. Если не
                          указано, будет показано предупреждение.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Характеристики игры -->
                <div
                  class="group bg-gradient-to-r from-[#63F3AB]/10 to-[#51C58B]/10 border border-[#63F3AB]/20 rounded-xl p-6 hover:border-[#63F3AB]/40 transition-all duration-300"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-[#63F3AB] to-[#51C58B] rounded-xl flex items-center justify-center"
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
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3
                          class="text-xl font-bold text-[#E5E7EB] font-display"
                        >
                          Характеристики игры
                        </h3>
                        <p class="text-sm text-[#63F3AB]">
                          Технические параметры
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="
                        showGameCharacteristicsSection =
                          !showGameCharacteristicsSection
                      "
                      class="text-xs px-4 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#63F3AB]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                      :aria-expanded="showGameCharacteristicsSection"
                    >
                      {{
                        showGameCharacteristicsSection ? 'Скрыть' : 'Показать'
                      }}
                    </button>
                  </div>
                  <div
                    v-show="showGameCharacteristicsSection"
                    class="space-y-4"
                  >
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <!-- RTP -->
                      <div>
                        <label
                          class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                        >
                          <svg
                            class="w-4 h-4 text-[#63F3AB]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                          </svg>
                          RTP (%)
                        </label>
                        <input
                          v-model.number="form.rtp"
                          type="number"
                          step="0.01"
                          min="50"
                          max="99"
                          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#63F3AB] focus:border-[#63F3AB] transition-all duration-200"
                          placeholder="96.50"
                        />
                      </div>

                      <!-- Волатильность -->
                      <div>
                        <label
                          class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                        >
                          <svg
                            class="w-4 h-4 text-[#63F3AB]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                            ></path>
                          </svg>
                          Волатильность
                        </label>
                        <select
                          v-model="form.volatility"
                          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#63F3AB] focus:border-[#63F3AB] transition-all duration-200"
                        >
                          <option value="low">Низкая</option>
                          <option value="medium">Средняя</option>
                          <option value="high">Высокая</option>
                        </select>
                      </div>

                      <!-- Минимальная ставка -->
                      <div>
                        <label
                          class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                        >
                          <svg
                            class="w-4 h-4 text-[#63F3AB]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            ></path>
                          </svg>
                          Минимальная ставка
                        </label>
                        <input
                          v-model="form.min_bet"
                          type="text"
                          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#63F3AB] focus:border-[#63F3AB] transition-all duration-200"
                          placeholder="€0.20"
                        />
                      </div>

                      <!-- Максимальная ставка -->
                      <div>
                        <label
                          class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                        >
                          <svg
                            class="w-4 h-4 text-[#63F3AB]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 10l7-7m0 0l7 7m-7-7v18"
                            ></path>
                          </svg>
                          Максимальная ставка
                        </label>
                        <input
                          v-model="form.max_bet"
                          type="text"
                          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#63F3AB] focus:border-[#63F3AB] transition-all duration-200"
                          placeholder="€100"
                        />
                      </div>

                      <!-- Максимальный выигрыш -->
                      <div>
                        <label
                          class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                        >
                          <svg
                            class="w-4 h-4 text-[#63F3AB]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          Максимальный выигрыш (x от ставки)
                        </label>
                        <input
                          v-model.number="form.max_win"
                          type="number"
                          min="1"
                          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#63F3AB] focus:border-[#63F3AB] transition-all duration-200"
                          placeholder="5000"
                        />
                      </div>

                      <!-- Дата выпуска -->
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Дата выпуска
                        </label>
                        <input
                          v-model="form.release_date"
                          type="date"
                          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Количество барабанов -->
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Количество барабанов
                        </label>
                        <input
                          v-model.number="form.reels"
                          type="number"
                          min="1"
                          step="1"
                          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="5"
                        />
                      </div>

                      <!-- Количество рядов -->
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Количество рядов
                        </label>
                        <input
                          v-model.number="form.rows"
                          type="number"
                          min="1"
                          step="1"
                          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="3"
                        />
                      </div>

                      <!-- Линии выплат -->
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Линии выплат
                        </label>
                        <div class="relative">
                          <select
                            v-model="paylineType"
                            class="absolute right-2 top-2 z-10 px-2 py-1 bg-gray-600 border border-gray-500 rounded text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="number">Число</option>
                            <option value="text">Текст</option>
                          </select>
                          <input
                            v-if="paylineType === 'number'"
                            v-model.number="form.paylines"
                            type="number"
                            min="1"
                            max="1024"
                            class="w-full px-4 py-3 pr-20 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="25"
                          />
                          <input
                            v-else
                            v-model="form.paylines"
                            type="text"
                            class="w-full px-4 py-3 pr-20 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Scatter Pays"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Рейтинг и популярность -->
                <div
                  class="group bg-gradient-to-r from-[#CD0F8B]/10 to-[#CD0F8B]/10 border border-[#CD0F8B]/20 rounded-xl p-6 hover:border-[#CD0F8B]/40 transition-all duration-300"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-[#CD0F8B] to-[#CD0F8B] rounded-xl flex items-center justify-center"
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
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3
                          class="text-xl font-bold text-[#E5E7EB] font-display"
                        >
                          Рейтинг и популярность
                        </h3>
                        <p class="text-sm text-[#CD0F8B]">Позиции и оценки</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="showRatingSection = !showRatingSection"
                      class="text-xs px-4 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#CD0F8B]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                      :aria-expanded="showRatingSection"
                    >
                      {{ showRatingSection ? 'Скрыть' : 'Показать' }}
                    </button>
                  </div>

                  <div v-show="showRatingSection" class="space-y-4">
                    <!-- Позиция в рейтинге -->
                    <div>
                      <label
                        class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                      >
                        <svg
                          class="w-4 h-4 text-[#CD0F8B]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                          ></path>
                        </svg>
                        Позиция в рейтинге
                      </label>
                      <input
                        v-model.number="form.popularity_rank"
                        type="number"
                        min="1"
                        class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#CD0F8B] focus:border-[#CD0F8B] transition-all duration-200"
                        placeholder="12"
                      />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <!-- Реальный RTP -->
                      <div>
                        <label
                          class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
                        >
                          <svg
                            class="w-4 h-4 text-[#CD0F8B]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            ></path>
                          </svg>
                          Реальный RTP (%)
                        </label>
                        <input
                          v-model.number="form.real_rtp"
                          type="number"
                          step="0.01"
                          min="50"
                          max="99"
                          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#CD0F8B] focus:border-[#CD0F8B] transition-all duration-200"
                          placeholder="97.45"
                        />
                      </div>

                      <!-- Частота бонуса -->
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Частота бонуса
                        </label>
                        <input
                          v-model="form.bonus_frequency"
                          type="text"
                          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="1:448"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Медиа контент -->
                <div class="space-y-4">
                  <h3
                    class="text-lg font-semibold text-pink-400 border-b border-gray-600 pb-2"
                  >
                    Медиа контент Hero секции
                  </h3>

                  <!-- Ремарка с размерами -->
                  <div
                    class="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4"
                  >
                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0">
                        <div
                          class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                        >
                          <svg
                            class="w-4 h-4 text-white"
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
                      </div>
                      <div>
                        <h4 class="text-sm font-semibold text-blue-300 mb-2">
                          📐 Рекомендуемые размеры медиа
                        </h4>
                        <div class="text-xs text-blue-200 space-y-1">
                          <div>
                            <strong>🖼️ Изображение:</strong> 1200x1600 пикселей
                            (соотношение 3:4)
                          </div>
                          <div>
                            <strong>🎬 Видео:</strong> 1200x1600 пикселей,
                            длительность до 30 секунд
                          </div>
                          <div>
                            <strong>📱 Мобильная версия:</strong> Автоматически
                            адаптируется под экран
                          </div>
                          <div>
                            <strong>💾 Размер файла:</strong> Изображения до
                            2MB, видео до 10MB
                          </div>
                        </div>
                        <div class="mt-2 text-xs text-blue-300">
                          💡 <strong>Совет:</strong> Используйте
                          высококачественные изображения для лучшего отображения
                          на ретина-дисплеях
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Тип медиа -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Тип медиа контента
                    </label>
                    <select
                      v-model="form.media_type"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    >
                      <option value="image">Изображение</option>
                      <option value="video">Видео</option>
                    </select>
                    <p class="mt-1 text-xs text-gray-400">
                      Выберите тип медиа контента для обложки слота
                    </p>
                  </div>

                  <!-- URL изображения (показывается если выбрано изображение) -->
                  <div v-if="form.media_type === 'image'">
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      URL изображения
                    </label>
                    <input
                      v-model="form.image_url"
                      type="url"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="https://example.com/slot-image.jpg"
                    />
                    <p class="mt-1 text-xs text-gray-400">
                      Добавьте ссылку на изображение слота. Рекомендуемый
                      размер: 1200x1600px (3:4)
                    </p>
                  </div>

                  <!-- URL видео (показывается если выбрано видео) -->
                  <div v-if="form.media_type === 'video'">
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      URL видео
                    </label>
                    <input
                      v-model="form.video_url"
                      type="url"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="https://example.com/slot-video.mp4"
                    />
                    <p class="mt-1 text-xs text-gray-400">
                      Добавьте ссылку на видео слота. Рекомендуемый размер:
                      1200x1600px, до 30 сек. Поддерживаются форматы: .mp4,
                      .webm, .ogg
                    </p>
                  </div>

                  <!-- Превью медиа -->
                  <div v-if="form.image_url || form.video_url" class="mt-4">
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Превью медиа
                    </label>
                    <div
                      class="bg-gray-700 rounded-lg p-4 border border-gray-600"
                    >
                      <!-- Превью изображения -->
                      <div v-if="form.media_type === 'image' && form.image_url">
                        <img
                          :src="form.image_url"
                          :alt="form.name || 'Слот'"
                          class="w-full max-w-sm h-48 object-cover rounded-lg mx-auto"
                          @error="handleImageError"
                          @load="handleImageLoad"
                        />
                      </div>
                      <!-- Превью видео -->
                      <div
                        v-else-if="
                          form.media_type === 'video' && form.video_url
                        "
                      >
                        <video
                          :src="form.video_url"
                          class="w-full max-w-sm h-48 object-cover rounded-lg mx-auto"
                          controls
                          muted
                          preload="metadata"
                          @error="handleVideoError"
                          @loadeddata="handleVideoLoad"
                        >
                          Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Игровые механики Hero секции -->
                <div
                  class="group bg-gradient-to-r from-[#FF6E48]/10 to-[#CD5A3C]/10 border border-[#FF6E48]/20 rounded-xl p-6 hover:border-[#FF6E48]/40 transition-all duration-300"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-[#FF6E48] to-[#CD5A3C] rounded-xl flex items-center justify-center"
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
                      <div>
                        <h3
                          class="text-xl font-bold text-[#E5E7EB] font-display"
                        >
                          Игровые механики
                        </h3>
                        <p class="text-sm text-[#FF6E48]">
                          Hero секция механик
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="showMechanicsSection = !showMechanicsSection"
                      class="text-xs px-4 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#FF6E48]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                      :aria-expanded="showMechanicsSection"
                    >
                      {{ showMechanicsSection ? 'Скрыть' : 'Показать' }}
                    </button>
                  </div>
                  <div v-show="showMechanicsSection" class="space-y-4">
                    <p class="text-sm text-gray-400">
                      Выберите игровые механики, которые будут отображаться в
                      Hero секции слота
                    </p>

                    <!-- Список доступных механик -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div
                        v-for="mechanic in availableMechanics"
                        :key="mechanic.id"
                        class="flex items-center p-3 bg-gray-700 rounded-lg border border-gray-600 hover:border-indigo-500 transition-colors"
                      >
                        <input
                          :id="`mechanic-${mechanic.id}`"
                          v-model="selectedMechanics"
                          :value="mechanic.id"
                          type="checkbox"
                          class="w-4 h-4 text-indigo-600 bg-gray-600 border-gray-500 rounded focus:ring-indigo-500 focus:ring-2"
                        />
                        <label
                          :for="`mechanic-${mechanic.id}`"
                          class="ml-3 flex-1 cursor-pointer"
                        >
                          <div class="flex items-center gap-2">
                            <span
                              v-if="mechanic.icon"
                              class="text-lg"
                              v-html="mechanic.icon"
                            ></span>
                            <div>
                              <div class="text-sm font-medium text-white">
                                {{ mechanic.name }}
                              </div>
                              <div
                                class="text-xs text-gray-400"
                                v-if="mechanic.description"
                              >
                                {{ mechanic.description }}
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <!-- Выбранные механики -->
                    <div
                      v-if="selectedMechanics && selectedMechanics.length > 0"
                      class="mt-4"
                    >
                      <h4 class="text-sm font-medium text-gray-300 mb-2">
                        Выбранные механики:
                      </h4>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="mechanicId in selectedMechanics"
                          :key="mechanicId"
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                        >
                          {{ getMechanicName(mechanicId) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Бонусы Hero секции -->
                <div
                  class="group bg-gradient-to-r from-[#63F3AB]/10 to-[#51C58B]/10 border border-[#63F3AB]/20 rounded-xl p-6 hover:border-[#63F3AB]/40 transition-all duration-300"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-[#63F3AB] to-[#51C58B] rounded-xl flex items-center justify-center"
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
                            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3
                          class="text-xl font-bold text-[#E5E7EB] font-display flex items-center gap-2"
                        >
                          Бонусы Hero секции
                          <span
                            class="text-xs bg-[#63F3AB]/20 text-[#63F3AB] px-3 py-1 rounded-full border border-[#63F3AB]/30"
                          >
                            {{ selectedBonuses.length }} выбрано
                          </span>
                        </h3>
                        <p class="text-sm text-[#63F3AB]">
                          Управление бонусными предложениями
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="showBonusesSection = !showBonusesSection"
                      class="text-xs px-4 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#63F3AB]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                      :aria-expanded="showBonusesSection"
                    >
                      {{ showBonusesSection ? 'Скрыть' : 'Показать' }}
                    </button>
                  </div>
                  <div v-show="showBonusesSection" class="space-y-4">
                    <div
                      class="bg-[#63F3AB]/10 border border-[#63F3AB]/20 rounded-lg p-4"
                    >
                      <p class="text-sm text-[#63F3AB] flex items-center gap-2">
                        <svg
                          class="w-4 h-4 text-[#63F3AB]"
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
                        Выберите бонусы, которые будут отображаться в Hero
                        секции слота на клиентской странице
                      </p>
                    </div>

                    <!-- Поиск бонусов -->
                    <div class="relative">
                      <input
                        v-model="bonusSearchQuery"
                        type="text"
                        placeholder="Поиск бонусов..."
                        class="w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg px-4 py-2 pl-10 text-[#E5E7EB] placeholder-[#9CA3AF] focus:border-[#63F3AB] focus:ring-1 focus:ring-[#63F3AB] transition-all duration-200"
                      />
                      <svg
                        class="w-4 h-4 text-gray-400 absolute left-3 top-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>

                    <!-- Быстрые фильтры -->
                    <div class="flex flex-wrap gap-2">
                      <button
                        @click="selectAllBonuses"
                        type="button"
                        class="text-xs px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
                      >
                        Выбрать все
                      </button>
                      <button
                        @click="clearAllBonuses"
                        type="button"
                        class="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                      >
                        Очистить все
                      </button>
                      <button
                        @click="selectPopularBonuses"
                        type="button"
                        class="text-xs px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                      >
                        Только популярные
                      </button>
                    </div>

                    <!-- Список доступных бонусов -->
                    <div
                      class="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-60 overflow-y-auto"
                    >
                      <div
                        v-for="bonus in filteredBonuses"
                        :key="bonus.id"
                        class="flex items-center p-3 bg-gray-700 rounded-lg border border-gray-600 hover:border-amber-500 transition-all duration-200"
                        :class="
                          selectedBonuses.includes(bonus.id)
                            ? 'border-amber-500 bg-amber-500/10'
                            : ''
                        "
                      >
                        <input
                          :id="`bonus-${bonus.id}`"
                          v-model="selectedBonuses"
                          :value="bonus.id"
                          type="checkbox"
                          class="w-4 h-4 text-amber-600 bg-gray-600 border-gray-500 rounded focus:ring-amber-500 focus:ring-2"
                        />
                        <label
                          :for="`bonus-${bonus.id}`"
                          class="ml-3 flex-1 cursor-pointer"
                        >
                          <div class="flex items-center gap-2">
                            <span
                              v-if="bonus.icon"
                              class="text-lg"
                              v-html="bonus.icon"
                            ></span>
                            <div>
                              <div class="text-sm font-medium text-white">
                                {{ bonus.name }}
                              </div>
                              <div
                                class="text-xs text-gray-400"
                                v-if="bonus.description"
                              >
                                {{ bonus.description }}
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <!-- Выбранные бонусы -->
                    <div
                      v-if="selectedBonuses && selectedBonuses.length > 0"
                      class="mt-4"
                    >
                      <h4 class="text-sm font-medium text-gray-300 mb-2">
                        Выбранные бонусы:
                      </h4>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="bonusId in selectedBonuses"
                          :key="bonusId"
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-600/20 text-amber-300 border border-amber-500/30"
                        >
                          {{ getBonusName(bonusId) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Тематики Hero секции -->
                <div
                  class="group bg-gradient-to-r from-[#00EDFF]/10 to-[#01BFCF]/10 border border-[#00EDFF]/20 rounded-xl p-6 hover:border-[#00EDFF]/40 transition-all duration-300"
                >
                  <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-12 h-12 bg-gradient-to-br from-[#00EDFF] to-[#01BFCF] rounded-xl flex items-center justify-center"
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
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M11 7l-6.3 6.3"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3
                          class="text-xl font-bold text-[#E5E7EB] font-display flex items-center gap-2"
                        >
                          Тематики Hero секции
                          <span
                            class="text-xs bg-[#00EDFF]/20 text-[#00EDFF] px-3 py-1 rounded-full border border-[#00EDFF]/30"
                          >
                            {{ selectedThemes.length }} выбрано
                          </span>
                        </h3>
                        <p class="text-sm text-[#00EDFF]">
                          Управление тематическими категориями
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      @click="showThemesSection = !showThemesSection"
                      class="text-xs px-4 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#00EDFF]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                      :aria-expanded="showThemesSection"
                    >
                      {{ showThemesSection ? 'Скрыть' : 'Показать' }}
                    </button>
                  </div>
                  <div v-show="showThemesSection" class="space-y-4">
                    <div
                      class="bg-[#00EDFF]/10 border border-[#00EDFF]/20 rounded-lg p-4"
                    >
                      <p class="text-sm text-[#00EDFF] flex items-center gap-2">
                        <svg
                          class="w-4 h-4 text-[#00EDFF]"
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
                        Выберите тематики, которые будут отображаться в Hero
                        секции слота на клиентской странице
                      </p>
                    </div>

                    <!-- Поиск тематик -->
                    <div class="relative">
                      <input
                        v-model="themeSearchQuery"
                        type="text"
                        placeholder="Поиск тематик..."
                        class="w-full bg-[#1B1E26] border border-[#353A4A] rounded-lg px-4 py-2 pl-10 text-[#E5E7EB] placeholder-[#9CA3AF] focus:border-[#00EDFF] focus:ring-1 focus:ring-[#00EDFF] transition-all duration-200"
                      />
                      <svg
                        class="w-4 h-4 text-gray-400 absolute left-3 top-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>

                    <!-- Быстрые фильтры -->
                    <div class="flex flex-wrap gap-2">
                      <button
                        @click="clearAllThemes"
                        type="button"
                        class="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                      >
                        Очистить выбор
                      </button>
                      <span
                        class="text-xs text-emerald-300 px-3 py-1 bg-emerald-500/20 rounded-md border border-emerald-500/30"
                      >
                        ℹ️ Можно выбрать только одну тематику
                      </span>
                    </div>

                    <!-- Список доступных тематик -->
                    <div
                      class="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-60 overflow-y-auto"
                    >
                      <div
                        v-for="theme in filteredThemes"
                        :key="theme.id"
                        class="flex items-center p-3 bg-gray-700 rounded-lg border border-gray-600 hover:border-emerald-500 transition-all duration-200"
                        :class="
                          selectedThemes[0] === theme.id
                            ? 'border-emerald-500 bg-emerald-500/10'
                            : ''
                        "
                      >
                        <input
                          :id="`theme-${theme.id}`"
                          v-model="selectedThemes[0]"
                          :value="theme.id"
                          type="radio"
                          name="theme"
                          class="w-4 h-4 text-emerald-600 bg-gray-600 border-gray-500 focus:ring-emerald-500 focus:ring-2"
                        />
                        <label
                          :for="`theme-${theme.id}`"
                          class="ml-3 flex-1 cursor-pointer"
                        >
                          <div class="flex items-center gap-2">
                            <span
                              v-if="theme.icon"
                              class="text-lg"
                              v-html="theme.icon"
                            ></span>
                            <div>
                              <div class="text-sm font-medium text-white">
                                {{ theme.name }}
                              </div>
                              <div
                                class="text-xs text-gray-400"
                                v-if="theme.description"
                              >
                                {{ theme.description }}
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <!-- Выбранная тематика -->
                    <div
                      v-if="
                        selectedThemes &&
                        selectedThemes.length > 0 &&
                        selectedThemes[0]
                      "
                      class="mt-4"
                    >
                      <h4 class="text-sm font-medium text-gray-300 mb-2">
                        Выбранная тематика:
                      </h4>
                      <div class="flex flex-wrap gap-2">
                        <span
                          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-600/20 text-emerald-300 border border-emerald-500/30"
                        >
                          {{ getThemeName(selectedThemes[0]) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Кнопки сохранения -->
                <div
                  class="flex justify-end gap-4 pt-6 border-t border-gray-600"
                >
                  <button
                    type="button"
                    @click="resetForm"
                    class="px-6 py-3 border border-gray-600 text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 hover:border-gray-500 font-medium transition-all duration-200"
                  >
                    Сброс формы
                  </button>
                  <button
                    type="submit"
                    :disabled="saving"
                    class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg font-semibold transition-all duration-200"
                  >
                    {{ saving ? 'Сохранение...' : 'Сохранить изменения' }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Правая панель: Превью -->
          <div v-if="false" class="xl:sticky xl:top-24 xl:h-fit">
            <div
              class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
            >
              <h2
                class="text-xl font-bold text-white mb-4 flex items-center gap-3"
              >
                <svg
                  class="w-6 h-6 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Превью Hero секции
              </h2>

              <!-- Новое превью Hero секции (макет, приближенный к клиентскому) -->
              <div
                class="relative rounded-xl p-4 bg-zinc-950 text-slate-100 border border-white/10 overflow-hidden"
              >
                <!-- Декоративные подсветки -->
                <div class="absolute inset-0 opacity-20 pointer-events-none">
                  <div
                    class="absolute top-2 left-2 w-20 h-20 bg-purple-500/30 rounded-full blur-xl"
                  ></div>
                  <div
                    class="absolute bottom-2 right-2 w-16 h-16 bg-blue-500/30 rounded-full blur-lg"
                  ></div>
                </div>

                <div class="relative z-10">
                  <div class="hidden lg:flex gap-6 items-start">
                    <!-- Медиа (портрет 3:4) -->
                    <div class="w-2/5">
                      <CometCard
                        :rotate-depth="17.5"
                        :translate-depth="20"
                        containerClassName="w-full h-full rounded-2xl"
                        className="relative aspect-[3/4] rounded-2xl overflow-hidden backdrop-blur-md border border-white/20 shadow-2xl"
                      >
                        <div class="absolute inset-0">
                          <div
                            v-if="form.media_type === 'image' && form.image_url"
                            class="absolute inset-0"
                          >
                            <img
                              :src="form.image_url"
                              :alt="form.name || 'Слот'"
                              class="w-full h-full object-cover"
                              @error="handlePreviewImageError"
                            />
                          </div>
                          <div
                            v-else-if="
                              form.media_type === 'video' && form.video_url
                            "
                            class="absolute inset-0"
                          >
                            <video
                              :src="form.video_url"
                              class="w-full h-full object-cover"
                              autoplay
                              loop
                              muted
                              preload="metadata"
                              @error="handlePreviewVideoError"
                            >
                              <source :src="form.video_url" type="video/mp4" />
                              <source
                                :src="
                                  form.video_url &&
                                  form.video_url.replace('.mp4', '.webm')
                                "
                                type="video/webm"
                              />
                            </video>
                          </div>
                          <div
                            v-if="!form.image_url && !form.video_url"
                            class="flex items-center justify-center h-full text-white/70 bg-black/30"
                          >
                            Изображение слота
                          </div>
                        </div>
                      </CometCard>
                    </div>

                    <!-- Правая колонка: провайдер, название, описание, CTA -->
                    <div class="flex-1 min-w-0">
                      <div class="mb-3">
                        <span
                          class="inline-block bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold border border-purple-400/30"
                          >{{ currentProviderName }}</span
                        >
                      </div>

                      <h1
                        class="text-xl lg:text-3xl font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent mb-3 leading-tight"
                      >
                        {{ form.name || 'Название слота' }}
                      </h1>

                      <p
                        class="text-white/80 text-sm lg:text-base mb-4 line-clamp-3"
                      >
                        {{
                          form.description ||
                          'Описание слота будет отображаться здесь...'
                        }}
                      </p>

                      <!-- Кнопки действий -->
                      <div class="flex flex-col gap-3 w-full max-w-md">
                        <BackgroundGradient
                          :animate="true"
                          className="rounded-2xl"
                          containerClassName="w-full"
                        >
                          <a
                            v-if="form.demo_url && form.demo_url.trim()"
                            :href="form.demo_url"
                            target="_blank"
                            rel="nofollow noopener"
                            class="group relative w-full bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-sm border border-emerald-400/30 text-white text-sm font-black py-3 px-5 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-emerald-500/60 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden"
                          >
                            <span class="relative z-10">Играть бесплатно</span>
                            <span
                              class="relative z-10 bg-emerald-500/30 text-[10px] px-2 py-1 rounded-full font-bold border border-emerald-400/50"
                              >DEMO</span
                            >
                          </a>
                          <button
                            v-else
                            type="button"
                            class="group relative w-full bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-sm border border-emerald-400/30 text-white text-sm font-black py-3 px-5 rounded-2xl"
                          >
                            Играть бесплатно
                          </button>
                        </BackgroundGradient>

                        <BackgroundGradient
                          :animate="true"
                          className="rounded-2xl"
                          containerClassName="w-full"
                        >
                          <a
                            v-if="
                              form.real_play_url && form.real_play_url.trim()
                            "
                            :href="form.real_play_url"
                            target="_blank"
                            rel="nofollow sponsored noopener"
                            class="group relative w-full bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm border border-orange-400/30 text-white text-sm font-black py-3 px-5 rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-orange-500/60 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center gap-3 overflow-hidden"
                          >
                            <span class="relative z-10">Играть на деньги</span>
                            <span
                              class="relative z-10 bg-orange-500/30 text-[10px] px-2 py-1 rounded-full font-bold border border-orange-400/50"
                              >REAL</span
                            >
                          </a>
                          <button
                            v-else
                            type="button"
                            class="group relative w-full bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm border border-orange-400/30 text-white text-sm font-black py-3 px-5 rounded-2xl"
                          >
                            Играть на деньги
                          </button>
                        </BackgroundGradient>
                      </div>

                      <!-- Рейтинг и мини-характеристики -->
                      <div class="mt-4">
                        <div class="flex items-center gap-2 mb-3">
                          <div class="flex text-yellow-400 text-sm">
                            <span v-for="n in 5" :key="n" class="text-base">{{
                              (form.rating || 0) >= n ? '★' : '☆'
                            }}</span>
                          </div>
                          <span class="text-white font-bold text-sm">{{
                            form.rating || '0'
                          }}</span>
                          <span class="text-white/60 text-sm">/ 5</span>
                        </div>
                        <div class="grid grid-cols-2 gap-2 text-xs">
                          <div
                            class="bg-emerald-500/20 p-2 rounded border border-emerald-400/30"
                          >
                            <div class="text-emerald-300 font-bold">RTP</div>
                            <div class="text-white">
                              {{ form.rtp || '96.50' }}%
                            </div>
                          </div>
                          <div
                            class="bg-orange-500/20 p-2 rounded border border-orange-400/30"
                          >
                            <div class="text-orange-300 font-bold">
                              Волатильность
                            </div>
                            <div class="text-white capitalize">
                              {{ currentVolatilityText }}
                            </div>
                          </div>
                          <div
                            class="bg-purple-500/20 p-2 rounded border border-purple-400/30"
                          >
                            <div class="text-purple-300 font-bold">
                              Макс. выигрыш
                            </div>
                            <div class="text-white">
                              {{ form.max_win || '5000' }}x
                            </div>
                          </div>
                          <div
                            class="bg-blue-500/20 p-2 rounded border border-blue-400/30"
                          >
                            <div class="text-blue-300 font-bold">
                              Мин. ставка
                            </div>
                            <div class="text-white">
                              {{ form.min_bet || '€0.20' }}
                            </div>
                          </div>
                        </div>

                        <div
                          class="mt-3 bg-yellow-500/20 p-2 rounded border border-yellow-400/30"
                        >
                          <div class="flex justify-between items-center mb-1">
                            <span class="text-white font-semibold text-xs"
                              >Рейтинг</span
                            >
                            <span
                              class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-2 py-0.5 rounded-full text-xs"
                              >#{{ form.popularity_rank || '12' }} из
                              2000+</span
                            >
                          </div>
                          <div
                            class="w-full bg-white/20 rounded-full h-2 overflow-hidden"
                          >
                            <div
                              class="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                              :style="`width: ${form.popularity_percentage || 94}%`"
                            ></div>
                          </div>
                        </div>
                      </div>

                      <!-- Награды -->
                    </div>
                  </div>

                  <!-- Мобильное превью медиа (если нет большого экрана) -->
                  <div
                    class="lg:hidden mt-2 aspect-video bg-black/30 rounded-xl overflow-hidden border border-white/10"
                  >
                    <img
                      v-if="form.media_type === 'image' && form.image_url"
                      :src="form.image_url"
                      :alt="form.name || 'Слот'"
                      class="w-full h-full object-cover"
                      @error="handlePreviewImageError"
                    />
                    <video
                      v-else-if="form.media_type === 'video' && form.video_url"
                      :src="form.video_url"
                      class="w-full h-full object-cover"
                      autoplay
                      loop
                      muted
                      preload="metadata"
                      @error="handlePreviewVideoError"
                    ></video>
                    <div
                      v-else
                      class="w-full h-full flex items-center justify-center text-white/60"
                    >
                      Превью недоступно
                    </div>
                  </div>
                </div>
              </div>

              <!-- Информация о превью -->
              <div
                class="mt-4 p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg"
              >
                <p class="text-blue-300 text-sm">
                  💡 Это миниатюрное превью Hero секции. Полный вид можно
                  посмотреть по кнопке "Предпросмотр" выше.
                </p>
              </div>
            </div>

            <!-- Правая панель: Предпросмотр Hero секции -->
            <div class="xl:col-span-1">
              <div class="sticky top-24">
                <HeroPreview
                  :slot-data="form"
                  :selected-bonuses="selectedBonuses"
                  :selected-themes="selectedThemes"
                  :available-bonuses="availableBonuses"
                  :available-themes="availableThemes"
                  :providers="providers"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import HeroPreview from '~/components/admin/HeroPreview.vue'

// Получаем ID слота из роута
const route = useRoute()
const router = useRouter()
const slotId = route.params.id

// Состояние
const slot = ref(null)
const providers = ref([])
const saving = ref(false)
const loading = ref(true)
const showBasicSection = ref(true)
const showHeroLinksSection = ref(true)
const showGameCharacteristicsSection = ref(true)
const showRatingSection = ref(true)
const showMechanicsSection = ref(false)
const showBonusesSection = ref(false)
const showThemesSection = ref(false)
const paylineType = ref('text') // 'number' или 'text'

// Поиск и фильтры для бонусов и тематик
const bonusSearchQuery = ref('')
const themeSearchQuery = ref('')

// Данные для механик, бонусов и тематик
const availableMechanics = ref([])
const availableBonuses = ref([])
const availableThemes = ref([])

// Форма редактирования
const form = ref({
  name: '',
  slug: '',
  description: '',
  provider_id: null,
  rtp: 96.5,
  volatility: 'medium',
  min_bet: '€0.20',
  max_bet: '€100',
  max_win: 5000,
  release_date: '',
  reels: 5,
  rows: 3,
  popularity_rank: 12,
  real_rtp: 97.45, // Реальный RTP
  bonus_frequency: '1:448', // Частота бонуса
  game_field: '6×5',
  paylines: 'Scatter Pays',
  // Медиа поля
  media_type: 'image', // 'image' или 'video'
  image_url: '',
  video_url: '',
  // Ссылки кнопок
  demo_url: '', // Ссылка для кнопки "Играть бесплатно"
  real_play_url: '', // Ссылка для кнопки "Играть на деньги"
})

// Отдельные реактивные переменные для выбранных элементов (чтобы избежать проблем с сериализацией)
const selectedMechanics = ref([])
const selectedBonuses = ref([])
const selectedThemes = ref([])

// Заголовок страницы
useHead({
  title: 'Редактирование Hero секции слота - SlotQuest Admin',
})

// Загрузка данных при монтировании
onMounted(async () => {
  await Promise.all([
    loadProviders(),
    loadMechanics(),
    loadBonuses(),
    loadThemes(),
    slotId !== 'new' ? loadSlot() : null,
  ])
  loading.value = false
})

// Загрузка списка провайдеров
const loadProviders = async () => {
  try {
    const response = await $fetch('http://localhost:3001/api/providers')
    const data = response.data || response
    providers.value = JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error('Ошибка загрузки провайдеров:', error)
  }
}

// Загрузка списка механик
const loadMechanics = async () => {
  try {
    const response = await $fetch('http://localhost:3001/api/mechanics')
    const data = response.data || response
    availableMechanics.value = JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error('Ошибка загрузки механик:', error)
  }
}

// Загрузка списка бонусов
const loadBonuses = async () => {
  try {
    const response = await $fetch('http://localhost:3001/api/bonuses')
    const data = response.data || response
    availableBonuses.value = JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error('Ошибка загрузки бонусов:', error)
  }
}

// Загрузка списка тематик
const loadThemes = async () => {
  try {
    const response = await $fetch('http://localhost:3001/api/themes')
    const data = response.data || response
    availableThemes.value = JSON.parse(JSON.stringify(data))
  } catch (error) {
    console.error('Ошибка загрузки тематик:', error)
  }
}

// Загрузка данных слота
const loadSlot = async () => {
  if (slotId === 'new') return

  try {
    const response = await $fetch(
      `http://localhost:3001/api/slots/admin/${slotId}`,
    )
    const data = response.data || response
    slot.value = JSON.parse(JSON.stringify(data))

    // Заполняем форму данными слота
    Object.keys(form.value).forEach((key) => {
      if (slot.value[key] !== undefined) {
        form.value[key] = slot.value[key]
      }
    })

    // Заполняем отдельные массивы для механик, бонусов и тематик
    if (slot.value.slot_mechanics && Array.isArray(slot.value.slot_mechanics)) {
      selectedMechanics.value = slot.value.slot_mechanics.map(
        (sm) => sm.mechanic_id,
      )
    }
    if (slot.value.slot_bonuses && Array.isArray(slot.value.slot_bonuses)) {
      selectedBonuses.value = slot.value.slot_bonuses.map((sb) => sb.bonus_id)
    }
    if (slot.value.themes) {
      selectedThemes.value = [slot.value.themes.id]
    }

    // Если reels и rows не заданы, но есть game_field, пытаемся извлечь их
    if (slot.value.game_field && (!slot.value.reels || !slot.value.rows)) {
      const match = slot.value.game_field.match(/(\d+)×(\d+)/)
      if (match) {
        if (!slot.value.reels) form.value.reels = parseInt(match[1])
        if (!slot.value.rows) form.value.rows = parseInt(match[2])
      }
    }

    // Определяем тип paylines (число или текст)
    if (slot.value.paylines !== undefined) {
      const paylineValue = slot.value.paylines
      if (
        typeof paylineValue === 'number' ||
        (typeof paylineValue === 'string' && /^\d+$/.test(paylineValue))
      ) {
        paylineType.value = 'number'
      } else {
        paylineType.value = 'text'
      }
    }
  } catch (error) {
    console.error('Ошибка загрузки слота:', error)
    await router.push('/admin/slots')
  }
}

// Автогенерация slug из названия
watch(
  () => form.value.name,
  (newName) => {
    if (newName && (!form.value.slug || slotId === 'new')) {
      form.value.slug = newName
        .toLowerCase()
        .replace(/[^a-z0-9а-я\s]/gi, '')
        .replace(/\s+/g, '-')
        .trim()
    }
  },
)

// Computed свойства для получения названий (избегаем проблем с сериализацией функций)
const currentProviderName = computed(() => {
  const provider = providers.value.find((p) => p.id === form.value.provider_id)
  return provider?.name || 'Провайдер'
})

const currentVolatilityText = computed(() => {
  const map = {
    low: 'Низкая',
    medium: 'Средняя',
    high: 'Высокая',
  }
  return map[form.value.volatility] || 'Средняя'
})

// Функции для получения названий по ID (используются только в шаблоне)
const getMechanicName = (mechanicId) => {
  const mechanic = availableMechanics.value.find((m) => m.id === mechanicId)
  return mechanic?.name || 'Неизвестная механика'
}

const getBonusName = (bonusId) => {
  const bonus = availableBonuses.value.find((b) => b.id === bonusId)
  return bonus?.name || 'Неизвестный бонус'
}

const getThemeName = (themeId) => {
  const theme = availableThemes.value.find((t) => t.id === themeId)
  return theme?.name || 'Неизвестная тематика'
}

// Computed свойства для фильтрации бонусов и тематик
const filteredBonuses = computed(() => {
  let filtered = availableBonuses.value

  if (bonusSearchQuery.value) {
    const query = bonusSearchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (bonus) =>
        bonus.name?.toLowerCase().includes(query) ||
        bonus.description?.toLowerCase().includes(query) ||
        bonus.type?.toLowerCase().includes(query),
    )
  }

  return filtered
})

const filteredThemes = computed(() => {
  let filtered = availableThemes.value

  if (themeSearchQuery.value) {
    const query = themeSearchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (theme) =>
        theme.name?.toLowerCase().includes(query) ||
        theme.description?.toLowerCase().includes(query),
    )
  }

  return filtered
})

// Функции для управления бонусами
const selectAllBonuses = () => {
  selectedBonuses.value = filteredBonuses.value.map((bonus) => bonus.id)
}

const clearAllBonuses = () => {
  selectedBonuses.value = []
}

const selectPopularBonuses = () => {
  selectedBonuses.value = filteredBonuses.value
    .filter((bonus) => bonus.is_popular)
    .map((bonus) => bonus.id)
}

// Функции для управления тематиками (только одна тематика)
const clearAllThemes = () => {
  selectedThemes.value = []
}

// Сохранение изменений
const saveSlot = async () => {
  if (saving.value) return

  try {
    saving.value = true

    const url =
      slotId === 'new'
        ? 'http://localhost:3001/api/slots'
        : `http://localhost:3001/api/slots/${slotId}`

    const method = slotId === 'new' ? 'POST' : 'PUT'

    // Подготавливаем данные для отправки
    const dataToSend = {
      ...form.value,
      // Добавляем данные из отдельных переменных
      selected_mechanics: selectedMechanics.value,
      selected_bonuses: selectedBonuses.value,
      selected_themes: selectedThemes.value,
      // Автоматически формируем game_field из reels и rows
      game_field:
        form.value.reels && form.value.rows
          ? `${form.value.reels}×${form.value.rows}`
          : form.value.game_field,
    }

    const response = await $fetch(url, {
      method,
      body: dataToSend,
    })

    // Показываем уведомление об успешном сохранении
    alert('Слот успешно сохранен!')

    if (slotId === 'new' && response.data?.id) {
      // После создания нового слота переходим на его страницу редактирования по корректному маршруту
      await router.push(`/admin/slots/${response.data.id}`)
    }
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    alert(`Ошибка сохранения: ${error.message || error}`)
  } finally {
    saving.value = false
  }
}

// Обработчики медиа событий
const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const handleImageLoad = (event) => {
  event.target.style.display = 'block'
}

const handleVideoError = (event) => {
  event.target.style.display = 'none'
}

const handleVideoLoad = (event) => {
  event.target.style.display = 'block'
}

const handlePreviewImageError = (event) => {
  event.target.parentElement.innerHTML =
    '<div class="flex items-center justify-center h-full text-white/60 text-xs">Ошибка загрузки изображения</div>'
}

const handlePreviewVideoError = (event) => {
  event.target.parentElement.innerHTML =
    '<div class="flex items-center justify-center h-full text-white/60 text-xs">Ошибка загрузки видео</div>'
}

// Сброс формы к исходному состоянию
const resetForm = () => {
  if (slot.value) {
    // Восстанавливаем из исходных данных слота
    Object.keys(form.value).forEach((key) => {
      if (slot.value[key] !== undefined) {
        form.value[key] = slot.value[key]
      }
    })
  } else {
    // Сброс к значениям по умолчанию для нового слота
    Object.assign(form.value, {
      name: '',
      slug: '',
      description: '',
      provider_id: null,
      rtp: 96.5,
      volatility: 'medium',
      min_bet: '€0.20',
      max_bet: '€100',
      max_win: 5000,
      release_date: '',
      reels: 5,
      popularity_rank: 12,
      game_field: '6×5',
      paylines: 'Scatter Pays',
      // Медиа поля
      media_type: 'image',
      image_url: '',
      video_url: '',
      // Ссылки кнопок
      demo_url: '',
      real_play_url: '',
    })
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
