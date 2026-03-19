<template>
  <div class="max-w-4xl mx-auto px-6 py-20 text-white/80 leading-relaxed">
    <h1 class="text-4xl font-black text-white mb-8 border-b border-blue-500/30 pb-4 tracking-tight uppercase italic">
      Privacy <span class="text-blue-500">Policy</span>
    </h1>
    
    <div class="space-y-10">
      <section>
        <p class="text-sm text-white/40 mb-4">Last Updated: March 2026</p>
        <p>
          At <strong>{{ pageData?.footer_company_name || 'Brand' }}</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <Icon name="solar:database-bold-duotone" class="text-blue-400" />
          Information We Collect
        </h2>
        <p>
          We do not require users to register or provide personal identification to browse our slot catalog. However, we may collect non-personal information automatically:
        </p>
        <ul class="list-disc list-inside ml-4 space-y-2 text-white/60">
          <li>Browser type and version</li>
          <li>Device type (Mobile, Tablet, Desktop)</li>
          <li>IP address (for regional content optimization)</li>
          <li>Pages visited and time spent on the site</li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <Icon name="solar:reorder-bold-duotone" class="text-emerald-400" />
          Use of Cookies
        </h2>
        <p>
          We use cookies to enhance your experience. These are small files stored on your device that help us understand user behavior and remember your preferences. For more details, please visit our 
          <NuxtLink to="/legal/cookie-policy" class="text-blue-400 hover:underline">Cookie Policy</NuxtLink>.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <Icon name="solar:link-bold-duotone" class="text-purple-400" />
          Third-Party Links
        </h2>
        <p>
          Our site contains links to external casino websites and game providers. We are not responsible for the privacy practices, content, or safety of these third-party domains. We recommend reviewing their privacy policies before providing any personal data to them.
        </p>
      </section>

      <section class="space-y-4 bg-red-500/5 p-6 rounded-2xl border border-red-500/20">
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <Icon name="solar:user-block-bold-duotone" class="text-red-400" />
          Age Restriction
        </h2>
        <p>
          {{ pageData?.footer_company_name || 'Brand' }} is strictly intended for individuals aged <strong>18 and older</strong>. We do not knowingly collect information from minors. If you are under 18, please leave this site immediately.
        </p>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-bold text-white flex items-center gap-2">
          <Icon name="solar:letter-bold-duotone" class="text-blue-400" />
          Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy, please contact our administrative team via the contact form or official social media channels.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Privacy Policy - Brand',
  meta: [
    { name: 'description', content: 'Learn how Brand handles your data and protects your privacy.' }
  ]
})
</script>
