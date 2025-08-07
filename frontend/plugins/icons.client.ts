export default defineNuxtPlugin(async () => {
  // Предварительная загрузка часто используемых иконок
  const iconNames = [
    'heroicons:squares-2x2',
    'heroicons:check-circle',
    'heroicons:building-office',
    'heroicons:chart-bar',
    'heroicons:plus-circle',
    'heroicons:arrow-path',
    'heroicons:funnel',
    'heroicons:magnifying-glass',
    'heroicons:eye',
    'heroicons:eye-slash',
    'heroicons:x-circle',
    'heroicons:chevron-left',
    'heroicons:chevron-right',
    'heroicons:arrow-uturn-left',
    'heroicons:document-plus',
    'heroicons:shield-exclamation',
    'heroicons:trash',
    'heroicons:arrow-left',
    'heroicons:cog-6-tooth',
    'heroicons:x-mark',
    'heroicons:document-text',
    'heroicons:users',
    'heroicons:user',
    'heroicons:star',
    'heroicons:newspaper',
    'heroicons:gift',
    'heroicons:building-library',
    'heroicons:chart-bar-square',
    'heroicons:cursor-arrow-rays',
    'heroicons:fire',
    'heroicons:wrench-screwdriver',
    'heroicons:globe-alt',
    'heroicons:tag',
    'heroicons:map',
    'heroicons:folder',
    'heroicons:paint-brush'
  ]

  // Предварительная загрузка иконок на клиенте
  if (process.client) {
    try {
      // Используем динамический импорт для предварительной загрузки иконок
      const { loadIcon } = await import('@iconify/vue')
      
      // Загружаем иконки асинхронно
      iconNames.forEach(async (iconName) => {
        try {
          await loadIcon(iconName)
        } catch (error) {
          console.warn(`Не удалось предварительно загрузить иконку: ${iconName}`, error)
        }
      })
    } catch (error) {
      console.warn('Ошибка предварительной загрузки иконок:', error)
    }
  }
})