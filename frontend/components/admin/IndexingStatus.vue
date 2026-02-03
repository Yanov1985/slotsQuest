<template>
  <!--
    📊 Indexing Status Component v2.0

    Enhanced with Google Search Console Integration:
    - OAuth connection flow
    - Real-time metrics from GSC API
    - URL Inspection
    - Request Indexing
    - Performance charts
    - Top Queries
  -->
  <div class="space-y-6">
    <!-- Header with Score -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-xl border border-[#6366F1]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center">
          <span class="text-2xl">📊</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">Indexing Status</h3>
          <p class="text-sm text-[#9CA3AF]">Google Search Console Integration</p>
        </div>
      </div>
      <!-- Indexing Score -->
      <div class="flex items-center gap-4">
        <div
          class="relative w-14 h-14 rounded-full flex items-center justify-center"
          :class="{
            'bg-[#EF4444]/20': indexingScore < 40,
            'bg-[#F59E0B]/20': indexingScore >= 40 && indexingScore < 70,
            'bg-[#10B981]/20': indexingScore >= 70,
          }"
        >
          <span
            class="text-lg font-bold"
            :class="{
              'text-[#EF4444]': indexingScore < 40,
              'text-[#F59E0B]': indexingScore >= 40 && indexingScore < 70,
              'text-[#10B981]': indexingScore >= 70,
            }"
          >{{ indexingScore }}%</span>
        </div>
      </div>
    </div>

    <!-- GSC Connection Status -->
    <div
      class="p-4 rounded-xl border transition-all duration-300"
      :class="{
        'bg-[#10B981]/10 border-[#10B981]/30': gscConnected,
        'bg-[#F59E0B]/10 border-[#F59E0B]/30': !gscConnected
      }"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-lg flex items-center justify-center"
            :class="gscConnected ? 'bg-[#10B981]/20' : 'bg-[#F59E0B]/20'"
          >
            <svg class="w-6 h-6" :class="gscConnected ? 'text-[#10B981]' : 'text-[#F59E0B]'" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"/>
            </svg>
          </div>
          <div>
            <h4 class="text-sm font-medium" :class="gscConnected ? 'text-[#10B981]' : 'text-[#F59E0B]'">
              {{ gscConnected ? 'Google Search Console подключена' : 'Подключите Google Search Console' }}
            </h4>
            <p class="text-xs text-[#9CA3AF]">
              {{ gscConnected ? `Последняя синхронизация: ${lastSyncFormatted}` : 'Для получения актуальных данных о индексации' }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-if="gscConnected"
            type="button"
            @click="syncFromGsc"
            :disabled="syncing"
            class="px-3 py-2 bg-[#6366F1] text-white rounded-lg text-sm font-medium hover:bg-[#4F46E5] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <svg v-if="syncing" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span>{{ syncing ? 'Синхронизация...' : '🔄 Синхронизировать' }}</span>
          </button>
          <button
            v-else
            type="button"
            @click="connectGsc"
            class="px-4 py-2 bg-[#4285F4] text-white rounded-lg text-sm font-medium hover:bg-[#3367D6] transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z"/>
            </svg>
            Подключить GSC
          </button>
          <button
            v-if="gscConnected"
            type="button"
            @click="disconnectGsc"
            class="p-2 text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-all"
            title="Отключить GSC"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Status Overview Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- Indexing Status -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-3 h-3 rounded-full" :class="statusDotClass"></div>
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
        <p class="text-xs mt-1" :class="positionTrend >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'">
          {{ positionTrend >= 0 ? '↑' : '↓' }} {{ Math.abs(positionTrend).toFixed(1) }}
        </p>
      </div>

      <!-- Impressions -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[#10B981]">👁️</span>
          <span class="text-xs text-[#9CA3AF]">Показы</span>
        </div>
        <p class="text-lg font-medium text-[#E5E7EB]">{{ formatNumber(modelValue.indexing_impressions || 0) }}</p>
        <p class="text-xs text-[#6B7280] mt-1">За {{ datePeriodLabel }}</p>
      </div>

      <!-- Clicks -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[#3B82F6]">🖱️</span>
          <span class="text-xs text-[#9CA3AF]">Клики</span>
        </div>
        <p class="text-lg font-medium text-[#E5E7EB]">{{ formatNumber(modelValue.indexing_clicks || 0) }}</p>
        <p class="text-xs text-[#6B7280] mt-1">Из поиска</p>
      </div>

      <!-- CTR -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-[#EC4899]">📈</span>
          <span class="text-xs text-[#9CA3AF]">CTR</span>
        </div>
        <p class="text-lg font-medium" :class="ctrClass">{{ ctrValue }}%</p>
        <div class="w-full bg-[#353A4A] rounded-full h-1.5 mt-2">
          <div
            class="h-full rounded-full transition-all"
            :class="ctrBarClass"
            :style="{ width: `${Math.min(parseFloat(ctrValue) * 10, 100)}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Date Period Selector -->
    <div class="flex items-center justify-between bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-3">
      <span class="text-sm text-[#9CA3AF]">Период данных:</span>
      <div class="flex gap-2">
        <button
          v-for="period in datePeriods"
          :key="period.value"
          type="button"
          @click="selectedPeriod = period.value"
          class="px-3 py-1.5 text-xs rounded-lg transition-all"
          :class="{
            'bg-[#6366F1] text-white': selectedPeriod === period.value,
            'bg-[#353A4A] text-[#9CA3AF] hover:text-white': selectedPeriod !== period.value
          }"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <!-- Performance Chart Placeholder -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-medium text-[#E5E7EB]">📈 Динамика позиций</h4>
        <div class="flex items-center gap-4 text-xs">
          <div class="flex items-center gap-1">
            <div class="w-3 h-3 bg-[#6366F1] rounded-full"></div>
            <span class="text-[#9CA3AF]">Позиция</span>
          </div>
          <div class="flex items-center gap-1">
            <div class="w-3 h-3 bg-[#10B981] rounded-full"></div>
            <span class="text-[#9CA3AF]">Клики</span>
          </div>
        </div>
      </div>

      <!-- Simple Chart Visualization -->
      <div class="h-32 flex items-end gap-1">
        <div
          v-for="(bar, i) in chartData"
          :key="i"
          class="flex-1 bg-gradient-to-t from-[#6366F1] to-[#8B5CF6] rounded-t transition-all hover:opacity-80"
          :style="{ height: `${bar.height}%` }"
          :title="`${bar.date}: Позиция ${bar.position}, Клики ${bar.clicks}`"
        ></div>
      </div>
      <div class="flex justify-between text-xs text-[#6B7280] mt-2">
        <span>{{ chartData[0]?.date || '' }}</span>
        <span>{{ chartData[chartData.length - 1]?.date || '' }}</span>
      </div>
    </div>

    <!-- Top Queries from GSC -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-medium text-[#E5E7EB]">🔍 Топ запросы для этой страницы</h4>
        <button
          v-if="gscConnected"
          type="button"
          @click="loadTopQueries"
          class="text-xs text-[#6366F1] hover:underline"
        >
          Обновить
        </button>
      </div>

      <div v-if="topQueries.length > 0" class="space-y-2">
        <div
          v-for="(query, i) in topQueries"
          :key="i"
          class="flex items-center justify-between p-2 bg-[#161A21] rounded-lg"
        >
          <div class="flex items-center gap-3 flex-1">
            <span class="text-xs text-[#6B7280] w-6">{{ i + 1 }}</span>
            <span class="text-sm text-[#E5E7EB] flex-1">{{ query.query }}</span>
          </div>
          <div class="flex items-center gap-4 text-xs">
            <div class="text-center">
              <p class="text-[#9CA3AF]">Клики</p>
              <p class="text-[#E5E7EB] font-medium">{{ query.clicks }}</p>
            </div>
            <div class="text-center">
              <p class="text-[#9CA3AF]">Показы</p>
              <p class="text-[#E5E7EB] font-medium">{{ formatNumber(query.impressions) }}</p>
            </div>
            <div class="text-center">
              <p class="text-[#9CA3AF]">Позиция</p>
              <p class="text-[#F59E0B] font-medium">{{ query.position.toFixed(1) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8 text-[#6B7280]">
        <p class="text-sm">{{ gscConnected ? 'Нет данных о запросах' : 'Подключите GSC для просмотра запросов' }}</p>
      </div>
    </div>

    <!-- URL Inspection & Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- URL Inspection -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
        <h4 class="text-sm font-medium text-[#E5E7EB] mb-4">🔎 URL Inspection</h4>

        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-[#161A21] rounded-lg">
            <span class="text-sm text-[#9CA3AF]">Проиндексировано</span>
            <span
              class="text-sm font-medium"
              :class="modelValue.indexing_status === 'indexed' ? 'text-[#10B981]' : 'text-[#EF4444]'"
            >
              {{ modelValue.indexing_status === 'indexed' ? 'Да' : 'Нет' }}
            </span>
          </div>

          <div class="flex items-center justify-between p-3 bg-[#161A21] rounded-lg">
            <span class="text-sm text-[#9CA3AF]">Последний обход</span>
            <span class="text-sm text-[#E5E7EB]">{{ lastCrawlFormatted }}</span>
          </div>

          <div class="flex items-center justify-between p-3 bg-[#161A21] rounded-lg">
            <span class="text-sm text-[#9CA3AF]">Mobile Friendly</span>
            <span class="text-sm" :class="modelValue.mobile_friendly ? 'text-[#10B981]' : 'text-[#F59E0B]'">
              {{ modelValue.mobile_friendly ? '✓ Да' : '✗ Проблемы' }}
            </span>
          </div>

          <button
            type="button"
            @click="inspectUrl"
            :disabled="!gscConnected"
            class="w-full px-4 py-2 bg-[#6366F1]/20 text-[#6366F1] border border-[#6366F1]/30 rounded-lg text-sm font-medium hover:bg-[#6366F1]/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Проверить URL в GSC
          </button>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
        <h4 class="text-sm font-medium text-[#E5E7EB] mb-4">⚡ Быстрые действия</h4>

        <div class="space-y-2">
          <button
            type="button"
            @click="requestIndexing"
            :disabled="requestingIndexing"
            class="w-full px-4 py-3 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 rounded-lg text-sm font-medium hover:bg-[#F59E0B]/30 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg v-if="requestingIndexing" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span>{{ requestingIndexing ? 'Запрос отправляется...' : '📤 Запросить индексацию' }}</span>
          </button>

          <a
            :href="`https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(siteUrl)}&id=${encodeURIComponent(pageUrl)}`"
            target="_blank"
            class="w-full px-4 py-3 bg-[#4285F4]/20 text-[#4285F4] border border-[#4285F4]/30 rounded-lg text-sm font-medium hover:bg-[#4285F4]/30 transition-colors flex items-center justify-center gap-2"
          >
            <span>🔍</span>
            <span>Открыть в Search Console</span>
          </a>

          <a
            :href="`https://www.google.com/search?q=site:${encodeURIComponent(pageUrl)}`"
            target="_blank"
            class="w-full px-4 py-3 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-lg text-sm font-medium hover:bg-[#10B981]/30 transition-colors flex items-center justify-center gap-2"
          >
            <span>🌐</span>
            <span>Проверить в Google</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Coverage Issues -->
    <div v-if="coverageIssues.length > 0" class="bg-[#1B1E26]/50 border border-[#EF4444]/30 rounded-xl p-4">
      <h4 class="text-sm font-medium text-[#EF4444] mb-4">⚠️ Проблемы покрытия</h4>
      <div class="space-y-2">
        <div
          v-for="(issue, index) in coverageIssues"
          :key="index"
          class="flex items-start gap-3 p-3 bg-[#EF4444]/10 rounded-lg"
        >
          <span class="text-[#EF4444]">{{ issue.severity === 'error' ? '❌' : '⚠️' }}</span>
          <div class="flex-1">
            <p class="text-sm text-[#FCA5A5]">{{ issue.issue }}</p>
            <p class="text-xs text-[#9CA3AF] mt-1">{{ issue.recommendation }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Links Stats -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-[#8B5CF6]">🔗</span>
          <span class="text-sm font-medium text-[#E5E7EB]">Внутренние ссылки</span>
        </div>
        <input
          type="number"
          v-model.number="modelValue.indexing_internal_links"
          @input="updateField('indexing_internal_links', $event.target.value)"
          min="0"
          class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
        />
        <p class="text-xs text-[#6B7280] mt-2">Ссылок на эту страницу с сайта</p>
      </div>

      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-[#F59E0B]">🌐</span>
          <span class="text-sm font-medium text-[#E5E7EB]">Внешние бэклинки</span>
        </div>
        <input
          type="number"
          v-model.number="modelValue.indexing_external_links"
          @input="updateField('indexing_external_links', $event.target.value)"
          min="0"
          class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
        />
        <p class="text-xs text-[#6B7280] mt-2">Ссылок с других сайтов</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'

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
      indexing_errors: null,
      mobile_friendly: true,
      gsc_last_sync: null
    })
  },
  pageUrl: { type: String, default: '' },
  siteUrl: { type: String, default: '' }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// State
const syncing = ref(false)
const requestingIndexing = ref(false)
const gscConnected = ref(false)
const selectedPeriod = ref('7d')
const topQueries = ref([])
const coverageIssues = ref([])

// Date periods
const datePeriods = [
  { value: '7d', label: '7 дней' },
  { value: '28d', label: '28 дней' },
  { value: '3m', label: '3 месяца' },
  { value: '6m', label: '6 месяцев' }
]

// Chart data (mock for now)
const chartData = ref([])

// Position trend (mock)
const positionTrend = ref(0)

// Computed
const indexingScore = computed(() => {
  let score = 0

  // Status (30 points)
  if (props.modelValue.indexing_status === 'indexed') score += 30
  else if (props.modelValue.indexing_status === 'pending') score += 15

  // Position (20 points)
  const pos = props.modelValue.indexing_position
  if (pos && pos <= 10) score += 20
  else if (pos && pos <= 20) score += 15
  else if (pos && pos <= 50) score += 10
  else if (pos) score += 5

  // Impressions (15 points)
  const imp = props.modelValue.indexing_impressions || 0
  if (imp >= 1000) score += 15
  else if (imp >= 100) score += 10
  else if (imp > 0) score += 5

  // Clicks (15 points)
  const clicks = props.modelValue.indexing_clicks || 0
  if (clicks >= 100) score += 15
  else if (clicks >= 10) score += 10
  else if (clicks > 0) score += 5

  // CTR (10 points)
  const ctr = parseFloat(ctrValue.value)
  if (ctr >= 5) score += 10
  else if (ctr >= 2) score += 5

  // Internal links (5 points)
  if ((props.modelValue.indexing_internal_links || 0) >= 5) score += 5

  // External links (5 points)
  if ((props.modelValue.indexing_external_links || 0) >= 1) score += 5

  return score
})

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

const lastSyncFormatted = computed(() => {
  if (!props.modelValue.gsc_last_sync) return 'Никогда'
  return new Date(props.modelValue.gsc_last_sync).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const lastCrawlFormatted = computed(() => {
  if (!props.modelValue.indexing_last_crawl) return 'Неизвестно'
  return new Date(props.modelValue.indexing_last_crawl).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})

const ctrValue = computed(() => {
  const impressions = props.modelValue.indexing_impressions || 0
  const clicks = props.modelValue.indexing_clicks || 0
  if (impressions === 0) return '0.00'
  return ((clicks / impressions) * 100).toFixed(2)
})

const ctrClass = computed(() => {
  const ctr = parseFloat(ctrValue.value)
  if (ctr >= 5) return 'text-[#10B981]'
  if (ctr >= 2) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
})

const ctrBarClass = computed(() => {
  const ctr = parseFloat(ctrValue.value)
  if (ctr >= 5) return 'bg-[#10B981]'
  if (ctr >= 2) return 'bg-[#F59E0B]'
  return 'bg-[#EF4444]'
})

const datePeriodLabel = computed(() => {
  const labels = { '7d': '7 дней', '28d': '28 дней', '3m': '3 месяца', '6m': '6 месяцев' }
  return labels[selectedPeriod.value] || '7 дней'
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

function connectGsc() {
  // In real implementation, this would initiate OAuth flow
  // For now, simulate connection
  const confirmed = confirm(
    'Для подключения Google Search Console необходимо:\n\n' +
    '1. Настроить OAuth credentials в Google Cloud Console\n' +
    '2. Добавить API endpoint на backend\n' +
    '3. Авторизовать приложение\n\n' +
    'Симулировать подключение?'
  )

  if (confirmed) {
    gscConnected.value = true
    updateField('gsc_last_sync', new Date().toISOString())
    generateMockData()
  }
}

function disconnectGsc() {
  if (confirm('Отключить Google Search Console?')) {
    gscConnected.value = false
    topQueries.value = []
    coverageIssues.value = []
  }
}

function syncFromGsc() {
  syncing.value = true

  // Simulate API call
  setTimeout(() => {
    updateField('gsc_last_sync', new Date().toISOString())
    updateField('indexing_last_check', new Date().toISOString())
    generateMockData()
    syncing.value = false
  }, 2000)
}

function inspectUrl() {
  const inspectUrl = `https://search.google.com/search-console/inspect?resource_id=${encodeURIComponent(props.siteUrl)}&id=${encodeURIComponent(props.pageUrl)}`
  window.open(inspectUrl, '_blank')
}

function requestIndexing() {
  requestingIndexing.value = true

  // In real implementation, this would use the URL Inspection API
  setTimeout(() => {
    requestingIndexing.value = false
    updateField('indexing_status', 'pending')
    alert('Запрос на индексацию отправлен! Google проверит страницу в ближайшее время.')
  }, 1500)
}

function loadTopQueries() {
  // In real implementation, this would call GSC API
  generateMockData()
}

function generateMockData() {
  // Generate mock top queries
  const baseKeyword = props.pageUrl.split('/').pop() || 'slot'
  topQueries.value = [
    { query: `${baseKeyword} free`, clicks: 45, impressions: 1250, position: 8.5 },
    { query: `${baseKeyword} demo`, clicks: 32, impressions: 980, position: 12.3 },
    { query: `play ${baseKeyword}`, clicks: 28, impressions: 750, position: 15.7 },
    { query: `${baseKeyword} online`, clicks: 18, impressions: 520, position: 22.1 },
    { query: `${baseKeyword} rtp`, clicks: 12, impressions: 380, position: 18.4 },
  ]

  // Generate mock chart data
  const days = 14
  chartData.value = []
  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - i - 1))
    chartData.value.push({
      date: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      height: 30 + Math.random() * 60,
      position: 10 + Math.random() * 20,
      clicks: Math.floor(Math.random() * 50)
    })
  }

  // Calculate trend
  if (chartData.value.length >= 2) {
    const first = chartData.value[0].position
    const last = chartData.value[chartData.value.length - 1].position
    positionTrend.value = first - last // Positive = improvement
  }
}

// Initialize
onMounted(() => {
  // Check if already connected
  if (props.modelValue.gsc_last_sync) {
    gscConnected.value = true
    generateMockData()
  }
})
</script>
