<template>
  <div
    :class="cn(
      'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
      className
    )"
  >
    <slot />
  </div>
</template>

<script setup>
import { cn } from '~/utils/cn'

defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>