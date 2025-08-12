<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Навигация -->
    <nav class="bg-white/95 backdrop-blur-sm shadow-lg border-b sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/admin/slots"
            class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Назад к управлению слотами
          </NuxtLink>

          <!-- Хлебные крошки -->
          <div class="hidden md:flex items-center text-sm text-gray-500">
            <NuxtLink to="/admin" class="hover:text-blue-600 transition-colors">Админ</NuxtLink>
            <span class="mx-2">/</span>
            <NuxtLink to="/admin/slots" class="hover:text-blue-600 transition-colors">Слоты</NuxtLink>
            <span class="mx-2">/</span>
            <span class="text-gray-800 font-medium">Редактирование</span>
          </div>

          <!-- Кнопки действий -->
          <div class="flex items-center gap-3">
            <button
              @click="saveSlot"
              :disabled="saving"
              class="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg v-if="saving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ saving ? 'Сохранение...' : 'Сохранить изменения' }}
            </button>
            <NuxtLink
              :to="`/slots/${slot?.slug || 'preview'}`"
              target="_blank"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              Предпросмотр
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
    <div v-else-if="slot" class="container mx-auto px-4 py-8">
      <!-- Заголовок страницы -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Редактирование слота</h1>
            <p class="text-gray-600">ID: {{ slot.id }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Последнее обновление</p>
            <p class="text-gray-800 font-medium">{{ formatDate(slot.updated_at) }}</p>
          </div>
        </div>
      </div>

      <!-- Основная форма редактирования -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <!-- Левая колонка: Основная информация -->
        <div class="xl:col-span-2 space-y-8">
          <!-- Основные данные -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Основная информация
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Название слота *</label>
                <input
                  v-model="editableSlot.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Введите название слота"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Slug (URL) *</label>
                <input
                  v-model="editableSlot.slug"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="gates-of-olympus"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Провайдер *</label>
                <select
                  v-model="editableSlot.provider_id"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Выберите провайдера</option>
                  <option v-for="provider in providers" :key="provider.id" :value="provider.id">
                    {{ provider.name }}
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                <select
                  v-model="editableSlot.category_id"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Выберите категорию</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
            
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Описание</label>
              <textarea
                v-model="editableSlot.description"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Описание слота для отображения на странице"
              ></textarea>
            </div>
          </div>

          <!-- Технические характеристики -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Технические характеристики
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">RTP (%)</label>
                <input
                  v-model.number="editableSlot.rtp"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="96.50"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Волатильность</label>
                <select
                  v-model="editableSlot.volatility"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Не указана</option>
                  <option value="Низкая">Низкая</option>
                  <option value="Средняя">Средняя</option>
                  <option value="Высокая">Высокая</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Макс. выигрыш</label>
                <input
                  v-model="editableSlot.max_win"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="x5000"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Мин. ставка</label>
                <input
                  v-model="editableSlot.min_bet"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="0.20"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Макс. ставка</label>
                <input
                  v-model="editableSlot.max_bet"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="100.00"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Количество барабанов</label>
                <input
                  v-model.number="editableSlot.reels"
                  type="number"
                  min="1"
                  max="10"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          <!-- Дополнительная информация -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              Дополнительная информация
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Тема</label>
                <input
                  v-model="editableSlot.theme"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Мифология, Древняя Греция"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Дата релиза</label>
                <input
                  v-model="editableSlot.release_date"
                  type="date"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">URL изображения</label>
              <input
                v-model="editableSlot.image_url"
                type="url"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        <!-- Правая колонка: Превью и статус -->
        <div class="xl:col-span-1 space-y-8">
          <!-- Статус и управление -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
              Статус и управление
            </h2>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p class="font-medium text-gray-800">Статус слота</p>
                  <p class="text-sm text-gray-600">Активен ли слот для отображения</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="editableSlot.is_active"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div class="p-4 bg-blue-50 rounded-lg">
                <div class="flex items-center gap-2 mb-2">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p class="font-medium text-blue-800">Информация</p>
                </div>
                <p class="text-sm text-blue-700">Создан: {{ formatDate(slot.created_at) }}</p>
                <p class="text-sm text-blue-700">Обновлен: {{ formatDate(slot.updated_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Превью изображения -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Превью изображения
            </h2>
            
            <div class="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                v-if="editableSlot.image_url"
                :src="editableSlot.image_url"
                :alt="editableSlot.name"
                class="w-full h-full object-cover"
                @error="imageError = true"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <div class="text-center">
                  <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p class="text-sm">Нет изображения</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Быстрые действия -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Быстрые действия
            </h2>
            
            <div class="space-y-3">
              <button
                @click="duplicateSlot"
                class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                Дублировать слот
              </button>
              
              <button
                @click="resetChanges"
                class="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Сбросить изменения
              </button>
              
              <button
                @click="deleteSlot"
                class="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
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
    const { data: slotData } = await $fetch(`/api/slots/${slotId}`)
    
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