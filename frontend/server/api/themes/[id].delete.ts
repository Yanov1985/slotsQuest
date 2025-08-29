export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const response = await $fetch(`http://localhost:3001/api/themes/${id}`, {
      method: 'DELETE'
    })
    return response
  } catch (error) {
    console.error('Error deleting theme:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete theme'
    })
  }
})