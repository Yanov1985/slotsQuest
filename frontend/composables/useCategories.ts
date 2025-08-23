export const useCategories = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiUrl

  // Get all categories
  const getCategories = async () => {
    const response = await $fetch(`${baseURL}/api/categories`)
    return response
  }

  // Create category
  const createCategory = async (categoryData: any) => {
    const response = await $fetch(`${baseURL}/api/categories`, {
      method: 'POST',
      body: categoryData
    })
    return response
  }

  // Update category
  const updateCategory = async (id: string, categoryData: any) => {
    const response = await $fetch(`${baseURL}/api/categories/${id}`, {
      method: 'PUT',
      body: categoryData
    })
    return response
  }

  // Delete category
  const deleteCategory = async (id: string) => {
    const response = await $fetch(`${baseURL}/api/categories/${id}`, {
      method: 'DELETE'
    })
    return response
  }

  return {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
  }
}
