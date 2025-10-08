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

            <!-- Заголовок слота -->
            <div class="flex items-center">
              <div class="text-center">
                <h1 class="text-xl font-semibold text-[#E5E7EB] font-display">
                  {{ form.name || 'Новый слот' }}
                </h1>
                <p class="text-sm text-[#9CA3AF]">Редактирование слота</p>
              </div>
            </div>

            <!-- Кнопки действий -->
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
                          <span>{{
                            showBasicSection ? 'Скрыть' : 'Показать'
                          }}</span>
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
                            showHeroLinksSection ? 'Скрыть' : 'Показать'
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
                          {{ showMechanicsSection ? 'Скрыть' : 'Показать' }}
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
                          {{ showBonusesSection ? 'Скрыть' : 'Показать' }}
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
                          {{ showThemesSection ? 'Скрыть' : 'Показать' }}
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
                  </div>
                  <!-- Конец Hero секций -->
                </div>
              </div>
            </div>

            <!-- Секция "Полный обзор слота 2025" -->
            <div>
              <div
                id="overview"
                data-section="overview"
                class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#353A4A] relative overflow-hidden"
              >
                <!-- Декоративный фон -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/5 via-transparent to-[#7C3AED]/5"
                ></div>
                <div
                  class="absolute top-0 right-0 w-64 h-64 bg-[#4F46E5]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"
                ></div>

                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center gap-4">
                      <div
                        class="w-16 h-16 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 animate-pulse"
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h2
                          class="text-2xl font-semibold text-[#E5E7EB] font-display"
                        >
                          Полный обзор слота 2025
                        </h2>
                        <div
                          class="h-1 w-32 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full mt-2"
                        ></div>
                      </div>
                    </div>
                    <!-- Кнопка сворачивания/разворачивания -->
                    <button
                      type="button"
                      @click="
                        showFullOverviewSection = !showFullOverviewSection
                      "
                      class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#4F46E5]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200"
                      :aria-expanded="showFullOverviewSection"
                    >
                      <svg
                        class="w-4 h-4 transform transition-transform duration-200"
                        :class="{ 'rotate-180': showFullOverviewSection }"
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
                    <!-- Все подсекции "Полный обзор слота 2025" -->
                    <div v-show="showFullOverviewSection" class="space-y-8">
                      <!-- Основное описание обзора -->
                      <div
                        class="group bg-gradient-to-r from-[#4F46E5]/10 to-[#7C3AED]/10 border border-[#4F46E5]/20 rounded-xl p-6 hover:border-[#4F46E5]/40 transition-all duration-300"
                      >
                        <div class="flex items-center justify-between mb-4">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-xl flex items-center justify-center"
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
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                ></path>
                              </svg>
                            </div>
                            <div>
                              <h3
                                class="text-lg font-medium text-[#E5E7EB] font-display"
                              >
                                Основное описание
                              </h3>
                              <p class="text-sm text-[#4F46E5]">
                                Главный текст обзора
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            @click="
                              showOverviewMainSection = !showOverviewMainSection
                            "
                            class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#4F46E5]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                            :aria-expanded="showOverviewMainSection"
                          >
                            {{
                              showOverviewMainSection ? 'Скрыть' : 'Показать'
                            }}
                          </button>
                        </div>
                        <div v-show="showOverviewMainSection" class="space-y-4">
                          <!-- Заголовок обзора -->
                          <div>
                            <label
                              class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-2"
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
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                ></path>
                              </svg>
                              Заголовок обзора
                            </label>
                            <input
                              v-model="form.overview_title"
                              type="text"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all duration-200"
                              placeholder="Полный обзор слота 2025"
                            />
                          </div>

                          <!-- Первый абзац описания -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Первый абзац описания
                            </label>
                            <textarea
                              v-model="form.overview_description_1"
                              rows="4"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all duration-200 resize-none"
                              placeholder="Основное описание слота..."
                            ></textarea>
                          </div>

                          <!-- Второй абзац описания -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Второй абзац описания
                            </label>
                            <textarea
                              v-model="form.overview_description_2"
                              rows="3"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all duration-200 resize-none"
                              placeholder="Дополнительная информация..."
                            ></textarea>
                          </div>

                          <!-- Ключевые особенности (6 пунктов) -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-3"
                            >
                              Ключевые особенности (6 пунктов)
                            </label>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div v-for="i in 6" :key="i">
                                <label
                                  class="block text-xs text-[#9CA3AF] mb-1"
                                >
                                  Особенность {{ i }}
                                </label>
                                <input
                                  :value="form[`overview_features_${i}`] || ''"
                                  @input="
                                    form[`overview_features_${i}`] =
                                      $event.target.value
                                  "
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] transition-all duration-200 text-sm"
                                  :placeholder="`Особенность ${i}...`"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Подсекция "В чем секрет такого огромного успеха?" -->
                      <div
                        class="group bg-gradient-to-r from-[#F59E0B]/10 to-[#D97706]/10 border border-[#F59E0B]/20 rounded-xl p-6 hover:border-[#F59E0B]/40 transition-all duration-300"
                      >
                        <div class="flex items-center justify-between mb-4">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl flex items-center justify-center"
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
                                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                ></path>
                              </svg>
                            </div>
                            <div>
                              <h3
                                class="text-lg font-medium text-[#E5E7EB] font-display"
                              >
                                В чем секрет успеха?
                              </h3>
                              <p class="text-sm text-[#F59E0B]">
                                Анализ факторов успеха
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            @click="
                              showOverviewSuccessSecretSection =
                                !showOverviewSuccessSecretSection
                            "
                            class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#F59E0B]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                            :aria-expanded="showOverviewSuccessSecretSection"
                          >
                            {{
                              showOverviewSuccessSecretSection
                                ? 'Скрыть'
                                : 'Показать'
                            }}
                          </button>
                        </div>
                        <div
                          v-show="showOverviewSuccessSecretSection"
                          class="space-y-4"
                        >
                          <!-- Заголовок секрета успеха -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Заголовок секции
                            </label>
                            <input
                              v-model="form.success_secret_title"
                              type="text"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200"
                              placeholder="В чем секрет такого огромного успеха?"
                            />
                          </div>

                          <!-- Введение -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Вводный текст
                            </label>
                            <textarea
                              v-model="form.success_secret_intro"
                              rows="4"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 resize-none"
                              placeholder="Основное объяснение секрета успеха..."
                            ></textarea>
                          </div>

                          <!-- Два основных блока -->
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Sweet Bonanza блок -->
                            <div class="space-y-3">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Связь с Sweet Bonanza
                              </label>
                              <input
                                v-model="form.success_sweetbonanza_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                                placeholder="🍭 Связь с Sweet Bonanza"
                              />
                              <textarea
                                v-model="form.success_sweetbonanza_description"
                                rows="4"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 resize-none text-sm"
                                placeholder="Описание связи с Sweet Bonanza..."
                              ></textarea>
                            </div>

                            <!-- Идеальный баланс блок -->
                            <div class="space-y-3">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Идеальный баланс
                              </label>
                              <input
                                v-model="form.success_balance_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                                placeholder="⚖️ Идеальный баланс"
                              />
                              <textarea
                                v-model="form.success_balance_description"
                                rows="4"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 resize-none text-sm"
                                placeholder="Описание идеального баланса..."
                              ></textarea>
                            </div>
                          </div>

                          <!-- Заключение -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Заключительный текст
                            </label>
                            <textarea
                              v-model="form.success_conclusion"
                              rows="3"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 resize-none"
                              placeholder="Заключительные выводы..."
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <!-- Подсекция "Основные особенности и механики игры" -->
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
                                Основные механики
                              </h3>
                              <p class="text-sm text-[#8B5CF6]">
                                Игровые особенности
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            @click="
                              showOverviewMechanicsSection =
                                !showOverviewMechanicsSection
                            "
                            class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#8B5CF6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                            :aria-expanded="showOverviewMechanicsSection"
                          >
                            {{
                              showOverviewMechanicsSection
                                ? 'Скрыть'
                                : 'Показать'
                            }}
                          </button>
                        </div>
                        <div
                          v-show="showOverviewMechanicsSection"
                          class="space-y-4"
                        >
                          <!-- Заголовок механик -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Заголовок секции
                            </label>
                            <input
                              v-model="form.mechanics_title"
                              type="text"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200"
                              placeholder="Основные особенности и механики игры"
                            />
                          </div>

                          <!-- Введение -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Вводный текст
                            </label>
                            <textarea
                              v-model="form.mechanics_intro"
                              rows="2"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 resize-none"
                              placeholder="Введение к механикам..."
                            ></textarea>
                          </div>

                          <!-- Три основные механики -->
                          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <!-- Scatter Pays -->
                            <div class="space-y-3">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                🎯 Scatter Pays
                              </label>
                              <input
                                v-model="form.mechanics_scatter_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                                placeholder="Scatter Pays"
                              />
                              <textarea
                                v-model="form.mechanics_scatter_description"
                                rows="3"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 resize-none text-sm"
                                placeholder="Описание scatter pays..."
                              ></textarea>
                              <textarea
                                v-model="form.mechanics_scatter_details"
                                rows="2"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 resize-none text-sm"
                                placeholder="Детали scatter pays..."
                              ></textarea>
                            </div>

                            <!-- Tumbles -->
                            <div class="space-y-3">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                ⬇️ Tumbles (Каскады)
                              </label>
                              <input
                                v-model="form.mechanics_cascade_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                                placeholder="Tumbles (Каскады)"
                              />
                              <textarea
                                v-model="form.mechanics_cascade_description"
                                rows="3"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 resize-none text-sm"
                                placeholder="Описание каскадов..."
                              ></textarea>
                              <textarea
                                v-model="form.mechanics_cascade_details"
                                rows="2"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 resize-none text-sm"
                                placeholder="Детали каскадов..."
                              ></textarea>
                            </div>

                            <!-- Множители -->
                            <div class="space-y-3">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                ✨ Множители
                              </label>
                              <input
                                v-model="form.mechanics_multipliers_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                                placeholder="Множители от x2 до x500"
                              />
                              <textarea
                                v-model="form.mechanics_multipliers_description"
                                rows="3"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 resize-none text-sm"
                                placeholder="Описание множителей..."
                              ></textarea>
                              <textarea
                                v-model="form.mechanics_multipliers_details"
                                rows="2"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 resize-none text-sm"
                                placeholder="Детали множителей..."
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Подсекция "Бесплатные спины Gates of Olympus" -->
                      <div
                        class="group bg-gradient-to-r from-[#EF4444]/10 to-[#DC2626]/10 border border-[#EF4444]/20 rounded-xl p-6 hover:border-[#EF4444]/40 transition-all duration-300"
                      >
                        <div class="flex items-center justify-between mb-4">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-12 h-12 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-xl flex items-center justify-center"
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
                                class="text-lg font-medium text-[#E5E7EB] font-display"
                              >
                                Бесплатные спины
                              </h3>
                              <p class="text-sm text-[#EF4444]">
                                Бонусная игра
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            @click="
                              showOverviewFreeSpinsSection =
                                !showOverviewFreeSpinsSection
                            "
                            class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#EF4444]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                            :aria-expanded="showOverviewFreeSpinsSection"
                          >
                            {{
                              showOverviewFreeSpinsSection
                                ? 'Скрыть'
                                : 'Показать'
                            }}
                          </button>
                        </div>
                        <div
                          v-show="showOverviewFreeSpinsSection"
                          class="space-y-4"
                        >
                          <!-- Заголовок бесплатных спинов -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Заголовок секции
                            </label>
                            <input
                              v-model="form.free_spins_title"
                              type="text"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200"
                              placeholder="Бесплатные спины Gates of Olympus"
                            />
                          </div>

                          <!-- Введение -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Вводный текст
                            </label>
                            <textarea
                              v-model="form.free_spins_intro"
                              rows="4"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 resize-none"
                              placeholder="Описание активации бесплатных спинов..."
                            ></textarea>
                          </div>

                          <!-- Мгновенные выплаты и особенности -->
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Мгновенные выплаты -->
                            <div class="space-y-3">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                💰 Мгновенные выплаты за Scatter
                              </label>
                              <input
                                v-model="form.free_spins_instant_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                                placeholder="💰 Мгновенные выплаты за Scatter"
                              />
                              <div class="space-y-2">
                                <input
                                  v-model="form.free_spins_4_scatter"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                                  placeholder="4 символа Зевса: x3 от ставки"
                                />
                                <input
                                  v-model="form.free_spins_5_scatter"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                                  placeholder="5 символов Зевса: x5 от ставки"
                                />
                                <input
                                  v-model="form.free_spins_6_scatter"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                                  placeholder="6 символов Зевса: x100 от ставки"
                                />
                              </div>
                            </div>

                            <!-- Особенности бонусной игры -->
                            <div class="space-y-3">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                🚀 Особенности бонусной игры
                              </label>
                              <input
                                v-model="form.free_spins_features_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                                placeholder="🚀 Особенности бонусной игры"
                              />
                              <div class="space-y-2">
                                <input
                                  v-model="form.free_spins_feature_1"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                                  placeholder="15 бесплатных спинов независимо от количества scatter-символов"
                                />
                                <input
                                  v-model="form.free_spins_feature_2"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                                  placeholder="Total Multiplier не сбрасывается между раундами"
                                />
                                <input
                                  v-model="form.free_spins_feature_3"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                                  placeholder="Возможность получить дополнительные бесплатные спины"
                                />
                                <input
                                  v-model="form.free_spins_feature_4"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                                  placeholder="Опция купить бонус за 100x от общей ставки"
                                />
                              </div>
                            </div>
                          </div>

                          <!-- Ante Bet и покупка бонуса -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              🎯 Ante Bet и покупка бонуса
                            </label>
                            <input
                              v-model="form.free_spins_ante_title"
                              type="text"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 mb-3"
                              placeholder="🎯 Ante Bet и покупка бонуса"
                            />
                            <textarea
                              v-model="form.free_spins_ante_description"
                              rows="2"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 resize-none mb-3"
                              placeholder="Описание Ante Bet и покупки бонуса..."
                            ></textarea>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                v-model="form.free_spins_ante_bet_value"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                                placeholder="25% дополнительно к ставке"
                              />
                              <input
                                v-model="form.free_spins_ante_bet_effect"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                                placeholder="удваивает шансы получить бесплатные спины"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Подсекция "Стратегии и советы для игры" -->
                      <div
                        class="group bg-gradient-to-r from-[#06B6D4]/10 to-[#0891B2]/10 border border-[#06B6D4]/20 rounded-xl p-6 hover:border-[#06B6D4]/40 transition-all duration-300"
                      >
                        <div class="flex items-center justify-between mb-4">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#0891B2] rounded-xl flex items-center justify-center"
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
                                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                ></path>
                              </svg>
                            </div>
                            <div>
                              <h3
                                class="text-lg font-medium text-[#E5E7EB] font-display"
                              >
                                Стратегии и советы
                              </h3>
                              <p class="text-sm text-[#06B6D4]">
                                Практические рекомендации
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            @click="
                              showOverviewStrategiesSection =
                                !showOverviewStrategiesSection
                            "
                            class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#06B6D4]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                            :aria-expanded="showOverviewStrategiesSection"
                          >
                            {{
                              showOverviewStrategiesSection
                                ? 'Скрыть'
                                : 'Показать'
                            }}
                          </button>
                        </div>
                        <div
                          v-show="showOverviewStrategiesSection"
                          class="space-y-4"
                        >
                          <!-- Заголовок стратегий -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Заголовок секции
                            </label>
                            <input
                              v-model="form.strategies_title"
                              type="text"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200"
                              placeholder="Стратегии и советы для игры"
                            />
                          </div>

                          <!-- Введение -->
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Вводный текст
                            </label>
                            <textarea
                              v-model="form.strategies_intro"
                              rows="2"
                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 resize-none"
                              placeholder="Введение к стратегиям..."
                            ></textarea>
                          </div>

                          <!-- Три группы стратегий -->
                          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <!-- Рекомендации для новичков -->
                            <div class="space-y-3">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                💡 Рекомендации для новичков
                              </label>
                              <input
                                v-model="form.strategies_beginners_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                placeholder="💡 Рекомендации для новичков"
                              />
                              <div class="space-y-2">
                                <input
                                  v-model="form.strategy_beginner_1"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Начните с демо-версии для изучения механик"
                                />
                                <input
                                  v-model="form.strategy_beginner_2"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Устанавливайте лимиты перед началом игры"
                                />
                                <input
                                  v-model="form.strategy_beginner_3"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Начинайте с минимальных ставок"
                                />
                                <input
                                  v-model="form.strategy_beginner_4"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Изучите таблицу выплат и правила"
                                />
                                <input
                                  v-model="form.strategy_beginner_5"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Играйте только на проверенных сайтах"
                                />
                              </div>
                            </div>

                            <!-- Продвинутые стратегии -->
                            <div class="space-y-3">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                🎯 Продвинутые стратегии
                              </label>
                              <input
                                v-model="form.strategies_advanced_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                placeholder="🎯 Продвинутые стратегии"
                              />
                              <div class="space-y-2">
                                <input
                                  v-model="form.strategy_advanced_1"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Используйте Ante Bet для увеличения шансов на бонус"
                                />
                                <input
                                  v-model="form.strategy_advanced_2"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Рассчитайте соотношение риска и вознаграждения при покупке бонуса"
                                />
                                <input
                                  v-model="form.strategy_advanced_3"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Ведите статистику своих игровых сессий"
                                />
                                <input
                                  v-model="form.strategy_advanced_4"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Изучите паттерны выпадения множителей"
                                />
                              </div>
                            </div>

                            <!-- Управление банкроллом -->
                            <div class="space-y-3">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                💰 Управление банкроллом
                              </label>
                              <input
                                v-model="form.strategies_bankroll_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                placeholder="💰 Управление банкроллом"
                              />
                              <div class="space-y-2">
                                <input
                                  v-model="form.strategy_bankroll_1"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Никогда не играйте на деньги, которые не можете позволить себе потерять"
                                />
                                <input
                                  v-model="form.strategy_bankroll_2"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Размер ставки не должен превышать 1-5% от общего банкролла"
                                />
                                <input
                                  v-model="form.strategy_bankroll_3"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Установите дневные, недельные и месячные лимиты"
                                />
                                <input
                                  v-model="form.strategy_bankroll_4"
                                  type="text"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] focus:border-[#06B6D4] transition-all duration-200 text-sm"
                                  placeholder="Делайте перерывы каждые 30-60 минут"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Секция "FAQ (Часто задаваемые вопросы)" -->
            <div id="faq-section">
              <div
                id="faq"
                data-section="faq"
                class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#353A4A] relative overflow-hidden"
              >
                <!-- Декоративный фон -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/5 via-transparent to-[#FF6B35]/5"
                ></div>
                <div
                  class="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"
                ></div>

                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center gap-4">
                      <div
                        class="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#FF6B35] rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 animate-pulse"
                      >
                        <span class="text-2xl">❓</span>
                      </div>
                      <div>
                        <h2
                          class="text-2xl font-semibold text-[#E5E7EB] font-display"
                        >
                          FAQ (Часто задаваемые вопросы)
                        </h2>
                        <div
                          class="h-1 w-28 bg-gradient-to-r from-[#F59E0B] to-[#FF6B35] rounded-full mt-2"
                        ></div>
                      </div>
                    </div>
                    <!-- Кнопка сворачивания/разворачивания секции -->
                    <button
                      type="button"
                      @click="showFaqSection = !showFaqSection"
                      class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#F59E0B]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200"
                      :aria-expanded="showFaqSection"
                    >
                      <svg
                        class="w-4 h-4 transform transition-transform duration-200"
                        :class="{ 'rotate-180': showFaqSection }"
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

                  <div v-show="showFaqSection" class="space-y-8">
                    <!-- Заголовок секции -->
                    <div
                      class="group bg-gradient-to-r from-[#F59E0B]/10 to-[#FF6B35]/10 border border-[#F59E0B]/20 rounded-xl p-6 hover:border-[#F59E0B]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#FF6B35] rounded-xl flex items-center justify-center"
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
                              Заголовок секции
                            </h3>
                            <p class="text-sm text-[#F59E0B]">
                              Основной заголовок
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showFaqTitleSection = !showFaqTitleSection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#F59E0B]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showFaqTitleSection"
                        >
                          {{ showFaqTitleSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showFaqTitleSection" class="space-y-4">
                        <!-- Заголовок секции -->
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Заголовок секции FAQ
                          </label>
                          <input
                            v-model="form.faq_title"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                            placeholder="Часто задаваемые вопросы"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Вопрос 1 -->
                    <div
                      class="group bg-gradient-to-r from-[#3B82F6]/10 to-[#2563EB]/10 border border-[#3B82F6]/20 rounded-xl p-6 hover:border-[#3B82F6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">1️⃣</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Вопрос 1
                            </h3>
                            <p class="text-sm text-[#3B82F6]">Первый вопрос</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showFaqQuestion1 = !showFaqQuestion1"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#3B82F6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showFaqQuestion1"
                        >
                          {{ showFaqQuestion1 ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showFaqQuestion1" class="space-y-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Emoji иконка
                          </label>
                          <input
                            v-model="form.faq_q1_emoji"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                            placeholder="🎮"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Текст вопроса
                          </label>
                          <input
                            v-model="form.faq_q1_question"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                            placeholder="Можно ли играть в слот бесплатно?"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Ответ
                          </label>
                          <textarea
                            v-model="form.faq_q1_answer"
                            rows="4"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm resize-none"
                            placeholder="Да, абсолютно бесплатно! Вы можете играть в демо-версию слота..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <!-- Вопрос 2 -->
                    <div
                      class="group bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-xl p-6 hover:border-[#10B981]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">2️⃣</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Вопрос 2
                            </h3>
                            <p class="text-sm text-[#10B981]">Второй вопрос</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showFaqQuestion2 = !showFaqQuestion2"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#10B981]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showFaqQuestion2"
                        >
                          {{ showFaqQuestion2 ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showFaqQuestion2" class="space-y-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Emoji иконка
                          </label>
                          <input
                            v-model="form.faq_q2_emoji"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                            placeholder="💰"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Текст вопроса
                          </label>
                          <input
                            v-model="form.faq_q2_question"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                            placeholder="Какова максимальная выплата в слоте?"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Ответ
                          </label>
                          <textarea
                            v-model="form.faq_q2_answer"
                            rows="4"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm resize-none"
                            placeholder="Максимальная выплата: 5,000x от ставки..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <!-- Вопрос 3 -->
                    <div
                      class="group bg-gradient-to-r from-[#8B5CF6]/10 to-[#7C3AED]/10 border border-[#8B5CF6]/20 rounded-xl p-6 hover:border-[#8B5CF6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">3️⃣</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Вопрос 3
                            </h3>
                            <p class="text-sm text-[#8B5CF6]">Третий вопрос</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showFaqQuestion3 = !showFaqQuestion3"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#8B5CF6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showFaqQuestion3"
                        >
                          {{ showFaqQuestion3 ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showFaqQuestion3" class="space-y-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Emoji иконка
                          </label>
                          <input
                            v-model="form.faq_q3_emoji"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                            placeholder="🛒"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Текст вопроса
                          </label>
                          <input
                            v-model="form.faq_q3_question"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                            placeholder="Стоит ли покупать бонусные спины?"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Ответ
                          </label>
                          <textarea
                            v-model="form.faq_q3_answer"
                            rows="4"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm resize-none"
                            placeholder="Покупка бонуса стоит 100x от ставки..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <!-- Вопрос 4 -->
                    <div
                      class="group bg-gradient-to-r from-[#EF4444]/10 to-[#DC2626]/10 border border-[#EF4444]/20 rounded-xl p-6 hover:border-[#EF4444]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">4️⃣</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Вопрос 4
                            </h3>
                            <p class="text-sm text-[#EF4444]">
                              Четвертый вопрос
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showFaqQuestion4 = !showFaqQuestion4"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#EF4444]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showFaqQuestion4"
                        >
                          {{ showFaqQuestion4 ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showFaqQuestion4" class="space-y-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Emoji иконка
                          </label>
                          <input
                            v-model="form.faq_q4_emoji"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                            placeholder="📱"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Текст вопроса
                          </label>
                          <input
                            v-model="form.faq_q4_question"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm"
                            placeholder="Работает ли слот на мобильных устройствах?"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Ответ
                          </label>
                          <textarea
                            v-model="form.faq_q4_answer"
                            rows="4"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all duration-200 text-sm resize-none"
                            placeholder="Да, полностью оптимизирован!..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Секция "Отзывы игроков" -->
            <div id="reviews-section">
              <div
                id="reviews"
                data-section="reviews"
                class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#353A4A] relative overflow-hidden"
              >
                <!-- Декоративный фон -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/5"
                ></div>
                <div
                  class="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"
                ></div>

                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center gap-4">
                      <div
                        class="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 animate-pulse"
                      >
                        <span class="text-2xl">💬</span>
                      </div>
                      <div>
                        <h2
                          class="text-2xl font-semibold text-[#E5E7EB] font-display"
                        >
                          Отзывы игроков
                        </h2>
                        <div
                          class="h-1 w-28 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full mt-2"
                        ></div>
                      </div>
                    </div>
                    <!-- Кнопка сворачивания/разворачивания секции -->
                    <button
                      type="button"
                      @click="showReviewsSection = !showReviewsSection"
                      class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#3B82F6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200"
                      :aria-expanded="showReviewsSection"
                    >
                      <svg
                        class="w-4 h-4 transform transition-transform duration-200"
                        :class="{ 'rotate-180': showReviewsSection }"
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

                  <div v-show="showReviewsSection" class="space-y-8">
                    <!-- Заголовок секции -->
                    <div
                      class="group bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[#3B82F6]/20 rounded-xl p-6 hover:border-[#3B82F6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center"
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
                              Заголовок секции
                            </h3>
                            <p class="text-sm text-[#3B82F6]">
                              Основной заголовок и подзаголовок
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showReviewsTitleSection = !showReviewsTitleSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#3B82F6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showReviewsTitleSection"
                        >
                          {{ showReviewsTitleSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showReviewsTitleSection" class="space-y-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Заголовок секции
                          </label>
                          <input
                            v-model="form.reviews_title"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                            placeholder="Отзывы игроков"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Подзаголовок
                          </label>
                          <input
                            v-model="form.reviews_subtitle"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                            placeholder="Реальные мнения от сообщества слот-игроков"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Статистика отзывов -->
                    <div
                      class="group bg-gradient-to-r from-[#F59E0B]/10 to-[#FF6B35]/10 border border-[#F59E0B]/20 rounded-xl p-6 hover:border-[#F59E0B]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#FF6B35] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">📊</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Общая статистика
                            </h3>
                            <p class="text-sm text-[#F59E0B]">
                              Топ метрики (4 карточки)
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showReviewsStatsSection = !showReviewsStatsSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#F59E0B]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showReviewsStatsSection"
                        >
                          {{ showReviewsStatsSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showReviewsStatsSection" class="space-y-4">
                        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Общий рейтинг
                            </label>
                            <input
                              v-model="form.reviews_overall_rating"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                              placeholder="4.3"
                            />
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Всего отзывов
                            </label>
                            <input
                              v-model="form.reviews_total_count"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                              placeholder="1.2K+"
                            />
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Положительные (%)
                            </label>
                            <input
                              v-model="form.reviews_positive_percent"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                              placeholder="75%"
                            />
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Рекомендуют (%)
                            </label>
                            <input
                              v-model="form.reviews_recommend_percent"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                              placeholder="68%"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Распределение оценок -->
                    <div
                      class="group bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-xl p-6 hover:border-[#10B981]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">⭐</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Распределение оценок
                            </h3>
                            <p class="text-sm text-[#10B981]">
                              Процент и количество для каждой оценки
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showReviewsDistributionSection =
                              !showReviewsDistributionSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#10B981]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showReviewsDistributionSection"
                        >
                          {{
                            showReviewsDistributionSection
                              ? 'Скрыть'
                              : 'Показать'
                          }}
                        </button>
                      </div>
                      <div
                        v-show="showReviewsDistributionSection"
                        class="space-y-4"
                      >
                        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
                          <!-- 5 звезд -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              5 ★
                            </label>
                            <input
                              v-model="form.reviews_5_stars_percent"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                              placeholder="45%"
                            />
                            <input
                              v-model="form.reviews_5_stars_count"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                              placeholder="562"
                            />
                          </div>

                          <!-- 4 звезды -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              4 ★
                            </label>
                            <input
                              v-model="form.reviews_4_stars_percent"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                              placeholder="30%"
                            />
                            <input
                              v-model="form.reviews_4_stars_count"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                              placeholder="374"
                            />
                          </div>

                          <!-- 3 звезды -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              3 ★
                            </label>
                            <input
                              v-model="form.reviews_3_stars_percent"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                              placeholder="15%"
                            />
                            <input
                              v-model="form.reviews_3_stars_count"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                              placeholder="187"
                            />
                          </div>

                          <!-- 2 звезды -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              2 ★
                            </label>
                            <input
                              v-model="form.reviews_2_stars_percent"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                              placeholder="7%"
                            />
                            <input
                              v-model="form.reviews_2_stars_count"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                              placeholder="87"
                            />
                          </div>

                          <!-- 1 звезда -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              1 ★
                            </label>
                            <input
                              v-model="form.reviews_1_stars_percent"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                              placeholder="3%"
                            />
                            <input
                              v-model="form.reviews_1_stars_count"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                              placeholder="37"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Анализ настроений -->
                    <div
                      class="group bg-gradient-to-r from-[#8B5CF6]/10 to-[#7C3AED]/10 border border-[#8B5CF6]/20 rounded-xl p-6 hover:border-[#8B5CF6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">🎭</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Анализ настроений
                            </h3>
                            <p class="text-sm text-[#8B5CF6]">
                              4 пункта положительных моментов
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showReviewsSentimentsSection =
                              !showReviewsSentimentsSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#8B5CF6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showReviewsSentimentsSection"
                        >
                          {{
                            showReviewsSentimentsSection ? 'Скрыть' : 'Показать'
                          }}
                        </button>
                      </div>
                      <div
                        v-show="showReviewsSentimentsSection"
                        class="space-y-4"
                      >
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <!-- Пункт 1 -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Пункт 1 - Заголовок
                            </label>
                            <input
                              v-model="form.reviews_sentiment_1_title"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                              placeholder="Потрясающая графика"
                            />
                            <input
                              v-model="form.reviews_sentiment_1_desc"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                              placeholder="Упоминается в 89% позитивных отзывов"
                            />
                          </div>

                          <!-- Пункт 2 -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Пункт 2 - Заголовок
                            </label>
                            <input
                              v-model="form.reviews_sentiment_2_title"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                              placeholder="Мегавыигрыши"
                            />
                            <input
                              v-model="form.reviews_sentiment_2_desc"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                              placeholder="Крупные множители в бонусах"
                            />
                          </div>

                          <!-- Пункт 3 -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Пункт 3 - Заголовок
                            </label>
                            <input
                              v-model="form.reviews_sentiment_3_title"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                              placeholder="Стабильная работа"
                            />
                            <input
                              v-model="form.reviews_sentiment_3_desc"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                              placeholder="Без лагов и багов"
                            />
                          </div>

                          <!-- Пункт 4 -->
                          <div class="space-y-2">
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Пункт 4 - Заголовок
                            </label>
                            <input
                              v-model="form.reviews_sentiment_4_title"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                              placeholder="Высокая волатильность"
                            />
                            <input
                              v-model="form.reviews_sentiment_4_desc"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                              placeholder="Требует терпения"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Избранные отзывы -->
                    <div
                      class="group bg-gradient-to-r from-[#EC4899]/10 to-[#DB2777]/10 border border-[#EC4899]/20 rounded-xl p-6 hover:border-[#EC4899]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#EC4899] to-[#DB2777] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">🌟</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Избранные отзывы игроков
                            </h3>
                            <p class="text-sm text-[#EC4899]">3 отзыва</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showReviewsItemsSection = !showReviewsItemsSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#EC4899]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showReviewsItemsSection"
                        >
                          {{ showReviewsItemsSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showReviewsItemsSection" class="space-y-6">
                        <!-- Отзыв 1 -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            Отзыв 1
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Имя автора
                              </label>
                              <input
                                v-model="form.review_1_author"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="Александр К."
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Буква для аватара
                              </label>
                              <input
                                v-model="form.review_1_avatar_letter"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="А"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Рейтинг (звезды)
                              </label>
                              <input
                                v-model="form.review_1_rating"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="★★★★★"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Бейдж статуса
                              </label>
                              <input
                                v-model="form.review_1_badge"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="Проверенный игрок"
                              />
                            </div>
                            <div class="lg:col-span-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Текст отзыва
                              </label>
                              <textarea
                                v-model="form.review_1_text"
                                rows="3"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm resize-none"
                                placeholder="Реально крутой слот!..."
                              ></textarea>
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Лайки
                              </label>
                              <input
                                v-model="form.review_1_likes"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="47 лайков"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Ответы
                              </label>
                              <input
                                v-model="form.review_1_replies"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="12 ответов"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Дата
                              </label>
                              <input
                                v-model="form.review_1_date"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="2 дня назад"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Отзыв 2 -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            Отзыв 2
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Имя автора
                              </label>
                              <input
                                v-model="form.review_2_author"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="Мария В."
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Буква для аватара
                              </label>
                              <input
                                v-model="form.review_2_avatar_letter"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="М"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Рейтинг (звезды)
                              </label>
                              <input
                                v-model="form.review_2_rating"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="★★★★☆"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Бейдж статуса
                              </label>
                              <input
                                v-model="form.review_2_badge"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="Активный игрок"
                              />
                            </div>
                            <div class="lg:col-span-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Текст отзыва
                              </label>
                              <textarea
                                v-model="form.review_2_text"
                                rows="3"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm resize-none"
                                placeholder="Визуально великолепно!..."
                              ></textarea>
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Лайки
                              </label>
                              <input
                                v-model="form.review_2_likes"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="31 лайк"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Ответы
                              </label>
                              <input
                                v-model="form.review_2_replies"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="8 ответов"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Дата
                              </label>
                              <input
                                v-model="form.review_2_date"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="1 неделю назад"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Отзыв 3 -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            Отзыв 3
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Имя автора
                              </label>
                              <input
                                v-model="form.review_3_author"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="Дмитрий С."
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Буква для аватара
                              </label>
                              <input
                                v-model="form.review_3_avatar_letter"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="Д"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Рейтинг (звезды)
                              </label>
                              <input
                                v-model="form.review_3_rating"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="★★★★★"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Бейдж статуса
                              </label>
                              <input
                                v-model="form.review_3_badge"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="VIP игрок"
                              />
                            </div>
                            <div class="lg:col-span-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Текст отзыва
                              </label>
                              <textarea
                                v-model="form.review_3_text"
                                rows="3"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm resize-none"
                                placeholder="ЭПИК! Pragmatic Play превзошли сами себя!..."
                              ></textarea>
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Лайки
                              </label>
                              <input
                                v-model="form.review_3_likes"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="93 лайка"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Ответы
                              </label>
                              <input
                                v-model="form.review_3_replies"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="25 ответов"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                              >
                                Дата
                              </label>
                              <input
                                v-model="form.review_3_date"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#EC4899] focus:border-[#EC4899] transition-all duration-200 text-sm"
                                placeholder="3 дня назад"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Секция "Профессиональная оценка" -->
            <div id="professional-rating-section">
              <div
                id="professional-rating"
                data-section="professional-rating"
                class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#353A4A] relative overflow-hidden"
              >
                <!-- Декоративный фон -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-[#8B5CF6]/5"
                ></div>
                <div
                  class="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"
                ></div>

                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center gap-4">
                      <div
                        class="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 animate-pulse"
                      >
                        <span class="text-2xl">⚙️</span>
                      </div>
                      <div>
                        <h2
                          class="text-2xl font-semibold text-[#E5E7EB] font-display"
                        >
                          Профессиональная оценка
                        </h2>
                        <div
                          class="h-1 w-28 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-full mt-2"
                        ></div>
                      </div>
                    </div>
                    <!-- Кнопка сворачивания/разворачивания секции -->
                    <button
                      type="button"
                      @click="
                        showProfessionalRatingSection =
                          !showProfessionalRatingSection
                      "
                      class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#3B82F6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200"
                      :aria-expanded="showProfessionalRatingSection"
                    >
                      <svg
                        class="w-4 h-4 transform transition-transform duration-200"
                        :class="{ 'rotate-180': showProfessionalRatingSection }"
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

                  <div v-show="showProfessionalRatingSection" class="space-y-8">
                    <!-- Заголовки секции -->
                    <div
                      class="group bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[#3B82F6]/20 rounded-xl p-6 hover:border-[#3B82F6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center"
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
                              Заголовки секции
                            </h3>
                            <p class="text-sm text-[#3B82F6]">
                              Основной заголовок и подзаголовок
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showProfRatingTitleSection =
                              !showProfRatingTitleSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#3B82F6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showProfRatingTitleSection"
                        >
                          {{
                            showProfRatingTitleSection ? 'Скрыть' : 'Показать'
                          }}
                        </button>
                      </div>
                      <div
                        v-show="showProfRatingTitleSection"
                        class="space-y-4"
                      >
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Заголовок секции
                          </label>
                          <input
                            v-model="form.prof_rating_title"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                            placeholder="Профессиональная оценка"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Подзаголовок
                          </label>
                          <input
                            v-model="form.prof_rating_subtitle"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                            placeholder="Детальный анализ от экспертов индустрии 🎯"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Общая оценка -->
                    <div
                      class="group bg-gradient-to-r from-[#F59E0B]/10 to-[#EF4444]/10 border border-[#F59E0B]/20 rounded-xl p-6 hover:border-[#F59E0B]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">⚡</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Общая экспертная оценка
                            </h3>
                            <p class="text-sm text-[#F59E0B]">
                              Общая оценка, описание и звезды
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showProfRatingOverallSection =
                              !showProfRatingOverallSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#F59E0B]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showProfRatingOverallSection"
                        >
                          {{
                            showProfRatingOverallSection ? 'Скрыть' : 'Показать'
                          }}
                        </button>
                      </div>
                      <div
                        v-show="showProfRatingOverallSection"
                        class="space-y-4"
                      >
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Заголовок
                          </label>
                          <input
                            v-model="form.prof_rating_overall_title"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                            placeholder="Общая экспертная оценка"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Описание
                          </label>
                          <textarea
                            v-model="form.prof_rating_overall_desc"
                            rows="2"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm resize-none"
                            placeholder="Превосходный слот с инновационной механикой и высоким потенциалом выигрыша 🏆"
                          ></textarea>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Оценка (из 10)
                            </label>
                            <input
                              v-model="form.prof_rating_overall_score"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                              placeholder="8.5"
                            />
                          </div>
                          <div>
                            <label
                              class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >
                              Звезды
                            </label>
                            <input
                              v-model="form.prof_rating_overall_stars"
                              type="text"
                              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                              placeholder="⭐⭐⭐⭐☆"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Детальные метрики (5 метрик) -->
                    <div
                      class="group bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-xl p-6 hover:border-[#10B981]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">📊</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Детальные метрики
                            </h3>
                            <p class="text-sm text-[#10B981]">
                              5 критериев оценки
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showProfRatingMetricsSection =
                              !showProfRatingMetricsSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#10B981]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showProfRatingMetricsSection"
                        >
                          {{
                            showProfRatingMetricsSection ? 'Скрыть' : 'Показать'
                          }}
                        </button>
                      </div>
                      <div
                        v-show="showProfRatingMetricsSection"
                        class="space-y-6"
                      >
                        <!-- Метрика 1: Графика -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            1. Графика и анимация
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Emoji</label
                              >
                              <input
                                v-model="form.prof_rating_metric_1_emoji"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="🎨"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Название</label
                              >
                              <input
                                v-model="form.prof_rating_metric_1_name"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="Графика и анимация"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Оценка (из 10)</label
                              >
                              <input
                                v-model="form.prof_rating_metric_1_score"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="9.0"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Метрика 2: Геймплей -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            2. Геймплей
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Emoji</label
                              >
                              <input
                                v-model="form.prof_rating_metric_2_emoji"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="🎮"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Название</label
                              >
                              <input
                                v-model="form.prof_rating_metric_2_name"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="Геймплей"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Оценка (из 10)</label
                              >
                              <input
                                v-model="form.prof_rating_metric_2_score"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="8.0"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Метрика 3: Потенциал выигрыша -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            3. Потенциал выигрыша
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Emoji</label
                              >
                              <input
                                v-model="form.prof_rating_metric_3_emoji"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="💎"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Название</label
                              >
                              <input
                                v-model="form.prof_rating_metric_3_name"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="Потенциал выигрыша"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Оценка (из 10)</label
                              >
                              <input
                                v-model="form.prof_rating_metric_3_score"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="9.0"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Метрика 4: Бонусные функции -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            4. Бонусные функции
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Emoji</label
                              >
                              <input
                                v-model="form.prof_rating_metric_4_emoji"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="🎁"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Название</label
                              >
                              <input
                                v-model="form.prof_rating_metric_4_name"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="Бонусные функции"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Оценка (из 10)</label
                              >
                              <input
                                v-model="form.prof_rating_metric_4_score"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="8.0"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Метрика 5: Частота выплат -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            5. Частота выплат
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Emoji</label
                              >
                              <input
                                v-model="form.prof_rating_metric_5_emoji"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="⏰"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Название</label
                              >
                              <input
                                v-model="form.prof_rating_metric_5_name"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="Частота выплат"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Оценка (из 10)</label
                              >
                              <input
                                v-model="form.prof_rating_metric_5_score"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="7.0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Экспертное заключение -->
                    <div
                      class="group bg-gradient-to-r from-[#8B5CF6]/10 to-[#7C3AED]/10 border border-[#8B5CF6]/20 rounded-xl p-6 hover:border-[#8B5CF6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">💬</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Экспертное заключение
                            </h3>
                            <p class="text-sm text-[#8B5CF6]">
                              Мнение эксперта
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showProfRatingExpertSection =
                              !showProfRatingExpertSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#8B5CF6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showProfRatingExpertSection"
                        >
                          {{
                            showProfRatingExpertSection ? 'Скрыть' : 'Показать'
                          }}
                        </button>
                      </div>
                      <div
                        v-show="showProfRatingExpertSection"
                        class="space-y-4"
                      >
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Цитата эксперта
                          </label>
                          <textarea
                            v-model="form.prof_rating_expert_quote"
                            rows="4"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm resize-none"
                            placeholder="Gates of Olympus представляет собой революционный подход..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Секция "Заключение" -->
            <div id="conclusion-section">
              <div
                id="conclusion"
                data-section="conclusion"
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
                        class="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 animate-pulse"
                      >
                        <span class="text-2xl">✅</span>
                      </div>
                      <div>
                        <h2
                          class="text-2xl font-semibold text-[#E5E7EB] font-display"
                        >
                          Заключение
                        </h2>
                        <div
                          class="h-1 w-28 bg-gradient-to-r from-[#10B981] to-[#3B82F6] rounded-full mt-2"
                        ></div>
                      </div>
                    </div>
                    <!-- Кнопка сворачивания/разворачивания секции -->
                    <button
                      type="button"
                      @click="showConclusionSection = !showConclusionSection"
                      class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#10B981]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200"
                      :aria-expanded="showConclusionSection"
                    >
                      <svg
                        class="w-4 h-4 transform transition-transform duration-200"
                        :class="{ 'rotate-180': showConclusionSection }"
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

                  <div v-show="showConclusionSection" class="space-y-8">
                    <!-- Заголовок -->
                    <div
                      class="group bg-gradient-to-r from-[#10B981]/10 to-[#3B82F6]/10 border border-[#10B981]/20 rounded-xl p-6 hover:border-[#10B981]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-xl flex items-center justify-center"
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
                              Заголовок
                            </h3>
                            <p class="text-sm text-[#10B981]">
                              Основной заголовок
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showConclusionTitleSection =
                              !showConclusionTitleSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#10B981]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showConclusionTitleSection"
                        >
                          {{
                            showConclusionTitleSection ? 'Скрыть' : 'Показать'
                          }}
                        </button>
                      </div>
                      <div
                        v-show="showConclusionTitleSection"
                        class="space-y-4"
                      >
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Заголовок секции
                          </label>
                          <input
                            v-model="form.conclusion_title"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                            placeholder="Заключение"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Итоговая оценка (2 абзаца) -->
                    <div
                      class="group bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[#3B82F6]/20 rounded-xl p-6 hover:border-[#3B82F6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">📝</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Итоговая оценка
                            </h3>
                            <p class="text-sm text-[#3B82F6]">
                              Два абзаца текста
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showConclusionTextSection =
                              !showConclusionTextSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#3B82F6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showConclusionTextSection"
                        >
                          {{
                            showConclusionTextSection ? 'Скрыть' : 'Показать'
                          }}
                        </button>
                      </div>
                      <div v-show="showConclusionTextSection" class="space-y-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Абзац 1
                          </label>
                          <textarea
                            v-model="form.conclusion_text_1"
                            rows="3"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm resize-none"
                            placeholder="Этот слот заслуженно считается одним из лучших..."
                          ></textarea>
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Абзац 2
                          </label>
                          <textarea
                            v-model="form.conclusion_text_2"
                            rows="3"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm resize-none"
                            placeholder="Революционная система выплат..."
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <!-- Кому подходит (4 пункта) -->
                    <div
                      class="group bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-xl p-6 hover:border-[#10B981]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">✅</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Кому подходит
                            </h3>
                            <p class="text-sm text-[#10B981]">4 пункта</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showConclusionSuitableSection =
                              !showConclusionSuitableSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#10B981]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showConclusionSuitableSection"
                        >
                          {{
                            showConclusionSuitableSection
                              ? 'Скрыть'
                              : 'Показать'
                          }}
                        </button>
                      </div>
                      <div
                        v-show="showConclusionSuitableSection"
                        class="space-y-3"
                      >
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >Пункт 1</label
                          >
                          <input
                            v-model="form.conclusion_suitable_1"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                            placeholder="Опытным игрокам"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >Пункт 2</label
                          >
                          <input
                            v-model="form.conclusion_suitable_2"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                            placeholder="Любителям высокой волатильности"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >Пункт 3</label
                          >
                          <input
                            v-model="form.conclusion_suitable_3"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                            placeholder="Игрокам с большим банкроллом"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >Пункт 4</label
                          >
                          <input
                            v-model="form.conclusion_suitable_4"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                            placeholder="Поклонникам инноваций"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Важно помнить (4 пункта) -->
                    <div
                      class="group bg-gradient-to-r from-[#F59E0B]/10 to-[#EF4444]/10 border border-[#F59E0B]/20 rounded-xl p-6 hover:border-[#F59E0B]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">⚠️</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Важно помнить
                            </h3>
                            <p class="text-sm text-[#F59E0B]">4 пункта</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showConclusionWarningSection =
                              !showConclusionWarningSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#F59E0B]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showConclusionWarningSection"
                        >
                          {{
                            showConclusionWarningSection ? 'Скрыть' : 'Показать'
                          }}
                        </button>
                      </div>
                      <div
                        v-show="showConclusionWarningSection"
                        class="space-y-3"
                      >
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >Пункт 1</label
                          >
                          <input
                            v-model="form.conclusion_warning_1"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                            placeholder="Высокая волатильность"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >Пункт 2</label
                          >
                          <input
                            v-model="form.conclusion_warning_2"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                            placeholder="Нужен большой банкролл"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >Пункт 3</label
                          >
                          <input
                            v-model="form.conclusion_warning_3"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                            placeholder="Играйте ответственно"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                            >Пункт 4</label
                          >
                          <input
                            v-model="form.conclusion_warning_4"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                            placeholder="Устанавливайте лимиты"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Секция "Время побеждать!" -->
            <div id="cta-section">
              <div
                id="cta"
                data-section="cta"
                class="bg-[#161A21]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#353A4A] relative overflow-hidden"
              >
                <!-- Декоративный фон -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/5 via-transparent to-[#EF4444]/5"
                ></div>
                <div
                  class="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"
                ></div>

                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center gap-4">
                      <div
                        class="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 animate-pulse"
                      >
                        <span class="text-2xl">⚡</span>
                      </div>
                      <div>
                        <h2
                          class="text-2xl font-semibold text-[#E5E7EB] font-display"
                        >
                          Время побеждать!
                        </h2>
                        <div
                          class="h-1 w-28 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] rounded-full mt-2"
                        ></div>
                      </div>
                    </div>
                    <!-- Кнопка сворачивания/разворачивания секции -->
                    <button
                      type="button"
                      @click="showCtaSection = !showCtaSection"
                      class="flex items-center justify-center w-10 h-10 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#F59E0B]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200"
                      :aria-expanded="showCtaSection"
                    >
                      <svg
                        class="w-4 h-4 transform transition-transform duration-200"
                        :class="{ 'rotate-180': showCtaSection }"
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

                  <div v-show="showCtaSection" class="space-y-8">
                    <!-- Заголовки -->
                    <div
                      class="group bg-gradient-to-r from-[#F59E0B]/10 to-[#EF4444]/10 border border-[#F59E0B]/20 rounded-xl p-6 hover:border-[#F59E0B]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl flex items-center justify-center"
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
                              Заголовки
                            </h3>
                            <p class="text-sm text-[#F59E0B]">
                              Заголовок, подзаголовок и потенциал
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showCtaTitleSection = !showCtaTitleSection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#F59E0B]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showCtaTitleSection"
                        >
                          {{ showCtaTitleSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showCtaTitleSection" class="space-y-4">
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Главный заголовок
                          </label>
                          <input
                            v-model="form.cta_title"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                            placeholder="Время побеждать!"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Подзаголовок
                          </label>
                          <input
                            v-model="form.cta_subtitle"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                            placeholder="Окунитесь в легендарный мир этого слота"
                          />
                        </div>
                        <div>
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-2"
                          >
                            Потенциал выигрыша
                          </label>
                          <input
                            v-model="form.cta_potential"
                            type="text"
                            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all duration-200 text-sm"
                            placeholder="x5,000"
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Карточки преимуществ (3 карточки) -->
                    <div
                      class="group bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 border border-[#3B82F6]/20 rounded-xl p-6 hover:border-[#3B82F6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">🎁</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Карточки преимуществ
                            </h3>
                            <p class="text-sm text-[#3B82F6]">3 карточки</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showCtaFeaturesSection = !showCtaFeaturesSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#3B82F6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showCtaFeaturesSection"
                        >
                          {{ showCtaFeaturesSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showCtaFeaturesSection" class="space-y-6">
                        <!-- Карточка 1 -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            Карточка 1
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Emoji</label
                              >
                              <input
                                v-model="form.cta_feature_1_emoji"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                                placeholder="🎰"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Заголовок</label
                              >
                              <input
                                v-model="form.cta_feature_1_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                                placeholder="Демо режим"
                              />
                            </div>
                            <div class="lg:col-span-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Описание</label
                              >
                              <input
                                v-model="form.cta_feature_1_desc"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                                placeholder="Изучите все механики игры совершенно бесплатно"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Карточка 2 -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            Карточка 2
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Emoji</label
                              >
                              <input
                                v-model="form.cta_feature_2_emoji"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                                placeholder="💰"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Заголовок</label
                              >
                              <input
                                v-model="form.cta_feature_2_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                                placeholder="Реальные деньги"
                              />
                            </div>
                            <div class="lg:col-span-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Описание</label
                              >
                              <input
                                v-model="form.cta_feature_2_desc"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                                placeholder="Играйте на деньги в лучших онлайн казино"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Карточка 3 -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            Карточка 3
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Emoji</label
                              >
                              <input
                                v-model="form.cta_feature_3_emoji"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                                placeholder="🎁"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Заголовок</label
                              >
                              <input
                                v-model="form.cta_feature_3_title"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                                placeholder="Эксклюзивные бонусы"
                              />
                            </div>
                            <div class="lg:col-span-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Описание</label
                              >
                              <input
                                v-model="form.cta_feature_3_desc"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] transition-all duration-200 text-sm"
                                placeholder="Получите дополнительные средства для игры"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Кнопки действий (2 кнопки) -->
                    <div
                      class="group bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-xl p-6 hover:border-[#10B981]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">🎮</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Кнопки действий
                            </h3>
                            <p class="text-sm text-[#10B981]">
                              2 кнопки призыва к действию
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="
                            showCtaButtonsSection = !showCtaButtonsSection
                          "
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#10B981]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showCtaButtonsSection"
                        >
                          {{ showCtaButtonsSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showCtaButtonsSection" class="space-y-6">
                        <!-- Кнопка 1: Демо -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            Кнопка "Играть демо"
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Emoji</label
                              >
                              <input
                                v-model="form.cta_button_demo_emoji"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="🎮"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Текст кнопки</label
                              >
                              <input
                                v-model="form.cta_button_demo_text"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="Играть демо"
                              />
                            </div>
                            <div class="lg:col-span-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Ссылка на демо</label
                              >
                              <input
                                v-model="form.cta_button_demo_url"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="/slots/gates-of-olympus/demo"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Кнопка 2: На деньги -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-4">
                            Кнопка "Играть на деньги"
                          </h4>
                          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Emoji</label
                              >
                              <input
                                v-model="form.cta_button_real_emoji"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="💎"
                              />
                            </div>
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Текст кнопки</label
                              >
                              <input
                                v-model="form.cta_button_real_text"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="Играть на деньги"
                              />
                            </div>
                            <div class="lg:col-span-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Ссылка на реальную игру</label
                              >
                              <input
                                v-model="form.cta_button_real_url"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-all duration-200 text-sm"
                                placeholder="/casinos/best-for-gates-of-olympus"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Индикаторы доверия (3 индикатора) -->
                    <div
                      class="group bg-gradient-to-r from-[#8B5CF6]/10 to-[#7C3AED]/10 border border-[#8B5CF6]/20 rounded-xl p-6 hover:border-[#8B5CF6]/40 transition-all duration-300"
                    >
                      <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center"
                          >
                            <span class="text-2xl">✅</span>
                          </div>
                          <div>
                            <h3
                              class="text-lg font-medium text-[#E5E7EB] font-display"
                            >
                              Индикаторы доверия
                            </h3>
                            <p class="text-sm text-[#8B5CF6]">
                              3 индикатора безопасности
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          @click="showCtaTrustSection = !showCtaTrustSection"
                          class="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:border-[#8B5CF6]/40 text-[#9CA3AF] hover:text-[#E5E7EB] transition-all duration-200 font-medium"
                          :aria-expanded="showCtaTrustSection"
                        >
                          {{ showCtaTrustSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>
                      <div v-show="showCtaTrustSection" class="space-y-4">
                        <!-- Индикатор 1 -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-3">
                            Индикатор 1
                          </h4>
                          <div class="grid grid-cols-1 gap-3">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Текст</label
                              >
                              <input
                                v-model="form.cta_trust_1_text"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                                placeholder="Лицензированные операторы"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Индикатор 2 -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-3">
                            Индикатор 2
                          </h4>
                          <div class="grid grid-cols-1 gap-3">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Текст</label
                              >
                              <input
                                v-model="form.cta_trust_2_text"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                                placeholder="Безопасность SSL"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Индикатор 3 -->
                        <div
                          class="p-4 bg-[#1B1E26] rounded-lg border border-[#353A4A]"
                        >
                          <h4 class="text-md font-semibold text-[#E5E7EB] mb-3">
                            Индикатор 3
                          </h4>
                          <div class="grid grid-cols-1 gap-3">
                            <div>
                              <label
                                class="block text-sm font-medium text-[#E5E7EB] mb-2"
                                >Текст</label
                              >
                              <input
                                v-model="form.cta_trust_3_text"
                                type="text"
                                class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all duration-200 text-sm"
                                placeholder="Поддержка 24/7"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                          {{ showMetaSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>

                      <div v-show="showMetaSection" class="space-y-6">
                        <!-- SEO Title -->
                        <div class="space-y-2">
                          <label
                            class="block text-sm font-medium text-[#E5E7EB]"
                          >
                            SEO Заголовок
                            <span class="text-[#10B981] ml-1">*</span>
                          </label>
                          <input
                            v-model="form.seo_title"
                            type="text"
                            placeholder="Играть в [Название слота] онлайн бесплатно | SlotQuest"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
                            maxlength="60"
                          />
                          <div class="flex justify-between text-xs">
                            <span class="text-[#9CA3AF]"
                              >Рекомендуется: 50-60 символов</span
                            >
                            <span
                              class="text-[#9CA3AF]"
                              :class="{
                                'text-[#EF4444]':
                                  (form.seo_title || '').length > 60,
                                'text-[#10B981]':
                                  (form.seo_title || '').length <= 60 &&
                                  (form.seo_title || '').length >= 50,
                              }"
                            >
                              {{ (form.seo_title || '').length }}/60
                            </span>
                          </div>
                        </div>

                        <!-- SEO Description -->
                        <div class="space-y-2">
                          <label
                            class="block text-sm font-medium text-[#E5E7EB]"
                          >
                            SEO Описание
                            <span class="text-[#10B981] ml-1">*</span>
                          </label>
                          <textarea
                            v-model="form.seo_description"
                            rows="3"
                            placeholder="Играйте в [Название слота] от [Провайдер] бесплатно и на реальные деньги. RTP [%], волатильность [уровень]. Бонусы, фриспины и джекпоты."
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200 resize-none"
                            maxlength="160"
                          ></textarea>
                          <div class="flex justify-between text-xs">
                            <span class="text-[#9CA3AF]"
                              >Рекомендуется: 150-160 символов</span
                            >
                            <span
                              class="text-[#9CA3AF]"
                              :class="{
                                'text-[#EF4444]':
                                  (form.seo_description || '').length > 160,
                                'text-[#10B981]':
                                  (form.seo_description || '').length <= 160 &&
                                  (form.seo_description || '').length >= 150,
                              }"
                            >
                              {{ (form.seo_description || '').length }}/160
                            </span>
                          </div>
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
                          {{ showOpenGraphSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>

                      <div v-show="showOpenGraphSection" class="space-y-6">
                        <!-- OG Title -->
                        <div class="space-y-2">
                          <label
                            class="block text-sm font-medium text-[#E5E7EB]"
                          >
                            OG Заголовок
                          </label>
                          <input
                            v-model="form.og_title"
                            type="text"
                            placeholder="Автоматически из SEO заголовка"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200"
                          />
                        </div>

                        <!-- OG Description -->
                        <div class="space-y-2">
                          <label
                            class="block text-sm font-medium text-[#E5E7EB]"
                          >
                            OG Описание
                          </label>
                          <textarea
                            v-model="form.og_description"
                            rows="2"
                            placeholder="Автоматически из SEO описания"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200 resize-none"
                          ></textarea>
                        </div>

                        <!-- OG Image -->
                        <div class="space-y-2">
                          <label
                            class="block text-sm font-medium text-[#E5E7EB]"
                          >
                            OG Изображение
                          </label>
                          <input
                            v-model="form.og_image"
                            type="url"
                            placeholder="Автоматически из основного изображения слота"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-200"
                          />
                          <p class="text-xs text-[#9CA3AF]">
                            Рекомендуемый размер: 1200x630 пикселей
                          </p>
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
                              Настройки для отображения в Twitter
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
                          {{ showTwitterSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>

                      <div v-show="showTwitterSection" class="space-y-6">
                        <!-- Twitter Card Type -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-3"
                          >
                            Тип карточки
                          </label>
                          <select
                            v-model="form.twitter_card"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-200"
                          >
                            <option value="summary">Summary</option>
                            <option value="summary_large_image">
                              Summary Large Image
                            </option>
                            <option value="app">App</option>
                            <option value="player">Player</option>
                          </select>
                          <p class="text-xs text-[#9CA3AF] mt-2">
                            Рекомендуется: Summary Large Image для игровых
                            слотов
                          </p>
                        </div>

                        <!-- Twitter Title -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-3"
                          >
                            Twitter Заголовок
                          </label>
                          <input
                            v-model="form.twitter_title"
                            type="text"
                            placeholder="Автоматически из SEO заголовка"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-200"
                          />
                          <div class="flex justify-between items-center mt-2">
                            <p class="text-xs text-[#9CA3AF]">
                              Максимум 70 символов для лучшего отображения
                            </p>
                            <span
                              class="text-xs"
                              :class="{
                                'text-[#10B981]':
                                  (form.twitter_title || '').length <= 70,
                                'text-[#F59E0B]':
                                  (form.twitter_title || '').length > 70 &&
                                  (form.twitter_title || '').length <= 100,
                                'text-[#EF4444]':
                                  (form.twitter_title || '').length > 100,
                              }"
                            >
                              {{ (form.twitter_title || '').length }}/70
                            </span>
                          </div>
                        </div>

                        <!-- Twitter Description -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-3"
                          >
                            Twitter Описание
                          </label>
                          <textarea
                            v-model="form.twitter_description"
                            rows="3"
                            placeholder="Автоматически из SEO описания"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-200 resize-none"
                          ></textarea>
                          <div class="flex justify-between items-center mt-2">
                            <p class="text-xs text-[#9CA3AF]">
                              Максимум 200 символов для лучшего отображения
                            </p>
                            <span
                              class="text-xs"
                              :class="{
                                'text-[#10B981]':
                                  (form.twitter_description || '').length <=
                                  200,
                                'text-[#F59E0B]':
                                  (form.twitter_description || '').length >
                                    200 &&
                                  (form.twitter_description || '').length <=
                                    300,
                                'text-[#EF4444]':
                                  (form.twitter_description || '').length > 300,
                              }"
                            >
                              {{ (form.twitter_description || '').length }}/200
                            </span>
                          </div>
                        </div>

                        <!-- Twitter Image -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-3"
                          >
                            Twitter Изображение
                          </label>
                          <input
                            v-model="form.twitter_image"
                            type="url"
                            placeholder="Автоматически из Open Graph изображения"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-200"
                          />
                          <p class="text-xs text-[#9CA3AF] mt-2">
                            Рекомендуемый размер: 1200x628 пикселей (соотношение
                            1.91:1)
                          </p>
                        </div>

                        <!-- Twitter Site -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <label
                            class="block text-sm font-medium text-[#E5E7EB] mb-3"
                          >
                            Twitter аккаунт сайта
                          </label>
                          <input
                            v-model="form.twitter_site"
                            type="text"
                            placeholder="@slotquest"
                            class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-200"
                          />
                          <p class="text-xs text-[#9CA3AF] mt-2">
                            Twitter username сайта (с символом @)
                          </p>
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
                          {{ showTechnicalSeoSection ? 'Скрыть' : 'Показать' }}
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

                        <!-- Целевые локации и Многоязычность -->
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
                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            Целевые локации и языки (hreflang)
                          </h4>
                          <div class="space-y-4">
                            <!-- Целевые локации -->
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Страны и регионы для таргетинга
                              </label>
                              <textarea
                                v-model="form.target_locations"
                                rows="6"
                                placeholder="🇷🇺 Россия&#10;🇮🇳 Индия&#10;🇧🇷 Бразилия&#10;🇺🇿 Узбекистан&#10;🇦🇿 Азербайджан&#10;🇹🇷 Турция&#10;🇨🇱 Чили&#10;🇦🇷 Аргентина&#10;🇨🇦 Канада&#10;🇨🇴 Колумбия&#10;🇮🇩 Индонезия&#10;🇧🇩 Бангладеш&#10;🇸🇳 Сенегал&#10;🇺🇬 Уганда"
                                class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 resize-none font-mono text-sm leading-relaxed"
                              ></textarea>
                              <p class="text-xs text-[#9CA3AF]">
                                Укажите целевые страны и регионы для
                                геотаргетинга. Каждая страна с новой строки с
                                флагом и названием.
                              </p>
                            </div>

                            <!-- Язык контента (упрощено - только английский для всех ГЕО) -->
                            <div
                              class="space-y-2 border-t border-[#353A4A] pt-4"
                            >
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                🌐 Язык контента (рекомендуется английский для
                                международной аудитории)
                              </label>
                              <select
                                v-model="form.content_language"
                                class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200"
                              >
                                <option value="en">
                                  English (рекомендуется)
                                </option>
                                <option value="ru">Русский</option>
                                <option value="pt">Português</option>
                                <option value="hi">हिन्दी</option>
                                <option value="tr">Türkçe</option>
                                <option value="es">Español</option>
                                <option value="id">Bahasa Indonesia</option>
                              </select>
                              <p class="text-xs text-[#10B981]">
                                💡 Английский язык + гео-таргетинг = одна
                                страница для всех стран (без дублирования)
                              </p>
                            </div>

                            <!-- Целевые регионы для гео-таргетинга -->
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                🎯 Целевые регионы (коды стран через запятую)
                              </label>
                              <input
                                v-model="form.geo_target_regions"
                                type="text"
                                placeholder="RU, IN, BR, UZ, AZ, TR, CL, AR, CA, CO, ID, BD"
                                class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 font-mono"
                              />
                              <p class="text-xs text-[#9CA3AF]">
                                🌍 Коды ISO стран (RU=Россия, IN=Индия,
                                BR=Бразилия и т.д.)
                              </p>
                            </div>
                          </div>
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
                          {{ showJsonLdSection ? 'Скрыть' : 'Показать' }}
                        </button>
                      </div>

                      <div v-show="showJsonLdSection" class="space-y-6">
                        <!-- VideoGame Schema -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <h4
                            class="text-md font-medium text-[#E5E7EB] mb-4 flex items-center gap-2"
                          >
                            <svg
                              class="w-4 h-4 text-[#8B5CF6]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            VideoGame Schema
                          </h4>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Жанр игры
                              </label>
                              <input
                                v-model="form.schema_game_genre"
                                type="text"
                                placeholder="Casino Game, Slot Machine"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Платформа
                              </label>
                              <input
                                v-model="form.schema_game_platform"
                                type="text"
                                placeholder="Web Browser, Mobile"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Издатель
                              </label>
                              <input
                                v-model="form.schema_game_publisher"
                                type="text"
                                placeholder="Автоматически из провайдера"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Возрастной рейтинг
                              </label>
                              <select
                                v-model="form.schema_content_rating"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              >
                                <option value="">Выберите рейтинг</option>
                                <option value="18+">18+</option>
                                <option value="21+">21+</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <!-- AggregateRating Schema -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <h4
                            class="text-md font-medium text-[#E5E7EB] mb-4 flex items-center gap-2"
                          >
                            <svg
                              class="w-4 h-4 text-[#F59E0B]"
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
                            Рейтинг и Отзывы
                          </h4>
                          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Средний рейтинг
                              </label>
                              <input
                                v-model="form.schema_rating_value"
                                type="number"
                                step="0.1"
                                min="1"
                                max="5"
                                placeholder="4.8"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Количество отзывов
                              </label>
                              <input
                                v-model="form.schema_review_count"
                                type="number"
                                min="0"
                                placeholder="1250"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Лучший рейтинг
                              </label>
                              <input
                                v-model="form.schema_best_rating"
                                type="number"
                                min="1"
                                max="5"
                                placeholder="5"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Organization Schema -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <h4
                            class="text-md font-medium text-[#E5E7EB] mb-4 flex items-center gap-2"
                          >
                            <svg
                              class="w-4 h-4 text-[#10B981]"
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
                            Информация об организации
                          </h4>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Название организации
                              </label>
                              <input
                                v-model="form.schema_org_name"
                                type="text"
                                placeholder="SlotQuest"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                URL организации
                              </label>
                              <input
                                v-model="form.schema_org_url"
                                type="url"
                                placeholder="https://slotquest.com"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Логотип организации
                              </label>
                              <input
                                v-model="form.schema_org_logo"
                                type="url"
                                placeholder="https://slotquest.com/logo.png"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Тип организации
                              </label>
                              <select
                                v-model="form.schema_org_type"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              >
                                <option value="">Выберите тип</option>
                                <option value="Organization">
                                  Organization
                                </option>
                                <option value="Corporation">Corporation</option>
                                <option value="LocalBusiness">
                                  LocalBusiness
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <!-- Slot Characteristics Schema -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <h4
                            class="text-md font-medium text-[#E5E7EB] mb-4 flex items-center gap-2"
                          >
                            <svg
                              class="w-4 h-4 text-[#3B82F6]"
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
                            Характеристики слота
                          </h4>
                          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                RTP (%)
                              </label>
                              <input
                                v-model="form.schema_slot_rtp"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                placeholder="96.5"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Волатильность
                              </label>
                              <select
                                v-model="form.schema_slot_volatility"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              >
                                <option value="">Выберите волатильность</option>
                                <option value="Low">Низкая</option>
                                <option value="Medium">Средняя</option>
                                <option value="High">Высокая</option>
                              </select>
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Максимальный выигрыш
                              </label>
                              <input
                                v-model="form.schema_slot_max_win"
                                type="text"
                                placeholder="5000x"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Минимальная ставка
                              </label>
                              <input
                                v-model="form.schema_slot_min_bet"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.10"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Максимальная ставка
                              </label>
                              <input
                                v-model="form.schema_slot_max_bet"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="100.00"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Дата релиза
                              </label>
                              <input
                                v-model="form.schema_slot_release_date"
                                type="date"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Slot Popularity Schema -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <h4
                            class="text-md font-medium text-[#E5E7EB] mb-4 flex items-center gap-2"
                          >
                            <svg
                              class="w-4 h-4 text-[#EF4444]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                              ></path>
                            </svg>
                            Популярность слота
                          </h4>
                          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Рейтинг популярности
                              </label>
                              <input
                                v-model="form.schema_popularity_rating"
                                type="number"
                                step="0.1"
                                min="1"
                                max="10"
                                placeholder="8.5"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Частота бонуса
                              </label>
                              <input
                                v-model="form.schema_bonus_frequency"
                                type="text"
                                placeholder="1:150"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Реальный RTP (%)
                              </label>
                              <input
                                v-model="form.schema_real_rtp"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                placeholder="96.2"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Slot Features Schema -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <h4
                            class="text-md font-medium text-[#E5E7EB] mb-4 flex items-center gap-2"
                          >
                            <svg
                              class="w-4 h-4 text-[#06B6D4]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              ></path>
                            </svg>
                            Особенности слота
                          </h4>
                          <div class="grid grid-cols-1 gap-4">
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Игровые механики (через запятую)
                              </label>
                              <textarea
                                v-model="form.schema_game_mechanics"
                                rows="2"
                                placeholder="Cascading Reels, Free Spins, Wild Symbols"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm resize-none"
                              ></textarea>
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Виды бонусов (через запятую)
                              </label>
                              <textarea
                                v-model="form.schema_bonus_types"
                                rows="2"
                                placeholder="Free Spins, Multipliers, Bonus Games"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm resize-none"
                              ></textarea>
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Тематика слота
                              </label>
                              <input
                                v-model="form.schema_slot_theme"
                                type="text"
                                placeholder="Ancient Egypt, Adventure, Fantasy"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Provider & Basic Info Schema -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <h4
                            class="text-md font-medium text-[#E5E7EB] mb-4 flex items-center gap-2"
                          >
                            <svg
                              class="w-4 h-4 text-[#F59E0B]"
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
                            Провайдер и основная информация
                          </h4>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Название провайдера
                              </label>
                              <input
                                v-model="form.schema_provider_name"
                                type="text"
                                placeholder="Автоматически из провайдера"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                URL обложки слота
                              </label>
                              <input
                                v-model="form.schema_slot_cover"
                                type="url"
                                placeholder="https://example.com/slot-cover.jpg"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Название слота
                              </label>
                              <input
                                v-model="form.schema_slot_name"
                                type="text"
                                placeholder="Автоматически из названия"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                Описание слота
                              </label>
                              <textarea
                                v-model="form.schema_slot_description"
                                rows="3"
                                placeholder="Краткое описание игрового слота"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm resize-none"
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        <!-- Game Actions Schema -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <h4
                            class="text-md font-medium text-[#E5E7EB] mb-4 flex items-center gap-2"
                          >
                            <svg
                              class="w-4 h-4 text-[#8B5CF6]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            Действия игры
                          </h4>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                URL демо версии
                              </label>
                              <input
                                v-model="form.schema_demo_url"
                                type="url"
                                placeholder="https://example.com/demo"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                            <div class="space-y-2">
                              <label
                                class="block text-sm font-medium text-[#E5E7EB]"
                              >
                                URL игры на деньги
                              </label>
                              <input
                                v-model="form.schema_real_play_url"
                                type="url"
                                placeholder="https://example.com/real-play"
                                class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <!-- Full Review Schema -->
                        <div
                          class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4"
                        >
                          <h4
                            class="text-md font-medium text-[#E5E7EB] mb-4 flex items-center gap-2"
                          >
                            <svg
                              class="w-4 h-4 text-[#10B981]"
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
                            Полный обзор слота
                          </h4>
                          <div class="space-y-6">
                            <!-- Основная информация обзора -->
                            <div class="grid grid-cols-1 gap-4">
                              <div class="space-y-2">
                                <label
                                  class="block text-sm font-medium text-[#E5E7EB]"
                                >
                                  Заголовок обзора
                                </label>
                                <input
                                  v-model="form.schema_review_title"
                                  type="text"
                                  placeholder="Полный обзор слота Gates of Olympus 2025"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                                />
                              </div>
                              <div class="space-y-2">
                                <label
                                  class="block text-sm font-medium text-[#E5E7EB]"
                                >
                                  Первый абзац описания
                                </label>
                                <textarea
                                  v-model="form.schema_review_description_1"
                                  rows="3"
                                  placeholder="Первый абзац подробного описания слота"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm resize-none"
                                ></textarea>
                              </div>
                              <div class="space-y-2">
                                <label
                                  class="block text-sm font-medium text-[#E5E7EB]"
                                >
                                  Второй абзац описания
                                </label>
                                <textarea
                                  v-model="form.schema_review_description_2"
                                  rows="3"
                                  placeholder="Второй абзац подробного описания слота"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm resize-none"
                                ></textarea>
                              </div>
                            </div>

                            <!-- Ключевые особенности -->
                            <div class="space-y-4">
                              <h5
                                class="text-sm font-medium text-[#E5E7EB] border-b border-[#353A4A] pb-2"
                              >
                                Ключевые особенности (6 пунктов)
                              </h5>
                              <div
                                class="grid grid-cols-1 md:grid-cols-2 gap-4"
                              >
                                <div class="space-y-2">
                                  <label
                                    class="block text-xs font-medium text-[#9CA3AF]"
                                  >
                                    Особенность 1
                                  </label>
                                  <input
                                    v-model="form.schema_review_feature_1"
                                    type="text"
                                    placeholder="Первая ключевая особенность"
                                    class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                                  />
                                </div>
                                <div class="space-y-2">
                                  <label
                                    class="block text-xs font-medium text-[#9CA3AF]"
                                  >
                                    Особенность 2
                                  </label>
                                  <input
                                    v-model="form.schema_review_feature_2"
                                    type="text"
                                    placeholder="Вторая ключевая особенность"
                                    class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                                  />
                                </div>
                                <div class="space-y-2">
                                  <label
                                    class="block text-xs font-medium text-[#9CA3AF]"
                                  >
                                    Особенность 3
                                  </label>
                                  <input
                                    v-model="form.schema_review_feature_3"
                                    type="text"
                                    placeholder="Третья ключевая особенность"
                                    class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                                  />
                                </div>
                                <div class="space-y-2">
                                  <label
                                    class="block text-xs font-medium text-[#9CA3AF]"
                                  >
                                    Особенность 4
                                  </label>
                                  <input
                                    v-model="form.schema_review_feature_4"
                                    type="text"
                                    placeholder="Четвертая ключевая особенность"
                                    class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                                  />
                                </div>
                                <div class="space-y-2">
                                  <label
                                    class="block text-xs font-medium text-[#9CA3AF]"
                                  >
                                    Особенность 5
                                  </label>
                                  <input
                                    v-model="form.schema_review_feature_5"
                                    type="text"
                                    placeholder="Пятая ключевая особенность"
                                    class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                                  />
                                </div>
                                <div class="space-y-2">
                                  <label
                                    class="block text-xs font-medium text-[#9CA3AF]"
                                  >
                                    Особенность 6
                                  </label>
                                  <input
                                    v-model="form.schema_review_feature_6"
                                    type="text"
                                    placeholder="Шестая ключевая особенность"
                                    class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                                  />
                                </div>
                              </div>
                            </div>

                            <!-- Популярность -->
                            <div class="space-y-4">
                              <h5
                                class="text-sm font-medium text-[#E5E7EB] border-b border-[#353A4A] pb-2"
                              >
                                Популярность слота
                              </h5>
                              <div
                                class="grid grid-cols-1 md:grid-cols-2 gap-4"
                              >
                                <div class="space-y-2">
                                  <label
                                    class="block text-xs font-medium text-[#9CA3AF]"
                                  >
                                    Заголовок популярности
                                  </label>
                                  <input
                                    v-model="form.schema_popularity_title"
                                    type="text"
                                    placeholder="Насколько популярен Gates of Olympus?"
                                    class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                                  />
                                </div>
                                <div class="space-y-2">
                                  <label
                                    class="block text-xs font-medium text-[#9CA3AF]"
                                  >
                                    Позиция в рейтинге
                                  </label>
                                  <input
                                    v-model="form.schema_ranking_position"
                                    type="number"
                                    min="1"
                                    placeholder="5"
                                    class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                                  />
                                </div>
                                <div class="space-y-2">
                                  <label
                                    class="block text-xs font-medium text-[#9CA3AF]"
                                  >
                                    Пользовательский рейтинг
                                  </label>
                                  <input
                                    v-model="form.schema_user_rating"
                                    type="number"
                                    step="0.1"
                                    min="1"
                                    max="5"
                                    placeholder="4.8"
                                    class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                                  />
                                </div>
                                <div class="space-y-2">
                                  <label
                                    class="block text-xs font-medium text-[#9CA3AF]"
                                  >
                                    Глобальный рейтинг
                                  </label>
                                  <input
                                    v-model="form.schema_global_rating"
                                    type="number"
                                    min="1"
                                    placeholder="15"
                                    class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm"
                                  />
                                </div>
                              </div>
                              <div class="space-y-2">
                                <label
                                  class="block text-xs font-medium text-[#9CA3AF]"
                                >
                                  Описание популярности
                                </label>
                                <textarea
                                  v-model="form.schema_popularity_description"
                                  rows="3"
                                  placeholder="Подробное описание популярности слота"
                                  class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-200 text-sm resize-none"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
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

// Состояние для секции "Заключение"
const showConclusionSection = ref(false)
const showConclusionTitleSection = ref(false)
const showConclusionTextSection = ref(false)
const showConclusionSuitableSection = ref(false)
const showConclusionWarningSection = ref(false)

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

  // Поля для секции "Полный обзор слота 2025"
  // Основное описание
  overview_title: 'Полный обзор слота 2025',
  overview_description_1:
    'Этот невероятный слот от Pragmatic Play произвел настоящую революцию в мире онлайн-гемблинга. Благодаря уникальной механике Tumble, случайным множителям и захватывающим бонусным функциям, игра стала абсолютным хитом среди игроков по всему миру.',
  overview_description_2:
    'Слот отличается высоким RTP 96.50%, средней волатильностью и потенциалом выигрыша до 5,000x от ставки. Игровое поле 6×5 с системой Scatter Pays создает бесконечные возможности для выигрышных комбинаций.',
  overview_features_1: 'Механика Tumble с каскадными выигрышами',
  overview_features_2: 'Случайные множители от x2 до x500',
  overview_features_3: '15 бесплатных спинов в бонусной игре',
  overview_features_4: 'Возможность купить бонус за 100x ставки',
  overview_features_5: 'Максимальный выигрыш 5,000x от ставки',
  overview_features_6: 'Один крупный выигрыш на 697,350 спинов',

  // Подсекция "Насколько популярен"
  popularity_title: 'Насколько популярен этот слот?',
  popularity_ranking_position: '12',
  popularity_user_rating: '4.8',
  popularity_monthly_players: '2M+',
  popularity_description:
    'Этот слот удерживает топовые позиции в рейтингах уже несколько лет подряд, что подтверждает его исключительное качество и увлекательность геймплея.',

  // Детальные метрики популярности (3 карточки)
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

  // Подсекция "В чем секрет такого огромного успеха?"
  success_secret_title: 'В чем секрет такого огромного успеха?',
  success_secret_intro:
    'Одним из ключей к такому огромному успеху является механика Scatter Pays — то, что объединяет многие популярные онлайн-слоты. Вам не нужны линии выплат, кластеры или способы выигрыша... Одинаковые символы могут появиться в любом месте сетки и принести вам выигрыши.',

  // Два основных блока объяснения
  success_sweetbonanza_title: '🍭 Связь с Sweet Bonanza',
  success_sweetbonanza_description:
    'Sweet Bonanza был тайтлом, который протестировал воды для Gates of Olympus. Эти две игры имеют много общих геймплейных сходств. И кажется, что игроки больше любят эпическую тему греческих богов, чем сладкую природу Sweet Bonanza.',

  success_balance_title: '⚖️ Идеальный баланс',
  success_balance_description:
    'Pragmatic Play использовала проверенный и испытанный рецепт для достижения идеального баланса между сложностью и простотой. Три элемента — scatter pays, tumbles и множители — создают идеальную основу для захватывающего, но не слишком сложного геймплея.',

  // Заключительное объяснение
  success_conclusion:
    'Эта комбинация творит чудеса, и наши рейтинги, основанные на реальных данных казино, подтверждают это. Количество tumbles не ограничено, и у вас может быть один раунд, который продолжается намного дольше обычного спина.',

  // Подсекция "Основные особенности и механики игры"
  mechanics_title: 'Основные особенности и механики игры',
  mechanics_intro:
    'Слот предлагает уникальный игровой опыт благодаря инновационным механикам:',

  // Scatter Pays (детальное описание)
  mechanics_scatter_title: 'Scatter Pays',
  mechanics_scatter_description:
    'Движок scatter pays довольно популярен, поскольку делает все намного проще. Вам не нужно ждать, пока символы приземлятся на определенные позиции.',
  mechanics_scatter_details:
    '8+ одинаковых символов = выигрыш! Scatter символ (Зевс) срабатывает от 4+ символов.',

  // Tumbles (каскады)
  mechanics_cascade_title: 'Tumbles (Каскады)',
  mechanics_cascade_description:
    'Любой выигрыш в Gates of Olympus запускает каскад. Выигрышные символы удаляются, а гравитация заполняет пробелы новыми символами.',
  mechanics_cascade_details:
    'Каскады могут продолжаться бесконечно, создавая цепочки выигрышей в одном спине.',

  // Множители
  mechanics_multipliers_title: 'Множители от x2 до x500',
  mechanics_multipliers_description:
    'На каждом спине случайные множители от x2 до x500 могут появиться на барабанах в виде красочных сфер.',
  mechanics_multipliers_details:
    'В бесплатных спинах множители накапливаются и не сбрасываются между раундами.',

  // Подсекция "Бесплатные спины Gates of Olympus"
  free_spins_title: 'Бесплатные спины Gates of Olympus',
  free_spins_intro:
    'Четыре символа Зевса предоставляют игрокам вход в самую сочную часть игры. Не важно, получите ли вы 4 или больше символов — количество спинов всегда составляет 15. Но больше scatter-символов все же предпочтительнее, поскольку они дают мгновенную выплату.',

  // Мгновенные выплаты за scatter
  free_spins_instant_title: '💰 Мгновенные выплаты за Scatter',
  free_spins_4_scatter: '4 символа Зевса: x3 от ставки',
  free_spins_5_scatter: '5 символов Зевса: x5 от ставки',
  free_spins_6_scatter: '6 символов Зевса: x100 от ставки',

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

  // Подсекция "Стратегии и советы для игры"
  strategies_title: 'Стратегии и советы для игры',
  strategies_intro:
    'Эффективные подходы для максимизации удовольствия от игры:',

  // Рекомендации для новичков
  strategies_beginners_title: '💡 Рекомендации для новичков',
  strategy_beginner_1: 'Начните с демо-версии для изучения механик',
  strategy_beginner_2: 'Устанавливайте лимиты перед началом игры',
  strategy_beginner_3: 'Начинайте с минимальных ставок',
  strategy_beginner_4: 'Изучите таблицу выплат и правила',
  strategy_beginner_5: 'Играйте только на проверенных сайтах',

  // Продвинутые стратегии
  strategies_advanced_title: '🎯 Продвинутые стратегии',
  strategy_advanced_1: 'Используйте Ante Bet для увеличения шансов на бонус',
  strategy_advanced_2:
    'Рассчитайте соотношение риска и вознаграждения при покупке бонуса',
  strategy_advanced_3: 'Ведите статистику своих игровых сессий',
  strategy_advanced_4: 'Изучите паттерны выпадения множителей',

  // Управление банкроллом
  strategies_bankroll_title: '💰 Управление банкроллом',
  strategy_bankroll_1:
    'Никогда не играйте на деньги, которые не можете позволить себе потерять',
  strategy_bankroll_2:
    'Размер ставки не должен превышать 1-5% от общего банкролла',
  strategy_bankroll_3: 'Установите дневные, недельные и месячные лимиты',
  strategy_bankroll_4: 'Делайте перерывы каждые 30-60 минут',

  // === Секция "Насколько популярен" ===
  // Заголовок секции
  popularity_section_title: 'Насколько популярен',

  // Основные метрики популярности (3 карточки)
  popularity_rank_2024: '12',
  popularity_rank_2024_label: 'Рейтинг 2024',

  popularity_user_rating: '4.8/5',
  popularity_user_rating_label: 'Пользовательский рейтинг',

  popularity_monthly_players: '2M+',
  popularity_monthly_players_label: 'Игроков в месяц',

  // Заключение о популярности
  popularity_conclusion:
    '🏆 Этот слот удерживает топовые позиции в рейтингах уже несколько лет подряд, что подтверждает его исключительное качество и увлекательность геймплея.',

  // === Секция "Рейтинг и награды" ===
  // Заголовок секции
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
  // Заголовки
  reviews_title: 'Отзывы игроков',
  reviews_subtitle: 'Реальные мнения от сообщества слот-игроков',

  // Общая статистика
  reviews_overall_rating: '4.3',
  reviews_total_count: '1.2K+',
  reviews_positive_percent: '75%',
  reviews_recommend_percent: '68%',

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

  // Отзыв 1
  review_1_author: 'Александр К.',
  review_1_avatar_letter: 'А',
  review_1_rating: '★★★★★',
  review_1_badge: 'Проверенный игрок',
  review_1_text:
    'Реально крутой слот! Множители действительно работают - словил x1200 на бонусе, эмоции зашкаливали! Графика топ, анимации плавные. Играю полгода, очень доволен. Каскады постоянно продлевают удовольствие 🎰⚡',
  review_1_likes: '47 лайков',
  review_1_replies: '12 ответов',
  review_1_date: '2 дня назад',

  // Отзыв 2
  review_2_author: 'Мария В.',
  review_2_avatar_letter: 'М',
  review_2_rating: '★★★★☆',
  review_2_badge: 'Активный игрок',
  review_2_text:
    'Визуально великолепно! Тематика Олимпа реализована шикарно. Геймплей затягивает, но волатильность зашкаливает - нужен большой банкролл. Когда заходят бонусы - сказка! 🏛️✨',
  review_2_likes: '31 лайк',
  review_2_replies: '8 ответов',
  review_2_date: '1 неделю назад',

  // Отзыв 3
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
  // Заголовки
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

  // Метрика 3: Потенциал выигрыша
  prof_rating_metric_3_emoji: '💎',
  prof_rating_metric_3_name: 'Потенциал выигрыша',
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
  prof_rating_expert_quote:
    'Gates of Olympus представляет собой революционный подход к созданию видеослотов. Механика Scatter Pays полностью меняет привычные правила игры, создавая уникальный опыт для каждого спина. Высокий потенциал выигрыша x5,000 в сочетании с каскадными символами делают каждый раунд непредсказуемым и захватывающим. 🎯',

  // === Секция "Заключение" ===
  conclusion_title: 'Заключение',

  // Итоговая оценка
  conclusion_text_1:
    'Этот слот заслуженно считается одним из лучших слотов от Pragmatic Play. Сочетание инновационной механики Scatter Pays, высокого потенциала выигрыша до x5,000 и превосходной графики делают его обязательным для всех любителей азартных игр.',
  conclusion_text_2:
    'Революционная система выплат, где выигрыши начисляются за 8+ одинаковых символов в любом месте экрана, открывает новые горизонты в мире видеослотов. Каскадные выигрыши и множители создают уникальную атмосферу постоянного ожидания больших выплат.',

  // Кому подходит (4 пункта)
  conclusion_suitable_1: 'Опытным игрокам',
  conclusion_suitable_2: 'Любителям высокой волатильности',
  conclusion_suitable_3: 'Игрокам с большим банкроллом',
  conclusion_suitable_4: 'Поклонникам инноваций',

  // Важно помнить (4 пункта)
  conclusion_warning_1: 'Высокая волатильность',
  conclusion_warning_2: 'Нужен большой банкролл',
  conclusion_warning_3: 'Играйте ответственно',
  conclusion_warning_4: 'Устанавливайте лимиты',

  // === Секция "Время побеждать!" ===
  // Заголовки
  cta_title: 'Время побеждать!',
  cta_subtitle: 'Окунитесь в легендарный мир этого слота',
  cta_potential: 'x5,000',

  // Карточка 1
  cta_feature_1_emoji: '🎰',
  cta_feature_1_title: 'Демо режим',
  cta_feature_1_desc: 'Изучите все механики игры совершенно бесплатно',

  // Карточка 2
  cta_feature_2_emoji: '💰',
  cta_feature_2_title: 'Реальные деньги',
  cta_feature_2_desc: 'Играйте на деньги в лучших онлайн казино',

  // Карточка 3
  cta_feature_3_emoji: '🎁',
  cta_feature_3_title: 'Эксклюзивные бонусы',
  cta_feature_3_desc: 'Получите дополнительные средства для игры',

  // Кнопки действий
  cta_button_demo_emoji: '🎮',
  cta_button_demo_text: 'Играть демо',
  cta_button_demo_url: '/slots/gates-of-olympus/demo',
  cta_button_real_emoji: '💎',
  cta_button_real_text: 'Играть на деньги',
  cta_button_real_url: '/casinos/best-for-gates-of-olympus',

  // Индикаторы доверия
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

  // Open Graph поля
  og_title: '',
  og_description: '',
  og_image: '',

  // Twitter Card поля
  twitter_card: 'summary_large_image',
  twitter_title: '',
  twitter_description: '',
  twitter_image: '',
  twitter_site: '@slotquest',

  // Технический SEO поля
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
})

// Отдельные реактивные переменные для выбранных элементов (чтобы избежать проблем с сериализацией)
const selectedMechanics = ref([])
const selectedBonuses = ref([])
const selectedThemes = ref([])

// Заголовок страницы
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
      if (slot.value?.[key] !== undefined) {
        form.value[key] = slot.value[key]
      }
    })

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
    if (slot.value?.themes) {
      selectedThemes.value = [slot.value.themes.id]
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
    ]

    // Подготавливаем данные для отправки - только разрешенные поля
    const dataToSend = {}

    // Копируем только разрешенные поля из формы
    allowedFields.forEach((field) => {
      if (form.value[field] !== undefined) {
        dataToSend[field] = form.value[field]
      }
    })

    // Добавляем данные из отдельных переменных
    dataToSend.selected_mechanics = selectedMechanics.value
    dataToSend.selected_bonuses = selectedBonuses.value
    dataToSend.selected_themes = selectedThemes.value

    // Автоматически формируем game_field из reels и rows
    dataToSend.game_field =
      form.value.reels && form.value.rows
        ? `${form.value.reels}×${form.value.rows}`
        : form.value.game_field

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
    name: 'Заголовок секции',
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
    name: 'Заключение о популярности',
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
    name: 'Заголовок секции',
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
