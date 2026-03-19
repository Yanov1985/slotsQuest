<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
    <!-- Header -->
    <header class="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🧪 Тестирование компонентов
            </h1>
            <p class="text-gray-300 mt-2">Песочница для тестирования UI-компонентов перед интеграцией</p>
          </div>
          <NuxtLink to="/" class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-lg transition-all">
            🏠 На главную
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Component Selector -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-cyan-400">📋 Выберите компонент для тестирования</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button
            v-for="component in availableComponents"
            :key="component.id"
            @click="selectedComponent = component.id"
            :class="[
              'p-4 rounded-lg border-2 transition-all text-center',
              selectedComponent === component.id
                ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white'
            ]"
          >
            <div class="text-2xl mb-2">{{ component.icon }}</div>
            <div class="text-sm font-medium">{{ component.name }}</div>
          </button>
        </div>
      </section>

      <!-- Test Area -->
      <section class="bg-gray-900/50 rounded-xl border border-gray-700 p-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-white">
            🔬 Тестовая область: {{ getCurrentComponent()?.name || 'Не выбран' }}
          </h3>
          <div class="flex space-x-2">
            <button
              @click="resetComponent"
              class="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-sm transition-colors"
            >
              🔄 Сброс
            </button>
            <button
              @click="toggleDarkMode"
              class="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-sm transition-colors"
            >
              {{ isDarkMode ? '☀️' : '🌙' }} Тема
            </button>
          </div>
        </div>

        <!-- Component Display Area -->
        <div 
          :class="[
            'min-h-[400px] rounded-lg border-2 border-dashed border-gray-600 p-6 flex items-center justify-center',
            isDarkMode ? 'bg-black/30' : 'bg-white/5'
          ]"
        >
          <!-- 3D Card Test -->
          <div v-if="selectedComponent === '3d-card'" class="w-full max-w-md">
            <Ui3dCard class-name="inter-var">
              <Ui3dCardBody class-name="bg-gradient-to-br from-gray-900/90 to-black/90 relative group/card hover:shadow-2xl hover:shadow-cyan-500/[0.1] border border-cyan-500/[0.2] rounded-xl backdrop-blur-sm p-6">
                <Ui3dCardItem :translateZ="100" class-name="w-full mb-4">
                  <div class="h-48 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg flex items-center justify-center border border-cyan-500/30">
                    <div class="text-6xl">🎰</div>
                  </div>
                </Ui3dCardItem>
                
                <Ui3dCardItem :translateZ="50" class-name="text-xl font-bold text-white mb-2">
                  Тестовая 3D карточка
                </Ui3dCardItem>
                
                <Ui3dCardItem :translateZ="40" class-name="text-cyan-400 text-sm mb-4">
                  🏢 Test Provider
                </Ui3dCardItem>
                
                <Ui3dCardItem :translateZ="30" tag="p" class-name="text-gray-300 text-sm mb-4">
                  Это тестовая карточка для проверки 3D эффектов и анимаций компонента.
                </Ui3dCardItem>
                
                <Ui3dCardItem :translateZ="20" class-name="flex space-x-2">
                  <button class="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all">
                    Тест 1
                  </button>
                  <button class="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-all">
                    Тест 2
                  </button>
                </Ui3dCardItem>
              </Ui3dCardBody>
            </Ui3dCard>
          </div>

          <!-- Button Tests -->
          <div v-else-if="selectedComponent === 'buttons'" class="space-y-6">
            <div class="text-center">
              <h4 class="text-lg font-semibold mb-4 text-cyan-400">Тестирование кнопок</h4>
              <div class="flex flex-wrap gap-4 justify-center">
                <button class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-lg transition-all transform hover:scale-105">
                  Градиентная кнопка
                </button>
                <button class="px-6 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black rounded-lg transition-all">
                  Контурная кнопка
                </button>
                <button class="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
                  Красная кнопка
                </button>
                <button class="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                  Зеленая кнопка
                </button>
              </div>
            </div>
          </div>

          <!-- Form Elements -->
          <div v-else-if="selectedComponent === 'forms'" class="w-full max-w-md space-y-4">
            <h4 class="text-lg font-semibold mb-4 text-cyan-400 text-center">Тестирование форм</h4>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Текстовое поле</label>
              <input 
                type="text" 
                placeholder="Введите текст..."
                class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Выпадающий список</label>
              <select class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors">
                <option>Опция 1</option>
                <option>Опция 2</option>
                <option>Опция 3</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Текстовая область</label>
              <textarea 
                placeholder="Введите многострочный текст..."
                rows="3"
                class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Cards -->
          <div v-else-if="selectedComponent === 'cards'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-800 rounded-lg p-6 border border-gray-600">
              <h4 class="text-lg font-bold text-white mb-2">Простая карточка</h4>
              <p class="text-gray-300 mb-4">Это обычная карточка без 3D эффектов.</p>
              <button class="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded transition-colors">
                Действие
              </button>
            </div>
            <div class="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-cyan-500/30">
              <h4 class="text-lg font-bold text-white mb-2">Градиентная карточка</h4>
              <p class="text-gray-300 mb-4">Карточка с градиентным фоном и свечением.</p>
              <button class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded transition-all">
                Действие
              </button>
            </div>
          </div>

          <!-- Loading States -->
          <div v-else-if="selectedComponent === 'loading'" class="space-y-8">
            <h4 class="text-lg font-semibold text-cyan-400 text-center">Состояния загрузки</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                <p class="text-gray-300">Спиннер</p>
              </div>
              <div class="text-center">
                <div class="flex space-x-1 justify-center mb-4">
                  <div class="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div class="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
                <p class="text-gray-300">Точки</p>
              </div>
              <div class="text-center">
                <div class="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div class="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full animate-pulse" style="width: 60%"></div>
                </div>
                <p class="text-gray-300">Прогресс бар</p>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center text-gray-400">
            <div class="text-6xl mb-4">🎯</div>
            <h4 class="text-xl font-semibold mb-2">Выберите компонент для тестирования</h4>
            <p>Используйте кнопки выше для выбора компонента</p>
          </div>
        </div>

        <!-- Component Info -->
        <div v-if="selectedComponent && getCurrentComponent()" class="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
          <h4 class="text-lg font-semibold text-cyan-400 mb-2">ℹ️ Информация о компоненте</h4>
          <p class="text-gray-300 mb-2"><strong>Название:</strong> {{ getCurrentComponent().name }}</p>
          <p class="text-gray-300 mb-2"><strong>Описание:</strong> {{ getCurrentComponent().description }}</p>
          <p class="text-gray-300"><strong>Статус:</strong> 
            <span :class="getCurrentComponent().status === 'ready' ? 'text-green-400' : 'text-yellow-400'">
              {{ getCurrentComponent().status === 'ready' ? '✅ Готов' : '🚧 В разработке' }}
            </span>
          </p>
        </div>
      </section>

      <!-- Test Results -->
      <section class="mt-12">
        <h3 class="text-xl font-bold mb-4 text-cyan-400">📊 Результаты тестирования</h3>
        <div class="bg-gray-900/50 rounded-lg border border-gray-700 p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-green-400 mb-2">{{ testResults.passed }}</div>
              <div class="text-gray-300">Пройдено тестов</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-red-400 mb-2">{{ testResults.failed }}</div>
              <div class="text-gray-300">Провалено тестов</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-yellow-400 mb-2">{{ testResults.pending }}</div>
              <div class="text-gray-300">Ожидает тестирования</div>
            </div>
          </div>
          
          <div class="mt-6 flex justify-center space-x-4">
            <button 
              @click="runTests"
              class="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              ▶️ Запустить тесты
            </button>
            <button 
              @click="clearResults"
              class="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
            >
              🗑️ Очистить результаты
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
// Page meta
useHead({
  title: 'Component Testing - Brand',
  meta: [
    { name: 'description', content: 'Page for testing UI components' }
  ]
})

// Reactive data
const selectedComponent = ref('')
const isDarkMode = ref(true)

// Available components for testing
const availableComponents = ref([
  {
    id: '3d-card',
    name: '3D Card',
    icon: '🎴',
    description: 'Трехмерные карточки с анимациями и hover-эффектами',
    status: 'ready'
  },
  {
    id: 'buttons',
    name: 'Кнопки',
    icon: '🔘',
    description: 'Различные стили кнопок с градиентами и эффектами',
    status: 'ready'
  },
  {
    id: 'forms',
    name: 'Формы',
    icon: '📝',
    description: 'Элементы форм: поля ввода, селекты, текстовые области',
    status: 'ready'
  },
  {
    id: 'cards',
    name: 'Карточки',
    icon: '🃏',
    description: 'Обычные карточки без 3D эффектов',
    status: 'ready'
  },
  {
    id: 'loading',
    name: 'Загрузка',
    icon: '⏳',
    description: 'Индикаторы загрузки и состояния ожидания',
    status: 'ready'
  },
  {
    id: 'modals',
    name: 'Модалки',
    icon: '🪟',
    description: 'Модальные окна и диалоги',
    status: 'pending'
  }
])

// Test results
const testResults = ref({
  passed: 0,
  failed: 0,
  pending: 5
})

// Methods
const getCurrentComponent = () => {
  return availableComponents.value.find(comp => comp.id === selectedComponent.value)
}

const resetComponent = () => {
  selectedComponent.value = ''
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}

const runTests = () => {
  // Simulate test execution
  testResults.value = {
    passed: Math.floor(Math.random() * 10) + 5,
    failed: Math.floor(Math.random() * 3),
    pending: Math.floor(Math.random() * 5)
  }
}

const clearResults = () => {
  testResults.value = {
    passed: 0,
    failed: 0,
    pending: 5
  }
}

// Auto-select first component on mount
onMounted(() => {
  if (availableComponents.value.length > 0) {
    selectedComponent.value = availableComponents.value[0].id
  }
})
</script>

<style scoped>
/* Custom animations */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
