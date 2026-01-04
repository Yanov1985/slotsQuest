/**
 * PUT /api/slots/[id] - Обновление слота по ID
 *
 * Этот endpoint проксирует запросы к NestJS бэкенду для обновления данных слота.
 * Используется в админ-панели для сохранения SEO и контентных полей.
 */
export default defineEventHandler(async (event) => {
  try {
    // Получаем ID слота из URL параметров
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID parameter is required'
      })
    }

    // Получаем тело запроса с данными для обновления
    const body = await readBody(event)

    console.log(`[PUT /api/slots/${id}] Updating slot with data:`, JSON.stringify(body, null, 2).substring(0, 500) + '...')

    // Проксируем запрос на NestJS бэкенд
    const response = await $fetch(`http://localhost:3001/api/slots/${id}`, {
      method: 'PUT',
      body: body,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(`[PUT /api/slots/${id}] Successfully updated slot`)

    return response
  } catch (error: any) {
    console.error('Error updating slot:', error)

    // Если бэкенд вернул ошибку с конкретным статус-кодом, передаём его
    if (error.statusCode) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.statusMessage || 'Failed to update slot'
      })
    }

    // Если это ошибка fetch (сеть/бэкенд недоступен)
    if (error.cause?.code === 'ECONNREFUSED') {
      throw createError({
        statusCode: 503,
        statusMessage: 'Backend server is not available. Please ensure NestJS is running on port 3001.'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to update slot'
    })
  }
})
