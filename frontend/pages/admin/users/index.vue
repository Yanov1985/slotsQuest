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
            <h1 class="text-2xl font-bold text-gray-900">Управление пользователями</h1>
          </div>
          <div class="flex space-x-3">
            <button
              @click="refreshUsers"
              class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              🔄 Обновить
            </button>
            <button
              @click="openAddModal"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Добавить пользователя
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
              <span class="text-2xl">👥</span>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Всего пользователей</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalUsers }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <span class="text-2xl">✅</span>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Активные</p>
              <p class="text-2xl font-bold text-gray-900">{{ activeUsers }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <span class="text-2xl">⏸️</span>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Заблокированные</p>
              <p class="text-2xl font-bold text-gray-900">{{ blockedUsers }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <span class="text-2xl">👑</span>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Администраторы</p>
              <p class="text-2xl font-bold text-gray-900">{{ adminUsers }}</p>
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
              placeholder="Поиск по имени, email..."
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
              <option value="active">Активные</option>
              <option value="blocked">Заблокированные</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Роль</label>
            <select
              v-model="roleFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Все роли</option>
              <option value="user">Пользователь</option>
              <option value="admin">Администратор</option>
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

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Пользователь
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Роль
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Дата регистрации
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span class="text-sm font-medium text-gray-700">{{ user.name?.charAt(0) || 'U' }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.name || 'Без имени' }}</div>
                      <div class="text-sm text-gray-500">ID: {{ user.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{
                    'bg-purple-100 text-purple-800': user.role === 'admin',
                    'bg-blue-100 text-blue-800': user.role === 'user'
                  }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ user.role === 'admin' ? 'Администратор' : 'Пользователь' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{
                    'bg-green-100 text-green-800': user.is_active,
                    'bg-red-100 text-red-800': !user.is_active
                  }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ user.is_active ? 'Активен' : 'Заблокирован' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    @click="editUser(user)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Редактировать
                  </button>
                  <button
                    @click="toggleUserStatus(user)"
                    :class="{
                      'text-green-600 hover:text-green-900': !user.is_active,
                      'text-yellow-600 hover:text-yellow-900': user.is_active
                    }"
                  >
                    {{ user.is_active ? 'Заблокировать' : 'Разблокировать' }}
                  </button>
                  <button
                    @click="confirmDelete(user)"
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
                Показано <span class="font-medium">{{ startIndex }}</span> - <span class="font-medium">{{ endIndex }}</span> из <span class="font-medium">{{ totalUsers }}</span> результатов
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

    <!-- Add/Edit User Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingUser ? 'Редактировать пользователя' : 'Добавить пользователя' }}
          </h3>
          <form @submit.prevent="saveUser">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Имя</label>
              <input
                v-model="userForm.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="userForm.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-4" v-if="!editingUser">
              <label class="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
              <input
                v-model="userForm.password"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Роль</label>
              <select
                v-model="userForm.role"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">Пользователь</option>
                <option value="admin">Администратор</option>
              </select>
            </div>
            <div class="mb-6">
              <label class="flex items-center">
                <input
                  v-model="userForm.is_active"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span class="ml-2 text-sm text-gray-600">Активный пользователь</span>
              </label>
            </div>
            <div class="flex justify-end space-x-3">
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
                {{ editingUser ? 'Обновить' : 'Создать' }}
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
            Вы уверены, что хотите удалить пользователя "{{ userToDelete?.name }}"? Это действие нельзя отменить.
          </p>
          <div class="flex justify-center space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Отмена
            </button>
            <button
              @click="deleteUser"
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
const users = ref([
  {
    id: '1',
    name: 'Иван Петров',
    email: 'ivan@example.com',
    role: 'admin',
    is_active: true,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    email: 'maria@example.com',
    role: 'user',
    is_active: true,
    created_at: '2024-02-20T14:15:00Z'
  },
  {
    id: '3',
    name: 'Алексей Козлов',
    email: 'alexey@example.com',
    role: 'user',
    is_active: false,
    created_at: '2024-03-10T09:45:00Z'
  }
])

const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const roleFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingUser = ref(null)
const userToDelete = ref(null)

const userForm = ref({
  name: '',
  email: '',
  password: '',
  role: 'user',
  is_active: true
})

// Computed properties
const totalUsers = computed(() => users.value.length)
const activeUsers = computed(() => users.value.filter(user => user.is_active).length)
const blockedUsers = computed(() => users.value.filter(user => !user.is_active).length)
const adminUsers = computed(() => users.value.filter(user => user.role === 'admin').length)

const filteredUsers = computed(() => {
  let filtered = users.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.name?.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(user => {
      if (statusFilter.value === 'active') return user.is_active
      if (statusFilter.value === 'blocked') return !user.is_active
      return true
    })
  }

  if (roleFilter.value) {
    filtered = filtered.filter(user => user.role === roleFilter.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredUsers.value.length))

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
const refreshUsers = async () => {
  loading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
}

const openAddModal = () => {
  editingUser.value = null
  userForm.value = {
    name: '',
    email: '',
    password: '',
    role: 'user',
    is_active: true
  }
  showModal.value = true
}

const editUser = (user) => {
  editingUser.value = user
  userForm.value = {
    name: user.name,
    email: user.email,
    password: '',
    role: user.role,
    is_active: user.is_active
  }
  showModal.value = true
}

const saveUser = async () => {
  loading.value = true
  
  try {
    if (editingUser.value) {
      // Update existing user
      const index = users.value.findIndex(u => u.id === editingUser.value.id)
      if (index !== -1) {
        users.value[index] = {
          ...users.value[index],
          ...userForm.value,
          updated_at: new Date().toISOString()
        }
      }
    } else {
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userForm.value,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      users.value.push(newUser)
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving user:', error)
  } finally {
    loading.value = false
  }
}

const toggleUserStatus = async (user) => {
  loading.value = true
  
  try {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value[index].is_active = !users.value[index].is_active
      users.value[index].updated_at = new Date().toISOString()
    }
  } catch (error) {
    console.error('Error toggling user status:', error)
  } finally {
    loading.value = false
  }
}

const confirmDelete = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

const deleteUser = async () => {
  loading.value = true
  
  try {
    users.value = users.value.filter(u => u.id !== userToDelete.value.id)
    showDeleteModal.value = false
    userToDelete.value = null
  } catch (error) {
    console.error('Error deleting user:', error)
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  editingUser.value = null
  userForm.value = {
    name: '',
    email: '',
    password: '',
    role: 'user',
    is_active: true
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  roleFilter.value = ''
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
watch([searchQuery, statusFilter, roleFilter], () => {
  currentPage.value = 1
})

// Page meta
definePageMeta({
  title: 'Управление пользователями - Админ панель',
  description: 'User management in the admin panel'
})
</script>
