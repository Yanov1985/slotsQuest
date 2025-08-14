<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white font-sans">
    <!-- Навигация -->
    <nav class="bg-[#161A21]/80 backdrop-blur-sm border-b border-[#353A4A] sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/admin/slots"
            class="inline-flex items-center text-[#A0AABE] hover:text-[#FF6E48] transition-colors font-medium"
          >
            <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2" />
            Назад к управлению слотами
          </NuxtLink>

          <!-- Хлебные крошки -->
          <div class="hidden md:flex items-center text-sm text-[#A0AABE]">
            <NuxtLink to="/admin" class="hover:text-[#FF6E48] transition-colors">Админ</NuxtLink>
            <span class="mx-2">/</span>
            <NuxtLink to="/admin/slots" class="hover:text-[#FF6E48] transition-colors">Слоты</NuxtLink>
            <span class="mx-2">/</span>
            <span class="text-white font-medium">Редактирование</span>
          </div>

          <!-- Кнопки действий -->
          <div class="flex items-center gap-3">
            <button
              @click="$router.push('/admin/slots')"
              class="group relative flex items-center space-x-2 px-6 py-3 border border-[#353A4A] text-[#A0AABE] bg-[#161A21] rounded-lg hover:bg-[#1F2329] hover:border-[#4A5568] font-medium transition-all duration-200 transform hover:scale-105"
            >
              <Icon name="heroicons:x-mark" class="w-4 h-4" />
              <span>Отменить</span>
            </button>
            <button
              @click="saveSlot"
              :disabled="saving"
              class="group relative flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#FF6E48] to-[#FF8A65] hover:from-[#FF8A65] hover:to-[#FF6E48] disabled:from-[#6B7280] disabled:to-[#4B5563] text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-xl hover:shadow-[#FF6E48]/30"
            >
              <Icon v-if="saving" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
              <Icon v-else name="heroicons:check" class="w-4 h-4" />
              <span>{{ saving ? 'Сохранение...' : 'Сохранить изменения' }}</span>
              <div class="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
            <NuxtLink
              :to="`/slots/${slot?.slug || 'preview'}`"
              target="_blank"
              class="group relative flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#00EDFF] to-[#01BFCF] hover:from-[#01BFCF] hover:to-[#00EDFF] text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-xl hover:shadow-[#00EDFF]/30"
            >
              <Icon name="heroicons:eye" class="w-4 h-4" />
              <span>Предпросмотр</span>
              <div class="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Загрузка -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        <p class="mt-6 text-xl text-gray-600">Загрузка данных слота...</p>
      </div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-auto px-4">
        <div class="text-red-500 mb-6">
          <svg class="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <h2 class="text-3xl font-bold mb-4 text-gray-800">Ошибка загрузки</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
        </div>
        <NuxtLink
          to="/admin/slots"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors font-semibold"
        >
          Вернуться к списку
        </NuxtLink>
      </div>
    </div>

    <!-- Основной контент -->
    <div v-else-if="slot" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Заголовок страницы -->
      <div class="bg-gradient-to-r from-[#1E2329] to-[#2A2F3A] border border-[#353A4A] rounded-xl shadow-xl p-6 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">Редактирование слота</h1>
            <p class="text-[#A0AABE]">ID: {{ slot.id }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-[#A0AABE]">Последнее обновление</p>
            <p class="text-white font-medium">{{ formatDate(slot.updated_at) }}</p>
          </div>
        </div>
      </div>

      <!-- Основная форма редактирования -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Левая колонка: Основная информация -->
        <div class="xl:col-span-2 space-y-8">
          <!-- Основные данные -->
          <div class="bg-gradient-to-r from-[#1E2329] to-[#2A2F3A] border border-[#353A4A] rounded-xl shadow-xl p-6">
            <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Icon name="heroicons:information-circle" class="w-5 h-5 text-[#00EDFF]" />
              Основная информация
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Название слота *</label>
                <input
                  v-model="editableSlot.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                  placeholder="Введите название слота"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Slug (URL) *</label>
                <input
                  v-model="editableSlot.slug"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                  placeholder="gates-of-olympus"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Провайдер *</label>
                <select
                  v-model="editableSlot.provider_id"
                  required
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors"
                >
                  <option value="" class="bg-[#161A21] text-[#6B7280]">Выберите провайдера</option>
                  <option v-for="provider in providers" :key="provider.id" :value="provider.id" class="bg-[#161A21] text-white">
                    {{ provider.name }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Категория</label>
                <select
                  v-model="editableSlot.category_id"
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors"
                >
                  <option value="" class="bg-[#161A21] text-[#6B7280]">Выберите категорию</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id" class="bg-[#161A21] text-white">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="mt-6">
              <label class="block text-sm font-medium text-[#A0AABE] mb-2">Описание</label>
              <textarea
                v-model="editableSlot.description"
                rows="4"
                class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                placeholder="Описание слота для отображения на странице"
              ></textarea>
            </div>
          </div>

          <!-- Технические характеристики -->
          <div class="bg-gradient-to-r from-[#1E2329] to-[#2A2F3A] border border-[#353A4A] rounded-xl shadow-xl p-6">
            <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Icon name="heroicons:chart-bar" class="w-5 h-5 text-[#63F3AB]" />
              Технические характеристики
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">RTP (%)</label>
                <input
                  v-model.number="editableSlot.rtp"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                  placeholder="96.50"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Волатильность</label>
                <select
                  v-model="editableSlot.volatility"
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors"
                >
                  <option value="" class="bg-[#161A21] text-[#6B7280]">Не указана</option>
                  <option value="Низкая" class="bg-[#161A21] text-white">Низкая</option>
                  <option value="Средняя" class="bg-[#161A21] text-white">Средняя</option>
                  <option value="Высокая" class="bg-[#161A21] text-white">Высокая</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Макс. выигрыш</label>
                <input
                  v-model="editableSlot.max_win"
                  type="text"
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                  placeholder="x5000"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Мин. ставка</label>
                <input
                  v-model="editableSlot.min_bet"
                  type="text"
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                  placeholder="0.20"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Макс. ставка</label>
                <input
                  v-model="editableSlot.max_bet"
                  type="text"
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                  placeholder="100.00"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Количество барабанов</label>
                <input
                  v-model.number="editableSlot.reels"
                  type="number"
                  min="1"
                  max="10"
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                  placeholder="5"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Количество рядов</label>
                <input
                  v-model.number="editableSlot.rows"
                  type="number"
                  min="1"
                  max="10"
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                  placeholder="3"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Линии выплат</label>
                <input
                  v-model.number="editableSlot.paylines"
                  type="number"
                  min="1"
                  max="1024"
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                  placeholder="25"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Хит-частота (%)</label>
                <input
                  v-model.number="editableSlot.hit_frequency"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                  placeholder="25.50"
                />
              </div>
            </div>
          </div>

          <!-- Дополнительная информация -->
          <div class="bg-gradient-to-r from-[#1E2329] to-[#2A2F3A] border border-[#353A4A] rounded-xl shadow-xl p-6">
            <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Icon name="heroicons:tag" class="w-5 h-5 text-[#CD0F8B]" />
              Дополнительная информация
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <label class="block text-sm font-medium text-[#A0AABE] mb-2">Тема</label>
                 <input
                   v-model="editableSlot.theme"
                   type="text"
                   class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                   placeholder="Мифология, Древняя Греция"
                 />
               </div>

               <div>
                 <label class="block text-sm font-medium text-[#A0AABE] mb-2">Дата релиза</label>
                 <input
                   v-model="editableSlot.release_date"
                   type="date"
                   class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors"
                 />
               </div>
             </div>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
               <div>
                 <label class="block text-sm font-medium text-[#A0AABE] mb-2">Рейтинг</label>
                 <input
                   v-model.number="editableSlot.rating"
                   type="number"
                   step="0.1"
                   min="0"
                   max="5"
                   class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                   placeholder="4.5"
                 />
               </div>

               <div>
                 <label class="block text-sm font-medium text-[#A0AABE] mb-2">Популярность</label>
                 <select
                   v-model="editableSlot.popularity"
                   class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors"
                 >
                   <option value="" class="bg-[#161A21] text-[#6B7280]">Выберите популярность</option>
                   <option value="Низкая" class="bg-[#161A21] text-white">Низкая</option>
                   <option value="Средняя" class="bg-[#161A21] text-white">Средняя</option>
                   <option value="Высокая" class="bg-[#161A21] text-white">Высокая</option>
                   <option value="Топ" class="bg-[#161A21] text-white">Топ</option>
                 </select>
               </div>
             </div>

             <div class="mt-6">
               <label class="block text-sm font-medium text-[#A0AABE] mb-2">URL изображения</label>
               <input
                 v-model="editableSlot.image_url"
                 type="url"
                 class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                 placeholder="https://example.com/image.jpg"
               />
             </div>

             <div class="mt-6">
               <label class="block text-sm font-medium text-[#A0AABE] mb-2">URL демо-игры</label>
               <input
                 v-model="editableSlot.demo_url"
                 type="url"
                 class="w-full px-4 py-3 bg-[#161A21] border border-[#353A4A] text-white rounded-lg focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-colors placeholder-[#6B7280]"
                 placeholder="https://demo.example.com/slot"
               />
             </div>
          </div>
        </div>

        <!-- Правая колонка: Превью и статус -->
        <div class="xl:col-span-1 space-y-8">
          <!-- Статус и управление -->
          <div class="bg-gradient-to-r from-[#1E2329] to-[#2A2F3A] border border-[#353A4A] rounded-xl shadow-xl p-6">
            <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 text-[#FF6E48]" />
              Статус и управление
            </h2>

            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-[#161A21] border border-[#353A4A] rounded-lg">
                <div>
                  <p class="font-medium text-white">Статус слота</p>
                  <p class="text-sm text-[#A0AABE]">Активен ли слот для отображения</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="editableSlot.is_active"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-[#353A4A] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6E48]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#353A4A] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6E48]"></div>
                </label>
              </div>

              <div class="p-4 bg-[#161A21] border border-[#353A4A] rounded-lg">
                <div class="flex items-center gap-2 mb-2">
                  <Icon name="heroicons:information-circle" class="w-4 h-4 text-[#00EDFF]" />
                  <p class="font-medium text-[#00EDFF]">Информация</p>
                </div>
                <p class="text-sm text-[#A0AABE]">Создан: {{ formatDate(slot.created_at) }}</p>
                <p class="text-sm text-[#A0AABE]">Обновлен: {{ formatDate(slot.updated_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Превью изображения -->
          <div class="bg-gradient-to-r from-[#1E2329] to-[#2A2F3A] border border-[#353A4A] rounded-xl shadow-xl p-6">
            <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Icon name="heroicons:photo" class="w-5 h-5 text-[#CD0F8B]" />
              Превью изображения
            </h2>

            <div class="aspect-video bg-[#161A21] border border-[#353A4A] rounded-lg overflow-hidden">
              <img
                v-if="editableSlot.image_url"
                :src="editableSlot.image_url"
                :alt="editableSlot.name"
                class="w-full h-full object-cover"
                @error="imageError = true"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-[#6B7280]">
                <div class="text-center">
                  <Icon name="heroicons:photo" class="w-12 h-12 mx-auto mb-2" />
                  <p class="text-sm">Нет изображения</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Быстрые действия -->
          <div class="bg-gradient-to-r from-[#1E2329] to-[#2A2F3A] border border-[#353A4A] rounded-xl shadow-xl p-6">
            <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Icon name="heroicons:bolt" class="w-5 h-5 text-[#63F3AB]" />
              Быстрые действия
            </h2>

            <div class="space-y-3">
              <button
                @click="duplicateSlot"
                class="w-full bg-gradient-to-r from-[#CD0F8B] to-[#9A0B6B] hover:from-[#9A0B6B] hover:to-[#CD0F8B] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#CD0F8B]/30"
              >
                <Icon name="heroicons:document-duplicate" class="w-4 h-4" />
                Дублировать слот
              </button>

              <button
                @click="resetChanges"
                class="w-full bg-gradient-to-r from-[#6B7280] to-[#4B5563] hover:from-[#4B5563] hover:to-[#6B7280] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
              >
                <Icon name="heroicons:arrow-path" class="w-4 h-4" />
                Сбросить изменения
              </button>

              <button
                @click="deleteSlot"
                class="w-full bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#B91C1C] hover:to-[#DC2626] text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/30"
              >
                <Icon name="heroicons:trash" class="w-4 h-4" />
                Удалить слот
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Мета-данные страницы
useHead({
  title: 'Редактирование слота - SlotQuest Admin',
  meta: [
    { name: 'description', content: 'Редактирование слота в административной панели SlotQuest' }
  ]
})

// Роутинг
const route = useRoute()
const router = useRouter()
const slotId = route.query.id

// Состояние
const loading = ref(true)
const saving = ref(false)
const error = ref(null)
const imageError = ref(false)

// Данные
const slot = ref(null)
const editableSlot = reactive({})
const providers = ref([])
const categories = ref([])

// Загрузка данных слота
const loadSlot = async () => {
  try {
    loading.value = true
    error.value = null

    if (!slotId) {
      throw new Error('ID слота не указан')
    }

    // Загружаем данные слота
    const { data: slotData } = await $fetch(`/api/slots/admin/${slotId}`)

    if (!slotData) {
      throw new Error('Слот не найден')
    }

    slot.value = slotData

    // Копируем данные в редактируемый объект
    Object.assign(editableSlot, {
      id: slotData.id,
      name: slotData.name || '',
      slug: slotData.slug || '',
      description: slotData.description || '',
      provider_id: slotData.provider_id || '',
      category_id: slotData.category_id || '',
      theme: slotData.theme || '',
      rtp: slotData.rtp || null,
      volatility: slotData.volatility || '',
      max_win: slotData.max_win || '',
      min_bet: slotData.min_bet || '',
      max_bet: slotData.max_bet || '',
      reels: slotData.reels || null,
      rows: slotData.rows || null,
      paylines: slotData.paylines || null,
      hit_frequency: slotData.hit_frequency || null,
      rating: slotData.rating || null,
      popularity: slotData.popularity || '',
      demo_url: slotData.demo_url || '',
      release_date: slotData.release_date ? slotData.release_date.split('T')[0] : '',
      image_url: slotData.image_url || '',
      is_active: slotData.is_active || false
    })

  } catch (err) {
    console.error('Ошибка загрузки слота:', err)
    error.value = err.message || 'Ошибка загрузки данных слота'
  } finally {
    loading.value = false
  }
}

// Загрузка провайдеров
const loadProviders = async () => {
  try {
    const { data } = await $fetch('/api/providers')
    providers.value = data || []
  } catch (err) {
    console.error('Ошибка загрузки провайдеров:', err)
  }
}

// Загрузка категорий
const loadCategories = async () => {
  try {
    const { data } = await $fetch('/api/categories')
    categories.value = data || []
  } catch (err) {
    console.error('Ошибка загрузки категорий:', err)
  }
}

// Сохранение изменений
const saveSlot = async () => {
  try {
    saving.value = true

    // Подготавливаем данные для отправки
    const updateData = {
      name: editableSlot.name,
      slug: editableSlot.slug,
      description: editableSlot.description,
      provider_id: editableSlot.provider_id,
      category_id: editableSlot.category_id || null,
      theme: editableSlot.theme,
      rtp: editableSlot.rtp,
      volatility: editableSlot.volatility,
      max_win: editableSlot.max_win,
      min_bet: editableSlot.min_bet,
      max_bet: editableSlot.max_bet,
      reels: editableSlot.reels,
      rows: editableSlot.rows,
      paylines: editableSlot.paylines,
      hit_frequency: editableSlot.hit_frequency,
      rating: editableSlot.rating,
      popularity: editableSlot.popularity,
      demo_url: editableSlot.demo_url,
      release_date: editableSlot.release_date || null,
      image_url: editableSlot.image_url,
      is_active: editableSlot.is_active
    }

    // Отправляем запрос на обновление
    await $fetch(`/api/slots/${slotId}`, {
      method: 'PUT',
      body: updateData
    })

    // Показываем уведомление об успехе
    // TODO: Добавить toast уведомление
    alert('Слот успешно обновлен!')

    // Перезагружаем данные
    await loadSlot()

  } catch (err) {
    console.error('Ошибка сохранения:', err)
    alert('Ошибка при сохранении изменений: ' + (err.message || 'Неизвестная ошибка'))
  } finally {
    saving.value = false
  }
}

// Сброс изменений
const resetChanges = () => {
  if (confirm('Вы уверены, что хотите сбросить все изменения?')) {
    Object.assign(editableSlot, {
      id: slot.value.id,
      name: slot.value.name || '',
      slug: slot.value.slug || '',
      description: slot.value.description || '',
      provider_id: slot.value.provider_id || '',
      category_id: slot.value.category_id || '',
      theme: slot.value.theme || '',
      rtp: slot.value.rtp || null,
      volatility: slot.value.volatility || '',
      max_win: slot.value.max_win || '',
      min_bet: slot.value.min_bet || '',
      max_bet: slot.value.max_bet || '',
      reels: slot.value.reels || null,
      rows: slot.value.rows || null,
      paylines: slot.value.paylines || null,
      hit_frequency: slot.value.hit_frequency || null,
      rating: slot.value.rating || null,
      popularity: slot.value.popularity || '',
      demo_url: slot.value.demo_url || '',
      release_date: slot.value.release_date ? slot.value.release_date.split('T')[0] : '',
      image_url: slot.value.image_url || '',
      is_active: slot.value.is_active || false
    })
  }
}

// Дублирование слота
const duplicateSlot = async () => {
  if (confirm('Создать копию этого слота?')) {
    try {
      const duplicateData = {
        ...editableSlot,
        id: undefined,
        name: editableSlot.name + ' (Копия)',
        slug: editableSlot.slug + '-copy-' + Date.now()
      }

      const { data } = await $fetch('/api/slots', {
        method: 'POST',
        body: duplicateData
      })

      alert('Копия слота создана!')
      router.push(`/admin/slots/edit?id=${data.id}`)

    } catch (err) {
      console.error('Ошибка дублирования:', err)
      alert('Ошибка при создании копии: ' + (err.message || 'Неизвестная ошибка'))
    }
  }
}

// Удаление слота
const deleteSlot = async () => {
  if (confirm('Вы уверены, что хотите удалить этот слот? Это действие нельзя отменить.')) {
    try {
      await $fetch(`/api/slots/${slotId}`, {
        method: 'DELETE'
      })

      alert('Слот удален!')
      router.push('/admin/slots')

    } catch (err) {
      console.error('Ошибка удаления:', err)
      alert('Ошибка при удалении: ' + (err.message || 'Неизвестная ошибка'))
    }
  }
}

// Форматирование даты
const formatDate = (dateString) => {
  if (!dateString) return 'Не указано'
  return new Date(dateString).toLocaleString('ru-RU')
}

// Инициализация
onMounted(async () => {
  await Promise.all([
    loadSlot(),
    loadProviders(),
    loadCategories()
  ])
})
</script>

<style scoped>
/* Дополнительные стили для анимаций */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-beam {
  animation: beam 3s linear infinite;
}

@keyframes beam {
  0% { transform: translateX(-100%) skewX(12deg); }
  100% { transform: translateX(200%) skewX(12deg); }
}
</style>