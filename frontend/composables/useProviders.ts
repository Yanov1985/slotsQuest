export const useProviders = () => {
  const config = useRuntimeConfig()
  const baseURL = import.meta.client ? '' : config.public.apiUrl

  // Get all providers
  const getProviders = async (isAdmin = false) => {
    const endpoint = isAdmin ? '/api/providers/admin/all' : '/api/providers'
    const response = await $fetch<{ data: any }>(`${baseURL}${endpoint}`)
    return response.data
  }

  // Get provider by slug
  const getProviderBySlug = async (slug: string) => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/providers/${slug}`)
    return response.data
  }

  // Get slots by provider
  const getSlotsByProvider = async (slug: string) => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/providers/${slug}/slots`)
    return response.data
  }

  // Create provider
  const createProvider = async (providerData: any) => {
    try {
      const response = await $fetch(`${baseURL}/api/providers`, {
        method: 'POST',
        body: providerData
      })
      return response
    } catch (error) {
      console.error('Error creating provider:', error)
      console.error('API Error in useProviders.ts:', error);
      return null; // fallback
    }
  }

  // Update provider
  const updateProvider = async (id: string, providerData: any) => {
    try {
      const response = await $fetch(`${baseURL}/api/providers/${id}`, {
        method: 'PUT',
        body: providerData
      })
      return response
    } catch (error) {
      console.error('Error updating provider:', error)
      console.error('API Error in useProviders.ts:', error);
      return null; // fallback
    }
  }

  // Delete provider
  const deleteProvider = async (id: string) => {
    try {
      const response = await $fetch(`${baseURL}/api/providers/${id}`, {
        method: 'DELETE'
      })
      return response
    } catch (error) {
      console.error('Error deleting provider:', error)
      console.error('API Error in useProviders.ts:', error);
      return null; // fallback
    }
  }

  return {
    getProviders,
    getProviderBySlug,
    getSlotsByProvider,
    createProvider,
    updateProvider,
    deleteProvider
  }
}
