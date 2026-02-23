<template>
  <div
    class="relative transition-all duration-500 ease-out transform-gpu will-change-transform lg:hover:scale-[1.02] lg:hover:-translate-y-1"
    :class="containerClassName"
  >
    <div
      :class="className"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>
