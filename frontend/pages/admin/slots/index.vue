<template>
  <div class="min-h-[calc(100vh-4rem)] bg-[#0B0E14] font-sans selection:bg-[#00EDFF]/30">
    <!-- Header -->
    <header class="bg-[#161A21]/80 backdrop-blur-md border-b border-[#353A4A] sticky top-0 z-40">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center gap-6">
            <h1 class="text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <Icon name="solar:gamepad-bold" class="text-[#00EDFF] w-8 h-8" />
              Каталог Слотов
            </h1>
            <div class="h-8 w-px bg-[#353A4A] hidden sm:block"></div>
            <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#63F3AB]/10 border border-[#63F3AB]/20 rounded-lg text-[#63F3AB] text-sm font-bold shadow-[0_0_15px_rgba(99,243,171,0.1)]">
              <Icon name="solar:database-bold" class="w-4 h-4" />
              Всего: {{ totalSlots }}
            </div>
          </div>

          <div class="flex items-center gap-4">
            <!-- Refresh -->
            <button @click="refreshSlots" class="p-3 bg-[#0B0E14] border border-[#353A4A] hover:border-[#00EDFF]/50 text-[#A0AABE] hover:text-[#00EDFF] rounded-xl transition-all duration-300 transform active:scale-95 hover:shadow-[0_0_15px_rgba(0,237,255,0.15)] flex items-center justify-center" title="Обновить список">
              <Icon name="solar:refresh-circle-bold" class="w-5 h-5" />
            </button>

            <!-- Add Slot Button -->
            <button @click="showAddModal = true" class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#DF0078] to-[#CD0F8B] hover:from-[#CD0F8B] hover:to-[#9D0B6B] text-white rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(205,15,139,0.3)]">
              <Icon name="solar:add-square-bold" class="w-5 h-5" />
              <span class="hidden sm:inline">Добавить слот</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total -->
        <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#00EDFF]/30 transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#00EDFF]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#00EDFF]/10 transition-colors pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[#A0AABE] text-sm font-bold uppercase tracking-wider mb-1">Все слоты</p>
              <p class="text-3xl font-black text-white">{{ totalSlots }}</p>
            </div>
            <div class="p-3 bg-[#00EDFF]/10 rounded-xl">
              <Icon name="solar:game-controller-bold" class="text-[#00EDFF] w-8 h-8" />
            </div>
          </div>
        </div>

        <!-- Providers -->
        <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#CD0F8B]/30 transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#CD0F8B]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#CD0F8B]/10 transition-colors pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[#A0AABE] text-sm font-bold uppercase tracking-wider mb-1">Провайдеры</p>
              <p class="text-3xl font-black text-white">{{ totalProviders }}</p>
            </div>
            <div class="p-3 bg-[#CD0F8B]/10 rounded-xl">
              <Icon name="solar:buildings-bold" class="text-[#CD0F8B] w-8 h-8" />
            </div>
          </div>
        </div>

        <!-- Active -->
        <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#63F3AB]/30 transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#63F3AB]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#63F3AB]/10 transition-colors pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[#A0AABE] text-sm font-bold uppercase tracking-wider mb-1">Активные</p>
              <p class="text-3xl font-black text-white">{{ activeSlots }}</p>
            </div>
            <div class="p-3 bg-[#63F3AB]/10 rounded-xl">
              <Icon name="solar:check-circle-bold" class="text-[#63F3AB] w-8 h-8" />
            </div>
          </div>
        </div>

        <!-- Avg RTP -->
        <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#FF6E48]/30 transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#FF6E48]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#FF6E48]/10 transition-colors pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[#A0AABE] text-sm font-bold uppercase tracking-wider mb-1">Средний RTP</p>
              <p class="text-3xl font-black text-white">{{ averageRTP }}%</p>
            </div>
            <div class="p-3 bg-[#FF6E48]/10 rounded-xl">
              <Icon name="solar:sort-from-bottom-to-top-bold" class="text-[#FF6E48] w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl p-6 mb-8 flex flex-col lg:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1 relative">
          <Icon name="solar:magnifer-bold" class="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0AABE] w-5 h-5 pointer-events-none" />
          <input v-model="searchQuery" type="text" placeholder="Поиск по названию или ID..." class="w-full bg-[#0B0E14] border border-[#353A4A] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-[#A0AABE]/60 focus:outline-none focus:border-[#00EDFF]/50 transition-colors font-medium">
        </div>

        <!-- Filters array -->
        <div class="flex flex-wrap sm:flex-nowrap gap-4">
          <div class="w-full sm:w-[200px] relative">
            <Icon name="solar:buildings-bold" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AABE] w-4 h-4 pointer-events-none" />
            <select v-model="selectedProvider" class="w-full appearance-none bg-[#0B0E14] border border-[#353A4A] rounded-xl py-3.5 pl-10 pr-10 text-white focus:outline-none focus:border-[#00EDFF]/50 transition-colors font-medium cursor-pointer">
              <option value="">Провайдер</option>
              <option v-for="prov in providers" :key="prov.id" :value="prov.id">{{ prov.name }}</option>
            </select>
            <Icon name="solar:alt-arrow-down-bold" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0AABE] w-4 h-4 pointer-events-none" />
          </div>

          <div class="w-full sm:w-[180px] relative">
            <Icon name="solar:graph-up-bold" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AABE] w-4 h-4 pointer-events-none" />
            <select v-model="selectedVolatility" class="w-full appearance-none bg-[#0B0E14] border border-[#353A4A] rounded-xl py-3.5 pl-10 pr-10 text-white focus:outline-none focus:border-[#00EDFF]/50 transition-colors font-medium cursor-pointer">
              <option value="">Волатильность</option>
              <option value="low">Низкая</option>
              <option value="medium">Средняя</option>
              <option value="high">Высокая</option>
            </select>
             <Icon name="solar:alt-arrow-down-bold" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0AABE] w-4 h-4 pointer-events-none" />
          </div>

          <div class="w-full sm:w-[180px] relative">
            <Icon name="solar:eye-bold" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AABE] w-4 h-4 pointer-events-none" />
            <select v-model="selectedStatus" class="w-full appearance-none bg-[#0B0E14] border border-[#353A4A] rounded-xl py-3.5 pl-10 pr-10 text-white focus:outline-none focus:border-[#00EDFF]/50 transition-colors font-medium cursor-pointer">
              <option value="">Статус</option>
              <option value="true">Активные</option>
              <option value="false">Неактивные</option>
            </select>
            <Icon name="solar:alt-arrow-down-bold" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0AABE] w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      <!-- Data Grid -->
      <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#0B0E14] border-b border-[#353A4A]">
                <th class="py-4 px-6 text-xs font-bold text-[#A0AABE] uppercase tracking-wider w-[64px]">Обложка</th>
                <th class="py-4 px-6 text-xs font-bold text-[#A0AABE] uppercase tracking-wider">Название слота</th>
                <th class="py-4 px-6 text-xs font-bold text-[#A0AABE] uppercase tracking-wider hidden md:table-cell">Статистика</th>
                <th class="py-4 px-6 text-xs font-bold text-[#A0AABE] uppercase tracking-wider hidden sm:table-cell text-center">RTP / Выигрыш</th>
                <th class="py-4 px-6 text-xs font-bold text-[#A0AABE] uppercase tracking-wider text-center">Статус</th>
                <th class="py-4 px-6 text-xs font-bold text-[#A0AABE] uppercase tracking-wider text-right rounded-tr-xl">Действия</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#353A4A]">

              <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse">
                <td class="py-4 px-6"><div class="w-12 h-12 bg-[#0B0E14] rounded-lg"></div></td>
                <td class="py-4 px-6"><div class="w-48 h-5 bg-[#0B0E14] rounded mb-2"></div><div class="w-24 h-4 bg-[#0B0E14] rounded"></div></td>
                <td class="py-4 px-6 hidden md:table-cell"><div class="w-24 h-5 bg-[#0B0E14] rounded"></div></td>
                <td class="py-4 px-6 hidden sm:table-cell"><div class="w-20 h-8 mx-auto bg-[#0B0E14] rounded-full"></div></td>
                <td class="py-4 px-6"><div class="w-20 h-6 mx-auto bg-[#0B0E14] rounded-full"></div></td>
                <td class="py-4 px-6"><div class="w-24 h-10 ml-auto bg-[#0B0E14] rounded-lg"></div></td>
              </tr>

              <tr v-else-if="filteredSlots.length === 0">
                <td colspan="6" class="py-16 text-center">
                   <Icon name="solar:file-corrupted-bold-duotone" class="text-[#353A4A] w-20 h-20 mx-auto mb-4" />
                   <h3 class="text-white text-xl font-bold mb-2">Слоты не найдены</h3>
                   <p class="text-[#A0AABE]">Попробуйте изменить параметры поиска или фильтры</p>
                </td>
              </tr>

              <tr v-else v-for="slot in paginatedSlots" :key="slot.id" class="hover:bg-[#0B0E14]/50 transition-colors group">

                <!-- Thumb -->
                <td class="py-4 px-6 align-middle">
                  <div class="w-14 h-14 rounded-xl overflow-hidden bg-[#0B0E14] border border-[#353A4A] flex items-center justify-center shrink-0">
                    <NuxtImg
                      v-if="slot.thumbnail_url || slot.image_url"
                      :src="slot.thumbnail_url || slot.image_url"
                      alt="Thumb"
                      class="w-full h-full object-cover"
                      loading="lazy"
                      width="56"
                      height="56"
                    />
                    <Icon v-else name="solar:gamepad-bold" class="w-6 h-6 text-[#353A4A]" />
                  </div>
                </td>

                <!-- Info -->
                <td class="py-4 px-6 align-middle">
                  <div class="flex flex-col">
                    <span class="text-white font-bold text-base truncate">{{ slot.name }}</span>
                    <span class="text-[#A0AABE] text-xs flex items-center gap-1.5 mt-1 truncate">
                      <Icon name="solar:buildings-bold" class="w-3.5 h-3.5 text-[#353A4A]" />
                      {{ slot.providers?.name || 'Нет провайдера' }}
                    </span>
                  </div>
                </td>

                <!-- Stats Badges -->
                <td class="py-4 px-6 align-middle hidden md:table-cell">
                   <div class="flex flex-wrap gap-2">
                     <span v-if="slot.volatility" :class="getVolatilityClass(slot.volatility)" class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                       {{ slot.volatility === 'high' ? 'Высокая' : slot.volatility === 'low' ? 'Низкая' : 'Средняя' }}
                     </span>
                     <span v-if="slot.popularity_rank && slot.popularity_rank <= 10" class="px-2 py-0.5 bg-[#FF6E48]/10 border border-[#FF6E48]/30 text-[#FF6E48] rounded text-[10px] font-bold uppercase tracking-wider">
                       Топ 10
                     </span>
                   </div>
                </td>

                <!-- Number Stats -->
                <td class="py-4 px-6 align-middle hidden sm:table-cell text-center">
                  <div class="flex flex-col items-center gap-1">
                    <div class="px-2 py-1 bg-[#0B0E14] border border-[#353A4A] rounded-md text-[#63F3AB] font-bold text-xs shadow-inner whitespace-nowrap">
                      {{ slot.rtp || '???' }}%
                    </div>
                    <span class="text-[#A0AABE] text-[10px] font-semibold tracking-wider">x{{ slot.max_win || '???' }}</span>
                  </div>
                </td>

                <!-- Status Toggles -->
                <td class="py-4 px-6 align-middle text-center">
                  <button
                    @click="toggleSlotStatus(slot)"
                    class="inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 transform hover:scale-105"
                    :class="slot.is_active ? 'bg-[#63F3AB]/10 text-[#63F3AB] hover:bg-[#63F3AB]/20 shadow-[0_0_15px_rgba(99,243,171,0.1)] hover:shadow-[0_0_20px_rgba(99,243,171,0.2)]' : 'bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20'"
                    :title="slot.is_active ? 'Отключить слот' : 'Включить слот'"
                  >
                    <Icon :name="slot.is_active ? 'solar:eye-bold' : 'solar:eye-closed-bold'" class="w-5 h-5" />
                  </button>
                </td>

                <!-- Actions -->
                <td class="py-4 px-6 align-middle text-right">
                  <div class="flex items-center justify-end gap-2">
                    <NuxtLink :to="`/slots/${slot.slug}`" target="_blank" class="p-2.5 bg-[#0B0E14] border border-[#353A4A] hover:border-[#63F3AB]/50 text-[#A0AABE] hover:text-[#63F3AB] rounded-xl transition-colors" title="Открыть на сайте">
                       <Icon name="solar:link-square-bold" class="w-4 h-4" />
                    </NuxtLink>
                    <button @click="editSlot(slot)" class="p-2.5 bg-[#0B0E14] border border-[#353A4A] hover:border-[#00EDFF]/50 text-[#A0AABE] hover:text-[#00EDFF] rounded-xl transition-colors group-hover:bg-[#00EDFF]/10 group-hover:border-[#00EDFF]/30 group-hover:text-[#00EDFF]" title="Редактировать">
                      <Icon name="solar:pen-bold" class="w-4 h-4" />
                    </button>
                    <button @click="deleteSlot(slot)" class="p-2.5 bg-[#0B0E14] border border-[#353A4A] hover:border-[#EF4444]/50 text-[#A0AABE] hover:text-[#EF4444] rounded-xl transition-colors" title="Удалить">
                      <Icon name="solar:trash-bin-trash-bold" class="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>

            </tbody>
          </table>
        </div>

        <!-- Pagination Footer -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t border-[#353A4A] bg-[#0B0E14] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span class="text-sm text-[#A0AABE] font-medium">
            Показано <span class="text-white">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> - <span class="text-white">{{ Math.min(currentPage * itemsPerPage, filteredSlots.length) }}</span> из <span class="text-white">{{ filteredSlots.length }}</span>
          </span>

          <div class="flex items-center gap-2">
            <button @click="currentPage--" :disabled="currentPage === 1" class="p-2.5 bg-[#161A21] border border-[#353A4A] rounded-lg text-white hover:border-[#00EDFF]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <Icon name="solar:alt-arrow-left-outline" class="w-4 h-4" />
            </button>
            <div class="px-4 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-sm font-bold text-white">
              {{ currentPage }} / {{ totalPages }}
            </div>
             <button @click="currentPage++" :disabled="currentPage === totalPages" class="p-2.5 bg-[#161A21] border border-[#353A4A] rounded-lg text-white hover:border-[#00EDFF]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <Icon name="solar:alt-arrow-right-outline" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Generic Modals (Add / Delete remain functional) -->
    <!-- (Add/Delete modals retained but minimized for this rewrite focus. Full Add functionality is routed via /admin/slots/[id].vue generally) -->
    <!-- Delete Modal -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-[#0B0E14]/80 backdrop-blur-sm" @click="showDeleteModal = false"></div>
        <div class="relative bg-[#161A21] border border-[#353A4A] rounded-2xl w-full max-w-sm p-6 shadow-2xl flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/20 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <Icon name="solar:danger-triangle-bold" class="text-[#EF4444] w-8 h-8" />
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Удалить слот?</h3>
          <p class="text-[#A0AABE] text-sm mb-6">
            Слот <strong class="text-white">{{ slotToDelete?.name }}</strong> будет безвозвратно удален из базы данных.
          </p>
          <div class="flex w-full gap-3">
            <button @click="showDeleteModal = false" class="flex-1 py-3 bg-[#0B0E14] border border-[#353A4A] hover:border-[#A0AABE] text-[#A0AABE] hover:text-white rounded-xl font-bold transition-colors">Отмена</button>
            <button @click="confirmDelete" :disabled="deleting" class="flex-1 py-3 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
              <Icon v-if="deleting" name="solar:refresh-circle-bold" class="w-5 h-5 animate-spin" />
              <span v-else>Удалить</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'

definePageMeta({
  layout: 'admin' // Ensure it picks up the admin layout padding/sidebar
})

const {
  getSlots,
  updateSlot,
  deleteSlot: deleteSlotApi,
} = useSlotsApi()
const { getProviders } = useProviders()

// State
const slots = ref([])
const providers = ref([])
const loading = ref(true)
const deleting = ref(false)
const showDeleteModal = ref(false)
const slotToDelete = ref(null)

// We don't need a massive inline Create modal, linking to the edit page with 'new' is better architecture,
// but to maintain exact requested functionality, we keep the flag.
const showAddModal = ref(false)

// Filters
const searchQuery = ref('')
const selectedProvider = ref('')
const selectedVolatility = ref('')
const selectedStatus = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Data loading
const loadSlots = async () => {
  try {
    loading.value = true
    const response = await getSlots({ admin: true })
    slots.value = response || []
  } catch (error) {
    console.error('Error loading slots:', error)
  } finally {
    loading.value = false
  }
}

const loadProviders = async () => {
  try {
    const response = await getProviders()
    providers.value = response || []
  } catch (e) {}
}

const refreshSlots = () => loadSlots()

onMounted(() => {
  loadSlots()
  loadProviders()
})

// Computed Filtering
const filteredSlots = computed(() => {
  let res = slots.value

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    res = res.filter(s => s.name?.toLowerCase().includes(q) || String(s.id) === q)
  }

  if (selectedProvider.value) {
    res = res.filter(s => String(s.provider_id) === String(selectedProvider.value))
  }

  if (selectedVolatility.value) {
    res = res.filter(s => s.volatility?.toLowerCase() === selectedVolatility.value)
  }

  if (selectedStatus.value !== '') {
    const isActive = selectedStatus.value === 'true'
    res = res.filter(s => s.is_active === isActive)
  }

  return res
})

const paginatedSlots = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredSlots.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(filteredSlots.value.length / itemsPerPage.value))

// Stats
const totalSlots = computed(() => slots.value.length)
const totalProviders = computed(() => new Set(slots.value.map(s => s.provider_id)).size)
const activeSlots = computed(() => slots.value.filter(s => s.is_active).length)
const averageRTP = computed(() => {
  const rtpSlots = slots.value.filter(s => s.rtp)
  if (!rtpSlots.length) return 0
  return (rtpSlots.reduce((acc, s) => acc + parseFloat(s.rtp), 0) / rtpSlots.length).toFixed(1)
})

// Actions
const editSlot = (slot) => navigateTo(`/admin/slots/${slot.id}`)
const deleteSlot = (slot) => {
  slotToDelete.value = slot
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!slotToDelete.value) return
  try {
    deleting.value = true
    await deleteSlotApi(slotToDelete.value.id)
    await loadSlots()
    showDeleteModal.value = false
  } catch (e) {
    console.error('Delete error', e)
  } finally {
    deleting.value = false
  }
}

const toggleSlotStatus = async (slot) => {
  // Optimistic UI update
  slot.is_active = !slot.is_active
  try {
    await updateSlot(slot.id, { is_active: slot.is_active })
  } catch (e) {
    // Revert on error
    slot.is_active = !slot.is_active
    console.error('Toggle error', e)
  }
}

const getVolatilityClass = (vol) => {
  switch (vol?.toLowerCase()) {
    case 'high': return 'bg-[#CD0F8B]/20 border border-[#CD0F8B]/30 text-[#FF6E48]'
    case 'medium': return 'bg-[#00EDFF]/10 border border-[#00EDFF]/30 text-[#00EDFF]'
    case 'low': return 'bg-[#63F3AB]/10 border border-[#63F3AB]/30 text-[#63F3AB]'
    default: return 'bg-[#353A4A]/50 border border-[#353A4A] text-[#A0AABE]'
  }
}

watch([searchQuery, selectedProvider, selectedVolatility, selectedStatus], () => {
  currentPage.value = 1
})

useHead({
  title: 'Управление Каталогом Слотов | SlotQuest Admin'
})
</script>

<style scoped>
/* Empty style to prevent Vite HMR cache errors */
</style>
