<template>
  <Transition name="fade-modal">
    <div
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div
        class="relative w-full max-w-[95vw] sm:max-w-2xl bg-[#161A21] border border-[#353A4A] rounded-2xl shadow-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto custom-scrollbar safe-area-pb transform transition-transform duration-300"
      >
        <!-- Header -->
        <div class="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-[#161A21]/95 backdrop-blur border-b border-[#353A4A]">
          <h2 class="text-lg sm:text-xl font-bold text-white truncate pr-2">
            <span class="text-[#8B5CF6]">#{{ slotData.popularity_rank || '1' }}</span>
            {{ slotData.name }}
          </h2>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-white transition-colors p-2 -mr-2 flex items-center justify-center"
            aria-label="Close modal"
          >
            <Icon name="solar:close-circle-bold" class="w-7 h-7" />
          </button>
        </div>

        <!-- Content -->
        <div class="p-4 sm:p-6 space-y-6 sm:space-y-8">
          <!-- 🏆 1. Expert Verdict -->
          <section>
            <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:cup-star-bold" class="text-yellow-400 w-6 h-6" /> Expert Verdict
            </h3>
            <div class="text-gray-300 leading-relaxed text-sm sm:text-base bg-[#1F2937]/50 p-4 rounded-xl border border-[#374151]">
              <p v-if="slotData.info_expert_verdict" v-html="slotData.info_expert_verdict"></p>
              <p v-else>
                {{ slotData.name }} by {{ slotData.providers?.name || 'the developer' }} is a {{ getVolatilityText(slotData.volatility).toLowerCase() }}-volatility slot with an RTP of {{ slotData.rtp || '96.0' }}% and a maximum win of {{ formatMaxWin(slotData.max_win) }}x.
                {{ slotData.rtp >= 96.5 ? 'The above-average RTP makes it a solid choice for long sessions.' : 'It delivers a balanced gaming experience suitable for most players.' }}
                Overall, we rate it {{ slotData.rating || 4.5 }}/5 for its {{ slotData.volatility?.toLowerCase() === 'high' ? 'thrilling high-reward potential' : 'balanced gameplay and consistent payouts' }}.
              </p>
            </div>
          </section>

          <!-- ✅❌ 2. Pros & Cons -->
          <section>
            <h3 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:checklist-bold" class="text-blue-400 w-6 h-6" /> Pros & Cons
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <!-- Pros -->
              <div class="bg-emerald-500/5 p-3 sm:p-4 rounded-xl border border-emerald-500/20">
                <h3 class="font-semibold text-emerald-400 text-sm mb-2 flex items-center gap-1.5">
                  <Icon name="solar:check-circle-bold" class="w-4 h-4" /> Pros
                </h3>
                <ul class="space-y-1.5 text-gray-300 text-xs sm:text-sm">
                  <li v-for="(pro, i) in pros" :key="'pro-'+i" class="flex items-start gap-2">
                    <Icon name="solar:add-circle-bold" class="text-emerald-400 w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{{ pro }}</span>
                  </li>
                </ul>
              </div>
              <!-- Cons -->
              <div class="bg-red-500/5 p-3 sm:p-4 rounded-xl border border-red-500/20">
                <h3 class="font-semibold text-red-400 text-sm mb-2 flex items-center gap-1.5">
                  <Icon name="solar:forbidden-circle-bold" class="w-4 h-4" /> Cons
                </h3>
                <ul class="space-y-1.5 text-gray-300 text-xs sm:text-sm">
                  <li v-for="(con, i) in cons" :key="'con-'+i" class="flex items-start gap-2">
                    <Icon name="solar:minus-circle-bold" class="text-red-400 w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span>{{ con }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- ❓ 3. FAQ (Accordion Animated) -->
          <section>
            <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:question-square-bold" class="text-blue-400 w-6 h-6" /> Frequently Asked Questions
            </h2>
            <div class="space-y-2">
              <div
                v-for="(item, i) in faq"
                :key="'faq-'+i"
                class="group bg-[#1F2937]/50 rounded-xl border border-[#374151] overflow-hidden"
              >
                <button
                  @click="toggleFaq(i)"
                  class="w-full flex items-center justify-between p-3 sm:p-4 cursor-pointer text-white font-medium text-sm sm:text-base hover:bg-white/5 transition-colors select-none text-left"
                  :aria-expanded="openFaqIndex === i"
                >
                  <span>{{ item.question }}</span>
                  <Icon
                    name="solar:alt-arrow-down-bold"
                    class="text-gray-400 transition-transform duration-300 ml-2 shrink-0 w-5 h-5"
                    :class="{ 'rotate-180': openFaqIndex === i }"
                  />
                </button>
                <div
                  class="grid transition-all duration-300 ease-in-out"
                  :class="openFaqIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
                >
                  <div class="overflow-hidden">
                    <div class="px-3 sm:px-4 pb-3 sm:pb-4 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-[#374151]">
                      <p class="pt-3">{{ item.answer }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 📝 4. Player Reviews -->
          <section>
            <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:chart-square-bold" class="text-purple-400 w-6 h-6" /> {{ slotData.name }} Review & Analysis
            </h2>
            <div class="space-y-3">
              <div
                v-for="(review, i) in reviews"
                :key="'review-'+i"
                class="bg-[#1F2937]/50 p-3 sm:p-4 rounded-xl border border-[#374151]"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {{ review.author?.charAt(0)?.toUpperCase() || 'U' }}
                    </div>
                    <div>
                      <div class="text-white text-sm font-medium">{{ review.author }}</div>
                      <div class="text-gray-400 text-xs">{{ review.date }}</div>
                    </div>
                  </div>
                  <div class="flex text-yellow-400 text-sm gap-0.5">
                    <Icon v-for="n in 5" :key="'star-'+i+'-'+n" :name="n <= review.rating ? 'solar:star-bold' : 'solar:star-linear'" class="w-4 h-4" />
                  </div>
                </div>
                <p class="text-gray-300 text-xs sm:text-sm leading-relaxed">{{ review.text }}</p>
              </div>
            </div>
          </section>

          <!-- 🎮 5. How to Play -->
          <section>
            <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:gamepad-bold" class="text-green-400 w-6 h-6" /> How to Play {{ slotData.name }}
            </h2>
            <div class="space-y-3">
              <div
                v-for="(step, i) in howTo"
                :key="'step-'+i"
                class="flex items-start gap-3 sm:gap-4"
              >
                <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {{ i + 1 }}
                </div>
                <div class="pt-1">
                  <h3 class="text-white font-medium text-sm sm:text-base mb-1">{{ step.step }}</h3>
                  <p class="text-gray-400 text-xs sm:text-sm leading-relaxed">{{ step.text }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- 🔗 6. Similar Slots -->
          <section v-if="similar?.length > 0">
            <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Icon name="solar:link-bold" class="text-orange-400 w-6 h-6" /> Similar Slots You May Like
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              <NuxtLink
                v-for="sim in similar.slice(0, 6)"
                :key="sim.id"
                :to="`/slots/${sim.slug}`"
                class="bg-[#1F2937]/50 p-3 rounded-xl border border-[#374151] hover:border-[#8B5CF6]/50 transition-colors group text-center"
                @click="closeModal"
              >
                <div class="text-white text-xs sm:text-sm font-medium group-hover:text-[#8B5CF6] transition-colors truncate">{{ sim.name }}</div>
                <div class="text-gray-400 text-[10px] sm:text-xs mt-1">{{ sim.providers?.name || 'Provider' }}</div>
              </NuxtLink>
            </div>
          </section>

          <!-- CTA -->
          <section class="bg-gradient-to-r from-[#8B5CF6]/10 to-[#EC4899]/10 p-4 rounded-xl border border-[#8B5CF6]/20">
            <h2 class="text-lg font-bold text-white mb-2">Free Play or Demo</h2>
            <p class="text-gray-300 mb-4 text-sm">
              {{ slotData.info_demo_cta || `You can easily try out ${slotData.name} online slot at SlotQuest without paying real money. Take advantage of our free demo mode and dive right in!` }}
            </p>
            <button
              @click="playSlot"
              class="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-white outline-none"
            >
              <Icon name="solar:play-bold" class="w-5 h-5" />
              {{ slotData.info_demo_btn_text || 'Play Demo Now' }}
            </button>
          </section>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getVolatilityText, formatMaxWin } from '~/utils/slotFormatters'

const props = defineProps({
  slotData: { type: Object, required: true },
  pros: { type: Array, default: () => [] },
  cons: { type: Array, default: () => [] },
  faq: { type: Array, default: () => [] },
  reviews: { type: Array, default: () => [] },
  howTo: { type: Array, default: () => [] },
  similar: { type: Array, default: () => [] }
})

const emit = defineEmits(['close', 'play'])

const openFaqIndex = ref(null)
const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

const closeModal = () => emit('close')
const playSlot = () => emit('play')

// A11y: Escape key to close modal (Focus trap & usability)
const handleEsc = (e) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  document.addEventListener('keydown', handleEsc)
  // Lock body scroll inside modal
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
  document.body.style.overflow = ''
})
</script>
