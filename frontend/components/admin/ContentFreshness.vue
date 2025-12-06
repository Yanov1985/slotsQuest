<template>
  <!--
    📅 Content Freshness Component

    Индикаторы свежести контента для SEO:
    - Дата публикации
    - Дата обновления
    - История изменений
    - Запланированные проверки
  -->
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-[#10B981]/20 to-[#059669]/20 rounded-xl border border-[#10B981]/30">
      <div class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center">
        <span class="text-2xl">📅</span>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-medium text-[#E5E7EB]">Content Freshness</h3>
        <p class="text-sm text-[#9CA3AF]">Управление актуальностью контента</p>
      </div>
      <div
        class="px-4 py-2 rounded-lg text-sm font-medium"
        :class="freshnessClass"
      >
        {{ freshnessLabel }}
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Published Date -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3 flex items-center gap-2">
          <span class="text-lg">📝</span>
          Дата публикации
        </label>
        <input
          type="date"
          v-model="localPublishedDate"
          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
        />
        <p class="text-xs text-[#9CA3AF] mt-2">
          Первоначальная дата публикации обзора
        </p>
      </div>

      <!-- Last Major Update -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3 flex items-center gap-2">
          <span class="text-lg">🔄</span>
          Крупное обновление
        </label>
        <input
          type="date"
          v-model="localMajorUpdate"
          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
        />
        <p class="text-xs text-[#9CA3AF] mt-2">
          Дата последнего значительного обновления контента
        </p>
      </div>

      <!-- Last Reviewed -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3 flex items-center gap-2">
          <span class="text-lg">✅</span>
          Последняя проверка
        </label>
        <input
          type="date"
          v-model="localReviewedDate"
          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
        />
        <p class="text-xs text-[#9CA3AF] mt-2">
          Когда редактор проверил актуальность
        </p>
      </div>

      <!-- Next Review -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3 flex items-center gap-2">
          <span class="text-lg">📆</span>
          Следующая проверка
        </label>
        <input
          type="date"
          v-model="localNextReview"
          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
        />
        <p class="text-xs text-[#9CA3AF] mt-2">
          Запланированная дата следующей проверки
        </p>
      </div>
    </div>

    <!-- Version & Frequency -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Content Version -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3 flex items-center gap-2">
          <span class="text-lg">🏷️</span>
          Версия контента
        </label>
        <input
          type="text"
          v-model="localVersion"
          placeholder="1.0.0"
          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200 font-mono"
        />
      </div>

      <!-- Update Frequency -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3 flex items-center gap-2">
          <span class="text-lg">⏱️</span>
          Частота обновлений
        </label>
        <select
          v-model="localUpdateFrequency"
          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-200"
        >
          <option value="weekly">Еженедельно</option>
          <option value="biweekly">Раз в 2 недели</option>
          <option value="monthly">Ежемесячно</option>
          <option value="quarterly">Ежеквартально</option>
          <option value="annually">Ежегодно</option>
          <option value="as-needed">По необходимости</option>
        </select>
      </div>
    </div>

    <!-- Changelog -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <div class="flex items-center justify-between mb-4">
        <label class="text-sm font-medium text-[#E5E7EB] flex items-center gap-2">
          <span class="text-lg">📋</span>
          История изменений
        </label>
        <button
          type="button"
          @click="addChangelogEntry"
          class="px-3 py-1.5 bg-[#10B981] text-white rounded-lg text-xs font-medium hover:bg-[#059669] transition-colors flex items-center gap-1"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Добавить запись
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-for="(entry, index) in changelogEntries"
          :key="index"
          class="flex items-start gap-3 p-3 bg-[#161A21] rounded-lg group"
        >
          <div class="flex-shrink-0 w-2 h-2 mt-2 bg-[#10B981] rounded-full"></div>
          <div class="flex-1 space-y-2">
            <input
              type="date"
              v-model="entry.date"
              class="w-32 px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-xs text-[#E5E7EB] focus:outline-none focus:ring-1 focus:ring-[#10B981]"
            />
            <input
              type="text"
              v-model="entry.description"
              placeholder="Описание изменения..."
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-sm text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#10B981]"
            />
          </div>
          <button
            type="button"
            @click="removeChangelogEntry(index)"
            class="opacity-0 group-hover:opacity-100 p-1.5 text-[#EF4444] hover:bg-[#EF4444]/20 rounded transition-all"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p v-if="changelogEntries.length === 0" class="text-center text-[#9CA3AF] text-sm py-4">
          Нет записей в истории изменений
        </p>
      </div>
    </div>

    <!-- Freshness Indicators Preview -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <label class="block text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
        <span class="text-lg">👁️</span>
        Превью индикаторов на странице
      </label>

      <div class="bg-[#161A21] rounded-lg p-4 space-y-3">
        <!-- Published Badge -->
        <div class="flex items-center gap-2 text-sm">
          <span class="text-[#9CA3AF]">📝 Published:</span>
          <span class="text-[#E5E7EB]">{{ formatDate(localPublishedDate) || 'Not set' }}</span>
        </div>

        <!-- Updated Badge -->
        <div class="flex items-center gap-2 text-sm">
          <span class="text-[#9CA3AF]">🔄 Last Updated:</span>
          <span class="text-[#E5E7EB]">{{ formatDate(localMajorUpdate || localReviewedDate) || 'Not set' }}</span>
          <span v-if="daysSinceUpdate !== null" class="px-2 py-0.5 rounded text-xs" :class="daysSinceUpdate > 90 ? 'bg-[#EF4444]/20 text-[#EF4444]' : daysSinceUpdate > 30 ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'bg-[#10B981]/20 text-[#10B981]'">
            {{ daysSinceUpdate }} days ago
          </span>
        </div>

        <!-- Fact-checked Badge -->
        <div class="flex items-center gap-2 text-sm">
          <span class="text-[#9CA3AF]">✅ Fact-checked:</span>
          <span class="text-[#E5E7EB]">{{ formatDate(localReviewedDate) || 'Not verified' }}</span>
        </div>

        <!-- Version Badge -->
        <div class="flex items-center gap-2 text-sm">
          <span class="text-[#9CA3AF]">🏷️ Version:</span>
          <span class="px-2 py-0.5 bg-[#8B5CF6]/20 text-[#A78BFA] rounded text-xs font-mono">
            v{{ localVersion || '1.0' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        @click="markAsReviewed"
        class="px-4 py-2 bg-[#10B981] text-white rounded-lg text-sm font-medium hover:bg-[#059669] transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Отметить как проверено сегодня
      </button>
      <button
        type="button"
        @click="bumpVersion"
        class="px-4 py-2 bg-[#3B82F6] text-white rounded-lg text-sm font-medium hover:bg-[#2563EB] transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
        Увеличить версию
      </button>
      <button
        type="button"
        @click="scheduleNextReview"
        class="px-4 py-2 bg-[#8B5CF6] text-white rounded-lg text-sm font-medium hover:bg-[#7C3AED] transition-colors flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Запланировать проверку
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  publishedDate: { type: String, default: '' },
  majorUpdate: { type: String, default: '' },
  reviewedDate: { type: String, default: '' },
  nextReview: { type: String, default: '' },
  version: { type: String, default: '1.0' },
  updateFrequency: { type: String, default: 'monthly' },
  changelog: { type: String, default: '' }
})

// Emits
const emit = defineEmits([
  'update:publishedDate',
  'update:majorUpdate',
  'update:reviewedDate',
  'update:nextReview',
  'update:version',
  'update:updateFrequency',
  'update:changelog'
])

// Local state
const localPublishedDate = ref(props.publishedDate)
const localMajorUpdate = ref(props.majorUpdate)
const localReviewedDate = ref(props.reviewedDate)
const localNextReview = ref(props.nextReview)
const localVersion = ref(props.version)
const localUpdateFrequency = ref(props.updateFrequency)
const changelogEntries = ref([])

// Parse changelog from JSON
try {
  if (props.changelog) {
    changelogEntries.value = JSON.parse(props.changelog)
  }
} catch (e) {
  changelogEntries.value = []
}

// Watch and emit
watch(localPublishedDate, (val) => emit('update:publishedDate', val))
watch(localMajorUpdate, (val) => emit('update:majorUpdate', val))
watch(localReviewedDate, (val) => emit('update:reviewedDate', val))
watch(localNextReview, (val) => emit('update:nextReview', val))
watch(localVersion, (val) => emit('update:version', val))
watch(localUpdateFrequency, (val) => emit('update:updateFrequency', val))
watch(changelogEntries, () => {
  emit('update:changelog', JSON.stringify(changelogEntries.value))
}, { deep: true })

// Computed
const daysSinceUpdate = computed(() => {
  const lastUpdate = localMajorUpdate.value || localReviewedDate.value
  if (!lastUpdate) return null
  const days = Math.floor((Date.now() - new Date(lastUpdate).getTime()) / (1000 * 60 * 60 * 24))
  return days
})

const freshnessLabel = computed(() => {
  if (daysSinceUpdate.value === null) return '❓ Unknown'
  if (daysSinceUpdate.value <= 7) return '🟢 Fresh'
  if (daysSinceUpdate.value <= 30) return '🟡 Recent'
  if (daysSinceUpdate.value <= 90) return '🟠 Aging'
  return '🔴 Stale'
})

const freshnessClass = computed(() => {
  if (daysSinceUpdate.value === null) return 'bg-[#6B7280]/20 text-[#9CA3AF]'
  if (daysSinceUpdate.value <= 7) return 'bg-[#10B981]/20 text-[#10B981]'
  if (daysSinceUpdate.value <= 30) return 'bg-[#F59E0B]/20 text-[#F59E0B]'
  if (daysSinceUpdate.value <= 90) return 'bg-[#F97316]/20 text-[#F97316]'
  return 'bg-[#EF4444]/20 text-[#EF4444]'
})

// Methods
function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function addChangelogEntry() {
  changelogEntries.value.unshift({
    date: new Date().toISOString().split('T')[0],
    description: ''
  })
}

function removeChangelogEntry(index) {
  changelogEntries.value.splice(index, 1)
}

function markAsReviewed() {
  const today = new Date().toISOString().split('T')[0]
  localReviewedDate.value = today

  // Add changelog entry
  changelogEntries.value.unshift({
    date: today,
    description: 'Content reviewed and verified as accurate'
  })
}

function bumpVersion() {
  const parts = (localVersion.value || '1.0').split('.')
  if (parts.length >= 2) {
    parts[1] = String(parseInt(parts[1] || 0) + 1)
  } else {
    parts.push('1')
  }
  localVersion.value = parts.join('.')

  // Update major update date
  localMajorUpdate.value = new Date().toISOString().split('T')[0]
}

function scheduleNextReview() {
  // Based on update frequency, calculate next review date
  const freqDays = {
    weekly: 7,
    biweekly: 14,
    monthly: 30,
    quarterly: 90,
    annually: 365,
    'as-needed': 30
  }

  const days = freqDays[localUpdateFrequency.value] || 30
  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + days)
  localNextReview.value = nextDate.toISOString().split('T')[0]
}
</script>
