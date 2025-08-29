export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const response = await $fetch('http://localhost:3001/api/themes', {
      method: 'POST',
      body
    })
    return response
  } catch (error) {
    console.error('Error creating theme:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create theme'
    })
  }
})