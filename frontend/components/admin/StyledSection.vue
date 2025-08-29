<template>
  <div
    :class="[
      'group rounded-xl p-6 transition-all duration-300 border',
      colorClasses[color],
      'hover:scale-[1.02] hover:shadow-lg',
    ]"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <div
          :class="[
            'w-12 h-12 rounded-xl flex items-center justify-center',
            iconBgClasses[color],
          ]"
        >
          <component :is="iconComponent" class="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 class="text-xl font-bold text-[#E5E7EB] font-display">
            {{ title }}
          </h3>
          <p :class="['text-sm', textClasses[color]]">{{ subtitle }}</p>
        </div>
      </div>
      <button
        v-if="collapsible"
        type="button"
        @click="$emit('toggle')"
        class="text-xs px-4 py-2 rounded-lg border border-[#353A4A] bg-[#1B1E26] hover:bg-[#353A4A] hover:text-[#E5E7EB] text-[#9CA3AF] transition-all duration-200 font-medium"
        :class="[
          `hover:border-${color === 'orange' ? '[#FF6E48]' : color === 'cyan' ? '[#00EDFF]' : color === 'green' ? '[#63F3AB]' : '[#CD0F8B]'}/40`,
        ]"
      >
        {{ isOpen ? 'Скрыть' : 'Показать' }}
      </button>
    </div>

    <div v-if="!collapsible || isOpen" class="space-y-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'orange',
    validator: (value) => ['orange', 'cyan', 'green', 'pink'].includes(value),
  },
  icon: {
    type: String,
    required: true,
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
})

// Emits
defineEmits(['toggle'])

// Color schemes
const colorClasses = {
  orange:
    'bg-gradient-to-r from-[#FF6E48]/10 to-[#CD5A3C]/10 border-[#FF6E48]/20 hover:border-[#FF6E48]/40',
  cyan: 'bg-gradient-to-r from-[#00EDFF]/10 to-[#01BFCF]/10 border-[#00EDFF]/20 hover:border-[#00EDFF]/40',
  green:
    'bg-gradient-to-r from-[#63F3AB]/10 to-[#51C58B]/10 border-[#63F3AB]/20 hover:border-[#63F3AB]/40',
  pink: 'bg-gradient-to-r from-[#CD0F8B]/10 to-[#CD0F8B]/10 border-[#CD0F8B]/20 hover:border-[#CD0F8B]/40',
}

const iconBgClasses = {
  orange: 'bg-gradient-to-br from-[#FF6E48] to-[#CD5A3C]',
  cyan: 'bg-gradient-to-br from-[#00EDFF] to-[#01BFCF]',
  green: 'bg-gradient-to-br from-[#63F3AB] to-[#51C58B]',
  pink: 'bg-gradient-to-br from-[#CD0F8B] to-[#CD0F8B]',
}

const textClasses = {
  orange: 'text-[#FF6E48]',
  cyan: 'text-[#00EDFF]',
  green: 'text-[#63F3AB]',
  pink: 'text-[#CD0F8B]',
}

// Icon component mapping
const iconComponents = {
  info: 'svg',
  link: 'svg',
  text: 'svg',
  building: 'svg',
  photo: 'svg',
  cog: 'svg',
  gift: 'svg',
  palette: 'svg',
  chart: 'svg',
}

const iconComponent = computed(() => {
  return iconComponents[props.icon] || 'svg'
})
</script>
