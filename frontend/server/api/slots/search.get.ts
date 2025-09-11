export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const searchQuery = query.q
    
    if (!searchQuery) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Search query is required'
      })
    }
    
    const response = await $fetch(`http://localhost:3001/api/slots/search?q=${encodeURIComponent(String(searchQuery))}`)
    return response
  } catch (error) {
    console.error('Error searching slots:', error)
    
    if (error.statusCode === 400) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to search slots'
    })
  }
})