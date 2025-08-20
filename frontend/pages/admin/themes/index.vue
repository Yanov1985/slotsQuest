<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
    <!-- Header -->
    <header class="relative bg-[#161A21]/80 backdrop-blur-sm border-b border-[#353A4A] sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-[#A0AABE] hover:text-[#FF6E48] transition-colors flex items-center space-x-2">
              <Icon name="heroicons:arrow-left" />
              <span>Назад к дашборду</span>
            </NuxtLink>
            <h1 class="text-2xl font-bold font-display bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] bg-clip-text text-transparent flex items-center space-x-2">
              <Icon name="heroicons:paint-brush" class="text-[#FF6E48]" />
              <span>Управление темами</span>
            </h1>
            <div class="px-3 py-1 bg-[#63F3AB]/10 border border-[#63F3AB]/30 rounded-full text-[#63F3AB] text-sm font-medium">
              {{ themes.length }} тем
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button @click="showAddModal = true" class="px-4 py-2 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2">
              <Icon name="heroicons:plus-circle" />
              <span>Добавить тему</span>
            </button>
            <button @click="loadThemes" class="px-4 py-2 bg-[#1B1E26]/70 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2">
              <Icon name="heroicons:arrow-path" />
              <span>Обновить</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mt-5">
        <div class="bg-gradient-to-r from-[#FF6E48]/10 to-[#CD5A3C]/10 border border-[#FF6E48]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#FF6E48] text-sm font-semibold">Всего тем</p>
              <p class="text-3xl font-bold text-white">{{ themes.length }}</p>
            </div>
            <Icon name="heroicons:paint-brush" class="text-[#FF6E48] text-3xl" />
          </div>
        </div>
        <div class="bg-gradient-to-r from-[#63F3AB]/10 to-[#51C58B]/10 border border-[#63F3AB]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#63F3AB] text-sm font-semibold">Активных</p>
              <p class="text-3xl font-bold text-white">{{ activeThemes }}</p>
            </div>
            <Icon name="heroicons:check-circle" class="text-[#63F3AB] text-3xl" />
          </div>
        </div>
        <div class="bg-gradient-to-r from-[#00EDFF]/10 to-[#01BFCF]/10 border border-[#00EDFF]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#00EDFF] text-sm font-semibold">Со слотами</p>
              <p class="text-3xl font-bold text-white">{{ themesWithSlots }}</p>
            </div>
            <Icon name="heroicons:squares-2x2" class="text-[#00EDFF] text-3xl" />
          </div>
        </div>
        <div class="bg-gradient-to-r from-[#CD0F8B]/10 to-[#CD0F8B]/10 border border-[#CD0F8B]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#CD0F8B] text-sm font-semibold">Популярных</p>
              <p class="text-3xl font-bold text-white">{{ popularThemes }}</p>
            </div>
            <Icon name="heroicons:fire" class="text-[#CD0F8B] text-3xl" />
          </div>
        </div>
      </div>

      <!-- Search -->
      <div class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Поиск по названию</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Введите название темы..."
              class="w-full px-4 py-2 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white placeholder-[#9CA3AF] focus:border-[#FF6E48] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Статус</label>
            <select
              v-model="selectedStatus"
              class="w-full px-4 py-2 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
            >
              <option value="">Все</option>
              <option value="true">Активные</option>
              <option value="false">Неактивные</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Сортировка</label>
            <select
              v-model="sortBy"
              class="w-full px-4 py-2 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
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
        <!-- Skeletons for loading -->
         <template v-if="loading">
           <div v-for="i in 6" :key="i" class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6 animate-pulse">
             <div class="flex items-center space-x-4 mb-4">
               <div class="w-16 h-16 bg-[#1B1E26] rounded-lg"></div>
               <div class="flex-1">
                 <div class="h-5 bg-[#1B1E26] rounded w-3/4 mb-2"></div>
                 <div class="h-4 bg-[#1B1E26] rounded w-1/2"></div>
               </div>
             </div>
             <div class="space-y-2">
               <div class="h-4 bg-[#1B1E26] rounded w-full"></div>
               <div class="h-4 bg-[#1B1E26] rounded w-2/3"></div>
             </div>
           </div>
         </template>

         <!-- Empty state -->
         <template v-else-if="filteredThemes.length === 0">
           <div class="col-span-full text-center py-12">
             <Icon name="heroicons:magnifying-glass" class="text-6xl text-[#FF6E48] mb-4" />
             <p class="text-lg text-[#E5E7EB]">Темы не найдены</p>
             <p class="text-sm text-[#9CA3AF]">Попробуйте изменить параметры поиска</p>
           </div>
         </template>

         <!-- Themes cards -->
         <template v-else>
           <div v-for="theme in filteredThemes" :key="theme.id" class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6 hover:border-[#FF6E48]/40 transition-all group">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 bg-[#1B1E26]/50 rounded-lg flex items-center justify-center border" :style="{ borderColor: theme.color || '#FF6E48' }">
              <Icon v-if="isIconify(theme.icon)" :name="theme.icon" class="text-2xl" />
              <Icon v-else name="heroicons:paint-brush" class="text-2xl" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white group-hover:text-[#FF6E48] transition-colors">{{ theme.name }}</h3>
              <p class="text-sm text-[#9CA3AF]">{{ theme.slug }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <span class="px-2 py-1 rounded text-xs" :class="theme.is_active ? 'bg-[#63F3AB]/10 border border-[#63F3AB]/30 text-[#63F3AB]' : 'bg-red-500/10 border border-red-500/30 text-red-400'">
                {{ theme.is_active ? 'Активна' : 'Неактивна' }}
              </span>
            </div>
          </div>
          
          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-[#9CA3AF]">Слотов:</span>
              <span class="text-[#00EDFF] font-medium">{{ theme.slots_count || 0 }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-[#9CA3AF]">Порядок:</span>
              <span class="text-[#E5E7EB]">{{ theme.sort_order || 0 }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-[#9CA3AF]">Популярность:</span>
              <span class="text-[#E5E7EB] flex items-center space-x-1">
                <Icon v-if="theme.is_popular" name="heroicons:fire" class="text-[#CD0F8B]" />
                <span>{{ theme.is_popular ? 'Популярная' : 'Обычная' }}</span>
              </span>
            </div>
          </div>
          
          <div v-if="theme.description" class="text-sm text-[#A0AABE] mb-4 line-clamp-2">
            {{ theme.description }}
          </div>
          
          <div class="flex items-center justify-between pt-4 border-t border-[#353A4A]">
            <div class="flex items-center space-x-2">
              <button @click="editTheme(theme)" class="p-2 bg-[#1B1E26]/60 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg transition-colors" title="Редактировать">
                <Icon name="heroicons:pencil-square" />
              </button>
              <button @click="toggleThemeStatus(theme)" class="p-2 bg-[#1B1E26]/60 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg transition-colors" :title="theme.is_active ? 'Деактивировать' : 'Активировать'">
                <Icon :name="theme.is_active ? 'heroicons:pause' : 'heroicons:play'" />
              </button>
              <button @click="deleteTheme(theme)" class="p-2 bg-[#1B1E26]/60 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg transition-colors" title="Удалить">
                <Icon name="heroicons:trash" class="text-red-400" />
              </button>
            </div>
            <NuxtLink :to="`/admin/themes/${theme.id}/slots`" class="text-xs text-[#00EDFF] hover:text-[#01BFCF] transition-colors flex items-center space-x-1">
              <span>Просмотреть слоты</span>
              <Icon name="heroicons:chevron-right" />
            </NuxtLink>
          </div>
        </div>
        </template>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-[#161A21] border border-[#353A4A] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white flex items-center space-x-2">
              <Icon :name="showAddModal ? 'heroicons:plus-circle' : 'heroicons:pencil-square'" class="text-[#FF6E48]" />
              <span>{{ showAddModal ? 'Добавить тему' : 'Редактировать тему' }}</span>
            </h2>
            <button @click="closeModal" class="text-[#A0AABE] hover:text-white transition-colors">
              <Icon name="heroicons:x-mark" />
            </button>
          </div>
          
          <form @submit.prevent="saveTheme" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Название *</label>
                <input
                  v-model="themeForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                  placeholder="Введите название темы"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Slug *</label>
                <input
                  v-model="themeForm.slug"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                  placeholder="theme-slug"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Иконка</label>
                <input
                  v-model="themeForm.icon"
                  type="text"
                  class="w-full px-4 py-2 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                  placeholder="heroicons:paint-brush (имя иконки Iconify)"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Порядок сортировки</label>
                <input
                  v-model.number="themeForm.sort_order"
                  type="number"
                  min="0"
                  class="w-full px-4 py-2 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Описание</label>
              <textarea
                v-model="themeForm.description"
                rows="3"
                class="w-full px-4 py-2 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                placeholder="Описание темы"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Цвет (HEX)</label>
                <input
                  v-model="themeForm.color"
                  type="color"
                  class="w-full h-10 px-2 py-1 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg focus:border-[#FF6E48] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">URL изображения</label>
                <input
                  v-model="themeForm.image_url"
                  type="url"
                  class="w-full px-4 py-2 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="themeForm.is_active"
                  type="checkbox"
                  class="w-4 h-4 text-[#FF6E48] bg-[#1B1E26]/50 border-[#353A4A] rounded focus:ring-[#FF6E48] focus:ring-2"
                />
                <span class="text-[#E5E7EB]">Активна</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="themeForm.is_popular"
                  type="checkbox"
                  class="w-4 h-4 text-[#FF6E48] bg-[#1B1E26]/50 border-[#353A4A] rounded focus:ring-[#FF6E48] focus:ring-2"
                />
                <span class="text-[#E5E7EB]">Популярная</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="themeForm.is_featured"
                  type="checkbox"
                  class="w-4 h-4 text-[#FF6E48] bg-[#1B1E26]/50 border-[#353A4A] rounded focus:ring-[#FF6E48] focus:ring-2"
                />
                <span class="text-[#E5E7EB]">Рекомендуемая</span>
              </label>
            </div>
            
            <div class="flex items-center justify-end space-x-4 pt-6 border-t border-[#353A4A]">
              <button
                type="button"
                @click="closeModal"
                class="px-6 py-2 border border-[#353A4A] text-[#A0AABE] hover:text-white hover:border-[#E5E7EB] rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-6 py-2 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <div class="bg-[#161A21] border border-red-500/30 rounded-xl max-w-md w-full">
        <div class="p-6">
          <div class="text-center">
            <Icon name="heroicons:shield-exclamation" class="text-6xl text-red-400 mb-4" />
            <h2 class="text-2xl font-bold text-white mb-4">Подтвердите удаление</h2>
            <p class="text-[#E5E7EB] mb-6">
              Вы уверены, что хотите удалить тему <strong>"{{ themeToDelete?.name }}"</strong>?
              Это действие нельзя отменить.
            </p>
            <div class="flex items-center justify-center space-x-4">
              <button
                @click="showDeleteModal = false"
                class="px-6 py-2 border border-[#353A4A] text-[#A0AABE] hover:text-white hover:border-[#E5E7EB] rounded-lg transition-colors"
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
    console.log('Загружаем темы...')
    const response = await getThemes()
    console.log('Получен ответ:', response)
    themes.value = response || []
    console.log('Темы установлены:', themes.value.length)
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