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
              {{ totalProviders }} провайдеров
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button @click="showAddModal = true" class="px-4 py-2 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2">
              <Icon name="heroicons:plus-circle" />
              <span>Добавить провайдера</span>
            </button>
            <button @click="refreshProviders" class="px-4 py-2 bg-[#1B1E26]/70 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2">
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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-5">
        <div class="bg-gradient-to-r from-[#FF6E48]/10 to-[#CD5A3C]/10 border border-[#FF6E48]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#FF6E48] text-sm font-semibold">Всего провайдеров</p>
              <p class="text-3xl font-bold text-white">{{ totalProviders }}</p>
            </div>
            <Icon name="heroicons:building-office" class="text-[#FF6E48] text-3xl" />
          </div>
        </div>
        <div class="bg-gradient-to-r from-[#63F3AB]/10 to-[#51C58B]/10 border border-[#63F3AB]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#63F3AB] text-sm font-semibold">Активных</p>
              <p class="text-3xl font-bold text-white">{{ activeProviders }}</p>
            </div>
            <Icon name="heroicons:check-circle" class="text-[#63F3AB] text-3xl" />
          </div>
        </div>
        <div class="bg-gradient-to-r from-[#00EDFF]/10 to-[#01BFCF]/10 border border-[#00EDFF]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#00EDFF] text-sm font-semibold">Слотов всего</p>
              <p class="text-3xl font-bold text-white">{{ totalSlots }}</p>
            </div>
            <Icon name="heroicons:squares-2x2" class="text-[#00EDFF] text-3xl" />
          </div>
        </div>
      </div>

      <!-- Search -->
      <div class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Поиск по названию</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Введите название провайдера..."
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
        </div>
      </div>

      <!-- Providers Grid -->
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
        <template v-else-if="filteredProviders.length === 0">
          <div class="col-span-full text-center py-12">
            <Icon name="heroicons:magnifying-glass" class="text-6xl text-[#FF6E48] mb-4" />
            <p class="text-lg text-[#E5E7EB]">Провайдеры не найдены</p>
            <p class="text-sm text-[#9CA3AF]">Попробуйте изменить параметры поиска</p>
          </div>
        </template>

        <!-- Providers cards -->
        <template v-else>
          <div v-for="provider in filteredProviders" :key="provider.id" class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6 hover:border-[#FF6E48]/40 transition-all group">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-16 h-16 bg-[#1B1E26]/50 rounded-lg flex items-center justify-center border border-[#FF6E48]/30">
                <Icon name="heroicons:building-office" class="text-2xl text-[#FF6E48]" />
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-white group-hover:text-[#FF6E48] transition-colors">
                  {{ provider.name }}
                </h3>
                <p class="text-sm text-[#9CA3AF]">ID: {{ provider.id }}</p>
                <span
                  class="inline-block px-2 py-1 rounded-full text-xs font-medium mt-1"
                  :class="
                    provider.is_active
                      ? 'bg-[#63F3AB]/10 border border-[#63F3AB]/30 text-[#63F3AB]'
                      : 'bg-[#CD0F8B]/10 border border-[#CD0F8B]/30 text-[#CD0F8B]'
                  "
                >
                  {{ provider.is_active ? 'Активен' : 'Неактивен' }}
                </span>
              </div>
            </div>

            <div class="space-y-3 mb-4">
              <p class="text-[#D1D5DB] text-sm leading-relaxed">
                {{ provider.description || 'Описание не указано' }}
              </p>
              <div class="flex items-center space-x-4 text-sm text-[#9CA3AF]">
                <span class="flex items-center space-x-1">
                  <Icon name="heroicons:squares-2x2" class="text-[#FF6E48]" />
                  <span>{{ provider.slots_count || 0 }} слотов</span>
                </span>
                <span v-if="provider.website" class="flex items-center space-x-1">
                  <Icon name="heroicons:globe-alt" class="text-[#FF6E48]" />
                  <span>Сайт</span>
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-[#353A4A]">
              <div class="text-xs text-[#6B7280]">
                Создан: {{ formatDate(provider.created_at) }}
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="editProvider(provider)"
                  class="p-2 bg-[#00EDFF]/10 hover:bg-[#00EDFF]/20 border border-[#00EDFF]/30 rounded-lg transition-all hover:scale-105"
                  title="Редактировать"
                >
                  <Icon name="heroicons:pencil" class="text-[#00EDFF]" />
                </button>
                <button
                  @click="toggleProviderStatus(provider)"
                  class="p-2 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-lg transition-all hover:scale-105"
                  :title="provider.is_active ? 'Деактивировать' : 'Активировать'"
                >
                  <Icon :name="provider.is_active ? 'heroicons:pause' : 'heroicons:play'" class="text-[#FFD700]" />
                </button>
                <button
                  @click="deleteProvider(provider)"
                  class="p-2 bg-[#CD0F8B]/10 hover:bg-[#CD0F8B]/20 border border-[#CD0F8B]/30 rounded-lg transition-all hover:scale-105"
                  title="Удалить"
                >
                  <Icon name="heroicons:trash" class="text-[#CD0F8B]" />
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-[#161A21]/95 border border-[#353A4A] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white flex items-center space-x-2">
              <Icon :name="showAddModal ? 'heroicons:plus' : 'heroicons:pencil'" class="text-[#FF6E48]" />
              <span>{{
                showAddModal
                  ? 'Добавить провайдера'
                  : 'Редактировать провайдера'
              }}</span>
            </h2>
            <button
              @click="closeModal"
              class="text-[#9CA3AF] hover:text-white transition-colors p-2 hover:bg-[#353A4A] rounded-lg"
            >
              <Icon name="heroicons:x-mark" />
            </button>
          </div>

          <form @submit.prevent="saveProvider" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#D1D5DB] mb-2">
                  Название *
                </label>
                <input
                  v-model="providerForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-all placeholder-[#6B7280]"
                  placeholder="Введите название провайдера"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#D1D5DB] mb-2">
                  Slug *
                </label>
                <input
                  v-model="providerForm.slug"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-all placeholder-[#6B7280]"
                  placeholder="provider-slug"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#D1D5DB] mb-2">
                Описание
              </label>
              <textarea
                v-model="providerForm.description"
                rows="3"
                class="w-full px-4 py-3 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-all placeholder-[#6B7280] resize-none"
                placeholder="Описание провайдера"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#D1D5DB] mb-2">
                  Веб-сайт
                </label>
                <input
                  v-model="providerForm.website"
                  type="url"
                  class="w-full px-4 py-3 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-all placeholder-[#6B7280]"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#D1D5DB] mb-2">
                  Логотип (URL)
                </label>
                <input
                  v-model="providerForm.logo_url"
                  type="url"
                  class="w-full px-4 py-3 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-all placeholder-[#6B7280]"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#D1D5DB] mb-2">
                  Страна
                </label>
                <input
                  v-model="providerForm.country"
                  type="text"
                  class="w-full px-4 py-3 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-all placeholder-[#6B7280]"
                  placeholder="Россия"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#D1D5DB] mb-2">
                  Год основания
                </label>
                <input
                  v-model.number="providerForm.founded_year"
                  type="number"
                  min="1900"
                  max="2024"
                  class="w-full px-4 py-3 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-all placeholder-[#6B7280]"
                  placeholder="2010"
                />
              </div>
            </div>

            <div class="flex items-center space-x-6">
              <label class="flex items-center space-x-3 cursor-pointer group">
                <input
                  v-model="providerForm.is_active"
                  type="checkbox"
                  class="w-5 h-5 text-[#63F3AB] bg-[#1B1E26]/50 border-[#353A4A] rounded focus:ring-[#63F3AB] focus:ring-2 transition-all"
                />
                <span class="text-[#D1D5DB] group-hover:text-white transition-colors">Активен</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer group">
                <input
                  v-model="providerForm.is_featured"
                  type="checkbox"
                  class="w-5 h-5 text-[#CD0F8B] bg-[#1B1E26]/50 border-[#353A4A] rounded focus:ring-[#CD0F8B] focus:ring-2 transition-all"
                />
                <span class="text-[#D1D5DB] group-hover:text-white transition-colors">Рекомендуемый</span>
              </label>
            </div>

            <div
              class="flex items-center justify-end space-x-4 pt-6 border-t border-[#353A4A]"
            >
              <button
                type="button"
                @click="closeModal"
                class="px-6 py-3 border border-[#353A4A] text-[#9CA3AF] hover:text-white hover:border-[#FF6E48]/50 rounded-lg transition-all hover:bg-[#353A4A]/30"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-6 py-3 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {{
                  saving
                    ? 'Сохранение...'
                    : showAddModal
                      ? 'Добавить'
                      : 'Сохранить'
                }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-gray-900 border border-red-500/30 rounded-xl max-w-md w-full"
      >
        <div class="p-6">
          <div class="text-center">
            <div class="text-6xl mb-4">⚠️</div>
            <h2 class="text-2xl font-bold text-white mb-4">
              Подтвердите удаление
            </h2>
            <p class="text-gray-300 mb-6">
              Вы уверены, что хотите удалить провайдера
              <strong>"{{ providerToDelete?.name }}"</strong>? Это действие
              нельзя отменить.
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
const {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider: deleteProviderApi,
} = useProviders()

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

// Form data
const providerForm = ref({
  name: '',
  slug: '',
  description: '',
  website: '',
  logo_url: '',
  country: '',
  founded_year: null,
  is_active: true,
  is_featured: false,
})

// Computed properties
const filteredProviders = computed(() => {
  let filtered = providers.value

  if (searchQuery.value) {
    filtered = filtered.filter((provider) =>
      provider.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  if (selectedStatus.value !== '') {
    const isActive = selectedStatus.value === 'true'
    filtered = filtered.filter((provider) => provider.is_active === isActive)
  }

  return filtered
})

const totalProviders = computed(() => providers.value.length)
const activeProviders = computed(
  () => providers.value.filter((provider) => provider.is_active).length,
)
const totalSlots = computed(() =>
  providers.value.reduce(
    (sum, provider) => sum + (provider.slots_count || 0),
    0,
  ),
)

// Methods
const loadProviders = async () => {
  try {
    loading.value = true
    const response = await getProviders()
    providers.value = response || []
  } catch (error) {
    console.error('Ошибка загрузки провайдеров:', error)
    providers.value = []
  } finally {
    loading.value = false
  }
}

const refreshProviders = () => {
  loadProviders()
}

const editProvider = (provider) => {
  providerForm.value = { ...provider }
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
    providers.value = providers.value.filter(
      (provider) => provider.id !== providerToDelete.value.id,
    )
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
    const index = providers.value.findIndex((p) => p.id === provider.id)
    if (index !== -1) {
      providers.value[index] = updatedProvider
    }
  } catch (error) {
    console.error('Ошибка изменения статуса провайдера:', error)
    alert('Ошибка при изменении статуса провайдера')
  }
}

const saveProvider = async () => {
  try {
    saving.value = true

    if (showAddModal.value) {
      const newProvider = await createProvider(providerForm.value)
      providers.value.push(newProvider)
    } else {
      const updatedProvider = await updateProvider(
        providerForm.value.id,
        providerForm.value,
      )
      const index = providers.value.findIndex(
        (provider) => provider.id === providerForm.value.id,
      )
      if (index !== -1) {
        providers.value[index] = updatedProvider
      }
    }

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
    slug: '',
    description: '',
    website: '',
    logo_url: '',
    country: '',
    founded_year: null,
    is_active: true,
    is_featured: false,
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Не указано'
  return new Date(dateString).toLocaleDateString('ru-RU')
}

// Auto-generate slug from name
watch(
  () => providerForm.value.name,
  (newName) => {
    if (showAddModal.value && newName) {
      providerForm.value.slug = newName
        .toLowerCase()
        .replace(/[^a-z0-9а-я]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    }
  },
)

// Load data on mount
onMounted(() => {
  loadProviders()
})

// Page meta
useHead({
  title: 'Управление провайдерами - SlotQuest Admin',
  meta: [
    {
      name: 'description',
      content: 'Управление провайдерами игровых автоматов',
    },
  ],
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
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
