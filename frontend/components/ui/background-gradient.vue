<template>
  <div :class="cn('relative p-[4px] group', containerClassName)">
    <div
      :class="[
        cn(
          'absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform',
          'bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]'
        ),
        animate ? 'animate-gradient' : ''
      ]"
      :style="{
        backgroundSize: animate ? '400% 400%' : undefined
      }"
    />
    <div
      :class="[
        cn(
          'absolute inset-0 rounded-3xl z-[1] will-change-transform',
          'bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]'
        ),
        animate ? 'animate-gradient' : ''
      ]"
      :style="{
        backgroundSize: animate ? '400% 400%' : undefined
      }"
    />
    <div :class="cn('relative z-10', className)">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { cn } from '~/utils/cn'

defineProps({
  className: {
    type: String,
    default: ''
  },
  containerClassName: {
    type: String,
    default: ''
  },
  animate: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  animation: gradient 5s ease infinite;
}
</style>