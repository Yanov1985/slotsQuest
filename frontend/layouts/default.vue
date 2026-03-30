<template>
  <div class="min-h-screen bg-black font-sans selection:bg-blue-500/30 overflow-x-clip flex flex-col">
    <!-- Shared Animated Background -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <TheBackgroundBeams :intensity="0.9" :speed="1.2" />
    </div>

    <!-- Page Content -->
    <div class="relative z-10 flex-1 flex flex-col">
      <slot />
    </div>

    <!-- Global Footer (hidden in admin area) -->
    <TheFooter v-if="!isAdminRoute" :data="pageData" />

    <!-- VueUse Floating Button -->
    <ClientOnly>
      <BackToTop v-if="!isAdminRoute" />
      <Toaster position="bottom-center" richColors theme="dark" />
    </ClientOnly>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePagesApi } from '~/composables/usePagesApi'
import TheBackgroundBeams from '~/components/TheBackgroundBeams.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
import BackToTop from '~/components/BackToTop.vue'
import { Toaster } from 'vue-sonner'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

const { getPage } = usePagesApi()
const { data: pageData } = await useAsyncData('global-footer-data', () => getPage('home'))
</script>

<style>
/* Global styles if needed */
body {
  margin: 0;
  padding: 0;
  background-color: black;
}
</style>
