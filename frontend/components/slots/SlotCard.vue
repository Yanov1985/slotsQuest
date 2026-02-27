<template>
  <NuxtLink
    :to="`/slots/${slot.slug}`"
    class="group relative bg-white/5 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 ease-out transform-gpu will-change-transform shadow-lg shadow-black/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] lg:hover:-translate-y-1 lg:hover:scale-[1.02] overflow-hidden"
  >
    <!-- Background Glow on Hover -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

    <div class="relative z-10 p-4 sm:p-5">
      <!-- Image Wrapper -->
      <div class="relative aspect-[4/3] mb-4 sm:mb-5 rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-blue-500/30 transition-colors duration-300">

        <!-- Placeholder -->
        <div v-if="!slot.image_url && !slot.thumbnail_url" class="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <Icon name="solar:gamepad-line-duotone" class="text-5xl text-white/20 mb-2 group-hover:text-blue-500/50 transition-colors duration-300" />
        </div>

        <!-- Actual Image -->
        <NuxtImg
          v-else
          :src="slot.thumbnail_url || slot.image_url"
          :alt="slot.name"
          format="webp"
          sizes="sm:100vw md:50vw lg:300px"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out will-change-transform"
          @error="$event.target.style.display = 'none'"
        />

        <!-- Top Badges Overlay -->
        <div class="absolute top-2 left-2 flex flex-col gap-1 z-20">
          <div v-if="isNew" class="bg-gradient-to-r from-amber-400 to-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase tracking-wider backdrop-blur-sm">
            Новинка
          </div>
          <div v-if="isHot" class="bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg uppercase tracking-wider backdrop-blur-sm shadow-red-500/20">
            Хит
          </div>
        </div>

        <div v-if="slot.rtp" class="absolute top-2 right-2 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/80 font-semibold z-20 flex items-center gap-1">
          <Icon name="solar:sort-from-bottom-to-top-bold" class="w-3 h-3 text-emerald-400" />
          {{ slot.rtp }}%
        </div>

        <!-- Hover Action Overlay -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4 z-10 hidden lg:flex">
          <button class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform transform active:scale-95 text-sm uppercase tracking-wide">
            <Icon name="solar:play-bold" class="w-4 h-4" />
            Играть
          </button>
          <div class="w-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm text-center backdrop-blur-md">
            Обзор
          </div>
        </div>
      </div>

      <!-- Info Area -->
      <div class="flex flex-col gap-1">
        <h3 class="text-white/90 font-bold text-sm sm:text-base truncate">{{ slot.name }}</h3>
        <p class="text-white/50 text-xs flex items-center gap-1.5 truncate font-medium">
          <Icon name="solar:buildings-bold" class="w-3.5 h-3.5 text-white/30" />
          {{ slot.providers?.name || 'Провайдер' }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  slot: {
    type: Object,
    required: true
  }
})

// Example logic for "New" (e.g. released in last 30 days) or "Hot" (e.g. rank < 10)
const isNew = computed(() => {
  if (!props.slot.release_date) return false
  const releaseDate = new Date(props.slot.release_date)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  return releaseDate > thirtyDaysAgo
})

const isHot = computed(() => {
  return props.slot.popularity_rank && props.slot.popularity_rank <= 10
})
</script>
