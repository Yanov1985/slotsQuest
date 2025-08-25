export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const response = await $fetch(`http://localhost:3001/api/bonuses/${id}`, {
      method: 'PUT',
      body
    })
    return response
  } catch (error) {
    console.error('Error updating bonus:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update bonus'
    })
  }
})