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
              🎨 Управление темами
            </h1>
            <div class="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
              {{ themes.length }} тем
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="showAddModal = true" class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-medium transition-all transform hover:scale-105">
              ➕ Добавить тему
            </button>
            <button @click="loadThemes" class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-medium transition-all transform hover:scale-105">
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
              <p class="text-cyan-400 text-sm font-medium">Всего тем</p>
              <p class="text-3xl font-bold text-white">{{ themes.length }}</p>
            </div>
            <div class="text-4xl">🎨</div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-400 text-sm font-medium">Активных</p>
              <p class="text-3xl font-bold text-white">{{ activeThemes }}</p>
            </div>
            <div class="text-4xl">✅</div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-400 text-sm font-medium">Со слотами</p>
              <p class="text-3xl font-bold text-white">{{ themesWithSlots }}</p>
            </div>
            <div class="text-4xl">🎰</div>
          </div>
        </div>
        <div class="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-yellow-400 text-sm font-medium">Популярных</p>
              <p class="text-3xl font-bold text-white">{{ popularThemes }}</p>
            </div>
            <div class="text-4xl">🔥</div>
          </div>
        </div>
      </div>

      <!-- Search -->
      <div class="bg-gray-900/50 border border-gray-700 rounded-xl p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Поиск по названию</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Введите название темы..."
              class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
            />
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
              <option value="created_at">По дате создания</option>
              <option value="slots_count">По количеству слотов</option>
              <option value="sort_order">По порядку</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Themes Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="loading" v-for="n in 6" :key="n" class="bg-gray-900/50 border border-gray-700 rounded-xl p-6 animate-pulse">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 bg-gray-700 rounded-lg"></div>
            <div class="flex-1">
              <div class="h-4 bg-gray-700 rounded mb-2"></div>
              <div class="h-3 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="h-3 bg-gray-700 rounded"></div>
            <div class="h-3 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
        
        <div v-else-if="filteredThemes.length === 0" class="col-span-full text-center py-12">
          <div class="text-6xl mb-4">🔍</div>
          <p class="text-lg text-gray-400">Темы не найдены</p>
          <p class="text-sm text-gray-500">Попробуйте изменить параметры поиска</p>
        </div>
        
        <div v-else v-for="theme in filteredThemes" :key="theme.id" class="bg-gray-900/50 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/30 transition-all group">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-pink-500/30">
              <span class="text-2xl">{{ theme.icon || '🎨' }}</span>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{{ theme.name }}</h3>
              <p class="text-sm text-gray-400">{{ theme.slug }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <span class="px-2 py-1 rounded text-xs" :class="theme.is_active ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'">
                {{ theme.is_active ? 'Активна' : 'Неактивна' }}
              </span>
            </div>
          </div>
          
          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-400">Слотов:</span>
              <span class="text-cyan-400 font-medium">{{ theme.slots_count || 0 }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-400">Порядок:</span>
              <span class="text-gray-300">{{ theme.sort_order || 0 }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-400">Популярность:</span>
              <span class="text-yellow-400">{{ theme.is_popular ? '🔥 Популярная' : '📊 Обычная' }}</span>
            </div>
          </div>
          
          <div v-if="theme.description" class="text-sm text-gray-400 mb-4 line-clamp-2">
            {{ theme.description }}
          </div>
          
          <div class="flex items-center justify-between pt-4 border-t border-gray-700">
            <div class="flex items-center space-x-2">
              <button @click="editTheme(theme)" class="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors" title="Редактировать">
                ✏️
              </button>
              <button @click="toggleThemeStatus(theme)" class="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg transition-colors" :title="theme.is_active ? 'Деактивировать' : 'Активировать'">
                {{ theme.is_active ? '⏸️' : '▶️' }}
              </button>
              <button @click="deleteTheme(theme)" class="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors" title="Удалить">
                🗑️
              </button>
            </div>
            <NuxtLink :to="`/admin/themes/${theme.id}/slots`" class="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
              Просмотреть слоты →
            </NuxtLink>
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
              {{ showAddModal ? '➕ Добавить тему' : '✏️ Редактировать тему' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>
          
          <form @submit.prevent="saveTheme" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Название *</label>
                <input
                  v-model="themeForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Введите название темы"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Slug *</label>
                <input
                  v-model="themeForm.slug"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="theme-slug"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Иконка</label>
                <input
                  v-model="themeForm.icon"
                  type="text"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="🎨 (эмодзи или символ)"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Порядок сортировки</label>
                <input
                  v-model.number="themeForm.sort_order"
                  type="number"
                  min="0"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Описание</label>
              <textarea
                v-model="themeForm.description"
                rows="3"
                class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="Описание темы"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Цвет (HEX)</label>
                <input
                  v-model="themeForm.color"
                  type="color"
                  class="w-full h-10 px-2 py-1 bg-gray-800 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">URL изображения</label>
                <input
                  v-model="themeForm.image_url"
                  type="url"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="themeForm.is_active"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Активна</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="themeForm.is_popular"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Популярная</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="themeForm.is_featured"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Рекомендуемая</span>
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
              Вы уверены, что хотите удалить тему <strong>"{{ themeToDelete?.name }}"</strong>?
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
const { getThemes, createTheme, updateTheme, deleteTheme: deleteThemeApi } = useThemes()

// Reactive data
const themes = ref([])
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)

// Modals
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const themeToDelete = ref(null)

// Search and filters
const searchQuery = ref('')
const selectedStatus = ref('')
const sortBy = ref('sort_order')

// Form data
const themeForm = ref({
  name: '',
  slug: '',
  description: '',
  icon: '',
  color: '#f59e0b',
  image_url: '',
  sort_order: 0,
  is_active: true,
  is_popular: false,
  is_featured: false
})

// Computed properties
const filteredThemes = computed(() => {
  let filtered = themes.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(theme => 
      theme.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      theme.slug.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (selectedStatus.value !== '') {
    const isActive = selectedStatus.value === 'true'
    filtered = filtered.filter(theme => theme.is_active === isActive)
  }
  
  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'created_at':
        return new Date(b.created_at) - new Date(a.created_at)
      case 'slots_count':
        return (b.slots_count || 0) - (a.slots_count || 0)
      case 'sort_order':
        return (a.sort_order || 0) - (b.sort_order || 0)
      default:
        return 0
    }
  })
  
  return filtered
})

const activeThemes = computed(() => themes.value.filter(theme => theme.is_active).length)
const themesWithSlots = computed(() => themes.value.filter(theme => (theme.slots_count || 0) > 0).length)
const popularThemes = computed(() => themes.value.filter(theme => theme.is_popular).length)

// Methods
const loadThemes = async () => {
  try {
    loading.value = true
    const response = await getThemes()
    themes.value = response || []
  } catch (error) {
    console.error('Ошибка загрузки тем:', error)
    themes.value = []
  } finally {
    loading.value = false
  }
}

const editTheme = (theme) => {
  themeForm.value = {
    id: theme.id,
    name: theme.name,
    slug: theme.slug,
    description: theme.description || '',
    icon: theme.icon || '',
    color: theme.color || '#f59e0b',
    image_url: theme.image_url || '',
    sort_order: theme.sort_order || 0,
    is_active: theme.is_active,
    is_popular: theme.is_popular || false,
    is_featured: theme.is_featured || false
  }
  showEditModal.value = true
}

const deleteTheme = (theme) => {
  themeToDelete.value = theme
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!themeToDelete.value) return
  
  try {
    deleting.value = true
    await deleteThemeApi(themeToDelete.value.id)
    await loadThemes()
    showDeleteModal.value = false
    themeToDelete.value = null
  } catch (error) {
    console.error('Ошибка удаления темы:', error)
    alert('Ошибка при удалении темы')
  } finally {
    deleting.value = false
  }
}

const toggleThemeStatus = async (theme) => {
  try {
    const updatedTheme = { ...theme, is_active: !theme.is_active }
    await updateTheme(theme.id, updatedTheme)
    await loadThemes()
  } catch (error) {
    console.error('Ошибка изменения статуса темы:', error)
    alert('Ошибка при изменении статуса темы')
  }
}

const saveTheme = async () => {
  try {
    saving.value = true
    
    if (showAddModal.value) {
      await createTheme(themeForm.value)
    } else {
      await updateTheme(themeForm.value.id, themeForm.value)
    }
    
    await loadThemes()
    closeModal()
  } catch (error) {
    console.error('Ошибка сохранения темы:', error)
    alert('Ошибка при сохранении темы')
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  themeForm.value = {
    name: '',
    slug: '',
    description: '',
    icon: '',
    color: '#f59e0b',
    image_url: '',
    sort_order: 0,
    is_active: true,
    is_popular: false,
    is_featured: false
  }
}

// Auto-generate slug from name
watch(() => themeForm.value.name, (newName) => {
  if (showAddModal.value && newName) {
    themeForm.value.slug = newName
      .toLowerCase()
      .replace(/[^a-z0-9а-я]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }
})

// Load data on mount
onMounted(() => {
  loadThemes()
})

// Page meta
useHead({
  title: 'SlotQuest Admin - Управление темами',
  meta: [
    { name: 'description', content: 'Административная панель для управления темами SlotQuest' }
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>