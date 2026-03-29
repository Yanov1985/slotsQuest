<template>
  <div class="space-y-6">
    <!-- Header with Global Toggle -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-[#8B5CF6]/20 to-[#7C3AED]/20 rounded-xl border border-[#8B5CF6]/30">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center">
          <span class="text-2xl">🎯</span>
        </div>
        <div>
          <h3 class="text-lg font-medium text-[#E5E7EB]">JSON-LD Schemas</h3>
          <p class="text-sm text-[#9CA3AF]">Localized Structured Data for Google</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <!-- Master Toggle -->
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="modelValue.jsonld_enabled"
            class="sr-only peer"
          />
          <div class="w-14 h-7 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#8B5CF6]"></div>
          <span class="ml-3 text-sm font-medium text-[#E5E7EB]">{{ modelValue.jsonld_enabled ? 'Active' : 'Disabled' }}</span>
        </label>
      </div>
    </div>

    <!-- Status Message Info -->
    <div class="bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl p-4 flex items-start gap-4">
      <div class="text-2xl mt-1">✨</div>
      <div>
        <h4 class="text-[#10B981] font-bold text-sm mb-1">Universal Sync Enabled</h4>
        <p class="text-xs text-[#E5E7EB] w-full max-w-4xl leading-relaxed">
          The JSON-LD code for this slot is now <b class="text-[#10B981]">automatically synchronized</b> with the <b>Info Popup Content</b> fields in the main form.
          You no longer need to type FAQs, Reviews, or How-To guides twice! When you edit the localized FAQ section above, the Structured Data below is instantly rebuilt for Google in that specific language.
        </p>
      </div>
    </div>

    <div v-if="modelValue.jsonld_enabled" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left Column: Settings -->
      <div class="lg:col-span-6 space-y-6">
        
        <!-- Global Settings Tab -->
        <div class="space-y-4">
          <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-4">
             <h4 class="text-sm font-bold text-[#E5E7EB] mb-4 flex justify-between">
                <span>Enabled Schema Nodes</span>
                <span class="text-xs font-normal text-[#9CA3AF]">Global Flags</span>
             </h4>
             <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
               <label class="flex items-center justify-between p-3 bg-[#161A21] rounded-lg border border-[#353A4A] cursor-not-allowed opacity-75">
                 <div class="flex items-center gap-2">
                   <span class="text-sm text-[#E5E7EB]">🎮 VideoGame</span>
                 </div>
                 <span class="text-[#8B5CF6] text-xs font-bold">BASE</span>
               </label>
               <label class="flex items-center justify-between p-3 bg-[#161A21] rounded-lg border border-[#353A4A] cursor-not-allowed opacity-75">
                 <div class="flex items-center gap-2">
                   <span class="text-sm text-[#E5E7EB]">⭐ SoftwareApp (Reviews)</span>
                 </div>
                 <span class="text-[#8B5CF6] text-xs font-bold">AUTO</span>
               </label>
               <label class="flex items-center justify-between p-3 bg-[#161A21] rounded-lg border border-[#353A4A] cursor-not-allowed opacity-75">
                 <div class="flex items-center gap-2">
                   <span class="text-sm text-[#E5E7EB]">❓ FAQPage</span>
                 </div>
                 <span class="text-[#8B5CF6] text-xs font-bold">AUTO</span>
               </label>
               <label class="flex items-center justify-between p-3 bg-[#161A21] rounded-lg border border-[#353A4A] cursor-not-allowed opacity-75">
                 <div class="flex items-center gap-2">
                   <span class="text-sm text-[#E5E7EB]">📋 HowTo</span>
                 </div>
                 <span class="text-[#8B5CF6] text-xs font-bold">AUTO</span>
               </label>
             </div>
             <p class="text-[10px] text-[#9CA3AF] mt-3">
               Advanced schemas are now deeply integrated into the frontend <code>useSlotSEO.js</code> compiler. If the FAQ data exists in the Info Popup for a specific language, the FAQPage schema is automatically mounted.
             </p>
          </div>
        </div>

      </div>

      <!-- Right Column: Live Output Preview -->
      <div class="lg:col-span-6">
        <div class="sticky top-6 bg-[#0B0E14] border border-[#353A4A] rounded-xl overflow-hidden shadow-2xl">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border-b border-[#353A4A] bg-[#161A21] gap-2">
             <div class="flex items-center gap-2">
                <span class="text-[#10B981] font-mono text-xs font-bold">LIVE JSON-LD COMPILE</span>
             </div>
             <div class="flex gap-2">
               <div class="px-2 py-1 bg-gradient-to-r from-[#8B5CF6]/20 to-[#EC4899]/20 font-bold border border-[#8B5CF6]/40 rounded text-[10px] text-[#E5E7EB]">
                 {{ currentLocale.toUpperCase() }} NODE
               </div>
               <button type="button" @click="copyJson" class="text-[10px] px-2 py-1 bg-[#353A4A] text-white rounded hover:bg-[#4B5563]">
                 📋 Copy
               </button>
             </div>
          </div>
          <div v-if="loadingPreview" class="p-8 flex justify-center items-center h-[400px]">
            <span class="animate-pulse text-[#8B5CF6] font-mono text-sm">Compiling Schemas...</span>
          </div>
          <div v-else class="p-4 overflow-auto max-h-[600px] text-xs font-mono text-[#E5E7EB] custom-scrollbar">
            <pre>{{ JSON.stringify(liveJsonLdData, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Object, required: true },
  localizedData: { type: Object, default: () => ({}) },
  currentLocale: { type: String, default: 'en' },
  slotId: { type: String, default: '' },
  slotName: { type: String, default: 'Slot' }
})

const emit = defineEmits(['update:modelValue'])

const loadingPreview = ref(false)

const copyJson = () => {
  navigator.clipboard.writeText(JSON.stringify(liveJsonLdData.value, null, 2))
}

// 🪄 LIVE JSON-LD Generator Simulator (Mirrors useSlotSEO.js frontend exactly)
const liveJsonLdData = computed(() => {
  const name = props.slotName || 'Slot Name'
  const url = `https://slotquest.com/slots/${props.slotId}`
  
  const schemas = []

  // 1. FAQ SCHEMA
  let faqItems = []
  try { faqItems = JSON.parse(props.localizedData.info_faq || '[]') } catch(e) {}
  if (faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqItems.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': { '@type': 'Answer', 'text': item.answer }
      }))
    })
  }

  // 2. HOWTO SCHEMA
  let howToSteps = []
  try { howToSteps = JSON.parse(props.localizedData.info_how_to_play || '[]') } catch(e) {}
  if (howToSteps.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': 'How to Play ' + name,
      'description': 'Step-by-step guide to playing ' + name + ' online slot',
      'step': howToSteps.map((s, i) => ({
        '@type': 'HowToStep',
        'position': i + 1,
        'name': s.step,
        'text': s.text
      }))
    })
  }

  // 3. REVIEWS / SOFTWARE APP SCHEMA
  let reviews = []
  try { reviews = JSON.parse(props.localizedData.info_reviews || '[]') } catch(e) {}
  if (reviews.length > 0) {
    const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': name,
      'applicationCategory': 'CasinoGame',
      'isFamilyFriendly': false,
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': avgRating.toFixed(1),
        'reviewCount': reviews.length,
        'bestRating': '5',
        'worstRating': '1'
      },
      'review': reviews.map(r => ({
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': r.author || 'SlotQuest Team' },
        'reviewRating': { '@type': 'Rating', 'ratingValue': r.rating || 5, 'bestRating': '5' },
        'reviewBody': r.text,
        'datePublished': r.date || new Date().toISOString()
      }))
    })
  }

  return schemas
})

</script>
<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #353A4A;
  border-radius: 6px;
}
</style>
