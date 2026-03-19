<template>
  <div class="min-h-screen bg-[#0B0E14] text-white font-sans">
    <!-- Header -->
    <header class="bg-[#161A21]/80 backdrop-blur-md border-b border-[#353A4A] sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-4">
            <h1 class="text-xl font-bold font-display text-white flex items-center gap-2">
              <NuxtLink to="/admin" class="text-white/50 hover:text-white transition-colors">
                <Icon name="solar:home-smile-angle-line-duotone" class="w-6 h-6" />
              </NuxtLink>
              <span class="text-white/30">/</span>
              <Icon name="solar:tuning-square-2-bold-duotone" class="text-[#FF6E48]" />
              <span>Механики слотов (Features)</span>
            </h1>
          </div>
          <button
            @click="openAddModal"
            class="flex items-center gap-2 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Icon name="solar:add-circle-line-duotone" class="w-5 h-5" />
            Добавить механику
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20">
        <Icon name="solar:spinner-broken" class="w-10 h-10 text-[#FF6E48] animate-spin mb-4" />
        <p class="text-white/60">Загрузка механик...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Icon name="solar:danger-triangle-line-duotone" class="w-6 h-6" />
          <span>{{ error }}</span>
        </div>
        <button @click="loadMechanics" class="text-sm font-semibold hover:text-red-300">Повторить</button>
      </div>

      <!-- Empty State -->
      <div v-else-if="mechanics.length === 0" class="bg-[#161A21]/50 border border-[#353A4A] rounded-2xl p-12 text-center">
         <Icon name="solar:ghost-line-duotone" class="w-20 h-20 text-white/20 mx-auto mb-4" />
         <h3 class="text-xl font-bold text-white mb-2">Нет добавленных механик</h3>
         <p class="text-white/50 mb-6">Создайте первую механику для каталога слотов.</p>
         <button
            @click="openAddModal"
            class="inline-flex items-center gap-2 bg-[#1B1E26] hover:bg-[#232731] border border-[#353A4A] text-white px-6 py-3 rounded-xl transition-colors font-medium"
          >
            <Icon name="solar:add-circle-bold-duotone" class="text-[#FF6E48] w-5 h-5" />
            Создать механику
          </button>
      </div>

      <!-- Data Grid -->
      <div v-else class="bg-[#161A21] border border-[#353A4A] rounded-2xl overflow-hidden shadow-xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr class="bg-[#1B1E26] border-b border-[#353A4A] text-white/50 text-xs uppercase tracking-wider font-semibold">
                <th class="p-4 w-12 text-center">ID</th>
                <th class="p-4 w-20 text-center">Иконка</th>
                <th class="p-4 w-24 text-center">Цвет</th>
                <th class="p-4">Название</th>
                <th class="p-4">Слаг / Тип</th>
                <th class="p-4 w-16 text-center">Слотов</th>
                <th class="p-4 w-24 text-center">Опции</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#353A4A]/50">
              <tr
                v-for="mechanic in sortedMechanics"
                :key="mechanic.id"
                class="hover:bg-white/[0.02] transition-colors group"
              >
                <td class="p-4 text-center text-white/40 text-sm font-mono">{{ mechanic.id }}</td>
                <td class="p-4 text-center">
                  <div class="w-10 h-10 rounded-xl bg-[#0B0E14] border border-[#353A4A] flex items-center justify-center mx-auto" :style="{ color: mechanic.color || '#FF6E48' }">
                    <Icon v-if="mechanic.icon && mechanic.icon.startsWith('solar:')" :name="mechanic.icon" class="w-5 h-5" />
                    <span v-else-if="mechanic.icon" class="text-xl leading-none">{{ mechanic.icon }}</span>
                    <Icon v-else name="solar:star-line-duotone" class="w-5 h-5 opacity-50 text-[#FF6E48]" />
                  </div>
                </td>
                <td class="p-4 text-center">
                   <div v-if="mechanic.color" class="flex items-center justify-center gap-2">
                     <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: mechanic.color }"></span>
                     <span class="text-xs font-mono text-white/50">{{ mechanic.color }}</span>
                   </div>
                   <span v-else class="text-white/20 text-xs">—</span>
                </td>
                <td class="p-4">
                  <div class="font-bold text-white text-sm tracking-wide">{{ mechanic.name }}</div>
                  <div class="text-xs text-white/40 mt-1 line-clamp-1 truncate max-w-sm">{{ mechanic.description || 'Нет описания' }}</div>
                </td>
                <td class="p-4 space-y-1">
                  <div>
                     <span class="inline-flex items-center px-2 py-1 rounded bg-black/40 border border-white/5 text-white/60 font-mono text-xs">
                       {{ mechanic.slug }}
                     </span>
                  </div>
                  <div>
                     <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                           :class="mechanic.type === 'mechanic' ? 'bg-[#FF6E48]/10 text-[#FF6E48]' : 'bg-[#00EDFF]/10 text-[#00EDFF]'">
                        {{ mechanic.type || 'mechanic' }}
                     </span>
                  </div>
                </td>
                <td class="p-4 text-center">
                  <span class="text-white/50 text-sm font-bold bg-white/5 px-2.5 py-1 rounded-lg">
                    {{ mechanic.slot_count || 0 }}
                  </span>
                </td>
                <td class="p-4 text-center">
                  <div class="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button @click="openEditModal(mechanic)" class="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="Редактировать">
                      <Icon name="solar:pen-new-square-line-duotone" class="w-4 h-4" />
                    </button>
                    <button @click="confirmDelete(mechanic)" class="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Удалить">
                      <Icon name="solar:trash-bin-trash-line-duotone" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit/Add Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="closeModal"></div>

        <div class="relative w-full max-w-xl bg-[#161A21] border border-[#353A4A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-[#353A4A] shrink-0 bg-[#121419]">
            <h2 class="text-xl font-bold flex items-center gap-3">
              <Icon :name="editingMechanic ? 'solar:pen-new-square-bold-duotone' : 'solar:add-circle-bold-duotone'" class="text-[#FF6E48]" />
              {{ editingMechanic ? 'Редактировать механику' : 'Создать механику' }}
            </h2>
            <button @click="closeModal" class="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
              <Icon name="solar:close-circle-line-duotone" class="w-6 h-6" />
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">Название *</label>
                <input v-model="formData.name" type="text" class="w-full bg-[#0B0E14] border border-[#353A4A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6E48]/50 focus:bg-[#1B1E26] transition-colors" placeholder="Напр. Megaways" required>
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">Слаг *</label>
                <input v-model="formData.slug" type="text" class="w-full bg-[#0B0E14] border border-[#353A4A] rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#FF6E48]/50 focus:bg-[#1B1E26] transition-colors" placeholder="megaways" required>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-white/50 uppercase tracking-wider pl-1 flex justify-between">
                  Иконка/Эмодзи
                  <a href="https://icon-sets.iconify.design/solar/" target="_blank" class="text-blue-400 hover:text-blue-300 font-normal underline">Iconify</a>
                </label>
                <input v-model="formData.icon" type="text" class="w-full bg-[#0B0E14] border border-[#353A4A] rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#FF6E48]/50 focus:bg-[#1B1E26] transition-colors" placeholder="solar:star-fall-line-duotone">
              </div>
              <div class="space-y-1.5 flex flex-col justify-end">
                  <div class="flex items-center gap-3 w-full bg-[#0B0E14] border border-[#353A4A] rounded-xl px-3 py-2">
                     <input type="color" v-model="formData.color" class="w-8 h-8 rounded shrink-0 bg-transparent border-none cursor-pointer p-0" />
                     <input type="text" v-model="formData.color" class="w-full bg-transparent border-none text-white font-mono text-sm focus:outline-none uppercase" placeholder="#FFFFFF">
                  </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">Тип *</label>
                <select v-model="formData.type" class="w-full bg-[#0B0E14] border border-[#353A4A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6E48]/50 focus:bg-[#1B1E26] transition-colors appearance-none cursor-pointer">
                  <option value="mechanic">Механика (Mechanic)</option>
                  <option value="bonus">Бонус (Bonus)</option>
                  <option value="feature">Особенность (Feature)</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">Порядок сортировки</label>
                <input v-model.number="formData.sort_order" type="number" class="w-full bg-[#0B0E14] border border-[#353A4A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6E48]/50 focus:bg-[#1B1E26] transition-colors" placeholder="0">
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-bold text-white/50 uppercase tracking-wider pl-1">Описание (необязательно)</label>
              <textarea v-model="formData.description" rows="3" class="w-full bg-[#0B0E14] border border-[#353A4A] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6E48]/50 focus:bg-[#1B1E26] transition-colors resize-none" placeholder="Краткое описание механики игры..."></textarea>
            </div>

          </div>

          <!-- Modal Footer -->
          <div class="p-6 border-t border-[#353A4A] flex justify-end gap-3 shrink-0 bg-[#121419]">
            <button @click="closeModal" class="px-5 py-2.5 rounded-xl border border-[#353A4A] text-white/70 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm">
              Отмена
            </button>
            <button
              @click="saveMechanic"
              :disabled="saving || !formData.name || !formData.slug"
              class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,110,72,0.3)]"
            >
              <Icon v-if="saving" name="solar:spinner-broken" class="w-5 h-5 animate-spin" />
              <Icon v-else name="solar:disk-bold-duotone" class="w-5 h-5" />
              {{ saving ? 'Сохранение...' : 'Сохранить механику' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'

const config = useRuntimeConfig()
const API_URL = config.public.apiUrl || 'http://localhost:3001'

definePageMeta({
  layout: 'admin'
})

useHead({
  title: 'Admin - Game Mechanics (Features)'
})

const loading = ref(true)
const error = ref(null)
const saving = ref(false)
const mechanics = ref([])

const sortedMechanics = computed(() => {
  return [...mechanics.value].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
})

// Form & Modal State
const isModalOpen = ref(false)
const editingMechanic = ref(null)
const formData = reactive({
  name: '',
  slug: '',
  description: '',
  icon: 'solar:gamepad-line-duotone',
  color: '#FF6E48',
  type: 'mechanic',
  sort_order: 0
})

// Auto-generate slug from name
watch(() => formData.name, (newVal) => {
  if (!editingMechanic.value && newVal) {
    formData.slug = newVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }
})

// Load Mechanics
const loadMechanics = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await $fetch(`${API_URL}/api/mechanics`)
    mechanics.value = response?.data || response || []
  } catch (err) {
    console.error('Ошибка загрузки:', err)
    error.value = 'Не удалось загрузить список механик'
  } finally {
    loading.value = false
  }
}

// Modal Handlers
const openAddModal = () => {
  editingMechanic.value = null
  Object.assign(formData, {
    name: '',
    slug: '',
    description: '',
    icon: 'solar:gamepad-line-duotone',
    color: '#FF6E48',
    type: 'mechanic',
    sort_order: 0
  })
  isModalOpen.value = true
}

const openEditModal = (mechanic) => {
  editingMechanic.value = mechanic
  Object.assign(formData, {
    name: mechanic.name,
    slug: mechanic.slug,
    description: mechanic.description || '',
    icon: mechanic.icon || '',
    color: mechanic.color || '#FF6E48',
    type: mechanic.type || 'mechanic',
    sort_order: mechanic.sort_order || 0
  })
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingMechanic.value = null
}

const saveMechanic = async () => {
  if (!formData.name || !formData.slug) return

  saving.value = true
  try {
    const method = editingMechanic.value ? 'PUT' : 'POST'
    const endpoint = editingMechanic.value
      ? `${API_URL}/api/mechanics/${editingMechanic.value.id}`
      : `${API_URL}/api/mechanics`

    await $fetch(endpoint, {
      method,
      body: formData
    })

    await loadMechanics()
    closeModal()
  } catch (err) {
    alert(err.message || 'Ошибка при сохранении')
  } finally {
    saving.value = false
  }
}

const confirmDelete = async (mechanic) => {
  if (!confirm(`Точно удалить механику "${mechanic.name}"? Это удалит ее и из карточек слотов.`)) return

  try {
    await $fetch(`${API_URL}/api/mechanics/${mechanic.id}`, {
      method: 'DELETE'
    })
    mechanics.value = mechanics.value.filter(m => m.id !== mechanic.id)
  } catch (err) {
    alert('Ошибка при удалении')
  }
}

onMounted(() => {
  loadMechanics()
})
</script>
