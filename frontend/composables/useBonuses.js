export const useBonuses = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiUrl

  const getBonuses = async (params = {}) => {
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
      const url = `${baseURL}/api/bonuses${queryString ? `?${queryString}` : ''}`

      const data = await $fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      return data?.data || data || []
    } catch (error) {
      console.error('Ошибка при получении бонусов:', error)
      throw error
    }
  }

  const getBonus = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/bonuses/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при получении бонуса:', error)
      throw error
    }
  }

  const createBonus = async (bonusData) => {
    try {
      const response = await fetch(`${API_BASE}/api/bonuses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bonusData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при создании бонуса:', error)
      throw error
    }
  }

  const updateBonus = async (id, bonusData) => {
    try {
      const response = await fetch(`${API_BASE}/api/bonuses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bonusData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при обновлении бонуса:', error)
      throw error
    }
  }

  const deleteBonus = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/bonuses/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при удалении бонуса:', error)
      throw error
    }
  }

  const toggleBonusStatus = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/api/bonuses/${id}/toggle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при изменении статуса бонуса:', error)
      throw error
    }
  }

  const getBonusStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/bonuses/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при получении статистики бонусов:', error)
      throw error
    }
  }

  const searchBonuses = async (searchTerm, filters = {}) => {
    try {
      const params = {
        search: searchTerm,
        ...filters
      }

      return await getBonuses(params)
    } catch (error) {
      console.error('Ошибка при поиске бонусов:', error)
      throw error
    }
  }

  const getPopularBonuses = async (limit = 10) => {
    try {
      const params = {
        is_popular: true,
        limit,
        sort_by: 'popularity_score',
        sort_order: 'desc'
      }

      return await getBonuses(params)
    } catch (error) {
      console.error('Ошибка при получении популярных бонусов:', error)
      throw error
    }
  }

  const getFeaturedBonuses = async (limit = 5) => {
    try {
      const params = {
        is_featured: true,
        limit,
        sort_by: 'created_at',
        sort_order: 'desc'
      }

      return await getBonuses(params)
    } catch (error) {
      console.error('Ошибка при получении рекомендуемых бонусов:', error)
      throw error
    }
  }

  const getBonusesByType = async (type, limit = 20) => {
    try {
      const params = {
        type,
        limit,
        is_active: true,
        sort_by: 'name',
        sort_order: 'asc'
      }

      return await getBonuses(params)
    } catch (error) {
      console.error('Ошибка при получении бонусов по типу:', error)
      throw error
    }
  }

  return {
    getBonuses,
    getBonus,
    createBonus,
    updateBonus,
    deleteBonus,
    toggleBonusStatus,
    getBonusStats,
    searchBonuses,
    getPopularBonuses,
    getFeaturedBonuses,
    getBonusesByType
  }
}
