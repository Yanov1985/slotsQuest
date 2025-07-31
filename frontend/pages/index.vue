<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-2xl animate-bounce"></div>
    </div>

    <!-- Floating Particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
      <div class="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
      <div class="absolute bottom-32 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
      <div class="absolute top-1/2 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-ping delay-500"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10">
      <!-- Hero Section -->
      <section class="container mx-auto px-4 py-20 text-center">
        <div class="mb-8">
          <h1 class="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
            SlotQuest
          </h1>
          <div class="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-8 rounded-full"></div>
          <p class="text-xl md:text-3xl mb-12 text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
            Погрузитесь в мир захватывающих слот-машин с потрясающими визуальными эффектами и невероятными выигрышами
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center mb-20">
          <NuxtLink 
            to="/slots"
            class="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 text-center"
          >
            <span class="relative z-10">🎰 Каталог слотов</span>
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </NuxtLink>
          <button class="group relative px-12 py-5 border-2 border-cyan-400/50 rounded-full font-bold text-xl transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 backdrop-blur-sm">
            🏆 Турниры
          </button>
        </div>
      </section>

      <!-- Slots Section -->
      <section class="container mx-auto px-4 py-20">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🎰 Все слоты
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Откройте для себя все доступные игры с невероятными бонусами и джекпотами
          </p>
        </div>
        
        <!-- Loading State -->
        <div v-if="pending" class="flex justify-center items-center py-32">
          <div class="relative">
            <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-cyan-400"></div>
            <div class="absolute inset-0 animate-ping rounded-full h-20 w-20 border-2 border-purple-400 opacity-20"></div>
          </div>
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-32">
          <div class="text-8xl mb-6">⚠️</div>
          <p class="text-red-400 text-2xl mb-6">Ошибка загрузки слотов</p>
          <button @click="refresh()" class="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-lg transition-all transform hover:scale-105 text-lg font-semibold">
            Попробовать снова
          </button>
        </div>
        
        <!-- Slots Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div 
            v-for="slot in slots" 
            :key="slot.id" 
            class="group relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 backdrop-blur-sm overflow-hidden"
          >
            <!-- Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <!-- Content -->
            <div class="relative z-10 p-6">
              <!-- Slot Image -->
              <div class="relative h-48 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-cyan-500/30 group-hover:border-cyan-400/50 transition-colors duration-300">
                <!-- Image or Placeholder -->
                <div v-if="!slot.image_url && !slot.thumbnail_url" class="w-full h-full flex flex-col items-center justify-center text-center p-4">
                  <div class="text-6xl mb-3 filter drop-shadow-lg animate-pulse group-hover:animate-bounce transition-all duration-300">🎰</div>
                  <div class="text-sm text-cyan-300 font-bold mb-2">{{ slot.name }}</div>
                  <div class="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                </div>
                
                <!-- Real image if available -->
                <img
                  v-else
                  :src="slot.image_url || slot.thumbnail_url"
                  :alt="slot.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  @error="$event.target.style.display = 'none'"
                />
                
                <!-- RTP Badge -->
                <div class="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-cyan-400 font-bold border border-cyan-500/30">
                  {{ slot.rtp || '96' }}%
                </div>
                
                <!-- Hover Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <!-- Slot Title -->
              <h3 class="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors duration-300">
                {{ slot.name || 'Slot Game' }}
              </h3>
              
              <!-- Provider -->
              <p class="text-cyan-400 text-sm font-medium mb-4 flex items-center">
                <span class="mr-2">🏢</span>
                {{ slot.provider?.name || 'Provider' }}
              </p>
              
              <!-- Description -->
              <p class="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed">
                {{ slot.description || 'Захватывающий слот с множеством бонусов и высокими выплатами!' }}
              </p>
              
              <!-- Stats -->
              <div class="flex justify-between items-center mb-6 text-xs">
                <div class="text-center">
                  <div class="text-gray-400 mb-1">Волатильность</div>
                  <div class="font-bold text-cyan-400">{{ slot.volatility || 'Средняя' }}</div>
                </div>
                <div class="text-center">
                  <div class="text-gray-400 mb-1">Макс. выигрыш</div>
                  <div class="font-bold text-green-400">{{ slot.max_win || '5000x' }}</div>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex space-x-3">
                <NuxtLink :to="`/slots/${slot.slug}`" class="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 text-center">
                  📖 Подробнее
                </NuxtLink>
                <button class="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white text-sm font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30">
                  💰 Демо
                </button>
              </div>
            </div>
            
            <!-- Corner Decorations -->
            <div class="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-400/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </section>

      <!-- Statistics Section -->
      <section class="container mx-auto px-4 py-20">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div class="group text-center p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1">
            <div class="text-5xl font-black text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">1000+</div>
            <div class="text-gray-300 font-medium">Игр в коллекции</div>
            <div class="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-3 rounded-full"></div>
          </div>
          <div class="group text-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1">
            <div class="text-5xl font-black text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">50+</div>
            <div class="text-gray-300 font-medium">Провайдеров</div>
            <div class="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-3 rounded-full"></div>
          </div>
          <div class="group text-center p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/20 hover:border-green-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 hover:-translate-y-1">
            <div class="text-5xl font-black text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">24/7</div>
            <div class="text-gray-300 font-medium">Поддержка</div>
            <div class="w-16 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mt-3 rounded-full"></div>
          </div>
          <div class="group text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 hover:border-yellow-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/20 hover:-translate-y-1">
            <div class="text-5xl font-black text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300">98%</div>
            <div class="text-gray-300 font-medium">RTP</div>
            <div class="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mt-3 rounded-full"></div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="container mx-auto px-4 py-20">
        <div class="text-center mb-16">
          <h2 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🚀 Почему выбирают SlotQuest?
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Мы предлагаем лучший игровой опыт с передовыми технологиями и честной игрой
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Feature 1 -->
          <div class="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 backdrop-blur-sm">
            <div class="text-6xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🎰</div>
            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">Огромная коллекция</h3>
            <p class="text-gray-300 leading-relaxed">Более 1000+ слотов от ведущих мировых провайдеров с уникальными механиками и бонусами</p>
            <div class="w-12 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mt-4 rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>
          
          <!-- Feature 2 -->
          <div class="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 hover:border-purple-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 backdrop-blur-sm">
            <div class="text-6xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">💰</div>
            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">Щедрые бонусы</h3>
            <p class="text-gray-300 leading-relaxed">Приветственные бонусы до 100%, ежедневные акции и программа лояльности</p>
            <div class="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mt-4 rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>
          
          <!-- Feature 3 -->
          <div class="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-green-500/20 hover:border-green-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 backdrop-blur-sm">
            <div class="text-6xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">⚡</div>
            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">Мгновенные выплаты</h3>
            <p class="text-gray-300 leading-relaxed">Быстрые и безопасные транзакции с поддержкой всех популярных платежных систем</p>
            <div class="w-12 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mt-4 rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>
          
          <!-- Feature 4 -->
          <div class="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-yellow-500/20 hover:border-yellow-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2 backdrop-blur-sm">
            <div class="text-6xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🏆</div>
            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">Турниры</h3>
            <p class="text-gray-300 leading-relaxed">Участвуйте в еженедельных турнирах и соревнуйтесь за крупные призовые фонды</p>
            <div class="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mt-4 rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>
          
          <!-- Feature 5 -->
          <div class="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-pink-500/20 hover:border-pink-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2 backdrop-blur-sm">
            <div class="text-6xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🔒</div>
            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors duration-300">Безопасность</h3>
            <p class="text-gray-300 leading-relaxed">Лицензированная платформа с SSL-шифрованием и защитой персональных данных</p>
            <div class="w-12 h-1 bg-gradient-to-r from-pink-400 to-red-400 mt-4 rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>
          
          <!-- Feature 6 -->
          <div class="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-blue-500/20 hover:border-blue-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 backdrop-blur-sm">
            <div class="text-6xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">📱</div>
            <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">Мобильная версия</h3>
            <p class="text-gray-300 leading-relaxed">Играйте где угодно с адаптивным дизайном и мобильным приложением</p>
            <div class="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mt-4 rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
      </section>

      <!-- API Test Section -->
      <section class="container mx-auto px-4 py-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🔧 Проверка API
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Проверьте соединение между фронтендом и бекендом
          </p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- API Status -->
            <div class="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-green-500/20 backdrop-blur-sm">
              <div class="text-center">
                <div class="text-6xl mb-4">{{ apiStatus === 'success' ? '✅' : apiStatus === 'error' ? '❌' : '🔄' }}</div>
                <h3 class="text-2xl font-bold text-white mb-4">Статус API</h3>
                <p class="text-gray-300 mb-6">
                  {{ apiStatus === 'success' ? 'API работает корректно' : 
                     apiStatus === 'error' ? 'Ошибка подключения к API' : 
                     'Проверка соединения...' }}
                </p>
                <button 
                  @click="testApi" 
                  :disabled="apiTesting"
                  class="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all transform hover:scale-105 text-lg"
                >
                  {{ apiTesting ? '🔄 Проверка...' : '🔍 Проверить API' }}
                </button>
              </div>
            </div>
            
            <!-- Slots Count -->
            <div class="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-purple-500/20 backdrop-blur-sm">
              <div class="text-center">
                <div class="text-6xl mb-4">🎰</div>
                <h3 class="text-2xl font-bold text-white mb-4">Слоты в базе</h3>
                <div class="text-4xl font-black text-purple-400 mb-4">
                  {{ slots ? slots.length : '0' }}
                </div>
                <p class="text-gray-300 mb-6">
                  {{ slots && slots.length > 0 ? 'Слоты загружены успешно' : 'Нет данных о слотах' }}
                </p>
                <button 
                  @click="refresh()" 
                  :disabled="pending"
                  class="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all transform hover:scale-105 text-lg"
                >
                  {{ pending ? '🔄 Загрузка...' : '🔄 Обновить данные' }}
                </button>
              </div>
            </div>
          </div>
          
          <!-- Debug Info -->
          <div v-if="debugInfo" class="mt-8 p-6 rounded-xl bg-gray-900/50 border border-gray-700">
            <h4 class="text-lg font-bold text-white mb-4">🐛 Отладочная информация</h4>
            <pre class="text-sm text-gray-300 overflow-x-auto">{{ debugInfo }}</pre>
          </div>
        </div>
      </section>

      <!-- Call to Action Section -->
      <section class="container mx-auto px-4 py-32">
        <div class="text-center max-w-5xl mx-auto relative">
          <!-- Background Glow -->
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          
          <div class="relative z-10 p-12 rounded-3xl border border-cyan-500/20 backdrop-blur-sm">
            <h2 class="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🎯 Готовы начать выигрывать?
            </h2>
            <p class="text-2xl text-gray-300 mb-12 leading-relaxed">
              Присоединяйтесь к тысячам игроков, которые уже выиграли миллионы на SlotQuest!
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center">
              <button class="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 overflow-hidden">
                <span class="relative z-10">🚀 Начать играть</span>
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
              <button class="group px-12 py-6 border-2 border-cyan-400/50 text-cyan-400 font-bold rounded-full text-xl transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-xl hover:shadow-cyan-400/30">
                📖 Узнать больше
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer class="relative border-t border-gray-800 bg-black/50 backdrop-blur-sm">
      <div class="container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <!-- Logo and Description -->
          <div class="md:col-span-2">
            <h3 class="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              🎰 SlotQuest
            </h3>
            <p class="text-gray-300 mb-6 max-w-md leading-relaxed text-lg">
              Ведущая платформа онлайн-слотов с лучшими играми, щедрыми бонусами и честной игрой.
            </p>
            <div class="flex space-x-4">
              <div class="group w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12">
                T
              </div>
              <div class="group w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12">
                F
              </div>
              <div class="group w-12 h-12 bg-gradient-to-r from-pink-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12">
                I
              </div>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h4 class="text-xl font-bold text-white mb-6">Быстрые ссылки</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-lg hover:translate-x-2 inline-block">Все игры</a></li>
              <li><a href="#" class="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-lg hover:translate-x-2 inline-block">Новые слоты</a></li>
              <li><a href="#" class="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-lg hover:translate-x-2 inline-block">Популярные</a></li>
              <li><a href="#" class="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-lg hover:translate-x-2 inline-block">Джекпоты</a></li>
            </ul>
          </div>
          
          <!-- Support -->
          <div>
            <h4 class="text-xl font-bold text-white mb-6">Поддержка</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-lg hover:translate-x-2 inline-block">Помощь</a></li>
              <li><a href="#" class="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-lg hover:translate-x-2 inline-block">Контакты</a></li>
              <li><a href="#" class="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-lg hover:translate-x-2 inline-block">Правила</a></li>
              <li><a href="#" class="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-lg hover:translate-x-2 inline-block">Ответственная игра</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-12 pt-8 text-center">
          <p class="text-gray-400 text-lg">
            © 2025 SlotQuest. Все права защищены. | Лицензия №12345 | 18+
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Load slots data from API
const { getSlots } = useSlotsApi()
const { data: slots, pending, error, refresh } = await useLazyAsyncData('all-slots', () => getSlots())

// API testing state
const apiStatus = ref('idle') // 'idle', 'testing', 'success', 'error'
const apiTesting = ref(false)
const debugInfo = ref('')

// Test API connection
const testApi = async () => {
  apiTesting.value = true
  apiStatus.value = 'testing'
  debugInfo.value = ''
  
  try {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiUrl
    
    // Test backend health
    const healthResponse = await $fetch(`${baseURL}/api/health`).catch(() => null)
    
    // Test slots API
    const slotsResponse = await $fetch(`${baseURL}/api/slots`).catch(err => {
      throw new Error(`Slots API error: ${err.message || err}`)
    })
    
    debugInfo.value = JSON.stringify({
      backend_url: baseURL,
      health_check: healthResponse ? 'OK' : 'Failed',
      slots_count: slotsResponse?.data?.length || 0,
      slots_sample: slotsResponse?.data?.slice(0, 2) || [],
      timestamp: new Date().toISOString()
    }, null, 2)
    
    apiStatus.value = 'success'
  } catch (err) {
    console.error('API Test Error:', err)
    debugInfo.value = JSON.stringify({
      error: err.message || err.toString(),
      timestamp: new Date().toISOString()
    }, null, 2)
    apiStatus.value = 'error'
  } finally {
    apiTesting.value = false
  }
}

// Auto-test API on mount
onMounted(() => {
  if (!slots.value || slots.value.length === 0) {
    testApi()
  } else {
    apiStatus.value = 'success'
  }
})

// Watch for slots data changes
watch(slots, (newSlots) => {
  if (newSlots && newSlots.length > 0 && apiStatus.value !== 'success') {
    apiStatus.value = 'success'
  }
})

// Page meta
useHead({
  title: 'SlotQuest - Ultimate Slot Machine Adventure',
  meta: [
    { name: 'description', content: 'Experience the ultimate slot machine adventure with SlotQuest. Spin, win, and compete in tournaments.' }
  ]
})
</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
