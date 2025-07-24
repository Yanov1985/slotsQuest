<template>
  <div
    :class="cn('py-20 flex items-center justify-center', containerClassName)"
    :style="{ perspective: '1000px' }"
  >
    <div
      ref="containerRef"
      @mouseenter="handleMouseEnter"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
      :class="cn(
        'flex items-center justify-center relative transition-all duration-200 ease-linear',
        className
      )"
      :style="{ transformStyle: 'preserve-3d' }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { cn } from '~/utils/cn'

const props = defineProps({
  className: {
    type: String,
    default: ''
  },
  containerClassName: {
    type: String,
    default: ''
  }
})

const containerRef = ref(null)
const isMouseEntered = ref(false)

// Provide the mouse enter state to child components
provide('isMouseEntered', isMouseEntered)

const handleMouseMove = (e) => {
  if (!containerRef.value) return
  const { left, top, width, height } = containerRef.value.getBoundingClientRect()
  const x = (e.clientX - left - width / 2) / 25
  const y = (e.clientY - top - height / 2) / 25
  containerRef.value.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
}

const handleMouseEnter = () => {
  isMouseEntered.value = true
}

const handleMouseLeave = () => {
  if (!containerRef.value) return
  isMouseEntered.value = false
  containerRef.value.style.transform = 'rotateY(0deg) rotateX(0deg)'
}
</script>