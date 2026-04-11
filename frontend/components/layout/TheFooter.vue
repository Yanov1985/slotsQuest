<script setup>
import { computed } from 'vue'
const { t } = useI18n();

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})

const companyName = computed(() => props.data?.footer_company_name || 'SlotQuest')
const description = computed(() => props.data?.footer_description || t('footer.description_default'))

// Logo text splitting logic for styled display
const brandFirstName = computed(() => {
  const name = companyName.value.split(' ')[0]
  if (name.toLowerCase().startsWith('slot')) return 'Slot'
  return name
})

const brandLastName = computed(() => {
  // Simplified split for any brand name
  const parts = companyName.value.split(' ')
  if (parts.length > 1) return parts.slice(1).join(' ')
  return ''
})

const facebook = computed(() => props.data?.footer_facebook || '#')
const twitter = computed(() => props.data?.footer_twitter || '#')
const instagram = computed(() => props.data?.footer_instagram || '#')
const telegram = computed(() => props.data?.footer_telegram || '#')
</script>

<template>
  <footer class="relative z-10 mt-auto bg-black/80 backdrop-blur-xl border-t border-white/10 pt-16 pb-12">
    <div class="container mx-auto px-6 sm:px-8 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <!-- Brand Section -->
        <div class="space-y-6">
          <div class="flex items-center gap-3 group cursor-default">
            <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-300">
              <Icon name="solar:gamepad-bold-duotone" class="text-white text-2xl" />
            </div>
            <span class="text-2xl font-black tracking-tighter text-white uppercase italic">
              {{ brandFirstName }}<span class="text-blue-500">{{ brandLastName }}</span>
            </span>
          </div>
          <p class="text-white/50 text-sm leading-relaxed max-w-xs">
            {{ description }}
          </p>
          <div class="flex gap-4">
            <a v-if="twitter && twitter !== '#'" :href="twitter" target="_blank" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all">
              <Icon name="simple-icons:x" class="w-5 h-5" />
            </a>
            <a v-if="facebook && facebook !== '#'" :href="facebook" target="_blank" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-blue-600 hover:border-blue-600/50 hover:bg-blue-600/10 transition-all">
              <Icon name="simple-icons:facebook" class="w-5 h-5" />
            </a>
            <a v-if="instagram && instagram !== '#'" :href="instagram" target="_blank" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all">
              <Icon name="simple-icons:instagram" class="w-5 h-5" />
            </a>
            <a v-if="telegram && telegram !== '#'" :href="telegram" target="_blank" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-blue-300 hover:border-blue-300/50 hover:bg-blue-400/10 transition-all">
              <Icon name="simple-icons:telegram" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Navigation Section -->
        <div class="space-y-6">
          <h4 class="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            <span class="w-4 h-px bg-blue-600"></span>
            {{ t('footer.nav_title') }}
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="text-white/60 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">
                <Icon name="solar:home-2-linear" class="w-4 h-4 text-white/20 group-hover:text-blue-400" />
                {{ t('nav.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/" class="text-white/60 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">
                <Icon name="solar:reorder-linear" class="w-4 h-4 text-white/20 group-hover:text-blue-400" />
                {{ t('nav.catalog') }}
              </NuxtLink>
            </li>
            <li v-for="cat in ['popular', 'newest']" :key="cat">
              <NuxtLink to="/" class="text-white/60 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">
                <Icon name="solar:star-linear" class="w-4 h-4 text-white/20 group-hover:text-blue-400" />
                {{ t(`filters.${cat}`) }} Slots
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/news" class="text-white/60 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">
                <Icon name="solar:letter-linear" class="w-4 h-4 text-white/20 group-hover:text-blue-400" />
                News
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blogs" class="text-white/60 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">
                <Icon name="solar:document-text-linear" class="w-4 h-4 text-white/20 group-hover:text-blue-400" />
                Blogs
              </NuxtLink>
            </li>

          </ul>
        </div>

        <!-- Legal Section -->
        <div class="space-y-6">
          <h4 class="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            <span class="w-4 h-px bg-emerald-600"></span>
            {{ t('footer.legal_title') }}
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/legal/privacy-policy" class="text-white/60 hover:text-white hover:translate-x-1 transition-all">Privacy Policy</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/legal/terms-and-conditions" class="text-white/60 hover:text-white hover:translate-x-1 transition-all">Terms & Conditions</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/legal/cookie-policy" class="text-white/60 hover:text-white hover:translate-x-1 transition-all">Cookie Policy</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/legal/responsible-gaming" class="text-white/60 hover:text-white hover:translate-x-1 transition-all font-bold text-orange-400/80 hover:text-orange-400">Responsible Gaming</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Compliance Section -->
        <div class="space-y-6">
          <h4 class="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            <span class="w-4 h-px bg-red-600"></span>
            {{ t('footer.compliance_title') }}
          </h4>
          <div class="space-y-4">
             <div class="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 group hover:border-red-500/30 transition-colors">
                <div class="w-12 h-12 rounded-full border-2 border-red-500/50 flex items-center justify-center text-red-500 font-black text-xl group-hover:scale-110 transition-transform">18+</div>
                <div class="text-[10px] text-white/40 leading-tight uppercase font-bold tracking-tighter">
                   {{ t('footer.warning_18') }}
                </div>
             </div>
             <p class="text-xs text-white/30 italic">
                <span class="font-bold">{{ companyName }}</span> {{ t('footer.info_only') }}
             </p>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p class="text-white/30 text-[10px] sm:text-xs">
          © {{ new Date().getFullYear() }} <span class="text-white/60 font-bold">{{ companyName }}</span> {{ t('footer.rights_reserved') }}
        </p>
        <div class="flex items-center gap-8 text-[10px] sm:text-xs uppercase tracking-widest font-black text-white/20">
           <span class="flex items-center gap-1 hover:text-white transition-colors cursor-default"><Icon name="solar:shield-check-bold" class="text-emerald-500" /> {{ t('footer.secure_platform') }}</span>
           <span class="flex items-center gap-1 hover:text-white transition-colors cursor-default"><Icon name="solar:verified-check-bold" class="text-blue-500" /> {{ t('footer.verified_data') }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Any additional specific styles */
</style>
