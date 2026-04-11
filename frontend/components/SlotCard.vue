<template>
  <NuxtLink
    :to="`/slots/${slot.slug}`"
    class="group relative bg-[#1a1d24] hover:bg-[#20252e] rounded-xl overflow-hidden transition-all duration-300 ease-out transform-gpu will-change-transform hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 block"
  >
    <!-- Slot Image Container (Casino style) -->
    <div class="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
      
      <!-- Image or Placeholder -->
      <div v-if="!slot.image_url && !slot.thumbnail_url" class="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4">
        <div class="mb-3">
          <Icon name="solar:gamepad-bold" class="text-6xl text-gray-600" />
        </div>
      </div>

      <!-- Real image if available -->
      <NuxtImg
        v-else
        :src="slot.image_url || slot.thumbnail_url"
        :alt="slot.name"
        format="webp"
        sizes="sm:100vw md:50vw lg:400px"
        loading="lazy"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @error="$event.target.style.display = 'none'"
      />

      <!-- RTP Badge -->
      <div class="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider text-green-400 z-10 transition-opacity duration-300 group-hover:opacity-0">
        {{ slot.rtp ? formatRTP(slot.rtp) : '96.00' }}% RTP
      </div>

      <!-- BLUECHIP STYLE HOVER OVERLAY -->
      <div class="absolute inset-0 bg-[#0b0e14]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 backdrop-blur-[2px]">
        
        <NuxtLink 
          :to="`/slots/${slot.slug}`" 
          class="w-full max-w-[160px] flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-bold py-3 px-4 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 delay-[50ms]"
          @click.stop
        >
          <Icon name="solar:document-text-bold" class="w-5 h-5" /> Подробнее
        </NuxtLink>

      </div>
    </div>

    <!-- Content Info (Bottom) -->
    <div class="p-4 relative z-10">
      <!-- Title & Provider -->
      <div class="flex flex-col gap-1 mb-3">
        <h3 class="text-base font-bold text-gray-100 line-clamp-1 group-hover:text-blue-400 transition-colors duration-300">
          {{ slot.name || 'Slot Game' }}
        </h3>
        <p class="text-gray-400 text-xs font-medium uppercase tracking-wider flex items-center">
          {{ slot.providers?.name || 'Provider' }}
        </p>
      </div>

       <!-- Stats -->
       <div class="flex items-center gap-3 text-xs text-gray-500 border-t border-gray-800 pt-3 mt-2">
        <div class="flex items-center gap-1">
          <Icon name="solar:graph-up-bold" class="w-3.5 h-3.5 text-orange-400/80" /> 
          <span>{{ slot.volatility || 'Средняя' }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="solar:cup-star-bold" class="w-3.5 h-3.5 text-yellow-500/80" /> 
          <span>x{{ slot.max_win || '5000' }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue'
import { formatRTP } from '~/utils/slotFormatters'

const props = defineProps({
  slot: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
