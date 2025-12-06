<template>
  <!--
    📊 Indexing Status Component

    Отслеживает и отображает статус индексации страницы:
    - Статус в Google
    - Дата последнего обхода
    - Показы и клики из Search Console
    - Внутренние и внешние ссылки
  -->
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-xl border border-[#6366F1]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center">
          <span class="text-2xl">📊</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">Indexing Status</h3>
          <p class="text-sm text-[#9CA3AF]">Статус индексации в поисковых системах</p>
        </div>
      </div>
      <button
        type="button"
        @click="checkIndexingStatus"
        :disabled="checking"
        class="px-4 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        <svg v-if="checking" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span>{{ checking ? 'Проверка...' : '🔍 Проверить' }}</span>
      </button>
    </div>

    <!-- Status Overview -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Indexing Status -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <div
            class="w-3 h-3 rounded-full"
            :class="statusDotClass"
          ></div>
          <span class="text-xs text-[#9CA3AF]">Статус</span>
        </div>
        <p class="text-lg font-medium" :class="statusTextClass">{{ statusLabel }}</p>
        <p class="text-xs text-[#6B7280] mt-1">{{ lastCheckFormatted }}</p>
      </div>

      <!-- Search Position -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[#F59E0B]">📍</span>
          <span class="text-xs text-[#9CA3AF]">Позиция</span>
        </div>
        <p class="text-lg font-medium text-[#E5E7EB]">
          {{ modelValue.indexing_position ? modelValue.indexing_position.toFixed(1) : '—' }}
        </p>
        <p class="text-xs text-[#6B7280] mt-1">Средняя в поиске</p>
      </div>

      <!-- Impressions -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[#10B981]">👁️</span>
          <span class="text-xs text-[#9CA3AF]">Показы</span>
        </div>
        <p class="text-lg font-medium text-[#E5E7EB]">
          {{ formatNumber(modelValue.indexing_impressions || 0) }}
        </p>
        <p class="text-xs text-[#6B7280] mt-1">За последнюю неделю</p>
      </div>

      <!-- Clicks -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[#3B82F6]">🖱️</span>
          <span class="text-xs text-[#9CA3AF]">Клики</span>
        </div>
        <p class="text-lg font-medium text-[#E5E7EB]">
          {{ formatNumber(modelValue.indexing_clicks || 0) }}
        </p>
        <p class="text-xs text-[#6B7280] mt-1">Из поиска</p>
      </div>
    </div>

    <!-- Detailed Stats -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-4">📈 Детальная статистика</h4>

      <div class="grid grid-cols-2 gap-4">
        <!-- CTR -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-[#9CA3AF]">CTR</span>
            <span class="text-sm font-medium" :class="ctrClass">{{ ctrValue }}%</span>
          </div>
          <div class="w-full bg-[#353A4A] rounded-full h-2">
            <div
              class="h-2 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399]"
              :style="{ width: `${Math.min(ctrValue * 10, 100)}%` }"
            ></div>
          </div>
        </div>

        <!-- Crawl Frequency -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-[#9CA3AF]">Частота обхода</span>
          </div>
          <select
            v-model="modelValue.indexing_crawl_frequency"
            @change="updateField('indexing_crawl_frequency', $event.target.value)"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
          >
            <option value="daily">Ежедневно</option>
            <option value="weekly">Еженедельно</option>
            <option value="monthly">Ежемесячно</option>
          </select>
        </div>

        <!-- Internal Links -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-[#8B5CF6]">🔗</span>
            <span class="text-sm text-[#9CA3AF]">Внутренние ссылки</span>
          </div>
          <input
            type="number"
            v-model.number="modelValue.indexing_internal_links"
            @input="updateField('indexing_internal_links', $event.target.value)"
            min="0"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
          />
        </div>

        <!-- External Links -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-[#F59E0B]">🌐</span>
            <span class="text-sm text-[#9CA3AF]">Внешние бэклинки</span>
          </div>
          <input
            type="number"
            v-model.number="modelValue.indexing_external_links"
            @input="updateField('indexing_external_links', $event.target.value)"
            min="0"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
          />
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-4">📅 Хронология индексации</h4>

      <div class="space-y-4">
        <!-- First Indexed -->
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-[#10B981]/20 rounded-full flex items-center justify-center">
            <span class="text-[#10B981]">✓</span>
          </div>
          <div class="flex-1">
            <p class="text-sm text-[#E5E7EB]">Первая индексация</p>
            <input
              type="date"
              :value="formatDateForInput(modelValue.indexing_first_date)"
              @input="updateField('indexing_first_date', $event.target.value)"
              class="mt-1 px-3 py-1 bg-[#161A21] border border-[#353A4A] rounded text-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
          </div>
        </div>

        <!-- Last Crawl -->
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 bg-[#6366F1]/20 rounded-full flex items-center justify-center">
            <span class="text-[#6366F1]">🔄</span>
          </div>
          <div class="flex-1">
            <p class="text-sm text-[#E5E7EB]">Последний обход</p>
            <input
              type="date"
              :value="formatDateForInput(modelValue.indexing_last_crawl)"
              @input="updateField('indexing_last_crawl', $event.target.value)"
              class="mt-1 px-3 py-1 bg-[#161A21] border border-[#353A4A] rounded text-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Indexing Errors -->
    <div v-if="indexingErrors.length > 0" class="bg-[#1B1E26]/50 border border-[#EF4444]/30 rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#EF4444] mb-3">⚠️ Ошибки индексации</h4>
      <div class="space-y-2">
        <div
          v-for="(error, index) in indexingErrors"
          :key="index"
          class="flex items-start gap-2 p-2 bg-[#EF4444]/10 rounded-lg text-sm"
        >
          <span class="text-[#EF4444]">❌</span>
          <span class="text-[#FCA5A5]">{{ error }}</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3">⚡ Быстрые действия</h4>
      <div class="flex flex-wrap gap-2">
        <a
          :href="`https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(siteUrl)}&id=${encodeURIComponent(pageUrl)}`"
          target="_blank"
          class="px-3 py-2 bg-[#4285F4]/20 text-[#4285F4] border border-[#4285F4]/30 rounded-lg text-sm hover:bg-[#4285F4]/30 transition-colors flex items-center gap-2"
        >
          <span>🔍</span>
          <span>Проверить в Search Console</span>
        </a>
        <a
          :href="`https://www.google.com/search?q=site:${encodeURIComponent(pageUrl)}`"
          target="_blank"
          class="px-3 py-2 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-lg text-sm hover:bg-[#10B981]/30 transition-colors flex items-center gap-2"
        >
          <span>🌐</span>
          <span>Проверить в Google</span>
        </a>
        <button
          type="button"
          @click="requestIndexing"
          class="px-3 py-2 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 rounded-lg text-sm hover:bg-[#F59E0B]/30 transition-colors flex items-center gap-2"
        >
          <span>📤</span>
          <span>Запросить индексацию</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      indexing_status: 'unknown',
      indexing_first_date: null,
      indexing_last_crawl: null,
      indexing_crawl_frequency: 'weekly',
      indexing_impressions: 0,
      indexing_clicks: 0,
      indexing_position: null,
      indexing_internal_links: 0,
      indexing_external_links: 0,
      indexing_last_check: null,
      indexing_errors: null
    })
  },
  pageUrl: { type: String, default: '' },
  siteUrl: { type: String, default: '' }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// State
const checking = ref(false)

// Computed
const statusLabel = computed(() => {
  const statusMap = {
    'indexed': 'Проиндексировано',
    'not_indexed': 'Не индексировано',
    'pending': 'Ожидает',
    'error': 'Ошибка',
    'unknown': 'Неизвестно'
  }
  return statusMap[props.modelValue.indexing_status] || 'Неизвестно'
})

const statusDotClass = computed(() => {
  const statusClasses = {
    'indexed': 'bg-[#10B981]',
    'not_indexed': 'bg-[#EF4444]',
    'pending': 'bg-[#F59E0B]',
    'error': 'bg-[#EF4444]',
    'unknown': 'bg-[#6B7280]'
  }
  return statusClasses[props.modelValue.indexing_status] || 'bg-[#6B7280]'
})

const statusTextClass = computed(() => {
  const statusClasses = {
    'indexed': 'text-[#10B981]',
    'not_indexed': 'text-[#EF4444]',
    'pending': 'text-[#F59E0B]',
    'error': 'text-[#EF4444]',
    'unknown': 'text-[#9CA3AF]'
  }
  return statusClasses[props.modelValue.indexing_status] || 'text-[#9CA3AF]'
})

const lastCheckFormatted = computed(() => {
  if (!props.modelValue.indexing_last_check) return 'Не проверялось'
  return new Date(props.modelValue.indexing_last_check).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})

const ctrValue = computed(() => {
  const impressions = props.modelValue.indexing_impressions || 0
  const clicks = props.modelValue.indexing_clicks || 0
  if (impressions === 0) return 0
  return ((clicks / impressions) * 100).toFixed(2)
})

const ctrClass = computed(() => {
  const ctr = parseFloat(ctrValue.value)
  if (ctr >= 5) return 'text-[#10B981]'
  if (ctr >= 2) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
})

const indexingErrors = computed(() => {
  if (!props.modelValue.indexing_errors) return []
  try {
    return JSON.parse(props.modelValue.indexing_errors)
  } catch {
    return []
  }
})

// Methods
function updateField(field, value) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

function formatDateForInput(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toISOString().split('T')[0]
}

function checkIndexingStatus() {
  checking.value = true

  // Simulate API call to check indexing status
  setTimeout(() => {
    // In real implementation, this would call Google Search Console API
    const now = new Date().toISOString()
    updateField('indexing_last_check', now)

    // Simulate status update
    if (!props.modelValue.indexing_status || props.modelValue.indexing_status === 'unknown') {
      updateField('indexing_status', 'pending')
    }

    checking.value = false
  }, 1500)
}

function requestIndexing() {
  // Open Google Search Console URL inspection
  const inspectUrl = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(props.siteUrl)}`
  window.open(inspectUrl, '_blank')
}
</script>
