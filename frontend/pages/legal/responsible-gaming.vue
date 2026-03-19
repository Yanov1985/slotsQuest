<template>
  <div class="max-w-4xl mx-auto px-6 py-20 text-white/80 leading-relaxed">
    <h1 class="text-4xl font-black text-white mb-2 border-b border-orange-500/30 pb-4 tracking-tight uppercase italic">
      Responsible <span class="text-orange-500">Gaming</span>
    </h1>
    <p class="text-orange-400 font-bold mb-10 text-sm uppercase tracking-widest">Always stay in control</p>
    
    <div class="space-y-12">
      <section class="bg-orange-500/5 p-8 rounded-3xl border border-orange-500/20 shadow-2xl shadow-orange-500/5 relative overflow-hidden">
        <Icon name="solar:shield-warning-bold-duotone" class="absolute -top-10 -right-10 text-orange-500/10 text-[200px]" />
        <div class="relative z-10 space-y-4">
          <h2 class="text-2xl font-black text-white uppercase italic">Play Responsibly</h2>
          <p>
          At <strong>{{ pageData?.footer_company_name || 'Brand' }}</strong>, we want all our visitors to have a safe and positive experience.
          </p>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
           <h3 class="text-white font-bold flex items-center gap-2">
             <Icon name="solar:stop-circle-bold-duotone" class="text-red-500" />
             Stay in Control
           </h3>
           <ul class="text-sm space-y-3 text-white/60">
             <li>• Never gamble more than you can afford to lose.</li>
             <li>• Set a budget and a time limit before you start playing.</li>
             <li>• Don't chase your losses or try to "win back" money.</li>
             <li>• Gambling should not be your primary source of income.</li>
           </ul>
        </div>
        <div class="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10">
           <h3 class="text-white font-bold flex items-center gap-2">
             <Icon name="solar:question-square-bold-duotone" class="text-blue-500" />
             Warning Signs
           </h3>
           <ul class="text-sm space-y-3 text-white/60">
             <li>• Spending more time and money on gambling than intended.</li>
             <li>• Neglecting work, family, or personal responsibilities.</li>
             <li>• Feeling anxious or irritable when not gambling.</li>
             <li>• Borrowing money to fund your gambling activity.</li>
           </ul>
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-xl font-bold text-white flex items-center gap-3">
          <Icon name="solar:help-outline-bold-duotone" class="text-emerald-400" />
          Where to Find Help
        </h2>
        <p>If you or someone you know is struggling with a gambling problem, we strongly encourage you to seek assistance from these professional organizations:</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="https://www.begambleaware.org" target="_blank" class="block bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 transition-all text-center">
             <div class="text-white font-black mb-1">BeGambleAware</div>
             <div class="text-[10px] text-white/40 uppercase">Independent advice & help</div>
          </a>
          <a href="https://www.gamcare.org.uk" target="_blank" class="block bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 transition-all text-center">
             <div class="text-white font-black mb-1">GamCare</div>
             <div class="text-[10px] text-white/40 uppercase">Support & Counseling</div>
          </a>
          <a href="https://www.gamblingtherapy.org" target="_blank" class="block bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 transition-all text-center">
             <div class="text-white font-black mb-1">Gambling Therapy</div>
             <div class="text-[10px] text-white/40 uppercase">Global support services</div>
          </a>
        </div>
      </section>

      <section class="space-y-4 border-t border-white/10 pt-8 mt-12">
        <div class="flex items-center gap-4">
           <div class="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center text-red-500 font-black text-2xl">18+</div>
           <div>
              <h4 class="text-white font-bold uppercase tracking-tighter">Underage Protection</h4>
              <p class="text-xs text-white/40 leading-relaxed">
                 Access to gambling-related content is strictly prohibited for individuals under the age of 18. We encourage parents to use filtering software to prevent minors from accessing gambling sites.
              </p>
           </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: computed(() => `Responsible Gaming - ${pageData.value?.footer_company_name || 'Brand'}`),
  meta: [
    { name: 'description', content: computed(() => `Guidelines and resources for safe and responsible gambling at ${pageData.value?.footer_company_name || 'Brand'}.`) }
  ]
})
</script>
