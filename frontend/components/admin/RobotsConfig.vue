<template>
  <!--
    🤖 Advanced Robots Configuration Component

    Настройка расширенных robots директив для Google:
    - index/noindex, follow/nofollow
    - max-snippet, max-image-preview, max-video-preview
    - notranslate, noimageindex
    - unavailable_after
  -->
  <div class="space-y-4">
    <!-- Основные директивы -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h5 class="text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
        <svg class="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Основные директивы
      </h5>

      <div class="grid grid-cols-2 gap-4">
        <!-- Index -->
        <label class="flex items-center gap-3 p-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg cursor-pointer hover:border-[#059669]/40 transition-all">
          <input
            type="checkbox"
            v-model="localIndex"
            class="w-4 h-4 rounded border-[#353A4A] text-[#059669] focus:ring-[#059669]"
          />
          <div>
            <span class="text-sm font-medium text-[#E5E7EB]">Index</span>
            <p class="text-xs text-[#9CA3AF]">Индексировать страницу</p>
          </div>
        </label>

        <!-- Follow -->
        <label class="flex items-center gap-3 p-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg cursor-pointer hover:border-[#059669]/40 transition-all">
          <input
            type="checkbox"
            v-model="localFollow"
            class="w-4 h-4 rounded border-[#353A4A] text-[#059669] focus:ring-[#059669]"
          />
          <div>
            <span class="text-sm font-medium text-[#E5E7EB]">Follow</span>
            <p class="text-xs text-[#9CA3AF]">Следовать по ссылкам</p>
          </div>
        </label>
      </div>
    </div>

    <!-- Snippet Controls -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h5 class="text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
        <svg class="w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Контроль сниппетов (Rich Results)
      </h5>

      <div class="space-y-4">
        <!-- Max Snippet -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-sm text-[#E5E7EB]">Max Snippet (символов)</label>
            <span class="text-xs text-[#059669] font-mono">{{ maxSnippetLabel }}</span>
          </div>
          <input
            type="range"
            v-model.number="localMaxSnippet"
            min="-1"
            max="300"
            step="10"
            class="w-full h-2 bg-[#353A4A] rounded-lg appearance-none cursor-pointer slider-green"
          />
          <div class="flex justify-between text-xs text-[#6B7280]">
            <span>Без ограничений</span>
            <span>Без сниппета</span>
            <span>300 символов</span>
          </div>
        </div>

        <!-- Max Image Preview -->
        <div class="space-y-2">
          <label class="text-sm text-[#E5E7EB]">Max Image Preview</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="option in imagePreviewOptions"
              :key="option.value"
              type="button"
              @click="localMaxImagePreview = option.value"
              :class="[
                'p-3 rounded-lg border text-center transition-all duration-200',
                localMaxImagePreview === option.value
                  ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-[#60A5FA]'
                  : 'bg-[#1B1E26] border-[#353A4A] text-[#9CA3AF] hover:border-[#3B82F6]/40'
              ]"
            >
              <div class="text-lg mb-1">{{ option.icon }}</div>
              <div class="text-xs font-medium">{{ option.label }}</div>
            </button>
          </div>
          <p class="text-xs text-[#9CA3AF]">
            💡 Рекомендуется: <span class="text-[#10B981]">large</span> для максимального CTR в SERP
          </p>
        </div>

        <!-- Max Video Preview -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-sm text-[#E5E7EB]">Max Video Preview (секунд)</label>
            <span class="text-xs text-[#059669] font-mono">{{ maxVideoLabel }}</span>
          </div>
          <input
            type="range"
            v-model.number="localMaxVideoPreview"
            min="-1"
            max="60"
            step="5"
            class="w-full h-2 bg-[#353A4A] rounded-lg appearance-none cursor-pointer slider-green"
          />
          <div class="flex justify-between text-xs text-[#6B7280]">
            <span>Без ограничений</span>
            <span>60 сек</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Directives -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h5 class="text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
        <svg class="w-4 h-4 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Дополнительные директивы
      </h5>

      <div class="grid grid-cols-2 gap-4">
        <!-- Notranslate -->
        <label class="flex items-center gap-3 p-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg cursor-pointer hover:border-[#F59E0B]/40 transition-all">
          <input
            type="checkbox"
            v-model="localNotranslate"
            class="w-4 h-4 rounded border-[#353A4A] text-[#F59E0B] focus:ring-[#F59E0B]"
          />
          <div>
            <span class="text-sm font-medium text-[#E5E7EB]">notranslate</span>
            <p class="text-xs text-[#9CA3AF]">Не переводить в Google Translate</p>
          </div>
        </label>

        <!-- Noimageindex -->
        <label class="flex items-center gap-3 p-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg cursor-pointer hover:border-[#F59E0B]/40 transition-all">
          <input
            type="checkbox"
            v-model="localNoimageindex"
            class="w-4 h-4 rounded border-[#353A4A] text-[#F59E0B] focus:ring-[#F59E0B]"
          />
          <div>
            <span class="text-sm font-medium text-[#E5E7EB]">noimageindex</span>
            <p class="text-xs text-[#9CA3AF]">Не индексировать изображения</p>
          </div>
        </label>
      </div>
    </div>

    <!-- Unavailable After -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h5 class="text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
        <svg class="w-4 h-4 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Дата удаления из индекса (опционально)
      </h5>

      <div class="flex items-center gap-4">
        <input
          type="datetime-local"
          v-model="localUnavailableAfter"
          class="flex-1 px-4 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-transparent transition-all duration-200"
        />
        <button
          v-if="localUnavailableAfter"
          type="button"
          @click="localUnavailableAfter = ''"
          class="px-3 py-2 bg-[#EF4444]/20 text-[#EF4444] rounded-lg text-sm hover:bg-[#EF4444]/30 transition-colors"
        >
          Очистить
        </button>
      </div>
      <p class="text-xs text-[#9CA3AF] mt-2">
        ⚠️ После этой даты страница будет удалена из индекса Google (для временных акций)
      </p>
    </div>

    <!-- Generated Robots Meta Preview -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <label class="text-sm font-medium text-[#E5E7EB]">
          📝 Сгенерированный robots мета-тег
        </label>
        <button
          type="button"
          @click="copyRobots"
          class="text-xs text-[#059669] hover:text-[#10B981] transition-colors"
        >
          📋 Копировать
        </button>
      </div>

      <pre class="bg-[#161A21] rounded-lg p-3 text-xs text-[#9CA3AF] overflow-x-auto font-mono">{{ generatedRobotsMeta }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  index: { type: Boolean, default: true },
  follow: { type: Boolean, default: true },
  maxSnippet: { type: Number, default: -1 },
  maxImagePreview: { type: String, default: 'large' },
  maxVideoPreview: { type: Number, default: -1 },
  notranslate: { type: Boolean, default: false },
  noimageindex: { type: Boolean, default: false },
  unavailableAfter: { type: String, default: '' }
})

// Emits
const emit = defineEmits([
  'update:index',
  'update:follow',
  'update:maxSnippet',
  'update:maxImagePreview',
  'update:maxVideoPreview',
  'update:notranslate',
  'update:noimageindex',
  'update:unavailableAfter',
  'update:robotsMeta'
])

// Image preview options
const imagePreviewOptions = [
  { value: 'none', label: 'None', icon: '🚫' },
  { value: 'standard', label: 'Standard', icon: '📷' },
  { value: 'large', label: 'Large', icon: '🖼️' }
]

// Local state
const localIndex = ref(props.index)
const localFollow = ref(props.follow)
const localMaxSnippet = ref(props.maxSnippet)
const localMaxImagePreview = ref(props.maxImagePreview)
const localMaxVideoPreview = ref(props.maxVideoPreview)
const localNotranslate = ref(props.notranslate)
const localNoimageindex = ref(props.noimageindex)
const localUnavailableAfter = ref(props.unavailableAfter)

// Watch props
watch(() => props.index, (val) => { localIndex.value = val })
watch(() => props.follow, (val) => { localFollow.value = val })
watch(() => props.maxSnippet, (val) => { localMaxSnippet.value = val })
watch(() => props.maxImagePreview, (val) => { localMaxImagePreview.value = val })
watch(() => props.maxVideoPreview, (val) => { localMaxVideoPreview.value = val })
watch(() => props.notranslate, (val) => { localNotranslate.value = val })
watch(() => props.noimageindex, (val) => { localNoimageindex.value = val })
watch(() => props.unavailableAfter, (val) => { localUnavailableAfter.value = val })

// Watch local and emit
watch(localIndex, (val) => { emit('update:index', val); emitRobotsMeta() })
watch(localFollow, (val) => { emit('update:follow', val); emitRobotsMeta() })
watch(localMaxSnippet, (val) => { emit('update:maxSnippet', val); emitRobotsMeta() })
watch(localMaxImagePreview, (val) => { emit('update:maxImagePreview', val); emitRobotsMeta() })
watch(localMaxVideoPreview, (val) => { emit('update:maxVideoPreview', val); emitRobotsMeta() })
watch(localNotranslate, (val) => { emit('update:notranslate', val); emitRobotsMeta() })
watch(localNoimageindex, (val) => { emit('update:noimageindex', val); emitRobotsMeta() })
watch(localUnavailableAfter, (val) => { emit('update:unavailableAfter', val); emitRobotsMeta() })

// Computed labels
const maxSnippetLabel = computed(() => {
  if (localMaxSnippet.value === -1) return 'Без ограничений'
  if (localMaxSnippet.value === 0) return 'Без сниппета'
  return `${localMaxSnippet.value} символов`
})

const maxVideoLabel = computed(() => {
  if (localMaxVideoPreview.value === -1) return 'Без ограничений'
  return `${localMaxVideoPreview.value} сек`
})

// Generated robots meta
const generatedRobotsMeta = computed(() => {
  const directives = []

  // Index/noindex
  directives.push(localIndex.value ? 'index' : 'noindex')

  // Follow/nofollow
  directives.push(localFollow.value ? 'follow' : 'nofollow')

  // Max snippet
  if (localMaxSnippet.value !== -1) {
    directives.push(`max-snippet:${localMaxSnippet.value}`)
  }

  // Max image preview
  directives.push(`max-image-preview:${localMaxImagePreview.value}`)

  // Max video preview
  if (localMaxVideoPreview.value !== -1) {
    directives.push(`max-video-preview:${localMaxVideoPreview.value}`)
  }

  // Notranslate
  if (localNotranslate.value) {
    directives.push('notranslate')
  }

  // Noimageindex
  if (localNoimageindex.value) {
    directives.push('noimageindex')
  }

  // Unavailable after
  if (localUnavailableAfter.value) {
    const date = new Date(localUnavailableAfter.value)
    directives.push(`unavailable_after:${date.toISOString()}`)
  }

  return `<meta name="robots" content="${directives.join(', ')}" />`
})

// Methods
function copyRobots() {
  navigator.clipboard.writeText(generatedRobotsMeta.value)
}

function emitRobotsMeta() {
  // Build robots content string
  const directives = []
  directives.push(localIndex.value ? 'index' : 'noindex')
  directives.push(localFollow.value ? 'follow' : 'nofollow')
  if (localMaxSnippet.value !== -1) directives.push(`max-snippet:${localMaxSnippet.value}`)
  directives.push(`max-image-preview:${localMaxImagePreview.value}`)
  if (localMaxVideoPreview.value !== -1) directives.push(`max-video-preview:${localMaxVideoPreview.value}`)
  if (localNotranslate.value) directives.push('notranslate')
  if (localNoimageindex.value) directives.push('noimageindex')

  emit('update:robotsMeta', directives.join(', '))
}

// Initial emit
emitRobotsMeta()
</script>

<style scoped>
/* Custom slider styling */
.slider-green::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #059669;
  cursor: pointer;
  border-radius: 50%;
}

.slider-green::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #059669;
  cursor: pointer;
  border-radius: 50%;
  border: none;
}
</style>
