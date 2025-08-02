<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-blue-600 hover:text-blue-800">
              ← Назад к панели управления
            </NuxtLink>
            <h1 class="text-2xl font-bold text-gray-900">Управление новостями</h1>
          </div>
          <div class="flex space-x-3">
            <button
              @click="refreshNews"
              class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              🔄 Обновить
            </button>
            <button
              @click="openAddModal"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Добавить новость
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <span class="text-2xl">📰</span>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Всего новостей</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalNews }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <span class="text-2xl">✅</span>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Опубликованные</p>
              <p class="text-2xl font-bold text-gray-900">{{ publishedNews }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <span class="text-2xl">📝</span>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Черновики</p>
              <p class="text-2xl font-bold text-gray-900">{{ draftNews }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <span class="text-2xl">⭐</span>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Рекомендуемые</p>
              <p class="text-2xl font-bold text-gray-900">{{ featuredNews }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Поиск</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск по заголовку, содержанию..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Статус</label>
            <select
              v-model="statusFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Все статусы</option>
              <option value="published">Опубликованные</option>
              <option value="draft">Черновики</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Категория</label>
            <select
              v-model="categoryFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Все категории</option>
              <option value="updates">Обновления</option>
              <option value="promotions">Акции</option>
              <option value="tournaments">Турниры</option>
              <option value="general">Общие</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="clearFilters"
              class="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Очистить фильтры
            </button>
          </div>
        </div>
      </div>

      <!-- News Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Новость
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категория
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Автор
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата создания
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="article in filteredNews" :key="article.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-16 w-24">
                      <img
                        v-if="article.image"
                        :src="article.image"
                        :alt="article.title"
                        class="h-16 w-24 object-cover rounded-lg"
                      />
                      <div v-else class="h-16 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span class="text-gray-400 text-xs">Нет фото</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 line-clamp-2">{{ article.title }}</div>
                      <div class="text-sm text-gray-500 line-clamp-1">{{ article.excerpt }}</div>
                      <div class="flex items-center mt-1">
                        <span v-if="article.is_featured" class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          ⭐ Рекомендуемая
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{
                    'bg-blue-100 text-blue-800': article.category === 'updates',
                    'bg-green-100 text-green-800': article.category === 'promotions',
                    'bg-purple-100 text-purple-800': article.category === 'tournaments',
                    'bg-gray-100 text-gray-800': article.category === 'general'
                  }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ getCategoryName(article.category) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{
                    'bg-green-100 text-green-800': article.status === 'published',
                    'bg-yellow-100 text-yellow-800': article.status === 'draft'
                  }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ article.status === 'published' ? 'Опубликована' : 'Черновик' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ article.author }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(article.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    @click="editNews(article)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Редактировать
                  </button>
                  <button
                    @click="toggleNewsStatus(article)"
                    :class="{
                      'text-green-600 hover:text-green-900': article.status === 'draft',
                      'text-yellow-600 hover:text-yellow-900': article.status === 'published'
                    }"
                  >
                    {{ article.status === 'published' ? 'Снять с публикации' : 'Опубликовать' }}
                  </button>
                  <button
                    @click="confirmDelete(article)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Предыдущая
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Следующая
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Показано <span class="font-medium">{{ startIndex }}</span> - <span class="font-medium">{{ endIndex }}</span> из <span class="font-medium">{{ totalNews }}</span> результатов
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  ←
                </button>
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="{
                    'bg-blue-50 border-blue-500 text-blue-600': page === currentPage,
                    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== currentPage
                  }"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  {{ page }}
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  →
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit News Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingNews ? 'Редактировать новость' : 'Добавить новость' }}
          </h3>
          <form @submit.prevent="saveNews">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Заголовок</label>
                <input
                  v-model="newsForm.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Краткое описание</label>
                <textarea
                  v-model="newsForm.excerpt"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                <select
                  v-model="newsForm.category"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="updates">Обновления</option>
                  <option value="promotions">Акции</option>
                  <option value="tournaments">Турниры</option>
                  <option value="general">Общие</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Изображение (URL)</label>
                <input
                  v-model="newsForm.image"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Содержание</label>
                <textarea
                  v-model="newsForm.content"
                  rows="8"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label class="flex items-center">
                  <input
                    v-model="newsForm.is_featured"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span class="ml-2 text-sm text-gray-600">Рекомендуемая новость</span>
                </label>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Статус</label>
                <select
                  v-model="newsForm.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Черновик</option>
                  <option value="published">Опубликована</option>
                </select>
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {{ editingNews ? 'Обновить' : 'Создать' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Подтвердите удаление</h3>
          <p class="text-sm text-gray-500 mb-6">
            Вы уверены, что хотите удалить новость "{{ newsToDelete?.title }}"? Это действие нельзя отменить.
          </p>
          <div class="flex justify-center space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Отмена
            </button>
            <button
              @click="deleteNews"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Mock data for demonstration
const news = ref([
  {
    id: '1',
    title: 'Новые слоты уже в SlotQuest!',
    excerpt: 'Добавлены 15 новых захватывающих слотов от ведущих провайдеров',
    content: 'Мы рады сообщить о добавлении 15 новых слотов...',
    category: 'updates',
    status: 'published',
    is_featured: true,
    author: 'Админ',
    image: 'https://via.placeholder.com/400x200',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Турнир "Зимние призы" - выиграй до 100,000 монет!',
    excerpt: 'Участвуй в зимнем турнире и получи шанс выиграть крупные призы',
    content: 'С 1 по 31 января проходит турнир "Зимние призы"...',
    category: 'tournaments',
    status: 'published',
    is_featured: false,
    author: 'Админ',
    image: 'https://via.placeholder.com/400x200',
    created_at: '2024-01-10T14:15:00Z'
  },
  {
    id: '3',
    title: 'Бонус за первый депозит увеличен до 200%',
    excerpt: 'Новые игроки теперь получают еще больше бонусов',
    content: 'Мы увеличили бонус за первый депозит...',
    category: 'promotions',
    status: 'draft',
    is_featured: false,
    author: 'Админ',
    image: null,
    created_at: '2024-01-05T09:45:00Z'
  }
])

const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingNews = ref(null)
const newsToDelete = ref(null)

const newsForm = ref({
  title: '',
  excerpt: '',
  content: '',
  category: 'general',
  status: 'draft',
  is_featured: false,
  image: ''
})

// Computed properties
const totalNews = computed(() => news.value.length)
const publishedNews = computed(() => news.value.filter(article => article.status === 'published').length)
const draftNews = computed(() => news.value.filter(article => article.status === 'draft').length)
const featuredNews = computed(() => news.value.filter(article => article.is_featured).length)

const filteredNews = computed(() => {
  let filtered = news.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(article => article.status === statusFilter.value)
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(article => article.category === categoryFilter.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredNews.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredNews.value.length))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const getCategoryName = (category) => {
  const categories = {
    updates: 'Обновления',
    promotions: 'Акции',
    tournaments: 'Турниры',
    general: 'Общие'
  }
  return categories[category] || category
}

const refreshNews = async () => {
  loading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
}

const openAddModal = () => {
  editingNews.value = null
  newsForm.value = {
    title: '',
    excerpt: '',
    content: '',
    category: 'general',
    status: 'draft',
    is_featured: false,
    image: ''
  }
  showModal.value = true
}

const editNews = (article) => {
  editingNews.value = article
  newsForm.value = {
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    category: article.category,
    status: article.status,
    is_featured: article.is_featured,
    image: article.image || ''
  }
  showModal.value = true
}

const saveNews = async () => {
  loading.value = true
  
  try {
    if (editingNews.value) {
      // Update existing news
      const index = news.value.findIndex(n => n.id === editingNews.value.id)
      if (index !== -1) {
        news.value[index] = {
          ...news.value[index],
          ...newsForm.value,
          updated_at: new Date().toISOString()
        }
      }
    } else {
      // Create new news
      const newArticle = {
        id: Date.now().toString(),
        ...newsForm.value,
        author: 'Админ',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      news.value.unshift(newArticle)
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving news:', error)
  } finally {
    loading.value = false
  }
}

const toggleNewsStatus = async (article) => {
  loading.value = true
  
  try {
    const index = news.value.findIndex(n => n.id === article.id)
    if (index !== -1) {
      news.value[index].status = news.value[index].status === 'published' ? 'draft' : 'published'
      news.value[index].updated_at = new Date().toISOString()
    }
  } catch (error) {
    console.error('Error toggling news status:', error)
  } finally {
    loading.value = false
  }
}

const confirmDelete = (article) => {
  newsToDelete.value = article
  showDeleteModal.value = true
}

const deleteNews = async () => {
  loading.value = true
  
  try {
    news.value = news.value.filter(n => n.id !== newsToDelete.value.id)
    showDeleteModal.value = false
    newsToDelete.value = null
  } catch (error) {
    console.error('Error deleting news:', error)
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  editingNews.value = null
  newsForm.value = {
    title: '',
    excerpt: '',
    content: '',
    category: 'general',
    status: 'draft',
    is_featured: false,
    image: ''
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  categoryFilter.value = ''
  currentPage.value = 1
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Watchers
watch([searchQuery, statusFilter, categoryFilter], () => {
  currentPage.value = 1
})

// Page meta
definePageMeta({
  title: 'Управление новостями - Админ панель',
  description: 'Управление новостями в админ панели SlotQuest'
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>