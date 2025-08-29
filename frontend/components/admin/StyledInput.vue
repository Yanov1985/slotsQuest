<template>
  <div>
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-[#E5E7EB] mb-2 flex items-center gap-2"
    >
      <svg
        v-if="icon"
        class="w-4 h-4"
        :class="iconColor"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="iconPath"
        />
      </svg>
      {{ label }}
      <span v-if="required" class="text-[#FF6E48]">*</span>
    </label>

    <!-- Input field -->
    <input
      v-if="type !== 'textarea' && type !== 'select'"
      :id="inputId"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :placeholder="placeholder"
      :class="[
        'w-full px-4 py-3 rounded-lg transition-all duration-200',
        'bg-[#1B1E26] border border-[#353A4A] text-[#E5E7EB] placeholder-[#9CA3AF]',
        'focus:outline-none focus:ring-2',
        focusColor,
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ]"
      :disabled="disabled"
    />

    <!-- Textarea -->
    <textarea
      v-else-if="type === 'textarea'"
      :id="inputId"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :placeholder="placeholder"
      :rows="rows || 3"
      :class="[
        'w-full px-4 py-3 rounded-lg transition-all duration-200 resize-vertical',
        'bg-[#1B1E26] border border-[#353A4A] text-[#E5E7EB] placeholder-[#9CA3AF]',
        'focus:outline-none focus:ring-2',
        focusColor,
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ]"
      :disabled="disabled"
    ></textarea>

    <!-- Select -->
    <select
      v-else-if="type === 'select'"
      :id="inputId"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :class="[
        'w-full px-4 py-3 rounded-lg transition-all duration-200',
        'bg-[#1B1E26] border border-[#353A4A] text-[#E5E7EB]',
        'focus:outline-none focus:ring-2',
        focusColor,
        disabled ? 'opacity-50 cursor-not-allowed' : '',
      ]"
      :disabled="disabled"
    >
      <slot />
    </select>

    <!-- Help text -->
    <p v-if="helpText" class="mt-1 text-xs text-[#9CA3AF]">
      {{ helpText }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  helpText: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'orange',
    validator: (value) => ['orange', 'cyan', 'green', 'pink'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 3,
  },
})

// Emits
defineEmits(['update:modelValue'])

// Generate unique ID
const inputId = computed(
  () => `input-${Math.random().toString(36).substr(2, 9)}`,
)

// Icon colors
const iconColors = {
  orange: 'text-[#FF6E48]',
  cyan: 'text-[#00EDFF]',
  green: 'text-[#63F3AB]',
  pink: 'text-[#CD0F8B]',
}

const iconColor = computed(() => iconColors[props.color])

// Focus colors
const focusColors = {
  orange: 'focus:ring-[#FF6E48] focus:border-[#FF6E48]',
  cyan: 'focus:ring-[#00EDFF] focus:border-[#00EDFF]',
  green: 'focus:ring-[#63F3AB] focus:border-[#63F3AB]',
  pink: 'focus:ring-[#CD0F8B] focus:border-[#CD0F8B]',
}

const focusColor = computed(() => focusColors[props.color])

// Icon paths mapping
const iconPaths = {
  tag: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
  link: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
  text: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  building:
    'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  photo:
    'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  chart:
    'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  calendar:
    'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
}

const iconPath = computed(() => iconPaths[props.icon] || '')
</script>
