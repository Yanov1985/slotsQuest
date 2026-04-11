export const useFeatures = () => {
  const config = useRuntimeConfig()
  const baseURL = import.meta.client ? '' : config.public.apiUrl

  const getFeatures = async (params = {}) => {
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
      const url = `${baseURL}/api/features${queryString ? `?${queryString}` : ''}`
      
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
      console.error('API Error in useFeatures.js:', error);
      return null; // fallback
    }
  }

  const getFeature = async (id) => {
    try {
      const response = await fetch(`${baseURL}/api/features/${id}`, {
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
      console.error('API Error in useFeatures.js:', error);
      return null; // fallback
    }
  }

  const createFeature = async (featureData) => {
    try {
      const response = await fetch(`${baseURL}/api/features`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(featureData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при создании механики:', error)
      console.error('API Error in useFeatures.js:', error);
      return null; // fallback
    }
  }

  const updateFeature = async (id, featureData) => {
    try {
      const response = await fetch(`${baseURL}/api/features/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(featureData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при обновлении механики:', error)
      console.error('API Error in useFeatures.js:', error);
      return null; // fallback
    }
  }

  const deleteFeature = async (id) => {
    try {
      const response = await fetch(`${baseURL}/api/features/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return true
    } catch (error) {
      console.error('Ошибка при удалении механики:', error)
      console.error('API Error in useFeatures.js:', error);
      return null; // fallback
    }
  }

  const getFeaturesBySlot = async (slotId) => {
    try {
      const response = await fetch(`${baseURL}/api/slots/${slotId}/features`, {
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
      console.error('Ошибка при получении механик слота:', error)
      console.error('API Error in useFeatures.js:', error);
      return null; // fallback
    }
  }

  const getSlotsByFeature = async (featureId) => {
    try {
      const response = await fetch(`${baseURL}/api/features/${featureId}/slots`, {
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
      console.error('Ошибка при получении слотов механики:', error)
      console.error('API Error in useFeatures.js:', error);
      return null; // fallback
    }
  }

  const addFeatureToSlot = async (slotId, featureId) => {
    try {
      const response = await fetch(`${baseURL}/api/slots/${slotId}/features`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ feature_id: featureId })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка при добавлении механики к слоту:', error)
      console.error('API Error in useFeatures.js:', error);
      return null; // fallback
    }
  }

  const removeFeatureFromSlot = async (slotId, featureId) => {
    try {
      const response = await fetch(`${baseURL}/api/slots/${slotId}/features/${featureId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return true
    } catch (error) {
      console.error('Ошибка при удалении механики из слота:', error)
      console.error('API Error in useFeatures.js:', error);
      return null; // fallback
    }
  }

  const getPopularFeatures = async (limit = 10) => {
    try {
      const response = await fetch(`${baseURL}/api/features/popular?limit=${limit}`, {
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
      console.error('Ошибка при получении популярных механик:', error)
      console.error('API Error in useFeatures.js:', error);
      return null; // fallback
    }
  }

  const getFeaturedFeatures = async (limit = 10) => {
    try {
      const response = await fetch(`${baseURL}/api/features/featured?limit=${limit}`, {
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
      console.error('Ошибка при получении рекомендуемых механик:', error)
      console.error('API Error in useFeatures.js:', error);
      return null; // fallback
    }
  }

  return {
    getFeatures,
    getFeature,
    createFeature,
    updateFeature,
    deleteFeature,
    getFeaturesBySlot,
    getSlotsByFeature,
    addFeatureToSlot,
    removeFeatureFromSlot,
    getPopularFeatures,
    getFeaturedFeatures
  }
}
