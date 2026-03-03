<template>
  <div class="min-h-screen bg-black flex items-center justify-center text-white">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Redirecting...</h1>
      <p class="text-white/60">If you are not redirected, <NuxtLink to="/" class="text-blue-500 hover:underline">click here</NuxtLink>.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.replace('/')
})
</script>
