<template>
  <ClientOnly>
    <vue-particles
      v-if="show"
      id="jackpot-confetti"
      :options="options"
    />
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
  // Взрыв конфетти при загрузке страницы слота
  show.value = true
  
  // Автоматически выключаем генератор через 4 секунды
  setTimeout(() => {
    show.value = false
  }, 4000)
})

const options = {
  preset: "confetti",
  particles: {
    number: {
      value: 120 // Количество 
    },
    color: {
      // Идеально сочетается с киберпанк/неон дизайном проекта
      value: ["#00FFFF", "#8B5CF6", "#EC4899", "#FBBF24", "#FFFFFF"] 
    }
  },
  emitters: {
    life: {
      duration: 3,
      count: 1
    },
    position: {
      x: 50,
      y: 0
    },
    size: {
      width: 0,
      height: 0
    },
    rate: {
      delay: 0.1,
      quantity: 15
    }
  }
}
</script>

<style scoped>
#jackpot-confetti {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  pointer-events: none; /* Чрезвычайно важно, чтобы конфетти не блокировало клики на сайте */
}
</style>
