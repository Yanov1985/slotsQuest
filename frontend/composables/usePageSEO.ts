import { usePageJsonLd } from './usePageJsonLd'
import { unref, computed } from 'vue'

export const usePageSEO = (pageRef: any, slotsRef: any = [], providersRef: any = [], categoriesRef: any = [], mechanicsRef: any = [], themesRef: any = []) => {
    const { getPageSchemas } = usePageJsonLd()

    const page = computed(() => unref(pageRef))
    const slots = computed(() => unref(slotsRef) || [])
    const providers = computed(() => unref(providersRef) || [])
    const categories = computed(() => unref(categoriesRef) || [])
    const mechanics = computed(() => unref(mechanicsRef) || [])
    const themes = computed(() => unref(themesRef) || [])

    // 1. Process Keywords (Dynamic Replacements and Global Branding)
    const replaceKeywords = (text: any) => {
        const p = page.value
        if (!p || !text || typeof text !== 'string') return text
        let result = text
        
        // 0. Global Branding Replacement (Brand -> Company Name)
        const brandName = p.footer_company_name || 'Brand'
        if (brandName !== 'Brand') {
            result = result.replace(/Brand/g, brandName)
        }

        // 1. Support new dynamic list [keyword_1], [keyword_2], etc.
        if (p.seo_keywords_list && Array.isArray(p.seo_keywords_list)) {
            p.seo_keywords_list.forEach((kw: string, index: number) => {
                const placeholder = `[keyword_${index + 1}]`
                result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), kw || '')
            })
        }

        // 2. Legacy fallback for hero_keyword_1..3 if list is empty
        if (result === text) {
            for (let i = 1; i <= 3; i++) {
                const kw = p[`hero_keyword_${i}`] || ''
                result = result.replace(new RegExp(`\\[keyword_${i}\\]`, 'g'), kw)
            }
        }
        
        return result
    }

    // 2. Set Meta Tags (using functions for reactivity)
    useServerSeoMeta({
        title: () => replaceKeywords(page.value?.seo_title || page.value?.title) || (page.value?.footer_company_name || 'Brand'),
        description: () => replaceKeywords(page.value?.seo_desc) || undefined,
        ogTitle: () => page.value?.og_title || replaceKeywords(page.value?.seo_title || page.value?.title) || undefined,
        ogDescription: () => page.value?.og_desc || replaceKeywords(page.value?.seo_desc) || undefined,
        ogImage: () => page.value?.og_image || undefined,
        twitterCard: () => (page.value?.twitter_card || 'summary_large_image') as any,
        keywords: () => page.value?.seo_keywords || undefined,
        robots: () => {
            const p = page.value
            if (!p) return 'index, follow'
            const robotsParts: string[] = []
            if (p.robots_index !== false) robotsParts.push('index')
            else robotsParts.push('noindex')
            
            if (p.robots_follow !== false) robotsParts.push('follow')
            else robotsParts.push('nofollow')

            if (p.robots_max_snippet) robotsParts.push(`max-snippet:${p.robots_max_snippet}`)
            if (p.robots_max_image_preview) robotsParts.push(`max-image-preview:${p.robots_max_image_preview}`)
            if (p.robots_max_video_preview) robotsParts.push(`max-video-preview:${p.robots_max_video_preview}`)
            if (p.robots_notranslate) robotsParts.push('notranslate')
            if (p.robots_noimageindex) robotsParts.push('noimageindex')

            return robotsParts.join(', ')
        }
    })

    // 3. Pre-fetch Request URL for context-safe usage in deferred functions
    const runtimeConfig = useRuntimeConfig()
    const configSiteUrl = ((runtimeConfig.public as any).siteUrl || 'https://Brand.com').replace(/\/$/, '')
    const siteUrl = (page.value?.footer_site_url || configSiteUrl).replace(/\/$/, '')
    const url = useRequestURL()
    const path = url ? url.pathname : '/'

    // 4. Set Structured Data & Hreflang
    useHead({
        link: () => {
            const p = page.value
            if (!p) return []
            const links: any[] = []
            
            // Hreflang
            if (p.hreflang_enabled && p.hreflang_config?.length) {
                p.hreflang_config.forEach((item: any) => {
                    if (!item.lang) return
                    
                    const hreflangCode = item.region ? `${item.lang}-${item.region}` : item.lang
                    const fallbackUrl = `${siteUrl}${path}`

                    links.push({
                        rel: 'alternate',
                        hreflang: hreflangCode,
                        href: item.url || fallbackUrl
                    })
                })
            }

            // Canonical
            if (p.seo_canonical_url) {
                links.push({ rel: 'canonical', href: p.seo_canonical_url })
            } else {
                // Generate a strict Canonical matching the redirects
                if (url) {
                    let canonicalPath = path
                    // Strip trailing slash unless it's exactly root
                    if (canonicalPath !== '/' && canonicalPath.endsWith('/')) {
                        canonicalPath = canonicalPath.slice(0, -1)
                    }
                    links.push({ rel: 'canonical', href: `${siteUrl}${canonicalPath}` })
                }
            }
            
            return links
        },
        script: () => {
            const p = page.value
            if (!p) return []
            const schemas = getPageSchemas(p, slots.value, providers.value, categories.value, mechanics.value, themes.value, replaceKeywords)
            return schemas.map((schema: any) => ({
                type: 'application/ld+json',
                children: JSON.stringify(schema)
            }))
        }
    })
}
