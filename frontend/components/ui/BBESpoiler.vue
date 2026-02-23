<template>
  <div
    class="bg-white rounded-[21px] p-[21px] mb-2 transition-shadow duration-300"
    :class="{ 'shadow-[0_2px_8px_rgba(0,0,0,0.04)]': isOpen }"
  >
    <!-- Header (clickable) -->
    <button
      type="button"
      class="flex items-center justify-between w-full text-left group"
      @click="toggle"
      :aria-expanded="isOpen"
    >
      <!-- Title - стиль BBE: font-normal, серый цвет -->
      <span
        class="text-[19px] sm:text-[20px] md:text-[22px] font-normal text-[#171717]/60 pr-4 transition-colors duration-200 group-hover:text-[#171717]/80 leading-snug"
      >
        <slot name="title">{{ title }}</slot>
      </span>

      <!-- Toggle Button (круглая кнопка с плюсом в стиле BBE) -->
      <div
        class="w-7 h-7 bg-[#BDBDBD] rounded-full flex items-center justify-center transition-all duration-300 ease-out flex-shrink-0 group-hover:bg-[#9E9E9E]"
        :class="{ 'rotate-45': isOpen }"
      >
        <Icon name="solar:add-bold" class="w-4 h-4 text-white" />
      </div>
    </button>

    <!-- Content (smooth height animation using grid) -->
    <div
      class="grid transition-all duration-300 ease-out"
      :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="overflow-hidden">
        <div class="pt-4 text-[19px] text-[#171717]/60 leading-relaxed">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  defaultOpen: {
    type: Boolean,
    default: false,
  },
})

const isOpen = ref(props.defaultOpen)

const toggle = () => {
  isOpen.value = !isOpen.value
}

// Expose for parent component access
defineExpose({ isOpen, toggle })
</script>
