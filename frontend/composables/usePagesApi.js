import { useRuntimeConfig } from '#app'

export const usePagesApi = () => {
    const config = useRuntimeConfig()
    const apiUrl = import.meta.client ? '' : (config.public.apiUrl || 'http://127.0.0.1:3001')

    const getPage = async (slug) => {
        try {
            const response = await $fetch(`${apiUrl}/api/pages/${slug}`)
            return response
        } catch (error) {
            if (error.response?.status === 404) {
                // Return a default empty structure if page is not yet created
                return { slug, title: '', hero_title: '', hero_desc: '', seo_title: '', seo_desc: '', content: null }
            }
            console.error(`Error fetching page ${slug}:`, error)
            throw error
        }
    }

    const updatePage = async (slug, data) => {
        try {
            const response = await $fetch(`${apiUrl}/api/pages/${slug}`, {
                method: 'PUT',
                body: data
            })
            return response
        } catch (error) {
            console.error(`Error updating page ${slug}:`, error)
            console.error('API Error in usePagesApi.js:', error);
      return null; // fallback
    }
    }

    return {
        getPage,
        updatePage
    }
}
