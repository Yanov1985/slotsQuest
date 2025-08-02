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
            <h1 class="text-2xl font-bold text-gray-900">Управление бонусами</h1>
          </div>
          <div class="flex space-x-3">
            <button
              @click="refreshBonuses"
              class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              🔄 Обновить
            </button>
            <button
              @click="openAddModal"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Добавить бонус
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
              <span class="text-2xl">🎁</span>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Всего бонусов</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalBonuses }}</p>
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
              <p class="text-2xl font-bold text-gray-900">{{ activeBonuses }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <span class="text-2xl">⏰</span>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Истекающие</p>
              <p class="text-2xl font-bold text-gray-900">{{ expiringBonuses }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <span class="text-2xl">💰</span>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Общая сумма</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalBonusAmount.toLocaleString() }}</p>
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
              placeholder="Поиск по названию, коду..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Тип</label>
            <select
              v-model="typeFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Все типы</option>
              <option value="welcome">Приветственный</option>
              <option value="deposit">За депозит</option>
              <option value="free_spins">Фриспины</option>
              <option value="cashback">Кэшбэк</option>
              <option value="loyalty">Лояльность</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Статус</label>
            <select
              v-model="statusFilter"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Все статусы</option>
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
              <option value="expired">Истекшие</option>
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

      <!-- Bonuses Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Бонус
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Тип
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Значение
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Период действия
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Использований
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="bonus in filteredBonuses" :key="bonus.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ bonus.name }}</div>
                    <div class="text-sm text-gray-500">{{ bonus.description }}</div>
                    <div v-if="bonus.code" class="text-xs text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded mt-1 inline-block">
                      Код: {{ bonus.code }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{
                    'bg-green-100 text-green-800': bonus.type === 'welcome',
                    'bg-blue-100 text-blue-800': bonus.type === 'deposit',
                    'bg-purple-100 text-purple-800': bonus.type === 'free_spins',
                    'bg-yellow-100 text-yellow-800': bonus.type === 'cashback',
                    'bg-gray-100 text-gray-800': bonus.type === 'loyalty'
                  }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ getBonusTypeName(bonus.type) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    <span v-if="bonus.type === 'free_spins'">
                      {{ bonus.value }} фриспинов
                    </span>
                    <span v-else-if="bonus.value_type === 'percentage'">
                      {{ bonus.value }}%
                    </span>
                    <span v-else>
                      {{ bonus.value.toLocaleString() }} монет
                    </span>
                  </div>
                  <div v-if="bonus.max_amount" class="text-xs text-gray-500">
                    Макс: {{ bonus.max_amount.toLocaleString() }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="{
                    'bg-green-100 text-green-800': bonus.status === 'active',
                    'bg-gray-100 text-gray-800': bonus.status === 'inactive',
                    'bg-red-100 text-red-800': bonus.status === 'expired'
                  }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                    {{ getBonusStatusName(bonus.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{{ formatDate(bonus.start_date) }}</div>
                  <div>{{ formatDate(bonus.end_date) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{{ bonus.used_count }} / {{ bonus.max_uses || '∞' }}</div>
                  <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      class="bg-blue-600 h-2 rounded-full" 
                      :style="{ width: bonus.max_uses ? (bonus.used_count / bonus.max_uses * 100) + '%' : '0%' }"
                    ></div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    @click="editBonus(bonus)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Редактировать
                  </button>
                  <button
                    @click="toggleBonusStatus(bonus)"
                    :class="{
                      'text-green-600 hover:text-green-900': bonus.status === 'inactive',
                      'text-yellow-600 hover:text-yellow-900': bonus.status === 'active'
                    }"
                  >
                    {{ bonus.status === 'active' ? 'Деактивировать' : 'Активировать' }}
                  </button>
                  <button
                    @click="confirmDelete(bonus)"
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
                Показано <span class="font-medium">{{ startIndex }}</span> - <span class="font-medium">{{ endIndex }}</span> из <span class="font-medium">{{ totalBonuses }}</span> результатов
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

    <!-- Add/Edit Bonus Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingBonus ? 'Редактировать бонус' : 'Добавить бонус' }}
          </h3>
          <form @submit.prevent="saveBonus">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Название</label>
                <input
                  v-model="bonusForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                <textarea
                  v-model="bonusForm.description"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Тип бонуса</label>
                <select
                  v-model="bonusForm.type"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="welcome">Приветственный</option>
                  <option value="deposit">За депозит</option>
                  <option value="free_spins">Фриспины</option>
                  <option value="cashback">Кэшбэк</option>
                  <option value="loyalty">Лояльность</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Промокод (опционально)</label>
                <input
                  v-model="bonusForm.code"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Тип значения</label>
                <select
                  v-model="bonusForm.value_type"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fixed">Фиксированная сумма</option>
                  <option value="percentage">Процент</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ bonusForm.type === 'free_spins' ? 'Количество фриспинов' : 'Значение' }}
                </label>
                <input
                  v-model.number="bonusForm.value"
                  type="number"
                  required
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div v-if="bonusForm.value_type === 'percentage'">
                <label class="block text-sm font-medium text-gray-700 mb-2">Максимальная сумма</label>
                <input
                  v-model.number="bonusForm.max_amount"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Максимальное количество использований</label>
                <input
                  v-model.number="bonusForm.max_uses"
                  type="number"
                  min="1"
                  placeholder="Оставьте пустым для неограниченного"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Дата начала</label>
                <input
                  v-model="bonusForm.start_date"
                  type="datetime-local"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Дата окончания</label>
                <input
                  v-model="bonusForm.end_date"
                  type="datetime-local"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Минимальный депозит</label>
                <input
                  v-model.number="bonusForm.min_deposit"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Требования по отыгрышу (x)</label>
                <input
                  v-model.number="bonusForm.wagering_requirement"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="md:col-span-2">
                <label class="flex items-center">
                  <input
                    v-model="bonusForm.is_active"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span class="ml-2 text-sm text-gray-600">Активный бонус</span>
                </label>
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
                {{ editingBonus ? 'Обновить' : 'Создать' }}
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
            Вы уверены, что хотите удалить бонус "{{ bonusToDelete?.name }}"? Это действие нельзя отменить.
          </p>
          <div class="flex justify-center space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Отмена
            </button>
            <button
              @click="deleteBonus"
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
const bonuses = ref([
  {
    id: '1',
    name: 'Приветственный бонус 200%',
    description: 'Удвойте свой первый депозит до 50,000 монет',
    type: 'welcome',
    code: 'WELCOME200',
    value: 200,
    value_type: 'percentage',
    max_amount: 50000,
    status: 'active',
    start_date: '2024-01-01T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z',
    min_deposit: 1000,
    wagering_requirement: 35,
    max_uses: null,
    used_count: 1250,
    is_active: true,
    created_at: '2024-01-01T10:30:00Z'
  },
  {
    id: '2',
    name: '50 фриспинов за депозит',
    description: 'Получите 50 бесплатных вращений на популярных слотах',
    type: 'free_spins',
    code: 'FREESPINS50',
    value: 50,
    value_type: 'fixed',
    max_amount: null,
    status: 'active',
    start_date: '2024-01-15T00:00:00Z',
    end_date: '2024-02-15T23:59:59Z',
    min_deposit: 500,
    wagering_requirement: 25,
    max_uses: 1000,
    used_count: 750,
    is_active: true,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '3',
    name: 'Кэшбэк 10% по выходным',
    description: 'Возврат 10% от проигранных средств каждые выходные',
    type: 'cashback',
    code: null,
    value: 10,
    value_type: 'percentage',
    max_amount: 10000,
    status: 'active',
    start_date: '2024-01-01T00:00:00Z',
    end_date: '2024-12-31T23:59:59Z',
    min_deposit: 0,
    wagering_requirement: 15,
    max_uses: null,
    used_count: 3200,
    is_active: true,
    created_at: '2024-01-01T10:30:00Z'
  }
])

const loading = ref(false)
const searchQuery = ref('')
const typeFilter = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingBonus = ref(null)
const bonusToDelete = ref(null)

const bonusForm = ref({
  name: '',
  description: '',
  type: 'welcome',
  code: '',
  value: 0,
  value_type: 'percentage',
  max_amount: null,
  start_date: '',
  end_date: '',
  min_deposit: 0,
  wagering_requirement: 1,
  max_uses: null,
  is_active: true
})

// Computed properties
const totalBonuses = computed(() => bonuses.value.length)
const activeBonuses = computed(() => bonuses.value.filter(bonus => bonus.status === 'active').length)
const expiringBonuses = computed(() => {
  const now = new Date()
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  return bonuses.value.filter(bonus => {
    const endDate = new Date(bonus.end_date)
    return endDate > now && endDate <= weekFromNow
  }).length
})
const totalBonusAmount = computed(() => {
  return bonuses.value.reduce((total, bonus) => {
    if (bonus.value_type === 'fixed') {
      return total + (bonus.value * bonus.used_count)
    }
    return total + ((bonus.max_amount || 0) * bonus.used_count)
  }, 0)
})

const filteredBonuses = computed(() => {
  let filtered = bonuses.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(bonus => 
      bonus.name.toLowerCase().includes(query) ||
      bonus.description.toLowerCase().includes(query) ||
      (bonus.code && bonus.code.toLowerCase().includes(query))
    )
  }

  if (typeFilter.value) {
    filtered = filtered.filter(bonus => bonus.type === typeFilter.value)
  }

  if (statusFilter.value) {
    filtered = filtered.filter(bonus => bonus.status === statusFilter.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredBonuses.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredBonuses.value.length))

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
const getBonusTypeName = (type) => {
  const types = {
    welcome: 'Приветственный',
    deposit: 'За депозит',
    free_spins: 'Фриспины',
    cashback: 'Кэшбэк',
    loyalty: 'Лояльность'
  }
  return types[type] || type
}

const getBonusStatusName = (status) => {
  const statuses = {
    active: 'Активный',
    inactive: 'Неактивный',
    expired: 'Истекший'
  }
  return statuses[status] || status
}

const refreshBonuses = async () => {
  loading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
}

const openAddModal = () => {
  editingBonus.value = null
  bonusForm.value = {
    name: '',
    description: '',
    type: 'welcome',
    code: '',
    value: 0,
    value_type: 'percentage',
    max_amount: null,
    start_date: '',
    end_date: '',
    min_deposit: 0,
    wagering_requirement: 1,
    max_uses: null,
    is_active: true
  }
  showModal.value = true
}

const editBonus = (bonus) => {
  editingBonus.value = bonus
  bonusForm.value = {
    name: bonus.name,
    description: bonus.description,
    type: bonus.type,
    code: bonus.code || '',
    value: bonus.value,
    value_type: bonus.value_type,
    max_amount: bonus.max_amount,
    start_date: bonus.start_date ? new Date(bonus.start_date).toISOString().slice(0, 16) : '',
    end_date: bonus.end_date ? new Date(bonus.end_date).toISOString().slice(0, 16) : '',
    min_deposit: bonus.min_deposit,
    wagering_requirement: bonus.wagering_requirement,
    max_uses: bonus.max_uses,
    is_active: bonus.is_active
  }
  showModal.value = true
}

const saveBonus = async () => {
  loading.value = true
  
  try {
    if (editingBonus.value) {
      // Update existing bonus
      const index = bonuses.value.findIndex(b => b.id === editingBonus.value.id)
      if (index !== -1) {
        bonuses.value[index] = {
          ...bonuses.value[index],
          ...bonusForm.value,
          status: bonusForm.value.is_active ? 'active' : 'inactive',
          updated_at: new Date().toISOString()
        }
      }
    } else {
      // Create new bonus
      const newBonus = {
        id: Date.now().toString(),
        ...bonusForm.value,
        status: bonusForm.value.is_active ? 'active' : 'inactive',
        used_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      bonuses.value.unshift(newBonus)
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving bonus:', error)
  } finally {
    loading.value = false
  }
}

const toggleBonusStatus = async (bonus) => {
  loading.value = true
  
  try {
    const index = bonuses.value.findIndex(b => b.id === bonus.id)
    if (index !== -1) {
      bonuses.value[index].status = bonuses.value[index].status === 'active' ? 'inactive' : 'active'
      bonuses.value[index].is_active = bonuses.value[index].status === 'active'
      bonuses.value[index].updated_at = new Date().toISOString()
    }
  } catch (error) {
    console.error('Error toggling bonus status:', error)
  } finally {
    loading.value = false
  }
}

const confirmDelete = (bonus) => {
  bonusToDelete.value = bonus
  showDeleteModal.value = true
}

const deleteBonus = async () => {
  loading.value = true
  
  try {
    bonuses.value = bonuses.value.filter(b => b.id !== bonusToDelete.value.id)
    showDeleteModal.value = false
    bonusToDelete.value = null
  } catch (error) {
    console.error('Error deleting bonus:', error)
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  editingBonus.value = null
  bonusForm.value = {
    name: '',
    description: '',
    type: 'welcome',
    code: '',
    value: 0,
    value_type: 'percentage',
    max_amount: null,
    start_date: '',
    end_date: '',
    min_deposit: 0,
    wagering_requirement: 1,
    max_uses: null,
    is_active: true
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  typeFilter.value = ''
  statusFilter.value = ''
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
    month: 'short',
    day: 'numeric'
  })
}

// Watchers
watch([searchQuery, typeFilter, statusFilter], () => {
  currentPage.value = 1
})

// Page meta
definePageMeta({
  title: 'Управление бонусами - Админ панель',
  description: 'Управление бонусами в админ панели SlotQuest'
})
</script>