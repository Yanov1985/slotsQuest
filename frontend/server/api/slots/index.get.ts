export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const queryString = new URLSearchParams()
    
    // Передаем все query параметры
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, String(value))
      }
    })
    
    const url = `http://localhost:3001/api/slots${queryString.toString() ? `?${queryString.toString()}` : ''}`
    const response = await $fetch(url)
    return response
  } catch (error) {
    console.error('Error fetching slots:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch slots'
    })
  }
})