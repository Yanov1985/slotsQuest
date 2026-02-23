<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20">
      <!-- Background Effects -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-12">
          <h1 class="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center justify-center gap-4">
            <Icon name="solar:gamepad-bold-duotone" class="text-cyan-400 w-16 h-16 md:w-20 md:h-20" /> Каталог слотов
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Откройте для себя мир захватывающих игровых автоматов от лучших провайдеров
          </p>
          <div class="mt-8 flex justify-center items-center space-x-6 text-gray-400">
            <div class="flex items-center space-x-2">
              <Icon name="solar:gamepad-bold" class="text-2xl text-cyan-400" />
              <span class="font-medium">{{ slots?.length || 0 }} игр</span>
            </div>
            <div class="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div class="flex items-center space-x-2">
              <Icon name="solar:buildings-bold" class="text-2xl text-purple-400" />
              <span class="font-medium">{{ providers?.length || 0 }} провайдеров</span>
            </div>
            <div class="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div class="flex items-center space-x-2">
              <Icon name="solar:folder-2-bold" class="text-2xl text-pink-400" />
              <span class="font-medium">{{ categories?.length || 0 }} категорий</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="container mx-auto px-4 mb-12">
      <div class="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-3xl border border-cyan-500/20 p-8">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
          <Icon name="solar:magnifer-bold" class="text-3xl text-cyan-400 mr-3" />
          Поиск и фильтры
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Поиск -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск по названию..."
              class="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
            >
            <Icon name="solar:magnifer-bold" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          <!-- Провайдер -->
          <div class="relative">
            <select
              v-model="selectedProvider"
              class="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="" class="bg-gray-800">Все провайдеры</option>
              <option
                v-for="provider in providers"
                :key="provider.id"
                :value="provider.id"
                class="bg-gray-800"
              >
                {{ provider.name || 'Провайдер' }}
              </option>
            </select>
            <Icon name="solar:buildings-bold" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <Icon name="solar:alt-arrow-down-bold" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
          </div>

          <!-- Категория -->
          <div class="relative">
            <select
              v-model="selectedCategory"
              class="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="" class="bg-gray-800">Все категории</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                class="bg-gray-800"
              >
                {{ category.name || 'Категория' }}
              </option>
            </select>
            <Icon name="solar:folder-2-bold" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <Icon name="solar:alt-arrow-down-bold" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
          </div>

          <!-- Сортировка -->
          <div class="relative">
            <select
              v-model="sortBy"
              class="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
            >
              <option value="name" class="bg-gray-800">По названию</option>
              <option value="rtp" class="bg-gray-800">По RTP</option>
              <option value="provider" class="bg-gray-800">По провайдеру</option>
              <option value="newest" class="bg-gray-800">Новые</option>
            </select>
            <Icon name="solar:bolt-bold" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <Icon name="solar:alt-arrow-down-bold" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-5 h-5" />
          </div>
        </div>

        <!-- Быстрые фильтры -->
        <div class="mt-6 flex flex-wrap gap-3">
          <button
            @click="clearFilters"
            class="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 rounded-lg transition-all duration-300 text-sm font-medium flex items-center gap-2"
          >
            <Icon name="solar:trash-bin-trash-bold" class="w-4 h-4" /> Очистить фильтры
          </button>
          <button
            @click="selectedCategory = 'popular'"
            class="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 text-yellow-300 border border-yellow-500/30 rounded-lg transition-all duration-300 text-sm font-medium flex items-center gap-2"
          >
            <Icon name="solar:fire-bold" class="w-4 h-4" /> Популярные
          </button>
          <button
            @click="selectedCategory = 'new'"
            class="px-4 py-2 bg-gradient-to-r from-green-500/20 to-cyan-500/20 hover:from-green-500/30 hover:to-cyan-500/30 text-green-300 border border-green-500/30 rounded-lg transition-all duration-300 text-sm font-medium flex items-center gap-2"
          >
            <Icon name="solar:star-fall-bold" class="w-4 h-4" /> Новинки
          </button>
          <button
            @click="sortBy = 'rtp'"
            class="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-300 border border-purple-500/30 rounded-lg transition-all duration-300 text-sm font-medium flex items-center gap-2"
          >
            <Icon name="solar:dollar-bold" class="w-4 h-4" /> Высокий RTP
          </button>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section class="container mx-auto px-4 pb-20">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block relative">
          <div class="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <div class="absolute inset-0 w-20 h-20 border-4 border-purple-500/30 border-b-purple-500 rounded-full animate-spin animate-reverse"></div>
        </div>
        <p class="mt-6 text-xl text-gray-300 font-medium flex items-center justify-center gap-2">
          <Icon name="solar:refresh-circle-bold" class="w-7 h-7 text-cyan-400 animate-spin" />
          Загружаем лучшие слоты...
        </p>
        <p class="mt-2 text-gray-400">Подготавливаем для вас захватывающие игры</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div class="text-8xl mb-6">
          <Icon name="solar:sad-face-bold" class="text-red-400 mx-auto" />
        </div>
        <h3 class="text-2xl font-bold text-white mb-4">Упс! Что-то пошло не так</h3>
        <p class="text-gray-400 mb-8">{{ error }}</p>
        <button
          @click="loadData"
          class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
        >
          <Icon name="solar:refresh-circle-bold" /> Попробовать снова
        </button>
      </div>

      <!-- Slots Grid -->
      <div v-else>
        <!-- Results Header -->
        <div class="flex justify-between items-center mb-8">
          <div class="text-white">
            <h3 class="text-2xl font-bold mb-2">Найдено игр: {{ filteredSlots?.length || 0 }}</h3>
            <p class="text-gray-400">{{ getFilterDescription() }}</p>
          </div>

          <div class="flex items-center space-x-4">
            <button
              @click="viewMode = 'grid'"
              :class="viewMode === 'grid' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-gray-700 text-gray-300'"
              class="p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center"
              aria-label="Grid view"
            >
              <Icon name="solar:widget-3-bold" class="w-6 h-6" />
            </button>
            <button
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-gray-700 text-gray-300'"
              class="p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center"
              aria-label="List view"
            >
              <Icon name="solar:list-bold" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div
            v-for="(slot, index) in filteredSlots"
            :key="slot.id"
            class="group relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 ease-out transform-gpu will-change-transform hover:shadow-2xl hover:shadow-cyan-500/20 lg:hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <!-- Slot Image/Icon -->
            <div class="relative aspect-video bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/40"></div>
              <div class="relative z-10 text-6xl font-black text-white/80 group-hover:scale-110 transition-transform duration-500">
                <Icon name="solar:gamepad-bold-duotone" />
              </div>

              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span class="text-white font-bold text-lg">{{ slot.name || 'Слот' }}</span>
              </div>

              <!-- RTP Badge -->
              <div class="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
                {{ slot.rtp }}% RTP
              </div>
            </div>

            <!-- Slot Info -->
            <div class="p-6">
              <div class="mb-4">
                <h3 class="font-bold text-xl text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-1">
                  {{ slot.name || 'Слот' }}
                </h3>
                <p class="text-gray-400 text-sm mb-1 flex items-center">
                  <Icon name="solar:buildings-bold-duotone" class="w-4 h-4 mr-1.5" />
                  {{ slot.providers?.name || 'Provider' }}
                </p>
                <p class="text-gray-400 text-xs flex items-center">
                  <Icon name="solar:folder-2-bold-duotone" class="w-4 h-4 mr-1.5" />
                  {{ slot.slot_categories?.name || slot.category?.name || 'Category' }}
                </p>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-2 gap-4 mb-6 text-xs">
                <div class="text-center p-3 bg-gray-800/50 rounded-lg">
                  <div class="text-gray-400 mb-1">Волатильность</div>
                  <div class="font-bold text-cyan-400">{{ slot.volatility || 'Средняя' }}</div>
                </div>
                <div class="text-center p-3 bg-gray-800/50 rounded-lg">
                  <div class="text-gray-400 mb-1">Макс. выигрыш</div>
                  <div class="font-bold text-green-400">{{ slot.max_win || '5000x' }}</div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex space-x-3">
                <NuxtLink
                  :to="`/slots/${slot.slug}`"
                  class="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 text-center"
                >
                  <Icon name="solar:document-text-bold" class="w-4 h-4" /> Подробнее
                </NuxtLink>
                <button class="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-sm font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30">
                  <Icon name="solar:play-bold" class="w-4 h-4" /> Играть
                </button>
              </div>
            </div>

            <!-- Corner Decorations -->
            <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-400/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <div
            v-for="slot in filteredSlots"
            :key="slot.id"
            class="group bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-6">
                <div class="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-3xl text-cyan-400">
                  <Icon name="solar:gamepad-bold-duotone" />
                </div>
                <div>
                  <h3 class="font-bold text-xl text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {{ slot.name || 'Слот' }}
                  </h3>
                  <p class="text-gray-400 text-sm">{{ slot.providers?.name }} • {{ slot.slot_categories?.name || slot.category?.name }}</p>
                  <div class="flex items-center space-x-4 mt-2 text-xs">
                    <span class="text-green-400 font-medium">RTP: {{ slot.rtp }}%</span>
                    <span class="text-gray-400">{{ slot.volatility }}</span>
                    <span class="text-purple-400">Макс: {{ slot.max_win || '5000x' }}</span>
                  </div>
                </div>
              </div>

              <div class="flex space-x-3">
                <NuxtLink
                  :to="`/slots/${slot.slug}`"
                  class="px-6 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Icon name="solar:document-text-bold" /> Подробнее
                </NuxtLink>
                <button class="px-6 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
                  <Icon name="solar:play-bold" /> Играть
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="(filteredSlots?.length || 0) === 0" class="text-center py-20">
          <div class="text-8xl mb-6">
            <Icon name="solar:magnifer-bold" class="text-gray-600 mx-auto" />
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">Слоты не найдены</h3>
          <p class="text-gray-400 mb-8">Попробуйте изменить параметры поиска или очистить фильтры</p>
          <button
            @click="clearFilters"
            class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
          >
            <Icon name="solar:trash-bin-trash-bold" /> Очистить фильтры
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Load data using the same approach as homepage
const { getSlots } = useSlotsApi()
const { getProviders } = useProviders()

// Load data exactly like on homepage
const { data: slots, pending: slotsLoading, error: slotsError, refresh: refreshSlots } = await useLazyAsyncData('catalog-slots', () => getSlots())
const { data: providers, pending: providersLoading, error: providersError } = await useLazyAsyncData('catalog-providers', () => getProviders())
const { data: categories, pending: categoriesLoading, error: categoriesError } = await useLazyAsyncData('catalog-categories', async () => {
  const config = useRuntimeConfig()
  const response = await $fetch(`${config.public.apiUrl}/api/categories`)
  return response
})

// Reactive data
const selectedProvider = ref('')
const selectedCategory = ref('')
const searchQuery = ref('')
const sortBy = ref('name')
const viewMode = ref('grid')

// Computed loading and error states
const loading = computed(() => slotsLoading.value || providersLoading.value || categoriesLoading.value)
const error = computed(() => {
  if (slotsError.value) return slotsError.value
  if (providersError.value) return providersError.value
  if (categoriesError.value) return categoriesError.value
  return null
})

// Computed properties
const filteredSlots = computed(() => {
  if (!slots.value || !Array.isArray(slots.value)) {
    return []
  }

  let filtered = slots.value.filter(slot => {
    const providerMatch = !selectedProvider.value || slot.providers?.id === selectedProvider.value
    const categoryMatch = !selectedCategory.value || slot.category_id === selectedCategory.value
    const searchMatch = !searchQuery.value ||
      (slot.name || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (slot.providers?.name || '').toLowerCase().includes(searchQuery.value.toLowerCase())

    return providerMatch && categoryMatch && searchMatch
  })

  // Сортировка
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '')
      case 'rtp':
        return (b.rtp || 0) - (a.rtp || 0)
      case 'provider':
        return (a.providers?.name || '').localeCompare(b.providers?.name || '')
      case 'newest':
        return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      default:
        return 0
    }
  })

  return filtered
})

// Methods

const clearFilters = () => {
  selectedProvider.value = ''
  selectedCategory.value = ''
  searchQuery.value = ''
  sortBy.value = 'name'
}

const getFilterDescription = () => {
  const parts = []
  if (searchQuery.value) parts.push(`поиск: "${searchQuery.value}"`)
  if (selectedProvider.value && providers.value && Array.isArray(providers.value)) {
    const provider = providers.value.find(p => p.id === selectedProvider.value)
    if (provider) parts.push(`провайдер: ${provider.name || 'неизвестный'}`)
  }
  if (selectedCategory.value && categories.value && Array.isArray(categories.value)) {
    const category = categories.value.find(c => c.id === selectedCategory.value)
    if (category) parts.push(`категория: ${category.name || 'неизвестная'}`)
  }

  return parts.length > 0 ? parts.join(', ') : 'все слоты'
}

const getSlotEmoji = (name) => {
  if (!name || typeof name !== 'string') {
    return '🎰'
  }
  const emojis = ['🎰', '🎲', '🃏', '💎', '🍒', '🍋', '🍊', '🍇', '⭐', '💰', '🎯', '🎪', '🎭', '🎨', '🎵']
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % emojis.length
  return emojis[index]
}

// Lifecycle
// Data is loaded automatically via useLazyAsyncData

// SEO
useHead({
  title: 'Каталог слотов - SlotQuest',
  meta: [
    {
      name: 'description',
      content: 'Большой каталог игровых автоматов от лучших провайдеров. Найдите свой любимый слот и начните играть прямо сейчас!'
    }
  ]
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(6, 182, 212, 0.6);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-reverse {
  animation-direction: reverse;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Кастомные градиенты */
.bg-casino-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.bg-slot-gradient {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.bg-gold-gradient {
  background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
}

/* Эффекты при наведении */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Кастомные скроллбары */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #0891b2, #7c3aed);
}

/* Анимация появления карточек */
.slot-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.slot-card:nth-child(1) { animation-delay: 0.1s; }
.slot-card:nth-child(2) { animation-delay: 0.2s; }
.slot-card:nth-child(3) { animation-delay: 0.3s; }
.slot-card:nth-child(4) { animation-delay: 0.4s; }
.slot-card:nth-child(5) { animation-delay: 0.5s; }
.slot-card:nth-child(6) { animation-delay: 0.6s; }
.slot-card:nth-child(7) { animation-delay: 0.7s; }
.slot-card:nth-child(8) { animation-delay: 0.8s; }

/* Эффект стекла */
.glass-effect {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Неоновые эффекты */
.neon-cyan {
  text-shadow: 0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 30px #06b6d4;
}

.neon-purple {
  text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;
}

.neon-pink {
  text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899;
}

/* Адаптивность */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .filter-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .slot-grid {
    grid-template-columns: 1fr;
  }

  .filter-section {
    padding: 1rem;
  }
}
</style>
