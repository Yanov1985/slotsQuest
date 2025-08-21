<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Header -->
    <header class="bg-gray-800 border-b border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-gray-400 hover:text-white transition-colors">
              <Icon name="heroicons:arrow-left" class="w-6 h-6" />
            </NuxtLink>
            <h1 class="text-2xl font-bold text-white">Управление фитчами слотов</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="showAddModal = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Icon name="heroicons:plus" class="w-5 h-5" />
              <span>Добавить фитчу</span>
            </button>
            <button
              @click="loadThemes"
              :disabled="loading"
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
            >
              <Icon name="heroicons:arrow-path" class="w-5 h-5" :class="{ 'animate-spin': loading }" />
              <span>Обновить</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gray-800 rounded-lg p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="heroicons:squares-2x2" class="w-8 h-8 text-blue-500" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-400">Всего фитчей</p>
              <p class="text-2xl font-semibold text-white">{{ themes.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="heroicons:check-circle" class="w-8 h-8 text-green-500" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-400">Активных</p>
              <p class="text-2xl font-semibold text-white">{{ activeThemes }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="heroicons:play" class="w-8 h-8 text-purple-500" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-400">С слотами</p>
              <p class="text-2xl font-semibold text-white">{{ themesWithSlots }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="heroicons:star" class="w-8 h-8 text-yellow-500" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-400">Популярных</p>
              <p class="text-2xl font-semibold text-white">{{ popularThemes }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-gray-800 rounded-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Поиск</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск по названию или slug..."
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Статус</label>
            <select
              v-model="selectedStatus"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="sort_order">По порядку</option>
              <option value="name">По названию</option>
              <option value="created_at">По дате создания</option>
              <option value="slots_count">По количеству слотов</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Themes Grid -->
      <div class="bg-gray-800 rounded-lg p-6">
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="i in 8" :key="i" class="animate-pulse">
            <div class="bg-gray-700 rounded-lg h-48"></div>
          </div>
        </div>

        <div v-else-if="filteredThemes.length === 0" class="text-center py-12">
          <Icon name="heroicons:squares-2x2" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-300 mb-2">Фитчи не найдены</h3>
          <p class="text-gray-500 mb-4">Попробуйте изменить параметры поиска или добавьте новую фитчу</p>
          <button
            @click="showAddModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors"
          >
            <Icon name="heroicons:plus" class="w-5 h-5" />
            <span>Добавить фитчу</span>
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="theme in filteredThemes"
            :key="theme.id"
            class="bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors"
          >
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg font-bold"
                    :style="{ backgroundColor: theme.color || '#f59e0b' }"
                  >
                    <Icon v-if="theme.icon && isIconify(theme.icon)" :name="theme.icon" class="w-6 h-6" />
                    <span v-else>{{ theme.name?.charAt(0)?.toUpperCase() || '?' }}</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white">{{ theme.name }}</h3>
                    <p class="text-sm text-gray-400">{{ theme.slug }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    @click="toggleThemeStatus(theme)"
                    :class="[
                      'w-8 h-4 rounded-full relative transition-colors',
                      theme.is_active ? 'bg-green-500' : 'bg-gray-600'
                    ]"
                  >
                    <div
                      :class="[
                        'w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform',
                        theme.is_active ? 'translate-x-4' : 'translate-x-0.5'
                      ]"
                    ></div>
                  </button>
                </div>
              </div>

              <div v-if="theme.description" class="mb-4">
                <p class="text-sm text-gray-300 line-clamp-2">{{ theme.description }}</p>
              </div>

              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-4 text-sm text-gray-400">
                  <span class="flex items-center space-x-1">
                    <Icon name="heroicons:play" class="w-4 h-4" />
                    <span>{{ theme.slots_count || 0 }}</span>
                  </span>
                  <span v-if="theme.is_popular" class="flex items-center space-x-1 text-yellow-400">
                    <Icon name="heroicons:star" class="w-4 h-4" />
                    <span>Популярная</span>
                  </span>
                  <span v-if="theme.is_featured" class="flex items-center space-x-1 text-blue-400">
                    <Icon name="heroicons:bookmark" class="w-4 h-4" />
                    <span>Рекомендуемая</span>
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <NuxtLink
                  :to="`/admin/slot-features/${theme.id}/slots`"
                  class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Слоты фитчи
                </NuxtLink>
                <div class="flex items-center space-x-2">
                  <button
                    @click="editTheme(theme)"
                    class="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon name="heroicons:pencil" class="w-5 h-5" />
                  </button>
                  <button
                    @click="deleteTheme(theme)"
                    class="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white">
              {{ showAddModal ? 'Добавить фитчу' : 'Редактировать фитчу' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-white transition-colors">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>

          <form @submit.prevent="saveTheme" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Название *</label>
                <input
                  v-model="themeForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Название фитчи"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Slug *</label>
                <input
                  v-model="themeForm.slug"
                  type="text"
                  required
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="slug-fitchi"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Описание</label>
              <textarea
                v-model="themeForm.description"
                rows="3"
                class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Описание фитчи"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Иконка</label>
                <input
                  v-model="themeForm.icon"
                  type="text"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="heroicons:star (Iconify)"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Цвет</label>
                <input
                  v-model="themeForm.color"
                  type="color"
                  class="w-full h-10 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">URL изображения</label>
                <input
                  v-model="themeForm.image_url"
                  type="url"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Порядок сортировки</label>
                <input
                  v-model.number="themeForm.sort_order"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                >
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center">
                <input
                  v-model="themeForm.is_active"
                  type="checkbox"
                  id="is_active"
                  class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                >
                <label for="is_active" class="ml-2 text-sm text-gray-300">Активная</label>
              </div>
              <div class="flex items-center">
                <input
                  v-model="themeForm.is_popular"
                  type="checkbox"
                  id="is_popular"
                  class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                >
                <label for="is_popular" class="ml-2 text-sm text-gray-300">Популярная</label>
              </div>
              <div class="flex items-center">
                <input
                  v-model="themeForm.is_featured"
                  type="checkbox"
                  id="is_featured"
                  class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                >
                <label for="is_featured" class="ml-2 text-sm text-gray-300">Рекомендуемая</label>
              </div>
            </div>

            <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {{ saving ? 'Сохранение...' : (showAddModal ? 'Создать' : 'Сохранить') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-gray-800 rounded-lg max-w-md w-full">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white">Удалить фитчу</h2>
            <button @click="showDeleteModal = false" class="text-gray-400 hover:text-white transition-colors">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>

          <p class="text-gray-300 mb-6">
            Вы уверены, что хотите удалить фитчу "{{ themeToDelete?.name }}"?
            Это действие нельзя отменить.
          </p>

          <div class="flex items-center justify-end space-x-4">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Отмена
            </button>
            <button
              @click="confirmDelete"
              :disabled="deleting"
              class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {{ deleting ? 'Удаление...' : 'Удалить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getThemes, createTheme, updateTheme, deleteTheme as deleteThemeApi } from '~/composables/useThemes'

// Reactive data
const themes = ref([])
const loading = ref(false)
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

// Helper: проверка, что строка — это имя иконки Iconify
const isIconify = (val) => typeof val === 'string' && val.includes(':')

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
    console.log('Загружаем фитчи...')
    const response = await getThemes()
    console.log('Получен ответ:', response)
    themes.value = response || []
    console.log('Фитчи установлены:', themes.value.length)
  } catch (error) {
    console.error('Ошибка загрузки фитчей:', error)
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
    console.error('Ошибка удаления фитчи:', error)
    alert('Ошибка при удалении фитчи')
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
    console.error('Ошибка изменения статуса фитчи:', error)
    alert('Ошибка при изменении статуса фитчи')
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
    console.error('Ошибка сохранения фитчи:', error)
    alert('Ошибка при сохранении фитчи')
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
  title: 'SlotQuest Admin - Управление фитчами слотов',
  meta: [
    { name: 'description', content: 'Административная панель для управления фитчами слотов SlotQuest' }
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