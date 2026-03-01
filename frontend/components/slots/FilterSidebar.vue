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
          Filters
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
          <label class="text-xs font-bold text-white/40 uppercase tracking-wider pl-1">Search</label>
          <div class="relative">
            <Icon name="solar:magnifer-line-duotone" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              v-model="filters.search"
              type="text"
              placeholder="Slot name..."
              class="w-full bg-black/20 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors shadow-inner"
              @input="emitFilters"
            >
          </div>
        </div>

        <!-- Provider Searchable List -->
        <div class="space-y-3">
          <div class="flex items-center justify-between pl-1">
             <label class="text-xs font-bold text-white/40 uppercase tracking-wider">Provider</label>
             <span v-if="filters.providerIds.length > 0" class="text-xs text-blue-400 bg-blue-500/10 px-2 flex items-center justify-center rounded-full">{{ filters.providerIds.length }}</span>
          </div>

          <div class="space-y-3 bg-black/20 p-2 sm:p-3 rounded-3xl border border-transparent flex flex-col">
            <!-- Provider Search Input -->
            <div class="relative w-full mb-2">
              <Icon name="solar:magnifer-line-duotone" class="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                v-model="providerSearch"
                type="text"
                placeholder="Search provider..."
                class="w-full bg-black/30 border border-white/5 rounded-xl py-2 pl-9 pr-3 text-white text-xs placeholder-white/30 focus:outline-none focus:border-blue-500/30 transition-colors"
              >
            </div>

            <div class="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <button
                v-for="provider in filteredProviders"
                :key="provider.id"
                @click="toggleFilterItem('providerIds', provider.id)"
                class="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all duration-300 transform active:scale-[0.98]"
                :class="filters.providerIds.includes(provider.id) ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'bg-transparent border-transparent text-white/70 hover:border-white/10 hover:text-white hover:bg-white/5'"
              >
                <span class="text-sm font-medium">{{ provider.name }}</span>
                <Icon v-if="filters.providerIds.includes(provider.id)" name="solar:check-circle-bold" class="text-blue-400 w-4 h-4" />
              </button>
              <div v-if="filteredProviders.length === 0" class="text-center py-4 text-xs text-white/40">
                Provider not found
              </div>
            </div>
          </div>
        </div>

        <!-- Themes Accordion -->
        <div class="space-y-3 border-t border-white/5 pt-6">
           <button @click="accordions.themes = !accordions.themes" class="w-full flex items-center justify-between group pl-1">
              <div class="flex items-center gap-2">
                 <label class="text-xs font-bold text-white/40 uppercase tracking-wider cursor-pointer group-hover:text-white/70 transition-colors">Themes</label>
                 <span v-if="filters.themeIds.length > 0" class="text-xs text-blue-400 bg-blue-500/10 px-2 flex items-center justify-center rounded-full">{{ filters.themeIds.length }}</span>
              </div>
              <Icon :name="accordions.themes ? 'solar:alt-arrow-up-line-duotone' : 'solar:alt-arrow-down-line-duotone'" class="w-5 h-5 text-white/40 group-hover:text-white/70 transition-transform" />
           </button>

           <div v-show="accordions.themes" class="space-y-3 bg-black/20 p-2 sm:p-3 rounded-3xl border border-transparent flex flex-col transform origin-top transition-all">
              <div class="relative w-full mb-1">
                <Icon name="solar:magnifer-line-duotone" class="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  v-model="themeSearch"
                  type="text"
                  placeholder="Search theme..."
                  class="w-full bg-black/30 border border-white/5 rounded-xl py-2 pl-9 pr-3 text-white text-xs placeholder-white/30 focus:outline-none focus:border-blue-500/30 transition-colors"
                >
              </div>

              <div class="space-y-1.5 max-h-[180px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                 <button
                    v-for="theme in filteredThemes"
                    :key="theme.id"
                    @click="toggleFilterItem('themeIds', theme.id)"
                    class="w-full flex items-center gap-3 px-3 py-2 rounded-xl border transition-all duration-300 transform active:scale-[0.98] text-left"
                    :class="filters.themeIds.includes(theme.id) ? 'bg-blue-600/20 border-blue-500/50 text-blue-400' : 'bg-transparent border-transparent text-white/70 hover:bg-white/5'"
                 >
                    <Icon v-if="theme.icon" :name="theme.icon" class="w-5 h-5 shrink-0" />
                    <span class="text-sm font-medium flex-1 truncate">{{ theme.name }}</span>
                    <Icon v-if="filters.themeIds.includes(theme.id)" name="solar:check-circle-bold" class="w-4 h-4 shrink-0" />
                 </button>
                 <div v-if="filteredThemes.length === 0" class="text-center py-4 text-xs text-white/40">
                   Theme not found
                 </div>
              </div>
           </div>
        </div>

        <!-- Game Mechanics Accordion -->
        <div class="space-y-3 border-t border-white/5 pt-6">
           <button @click="accordions.mechanics = !accordions.mechanics" class="w-full flex items-center justify-between group pl-1">
              <div class="flex items-center gap-2">
                 <label class="text-xs font-bold text-white/40 uppercase tracking-wider cursor-pointer group-hover:text-white/70 transition-colors">Mechanics</label>
                 <span v-if="filters.mechanicIds.length > 0" class="text-xs text-blue-400 bg-blue-500/10 px-2 flex items-center justify-center rounded-full">{{ filters.mechanicIds.length }}</span>
              </div>
              <Icon :name="accordions.mechanics ? 'solar:alt-arrow-up-line-duotone' : 'solar:alt-arrow-down-line-duotone'" class="w-5 h-5 text-white/40 group-hover:text-white/70 transition-transform" />
           </button>

           <div v-show="accordions.mechanics" class="space-y-1.5 bg-black/20 p-2 sm:p-3 rounded-3xl border border-transparent flex flex-col max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <button
                  v-for="mechanic in mechanics"
                  :key="mechanic.id"
                  @click="toggleFilterItem('mechanicIds', mechanic.id)"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-300 transform active:scale-[0.98] text-left"
                  :class="filters.mechanicIds.includes(mechanic.id) ? 'bg-blue-600/20 border-blue-500/50 text-blue-400' : 'bg-transparent border-transparent text-white/70 hover:bg-white/5'"
               >
                  <Icon v-if="mechanic.icon" :name="mechanic.icon" class="w-5 h-5 shrink-0 opacity-80" />
                  <span class="text-sm font-medium flex-1 leading-snug">{{ mechanic.name }}</span>
                  <Icon v-if="filters.mechanicIds.includes(mechanic.id)" name="solar:check-circle-bold" class="w-4 h-4 shrink-0" />
               </button>
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
          Reset all
        </button>
      </div>
    </aside>
  </ClientOnly>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps({
  providers: { type: Array, default: () => [] },
  mechanics: { type: Array, default: () => [] },
  themes: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:filters'])

const isOpen = ref(false)

// Accordion states
const accordions = reactive({
  themes: false,
  mechanics: false
})

// Search strings for specific sections
const providerSearch = ref('')
const themeSearch = ref('')

const filters = reactive({
  search: '',
  providerIds: [],
  mechanicIds: [],
  themeIds: []
})

// Computed filtered lists for search
const filteredProviders = computed(() => {
  if (!providerSearch.value) return props.providers
  const term = providerSearch.value.toLowerCase()
  return props.providers.filter(p => p.name.toLowerCase().includes(term))
})

const filteredThemes = computed(() => {
  if (!themeSearch.value) return props.themes
  const term = themeSearch.value.toLowerCase()
  return props.themes.filter(t => t.name.toLowerCase().includes(term))
})

// Generic toggle function for array filters
const toggleFilterItem = (listName, id) => {
  const index = filters[listName].indexOf(id)
  if (index === -1) {
    filters[listName].push(id) // Add if not present
  } else {
    filters[listName].splice(index, 1) // Remove if present
  }
  emitFilters()
}

const emitFilters = () => {
  // Deep copy to break reactivity when passing up
  emit('update:filters', JSON.parse(JSON.stringify(filters)))
}

const resetFilters = () => {
  filters.search = ''
  filters.providerIds = []
  filters.mechanicIds = []
  filters.themeIds = []
  providerSearch.value = ''
  themeSearch.value = ''
  emitFilters()
}
</script>
