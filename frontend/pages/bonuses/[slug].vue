<template>
  <div class="promo-detail-page py-12 px-4 max-w-4xl mx-auto">
    <div v-if="pending" class="flex justify-center py-40">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
    </div>

    <div v-else-if="promo" class="space-y-12">
      <!-- Promo Header -->
      <div class="relative glass-container p-8 md:p-12 text-center overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>
        <div class="badge inline-block bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-bold uppercase mb-6">
          {{ promo.promo_type }}
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-4">{{ promo.title }}</h1>
        <div class="text-5xl md:text-7xl font-black text-white mb-8">{{ promo.amount }}</div>
        
        <div class="flex flex-col md:flex-row items-center justify-center gap-6">
          <div v-if="promo.promo_code" class="bg-gray-800/80 border border-white/10 px-8 py-4 rounded-2xl">
            <div class="text-xs text-gray-500 uppercase font-bold mb-1">Promo Code</div>
            <div class="text-2xl font-mono text-white tracking-widest">{{ promo.promo_code }}</div>
          </div>
          <a :href="promo.affiliate_link" target="_blank" 
             class="bg-green-500 text-black font-black py-5 px-12 rounded-2xl text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(34,197,94,0.4)] w-full md:w-auto">
            {{ $t('common.claim_now', 'Claim Bonus') }}
          </a>
        </div>
      </div>

      <!-- Localized Content -->
      <div class="glass-container p-8 md:p-12 prose prose-invert prose-green max-w-none">
        <div v-if="localizedContent" v-html="localizedContent.content_markdown"></div>
        <div v-else v-html="promo.content_markdown"></div>
      </div>

      <!-- Steps to Claim -->
      <div v-if="localizedContent?.steps" class="space-y-6">
        <h2 class="text-3xl font-bold px-4">{{ $t('common.how_to_claim', 'How to Claim') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(step, idx) in localizedContent.steps" :key="idx" 
               class="glass-container p-6 relative group border-white/5 hover:border-green-500/30 transition-all">
            <div class="text-6xl font-black text-white/5 absolute top-2 right-4 group-hover:text-green-500/10 transition-all">{{ idx + 1 }}</div>
            <p class="relative z-10 text-lg font-semibold">{{ step }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { getPromotionBySlug } = usePromotions();
const { locale } = useI18n();

const { data: promo, pending } = await useAsyncData(`promo-${route.params.slug}`, () => getPromotionBySlug(route.params.slug));

const localizedContent = computed(() => {
  if (!promo.value?.localizations) return null;
  return promo.value.localizations[locale.value] || promo.value.localizations['en'] || null;
});

useHead(() => ({
  title: localizedContent.value?.seo_title || `${promo.value?.title} - SlotQuest`,
  meta: [
    { name: 'description', content: localizedContent.value?.seo_desc || `Details on how to get ${promo.value?.title}.` }
  ]
}));
</script>

<style scoped>
.glass-container {
  @apply bg-gray-900/60 backdrop-blur-3xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl;
}
</style>
