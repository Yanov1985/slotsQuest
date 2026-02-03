<template>
  <!--
    🗺️ Sitemap Configuration Component v2.0

    Enhanced with:
    - Sitemap Score indicator
    - Visual image/video cards
    - Quick-add from slot images
    - Syntax-highlighted XML preview
    - Sitemap validation
    - Google News extended settings
    - Mobile sitemap settings
  -->
  <div class="space-y-6">
    <!-- Header with Score -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#10B981]/20 to-[#34D399]/20 rounded-xl border border-[#10B981]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center">
          <span class="text-2xl">🗺️</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">Sitemap Configuration</h3>
          <p class="text-sm text-[#9CA3AF]">XML карта сайта и индексация</p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <!-- Sitemap Score -->
        <div
          class="relative w-14 h-14 rounded-full flex items-center justify-center"
          :class="{
            'bg-[#EF4444]/20': sitemapScore < 40,
            'bg-[#F59E0B]/20': sitemapScore >= 40 && sitemapScore < 70,
            'bg-[#10B981]/20': sitemapScore >= 70,
          }"
        >
          <span
            class="text-lg font-bold"
            :class="{
              'text-[#EF4444]': sitemapScore < 40,
              'text-[#F59E0B]': sitemapScore >= 40 && sitemapScore < 70,
              'text-[#10B981]': sitemapScore >= 70,
            }"
          >{{ sitemapScore }}%</span>
        </div>

        <!-- Include Toggle -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-[#9CA3AF]">В sitemap</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              :checked="modelValue.sitemap_include !== false"
              @change="updateField('sitemap_include', $event.target.checked)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-[#353A4A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#10B981] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
          </label>
        </div>
      </div>
    </div>

    <!-- Score Details -->
    <div class="grid grid-cols-5 gap-3">
      <div
        v-for="item in scoreItems"
        :key="item.key"
        class="bg-[#1B1E26] border rounded-lg p-3 text-center"
        :class="item.active ? 'border-[#10B981]/50' : 'border-[#353A4A]/50'"
      >
        <span class="text-lg">{{ item.icon }}</span>
        <p class="text-xs text-[#9CA3AF] mt-1">{{ item.label }}</p>
        <p
          class="text-xs font-medium mt-1"
          :class="item.active ? 'text-[#10B981]' : 'text-[#6B7280]'"
        >{{ item.active ? '✓' : '—' }}</p>
      </div>
    </div>

    <!-- Main Settings Grid -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Priority -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
        <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-4">
          <span class="text-lg">📊</span>
          Priority (Приоритет)
        </label>

        <!-- Visual Priority Scale -->
        <div class="relative mb-4">
          <div class="flex justify-between mb-2">
            <span class="text-xs text-[#6B7280]">Низкий</span>
            <span class="text-2xl font-bold text-[#10B981]">{{ (modelValue.sitemap_priority || 0.8).toFixed(1) }}</span>
            <span class="text-xs text-[#6B7280]">Высокий</span>
          </div>
          <input
            type="range"
            v-model.number="localPriority"
            @input="updateField('sitemap_priority', parseFloat($event.target.value))"
            min="0"
            max="1"
            step="0.1"
            class="w-full h-2 bg-[#353A4A] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
          />
          <div class="flex justify-between mt-1">
            <span v-for="n in 11" :key="n" class="text-[8px] text-[#6B7280]">{{ ((n-1)/10).toFixed(1) }}</span>
          </div>
        </div>

        <!-- Priority Presets -->
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="preset in priorityPresets"
            :key="preset.value"
            type="button"
            @click="setPriority(preset.value)"
            class="px-2 py-2 rounded-lg text-xs font-medium transition-all flex flex-col items-center gap-1"
            :class="{
              'bg-[#10B981] text-white': (modelValue.sitemap_priority || 0.8) === preset.value,
              'bg-[#353A4A] text-[#9CA3AF] hover:bg-[#4B5563]': (modelValue.sitemap_priority || 0.8) !== preset.value
            }"
          >
            <span class="text-lg">{{ preset.icon }}</span>
            <span>{{ preset.label }}</span>
          </button>
        </div>
      </div>

      <!-- Change Frequency -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
        <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-4">
          <span class="text-lg">🔄</span>
          Changefreq (Частота)
        </label>

        <!-- Frequency Grid -->
        <div class="grid grid-cols-4 gap-2 mb-4">
          <button
            v-for="freq in frequencies"
            :key="freq.value"
            type="button"
            @click="updateField('sitemap_frequency', freq.value)"
            class="px-2 py-3 rounded-lg text-xs font-medium transition-all flex flex-col items-center gap-1"
            :class="{
              'bg-[#10B981] text-white': modelValue.sitemap_frequency === freq.value,
              'bg-[#353A4A] text-[#9CA3AF] hover:bg-[#4B5563]': modelValue.sitemap_frequency !== freq.value
            }"
          >
            <span class="text-xl">{{ freq.icon }}</span>
            <span>{{ freq.label }}</span>
          </button>
        </div>

        <p class="text-xs text-[#6B7280]">
          Как часто контент обновляется. Для слотов рекомендуется <strong class="text-[#10B981]">weekly</strong> или <strong class="text-[#10B981]">monthly</strong>.
        </p>
      </div>
    </div>

    <!-- Last Modified -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB] mb-3">
        <span class="text-lg">📅</span>
        LastMod (Дата изменения)
      </label>
      <div class="flex items-center gap-3">
        <input
          type="datetime-local"
          :value="formatDatetimeForInput(modelValue.sitemap_last_mod)"
          @input="updateField('sitemap_last_mod', $event.target.value)"
          class="flex-1 px-4 py-2.5 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
        />
        <button
          type="button"
          @click="setCurrentDate"
          class="px-4 py-2.5 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-lg text-sm font-medium hover:bg-[#10B981]/30 transition-colors"
        >
          📍 Сейчас
        </button>
        <button
          type="button"
          @click="clearDate"
          class="px-4 py-2.5 bg-[#353A4A] text-[#9CA3AF] rounded-lg text-sm hover:text-[#E5E7EB] transition-colors"
        >
          Очистить
        </button>
      </div>
      <p class="text-xs text-[#6B7280] mt-2">
        Дата последнего изменения контента. Оставьте пустым для автоматического определения.
      </p>
    </div>

    <!-- Images Section -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-lg">🖼️</span>
          Изображения для Sitemap
          <span class="px-2 py-0.5 rounded-full text-xs bg-[#10B981]/20 text-[#10B981]">
            {{ parsedImages.length }} img
          </span>
        </label>
        <div class="flex gap-2">
          <button
            v-if="slotImage"
            type="button"
            @click="addSlotImage"
            class="px-3 py-1.5 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-lg text-xs font-medium hover:bg-[#10B981]/30 transition-colors"
          >
            + Добавить из слота
          </button>
          <button
            type="button"
            @click="addEmptyImage"
            class="px-3 py-1.5 bg-[#353A4A] text-[#9CA3AF] rounded-lg text-xs hover:text-[#E5E7EB] transition-colors"
          >
            + Новое
          </button>
        </div>
      </div>

      <!-- Image Cards -->
      <div v-if="parsedImages.length > 0" class="grid grid-cols-2 gap-3 mb-4">
        <div
          v-for="(img, i) in parsedImages"
          :key="i"
          class="bg-[#161A21] border border-[#353A4A] rounded-lg p-3 relative group"
        >
          <button
            type="button"
            @click="removeImage(i)"
            class="absolute top-2 right-2 w-6 h-6 bg-[#EF4444]/20 text-[#EF4444] rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
          >×</button>
          <div class="flex gap-3">
            <div class="w-16 h-16 bg-[#353A4A] rounded-lg overflow-hidden flex-shrink-0">
              <img
                v-if="img.loc"
                :src="img.loc"
                class="w-full h-full object-cover"
                @error="$event.target.style.display='none'"
              />
            </div>
            <div class="flex-1 min-w-0">
              <input
                v-model="img.title"
                @input="updateImages"
                placeholder="Заголовок"
                class="w-full px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-xs text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#10B981] mb-1"
              />
              <input
                v-model="img.loc"
                @input="updateImages"
                placeholder="URL изображения"
                class="w-full px-2 py-1 bg-[#1B1E26] border border-[#353A4A] rounded text-xs text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#10B981] font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      <p v-else class="text-sm text-[#6B7280] text-center py-4">
        Нет изображений. Добавьте изображения для улучшения SEO.
      </p>
    </div>

    <!-- Videos Section -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-lg">🎬</span>
          Видео для Sitemap
          <span class="px-2 py-0.5 rounded-full text-xs bg-[#8B5CF6]/20 text-[#8B5CF6]">
            {{ parsedVideos.length }} video
          </span>
        </label>
        <button
          type="button"
          @click="addEmptyVideo"
          class="px-3 py-1.5 bg-[#353A4A] text-[#9CA3AF] rounded-lg text-xs hover:text-[#E5E7EB] transition-colors"
        >
          + Новое видео
        </button>
      </div>

      <!-- Video Cards -->
      <div v-if="parsedVideos.length > 0" class="space-y-3 mb-4">
        <div
          v-for="(video, i) in parsedVideos"
          :key="i"
          class="bg-[#161A21] border border-[#353A4A] rounded-lg p-3 relative group"
        >
          <button
            type="button"
            @click="removeVideo(i)"
            class="absolute top-2 right-2 w-6 h-6 bg-[#EF4444]/20 text-[#EF4444] rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
          >×</button>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-[#6B7280] block mb-1">Заголовок</label>
              <input
                v-model="video.title"
                @input="updateVideos"
                placeholder="Обзор слота"
                class="w-full px-2 py-1.5 bg-[#1B1E26] border border-[#353A4A] rounded text-xs text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>
            <div>
              <label class="text-xs text-[#6B7280] block mb-1">Thumbnail URL</label>
              <input
                v-model="video.thumbnail"
                @input="updateVideos"
                placeholder="https://..."
                class="w-full px-2 py-1.5 bg-[#1B1E26] border border-[#353A4A] rounded text-xs text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] font-mono"
              />
            </div>
            <div class="col-span-2">
              <label class="text-xs text-[#6B7280] block mb-1">Content URL</label>
              <input
                v-model="video.content_loc"
                @input="updateVideos"
                placeholder="https://youtube.com/... или прямой URL"
                class="w-full px-2 py-1.5 bg-[#1B1E26] border border-[#353A4A] rounded text-xs text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      <p v-else class="text-sm text-[#6B7280] text-center py-4">
        Нет видео. Добавьте видео для Video Sitemap.
      </p>
    </div>

    <!-- Extended Settings -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Google News -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
        <div class="flex items-center justify-between mb-4">
          <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
            <span class="text-lg">📰</span>
            Google News
          </label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              :checked="modelValue.sitemap_news"
              @change="updateField('sitemap_news', $event.target.checked)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
          </label>
        </div>

        <div v-if="modelValue.sitemap_news" class="space-y-3">
          <div>
            <label class="text-xs text-[#6B7280] block mb-1">Publication Name</label>
            <input
              v-model="modelValue.news_publication_name"
              @input="updateField('news_publication_name', $event.target.value)"
              placeholder="SlotQuest"
              class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-sm text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            />
          </div>
          <div>
            <label class="text-xs text-[#6B7280] block mb-1">News Title</label>
            <input
              v-model="modelValue.news_title"
              @input="updateField('news_title', $event.target.value)"
              :placeholder="slotName || 'Заголовок новости'"
              class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-sm text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            />
          </div>
        </div>

        <p v-else class="text-xs text-[#6B7280]">
          Включить для новостных результатов Google
        </p>
      </div>

      <!-- Mobile Sitemap -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
        <div class="flex items-center justify-between mb-4">
          <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
            <span class="text-lg">📱</span>
            Mobile Sitemap
          </label>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              :checked="modelValue.sitemap_mobile !== false"
              @change="updateField('sitemap_mobile', $event.target.checked)"
              class="sr-only peer"
            />
            <div class="w-11 h-6 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
          </label>
        </div>

        <p class="text-xs text-[#6B7280]">
          Включить страницу в мобильный sitemap. Рекомендуется для всех адаптивных страниц.
        </p>
      </div>
    </div>

    <!-- Sitemap Preview -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-lg">📝</span>
          XML Preview
        </h4>
        <button
          type="button"
          @click="copyXml"
          class="px-3 py-1.5 bg-[#353A4A] text-[#9CA3AF] rounded-lg text-xs hover:text-[#E5E7EB] transition-colors flex items-center gap-1"
        >
          📋 Копировать
        </button>
      </div>
      <div class="bg-[#161A21] rounded-lg p-4 overflow-x-auto">
        <pre class="text-xs leading-relaxed"><code v-html="highlightedXml"></code></pre>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-4">🔗 Быстрые действия</h4>
      <div class="flex flex-wrap gap-3">
        <a
          :href="sitemapUrl"
          target="_blank"
          class="px-4 py-2 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-lg text-sm hover:bg-[#10B981]/30 transition-colors flex items-center gap-2"
        >
          🗺️ Открыть sitemap.xml
        </a>
        <a
          href="https://search.google.com/search-console/sitemaps"
          target="_blank"
          class="px-4 py-2 bg-[#4285F4]/20 text-[#4285F4] border border-[#4285F4]/30 rounded-lg text-sm hover:bg-[#4285F4]/30 transition-colors flex items-center gap-2"
        >
          🔍 GSC Sitemaps
        </a>
        <button
          type="button"
          @click="validateSitemap"
          :disabled="validating"
          class="px-4 py-2 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 rounded-lg text-sm hover:bg-[#F59E0B]/30 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {{ validating ? '⏳ Проверка...' : '✓ Проверить sitemap' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      sitemap_include: true,
      sitemap_priority: 0.8,
      sitemap_frequency: 'weekly',
      sitemap_last_mod: null,
      sitemap_images: null,
      sitemap_videos: null,
      sitemap_news: false,
      sitemap_mobile: true,
      news_publication_name: '',
      news_title: ''
    })
  },
  pageUrl: { type: String, default: '' },
  slotName: { type: String, default: '' },
  slotImage: { type: String, default: '' },
  siteUrl: { type: String, default: '' }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// State
const validating = ref(false)
const localPriority = ref(props.modelValue.sitemap_priority || 0.8)
const parsedImages = reactive([])
const parsedVideos = reactive([])

// Static Data
const priorityPresets = [
  { value: 0.5, label: 'Low', icon: '📉' },
  { value: 0.7, label: 'Normal', icon: '📊' },
  { value: 0.8, label: 'High', icon: '📈' },
  { value: 1.0, label: 'Max', icon: '🚀' }
]

const frequencies = [
  { value: 'always', label: 'Always', icon: '⚡' },
  { value: 'hourly', label: 'Hourly', icon: '🕐' },
  { value: 'daily', label: 'Daily', icon: '📅' },
  { value: 'weekly', label: 'Weekly', icon: '📆' },
  { value: 'monthly', label: 'Monthly', icon: '🗓️' },
  { value: 'yearly', label: 'Yearly', icon: '📖' },
  { value: 'never', label: 'Never', icon: '🚫' }
]

// Initialize parsed arrays
watch(() => props.modelValue.sitemap_images, (val) => {
  try {
    const arr = val ? JSON.parse(val) : []
    parsedImages.splice(0, parsedImages.length, ...arr)
  } catch {
    parsedImages.splice(0, parsedImages.length)
  }
}, { immediate: true })

watch(() => props.modelValue.sitemap_videos, (val) => {
  try {
    const arr = val ? JSON.parse(val) : []
    parsedVideos.splice(0, parsedVideos.length, ...arr)
  } catch {
    parsedVideos.splice(0, parsedVideos.length)
  }
}, { immediate: true })

// Computed
const sitemapScore = computed(() => {
  let score = 0

  // Included in sitemap (20 points)
  if (props.modelValue.sitemap_include !== false) score += 20

  // Priority set (15 points)
  if (props.modelValue.sitemap_priority >= 0.7) score += 15
  else if (props.modelValue.sitemap_priority > 0) score += 10

  // Frequency set (15 points)
  if (props.modelValue.sitemap_frequency) score += 15

  // Last mod set (15 points)
  if (props.modelValue.sitemap_last_mod) score += 15

  // Has images (20 points)
  if (parsedImages.length > 0) score += 20

  // Has videos (15 points)
  if (parsedVideos.length > 0) score += 15

  return score
})

const scoreItems = computed(() => [
  { key: 'include', icon: '✓', label: 'Включен', active: props.modelValue.sitemap_include !== false },
  { key: 'priority', icon: '📊', label: 'Priority', active: props.modelValue.sitemap_priority >= 0.7 },
  { key: 'frequency', icon: '🔄', label: 'Frequency', active: !!props.modelValue.sitemap_frequency },
  { key: 'images', icon: '🖼️', label: 'Images', active: parsedImages.length > 0 },
  { key: 'videos', icon: '🎬', label: 'Videos', active: parsedVideos.length > 0 }
])

const sitemapUrl = computed(() => {
  const base = props.siteUrl || 'https://example.com'
  return `${base}/sitemap.xml`
})

const highlightedXml = computed(() => {
  const lastMod = props.modelValue.sitemap_last_mod
    ? new Date(props.modelValue.sitemap_last_mod).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0]

  let xml = `<span class="text-[#9CA3AF]">&lt;url&gt;</span>\n`
  xml += `  <span class="text-[#F59E0B]">&lt;loc&gt;</span><span class="text-[#10B981]">${props.pageUrl || 'https://example.com/slots/game'}</span><span class="text-[#F59E0B]">&lt;/loc&gt;</span>\n`
  xml += `  <span class="text-[#F59E0B]">&lt;lastmod&gt;</span><span class="text-[#10B981]">${lastMod}</span><span class="text-[#F59E0B]">&lt;/lastmod&gt;</span>\n`
  xml += `  <span class="text-[#F59E0B]">&lt;changefreq&gt;</span><span class="text-[#10B981]">${props.modelValue.sitemap_frequency || 'weekly'}</span><span class="text-[#F59E0B]">&lt;/changefreq&gt;</span>\n`
  xml += `  <span class="text-[#F59E0B]">&lt;priority&gt;</span><span class="text-[#10B981]">${(props.modelValue.sitemap_priority || 0.8).toFixed(1)}</span><span class="text-[#F59E0B]">&lt;/priority&gt;</span>\n`

  // Images
  if (parsedImages.length > 0) {
    xml += `  <span class="text-[#6B7280]">&lt;!-- Images --&gt;</span>\n`
    for (const img of parsedImages) {
      xml += `  <span class="text-[#8B5CF6]">&lt;image:image&gt;</span>\n`
      xml += `    <span class="text-[#8B5CF6]">&lt;image:loc&gt;</span><span class="text-[#10B981]">${img.loc || ''}</span><span class="text-[#8B5CF6]">&lt;/image:loc&gt;</span>\n`
      if (img.title) xml += `    <span class="text-[#8B5CF6]">&lt;image:title&gt;</span><span class="text-[#10B981]">${img.title}</span><span class="text-[#8B5CF6]">&lt;/image:title&gt;</span>\n`
      xml += `  <span class="text-[#8B5CF6]">&lt;/image:image&gt;</span>\n`
    }
  }

  xml += `<span class="text-[#9CA3AF]">&lt;/url&gt;</span>`

  return xml
})

// Methods
function updateField(field, value) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

function setPriority(value) {
  localPriority.value = value
  updateField('sitemap_priority', value)
}

function formatDatetimeForInput(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toISOString().slice(0, 16)
}

function setCurrentDate() {
  updateField('sitemap_last_mod', new Date().toISOString())
}

function clearDate() {
  updateField('sitemap_last_mod', null)
}

function addSlotImage() {
  if (props.slotImage) {
    parsedImages.push({
      loc: props.slotImage,
      title: props.slotName || 'Slot image',
      caption: `Screenshot of ${props.slotName || 'slot'}`
    })
    updateImages()
  }
}

function addEmptyImage() {
  parsedImages.push({ loc: '', title: '', caption: '' })
  updateImages()
}

function removeImage(index) {
  parsedImages.splice(index, 1)
  updateImages()
}

function updateImages() {
  updateField('sitemap_images', JSON.stringify(parsedImages))
}

function addEmptyVideo() {
  parsedVideos.push({ title: '', thumbnail: '', content_loc: '', description: '' })
  updateVideos()
}

function removeVideo(index) {
  parsedVideos.splice(index, 1)
  updateVideos()
}

function updateVideos() {
  updateField('sitemap_videos', JSON.stringify(parsedVideos))
}

function copyXml() {
  const text = highlightedXml.value.replace(/<[^>]+>/g, '')
  navigator.clipboard.writeText(text)
}

function validateSitemap() {
  validating.value = true
  window.open(`https://www.xml-sitemaps.com/validate-xml-sitemap.html?url=${encodeURIComponent(sitemapUrl.value)}`, '_blank')
  setTimeout(() => {
    validating.value = false
  }, 1000)
}
</script>
