<template>
  <div
    :class="[
      'transition-bg relative min-h-screen w-full bg-zinc-900 text-white overflow-hidden',
      className
    ]"
    v-bind="$attrs"
  >
    <!-- Aurora Background -->
    <div 
      class="absolute inset-0 overflow-hidden"
      :style="auroraStyles"
    >
      <div 
          class="aurora-element pointer-events-none absolute inset-0 opacity-80"
          :class="[
           showRadialGradient && 'mask-radial-gradient'
         ]"
        ></div>
        <div 
          class="aurora-element-animated pointer-events-none absolute inset-0 opacity-60 animate-aurora"
          :class="[
           showRadialGradient && 'mask-radial-gradient'
         ]"
        ></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  className?: string
  showRadialGradient?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  showRadialGradient: true
})

const auroraStyles = computed(() => ({
  '--aurora': 'repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)',
  '--dark-gradient': 'repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)',
  '--white-gradient': 'repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)',
  '--blue-300': '#93c5fd',
  '--blue-400': '#60a5fa',
  '--blue-500': '#3b82f6',
  '--indigo-300': '#a5b4fc',
  '--violet-200': '#ddd6fe',
  '--black': '#000',
  '--white': '#fff',
  '--transparent': 'transparent'
}))

// Убираем computed стили, используем CSS классы
</script>

<style scoped>
.mask-radial-gradient {
  mask-image: radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%);
}

.aurora-element {
  background: linear-gradient(
    45deg,
    #3b82f6 0%,
    #8b5cf6 25%,
    #06b6d4 50%,
    #10b981 75%,
    #f59e0b 100%
  );
  filter: blur(40px);
  mix-blend-mode: screen;
}

.aurora-element-animated {
  background: linear-gradient(
    -45deg,
    #3b82f6,
    #8b5cf6,
    #06b6d4,
    #10b981,
    #f59e0b,
    #ef4444,
    #ec4899
  );
  background-size: 400% 400%;
  filter: blur(60px);
  mix-blend-mode: color-dodge;
}

@keyframes aurora {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>