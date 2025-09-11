export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const response = await $fetch('http://localhost:3001/api/slots', {
      method: 'POST',
      body: body
    })
    
    return response
  } catch (error) {
    console.error('Error creating slot:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create slot'
    })
  }
})