<template>
  <div class="min-h-[calc(100vh-4rem)] bg-[#0B0E14] font-sans selection:bg-[#00EDFF]/30">
    <!-- Header -->
    <header class="bg-[#161A21]/80 backdrop-blur-md border-b border-[#353A4A] sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 py-3 lg:h-20 lg:py-0">
          <div class="flex items-center gap-3 sm:gap-4 min-w-0">
            <NuxtLink
              to="/admin"
              class="p-2.5 sm:p-3 bg-[#0B0E14] border border-[#353A4A] hover:border-[#FF6E48]/50 text-[#A0AABE] hover:text-[#FF6E48] rounded-xl transition-all duration-300 transform active:scale-95 hover:shadow-[0_0_15px_rgba(255,110,72,0.15)] flex items-center justify-center shrink-0"
              title="Вернуться в админ-панель"
            >
              <Icon name="solar:arrow-left-bold" class="w-5 h-5" />
            </NuxtLink>
            <h1 class="text-lg sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 sm:gap-3 min-w-0">
              <Icon name="solar:pen-new-round-bold" class="text-[#00EDFF] w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
              <span class="truncate">Управление блогами</span>
            </h1>
            <div class="h-8 w-px bg-[#353A4A] hidden sm:block"></div>
            <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#63F3AB]/10 border border-[#63F3AB]/20 rounded-lg text-[#63F3AB] text-sm font-bold shadow-[0_0_15px_rgba(99,243,171,0.1)]">
              <Icon name="solar:database-bold" class="w-4 h-4" />
              Всего: {{ totalItems }}
            </div>
          </div>

          <div class="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <!-- Refresh -->
            <button @click="refreshData" class="flex-1 sm:flex-none p-2.5 sm:p-3 bg-[#0B0E14] border border-[#353A4A] hover:border-[#00EDFF]/50 text-[#A0AABE] hover:text-[#00EDFF] rounded-xl transition-all duration-300 transform active:scale-95 hover:shadow-[0_0_15px_rgba(0,237,255,0.15)] flex items-center justify-center shrink-0" title="Обновить список">
              <Icon name="solar:refresh-circle-bold" class="w-5 h-5" />
              <span class="ml-2 font-bold sm:hidden">Обновить</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total -->
        <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#00EDFF]/30 transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#00EDFF]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#00EDFF]/10 transition-colors pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[#A0AABE] text-sm font-bold uppercase tracking-wider mb-1">Все записи</p>
              <p class="text-3xl font-black text-white">{{ totalItems }}</p>
            </div>
            <div class="p-3 bg-[#00EDFF]/10 rounded-xl">
              <Icon name="solar:document-text-bold" class="text-[#00EDFF] w-8 h-8" />
            </div>
          </div>
        </div>

        <!-- Published -->
        <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#63F3AB]/30 transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#63F3AB]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#63F3AB]/10 transition-colors pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[#A0AABE] text-sm font-bold uppercase tracking-wider mb-1">Опубликовано</p>
              <p class="text-3xl font-black text-white">{{ publishedItems }}</p>
            </div>
            <div class="p-3 bg-[#63F3AB]/10 rounded-xl">
              <Icon name="solar:check-circle-bold" class="text-[#63F3AB] w-8 h-8" />
            </div>
          </div>
        </div>

        <!-- Drafts -->
        <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#FFB020]/30 transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#FFB020]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#FFB020]/10 transition-colors pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[#A0AABE] text-sm font-bold uppercase tracking-wider mb-1">Черновики</p>
              <p class="text-3xl font-black text-white">{{ draftItems }}</p>
            </div>
            <div class="p-3 bg-[#FFB020]/10 rounded-xl">
              <Icon name="solar:pen-bold" class="text-[#FFB020] w-8 h-8" />
            </div>
          </div>
        </div>

        <!-- Featured -->
        <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl p-6 relative overflow-hidden group hover:border-[#CD0F8B]/30 transition-colors">
          <div class="absolute top-0 right-0 w-32 h-32 bg-[#CD0F8B]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#CD0F8B]/10 transition-colors pointer-events-none"></div>
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[#A0AABE] text-sm font-bold uppercase tracking-wider mb-1">Популярные</p>
              <p class="text-3xl font-black text-white">{{ featuredItems }}</p>
            </div>
            <div class="p-3 bg-[#CD0F8B]/10 rounded-xl">
              <Icon name="solar:star-fall-bold" class="text-[#CD0F8B] w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl p-6 mb-8 flex flex-col lg:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1 relative">
          <Icon name="solar:magnifer-bold" class="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0AABE] w-5 h-5 pointer-events-none" />
          <input v-model="searchQuery" type="text" placeholder="Поиск по заголовку или описанию..." class="w-full bg-[#0B0E14] border border-[#353A4A] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-[#A0AABE]/60 focus:outline-none focus:border-[#00EDFF]/50 transition-colors font-medium">
        </div>

        <!-- Filters array -->
        <div class="flex flex-wrap sm:flex-nowrap gap-4">
          <div class="w-full sm:w-[200px] relative">
            <Icon name="solar:folder-with-files-bold" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AABE] w-4 h-4 pointer-events-none" />
            <select v-model="categoryFilter" class="w-full appearance-none bg-[#0B0E14] border border-[#353A4A] rounded-xl py-3.5 pl-10 pr-10 text-white focus:outline-none focus:border-[#00EDFF]/50 transition-colors font-medium cursor-pointer">
              <option value="">Все категории</option>
              <option value="guides">Гайды</option>
              <option value="strategies">Стратегии</option>
              <option value="news">Новости индустрии</option>
            </select>
            <Icon name="solar:alt-arrow-down-bold" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0AABE] w-4 h-4 pointer-events-none" />
          </div>

          <div class="w-full sm:w-[180px] relative">
            <Icon name="solar:eye-bold" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AABE] w-4 h-4 pointer-events-none" />
            <select v-model="statusFilter" class="w-full appearance-none bg-[#0B0E14] border border-[#353A4A] rounded-xl py-3.5 pl-10 pr-10 text-white focus:outline-none focus:border-[#00EDFF]/50 transition-colors font-medium cursor-pointer">
              <option value="">Все статусы</option>
              <option value="published">Опубликованые</option>
              <option value="draft">Черновики</option>
            </select>
            <Icon name="solar:alt-arrow-down-bold" class="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0AABE] w-4 h-4 pointer-events-none" />
          </div>
          
          <button @click="clearFilters" class="px-4 py-3 bg-[#0B0E14] text-[#A0AABE] border border-[#353A4A] rounded-xl hover:text-white hover:border-[#A0AABE] transition-colors font-bold whitespace-nowrap">
            Сбросить
          </button>
        </div>
      </div>

      <!-- Data Grid -->
      <div class="bg-[#161A21] border border-[#353A4A] rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[500px]">
        <div class="flex-1 overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#0B0E14] border-b border-[#353A4A]">
                <th class="py-4 px-6 text-xs font-bold text-[#A0AABE] uppercase tracking-wider w-[100px]">Обложка</th>
                <th class="py-4 px-6 text-xs font-bold text-[#A0AABE] uppercase tracking-wider min-w-[250px]">Статья</th>
                <th class="py-4 px-6 text-xs font-bold text-[#A0AABE] uppercase tracking-wider hidden md:table-cell">Категория</th>
                <th class="py-4 px-6 text-xs font-bold text-[#A0AABE] uppercase tracking-wider text-center hidden sm:table-cell">Опубликовано</th>
                <th class="py-4 px-6 text-xs font-bold text-[#A0AABE] uppercase tracking-wider text-center rounded-tr-xl">Действие</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#353A4A]">

              <template v-if="loading">
                <tr v-for="i in 5" :key="i" class="animate-pulse">
                  <td class="py-4 px-6"><div class="w-20 h-14 bg-[#0B0E14] rounded-lg"></div></td>
                  <td class="py-4 px-6"><div class="w-48 h-5 bg-[#0B0E14] rounded mb-2"></div><div class="w-32 h-4 bg-[#0B0E14] rounded"></div></td>
                  <td class="py-4 px-6 hidden md:table-cell"><div class="w-24 h-5 bg-[#0B0E14] rounded"></div></td>
                  <td class="py-4 px-6 hidden sm:table-cell"><div class="w-20 h-5 mx-auto bg-[#0B0E14] rounded"></div></td>
                  <td class="py-4 px-6"><div class="w-20 h-6 mx-auto bg-[#0B0E14] rounded-full"></div></td>
                  <td class="py-4 px-6"><div class="w-24 h-10 ml-auto bg-[#0B0E14] rounded-lg"></div></td>
                </tr>
              </template>

              <tr v-else-if="filteredItems.length === 0">
                <td colspan="6" class="py-16 text-center">
                   <Icon name="solar:document-add-bold-duotone" class="text-[#353A4A] w-20 h-20 mx-auto mb-4" />
                   <h3 class="text-white text-xl font-bold mb-2">Статьи не найдены</h3>
                   <p class="text-[#A0AABE]">Попробуйте изменить параметры поиска</p>
                </td>
              </tr>

              <tr v-else v-for="item in paginatedItems" :key="item.id" class="hover:bg-[#0B0E14]/50 transition-colors group">

                <!-- Cover -->
                <td class="py-4 px-6 align-middle">
                  <div class="w-24 h-14 rounded-xl overflow-hidden bg-[#0B0E14] border border-[#353A4A] flex items-center justify-center shrink-0">
                    <img
                      v-if="item.image"
                      :src="item.image"
                      alt="Cover"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <Icon v-else name="solar:image-broken-bold" class="w-6 h-6 text-[#353A4A]" />
                  </div>
                </td>

                <!-- Info -->
                <td class="py-4 px-6 align-middle">
                  <div class="flex flex-col">
                    <span class="text-white font-bold text-base line-clamp-1" :title="item.title">{{ item.title }}</span>
                    <span class="text-[#A0AABE] text-xs mt-1 line-clamp-1" :title="item.excerpt">{{ item.excerpt || 'Нет описания' }}</span>
                  </div>
                </td>

                <!-- Category -->
                <td class="py-4 px-6 align-middle hidden md:table-cell">
                   <span class="px-2.5 py-1 bg-[#00EDFF]/10 text-[#00EDFF] border border-[#00EDFF]/30 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                     {{ getCategoryName(item.category) }}
                   </span>
                </td>

                <!-- Author & Date -->
                <td class="py-4 px-6 align-middle hidden sm:table-cell text-center">
                  <div class="flex flex-col items-center gap-1">
                    <div class="text-sm text-white font-semibold flex items-center gap-1.5"><Icon name="solar:user-bold" class="text-[#A0AABE]" /> {{ item.author }}</div>
                  </div>
                </td>

                <!-- Status (Live Toggle) -->
                <td class="py-4 px-6 align-middle text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="toggleBlogStatus(item)"
                      class="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 transform hover:scale-105"
                      :class="item.status === 'published' ? 'bg-[#63F3AB]/10 text-[#63F3AB] border border-[#63F3AB]/30 hover:bg-[#63F3AB]/20 shadow-[0_0_15px_rgba(99,243,171,0.1)] hover:shadow-[0_0_20px_rgba(99,243,171,0.2)]' : 'bg-[#FFB020]/10 border border-[#FFB020]/30 text-[#FFB020] hover:bg-[#FFB020]/20'"
                      :title="item.status === 'published' ? 'Скрыть с сайта' : 'Опубликовать на сайт'"
                    >
                      <Icon :name="item.status === 'published' ? 'solar:eye-bold' : 'solar:eye-closed-bold'" class="w-4 h-4" />
                      <span class="text-xs font-bold uppercase tracking-wider">{{ item.status === 'published' ? 'Live' : 'Draft' }}</span>
                    </button>
                    <NuxtLink v-if="item.status === 'published'" :to="`/blogs/${item.slug}`" target="_blank" class="p-2.5 bg-[#0B0E14] border border-[#353A4A] hover:border-[#63F3AB]/50 text-[#A0AABE] hover:text-[#63F3AB] rounded-xl transition-colors" title="Открыть на сайте">
                       <Icon name="solar:link-square-bold" class="w-4 h-4" />
                    </NuxtLink>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <!-- Pagination Footer -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t border-[#353A4A] bg-[#0B0E14] flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <span class="text-sm text-[#A0AABE] font-medium">
            Показано <span class="text-white">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> - <span class="text-white">{{ Math.min(currentPage * itemsPerPage, filteredItems.length) }}</span> из <span class="text-white">{{ filteredItems.length }}</span>
          </span>

          <div class="flex items-center gap-2">
            <button @click="currentPage--" :disabled="currentPage === 1" class="p-2.5 bg-[#161A21] border border-[#353A4A] rounded-lg text-white hover:border-[#00EDFF]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <Icon name="solar:alt-arrow-left-outline" class="w-4 h-4" />
            </button>
            <div class="px-4 py-2 bg-[#161A21] border border-[#353A4A] rounded-lg text-sm font-bold text-white">
              {{ currentPage }} / {{ totalPages }}
            </div>
             <button @click="currentPage++" :disabled="currentPage === totalPages" class="p-2.5 bg-[#161A21] border border-[#353A4A] rounded-lg text-white hover:border-[#00EDFF]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <Icon name="solar:alt-arrow-right-outline" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'

definePageMeta({
  layout: 'admin',
  title: 'Управление блогами - Админ панель'
})

const { getAdminBlogs, createBlog, updateBlog, deleteBlog } = useBlogs()


const items = ref([])
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')

const currentPage = ref(1)
const itemsPerPage = ref(10)

const getCategoryName = (c) => ({ guides: 'Гайды', strategies: 'Стратегии', news: 'Новости' }[c] || c)

const filteredItems = computed(() => {
  let filtered = items.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(i => 
      (i.title && i.title.toLowerCase().includes(query)) ||
      (i.excerpt && i.excerpt.toLowerCase().includes(query))
    )
  }
  if (statusFilter.value) {
    filtered = filtered.filter(i => i.status === statusFilter.value)
  }
  if (categoryFilter.value) {
    filtered = filtered.filter(i => i.category === categoryFilter.value)
  }
  return filtered
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredItems.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage.value))

const totalItems = computed(() => items.value.length)
const publishedItems = computed(() => items.value.filter(i => i.status === 'published').length)
const draftItems = computed(() => items.value.filter(i => i.status === 'draft').length)
const featuredItems = computed(() => items.value.filter(i => i.is_featured).length)

const fetchItems = async () => {
  loading.value = true
  try {
    const res = await getAdminBlogs()
    items.value = (Array.isArray(res) ? res : res.data || []).map(item => ({
      ...item,
      category: item.category || 'guides',
      status: item.is_published ? 'published' : 'draft',
      image: item.cover_image_url || '',
      content: item.content_markdown || item.content || '',
      author: item.author_name || 'Админ'
    }))
  } catch (err) {
    console.error('Failed to fetch blogs', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchItems()
})

const refreshData = async () => {
  searchQuery.value = ''
  currentPage.value = 1
  await fetchItems()
}

const toggleBlogStatus = async (item) => {
  const newStatus = item.status === 'published' ? 'draft' : 'published'
  const oldStatus = item.status
  item.status = newStatus
  
  try {
    await updateBlog(item.id, { is_published: newStatus === 'published' })
  } catch (err) {
    console.error('Quick toggle error', err)
    item.status = oldStatus // revert
  }
}

const clearFilters = () => { searchQuery.value = ''; statusFilter.value = ''; categoryFilter.value = ''; }

// Pagination resets on filter
watch([searchQuery, statusFilter, categoryFilter], () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* Scrollbar styling for modal textareas and contents */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: #0B0E14;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #353A4A;
  border-radius: 10px;
}
</style>
