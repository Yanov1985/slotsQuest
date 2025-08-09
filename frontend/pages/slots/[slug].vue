<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Навигация -->
    <nav class="bg-white/95 backdrop-blur-sm shadow-lg border-b sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink 
            to="/slots" 
            class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Назад к каталогу слотов
          </NuxtLink>
          
          <!-- Хлебные крошки -->
          <div class="hidden md:flex items-center text-sm text-gray-500">
            <NuxtLink to="/" class="hover:text-blue-600 transition-colors">Главная</NuxtLink>
            <span class="mx-2">/</span>
            <NuxtLink to="/slots" class="hover:text-blue-600 transition-colors">Слоты</NuxtLink>
            <span class="mx-2">/</span>
            <span class="text-gray-800 font-medium" v-if="slot">{{ slot.name }}</span>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Загрузка -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        <p class="mt-6 text-xl text-gray-600">Загрузка слота...</p>
      </div>
    </div>
    
    <!-- Ошибка -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center max-w-md mx-auto px-4">
        <div class="text-red-500 mb-6">
          <svg class="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <h2 class="text-3xl font-bold mb-4 text-gray-800">Слот не найден</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
        </div>
        <NuxtLink 
          to="/slots" 
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-colors font-semibold"
        >
          Перейти к каталогу
        </NuxtLink>
      </div>
    </div>
    
    <!-- Основной контент -->
    <div v-else-if="slot" class="container mx-auto px-4 py-8">
      <!-- Главная секция -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <!-- Изображение и игра -->
          <div class="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-8 lg:p-12">
            <!-- Декоративные элементы -->
            <div class="absolute top-4 right-4 text-white/20 text-6xl">⚡</div>
            <div class="absolute bottom-4 left-4 text-white/10 text-4xl">🏛️</div>
            
            <div class="aspect-video bg-black/20 rounded-xl backdrop-blur-sm border border-white/20 flex items-center justify-center mb-6 relative overflow-hidden">
              <!-- Анимированный фон -->
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
              
              <div class="text-center relative z-10">
                <div class="text-white text-8xl font-bold mb-4 drop-shadow-lg animate-bounce">
                  {{ getSlotIcon(slot.name) }}
                </div>
                <h1 class="text-white text-2xl font-bold drop-shadow-lg mb-2">{{ slot.name }}</h1>
                <p class="text-white/80 text-sm">{{ slot.provider?.name || 'Pragmatic Play' }}</p>
              </div>
              
              <!-- Кнопка Play в центре -->
              <button 
                class="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-all duration-300 group"
                @click="playSlot"
              >
                <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </button>
            </div>
            
            <!-- Кнопки действий -->
            <div class="space-y-4">
              <button 
                class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                @click="playSlot"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Играть бесплатно
              </button>
              <button 
                class="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                @click="playForReal"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
                Играть на деньги
              </button>
              
              <!-- Дополнительные кнопки -->
              <div class="grid grid-cols-2 gap-3">
                <button class="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors backdrop-blur-sm border border-white/20">
                  📱 Мобильная версия
                </button>
                <button class="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors backdrop-blur-sm border border-white/20">
                  🎁 Бонус x100
                </button>
              </div>
            </div>
          </div>
          
          <!-- Информация о слоте -->
          <div class="p-8 lg:p-12">
            <div class="mb-6">
              <div class="flex items-center gap-3 mb-4 flex-wrap">
                <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {{ slot.provider?.name || 'Pragmatic Play' }}
                </span>
                <span class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {{ slot.category?.name || 'Видеослоты' }}
                </span>
                <span class="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  🔥 ТОП-12
                </span>
              </div>
              
              <h1 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">{{ slot.name }}</h1>
              
              <div class="flex items-center gap-4 mb-4 flex-wrap">
                <div class="flex text-yellow-400">
                  <svg v-for="n in 5" :key="n" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <span class="text-gray-600 font-medium">4.8/5</span>
                <span class="text-gray-400">•</span>
                <span class="text-gray-600 font-medium">1,247 отзывов</span>
                <span class="text-gray-400">•</span>
                <span class="text-green-600 font-semibold">2M+ игроков/мес</span>
              </div>
              
              <!-- Краткое описание -->
              <p class="text-gray-600 text-lg leading-relaxed mb-6">
                {{ getShortDescription(slot) }}
              </p>
            </div>
            
            <!-- Статистика -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 class="font-semibold text-green-800">RTP</h4>
                </div>
                <p class="text-2xl font-bold text-green-600">{{ slot.rtp || '96.50' }}%</p>
                <p class="text-xs text-green-700 mt-1">Отдача игроку</p>
              </div>
              
              <div class="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200 hover:shadow-lg transition-shadow">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h4 class="font-semibold text-orange-800">Волатильность</h4>
                </div>
                <p class="text-lg font-bold text-orange-600 capitalize">{{ getVolatilityText(slot.volatility) }}</p>
                <p class="text-xs text-orange-700 mt-1">Риск/награда</p>
              </div>
              
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                  <h4 class="font-semibold text-blue-800">Мин. ставка</h4>
                </div>
                <p class="text-lg font-bold text-blue-600">{{ slot.min_bet || '€0.20' }}</p>
                <p class="text-xs text-blue-700 mt-1">За спин</p>
              </div>
              
              <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                  </div>
                  <h4 class="font-semibold text-purple-800">Макс. выигрыш</h4>
                </div>
                <p class="text-lg font-bold text-purple-600">{{ getMaxWin(slot) }}</p>
                <p class="text-xs text-purple-700 mt-1">От ставки</p>
              </div>
            </div>
            
            <!-- Дополнительная статистика -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 class="font-semibold text-gray-800 mb-2">Поле игры</h4>
                <p class="text-lg font-bold text-gray-600">6×5</p>
                <p class="text-xs text-gray-500">30 позиций</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 class="font-semibold text-gray-800 mb-2">Линии выплат</h4>
                <p class="text-lg font-bold text-gray-600">Scatter Pays</p>
                <p class="text-xs text-gray-500">8+ символов</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 class="font-semibold text-gray-800 mb-2">Дата выхода</h4>
                <p class="text-lg font-bold text-gray-600">13.02.2021</p>
                <p class="text-xs text-gray-500">4 года назад</p>
              </div>
            </div>
            
            <!-- Популярность -->
            <div class="bg-gray-50 p-4 rounded-xl">
              <h4 class="font-semibold text-gray-800 mb-3">Популярность слота</h4>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Рейтинг популярности</span>
                  <span class="font-semibold">#12 из 2000+</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style="width: 94%"></div>
                </div>
                <div class="text-xs text-gray-600">Один из самых популярных слотов 2024 года</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Обзор игры -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">{{ slot.name }} - Обзор слота 2025</h2>
        </div>
        
        <div class="prose max-w-none">
          <p class="text-lg text-gray-700 leading-relaxed mb-4">
            {{ getSlotDescription(slot) }}
          </p>
          <p class="text-gray-700 leading-relaxed mb-6">
            {{ getDetailedDescription(slot) }}
          </p>
          
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border-l-4 border-amber-400 mb-6">
            <h3 class="font-semibold text-amber-800 mb-3">🎯 Ключевые особенности:</h3>
            <ul class="text-amber-700 space-y-2">
              <li>• Механика Tumble с каскадными выигрышами</li>
              <li>• Случайные множители от x2 до x500</li>
              <li>• Бонусная игра с 15 бесплатными спинами</li>
              <li>• Возможность купить бонус за 100x ставки</li>
              <li>• Максимальный выигрыш до 5000x от ставки</li>
            </ul>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 class="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <span class="text-xl">🎮</span> Геймплей
              </h4>
              <p class="text-blue-700">Слот использует систему Scatter Pays, где выигрыши формируются при появлении 8 или более одинаковых символов в любом месте игрового поля.</p>
            </div>
            
            <div class="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h4 class="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <span class="text-xl">💎</span> Символы
              </h4>
              <p class="text-purple-700">Высокооплачиваемые символы включают драгоценные камни разных цветов, а Зевс выступает в роли scatter-символа.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Статистика популярности -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Насколько популярен {{ slot.name }}?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
            <div class="text-3xl font-bold text-blue-600 mb-2">#12</div>
            <div class="text-sm text-gray-600">Рейтинг 2024</div>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
            <div class="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
            <div class="text-sm text-gray-600">Пользовательский рейтинг</div>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <div class="text-3xl font-bold text-purple-600 mb-2">2M+</div>
            <div class="text-sm text-gray-600">Игроков в месяц</div>
          </div>
        </div>
        
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-yellow-800 font-medium">
            🏆 {{ slot.name }} удерживает топовые позиции в рейтингах уже несколько лет подряд, что подтверждает его исключительное качество и увлекательность геймплея.
          </p>
        </div>
      </div>

      <!-- Особенности игры -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Особенности {{ slot.name }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
            <div class="text-purple-600 text-3xl mb-3">⚡</div>
            <h3 class="font-bold text-lg mb-2">Scatter Pays</h3>
            <p class="text-gray-600 text-sm">Выигрыши начисляются за 8+ одинаковых символов в любом месте поля</p>
          </div>
          
          <div class="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div class="text-green-600 text-3xl mb-3">🌊</div>
            <h3 class="font-bold text-lg mb-2">Каскадные выигрыши</h3>
            <p class="text-gray-600 text-sm">Бесконечные каскады с удалением выигрышных символов</p>
          </div>
          
          <div class="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <div class="text-yellow-600 text-3xl mb-3">✨</div>
            <h3 class="font-bold text-lg mb-2">Множители до x500</h3>
            <p class="text-gray-600 text-sm">Цветные сферы с множителями от x2 до x500</p>
          </div>
        </div>
      </div>

      <!-- Бонусные функции -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">Бонусные функции</h2>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <span class="text-2xl">🎰</span>
              </div>
              <h3 class="text-xl font-semibold text-purple-800">Бесплатные спины</h3>
            </div>
            <p class="text-purple-700 mb-4">Получите 15 бесплатных спинов при выпадении 4 или более scatter-символов Зевса.</p>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-purple-600 text-sm">Увеличенные множители до x500</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-purple-600 text-sm">Возможность повторного запуска</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-purple-600 text-sm">Дополнительные wild-символы</span>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span class="text-2xl">⚡</span>
              </div>
              <h3 class="text-xl font-semibold text-blue-800">Множители</h3>
            </div>
            <p class="text-blue-700 mb-4">Случайные множители могут появляться в любой момент игры, значительно увеличивая выигрыши.</p>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-blue-600 text-sm">От x2 до x500</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-blue-600 text-sm">Применяются к общему выигрышу</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-blue-600 text-sm">Могут складываться между собой</span>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                <span class="text-2xl">🛒</span>
              </div>
              <h3 class="text-xl font-semibold text-amber-800">Покупка бонуса</h3>
            </div>
            <p class="text-amber-700 mb-4">Не хотите ждать? Купите бонусную игру прямо сейчас за 100x от текущей ставки.</p>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span class="text-amber-600 text-sm">Гарантированные 15 фриспинов</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span class="text-amber-600 text-sm">Повышенные шансы на крупный выигрыш</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span class="text-amber-600 text-sm">Доступно в любой момент</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Механика Tumble -->
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span class="text-xl">🌊</span>
            </div>
            <h3 class="text-xl font-semibold text-green-800">Механика Tumble</h3>
          </div>
          <p class="text-green-700 mb-4">После каждого выигрыша выигрышные символы исчезают, а новые символы падают сверху, создавая возможности для цепочек выигрышей.</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span class="text-2xl">1️⃣</span>
              </div>
              <p class="text-sm text-green-600">Выигрышные символы исчезают</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span class="text-2xl">2️⃣</span>
              </div>
              <p class="text-sm text-green-600">Новые символы падают вниз</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span class="text-2xl">3️⃣</span>
              </div>
              <p class="text-sm text-green-600">Процесс повторяется</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Стратегии и советы -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Стратегии и советы</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-green-600">✅ Рекомендации</h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Используйте Ante Bet для увеличения частоты бонусов</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Играйте длинными сессиями для максимальной отдачи</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Покупка бонуса оправдана при большом банкролле</span>
              </li>
            </ul>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-red-600">❌ Чего избегать</h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Не превышайте 5% банкролла за спин</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Избегайте погони за проигрышами</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Не покупайте бонус при малом банкролле</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Таблица выплат -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">Таблица выплат</h2>
        </div>
        
        <div class="mb-6">
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p class="text-amber-800 font-medium">💡 Выигрыши формируются при появлении 8 или более одинаковых символов в любом месте игрового поля</p>
          </div>
        </div>
        
        <!-- Высокооплачиваемые символы -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-2xl">💎</span> Высокооплачиваемые символы
          </h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl">💎</div>
                <div>
                  <h4 class="font-bold text-red-800">Кубок (Премиум)</h4>
                  <p class="text-red-600 text-sm">Самый ценный символ</p>
                </div>
              </div>
              <div class="grid grid-cols-5 gap-2 text-center">
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">8x</div>
                  <div class="font-bold text-red-600">50x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">9x</div>
                  <div class="font-bold text-red-600">25x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">10x</div>
                  <div class="font-bold text-red-600">15x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">11x</div>
                  <div class="font-bold text-red-600">10x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">12+</div>
                  <div class="font-bold text-red-600">5x</div>
                </div>
              </div>
            </div>
            
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl">⚱️</div>
                <div>
                  <h4 class="font-bold text-blue-800">Амфора</h4>
                  <p class="text-blue-600 text-sm">Высокая ценность</p>
                </div>
              </div>
              <div class="grid grid-cols-5 gap-2 text-center">
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">8x</div>
                  <div class="font-bold text-blue-600">25x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">9x</div>
                  <div class="font-bold text-blue-600">12x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">10x</div>
                  <div class="font-bold text-blue-600">8x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">11x</div>
                  <div class="font-bold text-blue-600">5x</div>
                </div>
                <div class="bg-white p-2 rounded">
                  <div class="text-xs text-gray-600">12+</div>
                  <div class="font-bold text-blue-600">2.5x</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Среднеоплачиваемые символы -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-2xl">💰</span> Среднеоплачиваемые символы
          </h3>
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-2xl">💍</div>
              <div>
                <h4 class="font-bold text-purple-800">Кольцо</h4>
                <p class="text-purple-600 text-sm">Базовая ценность</p>
              </div>
            </div>
            <div class="grid grid-cols-5 gap-2 text-center">
              <div class="bg-white p-2 rounded">
                <div class="text-xs text-gray-600">8x</div>
                <div class="font-bold text-purple-600">10x</div>
              </div>
              <div class="bg-white p-2 rounded">
                <div class="text-xs text-gray-600">9x</div>
                <div class="font-bold text-purple-600">5x</div>
              </div>
              <div class="bg-white p-2 rounded">
                <div class="text-xs text-gray-600">10x</div>
                <div class="font-bold text-purple-600">3x</div>
              </div>
              <div class="bg-white p-2 rounded">
                <div class="text-xs text-gray-600">11x</div>
                <div class="font-bold text-purple-600">2x</div>
              </div>
              <div class="bg-white p-2 rounded">
                <div class="text-xs text-gray-600">12+</div>
                <div class="font-bold text-purple-600">1x</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Специальные символы -->
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-2xl">⚡</span> Специальные символы
          </h3>
          <div class="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-2xl">⚡</div>
              <div>
                <h4 class="font-bold text-yellow-800">Зевс (Scatter)</h4>
                <p class="text-yellow-600 text-sm">Активирует бонусную игру</p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white p-4 rounded-lg text-center">
                <div class="text-2xl mb-2">4️⃣</div>
                <div class="font-bold text-yellow-600">15 фриспинов</div>
                <div class="text-xs text-gray-600">+ выплата 3x</div>
              </div>
              <div class="bg-white p-4 rounded-lg text-center">
                <div class="text-2xl mb-2">5️⃣</div>
                <div class="font-bold text-yellow-600">15 фриспинов</div>
                <div class="text-xs text-gray-600">+ выплата 5x</div>
              </div>
              <div class="bg-white p-4 rounded-lg text-center">
                <div class="text-2xl mb-2">6️⃣</div>
                <div class="font-bold text-yellow-600">15 фриспинов</div>
                <div class="text-xs text-gray-600">+ выплата 10x</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Технические характеристики -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">Технические характеристики</h2>
        </div>
        
        <!-- Основная информация -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-2xl">🎮</span> Основная информация
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 class="font-bold text-purple-800">Провайдер</h4>
              </div>
              <p class="text-purple-600 font-semibold text-lg">Pragmatic Play</p>
              <p class="text-purple-500 text-sm mt-1">Лидер индустрии</p>
            </div>
            
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <h4 class="font-bold text-green-800">Дата выпуска</h4>
              </div>
              <p class="text-green-600 font-semibold text-lg">13 февраля 2021</p>
              <p class="text-green-500 text-sm mt-1">Популярный релиз</p>
            </div>
            
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                </div>
                <h4 class="font-bold text-blue-800">Тип игры</h4>
              </div>
              <p class="text-blue-600 font-semibold text-lg">Видеослот</p>
              <p class="text-blue-500 text-sm mt-1">Современный формат</p>
            </div>
          </div>
        </div>
        
        <!-- Игровые параметры -->
        <div class="mb-8">
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-2xl">⚙️</span> Игровые параметры
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">6x5</div>
                <h4 class="font-bold text-orange-800">Поле игры</h4>
              </div>
              <p class="text-orange-600 font-semibold text-lg">6 x 5</p>
              <p class="text-orange-500 text-sm mt-1">Расширенное поле</p>
            </div>
            
            <div class="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <h4 class="font-bold text-teal-800">Линии выплат</h4>
              </div>
              <p class="text-teal-600 font-semibold text-lg">Scatter Pays</p>
              <p class="text-teal-500 text-sm mt-1">Кластерные выплаты</p>
            </div>
            
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
                  </svg>
                </div>
                <h4 class="font-bold text-indigo-800">Диапазон ставок</h4>
              </div>
              <p class="text-indigo-600 font-semibold text-lg">€0.20 - €100</p>
              <p class="text-indigo-500 text-sm mt-1">Широкий диапазон</p>
            </div>
            
            <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <h4 class="font-bold text-yellow-800">Макс. выигрыш</h4>
              </div>
              <p class="text-yellow-600 font-semibold text-lg">5,000x</p>
              <p class="text-yellow-500 text-sm mt-1">Высокий потенциал</p>
            </div>
          </div>
        </div>
        
        <!-- Дополнительные возможности -->
        <div>
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-2xl">📱</span> Дополнительные возможности
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
                <h4 class="font-bold text-green-800">Мобильная версия</h4>
              </div>
              <p class="text-green-600 font-semibold text-lg">✅ Доступна</p>
              <p class="text-green-500 text-sm mt-1">iOS и Android</p>
            </div>
            
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <h4 class="font-bold text-purple-800">Автоигра</h4>
              </div>
              <p class="text-purple-600 font-semibold text-lg">✅ Поддерживается</p>
              <p class="text-purple-500 text-sm mt-1">До 1000 спинов</p>
            </div>
            
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <h4 class="font-bold text-blue-800">Турбо режим</h4>
              </div>
              <p class="text-blue-600 font-semibold text-lg">✅ Быстрая игра</p>
              <p class="text-blue-500 text-sm mt-1">Ускоренные спины</p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">Часто задаваемые вопросы</h2>
        </div>
        
        <div class="space-y-4">
          <details class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
            <summary class="p-6 cursor-pointer font-semibold text-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 flex items-center justify-between">
              <span class="flex items-center gap-3">
                <span class="text-2xl">🎮</span>
                Можно ли играть в {{ slot.name }} бесплатно?
              </span>
              <svg class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <div class="p-6 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-gray-700 font-medium mb-2">Да, абсолютно бесплатно!</p>
                  <p class="text-gray-600">Вы можете играть в демо-версию слота без регистрации и депозита. Это отличный способ изучить механику игры и бонусные функции перед игрой на реальные деньги.</p>
                </div>
              </div>
            </div>
          </details>
          
          <details class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
            <summary class="p-6 cursor-pointer font-semibold text-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 flex items-center justify-between">
              <span class="flex items-center gap-3">
                <span class="text-2xl">💰</span>
                Какова максимальная выплата в {{ slot.name }}?
              </span>
              <svg class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <div class="p-6 border-t border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-gray-700 font-medium mb-2">Максимальная выплата: <span class="text-yellow-600 font-bold">5,000x</span> от ставки</p>
                  <p class="text-gray-600 mb-2">Это означает, что при ставке €100 вы можете выиграть до €500,000!</p>
                  <p class="text-gray-500 text-sm">⚠️ Такие выигрыши случаются крайне редко - примерно 1 раз в 697,350 спинов</p>
                </div>
              </div>
            </div>
          </details>
          
          <details class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
            <summary class="p-6 cursor-pointer font-semibold text-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 flex items-center justify-between">
              <span class="flex items-center gap-3">
                <span class="text-2xl">🛒</span>
                Стоит ли покупать бонусные спины?
              </span>
              <svg class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <div class="p-6 border-t border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-gray-700 font-medium mb-2">Покупка бонуса стоит <span class="text-purple-600 font-bold">100x</span> от ставки</p>
                  <div class="space-y-2 text-gray-600">
                    <p>✅ <strong>Плюсы:</strong> Гарантированный доступ к бонусной игре с множителями</p>
                    <p>❌ <strong>Минусы:</strong> Высокая стоимость и нет гарантии большого выигрыша</p>
                    <p class="text-purple-600 font-medium">💡 <strong>Совет:</strong> Покупайте бонус только при достаточном банкролле и помните о высокой волатильности</p>
                  </div>
                </div>
              </div>
            </div>
          </details>
          
          <details class="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
            <summary class="p-6 cursor-pointer font-semibold text-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 flex items-center justify-between">
              <span class="flex items-center gap-3">
                <span class="text-2xl">📱</span>
                Работает ли слот на мобильных устройствах?
              </span>
              <svg class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>
            <div class="p-6 border-t border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-gray-700 font-medium mb-2">Да, полностью оптимизирован!</p>
                  <div class="space-y-1 text-gray-600">
                    <p>📱 Поддерживает iOS и Android</p>
                    <p>🌐 Работает в браузере без установки приложений</p>
                    <p>🎮 Сохраняет все функции и качество графики</p>
                    <p>⚡ Быстрая загрузка и плавная анимация</p>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>

      <!-- Отзывы игроков -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">Отзывы игроков</h2>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <!-- Статистика отзывов -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Общая оценка</h3>
            <div class="flex items-center gap-4 mb-4">
              <div class="text-4xl font-bold text-blue-600">4.3</div>
              <div>
                <div class="flex text-yellow-400 text-xl mb-1">
                  ★★★★☆
                </div>
                <p class="text-gray-600 text-sm">Основано на 1,247 отзывах</p>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-600 w-8">5★</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-yellow-400 h-2 rounded-full" style="width: 45%"></div>
                </div>
                <span class="text-sm text-gray-600 w-8">45%</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-600 w-8">4★</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-yellow-400 h-2 rounded-full" style="width: 30%"></div>
                </div>
                <span class="text-sm text-gray-600 w-8">30%</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-600 w-8">3★</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-yellow-400 h-2 rounded-full" style="width: 15%"></div>
                </div>
                <span class="text-sm text-gray-600 w-8">15%</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-600 w-8">2★</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-gray-300 h-2 rounded-full" style="width: 7%"></div>
                </div>
                <span class="text-sm text-gray-600 w-8">7%</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-600 w-8">1★</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div class="bg-gray-300 h-2 rounded-full" style="width: 3%"></div>
                </div>
                <span class="text-sm text-gray-600 w-8">3%</span>
              </div>
            </div>
          </div>
          
          <!-- Ключевые моменты -->
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Что говорят игроки</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-700">Отличная графика и анимация</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-700">Захватывающие бонусные раунды</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-700">Хорошие выплаты в бонусах</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-gray-700">Высокая волатильность</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-500">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                А
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="font-semibold text-gray-800">Александр К.</h4>
                  <div class="flex text-yellow-400">
                    <svg v-for="n in 5" :key="n" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-500">2 дня назад</span>
                </div>
                <p class="text-gray-700 mb-3">
                  "Отличный слот! Множители действительно могут дать хорошие выигрыши. Играю уже полгода, очень доволен. Особенно нравится механика каскадных выигрышей."
                </p>
                <div class="flex items-center gap-4 text-sm text-gray-600">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                    </svg>
                    24
                  </span>
                  <span>Полезно</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                М
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="font-semibold text-gray-800">Мария В.</h4>
                  <div class="flex text-yellow-400">
                    <svg v-for="n in 4" :key="n" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-500">1 неделю назад</span>
                </div>
                <p class="text-gray-700 mb-3">
                  "Графика потрясающая, геймплей затягивает. Единственный минус - высокая волатильность, нужен терпеливый подход. Но когда заходит - выигрыши приличные!"
                </p>
                <div class="flex items-center gap-4 text-sm text-gray-600">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                    </svg>
                    18
                  </span>
                  <span>Полезно</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                Д
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="font-semibold text-gray-800">Дмитрий С.</h4>
                  <div class="flex text-yellow-400">
                    <svg v-for="n in 5" :key="n" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="text-sm text-gray-500">3 дня назад</span>
                </div>
                <p class="text-gray-700 mb-3">
                  "Один из лучших слотов от Pragmatic Play! Выиграл 2,500x на бонусе - эмоции зашкаливали! Графика на высоте, звук отличный. Единственный минус - долго ждать бонусы иногда."
                </p>
                <div class="flex items-center gap-4 text-sm text-gray-600">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                    </svg>
                    31
                  </span>
                  <span>Полезно</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <button class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Показать все отзывы
          </button>
        </div>
      </div>

      <!-- Профессиональная оценка -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">Профессиональная оценка</h2>
        </div>
        
        <!-- Общая оценка -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
              <div class="text-5xl font-bold text-blue-600">8.5</div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800">Общая оценка</h3>
                <div class="flex text-yellow-400 text-xl">
                  ★★★★☆
                </div>
                <p class="text-gray-600">Один из лучших высоковолатильных слотов</p>
              </div>
            </div>
            <div class="text-right">
              <div class="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">
                Рекомендуем
              </div>
            </div>
          </div>
        </div>
        
        <!-- Детальные рейтинги -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Рейтинги по категориям</h3>
            
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Графика и дизайн</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width: 95%"></div>
                  </div>
                  <span class="text-sm font-semibold text-gray-700 w-8">9.5</span>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Геймплей</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: 90%"></div>
                  </div>
                  <span class="text-sm font-semibold text-gray-700 w-8">9.0</span>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Потенциал выигрыша</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 bg-gray-200 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: 85%"></div>
                  </div>
                  <span class="text-sm font-semibold text-gray-700 w-8">8.5</span>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Бонусные функции</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 bg-gray-200 rounded-full h-2">
                    <div class="bg-yellow-500 h-2 rounded-full" style="width: 80%"></div>
                  </div>
                  <span class="text-sm font-semibold text-gray-700 w-8">8.0</span>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Мобильная версия</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width: 90%"></div>
                  </div>
                  <span class="text-sm font-semibold text-gray-700 w-8">9.0</span>
                </div>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-gray-700">Частота выплат</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 bg-gray-200 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: 65%"></div>
                  </div>
                  <span class="text-sm font-semibold text-gray-700 w-8">6.5</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Экспертное мнение</h3>
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-4">
              <div class="flex items-start gap-3">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  Э
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">Эксперт SlotQuest</h4>
                  <p class="text-sm text-gray-600 mb-2">Специалист по слотам</p>
                  <p class="text-gray-700 text-sm leading-relaxed">
                    "Gates of Olympus - это шедевр от Pragmatic Play. Механика Scatter Pays революционна, а потенциал выигрыша в 5,000x делает каждый спин захватывающим. Рекомендую для опытных игроков."
                  </p>
                </div>
              </div>
            </div>
            
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-start gap-2">
                <svg class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                <div>
                  <h4 class="font-semibold text-yellow-800 text-sm">Важное предупреждение</h4>
                  <p class="text-yellow-700 text-sm mt-1">
                    Высокая волатильность требует большого банкролла и терпения. Не подходит для новичков.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              Преимущества
            </h3>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Революционная механика Scatter Pays</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Высокий потенциал выигрыша (x5,000)</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Захватывающие каскадные выигрыши</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Возможность покупки бонуса</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Превосходная графика и анимация</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Отличная мобильная оптимизация</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              Недостатки
            </h3>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Очень высокая волатильность</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Длительные периоды без выигрышей</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Дорогая покупка бонуса (100x ставки)</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Может быстро истощить банкролл</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Не подходит для консервативных игроков</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-500 mt-1">•</span>
                <span>Редкие бонусные раунды</span>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Итоговая рекомендация -->
        <div class="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 class="text-xl font-semibold mb-3">Итоговая рекомендация</h3>
          <p class="text-blue-100 leading-relaxed">
            Gates of Olympus - это выдающийся слот для опытных игроков, которые ценят инновационную механику и готовы к высокой волатильности ради потенциала больших выигрышей. Новичкам рекомендуем начать с менее волатильных слотов.
          </p>
        </div>
      </div>

      <!-- Заключение -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-800">Заключение</h2>
        </div>
        
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Итоговая оценка {{ slot.name }}</h3>
          <p class="text-lg text-gray-700 leading-relaxed mb-4">
            {{ slot.name }} заслуженно считается одним из лучших слотов от Pragmatic Play. Сочетание инновационной механики Scatter Pays, высокого потенциала выигрыша до x5,000 и превосходной графики делают его обязательным для всех любителей азартных игр.
          </p>
          <p class="text-gray-700 leading-relaxed">
            Революционная система выплат, где выигрыши начисляются за 8+ одинаковых символов в любом месте экрана, открывает новые горизонты в мире видеослотов. Каскадные выигрыши и множители создают уникальную атмосферу постоянного ожидания больших выплат.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 class="font-semibold text-green-800 mb-2 flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              Кому подходит
            </h4>
            <ul class="text-green-700 text-sm space-y-1">
              <li>• Опытным игрокам</li>
              <li>• Любителям высокой волатильности</li>
              <li>• Игрокам с большим банкроллом</li>
              <li>• Поклонникам инноваций</li>
            </ul>
          </div>
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 class="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              Важно помнить
            </h4>
            <ul class="text-yellow-700 text-sm space-y-1">
              <li>• Высокая волатильность</li>
              <li>• Нужен большой банкролл</li>
              <li>• Играйте ответственно</li>
              <li>• Устанавливайте лимиты</li>
            </ul>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <h3 class="text-lg font-semibold mb-2">Финальный вердикт</h3>
          <p class="text-purple-100 leading-relaxed">
            Gates of Olympus - это не просто слот, это новая эра в мире азартных игр. Если вы готовы к вызову и хотите испытать настоящий адреналин от игры, этот слот создан именно для вас. Помните: играйте ответственно и наслаждайтесь процессом!
          </p>
        </div>
      </div>

      <!-- Призыв к действию -->
      <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
        <!-- Декоративные элементы -->
        <div class="absolute top-0 left-0 w-full h-full opacity-10">
          <div class="absolute top-4 left-4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
          <div class="absolute top-8 right-8 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
          <div class="absolute bottom-4 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse" style="animation-delay: 1s"></div>
          <div class="absolute bottom-8 right-1/4 w-6 h-6 bg-yellow-300 rounded-full animate-bounce" style="animation-delay: 0.5s"></div>
        </div>
        
        <div class="relative z-10">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <span class="text-2xl">⚡</span>
            </div>
            <h2 class="text-4xl font-bold">Готовы испытать силу Олимпа?</h2>
          </div>
          
          <p class="text-xl mb-2 opacity-90">
            Окунитесь в мир древнегреческих богов и испытайте удачу в {{ slot.name }}
          </p>
          <p class="text-lg mb-8 opacity-80">
            Потенциал выигрыша до <span class="font-bold text-yellow-300">x5,000</span> ждёт вас!
          </p>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div class="text-2xl mb-2">🎰</div>
              <h3 class="font-semibold mb-1">Бесплатная игра</h3>
              <p class="text-sm opacity-80">Изучите механику без риска</p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div class="text-2xl mb-2">💰</div>
              <h3 class="font-semibold mb-1">Игра на деньги</h3>
              <p class="text-sm opacity-80">Реальные выигрыши ждут вас</p>
            </div>
            
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:col-span-2 lg:col-span-1">
              <div class="text-2xl mb-2">🎁</div>
              <h3 class="font-semibold mb-1">Бонусы казино</h3>
              <p class="text-sm opacity-80">Получите дополнительные средства</p>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              class="group bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
              @click="playSlot"
            >
              <span class="text-2xl group-hover:animate-spin">🎰</span>
              <span>Играть бесплатно</span>
            </button>
            
            <button 
              class="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
              @click="playForReal"
            >
              <span class="text-2xl group-hover:animate-bounce">💰</span>
              <span>Играть на деньги</span>
            </button>
            
            <button 
              class="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
              @click="findCasino"
            >
              <span class="text-2xl group-hover:animate-pulse">🎁</span>
              <span>Найти казино</span>
            </button>
          </div>
          
          <div class="mt-6 flex items-center justify-center gap-6 text-sm opacity-75">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span>Лицензированные казино</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
              </svg>
              <span>Безопасные платежи</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
              </svg>
              <span>Мобильная версия</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Похожие слоты -->
      <div v-if="similarSlots.length > 0" class="mt-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Похожие слоты</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="similarSlot in similarSlots" 
            :key="similarSlot.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span class="text-white text-3xl font-bold">{{ similarSlot.name.charAt(0) }}</span>
            </div>
            
            <div class="p-6">
              <h3 class="font-bold text-xl mb-2 text-gray-800">{{ similarSlot.name }}</h3>
              <p class="text-gray-600 mb-3">{{ similarSlot.provider?.name }}</p>
              <div class="flex justify-between items-center mb-4">
                <span class="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  RTP: {{ similarSlot.rtp }}%
                </span>
                <span class="text-sm text-gray-500 capitalize">{{ similarSlot.volatility }}</span>
              </div>
              
              <NuxtLink 
                :to="`/slots/${similarSlot.slug}`"
                class="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-center py-3 px-4 rounded-lg transition-all duration-200 font-semibold"
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
    
    // API возвращает объект с полем data, содержащим массив слотов
    const slotsData = slotsResponse.data || slotsResponse
    allSlots.value = slotsData
    
    // Ищем слот по slug
    const foundSlot = slotsData.find(s => s.slug === slug)
    
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

const playForReal = () => {
  // Здесь будет логика перехода к игре на деньги
  alert(`Переход к игре на деньги: ${slot.value.name}`)
}

const findCasino = () => {
  // Здесь будет логика поиска казино с бонусами
  alert(`Поиск лучших казино для игры в ${slot.value.name}`)
}

const getSlotIcon = (name) => {
  if (name.toLowerCase().includes('gates of olympus') || name.toLowerCase().includes('олимп')) {
    return '⚡'
  }
  return '🎰'
}

const getVolatilityText = (volatility) => {
  if (!volatility) return 'Высокая'
  
  const vol = volatility.toLowerCase()
  if (vol.includes('high') || vol === 'высокая') return 'Высокая'
  if (vol.includes('medium') || vol === 'средняя') return 'Средняя'
  if (vol.includes('low') || vol === 'низкая') return 'Низкая'
  return volatility
}

const getMaxWin = (slot) => {
  if (slot.name.toLowerCase().includes('gates of olympus')) {
    return 'x5,000'
  }
  return slot.max_win || 'x1,000'
}

const getSlotDescription = (slot) => {
  if (slot.name.toLowerCase().includes('gates of olympus')) {
    return `${slot.name} - это революционный слот от Pragmatic Play, который перевернул представление о видеослотах. Игра с полем 6x5 и системой Scatter Pays предлагает уникальный геймплей, где выигрыши начисляются за 8+ одинаковых символов в любом месте экрана.`
  }
  return `${slot.name} - увлекательный видеослот от ${slot.provider?.name || 'известного провайдера'}, который предлагает захватывающий геймплей и отличные возможности для выигрыша.`
}

const getShortDescription = (slot) => {
  if (slot.name.toLowerCase().includes('gates of olympus')) {
    return 'Легендарный слот от Pragmatic Play с уникальной механикой Scatter Pays и множителями до x500. Окунитесь в мир древнегреческих богов и сражайтесь за джекпот до x5,000 от ставки!'
  }
  if (slot.name.toLowerCase().includes('book of dead')) {
    return 'Культовый слот от Play\'n GO о приключениях археолога Рича Уайлда в Древнем Египте. Бонусная игра с расширяющимися символами может принести выигрыш до x5,000!'
  }
  if (slot.name.toLowerCase().includes('sweet bonanza')) {
    return 'Яркий и сладкий слот от Pragmatic Play с каскадными выигрышами и бонусными множителями. Соберите 4+ леденца для активации бесплатных вращений!'
  }
  return `Захватывающий видеослот от ${slot.provider?.name || 'ведущего провайдера'} с отличными возможностями для выигрыша и увлекательным геймплеем.`
}

const getDetailedDescription = (slot) => {
  if (slot.name.toLowerCase().includes('gates of olympus')) {
    return 'Главная особенность слота - множители от x2 до x500, которые появляются случайным образом и могут значительно увеличить ваши выигрыши. В бонусной игре действует система Total Multiplier, где все множители суммируются и не сбрасываются между спинами, что может привести к феноменальным выплатам.'
  }
  return `Этот слот отличается высококачественной графикой, продуманной механикой и отличным балансом между частотой выигрышей и их размером. RTP составляет ${slot.rtp || '96'}%, что делает игру привлекательной для большинства игроков.`
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