export const useCategories = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiUrl

  // Get all categories
  const getCategories = async () => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/categories`)
    return response.data
  }

  return {
    getCategories
  }
}