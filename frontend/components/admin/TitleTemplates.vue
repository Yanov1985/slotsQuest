<template>
  <!--
    🎯 Title Templates Component

    Title template system with variables:
    - {name} - slot name
    - {provider} - provider
    - {rtp} - RTP
    - {volatility} - volatility
    - {max_win} - max win
    - {year} - current year
    - {rating} - rating
  -->
  <div class="space-y-4">
    <!-- Переключатель режима -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#F59E0B]/20 to-[#D97706]/20 rounded-xl border border-[#F59E0B]/30">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div>
          <h4 class="font-medium text-[#E5E7EB]">Title Template System</h4>
          <p class="text-xs text-[#9CA3AF]">Automatic SEO title generation</p>
        </div>
      </div>
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          v-model="localUseTemplate"
          class="sr-only peer"
        />
        <div class="w-11 h-6 bg-[#353A4A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#F59E0B] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F59E0B]"></div>
        <span class="ml-3 text-sm font-medium text-[#E5E7EB]">{{ localUseTemplate ? 'Template' : 'Manual' }}</span>
      </label>
    </div>

    <!-- Template Editor -->
    <div v-if="localUseTemplate" class="space-y-4">
      <!-- Preset Templates -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3">
          📋 Preset Templates
        </label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            v-for="preset in presetTemplates"
            :key="preset.id"
            type="button"
            @click="selectPreset(preset.template)"
            :class="[
              'p-3 rounded-lg border text-left transition-all duration-200 text-sm',
              localTemplate === preset.template
                ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#FBBF24]'
                : 'bg-[#1B1E26] border-[#353A4A] text-[#9CA3AF] hover:border-[#F59E0B]/40'
            ]"
          >
            <div class="font-medium text-[#E5E7EB] mb-1">{{ preset.name }}</div>
            <div class="text-xs font-mono text-[#6B7280]">{{ preset.template }}</div>
          </button>
        </div>
      </div>

      <!-- Custom Template Input -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3">
          ✏️ Custom Template
        </label>
        <textarea
          v-model="localTemplate"
          rows="2"
          placeholder="{name} Slot by {provider} | Play Free Demo {year}"
          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all duration-200 font-mono text-sm"
        ></textarea>
      </div>

      <!-- Available Variables -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3">
          🔧 Available Variables
        </label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="variable in availableVariables"
            :key="variable.key"
            type="button"
            @click="insertVariable(variable.key)"
            class="px-3 py-1.5 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-xs font-mono text-[#9CA3AF] hover:border-[#F59E0B]/40 hover:text-[#F59E0B] transition-all duration-200 flex items-center gap-2"
          >
            <span class="text-[#F59E0B]">{</span>{{ variable.key }}<span class="text-[#F59E0B]">}</span>
            <span class="text-[#6B7280]">→</span>
            <span class="text-[#E5E7EB]">{{ variable.example }}</span>
          </button>
        </div>
      </div>

      <!-- Power Words -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3">
          ⚡ Power Words
        </label>
        <div class="flex flex-wrap gap-2 mb-3">
          <button
            v-for="word in powerWordOptions"
            :key="word"
            type="button"
            @click="togglePowerWord(word)"
            :class="[
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              selectedPowerWords.includes(word)
                ? 'bg-[#F59E0B] text-white'
                : 'bg-[#1B1E26] border border-[#353A4A] text-[#9CA3AF] hover:border-[#F59E0B]/40'
            ]"
          >
            {{ word }}
          </button>
        </div>
        <p class="text-xs text-[#9CA3AF]">
          💡 Selected words will be added to the title to improve CTR
        </p>
      </div>

      <!-- Preview -->
      <div class="bg-[#1B1E26]/50 border border-[#10B981]/30 rounded-lg p-4">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-[#E5E7EB] flex items-center gap-2">
            <svg class="w-4 h-4 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Title Preview
          </label>
          <span
            class="text-xs font-mono"
            :class="generatedTitle.length > 60 ? 'text-[#EF4444]' : 'text-[#10B981]'"
          >
            {{ generatedTitle.length }}/60
          </span>
        </div>
        <div class="bg-[#161A21] rounded-lg p-4">
          <p class="text-[#1A0DAB] text-lg hover:underline cursor-pointer">
            {{ generatedTitle || 'Fill in the template for preview...' }}
          </p>
        </div>
        <div v-if="generatedTitle.length > 60" class="mt-2 text-xs text-[#EF4444] flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Title will be truncated in Google (max 60 characters)
        </div>
      </div>
    </div>

    <!-- Manual Mode Info -->
    <div v-else class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4 text-center">
      <p class="text-[#9CA3AF] text-sm">
        Manual mode: use the SEO Title field above to enter the title manually
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  template: { type: String, default: '' },
  useTemplate: { type: Boolean, default: false },
  powerWords: { type: String, default: '' },
  // Данные слота для подстановки
  slotName: { type: String, default: 'Gates of Olympus' },
  providerName: { type: String, default: 'Pragmatic Play' },
  rtp: { type: [String, Number], default: '96.50' },
  volatility: { type: String, default: 'High' },
  maxWin: { type: [String, Number], default: '5000' },
  rating: { type: [String, Number], default: '4.8' }
})

// Emits
const emit = defineEmits([
  'update:template',
  'update:useTemplate',
  'update:powerWords',
  'update:generatedTitle'
])

// Preset templates
const presetTemplates = [
  {
    id: 'standard',
    name: 'Standard',
    template: '{name} Slot by {provider} | Play Free Demo {year}'
  },
  {
    id: 'rtp-focused',
    name: 'RTP Focused',
    template: '{name} - RTP {rtp}% | {volatility} Volatility Slot'
  },
  {
    id: 'win-focused',
    name: 'Win Focused',
    template: 'Play {name} | Max Win {max_win}x | Free Demo & Real Money'
  },
  {
    id: 'branded',
    name: 'Branded',
    template: '{name} 🎰 by {provider} | SlotQuest Review {year}'
  },
  {
    id: 'review',
    name: 'Review',
    template: '{name} Slot Review - ★{rating}/5 | {provider} | {year}'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    template: '{name} | Free Slot Demo | SlotQuest'
  }
]

// Available variables
const availableVariables = [
  { key: 'name', example: 'Gates of Olympus' },
  { key: 'provider', example: 'Pragmatic Play' },
  { key: 'rtp', example: '96.50' },
  { key: 'volatility', example: 'High' },
  { key: 'max_win', example: '5000' },
  { key: 'rating', example: '4.8' },
  { key: 'year', example: new Date().getFullYear().toString() }
]

// Power words options
const powerWordOptions = [
  'Free', 'Demo', 'Play', 'Win', 'Bonus',
  'New', 'Exclusive', 'Best', 'Top', 'Hot',
  'Jackpot', 'Spins', 'Real Money', '2025'
]

// Local state
const localTemplate = ref(props.template || presetTemplates[0].template)
const localUseTemplate = ref(props.useTemplate)
const selectedPowerWords = ref(props.powerWords ? props.powerWords.split(',').map(w => w.trim()) : [])

// Watch props
watch(() => props.template, (val) => { if (val) localTemplate.value = val })
watch(() => props.useTemplate, (val) => { localUseTemplate.value = val })
watch(() => props.powerWords, (val) => {
  if (val) selectedPowerWords.value = val.split(',').map(w => w.trim())
})

// Watch local and emit
watch(localTemplate, (val) => {
  emit('update:template', val)
  emit('update:generatedTitle', generatedTitle.value)
})

watch(localUseTemplate, (val) => {
  emit('update:useTemplate', val)
})

watch(selectedPowerWords, () => {
  emit('update:powerWords', selectedPowerWords.value.join(','))
}, { deep: true })

// Computed
const generatedTitle = computed(() => {
  if (!localTemplate.value) return ''

  let title = localTemplate.value

  // Replace variables
  title = title.replace(/{name}/g, props.slotName || 'Slot Name')
  title = title.replace(/{provider}/g, props.providerName || 'Provider')
  title = title.replace(/{rtp}/g, String(props.rtp || '96.50'))
  title = title.replace(/{volatility}/g, props.volatility || 'High')
  title = title.replace(/{max_win}/g, String(props.maxWin || '5000'))
  title = title.replace(/{rating}/g, String(props.rating || '4.8'))
  title = title.replace(/{year}/g, new Date().getFullYear().toString())

  return title
})

// Watch generated title and emit
watch(generatedTitle, (val) => {
  emit('update:generatedTitle', val)
})

// Methods
function selectPreset(template) {
  localTemplate.value = template
}

function insertVariable(key) {
  localTemplate.value += `{${key}}`
}

function togglePowerWord(word) {
  const index = selectedPowerWords.value.indexOf(word)
  if (index > -1) {
    selectedPowerWords.value.splice(index, 1)
  } else {
    selectedPowerWords.value.push(word)
  }
}
</script>
