import { usePageJsonLd } from './usePageJsonLd'
import { unref, computed } from 'vue'

export const usePageSEO = (pageRef: any, slotsRef: any = []) => {
    const { getPageSchemas } = usePageJsonLd()

    const page = computed(() => unref(pageRef))
    const slots = computed(() => unref(slotsRef) || [])

    // 1. Process Keywords (Dynamic Replacements)
    const replaceKeywords = (text: any) => {
        const p = page.value
        if (!p || !text || typeof text !== 'string') return text
        let result = text
        
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
        title: () => replaceKeywords(page.value?.seo_title || page.value?.title) || 'SlotQuest',
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

    // 3. Set Structured Data & Hreflang
    useHead({
        link: () => {
            const p = page.value
            if (!p) return []
            const links: any[] = []
            
            // Hreflang
            if (p.hreflang_enabled && p.hreflang_config?.length) {
                p.hreflang_config.forEach((item: any) => {
                    links.push({
                        rel: 'alternate',
                        hreflang: `${item.lang}-${item.region}`,
                        href: item.url || `https://slotquest.com/${item.lang}/`
                    })
                })
            }

            // Canonical
            if (p.seo_canonical_url) {
                links.push({ rel: 'canonical', href: p.seo_canonical_url })
            }
            
            return links
        },
        script: () => {
            const p = page.value
            if (!p) return []
            const schemas = getPageSchemas(p, slots.value, replaceKeywords)
            return schemas.map((schema: any) => ({
                type: 'application/ld+json',
                children: JSON.stringify(schema)
            }))
        }
    })
}
