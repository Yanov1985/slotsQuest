<template>
  <div
    :class="['relative overflow-hidden group', containerClassName]"
  >
    <div
      class="absolute inset-0 transition-opacity duration-700 opacity-30 group-hover:opacity-100"
      :style="gradientStyle"
    ></div>
    <div v-if="showGradient" class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to top, rgba(3, 7, 18, 1), rgba(3, 7, 18, 0.16) 84%);"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type RGB = [number, number, number]

const props = withDefaults(defineProps<{
  animationSpeed?: number
  opacities?: number[]
  colors?: RGB[]
  containerClassName?: string
  dotSize?: number
  showGradient?: boolean
  blendMode?: string
  intensity?: number
  waveAmplitude?: number
}>(), {
  animationSpeed: 0.4,
  opacities: () => [0.04, 0.04, 0.06, 0.06, 0.08, 0.12, 0.14, 0.18, 0.24, 0.32],
  colors: () => [[255, 255, 255]],
  containerClassName: '',
  dotSize: 3,
  showGradient: true,
  blendMode: 'normal',
  intensity: 1.0,
  waveAmplitude: 0.6,
})

const gradientStyle = computed(() => {
  const c = props.colors && props.colors.length > 0 ? props.colors[0] : [255, 255, 255]
  const colorStr = `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.4)`
  return {
    background: `radial-gradient(circle at center, ${colorStr} 0%, transparent 70%)`
  }
})
</script>
