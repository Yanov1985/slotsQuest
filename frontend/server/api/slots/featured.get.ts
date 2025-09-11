export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch('http://localhost:3001/api/slots/featured')
    return response
  } catch (error) {
    console.error('Error fetching featured slots:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch featured slots'
    })
  }
})