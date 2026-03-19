<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white font-sans">
    <!-- Header -->
    <header class="relative bg-[#161A21]/80 backdrop-blur-sm border-b border-[#353A4A] sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-[#FF6E48] hover:text-[#CD5A3C] transition-colors flex items-center space-x-2">
              <Icon name="heroicons:arrow-left" class="text-lg" />
              <span>Назад к панели управления</span>
            </NuxtLink>
            <div class="h-6 w-px bg-[#353A4A]"></div>
            <h1 class="text-2xl font-bold font-display bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] bg-clip-text text-transparent flex items-center space-x-2">
              <Icon name="heroicons:gift" class="text-[#FF6E48]" />
              <span>Управление бонусами</span>
            </h1>
          </div>
          <div class="flex space-x-3">
            <button
              @click="loadBonuses"
              :disabled="loading"
              class="bg-gradient-to-r from-[#353A4A] to-[#2A2F3A] border border-[#4A5568] text-white px-4 py-2 rounded-lg hover:from-[#4A5568] hover:to-[#353A4A] transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              <Icon name="heroicons:arrow-path" class="text-lg" :class="{ 'animate-spin': loading }" />
              <span>Обновить</span>
            </button>
            <button
              @click="openAddModal"
              class="bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] text-white px-4 py-2 rounded-lg hover:from-[#CD5A3C] hover:to-[#FF6E48] transition-all flex items-center space-x-2 font-semibold"
            >
              <Icon name="heroicons:plus" class="text-lg" />
              <span>Добавить бонус</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-r from-[#FF6E48]/10 to-[#CD5A3C]/10 border border-[#FF6E48]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#FF6E48] text-sm font-semibold">Всего бонусов</p>
              <p class="text-3xl font-bold text-white">{{ totalBonuses }}</p>
            </div>
            <Icon name="heroicons:gift" class="text-[#FF6E48] text-3xl" />
          </div>
        </div>
        <div class="bg-gradient-to-r from-[#63F3AB]/10 to-[#51C58B]/10 border border-[#63F3AB]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#63F3AB] text-sm font-semibold">Активные</p>
              <p class="text-3xl font-bold text-white">{{ activeBonuses }}</p>
            </div>
            <Icon name="heroicons:check-circle" class="text-[#63F3AB] text-3xl" />
          </div>
        </div>
        <div class="bg-gradient-to-r from-[#FF6E48]/10 to-[#CD5A3C]/10 border border-[#FF6E48]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#FF6E48] text-sm font-semibold">Популярные</p>
              <p class="text-3xl font-bold text-white">{{ popularBonuses }}</p>
            </div>
            <Icon name="heroicons:star" class="text-[#FF6E48] text-3xl" />
          </div>
        </div>
        <div class="bg-gradient-to-r from-[#CD0F8B]/10 to-[#CD0F8B]/10 border border-[#CD0F8B]/20 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#CD0F8B] text-sm font-semibold">Рекомендуемые</p>
              <p class="text-3xl font-bold text-white">{{ featuredBonuses }}</p>
            </div>
            <Icon name="heroicons:heart" class="text-[#CD0F8B] text-3xl" />
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-[#1B1E26]/50 backdrop-blur-sm border border-[#353A4A] rounded-xl p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Поиск бонусов..." 
                class="w-full bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 pl-10 text-white placeholder-[#A0AABE] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="heroicons:magnifying-glass" class="text-[#A0AABE]" />
              </div>
            </div>
          </div>
          
          <div class="flex gap-3">
            <select 
              v-model="typeFilter" 
              class="bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
            >
              <option value="">Все типы</option>
              <option value="free_spins">Free Spins</option>
              <option value="multiplier">Multiplier</option>
              <option value="cash_bonus">Cash Bonus</option>
              <option value="pick_bonus">Pick Bonus</option>
              <option value="wheel_bonus">Wheel Bonus</option>
              <option value="mini_game">Mini Game</option>
              <option value="progressive_jackpot">Progressive Jackpot</option>
            </select>
            
            <select 
              v-model="statusFilter" 
              class="bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
            >
              <option value="">Все статусы</option>
              <option value="true">Активные</option>
              <option value="false">Неактивные</option>
            </select>
            
            <button 
              @click="clearFilters" 
              class="px-4 py-3 bg-[#0F1117] border border-[#353A4A] rounded-lg text-white hover:bg-[#1B1E26] transition-all flex items-center"
            >
              <Icon name="heroicons:x-mark" />
            </button>
          </div>
        </div>
      </div>

      <!-- Bonuses Table -->
      <div class="bg-[#161A21]/50 border border-[#353A4A] rounded-xl overflow-hidden">
        <div class="px-6 py-4 border-b border-[#353A4A]">
          <h3 class="text-lg font-bold font-display text-white flex items-center space-x-2">
            <Icon name="heroicons:table-cells" class="text-[#00EDFF]" />
            <span>Список бонусов</span>
          </h3>
        </div>
        
        <div v-if="loading" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="bg-[#0F1117] border border-[#353A4A] rounded-xl p-6 animate-pulse">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 bg-[#353A4A] rounded-lg"></div>
                <div class="flex-1">
                  <div class="h-4 bg-[#353A4A] rounded mb-2"></div>
                  <div class="h-3 bg-[#353A4A] rounded w-2/3"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="h-3 bg-[#353A4A] rounded"></div>
                <div class="h-3 bg-[#353A4A] rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="paginatedBonuses.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4 text-[#FF6E48]">
            <Icon name="heroicons:gift" class="w-16 h-16 mx-auto" />
          </div>
          <h3 class="text-xl font-semibold text-[#A0AABE] mb-2">Бонусы не найдены</h3>
          <p class="text-[#6B7280] mb-6">
            {{ searchQuery ? 'Попробуйте изменить поисковый запрос' : 'Добавьте первый бонус' }}
          </p>
          <button 
            @click="openAddModal" 
            class="px-6 py-3 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <Icon name="heroicons:plus-circle" />
            <span>Добавить бонус</span>
          </button>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-[#353A4A]">
            <thead class="bg-[#2A2F3A]">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB] uppercase tracking-wider">
                  Бонус
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB] uppercase tracking-wider">
                  Тип
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB] uppercase tracking-wider">
                  Статус
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB] uppercase tracking-wider">
                  Слоты
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB] uppercase tracking-wider">
                  Порядок
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-[#E5E7EB] uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody class="bg-[#161A21]/30 divide-y divide-[#353A4A]">
              <tr v-for="bonus in paginatedBonuses" :key="bonus.id" class="hover:bg-[#2A2F3A]/50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="text-2xl mr-3" :style="{ color: bonus.color || '#8b5cf6' }">
                      {{ bonus.icon || '🎁' }}
                    </div>
                    <div>
                      <div class="text-sm font-medium text-white">{{ bonus.name }}</div>
                      <div class="text-sm text-[#9CA3AF]">{{ bonus.description }}</div>
                      <div class="text-xs text-[#6B7280] mt-1">Slug: {{ bonus.slug }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="getBonusTypeClass(bonus.type)" 
                    class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ getBonusTypeName(bonus.type) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col space-y-1">
                    <span 
                      :class="{
                        'bg-green-500/20 text-green-300 border border-green-500/30': bonus.is_active,
                        'bg-gray-500/20 text-gray-300 border border-gray-500/30': !bonus.is_active
                      }" 
                      class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full w-fit"
                    >
                      {{ bonus.is_active ? 'Активный' : 'Неактивный' }}
                    </span>
                    <div class="flex space-x-1">
                      <span 
                        v-if="bonus.is_popular" 
                        class="px-2 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-xs leading-5 font-semibold rounded-full"
                      >
                        Популярный
                      </span>
                      <span 
                        v-if="bonus.is_featured" 
                        class="px-2 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs leading-5 font-semibold rounded-full"
                      >
                        Рекомендуемый
                      </span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-[#9CA3AF]">
                  <div class="flex items-center space-x-2">
                    <span class="text-white font-semibold">{{ bonus.slots_count || 0 }}</span>
                    <span>слотов</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-[#9CA3AF]">
                  {{ bonus.sort_order || 0 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex flex-col space-y-2">
                    <button
                      @click="editBonus(bonus)"
                      class="text-[#00EDFF] hover:text-[#01BFCF] transition-colors flex items-center space-x-1"
                    >
                      <Icon name="heroicons:pencil" class="text-sm" />
                      <span>Редактировать</span>
                    </button>
                    <button
                      @click="toggleBonusStatus(bonus)"
                      :disabled="saving"
                      :class="{
                        'text-[#63F3AB] hover:text-[#51C58B]': !bonus.is_active,
                        'text-[#FFD700] hover:text-[#FFC107]': bonus.is_active
                      }"
                      class="transition-colors flex items-center space-x-1 disabled:opacity-50"
                    >
                      <Icon :name="bonus.is_active ? 'heroicons:pause' : 'heroicons:play'" class="text-sm" />
                      <span>{{ bonus.is_active ? 'Деактивировать' : 'Активировать' }}</span>
                    </button>
                    <button
                      @click="confirmDelete(bonus)"
                      :disabled="deleting"
                      class="text-[#FF6E48] hover:text-[#CD5A3C] transition-colors flex items-center space-x-1 disabled:opacity-50"
                    >
                      <Icon name="heroicons:trash" class="text-sm" />
                      <span>Удалить</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t border-[#353A4A]">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-[#6B7280]">
                Показано {{ startIndex }}-{{ endIndex }} из {{ totalBonuses }} бонусов
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-sm font-medium text-[#A0AABE] bg-[#1B1E26] border border-[#353A4A] rounded-lg hover:bg-[#252A35] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Предыдущая
              </button>
              <div class="flex items-center space-x-1">
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="{
                    'bg-[#FF6E48] text-white border-[#FF6E48]': page === currentPage,
                    'bg-[#1B1E26] text-[#A0AABE] border-[#353A4A] hover:bg-[#252A35]': page !== currentPage
                  }"
                  class="px-3 py-2 text-sm font-medium border rounded-lg transition-colors"
                >
                  {{ page }}
                </button>
              </div>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 text-sm font-medium text-[#A0AABE] bg-[#1B1E26] border border-[#353A4A] rounded-lg hover:bg-[#252A35] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Следующая
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Bonus Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-[#161A21] border-[#353A4A]">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-white mb-4">
            {{ editingBonus ? 'Редактировать бонус' : 'Добавить бонус' }}
          </h3>
          <form @submit.prevent="saveBonus">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Название *</label>
                <input
                  v-model="bonusForm.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 bg-[#0F1117] border border-[#353A4A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48]"
                  placeholder="Введите название бонуса"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Slug *</label>
                <input
                  v-model="bonusForm.slug"
                  type="text"
                  required
                  class="w-full px-3 py-2 bg-[#0F1117] border border-[#353A4A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48]"
                  placeholder="bonus-slug"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Тип бонуса</label>
                <select
                  v-model="bonusForm.type"
                  class="w-full px-3 py-2 bg-[#0F1117] border border-[#353A4A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48]"
                >
                  <option value="">Выберите тип</option>
                  <option value="free_spins">Free Spins</option>
                  <option value="multiplier">Multiplier</option>
                  <option value="cash_bonus">Cash Bonus</option>
                  <option value="pick_bonus">Pick Bonus</option>
                  <option value="wheel_bonus">Wheel Bonus</option>
                  <option value="mini_game">Mini Game</option>
                  <option value="progressive_jackpot">Progressive Jackpot</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Иконка</label>
                <input
                  v-model="bonusForm.icon"
                  type="text"
                  class="w-full px-3 py-2 bg-[#0F1117] border border-[#353A4A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48]"
                  placeholder="🎰"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Цвет</label>
                <input
                  v-model="bonusForm.color"
                  type="color"
                  class="w-full h-10 bg-[#0F1117] border border-[#353A4A] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48]"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Порядок сортировки</label>
                <input
                  v-model.number="bonusForm.sort_order"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 bg-[#0F1117] border border-[#353A4A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48]"
                  placeholder="0"
                />
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">Описание</label>
                <textarea
                  v-model="bonusForm.description"
                  rows="3"
                  class="w-full px-3 py-2 bg-[#0F1117] border border-[#353A4A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48]"
                  placeholder="Введите описание бонуса"
                ></textarea>
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-[#E5E7EB] mb-2">URL изображения</label>
                <input
                  v-model="bonusForm.image_url"
                  type="url"
                  class="w-full px-3 py-2 bg-[#0F1117] border border-[#353A4A] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48]"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div class="md:col-span-2">
                <div class="flex flex-wrap gap-6">
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="bonusForm.is_active"
                      type="checkbox"
                      class="w-4 h-4 text-[#FF6E48] bg-[#0F1117] border-[#353A4A] rounded focus:ring-[#FF6E48] focus:ring-2"
                    />
                    <span class="text-sm text-[#E5E7EB]">Активный</span>
                  </label>
                  
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="bonusForm.is_popular"
                      type="checkbox"
                      class="w-4 h-4 text-[#FF6E48] bg-[#0F1117] border-[#353A4A] rounded focus:ring-[#FF6E48] focus:ring-2"
                    />
                    <span class="text-sm text-[#E5E7EB]">Популярный</span>
                  </label>
                  
                  <label class="flex items-center space-x-2">
                    <input
                      v-model="bonusForm.is_featured"
                      type="checkbox"
                      class="w-4 h-4 text-[#FF6E48] bg-[#0F1117] border-[#353A4A] rounded focus:ring-[#FF6E48] focus:ring-2"
                    />
                    <span class="text-sm text-[#E5E7EB]">Рекомендуемый</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 bg-[#353A4A] text-white rounded-lg hover:bg-[#4A5568] transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] text-white rounded-lg hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 transition-all disabled:opacity-50 flex items-center space-x-2"
              >
                <Icon v-if="saving" name="heroicons:arrow-path" class="animate-spin" />
                <span>{{ editingBonus ? 'Сохранить' : 'Создать' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-[#161A21] border-[#353A4A]">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Icon name="heroicons:exclamation-triangle" class="h-6 w-6 text-red-600" />
          </div>
          <h3 class="text-lg font-medium text-white mb-2">Удалить бонус</h3>
          <p class="text-sm text-[#9CA3AF] mb-4">
            Вы уверены, что хотите удалить бонус "{{ bonusToDelete?.name }}"? Это действие нельзя отменить.
          </p>
          <div class="flex justify-center space-x-3">
            <button
              @click="closeDeleteModal"
              class="px-4 py-2 bg-[#353A4A] text-white rounded-lg hover:bg-[#4A5568] transition-colors"
            >
              Отмена
            </button>
            <button
              @click="deleteBonusAction"
              :disabled="deleting"
              class="px-4 py-2 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] text-white rounded-lg hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 transition-all disabled:opacity-50 flex items-center space-x-2"
            >
              <Icon v-if="deleting" name="heroicons:arrow-path" class="animate-spin" />
              <span>Удалить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useBonuses } from '~/composables/useBonuses'

// Composables
const { getBonuses, createBonus, updateBonus, deleteBonus: deleteBonusApi } = useBonuses()

// Reactive state
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)
const bonuses = ref([])
const showModal = ref(false)
const showDeleteModal = ref(false)
const editingBonus = ref(null)
const bonusToDelete = ref(null)

// Search and filters
const searchQuery = ref('')
const typeFilter = ref('')
const statusFilter = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Form data
const bonusForm = ref({
  name: '',
  slug: '',
  description: '',
  type: '',
  icon: '',
  color: '#8b5cf6',
  image_url: '',
  sort_order: 0,
  is_active: true,
  is_popular: false,
  is_featured: false
})

// Computed properties
const filteredBonuses = computed(() => {
  let filtered = bonuses.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(bonus => 
      bonus.name?.toLowerCase().includes(query) ||
      bonus.slug?.toLowerCase().includes(query) ||
      bonus.description?.toLowerCase().includes(query)
    )
  }

  if (typeFilter.value) {
    filtered = filtered.filter(bonus => bonus.type === typeFilter.value)
  }

  if (statusFilter.value !== '') {
    const isActive = statusFilter.value === 'true'
    filtered = filtered.filter(bonus => bonus.is_active === isActive)
  }

  return filtered
})

const paginatedBonuses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredBonuses.value.slice(start, end)
})

const totalBonuses = computed(() => filteredBonuses.value.length)
const activeBonuses = computed(() => bonuses.value.filter(b => b.is_active).length)
const popularBonuses = computed(() => bonuses.value.filter(b => b.is_popular).length)
const featuredBonuses = computed(() => bonuses.value.filter(b => b.is_featured).length)

const totalPages = computed(() => Math.ceil(totalBonuses.value / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1)
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalBonuses.value))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const loadBonuses = async () => {
  try {
    loading.value = true
    const response = await getBonuses()
    bonuses.value = response.data || []
  } catch (error) {
    console.error('Ошибка загрузки бонусов:', error)
    bonuses.value = []
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  editingBonus.value = null
  bonusForm.value = {
    name: '',
    slug: '',
    description: '',
    type: '',
    icon: '',
    color: '#8b5cf6',
    image_url: '',
    sort_order: 0,
    is_active: true,
    is_popular: false,
    is_featured: false
  }
  showModal.value = true
}

const editBonus = (bonus) => {
  editingBonus.value = bonus
  bonusForm.value = {
    name: bonus.name || '',
    slug: bonus.slug || '',
    description: bonus.description || '',
    type: bonus.type || '',
    icon: bonus.icon || '',
    color: bonus.color || '#8b5cf6',
    image_url: bonus.image_url || '',
    sort_order: bonus.sort_order || 0,
    is_active: bonus.is_active ?? true,
    is_popular: bonus.is_popular ?? false,
    is_featured: bonus.is_featured ?? false
  }
  showModal.value = true
}

const saveBonus = async () => {
  try {
    saving.value = true
    
    if (editingBonus.value) {
      await updateBonus(editingBonus.value.id, bonusForm.value)
    } else {
      await createBonus(bonusForm.value)
    }
    
    await loadBonuses()
    closeModal()
  } catch (error) {
    console.error('Ошибка сохранения бонуса:', error)
  } finally {
    saving.value = false
  }
}

const toggleBonusStatus = async (bonus) => {
  try {
    saving.value = true
    await updateBonus(bonus.id, { is_active: !bonus.is_active })
    await loadBonuses()
  } catch (error) {
    console.error('Ошибка изменения статуса бонуса:', error)
  } finally {
    saving.value = false
  }
}

const confirmDelete = (bonus) => {
  bonusToDelete.value = bonus
  showDeleteModal.value = true
}

const deleteBonusAction = async () => {
  if (!bonusToDelete.value) return
  
  try {
    deleting.value = true
    await deleteBonusApi(bonusToDelete.value.id)
    await loadBonuses()
    closeDeleteModal()
  } catch (error) {
    console.error('Ошибка удаления бонуса:', error)
  } finally {
    deleting.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  editingBonus.value = null
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  bonusToDelete.value = null
}

const clearFilters = () => {
  searchQuery.value = ''
  typeFilter.value = ''
  statusFilter.value = ''
  currentPage.value = 1
}

const goToPage = (page) => {
  currentPage.value = page
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const getBonusTypeName = (type) => {
  const types = {
    free_spins: 'Free Spins',
    multiplier: 'Multiplier',
    cash_bonus: 'Cash Bonus',
    pick_bonus: 'Pick Bonus',
    wheel_bonus: 'Wheel Bonus',
    mini_game: 'Mini Game',
    progressive_jackpot: 'Progressive Jackpot'
  }
  return types[type] || type || 'Не указан'
}

const getBonusTypeClass = (type) => {
  const classes = {
    free_spins: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    multiplier: 'bg-green-500/20 text-green-300 border border-green-500/30',
    cash_bonus: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    pick_bonus: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    wheel_bonus: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    mini_game: 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
    progressive_jackpot: 'bg-red-500/20 text-red-300 border border-red-500/30'
  }
  return classes[type] || 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
}

// Watchers
watch([searchQuery, typeFilter, statusFilter], () => {
  currentPage.value = 1
})

// Auto-generate slug from name
watch(() => bonusForm.value.name, (newName) => {
  if (newName && !editingBonus.value) {
    bonusForm.value.slug = newName
      .toLowerCase()
      .replace(/[^a-z0-9а-я]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }
})

// Lifecycle
onMounted(() => {
  loadBonuses()
})
</script>
