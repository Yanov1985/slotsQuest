<template>
  <div class="min-h-screen bg-gradient-to-br from-[#05070D] via-[#111827] to-[#1F2937] text-white font-sans relative overflow-hidden">
    <!-- Декоративные градиентные пятна фона -->
    <div class="pointer-events-none absolute -top-36 -left-28 h-96 w-96 rounded-full bg-[#FF6E48]/20 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-44 -right-28 h-[32rem] w-[32rem] rounded-full bg-[#00EDFF]/15 blur-3xl"></div>

    <div class="relative z-10">
    <!-- Header -->
    <header class="bg-[#161A21]/80 backdrop-blur-sm border-b border-[#353A4A] sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 sm:h-16 sm:py-0">
          <div class="flex items-center gap-3 min-w-0">
            <div class="text-xl sm:text-2xl font-bold font-display bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] bg-clip-text text-transparent flex items-center gap-2 min-w-0">
              <Icon name="heroicons:squares-2x2" class="text-[#FF6E48]" />
              <span class="truncate">Admin Dashboard</span>
            </div>
          </div>
          <div class="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <span class="hidden md:inline text-[#E5E7EB] font-medium">Добро пожаловать, Администратор</span>
            <button @click="handleLogout" class="p-2 text-[#A0AABE] hover:text-[#FF6E48] transition-colors">
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

            <NuxtLink to="/admin/homepage" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:home" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Главная страница</span>
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

            <NuxtLink to="/admin/blogs" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:document-text" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Блоги</span>
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


          </div>
        </div>

        <!-- SEO & Settings -->
        <div class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6">
          <h2 class="text-xl font-bold font-display text-white mb-6 flex items-center">
            <Icon name="heroicons:wrench-screwdriver" class="text-[#FF6E48] text-2xl mr-3" />
            SEO и настройки
          </h2>
          <div class="space-y-3">
            <NuxtLink to="/sitemap_index.xml" target="_blank" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:map" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Sitemap</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>

            <NuxtLink to="/admin/homepage?tab=affiliate" class="flex items-center justify-between p-3 bg-[#1B1E26]/50 hover:bg-[#1B1E26] rounded-lg transition-colors group">
              <div class="flex items-center space-x-3">
                <Icon name="solar:money-bag-bold" class="text-[#FF6E48] text-xl" />
                <span class="text-[#E5E7EB] group-hover:text-[#FF6E48] transition-colors font-medium">Партнерская ссылка</span>
              </div>
              <span class="text-[#9CA3AF] group-hover:text-[#E5E7EB] transition-colors">→</span>
            </NuxtLink>

          </div>
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
const { logout } = useAdminAuth()

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

// Logout from admin area and redirect to login page
const handleLogout = async () => {
  logout()
  await navigateTo('/admin/login')
}

// Load data on mount
onMounted(() => {
  loadData()
})

// Page meta
useHead({
  title: 'Admin - Dashboard',
  meta: [
    { name: 'description', content: 'Administrative panel for content, users, and analytics management' }
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
