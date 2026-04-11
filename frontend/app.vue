<template>
  <VitePwaManifest />
  <DynamicIcons />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <!-- NUXT SCRIPTS: Zero-Impact Web Workers Trackers -->
  <!--
    <ScriptGoogleAnalytics id="G-XXXXXXXXXX" />
    <ScriptYandexMetrika id="XXXXXXXXXX" />
  -->
</template>

<script setup>
import { useSchemaOrg, defineWebSite, defineWebPage } from '#imports'
import { useUserStore } from '~/stores/userStore'

// Загружаем сохраненные данные пользователя при страте (Лайки, Сессия)
if (process.client) {
  const userStore = useUserStore()
  userStore.initLikes()
}

// Инициализация глобального графа JSON-LD (Schema.org)
useSchemaOrg([
  defineWebSite({
    name: 'SlotQuest',
    url: 'https://slotquest.com',
    description: 'Продвинутый симулятор слотов и каталог азартных игр'
  }),
  defineWebPage()
])
</script>
