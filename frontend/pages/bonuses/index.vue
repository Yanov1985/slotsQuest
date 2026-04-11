<template>
  <div class="bonuses-page py-12 px-4 max-w-7xl mx-auto">
    <div class="header mb-12 text-center">
      <h1 class="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
        {{ $t('bonuses.title', 'Exclusive Casino Bonuses') }}
      </h1>
      <p class="text-xl text-gray-400 max-w-2xl mx-auto">
        {{ $t('bonuses.subtitle', 'Grab the best No Deposit bonuses, Free Spins, and Welcome packages.') }}
      </p>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="promo in promos" :key="promo.id" 
           class="promo-card bg-gray-900/40 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-green-500/30 transition-all duration-300">
        
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <span class="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
              {{ promo.promo_type }}
            </span>
            <span v-if="promo.is_exclusive" class="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
              {{ $t('common.exclusive', 'Exclusive') }}
            </span>
          </div>
          <h3 class="text-2xl font-bold mb-1">{{ promo.title }}</h3>
          <p class="text-3xl font-black text-white mb-4">{{ promo.amount }}</p>
          
          <div class="flex flex-wrap gap-4 text-sm text-gray-400">
            <div v-if="promo.wager_requirement" class="flex items-center gap-1">
              <span class="text-gray-500">Wager:</span> {{ promo.wager_requirement }}
            </div>
            <div v-if="promo.promo_code" class="flex items-center gap-1">
              <span class="text-gray-500">Code:</span> 
              <span class="bg-white/10 px-2 py-0.5 rounded text-white font-mono uppercase">{{ promo.promo_code }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-stretch gap-3 w-full md:w-48">
          <a :href="promo.affiliate_link" target="_blank" class="bg-green-500 text-black font-bold py-3 px-6 rounded-xl text-center hover:bg-green-400 transition-colors shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            {{ $t('common.get_bonus', 'Get Bonus') }}
          </a>
          <NuxtLink :to="`/bonuses/${promo.slug}`" class="text-sm text-center text-gray-500 hover:text-white transition-colors">
            {{ $t('common.terms_conditions', 'Terms & Conditions') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { getPromotions } = usePromotions();
const { data: promos, pending } = await useAsyncData('promos-list', () => getPromotions());

useHead({
  title: 'Casino Bonuses & Promotions - SlotQuest',
  meta: [
    { name: 'description', content: 'Huge selection of online casino bonuses. Welcome deals, free spins, and no deposit offers.' }
  ]
})
</script>

<style scoped>
.promo-card {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}
</style>
