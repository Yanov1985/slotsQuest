export const useMechanics = () => {
  const config = useRuntimeConfig()
  const baseURL = import.meta.client ? '' : config.public.apiUrl

  const getMechanics = async (params = {}) => {
    console.log('[DEBUG] baseURL is:', baseURL);
    try {
      const query = new URLSearchParams()

      if (params.search) query.append('search', params.search)
      if (params.type) query.append('type', params.type)
      if (params.is_active !== undefined) query.append('is_active', params.is_active)
      if (params.is_popular !== undefined) query.append('is_popular', params.is_popular)
      if (params.is_featured !== undefined) query.append('is_featured', params.is_featured)
      if (params.limit) query.append('limit', params.limit)
      if (params.offset) query.append('offset', params.offset)
      if (params.sort_by) query.append('sort_by', params.sort_by)
      if (params.sort_order) query.append('sort_order', params.sort_order)

      const queryString = query.toString()
      const url = `${baseURL}/api/mechanics${queryString ? `?${queryString}` : ''}`

      const data = await $fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return data?.data || data || []
    } catch (error) {
      console.error('Ошибка при получении механик:', error)
      console.error('API Error in useMechanics.js:', error);
      return null; // fallback
    }
  }

  const getMechanic = async (id) => {
    try {
      const data = await $fetch(`${baseURL}/api/mechanics/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return data
    } catch (error) {
      console.error('Ошибка при получении механики:', error)
      console.error('API Error in useMechanics.js:', error);
      return null; // fallback
    }
  }

  const createMechanic = async (mechanicData) => {
    try {
      const data = await $fetch(`${baseURL}/api/mechanics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mechanicData)
      })

      return data
    } catch (error) {
      console.error('Ошибка при создании механики:', error)
      console.error('API Error in useMechanics.js:', error);
      return null; // fallback
    }
  }

  const updateMechanic = async (id, mechanicData) => {
    try {
      const data = await $fetch(`${baseURL}/api/mechanics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mechanicData)
      })

      return data
    } catch (error) {
      console.error('Ошибка при обновлении механики:', error)
      console.error('API Error in useMechanics.js:', error);
      return null; // fallback
    }
  }

  const deleteMechanic = async (id) => {
    try {
      const data = await $fetch(`${baseURL}/api/mechanics/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return data
    } catch (error) {
      console.error('Ошибка при удалении механики:', error)
      console.error('API Error in useMechanics.js:', error);
      return null; // fallback
    }
  }

  const toggleMechanicStatus = async (id) => {
    try {
      const data = await $fetch(`${baseURL}/api/mechanics/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return data
    } catch (error) {
      console.error('Ошибка при изменении статуса механики:', error)
      console.error('API Error in useMechanics.js:', error);
      return null; // fallback
    }
  }

  const getMechanicStats = async () => {
    try {
      const data = await $fetch(`${baseURL}/api/mechanics/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return data
    } catch (error) {
      console.error('Ошибка при получении статистики механик:', error)
      console.error('API Error in useMechanics.js:', error);
      return null; // fallback
    }
  }

  const searchMechanics = async (searchTerm, filters = {}) => {
    try {
      const params = {
        search: searchTerm,
        ...filters
      }

      return await getMechanics(params)
    } catch (error) {
      console.error('Ошибка при поиске механик:', error)
      console.error('API Error in useMechanics.js:', error);
      return null; // fallback
    }
  }

  const getPopularMechanics = async (limit = 10) => {
    try {
      const params = {
        is_popular: true,
        limit,
        sort_by: 'popularity_score',
        sort_order: 'desc'
      }

      return await getMechanics(params)
    } catch (error) {
      console.error('Ошибка при получении популярных механик:', error)
      console.error('API Error in useMechanics.js:', error);
      return null; // fallback
    }
  }

  const getFeaturedMechanics = async (limit = 5) => {
    try {
      const params = {
        is_featured: true,
        limit,
        sort_by: 'created_at',
        sort_order: 'desc'
      }

      return await getMechanics(params)
    } catch (error) {
      console.error('Ошибка при получении рекомендуемых механик:', error)
      console.error('API Error in useMechanics.js:', error);
      return null; // fallback
    }
  }

  const getMechanicsByType = async (type, limit = 20) => {
    try {
      const params = {
        type,
        limit,
        is_active: true,
        sort_by: 'name',
        sort_order: 'asc'
      }

      return await getMechanics(params)
    } catch (error) {
      console.error('Ошибка при получении механик по типу:', error)
      console.error('API Error in useMechanics.js:', error);
      return null; // fallback
    }
  }

  return {
    getMechanics,
    getMechanic,
    createMechanic,
    updateMechanic,
    deleteMechanic,
    toggleMechanicStatus,
    getMechanicStats,
    searchMechanics,
    getPopularMechanics,
    getFeaturedMechanics,
    getMechanicsByType
  }
}
