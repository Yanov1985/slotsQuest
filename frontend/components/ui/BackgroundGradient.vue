<template>
  <div :class="['relative p-[4px] group', containerClassName]">
    <!-- Слой с размытием -->
    <div
      v-if="animate"
      class="absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform"
      :style="bgStyle"
    />
    <!-- Основной слой -->
    <div
      v-if="animate"
      class="absolute inset-0 rounded-3xl z-[1] will-change-transform"
      :style="bgStyle"
    />
    <!-- Если анимация выключена (fallback) -->
    <div
      v-else
      class="absolute inset-0 rounded-3xl z-[1] opacity-70 blur-md"
      :style="bgStaticStyle"
    />

    <!-- Контент -->
    <div class="relative z-10" :class="className">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    className?: string
    containerClassName?: string
    animate?: boolean
  }>(),
  {
    className: '',
    containerClassName: '',
    animate: true
  }
)

const gradientImage = `
  radial-gradient(circle_farthest-side_at_0_100%, #00ccb1, transparent),
  radial-gradient(circle_farthest-side_at_100%_0, #7b61ff, transparent),
  radial-gradient(circle_farthest-side_at_100%_100%, #ffc414, transparent),
  radial-gradient(circle_farthest-side_at_0_0, #1ca0fb, #141316)
`

const bgStyle = computed(() => ({
  backgroundImage: gradientImage,
  backgroundSize: '400% 400%',
  animation: 'bgShift 5s ease-in-out infinite alternate'
}))

const bgStaticStyle = computed(() => ({
  backgroundImage: gradientImage,
  backgroundSize: '200% 200%'
}))
</script>

<style scoped>
@keyframes bgShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Поддержка пользователей с reduced motion */
@media (prefers-reduced-motion: reduce) {
  div[style*="animation"] {
    animation: none !important;
  }
}
</style>
