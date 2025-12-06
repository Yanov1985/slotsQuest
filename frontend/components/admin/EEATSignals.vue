<template>
  <!--
    🏆 E-E-A-T Signals Component

    Google Quality Guidelines сигналы:
    - Experience (Опыт)
    - Expertise (Экспертиза)
    - Authoritativeness (Авторитетность)
    - Trustworthiness (Надёжность)
  -->
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-[#8B5CF6]/20 to-[#7C3AED]/20 rounded-xl border border-[#8B5CF6]/30">
      <div class="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center">
        <span class="text-2xl">🏆</span>
      </div>
      <div>
        <h3 class="text-lg font-medium text-[#E5E7EB]">E-E-A-T Signals</h3>
        <p class="text-sm text-[#9CA3AF]">Google Quality Guidelines для высоких позиций</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-[#353A4A]">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        @click="activeTab = tab.id"
        :class="[
          'flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2',
          activeTab === tab.id
            ? 'border-b-2 border-[#8B5CF6] text-[#8B5CF6] bg-[#8B5CF6]/10'
            : 'text-[#9CA3AF] hover:text-[#E5E7EB] hover:bg-[#353A4A]/30'
        ]"
      >
        <span>{{ tab.icon }}</span>
        <span>{{ tab.name }}</span>
      </button>
    </div>

    <!-- Experience Tab -->
    <div v-show="activeTab === 'experience'" class="space-y-4">
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <h4 class="text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
          <span class="text-lg">🎮</span>
          Опыт тестирования слота
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Date tested -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Дата тестирования</label>
            <input
              type="date"
              v-model="localExperienceDate"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>

          <!-- Hours tested -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Часов тестирования</label>
            <input
              type="number"
              v-model.number="localExperienceHours"
              min="0"
              placeholder="10"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>

          <!-- Sessions -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Игровых сессий</label>
            <input
              type="number"
              v-model.number="localExperienceSessions"
              min="0"
              placeholder="25"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>
        </div>

        <!-- Experience Badge Preview -->
        <div class="mt-4 p-3 bg-[#161A21] rounded-lg">
          <p class="text-xs text-[#9CA3AF] mb-2">Превью бейджа опыта:</p>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 rounded-full">
            <span class="text-sm">🎮</span>
            <span class="text-sm text-[#A78BFA]">
              Tested {{ localExperienceHours || 0 }}+ hours | {{ localExperienceSessions || 0 }} sessions
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Expertise Tab -->
    <div v-show="activeTab === 'expertise'" class="space-y-4">
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <h4 class="text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
          <span class="text-lg">👨‍💼</span>
          Информация об авторе
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Author Name -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Имя автора</label>
            <input
              type="text"
              v-model="localAuthorName"
              placeholder="Alex Johnson"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>

          <!-- Author Position -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Должность</label>
            <input
              type="text"
              v-model="localAuthorPosition"
              placeholder="Senior Slot Analyst"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>

          <!-- Years of Experience -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Лет в индустрии</label>
            <input
              type="number"
              v-model.number="localExpertiseYears"
              min="0"
              max="50"
              placeholder="8"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>

          <!-- Reviews Count -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Написано обзоров</label>
            <input
              type="number"
              v-model.number="localReviewsCount"
              min="0"
              placeholder="250"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>
        </div>

        <!-- Author Bio -->
        <div class="mt-4 space-y-2">
          <label class="block text-xs font-medium text-[#9CA3AF]">Биография автора</label>
          <textarea
            v-model="localAuthorBio"
            rows="3"
            placeholder="Alex is a certified iGaming expert with 8+ years of experience analyzing online slots. Previously worked at Casino.org and holds certifications from GLI and eCOGRA."
            class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm resize-none"
          ></textarea>
        </div>

        <!-- Author Card Preview -->
        <div class="mt-4 p-4 bg-[#161A21] rounded-lg">
          <p class="text-xs text-[#9CA3AF] mb-3">Превью карточки автора:</p>
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] rounded-full flex items-center justify-center text-white font-bold text-lg">
              {{ (localAuthorName || 'A')[0].toUpperCase() }}
            </div>
            <div>
              <p class="font-medium text-[#E5E7EB]">{{ localAuthorName || 'Author Name' }}</p>
              <p class="text-sm text-[#9CA3AF]">{{ localAuthorPosition || 'Position' }}</p>
              <div class="flex items-center gap-3 mt-1 text-xs text-[#6B7280]">
                <span>📅 {{ localExpertiseYears || 0 }}+ years</span>
                <span>📝 {{ localReviewsCount || 0 }} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Authoritativeness Tab -->
    <div v-show="activeTab === 'authority'" class="space-y-4">
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <h4 class="text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
          <span class="text-lg">🏅</span>
          Авторитетность и признание
        </h4>

        <div class="space-y-4">
          <!-- Certifications -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Сертификации (через запятую)</label>
            <input
              type="text"
              v-model="localCertifications"
              placeholder="eCOGRA Certified, iTech Labs, GLI, BMM Testlabs"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>

          <!-- Featured In -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Упоминания в СМИ</label>
            <input
              type="text"
              v-model="localFeaturedIn"
              placeholder="Forbes, Casino.org, AskGamblers, CasinoMeister"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>

          <!-- Partnerships -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Партнёрства с провайдерами</label>
            <input
              type="text"
              v-model="localPartnerships"
              placeholder="Pragmatic Play Official Partner, NetEnt Affiliate"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>
        </div>

        <!-- Authority Badges Preview -->
        <div class="mt-4 p-3 bg-[#161A21] rounded-lg">
          <p class="text-xs text-[#9CA3AF] mb-2">Превью бейджей:</p>
          <div class="flex flex-wrap gap-2">
            <div v-for="cert in certificationsList" :key="cert" class="px-2 py-1 bg-[#10B981]/20 border border-[#10B981]/30 rounded text-xs text-[#10B981]">
              ✓ {{ cert }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trustworthiness Tab -->
    <div v-show="activeTab === 'trust'" class="space-y-4">
      <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg p-4">
        <h4 class="text-sm font-medium text-[#E5E7EB] mb-4 flex items-center gap-2">
          <span class="text-lg">🛡️</span>
          Надёжность и прозрачность
        </h4>

        <div class="space-y-4">
          <!-- Data Sources -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Источники данных</label>
            <input
              type="text"
              v-model="localDataSources"
              placeholder="Official RTP from Pragmatic Play, eCOGRA audit reports"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>

          <!-- Methodology -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Методология оценки</label>
            <textarea
              v-model="localMethodology"
              rows="2"
              placeholder="We test each slot for minimum 10 hours, analyze 1000+ spins, verify RTP with official documentation, and assess all bonus features."
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm resize-none"
            ></textarea>
          </div>

          <!-- Fact Checked -->
          <div class="flex items-center justify-between p-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg">
            <div class="flex items-center gap-3">
              <span class="text-lg">✅</span>
              <div>
                <p class="text-sm text-[#E5E7EB]">Факты проверены</p>
                <p class="text-xs text-[#9CA3AF]">Вся информация верифицирована</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="localFactChecked" class="sr-only peer" />
              <div class="w-11 h-6 bg-[#353A4A] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
            </label>
          </div>

          <!-- Fact Check Date -->
          <div v-if="localFactChecked" class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Дата проверки фактов</label>
            <input
              type="date"
              v-model="localFactCheckDate"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm"
            />
          </div>

          <!-- Disclaimer -->
          <div class="space-y-2">
            <label class="block text-xs font-medium text-[#9CA3AF]">Отказ от ответственности</label>
            <textarea
              v-model="localDisclaimer"
              rows="2"
              placeholder="18+ | Gambling can be addictive | Play responsibly | T&Cs apply"
              class="w-full px-3 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-sm resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Trust Signals Preview -->
        <div class="mt-4 p-3 bg-[#161A21] rounded-lg">
          <p class="text-xs text-[#9CA3AF] mb-2">Превью trust сигналов:</p>
          <div class="flex flex-wrap gap-3">
            <div v-if="localFactChecked" class="flex items-center gap-1 text-xs text-[#10B981]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Fact-checked {{ formatDate(localFactCheckDate) }}
            </div>
            <div class="flex items-center gap-1 text-xs text-[#9CA3AF]">
              📋 Verified methodology
            </div>
            <div class="flex items-center gap-1 text-xs text-[#9CA3AF]">
              🔒 Official data sources
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- E-E-A-T Score -->
    <div class="bg-gradient-to-r from-[#8B5CF6]/10 to-[#EC4899]/10 border border-[#8B5CF6]/30 rounded-lg p-4">
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-medium text-[#E5E7EB]">E-E-A-T Score</span>
        <span
          class="text-2xl font-bold"
          :class="eeatScore >= 80 ? 'text-[#10B981]' : eeatScore >= 60 ? 'text-[#F59E0B]' : 'text-[#EF4444]'"
        >
          {{ eeatScore }}/100
        </span>
      </div>
      <div class="w-full bg-[#353A4A] rounded-full h-2">
        <div
          class="h-2 rounded-full transition-all duration-500"
          :class="eeatScore >= 80 ? 'bg-[#10B981]' : eeatScore >= 60 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'"
          :style="{ width: `${eeatScore}%` }"
        ></div>
      </div>
      <div class="grid grid-cols-4 gap-2 mt-3 text-xs">
        <div class="text-center">
          <div class="font-medium text-[#E5E7EB]">Experience</div>
          <div class="text-[#9CA3AF]">{{ experienceScore }}/25</div>
        </div>
        <div class="text-center">
          <div class="font-medium text-[#E5E7EB]">Expertise</div>
          <div class="text-[#9CA3AF]">{{ expertiseScore }}/25</div>
        </div>
        <div class="text-center">
          <div class="font-medium text-[#E5E7EB]">Authority</div>
          <div class="text-[#9CA3AF]">{{ authorityScore }}/25</div>
        </div>
        <div class="text-center">
          <div class="font-medium text-[#E5E7EB]">Trust</div>
          <div class="text-[#9CA3AF]">{{ trustScore }}/25</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  // Experience
  experienceDate: { type: String, default: '' },
  experienceHours: { type: Number, default: 0 },
  experienceSessions: { type: Number, default: 0 },
  // Expertise
  authorName: { type: String, default: 'SlotQuest Editorial Team' },
  authorPosition: { type: String, default: '' },
  authorBio: { type: String, default: '' },
  expertiseYears: { type: Number, default: 5 },
  reviewsCount: { type: Number, default: 0 },
  // Authority
  certifications: { type: String, default: '' },
  featuredIn: { type: String, default: '' },
  partnerships: { type: String, default: '' },
  // Trust
  dataSources: { type: String, default: '' },
  methodology: { type: String, default: '' },
  factChecked: { type: Boolean, default: true },
  factCheckDate: { type: String, default: '' },
  disclaimer: { type: String, default: '18+ | Gambling can be addictive | Play responsibly' }
})

// Emits
const emit = defineEmits([
  'update:experienceDate', 'update:experienceHours', 'update:experienceSessions',
  'update:authorName', 'update:authorPosition', 'update:authorBio',
  'update:expertiseYears', 'update:reviewsCount',
  'update:certifications', 'update:featuredIn', 'update:partnerships',
  'update:dataSources', 'update:methodology', 'update:factChecked',
  'update:factCheckDate', 'update:disclaimer'
])

// Tabs
const tabs = [
  { id: 'experience', name: 'Experience', icon: '🎮' },
  { id: 'expertise', name: 'Expertise', icon: '👨‍💼' },
  { id: 'authority', name: 'Authority', icon: '🏅' },
  { id: 'trust', name: 'Trust', icon: '🛡️' }
]

const activeTab = ref('experience')

// Local state
const localExperienceDate = ref(props.experienceDate)
const localExperienceHours = ref(props.experienceHours)
const localExperienceSessions = ref(props.experienceSessions)
const localAuthorName = ref(props.authorName)
const localAuthorPosition = ref(props.authorPosition)
const localAuthorBio = ref(props.authorBio)
const localExpertiseYears = ref(props.expertiseYears)
const localReviewsCount = ref(props.reviewsCount)
const localCertifications = ref(props.certifications)
const localFeaturedIn = ref(props.featuredIn)
const localPartnerships = ref(props.partnerships)
const localDataSources = ref(props.dataSources)
const localMethodology = ref(props.methodology)
const localFactChecked = ref(props.factChecked)
const localFactCheckDate = ref(props.factCheckDate)
const localDisclaimer = ref(props.disclaimer)

// Watch and emit
watch(localExperienceDate, (val) => emit('update:experienceDate', val))
watch(localExperienceHours, (val) => emit('update:experienceHours', val))
watch(localExperienceSessions, (val) => emit('update:experienceSessions', val))
watch(localAuthorName, (val) => emit('update:authorName', val))
watch(localAuthorPosition, (val) => emit('update:authorPosition', val))
watch(localAuthorBio, (val) => emit('update:authorBio', val))
watch(localExpertiseYears, (val) => emit('update:expertiseYears', val))
watch(localReviewsCount, (val) => emit('update:reviewsCount', val))
watch(localCertifications, (val) => emit('update:certifications', val))
watch(localFeaturedIn, (val) => emit('update:featuredIn', val))
watch(localPartnerships, (val) => emit('update:partnerships', val))
watch(localDataSources, (val) => emit('update:dataSources', val))
watch(localMethodology, (val) => emit('update:methodology', val))
watch(localFactChecked, (val) => emit('update:factChecked', val))
watch(localFactCheckDate, (val) => emit('update:factCheckDate', val))
watch(localDisclaimer, (val) => emit('update:disclaimer', val))

// Computed
const certificationsList = computed(() => {
  if (!localCertifications.value) return []
  return localCertifications.value.split(',').map(c => c.trim()).filter(c => c)
})

// Score calculations
const experienceScore = computed(() => {
  let score = 0
  if (localExperienceDate.value) score += 5
  if (localExperienceHours.value >= 5) score += 10
  if (localExperienceHours.value >= 10) score += 5
  if (localExperienceSessions.value >= 10) score += 5
  return Math.min(score, 25)
})

const expertiseScore = computed(() => {
  let score = 0
  if (localAuthorName.value) score += 5
  if (localAuthorPosition.value) score += 5
  if (localAuthorBio.value && localAuthorBio.value.length > 50) score += 5
  if (localExpertiseYears.value >= 3) score += 5
  if (localReviewsCount.value >= 50) score += 5
  return Math.min(score, 25)
})

const authorityScore = computed(() => {
  let score = 0
  if (localCertifications.value) score += 10
  if (localFeaturedIn.value) score += 10
  if (localPartnerships.value) score += 5
  return Math.min(score, 25)
})

const trustScore = computed(() => {
  let score = 0
  if (localDataSources.value) score += 5
  if (localMethodology.value) score += 5
  if (localFactChecked.value) score += 10
  if (localDisclaimer.value) score += 5
  return Math.min(score, 25)
})

const eeatScore = computed(() => {
  return experienceScore.value + expertiseScore.value + authorityScore.value + trustScore.value
})

// Methods
function formatDate(dateStr) {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
</script>
