<template>
  <!--
    🏥 SEO Health Score Component

    Overall SEO health score:
    - Overall score (0-100)
    - Issues
    - Warnings
    - Passed checks
    - Score trend
  -->
  <div class="space-y-4">
    <!-- Header with Main Score -->
    <div class="p-6 bg-gradient-to-r from-[#3B82F6]/20 to-[#8B5CF6]/20 rounded-xl border border-[#3B82F6]/30">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-4 w-full sm:w-auto">
          <!-- Score Circle -->
          <div class="relative w-24 h-24">
            <svg class="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="42" stroke="#353A4A" stroke-width="8" fill="none" />
              <circle
                cx="48" cy="48" r="42"
                :stroke="scoreColor"
                stroke-width="8"
                fill="none"
                stroke-linecap="round"
                :stroke-dasharray="`${(modelValue.seo_health_score || 0) * 2.64} 264`"
                class="transition-all duration-700"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span
                class="text-2xl font-bold"
                :class="scoreTextClass"
              >
                {{ modelValue.seo_health_score || 0 }}
              </span>
              <span class="text-xs text-[#9CA3AF]">/100</span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-medium text-[#E5E7EB]">SEO Health Score</h3>
            <p class="text-sm text-[#9CA3AF]">{{ scoreLabel }}</p>
            <p class="text-xs text-[#6B7280] mt-1">
              Last audit: {{ lastAuditFormatted }}
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="runAudit"
          :disabled="auditing"
          class="px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <svg v-if="auditing" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span>{{ auditing ? 'Auditing...' : '🔍 Run audit' }}</span>
        </button>
      </div>

      <!-- Score Slider (manual override) -->
      <div class="mt-4 pt-4 border-t border-[#353A4A]/50">
        <label class="block text-xs text-[#9CA3AF] mb-2">Manual score adjustment:</label>
        <input
          type="range"
          v-model.number="modelValue.seo_health_score"
          @input="updateField('seo_health_score', parseInt($event.target.value))"
          min="0"
          max="100"
          class="w-full accent-[#3B82F6]"
        />
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Issues -->
      <div class="bg-[#1B1E26]/50 border border-[#EF4444]/30 rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-8 h-8 bg-[#EF4444]/20 rounded-full flex items-center justify-center text-[#EF4444]">❌</span>
          <span class="text-sm font-medium text-[#EF4444]">Issues</span>
        </div>
        <p class="text-3xl font-bold text-[#EF4444]">{{ issuesCount }}</p>
        <p class="text-xs text-[#9CA3AF] mt-1">Critical errors</p>
      </div>

      <!-- Warnings -->
      <div class="bg-[#1B1E26]/50 border border-[#F59E0B]/30 rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-8 h-8 bg-[#F59E0B]/20 rounded-full flex items-center justify-center text-[#F59E0B]">⚠️</span>
          <span class="text-sm font-medium text-[#F59E0B]">Warnings</span>
        </div>
        <p class="text-3xl font-bold text-[#F59E0B]">{{ warningsCount }}</p>
        <p class="text-xs text-[#9CA3AF] mt-1">Require attention</p>
      </div>

      <!-- Passed -->
      <div class="bg-[#1B1E26]/50 border border-[#10B981]/30 rounded-lg p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-8 h-8 bg-[#10B981]/20 rounded-full flex items-center justify-center text-[#10B981]">✓</span>
          <span class="text-sm font-medium text-[#10B981]">Passed</span>
        </div>
        <p class="text-3xl font-bold text-[#10B981]">{{ passedCount }}</p>
        <p class="text-xs text-[#9CA3AF] mt-1">Successful checks</p>
      </div>
    </div>

    <!-- Issues List -->
    <div v-if="issues.length > 0" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#EF4444] mb-3 flex items-center gap-2">
        <span>❌</span>
        <span>Critical Issues</span>
      </h4>
      <div class="space-y-2">
        <div
          v-for="(issue, index) in issues"
          :key="'issue-' + index"
          class="flex items-start gap-3 p-3 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-lg"
        >
          <span class="text-[#EF4444] mt-0.5">•</span>
          <div class="flex-1">
            <p class="text-sm text-[#FCA5A5]">{{ issue.message }}</p>
            <p v-if="issue.hint" class="text-xs text-[#6B7280] mt-1">💡 {{ issue.hint }}</p>
          </div>
          <span
            v-if="issue.impact"
            class="px-2 py-0.5 bg-[#EF4444]/20 text-[#EF4444] text-xs rounded"
          >
            {{ issue.impact }}
          </span>
        </div>
      </div>
      <!-- JSON Editor for Issues -->
      <textarea
        v-model="modelValue.seo_health_issues"
        @input="updateField('seo_health_issues', $event.target.value)"
        placeholder='[{"message": "No meta description", "hint": "Add a description", "impact": "High"}]'
        rows="3"
        class="w-full mt-3 px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-xs placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#EF4444] font-mono"
      ></textarea>
    </div>

    <!-- Warnings List -->
    <div v-if="warnings.length > 0" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#F59E0B] mb-3 flex items-center gap-2">
        <span>⚠️</span>
        <span>Warnings</span>
      </h4>
      <div class="space-y-2">
        <div
          v-for="(warning, index) in warnings"
          :key="'warning-' + index"
          class="flex items-start gap-3 p-3 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg"
        >
          <span class="text-[#F59E0B] mt-0.5">•</span>
          <div class="flex-1">
            <p class="text-sm text-[#FBBF24]">{{ warning.message }}</p>
            <p v-if="warning.hint" class="text-xs text-[#6B7280] mt-1">💡 {{ warning.hint }}</p>
          </div>
        </div>
      </div>
      <!-- JSON Editor for Warnings -->
      <textarea
        v-model="modelValue.seo_health_warnings"
        @input="updateField('seo_health_warnings', $event.target.value)"
        placeholder='[{"message": "Title is too long", "hint": "Shorten to 60 characters"}]'
        rows="3"
        class="w-full mt-3 px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-xs placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#F59E0B] font-mono"
      ></textarea>
    </div>

    <!-- Passed Checks -->
    <div v-if="passed.length > 0" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#10B981] mb-3 flex items-center gap-2">
        <span>✓</span>
        <span>Passed Checks</span>
      </h4>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(check, index) in passed"
          :key="'passed-' + index"
          class="px-3 py-1 bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] text-sm rounded-full"
        >
          ✓ {{ check }}
        </span>
      </div>
      <!-- JSON Editor for Passed -->
      <textarea
        v-model="modelValue.seo_health_passed"
        @input="updateField('seo_health_passed', $event.target.value)"
        placeholder='["Meta title set", "Canonical URL configured", "OG tags filled"]'
        rows="2"
        class="w-full mt-3 px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-xs placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#10B981] font-mono"
      ></textarea>
    </div>

    <!-- Score Trend -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3">📈 Score Trend</h4>
      <div class="h-20 flex items-end gap-1">
        <div
          v-for="(point, index) in trendData"
          :key="'trend-' + index"
          class="flex-1 rounded-t transition-all duration-300"
          :class="getTrendBarClass(point)"
          :style="{ height: `${point}%` }"
          :title="`Score: ${point}`"
        ></div>
      </div>
      <div class="flex justify-between text-xs text-[#6B7280] mt-2">
        <span>7 days ago</span>
        <span>Today</span>
      </div>
      <!-- JSON Editor for Trend -->
      <textarea
        v-model="modelValue.seo_health_trend"
        @input="updateField('seo_health_trend', $event.target.value)"
        placeholder='[65, 70, 72, 68, 75, 80, 85]'
        rows="1"
        class="w-full mt-3 px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-xs placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] font-mono"
      ></textarea>
    </div>

    <!-- Quick SEO Checklist -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3">📋 SEO Checklist</h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="item in checklist"
          :key="item.id"
          class="flex items-center gap-2 p-2 rounded-lg"
          :class="item.passed ? 'bg-[#10B981]/10' : 'bg-[#EF4444]/10'"
        >
          <span :class="item.passed ? 'text-[#10B981]' : 'text-[#EF4444]'">
            {{ item.passed ? '✓' : '✗' }}
          </span>
          <span class="text-sm" :class="item.passed ? 'text-[#10B981]' : 'text-[#FCA5A5]'">
            {{ item.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      seo_health_score: 0,
      seo_health_issues: null,
      seo_health_warnings: null,
      seo_health_passed: null,
      seo_health_last_audit: null,
      seo_health_trend: null
    })
  },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },
  ogTitle: { type: String, default: '' },
  ogImage: { type: String, default: '' }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// State
const auditing = ref(false)

// Computed
const scoreColor = computed(() => {
  const score = props.modelValue.seo_health_score || 0
  if (score >= 80) return '#10B981'
  if (score >= 50) return '#F59E0B'
  return '#EF4444'
})

const scoreTextClass = computed(() => {
  const score = props.modelValue.seo_health_score || 0
  if (score >= 80) return 'text-[#10B981]'
  if (score >= 50) return 'text-[#F59E0B]'
  return 'text-[#EF4444]'
})

const scoreLabel = computed(() => {
  const score = props.modelValue.seo_health_score || 0
  if (score >= 90) return '🏆 Excellent! SEO optimized'
  if (score >= 80) return '✅ Good. Minor improvements needed'
  if (score >= 60) return '⚠️ Fair. Improvements required'
  if (score >= 40) return '🔶 Poor. Many issues'
  return '❌ Bad. Optimization needed'
})

const lastAuditFormatted = computed(() => {
  if (!props.modelValue.seo_health_last_audit) return 'Never'
  return new Date(props.modelValue.seo_health_last_audit).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const issues = computed(() => {
  if (!props.modelValue.seo_health_issues) return []
  try {
    return JSON.parse(props.modelValue.seo_health_issues)
  } catch {
    return []
  }
})

const warnings = computed(() => {
  if (!props.modelValue.seo_health_warnings) return []
  try {
    return JSON.parse(props.modelValue.seo_health_warnings)
  } catch {
    return []
  }
})

const passed = computed(() => {
  if (!props.modelValue.seo_health_passed) return []
  try {
    return JSON.parse(props.modelValue.seo_health_passed)
  } catch {
    return []
  }
})

const trendData = computed(() => {
  if (!props.modelValue.seo_health_trend) return [50, 55, 60, 58, 65, 70, props.modelValue.seo_health_score || 0]
  try {
    return JSON.parse(props.modelValue.seo_health_trend)
  } catch {
    return [50, 55, 60, 58, 65, 70, props.modelValue.seo_health_score || 0]
  }
})

const issuesCount = computed(() => issues.value.length)
const warningsCount = computed(() => warnings.value.length)
const passedCount = computed(() => passed.value.length)

const checklist = computed(() => [
  { id: 'title', label: 'Meta Title', passed: !!props.seoTitle },
  { id: 'description', label: 'Meta Description', passed: !!props.seoDescription },
  { id: 'canonical', label: 'Canonical URL', passed: !!props.canonicalUrl },
  { id: 'og_title', label: 'OG Title', passed: !!props.ogTitle },
  { id: 'og_image', label: 'OG Image', passed: !!props.ogImage },
  { id: 'score', label: 'Health Score > 70', passed: (props.modelValue.seo_health_score || 0) > 70 }
])

// Methods
function updateField(field, value) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

function getTrendBarClass(value) {
  if (value >= 80) return 'bg-[#10B981]'
  if (value >= 50) return 'bg-[#F59E0B]'
  return 'bg-[#EF4444]'
}

function runAudit() {
  auditing.value = true

  // Simulate audit
  setTimeout(() => {
    const newIssues = []
    const newWarnings = []
    const newPassed = []
    let score = 100

    // Check title
    if (!props.seoTitle) {
      newIssues.push({ message: 'Missing Meta Title', hint: 'Add an SEO title', impact: 'High' })
      score -= 20
    } else if (props.seoTitle.length < 30) {
      newWarnings.push({ message: 'Meta Title is too short', hint: 'Recommended 50-60 characters' })
      score -= 5
    } else if (props.seoTitle.length > 60) {
      newWarnings.push({ message: 'Meta Title is too long', hint: 'Shorten to 60 characters' })
      score -= 5
    } else {
      newPassed.push('Meta Title has optimal length')
    }

    // Check description
    if (!props.seoDescription) {
      newIssues.push({ message: 'Missing Meta Description', hint: 'Add an SEO description', impact: 'High' })
      score -= 20
    } else if (props.seoDescription.length < 70) {
      newWarnings.push({ message: 'Meta Description is too short', hint: 'Recommended 150-160 characters' })
      score -= 5
    } else if (props.seoDescription.length > 160) {
      newWarnings.push({ message: 'Meta Description is too long', hint: 'Shorten to 160 characters' })
      score -= 5
    } else {
      newPassed.push('Meta Description has optimal length')
    }

    // Check canonical
    if (props.canonicalUrl) {
      newPassed.push('Canonical URL configured')
    } else {
      newWarnings.push({ message: 'Canonical URL not set', hint: 'Recommended to set a canonical URL' })
      score -= 5
    }

    // Check OG
    if (props.ogTitle) newPassed.push('Open Graph Title populated')
    else {
      newWarnings.push({ message: 'OG Title not set', hint: 'Improves social media preview' })
      score -= 3
    }

    if (props.ogImage) newPassed.push('Open Graph Image populated')
    else {
      newWarnings.push({ message: 'OG Image not set', hint: 'Add an image for sharing' })
      score -= 3
    }

    score = Math.max(0, Math.min(100, score))

    // Update trend
    const currentTrend = trendData.value.slice(-6)
    currentTrend.push(score)

    // Update all fields
    emit('update:modelValue', {
      ...props.modelValue,
      seo_health_score: score,
      seo_health_issues: JSON.stringify(newIssues),
      seo_health_warnings: JSON.stringify(newWarnings),
      seo_health_passed: JSON.stringify(newPassed),
      seo_health_last_audit: new Date().toISOString(),
      seo_health_trend: JSON.stringify(currentTrend)
    })

    auditing.value = false
  }, 1500)
}
</script>
