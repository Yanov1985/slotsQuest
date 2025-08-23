<template>
  <div
    class="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white"
  >
    <!-- Header -->
    <header
      class="relative bg-[#161A21]/80 backdrop-blur-sm border-b border-[#353A4A] sticky top-0 z-50"
    >
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/admin"
              class="text-[#A0AABE] hover:text-[#FF6E48] transition-colors flex items-center space-x-2"
            >
              <Icon name="heroicons:arrow-left" />
              <span>Назад к дашборду</span>
            </NuxtLink>
            <h1
              class="text-2xl font-bold font-display bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] bg-clip-text text-transparent flex items-center space-x-2"
            >
              <Icon name="heroicons:folder" class="text-[#FF6E48]" />
              <span>Управление категориями</span>
            </h1>
            <div
              class="px-3 py-1 bg-[#63F3AB]/10 border border-[#63F3AB]/30 rounded-full text-[#63F3AB] text-sm font-medium"
            >
              {{ categories.length }} категорий
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button
              @click="showAddModal = true"
              class="px-4 py-2 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <Icon name="heroicons:plus-circle" />
              <span>Добавить категорию</span>
            </button>
            <button
              @click="loadCategories"
              class="px-4 py-2 bg-[#1B1E26]/70 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <Icon name="heroicons:arrow-path" />
              <span>Обновить</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
     <main class="container mx-auto px-4 py-8">
       <!-- Header with Add Button -->
       <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
         <div>
           <h2 class="text-2xl font-bold text-white mb-1">Категории</h2>
           <p class="text-[#A0AABE]">Управление категориями игровых автоматов</p>
         </div>
         <button
           @click="openAddModal"
           class="bg-gradient-to-r from-[#FF6E48] to-[#FF5722] hover:from-[#FF5722] hover:to-[#E64A19] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
         >
           <Icon name="heroicons:plus" class="w-5 h-5" />
           Добавить категорию
         </button>
       </div>

       <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 backdrop-blur-sm hover:bg-[#1B1E26]/70 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#A0AABE] text-sm font-medium">Всего категорий</p>
              <p class="text-2xl font-bold text-white">{{ categories.length }}</p>
            </div>
            <div class="text-[#FF6E48] text-2xl">
              <Icon name="heroicons:folder" />
            </div>
          </div>
        </div>
        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 backdrop-blur-sm hover:bg-[#1B1E26]/70 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#A0AABE] text-sm font-medium">Активных</p>
              <p class="text-2xl font-bold text-white">{{ activeCategories }}</p>
            </div>
            <div class="text-[#63F3AB] text-2xl">
              <Icon name="heroicons:check-circle" />
            </div>
          </div>
        </div>
        <div class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 backdrop-blur-sm hover:bg-[#1B1E26]/70 transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[#A0AABE] text-sm font-medium">С играми</p>
              <p class="text-2xl font-bold text-white">{{ categoriesWithSlots }}</p>
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
              <p class="text-2xl font-bold text-white">{{ categories.filter(c => c.is_popular).length }}</p>
            </div>
            <div class="text-[#FF6E48] text-2xl">
              <Icon name="heroicons:fire" />
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
                placeholder="Поиск категорий..."
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

      <!-- Categories Grid -->
      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="n in 8"
          :key="n"
          class="bg-[#0F1117] border border-[#353A4A] rounded-xl p-6 animate-pulse"
        >
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

      <div
        v-else-if="filteredCategories.length === 0"
        class="text-center py-12"
      >
        <div class="text-6xl mb-4 text-[#FF6E48]">
          <Icon name="heroicons:folder" class="w-16 h-16 mx-auto" />
        </div>
        <h3 class="text-xl font-semibold text-[#A0AABE] mb-2">
          Категории не найдены
        </h3>
        <p class="text-[#6B7280] mb-6">
          {{
            searchQuery
              ? 'Попробуйте изменить поисковый запрос'
              : 'Добавьте первую категорию'
          }}
        </p>
        <button
          @click="showAddModal = true"
          class="px-6 py-3 bg-gradient-to-r from-[#FF6E48] to-[#CD5A3C] hover:from-[#FF6E48]/90 hover:to-[#CD5A3C]/90 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
        >
          <Icon name="heroicons:plus-circle" />
          <span>Добавить категорию</span>
        </button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="category in paginatedCategories" :key="category.id" class="bg-[#1B1E26]/50 border border-[#353A4A] rounded-xl p-6 hover:border-[#FF6E48]/30 transition-all group backdrop-blur-sm">
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 bg-[#0F1117] rounded-lg flex items-center justify-center border border-[#353A4A]">
              <Icon
                :name="category.icon || 'heroicons:squares-2x2'"
                class="w-8 h-8 text-[#FF6E48]"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-white group-hover:text-[#FF6E48] transition-colors">{{ category.name }}</h3>
              <p class="text-sm text-[#A0AABE]">{{ category.slug }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <span v-if="category.is_active" class="w-3 h-3 bg-[#63F3AB] rounded-full" title="Активна"></span>
              <span v-else class="w-3 h-3 bg-[#FF4757] rounded-full" title="Неактивна"></span>
              <Icon v-if="category.is_popular" name="heroicons:star" class="w-4 h-4 text-[#FFD700]" title="Популярная" />
            </div>
          </div>
          
          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-[#A0AABE]">Слотов:</span>
              <span class="text-[#63F3AB] font-medium">{{ category.slots_count || 0 }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-[#A0AABE]">Порядок:</span>
              <span class="text-white">{{ category.sort_order || 0 }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-[#A0AABE]">Создана:</span>
              <span class="text-white">{{ new Date(category.created_at).toLocaleDateString('ru-RU') }}</span>
            </div>
          </div>
          
          <div class="flex items-center justify-between pt-4 border-t border-[#353A4A]">
            <div class="flex items-center space-x-2">
              <button @click="editCategory(category)" class="p-2 bg-[#1B1E26]/70 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg transition-colors" title="Редактировать">
                <Icon name="heroicons:pencil" class="w-4 h-4 text-[#A0AABE]" />
              </button>
              <button @click="toggleCategoryStatus(category)" class="p-2 bg-[#1B1E26]/70 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg transition-colors" :title="category.is_active ? 'Деактивировать' : 'Активировать'">
                <Icon :name="category.is_active ? 'heroicons:pause' : 'heroicons:play'" class="w-4 h-4 text-[#A0AABE]" />
              </button>
              <button @click="deleteCategory(category)" class="p-2 bg-[#1B1E26]/70 hover:bg-[#1B1E26] border border-[#353A4A] rounded-lg transition-colors" title="Удалить">
                <Icon name="heroicons:trash" class="w-4 h-4 text-[#FF4757]" />
              </button>
            </div>
            <NuxtLink :to="`/admin/categories/${category.id}/slots`" class="text-xs text-[#FF6E48] hover:text-[#CD5A3C] transition-colors flex items-center space-x-1">
              <span>Просмотреть слоты</span>
              <Icon name="heroicons:arrow-right" class="w-3 h-3" />
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <div class="text-sm text-[#A0AABE]">
          Показано <span class="text-white font-semibold">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> -
          <span class="text-white font-semibold">{{ Math.min(currentPage * itemsPerPage, filteredCategories.length) }}</span> из
          <span class="text-white font-semibold">{{ filteredCategories.length }}</span> категорий
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1B1E26] hover:border-[#FF6E48] transition-all flex items-center gap-2"
          >
            <Icon name="heroicons:chevron-left" class="w-4 h-4" />
            Назад
          </button>
          
          <div class="flex items-center gap-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-3 py-2 rounded-lg text-sm font-semibold transition-all',
                page === currentPage
                  ? 'bg-gradient-to-r from-[#FF6E48] to-[#FF5722] text-white shadow-lg'
                  : 'bg-[#1B1E26]/50 border border-[#353A4A] text-[#A0AABE] hover:bg-[#1B1E26] hover:border-[#FF6E48] hover:text-white'
              ]"
            >
              {{ page }}
            </button>
          </div>
          
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-[#1B1E26]/50 border border-[#353A4A] rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1B1E26] hover:border-[#FF6E48] transition-all flex items-center gap-2"
          >
            Вперед
            <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>

    <!-- Add/Edit Modal -->
    <div
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-[#1B1E26] border border-[#353A4A] rounded-2xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-white">
            {{ showAddModal ? 'Добавить категорию' : 'Редактировать категорию' }}
          </h3>
          <button
            @click="closeModal"
            class="p-2 hover:bg-[#353A4A] rounded-lg transition-colors"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6 text-[#A0AABE]" />
          </button>
        </div>

        <form @submit.prevent="saveCategory" class="space-y-6">
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-semibold text-white mb-2">
                Название категории
              </label>
              <input
                v-model="categoryForm.name"
                type="text"
                required
                class="w-full bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white placeholder-[#A0AABE] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
                placeholder="Введите название категории"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-white mb-2">
                URL слаг
              </label>
              <input
                v-model="categoryForm.slug"
                type="text"
                required
                class="w-full bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white placeholder-[#A0AABE] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all font-mono"
                placeholder="category-slug"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-white mb-2">
                Описание
              </label>
              <textarea
                v-model="categoryForm.description"
                rows="3"
                class="w-full bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white placeholder-[#A0AABE] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all resize-none"
                placeholder="Описание категории"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-white mb-2">
                  Иконка
                </label>
                <input
                  v-model="categoryForm.icon"
                  type="text"
                  class="w-full bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white placeholder-[#A0AABE] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all font-mono"
                  placeholder="heroicons:squares-2x2"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-white mb-2">
                  Цвет
                </label>
                <input
                  v-model="categoryForm.color"
                  type="color"
                  class="w-full h-12 bg-[#0F1117] border border-[#353A4A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-white mb-2">
                Порядок сортировки
              </label>
              <input
                v-model.number="categoryForm.sort_order"
                type="number"
                min="0"
                class="w-full bg-[#0F1117] border border-[#353A4A] rounded-lg px-4 py-3 text-white placeholder-[#A0AABE] focus:outline-none focus:ring-2 focus:ring-[#FF6E48] focus:border-[#FF6E48] transition-all"
                placeholder="0"
              />
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-[#0F1117] border border-[#353A4A] rounded-lg">
                <div>
                  <label class="text-sm font-semibold text-white">Статус категории</label>
                  <p class="text-xs text-[#A0AABE] mt-1">Активные категории отображаются на сайте</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    v-model="categoryForm.is_active"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-[#353A4A] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FF6E48]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#FF6E48] peer-checked:to-[#FF5722]"></div>
                </label>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center justify-between p-3 bg-[#0F1117] border border-[#353A4A] rounded-lg">
                  <span class="text-sm text-white">Популярная</span>
                  <input
                    v-model="categoryForm.is_popular"
                    type="checkbox"
                    class="w-4 h-4 text-[#FF6E48] bg-[#353A4A] border-[#353A4A] rounded focus:ring-[#FF6E48] focus:ring-2"
                  />
                </div>
                <div class="flex items-center justify-between p-3 bg-[#0F1117] border border-[#353A4A] rounded-lg">
                  <span class="text-sm text-white">Рекомендуемая</span>
                  <input
                    v-model="categoryForm.is_featured"
                    type="checkbox"
                    class="w-4 h-4 text-[#FFD700] bg-[#353A4A] border-[#353A4A] rounded focus:ring-[#FFD700] focus:ring-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-4 pt-6 border-t border-[#353A4A]">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-6 py-3 bg-[#0F1117] border border-[#353A4A] text-white rounded-lg hover:bg-[#1B1E26] hover:border-[#FF6E48] transition-all font-semibold"
            >
              Отмена
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF6E48] to-[#FF5722] hover:from-[#FF5722] hover:to-[#E64A19] text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ saving ? 'Сохранение...' : showAddModal ? 'Добавить категорию' : 'Сохранить изменения' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showDeleteModal = false"
    >
      <div class="bg-[#1B1E26] border border-[#353A4A] rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div class="flex items-start gap-4 mb-6">
          <div class="w-12 h-12 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center border border-red-500/30">
            <Icon name="heroicons:exclamation-triangle" class="w-6 h-6 text-red-400" />
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-white mb-1">Удалить категорию</h3>
            <p class="text-sm text-[#A0AABE]">
              Это действие нельзя отменить
            </p>
          </div>
        </div>

        <div class="bg-[#0F1117] border border-[#353A4A] rounded-lg p-4 mb-6">
          <p class="text-white mb-2">
            Вы уверены, что хотите удалить категорию
            <span class="font-bold text-[#FF6E48]">"{{ categoryToDelete?.name }}"</span>?
          </p>
          <p class="text-sm text-[#A0AABE]">
            Все связанные слоты будут перемещены в категорию "Без категории".
          </p>
        </div>

        <div class="flex gap-4">
          <button
            @click="showDeleteModal = false"
            class="flex-1 px-6 py-3 bg-[#0F1117] border border-[#353A4A] text-white rounded-lg hover:bg-[#1B1E26] hover:border-[#FF6E48] transition-all font-semibold"
          >
            Отмена
          </button>
          <button
            @click="confirmDelete"
            :disabled="deleting"
            class="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ deleting ? 'Удаление...' : 'Удалить категорию' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Composables
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory: deleteCategoryApi,
} = useCategories()

// Reactive data
const categories = ref([])
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)

// Modals
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const categoryToDelete = ref(null)

// Search and filters
const searchQuery = ref('')
const selectedStatus = ref('')
const sortBy = ref('sort_order')
const sortOrder = ref('asc')

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(12)

// Form data
const categoryForm = ref({
  name: '',
  slug: '',
  description: '',
  icon: '',
  color: '#6366f1',
  image_url: '',
  sort_order: 0,
  is_active: true,
  is_popular: false,
  is_featured: false,
})

// Computed properties
const filteredCategories = computed(() => {
  let filtered = categories.value

  if (searchQuery.value) {
    filtered = filtered.filter(
      (category) =>
        category.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }

  if (selectedStatus.value !== '') {
    const isActive = selectedStatus.value === 'true'
    filtered = filtered.filter((category) => category.is_active === isActive)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'created_at':
        return new Date(b.created_at) - new Date(a.created_at)
      case 'slots_count':
        return (b.slots_count || 0) - (a.slots_count || 0)
      case 'sort_order':
        return (a.sort_order || 0) - (b.sort_order || 0)
      default:
        return 0
    }
  })

  return filtered
})

const activeCategories = computed(
  () => categories.value.filter((category) => category.is_active).length,
)
const categoriesWithSlots = computed(
  () =>
    categories.value.filter((category) => (category.slots_count || 0) > 0)
      .length,
)
const popularCategories = computed(
  () => categories.value.filter((category) => category.is_popular).length,
)

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredCategories.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredCategories.value.length / itemsPerPage.value)
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
  
  return pages.filter(page => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page))
})

// Pagination methods
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
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

// Sorting methods
const setSortBy = (field) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
  currentPage.value = 1
}

// Methods
const loadCategories = async () => {
  try {
    loading.value = true
    const response = await getCategories()
    categories.value = response || []
  } catch (error) {
    console.error('Ошибка загрузки категорий:', error)
    categories.value = []
  } finally {
    loading.value = false
  }
}

const editCategory = (category) => {
  categoryForm.value = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    icon: category.icon || '',
    color: category.color || '#6366f1',
    image_url: category.image_url || '',
    sort_order: category.sort_order || 0,
    is_active: category.is_active,
    is_popular: category.is_popular || false,
    is_featured: category.is_featured || false,
  }
  showEditModal.value = true
}

const deleteCategory = (category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!categoryToDelete.value) return

  try {
    deleting.value = true
    await deleteCategoryApi(categoryToDelete.value.id)
    await loadCategories()
    showDeleteModal.value = false
    categoryToDelete.value = null
  } catch (error) {
    console.error('Ошибка удаления категории:', error)
    alert('Ошибка при удалении категории')
  } finally {
    deleting.value = false
  }
}

const toggleCategoryStatus = async (category) => {
  try {
    const updatedCategory = { ...category, is_active: !category.is_active }
    await updateCategory(category.id, updatedCategory)
    await loadCategories()
  } catch (error) {
    console.error('Ошибка изменения статуса категории:', error)
    alert('Ошибка при изменении статуса категории')
  }
}

const saveCategory = async () => {
  try {
    saving.value = true

    if (showAddModal.value) {
      await createCategory(categoryForm.value)
    } else {
      await updateCategory(categoryForm.value.id, categoryForm.value)
    }

    await loadCategories()
    closeModal()
  } catch (error) {
    console.error('Ошибка сохранения категории:', error)
    alert('Ошибка при сохранении категории')
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  categoryForm.value = {
    name: '',
    slug: '',
    description: '',
    icon: '',
    color: '#6366f1',
    image_url: '',
    sort_order: 0,
    is_active: true,
    is_popular: false,
    is_featured: false,
  }
}

// Auto-generate slug from name
watch(
  () => categoryForm.value.name,
  (newName) => {
    if (showAddModal.value && newName) {
      categoryForm.value.slug = newName
        .toLowerCase()
        .replace(/[^a-z0-9а-я]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    }
  },
)

// Watchers
watch([searchQuery, selectedStatus], () => {
  currentPage.value = 1
})

// Load categories on mount
onMounted(() => {
  loadCategories()
})

// Page meta
useHead({
  title: 'SlotQuest Admin - Управление категориями',
  meta: [
    {
      name: 'description',
      content: 'Административная панель для управления категориями SlotQuest',
    },
  ],
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0F1117;
}

::-webkit-scrollbar-thumb {
  background: #353A4A;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #FF6E48;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
