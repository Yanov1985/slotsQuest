/**
 * 🎯 useJsonLd Composable - Работа с JSON-LD схемами для SEO
 *
 * Этот composable предоставляет функции для:
 * - Получения JSON-LD схем с сервера
 * - Генерации JSON-LD на клиенте (fallback)
 * - Интеграции с useHead для вставки в <head>
 *
 * Метафора: JSON-LD - это как визитная карточка страницы для Google.
 * Когда Google-бот заходит на страницу, он смотрит на эту "карточку"
 * и сразу понимает: "Это игра с рейтингом 4.8, вот FAQ, вот инструкция".
 */

import { ref, computed } from 'vue'
import type { Ref } from 'vue'

// ============================================================================
// 📦 ИНТЕРФЕЙСЫ
// ============================================================================

/**
 * Ответ от API с JSON-LD схемами
 */
interface JsonLdResponse {
  success: boolean
  slotId: string
  slotName: string
  schemas: {
    game?: object
    product?: object
    review?: object
    faq?: object
    howTo?: object
    breadcrumb?: object
    video?: object
    combined?: object[]
  }
  meta: {
    generatedAt: string
    enabledSchemas: string[]
    totalSchemas: number
  }
}

/**
 * Данные слота для генерации JSON-LD на клиенте
 */
interface SlotData {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  rating?: number
  rating_count?: number
  rtp?: number
  volatility?: string
  max_win?: number
  min_bet?: string
  max_bet?: string
  release_date?: string
  providers?: {
    name: string
    slug: string
  }
  // JSON-LD настройки из БД
  jsonld_enabled?: boolean
  jsonld_type?: string
  jsonld_game_genre?: string
  jsonld_game_platform?: string
  jsonld_content_rating?: string
  jsonld_is_free?: boolean
  jsonld_enable_review?: boolean
  jsonld_enable_faq?: boolean
  jsonld_enable_howto?: boolean
  jsonld_enable_breadcrumb?: boolean
  jsonld_enable_video?: boolean
  jsonld_review_author?: string
  jsonld_review_rating?: number
  jsonld_review_text?: string
  jsonld_faq_json?: string
  jsonld_howto_json?: string
  jsonld_video_url?: string
  jsonld_video_thumbnail?: string
  jsonld_video_duration?: string
  jsonld_video_description?: string
  // SEO поля
  seo_title?: string
  seo_description?: string
}

// ============================================================================
// 🛠️ COMPOSABLE
// ============================================================================

export const useJsonLd = () => {
  const config = useRuntimeConfig()
  const baseURL = import.meta.client ? '' : config.public.apiUrl || 'http://localhost:3001'

  // 📊 Состояния
  const loading = ref(false)
  const error = ref<string | null>(null)
  const jsonLdData = ref<JsonLdResponse | null>(null)

  // ==========================================================================
  // 📥 МЕТОДЫ ПОЛУЧЕНИЯ ДАННЫХ С СЕРВЕРА
  // ==========================================================================

  /**
   * 📖 Получить JSON-LD с сервера по ID слота
   *
   * @param slotId - ID слота в базе данных
   * @returns Promise с JSON-LD данными
   */
  const fetchJsonLd = async (slotId: string): Promise<JsonLdResponse | null> => {
    if (!slotId) {
      console.warn('⚠️ useJsonLd: slotId не указан')
      return null
    }

    loading.value = true
    error.value = null

    try {
      const response = await $fetch<JsonLdResponse>(`${baseURL}/api/jsonld/${slotId}`)
      jsonLdData.value = response
      return response
    } catch (err: any) {
      console.error('❌ Ошибка получения JSON-LD:', err)
      error.value = err.message || 'Ошибка получения JSON-LD'
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * 📖 Получить "сырой" JSON-LD массив для вставки в head
   *
   * @param slotId - ID слота
   * @returns Массив JSON-LD схем
   */
  const fetchRawJsonLd = async (slotId: string): Promise<object[]> => {
    if (!slotId) return []

    try {
      const response = await $fetch<object[]>(`${baseURL}/api/jsonld/${slotId}/raw`)
      return Array.isArray(response) ? response : []
    } catch (err) {
      console.error('❌ Ошибка получения raw JSON-LD:', err)
      return []
    }
  }

  // ==========================================================================
  // 🏭 МЕТОДЫ ГЕНЕРАЦИИ JSON-LD НА КЛИЕНТЕ (FALLBACK)
  // ==========================================================================

  /**
   * 🎮 Генерация Game Schema на клиенте
   *
   * Используется как fallback если сервер недоступен
   * или JSON-LD не настроен в админке
   */
  const generateGameSchema = (slot: SlotData, siteUrl: string = 'https://Brand.com'): object => {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': slot.jsonld_type || 'Game',
      name: slot.name,
      description: slot.description || `Play ${slot.name} online slot`,
      url: `${siteUrl}/slots/${slot.slug}`,
    }

    // Изображение
    if (slot.image_url) {
      schema.image = slot.image_url
    }

    // Разработчик
    if (slot.providers) {
      schema.author = {
        '@type': 'Organization',
        name: slot.providers.name,
      }
    }

    // Жанр и платформы
    if (slot.jsonld_game_genre) {
      schema.genre = slot.jsonld_game_genre
    }
    if (slot.jsonld_game_platform) {
      schema.gamePlatform = slot.jsonld_game_platform
    }

    // Возрастной рейтинг
    if (slot.jsonld_content_rating) {
      schema.contentRating = slot.jsonld_content_rating
    }

    // Бесплатная игра
    if (slot.jsonld_is_free !== undefined) {
      schema.isFree = slot.jsonld_is_free
    }

    // Агрегированный рейтинг
    if (slot.rating && slot.rating_count && slot.rating_count > 0) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: Number(slot.rating),
        ratingCount: slot.rating_count,
        bestRating: 5,
        worstRating: 1,
      }
    }

    // 🎯 SEO Ключевые слова
    const keywords: string[] = []

    // 0. Hero Keywords
    if ((slot as any).hero_keyword) keywords.push((slot as any).hero_keyword);
    if ((slot as any).hero_keyword_2) keywords.push((slot as any).hero_keyword_2);
    if ((slot as any).hero_keyword_3) keywords.push((slot as any).hero_keyword_3);

    // 1. Основные (Primary)
    if ((slot as any).seo_keywords_primary) keywords.push((slot as any).seo_keywords_primary);

    // 2. LSI
    if ((slot as any).seo_keywords_lsi) keywords.push((slot as any).seo_keywords_lsi);

    // 3. Long-tail
    if ((slot as any).seo_keywords_longtail) keywords.push((slot as any).seo_keywords_longtail);

    // 4. Локализованные Geo-ключи
    if ((slot as any).seo_keywords_geo) {
      try {
        const geoData = typeof (slot as any).seo_keywords_geo === 'string'
          ? JSON.parse((slot as any).seo_keywords_geo)
          : (slot as any).seo_keywords_geo;

        if (geoData && typeof geoData === 'object') {
          Object.values(geoData).forEach((kw: any) => {
            if (kw && typeof kw === 'string' && kw.trim()) {
              keywords.push(kw.trim());
            }
          });
        }
      } catch (e) {
        if (typeof (slot as any).seo_keywords_geo === 'string' && (slot as any).seo_keywords_geo.trim()) {
          keywords.push((slot as any).seo_keywords_geo.trim());
        }
      }
    }

    // 5. Fallback на старое поле
    if ((slot as any).seo_keywords) keywords.push((slot as any).seo_keywords);

    // 6. Автогенерация, если ничего нет
    if (keywords.length === 0) {
      const autoKeywords = [
        (slot as any).hero_keyword,
        (slot as any).hero_keyword_2,
        (slot as any).hero_keyword_3,
        slot.name,
        slot.providers?.name,
        'slot',
        'slot machine',
        'online casino',
        'demo game',
        'free play',
        slot.rtp ? `RTP ${slot.rtp}%` : null,
        slot.volatility ? `${slot.volatility} volatility` : null,
        'real money',
        'bonuses',
        'free spins',
        'Brand',
      ].filter(Boolean)
      schema.keywords = autoKeywords.join(', ')
    } else {
      schema.keywords = keywords.join(', ')
    }

    return schema
  }

  /**
   * ⭐ Генерация Review Schema на клиенте
   */
  const generateReviewSchema = (slot: SlotData): object => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Game',
        name: slot.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: slot.jsonld_review_rating || slot.rating || 4.5,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        '@type': 'Organization',
        name: slot.jsonld_review_author || 'Brand Editorial Team',
      },
      datePublished: new Date().toISOString().split('T')[0],
      reviewBody: slot.jsonld_review_text || slot.description,
    }
  }

  /**
   * ❓ Генерация FAQ Schema на клиенте
   */
  const generateFaqSchema = (slot: SlotData): object | null => {
    if (!slot.jsonld_faq_json) return null

    try {
      const faqItems = JSON.parse(slot.jsonld_faq_json)
      if (!Array.isArray(faqItems) || faqItems.length === 0) return null

      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    } catch (e) {
      console.error('❌ Ошибка парсинга FAQ JSON:', e)
      return null
    }
  }

  /**
   * 📋 Генерация HowTo Schema на клиенте
   */
  const generateHowToSchema = (slot: SlotData): object | null => {
    if (!slot.jsonld_howto_json) return null

    try {
      const steps = JSON.parse(slot.jsonld_howto_json)
      if (!Array.isArray(steps) || steps.length === 0) return null

      return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to play ${slot.name}`,
        description: `Step-by-step guide to playing ${slot.name} slot`,
        step: steps.map((item: { step: number; name: string; text: string }, index: number) => ({
          '@type': 'HowToStep',
          position: item.step || index + 1,
          name: item.name,
          text: item.text,
        })),
      }
    } catch (e) {
      console.error('❌ Ошибка парсинга HowTo JSON:', e)
      return null
    }
  }

  /**
   * 🍞 Генерация BreadcrumbList Schema на клиенте
   */
  const generateBreadcrumbSchema = (slot: SlotData, siteUrl: string = 'https://Brand.com'): object => {
    const items: any[] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Slots',
        item: `${siteUrl}/slots`,
      },
    ]

    if (slot.providers) {
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: slot.providers.name,
        item: `${siteUrl}/providers/${slot.providers.slug}`,
      })
      items.push({
        '@type': 'ListItem',
        position: 4,
        name: slot.name,
        item: `${siteUrl}/slots/${slot.slug}`,
      })
    } else {
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: slot.name,
        item: `${siteUrl}/slots/${slot.slug}`,
      })
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    }
  }

  /**
   * 🎬 Генерация VideoObject Schema на клиенте
   */
  const generateVideoSchema = (slot: SlotData): object | null => {
    if (!slot.jsonld_video_url) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: `${slot.name} Slot Review`,
      description: slot.jsonld_video_description || `Video review and gameplay of ${slot.name} slot`,
      thumbnailUrl: slot.jsonld_video_thumbnail || slot.image_url,
      uploadDate: new Date().toISOString(),
      duration: slot.jsonld_video_duration,
      contentUrl: slot.jsonld_video_url,
    }
  }

  /**
   * 🎯 Генерация всех JSON-LD схем на клиенте
   *
   * Используется как fallback когда сервер недоступен
   */
  const generateAllSchemas = (slot: SlotData, siteUrl: string = 'https://Brand.com'): object[] => {
    // Если JSON-LD выключен - возвращаем пустой массив
    if (slot.jsonld_enabled === false) {
      return []
    }

    const schemas: object[] = []

    // 🎮 Game Schema (всегда)
    schemas.push(generateGameSchema(slot, siteUrl))

    // ⭐ Review Schema
    if (slot.jsonld_enable_review !== false) {
      schemas.push(generateReviewSchema(slot))
    }

    // ❓ FAQ Schema
    if (slot.jsonld_enable_faq) {
      const faqSchema = generateFaqSchema(slot)
      if (faqSchema) schemas.push(faqSchema)
    }

    // 📋 HowTo Schema
    if (slot.jsonld_enable_howto) {
      const howToSchema = generateHowToSchema(slot)
      if (howToSchema) schemas.push(howToSchema)
    }

    // 🍞 Breadcrumb Schema
    if (slot.jsonld_enable_breadcrumb !== false) {
      schemas.push(generateBreadcrumbSchema(slot, siteUrl))
    }

    // 🎬 Video Schema
    if (slot.jsonld_enable_video) {
      const videoSchema = generateVideoSchema(slot)
      if (videoSchema) schemas.push(videoSchema)
    }

    return schemas
  }

  // ==========================================================================
  // 🎯 ОСНОВНОЙ МЕТОД ДЛЯ ИНТЕГРАЦИИ С useHead
  // ==========================================================================

  /**
   * 📦 Получить JSON-LD для вставки в useHead
   *
   * Сначала пытается получить с сервера, при неудаче - генерирует на клиенте
   *
   * @param slot - Данные слота
   * @param siteUrl - Базовый URL сайта
   * @returns Объект для script в useHead
   */
  const getJsonLdScript = async (
    slot: SlotData,
    siteUrl: string = 'https://Brand.com'
  ): Promise<{ type: string; innerHTML: string } | null> => {
    if (!slot || !slot.id) {
      console.warn('⚠️ useJsonLd: slot или slot.id не указан')
      return null
    }

    // Если JSON-LD выключен в настройках слота
    if (slot.jsonld_enabled === false) {
      console.log('ℹ️ JSON-LD отключён для этого слота')
      return null
    }

    let schemas: object[] = []

    try {
      // 🔄 Пытаемся получить с сервера
      const serverSchemas = await fetchRawJsonLd(slot.id)

      if (serverSchemas && serverSchemas.length > 0) {
        schemas = serverSchemas
        console.log(`✅ JSON-LD получен с сервера: ${schemas.length} схем`)
      } else {
        // 🔧 Fallback - генерируем на клиенте
        schemas = generateAllSchemas(slot, siteUrl)
        console.log(`🔧 JSON-LD сгенерирован на клиенте: ${schemas.length} схем`)
      }
    } catch (err) {
      // 🔧 При ошибке - генерируем на клиенте
      console.warn('⚠️ Ошибка получения JSON-LD с сервера, используем fallback')
      schemas = generateAllSchemas(slot, siteUrl)
    }

    if (schemas.length === 0) {
      return null
    }

    return {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schemas),
    }
  }

  /**
   * 🎯 Синхронный метод для SSR - генерирует на клиенте без API
   *
   * Используется когда нужен SSR и нельзя делать async в useHead
   */
  const getJsonLdScriptSync = (
    slot: SlotData,
    siteUrl: string = 'https://Brand.com'
  ): { type: string; innerHTML: string } | null => {
    if (!slot || slot.jsonld_enabled === false) {
      return null
    }

    const schemas = generateAllSchemas(slot, siteUrl)

    if (schemas.length === 0) {
      return null
    }

    return {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schemas),
    }
  }

  // ==========================================================================
  // 📤 ВОЗВРАТ
  // ==========================================================================

  return {
    // Состояния
    loading,
    error,
    jsonLdData,

    // Методы получения с сервера
    fetchJsonLd,
    fetchRawJsonLd,

    // Методы генерации на клиенте
    generateGameSchema,
    generateReviewSchema,
    generateFaqSchema,
    generateHowToSchema,
    generateBreadcrumbSchema,
    generateVideoSchema,
    generateAllSchemas,

    // Основные методы для useHead
    getJsonLdScript,
    getJsonLdScriptSync,
  }
}
