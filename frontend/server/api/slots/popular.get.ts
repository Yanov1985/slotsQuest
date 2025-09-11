export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch('http://localhost:3001/api/slots/popular')
    return response
  } catch (error) {
    console.error('Error fetching popular slots:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch popular slots'
    })
  }
})