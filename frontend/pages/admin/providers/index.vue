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
              <Icon name="heroicons:building-office" class="text-[#FF6E48]" />
              <span>Управление провайдерами</span>
            </h1>
            <div class="px-3 py-1 bg-[#63F3AB]/10 border border-[#63F3AB]/30 rounded-full text-[#63F3AB] text-sm font-medium">
              {{ providers.length }} провайдеров
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button @click="showAddModal = true" class="px-4 py-2 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2">
              <Icon name="heroicons:plus-circle" />
              <span>Добавить провайдера</span>
            </button>
            <button @click="loadProviders" class="px-4 py-2 bg-[#1B1E26]/70 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2">
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
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 mb-8">
        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 backdrop-blur-sm hover:bg-[#1B1E26]/70 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#A0AABE] text-sm font-medium">Всего провайдеров</p>
              <p class="text-2xl font-bold text-white">{{ providers.length }}</p>
            </div>
            <div class="text-[#FF6E48] text-2xl">
              <Icon name="heroicons:building-office" />
            </div>
          </div>
        </div>
        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 backdrop-blur-sm hover:bg-[#1B1E26]/70 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#A0AABE] text-sm font-medium">Активных</p>
              <p class="text-2xl font-bold text-white">{{ activeProviders }}</p>
            </div>
            <div class="text-[#63F3AB] text-2xl">
              <Icon name="heroicons:check-circle" />
            </div>
          </div>
        </div>
        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 backdrop-blur-sm hover:bg-[#1B1E26]/70 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#A0AABE] text-sm font-medium">Со слотами</p>
              <p class="text-2xl font-bold text-white">{{ providersWithSlots }}</p>
            </div>
            <div class="text-[#FFD700] text-2xl">
              <Icon name="heroicons:star" />
            </div>
          </div>
        </div>
        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 backdrop-blur-sm hover:bg-[#1B1E26]/70 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#A0AABE] text-sm font-medium">Новых за месяц</p>
              <p class="text-2xl font-bold text-white">{{ newProvidersThisMonth }}</p>
            </div>
            <div class="text-[#FF6E48] text-2xl">
              <Icon name="heroicons:chart-bar" />
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-[#1B1E26]/50 backdrop-blur-sm border border-[#353A4A] rounded-xl p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Поиск провайдеров..."
                class="w-full bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 pl-10 text-white placeholder-[#A0AABE] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="heroicons:magnifying-glass" class="text-[#A0AABE]" />
              </div>
            </div>
          </div>
          
          <div class="flex gap-3">
            <select
              v-model="selectedStatus"
              class="bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
            >
              <option value="">Все статусы</option>
              <option value="true">Активные</option>
              <option value="false">Неактивные</option>
            </select>
            
            <select
              v-model="sortBy"
              class="bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
            >
              <option value="name">По названию</option>
              <option value="country">По стране</option>
              <option value="founded_year">По году основания</option>
              <option value="created_at">По дате создания</option>
            </select>
            
            <button
              @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
              class="px-4 py-3 bg-[#0F1117] border border-[#353A4A] rounded-lg text-white hover:bg-[#1B1E26] transition-all flex items-center"
            >
              <Icon :name="sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" />
            </button>
          </div>
        </div>
      </div>

      <!-- Providers Grid -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 animate-pulse">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 bg-[#353A4A] rounded-lg"></div>
            <div class="flex-1">
              <div class="h-4 bg-[#353A4A] rounded mb-2"></div>
              <div class="h-3 bg-[#353A4A] rounded w-2/3"></div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="h-3 bg-[#353A4A] rounded"></div>
            <div class="h-3 bg-[#353A4A] rounded w-3/4"></div>
          </div>
        </div>
      </div>
      
      <div v-else-if="filteredProviders.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4 text-[#FF6E48]">
          <Icon name="heroicons:building-office" class="w-16 h-16 mx-auto" />
        </div>
        <h3 class="text-xl font-semibold text-[#A0AABE] mb-2">Провайдеры не найдены</h3>
        <p class="text-[#6B7280] mb-6">{{ searchQuery ? 'Попробуйте изменить поисковый запрос' : 'Добавьте первого провайдера' }}</p>
        <button @click="showAddModal = true" class="px-6 py-3 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto">
          <Icon name="heroicons:plus-circle" />
          <span>Добавить провайдера</span>
        </button>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="provider in filteredProviders" :key="provider.id" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 hover:border-[#FF6E48]/30 transition-all group backdrop-blur-sm">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 bg-[#0F1117] rounded-lg flex items-center justify-center border border-[#353A4A]">
              <img v-if="provider.logo_url" :src="provider.logo_url" :alt="provider.name" class="w-12 h-12 rounded-lg object-cover" />
              <Icon v-else name="heroicons:building-office" class="w-8 h-8 text-[#FF6E48]" />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white group-hover:text-[#FF6E48] transition-colors">{{ provider.name }}</h3>
              <p class="text-sm text-[#A0AABE]">{{ provider.country }} • {{ provider.founded_year }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <span v-if="provider.is_active" class="w-3 h-3 bg-[#63F3AB] rounded-full" title="Активен"></span>
              <span v-else class="w-3 h-3 bg-[#FF4757] rounded-full" title="Неактивен"></span>
              <Icon v-if="provider.is_recommended" name="heroicons:star" class="w-4 h-4 text-[#FFD700]" title="Рекомендуемый" />
            </div>
          </div>
          
          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-[#A0AABE]">Слотов:</span>
              <span class="text-[#63F3AB] font-medium">{{ provider.slots_count || 0 }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-[#A0AABE]">Основан:</span>
              <span class="text-white">{{ provider.founded_year || 'Не указан' }}</span>
            </div>

          </div>
          
          <div class="flex items-center justify-between pt-4 border-t border-[#353A4A]">
            <div class="flex items-center space-x-2">
              <button @click="editProvider(provider)" class="p-2 bg-[#1B1E26]/70 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg transition-colors" title="Редактировать">
                <Icon name="heroicons:pencil" class="w-4 h-4 text-[#A0AABE]" />
              </button>
              <button @click="toggleProviderStatus(provider)" class="p-2 bg-[#1B1E26]/70 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg transition-colors" :title="provider.is_active ? 'Деактивировать' : 'Активировать'">
                <Icon :name="provider.is_active ? 'heroicons:pause' : 'heroicons:play'" class="w-4 h-4 text-[#A0AABE]" />
              </button>
              <button @click="deleteProvider(provider)" class="p-2 bg-[#1B1E26]/70 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg transition-colors" title="Удалить">
                <Icon name="heroicons:trash" class="w-4 h-4 text-[#FF4757]" />
              </button>
            </div>
            <NuxtLink :to="`/admin/providers/${provider.id}/slots`" class="text-xs text-[#FF6E48] hover:text-[#CD5A3C] transition-colors flex items-center space-x-1">
              <span>Просмотреть слоты</span>
              <Icon name="heroicons:arrow-right" class="w-3 h-3" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between bg-[#1B1E26] border border-[#353A4A] rounded-xl p-4 mt-8">
        <div class="text-sm text-[#A0AABE]">
          Показано {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, totalProviders) }} из {{ totalProviders }} провайдеров
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="p-2 text-[#A0AABE] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Icon name="heroicons:chevron-left" class="w-5 h-5" />
          </button>
          
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="currentPage = page"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                currentPage === page
                  ? 'bg-gradient-to-r from-[#FF6E48] to-[#FF4757] text-white'
                  : 'text-[#A0AABE] hover:text-white hover:bg-[#0F1117]'
              ]"
            >
              {{ page }}
            </button>
            <span v-else class="px-2 text-[#A0AABE]/50">...</span>
          </template>
          
          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="p-2 text-[#A0AABE] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Icon name="heroicons:chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-[#1B1E26] border border-[#353A4A] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white flex items-center space-x-2">
              <Icon :name="showAddModal ? 'heroicons:plus-circle' : 'heroicons:pencil'" class="text-[#FF6E48]" />
              <span>{{ showAddModal ? 'Добавить провайдера' : 'Редактировать провайдера' }}</span>
            </h2>
            <button @click="closeModal" class="text-[#A0AABE] hover:text-white transition-colors">
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>
          
          <form @submit.prevent="saveProvider" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Название *</label>
                <input
                  v-model="providerForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-[#0F1117] border border-[#353A4A] rounded-lg text-white placeholder-[#6B7280] focus:border-[#FF6E48] focus:outline-none focus:ring-2 focus:ring-[#FF6E48]/20 transition-all"
                  placeholder="Введите название провайдера"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Страна</label>
                <input
                  v-model="providerForm.country"
                  type="text"
                  class="w-full px-4 py-2 bg-[#0F1117] border border-[#353A4A] rounded-lg text-white placeholder-[#6B7280] focus:border-[#FF6E48] focus:outline-none focus:ring-2 focus:ring-[#FF6E48]/20 transition-all"
                  placeholder="Страна регистрации"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Год основания</label>
                <input
                  v-model.number="providerForm.founded_year"
                  type="number"
                  min="1900"
                  max="2024"
                  class="w-full px-4 py-2 bg-[#0F1117] border border-[#353A4A] rounded-lg text-white placeholder-[#6B7280] focus:border-[#FF6E48] focus:outline-none focus:ring-2 focus:ring-[#FF6E48]/20 transition-all"
                  placeholder="2010"
                />
              </div>

            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#A0AABE] mb-2">Описание</label>
              <textarea
                v-model="providerForm.description"
                rows="3"
                class="w-full px-4 py-2 bg-[#0F1117] border border-[#353A4A] rounded-lg text-white placeholder-[#6B7280] focus:border-[#FF6E48] focus:outline-none focus:ring-2 focus:ring-[#FF6E48]/20 transition-all"
                placeholder="Описание провайдера"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">Веб-сайт</label>
                <input
                  v-model="providerForm.website_url"
                  type="url"
                  class="w-full px-4 py-2 bg-[#0F1117] border border-[#353A4A] rounded-lg text-white placeholder-[#6B7280] focus:border-[#FF6E48] focus:outline-none focus:ring-2 focus:ring-[#FF6E48]/20 transition-all"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#A0AABE] mb-2">URL логотипа</label>
                <input
                  v-model="providerForm.logo_url"
                  type="url"
                  class="w-full px-4 py-2 bg-[#0F1117] border border-[#353A4A] rounded-lg text-white placeholder-[#6B7280] focus:border-[#FF6E48] focus:outline-none focus:ring-2 focus:ring-[#FF6E48]/20 transition-all"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="providerForm.is_active"
                  type="checkbox"
                  class="w-4 h-4 text-[#63F3AB] bg-[#0F1117] border-[#353A4A] rounded focus:ring-[#63F3AB] focus:ring-2"
                />
                <span class="text-[#A0AABE]">Активен</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="providerForm.is_recommended"
                  type="checkbox"
                  class="w-4 h-4 text-[#FFD700] bg-[#0F1117] border-[#353A4A] rounded focus:ring-[#FFD700] focus:ring-2"
                />
                <span class="text-[#A0AABE]">Рекомендуемый</span>
              </label>
            </div>
            
            <div class="flex items-center justify-end space-x-4 pt-6 border-t border-[#353A4A]">
              <button
                type="button"
                @click="closeModal"
                class="px-6 py-2 border border-[#353A4A] text-[#A0AABE] hover:text-white hover:border-[#FF6E48]/50 rounded-lg transition-colors"
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
      <div class="bg-[#1B1E26] border border-[#353A4A] rounded-xl max-w-md w-full">
        <div class="p-6">
          <div class="text-center">
            <div class="text-6xl mb-4 text-[#FF4757]">
              <Icon name="heroicons:trash" class="w-16 h-16 mx-auto" />
            </div>
            <h2 class="text-2xl font-bold text-white mb-4">Подтвердите удаление</h2>
            <p class="text-[#A0AABE] mb-6">
              Вы уверены, что хотите удалить провайдера <strong>"{{ providerToDelete?.name }}"</strong>?
              Это действие нельзя отменить.
            </p>
            <div class="flex items-center justify-center space-x-4">
              <button
                @click="showDeleteModal = false"
                class="px-6 py-2 border border-[#353A4A] text-[#A0AABE] hover:text-white hover:border-[#FF6E48]/50 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                @click="confirmDelete"
                :disabled="deleting"
                class="px-6 py-2 bg-gradient-to-r from-[#FF4757] to-[#E74C3C] hover:from-[#FF4757]/90 hover:to-[#E74C3C]/90 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
const { getProviders, createProvider, updateProvider, deleteProvider: deleteProviderApi } = useProviders()

// Reactive data
const providers = ref([])
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)

// Modals
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const providerToDelete = ref(null)

// Search and filters
const searchQuery = ref('')
const selectedStatus = ref('')
const sortBy = ref('name')

// Form data
const providerForm = ref({
  name: '',
  description: '',
  country: '',
  founded_year: null,
  website_url: '',
  logo_url: '',
  is_active: true,
  is_recommended: false
})

// Computed properties
const filteredProviders = computed(() => {
  let filtered = providers.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(provider => 
      provider.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (selectedStatus.value !== '') {
    const isActive = selectedStatus.value === 'true'
    filtered = filtered.filter(provider => provider.is_active === isActive)
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
      default:
        return 0
    }
  })
  
  return filtered
})

const activeProviders = computed(() => providers.value.filter(provider => provider.is_active).length)
const providersWithSlots = computed(() => providers.value.filter(provider => (provider.slots_count || 0) > 0).length)
const newProvidersThisMonth = computed(() => {
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
  return providers.value.filter(provider => new Date(provider.created_at) > oneMonthAgo).length
})

// Methods
const loadProviders = async () => {
  try {
    loading.value = true
    const response = await getProviders(true) // true для админского эндпоинта
    providers.value = response || []
  } catch (error) {
    console.error('Ошибка загрузки провайдеров:', error)
    providers.value = []
  } finally {
    loading.value = false
  }
}

const editProvider = (provider) => {
  providerForm.value = {
    id: provider.id,
    name: provider.name,
    description: provider.description || '',
    country: provider.country || '',
    founded_year: provider.founded_year,
    website_url: provider.website_url || '',
    logo_url: provider.logo_url || '',
    is_active: provider.is_active,
    is_recommended: provider.is_recommended || false
  }
  showEditModal.value = true
}

const deleteProvider = (provider) => {
  providerToDelete.value = provider
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!providerToDelete.value) return
  
  try {
    deleting.value = true
    await deleteProviderApi(providerToDelete.value.id)
    await loadProviders()
    showDeleteModal.value = false
    providerToDelete.value = null
  } catch (error) {
    console.error('Ошибка удаления провайдера:', error)
    alert('Ошибка при удалении провайдера')
  } finally {
    deleting.value = false
  }
}

const toggleProviderStatus = async (provider) => {
  try {
    const updatedProvider = { ...provider, is_active: !provider.is_active }
    await updateProvider(provider.id, updatedProvider)
    await loadProviders()
  } catch (error) {
    console.error('Ошибка изменения статуса провайдера:', error)
    alert('Ошибка при изменении статуса провайдера')
  }
}

const saveProvider = async () => {
  try {
    saving.value = true
    
    if (showAddModal.value) {
      await createProvider(providerForm.value)
    } else {
      await updateProvider(providerForm.value.id, providerForm.value)
    }
    
    await loadProviders()
    closeModal()
  } catch (error) {
    console.error('Ошибка сохранения провайдера:', error)
    alert('Ошибка при сохранении провайдера')
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  providerForm.value = {
    name: '',
    description: '',
    country: '',
    founded_year: null,
    website_url: '',
    logo_url: '',
    is_active: true,
    is_recommended: false
  }
}

// Load data on mount
onMounted(() => {
  loadProviders()
})

// Page meta
useHead({
  title: 'SlotQuest Admin - Управление провайдерами',
  meta: [
    { name: 'description', content: 'Административная панель для управления провайдерами SlotQuest' }
  ]
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0F1117;
}

::-webkit-scrollbar-thumb {
  background: #353A4A;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #FF6E48;
}
</style>