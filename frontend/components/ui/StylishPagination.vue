<template>
  <nav
    v-if="totalPages > 1"
    class="flex items-center justify-center gap-1 sm:gap-2 mt-8 sm:mt-12 mb-4"
    aria-label="Pagination"
  >
    <!-- Previous Button -->
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group border"
      :class="currentPage === 1 ? 'bg-white/5 border-white/5 text-white/50' : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 shadow-lg shadow-black/20'"
      aria-label="Previous Page"
    >
      <Icon name="solar:alt-arrow-left-line-duotone" class="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform" />
    </button>

    <!-- Page Numbers -->
    <div class="flex items-center justify-center gap-1 sm:gap-2 bg-white/5 border border-white/5 backdrop-blur-md px-2 py-1.5 sm:px-3 sm:py-2 rounded-3xl shadow-lg shadow-black/20">
      <template v-for="(item, index) in paginationItems" :key="index">
        <!-- Ellipsis -->
        <span
          v-if="item === '...'"
          class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-white/50 text-sm sm:text-base font-medium select-none"
        >
          ...
        </span>

        <!-- Page Button -->
        <button
          v-else
          @click="goToPage(item)"
          class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 transform"
          :class="[
            currentPage === item
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20 scale-105'
              : 'text-white/70 border border-transparent hover:text-white hover:bg-white/10 active:scale-95'
          ]"
          :aria-label="`Page ${item}`"
          :aria-current="currentPage === item ? 'page' : undefined"
        >
          {{ item }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group border"
      :class="currentPage === totalPages ? 'bg-white/5 border-white/5 text-white/50' : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 shadow-lg shadow-black/20'"
      aria-label="Next Page"
    >
      <Icon name="solar:alt-arrow-right-line-duotone" class="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:page'])

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:page', page)
  }
}

const paginationItems = computed(() => {
  const current = props.currentPage
  const total = props.totalPages
  
  // If total pages is small, show all of them
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const items = []
  
  // Always show first page
  items.push(1)

  // Calculate start and end of the middle group
  let start = current - 1
  let end = current + 1

  if (current <= 3) {
    start = 2
    end = 4
  } else if (current >= total - 2) {
    start = total - 3
    end = total - 1
  }

  // Add leading ellipsis if needed
  if (start > 2) {
    items.push('...')
  }

  // Add middle pages
  for (let i = start; i <= end; i++) {
    items.push(i)
  }

  // Add trailing ellipsis if needed
  if (end < total - 1) {
    items.push('...')
  }

  // Always show last page
  items.push(total)

  return items
})
</script>
