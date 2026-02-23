<template>
  <main>
    <div
      :class="[
        'relative flex min-h-[100vh] flex-col items-center justify-center bg-[#09090b] text-slate-50',
        className,
      ]"
      v-bind="$attrs"
    >
      <!-- Beautiful static gradients without heavy filters -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
         <div class="absolute inset-0 opacity-40" style="background: radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.15), transparent 50%), radial-gradient(circle at 85% 30%, rgba(168, 85, 247, 0.15), transparent 50%), radial-gradient(circle at 50% 80%, rgba(99, 102, 241, 0.15), transparent 50%);"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 w-full">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
interface Props {
  className?: string
  showRadialGradient?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  showRadialGradient: true,
})
</script>
