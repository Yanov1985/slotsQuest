<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Навигация назад -->
    <div class="mb-6">
      <NuxtLink 
        to="/slots" 
        class="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Назад к каталогу
      </NuxtLink>
    </div>
    
    <!-- Загрузка -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p class="mt-4 text-gray-600">Загрузка слота...</p>
    </div>
    
    <!-- Ошибка -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-red-600 mb-4">
        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
        <h2 class="text-2xl font-bold mb-2">Слот не найден</h2>
        <p class="text-gray-600">{{ error }}</p>
      </div>
      <NuxtLink 
        to="/slots" 
        class="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
      >
        Перейти к каталогу
      </NuxtLink>
    </div>
    
    <!-- Контент слота -->
    <div v-else-if="slot" class="max-w-4xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Изображение слота -->
        <div class="space-y-4">
          <div class="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span class="text-white text-6xl font-bold">{{ slot.name.charAt(0) }}</span>
          </div>
          
          <!-- Кнопка играть -->
          <button 
            class="w-full bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg"
            @click="playSlot"
          >
            🎰 Играть сейчас
          </button>
        </div>
        
        <!-- Информация о слоте -->
        <div class="space-y-6">
          <div>
            <h1 class="text-4xl font-bold mb-2">{{ slot.name }}</h1>
            <div class="flex items-center space-x-4 text-gray-600">
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {{ slot.provider?.name }}
              </span>
              <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {{ slot.category?.name }}
              </span>
            </div>
          </div>
          
          <!-- Описание -->
          <div v-if="slot.description">
            <h3 class="text-lg font-semibold mb-2">Описание</h3>
            <p class="text-gray-700 leading-relaxed">{{ slot.description }}</p>
          </div>
          
          <!-- Характеристики -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-800 mb-1">RTP</h4>
              <p class="text-2xl font-bold text-green-600">{{ slot.rtp }}%</p>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-800 mb-1">Волатильность</h4>
              <p class="text-lg font-medium capitalize">{{ slot.volatility }}</p>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-800 mb-1">Мин. ставка</h4>
              <p class="text-lg font-medium">{{ slot.min_bet || 'Не указано' }}</p>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-800 mb-1">Макс. ставка</h4>
              <p class="text-lg font-medium">{{ slot.max_bet || 'Не указано' }}</p>
            </div>
          </div>
          
          <!-- Дополнительная информация -->
          <div v-if="slot.features && slot.features.length > 0">
            <h3 class="text-lg font-semibold mb-3">Особенности</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="feature in slot.features" 
                :key="feature"
                class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
              >
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Похожие слоты -->
      <div v-if="similarSlots.length > 0" class="mt-12">
        <h2 class="text-2xl font-bold mb-6">Похожие слоты</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="similarSlot in similarSlots" 
            :key="similarSlot.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span class="text-white text-xl font-bold">{{ similarSlot.name.charAt(0) }}</span>
            </div>
            
            <div class="p-4">
              <h3 class="font-bold text-lg mb-2">{{ similarSlot.name }}</h3>
              <p class="text-gray-600 text-sm mb-2">{{ similarSlot.provider?.name }}</p>
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm font-medium text-green-600">RTP: {{ similarSlot.rtp }}%</span>
                <span class="text-sm text-gray-500">{{ similarSlot.volatility }}</span>
              </div>
              
              <NuxtLink 
                :to="`/slots/${similarSlot.slug}`"
                class="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Подробнее
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Получаем slug из роута
const route = useRoute()
const slug = route.params.slug

// Состояние
const slot = ref(null)
const allSlots = ref([])
const loading = ref(true)
const error = ref(null)

// Вычисляемые свойства
const similarSlots = computed(() => {
  if (!slot.value || !allSlots.value.length) return []
  
  return allSlots.value
    .filter(s => 
      s.id !== slot.value.id && 
      (s.provider_id === slot.value.provider_id || s.category_id === slot.value.category_id)
    )
    .slice(0, 3)
})

// SEO (динамический)
watchEffect(() => {
  if (slot.value) {
    useHead({
      title: `${slot.value.name} - SlotQuest`,
      meta: [
        { 
          name: 'description', 
          content: `Играйте в ${slot.value.name} от ${slot.value.provider?.name}. RTP: ${slot.value.rtp}%, волатильность: ${slot.value.volatility}` 
        }
      ]
    })
  }
})

// Методы
const loadSlot = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Загружаем все слоты для поиска по slug
    const slotsResponse = await $fetch('http://localhost:3001/api/slots')
    allSlots.value = slotsResponse
    
    // Ищем слот по slug
    const foundSlot = slotsResponse.find(s => s.slug === slug)
    
    if (!foundSlot) {
      throw new Error(`Слот с адресом "${slug}" не найден`)
    }
    
    slot.value = foundSlot
    
  } catch (err) {
    console.error('Ошибка загрузки слота:', err)
    error.value = err.message || 'Произошла ошибка при загрузке слота'
  } finally {
    loading.value = false
  }
}

const playSlot = () => {
  // Здесь будет логика запуска игры
  alert(`Запуск игры: ${slot.value.name}`)
}

// Загружаем данные при монтировании
onMounted(() => {
  loadSlot()
})

// Перезагружаем при изменении slug
watch(() => route.params.slug, () => {
  if (route.params.slug !== slug) {
    loadSlot()
  }
})
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>