<template>
  <Transition name="fade-bounce">
    <button
      v-if="y > 400"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] hover:scale-110 active:scale-95 transition-all duration-300"
      aria-label="Back to top"
    >
      <Icon name="solar:alt-arrow-up-bold" class="w-6 h-6" />
    </button>
  </Transition>
</template>

<script setup>
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.fade-bounce-enter-active,
.fade-bounce-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-bounce-enter-from,
.fade-bounce-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}
</style>
