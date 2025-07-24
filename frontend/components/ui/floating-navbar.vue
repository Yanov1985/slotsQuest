<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200"
      leave-active-class="transition-all duration-200"
      enter-from-class="opacity-0 -translate-y-24"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-24"
    >
      <div
        v-if="visible"
        :class="cn(
          'flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4',
          className
        )"
      >
        <a
          v-for="(navItem, idx) in navItems"
          :key="`link=${idx}`"
          :href="navItem.link"
          :class="cn(
            'relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500'
          )"
        >
          <span class="block sm:hidden">{{ navItem.icon }}</span>
          <span class="hidden sm:block text-sm">{{ navItem.name }}</span>
        </a>
        <button
          class="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
        >
          <span>Login</span>
          <span
            class="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px"
          />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { cn } from '~/utils/cn'

defineProps({
  navItems: {
    type: Array,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})

const visible = ref(false)
const lastScrollY = ref(0)

const handleScroll = () => {
  if (process.client) {
    const currentScrollY = window.scrollY
    const direction = currentScrollY - lastScrollY.value
    
    if (currentScrollY < 50) {
      visible.value = false
    } else {
      if (direction < 0) {
        visible.value = true
      } else {
        visible.value = false
      }
    }
    
    lastScrollY.value = currentScrollY
  }
}

onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>