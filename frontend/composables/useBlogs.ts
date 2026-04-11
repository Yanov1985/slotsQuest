export const useBlogs = () => {
  const config = useRuntimeConfig()
  const baseURL = import.meta.client ? '' : config.public.apiUrl

  const getBlogs = async (params: Record<string, any> = {}) => {
    const query = new URLSearchParams()
    if (params.page) query.set('page', String(params.page))
    if (params.limit) query.set('limit', String(params.limit))
    if (params.category) query.set('category', params.category)
    if (params.tag) query.set('tag', params.tag)
    const qs = query.toString()
    const { data } = await useFetch(`${baseURL}/api/blogs${qs ? '?' + qs : ''}`)
    return data.value
  }

  const getFeaturedBlogs = async () => {
    const { data } = await useFetch(`${baseURL}/api/blogs/featured`)
    return data.value
  }

  const getBlogCategories = async () => {
    const { data } = await useFetch(`${baseURL}/api/blogs/categories`)
    return data.value
  }

  const getBlogBySlug = async (slug: string) => {
    const { data } = await useFetch(`${baseURL}/api/blogs/${slug}`)
    return data.value
  }

  const getAdminBlogs = async () => {
    const response = await $fetch<{ data: any }>(`${baseURL}/api/blogs?admin=true`)
    return response.data || response
  }

  const createBlog = async (payload: any) => {
    return await $fetch(`${baseURL}/api/blogs`, {
      method: 'POST',
      body: payload
    })
  }

  const updateBlog = async (id: number | string, payload: any) => {
    return await $fetch(`${baseURL}/api/blogs/${id}`, {
      method: 'PATCH',
      body: payload
    })
  }

  const deleteBlog = async (id: number | string) => {
    return await $fetch(`${baseURL}/api/blogs/${id}`, {
      method: 'DELETE'
    })
  }

  return { getBlogs, getAdminBlogs, createBlog, updateBlog, deleteBlog, getFeaturedBlogs, getBlogCategories, getBlogBySlug }
}
