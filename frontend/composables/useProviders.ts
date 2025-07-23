export const useProviders = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiUrl

  // Get all providers
  const getProviders = async () => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/providers`)
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

  return {
    getProviders,
    getProviderBySlug,
    getSlotsByProvider
  }
}