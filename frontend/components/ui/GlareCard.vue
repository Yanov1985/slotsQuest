<template>
  <div
    ref="cardRef"
    class="relative overflow-hidden rounded-2xl inline-block"
    :style="cardStyle"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Основной контент -->
    <div class="relative z-10">
      <slot />
    </div>

    <!-- Glare эффект при наведении -->
    <div
      class="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
      :style="backgroundStyle"
    />

    <!-- Постоянный анимированный эффект -->
    <div
      class="absolute inset-0 pointer-events-none"
      :style="{
        background: `
          radial-gradient(150px at ${animatedPosition.x}% ${animatedPosition.y}%,
            rgba(0, 255, 255, 0.5) 0%,
            rgba(255, 0, 255, 0.4) 40%,
            transparent 70%
          ) ${animatedPosition.x}% ${animatedPosition.y}% / 200% 200%,
          linear-gradient(45deg,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 100%
          ) ${-animatedPosition.x}% ${-animatedPosition.y}% / 300% 300%
        `,
        mixBlendMode: 'screen',
        opacity: intensity * 0.8
      }"
    />

    <!-- Дополнительный радужный эффект -->
    <div
      class="absolute inset-0 pointer-events-none"
      :style="{
        background: `
          conic-gradient(from ${rotation}deg at ${animatedPosition.x}% ${animatedPosition.y}%,
            rgba(255, 0, 0, 0.3) 0deg,
            rgba(255, 165, 0, 0.3) 60deg,
            rgba(255, 255, 0, 0.3) 120deg,
            rgba(0, 255, 0, 0.3) 180deg,
            rgba(0, 255, 255, 0.3) 240deg,
            rgba(0, 0, 255, 0.3) 300deg,
            rgba(255, 0, 255, 0.3) 360deg
          )
        `,
        mixBlendMode: 'overlay',
        opacity: intensity * 0.4,
        filter: 'blur(1px)'
      }"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '~/utils/cn'

// Props
const props = defineProps({
  intensity: {
    type: Number,
    default: 1.0
  }
})

// Refs
const cardRef = ref(null)
const mousePosition = ref({ x: 0, y: 0 })
const isHovered = ref(false)
const animatedPosition = ref({ x: 50, y: 50 })
const rotation = ref(0)
const animationId = ref(null)

// Computed styles
const cardStyle = computed(() => ({
  '--mouse-x': `${mousePosition.value.x}%`,
  '--mouse-y': `${mousePosition.value.y}%`,
  transform: isHovered.value ? 'rotateX(2deg) rotateY(2deg)' : 'rotateX(0deg) rotateY(0deg)',
  transition: 'transform 0.3s ease'
}))

const backgroundStyle = computed(() => ({
  background: `radial-gradient(circle 200px at ${mousePosition.value.x}px ${mousePosition.value.y}px, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 30%, transparent 70%)`,
  mixBlendMode: 'overlay',
  opacity: isHovered.value ? 1 : 0
}))

// Animation function
const autoAnimateEffect = () => {
  const time = Date.now() * 0.002

  // Circular motion with larger radius
  const radius = 25
  animatedPosition.value = {
    x: 50 + Math.cos(time) * radius,
    y: 50 + Math.sin(time) * radius
  }

  // Continuous rotation
  rotation.value = (time * 30) % 360

  animationId.value = requestAnimationFrame(autoAnimateEffect)
}

// Mouse handlers
const handleMouseMove = (event) => {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  mousePosition.value = {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

// Lifecycle
onMounted(() => {
  autoAnimateEffect()
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
})
</script>
