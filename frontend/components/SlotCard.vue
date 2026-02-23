<template>
  <NuxtLink
    :to="`/slots/${slot.slug}`"
    class="group relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 ease-out transform-gpu will-change-transform hover:shadow-2xl hover:shadow-cyan-500/20 lg:hover:-translate-y-2 lg:hover:scale-[1.02] backdrop-blur-sm overflow-hidden"
  >
    <!-- Glow Effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <!-- Content -->
    <div class="relative z-10 p-6">
      <!-- Slot Image -->
      <div class="relative h-48 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-colors duration-300">
        <!-- Image or Placeholder -->
        <div v-if="!slot.image_url && !slot.thumbnail_url" class="w-full h-full flex flex-col items-center justify-center text-center p-4">
          <div class="mb-3 filter drop-shadow-lg animate-pulse group-hover:animate-bounce transition-all duration-300">
            <Icon name="solar:gamepad-bold" class="text-6xl text-cyan-400" />
          </div>
          <div class="text-sm text-cyan-300 font-bold mb-2">{{ slot.name }}</div>
          <div class="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
        </div>

        <!-- Real image if available -->
        <NuxtImg
          v-else
          :src="slot.image_url || slot.thumbnail_url"
          :alt="slot.name"
          format="webp"
          sizes="sm:100vw md:50vw lg:400px"
          loading="lazy"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          @error="$event.target.style.display = 'none'"
        />

        <!-- RTP Badge -->
        <div class="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-cyan-400 font-bold border border-cyan-500/30">
          {{ slot.rtp || '96' }}%
        </div>

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <!-- Slot Title -->
      <h3 class="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors duration-300">
        {{ slot.name || 'Slot Game' }}
      </h3>

      <!-- Provider -->
      <p class="text-cyan-400 text-sm font-medium mb-4 flex items-center">
        <Icon name="solar:buildings-bold-duotone" class="w-4 h-4 mr-1.5" />
        {{ slot.providers?.name || 'Provider' }}
      </p>

      <!-- Awards Section -->
      <div v-if="slot.show_awards && displayAwards.length > 0" class="mb-4">
        <div class="flex flex-wrap gap-1 mb-2">
          <div
            v-for="award in displayAwards"
            :key="award.id"
            :class="getAwardClasses(award.color_scheme)"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ease-out transform-gpu will-change-transform lg:hover:scale-105"
          >
            <span class="mr-1">
              <span v-if="!award.emoji"><Icon name="solar:cup-star-bold" class="w-3 h-3" /></span>
              <span v-else>{{ award.emoji }}</span>
            </span>
            {{ award.name }}
          </div>
        </div>
        <div v-if="remainingAwardsCount > 0" class="text-xs text-gray-400">
          +{{ remainingAwardsCount }} еще
        </div>
      </div>

      <!-- Description -->
      <p class="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed">
        {{ slot.description || 'Захватывающий слот с множеством бонусов и высокими выплатами!' }}
      </p>

      <!-- Stats -->
      <div class="flex justify-between items-center mb-6 text-xs">
        <div class="text-center">
          <div class="text-gray-400 mb-1 flex items-center justify-center gap-1"><Icon name="solar:graph-up-bold" class="w-3.5 h-3.5" /> Волатильность</div>
          <div class="font-bold text-cyan-400">{{ slot.volatility || 'Средняя' }}</div>
        </div>
        <div class="text-center">
          <div class="text-gray-400 mb-1 flex items-center justify-center gap-1"><Icon name="solar:cup-star-bold" class="w-3.5 h-3.5" /> Макс. выигрыш</div>
          <div class="font-bold text-green-400">{{ slot.max_win || '5000x' }}</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-3">
        <NuxtLink :to="`/slots/${slot.slug}`" class="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 text-center">
          <Icon name="solar:document-text-bold" class="w-4 h-4" /> Подробнее
        </NuxtLink>
        <button class="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-sm font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30">
          <Icon name="solar:wad-of-money-bold" class="w-4 h-4" /> Демо
        </button>
      </div>
    </div>

    <!-- Corner Decorations -->
    <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-400/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

// Получаем награды из выбранных категорий
const displayAwards = computed(() => {
  if (!props.slot.show_awards || !props.slot.award_categories) {
    return []
  }

  // Ограничиваем до 3 наград для карточки
  return props.slot.award_categories.slice(0, 3)
})

// Количество оставшихся наград
const remainingAwardsCount = computed(() => {
  if (!props.slot.show_awards || !props.slot.award_categories) {
    return 0
  }

  const total = props.slot.award_categories.length
  return total > 3 ? total - 3 : 0
})

// Стили для наград
const getAwardClasses = (colorScheme) => {
  const colorMap = {
    amber: 'bg-amber-500/20 text-amber-200 border border-amber-400/30 hover:bg-amber-500/30',
    fuchsia: 'bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-400/30 hover:bg-fuchsia-500/30',
    emerald: 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 hover:bg-emerald-500/30',
    blue: 'bg-blue-500/20 text-blue-200 border border-blue-400/30 hover:bg-blue-500/30',
    purple: 'bg-purple-500/20 text-purple-200 border border-purple-400/30 hover:bg-purple-500/30',
    pink: 'bg-pink-500/20 text-pink-200 border border-pink-400/30 hover:bg-pink-500/30',
    green: 'bg-green-500/20 text-green-200 border border-green-400/30 hover:bg-green-500/30',
    red: 'bg-red-500/20 text-red-200 border border-red-400/30 hover:bg-red-500/30',
    orange: 'bg-orange-500/20 text-orange-200 border border-orange-400/30 hover:bg-orange-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-200 border border-yellow-400/30 hover:bg-yellow-500/30',
    indigo: 'bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 hover:bg-indigo-500/30',
    teal: 'bg-teal-500/20 text-teal-200 border border-teal-400/30 hover:bg-teal-500/30',
    cyan: 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 hover:bg-cyan-500/30'
  }
  return colorMap[colorScheme] || colorMap.amber
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
