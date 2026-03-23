type SlotSitemapSourceItem = {
  slug?: string
  name?: string | null
  thumbnail_url?: string | null
  image_url?: string | null
  sitemap_images?: string | null
  updated_at?: string | null
  sitemap_include?: boolean | null
  sitemap_priority?: number | null
  sitemap_frequency?: string | null
  sitemap_last_mod?: string | null
}

type SlotsApiResponse = {
  data?: SlotSitemapSourceItem[]
}

type SitemapUrlItem = {
  loc: string
  _sitemap?: 'pages' | 'slots' | 'images'
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  images?: Array<{ loc: string; title?: string }>
}

const ALLOWED_CHANGEFREQ = new Set([
  'always',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'never'
])

function toIsoDate(value?: string | null): string | undefined {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString()
}

function normalizeApiBaseUrl(rawUrl?: string): string {
  if (!rawUrl) return 'http://127.0.0.1:3001'
  return rawUrl.replace(/\/+$/, '')
}

function normalizeUrl(value?: string | null): string | undefined {
  if (!value || typeof value !== 'string') return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (!/^https?:\/\//i.test(trimmed)) return undefined
  return trimmed
}

function parseImagesJson(rawJson?: string | null): Array<{ loc: string; title?: string }> {
  if (!rawJson) return []

  try {
    const parsed = JSON.parse(rawJson)
    if (!Array.isArray(parsed)) return []

    return parsed
      .map((item) => ({
        loc: normalizeUrl(item?.loc),
        title: typeof item?.title === 'string' ? item.title : undefined
      }))
      .filter((item) => !!item.loc) as Array<{ loc: string; title?: string }>
  } catch {
    return []
  }
}

export default defineEventHandler(async (event) => {
  // Берем URL backend API из runtime-конфига, чтобы работать одинаково в dev/prod.
  const config = useRuntimeConfig(event)
  const apiBase = normalizeApiBaseUrl(config.public?.apiUrl as string | undefined)

  // Базовые страницы сайта, которые важны для Google независимо от наличия слотов.
  const staticEntries: SitemapUrlItem[] = [
    {
      // Главная как самая приоритетная URL.
      loc: '/',
      _sitemap: 'pages',
      changefreq: 'daily',
      priority: 1.0
    },
    {
      // Каталог слотов как второй по приоритету хаб.
      loc: '/slots',
      _sitemap: 'pages',
      changefreq: 'daily',
      priority: 0.9
    },
    {
      // Юридические страницы полезны для trust signals и E-E-A-T.
      loc: '/legal/privacy-policy',
      _sitemap: 'pages',
      changefreq: 'monthly',
      priority: 0.3
    },
    {
      loc: '/legal/terms-and-conditions',
      _sitemap: 'pages',
      changefreq: 'monthly',
      priority: 0.3
    },
    {
      loc: '/legal/cookie-policy',
      _sitemap: 'pages',
      changefreq: 'monthly',
      priority: 0.2
    },
    {
      loc: '/legal/responsible-gaming',
      _sitemap: 'pages',
      changefreq: 'monthly',
      priority: 0.4
    }
  ]

  try {
    // Получаем все активные слоты через публичный API.
    const response = await $fetch<SlotsApiResponse | SlotSitemapSourceItem[]>(`${apiBase}/api/slots?limit=5000`)
    const slots = Array.isArray(response) ? response : response?.data || []

    // Преобразуем слоты в записи sitemap с учетом индивидуальных SEO-настроек слота.
    const slotEntries: SitemapUrlItem[] = slots
      .filter((slot) => slot?.slug && slot.sitemap_include !== false)
      .map((slot) => {
        const rawFreq = (slot.sitemap_frequency || 'weekly').toLowerCase()
        const changefreq = ALLOWED_CHANGEFREQ.has(rawFreq) ? (rawFreq as SitemapUrlItem['changefreq']) : 'weekly'
        const lastmod = toIsoDate(slot.sitemap_last_mod || slot.updated_at)
        const rawPriority = Number(slot.sitemap_priority ?? 0.8)
        const safePriority = Number.isFinite(rawPriority)
          ? Math.min(1, Math.max(0, rawPriority))
          : 0.8

        // Собираем изображения для image-sitemap (если есть).
        const imagesFromSeo = parseImagesJson(slot.sitemap_images)
        const heroImage = normalizeUrl(slot.image_url)
        const thumbnailImage = normalizeUrl(slot.thumbnail_url)

        const images = [
          ...imagesFromSeo,
          ...(heroImage ? [{ loc: heroImage, title: slot.name || undefined }] : []),
          ...(thumbnailImage ? [{ loc: thumbnailImage, title: slot.name || undefined }] : [])
        ].filter((img, index, arr) => arr.findIndex((candidate) => candidate.loc === img.loc) === index)

        const baseEntry: SitemapUrlItem = {
          loc: `/slots/${slot.slug}`,
          _sitemap: 'slots',
          changefreq,
          priority: safePriority,
          ...(lastmod ? { lastmod } : {})
        }

        return baseEntry
      })

    // Отдельная image-sitemap: только страницы слотов, где реально есть изображения.
    const imageEntries: SitemapUrlItem[] = slots
      .filter((slot) => slot?.slug && slot.sitemap_include !== false)
      .map((slot) => {
        const lastmod = toIsoDate(slot.sitemap_last_mod || slot.updated_at)
        const imagesFromSeo = parseImagesJson(slot.sitemap_images)
        const heroImage = normalizeUrl(slot.image_url)
        const thumbnailImage = normalizeUrl(slot.thumbnail_url)

        const images = [
          ...imagesFromSeo,
          ...(heroImage ? [{ loc: heroImage, title: slot.name || undefined }] : []),
          ...(thumbnailImage ? [{ loc: thumbnailImage, title: slot.name || undefined }] : [])
        ].filter((img, index, arr) => arr.findIndex((candidate) => candidate.loc === img.loc) === index)

        if (images.length === 0) return null

        return {
          loc: `/slots/${slot.slug}`,
          _sitemap: 'images',
          changefreq: 'weekly',
          priority: 0.7,
          images,
          ...(lastmod ? { lastmod } : {})
        } as SitemapUrlItem
      })
      .filter(Boolean) as SitemapUrlItem[]

    return [...staticEntries, ...slotEntries, ...imageEntries]
  } catch (error) {
    // Если backend временно недоступен, отдаем хотя бы базовые страницы, чтобы sitemap не был пустым.
    console.error('Sitemap dynamic source error:', error)
    return staticEntries
  }
})
