<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
  >
    <!-- Навигация -->
    <nav
      class="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/admin/slots"
            class="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors font-medium"
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
            <h1 class="text-xl font-bold text-white">
              Редактирование Hero секции: {{ slot?.name || 'Новый слот' }}
            </h1>
          </div>

          <!-- Кнопки действий -->
          <div class="flex items-center gap-3">
            <button
              @click="resetForm"
              class="px-4 py-2 border border-gray-600 text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 hover:border-gray-500 font-medium transition-all duration-200"
            >
              Сброс
            </button>
            <button
              @click="saveSlot"
              :disabled="saving"
              class="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg font-semibold transition-all duration-200"
            >
              {{ saving ? 'Сохранение...' : 'Сохранить изменения' }}
            </button>
            <NuxtLink
              :to="`/slots/${slot?.slug || 'preview'}`"
              target="_blank"
              class="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-200"
            >
              Предпросмотр
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Основной контент с превью -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <!-- Левая панель: Редактирование -->
        <div class="space-y-8">
          <div
            class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
          >
            <h2
              class="text-2xl font-bold text-white mb-6 flex items-center gap-3"
            >
              <svg
                class="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Редактирование Hero секции
            </h2>

            <form @submit.prevent="saveSlot" class="space-y-6">
              <!-- Основная информация -->
              <div class="space-y-4">
                <h3
                  class="text-lg font-semibold text-blue-400 border-b border-gray-600 pb-2"
                >
                  Основная информация
                </h3>

                <!-- Название слота -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Название слота *
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Например: Gates of Olympus"
                  />
                </div>

                <!-- Slug (URL) -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    URL адрес (slug) *
                  </label>
                  <input
                    v-model="form.slug"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="gates-of-olympus"
                  />
                  <p class="mt-1 text-xs text-gray-400">
                    Будет доступен по адресу: /slots/{{
                      form.slug || 'your-slug'
                    }}
                  </p>
                </div>

                <!-- Провайдер -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Провайдер *
                  </label>
                  <select
                    v-model="form.provider_id"
                    required
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Описание для Hero секции
                  </label>
                  <textarea
                    v-model="form.description"
                    rows="4"
                    class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Краткое описание слота, которое будет отображаться в Hero секции"
                  ></textarea>
                </div>
              </div>

              <!-- Характеристики игры -->
              <div class="space-y-4">
                <h3
                  class="text-lg font-semibold text-purple-400 border-b border-gray-600 pb-2"
                >
                  Характеристики игры
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- RTP -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      RTP (%)
                    </label>
                    <input
                      v-model.number="form.rtp"
                      type="number"
                      step="0.01"
                      min="50"
                      max="99"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="96.50"
                    />
                  </div>

                  <!-- Волатильность -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Волатильность
                    </label>
                    <select
                      v-model="form.volatility"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="low">Низкая</option>
                      <option value="medium">Средняя</option>
                      <option value="high">Высокая</option>
                    </select>
                  </div>

                  <!-- Минимальная ставка -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Минимальная ставка
                    </label>
                    <input
                      v-model="form.min_bet"
                      type="text"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="€0.20"
                    />
                  </div>

                  <!-- Максимальная ставка -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Максимальная ставка
                    </label>
                    <input
                      v-model="form.max_bet"
                      type="text"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="€100"
                    />
                  </div>

                  <!-- Максимальный выигрыш -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Максимальный выигрыш (x от ставки)
                    </label>
                    <input
                      v-model.number="form.max_win"
                      type="number"
                      min="1"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="5000"
                    />
                  </div>

                  <!-- Дата выпуска -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Дата выпуска
                    </label>
                    <input
                      v-model="form.release_date"
                      type="date"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <!-- Рейтинг и популярность -->
              <div class="space-y-4">
                <h3
                  class="text-lg font-semibold text-emerald-400 border-b border-gray-600 pb-2"
                >
                  Рейтинг и популярность
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Рейтинг -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Рейтинг (1-5)
                    </label>
                    <input
                      v-model.number="form.rating"
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="4.8"
                    />
                  </div>

                  <!-- Количество голосов -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Количество голосов
                    </label>
                    <input
                      v-model.number="form.rating_count"
                      type="number"
                      min="0"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="1247"
                    />
                  </div>

                  <!-- Позиция в рейтинге -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Позиция в рейтинге
                    </label>
                    <input
                      v-model.number="form.popularity_rank"
                      type="number"
                      min="1"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="12"
                    />
                  </div>

                  <!-- Процент популярности -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Популярность (%)
                    </label>
                    <input
                      v-model.number="form.popularity_percentage"
                      type="number"
                      min="1"
                      max="100"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="94"
                    />
                  </div>
                </div>
              </div>

              <!-- Дополнительные характеристики -->
              <div class="space-y-4">
                <h3
                  class="text-lg font-semibold text-orange-400 border-b border-gray-600 pb-2"
                >
                  Дополнительные характеристики
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Поле игры -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Поле игры
                    </label>
                    <input
                      v-model="form.game_field"
                      type="text"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="6×5"
                    />
                  </div>

                  <!-- Линии выплат -->
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Линии выплат
                    </label>
                    <input
                      v-model="form.paylines"
                      type="text"
                      class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Scatter Pays"
                    />
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
                    Добавьте ссылку на изображение слота
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
                    Добавьте ссылку на видео слота (поддерживаются .mp4, .webm, .ogg)
                  </p>
                </div>

                <!-- Превью медиа -->
                <div v-if="form.image_url || form.video_url" class="mt-4">
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Превью медиа
                  </label>
                  <div class="bg-gray-700 rounded-lg p-4 border border-gray-600">
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
                    <div v-else-if="form.media_type === 'video' && form.video_url">
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

              <!-- Кнопки сохранения -->
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
            </form>
          </div>
        </div>

        <!-- Правая панель: Превью -->
        <div class="xl:sticky xl:top-24 xl:h-fit">
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

            <!-- Миниатюрное превью Hero секции -->
            <div
              class="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 rounded-xl p-4 min-h-[400px] relative overflow-hidden"
            >
              <!-- Фоновые эффекты -->
              <div class="absolute inset-0 opacity-30">
                <div
                  class="absolute top-2 left-2 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
                ></div>
                <div
                  class="absolute bottom-2 right-2 w-16 h-16 bg-blue-500/20 rounded-full blur-lg"
                ></div>
              </div>

              <div class="relative z-10 text-white">
                <!-- Провайдер -->
                <div class="mb-3">
                  <span
                    class="inline-block bg-purple-500/30 text-white px-2 py-1 rounded-full text-xs font-bold border border-purple-400/30"
                  >
                    {{ getProviderName(form.provider_id) || 'Провайдер' }}
                  </span>
                </div>

                <!-- Название -->
                <h1
                  class="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-200 via-purple-300 to-pink-200 bg-clip-text text-transparent mb-3 leading-tight"
                >
                  {{ form.name || 'Название слота' }}
                </h1>

                <!-- Описание -->
                <p class="text-white/80 text-sm mb-4 line-clamp-3">
                  {{
                    form.description ||
                    'Описание слота будет отображаться здесь...'
                  }}
                </p>

                <!-- Медиа превью -->
                <div v-if="form.image_url || form.video_url" class="mb-4">
                  <!-- Превью изображения -->
                  <div v-if="form.media_type === 'image' && form.image_url" class="aspect-video bg-gray-800/50 rounded-lg overflow-hidden border border-purple-400/30">
                    <img
                      :src="form.image_url"
                      :alt="form.name || 'Слот'"
                      class="w-full h-full object-cover"
                      @error="handlePreviewImageError"
                    />
                  </div>
                  <!-- Превью видео -->
                  <div v-else-if="form.media_type === 'video' && form.video_url" class="aspect-video bg-gray-800/50 rounded-lg overflow-hidden border border-purple-400/30">
                    <video
                      :src="form.video_url"
                      class="w-full h-full object-cover"
                      autoplay
                      loop
                      muted
                      preload="metadata"
                      @error="handlePreviewVideoError"
                    >
                      <div class="flex items-center justify-center h-full text-white/60 text-xs">
                        Видео не поддерживается
                      </div>
                    </video>
                  </div>
                  <!-- Индикатор типа медиа -->
                  <div class="mt-2 flex items-center gap-2">
                    <div class="px-2 py-1 bg-purple-500/30 rounded-full text-xs font-bold border border-purple-400/30">
                      {{ form.media_type === 'image' ? '🖼️ Изображение' : '🎥 Видео' }}
                    </div>
                  </div>
                </div>

                <!-- Рейтинг -->
                <div class="flex items-center gap-2 mb-4">
                  <div class="flex text-yellow-400 text-sm">
                    <span v-for="n in 5" :key="n" class="text-lg">
                      {{ (form.rating || 0) >= n ? '★' : '☆' }}
                    </span>
                  </div>
                  <span class="text-white font-bold text-sm">{{
                    form.rating || '0'
                  }}</span>
                  <span class="text-white/60 text-sm">/ 5</span>
                </div>

                <!-- Характеристики в миниатюре -->
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div
                    class="bg-emerald-500/20 p-2 rounded border border-emerald-400/30"
                  >
                    <div class="text-emerald-300 font-bold">RTP</div>
                    <div class="text-white">{{ form.rtp || '96.50' }}%</div>
                  </div>
                  <div
                    class="bg-orange-500/20 p-2 rounded border border-orange-400/30"
                  >
                    <div class="text-orange-300 font-bold">Волатильность</div>
                    <div class="text-white capitalize">
                      {{ getVolatilityText(form.volatility) }}
                    </div>
                  </div>
                  <div
                    class="bg-purple-500/20 p-2 rounded border border-purple-400/30"
                  >
                    <div class="text-purple-300 font-bold">Макс. выигрыш</div>
                    <div class="text-white">{{ form.max_win || '5000' }}x</div>
                  </div>
                  <div
                    class="bg-blue-500/20 p-2 rounded border border-blue-400/30"
                  >
                    <div class="text-blue-300 font-bold">Мин. ставка</div>
                    <div class="text-white">{{ form.min_bet || '€0.20' }}</div>
                  </div>
                </div>

                <!-- Популярность -->
                <div
                  class="mt-4 bg-yellow-500/20 p-2 rounded border border-yellow-400/30"
                >
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-white font-semibold text-xs"
                      >Рейтинг</span
                    >
                    <span
                      class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-2 py-0.5 rounded-full text-xs"
                    >
                      #{{ form.popularity_rank || '12' }} из 2000+
                    </span>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Получаем ID слота из роута
const route = useRoute()
const router = useRouter()
const slotId = route.params.id

// Состояние
const slot = ref(null)
const providers = ref([])
const saving = ref(false)
const loading = ref(true)

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
  rating: 4.8,
  rating_count: 1247,
  popularity_rank: 12,
  popularity_percentage: 94,
  game_field: '6×5',
  paylines: 'Scatter Pays',
  // Медиа поля
  media_type: 'image', // 'image' или 'video'
  image_url: '',
  video_url: '',
})

// Заголовок страницы
useHead({
  title: 'Редактирование Hero секции слота - SlotQuest Admin',
})

// Загрузка данных при монтировании
onMounted(async () => {
  await Promise.all([loadProviders(), slotId !== 'new' ? loadSlot() : null])
  loading.value = false
})

// Загрузка списка провайдеров
const loadProviders = async () => {
  try {
    const response = await $fetch('http://localhost:3001/api/providers')
    providers.value = response.data || response
  } catch (error) {
    console.error('Ошибка загрузки провайдеров:', error)
  }
}

// Загрузка данных слота
const loadSlot = async () => {
  if (slotId === 'new') return

  try {
    const response = await $fetch(
      `http://localhost:3001/api/slots/admin/${slotId}`,
    )
    slot.value = response.data || response

    // Заполняем форму данными слота
    Object.keys(form.value).forEach((key) => {
      if (slot.value[key] !== undefined) {
        form.value[key] = slot.value[key]
      }
    })
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

// Получение названия провайдера
const getProviderName = (providerId) => {
  const provider = providers.value.find((p) => p.id === providerId)
  return provider?.name || 'Провайдер'
}

// Получение текста волатильности
const getVolatilityText = (volatility) => {
  const map = {
    low: 'Низкая',
    medium: 'Средняя',
    high: 'Высокая',
  }
  return map[volatility] || 'Средняя'
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

    const response = await $fetch(url, {
      method,
      body: form.value,
    })

    // Показываем уведомление об успешном сохранении
    // Здесь можно добавить toast уведомление

    if (slotId === 'new' && response.data?.id) {
      await router.push(`/admin/slots/edit/${response.data.id}`)
    }
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    // Показываем уведомление об ошибке
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
  event.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-white/60 text-xs">Ошибка загрузки изображения</div>'
}

const handlePreviewVideoError = (event) => {
  event.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-white/60 text-xs">Ошибка загрузки видео</div>'
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
      rating: 4.8,
      rating_count: 1247,
      popularity_rank: 12,
      popularity_percentage: 94,
      game_field: '6×5',
      paylines: 'Scatter Pays',
      // Медиа поля
      media_type: 'image',
      image_url: '',
      video_url: '',
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
