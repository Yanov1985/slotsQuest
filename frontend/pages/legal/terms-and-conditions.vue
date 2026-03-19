<template>
  <div class="max-w-4xl mx-auto px-6 py-20 text-white/80 leading-relaxed">
    <h1 class="text-4xl font-black text-white mb-8 border-b border-blue-500/30 pb-4 tracking-tight uppercase italic">
      Terms & <span class="text-blue-500">Conditions</span>
    </h1>
    
    <div class="space-y-10">
      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-2 font-display uppercase tracking-widest text-xs">
          <span class="w-4 h-px bg-blue-600"></span>
          Acceptance of Terms
        </h2>
        <p>
          Welcome to <strong>{{ pageData?.footer_company_name || 'Brand' }}</strong>. By accessing and using this website, you agree to comply with and be bound by the following terms and conditions. If you do not agree with any part of these terms, please stop using the site.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-2 font-display uppercase tracking-widest text-xs">
          <span class="w-4 h-px bg-blue-600"></span>
          Informational Purpose
        </h2>
        <p>
          {{ pageData?.footer_company_name || 'Brand' }} is a <strong>catalog, review, and informational platform</strong> intended for fans of slot games. We are <strong>not</strong> an online casino and do not offer or participate in real-money gambling.
        </p>
        <p class="text-blue-400 font-bold bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
          We do not process any payments, bets, or deposits on our website.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-2 font-display uppercase tracking-widest text-xs">
          <span class="w-4 h-px bg-blue-600"></span>
          User Responsibility
        </h2>
        <p>
          The information we provide about third-party casinos is for reference only. Users are solely responsible for ensuring that participating in online gambling is legal in their country, region, or jurisdiction.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-2 font-display uppercase tracking-widest text-xs">
          <span class="w-4 h-px bg-blue-600"></span>
          Intellectual Property
        </h2>
        <p>
          All logos, descriptions, game mechanics analysis, and UI designs found on {{ pageData?.footer_company_name || 'Brand' }} are the property of {{ pageData?.footer_company_name || 'Brand' }} or their respective owners (game providers). Unauthorized copying, redistribution, or use of this content is prohibited.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-2 font-display uppercase tracking-widest text-xs">
          <span class="w-4 h-px bg-blue-600"></span>
          Limitation of Liability
        </h2>
        <p>
          {{ pageData?.footer_company_name || 'Brand' }} shall not be held liable for any financial losses or damages resulting from the use of information found on our site or for any activities performed on third-party websites linked from {{ pageData?.footer_company_name || 'Brand' }}.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { usePagesApi } from '~/composables/usePagesApi'
const { getPage } = usePagesApi()
const { data: pageData } = await useAsyncData('home-brand-data', () => getPage('home'))

useHead({
  title: computed(() => `Terms & Conditions - ${pageData.value?.footer_company_name || 'Brand'}`),
  meta: [
    { name: 'description', content: computed(() => `Read the terms of use for ${pageData.value?.footer_company_name || 'Brand'}, your premium slot catalog.`) }
  ]
})
</script>
