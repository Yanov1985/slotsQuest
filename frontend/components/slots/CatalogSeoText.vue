<template>
  <div class="w-full mt-8 sm:mt-12 mb-6 sm:mb-8 origin-top transition-all duration-500">

    <!-- Main Spoiler Toggle Button -->
    <div class="flex items-center justify-center mb-6">
      <button
        @click="isExpanded = !isExpanded"
        class="group flex items-center justify-between w-full max-w-2xl bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300 backdrop-blur-md cursor-pointer"
      >
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-transform duration-300">
            <Icon name="solar:document-text-line-duotone" class="w-5 h-5" />
          </div>
          <div class="text-left">
            <h2 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Everything About Online Slots</h2>
            <p class="text-xs text-white/50">Read our comprehensive guide to casinos, slots, and bonuses</p>
          </div>
        </div>
        <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-500 transform border border-white/10 group-hover:border-white/20" :class="{ 'rotate-180': isExpanded }">
          <Icon name="solar:alt-arrow-down-line-duotone" class="w-5 h-5 text-white/70" />
        </div>
      </button>
    </div>

    <!-- Collapsible SEO Content Grid -->
    <div
      v-show="isExpanded"
      class="transition-opacity duration-500 ease-in-out"
      :class="isExpanded ? 'opacity-100 mt-6' : 'opacity-0'"
    >
      <div class="overflow-hidden">

        <div class="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 sm:p-8 flex flex-col lg:flex-row gap-6 lg:gap-12 relative overflow-hidden">

          <!-- Background Glow -->
          <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
             <div class="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
             <div class="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
          </div>

          <!-- Navigation Menu (Left Sidebar) -->
          <nav class="lg:w-1/4 shrink-0 relative z-10 hidden md:block">
            <div class="sticky top-6 flex flex-col gap-2">
              <h3 class="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 pl-4">In this guide</h3>

              <button
                v-for="(section, index) in localSections"
                :key="index"
                @click="scrollToSection(section.id || `section-${index}`)"
                class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left w-full group"
                :class="activeSection === (section.id || `section-${index}`) ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400' : 'hover:bg-white/5 border border-transparent text-white/60 hover:text-white'"
              >
                <Icon :name="section.icon" class="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" :class="activeSection === (section.id || `section-${index}`) ? 'text-blue-400' : 'text-white/40 group-hover:text-blue-400'" />
                <span class="text-sm font-medium">{{ section.title }}</span>
              </button>
            </div>
          </nav>

          <!-- Mobile Nav (Dropdown style) -->
          <div class="md:hidden w-full min-w-0 relative z-10 mb-4">
             <h3 class="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Jump to section</h3>
             <div class="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
                <button
                  v-for="(section, index) in localSections"
                  :key="index"
                  @click="scrollToSection(section.id || `section-${index}`)"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap border text-sm font-medium"
                  :class="activeSection === (section.id || `section-${index}`) ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-white/5 border-white/10 text-white/60'"
                >
                  <Icon :name="section.icon" class="w-4 h-4 shrink-0" />
                  {{ section.title }}
                </button>
             </div>
          </div>

          <!-- Content Area (Right Side) -->
          <div class="lg:w-3/4 w-full relative z-10 html-content flex flex-col gap-12" ref="contentContainer">

            <!-- Dynamic Sections via Prop -->
            <section v-for="(section, index) in localSections" :key="index" :id="section.id || `section-${index}`" class="scroll-mt-6 outline-none transition-opacity duration-300" tabindex="-1">
              <div class="flex items-center gap-4 mb-4 sm:mb-6">
                <!-- Apply different colors based on index for visual variety -->
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/10 shrink-0"
                     :class="[
                       index % 4 === 0 ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : '',
                       index % 4 === 1 ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' : '',
                       index % 4 === 2 ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20' : '',
                       index % 4 === 3 ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20' : ''
                     ]">
                  <Icon :name="section.icon || 'solar:document-text-line-duotone'" class="w-5 h-5 sm:w-6 sm:h-6"
                        :class="[
                          index % 4 === 0 ? 'text-blue-400' : '',
                          index % 4 === 1 ? 'text-purple-400' : '',
                          index % 4 === 2 ? 'text-green-400' : '',
                          index % 4 === 3 ? 'text-amber-400' : ''
                        ]" />
                </div>
                <h2 class="text-xl sm:text-2xl font-bold text-white">{{ section.title }}</h2>
              </div>
              <div class="prose prose-invert max-w-none text-white/70 space-y-4 html-content-block" v-html="sanitizeHtml(section.text)"></div>
            </section>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  sections: {
    type: Array,
    required: false,
    default: () => null
  },
  pageData: {
    type: Object,
    required: false,
    default: () => null
  }
})

// Keywords replacement helper
const replaceKeywords = (text) => {
  if (!text || !props.pageData) return text
  let result = text
  
  // 1. Dynamic list from seo_keywords_list
  const kwList = props.pageData.seo_keywords_list
  if (kwList && Array.isArray(kwList)) {
    kwList.forEach((kw, index) => {
      const placeholder = `[keyword_${index + 1}]`
      // Escape for regex and replace all occurrences
      result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), kw || '')
    })
  }
  
  // 2. Legacy fallback hero_keyword_1..3
  for (let i = 1; i <= 3; i++) {
    const kw = props.pageData[`hero_keyword_${i}`] || ''
    result = result.replace(new RegExp(`\\[keyword_${i}\\]`, 'g'), kw)
  }
  
  return props.pageData?.footer_company_name ? result.replace(/Brand/g, props.pageData.footer_company_name) : result
}

// Fallback to these if no sections are passed
const defaultSections = computed(() => {
  const name = props.pageData?.footer_company_name || 'Brand'
  return [
    { id: 'intro', title: `Why Trust ${name}?`, icon: 'solar:shield-star-bold-duotone' },
    { id: 'fairness', title: 'Fair Play & Withdrawals', icon: 'solar:wallet-money-bold-duotone' },
    { id: 'games', title: 'Universe of Slots', icon: 'solar:gamepad-bold-duotone' },
    { id: 'bonuses', title: 'Hunting the Best Bonuses', icon: 'solar:gift-bold-duotone' },
    { id: 'mobile', title: 'Free Demos & Mobile Play', icon: 'solar:smartphone-bold-duotone' },
  ]
})

const mapInvalidIcon = (iconStr) => {
  if (!iconStr) return 'solar:document-text-line-duotone'
  const map = {
    'solar:star-bold-duotone': 'solar:star-fall-bold-duotone',
  }
  return map[iconStr] || iconStr
}

const localSections = ref(props.sections && props.sections.length > 0 ? props.sections.map(s => ({...s, icon: mapInvalidIcon(s.icon)})) : defaultSections.value)

watch(() => props.sections, (newVal) => {
  if (newVal && newVal.length > 0) {
    localSections.value = newVal.map(s => ({...s, icon: mapInvalidIcon(s.icon)}))
  } else {
    localSections.value = defaultSections.value
  }
}, { deep: true })

const isExpanded = ref(true) // Default to open for debugging initially, we can revert later if needed.
const activeSection = ref(localSections.value[0]?.id || 'intro')
const contentContainer = ref(null)

// Cleanup literal \n representations from DB and replace keywords
const sanitizeHtml = (htmlStr) => {
  if (!htmlStr) return ''
  let cleaned = htmlStr.replace(/\\n/g, '')
  return replaceKeywords(cleaned)
}

// Smooth scroll logic
const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const yOffset = -100 // Account for sticky headers
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
    activeSection.value = id
  }
}

// Intersection Observer for scroll highlighting
let observer = null

onMounted(() => {
  if (window.IntersectionObserver) {
    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    }, options)

    // Observe all sections once mounted
    setTimeout(() => {
      localSections.value.forEach(section => {
        const sectionId = section.id || (section.title ? section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : null)
        if (sectionId) {
           const el = document.getElementById(sectionId)
           if (el) observer.observe(el)
        }
      })
    }, 500)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
