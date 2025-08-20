export const useMechanics = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase || 'http://localhost:3001'

  const getMechanics = async (params = {}) => {
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
      
      const response = await fetch(url, {
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
      console.error('Ошибка при получении механик:', error)
      throw error
    }
  }

  const getMechanic = async (id) => {
    try {
      const response = await fetch(`${baseURL}/api/mechanics/${id}`, {
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
      console.error('Ошибка при получении механики:', error)
      throw error
    }
  }

  const createMechanic = async (mechanicData) => {
    try {
      const response = await fetch(`${baseURL}/api/mechanics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mechanicData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при создании механики:', error)
      throw error
    }
  }

  const updateMechanic = async (id, mechanicData) => {
    try {
      const response = await fetch(`${baseURL}/api/mechanics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mechanicData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при обновлении механики:', error)
      throw error
    }
  }

  const deleteMechanic = async (id) => {
    try {
      const response = await fetch(`${baseURL}/api/mechanics/${id}`, {
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
      console.error('Ошибка при удалении механики:', error)
      throw error
    }
  }

  const toggleMechanicStatus = async (id) => {
    try {
      const response = await fetch(`${baseURL}/api/mechanics/${id}/toggle`, {
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
      console.error('Ошибка при изменении статуса механики:', error)
      throw error
    }
  }

  const getMechanicStats = async () => {
    try {
      const response = await fetch(`${baseURL}/api/mechanics/stats`, {
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
      console.error('Ошибка при получении статистики механик:', error)
      throw error
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
      throw error
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
      throw error
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
      throw error
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
      throw error
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