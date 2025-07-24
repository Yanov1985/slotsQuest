<template>
  <div
    :class="cn(
      'h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]',
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