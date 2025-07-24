export const useSlotsApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiUrl

  // Get all slots with optional filters
  const getSlots = async (filters?: {
    provider?: string
    category?: string
    limit?: number
    offset?: number
  }) => {
    const query = new URLSearchParams()

    if (filters?.provider) query.append('provider', filters.provider)
    if (filters?.category) query.append('category', filters.category)
    if (filters?.limit) query.append('limit', filters.limit.toString())
    if (filters?.offset) query.append('offset', filters.offset.toString())

    const queryString = query.toString()
    const url = `${baseURL}/api/slots${queryString ? `?${queryString}` : ''}`

    const response = await $fetch<{ data: any }>(url)
    return response.data
  }

  // Get featured slots
  const getFeaturedSlots = async () => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/slots/featured`)
    return response.data
  }

  // Get popular slots
  const getPopularSlots = async () => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/slots/popular`)
    return response.data
  }

  // Search slots
  const searchSlots = async (query: string) => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/slots/search?q=${encodeURIComponent(query)}`)
    return response.data
  }

  // Get slot by slug
  const getSlotBySlug = async (slug: string) => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/slots/${slug}`)
    return response.data
  }

  // Get slot reviews
  const getSlotReviews = async (slug: string) => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/slots/${slug}/reviews`)
    return response.data
  }

  // Create slot review
  const createSlotReview = async (slug: string, reviewData: {
    title: string
    content: string
    rating: number
    pros?: string[]
    cons?: string[]
    author_name?: string
    author_email?: string
  }) => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/slots/${slug}/reviews`, {
      method: 'POST',
      body: reviewData
    })
    return response.data
  }

  // Add slot rating
  const addSlotRating = async (slug: string, ratingData: {
    rating: number
    userIp: string
    comment?: string
  }) => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/slots/${slug}/rating`, {
      method: 'POST',
      body: ratingData
    })
    return response.data
  }

  // Get slot rating
  const getSlotRating = async (slug: string) => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/slots/${slug}/rating`)
    return response.data
  }

  // Create slot
  const createSlot = async (slotData: any) => {
    try {
      const response = await $fetch(`${baseURL}/api/slots`, {
        method: 'POST',
        body: slotData
      })
      return response
    } catch (error) {
      console.error('Error creating slot:', error)
      throw error
    }
  }

  // Update slot
  const updateSlot = async (id: string, slotData: any) => {
    try {
      const response = await $fetch(`${baseURL}/api/slots/${id}`, {
        method: 'PUT',
        body: slotData
      })
      return response
    } catch (error) {
      console.error('Error updating slot:', error)
      throw error
    }
  }

  // Delete slot
  const deleteSlot = async (id: string) => {
    try {
      const response = await $fetch(`${baseURL}/api/slots/${id}`, {
        method: 'DELETE'
      })
      return response
    } catch (error) {
      console.error('Error deleting slot:', error)
      throw error
    }
  }

  return {
    getSlots,
    getFeaturedSlots,
    getPopularSlots,
    searchSlots,
    getSlotBySlug,
    getSlotReviews,
    createSlotReview,
    addSlotRating,
    getSlotRating,
    createSlot,
    updateSlot,
    deleteSlot
  }
}