<template>
  <div class="app">
    <header class="header">
      <h1>🎰 SlotQuest - Обзоры Слотов 🎰</h1>
      <p>Лучшие обзоры слотов для онлайн казино</p>
    </header>

    <main class="main">
      <!-- Loading State -->
      <div v-if="loading" class="loading">
        <p>Загрузка слотов...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error">
        <p>Ошибка загрузки: {{ error }}</p>
        <button @click="fetchSlots" class="btn">Попробовать снова</button>
      </div>

      <!-- Slots Grid -->
      <div v-else class="slots-grid">
        <div v-for="slot in slots" :key="slot.id" class="slot-card">
          <div class="slot-image">
            <img v-if="slot.thumbnail_url" :src="slot.thumbnail_url" :alt="slot.name" />
            <div v-else class="placeholder-image">🎰</div>
          </div>
          
          <div class="slot-info">
            <h3>{{ slot.name }}</h3>
            <p class="provider">{{ slot.provider?.name || 'Неизвестный провайдер' }}</p>
            <p class="description">{{ slot.description || 'Описание отсутствует' }}</p>
            
            <div class="slot-stats">
              <div v-if="slot.rtp" class="stat">
                <span class="label">RTP:</span>
                <span class="value">{{ slot.rtp }}%</span>
              </div>
              <div v-if="slot.volatility" class="stat">
                <span class="label">Волатильность:</span>
                <span class="value">{{ slot.volatility }}</span>
              </div>
              <div v-if="slot.paylines" class="stat">
                <span class="label">Линии:</span>
                <span class="value">{{ slot.paylines }}</span>
              </div>
              <div v-if="slot.rating" class="stat">
                <span class="label">Рейтинг:</span>
                <span class="value">{{ slot.rating }}/10</span>
              </div>
            </div>
            
            <div class="slot-meta">
              <div v-if="slot.category" class="category">
                <span class="label">Категория:</span>
                <span class="value">{{ slot.category.name }}</span>
              </div>
              <div v-if="slot.theme" class="theme">
                <span class="label">Тема:</span>
                <span class="value">{{ slot.theme }}</span>
              </div>
              <div v-if="slot.release_date" class="release-date">
                <span class="label">Дата выпуска:</span>
                <span class="value">{{ new Date(slot.release_date).getFullYear() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && slots.length === 0" class="empty">
        <p>Слоты не найдены</p>
      </div>
    </main>

    <!-- Test API Button -->
    <div class="test-section">
      <button @click="testAPI" class="btn btn-test">Тест API подключения</button>
      <p v-if="apiStatus" :class="apiStatus.success ? 'success' : 'error'">
        {{ apiStatus.message }}
      </p>
    </div>
  </div>
</template>

<script setup>
const { getSlots, getFeaturedSlots } = useSlotsApi()

const slots = ref([])
const loading = ref(false)
const error = ref(null)
const apiStatus = ref(null)

// Fetch slots from API
const fetchSlots = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await getSlots({ limit: 12 })
    slots.value = response || []
  } catch (err) {
    console.error('Error fetching slots:', err)
    error.value = err.message || 'Не удалось загрузить слоты'
  } finally {
    loading.value = false
  }
}

// Test API connection
const testAPI = async () => {
  try {
    const config = useRuntimeConfig()
    const response = await $fetch(`${config.public.apiUrl}/api`)
    apiStatus.value = {
      success: true,
      message: 'API подключение работает! ' + (response || 'OK')
    }
  } catch (err) {
    console.error('API test failed:', err)
    apiStatus.value = {
      success: false,
      message: 'Ошибка подключения к API: ' + err.message
    }
  }
}

// Load slots on mount
onMounted(() => {
  fetchSlots()
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 3rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.header p {
  font-size: 1.2rem;
  margin: 10px 0 0 0;
  opacity: 0.9;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
}

.loading, .error, .empty {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  padding: 40px;
}

.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.slot-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.slot-card:hover {
  transform: translateY(-5px);
}

.slot-image {
  height: 200px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slot-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-image {
  font-size: 4rem;
  color: #6c757d;
}

.slot-info {
  padding: 20px;
}

.slot-info h3 {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 1.4rem;
}

.provider {
  color: #7f8c8d;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.description {
  color: #34495e;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.slot-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  min-width: 80px;
}

.stat .label {
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 2px;
}

.stat .value {
  font-weight: 600;
  color: #2c3e50;
}

.reviews-summary {
  border-top: 1px solid #e9ecef;
  padding-top: 15px;
}

.review-preview {
  margin: 10px 0;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.reviewer {
  font-weight: 600;
  color: #495057;
}

.rating {
  font-size: 0.9rem;
}

.review-title {
  margin: 0;
  font-size: 0.9rem;
  color: #6c757d;
}

.no-reviews {
  text-align: center;
  color: #6c757d;
  font-style: italic;
}

.test-section {
  text-align: center;
  margin-top: 40px;
}

.btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #2980b9;
}

.btn-test {
  background: #e74c3c;
}

.btn-test:hover {
  background: #c0392b;
}

.success {
  color: #27ae60;
  font-weight: 600;
  margin-top: 10px;
}

.error {
  color: #e74c3c;
  font-weight: 600;
  margin-top: 10px;
}
</style>
