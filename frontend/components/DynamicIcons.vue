<template>
  <div style="display: none" aria-hidden="true">
    <!-- Preload dynamic icons from the database to prevent Nuxt SSR warnings -->
    <Icon name="solar:crown-line-duotone" />
    <Icon name="solar:ranking-line-duotone" />
    <!-- Other dynamically loaded fast_filters icons -->
    <Icon name="solar:star-ring-bold-duotone" />
    <Icon name="solar:star-fall-line-duotone" />
    <Icon name="solar:bolt-bold" />
    <!-- Added new dynamically flagged icons -->
    <Icon name="solar:star-fall-bold-duotone" />
    <Icon name="solar:wallet-bold-duotone" />
    <Icon name="solar:flame-line-duotone" />
    <Icon name="solar:fire-line-duotone" />
    <Icon name="solar:hand-money-bold-duotone" />
  </div>
</template>

<script setup lang="ts">
// This component forces @nuxt/icon's clientBundle.scan and serverBundle to include these dynamically parsed icons
</script>
