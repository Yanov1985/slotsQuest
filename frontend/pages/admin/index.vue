<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white font-sans">
    <!-- Header -->
    <header class="relative bg-[#161A21]/80 backdrop-blur-sm border-b border-[#353A4A] sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <div class="text-2xl font-bold font-display bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] bg-clip-text text-transparent flex items-center space-x-2">
              <Icon name="heroicons:squares-2x2" class="text-[#FF6E48]" />
              <span>SlotQuest Admin</span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-[#E5E7EB] font-medium">Добро пожаловать, Администратор</span>
            <button class="p-2 text-[#A0AABE] hover:text-[#FF6E48] transition-colors">
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
        <div class="bg-gradient-to-r from-[#FF6E48]/10 to-[#CD5A3C]/10 border border-[#FF6E48]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#FF6E48] text-sm font-semibold">Всего слотов</p>
              <p class="text-3xl font-bold text-white">{{ totalSlots }}</p>
            </div>
            <Icon name="heroicons:squares-2x2" class="text-[#FF6E48] text-3xl" />
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-[#63F3AB]/10 to-[#51C58B]/10 border border-[#63F3AB]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#63F3AB] text-sm font-semibold">Активных слотов</p>
              <p class="text-3xl font-bold text-white">{{ activeSlots }}</p>
            </div>
            <Icon name="heroicons:check-circle" class="text-[#63F3AB] text-3xl" />
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-[#CD0F8B]/10 to-[#CD0F8B]/10 border border-[#CD0F8B]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#CD0F8B] text-sm font-semibold">Провайдеров</p>
              <p class="text-3xl font-bold text-white">{{ totalProviders }}</p>
            </div>
            <Icon name="heroicons:building-office" class="text-[#CD0F8B] text-3xl" />
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-[#00EDFF]/10 to-[#01BFCF]/10 border border-[#00EDFF]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#00EDFF] text-sm font-semibold">Средний RTP</p>
              <p class="text-3xl font-bold text-white">{{ averageRTP }}%</p>
            </div>
            <Icon name="heroicons:chart-bar" class="text-[#00EDFF] text-3xl" />
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6 mb-8">
        <h2 class="text-xl font-bold font-display text-white mb-4">Быстрые действия</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink to="/admin/slots" class="group">
            <div class="bg-gradient-to-r from-[#FF6E48]/10 to-[#CD5A3C]/10 border border-[#FF6E48]/20 rounded-lg p-4 hover:border-[#FF6E48]/40 transition-all group-hover:scale-105">
              <Icon name="heroicons:squares-2x2" class="text-[#FF6E48] text-2xl mb-2" />
              <div class="text-white font-semibold">Добавить слот</div>
              <div class="text-[#9CA3AF] text-sm">Новый игровой автомат</div>
            </div>
          </NuxtLink>
          
          <NuxtLink to="/admin/providers" class="group">
            <div class="bg-gradient-to-r from-[#CD0F8B]/10 to-[#CD0F8B]/10 border border-[#CD0F8B]/20 rounded-lg p-4 hover:border-[#CD0F8B]/40 transition-all group-hover:scale-105">
              <Icon name="heroicons:building-office" class="text-[#CD0F8B] text-2xl mb-2" />
              <div class="text-white font-semibold">Добавить провайдера</div>
              <div class="text-[#9CA3AF] text-sm">Новый поставщик игр</div>
            </div>
          </NuxtLink>
          
          <NuxtLink to="/admin/news" class="group">
            <div class="bg-gradient-to-r from-[#63F3AB]/10 to-[#51C58B]/10 border border-[#63F3AB]/20 rounded-lg p-4 hover:border-[#63F3AB]/40 transition-all group-hover:scale-105">
              <Icon name="heroicons:newspaper" class="text-[#63F3AB] text-2xl mb-2" />
              <div class="text-white font-semibold">Создать новость</div>
              <div class="text-[#9CA3AF] text-sm">Новая статья</div>
            </div>
          </NuxtLink>
          
          <NuxtLink to="/admin/bonuses" class="group">
            <div class="bg-gradient-to-r from-[#00EDFF]/10 to-[#01BFCF]/10 border border-[#00EDFF]/20 rounded-lg p-4 hover:border-[#00EDFF]/40 transition-all group-hover:scale-105">
              <Icon name="heroicons:gift" class="text-[#00EDFF] text-2xl mb-2" />
              <div class="text-white font-semibold">Добавить бонус</div>
              <div class="text-[#9CA3AF] text-sm">Новое предложение</div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Admin Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Content Management -->
        <div class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6">
          <h2 class="text-xl font-bold font-display text-white mb-6 flex items-center">
            <Icon name="heroicons:document-text" class="text-[#FF6E48] text-2xl mr-3" />
            Управление контентом
          </h2>
          <div class="space-y-3">
            <NuxtLink to="/admin/slots" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:squares-2x2" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Слоты</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/categories" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:folder" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Категории</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/providers" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:building-office" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Провайдеры</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/features" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:cog-6-tooth" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Механики</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/themes" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:paint-brush" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Темы</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
          </div>
        </div>

        <!-- User & Community Management -->
        <div class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6">
          <h2 class="text-xl font-bold font-display text-white mb-6 flex items-center">
            <Icon name="heroicons:users" class="text-[#FF6E48] text-2xl mr-3" />
            Пользователи и сообщество
          </h2>
          <div class="space-y-3">
            <NuxtLink to="/admin/users" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:user" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Пользователи</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/reviews" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:star" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Отзывы</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/news" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:newspaper" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Новости</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/bonuses" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:gift" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Бонусы</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/casinos" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:building-library" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Казино</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Marketing & Analytics -->
        <div class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6">
          <h2 class="text-xl font-bold font-display text-white mb-6 flex items-center">
            <Icon name="heroicons:chart-bar" class="text-[#FF6E48] text-2xl mr-3" />
            Маркетинг и аналитика
          </h2>
          <div class="space-y-3">
            <NuxtLink to="/admin/marketing/dashboard" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:chart-bar-square" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Дашборд аналитики</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/marketing/page-views" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:eye" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Просмотры страниц</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/marketing/slot-interests" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:cursor-arrow-rays" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Интерес к слотам</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/marketing/user-activity" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:fire" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Активность пользователей</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/analytics/pages" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:eye" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Просмотры страниц</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/analytics/slots" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:cursor-arrow-rays" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Интерес к слотам</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/analytics/users" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:fire" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Активность пользователей</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
          </div>
        </div>

        <!-- SEO & Settings -->
        <div class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6">
          <h2 class="text-xl font-bold font-display text-white mb-6 flex items-center">
            <Icon name="heroicons:wrench-screwdriver" class="text-[#FF6E48] text-2xl mr-3" />
            SEO и настройки
          </h2>
          <div class="space-y-3">
            <NuxtLink to="/admin/seo/global-settings" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:globe-alt" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Общие настройки SEO</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/seo/meta-management" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:tag" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Мета-теги</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/seo/sitemap" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:map" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Sitemap</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>
            
            <NuxtLink to="/admin/settings" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:cog-6-tooth" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Настройки сайта</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
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