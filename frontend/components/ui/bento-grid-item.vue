<template>
  <div
    :class="cn(
      'group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
      className
    )"
  >
    <div v-if="header">
      <slot name="header" :header="header">
        <component :is="header" />
      </slot>
    </div>
    <div class="transition duration-200 group-hover/bento:translate-x-2">
      <div v-if="icon">
        <slot name="icon" :icon="icon">
          <component :is="icon" />
        </slot>
      </div>
      <div
        class="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200"
      >
        {{ title }}
      </div>
      <div
        class="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300"
      >
        {{ description }}
      </div>
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
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  header: {
    type: [String, Object, Function],
    default: null
  },
  icon: {
    type: [String, Object, Function],
    default: null
  }
})
</script>