export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch('http://localhost:3001/api/bonuses')
    return response
  } catch (error) {
    console.error('Error fetching bonuses:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch bonuses'
    })
  }
})