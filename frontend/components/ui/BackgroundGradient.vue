<template>
  <div :class="['relative p-[2px] rounded-3xl group', containerClassName]">
    <!-- Основной слой-рамка с красивым градиентом -->
    <div
      class="absolute inset-0 rounded-3xl z-[1] transition-opacity duration-500 opacity-60 group-hover:opacity-100"
      style="background: linear-gradient(135deg, #00ccb1 0%, #7b61ff 50%, #ffc414 100%);"
    />

    <!-- Контент -->
    <div class="relative z-10 rounded-[22px] overflow-hidden" :class="className">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    className?: string
    containerClassName?: string
    animate?: boolean
  }>(),
  {
    className: '',
    containerClassName: '',
    animate: true
  }
)
</script>
