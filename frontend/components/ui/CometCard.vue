<template>
  <div
    class="relative"
    :class="containerClassName"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      ref="cardRef"
      class="will-change-transform"
      :class="className"
      :style="cardStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  rotateDepth?: number
  translateDepth?: number
  perspective?: number
  className?: string
  containerClassName?: string
}

const props = withDefaults(defineProps<Props>(), {
  rotateDepth: 17.5,
  translateDepth: 20,
  perspective: 1000,
  className: '',
  containerClassName: '',
})

const cardRef = ref<HTMLElement | null>(null)
const transform = ref<string>('perspective(1000px) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)')
const transitioning = ref<boolean>(true)
const reducedMotion = ref<boolean>(false)

onMounted(() => {
  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    try {
      reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      reducedMotion.value = false
    }
  }
})

const cardStyle = computed(() => {
  return {
    transform: reducedMotion.value
      ? `perspective(${props.perspective}px)`
      : transform.value,
    transition: transitioning.value
      ? 'transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)'
      : 'transform 35ms linear',
    transformStyle: 'preserve-3d',
  } as Record<string, string>
})

function onMouseEnter() {
  if (reducedMotion.value) return
  transitioning.value = false
}

function onMouseLeave() {
  if (reducedMotion.value) return
  transitioning.value = true
  transform.value = `perspective(${props.perspective}px) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)`
}

function onMouseMove(e: MouseEvent) {
  if (reducedMotion.value) return
  const el = cardRef.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width // 0..1
  const y = (e.clientY - rect.top) / rect.height // 0..1

  // Нормализация к -0.5..0.5
  const nx = x - 0.5
  const ny = y - 0.5

  const rotateX = -(ny * props.rotateDepth)
  const rotateY = nx * props.rotateDepth
  const translateX = nx * props.translateDepth
  const translateY = ny * props.translateDepth

  transform.value = `perspective(${props.perspective}px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}
</script>
