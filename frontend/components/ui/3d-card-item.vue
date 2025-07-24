<template>
  <component
    :is="tag"
    ref="itemRef"
    :class="cn('w-fit transition duration-200 ease-linear', className)"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup>
import { ref, inject, watch, onMounted } from 'vue'
import { cn } from '~/utils/cn'

const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  },
  className: {
    type: String,
    default: ''
  },
  translateX: {
    type: Number,
    default: 0
  },
  translateY: {
    type: Number,
    default: 0
  },
  translateZ: {
    type: Number,
    default: 0
  },
  rotateX: {
    type: Number,
    default: 0
  },
  rotateY: {
    type: Number,
    default: 0
  },
  rotateZ: {
    type: Number,
    default: 0
  }
})

const itemRef = ref(null)
const isMouseEntered = inject('isMouseEntered', ref(false))

const handleAnimations = () => {
  if (!itemRef.value) return
  if (isMouseEntered.value) {
    itemRef.value.style.transform = `translateX(${props.translateX}px) translateY(${props.translateY}px) translateZ(${props.translateZ}px) rotateX(${props.rotateX}deg) rotateY(${props.rotateY}deg) rotateZ(${props.rotateZ}deg)`
  } else {
    itemRef.value.style.transform = 'translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)'
  }
}

// Watch for mouse enter state changes
watch(isMouseEntered, handleAnimations)

// Handle animations on mount
onMounted(() => {
  handleAnimations()
})
</script>