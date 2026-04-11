import { defineEventHandler, setHeader } from 'h3'

function normalizeApiBaseUrl(rawUrl?: string): string {
  if (!rawUrl) return 'http://127.0.0.1:3001'
  return rawUrl.replace(/\/+$/, '')
}

function escapeXml(unsafe: string) {
  if (!unsafe) return ''
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const baseURL = normalizeApiBaseUrl(config.public?.apiUrl as string | undefined)
  const siteUrl = config.public?.siteUrl || 'http://127.0.0.1:3000'

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')

  try {
    const newsResponse = await $fetch<{ data: any[] }>(`${baseURL}/api/api/news?limit=100`)
    const newsArticles = newsResponse?.data || []

    const itemsXml = newsArticles
      .filter((post) => post?.slug && post.is_published !== false)
      .map((post) => {
        const url = `${siteUrl}/news/${post.slug}`
        const pubDate = new Date(post.published_at || post.created_at || Date.now()).toUTCString()
        
        let imageUrl = post.image_url || ''
        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = `${siteUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
        }

        const mediaTag = imageUrl ? `<media:content url="${escapeXml(imageUrl)}" medium="image"/>` : ''

        return `    <item>
      <title>${escapeXml(post.title || '')}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.seo_desc || post.title || '')}</description>
      ${mediaTag}
    </item>`
      }).join('\n')

    const lastBuildDate = new Date().toUTCString()

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>SlotQuest News</title>
    <link>${siteUrl}</link>
    <description>Latest news, announcements, and game updates from SlotQuest.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`

  } catch (error) {
    console.error('RSS Feed generation error:', error)
    return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title></channel></rss>`
  }
})
