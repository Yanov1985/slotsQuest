<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white font-sans">
    <!-- Header -->
    <header class="relative bg-[#161A21]/80 backdrop-blur-sm border-b border-[#353A4A] sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="flex items-center space-x-2 text-[#A0AABE] hover:text-[#FF6E48] transition-colors">
              <Icon name="heroicons:arrow-left" class="text-xl" />
              <span>Назад к дашборду</span>
            </NuxtLink>
            <div class="h-6 w-px bg-[#353A4A]"></div>

            <div class="px-3 py-1 bg-[#63F3AB]/10 border border-[#63F3AB]/20 rounded-full text-[#63F3AB] text-sm font-medium">
              {{ totalSlots }} слотов
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <!-- Add Slot Button -->
            <button 
              @click="showAddModal = true" 
              class="group relative flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#CD5A3C] hover:to-[#FF6E48] text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-xl hover:shadow-[#FF6E48]/30"
            >
              <Icon name="heroicons:plus-circle" class="w-5 h-5" />
              <span>Добавить слот</span>
              <div class="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
            
            <!-- Refresh Button -->
            <button 
              @click="refreshSlots" 
              class="group relative flex items-center space-x-2 px-5 py-3 bg-[#161A21] border-2 border-[#353A4A] hover:border-[#6366F1] hover:bg-[#1B1E26] text-[#A0AABE] hover:text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              <Icon name="heroicons:arrow-path" class="w-4 h-4" />
              <span>Обновить</span>
              <div class="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-r from-[#FF6E48]/10 to-[#CD5A3C]/10 border border-[#FF6E48]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#FF6E48] text-sm font-semibold">Всего слотов</p>
              <p class="text-3xl font-bold text-white">{{ totalSlots }}</p>
            </div>
            <Icon name="heroicons:squares-2x2" class="text-[#FF6E48] text-3xl" />
          </div>
        </div>
        <div class="bg-gradient-to-r from-[#CD0F8B]/10 to-[#CD0F8B]/10 border border-[#CD0F8B]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#CD0F8B] text-sm font-semibold">Провайдеров</p>
              <p class="text-3xl font-bold text-white">{{ totalProviders }}</p>
            </div>
            <Icon name="heroicons:building-office" class="text-[#CD0F8B] text-3xl" />
          </div>
        </div>
        <div class="bg-gradient-to-r from-[#63F3AB]/10 to-[#51C58B]/10 border border-[#63F3AB]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#63F3AB] text-sm font-semibold">Активных</p>
              <p class="text-3xl font-bold text-white">{{ activeSlots }}</p>
            </div>
            <Icon name="heroicons:check-circle" class="text-[#63F3AB] text-3xl" />
          </div>
        </div>
        <div class="bg-gradient-to-r from-[#00EDFF]/10 to-[#01BFCF]/10 border border-[#00EDFF]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#00EDFF] text-sm font-semibold">Средний RTP</p>
              <p class="text-3xl font-bold text-white">{{ averageRTP }}%</p>
            </div>
            <Icon name="heroicons:chart-bar" class="text-[#00EDFF] text-3xl" />
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl p-6 mb-8">
        <h2 class="text-lg font-bold font-display text-white mb-4 flex items-center">
          <Icon name="heroicons:funnel" class="text-[#FF6E48] text-xl mr-2" />
          Поиск и фильтры
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Поиск по названию</label>
            <div class="relative">
              <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0AABE] text-lg" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Введите название слота..."
                class="w-full h-12 pl-10 pr-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white placeholder-[#A0AABE] focus:border-[#FF6E48] focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Провайдер</label>
            <select
              v-model="selectedProvider"
              class="w-full h-12 px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
            >
              <option value="">Все провайдеры</option>
              <option v-for="provider in providers" :key="provider.id" :value="provider.id">
                {{ provider.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Волатильность</label>
            <select
              v-model="selectedVolatility"
              class="w-full h-12 px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
            >
              <option value="">Любая</option>
              <option value="Низкая">Низкая</option>
              <option value="Средняя">Средняя</option>
              <option value="Высокая">Высокая</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Статус</label>
            <select
              v-model="selectedStatus"
              class="w-full h-12 px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
            >
              <option value="">Все</option>
              <option value="true">Активные</option>
              <option value="false">Неактивные</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Slots Table -->
      <div class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-[#1B1E26]/50">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-[#E5E7EB]">Слот</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-[#E5E7EB]">Провайдер</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-[#E5E7EB]">RTP</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-[#E5E7EB]">Волатильность</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-[#E5E7EB]">Макс. выигрыш</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-[#E5E7EB]">Статус</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-[#E5E7EB]">Действия</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#353A4A]">
              <tr v-if="loading" class="animate-pulse">
                <td colspan="7" class="px-6 py-8 text-center text-[#9CA3AF]">
                  <div class="flex items-center justify-center space-x-2">
                    <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#00EDFF]"></div>
                    <span>Загрузка слотов...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="filteredSlots.length === 0">
                <td colspan="7" class="px-6 py-8 text-center text-[#9CA3AF]">
                  <div class="mb-4">
                    <Icon name="heroicons:magnifying-glass" class="text-6xl text-[#A0AABE]" />
                  </div>
                  <p class="text-lg">Слоты не найдены</p>
                  <p class="text-sm">Попробуйте изменить параметры поиска</p>
                </td>
              </tr>
              <tr v-else v-for="slot in paginatedSlots" :key="slot.id" class="hover:bg-[#1B1E26]/30 transition-colors">
                <td class="px-6 py-4">
                  <div>
                    <p class="font-medium text-white">{{ slot.name }}</p>
                    <p class="text-sm text-[#A0AABE]">ID: {{ slot.id }}</p>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 bg-[#00EDFF]/20 border border-[#00EDFF]/30 rounded text-[#00EDFF] text-sm">
                    {{ slot.providers?.name || 'Не указан' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="font-medium text-[#63F3AB]">{{ slot.rtp || 'N/A' }}%</span>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 rounded text-sm" :class="getVolatilityClass(slot.volatility)">
                    {{ slot.volatility || 'Не указана' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span class="font-medium text-[#F59E0B]">{{ slot.max_win || 'N/A' }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 rounded text-sm" :class="slot.is_active ? 'bg-[#63F3AB]/20 border border-[#63F3AB]/30 text-[#63F3AB]' : 'bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444]'">
                    {{ slot.is_active ? 'Активен' : 'Неактивен' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-3">
                    <!-- Edit Button -->
                    <button 
                      @click="editSlot(slot)" 
                      class="group relative p-2.5 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#3B82F6] text-white rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-[#3B82F6]/25" 
                      title="Редактировать слот"
                    >
                      <Icon name="heroicons:cog-6-tooth" class="w-4 h-4" />
                      <div class="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </button>
                    
                    <!-- Toggle Status Button -->
                    <button 
                      @click="toggleSlotStatus(slot)" 
                      :class="slot.is_active 
                        ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#F59E0B] text-white' 
                        : 'bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#10B981] text-white'"
                      class="group relative p-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg" 
                      :style="{ boxShadow: slot.is_active ? '0 4px 20px rgba(245, 158, 11, 0.25)' : '0 4px 20px rgba(16, 185, 129, 0.25)' }"
                      :title="slot.is_active ? 'Деактивировать слот' : 'Активировать слот'"
                    >
                      <Icon :name="slot.is_active ? 'heroicons:eye-slash' : 'heroicons:eye'" class="w-4 h-4" />
                      <div class="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </button>
                    
                    <!-- Delete Button -->
                    <button 
                      @click="deleteSlot(slot)" 
                      class="group relative p-2.5 bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:from-[#DC2626] hover:to-[#EF4444] text-white rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-[#EF4444]/25" 
                      title="Удалить слот навсегда"
                    >
                      <Icon name="heroicons:x-circle" class="w-4 h-4" />
                      <div class="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t border-[#353A4A] flex items-center justify-between">
          <div class="text-sm text-[#9CA3AF]">
            Показано {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredSlots.length) }} из {{ filteredSlots.length }}
          </div>
          <div class="flex items-center space-x-2">
            <!-- Previous Button -->
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="group relative px-4 py-2.5 bg-[#161A21] hover:bg-[#1B1E26] disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#353A4A] hover:border-[#6366F1] rounded-lg transition-all duration-200 text-[#E5E7EB] hover:text-white transform hover:scale-105 disabled:hover:scale-100"
            >
              <Icon name="heroicons:chevron-left" class="w-4 h-4" />
              <div class="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
            
            <!-- Current Page Indicator -->
            <div class="px-4 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-lg font-semibold shadow-lg">
              {{ currentPage }} / {{ totalPages }}
            </div>
            
            <!-- Next Button -->
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="group relative px-4 py-2.5 bg-[#161A21] hover:bg-[#1B1E26] disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#353A4A] hover:border-[#6366F1] rounded-lg transition-all duration-200 text-[#E5E7EB] hover:text-white transform hover:scale-105 disabled:hover:scale-100"
            >
              <Icon name="heroicons:chevron-right" class="w-4 h-4" />
              <div class="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-[#8B5CF6]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-[#161A21] border border-[#353A4A] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-[#E5E7EB] flex items-center">
              <Icon :name="showAddModal ? 'heroicons:plus-circle' : 'heroicons:cog-6-tooth'" class="w-6 h-6 mr-2 text-[#6366F1]" />
              {{ showAddModal ? 'Добавить новый слот' : 'Редактировать слот' }}
            </h2>
            <button @click="closeModal" class="group relative p-2 text-[#9CA3AF] hover:text-white hover:bg-[#EF4444] rounded-lg transition-all duration-200" title="Закрыть">
              <Icon name="heroicons:x-circle" class="w-5 h-5" />
            </button>
          </div>
          
          <form @submit.prevent="saveSlot" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Название *</label>
                <input
                  v-model="slotForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                  placeholder="Введите название слота"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Провайдер *</label>
                <select
                  v-model="slotForm.provider_id"
                  required
                  class="w-full px-4 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                >
                  <option value="">Выберите провайдера</option>
                  <option v-for="provider in providers" :key="provider.id" :value="provider.id">
                    {{ provider.name }}
                  </option>
                </select>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Категория</label>
                <select
                  v-model="slotForm.category_id"
                  class="w-full px-4 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                >
                  <option value="">Выберите категорию</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Тема</label>
                <input
                  v-model="slotForm.theme"
                  type="text"
                  class="w-full px-4 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                  placeholder="Тема слота"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Описание</label>
              <textarea
                v-model="slotForm.description"
                rows="3"
                class="w-full px-4 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                placeholder="Описание слота"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">RTP (%)</label>
                <input
                  v-model.number="slotForm.rtp"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  class="w-full px-4 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                  placeholder="96.5"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Волатильность</label>
                <select
                  v-model="slotForm.volatility"
                  class="w-full px-4 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                >
                  <option value="">Не указана</option>
                  <option value="Низкая">Низкая</option>
                  <option value="Средняя">Средняя</option>
                  <option value="Высокая">Высокая</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Макс. выигрыш</label>
                <input
                  v-model.number="slotForm.max_win"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-4 py-2 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-white focus:border-[#FF6E48] focus:outline-none transition-colors"
                  placeholder="5000"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Мин. ставка</label>
                <input
                  v-model.number="slotForm.min_bet"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="0.01"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Макс. ставка</label>
                <input
                  v-model.number="slotForm.max_bet"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="100"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Барабаны</label>
                <input
                  v-model.number="slotForm.reels"
                  type="number"
                  min="1"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="5"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Ряды</label>
                <input
                  v-model.number="slotForm.rows"
                  type="number"
                  min="1"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="3"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Линии выплат</label>
                <input
                  v-model.number="slotForm.paylines"
                  type="number"
                  min="1"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="25"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Дата релиза</label>
                <input
                  v-model="slotForm.release_date"
                  type="date"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">URL миниатюры</label>
              <input
                v-model="slotForm.thumbnail_url"
                type="url"
                class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="https://example.com/thumb.jpg"
              />
            </div>
            
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="slotForm.is_active"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Активен</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="slotForm.is_mobile_compatible"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Мобильная версия</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="slotForm.is_demo_available"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Демо доступно</span>
              </label>
            </div>
            
            <div class="flex items-center justify-end space-x-4 pt-6 border-t border-[#353A4A]">
              <button
                type="button"
                @click="closeModal"
                class="group relative px-6 py-3 border-2 border-[#353A4A] text-[#A0AABE] hover:text-white hover:border-[#6B7280] rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                <div class="flex items-center space-x-2">
                  <Icon name="heroicons:arrow-uturn-left" class="w-4 h-4" />
                  <span class="font-medium">Отмена</span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-r from-[#374151] to-[#4B5563] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="group relative px-6 py-3 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#CD5A3C] hover:to-[#FF6E48] text-white rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl hover:shadow-[#FF6E48]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div class="flex items-center space-x-2">
                  <Icon v-if="saving" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
                  <Icon v-else :name="showAddModal ? 'heroicons:document-plus' : 'heroicons:check-circle'" class="w-4 h-4" />
                  <span class="font-medium">{{ saving ? 'Сохранение...' : (showAddModal ? 'Добавить' : 'Сохранить') }}</span>
                </div>
                <div class="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-[#161A21] border border-[#EF4444]/30 rounded-xl max-w-md w-full">
        <div class="p-6">
          <div class="text-center">
            <div class="mb-4">
              <Icon name="heroicons:shield-exclamation" class="w-16 h-16 text-[#EF4444] mx-auto" />
            </div>
            <h2 class="text-2xl font-bold text-[#E5E7EB] mb-4">Подтвердите удаление</h2>
            <p class="text-[#A0AABE] mb-6">
              Вы уверены, что хотите удалить слот <strong class="text-[#E5E7EB]">"{{ slotToDelete?.name }}"</strong>?
              Это действие нельзя отменить.
            </p>
            <div class="flex items-center justify-center space-x-4">
              <button
                @click="showDeleteModal = false"
                class="group relative px-6 py-3 border-2 border-[#353A4A] text-[#A0AABE] hover:text-white hover:border-[#6B7280] rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                <div class="flex items-center space-x-2">
                  <Icon name="heroicons:arrow-uturn-left" class="w-4 h-4" />
                  <span class="font-medium">Отмена</span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-r from-[#374151] to-[#4B5563] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </button>
              <button
                @click="confirmDelete"
                :disabled="deleting"
                class="group relative px-6 py-3 bg-gradient-to-r from-[#EF4444] to-[#DC2626] hover:from-[#DC2626] hover:to-[#EF4444] text-white rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl hover:shadow-[#EF4444]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div class="flex items-center space-x-2">
                  <Icon v-if="deleting" name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
                  <Icon v-else name="heroicons:trash" class="w-4 h-4" />
                  <span class="font-medium">{{ deleting ? 'Удаление...' : 'Удалить навсегда' }}</span>
                </div>
                <div class="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Composables
const { getSlots, createSlot, updateSlot, deleteSlot: deleteSlotApi } = useSlotsApi()
const { getProviders } = useProviders()
const { getCategories } = useCategories()

// Reactive data
const slots = ref([])
const providers = ref([])
const categories = ref([])
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)

// Modals
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const slotToDelete = ref(null)

// Search and filters
const searchQuery = ref('')
const selectedProvider = ref('')
const selectedVolatility = ref('')
const selectedStatus = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Form data
const slotForm = ref({
  name: '',
  description: '',
  provider_id: '',
  category_id: '',
  rtp: null,
  volatility: '',
  max_win: null,
  min_bet: null,
  max_bet: null,
  reels: null,
  rows: null,
  paylines: null,
  theme: '',
  thumbnail_url: '',
  screenshots: [],
  features: [],
  is_active: true,
  is_mobile_compatible: true,
  is_demo_available: true,
  release_date: ''
})

// Computed properties
const filteredSlots = computed(() => {
  let filtered = slots.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(slot => 
      slot.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (selectedProvider.value) {
    filtered = filtered.filter(slot => slot.provider_id === selectedProvider.value)
  }
  
  if (selectedVolatility.value) {
    filtered = filtered.filter(slot => slot.volatility === selectedVolatility.value)
  }
  
  if (selectedStatus.value !== '') {
    const isActive = selectedStatus.value === 'true'
    filtered = filtered.filter(slot => slot.is_active === isActive)
  }
  
  return filtered
})

const paginatedSlots = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredSlots.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredSlots.value.length / itemsPerPage.value)
})

const totalSlots = computed(() => slots.value.length)
const totalProviders = computed(() => new Set(slots.value.map(slot => slot.provider_id)).size)
const activeSlots = computed(() => slots.value.filter(slot => slot.is_active).length)
const averageRTP = computed(() => {
  const rtpSlots = slots.value.filter(slot => slot.rtp)
  if (rtpSlots.length === 0) return 0
  const sum = rtpSlots.reduce((acc, slot) => acc + parseFloat(slot.rtp), 0)
  return (sum / rtpSlots.length).toFixed(1)
})

// Methods
const loadSlots = async () => {
  try {
    loading.value = true
    const response = await getSlots({ admin: true })
    slots.value = response || []
  } catch (error) {
    console.error('Ошибка загрузки слотов:', error)
    slots.value = []
  } finally {
    loading.value = false
  }
}

const loadProviders = async () => {
  try {
    const response = await getProviders()
    providers.value = response || []
  } catch (error) {
    console.error('Ошибка загрузки провайдеров:', error)
    providers.value = []
  }
}

const loadCategories = async () => {
  try {
    const response = await getCategories()
    categories.value = response || []
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error)
    categories.value = []
  }
}

const refreshSlots = () => {
  loadSlots()
}

const editSlot = (slot) => {
  slotForm.value = {
    id: slot.id,
    name: slot.name,
    description: slot.description || '',
    provider_id: slot.provider_id,
    category_id: slot.category_id || '',
    rtp: slot.rtp,
    volatility: slot.volatility || '',
    max_win: slot.max_win,
    min_bet: slot.min_bet,
    max_bet: slot.max_bet,
    reels: slot.reels,
    rows: slot.rows,
    paylines: slot.paylines,
    theme: slot.theme || '',
    thumbnail_url: slot.thumbnail_url || '',
    screenshots: slot.screenshots || [],
    features: slot.features || [],
    is_active: slot.is_active,
    is_mobile_compatible: slot.is_mobile_compatible,
    is_demo_available: slot.is_demo_available,
    release_date: slot.release_date ? new Date(slot.release_date).toISOString().split('T')[0] : ''
  }
  showEditModal.value = true
}

const deleteSlot = (slot) => {
  slotToDelete.value = slot
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!slotToDelete.value) return
  
  try {
    deleting.value = true
    await deleteSlotApi(slotToDelete.value.id)
    // Перезагружаем данные с сервера для синхронизации
    await loadSlots()
    showDeleteModal.value = false
    slotToDelete.value = null
  } catch (error) {
    console.error('Ошибка удаления слота:', error)
    alert('Ошибка при удалении слота')
  } finally {
    deleting.value = false
  }
}

const toggleSlotStatus = async (slot) => {
  try {
    // Отправляем только нужные поля для обновления статуса
    const updateData = {
      is_active: !slot.is_active
    }
    await updateSlot(slot.id, updateData)
    // Перезагружаем данные с сервера для синхронизации
    await loadSlots()
  } catch (error) {
    console.error('Ошибка изменения статуса слота:', error)
    alert('Ошибка при изменении статуса слота')
  }
}

const saveSlot = async () => {
  try {
    saving.value = true
    
    if (showAddModal.value) {
      await createSlot(slotForm.value)
    } else {
      await updateSlot(slotForm.value.id, slotForm.value)
    }
    
    // Перезагружаем данные с сервера для синхронизации
    await loadSlots()
    closeModal()
  } catch (error) {
    console.error('Ошибка сохранения слота:', error)
    alert('Ошибка при сохранении слота')
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  slotForm.value = {
    name: '',
    description: '',
    provider_id: '',
    category_id: '',
    rtp: null,
    volatility: '',
    max_win: '',
    min_bet: null,
    max_bet: null,
    reels: null,
    rows: null,
    paylines: null,
    theme: '',
    image_url: '',
    thumbnail_url: '',
    is_active: true,
    is_featured: false,
    release_date: ''
  }
}

const getVolatilityClass = (volatility) => {
  switch (volatility) {
    case 'Низкая':
      return 'bg-green-500/20 border border-green-500/30 text-green-400'
    case 'Средняя':
      return 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-400'
    case 'Высокая':
      return 'bg-red-500/20 border border-red-500/30 text-red-400'
    default:
      return 'bg-gray-500/20 border border-gray-500/30 text-gray-400'
  }
}

// Watch for filter changes to reset pagination
watch([searchQuery, selectedProvider, selectedVolatility, selectedStatus], () => {
  currentPage.value = 1
})

// Load data on mount
onMounted(() => {
  loadSlots()
  loadProviders()
  loadCategories()
})

// Page meta
useHead({
  title: 'SlotQuest Admin - Управление слотами',
  meta: [
    { name: 'description', content: 'Административная панель для управления слотами SlotQuest' }
  ]
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>