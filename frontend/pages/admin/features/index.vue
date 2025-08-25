<template>
  <div class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
    <!-- Header -->
    <header class="relative bg-[#161A21]/80 backdrop-blur-sm border-b border-[#353A4A] sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-[#A0AABE] hover:text-[#FF6E48] transition-colors flex items-center space-x-2">
              <Icon name="heroicons:arrow-left" />
              <span>Назад к дашборду</span>
            </NuxtLink>
            <h1 class="text-2xl font-bold font-display bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] bg-clip-text text-transparent flex items-center space-x-2">
              <Icon name="heroicons:cog-6-tooth" class="text-[#FF6E48]" />
              <span>Управление механиками</span>
            </h1>
            <div class="px-3 py-1 bg-[#63F3AB]/10 border border-[#63F3AB]/30 rounded-full text-[#63F3AB] text-sm font-medium">
              {{ mechanics.length }} механик
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button @click="showAddModal = true" class="px-4 py-2 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2">
              <Icon name="heroicons:plus-circle" />
              <span>Добавить механику</span>
            </button>
            <button @click="loadMechanics" class="px-4 py-2 bg-[#1B1E26]/70 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2">
              <Icon name="heroicons:arrow-path" />
              <span>Обновить</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mt-5">
        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 backdrop-blur-sm hover:bg-[#1B1E26]/70 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#A0AABE] text-sm font-medium">Всего механик</p>
              <p class="text-2xl font-bold text-white">{{ mechanics.length }}</p>
            </div>
            <div class="text-[#FF6E48] text-2xl">
              <Icon name="heroicons:cog-6-tooth" />
            </div>
          </div>
        </div>
        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 backdrop-blur-sm hover:bg-[#1B1E26]/70 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#A0AABE] text-sm font-medium">Активных</p>
              <p class="text-2xl font-bold text-white">{{ activeMechanics }}</p>
            </div>
            <div class="text-[#63F3AB] text-2xl">
              <Icon name="heroicons:check-circle" />
            </div>
          </div>
        </div>
        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 backdrop-blur-sm hover:bg-[#1B1E26]/70 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#A0AABE] text-sm font-medium">Со слотами</p>
              <p class="text-2xl font-bold text-white">{{ mechanicsWithSlots }}</p>
            </div>
            <div class="text-[#FFD700] text-2xl">
              <Icon name="heroicons:star" />
            </div>
          </div>
        </div>
        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 backdrop-blur-sm hover:bg-[#1B1E26]/70 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#A0AABE] text-sm font-medium">Популярных</p>
              <p class="text-2xl font-bold text-white">{{ popularMechanics }}</p>
            </div>
            <div class="text-[#FF6E48] text-2xl">
              <Icon name="heroicons:chart-bar" />
            </div>
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
                placeholder="Поиск механик..."
                class="w-full bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 pl-10 text-white placeholder-[#A0AABE] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="heroicons:magnifying-glass" class="text-[#A0AABE]" />
              </div>
            </div>
          </div>
          
          <div class="flex gap-3">
            <select
              v-model="selectedStatus"
              class="bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
            >
              <option value="">Все статусы</option>
              <option value="true">Активные</option>
              <option value="false">Неактивные</option>
            </select>
            
            <select
              v-model="selectedType"
              class="bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
            >
              <option value="">Все типы</option>
              <option value="bonus">Бонусные</option>
              <option value="special">Специальные</option>
              <option value="multiplier">Множители</option>
              <option value="free_spins">Фриспины</option>
              <option value="wild">Вайлды</option>
              <option value="scatter">Скаттеры</option>
              <option value="progressive">Прогрессивные</option>
            </select>
            
            <select
              v-model="sortBy"
              class="bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
            >
              <option value="name">По названию</option>
              <option value="created_at">По дате создания</option>
              <option value="slots_count">По количеству слотов</option>
              <option value="sort_order">По порядку</option>
            </select>
            
            <button
              @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
              class="px-4 py-3 bg-[#0F1117] border border-[#353A4A] rounded-lg text-white hover:bg-[#1B1E26] transition-all flex items-center"
            >
              <Icon :name="sortOrder === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mechanics Grid -->
      <div class="mt-5"></div>
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 animate-pulse">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 bg-[#353A4A] rounded-lg"></div>
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
      
      <div v-else-if="paginatedMechanics.length === 0" class="text-center py-12">
         <div class="text-6xl mb-4 text-[#FF6E48]">
           <Icon name="heroicons:cog-6-tooth" class="w-16 h-16 mx-auto" />
         </div>
         <h3 class="text-xl font-semibold text-[#A0AABE] mb-2">Механики не найдены</h3>
         <p class="text-[#6B7280] mb-6">{{ searchQuery ? 'Попробуйте изменить поисковый запрос' : 'Добавьте первую механику' }}</p>
         <button @click="openCreateModal" class="px-6 py-3 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto">
           <Icon name="heroicons:plus-circle" />
           <span>Добавить механику</span>
         </button>
       </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="mechanic in paginatedMechanics" :key="mechanic.id" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 hover:border-[#FF6E48]/30 transition-all group backdrop-blur-sm">
          <div class="flex items-center space-x-4 mb-4">
            <div
              class="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              :style="{ backgroundColor: mechanic.color || '#6B7280' }"
            >
              {{ mechanic.icon || mechanic.name.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white group-hover:text-[#FF6E48] transition-colors">{{ mechanic.name }}</h3>
              <p class="text-sm text-[#A0AABE]">{{ mechanic.slug }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <span
                :class="[
                  'w-3 h-3 rounded-full',
                  mechanic.is_active ? 'bg-[#63F3AB]' : 'bg-red-400'
                ]"
                :title="mechanic.is_active ? 'Активна' : 'Неактивна'"
              ></span>
            </div>
          </div>
          
          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-[#A0AABE]">Тип:</span>
              <span class="px-2 py-1 bg-[#FF6E48]/10 border border-[#FF6E48]/30 rounded-full text-[#FF6E48] text-xs font-medium">
                {{ mechanic.type || 'Не указан' }}
              </span>
            </div>
            <div class="text-sm">
              <span class="text-[#A0AABE] block mb-1">Описание:</span>
              <p class="text-white text-sm leading-relaxed line-clamp-2">{{ mechanic.description || 'Нет описания' }}</p>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-[#A0AABE]">Слотов:</span>
              <div class="flex items-center space-x-2">
                <Icon name="heroicons:squares-2x2" class="w-4 h-4 text-[#A0AABE]" />
                <span class="text-white font-medium">{{ mechanic.slots_count || 0 }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-[#A0AABE]">Цвет:</span>
              <div class="flex items-center space-x-2">
                <div
                  class="w-4 h-4 rounded-full border border-[#353A4A]"
                  :style="{ backgroundColor: mechanic.color || '#6B7280' }"
                ></div>
                <span class="text-[#A0AABE] text-xs font-mono">{{ mechanic.color || '#6B7280' }}</span>
              </div>
            </div>
          </div>
          
          <div class="flex items-center justify-between pt-4 border-t border-[#353A4A]">
            <div class="flex items-center space-x-2">
              <button
                @click="editMechanic(mechanic)"
                class="p-2 text-[#A0AABE] hover:text-[#FF6E48] hover:bg-[#FF6E48]/10 rounded-lg transition-all duration-200"
                title="Редактировать"
              >
                <Icon name="heroicons:pencil" class="w-4 h-4" />
              </button>
              <button
                @click="toggleMechanicStatus(mechanic)"
                class="p-2 text-[#A0AABE] hover:text-[#63F3AB] hover:bg-[#63F3AB]/10 rounded-lg transition-all duration-200"
                :title="mechanic.is_active ? 'Деактивировать' : 'Активировать'"
              >
                <Icon :name="mechanic.is_active ? 'heroicons:pause' : 'heroicons:play'" class="w-4 h-4" />
              </button>
              <button
                @click="deleteMechanic(mechanic)"
                class="p-2 text-[#A0AABE] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                title="Удалить"
              >
                <Icon name="heroicons:trash" class="w-4 h-4" />
              </button>
              <NuxtLink
                :to="`/admin/mechanics/${mechanic.id}/slots`"
                class="p-2 text-[#A0AABE] hover:text-[#63F3AB] hover:bg-[#63F3AB]/10 rounded-lg transition-all duration-200"
                title="Просмотреть слоты"
              >
                <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
              </NuxtLink>
            </div>
            <div class="text-xs" :class="mechanic.is_active ? 'text-[#63F3AB]' : 'text-red-400'">
              {{ mechanic.is_active ? 'Активна' : 'Неактивна' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between bg-[#1B1E26]/50 backdrop-blur-sm border border-[#353A4A] rounded-xl p-6 mt-8">
        <div class="text-sm text-[#A0AABE]">
          Показано {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, filteredMechanics.length) }} из {{ filteredMechanics.length }} механик
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="p-2 text-[#A0AABE] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Icon name="heroicons:chevron-left" class="w-5 h-5" />
          </button>
          
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="currentPage = page"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                currentPage === page
                  ? 'bg-gradient-to-r from-[#FF6E48] to-[#FF4757] text-white'
                  : 'text-[#A0AABE] hover:text-white hover:bg-[#0F1117]'
              ]"
            >
              {{ page }}
            </button>
            <span v-else class="px-2 text-[#A0AABE]/50">...</span>
          </template>
          
          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="p-2 text-[#A0AABE] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Icon name="heroicons:chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-white">
              {{ showAddModal ? '➕ Добавить механику' : '✏️ Редактировать механику' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-white transition-colors">
              ✕
            </button>
          </div>
          
          <form @submit.prevent="saveMechanic" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Название *</label>
                <input
                  v-model="mechanicForm.name"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Введите название механики"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Slug *</label>
                <input
                  v-model="mechanicForm.slug"
                  type="text"
                  required
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="mechanic-slug"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Тип *</label>
                <select
                  v-model="mechanicForm.type"
                  required
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                >
                  <option value="">Выберите тип</option>
                  <option value="bonus">Бонусные</option>
                  <option value="special">Специальные</option>
                  <option value="multiplier">Множители</option>
                  <option value="free_spins">Фриспины</option>
                  <option value="wild">Вайлды</option>
                  <option value="scatter">Скаттеры</option>
                  <option value="progressive">Прогрессивные</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Иконка</label>
                <input
                  v-model="mechanicForm.icon"
                  type="text"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="⚙️ (эмодзи или символ)"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Порядок сортировки</label>
                <input
                  v-model.number="mechanicForm.sort_order"
                  type="number"
                  min="0"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Описание</label>
              <textarea
                v-model="mechanicForm.description"
                rows="3"
                class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                placeholder="Описание механики"
              ></textarea>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Цвет (HEX)</label>
                <input
                  v-model="mechanicForm.color"
                  type="color"
                  class="w-full h-10 px-2 py-1 bg-gray-800 border border-gray-600 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">URL изображения</label>
                <input
                  v-model="mechanicForm.image_url"
                  type="url"
                  class="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="mechanicForm.is_active"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Активна</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="mechanicForm.is_popular"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Популярная</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="mechanicForm.is_featured"
                  type="checkbox"
                  class="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <span class="text-gray-300">Рекомендуемая</span>
              </label>
            </div>
            
            <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
              <button
                type="button"
                @click="closeModal"
                class="px-6 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ saving ? 'Сохранение...' : (showAddModal ? 'Добавить' : 'Сохранить') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-gray-900 border border-red-500/30 rounded-xl max-w-md w-full">
        <div class="p-6">
          <div class="text-center">
            <div class="text-6xl mb-4">⚠️</div>
            <h2 class="text-2xl font-bold text-white mb-4">Подтвердите удаление</h2>
            <p class="text-gray-300 mb-6">
              Вы уверены, что хотите удалить механику <strong>"{{ mechanicToDelete?.name }}"</strong>?
              Это действие нельзя отменить.
            </p>
            <div class="flex items-center justify-center space-x-4">
              <button
                @click="showDeleteModal = false"
                class="px-6 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                @click="confirmDelete"
                :disabled="deleting"
                class="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ deleting ? 'Удаление...' : 'Удалить' }}
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
const { getMechanics, createMechanic, updateMechanic, deleteMechanic: deleteMechanicApi } = useMechanics()

// Reactive data
const mechanics = ref([])
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)

// Modals
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const mechanicToDelete = ref(null)

// Search and filters
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedType = ref('')
const sortBy = ref('sort_order')
const sortOrder = ref('asc')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(20)

// Form data
const mechanicForm = ref({
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
const filteredMechanics = computed(() => {
  let filtered = mechanics.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(mechanic => 
      mechanic.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      mechanic.slug.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (mechanic.description && mechanic.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
  }
  
  if (selectedStatus.value !== '') {
    const isActive = selectedStatus.value === 'true'
    filtered = filtered.filter(mechanic => mechanic.is_active === isActive)
  }
  
  if (selectedType.value) {
    filtered = filtered.filter(mechanic => mechanic.type === selectedType.value)
  }
  
  // Sort
  filtered.sort((a, b) => {
    let aValue, bValue
    
    switch (sortBy.value) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'created_at':
        aValue = new Date(a.created_at)
        bValue = new Date(b.created_at)
        break
      case 'slots_count':
        aValue = a.slots_count || 0
        bValue = b.slots_count || 0
        break
      case 'sort_order':
        aValue = a.sort_order || 0
        bValue = b.sort_order || 0
        break
      default:
        return 0
    }
    
    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
  
  return filtered
})

const paginatedMechanics = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredMechanics.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredMechanics.value.length / itemsPerPage.value)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

const activeMechanics = computed(() => mechanics.value.filter(mechanic => mechanic.is_active).length)
const mechanicsWithSlots = computed(() => mechanics.value.filter(mechanic => (mechanic.slots_count || 0) > 0).length)
const popularMechanics = computed(() => mechanics.value.filter(mechanic => mechanic.is_popular).length)

// Methods
const getTypeLabel = (type) => {
  const typeLabels = {
    bonus: 'Бонусные',
    special: 'Специальные',
    multiplier: 'Множители',
    free_spins: 'Фриспины',
    wild: 'Вайлды',
    scatter: 'Скаттеры',
    progressive: 'Прогрессивные'
  }
  return typeLabels[type] || type || 'Не указан'
}

const loadMechanics = async () => {
  try {
    loading.value = true
    const response = await getMechanics()
    mechanics.value = response?.data || []
  } catch (error) {
    console.error('Ошибка загрузки механик:', error)
    mechanics.value = []
  } finally {
    loading.value = false
  }
}

const editMechanic = (mechanic) => {
  mechanicForm.value = {
    id: mechanic.id,
    name: mechanic.name,
    slug: mechanic.slug,
    description: mechanic.description || '',
    type: mechanic.type || '',
    icon: mechanic.icon || '',
    color: mechanic.color || '#8b5cf6',
    image_url: mechanic.image_url || '',
    sort_order: mechanic.sort_order || 0,
    is_active: mechanic.is_active,
    is_popular: mechanic.is_popular || false,
    is_featured: mechanic.is_featured || false
  }
  showEditModal.value = true
}

const deleteMechanic = (mechanic) => {
  mechanicToDelete.value = mechanic
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!mechanicToDelete.value) return
  
  try {
    deleting.value = true
    await deleteMechanicApi(mechanicToDelete.value.id)
    await loadMechanics()
    showDeleteModal.value = false
    mechanicToDelete.value = null
  } catch (error) {
    console.error('Ошибка удаления механики:', error)
    alert('Ошибка при удалении механики')
  } finally {
    deleting.value = false
  }
}

const toggleMechanicStatus = async (mechanic) => {
  try {
    const updatedMechanic = { ...mechanic, is_active: !mechanic.is_active }
    await updateMechanic(mechanic.id, updatedMechanic)
    await loadMechanics()
  } catch (error) {
    console.error('Ошибка изменения статуса механики:', error)
    alert('Ошибка при изменении статуса механики')
  }
}

const saveMechanic = async () => {
  try {
    saving.value = true
    
    if (showAddModal.value) {
      await createMechanic(mechanicForm.value)
    } else {
      await updateMechanic(mechanicForm.value.id, mechanicForm.value)
    }
    
    await loadMechanics()
    closeModal()
  } catch (error) {
    console.error('Ошибка сохранения механики:', error)
    alert('Ошибка при сохранении механики')
  } finally {
    saving.value = false
  }
}

const openCreateModal = () => {
  mechanicForm.value = {
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
  showAddModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  mechanicForm.value = {
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
}

// Auto-generate slug from name
watch(() => mechanicForm.value.name, (newName) => {
  if (showAddModal.value && newName) {
    mechanicForm.value.slug = newName
      .toLowerCase()
      .replace(/[^a-z0-9а-я]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }
})

// Load data on mount
onMounted(() => {
  loadMechanics()
})

// Page meta
useHead({
  title: 'SlotQuest Admin - Управление механиками',
  meta: [
    { name: 'description', content: 'Административная панель для управления механиками SlotQuest' }
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>