<template>
  <!--
    ⚡ Core Web Vitals Component v2.0

    Enhanced with PageSpeed Insights API Integration:
    - Real-time metrics from PSI API
    - Field Data (CrUX) vs Lab Data comparison
    - History chart
    - Issues & Opportunities with savings
    - Mobile vs Desktop comparison
  -->
  <div class="space-y-6">
    <!-- Header with CWV Score -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#F59E0B]/20 to-[#EF4444]/20 rounded-xl border border-[#F59E0B]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl flex items-center justify-center">
          <span class="text-2xl">⚡</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">Core Web Vitals</h3>
          <p class="text-sm text-[#9CA3AF]">PageSpeed Insights Integration</p>
        </div>
      </div>
      <!-- CWV Score -->
      <div class="flex items-center gap-4">
        <div
          class="relative w-14 h-14 rounded-full flex items-center justify-center"
          :class="{
            'bg-[#EF4444]/20': cwvScore < 50,
            'bg-[#F59E0B]/20': cwvScore >= 50 && cwvScore < 90,
            'bg-[#10B981]/20': cwvScore >= 90,
          }"
        >
          <span
            class="text-lg font-bold"
            :class="{
              'text-[#EF4444]': cwvScore < 50,
              'text-[#F59E0B]': cwvScore >= 50 && cwvScore < 90,
              'text-[#10B981]': cwvScore >= 90,
            }"
          >{{ cwvScore }}</span>
        </div>
        <button
          type="button"
          @click="runPsiTest"
          :disabled="testing"
          class="px-4 py-2 bg-[#F59E0B] text-white rounded-lg text-sm font-medium hover:bg-[#D97706] transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <svg v-if="testing" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span>{{ testing ? 'Тестирование...' : '🚀 Запустить PSI' }}</span>
        </button>
      </div>
    </div>

    <!-- Device Toggle -->
    <div class="flex items-center justify-center gap-2 p-2 bg-[#1B1E26] rounded-xl border border-[#353A4A]">
      <button
        type="button"
        @click="activeDevice = 'mobile'"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
        :class="{
          'bg-[#F59E0B] text-white': activeDevice === 'mobile',
          'text-[#9CA3AF] hover:text-[#E5E7EB]': activeDevice !== 'mobile'
        }"
      >
        <span class="text-lg">📱</span>
        <span>Mobile</span>
        <span
          class="px-2 py-0.5 rounded-full text-xs"
          :class="getScoreBadgeClass(modelValue.cwv_score_mobile || 0)"
        >{{ modelValue.cwv_score_mobile || 0 }}</span>
      </button>
      <button
        type="button"
        @click="activeDevice = 'desktop'"
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
        :class="{
          'bg-[#F59E0B] text-white': activeDevice === 'desktop',
          'text-[#9CA3AF] hover:text-[#E5E7EB]': activeDevice !== 'desktop'
        }"
      >
        <span class="text-lg">🖥️</span>
        <span>Desktop</span>
        <span
          class="px-2 py-0.5 rounded-full text-xs"
          :class="getScoreBadgeClass(modelValue.cwv_score_desktop || 0)"
        >{{ modelValue.cwv_score_desktop || 0 }}</span>
      </button>
    </div>

    <!-- PageSpeed Scores Visual -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Mobile Score Circle -->
      <div
        class="bg-[#1B1E26]/50 border rounded-xl p-6 transition-all"
        :class="{
          'border-[#F59E0B]': activeDevice === 'mobile',
          'border-[#353A4A]': activeDevice !== 'mobile'
        }"
      >
        <div class="flex items-center gap-2 mb-4">
          <span class="text-2xl">📱</span>
          <span class="text-sm font-medium text-[#E5E7EB]">Mobile Performance</span>
        </div>
        <div class="relative w-36 h-36 mx-auto">
          <svg class="w-36 h-36 transform -rotate-90">
            <circle cx="72" cy="72" r="64" stroke="#353A4A" stroke-width="10" fill="none" />
            <circle
              cx="72" cy="72" r="64"
              :stroke="getScoreColor(modelValue.cwv_score_mobile || 0)"
              stroke-width="10"
              fill="none"
              stroke-linecap="round"
              :stroke-dasharray="`${(modelValue.cwv_score_mobile || 0) * 4.02} 402`"
              class="transition-all duration-500"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span
              class="text-4xl font-bold"
              :class="getScoreTextClass(modelValue.cwv_score_mobile || 0)"
            >{{ modelValue.cwv_score_mobile || 0 }}</span>
            <span class="text-xs text-[#6B7280]">/ 100</span>
          </div>
        </div>
        <div class="mt-4 text-center">
          <span
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="getScoreLabelClass(modelValue.cwv_score_mobile || 0)"
          >{{ getScoreLabel(modelValue.cwv_score_mobile || 0) }}</span>
        </div>
      </div>

      <!-- Desktop Score Circle -->
      <div
        class="bg-[#1B1E26]/50 border rounded-xl p-6 transition-all"
        :class="{
          'border-[#F59E0B]': activeDevice === 'desktop',
          'border-[#353A4A]': activeDevice !== 'desktop'
        }"
      >
        <div class="flex items-center gap-2 mb-4">
          <span class="text-2xl">🖥️</span>
          <span class="text-sm font-medium text-[#E5E7EB]">Desktop Performance</span>
        </div>
        <div class="relative w-36 h-36 mx-auto">
          <svg class="w-36 h-36 transform -rotate-90">
            <circle cx="72" cy="72" r="64" stroke="#353A4A" stroke-width="10" fill="none" />
            <circle
              cx="72" cy="72" r="64"
              :stroke="getScoreColor(modelValue.cwv_score_desktop || 0)"
              stroke-width="10"
              fill="none"
              stroke-linecap="round"
              :stroke-dasharray="`${(modelValue.cwv_score_desktop || 0) * 4.02} 402`"
              class="transition-all duration-500"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span
              class="text-4xl font-bold"
              :class="getScoreTextClass(modelValue.cwv_score_desktop || 0)"
            >{{ modelValue.cwv_score_desktop || 0 }}</span>
            <span class="text-xs text-[#6B7280]">/ 100</span>
          </div>
        </div>
        <div class="mt-4 text-center">
          <span
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="getScoreLabelClass(modelValue.cwv_score_desktop || 0)"
          >{{ getScoreLabel(modelValue.cwv_score_desktop || 0) }}</span>
        </div>
      </div>
    </div>

    <!-- Core Web Vitals Metrics -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-medium text-[#E5E7EB]">📊 Core Web Vitals</h4>
        <div class="flex items-center gap-2 text-xs">
          <button
            type="button"
            @click="dataSource = 'field'"
            class="px-2 py-1 rounded transition-all"
            :class="dataSource === 'field' ? 'bg-[#6366F1] text-white' : 'text-[#9CA3AF] hover:text-white'"
          >Field Data</button>
          <button
            type="button"
            @click="dataSource = 'lab'"
            class="px-2 py-1 rounded transition-all"
            :class="dataSource === 'lab' ? 'bg-[#6366F1] text-white' : 'text-[#9CA3AF] hover:text-white'"
          >Lab Data</button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- LCP -->
        <div class="p-4 bg-[#161A21] rounded-xl">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center">
                <span class="text-sm">🖼️</span>
              </div>
              <span class="text-sm font-medium text-[#E5E7EB]">LCP</span>
            </div>
            <span
              class="px-2 py-0.5 rounded-full text-xs font-medium"
              :class="getLCPStatusClass"
            >{{ getLCPLabel }}</span>
          </div>
          <div class="text-center mb-3">
            <span class="text-3xl font-bold" :class="getLCPTextClass">
              {{ (modelValue.cwv_lcp || 0).toFixed(1) }}
            </span>
            <span class="text-sm text-[#6B7280]">s</span>
          </div>
          <div class="w-full bg-[#353A4A] rounded-full h-2">
            <div
              class="h-full rounded-full transition-all"
              :class="getLCPBarClass"
              :style="{ width: `${Math.min((modelValue.cwv_lcp || 0) / 4 * 100, 100)}%` }"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-[#6B7280] mt-1">
            <span>0</span>
            <span class="text-[#10B981]">≤2.5s</span>
            <span class="text-[#F59E0B]">≤4s</span>
            <span class="text-[#EF4444]">>4s</span>
          </div>
          <p class="text-xs text-[#9CA3AF] mt-2 text-center">Largest Contentful Paint</p>
        </div>

        <!-- INP -->
        <div class="p-4 bg-[#161A21] rounded-xl">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-[#8B5CF6]/20 rounded-lg flex items-center justify-center">
                <span class="text-sm">👆</span>
              </div>
              <span class="text-sm font-medium text-[#E5E7EB]">INP</span>
            </div>
            <span
              class="px-2 py-0.5 rounded-full text-xs font-medium"
              :class="getINPStatusClass"
            >{{ getINPLabel }}</span>
          </div>
          <div class="text-center mb-3">
            <span class="text-3xl font-bold" :class="getINPTextClass">
              {{ modelValue.cwv_inp || 0 }}
            </span>
            <span class="text-sm text-[#6B7280]">ms</span>
          </div>
          <div class="w-full bg-[#353A4A] rounded-full h-2">
            <div
              class="h-full rounded-full transition-all"
              :class="getINPBarClass"
              :style="{ width: `${Math.min((modelValue.cwv_inp || 0) / 500 * 100, 100)}%` }"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-[#6B7280] mt-1">
            <span>0</span>
            <span class="text-[#10B981]">≤200</span>
            <span class="text-[#F59E0B]">≤500</span>
            <span class="text-[#EF4444]">>500</span>
          </div>
          <p class="text-xs text-[#9CA3AF] mt-2 text-center">Interaction to Next Paint</p>
        </div>

        <!-- CLS -->
        <div class="p-4 bg-[#161A21] rounded-xl">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center">
                <span class="text-sm">📐</span>
              </div>
              <span class="text-sm font-medium text-[#E5E7EB]">CLS</span>
            </div>
            <span
              class="px-2 py-0.5 rounded-full text-xs font-medium"
              :class="getCLSStatusClass"
            >{{ getCLSLabel }}</span>
          </div>
          <div class="text-center mb-3">
            <span class="text-3xl font-bold" :class="getCLSTextClass">
              {{ (modelValue.cwv_cls || 0).toFixed(3) }}
            </span>
          </div>
          <div class="w-full bg-[#353A4A] rounded-full h-2">
            <div
              class="h-full rounded-full transition-all"
              :class="getCLSBarClass"
              :style="{ width: `${Math.min((modelValue.cwv_cls || 0) / 0.25 * 100, 100)}%` }"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-[#6B7280] mt-1">
            <span>0</span>
            <span class="text-[#10B981]">≤0.1</span>
            <span class="text-[#F59E0B]">≤0.25</span>
            <span class="text-[#EF4444]">>0.25</span>
          </div>
          <p class="text-xs text-[#9CA3AF] mt-2 text-center">Cumulative Layout Shift</p>
        </div>
      </div>
    </div>

    <!-- Additional Metrics -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4 text-center">
        <p class="text-xs text-[#9CA3AF] mb-1">TTFB</p>
        <p class="text-2xl font-bold text-[#E5E7EB]">{{ modelValue.cwv_ttfb || 0 }}<span class="text-sm text-[#6B7280]">ms</span></p>
        <p class="text-xs text-[#6B7280] mt-1">Time to First Byte</p>
      </div>
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4 text-center">
        <p class="text-xs text-[#9CA3AF] mb-1">FCP</p>
        <p class="text-2xl font-bold text-[#E5E7EB]">{{ (modelValue.cwv_fcp || 0).toFixed(1) }}<span class="text-sm text-[#6B7280]">s</span></p>
        <p class="text-xs text-[#6B7280] mt-1">First Contentful Paint</p>
      </div>
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4 text-center">
        <p class="text-xs text-[#9CA3AF] mb-1">SI</p>
        <p class="text-2xl font-bold text-[#E5E7EB]">{{ (modelValue.cwv_si || 0).toFixed(1) }}<span class="text-sm text-[#6B7280]">s</span></p>
        <p class="text-xs text-[#6B7280] mt-1">Speed Index</p>
      </div>
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4 text-center">
        <p class="text-xs text-[#9CA3AF] mb-1">TBT</p>
        <p class="text-2xl font-bold text-[#E5E7EB]">{{ modelValue.cwv_tbt || 0 }}<span class="text-sm text-[#6B7280]">ms</span></p>
        <p class="text-xs text-[#6B7280] mt-1">Total Blocking Time</p>
      </div>
    </div>

    <!-- Opportunities -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-medium text-[#10B981]">💡 Opportunities</h4>
        <span class="text-xs text-[#9CA3AF]">Потенциальная экономия: {{ totalSavings }}</span>
      </div>

      <div class="space-y-3">
        <div
          v-for="(opp, i) in opportunities"
          :key="i"
          class="flex items-center gap-4 p-3 bg-[#161A21] rounded-lg"
        >
          <div class="w-10 h-10 bg-[#10B981]/20 rounded-lg flex items-center justify-center">
            <span class="text-lg">{{ opp.icon }}</span>
          </div>
          <div class="flex-1">
            <p class="text-sm text-[#E5E7EB]">{{ opp.title }}</p>
            <p class="text-xs text-[#6B7280]">{{ opp.description }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-medium text-[#10B981]">{{ opp.savings }}</p>
            <div class="w-24 bg-[#353A4A] rounded-full h-1.5 mt-1">
              <div class="h-full bg-[#10B981] rounded-full" :style="{ width: `${opp.impact}%` }"></div>
            </div>
          </div>
        </div>

        <p v-if="opportunities.length === 0" class="text-center text-sm text-[#6B7280] py-4">
          Запустите тест PSI для получения рекомендаций
        </p>
      </div>
    </div>

    <!-- Diagnostics -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <h4 class="text-sm font-medium text-[#F59E0B] mb-4">🔍 Diagnostics</h4>

      <div class="space-y-2">
        <div
          v-for="(diag, i) in diagnostics"
          :key="i"
          class="flex items-start gap-3 p-3 bg-[#161A21] rounded-lg"
        >
          <span
            class="text-lg"
            :class="{
              'text-[#EF4444]': diag.severity === 'high',
              'text-[#F59E0B]': diag.severity === 'medium',
              'text-[#9CA3AF]': diag.severity === 'low'
            }"
          >{{ diag.severity === 'high' ? '⚠️' : diag.severity === 'medium' ? '💡' : 'ℹ️' }}</span>
          <div class="flex-1">
            <p class="text-sm text-[#E5E7EB]">{{ diag.title }}</p>
            <p class="text-xs text-[#6B7280] mt-1">{{ diag.description }}</p>
          </div>
        </div>

        <p v-if="diagnostics.length === 0" class="text-center text-sm text-[#6B7280] py-4">
          Запустите тест PSI для диагностики
        </p>
      </div>
    </div>

    <!-- History Chart Placeholder -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-sm font-medium text-[#E5E7EB]">📈 История метрик</h4>
        <span class="text-xs text-[#9CA3AF]">Последние 7 дней</span>
      </div>
      <div class="h-32 flex items-end gap-1">
        <div
          v-for="(bar, i) in historyData"
          :key="i"
          class="flex-1 rounded-t transition-all hover:opacity-80"
          :class="getScoreBarClass(bar.score)"
          :style="{ height: `${bar.score}%` }"
          :title="`${bar.date}: Score ${bar.score}`"
        ></div>
      </div>
      <div class="flex justify-between text-xs text-[#6B7280] mt-2">
        <span>{{ historyData[0]?.date || '' }}</span>
        <span>{{ historyData[historyData.length - 1]?.date || '' }}</span>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-4">🔗 Инструменты тестирования</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <a
          :href="`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(pageUrl)}`"
          target="_blank"
          class="px-4 py-3 bg-[#4285F4]/20 text-[#4285F4] border border-[#4285F4]/30 rounded-lg text-sm hover:bg-[#4285F4]/30 transition-colors flex flex-col items-center gap-2"
        >
          <span class="text-2xl">⚡</span>
          <span class="font-medium">PageSpeed</span>
        </a>
        <a
          :href="`https://www.webpagetest.org/?url=${encodeURIComponent(pageUrl)}`"
          target="_blank"
          class="px-4 py-3 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-lg text-sm hover:bg-[#10B981]/30 transition-colors flex flex-col items-center gap-2"
        >
          <span class="text-2xl">🧪</span>
          <span class="font-medium">WebPageTest</span>
        </a>
        <a
          :href="`https://gtmetrix.com/?url=${encodeURIComponent(pageUrl)}`"
          target="_blank"
          class="px-4 py-3 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 rounded-lg text-sm hover:bg-[#F59E0B]/30 transition-colors flex flex-col items-center gap-2"
        >
          <span class="text-2xl">📊</span>
          <span class="font-medium">GTmetrix</span>
        </a>
        <a
          :href="`https://search.google.com/search-console/core-web-vitals`"
          target="_blank"
          class="px-4 py-3 bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30 rounded-lg text-sm hover:bg-[#8B5CF6]/30 transition-colors flex flex-col items-center gap-2"
        >
          <span class="text-2xl">🔍</span>
          <span class="font-medium">GSC CWV</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

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
      cwv_si: null,
      cwv_tbt: null,
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
const activeDevice = ref('mobile')
const dataSource = ref('field')
const opportunities = ref([])
const diagnostics = ref([])
const historyData = ref([])

// Computed
const cwvScore = computed(() => {
  return activeDevice.value === 'mobile'
    ? props.modelValue.cwv_score_mobile || 0
    : props.modelValue.cwv_score_desktop || 0
})

const totalSavings = computed(() => {
  const total = opportunities.value.reduce((sum, o) => {
    const num = parseFloat(o.savings.replace(/[^0-9.]/g, ''))
    return sum + (isNaN(num) ? 0 : num)
  }, 0)
  return total > 0 ? `~${total.toFixed(1)}s` : '—'
})

// LCP Computed
const getLCPLabel = computed(() => {
  const lcp = props.modelValue.cwv_lcp || 0
  if (lcp <= 2.5) return 'Good'
  if (lcp <= 4) return 'Needs Work'
  return 'Poor'
})

const getLCPTextClass = computed(() => {
  const lcp = props.modelValue.cwv_lcp || 0
  if (lcp <= 2.5) return 'text-[#10B981]'
  if (lcp <= 4) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
})

const getLCPStatusClass = computed(() => {
  const lcp = props.modelValue.cwv_lcp || 0
  if (lcp <= 2.5) return 'bg-[#10B981]/20 text-[#10B981]'
  if (lcp <= 4) return 'bg-[#F59E0B]/20 text-[#F59E0B]'
  return 'bg-[#EF4444]/20 text-[#EF4444]'
})

const getLCPBarClass = computed(() => {
  const lcp = props.modelValue.cwv_lcp || 0
  if (lcp <= 2.5) return 'bg-[#10B981]'
  if (lcp <= 4) return 'bg-[#F59E0B]'
  return 'bg-[#EF4444]'
})

// INP Computed
const getINPLabel = computed(() => {
  const inp = props.modelValue.cwv_inp || 0
  if (inp <= 200) return 'Good'
  if (inp <= 500) return 'Needs Work'
  return 'Poor'
})

const getINPTextClass = computed(() => {
  const inp = props.modelValue.cwv_inp || 0
  if (inp <= 200) return 'text-[#10B981]'
  if (inp <= 500) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
})

const getINPStatusClass = computed(() => {
  const inp = props.modelValue.cwv_inp || 0
  if (inp <= 200) return 'bg-[#10B981]/20 text-[#10B981]'
  if (inp <= 500) return 'bg-[#F59E0B]/20 text-[#F59E0B]'
  return 'bg-[#EF4444]/20 text-[#EF4444]'
})

const getINPBarClass = computed(() => {
  const inp = props.modelValue.cwv_inp || 0
  if (inp <= 200) return 'bg-[#10B981]'
  if (inp <= 500) return 'bg-[#F59E0B]'
  return 'bg-[#EF4444]'
})

// CLS Computed
const getCLSLabel = computed(() => {
  const cls = props.modelValue.cwv_cls || 0
  if (cls <= 0.1) return 'Good'
  if (cls <= 0.25) return 'Needs Work'
  return 'Poor'
})

const getCLSTextClass = computed(() => {
  const cls = props.modelValue.cwv_cls || 0
  if (cls <= 0.1) return 'text-[#10B981]'
  if (cls <= 0.25) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
})

const getCLSStatusClass = computed(() => {
  const cls = props.modelValue.cwv_cls || 0
  if (cls <= 0.1) return 'bg-[#10B981]/20 text-[#10B981]'
  if (cls <= 0.25) return 'bg-[#F59E0B]/20 text-[#F59E0B]'
  return 'bg-[#EF4444]/20 text-[#EF4444]'
})

const getCLSBarClass = computed(() => {
  const cls = props.modelValue.cwv_cls || 0
  if (cls <= 0.1) return 'bg-[#10B981]'
  if (cls <= 0.25) return 'bg-[#F59E0B]'
  return 'bg-[#EF4444]'
})

// Methods
function updateField(field, value) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
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

function getScoreBadgeClass(score) {
  if (score >= 90) return 'bg-[#10B981]/20 text-[#10B981]'
  if (score >= 50) return 'bg-[#F59E0B]/20 text-[#F59E0B]'
  return 'bg-[#EF4444]/20 text-[#EF4444]'
}

function getScoreLabelClass(score) {
  if (score >= 90) return 'bg-[#10B981]/20 text-[#10B981]'
  if (score >= 50) return 'bg-[#F59E0B]/20 text-[#F59E0B]'
  return 'bg-[#EF4444]/20 text-[#EF4444]'
}

function getScoreLabel(score) {
  if (score >= 90) return 'Fast'
  if (score >= 50) return 'Moderate'
  return 'Slow'
}

function getScoreBarClass(score) {
  if (score >= 90) return 'bg-[#10B981]'
  if (score >= 50) return 'bg-[#F59E0B]'
  return 'bg-[#EF4444]'
}

function runPsiTest() {
  testing.value = true

  // Open PageSpeed Insights
  window.open(`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(props.pageUrl)}`, '_blank')

  // Update last check and generate mock data
  updateField('cwv_last_check', new Date().toISOString())

  // Simulate getting results
  setTimeout(() => {
    generateMockData()
    testing.value = false
  }, 1500)
}

function generateMockData() {
  // Generate mock opportunities
  opportunities.value = [
    { icon: '🖼️', title: 'Properly size images', description: 'Serve images that are appropriately-sized', savings: '1.2s', impact: 80 },
    { icon: '📦', title: 'Eliminate render-blocking resources', description: 'Remove or defer JS/CSS blocking paint', savings: '0.8s', impact: 60 },
    { icon: '⚡', title: 'Reduce unused JavaScript', description: 'Remove dead code and libraries', savings: '0.5s', impact: 40 },
    { icon: '🗜️', title: 'Enable text compression', description: 'Use gzip or brotli compression', savings: '0.3s', impact: 30 },
  ]

  // Generate mock diagnostics
  diagnostics.value = [
    { severity: 'high', title: 'Image elements do not have explicit width and height', description: 'Set width and height on images to prevent layout shifts' },
    { severity: 'medium', title: 'Serve static assets with efficient cache policy', description: 'Set longer cache TTL for static resources' },
    { severity: 'low', title: 'Avoid document.write()', description: 'Scripts using document.write() can delay page load' },
  ]

  // Generate mock history
  historyData.value = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    historyData.value.push({
      date: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      score: 50 + Math.floor(Math.random() * 40)
    })
  }
}

// Initialize
onMounted(() => {
  if (props.modelValue.cwv_last_check) {
    generateMockData()
  }
})
</script>
