<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
    <!-- Header -->
    <header class="bg-black/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-gray-400 hover:text-white transition-colors">
              ← Назад к дашборду
            </NuxtLink>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🎰 Управление слотами
            </h1>
            <div class="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
              {{ totalSlots }} слотов
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="showAddModal = true" class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-medium transition-all transform hover:scale-105">
              ➕ Добавить слот
            </button>
            <button @click="refreshSlots" class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-medium transition-all transform hover:scale-105">
              🔄 Обновить
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-cyan-400 text-sm font-medium">Всего слотов</p>
              <p class="text-3xl font-bold text-white">{{ totalSlots }}</p>
            </div>
            <div class="text-4xl">🎰</div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-400 text-sm font-medium">Провайдеров</p>
              <p class="text-3xl font-bold text-white">{{ totalProviders }}</p>
            </div>
            <div class="text-4xl">🏢</div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-400 text-sm font-medium">Активных</p>
              <p class="text-3xl font-bold text-white">{{ activeSlots }}</p>
            </div>
            <div class="text-4xl">✅</div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-yellow-400 text-sm font-medium">Средний RTP</p>
              <p class="text-3xl font-bold text-white">{{ averageRTP }}%</p>
            </div>
            <div class="text-4xl">📊</div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-gray-900/50 border border-gray-700 rounded-xl p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Поиск по названию</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Введите название слота..."
              class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Провайдер</label>
            <select
              v-model="selectedProvider"
              class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
            >
              <option value="">Все провайдеры</option>
              <option v-for="provider in providers" :key="provider.id" :value="provider.id">
                {{ provider.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Волатильность</label>
            <select
              v-model="selectedVolatility"
              class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
            >
              <option value="">Любая</option>
              <option value="Низкая">Низкая</option>
              <option value="Средняя">Средняя</option>
              <option value="Высокая">Высокая</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Статус</label>
            <select
              v-model="selectedStatus"
              class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
            >
              <option value="">Все</option>
              <option value="true">Активные</option>
              <option value="false">Неактивные</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Slots Table -->
      <div class="bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-800/50">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Слот</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Провайдер</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">RTP</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Волатильность</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Макс. выигрыш</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Статус</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-300">Действия</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
              <tr v-if="loading" class="animate-pulse">
                <td colspan="7" class="px-6 py-8 text-center text-gray-400">
                  <div class="flex items-center justify-center space-x-2">
                    <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-cyan-400"></div>
                    <span>Загрузка слотов...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="filteredSlots.length === 0">
                <td colspan="7" class="px-6 py-8 text-center text-gray-400">
                  <div class="text-6xl mb-4">🔍</div>
                  <p class="text-lg">Слоты не найдены</p>
                  <p class="text-sm">Попробуйте изменить параметры поиска</p>
                </td>
              </tr>
              <tr v-else v-for="slot in paginatedSlots" :key="slot.id" class="hover:bg-gray-800/30 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                      <span class="text-2xl">🎰</span>
                    </div>
                    <div>
                      <p class="font-medium text-white">{{ slot.name }}</p>
                      <p class="text-sm text-gray-400">ID: {{ slot.id }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-400 text-sm">
                    {{ slot.providers?.name || 'Не указан' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="font-medium text-green-400">{{ slot.rtp || 'N/A' }}%</span>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 rounded text-sm" :class="getVolatilityClass(slot.volatility)">
                    {{ slot.volatility || 'Не указана' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="font-medium text-yellow-400">{{ slot.max_win || 'N/A' }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 rounded text-sm" :class="slot.is_active ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'">
                    {{ slot.is_active ? 'Активен' : 'Неактивен' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-2">
                    <button @click="editSlot(slot)" class="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors" title="Редактировать">
                      ✏️
                    </button>
                    <button @click="toggleSlotStatus(slot)" class="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg transition-colors" :title="slot.is_active ? 'Деактивировать' : 'Активировать'">
                      {{ slot.is_active ? '⏸️' : '▶️' }}
                    </button>
                    <button @click="deleteSlot(slot)" class="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors" title="Удалить">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
          <div class="text-sm text-gray-400">
            Показано {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredSlots.length) }} из {{ filteredSlots.length }}
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            >
              ←
            </button>
            <span class="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-400">
              {{ currentPage }} / {{ totalPages }}
            </span>
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">
              {{ showAddModal ? '➕ Добавить новый слот' : '✏️ Редактировать слот' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>
          
          <form @submit.prevent="saveSlot" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Название *</label>
                <input
                  v-model="slotForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Введите название слота"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Провайдер *</label>
                <select
                  v-model="slotForm.provider_id"
                  required
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                >
                  <option value="">Выберите провайдера</option>
                  <option v-for="provider in providers" :key="provider.id" :value="provider.id">
                    {{ provider.name }}
                  </option>
                </select>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Категория</label>
                <select
                  v-model="slotForm.category_id"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                >
                  <option value="">Выберите категорию</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Тема</label>
                <input
                  v-model="slotForm.theme"
                  type="text"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Тема слота"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Описание</label>
              <textarea
                v-model="slotForm.description"
                rows="3"
                class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="Описание слота"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">RTP (%)</label>
                <input
                  v-model.number="slotForm.rtp"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="96.5"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Волатильность</label>
                <select
                  v-model="slotForm.volatility"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                >
                  <option value="">Не указана</option>
                  <option value="Низкая">Низкая</option>
                  <option value="Средняя">Средняя</option>
                  <option value="Высокая">Высокая</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Макс. выигрыш</label>
                <input
                  v-model.number="slotForm.max_win"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="5000"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Мин. ставка</label>
                <input
                  v-model.number="slotForm.min_bet"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="0.01"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Макс. ставка</label>
                <input
                  v-model.number="slotForm.max_bet"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="100"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Барабаны</label>
                <input
                  v-model.number="slotForm.reels"
                  type="number"
                  min="1"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="5"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Ряды</label>
                <input
                  v-model.number="slotForm.rows"
                  type="number"
                  min="1"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="3"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Линии выплат</label>
                <input
                  v-model.number="slotForm.paylines"
                  type="number"
                  min="1"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="25"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Дата релиза</label>
                <input
                  v-model="slotForm.release_date"
                  type="date"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">URL миниатюры</label>
              <input
                v-model="slotForm.thumbnail_url"
                type="url"
                class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="https://example.com/thumb.jpg"
              />
            </div>
            
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="slotForm.is_active"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Активен</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="slotForm.is_mobile_compatible"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Мобильная версия</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="slotForm.is_demo_available"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Демо доступно</span>
              </label>
            </div>
            
            <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
              <button
                type="button"
                @click="closeModal"
                class="px-6 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Сохранение...' : (showAddModal ? 'Добавить' : 'Сохранить') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-gray-900 border border-red-500/30 rounded-xl max-w-md w-full">
        <div class="p-6">
          <div class="text-center">
            <div class="text-6xl mb-4">⚠️</div>
            <h2 class="text-2xl font-bold text-white mb-4">Подтвердите удаление</h2>
            <p class="text-gray-300 mb-6">
              Вы уверены, что хотите удалить слот <strong>"{{ slotToDelete?.name }}"</strong>?
              Это действие нельзя отменить.
            </p>
            <div class="flex items-center justify-center space-x-4">
              <button
                @click="showDeleteModal = false"
                class="px-6 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                @click="confirmDelete"
                :disabled="deleting"
                class="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ deleting ? 'Удаление...' : 'Удалить' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Composables
const { getSlots, createSlot, updateSlot, deleteSlot: deleteSlotApi } = useSlotsApi()
const { getProviders } = useProviders()
const { getCategories } = useCategories()

// Reactive data
const slots = ref([])
const providers = ref([])
const categories = ref([])
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)

// Modals
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const slotToDelete = ref(null)

// Search and filters
const searchQuery = ref('')
const selectedProvider = ref('')
const selectedVolatility = ref('')
const selectedStatus = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Form data
const slotForm = ref({
  name: '',
  description: '',
  provider_id: '',
  category_id: '',
  rtp: null,
  volatility: '',
  max_win: null,
  min_bet: null,
  max_bet: null,
  reels: null,
  rows: null,
  paylines: null,
  theme: '',
  thumbnail_url: '',
  screenshots: [],
  features: [],
  is_active: true,
  is_mobile_compatible: true,
  is_demo_available: true,
  release_date: ''
})

// Computed properties
const filteredSlots = computed(() => {
  let filtered = slots.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(slot => 
      slot.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (selectedProvider.value) {
    filtered = filtered.filter(slot => slot.provider_id === selectedProvider.value)
  }
  
  if (selectedVolatility.value) {
    filtered = filtered.filter(slot => slot.volatility === selectedVolatility.value)
  }
  
  if (selectedStatus.value !== '') {
    const isActive = selectedStatus.value === 'true'
    filtered = filtered.filter(slot => slot.is_active === isActive)
  }
  
  return filtered
})

const paginatedSlots = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredSlots.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredSlots.value.length / itemsPerPage.value)
})

const totalSlots = computed(() => slots.value.length)
const totalProviders = computed(() => new Set(slots.value.map(slot => slot.provider_id)).size)
const activeSlots = computed(() => slots.value.filter(slot => slot.is_active).length)
const averageRTP = computed(() => {
  const rtpSlots = slots.value.filter(slot => slot.rtp)
  if (rtpSlots.length === 0) return 0
  const sum = rtpSlots.reduce((acc, slot) => acc + parseFloat(slot.rtp), 0)
  return (sum / rtpSlots.length).toFixed(1)
})

// Methods
const loadSlots = async () => {
  try {
    loading.value = true
    const response = await getSlots({ admin: true })
    slots.value = response || []
  } catch (error) {
    console.error('Ошибка загрузки слотов:', error)
    slots.value = []
  } finally {
    loading.value = false
  }
}

const loadProviders = async () => {
  try {
    const response = await getProviders()
    providers.value = response || []
  } catch (error) {
    console.error('Ошибка загрузки провайдеров:', error)
    providers.value = []
  }
}

const loadCategories = async () => {
  try {
    const response = await getCategories()
    categories.value = response || []
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error)
    categories.value = []
  }
}

const refreshSlots = () => {
  loadSlots()
}

const editSlot = (slot) => {
  slotForm.value = {
    id: slot.id,
    name: slot.name,
    description: slot.description || '',
    provider_id: slot.provider_id,
    category_id: slot.category_id || '',
    rtp: slot.rtp,
    volatility: slot.volatility || '',
    max_win: slot.max_win,
    min_bet: slot.min_bet,
    max_bet: slot.max_bet,
    reels: slot.reels,
    rows: slot.rows,
    paylines: slot.paylines,
    theme: slot.theme || '',
    thumbnail_url: slot.thumbnail_url || '',
    screenshots: slot.screenshots || [],
    features: slot.features || [],
    is_active: slot.is_active,
    is_mobile_compatible: slot.is_mobile_compatible,
    is_demo_available: slot.is_demo_available,
    release_date: slot.release_date ? new Date(slot.release_date).toISOString().split('T')[0] : ''
  }
  showEditModal.value = true
}

const deleteSlot = (slot) => {
  slotToDelete.value = slot
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!slotToDelete.value) return
  
  try {
    deleting.value = true
    await deleteSlotApi(slotToDelete.value.id)
    // Перезагружаем данные с сервера для синхронизации
    await loadSlots()
    showDeleteModal.value = false
    slotToDelete.value = null
  } catch (error) {
    console.error('Ошибка удаления слота:', error)
    alert('Ошибка при удалении слота')
  } finally {
    deleting.value = false
  }
}

const toggleSlotStatus = async (slot) => {
  try {
    const updatedSlot = { ...slot, is_active: !slot.is_active }
    await updateSlot(slot.id, updatedSlot)
    // Перезагружаем данные с сервера для синхронизации
    await loadSlots()
  } catch (error) {
    console.error('Ошибка изменения статуса слота:', error)
    alert('Ошибка при изменении статуса слота')
  }
}

const saveSlot = async () => {
  try {
    saving.value = true
    
    if (showAddModal.value) {
      await createSlot(slotForm.value)
    } else {
      await updateSlot(slotForm.value.id, slotForm.value)
    }
    
    // Перезагружаем данные с сервера для синхронизации
    await loadSlots()
    closeModal()
  } catch (error) {
    console.error('Ошибка сохранения слота:', error)
    alert('Ошибка при сохранении слота')
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  slotForm.value = {
    name: '',
    description: '',
    provider_id: '',
    category_id: '',
    rtp: null,
    volatility: '',
    max_win: '',
    min_bet: null,
    max_bet: null,
    reels: null,
    rows: null,
    paylines: null,
    theme: '',
    image_url: '',
    thumbnail_url: '',
    is_active: true,
    is_featured: false,
    release_date: ''
  }
}

const getVolatilityClass = (volatility) => {
  switch (volatility) {
    case 'Низкая':
      return 'bg-green-500/20 border border-green-500/30 text-green-400'
    case 'Средняя':
      return 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
    case 'Высокая':
      return 'bg-red-500/20 border border-red-500/30 text-red-400'
    default:
      return 'bg-gray-500/20 border border-gray-500/30 text-gray-400'
  }
}

// Watch for filter changes to reset pagination
watch([searchQuery, selectedProvider, selectedVolatility, selectedStatus], () => {
  currentPage.value = 1
})

// Load data on mount
onMounted(() => {
  loadSlots()
  loadProviders()
  loadCategories()
})

// Page meta
useHead({
  title: 'SlotQuest Admin - Управление слотами',
  meta: [
    { name: 'description', content: 'Административная панель для управления слотами SlotQuest' }
  ]
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>