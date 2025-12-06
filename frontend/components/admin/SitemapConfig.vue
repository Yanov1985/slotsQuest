<template>
  <!--
    🗺️ Sitemap Configuration Component

    Настройки для XML Sitemap:
    - Включение/исключение из sitemap
    - Приоритет страницы (priority)
    - Частота обновления (changefreq)
    - Изображения и видео для sitemap
    - Google News sitemap
  -->
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#10B981]/20 to-[#34D399]/20 rounded-xl border border-[#10B981]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center">
          <span class="text-2xl">🗺️</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">Sitemap Configuration</h3>
          <p class="text-sm text-[#9CA3AF]">Настройки XML карты сайта</p>
        </div>
      </div>
      <!-- Include Toggle -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-[#9CA3AF]">Включить в sitemap</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            :checked="modelValue.sitemap_include"
            @change="updateField('sitemap_include', $event.target.checked)"
            class="sr-only peer"
          />
          <div class="w-11 h-6 bg-[#353A4A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#10B981] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
        </label>
      </div>
    </div>

    <!-- Main Settings -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Priority -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3">
          📊 Приоритет (Priority)
        </label>
        <div class="space-y-2">
          <input
            type="range"
            v-model.number="modelValue.sitemap_priority"
            @input="updateField('sitemap_priority', parseFloat($event.target.value))"
            min="0"
            max="1"
            step="0.1"
            class="w-full accent-[#10B981]"
          />
          <div class="flex justify-between items-center">
            <span class="text-xs text-[#6B7280]">0.0 (низкий)</span>
            <span class="text-lg font-bold text-[#10B981]">{{ (modelValue.sitemap_priority || 0.8).toFixed(1) }}</span>
            <span class="text-xs text-[#6B7280]">1.0 (высокий)</span>
          </div>
          <p class="text-xs text-[#6B7280]">
            Относительный приоритет страницы. Слоты обычно имеют 0.7-0.9
          </p>
        </div>
        <!-- Priority Presets -->
        <div class="flex gap-2 mt-3">
          <button
            v-for="preset in priorityPresets"
            :key="preset.value"
            type="button"
            @click="updateField('sitemap_priority', preset.value)"
            :class="[
              'px-3 py-1 rounded-lg text-xs font-medium transition-colors',
              modelValue.sitemap_priority === preset.value
                ? 'bg-[#10B981] text-white'
                : 'bg-[#353A4A] text-[#9CA3AF] hover:bg-[#4B5563]'
            ]"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>

      <!-- Change Frequency -->
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <label class="block text-sm font-medium text-[#E5E7EB] mb-3">
          🔄 Частота обновления (Changefreq)
        </label>
        <select
          v-model="modelValue.sitemap_frequency"
          @change="updateField('sitemap_frequency', $event.target.value)"
          class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
        >
          <option value="always">Always (постоянно)</option>
          <option value="hourly">Hourly (ежечасно)</option>
          <option value="daily">Daily (ежедневно)</option>
          <option value="weekly">Weekly (еженедельно)</option>
          <option value="monthly">Monthly (ежемесячно)</option>
          <option value="yearly">Yearly (ежегодно)</option>
          <option value="never">Never (никогда)</option>
        </select>
        <p class="text-xs text-[#6B7280] mt-2">
          Как часто контент страницы обновляется
        </p>
        <!-- Frequency Icons -->
        <div class="flex items-center gap-2 mt-3">
          <span
            v-for="freq in frequencyIcons"
            :key="freq.value"
            :title="freq.label"
            class="cursor-pointer text-lg transition-opacity"
            :class="modelValue.sitemap_frequency === freq.value ? 'opacity-100' : 'opacity-40'"
            @click="updateField('sitemap_frequency', freq.value)"
          >
            {{ freq.icon }}
          </span>
        </div>
      </div>
    </div>

    <!-- Last Modified -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <label class="block text-sm font-medium text-[#E5E7EB] mb-3">
        📅 Дата последнего изменения (LastMod)
      </label>
      <div class="flex items-center gap-4">
        <input
          type="datetime-local"
          :value="formatDatetimeForInput(modelValue.sitemap_last_mod)"
          @input="updateField('sitemap_last_mod', $event.target.value)"
          class="flex-1 px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
        />
        <button
          type="button"
          @click="setCurrentDate"
          class="px-4 py-2 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 rounded-lg text-sm hover:bg-[#10B981]/30 transition-colors"
        >
          Сейчас
        </button>
      </div>
      <p class="text-xs text-[#6B7280] mt-2">
        Дата последнего изменения контента. Автоматически используется в sitemap.
      </p>
    </div>

    <!-- Google News -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <div class="flex items-center justify-between">
        <div>
          <h4 class="text-sm font-medium text-[#E5E7EB]">📰 Google News Sitemap</h4>
          <p class="text-xs text-[#9CA3AF] mt-1">
            Включить страницу в Google News sitemap для новостных результатов
          </p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            :checked="modelValue.sitemap_news"
            @change="updateField('sitemap_news', $event.target.checked)"
            class="sr-only peer"
          />
          <div class="w-11 h-6 bg-[#353A4A] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#10B981] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
        </label>
      </div>
    </div>

    <!-- Images for Sitemap -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3">🖼️ Изображения для Sitemap</h4>
      <textarea
        v-model="modelValue.sitemap_images"
        @input="updateField('sitemap_images', $event.target.value)"
        :placeholder="imagePlaceholder"
        rows="4"
        class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#10B981] font-mono"
      ></textarea>
      <p class="text-xs text-[#6B7280] mt-2">
        JSON массив изображений: [{"loc": "url", "title": "заголовок", "caption": "описание"}]
      </p>
    </div>

    <!-- Videos for Sitemap -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3">🎬 Видео для Sitemap</h4>
      <textarea
        v-model="modelValue.sitemap_videos"
        @input="updateField('sitemap_videos', $event.target.value)"
        :placeholder="videoPlaceholder"
        rows="4"
        class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] text-sm placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#10B981] font-mono"
      ></textarea>
      <p class="text-xs text-[#6B7280] mt-2">
        JSON массив видео: [{"thumbnail": "url", "title": "заголовок", "description": "описание", "content_loc": "url"}]
      </p>
    </div>

    <!-- Sitemap Preview -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3">📝 Превью XML записи</h4>
      <pre class="p-4 bg-[#161A21] rounded-lg text-xs text-[#9CA3AF] overflow-x-auto"><code>{{ sitemapPreview }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
      sitemap_news: false
    })
  },
  pageUrl: { type: String, default: '' },
  slotName: { type: String, default: '' }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Static Data
const priorityPresets = [
  { value: 0.5, label: 'Low (0.5)' },
  { value: 0.7, label: 'Normal (0.7)' },
  { value: 0.8, label: 'High (0.8)' },
  { value: 1.0, label: 'Max (1.0)' }
]

const frequencyIcons = [
  { value: 'always', icon: '⚡', label: 'Always' },
  { value: 'hourly', icon: '🕐', label: 'Hourly' },
  { value: 'daily', icon: '📅', label: 'Daily' },
  { value: 'weekly', icon: '📆', label: 'Weekly' },
  { value: 'monthly', icon: '🗓️', label: 'Monthly' },
  { value: 'yearly', icon: '📖', label: 'Yearly' },
  { value: 'never', icon: '🚫', label: 'Never' }
]

const imagePlaceholder = `[
  {
    "loc": "https://example.com/slots/game/screenshot.jpg",
    "title": "Скриншот игры",
    "caption": "Основной экран игрового автомата"
  }
]`

const videoPlaceholder = `[
  {
    "thumbnail": "https://example.com/video/thumb.jpg",
    "title": "Обзор слота",
    "description": "Полный обзор игрового автомата",
    "content_loc": "https://example.com/video/review.mp4"
  }
]`

// Methods
function updateField(field, value) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

function formatDatetimeForInput(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toISOString().slice(0, 16)
}

function setCurrentDate() {
  updateField('sitemap_last_mod', new Date().toISOString())
}

// Computed
const sitemapPreview = computed(() => {
  const lastMod = props.modelValue.sitemap_last_mod
    ? new Date(props.modelValue.sitemap_last_mod).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0]

  return `<url>
  <loc>${props.pageUrl || 'https://example.com/slots/game-name'}</loc>
  <lastmod>${lastMod}</lastmod>
  <changefreq>${props.modelValue.sitemap_frequency || 'weekly'}</changefreq>
  <priority>${(props.modelValue.sitemap_priority || 0.8).toFixed(1)}</priority>
</url>`
})
</script>
