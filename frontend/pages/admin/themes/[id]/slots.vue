<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
    <!-- Header -->
    <header class="bg-black/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin/themes" class="text-gray-400 hover:text-white transition-colors">
              ← Назад к темам
            </NuxtLink>
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-pink-500/30">
                <span class="text-2xl">{{ theme?.icon || '🎨' }}</span>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {{ theme?.name || 'Загрузка...' }}
                </h1>
                <p class="text-sm text-gray-400">Слоты темы</p>
              </div>
            </div>
            <div class="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
              {{ slots.length }} слотов
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="showAssignModal = true" class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-medium transition-all transform hover:scale-105">
              ➕ Назначить слоты
            </button>
            <button @click="loadThemeSlots" class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-medium transition-all transform hover:scale-105">
              🔄 Обновить
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Theme Info -->
      <div v-if="theme" class="bg-gray-900/50 border border-gray-700 rounded-xl p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-4xl mb-2">🎰</div>
            <p class="text-2xl font-bold text-white">{{ slots.length }}</p>
            <p class="text-sm text-gray-400">Всего слотов</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-2">✅</div>
            <p class="text-2xl font-bold text-white">{{ activeSlots }}</p>
            <p class="text-sm text-gray-400">Активных слотов</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-2">🔥</div>
            <p class="text-2xl font-bold text-white">{{ popularSlots }}</p>
            <p class="text-sm text-gray-400">Популярных слотов</p>
          </div>
        </div>
        
        <div v-if="theme.description" class="mt-6 pt-6 border-t border-gray-700">
          <p class="text-gray-300">{{ theme.description }}</p>
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
              <option v-for="provider in uniqueProviders" :key="provider" :value="provider">
                {{ provider }}
              </option>
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
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Сортировка</label>
            <select
              v-model="sortBy"
              class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
            >
              <option value="name">По названию</option>
              <option value="provider">По провайдеру</option>
              <option value="rtp">По RTP</option>
              <option value="created_at">По дате создания</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Slots Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-if="loading" v-for="n in 8" :key="n" class="bg-gray-900/50 border border-gray-700 rounded-xl p-6 animate-pulse">
          <div class="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-700 rounded"></div>
            <div class="h-3 bg-gray-700 rounded w-2/3"></div>
            <div class="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
        
        <div v-else-if="filteredSlots.length === 0" class="col-span-full text-center py-12">
          <div class="text-6xl mb-4">🔍</div>
          <p class="text-lg text-gray-400">Слоты не найдены</p>
          <p class="text-sm text-gray-500">Попробуйте изменить параметры поиска или назначить слоты этой теме</p>
        </div>
        
        <div v-else v-for="slot in filteredSlots" :key="slot.id" class="bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all group">
          <div class="relative">
            <img 
              :src="slot.image_url || '/images/slot-placeholder.jpg'" 
              :alt="slot.name"
              class="w-full h-48 object-cover"
              @error="$event.target.src = '/images/slot-placeholder.jpg'"
            />
            <div class="absolute top-2 right-2 flex flex-col space-y-1">
              <span 
                :class="slot.is_active ? 'bg-green-500/80' : 'bg-red-500/80'"
                class="px-2 py-1 rounded text-xs font-semibold text-white"
              >
                {{ slot.is_active ? 'Активен' : 'Неактивен' }}
              </span>
              <span v-if="slot.is_popular" class="bg-yellow-500/80 px-2 py-1 rounded text-xs font-semibold text-white">
                🔥 Популярный
              </span>
            </div>
            <div class="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
              RTP: {{ slot.rtp || 'N/A' }}%
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {{ slot.name }}
            </h3>
            
            <div class="space-y-2 mb-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-400">Провайдер:</span>
                <span class="text-cyan-400 font-medium">{{ slot.provider_name || 'N/A' }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-400">Категория:</span>
                <span class="text-gray-300">{{ slot.category_name || 'N/A' }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-400">Волатильность:</span>
                <span class="text-gray-300">{{ slot.volatility || 'N/A' }}</span>
              </div>
            </div>
            
            <div class="flex items-center justify-between pt-4 border-t border-gray-700">
              <div class="flex items-center space-x-2">
                <button 
                  @click="removeSlotFromTheme(slot)"
                  class="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors" 
                  title="Убрать из темы"
                >
                  ❌
                </button>
                <NuxtLink 
                  :to="`/admin/slots/${slot.id}`" 
                  class="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors" 
                  title="Редактировать слот"
                >
                  ✏️
                </NuxtLink>
              </div>
              <NuxtLink 
                :to="`/slots/${slot.slug}`" 
                target="_blank"
                class="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Открыть слот →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredSlots.length > itemsPerPage" class="bg-gray-900/50 border border-gray-700 rounded-xl p-6 mt-8">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-400">
            Показано {{ startIndex }} - {{ endIndex }} из {{ filteredSlots.length }} слотов
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              ←
            </button>
            <span class="px-4 py-2 text-gray-300">
              {{ currentPage }} / {{ totalPages }}
            </span>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Assign Slots Modal -->
    <div v-if="showAssignModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div class="p-6 border-b border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white">➕ Назначить слоты теме</h2>
            <button @click="closeAssignModal" class="text-gray-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <!-- Search for available slots -->
          <div class="mb-6">
            <input
              v-model="assignSearchQuery"
              type="text"
              placeholder="Поиск доступных слотов..."
              class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </div>
          
          <!-- Available slots grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div v-if="loadingAvailableSlots" v-for="n in 6" :key="n" class="bg-gray-800 border border-gray-600 rounded-lg p-4 animate-pulse">
              <div class="w-full h-32 bg-gray-700 rounded mb-3"></div>
              <div class="h-4 bg-gray-700 rounded mb-2"></div>
              <div class="h-3 bg-gray-700 rounded w-2/3"></div>
            </div>
            
            <div v-else-if="filteredAvailableSlots.length === 0" class="col-span-full text-center py-8">
              <div class="text-4xl mb-2">🔍</div>
              <p class="text-gray-400">Доступные слоты не найдены</p>
            </div>
            
            <div 
              v-else 
              v-for="slot in filteredAvailableSlots" 
              :key="slot.id" 
              class="bg-gray-800 border border-gray-600 rounded-lg p-4 hover:border-cyan-500/50 transition-all cursor-pointer"
              :class="{ 'border-cyan-500 bg-cyan-500/10': selectedSlots.includes(slot.id) }"
              @click="toggleSlotSelection(slot.id)"
            >
              <img 
                :src="slot.image_url || '/images/slot-placeholder.jpg'" 
                :alt="slot.name"
                class="w-full h-32 object-cover rounded mb-3"
                @error="$event.target.src = '/images/slot-placeholder.jpg'"
              />
              <h4 class="text-white font-medium mb-1 line-clamp-1">{{ slot.name }}</h4>
              <p class="text-sm text-gray-400">{{ slot.provider_name || 'N/A' }}</p>
              <div class="mt-2 flex items-center justify-between">
                <span class="text-xs text-gray-500">RTP: {{ slot.rtp || 'N/A' }}%</span>
                <div v-if="selectedSlots.includes(slot.id)" class="text-cyan-400">✓</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="p-6 border-t border-gray-700">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-400">
              Выбрано слотов: {{ selectedSlots.length }}
            </div>
            <div class="flex items-center space-x-4">
              <button
                @click="closeAssignModal"
                class="px-6 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                @click="assignSlotsToTheme"
                :disabled="selectedSlots.length === 0 || assigning"
                class="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ assigning ? 'Назначение...' : `Назначить (${selectedSlots.length})` }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Remove Confirmation Modal -->
    <div v-if="showRemoveModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-gray-900 border border-red-500/30 rounded-xl max-w-md w-full">
        <div class="p-6">
          <div class="text-center">
            <div class="text-6xl mb-4">⚠️</div>
            <h2 class="text-2xl font-bold text-white mb-4">Подтвердите действие</h2>
            <p class="text-gray-300 mb-6">
              Вы уверены, что хотите убрать слот <strong>"{{ slotToRemove?.name }}"</strong> из темы?
            </p>
            <div class="flex items-center justify-center space-x-4">
              <button
                @click="showRemoveModal = false"
                class="px-6 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                @click="confirmRemoveSlot"
                :disabled="removing"
                class="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ removing ? 'Удаление...' : 'Убрать' }}
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
const { getThemeById, getSlotsByTheme } = useThemes()
const { getSlots } = useSlots()
const route = useRoute()

// Reactive data
const theme = ref(null)
const slots = ref([])
const availableSlots = ref([])
const loading = ref(true)
const loadingAvailableSlots = ref(false)
const assigning = ref(false)
const removing = ref(false)

// Modals
const showAssignModal = ref(false)
const showRemoveModal = ref(false)
const slotToRemove = ref(null)

// Search and filters
const searchQuery = ref('')
const selectedProvider = ref('')
const selectedStatus = ref('')
const sortBy = ref('name')
const assignSearchQuery = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Selection
const selectedSlots = ref([])

// Computed properties
const filteredSlots = computed(() => {
  let filtered = slots.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(slot => 
      slot.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (selectedProvider.value) {
    filtered = filtered.filter(slot => slot.provider_name === selectedProvider.value)
  }
  
  if (selectedStatus.value !== '') {
    const isActive = selectedStatus.value === 'true'
    filtered = filtered.filter(slot => slot.is_active === isActive)
  }
  
  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'provider':
        return (a.provider_name || '').localeCompare(b.provider_name || '')
      case 'rtp':
        return (b.rtp || 0) - (a.rtp || 0)
      case 'created_at':
        return new Date(b.created_at) - new Date(a.created_at)
      default:
        return 0
    }
  })
  
  return filtered
})

const filteredAvailableSlots = computed(() => {
  let filtered = availableSlots.value
  
  if (assignSearchQuery.value) {
    filtered = filtered.filter(slot => 
      slot.name.toLowerCase().includes(assignSearchQuery.value.toLowerCase()) ||
      (slot.provider_name && slot.provider_name.toLowerCase().includes(assignSearchQuery.value.toLowerCase()))
    )
  }
  
  return filtered
})

const uniqueProviders = computed(() => {
  const providers = slots.value.map(slot => slot.provider_name).filter(Boolean)
  return [...new Set(providers)].sort()
})

const activeSlots = computed(() => slots.value.filter(slot => slot.is_active).length)
const popularSlots = computed(() => slots.value.filter(slot => slot.is_popular).length)

const totalPages = computed(() => Math.ceil(filteredSlots.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredSlots.value.length))

// Methods
const loadTheme = async () => {
  try {
    const response = await getThemeById(route.params.id)
    theme.value = response
  } catch (error) {
    console.error('Ошибка загрузки темы:', error)
    throw createError({ statusCode: 404, statusMessage: 'Тема не найдена' })
  }
}

const loadThemeSlots = async () => {
  try {
    loading.value = true
    const response = await getSlotsByTheme(route.params.id)
    slots.value = response || []
  } catch (error) {
    console.error('Ошибка загрузки слотов темы:', error)
    slots.value = []
  } finally {
    loading.value = false
  }
}

const loadAvailableSlots = async () => {
  try {
    loadingAvailableSlots.value = true
    const response = await getSlots({ limit: 1000 })
    // Filter out slots that are already assigned to this theme
    const assignedSlotIds = slots.value.map(slot => slot.id)
    availableSlots.value = (response?.data || []).filter(slot => !assignedSlotIds.includes(slot.id))
  } catch (error) {
    console.error('Ошибка загрузки доступных слотов:', error)
    availableSlots.value = []
  } finally {
    loadingAvailableSlots.value = false
  }
}

const toggleSlotSelection = (slotId) => {
  const index = selectedSlots.value.indexOf(slotId)
  if (index > -1) {
    selectedSlots.value.splice(index, 1)
  } else {
    selectedSlots.value.push(slotId)
  }
}

const assignSlotsToTheme = async () => {
  try {
    assigning.value = true
    // Here you would call an API to assign slots to theme
    // For now, we'll simulate the assignment
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Reload slots after assignment
    await loadThemeSlots()
    closeAssignModal()
  } catch (error) {
    console.error('Ошибка назначения слотов:', error)
    alert('Ошибка при назначении слотов')
  } finally {
    assigning.value = false
  }
}

const removeSlotFromTheme = (slot) => {
  slotToRemove.value = slot
  showRemoveModal.value = true
}

const confirmRemoveSlot = async () => {
  try {
    removing.value = true
    // Here you would call an API to remove slot from theme
    // For now, we'll simulate the removal
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Remove slot from local array
    slots.value = slots.value.filter(slot => slot.id !== slotToRemove.value.id)
    
    showRemoveModal.value = false
    slotToRemove.value = null
  } catch (error) {
    console.error('Ошибка удаления слота из темы:', error)
    alert('Ошибка при удалении слота из темы')
  } finally {
    removing.value = false
  }
}

const closeAssignModal = () => {
  showAssignModal.value = false
  selectedSlots.value = []
  assignSearchQuery.value = ''
}

// Watchers
watch(showAssignModal, (newValue) => {
  if (newValue) {
    loadAvailableSlots()
  }
})

// Load data on mount
onMounted(async () => {
  await loadTheme()
  await loadThemeSlots()
})

// Page meta
useHead({
  title: computed(() => `Admin - Slots for Theme "${theme.value?.name || 'Loading...'}"`),
  meta: [
    { name: 'description', content: computed(() => `Управление слотами темы "${theme.value?.name || ''}"`) }
  ]
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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