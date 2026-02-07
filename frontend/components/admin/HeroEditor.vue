<template>
  <!--
    🎮 Hero Editor Pro Component v1.0

    Features:
    - Live Hero Preview
    - Hero Completion Score
    - Smart Keywords Editor
    - AI Auto-Generate
    - Unified Design System
  -->
  <div class="space-y-6">
    <!-- Header with Score -->
    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-[#FF6E48]/20 to-[#CD5A3C]/20 rounded-xl border border-[#FF6E48]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#FF6E48] to-[#CD5A3C] rounded-xl flex items-center justify-center">
          <span class="text-2xl">🎮</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">Hero Editor Pro</h3>
          <p class="text-sm text-[#9CA3AF]">Визуальное редактирование Hero секции</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <!-- Completion Score -->
        <div
          class="relative w-14 h-14 rounded-full flex items-center justify-center"
          :class="{
            'bg-[#EF4444]/20': heroScore < 40,
            'bg-[#F59E0B]/20': heroScore >= 40 && heroScore < 70,
            'bg-[#10B981]/20': heroScore >= 70,
          }"
        >
          <span
            class="text-lg font-bold"
            :class="{
              'text-[#EF4444]': heroScore < 40,
              'text-[#F59E0B]': heroScore >= 40 && heroScore < 70,
              'text-[#10B981]': heroScore >= 70,
            }"
          >{{ heroScore }}%</span>
        </div>
        <!-- AI Auto-Generate Button -->
        <button
          type="button"
          @click="autoGenerate"
          class="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white rounded-lg text-sm hover:opacity-90 transition-all font-medium flex items-center gap-2"
        >
          <span>🪄</span>
          <span>Авто</span>
        </button>
      </div>
    </div>

    <!-- Score Breakdown -->
    <div class="grid grid-cols-3 md:grid-cols-6 gap-2">
      <div
        v-for="item in scoreItems"
        :key="item.name"
        class="p-2 rounded-lg border text-center transition-all"
        :class="item.filled ? 'bg-[#10B981]/10 border-[#10B981]/50' : 'bg-[#1B1E26] border-[#353A4A]'"
      >
        <div class="text-lg mb-1">{{ item.icon }}</div>
        <div class="text-xs" :class="item.filled ? 'text-[#10B981]' : 'text-[#6B7280]'">{{ item.name }}</div>
      </div>
    </div>

    <!-- Live Preview -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl overflow-hidden">
      <div class="flex items-center justify-between px-4 py-2 bg-[#161A21] border-b border-[#353A4A]">
        <span class="text-xs text-[#9CA3AF] flex items-center gap-2">
          <span class="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
          Live Preview
        </span>
        <button
          type="button"
          @click="showPreview = !showPreview"
          class="text-xs text-[#9CA3AF] hover:text-[#E5E7EB]"
        >{{ showPreview ? 'Hide' : 'Show' }}</button>
      </div>
      <div v-show="showPreview" class="p-6 bg-gradient-to-br from-[#0D0D0D] to-[#1a1a2e]">
        <!-- Mini Hero Preview -->
        <div class="flex gap-6">
          <!-- Image Preview -->
          <div class="w-32 h-32 bg-[#353A4A] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              v-if="localForm.image_url"
              :src="localForm.image_url"
              class="w-full h-full object-cover"
              @error="$event.target.style.display='none'"
            />
            <span v-else class="text-4xl opacity-50">🎰</span>
          </div>
          <!-- Content Preview -->
          <div class="flex-1 space-y-3">
            <div class="text-xl font-bold text-[#FF6E48]">{{ localForm.hero_keyword || localForm.name || 'Slot Title' }}</div>
            <div class="text-sm text-[#9CA3AF] line-clamp-2">{{ previewDescription }}</div>
            <div class="flex items-center gap-4 text-xs">
              <span class="px-2 py-1 bg-[#FF6E48]/20 text-[#FF6E48] rounded">RTP {{ localForm.rtp || '96%' }}</span>
              <span class="px-2 py-1 bg-[#10B981]/20 text-[#10B981] rounded">{{ localForm.volatility || 'High' }}</span>
              <span class="text-[#9CA3AF]">{{ localForm.provider_name || 'Provider' }}</span>
            </div>
            <div class="flex gap-2">
              <span class="px-3 py-1.5 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] text-white rounded-lg text-xs">Play Demo</span>
              <span class="px-3 py-1.5 bg-[#10B981] text-white rounded-lg text-xs">Play Real</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Basic Info Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Name -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-[#FF6E48]">🎰</span>
          Название слота *
        </label>
        <input
          v-model="localForm.name"
          type="text"
          required
          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
          placeholder="Gates of Olympus"
        />
      </div>
      <!-- Slug -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-[#00EDFF]">🔗</span>
          URL Slug *
        </label>
        <div class="relative">
          <span class="absolute left-3 top-3 text-[#9CA3AF] text-sm">/slots/</span>
          <input
            v-model="localForm.slug"
            type="text"
            required
            class="w-full pl-16 pr-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#00EDFF] focus:border-[#00EDFF] transition-all"
            placeholder="gates-of-olympus"
          />
        </div>
      </div>
    </div>

    <!-- Provider & Image Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Provider -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-[#CD0F8B]">🏢</span>
          Провайдер *
        </label>
        <select
          v-model="localForm.provider_id"
          required
          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#CD0F8B] focus:border-[#CD0F8B] transition-all"
        >
          <option value="">Выберите провайдера</option>
          <option v-for="p in providers" :key="p.id" :value="p.id">{{ p.name }}</option>
        </select>
      </div>
      <!-- Image URL -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-[#F59E0B]">🖼️</span>
          Hero Image URL
        </label>
        <input
          v-model="localForm.image_url"
          type="url"
          class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] transition-all"
          placeholder="https://..."
        />
      </div>
    </div>

    <!-- Description with AI -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-[#8B5CF6]">📝</span>
          Hero Description
          <span class="text-xs text-[#9CA3AF]">({{ (localForm.description || '').length }}/400)</span>
        </label>
        <button
          type="button"
          @click="generateDescription"
          class="text-xs px-2 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded hover:bg-[#8B5CF6]/30"
        >🪄 Generate</button>
      </div>
      <textarea
        v-model="localForm.description"
        rows="3"
        maxlength="400"
        class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-all resize-none"
        placeholder="Engaging description for the Hero section..."
      ></textarea>
      <!-- Character Progress -->
      <div class="h-1 bg-[#353A4A] rounded-full overflow-hidden">
        <div
          class="h-full transition-all"
          :class="(localForm.description || '').length > 350 ? 'bg-[#EF4444]' : 'bg-[#10B981]'"
          :style="{ width: `${Math.min(((localForm.description || '').length / 400) * 100, 100)}%` }"
        ></div>
      </div>
    </div>

    <!-- Smart Keywords Section -->
    <div class="bg-gradient-to-r from-[#10B981]/10 to-[#3B82F6]/10 border border-[#10B981]/30 rounded-xl p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="flex items-center gap-2 text-sm font-medium text-[#E5E7EB]">
          <span class="text-lg">✨</span>
          Smart Keywords
          <span class="px-2 py-0.5 bg-[#10B981]/20 text-[#10B981] rounded text-xs">PRO</span>
        </h4>
        <div class="flex gap-2">
          <button
            v-for="tpl in keywordTemplates"
            :key="tpl.name"
            type="button"
            @click="applyTemplate(tpl)"
            class="text-xs px-2 py-1 bg-[#353A4A] text-[#9CA3AF] rounded hover:bg-[#4B5563] hover:text-[#E5E7EB]"
          >{{ tpl.name }}</button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Keyword 1 - Title -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-xs font-medium text-[#10B981]">
            <span class="w-5 h-5 bg-[#10B981] rounded flex items-center justify-center text-white text-xs">1</span>
            Hero Title
          </label>
          <input
            v-model="localForm.hero_keyword"
            type="text"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#10B981]/50 rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] text-sm"
            placeholder="Premium Experience"
          />
          <div class="text-xs text-[#6B7280]">Отображается как заголовок</div>
        </div>
        <!-- Keyword 2 -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-xs font-medium text-[#3B82F6]">
            <span class="w-5 h-5 bg-[#3B82F6] rounded flex items-center justify-center text-white text-xs">2</span>
            [keyword_2]
          </label>
          <input
            v-model="localForm.hero_keyword_2"
            type="text"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#3B82F6]/50 rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
            placeholder="Gates of Olympus"
          />
          <div class="text-xs text-[#6B7280]">Используется в описании</div>
        </div>
        <!-- Keyword 3 -->
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-xs font-medium text-[#8B5CF6]">
            <span class="w-5 h-5 bg-[#8B5CF6] rounded flex items-center justify-center text-white text-xs">3</span>
            [keyword_3]
          </label>
          <input
            v-model="localForm.hero_keyword_3"
            type="text"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#8B5CF6]/50 rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            placeholder="1000x Multiplier"
          />
          <div class="text-xs text-[#6B7280]">Дополнительная переменная</div>
        </div>
      </div>

      <!-- Preview Result -->
      <div class="mt-4 p-3 bg-[#161A21] rounded-lg border border-[#353A4A]">
        <div class="text-xs text-[#9CA3AF] mb-2">Preview:</div>
        <div class="text-sm text-[#E5E7EB]">
          "Experience <span class="text-[#3B82F6]">{{ localForm.hero_keyword_2 || '[keyword_2]' }}</span>
          with <span class="text-[#8B5CF6]">{{ localForm.hero_keyword_3 || '[keyword_3]' }}</span>!"
        </div>
      </div>
    </div>

    <!-- Action Links -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Demo URL -->
      <div class="p-4 bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl space-y-3">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 bg-[#00EDFF]/20 rounded-lg flex items-center justify-center text-lg">🎮</span>
          <div>
            <div class="text-sm font-medium text-[#E5E7EB]">Demo URL</div>
            <div class="text-xs text-[#9CA3AF]">Кнопка "Play Free"</div>
          </div>
        </div>
        <input
          v-model="localForm.demo_url"
          type="url"
          class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#00EDFF] text-sm"
          placeholder="https://demo.provider.com/..."
        />
      </div>
      <!-- Real Play URL -->
      <div class="p-4 bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl space-y-3">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 bg-[#10B981]/20 rounded-lg flex items-center justify-center text-lg">💰</span>
          <div>
            <div class="text-sm font-medium text-[#E5E7EB]">Real Play URL</div>
            <div class="text-xs text-[#9CA3AF]">Кнопка "Play Real"</div>
          </div>
        </div>
        <input
          v-model="localForm.real_play_url"
          type="url"
          class="w-full px-3 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10B981] text-sm"
          placeholder="https://casino.com/..."
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  providers: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

const localForm = ref({ ...props.modelValue })
const showPreview = ref(true)

// Watch props
watch(() => props.modelValue, (val) => {
  localForm.value = { ...val }
}, { deep: true })

// Emit changes
watch(localForm, (val) => {
  emit('update:modelValue', val)
}, { deep: true })

// Score calculation
const heroScore = computed(() => {
  let score = 0
  if (localForm.value.name) score += 20
  if (localForm.value.slug) score += 15
  if (localForm.value.provider_id) score += 15
  if (localForm.value.description && localForm.value.description.length > 50) score += 15
  if (localForm.value.hero_keyword) score += 10
  if (localForm.value.image_url) score += 10
  if (localForm.value.demo_url) score += 10
  if (localForm.value.real_play_url) score += 5
  return Math.min(score, 100)
})

const scoreItems = computed(() => [
  { name: 'Name', icon: '🎰', filled: !!localForm.value.name },
  { name: 'Slug', icon: '🔗', filled: !!localForm.value.slug },
  { name: 'Provider', icon: '🏢', filled: !!localForm.value.provider_id },
  { name: 'Desc', icon: '📝', filled: (localForm.value.description || '').length > 50 },
  { name: 'Image', icon: '🖼️', filled: !!localForm.value.image_url },
  { name: 'Links', icon: '🎮', filled: !!localForm.value.demo_url },
])

const previewDescription = computed(() => {
  let desc = localForm.value.description || 'Hero description will appear here...'
  desc = desc.replace('[keyword_2]', localForm.value.hero_keyword_2 || '[keyword_2]')
  desc = desc.replace('[keyword_3]', localForm.value.hero_keyword_3 || '[keyword_3]')
  return desc
})

// Templates
const keywordTemplates = [
  { name: 'Casino', values: ['Casino Experience', props.modelValue.name || 'Slot Name', 'Big Wins'] },
  { name: 'Review', values: ['Honest Review', props.modelValue.name || 'Slot Name', 'Expert Tips'] },
  { name: 'Demo', values: ['Free Demo', props.modelValue.name || 'Slot Name', 'No Deposit'] },
]

function applyTemplate(tpl) {
  localForm.value.hero_keyword = tpl.values[0]
  localForm.value.hero_keyword_2 = tpl.values[1]
  localForm.value.hero_keyword_3 = tpl.values[2]
}

function generateDescription() {
  const name = localForm.value.name || 'this slot'
  const provider = localForm.value.provider_name || 'top provider'
  localForm.value.description = `Play ${name} demo for free! Experience the excitement of this amazing slot from ${provider}. Try [keyword_2] with [keyword_3] and discover incredible winning opportunities!`
}

function autoGenerate() {
  const name = localForm.value.name || 'Amazing Slot'

  // Auto-generate slug
  if (!localForm.value.slug && localForm.value.name) {
    localForm.value.slug = localForm.value.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  // Auto-generate keywords
  localForm.value.hero_keyword = `${name} Review`
  localForm.value.hero_keyword_2 = name
  localForm.value.hero_keyword_3 = 'Free Demo'

  // Auto-generate description
  generateDescription()
}
</script>
