<template>
  <!--
    📱 Social Preview Cards Component

    Предпросмотр как страница будет выглядеть при шеринге:
    - Facebook/Meta
    - Twitter/X
    - LinkedIn
    - Telegram
    - WhatsApp
  -->
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-[#3B82F6]/20 to-[#1D4ED8]/20 rounded-xl border border-[#3B82F6]/30">
      <div class="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-xl flex items-center justify-center">
        <span class="text-2xl">📱</span>
      </div>
      <div>
        <h3 class="text-lg font-medium text-[#E5E7EB]">Social Preview Cards</h3>
        <p class="text-sm text-[#9CA3AF]">Как страница выглядит при шеринге в соцсетях</p>
      </div>
    </div>

    <!-- Platform Tabs -->
    <div class="flex overflow-x-auto gap-2 pb-2">
      <button
        v-for="platform in platforms"
        :key="platform.id"
        type="button"
        @click="activePlatform = platform.id"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2',
          activePlatform === platform.id
            ? `${platform.bgActive} ${platform.textActive} border ${platform.border}`
            : 'bg-[#1B1E26] border border-[#353A4A] text-[#9CA3AF] hover:border-[#3B82F6]/40'
        ]"
      >
        <span>{{ platform.icon }}</span>
        {{ platform.name }}
      </button>
    </div>

    <!-- Facebook Preview -->
    <div v-show="activePlatform === 'facebook'" class="bg-white rounded-lg overflow-hidden shadow-lg">
      <div class="relative">
        <img
          :src="ogImage || placeholderImage"
          :alt="ogTitle"
          class="w-full h-64 object-cover"
        />
      </div>
      <div class="p-4 border-t border-gray-200 bg-[#F0F2F5]">
        <p class="text-xs text-gray-500 uppercase tracking-wide">{{ siteUrl }}</p>
        <h3 class="text-base font-semibold text-[#1C1E21] mt-1 line-clamp-2">{{ ogTitle || 'Title not set' }}</h3>
        <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ ogDescription || 'Description not set' }}</p>
      </div>
    </div>

    <!-- Twitter Preview -->
    <div v-show="activePlatform === 'twitter'" class="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      <div class="relative">
        <img
          :src="twitterImage || ogImage || placeholderImage"
          :alt="twitterTitle"
          class="w-full h-64 object-cover"
        />
      </div>
      <div class="p-4">
        <h3 class="text-[15px] font-bold text-[#0F1419] line-clamp-2">{{ twitterTitle || ogTitle || 'Title not set' }}</h3>
        <p class="text-[15px] text-[#536471] mt-1 line-clamp-2">{{ twitterDescription || ogDescription || 'Description not set' }}</p>
        <p class="text-[13px] text-[#536471] mt-2 flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          {{ siteUrl }}
        </p>
      </div>
    </div>

    <!-- LinkedIn Preview -->
    <div v-show="activePlatform === 'linkedin'" class="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-300">
      <div class="relative">
        <img
          :src="ogImage || placeholderImage"
          :alt="ogTitle"
          class="w-full h-52 object-cover"
        />
      </div>
      <div class="p-4 bg-white">
        <h3 class="text-base font-semibold text-[#000000E6] line-clamp-2">{{ ogTitle || 'Title not set' }}</h3>
        <p class="text-sm text-[#00000099] mt-1">{{ siteUrl }}</p>
      </div>
    </div>

    <!-- Telegram Preview -->
    <div v-show="activePlatform === 'telegram'" class="bg-[#1B1E26] rounded-2xl overflow-hidden shadow-lg max-w-md">
      <div class="p-3">
        <div class="bg-[#232A36] rounded-xl overflow-hidden">
          <img
            :src="ogImage || placeholderImage"
            :alt="ogTitle"
            class="w-full h-48 object-cover"
          />
          <div class="p-3 border-l-2 border-[#2AABEE]">
            <p class="text-xs text-[#2AABEE] font-medium">{{ siteName }}</p>
            <h3 class="text-sm font-medium text-white mt-1 line-clamp-2">{{ ogTitle || 'Title not set' }}</h3>
            <p class="text-sm text-gray-400 mt-1 line-clamp-2">{{ ogDescription || 'Description not set' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- WhatsApp Preview -->
    <div v-show="activePlatform === 'whatsapp'" class="bg-[#E5DDD5] rounded-lg p-4 max-w-md">
      <div class="bg-white rounded-lg overflow-hidden shadow">
        <div class="border-l-4 border-[#25D366]">
          <img
            :src="ogImage || placeholderImage"
            :alt="ogTitle"
            class="w-full h-40 object-cover"
          />
          <div class="p-3">
            <p class="text-xs text-[#25D366] font-medium uppercase">{{ siteUrl }}</p>
            <h3 class="text-sm font-semibold text-gray-900 mt-1 line-clamp-2">{{ ogTitle || 'Title not set' }}</h3>
            <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ ogDescription || 'Description not set' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Validation -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3 flex items-center gap-2">
        <span>🖼️</span>
        Проверка изображения
      </h4>
      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="text-[#9CA3AF]">Рекомендуемый размер:</span>
          <span class="text-[#E5E7EB]">1200 × 630 px</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-[#9CA3AF]">Соотношение сторон:</span>
          <span class="text-[#E5E7EB]">1.91:1</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-[#9CA3AF]">Формат:</span>
          <span class="text-[#E5E7EB]">JPG, PNG, GIF</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-[#9CA3AF]">Макс. размер файла:</span>
          <span class="text-[#E5E7EB]">8 MB (рекомендуется < 300 KB)</span>
        </div>
      </div>

      <!-- Image Status -->
      <div v-if="ogImage" class="mt-3 p-2 rounded-lg" :class="imageStatus.class">
        <div class="flex items-center gap-2 text-sm">
          <span>{{ imageStatus.icon }}</span>
          <span>{{ imageStatus.message }}</span>
        </div>
      </div>
    </div>

    <!-- Social Sharing Stats (Optional) -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3 flex items-center gap-2">
        <span>📊</span>
        Настройки шеринга
      </h4>

      <div class="space-y-3">
        <!-- Custom Hashtags -->
        <div class="space-y-2">
          <label class="block text-xs font-medium text-[#9CA3AF]">Хештеги (для Twitter)</label>
          <input
            type="text"
            v-model="localHashtags"
            placeholder="#slots #casino #pragmatic #freespins"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
          />
        </div>

        <!-- CTA Text -->
        <div class="space-y-2">
          <label class="block text-xs font-medium text-[#9CA3AF]">CTA текст для шеринга</label>
          <input
            type="text"
            v-model="localCtaText"
            placeholder="🎰 Check out this amazing slot!"
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Share Links Preview -->
    <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
      <h4 class="text-sm font-medium text-[#E5E7EB] mb-3 flex items-center gap-2">
        <span>🔗</span>
        Готовые ссылки для шеринга
      </h4>

      <div class="space-y-2">
        <div v-for="link in shareLinks" :key="link.name" class="flex items-center gap-3 p-2 bg-[#161A21] rounded-lg">
          <span class="text-lg">{{ link.icon }}</span>
          <span class="flex-1 text-sm text-[#9CA3AF] truncate font-mono">{{ link.url }}</span>
          <button
            type="button"
            @click="copyLink(link.url)"
            class="px-2 py-1 text-xs text-[#3B82F6] hover:bg-[#3B82F6]/20 rounded transition-colors"
          >
            📋
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  ogTitle: { type: String, default: '' },
  ogDescription: { type: String, default: '' },
  ogImage: { type: String, default: '' },
  twitterTitle: { type: String, default: '' },
  twitterDescription: { type: String, default: '' },
  twitterImage: { type: String, default: '' },
  siteUrl: { type: String, default: 'slotquest.com' },
  siteName: { type: String, default: 'SlotQuest' },
  pageUrl: { type: String, default: '' },
  hashtags: { type: String, default: '' },
  ctaText: { type: String, default: '' }
})

// Emits
const emit = defineEmits(['update:hashtags', 'update:ctaText'])

// Platforms
const platforms = [
  { id: 'facebook', name: 'Facebook', icon: '📘', bgActive: 'bg-[#1877F2]/20', textActive: 'text-[#1877F2]', border: 'border-[#1877F2]/30' },
  { id: 'twitter', name: 'Twitter/X', icon: '🐦', bgActive: 'bg-[#1DA1F2]/20', textActive: 'text-[#1DA1F2]', border: 'border-[#1DA1F2]/30' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', bgActive: 'bg-[#0A66C2]/20', textActive: 'text-[#0A66C2]', border: 'border-[#0A66C2]/30' },
  { id: 'telegram', name: 'Telegram', icon: '📨', bgActive: 'bg-[#2AABEE]/20', textActive: 'text-[#2AABEE]', border: 'border-[#2AABEE]/30' },
  { id: 'whatsapp', name: 'WhatsApp', icon: '💬', bgActive: 'bg-[#25D366]/20', textActive: 'text-[#25D366]', border: 'border-[#25D366]/30' }
]

const activePlatform = ref('facebook')
const placeholderImage = 'https://via.placeholder.com/1200x630/1B1E26/9CA3AF?text=No+Image+Set'

// Local state
const localHashtags = ref(props.hashtags)
const localCtaText = ref(props.ctaText)

// Watch and emit
watch(localHashtags, (val) => emit('update:hashtags', val))
watch(localCtaText, (val) => emit('update:ctaText', val))

// Computed
const imageStatus = computed(() => {
  if (!props.ogImage) {
    return {
      class: 'bg-[#EF4444]/20 text-[#EF4444]',
      icon: '❌',
      message: 'Изображение не установлено'
    }
  }
  // Basic URL validation
  if (props.ogImage.startsWith('http')) {
    return {
      class: 'bg-[#10B981]/20 text-[#10B981]',
      icon: '✅',
      message: 'Изображение установлено'
    }
  }
  return {
    class: 'bg-[#F59E0B]/20 text-[#F59E0B]',
    icon: '⚠️',
    message: 'Проверьте URL изображения'
  }
})

const shareLinks = computed(() => {
  const url = encodeURIComponent(`https://${props.siteUrl}${props.pageUrl}`)
  const text = encodeURIComponent(props.ogTitle || 'Check this out!')
  const hashtags = localHashtags.value?.replace(/#/g, '').replace(/\s+/g, ',') || ''

  return [
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    },
    {
      name: 'Telegram',
      icon: '📨',
      url: `https://t.me/share/url?url=${url}&text=${text}`
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://api.whatsapp.com/send?text=${text}%20${url}`
    }
  ]
})

// Methods
function copyLink(url) {
  navigator.clipboard.writeText(url)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
