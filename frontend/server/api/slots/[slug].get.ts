export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, 'slug')
    
    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Slug parameter is required'
      })
    }
    
    const response = await $fetch(`http://localhost:3001/api/slots/${slug}`)
    return response
  } catch (error) {
    console.error('Error fetching slot by slug:', error)
    
    // Если это 404 от бэкенда, передаем его дальше
    if (error.statusCode === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Slot not found'
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch slot'
    })
  }
})