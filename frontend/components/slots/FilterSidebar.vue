<template>
  <ClientOnly>
    <!-- Mobile Filter Toggle Button -->
    <div class="lg:hidden fixed bottom-6 right-6 z-40">
      <button
        @click="isOpen = true"
        class="bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center transform transition-transform active:scale-95 border border-white/10"
      >
        <Icon name="solar:filters-line-duotone" class="w-6 h-6" />
      </button>
    </div>

    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        @click="isOpen = false"
      ></div>
    </Transition>

    <!-- Sidebar Content -->
    <aside
      :class="[
        'fixed inset-y-0 right-0 z-50 w-full max-w-[320px] bg-white/5 backdrop-blur-2xl border-l border-white/10 transform transition-transform duration-300 ease-out lg:relative lg:translate-x-0 lg:w-[320px] lg:border-r lg:border-l lg:rounded-3xl lg:z-10 flex flex-col shadow-2xl shadow-black/20',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
        <h2 class="text-white font-bold text-lg flex items-center gap-2">
          <Icon name="solar:tuning-square-2-line-duotone" class="text-blue-400 w-6 h-6" />
          Фильтры
        </h2>
        <button
          @click="isOpen = false"
          class="lg:hidden text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        >
          <Icon name="solar:close-circle-line-duotone" class="w-6 h-6" />
        </button>
      </div>

      <!-- Filters Form -->
      <div class="p-6 flex-1 overflow-y-auto space-y-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

        <!-- Search -->
        <div class="space-y-3">
          <label class="text-xs font-bold text-white/40 uppercase tracking-wider pl-1">Поиск</label>
          <div class="relative">
            <Icon name="solar:magnifer-line-duotone" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              v-model="filters.search"
              type="text"
              placeholder="Название слота..."
              class="w-full bg-black/20 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors shadow-inner"
              @input="emitFilters"
            >
          </div>
        </div>

        <!-- Provider -->
        <div class="space-y-3">
          <label class="text-xs font-bold text-white/40 uppercase tracking-wider pl-1">Провайдер</label>
          <div class="space-y-2">
            <button
              v-for="provider in providers.slice(0, 5)"
              :key="provider.id"
              @click="toggleProvider(provider.id)"
              class="w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all duration-300 transform active:scale-[0.98]"
              :class="filters.providerId === provider.id ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'bg-black/20 border-transparent text-white/70 hover:border-white/10 hover:text-white hover:bg-white/5'"
            >
              <span class="text-sm font-medium">{{ provider.name }}</span>
              <Icon v-if="filters.providerId === provider.id" name="solar:check-circle-bold" class="text-blue-400 w-5 h-5" />
            </button>
            <button v-if="providers.length > 5" class="w-full text-center text-sm text-blue-400 hover:text-blue-300 transition-colors pt-3 font-medium">
              Показать всех ({{ providers.length }})
            </button>
          </div>
        </div>

        <!-- Volatility -->
        <div class="space-y-3">
          <label class="text-xs font-bold text-white/40 uppercase tracking-wider pl-1">Волатильность</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="level in ['low', 'medium', 'high']"
              :key="level"
              @click="filters.volatility = filters.volatility === level ? '' : level; emitFilters()"
              class="py-3 px-1 rounded-2xl border text-xs font-bold capitalize transition-all duration-300 text-center transform active:scale-[0.98]"
              :class="filters.volatility === level ? 'bg-amber-500/20 border-amber-500/50 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]' : 'bg-black/20 border-transparent text-white/70 hover:border-white/10 hover:text-white hover:bg-white/5'"
            >
              {{ level === 'high' ? 'Высокая' : level === 'low' ? 'Низкая' : 'Средняя' }}
            </button>
          </div>
        </div>

        <!-- Mechanics/Features Toggles -->
        <div class="space-y-4">
          <label class="text-xs font-bold text-white/40 uppercase tracking-wider pl-1">Особенности</label>
          <div class="space-y-3 bg-black/20 p-4 rounded-3xl border border-transparent">
            <label class="flex items-center gap-4 cursor-pointer group">
              <div class="relative w-12 h-6 bg-black/60 border border-white/10 rounded-full transition-colors duration-300" :class="{ 'bg-blue-500/30 border-blue-500/50': filters.bonusBuy }">
                <div class="absolute left-1 top-1 w-4 h-4 bg-white/60 rounded-full transition-transform duration-300" :class="{ 'translate-x-6 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]': filters.bonusBuy }"></div>
              </div>
              <input type="checkbox" v-model="filters.bonusBuy" class="sr-only" @change="emitFilters">
              <span class="text-sm text-white/70 group-hover:text-white transition-colors font-semibold">Покупка бонуса</span>
            </label>
            <div class="w-full h-px bg-white/5"></div>
            <label class="flex items-center gap-4 cursor-pointer group">
              <div class="relative w-12 h-6 bg-black/60 border border-white/10 rounded-full transition-colors duration-300" :class="{ 'bg-blue-500/30 border-blue-500/50': filters.megaways }">
                <div class="absolute left-1 top-1 w-4 h-4 bg-white/60 rounded-full transition-transform duration-300" :class="{ 'translate-x-6 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]': filters.megaways }"></div>
              </div>
              <input type="checkbox" v-model="filters.megaways" class="sr-only" @change="emitFilters">
              <span class="text-sm text-white/70 group-hover:text-white transition-colors font-semibold">Megaways</span>
            </label>
          </div>
        </div>

      </div>

      <!-- Footer Actions -->
      <div class="p-6 border-t border-white/10 shrink-0 bg-white/5 lg:rounded-b-3xl">
        <button
          @click="resetFilters"
          class="w-full flex items-center justify-center gap-2 py-3.5 bg-black/20 text-white/70 hover:text-white hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl text-sm font-bold transition-all duration-300 shadow-inner group"
        >
          <Icon name="solar:trash-bin-trash-line-duotone" class="w-5 h-5 group-hover:text-red-400 transition-colors" />
          Сбросить все
        </button>
      </div>
    </aside>
  </ClientOnly>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  providers: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:filters'])

const isOpen = ref(false)

const filters = reactive({
  search: '',
  providerId: '',
  volatility: '',
  bonusBuy: false,
  megaways: false
})

const toggleProvider = (id) => {
  filters.providerId = filters.providerId === id ? '' : id
  emitFilters()
}

const emitFilters = () => {
  emit('update:filters', { ...filters })
}

const resetFilters = () => {
  filters.search = ''
  filters.providerId = ''
  filters.volatility = ''
  filters.bonusBuy = false
  filters.megaways = false
  emitFilters()
}
</script>
