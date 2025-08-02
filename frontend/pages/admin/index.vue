<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Header -->
    <header class="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <div class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              🎰 SlotQuest Admin
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-300">Добро пожаловать, Администратор</span>
            <button class="p-2 text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Dashboard Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-cyan-400 text-sm font-medium">Всего слотов</p>
              <p class="text-3xl font-bold text-white">{{ totalSlots }}</p>
            </div>
            <div class="text-cyan-400 text-3xl">🎰</div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-400 text-sm font-medium">Активных слотов</p>
              <p class="text-3xl font-bold text-white">{{ activeSlots }}</p>
            </div>
            <div class="text-green-400 text-3xl">✅</div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-400 text-sm font-medium">Провайдеров</p>
              <p class="text-3xl font-bold text-white">{{ totalProviders }}</p>
            </div>
            <div class="text-purple-400 text-3xl">🏢</div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-orange-400 text-sm font-medium">Средний RTP</p>
              <p class="text-3xl font-bold text-white">{{ averageRTP }}%</p>
            </div>
            <div class="text-orange-400 text-3xl">📊</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-gray-900/50 border border-gray-700 rounded-xl p-6 mb-8">
        <h2 class="text-xl font-bold text-white mb-4">Быстрые действия</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink to="/admin/slots" class="group">
            <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-400/40 transition-all group-hover:scale-105">
              <div class="text-cyan-400 text-2xl mb-2">🎰</div>
              <div class="text-white font-medium">Добавить слот</div>
              <div class="text-gray-400 text-sm">Новый игровой автомат</div>
            </div>
          </NuxtLink>
          
          <NuxtLink to="/admin/providers" class="group">
            <div class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 hover:border-purple-400/40 transition-all group-hover:scale-105">
              <div class="text-purple-400 text-2xl mb-2">🏢</div>
              <div class="text-white font-medium">Добавить провайдера</div>
              <div class="text-gray-400 text-sm">Новый поставщик игр</div>
            </div>
          </NuxtLink>
          
          <NuxtLink to="/admin/news" class="group">
            <div class="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4 hover:border-green-400/40 transition-all group-hover:scale-105">
              <div class="text-green-400 text-2xl mb-2">📰</div>
              <div class="text-white font-medium">Создать новость</div>
              <div class="text-gray-400 text-sm">Новая статья</div>
            </div>
          </NuxtLink>
          
          <NuxtLink to="/admin/bonuses" class="group">
            <div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4 hover:border-orange-400/40 transition-all group-hover:scale-105">
              <div class="text-orange-400 text-2xl mb-2">🎁</div>
              <div class="text-white font-medium">Добавить бонус</div>
              <div class="text-gray-400 text-sm">Новое предложение</div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Admin Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Content Management -->
        <div class="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
          <h2 class="text-xl font-bold text-white mb-6 flex items-center">
            <span class="text-2xl mr-3">📝</span>
            Управление контентом
          </h2>
          <div class="space-y-3">
            <NuxtLink to="/admin/slots" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">🎰</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Слоты</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/categories" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">📂</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Категории</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/providers" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">🏢</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Провайдеры</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/features" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">⚙️</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Механики</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/themes" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">🎨</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Темы</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
          </div>
        </div>

        <!-- User & Community Management -->
        <div class="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
          <h2 class="text-xl font-bold text-white mb-6 flex items-center">
            <span class="text-2xl mr-3">👥</span>
            Пользователи и сообщество
          </h2>
          <div class="space-y-3">
            <NuxtLink to="/admin/users" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">👤</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Пользователи</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/reviews" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">⭐</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Отзывы</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/news" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">📰</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Новости</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/bonuses" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">🎁</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Бонусы</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/casinos" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">🏛️</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Казино</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Marketing & Analytics -->
        <div class="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
          <h2 class="text-xl font-bold text-white mb-6 flex items-center">
            <span class="text-2xl mr-3">📈</span>
            Маркетинг и аналитика
          </h2>
          <div class="space-y-3">
            <NuxtLink to="/admin/marketing/dashboard" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">📊</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Дашборд аналитики</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/marketing/page-views" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">👁️</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Просмотры страниц</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/marketing/slot-interests" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">🎯</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Интерес к слотам</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/marketing/user-activity" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">🔥</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Активность пользователей</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
          </div>
        </div>

        <!-- SEO & Settings -->
        <div class="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
          <h2 class="text-xl font-bold text-white mb-6 flex items-center">
            <span class="text-2xl mr-3">🔧</span>
            SEO и настройки
          </h2>
          <div class="space-y-3">
            <NuxtLink to="/admin/seo/global-settings" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">🌐</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Общие настройки SEO</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/seo/meta-management" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">🏷️</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Мета-теги</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/seo/sitemap" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">🗺️</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Sitemap</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/settings" class="flex items-center justify-between p-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <span class="text-xl">⚙️</span>
                <span class="text-white group-hover:text-cyan-400 transition-colors">Настройки сайта</span>
              </div>
              <span class="text-gray-400 group-hover:text-white transition-colors">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Composables
const { getSlots } = useSlotsApi()
const { getProviders } = useProviders()

// Reactive data
const slots = ref([])
const providers = ref([])
const loading = ref(true)

// Computed properties
const totalSlots = computed(() => slots.value.length)
const totalProviders = computed(() => new Set(slots.value.map(slot => slot.provider_id)).size)
const activeSlots = computed(() => slots.value.filter(slot => slot.is_active).length)
const averageRTP = computed(() => {
  const rtpSlots = slots.value.filter(slot => slot.rtp)
  if (rtpSlots.length === 0) return 0
  const sum = rtpSlots.reduce((acc, slot) => acc + parseFloat(slot.rtp), 0)
  return (sum / rtpSlots.length).toFixed(1)
})

// Methods
const loadData = async () => {
  try {
    loading.value = true
    const [slotsResponse, providersResponse] = await Promise.all([
      getSlots({ admin: true }),
      getProviders()
    ])
    slots.value = slotsResponse || []
    providers.value = providersResponse || []
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  } finally {
    loading.value = false
  }
}

// Load data on mount
onMounted(() => {
  loadData()
})

// Page meta
useHead({
  title: 'SlotQuest Admin - Главная панель',
  meta: [
    { name: 'description', content: 'Административная панель SlotQuest - управление контентом, пользователями и аналитикой' }
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
</style>