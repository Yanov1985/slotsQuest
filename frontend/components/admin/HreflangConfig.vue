<template>
  <!--
    🌍 Hreflang Configuration Component

    Настройка hreflang тегов для международного SEO.
    Поддерживает пресеты для быстрой настройки целевых гео.
  -->
  <div class="space-y-4">
    <!-- Главный переключатель -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#059669]/20 to-[#047857]/20 rounded-xl border border-[#059669]/30">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-[#059669] to-[#047857] rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 class="font-medium text-[#E5E7EB]">Hreflang Tags</h4>
          <p class="text-xs text-[#9CA3AF]">Международное SEO для целевых регионов</p>
        </div>
      </div>
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          v-model="localEnabled"
          class="sr-only peer"
        />
        <div class="w-11 h-6 bg-[#353A4A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#059669] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#059669]"></div>
        <span class="ml-3 text-sm font-medium text-[#E5E7EB]">{{ localEnabled ? 'Включено' : 'Выключено' }}</span>
      </label>
    </div>

    <!-- Preset Selection -->
    <div v-if="localEnabled" class="space-y-4">
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3">
          🎯 Пресет целевых регионов
        </label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="preset in presets"
            :key="preset.id"
            type="button"
            @click="selectPreset(preset.id)"
            :class="[
              'p-3 rounded-lg border text-left transition-all duration-200',
              localPreset === preset.id
                ? 'bg-[#059669]/20 border-[#059669] text-[#10B981]'
                : 'bg-[#1B1E26] border-[#353A4A] text-[#9CA3AF] hover:border-[#059669]/40'
            ]"
          >
            <div class="text-lg mb-1">{{ preset.icon }}</div>
            <div class="text-sm font-medium">{{ preset.name }}</div>
            <div class="text-xs text-[#6B7280]">{{ preset.regions.length }} регионов</div>
          </button>
        </div>
      </div>

      <!-- Selected Regions -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-[#E5E7EB]">
            🌍 Активные регионы
          </label>
          <span class="text-xs text-[#9CA3AF]">{{ selectedRegions.length }} выбрано</span>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="region in allRegions"
            :key="region.code"
            type="button"
            @click="toggleRegion(region.code)"
            :class="[
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2',
              selectedRegions.includes(region.code)
                ? 'bg-[#059669] text-white'
                : 'bg-[#1B1E26] border border-[#353A4A] text-[#9CA3AF] hover:border-[#059669]/40'
            ]"
          >
            <span>{{ region.flag }}</span>
            <span>{{ region.code }}</span>
          </button>
        </div>
      </div>

      <!-- Generated Hreflang Preview -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-medium text-[#E5E7EB]">
            📝 Сгенерированные hreflang теги
          </label>
          <button
            type="button"
            @click="copyHreflang"
            class="text-xs text-[#059669] hover:text-[#10B981] transition-colors"
          >
            📋 Копировать
          </button>
        </div>

        <pre class="bg-[#161A21] rounded-lg p-3 text-xs text-[#9CA3AF] overflow-x-auto font-mono max-h-48 overflow-y-auto">{{ generatedHreflang }}</pre>
      </div>

      <!-- Language Mapping Info -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <h5 class="text-sm font-medium text-[#E5E7EB] mb-3 flex items-center gap-2">
          <svg class="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Маппинг языков по регионам
        </h5>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div v-for="region in selectedRegionDetails" :key="region.code" class="flex items-center gap-2 p-2 bg-[#161A21] rounded">
            <span>{{ region.flag }}</span>
            <span class="text-[#E5E7EB]">{{ region.code }}</span>
            <span class="text-[#6B7280]">→</span>
            <span class="text-[#059669]">{{ region.lang }}-{{ region.code }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  enabled: {
    type: Boolean,
    default: true
  },
  preset: {
    type: String,
    default: 'international'
  },
  regions: {
    type: Array,
    default: () => []
  },
  slug: {
    type: String,
    default: 'slot-name'
  },
  baseUrl: {
    type: String,
    default: 'https://slotquest.com'
  }
})

// Emits
const emit = defineEmits(['update:enabled', 'update:preset', 'update:regions', 'update:config'])

// All available regions with language mapping
const allRegions = [
  // CIS & Eastern Europe
  { code: 'RU', flag: '🇷🇺', name: 'Россия', lang: 'ru' },
  { code: 'UA', flag: '🇺🇦', name: 'Украина', lang: 'uk' },
  { code: 'KZ', flag: '🇰🇿', name: 'Казахстан', lang: 'ru' },
  { code: 'UZ', flag: '🇺🇿', name: 'Узбекистан', lang: 'uz' },
  { code: 'AZ', flag: '🇦🇿', name: 'Азербайджан', lang: 'az' },

  // South Asia
  { code: 'IN', flag: '🇮🇳', name: 'Индия', lang: 'en' },
  { code: 'BD', flag: '🇧🇩', name: 'Бангладеш', lang: 'bn' },
  { code: 'PK', flag: '🇵🇰', name: 'Пакистан', lang: 'ur' },

  // Latin America
  { code: 'BR', flag: '🇧🇷', name: 'Бразилия', lang: 'pt' },
  { code: 'CL', flag: '🇨🇱', name: 'Чили', lang: 'es' },
  { code: 'AR', flag: '🇦🇷', name: 'Аргентина', lang: 'es' },
  { code: 'CO', flag: '🇨🇴', name: 'Колумбия', lang: 'es' },
  { code: 'MX', flag: '🇲🇽', name: 'Мексика', lang: 'es' },
  { code: 'PE', flag: '🇵🇪', name: 'Перу', lang: 'es' },

  // Asia Pacific
  { code: 'ID', flag: '🇮🇩', name: 'Индонезия', lang: 'id' },
  { code: 'TH', flag: '🇹🇭', name: 'Таиланд', lang: 'th' },
  { code: 'VN', flag: '🇻🇳', name: 'Вьетнам', lang: 'vi' },
  { code: 'PH', flag: '🇵🇭', name: 'Филиппины', lang: 'en' },

  // Middle East & Africa
  { code: 'TR', flag: '🇹🇷', name: 'Турция', lang: 'tr' },
  { code: 'NG', flag: '🇳🇬', name: 'Нигерия', lang: 'en' },
  { code: 'ZA', flag: '🇿🇦', name: 'ЮАР', lang: 'en' },
  { code: 'KE', flag: '🇰🇪', name: 'Кения', lang: 'en' },

  // Europe & North America
  { code: 'CA', flag: '🇨🇦', name: 'Канада', lang: 'en' },
  { code: 'DE', flag: '🇩🇪', name: 'Германия', lang: 'de' },
  { code: 'GB', flag: '🇬🇧', name: 'UK', lang: 'en' },
]

// Presets
const presets = [
  {
    id: 'international',
    name: 'International',
    icon: '🌍',
    regions: ['RU', 'IN', 'BR', 'UZ', 'AZ', 'TR', 'CL', 'AR', 'CA', 'CO', 'ID', 'BD']
  },
  {
    id: 'cis',
    name: 'СНГ',
    icon: '🏛️',
    regions: ['RU', 'UA', 'KZ', 'UZ', 'AZ']
  },
  {
    id: 'latam',
    name: 'LATAM',
    icon: '🌎',
    regions: ['BR', 'CL', 'AR', 'CO', 'MX', 'PE']
  },
  {
    id: 'asia',
    name: 'Asia',
    icon: '🌏',
    regions: ['IN', 'BD', 'ID', 'TH', 'VN', 'PH']
  }
]

// Local state
const localEnabled = ref(props.enabled)
const localPreset = ref(props.preset)
const selectedRegions = ref(props.regions.length > 0 ? props.regions : presets[0].regions)

// Watch for prop changes
watch(() => props.enabled, (val) => { localEnabled.value = val })
watch(() => props.preset, (val) => { localPreset.value = val })
watch(() => props.regions, (val) => { if (val.length > 0) selectedRegions.value = val })

// Watch local changes and emit
watch(localEnabled, (val) => {
  emit('update:enabled', val)
  emitConfig()
})

watch(localPreset, (val) => {
  emit('update:preset', val)
  emitConfig()
})

watch(selectedRegions, (val) => {
  emit('update:regions', val)
  emitConfig()
}, { deep: true })

// Computed
const selectedRegionDetails = computed(() => {
  return selectedRegions.value.map(code => {
    return allRegions.find(r => r.code === code) || { code, flag: '🏳️', name: code, lang: 'en' }
  })
})

const generatedHreflang = computed(() => {
  if (!localEnabled.value) return '<!-- Hreflang отключён -->'

  const baseUrl = props.baseUrl
  const slug = props.slug

  let html = '<!-- Hreflang tags for international SEO -->\n'

  // x-default (English)
  html += `<link rel="alternate" hreflang="x-default" href="${baseUrl}/slots/${slug}" />\n`
  html += `<link rel="alternate" hreflang="en" href="${baseUrl}/slots/${slug}" />\n`

  // Regional hreflang
  selectedRegionDetails.value.forEach(region => {
    const hreflang = `${region.lang}-${region.code}`
    html += `<link rel="alternate" hreflang="${hreflang}" href="${baseUrl}/slots/${slug}" />\n`
  })

  return html.trim()
})

// Methods
function selectPreset(presetId) {
  localPreset.value = presetId
  const preset = presets.find(p => p.id === presetId)
  if (preset) {
    selectedRegions.value = [...preset.regions]
  }
}

function toggleRegion(code) {
  const index = selectedRegions.value.indexOf(code)
  if (index > -1) {
    selectedRegions.value.splice(index, 1)
  } else {
    selectedRegions.value.push(code)
  }
  // Switch to custom preset when manually editing
  localPreset.value = 'custom'
}

function copyHreflang() {
  navigator.clipboard.writeText(generatedHreflang.value)
}

function emitConfig() {
  // Emit full config as JSON
  const config = selectedRegionDetails.value.map(r => ({
    lang: r.lang,
    region: r.code,
    url: `/slots/${props.slug}`
  }))
  emit('update:config', JSON.stringify(config))
}

// Initial emit
emitConfig()
</script>
