<template>
  <!--
    ⚡ Page Speed Metrics Component

    Core Web Vitals и метрики производительности:
    - LCP (Largest Contentful Paint)
    - FID (First Input Delay) / INP (Interaction to Next Paint)
    - CLS (Cumulative Layout Shift)
    - TTFB, FCP и другие метрики
    - PageSpeed Score для mobile/desktop
  -->
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#F59E0B]/20 to-[#EF4444]/20 rounded-xl border border-[#F59E0B]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl flex items-center justify-center">
          <span class="text-2xl">⚡</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">Core Web Vitals</h3>
          <p class="text-sm text-[#9CA3AF]">Метрики производительности страницы</p>
        </div>
      </div>
      <button
        type="button"
        @click="runPageSpeedTest"
        :disabled="testing"
        class="px-4 py-2 bg-[#F59E0B] text-white rounded-lg text-sm font-medium hover:bg-[#D97706] transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        <svg v-if="testing" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
        <span>{{ testing ? 'Тестирование...' : '🚀 Запустить тест' }}</span>
      </button>
    </div>

    <!-- PageSpeed Scores -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Mobile Score -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl">📱</span>
          <span class="text-sm font-medium text-[#E5E7EB]">Mobile Score</span>
        </div>
        <div class="relative w-32 h-32 mx-auto">
          <svg class="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="#353A4A" stroke-width="8" fill="none" />
            <circle
              cx="64" cy="64" r="56"
              :stroke="getScoreColor(modelValue.cwv_score_mobile || 0)"
              stroke-width="8"
              fill="none"
              stroke-linecap="round"
              :stroke-dasharray="`${(modelValue.cwv_score_mobile || 0) * 3.52} 352`"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span
              class="text-3xl font-bold"
              :class="getScoreTextClass(modelValue.cwv_score_mobile || 0)"
            >
              {{ modelValue.cwv_score_mobile || 0 }}
            </span>
          </div>
        </div>
        <input
          type="range"
          v-model.number="modelValue.cwv_score_mobile"
          @input="updateField('cwv_score_mobile', $event.target.value)"
          min="0"
          max="100"
          class="w-full mt-3 accent-[#F59E0B]"
        />
      </div>

      <!-- Desktop Score -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-2xl">🖥️</span>
          <span class="text-sm font-medium text-[#E5E7EB]">Desktop Score</span>
        </div>
        <div class="relative w-32 h-32 mx-auto">
          <svg class="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="#353A4A" stroke-width="8" fill="none" />
            <circle
              cx="64" cy="64" r="56"
              :stroke="getScoreColor(modelValue.cwv_score_desktop || 0)"
              stroke-width="8"
              fill="none"
              stroke-linecap="round"
              :stroke-dasharray="`${(modelValue.cwv_score_desktop || 0) * 3.52} 352`"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span
              class="text-3xl font-bold"
              :class="getScoreTextClass(modelValue.cwv_score_desktop || 0)"
            >
              {{ modelValue.cwv_score_desktop || 0 }}
            </span>
          </div>
        </div>
        <input
          type="range"
          v-model.number="modelValue.cwv_score_desktop"
          @input="updateField('cwv_score_desktop', $event.target.value)"
          min="0"
          max="100"
          class="w-full mt-3 accent-[#F59E0B]"
        />
      </div>
    </div>

    <!-- Core Web Vitals -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-4">📊 Core Web Vitals</h4>

      <div class="grid grid-cols-3 gap-4">
        <!-- LCP -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-[#9CA3AF]">LCP</span>
            <span class="text-xs" :class="getLCPClass">{{ getLCPLabel }}</span>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="number"
              v-model.number="modelValue.cwv_lcp"
              @input="updateField('cwv_lcp', $event.target.value)"
              step="0.1"
              min="0"
              max="10"
              class="flex-1 px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-[#E5E7EB] text-sm focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
            />
            <span class="text-xs text-[#6B7280]">сек</span>
          </div>
          <p class="text-xs text-[#6B7280] mt-1">Largest Contentful Paint</p>
          <div class="w-full bg-[#353A4A] rounded-full h-1 mt-2">
            <div
              class="h-1 rounded-full transition-all"
              :class="getLCPBarClass"
              :style="{ width: `${Math.min((modelValue.cwv_lcp || 0) / 4 * 100, 100)}%` }"
            ></div>
          </div>
        </div>

        <!-- INP (replacing FID) -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-[#9CA3AF]">INP</span>
            <span class="text-xs" :class="getINPClass">{{ getINPLabel }}</span>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="number"
              v-model.number="modelValue.cwv_inp"
              @input="updateField('cwv_inp', $event.target.value)"
              step="1"
              min="0"
              max="500"
              class="flex-1 px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-[#E5E7EB] text-sm focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
            />
            <span class="text-xs text-[#6B7280]">мс</span>
          </div>
          <p class="text-xs text-[#6B7280] mt-1">Interaction to Next Paint</p>
          <div class="w-full bg-[#353A4A] rounded-full h-1 mt-2">
            <div
              class="h-1 rounded-full transition-all"
              :class="getINPBarClass"
              :style="{ width: `${Math.min((modelValue.cwv_inp || 0) / 500 * 100, 100)}%` }"
            ></div>
          </div>
        </div>

        <!-- CLS -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-[#9CA3AF]">CLS</span>
            <span class="text-xs" :class="getCLSClass">{{ getCLSLabel }}</span>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="number"
              v-model.number="modelValue.cwv_cls"
              @input="updateField('cwv_cls', $event.target.value)"
              step="0.01"
              min="0"
              max="1"
              class="flex-1 px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-[#E5E7EB] text-sm focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
            />
          </div>
          <p class="text-xs text-[#6B7280] mt-1">Cumulative Layout Shift</p>
          <div class="w-full bg-[#353A4A] rounded-full h-1 mt-2">
            <div
              class="h-1 rounded-full transition-all"
              :class="getCLSBarClass"
              :style="{ width: `${Math.min((modelValue.cwv_cls || 0) / 0.25 * 100, 100)}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Metrics -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-4">📈 Дополнительные метрики</h4>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- TTFB -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <label class="block text-xs text-[#9CA3AF] mb-1">TTFB (мс)</label>
          <input
            type="number"
            v-model.number="modelValue.cwv_ttfb"
            @input="updateField('cwv_ttfb', $event.target.value)"
            step="1"
            min="0"
            class="w-full px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-[#E5E7EB] text-sm focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
          />
          <p class="text-xs text-[#6B7280] mt-1">Time to First Byte</p>
        </div>

        <!-- FCP -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <label class="block text-xs text-[#9CA3AF] mb-1">FCP (сек)</label>
          <input
            type="number"
            v-model.number="modelValue.cwv_fcp"
            @input="updateField('cwv_fcp', $event.target.value)"
            step="0.1"
            min="0"
            class="w-full px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-[#E5E7EB] text-sm focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
          />
          <p class="text-xs text-[#6B7280] mt-1">First Contentful Paint</p>
        </div>

        <!-- FID (legacy) -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <label class="block text-xs text-[#9CA3AF] mb-1">FID (мс)</label>
          <input
            type="number"
            v-model.number="modelValue.cwv_fid"
            @input="updateField('cwv_fid', $event.target.value)"
            step="1"
            min="0"
            class="w-full px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-[#E5E7EB] text-sm focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
          />
          <p class="text-xs text-[#6B7280] mt-1">First Input Delay</p>
        </div>

        <!-- Last Check -->
        <div class="p-3 bg-[#161A21] rounded-lg">
          <label class="block text-xs text-[#9CA3AF] mb-1">Последняя проверка</label>
          <input
            type="date"
            :value="formatDateForInput(modelValue.cwv_last_check)"
            @input="updateField('cwv_last_check', $event.target.value)"
            class="w-full px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-[#E5E7EB] text-sm focus:outline-none focus:ring-1 focus:ring-[#F59E0B]"
          />
        </div>
      </div>
    </div>

    <!-- Issues & Opportunities -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Issues -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <h4 class="text-sm font-medium text-[#EF4444] mb-3">⚠️ Проблемы</h4>
        <textarea
          v-model="modelValue.cwv_issues"
          @input="updateField('cwv_issues', $event.target.value)"
          placeholder='["Большие изображения", "Блокирующий JS"]'
          rows="4"
          class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#EF4444] font-mono"
        ></textarea>
        <p class="text-xs text-[#6B7280] mt-1">JSON массив проблем</p>
      </div>

      <!-- Opportunities -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <h4 class="text-sm font-medium text-[#10B981] mb-3">💡 Возможности</h4>
        <textarea
          v-model="modelValue.cwv_opportunities"
          @input="updateField('cwv_opportunities', $event.target.value)"
          placeholder='["Lazy loading", "Оптимизация шрифтов"]'
          rows="4"
          class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#10B981] font-mono"
        ></textarea>
        <p class="text-xs text-[#6B7280] mt-1">JSON массив рекомендаций</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3">🔗 Инструменты тестирования</h4>
      <div class="flex flex-wrap gap-2">
        <a
          :href="`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(pageUrl)}`"
          target="_blank"
          class="px-3 py-2 bg-[#4285F4]/20 text-[#4285F4] border border-[#4285F4]/30 rounded-lg text-sm hover:bg-[#4285F4]/30 transition-colors flex items-center gap-2"
        >
          <span>⚡</span>
          <span>PageSpeed Insights</span>
        </a>
        <a
          :href="`https://www.webpagetest.org/?url=${encodeURIComponent(pageUrl)}`"
          target="_blank"
          class="px-3 py-2 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-lg text-sm hover:bg-[#10B981]/30 transition-colors flex items-center gap-2"
        >
          <span>🧪</span>
          <span>WebPageTest</span>
        </a>
        <a
          :href="`https://gtmetrix.com/?url=${encodeURIComponent(pageUrl)}`"
          target="_blank"
          class="px-3 py-2 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 rounded-lg text-sm hover:bg-[#F59E0B]/30 transition-colors flex items-center gap-2"
        >
          <span>📊</span>
          <span>GTmetrix</span>
        </a>
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
      cwv_lcp: null,
      cwv_fid: null,
      cwv_cls: null,
      cwv_ttfb: null,
      cwv_fcp: null,
      cwv_inp: null,
      cwv_score_mobile: 0,
      cwv_score_desktop: 0,
      cwv_last_check: null,
      cwv_issues: null,
      cwv_opportunities: null
    })
  },
  pageUrl: { type: String, default: '' }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// State
const testing = ref(false)

// Methods
function updateField(field, value) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

function formatDateForInput(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toISOString().split('T')[0]
}

function getScoreColor(score) {
  if (score >= 90) return '#10B981'
  if (score >= 50) return '#F59E0B'
  return '#EF4444'
}

function getScoreTextClass(score) {
  if (score >= 90) return 'text-[#10B981]'
  if (score >= 50) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
}

// LCP Computed
const getLCPClass = computed(() => {
  const lcp = props.modelValue.cwv_lcp || 0
  if (lcp <= 2.5) return 'text-[#10B981]'
  if (lcp <= 4) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
})

const getLCPLabel = computed(() => {
  const lcp = props.modelValue.cwv_lcp || 0
  if (lcp <= 2.5) return 'Good'
  if (lcp <= 4) return 'Needs Work'
  return 'Poor'
})

const getLCPBarClass = computed(() => {
  const lcp = props.modelValue.cwv_lcp || 0
  if (lcp <= 2.5) return 'bg-[#10B981]'
  if (lcp <= 4) return 'bg-[#F59E0B]'
  return 'bg-[#EF4444]'
})

// INP Computed
const getINPClass = computed(() => {
  const inp = props.modelValue.cwv_inp || 0
  if (inp <= 200) return 'text-[#10B981]'
  if (inp <= 500) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
})

const getINPLabel = computed(() => {
  const inp = props.modelValue.cwv_inp || 0
  if (inp <= 200) return 'Good'
  if (inp <= 500) return 'Needs Work'
  return 'Poor'
})

const getINPBarClass = computed(() => {
  const inp = props.modelValue.cwv_inp || 0
  if (inp <= 200) return 'bg-[#10B981]'
  if (inp <= 500) return 'bg-[#F59E0B]'
  return 'bg-[#EF4444]'
})

// CLS Computed
const getCLSClass = computed(() => {
  const cls = props.modelValue.cwv_cls || 0
  if (cls <= 0.1) return 'text-[#10B981]'
  if (cls <= 0.25) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
})

const getCLSLabel = computed(() => {
  const cls = props.modelValue.cwv_cls || 0
  if (cls <= 0.1) return 'Good'
  if (cls <= 0.25) return 'Needs Work'
  return 'Poor'
})

const getCLSBarClass = computed(() => {
  const cls = props.modelValue.cwv_cls || 0
  if (cls <= 0.1) return 'bg-[#10B981]'
  if (cls <= 0.25) return 'bg-[#F59E0B]'
  return 'bg-[#EF4444]'
})

function runPageSpeedTest() {
  testing.value = true

  // Open PageSpeed Insights in new tab
  window.open(`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(props.pageUrl)}`, '_blank')

  // Update last check date
  updateField('cwv_last_check', new Date().toISOString())

  setTimeout(() => {
    testing.value = false
  }, 1000)
}
</script>
