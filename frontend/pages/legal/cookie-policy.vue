<template>
  <div class="max-w-4xl mx-auto px-6 py-20 text-white/80 leading-relaxed">
    <h1 class="text-4xl font-black text-white mb-8 border-b border-blue-500/30 pb-4 tracking-tight uppercase italic">
      Cookie <span class="text-blue-500">Policy</span>
    </h1>
    
    <div class="space-y-10">
      <section class="space-y-4">
        <p>
          This policy explains how <strong>{{ pageData?.footer_company_name || 'Brand' }}</strong> uses cookies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-3">
          <Icon name="solar:reorder-bold-duotone" class="text-blue-400" />
          What are Cookies?
        </h2>
        <p>
          Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-3">
          <Icon name="solar:graph-bold-duotone" class="text-emerald-400" />
          How We Use Cookies
        </h2>
        <p>
          We use first-party and third-party cookies for several reasons:
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 class="text-white font-bold mb-2 text-sm uppercase">Essential Cookies</h3>
            <p class="text-xs text-white/50">Necessary for the site to function correctly, like navigation and access to secure areas.</p>
          </div>
          <div class="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 class="text-white font-bold mb-2 text-sm uppercase">Analytical Cookies</h3>
            <p class="text-xs text-white/50">To monitor and analyze the use of our website to improve its structure and content.</p>
          </div>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-3">
          <Icon name="solar:settings-bold-duotone" class="text-purple-400" />
          How Can I Control Cookies?
        </h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Cookie Policy - Brand',
  meta: [
    { name: 'description', content: 'Learn how Brand uses cookies to improve your browsing experience.' }
  ]
})
</script>
