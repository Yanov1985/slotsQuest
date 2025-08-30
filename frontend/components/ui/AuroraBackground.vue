<template>
  <main>
    <div
      :class="[
        'transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900',
        className,
      ]"
      v-bind="$attrs"
    >
      <div class="absolute inset-0 overflow-hidden" :style="auroraStyles">
        <div
          class="aurora-background pointer-events-none absolute -inset-[10px] opacity-50 blur-[10px] invert filter will-change-transform dark:invert-0"
          :class="[showRadialGradient && 'aurora-mask']"
        ></div>
      </div>

      <!-- Content -->
      <div class="relative z-10">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  className?: string
  showRadialGradient?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  showRadialGradient: true,
})

const auroraStyles = computed(() => ({
  '--aurora':
    'repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)',
  '--dark-gradient':
    'repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)',
  '--white-gradient':
    'repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)',
  '--blue-300': '#93c5fd',
  '--blue-400': '#60a5fa',
  '--blue-500': '#3b82f6',
  '--indigo-300': '#a5b4fc',
  '--violet-200': '#ddd6fe',
  '--black': '#000',
  '--white': '#fff',
  '--transparent': 'transparent',
}))
</script>

<style scoped>
/* Aurora background */
.aurora-background {
  background-image: var(--white-gradient), var(--aurora);
  background-size: 300%, 200%;
  background-position:
    50% 50%,
    50% 50%;
  --aurora: repeating-linear-gradient(
    100deg,
    var(--blue-500) 10%,
    var(--indigo-300) 15%,
    var(--blue-300) 20%,
    var(--violet-200) 25%,
    var(--blue-400) 30%
  );
  --dark-gradient: repeating-linear-gradient(
    100deg,
    var(--black) 0%,
    var(--black) 7%,
    var(--transparent) 10%,
    var(--transparent) 12%,
    var(--black) 16%
  );
  --white-gradient: repeating-linear-gradient(
    100deg,
    var(--white) 0%,
    var(--white) 7%,
    var(--transparent) 10%,
    var(--transparent) 12%,
    var(--white) 16%
  );
  animation: aurora 60s linear infinite;
}

.aurora-background::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--white-gradient), var(--aurora);
  background-size: 200%, 100%;
  background-attachment: fixed;
  mix-blend-mode: difference;
  animation: aurora 60s linear infinite;
}

/* Dark mode styles */
.dark .aurora-background {
  background-image: var(--dark-gradient), var(--aurora);
}

.dark .aurora-background::after {
  background-image: var(--dark-gradient), var(--aurora);
}

/* Radial mask */
.aurora-mask {
  mask-image: radial-gradient(
    ellipse at 100% 0%,
    black 10%,
    var(--transparent) 70%
  );
}

/* Aurora animation keyframes */
@keyframes aurora {
  from {
    background-position:
      50% 50%,
      50% 50%;
  }
  to {
    background-position:
      350% 50%,
      350% 50%;
  }
}
</style>
