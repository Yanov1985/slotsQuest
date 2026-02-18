<template>
  <div
    class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white font-sans relative overflow-hidden"
  >
    <!-- Background Beams эффект для админ панели (увеличенная интенсивность) -->
    <BackgroundBeams :intensity="0.9" :speed="1.2" />

    <!-- Основной контент поверх Background Beams -->
    <div class="relative z-10">
      <!-- Навигация -->
      <nav
        class="bg-[#161A21]/80 backdrop-blur-sm border-b border-[#353A4A] sticky top-0 z-50"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between">
            <!-- Навигация назад -->
            <NuxtLink
              to="/admin/slots"
              class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] text-[#9CA3AF] hover:text-[#FF6E48] hover:border-[#FF6E48]/40 hover:bg-[#353A4A] transition-all duration-200"
              title="Назад к управлению слотами"
            >
              <svg
                class="w-5 h-5"
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
            </NuxtLink>

            <!-- Title слота -->
            <div class="flex items-center">
              <div class="text-center">
                <h1 class="text-xl font-semibold text-[#E5E7EB] font-display">
                  {{ form.name || 'Новый слот' }}
                </h1>
                <p class="text-sm text-[#9CA3AF]">Редактирование слота</p>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="flex items-center gap-3">
              <!-- Управление секциями -->
              <div class="flex items-center gap-2">
                <button
                  @click="closeAllSections"
                  class="px-3 py-2 text-xs border border-[#353A4A] text-[#9CA3AF] bg-[#1B1E26] rounded-lg hover:bg-[#353A4A] hover:border-[#EF4444]/40 hover:text-[#E5E7EB] font-medium transition-all duration-200"
                  title="Закрыть все секции"
                >
                  <svg
                    class="w-4 h-4 mr-1 inline-block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Закрыть все
                </button>
                <button
                  @click="openAllSections"
                  class="px-3 py-2 text-xs border border-[#353A4A] text-[#9CA3AF] bg-[#1B1E26] rounded-lg hover:bg-[#353A4A] hover:border-[#10B981]/40 hover:text-[#E5E7EB] font-medium transition-all duration-200"
                  title="Открыть все секции"
                >
                  <svg
                    class="w-4 h-4 mr-1 inline-block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Открыть все
                </button>
              </div>

              <!-- Поисковая строка в навигации -->
              <div class="flex items-center gap-2">
                <div class="relative">
                  <input
                    ref="navSearchInput"
                    v-model="searchQuery"
                    @input="handleSearch"
                    @keydown="handleSearchKeydown"
                    placeholder="Поиск по секциям... (Ctrl+F)"
                    class="w-48 sm:w-56 lg:w-64 px-3 py-2 pl-9 pr-20 text-xs bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all duration-200"
                  />
                  <svg
                    class="w-4 h-4 absolute left-3 top-2.5 text-[#9CA3AF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <!-- Счетчик результатов -->
                  <div
                    v-if="searchQuery && searchResults.length > 0"
                    class="absolute right-8 top-1.5 text-xs text-[#9CA3AF] bg-[#353A4A] px-2 py-1 rounded"
                  >
                    {{ currentSearchIndex + 1 }}/{{ searchResults.length }}
                  </div>
                  <!-- Кнопка очистки -->
                  <button
                    v-if="searchQuery"
                    @click="clearSearch"
                    class="absolute right-2 top-2.5 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
                  >
                    <svg
                      class="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <!-- Результаты поиска (компактное отображение) -->
                <div
                  v-if="searchQuery && searchResults.length === 0"
                  class="text-xs text-[#EF4444] bg-[#EF4444]/10 px-2 py-1 rounded border border-[#EF4444]/20"
                >
                  Не найдено
                </div>
              </div>

              <button
                @click="resetForm"
                class="px-4 py-2 border border-[#353A4A] text-[#9CA3AF] bg-[#1B1E26] rounded-lg hover:bg-[#353A4A] hover:border-[#63F3AB]/40 hover:text-[#E5E7EB] font-medium transition-all duration-200"
                title="Сбросить все изменения"
              >
                <svg
                  class="w-4 h-4 mr-1 inline-block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Сброс
              </button>
              <button
                @click="saveSlot"
                :disabled="saving"
                class="px-6 py-2 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#CD5A3C] hover:to-[#FF6E48] disabled:from-[#353A4A] disabled:to-[#353A4A] text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100"
                title="Сохранить изменения (Ctrl+S)"
              >
                <svg
                  class="w-4 h-4 mr-1 inline-block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                {{ saving ? 'Сохранение...' : 'Сохранить' }}
              </button>
              <NuxtLink
                :to="`/slots/${form.slug || 'preview'}`"
                target="_blank"
                class="px-4 py-2 bg-gradient-to-r from-[#63F3AB] to-[#51C58B] hover:from-[#51C58B] hover:to-[#63F3AB] text-black rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                title="Открыть предпросмотр в новой вкладке"
              >
                <svg
                  class="w-4 h-4 mr-1 inline-block"
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
                Предпросмотр
              </NuxtLink>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Мобильная поисковая строка (показывается только на малых экранах) -->
        <div class="lg:hidden mb-6">
          <div
            class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-4 border border-[#353A4A]"
          >
            <h3
              class="text-sm font-semibold text-[#E5E7EB] mb-3 flex items-center gap-2"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Поиск по секциям
            </h3>

            <!-- Поисковая строка -->
            <div class="relative">
              <input
                ref="mobileSearchInput"
                v-model="searchQuery"
                @input="handleSearch"
                @keydown="handleSearchKeydown"
                placeholder="Поиск по секциям... (Ctrl+F)"
                class="w-full px-4 py-2 pl-10 pr-10 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all duration-200 text-sm"
              />
              <svg
                class="w-4 h-4 absolute left-3 top-3 text-[#9CA3AF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <!-- Счетчик результатов -->
              <div
                v-if="searchQuery && searchResults.length > 0"
                class="absolute right-3 top-2 text-xs text-[#9CA3AF] bg-[#353A4A] px-2 py-1 rounded"
              >
                {{ currentSearchIndex + 1 }}/{{ searchResults.length }}
              </div>
              <!-- Кнопка очистки -->
              <button
                v-if="searchQuery"
                @click="clearSearch"
                class="absolute right-3 top-3 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Результаты поиска -->
            <div
              v-if="searchQuery && searchResults.length === 0"
              class="mt-3 p-3 bg-[#353A4A]/30 rounded-lg border border-[#353A4A]"
            >
              <div class="flex items-center gap-2 text-sm text-[#9CA3AF]">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Ничего не найдено
              </div>
            </div>
          </div>
        </div>

        <!-- Основной контент -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Левая панель: Редактирование -->
          <form @submit.prevent="saveSlot" class="lg:col-span-2 space-y-8">
            <div
              id="hero"
              data-section="hero"
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
                    <div>
                      <h2
                        class="text-2xl font-semibold text-[#E5E7EB] font-display"
                      >
                        Hero Секция
                      </h2>
                      <div
                        class="h-1 w-28 bg-gradient-to-r from-[#FF6E48] to-[#00EDFF] rounded-full mt-2"
                      ></div>
                    </div>
                  </div>
                  <!-- Кнопка сворачивания/разворачивания Hero секции -->
                  <button
                    type="button"
                    @click="showHeroSection = !showHeroSection"
                    class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-purple-400/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200"
                    :aria-expanded="showHeroSection"
                  >
                    <svg
                      class="w-4 h-4 transform transition-transform duration-200"
                      :class="{ 'rotate-180': showHeroSection }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                <div class="space-y-8">
                  <!-- Все Hero секции (управляемые через v-show) -->
                  <div v-show="showHeroSection" class="space-y-8">
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
                              class="text-lg font-medium text-[#E5E7EB] font-display"
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
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#FF6E48]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showBasicSection"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{ 'rotate-180': showBasicSection }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          <span>{{ showBasicSection ? 'Hide' : 'Show' }}</span>
                        </button>
                      </div>
                      <div v-show="showBasicSection" class="space-y-4">
                        <!-- Name слота -->
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
                            Name слота *
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

                        <!-- Description -->
                        <div>
                          <label
                            class="block text-sm font-medium text-gray-300 mb-2"
                          >
                            Description для Hero секции
                          </label>
                          <div class="text-xs text-gray-400 mb-2">
                            Максимум 400 символов
                          </div>
                          <textarea
                            v-model="form.description"
                            rows="4"
                            maxlength="400"
                            class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            placeholder="Краткое описание слота, которое будет отображаться в Hero секции"
                          ></textarea>
                        </div>

                        <!-- Hero Keywords - Система из 3 ключевых слов -->
                        <div
                          class="space-y-4 p-4 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-lg border border-emerald-500/30"
                        >
                          <div class="flex items-center gap-2 mb-2">
                            <span class="text-emerald-400 text-lg">✨</span>
                            <h4 class="text-sm font-bold text-emerald-300">
                              Ключевые слова для Hero секции (3 переменные)
                            </h4>
                          </div>

                          <div
                            class="text-xs text-gray-300 bg-blue-900/30 p-3 rounded-lg border border-blue-500/30 space-y-1"
                          >
                            <div class="font-bold text-blue-300">
                              📝 Как использовать в описании:
                            </div>
                            <div class="text-gray-400">
                              В тексте описания используй плейсхолдеры:
                            </div>
                            <div
                              class="font-mono text-xs bg-gray-800/50 p-2 rounded mt-1"
                            >
                              <span class="text-emerald-400">[keyword_2]</span>
                              - заменится на значение из поля 2<br />
                              <span class="text-purple-400">[keyword_3]</span> -
                              заменится на значение из поля 3
                            </div>
                            <div class="text-yellow-300 mt-2">
                              💡 Пример: "We love
                              <span class="text-emerald-400">[keyword_2]</span>
                              and
                              <span class="text-purple-400">[keyword_3]</span>"
                            </div>
                          </div>

                          <!-- Keyword 1 - Заголовок -->
                          <div>
                            <label
                              class="block text-sm font-medium text-emerald-300 mb-2"
                            >
                              1️⃣ Ключевое слово - Заголовок Hero секции
                            </label>
                            <div class="text-xs text-gray-400 mb-2 space-y-1">
                              <div>
                                📌 Отображается как <strong>заголовок</strong> в
                                Hero секции (вместо названия слота)
                              </div>
                              <div class="text-blue-300">
                                Результат:
                                <span class="font-bold text-emerald-300"
                                  >"{{
                                    form.hero_keyword || 'Slot Review'
                                  }}"</span
                                >
                              </div>
                            </div>
                            <input
                              v-model="form.hero_keyword"
                              type="text"
                              maxlength="100"
                              class="w-full px-4 py-3 bg-gray-700 border border-emerald-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                              placeholder='Например: "Premium Casino Experience"'
                            />
                          </div>

                          <!-- Keyword 2 - Первая переменная -->
                          <div>
                            <label
                              class="block text-sm font-medium text-emerald-300 mb-2"
                            >
                              2️⃣ Переменная [keyword_2] - Для описания
                            </label>
                            <div class="text-xs text-gray-400 mb-2 space-y-1">
                              <div>
                                📌 Используется в тексте описания как
                                <span
                                  class="font-mono text-emerald-400 bg-gray-800 px-1 rounded"
                                  >[keyword_2]</span
                                >
                              </div>
                              <div class="text-blue-300">
                                Например: название слота или его особенность
                              </div>
                            </div>
                            <input
                              v-model="form.hero_keyword_2"
                              type="text"
                              maxlength="200"
                              class="w-full px-4 py-3 bg-gray-700 border border-emerald-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                              placeholder='Например: "Gates of Olympus"'
                            />
                          </div>

                          <!-- Keyword 3 - Вторая переменная -->
                          <div>
                            <label
                              class="block text-sm font-medium text-purple-300 mb-2"
                            >
                              3️⃣ Переменная [keyword_3] - Для описания
                            </label>
                            <div class="text-xs text-gray-400 mb-2 space-y-1">
                              <div>
                                📌 Используется в тексте описания как
                                <span
                                  class="font-mono text-purple-400 bg-gray-800 px-1 rounded"
                                  >[keyword_3]</span
                                >
                              </div>
                              <div class="text-blue-300">
                                Например: модификация слота или дополнительная
                                информация
                              </div>
                            </div>
                            <input
                              v-model="form.hero_keyword_3"
                              type="text"
                              maxlength="200"
                              class="w-full px-4 py-3 bg-gray-700 border border-purple-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                              placeholder='Например: "Gates of Olympus 1,000"'
                            />
                          </div>

                          <!-- Пример результата -->
                          <div
                            class="bg-gray-800/50 p-3 rounded-lg border border-gray-600"
                          >
                            <div class="text-xs text-gray-400 mb-1">
                              Пример текста с переменными:
                            </div>
                            <div class="text-xs text-white font-mono">
                              "We love
                              <span class="text-emerald-400">{{
                                form.hero_keyword_2 || '[keyword_2]'
                              }}</span>
                              and
                              <span class="text-purple-400">{{
                                form.hero_keyword_3 || '[keyword_3]'
                              }}</span
                              >!"
                            </div>
                          </div>
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
                              class="text-lg font-medium text-[#E5E7EB] font-display"
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
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#00EDFF]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showHeroLinksSection"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{ 'rotate-180': showHeroLinksSection }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          <span>{{
                            showHeroLinksSection ? 'Hide' : 'Show'
                          }}</span>
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
                              class="text-lg font-medium text-[#E5E7EB] font-display"
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
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#63F3AB]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showGameCharacteristicsSection"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{
                              'rotate-180': showGameCharacteristicsSection,
                            }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          <span>{{
                            showGameCharacteristicsSection
                              ? 'Скрыть'
                              : 'Показать'
                          }}</span>
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
                            <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
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

                          <!-- Date выпуска -->
                          <div>
                            <label
                              class="block text-sm font-medium text-gray-300 mb-2"
                            >
                              Date выпуска
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


                    <!-- Info Popup Content (New Section) -->
                    <div
                      class="group bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl"
                          >
                            ℹ️
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Info Popup Content
                            </h3>
                            <p class="text-sm text-purple-400">
                              Контент для модального окна ⓘ
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center gap-2">
                           <button
                            type="button"
                            @click="generateInfoContent"
                            class="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
                          >
                            <span>🪄</span> Auto-Generate
                          </button>
                          <button
                            type="button"
                            @click="showInfoPopupSection = !showInfoPopupSection"
                            class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-purple-500/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          >
                            {{ showInfoPopupSection ? 'Hide' : 'Show' }}
                          </button>
                        </div>
                      </div>

                      <div v-show="showInfoPopupSection" class="space-y-6 animate-fade-in">

                        <!-- 🏆 Expert Verdict -->
                        <div class="bg-[#1B1E26] rounded-lg p-4 border border-[#353A4A]">
                          <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-3">
                            <span class="text-yellow-400">🏆</span> Expert Verdict
                          </label>
                          <textarea
                            v-model="form.info_expert_verdict"
                            rows="3"
                            class="w-full px-4 py-3 bg-[#0D1117] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm"
                            placeholder="Expert review and overall verdict for this slot..."
                          ></textarea>
                        </div>

                        <!-- ✅ Pros -->
                        <div class="bg-[#1B1E26] rounded-lg p-4 border border-emerald-500/20">
                          <div class="flex items-center justify-between mb-3">
                            <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
                              <span class="text-emerald-400">✅</span> Pros
                              <span class="text-xs text-[#6B7280]">({{ infoProsItems.length }})</span>
                            </label>
                            <button
                              type="button"
                              @click="addInfoProsItem"
                              class="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg text-xs font-medium transition-colors border border-emerald-500/30"
                            >
                              <span>➕</span> Добавить
                            </button>
                          </div>
                          <div class="space-y-2">
                            <div
                              v-for="(item, i) in infoProsItems"
                              :key="'pro-'+i"
                              class="flex items-center gap-2"
                            >
                              <span class="text-emerald-400 text-xs shrink-0 w-5 text-center">+</span>
                              <input
                                v-model="infoProsItems[i]"
                                type="text"
                                class="flex-1 px-3 py-2 bg-[#0D1117] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm"
                                :placeholder="'Pro ' + (i + 1) + '...'"
                                @input="syncInfoPros"
                              />
                              <button
                                type="button"
                                @click="removeInfoProsItem(i)"
                                class="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                                title="Удалить"
                              >
                                🗑️
                              </button>
                            </div>
                            <p v-if="infoProsItems.length === 0" class="text-[#6B7280] text-xs py-2 text-center">Нет элементов. Нажмите «Добавить» или «Auto-Generate».</p>
                          </div>
                        </div>

                        <!-- ❌ Cons -->
                        <div class="bg-[#1B1E26] rounded-lg p-4 border border-red-500/20">
                          <div class="flex items-center justify-between mb-3">
                            <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
                              <span class="text-red-400">❌</span> Cons
                              <span class="text-xs text-[#6B7280]">({{ infoConsItems.length }})</span>
                            </label>
                            <button
                              type="button"
                              @click="addInfoConsItem"
                              class="flex items-center gap-1 px-2.5 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-xs font-medium transition-colors border border-red-500/30"
                            >
                              <span>➕</span> Добавить
                            </button>
                          </div>
                          <div class="space-y-2">
                            <div
                              v-for="(item, i) in infoConsItems"
                              :key="'con-'+i"
                              class="flex items-center gap-2"
                            >
                              <span class="text-red-400 text-xs shrink-0 w-5 text-center">−</span>
                              <input
                                v-model="infoConsItems[i]"
                                type="text"
                                class="flex-1 px-3 py-2 bg-[#0D1117] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-sm"
                                :placeholder="'Con ' + (i + 1) + '...'"
                                @input="syncInfoCons"
                              />
                              <button
                                type="button"
                                @click="removeInfoConsItem(i)"
                                class="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors shrink-0"
                                title="Удалить"
                              >
                                🗑️
                              </button>
                            </div>
                            <p v-if="infoConsItems.length === 0" class="text-[#6B7280] text-xs py-2 text-center">Нет элементов. Нажмите «Добавить» или «Auto-Generate».</p>
                          </div>
                        </div>

                        <!-- ❓ FAQ -->
                        <div class="bg-[#1B1E26] rounded-lg p-4 border border-blue-500/20">
                          <div class="flex items-center justify-between mb-3">
                            <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
                              <span class="text-blue-400">❓</span> FAQ
                              <span class="text-xs text-[#6B7280]">({{ infoFaqItems.length }})</span>
                            </label>
                            <button
                              type="button"
                              @click="addInfoFaqItem"
                              class="flex items-center gap-1 px-2.5 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-xs font-medium transition-colors border border-blue-500/30"
                            >
                              <span>➕</span> Добавить вопрос
                            </button>
                          </div>
                          <div class="space-y-4">
                            <div
                              v-for="(item, i) in infoFaqItems"
                              :key="'faq-'+i"
                              class="bg-[#0D1117] rounded-lg p-3 border border-[#353A4A] relative"
                            >
                              <div class="flex items-center justify-between mb-2">
                                <span class="text-blue-400 text-xs font-medium">Вопрос {{ i + 1 }}</span>
                                <button
                                  type="button"
                                  @click="removeInfoFaqItem(i)"
                                  class="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                                  title="Удалить вопрос"
                                >
                                  🗑️
                                </button>
                              </div>
                              <input
                                v-model="item.question"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm mb-2"
                                placeholder="Вопрос..."
                                @input="syncInfoFaq"
                              />
                              <textarea
                                v-model="item.answer"
                                rows="2"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                                placeholder="Ответ..."
                                @input="syncInfoFaq"
                              ></textarea>
                            </div>
                            <p v-if="infoFaqItems.length === 0" class="text-[#6B7280] text-xs py-2 text-center">Нет вопросов. Нажмите «Добавить вопрос» или «Auto-Generate».</p>
                          </div>
                        </div>

                        <!-- 📝 Player Reviews -->
                        <div class="bg-[#1B1E26] rounded-lg p-4 border border-pink-500/20">
                          <div class="flex items-center justify-between mb-3">
                            <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
                              <span class="text-pink-400">📝</span> Player Reviews
                              <span class="text-xs text-[#6B7280]">({{ infoReviewItems.length }})</span>
                            </label>
                            <button
                              type="button"
                              @click="addInfoReviewItem"
                              class="flex items-center gap-1 px-2.5 py-1.5 bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 rounded-lg text-xs font-medium transition-colors border border-pink-500/30"
                            >
                              <span>➕</span> Добавить отзыв
                            </button>
                          </div>
                          <div class="space-y-4">
                            <div
                              v-for="(item, i) in infoReviewItems"
                              :key="'review-'+i"
                              class="bg-[#0D1117] rounded-lg p-3 border border-[#353A4A]"
                            >
                              <div class="flex items-center justify-between mb-2">
                                <span class="text-pink-400 text-xs font-medium">Отзыв {{ i + 1 }}</span>
                                <button
                                  type="button"
                                  @click="removeInfoReviewItem(i)"
                                  class="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                                  title="Удалить отзыв"
                                >
                                  🗑️
                                </button>
                              </div>
                              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                                <input
                                  v-model="item.author"
                                  type="text"
                                  class="px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-sm"
                                  placeholder="Автор"
                                  @input="syncInfoReviews"
                                />
                                <select
                                  v-model.number="item.rating"
                                  class="px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-sm"
                                  @change="syncInfoReviews"
                                >
                                  <option :value="5">★★★★★ (5)</option>
                                  <option :value="4">★★★★☆ (4)</option>
                                  <option :value="3">★★★☆☆ (3)</option>
                                  <option :value="2">★★☆☆☆ (2)</option>
                                  <option :value="1">★☆☆☆☆ (1)</option>
                                </select>
                                <input
                                  v-model="item.date"
                                  type="date"
                                  class="px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-sm"
                                  @input="syncInfoReviews"
                                />
                              </div>
                              <textarea
                                v-model="item.text"
                                rows="2"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-sm"
                                placeholder="Текст отзыва..."
                                @input="syncInfoReviews"
                              ></textarea>
                            </div>
                            <p v-if="infoReviewItems.length === 0" class="text-[#6B7280] text-xs py-2 text-center">Нет отзывов. Нажмите «Добавить отзыв» или «Auto-Generate».</p>
                          </div>
                        </div>

                        <!-- 🎮 How to Play -->
                        <div class="bg-[#1B1E26] rounded-lg p-4 border border-green-500/20">
                          <div class="flex items-center justify-between mb-3">
                            <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
                              <span class="text-green-400">🎮</span> How to Play
                              <span class="text-xs text-[#6B7280]">({{ infoHowToPlayItems.length }})</span>
                            </label>
                            <button
                              type="button"
                              @click="addInfoHowToPlayItem"
                              class="flex items-center gap-1 px-2.5 py-1.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-xs font-medium transition-colors border border-green-500/30"
                            >
                              <span>➕</span> Добавить шаг
                            </button>
                          </div>
                          <div class="space-y-3">
                            <div
                              v-for="(item, i) in infoHowToPlayItems"
                              :key="'step-'+i"
                              class="bg-[#0D1117] rounded-lg p-3 border border-[#353A4A] flex gap-3"
                            >
                              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-1">
                                {{ i + 1 }}
                              </div>
                              <div class="flex-1 space-y-2">
                                <input
                                  v-model="item.step"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm font-medium"
                                  placeholder="Название шага..."
                                  @input="syncInfoHowToPlay"
                                />
                                <textarea
                                  v-model="item.text"
                                  rows="2"
                                  class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-sm"
                                  placeholder="Описание шага..."
                                  @input="syncInfoHowToPlay"
                                ></textarea>
                              </div>
                              <button
                                type="button"
                                @click="removeInfoHowToPlayItem(i)"
                                class="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors shrink-0 self-start mt-1"
                                title="Удалить шаг"
                              >
                                🗑️
                              </button>
                            </div>
                            <p v-if="infoHowToPlayItems.length === 0" class="text-[#6B7280] text-xs py-2 text-center">Нет шагов. Нажмите «Добавить шаг» или «Auto-Generate».</p>
                          </div>
                        </div>

                        <!-- 🎯 Demo CTA Text -->
                        <div class="bg-[#1B1E26] rounded-lg p-4 border border-[#353A4A]">
                          <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-3">
                            <span class="text-purple-400">🎯</span> Demo CTA Text
                          </label>
                          <textarea
                            v-model="form.info_demo_cta"
                            rows="2"
                            class="w-full px-4 py-3 bg-[#0D1117] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm"
                            placeholder="Call to action text for demo play button..."
                          ></textarea>
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
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Рейтинг и популярность
                            </h3>
                            <p class="text-sm text-[#CD0F8B]">
                              Позиции и оценки
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showRatingSection = !showRatingSection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#CD0F8B]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showRatingSection"
                        >
                          {{ showRatingSection ? 'Hide' : 'Show' }}
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
                            <h4
                              class="text-sm font-semibold text-blue-300 mb-2"
                            >
                              📐 Рекомендуемые размеры медиа
                            </h4>
                            <div class="text-xs text-blue-200 space-y-1">
                              <div>
                                <strong>🖼️ Изображение:</strong> 1200x1600
                                пикселей (соотношение 3:4)
                              </div>
                              <div>
                                <strong>🎬 Видео:</strong> 1200x1600 пикселей,
                                длительность до 30 секунд
                              </div>
                              <div>
                                <strong>📱 Мобильная версия:</strong>
                                Автоматически адаптируется под экран
                              </div>
                              <div>
                                <strong>💾 Размер файла:</strong> Изображения до
                                2MB, видео до 10MB
                              </div>
                            </div>
                            <div class="mt-2 text-xs text-blue-300">
                              💡 <strong>Совет:</strong> Используйте
                              высококачественные изображения для лучшего
                              отображения на ретина-дисплеях
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Тип медиа -->
                      <div>
                        <label
                          class="block text-sm font-medium text-gray-300 mb-2"
                        >
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
                        <label
                          class="block text-sm font-medium text-gray-300 mb-2"
                        >
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

                      <!-- Точка фокуса изображения (для адаптивного кропа) -->
                      <div v-if="form.media_type === 'image' && form.image_url">
                        <label
                          class="block text-sm font-medium text-gray-300 mb-2"
                        >
                          📍 Точка фокуса (для адаптивного кропа)
                        </label>
                        <select
                          v-model="form.image_focus_point"
                          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                        >
                          <option value="center 20%">🎯 Верхняя часть (по умолчанию)</option>
                          <option value="center center">⚪ Центр</option>
                          <option value="center top">⬆️ Верх</option>
                          <option value="center 30%">📍 Верхняя треть</option>
                          <option value="center 40%">📍 Чуть выше центра</option>
                          <option value="center 60%">📍 Чуть ниже центра</option>
                          <option value="center bottom">⬇️ Низ</option>
                          <option value="left center">⬅️ Левый центр</option>
                          <option value="right center">➡️ Правый центр</option>
                        </select>
                        <p class="mt-1 text-xs text-gray-400">
                          Выберите точку фокуса для умного кропа на планшетах и мобильных устройствах.
                          Это определяет какая часть изображения будет видна при обрезке.
                        </p>
                      </div>

                      <!-- URL видео (показывается если выбрано видео) -->
                      <div v-if="form.media_type === 'video'">
                        <label
                          class="block text-sm font-medium text-gray-300 mb-2"
                        >
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
                        <label
                          class="block text-sm font-medium text-gray-300 mb-2"
                        >
                          Превью медиа
                        </label>
                        <div
                          class="bg-gray-700 rounded-lg p-4 border border-gray-600"
                        >
                          <!-- Превью изображения -->
                          <div
                            v-if="form.media_type === 'image' && form.image_url"
                          >
                            <!-- Диагностическая информация -->
                            <div
                              class="mb-3 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg"
                            >
                              <div class="flex items-start gap-2 mb-2">
                                <svg
                                  class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
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
                                <div class="flex-1">
                                  <div
                                    class="text-sm font-medium text-blue-300"
                                  >
                                    URL изображения:
                                  </div>
                                  <div
                                    class="text-xs text-gray-300 mt-1 break-all font-mono bg-gray-800 p-2 rounded"
                                  >
                                    {{ form.image_url }}
                                  </div>
                                </div>
                              </div>
                              <div class="flex gap-2 mt-2">
                                <a
                                  :href="form.image_url"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  class="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-all"
                                >
                                  <svg
                                    class="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    ></path>
                                  </svg>
                                  Открыть в новой вкладке
                                </a>
                              </div>
                            </div>

                            <!-- Само изображение с обработкой состояний -->
                            <div class="relative">
                              <div
                                v-if="imageLoading"
                                class="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg z-10"
                              >
                                <div class="text-center">
                                  <svg
                                    class="animate-spin h-8 w-8 text-blue-400 mx-auto mb-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      class="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      stroke-width="4"
                                    ></circle>
                                    <path
                                      class="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  <p class="text-sm text-gray-300">
                                    Загрузка изображения...
                                  </p>
                                </div>
                              </div>

                              <div
                                v-if="imageError"
                                class="p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-center"
                              >
                                <svg
                                  class="w-12 h-12 text-red-400 mx-auto mb-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  ></path>
                                </svg>
                                <p
                                  class="text-sm font-medium text-red-300 mb-2"
                                >
                                  ❌ Ошибка загрузки изображения
                                </p>
                                <p class="text-xs text-gray-400 mb-3">
                                  Проверьте правильность URL. Это должна быть
                                  ПРЯМАЯ ссылка на изображение.
                                </p>
                                <div
                                  class="text-xs text-left bg-gray-800 p-3 rounded space-y-1"
                                >
                                  <p class="text-green-400">
                                    ✅ Правильно: https://i.imgur.com/abc123.jpg
                                  </p>
                                  <p class="text-red-400">
                                    ❌ Неправильно: https://imgur.com/a/abc123
                                  </p>
                                </div>
                              </div>

                              <img
                                v-show="!imageLoading && !imageError"
                                :src="form.image_url"
                                :alt="form.name || 'Слот'"
                                class="w-full max-w-sm h-48 object-cover rounded-lg mx-auto"
                                @error="handleImageError"
                                @load="handleImageLoad"
                              />
                            </div>
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
                              class="text-lg font-medium text-[#E5E7EB] font-display"
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
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#FF6E48]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showMechanicsSection"
                        >
                          {{ showMechanicsSection ? 'Hide' : 'Show' }}
                        </button>
                      </div>
                      <div v-show="showMechanicsSection" class="space-y-4">
                        <p class="text-sm text-gray-400">
                          Выберите игровые механики, которые будут отображаться
                          в Hero секции слота
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
                          v-if="
                            selectedMechanics && selectedMechanics.length > 0
                          "
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
                              class="text-lg font-medium text-[#E5E7EB] font-display flex items-center gap-2"
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
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#63F3AB]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showBonusesSection"
                        >
                          {{ showBonusesSection ? 'Hide' : 'Show' }}
                        </button>
                      </div>
                      <div v-show="showBonusesSection" class="space-y-4">
                        <div
                          class="bg-[#63F3AB]/10 border border-[#63F3AB]/20 rounded-lg p-4"
                        >
                          <p
                            class="text-sm text-[#63F3AB] flex items-center gap-2"
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
                              class="text-lg font-medium text-[#E5E7EB] font-display flex items-center gap-2"
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
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#00EDFF]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showThemesSection"
                        >
                          {{ showThemesSection ? 'Hide' : 'Show' }}
                        </button>
                      </div>
                      <div v-show="showThemesSection" class="space-y-4">
                        <div
                          class="bg-[#00EDFF]/10 border border-[#00EDFF]/20 rounded-lg p-4"
                        >
                          <p
                            class="text-sm text-[#00EDFF] flex items-center gap-2"
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
                            class="text-xs px-3 py-1 rounded-md border"
                            :class="
                              selectedThemes.length >= 5
                                ? 'text-amber-300 bg-amber-500/20 border-amber-500/30'
                                : 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30'
                            "
                          >
                            {{
                              selectedThemes.length >= 5
                                ? '⚠️ Достигнут лимит!'
                                : `✅ Выбрано ${selectedThemes.length}/5`
                            }}
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
                              selectedThemes.includes(theme.id)
                                ? 'border-emerald-500 bg-emerald-500/10'
                                : ''
                            "
                          >
                            <input
                              :id="`theme-${theme.id}`"
                              v-model="selectedThemes"
                              :value="theme.id"
                              type="checkbox"
                              :disabled="
                                selectedThemes.length >= 5 &&
                                !selectedThemes.includes(theme.id)
                              "
                              class="w-4 h-4 text-emerald-600 bg-gray-600 border-gray-500 focus:ring-emerald-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

                        <!-- Выбранные тематики (до 5 штук!) -->
                        <div
                          v-if="selectedThemes && selectedThemes.length > 0"
                          class="mt-4"
                        >
                          <h4 class="text-sm font-medium text-gray-300 mb-2">
                            Выбранные тематики ({{ selectedThemes.length }}/5):
                          </h4>
                          <div class="flex flex-wrap gap-2">
                            <span
                              v-for="themeId in selectedThemes"
                              :key="themeId"
                              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-600/20 text-emerald-300 border border-emerald-500/30"
                            >
                              {{ getThemeName(themeId) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Конец Hero секций -->
                </div>
              </div>
            </div>
            <!-- Кнопки сохранения -->
            <div class="mt-8">
              <div class="flex justify-end gap-4 pt-6 border-t border-gray-600">
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
            </div>

            <!-- SEO Секция -->
            <div
              id="seo"
              data-section="seo"
              class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#353A4A] relative overflow-hidden"
            >
              <!-- Декоративный фон -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-[#10B981]/5 via-transparent to-[#3B82F6]/5"
              ></div>
              <div
                class="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"
              ></div>

              <div class="relative z-10">
                <div class="flex items-center justify-between mb-8">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 animate-pulse"
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h2
                        class="text-2xl font-semibold text-[#E5E7EB] font-display"
                      >
                        SEO Оптимизация
                      </h2>
                      <div
                        class="h-1 w-28 bg-gradient-to-r from-[#10B981] to-[#3B82F6] rounded-full mt-2"
                      ></div>
                    </div>
                  </div>
                  <!-- Кнопка сворачивания/разворачивания SEO секции -->
                  <button
                    type="button"
                    @click="showSeoSection = !showSeoSection"
                    class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#10B981]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200"
                    :aria-expanded="showSeoSection"
                  >
                    <svg
                      class="w-4 h-4 transform transition-transform duration-200"
                      :class="{ 'rotate-180': showSeoSection }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                <div class="space-y-8">
                  <!-- Все SEO секции (управляемые через v-show) -->
                  <div v-show="showSeoSection" class="space-y-8">
                    <!-- Meta теги -->
                    <div
                      class="group bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-xl p-6 hover:border-[#10B981]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center"
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
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Meta теги
                            </h3>
                            <p class="text-sm text-[#10B981]">
                              Основные SEO meta теги
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showMetaSection = !showMetaSection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#10B981]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showMetaSection"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{ 'rotate-180': showMetaSection }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          {{ showMetaSection ? 'Hide' : 'Show' }}
                        </button>
                      </div>

                      <div v-show="showMetaSection" class="space-y-6">
                        <!-- SEO Title -->
                        <div class="space-y-2">
                          <div class="flex items-center justify-between">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB]"
                            >
                              SEO Title
                              <span class="text-[#10B981] ml-1">*</span>
                            </label>
                            <button
                              type="button"
                              @click="generateSeoTitle"
                              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#10B981]/20 text-[#10B981] hover:bg-[#10B981]/30 border border-[#10B981]/30 transition-all duration-200"
                              title="Сгенерировать Title на основе данных слота"
                            >
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                              </svg>
                              Авто-генерация
                            </button>
                          </div>
                          <input
                            v-model="form.seo_title"
                            type="text"
                            placeholder="Играть в [Name слота] онлайн бесплатно | SlotQuest"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                            :class="{
                              'border-[#EF4444]/50': (form.seo_title || '').length > 60,
                              'border-[#F59E0B]/50': (form.seo_title || '').length > 0 && (form.seo_title || '').length < 30,
                              'border-[#10B981]/50': (form.seo_title || '').length >= 50 && (form.seo_title || '').length <= 60,
                            }"
                            maxlength="70"
                          />
                          <!-- Индикатор длины с прогресс-баром -->
                          <div class="space-y-1.5">
                            <div class="flex justify-between text-xs">
                              <div class="flex items-center gap-2">
                                <span class="text-[#9CA3AF]">Рекомендуется: 50-60 символов</span>
                                <span
                                  v-if="(form.seo_title || '').length > 0 && (form.seo_title || '').length < 30"
                                  class="text-[#F59E0B]"
                                >
                                  ⚠️ Слишком короткий
                                </span>
                              </div>
                              <span
                                class="font-medium"
                                :class="{
                                  'text-[#EF4444]': (form.seo_title || '').length > 60,
                                  'text-[#F59E0B]': (form.seo_title || '').length > 0 && (form.seo_title || '').length < 30,
                                  'text-[#10B981]': (form.seo_title || '').length >= 50 && (form.seo_title || '').length <= 60,
                                  'text-[#9CA3AF]': (form.seo_title || '').length >= 30 && (form.seo_title || '').length < 50,
                                }"
                              >
                                {{ (form.seo_title || '').length }}/60
                              </span>
                            </div>
                            <!-- Прогресс-бар -->
                            <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                              <div
                                class="h-full transition-all duration-300 rounded-full"
                                :class="{
                                  'bg-[#EF4444]': (form.seo_title || '').length > 60,
                                  'bg-[#F59E0B]': (form.seo_title || '').length > 0 && (form.seo_title || '').length < 30,
                                  'bg-[#10B981]': (form.seo_title || '').length >= 50 && (form.seo_title || '').length <= 60,
                                  'bg-[#3B82F6]': (form.seo_title || '').length >= 30 && (form.seo_title || '').length < 50,
                                }"
                                :style="{ width: `${Math.min(((form.seo_title || '').length / 60) * 100, 100)}%` }"
                              ></div>
                            </div>
                          </div>
                          <!-- Preview авто-генерации (если пусто) -->
                          <div
                            v-if="!(form.seo_title || '').length && form.name"
                            class="p-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg"
                          >
                            <p class="text-xs text-[#9CA3AF]">
                              💡 <span class="text-[#10B981]">Авто-генерация:</span>
                              <span class="text-[#E5E7EB]">{{ generateAutoTitle() }}</span>
                            </p>
                          </div>
                        </div>

                        <!-- SEO Description -->
                        <div class="space-y-2">
                          <div class="flex items-center justify-between">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB]"
                            >
                              SEO Description
                              <span class="text-[#10B981] ml-1">*</span>
                            </label>
                            <button
                              type="button"
                              @click="generateSeoDescription"
                              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#10B981]/20 text-[#10B981] hover:bg-[#10B981]/30 border border-[#10B981]/30 transition-all duration-200"
                              title="Сгенерировать Description на основе данных слота"
                            >
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                              </svg>
                              Авто-генерация
                            </button>
                          </div>
                          <textarea
                            v-model="form.seo_description"
                            rows="3"
                            placeholder="Играйте в [Name слота] от [Провайдер] бесплатно и на реальные деньги. RTP [%], волатильность [уровень]. Бонусы, фриспины и джекпоты."
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200 resize-none"
                            :class="{
                              'border-[#EF4444]/50': (form.seo_description || '').length > 160,
                              'border-[#F59E0B]/50': (form.seo_description || '').length > 0 && (form.seo_description || '').length < 100,
                              'border-[#10B981]/50': (form.seo_description || '').length >= 150 && (form.seo_description || '').length <= 160,
                            }"
                            maxlength="170"
                          ></textarea>
                          <!-- Индикатор длины с прогресс-баром -->
                          <div class="space-y-1.5">
                            <div class="flex justify-between text-xs">
                              <div class="flex items-center gap-2">
                                <span class="text-[#9CA3AF]">Рекомендуется: 150-160 символов</span>
                                <span
                                  v-if="(form.seo_description || '').length > 0 && (form.seo_description || '').length < 100"
                                  class="text-[#F59E0B]"
                                >
                                  ⚠️ Слишком короткий
                                </span>
                              </div>
                              <span
                                class="font-medium"
                                :class="{
                                  'text-[#EF4444]': (form.seo_description || '').length > 160,
                                  'text-[#F59E0B]': (form.seo_description || '').length > 0 && (form.seo_description || '').length < 100,
                                  'text-[#10B981]': (form.seo_description || '').length >= 150 && (form.seo_description || '').length <= 160,
                                  'text-[#9CA3AF]': (form.seo_description || '').length >= 100 && (form.seo_description || '').length < 150,
                                }"
                              >
                                {{ (form.seo_description || '').length }}/160
                              </span>
                            </div>
                            <!-- Прогресс-бар -->
                            <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                              <div
                                class="h-full transition-all duration-300 rounded-full"
                                :class="{
                                  'bg-[#EF4444]': (form.seo_description || '').length > 160,
                                  'bg-[#F59E0B]': (form.seo_description || '').length > 0 && (form.seo_description || '').length < 100,
                                  'bg-[#10B981]': (form.seo_description || '').length >= 150 && (form.seo_description || '').length <= 160,
                                  'bg-[#3B82F6]': (form.seo_description || '').length >= 100 && (form.seo_description || '').length < 150,
                                }"
                                :style="{ width: `${Math.min(((form.seo_description || '').length / 160) * 100, 100)}%` }"
                              ></div>
                            </div>
                          </div>
                          <!-- Preview авто-генерации (если пусто) -->
                          <div
                            v-if="!(form.seo_description || '').length && form.name"
                            class="p-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-lg"
                          >
                            <p class="text-xs text-[#9CA3AF]">
                              💡 <span class="text-[#10B981]">Авто-генерация:</span>
                              <span class="text-[#E5E7EB]">{{ generateAutoDescription() }}</span>
                            </p>
                          </div>
                        </div>

                        <!-- 📊 SEO Score Indicator -->
                        <div class="bg-gradient-to-r from-[#1B1E26] to-[#1B1E26]/80 border border-[#353A4A] rounded-xl p-4">
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center gap-2">
                              <div class="w-8 h-8 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                              </div>
                              <div>
                                <h4 class="text-sm font-medium text-[#E5E7EB]">SEO Score</h4>
                                <p class="text-xs text-[#9CA3AF]">Качество Meta тегов</p>
                              </div>
                            </div>
                            <div class="flex items-center gap-3">
                              <!-- Score Circle -->
                              <div
                                class="relative w-14 h-14 rounded-full flex items-center justify-center"
                                :class="{
                                  'bg-[#EF4444]/20': calculateMetaScore() < 40,
                                  'bg-[#F59E0B]/20': calculateMetaScore() >= 40 && calculateMetaScore() < 70,
                                  'bg-[#10B981]/20': calculateMetaScore() >= 70,
                                }"
                              >
                                <span
                                  class="text-lg font-bold"
                                  :class="{
                                    'text-[#EF4444]': calculateMetaScore() < 40,
                                    'text-[#F59E0B]': calculateMetaScore() >= 40 && calculateMetaScore() < 70,
                                    'text-[#10B981]': calculateMetaScore() >= 70,
                                  }"
                                >{{ calculateMetaScore() }}%</span>
                              </div>
                            </div>
                          </div>

                          <!-- Score Details Grid -->
                          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <!-- Title Length -->
                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Title</span>
                                <span
                                  :class="{
                                    'text-[#EF4444]': (form.seo_title || '').length > 60 || (form.seo_title || '').length < 30,
                                    'text-[#F59E0B]': (form.seo_title || '').length >= 30 && (form.seo_title || '').length < 50,
                                    'text-[#10B981]': (form.seo_title || '').length >= 50 && (form.seo_title || '').length <= 60,
                                  }"
                                >
                                  {{ (form.seo_title || '').length >= 50 && (form.seo_title || '').length <= 60 ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all"
                                  :class="{
                                    'bg-[#EF4444]': (form.seo_title || '').length > 60 || (form.seo_title || '').length < 30,
                                    'bg-[#F59E0B]': (form.seo_title || '').length >= 30 && (form.seo_title || '').length < 50,
                                    'bg-[#10B981]': (form.seo_title || '').length >= 50 && (form.seo_title || '').length <= 60,
                                  }"
                                  :style="{ width: `${Math.min(((form.seo_title || '').length / 60) * 100, 100)}%` }"
                                ></div>
                              </div>
                            </div>

                            <!-- Description Length -->
                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Description</span>
                                <span
                                  :class="{
                                    'text-[#EF4444]': (form.seo_description || '').length > 160 || (form.seo_description || '').length < 100,
                                    'text-[#F59E0B]': (form.seo_description || '').length >= 100 && (form.seo_description || '').length < 150,
                                    'text-[#10B981]': (form.seo_description || '').length >= 150 && (form.seo_description || '').length <= 160,
                                  }"
                                >
                                  {{ (form.seo_description || '').length >= 150 && (form.seo_description || '').length <= 160 ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all"
                                  :class="{
                                    'bg-[#EF4444]': (form.seo_description || '').length > 160 || (form.seo_description || '').length < 100,
                                    'bg-[#F59E0B]': (form.seo_description || '').length >= 100 && (form.seo_description || '').length < 150,
                                    'bg-[#10B981]': (form.seo_description || '').length >= 150 && (form.seo_description || '').length <= 160,
                                  }"
                                  :style="{ width: `${Math.min(((form.seo_description || '').length / 160) * 100, 100)}%` }"
                                ></div>
                              </div>
                            </div>

                            <!-- Keywords -->
                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Keywords</span>
                                <span
                                  :class="{
                                    'text-[#EF4444]': !(form.seo_keywords_primary || '').length,
                                    'text-[#10B981]': (form.seo_keywords_primary || '').length > 0,
                                  }"
                                >
                                  {{ (form.seo_keywords_primary || '').length > 0 ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all"
                                  :class="{
                                    'bg-[#EF4444]': !(form.seo_keywords_primary || '').length,
                                    'bg-[#10B981]': (form.seo_keywords_primary || '').length > 0,
                                  }"
                                  :style="{ width: (form.seo_keywords_primary || '').length > 0 ? '100%' : '0%' }"
                                ></div>
                              </div>
                            </div>

                            <!-- Slug -->
                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Slug</span>
                                <span
                                  :class="{
                                    'text-[#EF4444]': !(form.slug || '').length,
                                    'text-[#10B981]': (form.slug || '').length > 0,
                                  }"
                                >
                                  {{ (form.slug || '').length > 0 ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all"
                                  :class="{
                                    'bg-[#EF4444]': !(form.slug || '').length,
                                    'bg-[#10B981]': (form.slug || '').length > 0,
                                  }"
                                  :style="{ width: (form.slug || '').length > 0 ? '100%' : '0%' }"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- 🔍 SERP Preview - Как страница выглядит в Google -->
                        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
                          <SerpPreview
                            :title="form.seo_title_use_template ? generatedTitleFromTemplate : (form.seo_title || generateAutoTitle())"
                            :description="form.seo_description || generateAutoDescription()"
                            :slug="form.slug"
                            :slot-name="form.name"
                            :provider-name="slot?.providers?.name || ''"
                            :rtp="form.rtp"
                            :volatility="form.volatility"
                            :max-win="form.max_win"
                            :rating="form.rating"
                            :rating-count="form.rating_count"
                            :show-rating="form.jsonld_enable_review !== false"
                            :show-breadcrumbs="form.jsonld_enable_breadcrumb !== false"
                            :show-faq="form.jsonld_enable_faq"
                            :faq-items="parseFaqItems(form.jsonld_faq_json)"
                          />
                        </div>

                        <!-- 🎯 Title Templates - Система шаблонов заголовков (Фаза 2) -->
                        <div class="bg-[#1B1E26]/50 border border-[#F59E0B]/20 rounded-lg p-4">
                          <TitleTemplates
                            v-model:template="form.seo_title_template"
                            v-model:use-template="form.seo_title_use_template"
                            v-model:power-words="form.seo_title_power_words"
                            :slot-name="form.name"
                            :provider-name="slot?.providers?.name || ''"
                            :rtp="form.rtp"
                            :volatility="form.volatility"
                            :max-win="form.max_win"
                            :rating="form.rating"
                            @update:generated-title="generatedTitleFromTemplate = $event"
                          />
                        </div>

                        <!-- SEO Keywords - РАСШИРЕННАЯ СИСТЕМА -->
                        <div class="space-y-4">
                          <h4
                            class="text-md font-medium text-[#E5E7EB] border-b border-[#353A4A] pb-2"
                          >
                            🎯 Система ключевых слов (для уникальности каждого
                            слота)
                          </h4>

                          <!-- 1. Основные ключевые слова (Primary) -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB]"
                            >
                              1️⃣ Основные ключевые слова (Primary)
                              <span class="text-[#10B981] ml-1">3-5 слов</span>
                            </label>
                            <input
                              v-model="form.seo_keywords_primary"
                              type="text"
                              placeholder="Gates of Olympus, Pragmatic Play slot, Greek mythology slots"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                            />
                            <p class="text-xs text-[#9CA3AF]">
                              🔑 Главные термины, по которым ищут ваш слот
                              (через запятую)
                            </p>
                          </div>

                          <!-- 2. LSI ключевые слова (Semantic) -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB]"
                            >
                              2️⃣ LSI-ключевые слова (Semantic)
                              <span class="text-[#3B82F6] ml-1"
                                >10-15 связанных терминов</span
                              >
                            </label>
                            <textarea
                              v-model="form.seo_keywords_lsi"
                              rows="3"
                              placeholder="Zeus symbols, free spins multipliers, cascade wins, volatility high, RTP 96.5%, scatter pays mechanism, tumble feature, bonus buy option, greek gods theme, ancient greece slots"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200 resize-none"
                            ></textarea>
                            <p class="text-xs text-[#9CA3AF]">
                              🔗 Связанные термины, которые Google ассоциирует с
                              вашим слотом
                            </p>
                          </div>

                          <!-- 3. Локальные ключевые слова (Geo-targeted) -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB]"
                            >
                              3️⃣ Локальные ключевые слова (для ГЕО-таргетинга)
                              <span class="text-[#F59E0B] ml-1"
                                >для разных стран</span
                              >
                            </label>
                            <textarea
                              v-model="form.seo_keywords_geo"
                              rows="4"
                              placeholder="🇷🇺: игровой автомат Врата Олимпа, бесплатные вращения, слот с выводом&#10;🇮🇳: Gates of Olympus online, free play demo, real money casino&#10;🇧🇷: Gates of Olympus grátis, jogo de cassino online&#10;🇹🇷: Gates of Olympus ücretsiz, çevrimiçi slot oyunu"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200 resize-none font-mono text-sm"
                            ></textarea>
                            <p class="text-xs text-[#9CA3AF]">
                              🌍 Ключевые слова на языках целевых стран (формат:
                              флаг+код страны: термины)
                            </p>
                          </div>

                          <!-- 4. Long-tail ключевые слова -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB]"
                            >
                              4️⃣ Long-tail фразы (конкретные запросы)
                              <span class="text-[#EC4899] ml-1">5-10 фраз</span>
                            </label>
                            <textarea
                              v-model="form.seo_keywords_longtail"
                              rows="3"
                              placeholder="how to win Gates of Olympus, best strategy for high volatility slots, Gates of Olympus bonus buy worth it, maximum win Gates of Olympus, Gates of Olympus free spins trigger"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200 resize-none"
                            ></textarea>
                            <p class="text-xs text-[#9CA3AF]">
                              🎯 Длинные целевые фразы, по которым ищут
                              конкретную информацию
                            </p>
                          </div>

                          <!-- Старое поле для обратной совместимости -->
                          <div class="space-y-2 opacity-50">
                            <label
                              class="block text-sm font-medium text-[#9CA3AF]"
                            >
                              Старое поле (для совместимости)
                            </label>
                            <input
                              v-model="form.seo_keywords"
                              type="text"
                              placeholder="Автоматически генерируется из новых полей выше"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#9CA3AF] placeholder-[#6B7280] focus:outline-none transition-all duration-200"
                              readonly
                            />
                          </div>
                        </div>

                        <!-- Canonical URL -->
                        <div class="space-y-2">
                          <label
                            class="block text-sm font-medium text-[#E5E7EB]"
                          >
                            Canonical URL
                          </label>
                          <input
                            v-model="form.canonical_url"
                            type="url"
                            placeholder="https://slotquest.com/slots/slot-name"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                          />
                          <p class="text-xs text-[#9CA3AF]">
                            Оставьте пустым для автоматической генерации
                          </p>
                        </div>

                        <!-- 🎬 Видео геймплея (для VideoObject Schema) -->
                        <div class="space-y-2">
                          <label
                            class="block text-sm font-medium text-[#E5E7EB]"
                          >
                            🎬 Видео геймплея (Video URL)
                          </label>
                          <input
                            v-model="form.video_url"
                            type="url"
                            placeholder="https://youtube.com/watch?v=..."
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                          />
                          <p class="text-xs text-[#9CA3AF]">
                            🎥 Ссылка на видео обзор/геймплей (улучшает SEO с
                            VideoObject Schema)
                          </p>
                        </div>

                        <!-- ⏱️ Длительность видео -->
                        <div class="space-y-2">
                          <label
                            class="block text-sm font-medium text-[#E5E7EB]"
                          >
                            ⏱️ Длительность видео (ISO 8601)
                          </label>
                          <input
                            v-model="form.video_duration"
                            type="text"
                            placeholder="PT3M (3 минуты)"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                          />
                          <p class="text-xs text-[#9CA3AF]">
                            Формат: PT3M (3 мин), PT5M30S (5 мин 30 сек)
                          </p>
                        </div>

                        <!-- 🌐 Альтернативные названия слота -->
                        <div class="space-y-2">
                          <label
                            class="block text-sm font-medium text-[#E5E7EB]"
                          >
                            🌐 Альтернативные названия (для разных рынков)
                          </label>
                          <input
                            v-model="form.alternative_names"
                            type="text"
                            placeholder="Gates of Olympus, Врата Олимпа, Portões do Olimpo"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                          />
                          <p class="text-xs text-[#9CA3AF]">
                            📝 Названия слота на разных языках (через запятую)
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Open Graph -->
                    <div
                      class="group bg-gradient-to-r from-[#3B82F6]/10 to-[#1D4ED8]/10 border border-[#3B82F6]/20 rounded-xl p-6 hover:border-[#3B82F6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-xl flex items-center justify-center"
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
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Open Graph
                            </h3>
                            <p class="text-sm text-[#3B82F6]">
                              Социальные сети и мессенджеры
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showOpenGraphSection = !showOpenGraphSection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#3B82F6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showOpenGraphSection"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{ 'rotate-180': showOpenGraphSection }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          {{ showOpenGraphSection ? 'Hide' : 'Show' }}
                        </button>
                      </div>

                      <div v-show="showOpenGraphSection" class="space-y-6">
                        <!-- 📊 OG Score Indicator -->
                        <div class="bg-gradient-to-r from-[#1B1E26] to-[#1B1E26]/80 border border-[#353A4A] rounded-xl p-4">
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center gap-2">
                              <div class="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                                </svg>
                              </div>
                              <div>
                                <h4 class="text-sm font-medium text-[#E5E7EB]">OG Score</h4>
                                <p class="text-xs text-[#9CA3AF]">Качество Open Graph тегов</p>
                              </div>
                            </div>
                            <div class="flex items-center gap-3">
                              <div
                                class="relative w-14 h-14 rounded-full flex items-center justify-center"
                                :class="{
                                  'bg-[#EF4444]/20': calculateOgScore() < 40,
                                  'bg-[#F59E0B]/20': calculateOgScore() >= 40 && calculateOgScore() < 70,
                                  'bg-[#3B82F6]/20': calculateOgScore() >= 70,
                                }"
                              >
                                <span
                                  class="text-lg font-bold"
                                  :class="{
                                    'text-[#EF4444]': calculateOgScore() < 40,
                                    'text-[#F59E0B]': calculateOgScore() >= 40 && calculateOgScore() < 70,
                                    'text-[#3B82F6]': calculateOgScore() >= 70,
                                  }"
                                >{{ calculateOgScore() }}%</span>
                              </div>
                            </div>
                          </div>

                          <!-- Score Details Grid -->
                          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Title</span>
                                <span :class="getOgTitleLen() >= 40 && getOgTitleLen() <= 90 ? 'text-[#10B981]' : 'text-[#F59E0B]'">
                                  {{ getOgTitleLen() >= 40 && getOgTitleLen() <= 90 ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all"
                                  :class="getOgTitleLen() >= 40 && getOgTitleLen() <= 90 ? 'bg-[#10B981]' : 'bg-[#F59E0B]'"
                                  :style="{ width: `${Math.min((getOgTitleLen() / 90) * 100, 100)}%` }"
                                ></div>
                              </div>
                            </div>

                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Description</span>
                                <span :class="getOgDescLen() >= 100 && getOgDescLen() <= 250 ? 'text-[#10B981]' : 'text-[#F59E0B]'">
                                  {{ getOgDescLen() >= 100 && getOgDescLen() <= 250 ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all"
                                  :class="getOgDescLen() >= 100 && getOgDescLen() <= 250 ? 'bg-[#10B981]' : 'bg-[#F59E0B]'"
                                  :style="{ width: `${Math.min((getOgDescLen() / 250) * 100, 100)}%` }"
                                ></div>
                              </div>
                            </div>

                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Image</span>
                                <span :class="getOgImageUrl() ? 'text-[#10B981]' : 'text-[#EF4444]'">
                                  {{ getOgImageUrl() ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all"
                                  :class="getOgImageUrl() ? 'bg-[#10B981]' : 'bg-[#EF4444]'"
                                  :style="{ width: getOgImageUrl() ? '100%' : '0%' }"
                                ></div>
                              </div>
                            </div>

                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Type</span>
                                <span :class="form.og_type ? 'text-[#10B981]' : 'text-[#F59E0B]'">
                                  {{ form.og_type ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all"
                                  :class="form.og_type ? 'bg-[#10B981]' : 'bg-[#F59E0B]'"
                                  :style="{ width: form.og_type ? '100%' : '50%' }"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- OG Title -->
                        <div class="space-y-2">
                          <div class="flex items-center justify-between">
                            <label class="block text-sm font-medium text-[#E5E7EB]">
                              OG Title
                              <span class="text-[#3B82F6] ml-1 text-xs">(60-90 символов)</span>
                            </label>
                            <button
                              type="button"
                              @click="copyFromSeoTitle"
                              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#3B82F6]/20 text-[#3B82F6] hover:bg-[#3B82F6]/30 border border-[#3B82F6]/30 transition-all duration-200"
                              title="Копировать из SEO Title"
                            >
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                              </svg>
                              Из SEO Title
                            </button>
                          </div>
                          <input
                            v-model="form.og_title"
                            type="text"
                            placeholder="Автоматически из SEO заголовка"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200"
                            :class="{
                              'border-[#EF4444]/50': (form.og_title || '').length > 90,
                              'border-[#F59E0B]/50': (form.og_title || '').length > 0 && (form.og_title || '').length < 40,
                              'border-[#10B981]/50': (form.og_title || '').length >= 40 && (form.og_title || '').length <= 90,
                            }"
                            maxlength="100"
                          />
                          <!-- Индикатор длины -->
                          <div class="space-y-1.5">
                            <div class="flex justify-between text-xs">
                              <div class="flex items-center gap-2">
                                <span class="text-[#9CA3AF]">Рекомендуется: 60-90 символов</span>
                                <span v-if="(form.og_title || '').length > 0 && (form.og_title || '').length < 40" class="text-[#F59E0B]">
                                  ⚠️ Слишком короткий
                                </span>
                              </div>
                              <span
                                class="font-medium"
                                :class="{
                                  'text-[#EF4444]': (form.og_title || '').length > 90,
                                  'text-[#F59E0B]': (form.og_title || '').length > 0 && (form.og_title || '').length < 40,
                                  'text-[#10B981]': (form.og_title || '').length >= 60 && (form.og_title || '').length <= 90,
                                  'text-[#3B82F6]': (form.og_title || '').length >= 40 && (form.og_title || '').length < 60,
                                }"
                              >
                                {{ (form.og_title || '').length }}/90
                              </span>
                            </div>
                            <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                              <div
                                class="h-full transition-all duration-300 rounded-full"
                                :class="{
                                  'bg-[#EF4444]': (form.og_title || '').length > 90,
                                  'bg-[#F59E0B]': (form.og_title || '').length > 0 && (form.og_title || '').length < 40,
                                  'bg-[#10B981]': (form.og_title || '').length >= 60 && (form.og_title || '').length <= 90,
                                  'bg-[#3B82F6]': (form.og_title || '').length >= 40 && (form.og_title || '').length < 60,
                                }"
                                :style="{ width: `${Math.min(((form.og_title || '').length / 90) * 100, 100)}%` }"
                              ></div>
                            </div>
                          </div>
                          <!-- Preview авто-генерации -->
                          <div
                            v-if="!(form.og_title || '').length && (form.seo_title || form.name)"
                            class="p-2 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-lg"
                          >
                            <p class="text-xs text-[#9CA3AF]">
                              💡 <span class="text-[#3B82F6]">Будет использовано:</span>
                              <span class="text-[#E5E7EB]">{{ form.seo_title || generateAutoOgTitle() }}</span>
                            </p>
                          </div>
                        </div>

                        <!-- OG Description -->
                        <div class="space-y-2">
                          <div class="flex items-center justify-between">
                            <label class="block text-sm font-medium text-[#E5E7EB]">
                              OG Description
                              <span class="text-[#3B82F6] ml-1 text-xs">(150-250 символов)</span>
                            </label>
                            <button
                              type="button"
                              @click="copyFromSeoDescription"
                              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#3B82F6]/20 text-[#3B82F6] hover:bg-[#3B82F6]/30 border border-[#3B82F6]/30 transition-all duration-200"
                              title="Копировать из SEO Description"
                            >
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                              </svg>
                              Из SEO Description
                            </button>
                          </div>
                          <textarea
                            v-model="form.og_description"
                            rows="3"
                            placeholder="Автоматически из SEO описания"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200 resize-none"
                            :class="{
                              'border-[#EF4444]/50': (form.og_description || '').length > 250,
                              'border-[#F59E0B]/50': (form.og_description || '').length > 0 && (form.og_description || '').length < 100,
                              'border-[#10B981]/50': (form.og_description || '').length >= 150 && (form.og_description || '').length <= 250,
                            }"
                            maxlength="300"
                          ></textarea>
                          <!-- Индикатор длины -->
                          <div class="space-y-1.5">
                            <div class="flex justify-between text-xs">
                              <div class="flex items-center gap-2">
                                <span class="text-[#9CA3AF]">Рекомендуется: 150-250 символов</span>
                                <span v-if="(form.og_description || '').length > 0 && (form.og_description || '').length < 100" class="text-[#F59E0B]">
                                  ⚠️ Слишком короткий
                                </span>
                              </div>
                              <span
                                class="font-medium"
                                :class="{
                                  'text-[#EF4444]': (form.og_description || '').length > 250,
                                  'text-[#F59E0B]': (form.og_description || '').length > 0 && (form.og_description || '').length < 100,
                                  'text-[#10B981]': (form.og_description || '').length >= 150 && (form.og_description || '').length <= 250,
                                  'text-[#3B82F6]': (form.og_description || '').length >= 100 && (form.og_description || '').length < 150,
                                }"
                              >
                                {{ (form.og_description || '').length }}/250
                              </span>
                            </div>
                            <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                              <div
                                class="h-full transition-all duration-300 rounded-full"
                                :class="{
                                  'bg-[#EF4444]': (form.og_description || '').length > 250,
                                  'bg-[#F59E0B]': (form.og_description || '').length > 0 && (form.og_description || '').length < 100,
                                  'bg-[#10B981]': (form.og_description || '').length >= 150 && (form.og_description || '').length <= 250,
                                  'bg-[#3B82F6]': (form.og_description || '').length >= 100 && (form.og_description || '').length < 150,
                                }"
                                :style="{ width: `${Math.min(((form.og_description || '').length / 250) * 100, 100)}%` }"
                              ></div>
                            </div>
                          </div>
                          <!-- Preview авто-генерации -->
                          <div
                            v-if="!(form.og_description || '').length && (form.seo_description || form.name)"
                            class="p-2 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-lg"
                          >
                            <p class="text-xs text-[#9CA3AF]">
                              💡 <span class="text-[#3B82F6]">Будет использовано:</span>
                              <span class="text-[#E5E7EB]">{{ form.seo_description || generateAutoOgDescription() }}</span>
                            </p>
                          </div>
                        </div>

                        <!-- OG Image с preview -->
                        <div class="space-y-2">
                          <div class="flex items-center justify-between">
                            <label class="block text-sm font-medium text-[#E5E7EB]">
                              OG Изображение
                              <span class="text-[#3B82F6] ml-1 text-xs">(1200×630 px)</span>
                            </label>
                            <button
                              type="button"
                              @click="copyFromMainImage"
                              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#3B82F6]/20 text-[#3B82F6] hover:bg-[#3B82F6]/30 border border-[#3B82F6]/30 transition-all duration-200"
                              title="Копировать из основного изображения"
                            >
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              Из слота
                            </button>
                          </div>
                          <input
                            v-model="form.og_image"
                            type="url"
                            placeholder="Автоматически из основного изображения слота"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200"
                          />
                          <!-- Image Preview -->
                          <div
                            v-if="getOgImageUrl()"
                            class="relative aspect-[1200/630] max-w-md bg-[#1B1E26] border border-[#353A4A] rounded-lg overflow-hidden"
                          >
                            <img
                              :src="getOgImageUrl()"
                              :alt="form.og_title || form.name || 'OG Preview'"
                              class="w-full h-full object-cover"
                              @error="handleOgImageError"
                            />
                            <div class="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                              1200 × 630 px (рекомендуется)
                            </div>
                          </div>
                          <p class="text-xs text-[#9CA3AF]">
                            Рекомендуемый размер: 1200×630 пикселей для оптимального отображения
                          </p>
                        </div>

                        <!-- OG Type & Locale Row -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <!-- OG Type -->
                          <div class="space-y-2">
                            <label class="block text-sm font-medium text-[#E5E7EB]">
                              OG Type
                            </label>
                            <select
                              v-model="form.og_type"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Автоматически (article)</option>
                              <option value="article">Article</option>
                              <option value="website">Website</option>
                              <option value="game">Game</option>
                              <option value="product">Product</option>
                            </select>
                            <p class="text-xs text-[#9CA3AF]">
                              Тип контента для Facebook/LinkedIn
                            </p>
                          </div>

                          <!-- OG Locale -->
                          <div class="space-y-2">
                            <label class="block text-sm font-medium text-[#E5E7EB]">
                              OG Locale
                            </label>
                            <select
                              v-model="form.og_locale"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Автоматически (en_US)</option>
                              <option value="en_US">English (US)</option>
                              <option value="en_GB">English (UK)</option>
                              <option value="ru_RU">Русский</option>
                              <option value="pt_BR">Português (Brasil)</option>
                              <option value="es_ES">Español</option>
                              <option value="de_DE">Deutsch</option>
                              <option value="fr_FR">Français</option>
                              <option value="tr_TR">Türkçe</option>
                            </select>
                            <p class="text-xs text-[#9CA3AF]">
                              Язык контента для соцсетей
                            </p>
                          </div>
                        </div>

                        <!-- OG Video (опционально) -->
                        <div class="space-y-2">
                          <label class="block text-sm font-medium text-[#E5E7EB]">
                            🎬 OG Video (опционально)
                          </label>
                          <input
                            v-model="form.og_video"
                            type="url"
                            placeholder="https://youtube.com/embed/... или прямая ссылка на видео"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200"
                          />
                          <p class="text-xs text-[#9CA3AF]">
                            Ссылка на видео для автопроигрывания в соцсетях (Facebook, LinkedIn)
                          </p>
                        </div>

                        <!-- 📱 Social Preview Cards (Фаза 2) -->
                        <div class="border-t border-[#353A4A] pt-6">
                          <SocialPreviewCards
                            :og-title="form.og_title || form.seo_title || generateAutoOgTitle()"
                            :og-description="form.og_description || form.seo_description || generateAutoOgDescription()"
                            :og-image="form.og_image || form.image_url"
                            :twitter-title="form.twitter_title"
                            :twitter-description="form.twitter_description"
                            :twitter-image="form.twitter_image"
                            :page-url="`/slots/${form.slug}`"
                            v-model:hashtags="form.social_custom_hashtags"
                            v-model:cta-text="form.social_cta_text"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Twitter Card -->
                    <div
                      class="group bg-gradient-to-r from-[#1DA1F2]/10 to-[#0D8BD9]/10 border border-[#1DA1F2]/20 rounded-xl p-6 hover:border-[#1DA1F2]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#1DA1F2] to-[#0D8BD9] rounded-xl flex items-center justify-center"
                          >
                            <svg
                              class="w-6 h-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Twitter Card
                            </h3>
                            <p class="text-sm text-[#1DA1F2]">
                              Настройки для отображения в Twitter/X
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showTwitterSection = !showTwitterSection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#1DA1F2]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showTwitterSection"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{ 'rotate-180': showTwitterSection }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          {{ showTwitterSection ? 'Hide' : 'Show' }}
                        </button>
                      </div>

                      <div v-show="showTwitterSection" class="space-y-6">
                        <!-- 📊 Twitter Score Indicator -->
                        <div class="bg-gradient-to-r from-[#1B1E26] to-[#1B1E26]/80 border border-[#353A4A] rounded-xl p-4">
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center gap-2">
                              <div class="w-8 h-8 bg-gradient-to-br from-[#1DA1F2] to-[#0D8BD9] rounded-lg flex items-center justify-center">
                                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                              </div>
                              <div>
                                <h4 class="text-sm font-medium text-[#E5E7EB]">Twitter Score</h4>
                                <p class="text-xs text-[#9CA3AF]">Качество Twitter Card</p>
                              </div>
                            </div>
                            <div class="flex items-center gap-3">
                              <div
                                class="relative w-14 h-14 rounded-full flex items-center justify-center"
                                :class="{
                                  'bg-[#EF4444]/20': calculateTwitterScore() < 40,
                                  'bg-[#F59E0B]/20': calculateTwitterScore() >= 40 && calculateTwitterScore() < 70,
                                  'bg-[#1DA1F2]/20': calculateTwitterScore() >= 70,
                                }"
                              >
                                <span
                                  class="text-lg font-bold"
                                  :class="{
                                    'text-[#EF4444]': calculateTwitterScore() < 40,
                                    'text-[#F59E0B]': calculateTwitterScore() >= 40 && calculateTwitterScore() < 70,
                                    'text-[#1DA1F2]': calculateTwitterScore() >= 70,
                                  }"
                                >{{ calculateTwitterScore() }}%</span>
                              </div>
                            </div>
                          </div>

                          <!-- Score Details Grid -->
                          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Title</span>
                                <span :class="getTwitterTitleLen() >= 40 && getTwitterTitleLen() <= 70 ? 'text-[#10B981]' : 'text-[#F59E0B]'">
                                  {{ getTwitterTitleLen() >= 40 && getTwitterTitleLen() <= 70 ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all"
                                  :class="getTwitterTitleLen() >= 40 && getTwitterTitleLen() <= 70 ? 'bg-[#10B981]' : 'bg-[#F59E0B]'"
                                  :style="{ width: `${Math.min((getTwitterTitleLen() / 70) * 100, 100)}%` }"
                                ></div>
                              </div>
                            </div>

                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Description</span>
                                <span :class="getTwitterDescLen() >= 100 && getTwitterDescLen() <= 200 ? 'text-[#10B981]' : 'text-[#F59E0B]'">
                                  {{ getTwitterDescLen() >= 100 && getTwitterDescLen() <= 200 ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all"
                                  :class="getTwitterDescLen() >= 100 && getTwitterDescLen() <= 200 ? 'bg-[#10B981]' : 'bg-[#F59E0B]'"
                                  :style="{ width: `${Math.min((getTwitterDescLen() / 200) * 100, 100)}%` }"
                                ></div>
                              </div>
                            </div>

                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Image</span>
                                <span :class="getTwitterImageUrl() ? 'text-[#10B981]' : 'text-[#EF4444]'">
                                  {{ getTwitterImageUrl() ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all"
                                  :class="getTwitterImageUrl() ? 'bg-[#10B981]' : 'bg-[#EF4444]'"
                                  :style="{ width: getTwitterImageUrl() ? '100%' : '0%' }"
                                ></div>
                              </div>
                            </div>

                            <div class="bg-[#1B1E26] border border-[#353A4A]/50 rounded-lg p-2">
                              <div class="flex items-center justify-between mb-1">
                                <span class="text-[#9CA3AF]">Card</span>
                                <span :class="form.twitter_card === 'summary_large_image' ? 'text-[#10B981]' : 'text-[#F59E0B]'">
                                  {{ form.twitter_card === 'summary_large_image' ? '✓' : '!' }}
                                </span>
                              </div>
                              <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                                <div
                                  class="h-full rounded-full transition-all bg-[#10B981]"
                                  :style="{ width: form.twitter_card ? '100%' : '50%' }"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Twitter Card Type -->
                        <div class="space-y-2">
                          <label class="block text-sm font-medium text-[#E5E7EB]">
                            Тип карточки
                            <span class="text-[#1DA1F2] ml-1 text-xs">(рекомендуется: Large Image)</span>
                          </label>
                          <select
                            v-model="form.twitter_card"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-200"
                            :class="{
                              'border-[#10B981]/50': form.twitter_card === 'summary_large_image',
                              'border-[#F59E0B]/50': form.twitter_card === 'summary',
                            }"
                          >
                            <option value="summary">Summary (маленькое изображение)</option>
                            <option value="summary_large_image">Summary Large Image (рекомендуется)</option>
                            <option value="app">App</option>
                            <option value="player">Player (видео)</option>
                          </select>
                          <p class="text-xs text-[#9CA3AF]">
                            🎯 Summary Large Image обеспечивает максимальную видимость в ленте
                          </p>
                        </div>

                        <!-- Twitter Title -->
                        <div class="space-y-2">
                          <div class="flex items-center justify-between">
                            <label class="block text-sm font-medium text-[#E5E7EB]">
                              Twitter Title
                              <span class="text-[#1DA1F2] ml-1 text-xs">(40-70 символов)</span>
                            </label>
                            <button
                              type="button"
                              @click="copyFromOgTitle"
                              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1DA1F2]/20 text-[#1DA1F2] hover:bg-[#1DA1F2]/30 border border-[#1DA1F2]/30 transition-all duration-200"
                              title="Копировать из OG Title"
                            >
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                              </svg>
                              Из OG Title
                            </button>
                          </div>
                          <input
                            v-model="form.twitter_title"
                            type="text"
                            placeholder="Автоматически из OG/SEO заголовка"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-200"
                            :class="{
                              'border-[#EF4444]/50': (form.twitter_title || '').length > 70,
                              'border-[#F59E0B]/50': (form.twitter_title || '').length > 0 && (form.twitter_title || '').length < 30,
                              'border-[#10B981]/50': (form.twitter_title || '').length >= 40 && (form.twitter_title || '').length <= 70,
                            }"
                            maxlength="100"
                          />
                          <!-- Индикатор длины -->
                          <div class="space-y-1.5">
                            <div class="flex justify-between text-xs">
                              <div class="flex items-center gap-2">
                                <span class="text-[#9CA3AF]">Рекомендуется: 40-70 символов</span>
                                <span v-if="(form.twitter_title || '').length > 0 && (form.twitter_title || '').length < 30" class="text-[#F59E0B]">
                                  ⚠️ Слишком короткий
                                </span>
                              </div>
                              <span
                                class="font-medium"
                                :class="{
                                  'text-[#EF4444]': (form.twitter_title || '').length > 70,
                                  'text-[#F59E0B]': (form.twitter_title || '').length > 0 && (form.twitter_title || '').length < 30,
                                  'text-[#10B981]': (form.twitter_title || '').length >= 40 && (form.twitter_title || '').length <= 70,
                                  'text-[#1DA1F2]': (form.twitter_title || '').length >= 30 && (form.twitter_title || '').length < 40,
                                }"
                              >
                                {{ (form.twitter_title || '').length }}/70
                              </span>
                            </div>
                            <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                              <div
                                class="h-full transition-all duration-300 rounded-full"
                                :class="{
                                  'bg-[#EF4444]': (form.twitter_title || '').length > 70,
                                  'bg-[#F59E0B]': (form.twitter_title || '').length > 0 && (form.twitter_title || '').length < 30,
                                  'bg-[#10B981]': (form.twitter_title || '').length >= 40 && (form.twitter_title || '').length <= 70,
                                  'bg-[#1DA1F2]': (form.twitter_title || '').length >= 30 && (form.twitter_title || '').length < 40,
                                }"
                                :style="{ width: `${Math.min(((form.twitter_title || '').length / 70) * 100, 100)}%` }"
                              ></div>
                            </div>
                          </div>
                          <!-- Preview авто-генерации -->
                          <div
                            v-if="!(form.twitter_title || '').length && (form.og_title || form.seo_title || form.name)"
                            class="p-2 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-lg"
                          >
                            <p class="text-xs text-[#9CA3AF]">
                              💡 <span class="text-[#1DA1F2]">Будет использовано:</span>
                              <span class="text-[#E5E7EB]">{{ form.og_title || form.seo_title || generateAutoTitle() }}</span>
                            </p>
                          </div>
                        </div>

                        <!-- Twitter Description -->
                        <div class="space-y-2">
                          <div class="flex items-center justify-between">
                            <label class="block text-sm font-medium text-[#E5E7EB]">
                              Twitter Description
                              <span class="text-[#1DA1F2] ml-1 text-xs">(100-200 символов)</span>
                            </label>
                            <button
                              type="button"
                              @click="copyFromOgDescription"
                              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1DA1F2]/20 text-[#1DA1F2] hover:bg-[#1DA1F2]/30 border border-[#1DA1F2]/30 transition-all duration-200"
                              title="Копировать из OG Description"
                            >
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                              </svg>
                              Из OG Description
                            </button>
                          </div>
                          <textarea
                            v-model="form.twitter_description"
                            rows="3"
                            placeholder="Автоматически из OG/SEO описания"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-200 resize-none"
                            :class="{
                              'border-[#EF4444]/50': (form.twitter_description || '').length > 200,
                              'border-[#F59E0B]/50': (form.twitter_description || '').length > 0 && (form.twitter_description || '').length < 80,
                              'border-[#10B981]/50': (form.twitter_description || '').length >= 100 && (form.twitter_description || '').length <= 200,
                            }"
                            maxlength="300"
                          ></textarea>
                          <!-- Индикатор длины -->
                          <div class="space-y-1.5">
                            <div class="flex justify-between text-xs">
                              <div class="flex items-center gap-2">
                                <span class="text-[#9CA3AF]">Рекомендуется: 100-200 символов</span>
                                <span v-if="(form.twitter_description || '').length > 0 && (form.twitter_description || '').length < 80" class="text-[#F59E0B]">
                                  ⚠️ Слишком короткий
                                </span>
                              </div>
                              <span
                                class="font-medium"
                                :class="{
                                  'text-[#EF4444]': (form.twitter_description || '').length > 200,
                                  'text-[#F59E0B]': (form.twitter_description || '').length > 0 && (form.twitter_description || '').length < 80,
                                  'text-[#10B981]': (form.twitter_description || '').length >= 100 && (form.twitter_description || '').length <= 200,
                                  'text-[#1DA1F2]': (form.twitter_description || '').length >= 80 && (form.twitter_description || '').length < 100,
                                }"
                              >
                                {{ (form.twitter_description || '').length }}/200
                              </span>
                            </div>
                            <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
                              <div
                                class="h-full transition-all duration-300 rounded-full"
                                :class="{
                                  'bg-[#EF4444]': (form.twitter_description || '').length > 200,
                                  'bg-[#F59E0B]': (form.twitter_description || '').length > 0 && (form.twitter_description || '').length < 80,
                                  'bg-[#10B981]': (form.twitter_description || '').length >= 100 && (form.twitter_description || '').length <= 200,
                                  'bg-[#1DA1F2]': (form.twitter_description || '').length >= 80 && (form.twitter_description || '').length < 100,
                                }"
                                :style="{ width: `${Math.min(((form.twitter_description || '').length / 200) * 100, 100)}%` }"
                              ></div>
                            </div>
                          </div>
                          <!-- Preview авто-генерации -->
                          <div
                            v-if="!(form.twitter_description || '').length && (form.og_description || form.seo_description || form.name)"
                            class="p-2 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-lg"
                          >
                            <p class="text-xs text-[#9CA3AF]">
                              💡 <span class="text-[#1DA1F2]">Будет использовано:</span>
                              <span class="text-[#E5E7EB]">{{ form.og_description || form.seo_description || generateAutoDescription() }}</span>
                            </p>
                          </div>
                        </div>

                        <!-- Twitter Image с preview -->
                        <div class="space-y-2">
                          <div class="flex items-center justify-between">
                            <label class="block text-sm font-medium text-[#E5E7EB]">
                              Twitter Изображение
                              <span class="text-[#1DA1F2] ml-1 text-xs">(1200×628 px)</span>
                            </label>
                            <button
                              type="button"
                              @click="copyFromOgImage"
                              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1DA1F2]/20 text-[#1DA1F2] hover:bg-[#1DA1F2]/30 border border-[#1DA1F2]/30 transition-all duration-200"
                              title="Копировать из OG Image"
                            >
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              Из OG Image
                            </button>
                          </div>
                          <input
                            v-model="form.twitter_image"
                            type="url"
                            placeholder="Автоматически из Open Graph изображения"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-200"
                          />
                          <!-- Image Preview -->
                          <div
                            v-if="getTwitterImageUrl()"
                            class="relative aspect-[1200/628] max-w-md bg-[#1B1E26] border border-[#353A4A] rounded-lg overflow-hidden"
                          >
                            <img
                              :src="getTwitterImageUrl()"
                              :alt="form.twitter_title || form.name || 'Twitter Preview'"
                              class="w-full h-full object-cover"
                              @error="handleTwitterImageError"
                            />
                            <div class="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                              1200 × 628 px (соотношение 1.91:1)
                            </div>
                          </div>
                          <p class="text-xs text-[#9CA3AF]">
                            Рекомендуемый размер: 1200×628 пикселей (соотношение 1.91:1)
                          </p>
                        </div>

                        <!-- Twitter Site & Creator Row -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <!-- Twitter Site -->
                          <div class="space-y-2">
                            <label class="block text-sm font-medium text-[#E5E7EB]">
                              Twitter аккаунт сайта
                            </label>
                            <input
                              v-model="form.twitter_site"
                              type="text"
                              placeholder="@slotquest"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-200"
                            />
                            <p class="text-xs text-[#9CA3AF]">
                              Twitter username сайта (с @)
                            </p>
                          </div>

                          <!-- Twitter Creator -->
                          <div class="space-y-2">
                            <label class="block text-sm font-medium text-[#E5E7EB]">
                              Twitter автора
                            </label>
                            <input
                              v-model="form.twitter_creator"
                              type="text"
                              placeholder="@author"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-200"
                            />
                            <p class="text-xs text-[#9CA3AF]">
                              Twitter username автора (с @)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Технический SEO -->
                    <div
                      class="group bg-gradient-to-r from-[#059669]/10 to-[#047857]/10 border border-[#059669]/20 rounded-xl p-6 hover:border-[#059669]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#059669] to-[#047857] rounded-xl flex items-center justify-center"
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
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Технический SEO
                            </h3>
                            <p class="text-sm text-[#059669]">
                              Дополнительные настройки для поисковой оптимизации
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showTechnicalSeoSection = !showTechnicalSeoSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#059669]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showTechnicalSeoSection"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{ 'rotate-180': showTechnicalSeoSection }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          {{ showTechnicalSeoSection ? 'Hide' : 'Show' }}
                        </button>
                      </div>

                      <div v-show="showTechnicalSeoSection" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <!-- Robots Meta -->
                          <div
                            class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                          >
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-3"
                            >
                              Robots Meta
                            </label>
                            <select
                              v-model="form.robots_meta"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                            >
                              <option value="index, follow">
                                index, follow (по умолчанию)
                              </option>
                              <option value="noindex, follow">
                                noindex, follow
                              </option>
                              <option value="index, nofollow">
                                index, nofollow
                              </option>
                              <option value="noindex, nofollow">
                                noindex, nofollow
                              </option>
                            </select>
                            <p class="text-xs text-[#9CA3AF] mt-2">
                              Указания для поисковых роботов
                            </p>
                          </div>

                          <!-- Viewport -->
                          <div
                            class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                          >
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-3"
                            >
                              Viewport
                            </label>
                            <input
                              v-model="form.viewport_meta"
                              type="text"
                              placeholder="width=device-width, initial-scale=1"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                            />
                            <p class="text-xs text-[#9CA3AF] mt-2">
                              Настройки отображения на мобильных устройствах
                            </p>
                          </div>

                          <!-- Charset -->
                          <div
                            class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                          >
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-3"
                            >
                              Кодировка
                            </label>
                            <select
                              v-model="form.charset_meta"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                            >
                              <option value="UTF-8">
                                UTF-8 (рекомендуется)
                              </option>
                              <option value="ISO-8859-1">ISO-8859-1</option>
                              <option value="Windows-1251">Windows-1251</option>
                            </select>
                            <p class="text-xs text-[#9CA3AF] mt-2">
                              Кодировка символов страницы
                            </p>
                          </div>

                          <!-- Language -->
                          <div
                            class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                          >
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-3"
                            >
                              Язык страницы
                            </label>
                            <select
                              v-model="form.language_meta"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                            >
                              <option value="ru">Русский (ru)</option>
                              <option value="en">English (en)</option>
                              <option value="uk">Українська (uk)</option>
                              <option value="kk">Қазақша (kk)</option>
                            </select>
                            <p class="text-xs text-[#9CA3AF] mt-2">
                              Основной язык контента страницы
                            </p>
                          </div>
                        </div>

                        <!-- Дополнительные мета-теги -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <h4
                            class="text-md font-medium text-[#E5E7EB] mb-4 flex items-center gap-2"
                          >
                            <svg
                              class="w-4 h-4 text-[#059669]"
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
                            Дополнительные мета-теги
                          </h4>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Author -->
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Автор
                              </label>
                              <input
                                v-model="form.author_meta"
                                type="text"
                                placeholder="SlotQuest Team"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>

                            <!-- Copyright -->
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Авторские права
                              </label>
                              <input
                                v-model="form.copyright_meta"
                                type="text"
                                placeholder="© 2025 SlotQuest. Все права защищены."
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>

                            <!-- Generator -->
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Генератор
                              </label>
                              <input
                                v-model="form.generator_meta"
                                type="text"
                                placeholder="Nuxt.js"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>

                            <!-- Theme Color -->
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Цвет темы
                              </label>
                              <input
                                v-model="form.theme_color_meta"
                                type="color"
                                class="w-full h-10 bg-[#1B1E26] border border-[#353A4A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- 🌍 Technical SEO Component (Hreflang + Robots + Canonical) -->
                        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
                          <AdminTechnicalSEO
                            :slug="form.slug"
                            v-model="technicalSeoForm"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- JSON-LD Схемы -->
                    <div
                      class="group bg-gradient-to-r from-[#8B5CF6]/10 to-[#7C3AED]/10 border border-[#8B5CF6]/20 rounded-xl p-6 hover:border-[#8B5CF6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center"
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
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              JSON-LD Схемы
                            </h3>
                            <p class="text-sm text-[#8B5CF6]">
                              Структурированные данные для поисковых систем
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center gap-3">
                          <!-- Toggle JSON-LD -->
                          <label class="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              v-model="jsonLdForm.jsonld_enabled"
                              class="sr-only peer"
                            />
                            <div class="w-11 h-6 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5CF6]"></div>
                            <span class="ml-2 text-xs font-medium" :class="jsonLdForm.jsonld_enabled ? 'text-[#8B5CF6]' : 'text-[#9CA3AF]'">
                              {{ jsonLdForm.jsonld_enabled ? 'ON' : 'OFF' }}
                            </span>
                          </label>
                          <!-- Auto-Generate Button -->
                          <button
                            v-if="jsonLdForm.jsonld_enabled"
                            type="button"
                            @click="autoGenerateJsonLd"
                            class="px-3 py-1.5 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] text-white rounded-lg text-xs hover:opacity-90 transition-all font-medium"
                          >
                            🪄 Авто
                          </button>
                          <!-- Show/Hide Button -->
                          <button
                            type="button"
                            @click="showJsonLdSection = !showJsonLdSection"
                            class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#8B5CF6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                            :aria-expanded="showJsonLdSection"
                          >
                            <svg
                              class="w-3 h-3 transform transition-transform duration-200"
                              :class="{ 'rotate-180': showJsonLdSection }"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                            {{ showJsonLdSection ? 'Hide' : 'Show' }}
                          </button>
                        </div>
                      </div>

                      <div v-show="showJsonLdSection" class="space-y-6">
                        <!-- 🎯 НОВЫЙ JSON-LD Editor Component -->
                        <JsonLdEditor
                          :slot-id="slot?.id || ''"
                          :slot-name="form.name || ''"
                          v-model="jsonLdForm"
                        />
                      </div>
                    </div>

                    <!-- ========== ФАЗА 3: АНАЛИТИКА И ПРОИЗВОДИТЕЛЬНОСТЬ ========== -->

                    <!-- SEO Health Score -->
                    <div
                      class="group bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[#3B82F6]/20 rounded-xl p-6 hover:border-[#3B82F6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div class="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center">
                            <span class="text-2xl">🏥</span>
                          </div>
                          <div>
                            <h3 class="text-lg font-medium text-[#E5E7EB] font-display">
                              SEO Health Score
                            </h3>
                            <p class="text-sm text-[#3B82F6]">
                              Общая оценка SEO здоровья страницы
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showSEOHealthSection = !showSEOHealthSection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#3B82F6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{ 'rotate-180': showSEOHealthSection }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                          <span>{{ showSEOHealthSection ? 'Свернуть' : 'Развернуть' }}</span>
                        </button>
                      </div>
                      <div v-show="showSEOHealthSection" class="space-y-6">
                        <SEOHealthScore
                          v-model="seoHealthForm"
                          :seo-title="form.seo_title"
                          :seo-description="form.seo_description"
                          :canonical-url="form.canonical_url"
                          :og-title="form.og_title"
                          :og-image="form.og_image"
                        />
                      </div>
                    </div>

                    <!-- Keyword Density Checker -->
                    <div
                      class="group bg-gradient-to-r from-[#EC4899]/10 to-[#DB2777]/10 border border-[#EC4899]/20 rounded-xl p-6 hover:border-[#EC4899]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div class="w-12 h-12 bg-gradient-to-br from-[#EC4899] to-[#DB2777] rounded-xl flex items-center justify-center">
                            <span class="text-2xl">🔍</span>
                          </div>
                          <div>
                            <h3 class="text-lg font-medium text-[#E5E7EB] font-display">
                              Keyword Density Checker
                            </h3>
                            <p class="text-sm text-[#EC4899]">
                              Анализ плотности ключевых слов
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showKeywordDensitySection = !showKeywordDensitySection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#EC4899]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{ 'rotate-180': showKeywordDensitySection }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                          <span>{{ showKeywordDensitySection ? 'Свернуть' : 'Развернуть' }}</span>
                        </button>
                      </div>
                      <div v-show="showKeywordDensitySection" class="space-y-6">
                        <KeywordDensityChecker
                          :slot-name="form.name"
                          :description="form.description"
                          :content="form.seo_description"
                          :seo-title="form.seo_title"
                          :seo-description="form.seo_description"
                          :keywords="form.seo_keywords_primary"
                          :keywords-geo="form.seo_keywords_geo"
                          :keywords-lsi="form.seo_keywords_lsi"
                          :keywords-longtail="form.seo_keywords_longtail"
                          @update:analysisResult="form.keyword_analysis_result = $event"
                          @update:densityScore="form.keyword_density_score = $event"
                          @update:geoKeywords="form.seo_keywords_geo = $event"
                        />
                      </div>
                    </div>

                    <!-- Indexing Status -->
                    <div
                      class="group bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 border border-[#6366F1]/20 rounded-xl p-6 hover:border-[#6366F1]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div class="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center">
                            <span class="text-2xl">📊</span>
                          </div>
                          <div>
                            <h3 class="text-lg font-medium text-[#E5E7EB] font-display">
                              Indexing Status
                            </h3>
                            <p class="text-sm text-[#6366F1]">
                              Статус индексации в поисковых системах
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showIndexingStatusSection = !showIndexingStatusSection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#6366F1]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{ 'rotate-180': showIndexingStatusSection }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                          <span>{{ showIndexingStatusSection ? 'Свернуть' : 'Развернуть' }}</span>
                        </button>
                      </div>
                      <div v-show="showIndexingStatusSection" class="space-y-6">
                        <IndexingStatus
                          v-model="indexingForm"
                          :page-url="getSlotPageUrl()"
                          :site-url="getSiteUrl()"
                        />
                      </div>
                    </div>

                    <!-- Page Speed Metrics -->
                    <div
                      class="group bg-gradient-to-r from-[#F59E0B]/10 to-[#EF4444]/10 border border-[#F59E0B]/20 rounded-xl p-6 hover:border-[#F59E0B]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div class="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl flex items-center justify-center">
                            <span class="text-2xl">⚡</span>
                          </div>
                          <div>
                            <h3 class="text-lg font-medium text-[#E5E7EB] font-display">
                              Core Web Vitals
                            </h3>
                            <p class="text-sm text-[#F59E0B]">
                              Метрики производительности страницы
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showPageSpeedSection = !showPageSpeedSection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#F59E0B]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{ 'rotate-180': showPageSpeedSection }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                          <span>{{ showPageSpeedSection ? 'Свернуть' : 'Развернуть' }}</span>
                        </button>
                      </div>
                      <div v-show="showPageSpeedSection" class="space-y-6">
                        <PageSpeedMetrics
                          v-model="pageSpeedForm"
                          :page-url="getSlotPageUrl()"
                        />
                      </div>
                    </div>

                    <!-- Sitemap Configuration -->
                    <div
                      class="group bg-gradient-to-r from-[#10B981]/10 to-[#34D399]/10 border border-[#10B981]/20 rounded-xl p-6 hover:border-[#10B981]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center">
                            <span class="text-2xl">🗺️</span>
                          </div>
                          <div>
                            <h3 class="text-lg font-medium text-[#E5E7EB] font-display">
                              Sitemap Configuration
                            </h3>
                            <p class="text-sm text-[#10B981]">
                              Настройки XML карты сайта
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showSitemapSection = !showSitemapSection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#10B981]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                        >
                          <svg
                            class="w-3 h-3 transform transition-transform duration-200"
                            :class="{ 'rotate-180': showSitemapSection }"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                          <span>{{ showSitemapSection ? 'Свернуть' : 'Развернуть' }}</span>
                        </button>
                      </div>
                      <div v-show="showSitemapSection" class="space-y-6">
                        <SitemapConfig
                          v-model="sitemapForm"
                          :page-url="getSlotPageUrl()"
                          :slot-name="form.name"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </form>

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
                        {{ form.name || 'Name слота' }}
                      </h1>

                      <p
                        class="text-white/80 text-sm lg:text-base mb-4 line-clamp-3"
                      >
                        {{
                          form.description ||
                          'Description слота будет отображаться здесь...'
                        }}
                      </p>

                      <!-- Action buttons -->
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

            <!-- Правая панель: Навигация и Предпросмотр -->
            <div class="lg:col-span-1">
              <div class="sticky top-24 space-y-6">
                <!-- Навигация по секциям -->
                <div
                  class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-6 border border-[#353A4A]"
                >
                  <h3
                    class="text-lg font-bold text-[#E5E7EB] mb-4 flex items-center gap-2"
                  >
                    <svg
                      class="w-5 h-5 text-[#FF6E48]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      ></path>
                    </svg>
                    Навигация по секциям
                  </h3>

                  <!-- Поисковая строка -->
                  <div class="mb-4 relative">
                    <input
                      ref="searchInput"
                      v-model="searchQuery"
                      @input="handleSearch"
                      @keydown="handleSearchKeydown"
                      placeholder="Поиск по секциям... (Ctrl+F)"
                      class="w-full px-4 py-2 pl-10 pr-10 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all duration-200 text-sm"
                    />
                    <svg
                      class="w-4 h-4 absolute left-3 top-3 text-[#9CA3AF]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <!-- Счетчик результатов -->
                    <div
                      v-if="searchQuery && searchResults.length > 0"
                      class="absolute right-3 top-2 text-xs text-[#9CA3AF] bg-[#353A4A] px-2 py-1 rounded"
                    >
                      {{ currentSearchIndex + 1 }}/{{ searchResults.length }}
                    </div>
                    <!-- Кнопка очистки -->
                    <button
                      v-if="searchQuery"
                      @click="clearSearch"
                      class="absolute right-3 top-3 text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Результаты поиска -->
                  <div
                    v-if="searchQuery && searchResults.length === 0"
                    class="mb-4 p-3 bg-[#353A4A]/30 rounded-lg border border-[#353A4A]"
                  >
                    <div class="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Ничего не найдено
                    </div>
                  </div>
                  <div class="space-y-2">
                    <!-- Главная Hero секция (коллапсируемая) -->
                    <button
                      @click="showHeroSection = !showHeroSection"
                      class="w-full text-left flex items-center justify-between p-3 rounded-lg border border-[#353A4A]/50 bg-[#1B1E26]/50 hover:bg-[#353A4A]/30 hover:border-purple-400/40 transition-all duration-200"
                      :class="
                        showHeroSection
                          ? 'border-purple-400/40 bg-purple-500/10'
                          : ''
                      "
                    >
                      <span
                        class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]"
                      >
                        <svg
                          class="w-4 h-4 text-purple-400"
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
                        Hero секция
                      </span>
                      <svg
                        class="w-4 h-4 text-gray-400 transition-transform"
                        :class="{ 'rotate-180': !showHeroSection }"
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
                    </button>

                    <!-- Подразделы Hero секции (показываются только если Hero открыт) -->
                    <div
                      v-show="showHeroSection"
                      class="ml-4 space-y-1 border-l-2 border-purple-400/20 pl-3"
                    >
                      <button
                        @click="scrollToSection('basic-info')"
                        class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                      >
                        Основная информация
                      </button>
                      <button
                        @click="scrollToSection('hero-links')"
                        class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                      >
                        Hero ссылки
                      </button>
                      <button
                        @click="scrollToSection('game-characteristics')"
                        class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                      >
                        Характеристики игры
                      </button>
                      <button
                        @click="scrollToSection('rating-popularity')"
                        class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                      >
                        Рейтинг и популярность
                      </button>
                      <button
                        @click="scrollToSection('game-mechanics')"
                        class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                      >
                        Игровые механики
                      </button>
                      <button
                        @click="scrollToSection('bonuses')"
                        class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                      >
                        Бонусы
                      </button>
                      <button
                        @click="scrollToSection('themes')"
                        class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                      >
                        Тематики
                      </button>
                    </div>

                    <!-- 👤 Секция "Информация об авторе" (отдельный блок) -->
                    <button
                      @click="scrollToSection('author-info'); showAuthorSection = !showAuthorSection"
                      class="w-full text-left flex items-center justify-between p-3 rounded-lg border border-[#353A4A]/50 bg-[#1B1E26]/50 hover:bg-[#353A4A]/30 hover:border-[#8B5CF6]/40 transition-all duration-200"
                      :class="showAuthorSection ? 'border-[#8B5CF6]/40 bg-[#8B5CF6]/10' : ''"
                    >
                      <span class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
                        <svg class="w-4 h-4 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Информация об авторе
                      </span>
                      <svg
                        class="w-4 h-4 text-gray-400 transition-transform"
                        :class="{ 'rotate-180': !showAuthorSection }"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>

                    <div class="space-y-1 border-l-2 border-[#353A4A]/30 pl-3">

                      <!-- Секция "Полный обзор слота 2025" -->
                      <button
                        @click="
                          showFullOverviewSection = !showFullOverviewSection
                        "
                        class="w-full text-left flex items-center justify-between p-3 rounded-lg border border-[#353A4A]/50 bg-[#1B1E26]/50 hover:bg-[#353A4A]/30 hover:border-[#4F46E5]/40 transition-all duration-200"
                        :class="
                          showFullOverviewSection
                            ? 'border-[#4F46E5]/40 bg-[#4F46E5]/10'
                            : ''
                        "
                      >
                        <span
                          class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]"
                        >
                          <svg
                            class="w-4 h-4 text-[#4F46E5]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            ></path>
                          </svg>
                          Полный обзор слота 2025
                        </span>
                        <svg
                          class="w-4 h-4 text-gray-400 transition-transform"
                          :class="{ 'rotate-180': !showFullOverviewSection }"
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
                      </button>

                      <!-- Подразделы секции "Полный обзор слота 2025" (показываются только если секция открыта) -->
                      <div
                        v-show="showFullOverviewSection"
                        class="ml-4 space-y-1 border-l-2 border-[#4F46E5]/20 pl-3"
                      >
                        <button
                          @click="scrollToSection('overview-main')"
                          class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                        >
                          Основное описание
                        </button>
                        <button
                          @click="
                            showOverviewSuccessSecretSection =
                              !showOverviewSuccessSecretSection
                          "
                          class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                        >
                          В чем секрет успеха
                        </button>
                        <button
                          @click="
                            showOverviewMechanicsSection =
                              !showOverviewMechanicsSection
                          "
                          class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                        >
                          Основные механики
                        </button>
                        <button
                          @click="
                            showOverviewFreeSpinsSection =
                              !showOverviewFreeSpinsSection
                          "
                          class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                        >
                          Бесплатные спины
                        </button>
                        <button
                          @click="
                            showOverviewStrategiesSection =
                              !showOverviewStrategiesSection
                          "
                          class="w-full text-left p-2 rounded-md text-sm text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/20 transition-all duration-200"
                        >
                          Стратегии и советы
                        </button>
                      </div>
                    </div>

                    <!-- Секция "FAQ" -->
                    <button
                      @click="scrollToSection('faq-section')"
                      class="w-full text-left flex items-center justify-between p-3 rounded-lg border border-[#353A4A]/50 bg-[#1B1E26]/50 hover:bg-[#F59E0B]/10 hover:border-[#F59E0B]/40 transition-all duration-200"
                      :class="
                        showFaqSection
                          ? 'border-[#F59E0B]/40 bg-[#F59E0B]/10'
                          : ''
                      "
                    >
                      <div class="flex items-center gap-3">
                        <div
                          class="w-8 h-8 bg-gradient-to-br from-[#F59E0B] to-[#FF6B35] rounded-lg flex items-center justify-center"
                        >
                          <span class="text-white text-xs font-bold">❓</span>
                        </div>
                        <div>
                          <div class="text-sm font-medium text-[#E5E7EB]">
                            FAQ
                          </div>
                          <div class="text-xs text-[#9CA3AF]">
                            Часто задаваемые вопросы
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <div
                          class="w-2 h-2 rounded-full"
                          :class="
                            showFaqSection ? 'bg-[#F59E0B]' : 'bg-[#353A4A]'
                          "
                        ></div>
                        <svg
                          class="w-4 h-4 text-[#9CA3AF]"
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
                      </div>
                    </button>

                    <!-- Секция "Отзывы игроков" -->
                    <button
                      @click="scrollToSection('reviews-section')"
                      class="w-full text-left flex items-center justify-between p-3 rounded-lg border border-[#353A4A]/50 bg-[#1B1E26]/50 hover:bg-[#3B82F6]/10 hover:border-[#3B82F6]/40 transition-all duration-200"
                      :class="
                        showReviewsSection
                          ? 'border-[#3B82F6]/40 bg-[#3B82F6]/10'
                          : ''
                      "
                    >
                      <div class="flex items-center gap-3">
                        <div
                          class="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center"
                        >
                          <span class="text-white text-xs font-bold">💬</span>
                        </div>
                        <div>
                          <div class="text-sm font-medium text-[#E5E7EB]">
                            Отзывы игроков
                          </div>
                          <div class="text-xs text-[#9CA3AF]">
                            Рейтинг и отзывы
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <div
                          class="w-2 h-2 rounded-full"
                          :class="
                            showReviewsSection ? 'bg-[#3B82F6]' : 'bg-[#353A4A]'
                          "
                        ></div>
                        <svg
                          class="w-4 h-4 text-[#9CA3AF]"
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
                      </div>
                    </button>
                  </div>

                  <!-- Предпросмотр Hero секции -->
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import HeroPreview from '~/components/admin/HeroPreview.vue'
import BackgroundBeams from '~/components/ui/BackgroundBeams.vue'
import SerpPreview from '~/components/admin/SerpPreview.vue'
import HreflangConfig from '~/components/admin/HreflangConfig.vue'
import RobotsConfig from '~/components/admin/RobotsConfig.vue'
import JsonLdEditor from '~/components/admin/JsonLdEditor.vue'
// Фаза 2 компоненты
import TitleTemplates from '~/components/admin/TitleTemplates.vue'
import EEATSignals from '~/components/admin/EEATSignals.vue'
import ContentFreshness from '~/components/admin/ContentFreshness.vue'
import SocialPreviewCards from '~/components/admin/SocialPreviewCards.vue'
// Фаза 3 компоненты
import KeywordDensityChecker from '~/components/admin/KeywordDensityChecker.vue'
import IndexingStatus from '~/components/admin/IndexingStatus.vue'
import PageSpeedMetrics from '~/components/admin/PageSpeedMetrics.vue'
import SitemapConfig from '~/components/admin/SitemapConfig.vue'
import SEOHealthScore from '~/components/admin/SEOHealthScore.vue'

// Получаем ID слота из роута
const route = useRoute()
const router = useRouter()
const slotId = route.params.id

// Состояние
const slot = ref(null)
const providers = ref([])
const saving = ref(false)
const loading = ref(true)
const showHeroSection = ref(false)
const showBasicSection = ref(false)
const showHeroLinksSection = ref(false)
const showGameCharacteristicsSection = ref(false)
const showRatingSection = ref(false)
const showMechanicsSection = ref(false)
const showBonusesSection = ref(false)
const showThemesSection = ref(false)

// Состояние для секции "Информация об авторе"
const showAuthorSection = ref(false)

// Состояние загрузки медиа
const imageLoading = ref(true)
const imageError = ref(false)

// Состояние для секции "Полный обзор слота 2025"
const showFullOverviewSection = ref(false)
const showOverviewMainSection = ref(false)
const showOverviewPopularitySection = ref(false)
const showOverviewSuccessSecretSection = ref(false)
const showOverviewMechanicsSection = ref(false)
const showOverviewFreeSpinsSection = ref(false)
const showOverviewStrategiesSection = ref(false)

// Состояние для секции "Насколько популярен"
const showPopularitySection = ref(false)
const showPopularityTitleSection = ref(false)
const showPopularityMetricsSection = ref(false)
const showPopularityConclusionSection = ref(false)

// Состояние для секции "Рейтинг и награды"
const showRatingAwardsSection = ref(false)
const showRatingTitleSection = ref(false)
const showRatingMainSection = ref(false)
const showRatingDetailsSection = ref(false)
const showAwardsSection = ref(false)

// Состояние для секции "FAQ"
const showFaqSection = ref(false)
const showFaqTitleSection = ref(false)
const showFaqQuestion1 = ref(false)
const showFaqQuestion2 = ref(false)
const showFaqQuestion3 = ref(false)
const showFaqQuestion4 = ref(false)

// Состояние для секции "Отзывы игроков"
const showReviewsSection = ref(false)
const showReviewsTitleSection = ref(false)
const showReviewsStatsSection = ref(false)
const showReviewsDistributionSection = ref(false)
const showReviewsSentimentsSection = ref(false)
const showReviewsItemsSection = ref(false)

// Состояние для секции "Профессиональная оценка"
const showProfessionalRatingSection = ref(false)
const showProfRatingTitleSection = ref(false)
const showProfRatingOverallSection = ref(false)
const showProfRatingMetricsSection = ref(false)
const showProfRatingExpertSection = ref(false)
const showProfRatingWarningSection = ref(false)
const showProfRatingProsSection = ref(false)
const showProfRatingConsSection = ref(false)
const showProfRatingRecommendationSection = ref(false)

// Состояние для секции "Conclusion"
const showConclusionSection = ref(false)
const showConclusionTitleSection = ref(false)
const showConclusionTextSection = ref(false)
const showConclusionSuitableSection = ref(false)
const showConclusionWarningSection = ref(false)
const showConclusionVerdictSection = ref(false)

// Состояние для секции "Время побеждать!" (CTA)
const showCtaSection = ref(false)
const showCtaTitleSection = ref(false)
const showCtaFeaturesSection = ref(false)
const showCtaButtonsSection = ref(false)
const showCtaTrustSection = ref(false)

// Состояние для SEO секции
const showSeoSection = ref(false)
const showMetaSection = ref(false)
const showOpenGraphSection = ref(false)
const showTwitterSection = ref(false)
const showTechnicalSeoSection = ref(false)
const showJsonLdSection = ref(false)
const showBreadcrumbSection = ref(false)
const showImageObjectSection = ref(false)
// Фаза 2: новые секции
const showEEATSection = ref(false)
const showContentFreshnessSection = ref(false)

// Фаза 3: новые секции
const showKeywordDensitySection = ref(false)
const showIndexingStatusSection = ref(false)
const showPageSpeedSection = ref(false)
const showSitemapSection = ref(false)
const showSEOHealthSection = ref(false)
const showInfoPopupSection = ref(false)

// ===== Info Popup Content: reactive массивы для удобного редактирования =====
const infoProsItems = reactive([])
const infoConsItems = reactive([])
const infoFaqItems = reactive([])
const infoReviewItems = reactive([])
const infoHowToPlayItems = reactive([])

// Sync-функции: из массивов → JSON в form
const syncInfoPros = () => { form.value.info_pros = JSON.stringify(infoProsItems.filter(s => s.trim())) }
const syncInfoCons = () => { form.value.info_cons = JSON.stringify(infoConsItems.filter(s => s.trim())) }
const syncInfoFaq = () => { form.value.info_faq = JSON.stringify(infoFaqItems.filter(i => i.question || i.answer)) }
const syncInfoReviews = () => { form.value.info_reviews = JSON.stringify(infoReviewItems.filter(i => i.author || i.text)) }
const syncInfoHowToPlay = () => { form.value.info_how_to_play = JSON.stringify(infoHowToPlayItems.filter(i => i.step || i.text)) }

// Add функции
const addInfoProsItem = () => { infoProsItems.push(''); }
const addInfoConsItem = () => { infoConsItems.push(''); }
const addInfoFaqItem = () => { infoFaqItems.push({ question: '', answer: '' }); }
const addInfoReviewItem = () => { infoReviewItems.push({ author: '', rating: 5, text: '', date: new Date().toISOString().split('T')[0] }); }
const addInfoHowToPlayItem = () => { infoHowToPlayItems.push({ step: '', text: '' }); }

// Remove функции
const removeInfoProsItem = (i) => { infoProsItems.splice(i, 1); syncInfoPros(); }
const removeInfoConsItem = (i) => { infoConsItems.splice(i, 1); syncInfoCons(); }
const removeInfoFaqItem = (i) => { infoFaqItems.splice(i, 1); syncInfoFaq(); }
const removeInfoReviewItem = (i) => { infoReviewItems.splice(i, 1); syncInfoReviews(); }
const removeInfoHowToPlayItem = (i) => { infoHowToPlayItems.splice(i, 1); syncInfoHowToPlay(); }

// Инициализация массивов из JSON-строк формы (вызывается при загрузке данных)
const initInfoArrays = () => {
  // Pros
  infoProsItems.length = 0
  try { const arr = JSON.parse(form.value.info_pros || '[]'); arr.forEach(s => infoProsItems.push(s)) } catch(e) {}
  // Cons
  infoConsItems.length = 0
  try { const arr = JSON.parse(form.value.info_cons || '[]'); arr.forEach(s => infoConsItems.push(s)) } catch(e) {}
  // FAQ
  infoFaqItems.length = 0
  try { const arr = JSON.parse(form.value.info_faq || '[]'); arr.forEach(i => infoFaqItems.push({ question: i.question || '', answer: i.answer || '' })) } catch(e) {}
  // Reviews
  infoReviewItems.length = 0
  try { const arr = JSON.parse(form.value.info_reviews || '[]'); arr.forEach(i => infoReviewItems.push({ author: i.author || '', rating: i.rating || 5, text: i.text || '', date: i.date || '' })) } catch(e) {}
  // How to Play
  infoHowToPlayItems.length = 0
  try { const arr = JSON.parse(form.value.info_how_to_play || '[]'); arr.forEach(i => infoHowToPlayItems.push({ step: i.step || '', text: i.text || '' })) } catch(e) {}
}

// Фаза 2: переменные для Title Templates
const generatedTitleFromTemplate = ref('')
const showVideoObjectSection = ref(false)

const paylineType = ref('text') // 'number' или 'text'

// Поиск и фильтры для бонусов и тематик
const bonusSearchQuery = ref('')
const themeSearchQuery = ref('')

// Поиск по секциям (как в VS Code)
const searchQuery = ref('')
const searchResults = ref([])
const currentSearchIndex = ref(0)
const searchInput = ref(null)
const mobileSearchInput = ref(null)
const navSearchInput = ref(null)

// Данные для механик, бонусов и тематик
const availableMechanics = ref([])
const availableBonuses = ref([])
const availableThemes = ref([])

// 🎯 JSON-LD форма для нового компонента
const jsonLdForm = ref({
  // Основные настройки JSON-LD
  jsonld_enabled: true,
  jsonld_type: 'Game',
  jsonld_game_genre: 'Casino',
  jsonld_game_platform: 'Web Browser, Mobile, Desktop',
  jsonld_content_rating: '18+',
  jsonld_is_free: true,

  // Включение дополнительных схем
  jsonld_enable_product: false,
  jsonld_enable_review: true,
  jsonld_enable_faq: false,
  jsonld_enable_howto: false,
  jsonld_enable_breadcrumb: true,
  jsonld_enable_video: false,

  // Review Schema
  jsonld_review_author: 'SlotQuest Editorial Team',
  jsonld_review_rating: null,
  jsonld_review_text: '',

  // AggregateRating Schema
  jsonld_enable_aggregate: false,
  jsonld_aggregate_rating: null,
  jsonld_aggregate_count: 0,
  jsonld_aggregate_best: 5,
  jsonld_aggregate_worst: 1,

  // FAQ Schema (JSON строка)
  jsonld_faq_json: '',

  // HowTo Schema (JSON строка)
  jsonld_howto_json: '',

  // Video Schema
  jsonld_video_url: '',
  jsonld_video_thumbnail: '',
  jsonld_video_duration: '',
  jsonld_video_description: '',

  // ========== 👤 ИНФОРМАЦИЯ ОБ АВТОРЕ И ДАТЕ ОБНОВЛЕНИЯ ==========
  // Данные автора статьи
  article_author_name: 'Yanov Kyryl', // Имя автора
  article_author_role: 'основатель', // Роль/должность
  article_author_photo: '', // URL фото автора
  article_author_bio: '', // Краткая биография
  article_author_social_linkedin: '', // LinkedIn
  article_author_social_twitter: '', // Twitter/X
  article_author_social_website: '', // Персональный сайт

  // Дата и время обновления
  article_published_date: '', // Дата первой публикации
  article_updated_date: '', // Дата последнего обновления
  article_updated_time: '', // Время обновления (HH:MM)
  article_updated_by: '', // Кто обновил (если отличается от автора)

  // Время чтения
  article_reading_time: 9, // Время чтения в минутах
  article_reading_time_label: 'мин', // Метка: мин, минут, min

  // Настройки отображения
  article_show_author_block: true, // Показывать блок автора
  article_show_reading_time: true, // Показывать время чтения
  article_show_update_date: true, // Показывать дату обновления
})

// ========== ФАЗА 3: Формы для аналитики и производительности ==========

// SEO Health Score форма
const seoHealthForm = ref({
  seo_health_score: 0,
  seo_health_issues: null,
  seo_health_warnings: null,
  seo_health_passed: null,
  seo_health_last_audit: null,
  seo_health_trend: null
})

// Technical SEO форма (Hreflang + Robots + Canonical)
const technicalSeoForm = ref({
  regions: ['RU', 'IN', 'BR', 'UZ', 'AZ', 'TR', 'CL', 'AR', 'CA', 'CO', 'ID', 'BD'],
  robots: { index: true, follow: true, maxSnippet: '-1', maxImagePreview: 'large' },
  canonical: ''
})

// Indexing Status форма
const indexingForm = ref({
  indexing_status: 'unknown',
  indexing_first_date: null,
  indexing_last_crawl: null,
  indexing_crawl_frequency: 'weekly',
  indexing_impressions: 0,
  indexing_clicks: 0,
  indexing_position: null,
  indexing_internal_links: 0,
  indexing_external_links: 0,
  indexing_last_check: null,
  indexing_errors: null
})

// Page Speed / Core Web Vitals форма
const pageSpeedForm = ref({
  cwv_lcp: null,
  cwv_fid: null,
  cwv_cls: null,
  cwv_ttfb: null,
  cwv_fcp: null,
  cwv_inp: null,
  cwv_score_mobile: 0,
  cwv_score_desktop: 0,
  cwv_last_check: null,
  cwv_issues: null,
  cwv_opportunities: null
})

// Sitemap Configuration форма
const sitemapForm = ref({
  sitemap_include: true,
  sitemap_priority: 0.8,
  sitemap_frequency: 'weekly',
  sitemap_last_mod: null,
  sitemap_images: null,
  sitemap_videos: null,
  sitemap_news: false
})

// Вспомогательные функции для URL
function getSlotPageUrl() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://slotquest.com'
  return `${baseUrl}/slots/${form.value.slug || 'slot-name'}`
}

function getSiteUrl() {
  return typeof window !== 'undefined' ? window.location.origin : 'https://slotquest.com'
}

// Форма редактирования
const form = ref({
  name: '',
  slug: '',
  description: '',
  // Ключевые слова для Hero секции
  hero_keyword: 'Slot Review', // Заголовок
  hero_keyword_2: '', // Первая переменная в описании
  hero_keyword_3: '', // Вторая переменная в описании
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
  image_focus_point: 'center 20%', // Точка фокуса для адаптивного кропа

  // Info Popup Content (Enhanced SEO)
  info_expert_verdict: '',
  info_pros: '',
  info_cons: '',
  info_faq: '',
  info_reviews: '',
  info_how_to_play: '',
  info_demo_cta: '',
  video_url: '',
  // Ссылки кнопок
  demo_url: '', // Ссылка для кнопки "Играть бесплатно"
  real_play_url: '', // Ссылка для кнопки "Играть на деньги"

  // Поля для секции "Полный обзор слота 2025"
  // Основное описание
  overview_title: 'Полный обзор слота 2025',
  // Ключевые слова для замены в тексте
  overview_keyword_1: '', // Замена для [keyword_1] - например: "Pragmatic Play"
  overview_keyword_2: '', // Замена для [keyword_2] - например: "Scatter Pays"
  overview_keyword_3: '', // Замена для [keyword_3] - например: "бесплатные спины"
  overview_description_1:
    'Этот захватывающий слот от [keyword_1] представляет собой идеальное сочетание инновационной механики, потрясающей графики и щедрых выигрышей. Благодаря уникальной системе [keyword_2] и захватывающим бонусным функциям, этот слот завоевал сердца миллионов игроков по всему миру и стал одним из самых обсуждаемых релизов в индустрии онлайн-гемблинга.',
  overview_description_2:
    'Слот привлекает высоким показателем RTP и сбалансированной волатильностью, что делает его идеальным выбором как для новичков, так и для опытных игроков. Особое внимание привлекает функция [keyword_3], которая открывает путь к действительно впечатляющим выигрышам. Продуманная математическая модель игры обеспечивает захватывающий геймплей с регулярными выплатами и возможностью крупных побед.',
  // Заголовок для секции ключевых особенностей
  overview_features_title: '⚡ Ключевые характеристики слота:',
  overview_features_1:
    'Инновационная игровая механика от [keyword_1] с уникальными возможностями',
  overview_features_2:
    'Система [keyword_2] для максимально простого формирования выигрышей',
  overview_features_3:
    'Щедрая функция [keyword_3] с повышенными шансами на крупные выплаты',
  overview_features_4:
    'Каскадные выигрыши (Tumble/Avalanche) для цепочек последовательных побед',
  overview_features_5: 'Множители выигрышей и специальные бонусные символы',
  overview_features_6:
    'Высокий потенциал максимального выигрыша и сбалансированная волатильность',

  // Подсекция "Насколько популярен"
  popularity_title: 'Насколько популярен [popularity_keyword]?',
  popularity_title_keyword: '', // Ключевое слово для замены в заголовке
  popularity_ranking_position: '12',
  popularity_user_rating: '4.8',
  popularity_monthly_players: '2M+',
  popularity_description:
    'Этот слот удерживает топовые позиции в рейтингах уже несколько лет подряд, что подтверждает его исключительное качество и увлекательность геймплея.',

  // Detailed metrics популярности (3 карточки)
  popularity_global_rank_title: 'Глобальный рейтинг',
  popularity_global_rank_value: 'TOP 3',
  popularity_global_rank_description:
    'Входит в ТОП-3 самых популярных слотов мира уже 3 года подряд',

  popularity_active_players_title: 'Активные игроки',
  popularity_active_players_value: '2.4M+',
  popularity_active_players_description:
    'Ежемесячно играют более 2.4 млн уникальных игроков',

  popularity_rtp_volatility_title: 'RTP + Волатильность',
  popularity_rtp_volatility_value: '96.5%',
  popularity_rtp_volatility_description:
    'Высокая отдача и захватывающие колебания выигрышей',

  // Статистика по годам (4 года: 2021-2024)
  popularity_stats_title: 'Статистика популярности по годам',
  popularity_2021_rank: '#1',
  popularity_2021_description: 'Лучший новый слот',
  popularity_2021_width: '100%',

  popularity_2022_rank: '#1',
  popularity_2022_description: 'Самый популярный',
  popularity_2022_width: '95%',

  popularity_2023_rank: '#1',
  popularity_2023_description: 'Рекордсмен',
  popularity_2023_width: '90%',

  popularity_2024_rank: '#12',
  popularity_2024_description: 'Стабильный хит',
  popularity_2024_width: '70%',

  // Тренд популярности
  popularity_trend_title: 'Тренд популярности (симулированный график)',
  popularity_trend_description:
    'График показывает устойчивый рост популярности',

  // Подсекция "Основные особенности и механики игры"
  mechanics_title: 'Игровые механики и особенности',
  mechanics_intro:
    'Этот слот предлагает захватывающий игровой опыт благодаря современным механикам и инновационным функциям:',

  // Scatter Pays (детальное описание)
  mechanics_scatter_title: 'Scatter Pays',
  mechanics_scatter_description:
    'Система выплат Scatter Pays упрощает формирование выигрышей - символы не обязательно должны располагаться на активных линиях. Достаточно определенного количества одинаковых символов в любом месте игрового поля.',
  mechanics_scatter_details:
    'Минимум 8 одинаковых символов в любом месте барабанов = гарантированный выигрыш! Специальные scatter-символы активируются от 4+ символов.',

  // Tumbles (каскады)
  mechanics_cascade_title: 'Каскадные выигрыши',
  mechanics_cascade_description:
    'После каждого выигрыша активируется механика каскадов. Выигрышные символы исчезают с барабанов, а на их место падают новые символы, создавая возможности для дополнительных выигрышей.',
  mechanics_cascade_details:
    'Каскады могут продолжаться неограниченно долго, создавая цепочки последовательных выигрышей в рамках одного спина.',

  // Множители
  mechanics_multipliers_title: 'Случайные множители',
  mechanics_multipliers_description:
    'В любом спине на барабанах могут появиться случайные множители от x2 до x500, которые значительно увеличивают размер выигрыша.',
  mechanics_multipliers_details:
    'Множители накапливаются в течение всех каскадов и применяются к итоговому выигрышу спина.',
  mechanics_multipliers_important_title: 'Особенности применения множителей',
  mechanics_multipliers_important:
    'Множители не применяются к каждому отдельному каскаду, а накапливаются в течение всего спина и применяются к общему выигрышу всех каскадов в конце раунда.',

  // Бесплатные спины (механики)
  mechanics_freespins_title: 'Бесплатные спины',
  mechanics_freespins_description:
    'Активируются при выпадении 3 или более scatter-символов на барабанах. Предоставляют дополнительные возможности для выигрыша без дополнительных ставок.',
  mechanics_freespins_details:
    'Во время бесплатных спинов действуют все основные механики игры с повышенными шансами на крупные выигрыши.',

  // Wild символы (механики)
  mechanics_wilds_title: 'Wild символы',
  mechanics_wilds_description:
    'Универсальные символы, которые могут заменить любые другие символы (кроме специальных) для формирования выигрышных комбинаций.',
  mechanics_wilds_details:
    'Wild символы могут появляться в различных вариациях: обычные, расширяющиеся, липкие или с множителями.',

  // Бонусные игры (механики)
  mechanics_bonus_title: 'Бонусные игры',
  mechanics_bonus_description:
    'Специальные игровые режимы, активируемые определенными комбинациями символов. Предлагают уникальный геймплей и повышенные выплаты.',
  mechanics_bonus_details:
    'Бонусные раунды могут включать мини-игры, колесо фортуны, выбор призов или другие интерактивные элементы.',

  // Подсекция "Бесплатные спины Gates of Olympus"
  free_spins_title: 'Бесплатные спины Gates of Olympus',
  free_spins_intro:
    'Четыре символа Зевса предоставляют игрокам вход в самую сочную часть игры. Не важно, получите ли вы 4 или больше символов — количество спинов всегда составляет 15. Но больше scatter-символов все же предпочтительнее, поскольку они дают мгновенную выплату.',

  // Мгновенные выплаты за scatter
  free_spins_instant_title: '💰 Мгновенные выплаты за Scatter',
  free_spins_4_scatter_desc: '4 символа Зевса:',
  free_spins_4_scatter: 'x3 от ставки',
  free_spins_5_scatter_desc: '5 символов Зевса:',
  free_spins_5_scatter: 'x5 от ставки',
  free_spins_6_scatter_desc: '6 символов Зевса:',
  free_spins_6_scatter: 'x100 от ставки',

  // Особенности бонусной игры
  free_spins_features_title: '🚀 Особенности бонусной игры',
  free_spins_feature_1:
    '15 бесплатных спинов независимо от количества scatter-символов',
  free_spins_feature_2: 'Total Multiplier не сбрасывается между раундами',
  free_spins_feature_3: 'Возможность получить дополнительные бесплатные спины',
  free_spins_feature_4: 'Опция купить бонус за 100x от общей ставки',

  // Ante Bet и покупка бонуса
  free_spins_ante_title: '🎯 Ante Bet и покупка бонуса',
  free_spins_ante_description:
    'Игроки могут купить бесплатные спины, заплатив 100x от общей ставки, или активировать Ante Bet.',
  free_spins_ante_bet_value: '25% дополнительно к ставке',
  free_spins_ante_bet_effect: 'удваивает шансы получить бесплатные спины',

  // Новые поля Ante Bet
  ante_bet_title: 'Ante Bet',
  ante_bet_description:
    'Функция Ante Bet позволяет увеличить шансы на получение бонусных раундов за дополнительную плату.',
  ante_bet_warning:
    'Внимание: использование Ante Bet увеличивает размер ставки и может привести к более быстрой потере средств.',

  // Подсекция "Стратегии и советы для игры"
  strategies_title: 'Стратегии и советы для игры',
  strategies_intro:
    'Эффективные подходы для максимизации удовольствия от игры:',

  // Рекомендации для новичков
  strategies_beginners_title: '💡 Рекомендации для новичков',
  strategy_beginner_1: 'Начните с демо-версии для изучения механик',
  strategy_beginner_2: 'Устанавливайте лимиты перед началом игры',
  strategy_beginner_3: 'Начинайте с минимальных ставок',
  strategy_beginner_4: 'Изучите таблицу выплат перед игрой',

  // Продвинутые стратегии
  strategies_advanced_title: '⚡ Продвинутые стратегии',
  strategy_advanced_1: 'Управление банкроллом: не более 1-2% от банка на спин',
  strategy_advanced_2:
    'Ante Bet увеличивает шансы на бонус, но требует больших ставок',
  strategy_advanced_3: 'Покупка бонуса оправдана только при достаточном банке',
  strategy_advanced_4: 'Ведите статистику сессий для анализа результатов',

  // Важные предупреждения (2 карточки)
  strategy_warnings_title: '⚠️ Важные предупреждения',
  strategy_warning_1_title: 'Высокая волатильность',
  strategy_warning_1_text:
    'Длительные периоды без крупных выигрышей — это нормально. Будьте готовы к затяжным потерям.',
  strategy_warning_2_title: 'Покупка бонуса',
  strategy_warning_2_text:
    '100x ставка за бонус не гарантирует прибыль. Используйте эту функцию разумно.',

  // Подсекция "В чем секрет успеха?"
  success_secret_title: 'В чем секрет такого огромного успеха?',
  success_secret_intro:
    'Одним из ключей к такому огромному успеху является механика Scatter Pays — то, что объединяет многие популярные онлайн-slotы. Вам не нужны линии выплат, кластеры или способы выигрыша... Одинаковые символы могут появиться в любом месте сетки и принести вам выигрыши.',
  success_secret_card_1_title: '🍭 Связь с Sweet Bonanza',
  success_secret_card_1_text:
    'Sweet Bonanza был тайтлом, который протестировал воды для Gates of Olympus. Эти две игры имеют много общих геймплейных сходств. И кажется, что игроки больше любят эпическую тему греческих богов, чем сладкую природу Sweet Bonanza.',
  success_secret_card_2_title: '⚖️ Идеальный баланс',
  success_secret_card_2_text:
    'Pragmatic Play использовала проверенный и испытанный рецепт для достижения идеального баланса между сложностью и простотой. Три элемента — scatter pays, tumbles и множители — создают идеальную основу для захватывающего, но не слишком сложного геймплея.',
  success_secret_outro:
    'Эта комбинация творит чудеса, и наши рейтинги, основанные на реальных данных казино, подтверждают это. Количество tumbles не ограничено, и у вас может быть один раунд, который продолжается намного дольше обычного спина.',

  // === Секция "Насколько популярен" ===
  // Title секции
  popularity_section_title: 'Насколько популярен',

  // Основные метрики популярности (3 карточки)
  popularity_rank_2024: '12',
  popularity_rank_2024_label: 'Рейтинг 2024',

  popularity_user_rating: '4.8/5',
  popularity_user_rating_label: 'Пользовательский рейтинг',

  popularity_monthly_players: '2M+',
  popularity_monthly_players_label: 'Игроков в месяц',

  // Conclusion о популярности
  popularity_conclusion:
    '🏆 Этот слот удерживает топовые позиции в рейтингах уже несколько лет подряд, что подтверждает его исключительное качество и увлекательность геймплея.',

  // === Секция "Рейтинг и награды" ===
  // Title секции
  rating_awards_title: 'Рейтинг и награды',

  // Основной рейтинг
  rating_main_score: '4.8',
  rating_main_max: '5',
  rating_description: 'Средний рейтинг игроков',
  rating_reviews_count: '1,247',
  rating_reviews_text: 'отзывах',

  // Детализация рейтинга (5 строк)
  rating_5_stars_percent: '68',
  rating_4_stars_percent: '22',
  rating_3_stars_percent: '7',
  rating_2_stars_percent: '2',
  rating_1_stars_percent: '1',

  // Награды (4 награды)
  award_1_emoji: '🏆',
  award_1_title: 'Слот года 2024',
  award_1_description: 'Casino Awards',
  award_1_color: 'yellow', // yellow, purple, green, blue

  award_2_emoji: '🎖️',
  award_2_title: 'Лучший дизайн',
  award_2_description: 'Gaming Excellence',
  award_2_color: 'purple',

  award_3_emoji: '💎',
  award_3_title: 'Платиновый статус',
  award_3_description: '10M+ игроков',
  award_3_color: 'green',

  award_4_emoji: '⭐',
  award_4_title: 'Выбор игроков',
  award_4_description: 'Народное голосование',
  award_4_color: 'blue',

  // === Секция "FAQ (Часто задаваемые вопросы)" ===
  faq_title: 'Часто задаваемые вопросы',

  // Вопрос 1
  faq_q1_emoji: '🎮',
  faq_q1_question: 'Можно ли играть в слот бесплатно?',
  faq_q1_answer:
    'Да, абсолютно бесплатно! Вы можете играть в демо-версию слота без регистрации и депозита. Это отличный способ изучить механику игры и бонусные функции перед игрой на реальные деньги.',

  // Вопрос 2
  faq_q2_emoji: '💰',
  faq_q2_question: 'Какова максимальная выплата в слоте?',
  faq_q2_answer:
    'Максимальная выплата: 5,000x от ставки. Это означает, что при ставке €100 вы можете выиграть до €500,000! Такие выигрыши случаются крайне редко - примерно 1 раз в 697,350 спинов.',

  // Вопрос 3
  faq_q3_emoji: '🛒',
  faq_q3_question: 'Стоит ли покупать бонусные спины?',
  faq_q3_answer:
    'Покупка бонуса стоит 100x от ставки. Плюсы: гарантированный доступ к бонусной игре с множителями. Минусы: высокая стоимость и нет гарантии большого выигрыша. Совет: покупайте бонус только при достаточном банкролле и помните о высокой волатильности.',

  // Вопрос 4
  faq_q4_emoji: '📱',
  faq_q4_question: 'Работает ли слот на мобильных устройствах?',
  faq_q4_answer:
    'Да, полностью оптимизирован! Поддерживает iOS и Android, работает в браузере без установки приложений, сохраняет все функции и качество графики, быстрая загрузка и плавная анимация.',

  // === Секция "Отзывы игроков" ===
  // Headings
  reviews_title: 'Отзывы игроков',
  reviews_subtitle: 'Реальные мнения от сообщества слот-игроков',

  // Карточки статистики (Общая статистика)
  reviews_overall_rating: '4.3',
  reviews_overall_label: 'Общий рейтинг',
  reviews_overall_stars: '★★★★☆',
  reviews_total_count: '1.2K+',
  reviews_total_label: 'Всего отзывов',
  reviews_total_desc: 'активное сообщество',
  reviews_positive_percent: '75%',
  reviews_positive_label: 'Положительные',
  reviews_positive_desc: '4-5 звёзд',
  reviews_recommend_percent: '68%',
  reviews_recommend_label: 'Рекомендуют',
  reviews_recommend_desc: 'друзьям играть',
  // Заголовки секций
  reviews_distribution_title: 'Распределение оценок',
  reviews_sentiments_title: 'Анализ настроений',
  reviews_featured_title: 'Избранные отзывы игроков',

  // Распределение оценок
  reviews_5_stars_percent: '45%',
  reviews_5_stars_count: '562',
  reviews_4_stars_percent: '30%',
  reviews_4_stars_count: '374',
  reviews_3_stars_percent: '15%',
  reviews_3_stars_count: '187',
  reviews_2_stars_percent: '7%',
  reviews_2_stars_count: '87',
  reviews_1_stars_percent: '3%',
  reviews_1_stars_count: '37',

  // Анализ настроений (4 пункта)
  reviews_sentiment_1_title: 'Потрясающая графика',
  reviews_sentiment_1_desc: 'Упоминается в 89% позитивных отзывов',
  reviews_sentiment_2_title: 'Мегавыигрыши',
  reviews_sentiment_2_desc: 'Крупные множители в бонусах',
  reviews_sentiment_3_title: 'Стабильная работа',
  reviews_sentiment_3_desc: 'Без лагов и багов',
  reviews_sentiment_4_title: 'Высокая волатильность',
  reviews_sentiment_4_desc: 'Требует терпения',

  // Review 1
  review_1_author: 'Александр К.',
  review_1_avatar_letter: 'А',
  review_1_rating: '★★★★★',
  review_1_badge: 'Проверенный игрок',
  review_1_text:
    'Реально крутой слот! Множители действительно работают - словил x1200 на бонусе, эмоции зашкаливали! Графика топ, анимации плавные. Играю полгода, очень доволен. Каскады постоянно продлевают удовольствие 🎰⚡',
  review_1_likes: '47 лайков',
  review_1_replies: '12 ответов',
  review_1_date: '2 дня назад',

  // Review 2
  review_2_author: 'Мария В.',
  review_2_avatar_letter: 'М',
  review_2_rating: '★★★★☆',
  review_2_badge: 'Активный игрок',
  review_2_text:
    'Визуально великолепно! Тематика Олимпа реализована шикарно. Геймплей затягивает, но волатильность зашкаливает - нужен большой банкролл. Когда заходят бонусы - сказка! 🏛️✨',
  review_2_likes: '31 лайк',
  review_2_replies: '8 ответов',
  review_2_date: '1 неделю назад',

  // Review 3
  review_3_author: 'Дмитрий С.',
  review_3_avatar_letter: 'Д',
  review_3_rating: '★★★★★',
  review_3_badge: 'VIP игрок',
  review_3_text:
    'ЭПИК! Pragmatic Play превзошли сами себя! Максимальный выигрыш 3,200x - чуть со стула не упал! 😱 Звук, графика, математика - всё идеально. Мой фаворит уже 2 года! 🎮👑',
  review_3_likes: '93 лайка',
  review_3_replies: '25 ответов',
  review_3_date: '3 дня назад',

  // === Секция "Профессиональная оценка" ===
  // Headings
  prof_rating_title: 'Профессиональная оценка',
  prof_rating_subtitle: 'Детальный анализ от экспертов индустрии 🎯',

  // Общая оценка
  prof_rating_overall_title: 'Общая экспертная оценка',
  prof_rating_overall_desc:
    'Превосходный слот с инновационной механикой и высоким потенциалом выигрыша 🏆',
  prof_rating_overall_score: '8.5',
  prof_rating_overall_stars: '⭐⭐⭐⭐☆',

  // Метрика 1: Графика
  prof_rating_metric_1_emoji: '🎨',
  prof_rating_metric_1_name: 'Графика и анимация',
  prof_rating_metric_1_score: '9.0',

  // Метрика 2: Геймплей
  prof_rating_metric_2_emoji: '🎮',
  prof_rating_metric_2_name: 'Геймплей',
  prof_rating_metric_2_score: '8.0',

  // Метрика 3: Win potential
  prof_rating_metric_3_emoji: '💎',
  prof_rating_metric_3_name: 'Win potential',
  prof_rating_metric_3_score: '9.0',

  // Метрика 4: Бонусные функции
  prof_rating_metric_4_emoji: '🎁',
  prof_rating_metric_4_name: 'Бонусные функции',
  prof_rating_metric_4_score: '8.0',

  // Метрика 5: Частота выплат
  prof_rating_metric_5_emoji: '⏰',
  prof_rating_metric_5_name: 'Частота выплат',
  prof_rating_metric_5_score: '7.0',

  // Экспертное заключение
  prof_rating_expert_title: 'Экспертное заключение', // Заголовок секции
  prof_rating_expert_name: 'Сертифицированный эксперт', // Имя эксперта (badge)
  prof_rating_expert_position:
    'Ведущий аналитик игровой индустрии • 8+ лет опыта', // Должность
  prof_rating_expert_quote:
    '[prof_expert_keyword] представляет собой революционный подход к созданию видеослотов. Механика Scatter Pays полностью меняет привычные правила игры, создавая уникальный опыт для каждого спина. Высокий потенциал выигрыша x5,000 в сочетании с каскадными символами делают каждый раунд непредсказуемым и захватывающим. 🎯',
  prof_rating_expert_quote_keyword: '', // Ключевое слово для цитаты эксперта
  // Предупреждение о волатильности
  prof_rating_warning_title: 'Предупреждение о волатильности',
  prof_rating_warning_text:
    'Слот имеет высокую волатильность, что означает редкие, но крупные выигрыши. Рекомендуется иметь достаточный банкролл и играть ответственно. Устанавливайте лимиты и никогда не играйте деньгами, которые не можете позволить себе потерять. 💰',
  // Преимущества (5 пунктов)
  prof_rating_pros_title: '✅ ПРЕИМУЩЕСТВА',
  prof_rating_pros_1_title: 'Инновационная механика Scatter Pays',
  prof_rating_pros_1_desc: 'Революционная система выплат',
  prof_rating_pros_2_title: 'Потенциал выигрыша x5,000',
  prof_rating_pros_2_desc: 'Огромные возможности для выигрыша',
  prof_rating_pros_3_title: 'Превосходная графика',
  prof_rating_pros_3_desc: 'Визуальное наслаждение на высоком уровне',
  prof_rating_pros_4_title: 'Каскадные выигрыши',
  prof_rating_pros_4_desc: 'Множественные выплаты в одном спине',
  prof_rating_pros_5_title: 'Мобильная оптимизация',
  prof_rating_pros_5_desc: 'Идеальная работа на всех устройствах',
  // Недостатки (5 пунктов)
  prof_rating_cons_title: '❌ НЕДОСТАТКИ',
  prof_rating_cons_1_title: 'Высокая волатильность',
  prof_rating_cons_1_desc: 'Редкие, но крупные выигрыши',
  prof_rating_cons_2_title: 'Требует большой банкролл',
  prof_rating_cons_2_desc: 'Необходим солидный стартовый капитал',
  prof_rating_cons_3_title: 'Не для новичков',
  prof_rating_cons_3_desc: 'Сложно для консервативных игроков',
  prof_rating_cons_4_title: 'Риск больших потерь',
  prof_rating_cons_4_desc: 'Возможны продолжительные проигрыши',
  prof_rating_cons_5_title: 'Высокая дисперсия',
  prof_rating_cons_5_desc: 'Нестабильные результаты',
  // Итоговая рекомендация
  prof_rating_recommendation_title: 'Итоговая рекомендация',
  prof_rating_recommendation_subtitle: 'От экспертов SlotQuest',
  prof_rating_recommendation_text:
    '[prof_recommendation_keyword] - это выдающийся slot для опытных игроков, которые ценят инновационную механику и готовы к высокой волатильности ради потенциала больших выигрышей. Новичкам рекомендуем начать с менее волатильных slotов. Этот slot станет идеальным выбором для тех, кто ищет адреналин и готов к серьёзной игре! 🚀',
  prof_rating_recommendation_keyword: '', // Ключевое слово для итоговой рекомендации

  // === Секция "Conclusion" ===
  conclusion_title: 'Conclusion',

  // Final rating - заголовок с ключевым словом
  conclusion_rating_title: 'Итоговая оценка [conclusion_keyword]',
  conclusion_rating_keyword: '', // Ключевое слово для Final Rating заголовка

  // Final rating - тексты
  conclusion_text_1:
    '[conclusion_text_keyword] заслуженно считается одним из лучших слотов от Pragmatic Play. Сочетание инновационной механики Scatter Pays, высокого потенциала выигрыша до x5,000 и превосходной графики делают его обязательным для всех любителей азартных игр.',
  conclusion_text_1_keyword: '', // Ключевое слово для Paragraph 1
  conclusion_text_2:
    'Революционная система выплат, где выигрыши начисляются за 8+ одинаковых символов в любом месте экрана, открывает новые горизонты в мире видеослотов. Каскадные выигрыши и множители создают уникальную атмосферу постоянного ожидания больших выплат.',

  // Suitable for (заголовок + 4 пункта)
  conclusion_suitable_title: 'Кому подходит',
  conclusion_suitable_1: 'Опытным игрокам',
  conclusion_suitable_2: 'Любителям высокой волатильности',
  conclusion_suitable_3: 'Игрокам с большим банкроллом',
  conclusion_suitable_4: 'Поклонникам инноваций',

  // Important to remember (заголовок + 4 пункта)
  conclusion_warning_title: 'Важно помнить',
  conclusion_warning_1: 'Высокая волатильность',
  conclusion_warning_2: 'Нужен большой банкролл',
  conclusion_warning_3: 'Играйте ответственно',
  conclusion_warning_4: 'Устанавливайте лимиты',

  // Финальный вердикт
  conclusion_verdict_title: 'Финальный вердикт', // Заголовок секции
  conclusion_verdict_text:
    '[conclusion_verdict_keyword] - это не просто slot, это новая эра в мире азартных игр. Если вы готовы к вызову и хотите испытать настоящий адреналин от игры, этот slot создан именно для вас. Помните: играйте ответственно и наслаждайтесь процессом! 🎰',
  conclusion_verdict_keyword: '', // Ключевое слово для финального вердикта

  // === Секция "Время побеждать!" ===
  // Headings
  cta_title: 'Время побеждать!',
  cta_subtitle: 'Окунитесь в легендарный мир [cta_keyword]',
  cta_subtitle_keyword: '', // Ключевое слово для замены [cta_keyword] в subtitle
  cta_potential: 'x5,000',
  cta_potential_prefix: 'Потенциал выигрыша до', // Текст перед значением win potential
  cta_potential_suffix: 'ждёт вас!', // Текст после значения win potential

  // Card 1
  cta_feature_1_emoji: '🎰',
  cta_feature_1_title: 'Демо режим',
  cta_feature_1_desc: 'Изучите все механики игры совершенно бесплатно',

  // Card 2
  cta_feature_2_emoji: '💰',
  cta_feature_2_title: 'Реальные деньги',
  cta_feature_2_desc: 'Играйте на деньги в лучших онлайн казино',

  // Card 3
  cta_feature_3_emoji: '🎁',
  cta_feature_3_title: 'Эксклюзивные бонусы',
  cta_feature_3_desc: 'Получите дополнительные средства для игры',

  // Action buttons
  cta_button_demo_emoji: '🎮',
  cta_button_demo_text: 'Играть демо',
  cta_button_demo_url: '/slots/gates-of-olympus/demo',
  cta_button_real_emoji: '💎',
  cta_button_real_text: 'Играть на деньги',
  cta_button_real_url: '/casinos/best-for-gates-of-olympus',

  // Trust indicators
  cta_trust_1_text: 'Лицензированные операторы',
  cta_trust_2_text: 'Безопасность SSL',
  cta_trust_3_text: 'Поддержка 24/7',

  // SEO поля
  seo_title: '',
  seo_description: '',
  seo_keywords: '', // Старое поле (для совместимости)

  // Новая система ключевых слов (4 типа)
  seo_keywords_primary: '', // Основные ключевые слова (3-5)
  seo_keywords_lsi: '', // LSI семантические ключевые слова (10-15)
  seo_keywords_geo: '', // Локальные ключевые слова для гео-таргетинга
  seo_keywords_longtail: '', // Long-tail фразы (5-10)

  canonical_url: '',

  // Видео и мультимедиа (для VideoObject Schema)
  video_url: '', // URL видео геймплея
  video_duration: 'PT3M', // Длительность видео (ISO 8601)

  // Альтернативные названия (для разных рынков)
  alternative_names: '', // Названия на разных языках

  // Язык и гео-таргетинг (упрощенная система - один язык для всех стран)
  content_language: 'en', // Основной язык контента (английский - международный)
  geo_target_regions: 'RU, IN, BR, UZ, AZ, TR, CL, AR, CA, CO, ID, BD', // Целевые страны (коды ISO)

  // Open Graph поля (расширенные)
  og_title: '',
  og_description: '',
  og_image: '',
  og_type: 'article',
  og_url: '',
  og_site_name: 'SlotQuest',
  og_locale: 'en_US',
  og_locale_alternate: 'ru_RU,pt_BR,hi_IN,tr_TR,es_CL',
  og_video: '',
  og_video_type: 'video/mp4',
  og_video_width: 1280,
  og_video_height: 720,
  og_image_width: 1200,
  og_image_height: 630,
  og_image_alt: '',

  // Twitter Card поля (расширенные)
  twitter_card: 'summary_large_image',
  twitter_site: '@SlotQuest',
  twitter_creator: '@SlotQuest',
  twitter_title: '',
  twitter_description: '',
  twitter_image: '',
  twitter_image_alt: '',
  twitter_player: '',
  twitter_player_width: 1280,
  twitter_player_height: 720,

  // Advanced Robots директивы (Фаза 1)
  robots_index: true,
  robots_follow: true,
  robots_max_snippet: -1, // -1 = без ограничений
  robots_max_image_preview: 'large', // none, standard, large
  robots_max_video_preview: -1, // -1 = без ограничений
  robots_notranslate: false,
  robots_noimageindex: false,
  robots_unavailable_after: '',

  // Hreflang конфигурация (Фаза 1)
  hreflang_enabled: true,
  hreflang_x_default: '',
  hreflang_config: '', // JSON массив конфигурации
  hreflang_preset: 'international', // international, cis, latam, asia, custom

  // ============ ФАЗА 2: РАСШИРЕННОЕ SEO ============

  // Title Templates
  seo_title_template: '{name} Slot by {provider} | Play Free Demo {year}',
  seo_title_power_words: '',
  seo_title_use_template: false,

  // E-E-A-T - Experience
  eeat_experience_date: '',
  eeat_experience_hours: 10,
  eeat_experience_sessions: 25,

  // E-E-A-T - Expertise
  eeat_author_name: 'SlotQuest Editorial Team',
  eeat_author_position: 'Senior Slot Analyst',
  eeat_author_bio: '',
  eeat_expertise_years: 5,
  eeat_reviews_count: 250,

  // E-E-A-T - Authority
  eeat_certifications: '',
  eeat_featured_in: '',
  eeat_partnerships: '',

  // E-E-A-T - Trust
  eeat_data_sources: '',
  eeat_methodology: '',
  eeat_fact_checked: true,
  eeat_fact_check_date: '',
  eeat_disclaimer: '18+ | Gambling can be addictive | Play responsibly',

  // Content Freshness
  content_published_date: '',
  content_major_update: '',
  content_reviewed_date: '',
  content_next_review: '',
  content_version: '1.0',
  content_update_frequency: 'monthly',
  content_changelog: '',

  // Social Sharing
  social_custom_hashtags: '#slots #casino #pragmatic',
  social_cta_text: 'Check out this amazing slot!',

  // Технический SEO поля (обновлено)
  robots_meta: 'index, follow',
  viewport_meta: 'width=device-width, initial-scale=1',
  charset_meta: 'UTF-8',
  language_meta: 'ru',
  author_meta: 'SlotQuest Team',
  copyright_meta: '© 2025 SlotQuest. Все права защищены.',
  generator_meta: 'Nuxt.js',
  theme_color_meta: '#1F2937',
  target_locations:
    '🇷🇺 Россия\n🇮🇳 Индия\n🇧🇷 Бразилия\n🇺🇿 Узбекистан\n🇦🇿 Азербайджан\n🇹🇷 Турция\n🇨🇱 Чили\n🇦🇷 Аргентина\n🇨🇦 Канада\n🇨🇴 Колумбия\n🇮🇩 Индонезия\n🇧🇩 Бангладеш\n🇸🇳 Сенегал\n🇺🇬 Уганда',

  // JSON-LD Schema fields
  schema_game_genre: '',
  schema_game_platform: '',
  schema_game_publisher: '',
  schema_content_rating: '',
  schema_rating_value: '',
  schema_review_count: '',
  schema_best_rating: '5',
  schema_org_name: 'SlotQuest',
  schema_org_url: 'https://slotquest.com',
  schema_org_logo: 'https://slotquest.com/logo.png',
  schema_org_type: 'Organization',

  // Slot Characteristics Schema
  schema_slot_rtp: '',
  schema_slot_volatility: '',
  schema_slot_max_win: '',
  schema_slot_min_bet: '',
  schema_slot_max_bet: '',
  schema_slot_release_date: '',
  schema_slot_reels: '',
  schema_slot_paylines: '',

  // Slot Popularity Schema
  schema_slot_rating: '',
  schema_slot_bonus_frequency: '',
  schema_slot_real_rtp: '',

  // Slot Features Schema
  schema_slot_mechanics: '',
  schema_slot_bonus_types: '',
  schema_slot_theme: '',

  // Provider Schema
  schema_provider_name: '',
  schema_provider_url: '',
  schema_provider_logo: '',

  // Game Actions Schema
  schema_demo_action_name: 'Играть в демо',
  schema_demo_action_url: '',
  schema_real_action_name: 'Играть на деньги',
  schema_real_action_url: '',

  // Breadcrumb Schema fields
  breadcrumb_enabled: true,
  breadcrumb_items: [
    { name: 'Главная', url: 'https://slotquest.com' },
    { name: 'Слоты', url: 'https://slotquest.com/slots' },
  ],

  // ImageObject Schema fields
  image_object_enabled: true,
  image_object_url: '',
  image_object_width: '',
  image_object_height: '',
  image_object_alt: '',
  image_object_caption: '',

  // VideoObject Schema fields
  video_object_enabled: false,
  video_object_url: '',
  video_object_thumbnail_url: '',
  video_object_duration: '',
  video_object_upload_date: '',
  video_object_description: '',

  // Full Review Schema fields
  schema_review_title: '',
  schema_review_description_1: '',
  schema_review_description_2: '',
  schema_review_feature_1: '',
  schema_review_feature_2: '',
  schema_review_feature_3: '',
  schema_review_feature_4: '',
  schema_review_feature_5: '',
  schema_review_feature_6: '',
  schema_popularity_title: '',
  schema_ranking_position: '',
  schema_user_rating: '',
  schema_global_rating: '',
  schema_popularity_description: '',

  // Новые поля для раздела "Насколько популярен" (добавлены динамически)
  // Заголовки подразделов
  popularity_stats_title: null,
  popularity_trend_title: null,
  popularity_facts_title: null,
  // Статистика по годам (4 года × 4 поля = 16 полей)
  popularity_year_1: null,
  popularity_rank_1: null,
  popularity_width_1: null,
  popularity_label_1: null,
  popularity_year_2: null,
  popularity_rank_2: null,
  popularity_width_2: null,
  popularity_label_2: null,
  popularity_year_3: null,
  popularity_rank_3: null,
  popularity_width_3: null,
  popularity_label_3: null,
  popularity_year_4: null,
  popularity_rank_4: null,
  popularity_width_4: null,
  popularity_label_4: null,
  // Ключевые факты (4 факта × 2 поля = 8 полей)
  popularity_fact_icon_1: null,
  popularity_fact_text_1: null,
  popularity_fact_icon_2: null,
  popularity_fact_text_2: null,
  popularity_fact_icon_3: null,
  popularity_fact_text_3: null,
  popularity_fact_icon_4: null,
  popularity_fact_text_4: null,
  // Тренд популярности (график, 4 точки)
  popularity_trend_y1: null,
  popularity_trend_y2: null,
  popularity_trend_y3: null,
  popularity_trend_y4: null,
})

// Отдельные реактивные переменные для выбранных элементов (чтобы избежать проблем с сериализацией)
const selectedMechanics = ref([])
const selectedBonuses = ref([])
const selectedThemes = ref([])

// Отслеживаем изменение URL изображения для сброса состояния загрузки
watch(
  () => form.value.image_url,
  (newUrl) => {
    if (newUrl) {
      imageLoading.value = true
      imageError.value = false
      console.log('🔄 Изменён URL изображения:', newUrl)
    }
  },
)

// Title страницы
useHead({
  title: 'Редактирование слота - SlotQuest Admin',
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

// Загрузка списка тематик (только активные!)
const loadThemes = async () => {
  try {
    const response = await $fetch('http://localhost:3001/api/themes')
    const data = response.data || response
    // Фильтруем только активные темы для отображения в списке выбора
    const allThemes = JSON.parse(JSON.stringify(data))
    availableThemes.value = allThemes.filter(theme => theme.is_active === true)
  } catch (error) {
    console.error('Ошибка загрузки тематик:', error)
  }
}

// 🔧 Вспомогательные функции для SEO компонентов

// Парсинг FAQ JSON для SerpPreview
const parseFaqItems = (faqJson) => {
  if (!faqJson) return []
  try {
    const items = JSON.parse(faqJson)
    return Array.isArray(items) ? items : []
  } catch (e) {
    return []
  }
}

// Генерация robots content из отдельных полей
const generateRobotsContent = () => {
  const directives = []
  directives.push(form.robots_index ? 'index' : 'noindex')
  directives.push(form.robots_follow ? 'follow' : 'nofollow')
  if (form.robots_max_snippet !== -1) {
    directives.push(`max-snippet:${form.robots_max_snippet}`)
  }
  directives.push(`max-image-preview:${form.robots_max_image_preview || 'large'}`)
  if (form.robots_max_video_preview !== -1) {
    directives.push(`max-video-preview:${form.robots_max_video_preview}`)
  }
  if (form.robots_notranslate) directives.push('notranslate')
  if (form.robots_noimageindex) directives.push('noimageindex')
  return directives.join(', ')
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
      if (slot.value?.[key] !== undefined) {
        // Для полей механик не перезаписываем, если значение пустое в БД
        if (
          key.startsWith('mechanics_') &&
          (!slot.value[key] || slot.value[key].trim() === '')
        ) {
          // Оставляем значение по умолчанию из формы
          return
        }
        form.value[key] = slot.value[key]
      }
    })

    // Явно маппим поля стратегий из API (strategy_*) в форму (strategies_*)
    form.value.strategies_title =
      slot.value.strategy_title ?? form.value.strategies_title
    form.value.strategies_intro =
      slot.value.strategy_intro ?? form.value.strategies_intro
    form.value.strategies_beginners_title =
      slot.value.strategy_beginner_title ??
      form.value.strategies_beginners_title
    form.value.strategy_beginner_1 =
      slot.value.strategy_beginner_1 ?? form.value.strategy_beginner_1
    form.value.strategy_beginner_2 =
      slot.value.strategy_beginner_2 ?? form.value.strategy_beginner_2
    form.value.strategy_beginner_3 =
      slot.value.strategy_beginner_3 ?? form.value.strategy_beginner_3
    form.value.strategy_beginner_4 =
      slot.value.strategy_beginner_4 ?? form.value.strategy_beginner_4
    // В БД нет strategy_beginner_5 — оставляем как есть в форме
    form.value.strategies_advanced_title =
      slot.value.strategy_advanced_title ?? form.value.strategies_advanced_title
    form.value.strategy_advanced_1 =
      slot.value.strategy_advanced_1 ?? form.value.strategy_advanced_1
    form.value.strategy_advanced_2 =
      slot.value.strategy_advanced_2 ?? form.value.strategy_advanced_2
    form.value.strategy_advanced_3 =
      slot.value.strategy_advanced_3 ?? form.value.strategy_advanced_3
    form.value.strategy_advanced_4 =
      slot.value.strategy_advanced_4 ?? form.value.strategy_advanced_4

    // Заполняем отдельные массивы для механик, бонусов и тематик
    if (
      slot.value?.slot_mechanics &&
      Array.isArray(slot.value.slot_mechanics)
    ) {
      selectedMechanics.value = slot.value.slot_mechanics.map(
        (sm) => sm.mechanic_id,
      )
    }
    if (slot.value?.slot_bonuses && Array.isArray(slot.value.slot_bonuses)) {
      selectedBonuses.value = slot.value.slot_bonuses.map((sb) => sb.bonus_id)
    }
    // 🎨 Загружаем МНОЖЕСТВЕННЫЕ тематики (до 5 штук!)
    if (slot.value?.slotThemes && Array.isArray(slot.value.slotThemes)) {
      selectedThemes.value = slot.value.slotThemes.map((st) => st.theme_id)
      console.log(
        '✅ Загружено тематик:',
        selectedThemes.value.length,
        selectedThemes.value,
      )
    }

    // 🎯 Загружаем JSON-LD настройки в отдельную форму
    const jsonLdFields = [
      'jsonld_enabled', 'jsonld_type', 'jsonld_game_genre', 'jsonld_game_platform',
      'jsonld_content_rating', 'jsonld_is_free', 'jsonld_enable_product', 'jsonld_enable_review',
      'jsonld_enable_faq', 'jsonld_enable_howto', 'jsonld_enable_breadcrumb', 'jsonld_enable_video',
      'jsonld_review_author', 'jsonld_review_rating', 'jsonld_review_text',
      'jsonld_faq_json', 'jsonld_howto_json',
      'jsonld_video_url', 'jsonld_video_thumbnail', 'jsonld_video_duration', 'jsonld_video_description'
    ]
    jsonLdFields.forEach(field => {
      if (slot.value?.[field] !== undefined && slot.value[field] !== null) {
        jsonLdForm.value[field] = slot.value[field]
      }
    })
    console.log('✅ JSON-LD настройки загружены:', Object.keys(jsonLdForm.value).filter(k => jsonLdForm.value[k]))

    // 📊 ФАЗА 3: Загружаем SEO Health Score настройки
    const seoHealthFields = [
      'seo_health_score', 'seo_health_issues', 'seo_health_warnings',
      'seo_health_passed', 'seo_health_last_audit', 'seo_health_trend'
    ]
    seoHealthFields.forEach(field => {
      if (slot.value?.[field] !== undefined && slot.value[field] !== null) {
        seoHealthForm.value[field] = slot.value[field]
      }
    })

    // 📈 ФАЗА 3: Загружаем Indexing Status настройки
    const indexingFields = [
      'indexing_status', 'indexing_first_date', 'indexing_last_crawl', 'indexing_crawl_frequency',
      'indexing_impressions', 'indexing_clicks', 'indexing_position', 'indexing_internal_links',
      'indexing_external_links', 'indexing_last_check', 'indexing_errors'
    ]
    indexingFields.forEach(field => {
      if (slot.value?.[field] !== undefined && slot.value[field] !== null) {
        indexingForm.value[field] = slot.value[field]
      }
    })

    // ⚡ ФАЗА 3: Загружаем Page Speed / Core Web Vitals настройки
    const pageSpeedFields = [
      'cwv_lcp', 'cwv_fid', 'cwv_cls', 'cwv_ttfb', 'cwv_fcp', 'cwv_inp',
      'cwv_score_mobile', 'cwv_score_desktop', 'cwv_last_check', 'cwv_issues', 'cwv_opportunities'
    ]
    pageSpeedFields.forEach(field => {
      if (slot.value?.[field] !== undefined && slot.value[field] !== null) {
        pageSpeedForm.value[field] = slot.value[field]
      }
    })

    // 🗺️ ФАЗА 3: Загружаем Sitemap настройки
    const sitemapFields = [
      'sitemap_include', 'sitemap_priority', 'sitemap_frequency',
      'sitemap_last_mod', 'sitemap_images', 'sitemap_videos', 'sitemap_news'
    ]
    sitemapFields.forEach(field => {
      if (slot.value?.[field] !== undefined && slot.value[field] !== null) {
        sitemapForm.value[field] = slot.value[field]
      }
    })
    console.log('✅ ФАЗА 3: SEO аналитика загружена')

    // 🌍 Загружаем Geo Targeting из БД в technicalSeoForm
    if (slot.value?.geo_regions) {
      try {
        const regions = JSON.parse(slot.value.geo_regions)
        if (Array.isArray(regions) && regions.length > 0) {
          technicalSeoForm.value = {
            ...technicalSeoForm.value,
            regions: regions
          }
          console.log('✅ Geo Targeting загружен:', regions.length, 'регионов')
        }
      } catch (e) {
        console.warn('⚠️ Ошибка парсинга geo_regions:', e)
      }
    }

    // Если reels и rows не заданы, но есть game_field, пытаемся извлечь их
    if (slot.value?.game_field && (!slot.value?.reels || !slot.value?.rows)) {
      const match = slot.value.game_field.match(/(\d+)×(\d+)/)
      if (match) {
        if (!slot.value?.reels) form.value.reels = parseInt(match[1])
        if (!slot.value?.rows) form.value.rows = parseInt(match[2])
      }
    }

    // Определяем тип paylines (число или текст)
    if (slot.value?.paylines !== undefined) {
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

    // Авто-заполняем пустые Info Popup поля дефолтным контентом (как на клиенте)
    // generateInfoContent заполняет только пустые поля и вызывает initInfoArrays() в конце
    generateInfoContent()
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

// Функция для прокрутки к секции
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
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

    // Список полей, которые разрешены в UpdateSlotDto
    const allowedFields = [
      'slug',
      'name',
      'description',
      'hero_keyword', // Ключевое слово для заголовка Hero секции
      'hero_keyword_2', // Первая переменная в описании
      'hero_keyword_3', // Вторая переменная в описании
      'provider_id',
      'category_id',
      'media_type',
      'image_url',
      'video_url',
      'demo_url',
      'real_play_url',
      'rtp',
      'volatility',
      'max_win',
      'min_bet',
      'max_bet',
      'reels',
      'rows',
      'game_field',
      'paylines',
      'theme',
      'thumbnail_url',
      'screenshots',
      'features',
      'is_active',
      'is_mobile_compatible',
      'is_demo_available',
      'release_date',
      'rating',
      'rating_count',
      'popularity_rank',
      'popularity_percentage',
      'real_rtp',
      'bonus_frequency',
      'show_awards',
      'awards',
      // Полный обзор слота 2025
      'overview_title',
      'overview_keyword_1',
      'overview_keyword_2',
      'overview_keyword_3',
      'overview_description_1',
      'overview_description_2',
      'overview_features_title',
      'overview_features_1',
      'overview_features_2',
      'overview_features_3',
      'overview_features_4',
      'overview_features_5',
      'overview_features_6',
      // Раздел "Насколько популярен"
      'popularity_title',
      'popularity_title_keyword',
      'popularity_global_rank',
      'popularity_global_desc',
      'popularity_players_count',
      'popularity_players_desc',
      'popularity_rtp_score',
      'popularity_rtp_desc',
      // Заголовки подразделов
      'popularity_stats_title',
      'popularity_trend_title',
      'popularity_facts_title',
      // Статистика по годам
      'popularity_year_1',
      'popularity_rank_1',
      'popularity_width_1',
      'popularity_label_1',
      'popularity_year_2',
      'popularity_rank_2',
      'popularity_width_2',
      'popularity_label_2',
      'popularity_year_3',
      'popularity_rank_3',
      'popularity_width_3',
      'popularity_label_3',
      'popularity_year_4',
      'popularity_rank_4',
      'popularity_width_4',
      'popularity_label_4',
      // Ключевые факты
      'popularity_fact_icon_1',
      'popularity_fact_text_1',
      'popularity_fact_icon_2',
      'popularity_fact_text_2',
      'popularity_fact_icon_3',
      'popularity_fact_text_3',
      'popularity_fact_icon_4',
      'popularity_fact_text_4',
      // Тренд популярности
      'popularity_trend_y1',
      'popularity_trend_y2',
      'popularity_trend_y3',
      'popularity_trend_y4',
      // Основные механики
      'mechanics_title',
      'mechanics_intro',
      'mechanics_scatter_title',
      'mechanics_scatter_description',
      'mechanics_scatter_details',
      'mechanics_cascade_title',
      'mechanics_cascade_description',
      'mechanics_cascade_details',
      'mechanics_multipliers_title',
      'mechanics_multipliers_description',
      'mechanics_multipliers_details',
      'mechanics_multipliers_important_title',
      'mechanics_multipliers_important',
      // Дополнительные механики
      'mechanics_freespins_title',
      'mechanics_freespins_description',
      'mechanics_freespins_details',
      'mechanics_wilds_title',
      'mechanics_wilds_description',
      'mechanics_wilds_details',
      'mechanics_bonus_title',
      'mechanics_bonus_description',
      'mechanics_bonus_details',
      // Бесплатные спины
      'free_spins_title',
      'free_spins_intro',
      'free_spins_instant_title',
      'free_spins_4_scatter',
      'free_spins_4_scatter_desc',
      'free_spins_5_scatter',
      'free_spins_5_scatter_desc',
      'free_spins_6_scatter',

  'info_expert_verdict',
  'info_pros',
  'info_cons',
  'info_faq',
  'info_reviews',
  'info_how_to_play',
  'info_demo_cta',
  'geo_regions',
  'free_spins_features_title',
      'free_spins_feature_1',
      'free_spins_feature_2',
      'free_spins_feature_3',
      'free_spins_feature_4',
      // Ante Bet / Bonus Buy
      'ante_bet_title',
      'ante_bet_description',
      'ante_bet_warning',
      'free_spins_ante_title',
      'free_spins_ante_description',
      'free_spins_ante_bet_value',
      'free_spins_ante_bet_effect',
      // FAQ
      'faq_title',
      'faq_q1_emoji',
      'faq_q1_question',
      'faq_q1_answer',
      'faq_q2_emoji',
      'faq_q2_question',
      'faq_q2_answer',
      'faq_q3_emoji',
      'faq_q3_question',
      'faq_q3_answer',
      'faq_q4_emoji',
      'faq_q4_question',
      'faq_q4_answer',
      // Отзывы игроков - заголовки и статистика
      'reviews_title',
      'reviews_subtitle',
      // Карточки статистики
      'reviews_overall_rating',
      'reviews_overall_label',
      'reviews_overall_stars',
      'reviews_total_count',
      'reviews_total_label',
      'reviews_total_desc',
      'reviews_positive_percent',
      'reviews_positive_label',
      'reviews_positive_desc',
      'reviews_recommend_percent',
      'reviews_recommend_label',
      'reviews_recommend_desc',
      // Заголовки секций
      'reviews_distribution_title',
      'reviews_sentiments_title',
      'reviews_featured_title',
      // Распределение оценок
      'reviews_5_stars_percent',
      'reviews_5_stars_count',
      'reviews_4_stars_percent',
      'reviews_4_stars_count',
      'reviews_3_stars_percent',
      'reviews_3_stars_count',
      'reviews_2_stars_percent',
      'reviews_2_stars_count',
      'reviews_1_stars_percent',
      'reviews_1_stars_count',
      // Ключевые моменты из отзывов (sentiment analysis)
      'reviews_sentiment_1_title',
      'reviews_sentiment_1_desc',
      'reviews_sentiment_2_title',
      'reviews_sentiment_2_desc',
      'reviews_sentiment_3_title',
      'reviews_sentiment_3_desc',
      'reviews_sentiment_4_title',
      'reviews_sentiment_4_desc',
      // Индивидуальные отзывы
      'review_1_author',
      'review_1_avatar_letter',
      'review_1_rating',
      'review_1_badge',
      'review_1_text',
      'review_1_likes',
      'review_1_replies',
      'review_1_date',
      'review_2_author',
      'review_2_avatar_letter',
      'review_2_rating',
      'review_2_badge',
      'review_2_text',
      'review_2_likes',
      'review_2_replies',
      'review_2_date',
      'review_3_author',
      'review_3_avatar_letter',
      'review_3_rating',
      'review_3_badge',
      'review_3_text',
      'review_3_likes',
      'review_3_replies',
      'review_3_date',
      // Профессиональная оценка - заголовки и общая информация
      'prof_rating_title',
      'prof_rating_subtitle',
      'prof_rating_overall_title',
      'prof_rating_overall_desc',
      'prof_rating_overall_score',
      'prof_rating_overall_stars',
      // Детальные метрики (5 категорий оценки)
      'prof_rating_metric_1_emoji',
      'prof_rating_metric_1_name',
      'prof_rating_metric_1_score',
      'prof_rating_metric_2_emoji',
      'prof_rating_metric_2_name',
      'prof_rating_metric_2_score',
      'prof_rating_metric_3_emoji',
      'prof_rating_metric_3_name',
      'prof_rating_metric_3_score',
      'prof_rating_metric_4_emoji',
      'prof_rating_metric_4_name',
      'prof_rating_metric_4_score',
      'prof_rating_metric_5_emoji',
      'prof_rating_metric_5_name',
      'prof_rating_metric_5_score',
      // Экспертное заключение
      'prof_rating_expert_title', // Заголовок секции
      'prof_rating_expert_name', // Имя эксперта (badge)
      'prof_rating_expert_position', // Должность эксперта
      'prof_rating_expert_quote', // Цитата эксперта
      'prof_rating_expert_quote_keyword', // Ключевое слово для цитаты
      // Предупреждение о волатильности
      'prof_rating_warning_title',
      'prof_rating_warning_text',
      // Преимущества
      'prof_rating_pros_title',
      'prof_rating_pros_1_title',
      'prof_rating_pros_1_desc',
      'prof_rating_pros_2_title',
      'prof_rating_pros_2_desc',
      'prof_rating_pros_3_title',
      'prof_rating_pros_3_desc',
      'prof_rating_pros_4_title',
      'prof_rating_pros_4_desc',
      'prof_rating_pros_5_title',
      'prof_rating_pros_5_desc',
      // Недостатки
      'prof_rating_cons_title',
      'prof_rating_cons_1_title',
      'prof_rating_cons_1_desc',
      'prof_rating_cons_2_title',
      'prof_rating_cons_2_desc',
      'prof_rating_cons_3_title',
      'prof_rating_cons_3_desc',
      'prof_rating_cons_4_title',
      'prof_rating_cons_4_desc',
      'prof_rating_cons_5_title',
      'prof_rating_cons_5_desc',
      // Итоговая рекомендация
      'prof_rating_recommendation_title',
      'prof_rating_recommendation_subtitle',
      'prof_rating_recommendation_text',
      'prof_rating_recommendation_keyword',
      // Секция "Заключение" (Conclusion)
      'conclusion_title',
      'conclusion_rating_title', // Заголовок Final Rating с плейсхолдером
      'conclusion_rating_keyword', // Ключевое слово для Final Rating
      'conclusion_text_1',
      'conclusion_text_1_keyword', // Ключевое слово для Paragraph 1
      'conclusion_text_2',
      'conclusion_suitable_title', // Заголовок секции "Кому подходит"
      'conclusion_suitable_1',
      'conclusion_suitable_2',
      'conclusion_suitable_3',
      'conclusion_suitable_4',
      'conclusion_warning_title', // Заголовок секции "Важно помнить"
      'conclusion_warning_1',
      'conclusion_warning_2',
      'conclusion_warning_3',
      'conclusion_warning_4',
      'conclusion_verdict_title', // Заголовок секции Финальный вердикт
      'conclusion_verdict_text', // Текст финального вердикта
      'conclusion_verdict_keyword', // Ключевое слово для финального вердикта
      // Секция CTA "Время побеждать"
      'cta_title',
      'cta_subtitle',
      'cta_subtitle_keyword', // Ключевое слово для subtitle
      'cta_potential',
      'cta_potential_prefix', // Текст перед win potential
      'cta_potential_suffix', // Текст после win potential
      'cta_feature_1_emoji',
      'cta_feature_1_title',
      'cta_feature_1_desc',
      'cta_feature_2_emoji',
      'cta_feature_2_title',
      'cta_feature_2_desc',
      'cta_feature_3_emoji',
      'cta_feature_3_title',
      'cta_feature_3_desc',
      'cta_button_demo_emoji',
      'cta_button_demo_text',
      'cta_button_demo_url',
      'cta_button_real_emoji',
      'cta_button_real_text',
      'cta_button_real_url',
      'cta_trust_1_text',
      'cta_trust_2_text',
      'cta_trust_3_text',
      // 🎯 JSON-LD настройки для SEO
      'jsonld_enabled',
      'jsonld_type',
      'jsonld_game_genre',
      'jsonld_game_platform',
      'jsonld_content_rating',
      'jsonld_is_free',
      'jsonld_enable_product',
      'jsonld_enable_review',
      'jsonld_enable_faq',
      'jsonld_enable_howto',
      'jsonld_enable_breadcrumb',
      'jsonld_enable_video',
      'jsonld_review_author',
      'jsonld_review_rating',
      'jsonld_review_text',
      'jsonld_faq_json',
      'jsonld_howto_json',
      'jsonld_video_url',
      'jsonld_video_thumbnail',
      'jsonld_video_duration',
      'jsonld_video_description',
      // ========== SEO МЕТА-ТЕГИ ==========
      'seo_title',
      'seo_description',
      'seo_keywords_primary',
      'seo_keywords_lsi',
      'seo_keywords_geo',
      'content_language',
      'geo_target_regions',
      // Title Templates
      'seo_title_template',
      'seo_title_power_words',
      'seo_title_use_template',
      'search_intent',
      'canonical_url',
      // ========== OPEN GRAPH ТЕГИ ==========
      'og_title',
      'og_description',
      'og_image',
      'og_type',
      'og_url',
      'og_site_name',
      'og_locale',
      'og_locale_alternate',
      'og_video',
      'og_video_type',
      'og_video_width',
      'og_video_height',
      'og_image_width',
      'og_image_height',
      'og_image_alt',
      // ========== TWITTER CARD ТЕГИ ==========
      'twitter_card',
      'twitter_site',
      'twitter_creator',
      'twitter_title',
      'twitter_description',
      'twitter_image',
      'twitter_image_alt',
      'twitter_player',
      'twitter_player_width',
      'twitter_player_height',
      // ========== ROBOTS DIRECTIVES ==========
      'robots_index',
      'robots_follow',
      'robots_max_snippet',
      'robots_max_image_preview',
      'robots_max_video_preview',
      'robots_notranslate',
      'robots_noimageindex',
      'robots_unavailable_after',
      // ========== HREFLANG ==========
      'hreflang_enabled',
      'hreflang_x_default',
      'hreflang_config',
      'hreflang_preset',
      // ========== ТЕХНИЧЕСКИЕ SEO ==========
      'author_meta',
      'publisher_meta',
      'copyright_meta',
      'last_reviewed_date',
      'content_updated_at',
      // Core Web Vitals Hints
      'preconnect_urls',
      'preload_image',
      'dns_prefetch_urls',
      // ========== E-E-A-T СИГНАЛЫ ==========
      'eeat_experience_date',
      'eeat_experience_hours',
      'eeat_experience_sessions',
      'eeat_experience_screenshots',
      'eeat_author_name',
      'eeat_author_position',
      'eeat_author_bio',
      'eeat_author_avatar',
      'eeat_author_social',
      'eeat_expertise_years',
      'eeat_reviews_count',
      'eeat_certifications',
      'eeat_partnerships',
      'eeat_citations_count',
      'eeat_awards',
      'eeat_featured_in',
      'eeat_data_sources',
      'eeat_fact_checked',
      'eeat_fact_check_date',
      'eeat_methodology',
      'eeat_disclaimer',
      'eeat_license_info',
      // ========== CONTENT FRESHNESS ==========
      'content_published_date',
      'content_major_update',
      'content_minor_update',
      'content_reviewed_date',
      'content_version',
      'content_changelog',
      'content_update_frequency',
      'content_next_review',
      'content_freshness_score',
      // ========== SOCIAL SHARING ==========
      'social_share_count',
      'social_facebook_shares',
      'social_twitter_shares',
      'social_pinterest_shares',
      'social_custom_hashtags',
      'social_cta_text',
      // ========== CONVERSION OPTIMIZATION ==========
      'cta_primary_text',
      'cta_primary_url',
      'cta_secondary_text',
      'cta_secondary_url',
      'cta_urgency_text',
      'cta_social_proof',
      // ========== ФАЗА 3: Поля аналитики и производительности ==========
      // Keyword Density
      'keyword_primary_target',
      'keyword_density_score',
      'keyword_analysis_date',
      'keyword_analysis_result',
      'keyword_suggestions',
      'keyword_competitors',
      // Indexing Status
      'indexing_status',
      'indexing_first_date',
      'indexing_last_crawl',
      'indexing_crawl_frequency',
      'indexing_impressions',
      'indexing_clicks',
      'indexing_position',
      'indexing_internal_links',
      'indexing_external_links',
      'indexing_last_check',
      'indexing_errors',
      // Core Web Vitals
      'cwv_lcp',
      'cwv_fid',
      'cwv_cls',
      'cwv_ttfb',
      'cwv_fcp',
      'cwv_inp',
      'cwv_score_mobile',
      'cwv_score_desktop',
      'cwv_last_check',
      'cwv_issues',
      'cwv_opportunities',
      // Sitemap
      'sitemap_include',
      'sitemap_priority',
      'sitemap_frequency',
      'sitemap_last_mod',
      'sitemap_images',
      'sitemap_videos',
      'sitemap_news',
      // SEO Health Score
      'seo_health_score',
      'seo_health_issues',
      'seo_health_warnings',
      'seo_health_passed',
      'seo_health_last_audit',
      'seo_health_trend',
      // Competitor Analysis
      'competitor_urls',
      'competitor_positions',
      'competitor_last_check',
      // ========== 👤 ИНФОРМАЦИЯ ОБ АВТОРЕ И ДАТЕ ОБНОВЛЕНИЯ ==========
      'article_author_name',
      'article_author_role',
      'article_author_photo',
      'article_author_bio',
      'article_author_social_linkedin',
      'article_author_social_twitter',
      'article_author_social_website',
      'article_published_date',
      'article_updated_date',
      'article_updated_time',
      'article_updated_by',
      'article_reading_time',
      'article_reading_time_label',
      'article_show_author_block',
      'article_show_reading_time',
      'article_show_update_date',
    ]

    // Подготавливаем данные для отправки - только разрешенные поля
    const dataToSend = {}

    // 🎯 Добавляем JSON-LD поля из отдельной формы
    Object.keys(jsonLdForm.value).forEach((key) => {
      if (jsonLdForm.value[key] !== undefined && jsonLdForm.value[key] !== null) {
        dataToSend[key] = jsonLdForm.value[key]
      }
    })

    // 📊 ФАЗА 3: Добавляем SEO Health Score поля
    Object.keys(seoHealthForm.value).forEach((key) => {
      if (seoHealthForm.value[key] !== undefined) {
        dataToSend[key] = seoHealthForm.value[key]
      }
    })

    // 📈 ФАЗА 3: Добавляем Indexing Status поля
    Object.keys(indexingForm.value).forEach((key) => {
      if (indexingForm.value[key] !== undefined) {
        dataToSend[key] = indexingForm.value[key]
      }
    })

    // ⚡ ФАЗА 3: Добавляем Page Speed / Core Web Vitals поля
    Object.keys(pageSpeedForm.value).forEach((key) => {
      if (pageSpeedForm.value[key] !== undefined) {
        dataToSend[key] = pageSpeedForm.value[key]
      }
    })

    // 🗺️ ФАЗА 3: Добавляем Sitemap поля
    Object.keys(sitemapForm.value).forEach((key) => {
      if (sitemapForm.value[key] !== undefined) {
        dataToSend[key] = sitemapForm.value[key]
      }
    })

    console.log('🔍 Форма перед сохранением:', form.value)
    console.log('📋 Разрешенные поля:', allowedFields)

    // Специальная проверка overview_features полей
    console.log('🎯 Проверка overview_features:')
    for (let i = 1; i <= 6; i++) {
      const fieldName = `overview_features_${i}`
      console.log(`  ${fieldName}:`, form.value[fieldName])
    }

    // Копируем только разрешенные поля из формы
    allowedFields.forEach((field) => {
      if (form.value[field] !== undefined) {
        // Специальная обработка для числовых полей
        if (field.startsWith('popularity_width_')) {
          dataToSend[field] = parseInt(form.value[field]) || 0
        } else if (field.startsWith('popularity_trend_y')) {
          // Для графика: null если пусто, иначе число
          dataToSend[field] =
            form.value[field] === null ? null : parseInt(form.value[field])
        } else {
          dataToSend[field] = form.value[field]
        }
        console.log(`✅ Копируем поле ${field}:`, form.value[field])
      } else {
        console.log(`❌ Пропускаем поле ${field}: undefined`)
      }
    })

    // Маппинг полей стратегий из формы (strategies_*) в DTO бэкенда (strategy_*)
    dataToSend.strategy_title = form.value.strategies_title
    dataToSend.strategy_intro = form.value.strategies_intro
    dataToSend.strategy_beginner_title = form.value.strategies_beginners_title
    dataToSend.strategy_beginner_1 = form.value.strategy_beginner_1
    dataToSend.strategy_beginner_2 = form.value.strategy_beginner_2
    dataToSend.strategy_beginner_3 = form.value.strategy_beginner_3
    dataToSend.strategy_beginner_4 = form.value.strategy_beginner_4
    dataToSend.strategy_advanced_title = form.value.strategies_advanced_title
    dataToSend.strategy_advanced_1 = form.value.strategy_advanced_1
    dataToSend.strategy_advanced_2 = form.value.strategy_advanced_2
    dataToSend.strategy_advanced_3 = form.value.strategy_advanced_3
    dataToSend.strategy_advanced_4 = form.value.strategy_advanced_4
    // Важные предупреждения
    dataToSend.strategy_warnings_title = form.value.strategy_warnings_title
    dataToSend.strategy_warning_1_title = form.value.strategy_warning_1_title
    dataToSend.strategy_warning_1_text = form.value.strategy_warning_1_text
    dataToSend.strategy_warning_2_title = form.value.strategy_warning_2_title
    dataToSend.strategy_warning_2_text = form.value.strategy_warning_2_text
    // В чем секрет успеха
    dataToSend.success_secret_title = form.value.success_secret_title
    dataToSend.success_secret_intro = form.value.success_secret_intro
    dataToSend.success_secret_card_1_title =
      form.value.success_secret_card_1_title
    dataToSend.success_secret_card_1_text =
      form.value.success_secret_card_1_text
    dataToSend.success_secret_card_2_title =
      form.value.success_secret_card_2_title
    dataToSend.success_secret_card_2_text =
      form.value.success_secret_card_2_text
    dataToSend.success_secret_outro = form.value.success_secret_outro

    // Добавляем данные из отдельных переменных
    dataToSend.selected_mechanics = selectedMechanics.value
    dataToSend.selected_bonuses = selectedBonuses.value
    dataToSend.selected_themes = selectedThemes.value

    // 🌍 Geo Targeting — сохраняем выбранные регионы из TechnicalSEO
    dataToSend.geo_regions = JSON.stringify(technicalSeoForm.value.regions || [])

    // Автоматически формируем game_field из reels и rows
    dataToSend.game_field =
      form.value.reels && form.value.rows
        ? `${form.value.reels}×${form.value.rows}`
        : form.value.game_field

    // Отладочный вывод данных перед отправкой
    console.log('Отправляем данные:', {
      url,
      method,
      data: dataToSend,
    })

    const response = await $fetch(url, {
      method,
      body: dataToSend,
    })

    // Отладочный вывод ответа
    console.log('Ответ сервера:', response)

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
  console.error('❌ Ошибка загрузки изображения:', form.value.image_url)
  imageLoading.value = false
  imageError.value = true
  event.target.style.display = 'none'
}

const handleImageLoad = (event) => {
  console.log('✅ Изображение успешно загружено:', form.value.image_url)
  imageLoading.value = false
  imageError.value = false
  event.target.style.display = 'block'
}

// 🪄 Авто-генерация JSON-LD контента (использует данные из Info Popup Content)
const autoGenerateJsonLd = () => {
  const slotName = form.value.name || 'этот слот'

  // Сначала убедимся, что Info Popup Content заполнен
  if (!form.value.info_faq || !form.value.info_reviews || !form.value.info_how_to_play) {
    generateInfoContent()
  }

  // Enable all schemas
  jsonLdForm.value.jsonld_enable_review = true
  jsonLdForm.value.jsonld_enable_aggregate = true
  jsonLdForm.value.jsonld_enable_faq = true
  jsonLdForm.value.jsonld_enable_howto = true
  jsonLdForm.value.jsonld_enable_breadcrumb = true

  // Review & AggregateRating — из info_reviews
  try {
    const reviews = JSON.parse(form.value.info_reviews || '[]')
    if (reviews.length > 0) {
      jsonLdForm.value.jsonld_review_author = reviews[0].author || 'SlotQuest Editorial Team'
      jsonLdForm.value.jsonld_review_rating = reviews[0].rating || 5
      jsonLdForm.value.jsonld_review_text = reviews[0].text || ''
      // AggregateRating из всех отзывов
      const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
      jsonLdForm.value.jsonld_aggregate_rating = Math.round(avgRating * 10) / 10
      jsonLdForm.value.jsonld_aggregate_count = reviews.length
    }
  } catch(e) {
    jsonLdForm.value.jsonld_review_author = 'SlotQuest Editorial Team'
    jsonLdForm.value.jsonld_review_rating = 4.5
    jsonLdForm.value.jsonld_review_text = slotName + ' — отличный выбор для любителей качественных слотов.'
    jsonLdForm.value.jsonld_aggregate_rating = 4.5
    jsonLdForm.value.jsonld_aggregate_count = 3
  }

  // FAQ — напрямую из info_faq
  jsonLdForm.value.jsonld_faq_json = form.value.info_faq || '[]'

  // HowTo — из info_how_to_play (адаптируем формат)
  try {
    const steps = JSON.parse(form.value.info_how_to_play || '[]')
    jsonLdForm.value.jsonld_howto_json = JSON.stringify(
      steps.map((s, i) => ({ step: i + 1, name: s.step, text: s.text }))
    )
  } catch(e) {
    jsonLdForm.value.jsonld_howto_json = '[]'
  }

  alert('✅ JSON-LD схемы синхронизированы с Info Popup Content!')
}

const handleVideoError = (event) => {
  event.target.style.display = 'none'
}

const handleVideoLoad = (event) => {
  event.target.style.display = 'block'
}

// Расчёт SEO Score для Meta тегов (0-100%)
const calculateMetaScore = () => {
  let score = 0
  const titleLen = (form.value.seo_title || '').length
  const descLen = (form.value.seo_description || '').length
  const hasKeywords = (form.value.seo_keywords_primary || '').length > 0
  const hasSlug = (form.value.slug || '').length > 0

  // Title Score (25 points)
  if (titleLen >= 50 && titleLen <= 60) {
    score += 25
  } else if (titleLen >= 30 && titleLen < 50) {
    score += 15
  } else if (titleLen > 0 && titleLen < 30) {
    score += 5
  }

  // Description Score (25 points)
  if (descLen >= 150 && descLen <= 160) {
    score += 25
  } else if (descLen >= 100 && descLen < 150) {
    score += 15
  } else if (descLen > 0 && descLen < 100) {
    score += 5
  }

  // Keywords Score (25 points)
  if (hasKeywords) {
    score += 25
  }

  // Slug Score (25 points)
  if (hasSlug) {
    score += 25
  }

  return score
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
      if (slot.value?.[key] !== undefined) {
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

// ========== ФУНКЦИИ АВТО-ГЕНЕРАЦИИ SEO ==========

// Генерация авто-title (для preview)
const generateAutoTitle = () => {
  const name = form.value.name || 'Slot'
  const provider = slot.value?.providers?.name || ''
  const rtp = form.value.rtp || ''

  // Формат: "Name Slot by Provider | RTP% | Play Free | SlotQuest"
  let title = `${name}`
  if (provider) title += ` by ${provider}`
  if (rtp) title += ` | RTP ${rtp}%`
  title += ' | Play Free'

  // Обрезаем до 60 символов
  if (title.length > 60) {
    title = title.substring(0, 57) + '...'
  }

  return title
}

// Генерация авто-description (для preview)
const generateAutoDescription = () => {
  const name = form.value.name || 'this exciting slot'
  const provider = slot.value?.providers?.name || 'top provider'
  const rtp = form.value.rtp || '96'
  const volatility = form.value.volatility || 'medium'
  const maxWin = form.value.max_win || '5000'

  // Формат: "Play Name slot by Provider. RTP%, Volatility volatility, Max Win x. Free demo & real money!"
  let desc = `Play ${name} slot by ${provider}. RTP ${rtp}%, ${volatility} volatility, max win ${maxWin}x. Free demo available!`

  // Обрезаем до 160 символов
  if (desc.length > 160) {
    desc = desc.substring(0, 157) + '...'
  }

  return desc
}

// Функция для кнопки авто-генерации Title
const generateSeoTitle = () => {
  form.value.seo_title = generateAutoTitle()
}

// Функция для кнопки авто-генерации Description
const generateSeoDescription = () => {
  form.value.seo_description = generateAutoDescription()
}

// ========== ФУНКЦИИ ДЛЯ OPEN GRAPH ==========

// Получение длины OG Title (учитывая fallback)
const getOgTitleLen = () => {
  return (form.value.og_title || form.value.seo_title || '').length
}

// Получение длины OG Description (учитывая fallback)
const getOgDescLen = () => {
  return (form.value.og_description || form.value.seo_description || '').length
}

// Получение URL OG Image (учитывая fallback)
const getOgImageUrl = () => {
  return form.value.og_image || form.value.image_url || ''
}

// Расчёт OG Score (0-100%)
const calculateOgScore = () => {
  let score = 0
  const titleLen = getOgTitleLen()
  const descLen = getOgDescLen()
  const hasImage = !!getOgImageUrl()
  const hasType = !!form.value.og_type

  // Title Score (25 points) - оптимально 60-90
  if (titleLen >= 60 && titleLen <= 90) {
    score += 25
  } else if (titleLen >= 40 && titleLen < 60) {
    score += 15
  } else if (titleLen > 0) {
    score += 5
  }

  // Description Score (25 points) - оптимально 150-250
  if (descLen >= 150 && descLen <= 250) {
    score += 25
  } else if (descLen >= 100 && descLen < 150) {
    score += 15
  } else if (descLen > 0) {
    score += 5
  }

  // Image Score (30 points)
  if (hasImage) {
    score += 30
  }

  // Type Score (20 points)
  if (hasType) {
    score += 20
  } else {
    score += 10 // Частичный балл за дефолтное значение
  }

  return score
}

// Генерация авто OG Title
const generateAutoOgTitle = () => {
  const name = form.value.name || 'Slot Game'
  const provider = slot.value?.providers?.name || ''

  let title = `🎰 ${name}`
  if (provider) title += ` by ${provider}`
  title += ' - Play Free Demo'

  if (title.length > 90) {
    title = title.substring(0, 87) + '...'
  }

  return title
}

// Генерация авто OG Description
const generateAutoOgDescription = () => {
  const name = form.value.name || 'this slot'
  const provider = slot.value?.providers?.name || 'top provider'
  const rtp = form.value.rtp || '96'
  const volatility = form.value.volatility || 'medium'
  const maxWin = form.value.max_win || '5000'

  let desc = `🎰 Play ${name} slot by ${provider} for free! Features: RTP ${rtp}%, ${volatility} volatility, max win ${maxWin}x. Try demo mode or play for real money. No download required!`

  if (desc.length > 250) {
    desc = desc.substring(0, 247) + '...'
  }

  return desc
}

// Копирование из SEO Title
const copyFromSeoTitle = () => {
  form.value.og_title = form.value.seo_title || generateAutoTitle()
}

// Копирование из SEO Description
const copyFromSeoDescription = () => {
  form.value.og_description = form.value.seo_description || generateAutoDescription()
}

// Копирование изображения из слота
const copyFromMainImage = () => {
  form.value.og_image = form.value.image_url || ''
}

// Обработка ошибки загрузки OG изображения
const handleOgImageError = (event) => {
  event.target.style.display = 'none'
}

// ========== ФУНКЦИИ ДЛЯ TWITTER CARD ==========

// Получение длины Twitter Title (учитывая fallback)
const getTwitterTitleLen = () => {
  return (form.value.twitter_title || form.value.og_title || form.value.seo_title || '').length
}

// Получение длины Twitter Description (учитывая fallback)
const getTwitterDescLen = () => {
  return (form.value.twitter_description || form.value.og_description || form.value.seo_description || '').length
}

// Получение URL Twitter Image (учитывая fallback)
const getTwitterImageUrl = () => {
  return form.value.twitter_image || form.value.og_image || form.value.image_url || ''
}

// Расчёт Twitter Score (0-100%)
const calculateTwitterScore = () => {
  let score = 0
  const titleLen = getTwitterTitleLen()
  const descLen = getTwitterDescLen()
  const hasImage = !!getTwitterImageUrl()
  const hasLargeCard = form.value.twitter_card === 'summary_large_image'

  // Title Score (25 points) - оптимально 40-70
  if (titleLen >= 40 && titleLen <= 70) {
    score += 25
  } else if (titleLen >= 30 && titleLen < 40) {
    score += 15
  } else if (titleLen > 0) {
    score += 5
  }

  // Description Score (25 points) - оптимально 100-200
  if (descLen >= 100 && descLen <= 200) {
    score += 25
  } else if (descLen >= 80 && descLen < 100) {
    score += 15
  } else if (descLen > 0) {
    score += 5
  }

  // Image Score (30 points)
  if (hasImage) {
    score += 30
  }

  // Card Type Score (20 points)
  if (hasLargeCard) {
    score += 20
  } else if (form.value.twitter_card) {
    score += 10
  }

  return score
}

// Копирование из OG Title
const copyFromOgTitle = () => {
  form.value.twitter_title = form.value.og_title || form.value.seo_title || generateAutoTitle()
}

// Копирование из OG Description
const copyFromOgDescription = () => {
  form.value.twitter_description = form.value.og_description || form.value.seo_description || generateAutoDescription()
}

// Копирование изображения из OG
const copyFromOgImage = () => {
  form.value.twitter_image = form.value.og_image || form.value.image_url || ''
}

// Обработка ошибки загрузки Twitter изображения
const handleTwitterImageError = (event) => {
  event.target.style.display = 'none'
}

// Функции для управления секциями
const closeAllSections = () => {
  // Основные секции
  showHeroSection.value = false
  showBasicSection.value = false
  showHeroLinksSection.value = false
  showGameCharacteristicsSection.value = false
  showRatingSection.value = false
  showMechanicsSection.value = false
  showBonusesSection.value = false
  showThemesSection.value = false

  // Overview секции
  showFullOverviewSection.value = false
  showOverviewMainSection.value = false
  showOverviewPopularitySection.value = false
  showOverviewSuccessSecretSection.value = false
  showOverviewMechanicsSection.value = false
  showOverviewFreeSpinsSection.value = false
  showOverviewStrategiesSection.value = false

  // Popularity секции
  showPopularitySection.value = false
  showPopularityTitleSection.value = false
  showPopularityMetricsSection.value = false
  showPopularityConclusionSection.value = false

  // Rating & Awards секции
  showRatingAwardsSection.value = false
  showRatingTitleSection.value = false
  showRatingMainSection.value = false
  showRatingDetailsSection.value = false
  showAwardsSection.value = false
}

const openAllSections = () => {
  // Основные секции
  showHeroSection.value = true
  showBasicSection.value = true
  showHeroLinksSection.value = true
  showGameCharacteristicsSection.value = true
  showRatingSection.value = true
  showMechanicsSection.value = true
  showBonusesSection.value = true
  showThemesSection.value = true

  // Overview секции
  showFullOverviewSection.value = true
  showOverviewMainSection.value = true
  showOverviewPopularitySection.value = true
  showOverviewSuccessSecretSection.value = true
  showOverviewMechanicsSection.value = true
  showOverviewFreeSpinsSection.value = true
  showOverviewStrategiesSection.value = true

  // Popularity секции
  showPopularitySection.value = true
  showPopularityTitleSection.value = true
  showPopularityMetricsSection.value = true
  showPopularityConclusionSection.value = true

  // Rating & Awards секции
  showRatingAwardsSection.value = true
  showRatingTitleSection.value = true
  showRatingMainSection.value = true
  showRatingDetailsSection.value = true
  showAwardsSection.value = true
}

// Структура секций для поиска
const searchableItems = [
  // Основные секции
  {
    id: 'hero',
    name: 'Hero Секция',
    section: 'showHeroSection',
    keywords: ['hero', 'главная', 'основная', 'заголовок'],
  },
  {
    id: 'basic',
    name: 'Основная информация',
    section: 'showBasicSection',
    parent: 'showHeroSection',
    keywords: ['основная', 'название', 'слаг', 'описание', 'провайдер'],
  },
  {
    id: 'links',
    name: 'Кнопки Hero секции',
    section: 'showHeroLinksSection',
    parent: 'showHeroSection',
    keywords: ['кнопки', 'ссылки', 'demo', 'real', 'бесплатно', 'деньги'],
  },
  {
    id: 'characteristics',
    name: 'Характеристики игры',
    section: 'showGameCharacteristicsSection',
    parent: 'showHeroSection',
    keywords: [
      'характеристики',
      'rtp',
      'волатильность',
      'ставка',
      'выигрыш',
      'линии',
    ],
  },
  {
    id: 'rating',
    name: 'Рейтинг и популярность',
    section: 'showRatingSection',
    parent: 'showHeroSection',
    keywords: ['рейтинг', 'популярность', 'позиция', 'оценка'],
  },
  {
    id: 'mechanics',
    name: 'Игровые механики',
    section: 'showMechanicsSection',
    parent: 'showHeroSection',
    keywords: ['механики', 'игровые', 'функции'],
  },
  {
    id: 'bonuses',
    name: 'Бонусы Hero секции',
    section: 'showBonusesSection',
    parent: 'showHeroSection',
    keywords: ['бонусы', 'акции', 'предложения'],
  },
  {
    id: 'themes',
    name: 'Тематики Hero секции',
    section: 'showThemesSection',
    parent: 'showHeroSection',
    keywords: ['тематики', 'темы', 'категории'],
  },

  // Секция "Полный обзор слота 2025"
  {
    id: 'overview',
    name: 'Полный обзор слота 2025',
    section: 'showFullOverviewSection',
    keywords: ['обзор', 'полный', '2025', 'описание'],
  },
  {
    id: 'overview-main',
    name: 'Основное описание',
    section: 'showOverviewMainSection',
    parent: 'showFullOverviewSection',
    keywords: ['основное', 'описание', 'главное'],
  },
  {
    id: 'overview-popularity',
    name: 'Насколько популярен',
    section: 'showOverviewPopularitySection',
    parent: 'showFullOverviewSection',
    keywords: ['популярность', 'популярен', 'статистика'],
  },
  {
    id: 'overview-secret',
    name: 'В чем секрет успеха?',
    section: 'showOverviewSuccessSecretSection',
    parent: 'showFullOverviewSection',
    keywords: ['секрет', 'успех', 'причины'],
  },
  {
    id: 'overview-mechanics',
    name: 'Основные механики',
    section: 'showOverviewMechanicsSection',
    parent: 'showFullOverviewSection',
    keywords: ['механики', 'основные', 'функции'],
  },
  {
    id: 'overview-freespins',
    name: 'Бесплатные спины',
    section: 'showOverviewFreeSpinsSection',
    parent: 'showFullOverviewSection',
    keywords: ['бесплатные', 'спины', 'фриспины', 'free spins'],
  },
  {
    id: 'overview-strategies',
    name: 'Стратегии и советы',
    section: 'showOverviewStrategiesSection',
    parent: 'showFullOverviewSection',
    keywords: ['стратегии', 'советы', 'рекомендации'],
  },

  // Секция "Насколько популярен"
  {
    id: 'popularity',
    name: 'Насколько популярен',
    section: 'showPopularitySection',
    keywords: ['популярность', 'популярен', 'рейтинг'],
  },
  {
    id: 'popularity-title',
    name: 'Title секции',
    section: 'showPopularityTitleSection',
    parent: 'showPopularitySection',
    keywords: ['заголовок', 'название'],
  },
  {
    id: 'popularity-metrics',
    name: 'Метрики популярности',
    section: 'showPopularityMetricsSection',
    parent: 'showPopularitySection',
    keywords: ['метрики', 'статистика', 'данные'],
  },
  {
    id: 'popularity-conclusion',
    name: 'Conclusion о популярности',
    section: 'showPopularityConclusionSection',
    parent: 'showPopularitySection',
    keywords: ['заключение', 'вывод', 'итог'],
  },

  // Секция "Рейтинг и награды"
  {
    id: 'awards',
    name: 'Рейтинг и награды',
    section: 'showRatingAwardsSection',
    keywords: ['рейтинг', 'награды', 'достижения'],
  },
  {
    id: 'awards-title',
    name: 'Title секции',
    section: 'showRatingTitleSection',
    parent: 'showRatingAwardsSection',
    keywords: ['заголовок', 'название'],
  },
  {
    id: 'awards-main',
    name: 'Основной рейтинг',
    section: 'showRatingMainSection',
    parent: 'showRatingAwardsSection',
    keywords: ['основной', 'рейтинг', 'оценка'],
  },
  {
    id: 'awards-details',
    name: 'Детализация рейтинга',
    section: 'showRatingDetailsSection',
    parent: 'showRatingAwardsSection',
    keywords: ['детализация', 'подробности', 'детали'],
  },
  {
    id: 'awards-list',
    name: 'Награды',
    section: 'showAwardsSection',
    parent: 'showRatingAwardsSection',
    keywords: ['награды', 'достижения', 'призы'],
  },
]

// Функции поиска
const handleSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    currentSearchIndex.value = 0
    return
  }

  const query = searchQuery.value.toLowerCase().trim()
  const results = []

  searchableItems.forEach((item) => {
    // Поиск по названию
    if (item.name.toLowerCase().includes(query)) {
      results.push({ ...item, matchType: 'name' })
      return
    }

    // Поиск по ключевым словам
    if (
      item.keywords.some(
        (keyword) => keyword.includes(query) || query.includes(keyword),
      )
    ) {
      results.push({ ...item, matchType: 'keyword' })
    }
  })

  searchResults.value = results
  currentSearchIndex.value = 0

  // Автоматически переходим к первому результату
  if (results.length > 0) {
    navigateToSearchResult(0)
  }
}

// 🪄 Авто-генерация контента для Info Popup (Enhanced SEO)
const generateInfoContent = () => {
  if (!form.value.name) return
  const providerName = providers.value.find(p => p.id === form.value.provider_id)?.name || 'Provider'
  const name = form.value.name
  const rtp = form.value.rtp || '96.0'
  const vol = form.value.volatility || 'Medium'
  const maxWin = form.value.max_win || '5000'
  const paylines = form.value.paylines || '20'
  const layout = form.value.reels + 'x' + form.value.rows

  // 1. Expert Verdict
  if (!form.value.info_expert_verdict) {
    form.value.info_expert_verdict = name + ' by ' + providerName + ' is a ' + vol.toLowerCase() + '-volatility slot with an RTP of ' + rtp + '% and a maximum win of ' + maxWin + 'x. ' + (parseFloat(rtp) >= 96.5 ? 'The above-average RTP makes it a solid choice for extended sessions.' : 'It delivers a balanced gaming experience suitable for most players.') + ' Overall, we rate it 4.5/5.'
  }

  // 2. Pros
  if (!form.value.info_pros) {
    const pros = []
    if (parseFloat(rtp) >= 96.5) pros.push('Above-average RTP of ' + rtp + '%')
    else pros.push('Competitive RTP of ' + rtp + '%')
    pros.push('Max win potential of ' + maxWin + 'x')
    if (form.value.demo_url) pros.push('Free demo mode available')
    pros.push(paylines + ' ways to win')
    form.value.info_pros = JSON.stringify(pros)
  }

  // 3. Cons
  if (!form.value.info_cons) {
    const cons = []
    if (vol.toLowerCase() === 'high') cons.push('High volatility — not for cautious players')
    if (parseFloat(rtp) < 96.0) cons.push('Below-average RTP of ' + rtp + '%')
    cons.push('Requires stable internet connection')
    form.value.info_cons = JSON.stringify(cons)
  }

  // 4. FAQ
  if (!form.value.info_faq) {
    form.value.info_faq = JSON.stringify([
      { question: 'Is ' + name + ' safe to play online?', answer: 'Yes, ' + name + ' is developed by ' + providerName + ', a licensed and regulated game provider. All games are tested by independent auditing agencies.' },
      { question: 'What is the RTP of ' + name + '?', answer: 'The Return to Player (RTP) of ' + name + ' is ' + rtp + '%. This means that, on average, for every $100 wagered, the game returns $' + rtp + ' to players over time.' },
      { question: 'Can I play ' + name + ' for free?', answer: 'Yes! You can play ' + name + ' in free demo mode right here on SlotQuest. No registration or deposit required.' },
      { question: 'What is the maximum win in ' + name + '?', answer: 'The maximum win in ' + name + ' is ' + maxWin + 'x your bet.' },
      { question: 'What is the volatility of ' + name + '?', answer: name + ' has ' + vol.toLowerCase() + ' volatility. ' + (vol.toLowerCase() === 'high' ? 'Wins are less frequent but can be much larger.' : 'You can expect a balanced mix of win frequency and size.') }
    ])
  }

  // 5. Reviews
  if (!form.value.info_reviews) {
    form.value.info_reviews = JSON.stringify([
      { author: 'Alex R.', rating: 5, text: name + ' is one of my favorite slots! The graphics are stunning and the bonus features keep me coming back.', date: '2024-12-15' },
      { author: 'Maria K.', rating: 4, text: 'Great slot with solid RTP of ' + rtp + '%. The free spins feature is especially exciting.', date: '2024-11-28' },
      { author: 'James T.', rating: 4, text: 'Decent slot from ' + providerName + '. The ' + maxWin + 'x max win potential is attractive. Love the theme.', date: '2024-10-10' }
    ])
  }

  // 6. How to Play
  if (!form.value.info_how_to_play) {
    form.value.info_how_to_play = JSON.stringify([
      { step: 'Open the Demo', text: 'Click "Play Demo Now" to launch ' + name + ' in free play mode. No registration required.' },
      { step: 'Set Your Bet', text: 'Use the controls at the bottom of the game screen to adjust your bet size.' },
      { step: 'Spin the Reels', text: 'Click the Spin button or press Space. Watch for winning combinations across the ' + paylines + ' paylines.' },
      { step: 'Trigger Bonuses', text: 'Land special symbols to activate bonus features like free spins, multipliers, and other rewards.' }
    ])
  }

  // 7. Demo CTA
  if (!form.value.info_demo_cta) {
    form.value.info_demo_cta = 'You can easily try out ' + name + ' online slot at SlotQuest without paying real money. Take advantage of our free demo mode and dive right in!'
  }

  // Синхронизируем reactive массивы с новыми данными формы
  initInfoArrays()
}

const navigateToSearchResult = (index) => {
  if (index < 0 || index >= searchResults.value.length) return

  currentSearchIndex.value = index
  const result = searchResults.value[index]

  // Открываем родительскую секцию если есть
  if (result.parent) {
    const parentSection = result.parent
    if (parentSection === 'showHeroSection') showHeroSection.value = true
    else if (parentSection === 'showFullOverviewSection')
      showFullOverviewSection.value = true
    else if (parentSection === 'showPopularitySection')
      showPopularitySection.value = true
    else if (parentSection === 'showRatingAwardsSection')
      showRatingAwardsSection.value = true
  }

  // Открываем целевую секцию
  const sectionRef = result.section
  if (sectionRef === 'showHeroSection') showHeroSection.value = true
  else if (sectionRef === 'showBasicSection') showBasicSection.value = true
  else if (sectionRef === 'showHeroLinksSection')
    showHeroLinksSection.value = true
  else if (sectionRef === 'showGameCharacteristicsSection')
    showGameCharacteristicsSection.value = true
  else if (sectionRef === 'showRatingSection') showRatingSection.value = true
  else if (sectionRef === 'showMechanicsSection')
    showMechanicsSection.value = true
  else if (sectionRef === 'showBonusesSection') showBonusesSection.value = true
  else if (sectionRef === 'showThemesSection') showThemesSection.value = true
  else if (sectionRef === 'showFullOverviewSection')
    showFullOverviewSection.value = true
  else if (sectionRef === 'showOverviewMainSection')
    showOverviewMainSection.value = true
  else if (sectionRef === 'showOverviewPopularitySection')
    showOverviewPopularitySection.value = true
  else if (sectionRef === 'showOverviewSuccessSecretSection')
    showOverviewSuccessSecretSection.value = true
  else if (sectionRef === 'showOverviewMechanicsSection')
    showOverviewMechanicsSection.value = true
  else if (sectionRef === 'showOverviewFreeSpinsSection')
    showOverviewFreeSpinsSection.value = true
  else if (sectionRef === 'showOverviewStrategiesSection')
    showOverviewStrategiesSection.value = true
  else if (sectionRef === 'showPopularitySection')
    showPopularitySection.value = true
  else if (sectionRef === 'showPopularityTitleSection')
    showPopularityTitleSection.value = true
  else if (sectionRef === 'showPopularityMetricsSection')
    showPopularityMetricsSection.value = true
  else if (sectionRef === 'showPopularityConclusionSection')
    showPopularityConclusionSection.value = true
  else if (sectionRef === 'showRatingAwardsSection')
    showRatingAwardsSection.value = true
  else if (sectionRef === 'showRatingTitleSection')
    showRatingTitleSection.value = true
  else if (sectionRef === 'showRatingMainSection')
    showRatingMainSection.value = true
  else if (sectionRef === 'showRatingDetailsSection')
    showRatingDetailsSection.value = true
  else if (sectionRef === 'showAwardsSection') showAwardsSection.value = true

  // Прокручиваем к секции
  nextTick(() => {
    const element =
      document.getElementById(result.id) ||
      document.querySelector(`[data-section="${result.id}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Добавляем подсветку
      element.classList.add('search-highlight')
      setTimeout(() => {
        element.classList.remove('search-highlight')
      }, 2000)
    }
  })
}

const handleSearchKeydown = (event) => {
  if (!searchResults.value.length) return

  if (event.key === 'Enter') {
    event.preventDefault()
    if (event.shiftKey) {
      // Shift+Enter - предыдущий результат
      const newIndex =
        currentSearchIndex.value > 0
          ? currentSearchIndex.value - 1
          : searchResults.value.length - 1
      navigateToSearchResult(newIndex)
    } else {
      // Enter - следующий результат
      const newIndex =
        currentSearchIndex.value < searchResults.value.length - 1
          ? currentSearchIndex.value + 1
          : 0
      navigateToSearchResult(newIndex)
    }
  } else if (event.key === 'Escape') {
    clearSearch()
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  currentSearchIndex.value = 0
}

// Горячие клавиши
const handleGlobalKeydown = (event) => {
  // Ctrl+F - фокус на поиск
  if (event.ctrlKey && event.key === 'f') {
    event.preventDefault()
    // Приоритет: навигационная поисковая строка (всегда видна)
    if (navSearchInput.value) {
      navSearchInput.value.focus()
      navSearchInput.value.select()
    }
    // Резерв: мобильная или боковая панель
    else {
      const isMobile = window.innerWidth < 1024
      const targetInput = isMobile ? mobileSearchInput.value : searchInput.value
      if (targetInput) {
        targetInput.focus()
        targetInput.select()
      }
    }
  }
  // Ctrl+S - сохранить
  else if (event.ctrlKey && event.key === 's') {
    event.preventDefault()
    saveSlot()
  }
  // Escape - очистить поиск
  else if (event.key === 'Escape' && searchQuery.value) {
    clearSearch()
  }
}

// Подключаем обработчики клавиш при монтировании
onMounted(() => {
  document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Подсветка найденных элементов */
.search-highlight {
  border: 2px solid rgba(251, 146, 60, 0.75);
  background-color: rgba(251, 146, 60, 0.1);
  border-radius: 8px;
  animation: search-pulse 0.6s ease-in-out;
}

@keyframes search-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(251, 146, 60, 0.7);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 0 10px rgba(251, 146, 60, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(251, 146, 60, 0);
  }
}

/* Улучшенная анимация фокуса на поиске */
.search-input:focus {
  border-color: rgb(251, 146, 60);
  outline: 2px solid rgba(251, 146, 60, 0.5);
  box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1);
}
</style>
