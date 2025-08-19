export const useThemes = () => {
  const themes = ref([])
  const loading = ref(false)
  const error = ref(null)
  const config = useRuntimeConfig()

  const fetchThemes = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await $fetch(`${config.public.apiUrl}/api/themes`)
      themes.value = data || []
    } catch (err) {
      error.value = err.message || 'Failed to fetch themes'
      console.error('Error fetching themes:', err)
    } finally {
      loading.value = false
    }
  }

  const getThemes = async () => {
    try {
      const { data } = await $fetch(`${config.public.apiUrl}/api/themes`)
      return data || []
    } catch (err) {
      console.error('Error getting themes:', err)
      throw err
    }
  }

  const createTheme = async (themeData) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await $fetch(`${config.public.apiUrl}/api/themes`, {
        method: 'POST',
        body: themeData
      })
      themes.value.push(data)
      return data
    } catch (err) {
      error.value = err.message || 'Failed to create theme'
      console.error('Error creating theme:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTheme = async (id, themeData) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await $fetch(`${config.public.apiUrl}/api/themes/${id}`, {
        method: 'PUT',
        body: themeData
      })
      const index = themes.value.findIndex(theme => theme.id === id)
      if (index !== -1) {
        themes.value[index] = data
      }
      return data
    } catch (err) {
      error.value = err.message || 'Failed to update theme'
      console.error('Error updating theme:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTheme = async (id) => {
    loading.value = true
    error.value = null
    try {
      await $fetch(`${config.public.apiUrl}/api/themes/${id}`, {
        method: 'DELETE'
      })
      themes.value = themes.value.filter(theme => theme.id !== id)
    } catch (err) {
      error.value = err.message || 'Failed to delete theme'
      console.error('Error deleting theme:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getThemeById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await $fetch(`${config.public.apiUrl}/api/themes/${id}`)
      return data
    } catch (err) {
      error.value = err.message || 'Failed to fetch theme'
      console.error('Error fetching theme:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getPopularThemes = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await $fetch(`${config.public.apiUrl}/api/themes/popular`)
      return data || []
    } catch (err) {
      error.value = err.message || 'Failed to fetch popular themes'
      console.error('Error fetching popular themes:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  const getFeaturedThemes = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await $fetch(`${config.public.apiUrl}/api/themes/featured`)
      return data || []
    } catch (err) {
      error.value = err.message || 'Failed to fetch featured themes'
      console.error('Error fetching featured themes:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  const getSlotsByTheme = async (themeId) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await $fetch(`${config.public.apiUrl}/api/themes/${themeId}/slots`)
      return data || []
    } catch (err) {
      error.value = err.message || 'Failed to fetch slots by theme'
      console.error('Error fetching slots by theme:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    themes: readonly(themes),
    loading: readonly(loading),
    error: readonly(error),
    fetchThemes,
    getThemes,
    createTheme,
    updateTheme,
    deleteTheme,
    getThemeById,
    getPopularThemes,
    getFeaturedThemes,
    getSlotsByTheme
  }
}