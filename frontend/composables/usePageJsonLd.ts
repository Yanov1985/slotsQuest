export const usePageJsonLd = () => {
    /**
     * Combines all enabled schemas for a general page, dynamically injecting catalog data.
     */
    const getPageSchemas = (
        page: any, 
        slots: any[] = [], 
        providers: any[] = [], 
        categories: any[] = [], 
        mechanics: any[] = [], 
        themes: any[] = [], 
        replaceKeywords: (t: string) => string = (t) => t
    ) => {
        if (!page || !page.jsonld_enabled) return []

        const schemas: any[] = []

        // 1. Always establish base WebSite and Organization for trust
        schemas.push({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SlotQuest",
            "url": "https://slotquest.com/",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://slotquest.com/?search={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        })

        schemas.push({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SlotQuest",
            "url": "https://slotquest.com/",
            "logo": "https://slotquest.com/logo.png"
        })

        // 2. CollectionPage Schema (The core catalog representation)
        if (page.jsonld_type === 'CollectionPage' && !page.jsonld_override_auto) {
            const validSlots = Array.isArray(slots) ? slots : []
            const validProviders = Array.isArray(providers) ? providers : []
            const validCategories = Array.isArray(categories) ? categories : []
            const validMechanics = Array.isArray(mechanics) ? mechanics : []
            const validThemes = Array.isArray(themes) ? themes : []

            const items = validSlots.slice(0, 20).map((slot, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://slotquest.com/slots/${slot.slug}`,
                "name": slot.title,
                "image": slot.og_image || slot.icon_url
            }))

            const aboutArr: any[] = []
            
            // Inject all Providers as Organizations
            validProviders.forEach(p => aboutArr.push({ "@type": "Organization", "name": p.name }))
            
            // Inject Categories, Mechanics, Themes as Things
            validCategories.forEach(c => aboutArr.push({ "@type": "Thing", "name": c.name }))
            validMechanics.forEach(m => aboutArr.push({ "@type": "Thing", "name": m.name }))
            validThemes.forEach(t => aboutArr.push({ "@type": "Thing", "name": t.name }))

            // Inject Custom Keywords as emphasis for SEO
            const allKeywords: string[] = []
            if (page.seo_keywords_primary) allKeywords.push(page.seo_keywords_primary)
            if (page.seo_keywords_list && Array.isArray(page.seo_keywords_list)) {
                allKeywords.push(...page.seo_keywords_list)
            }
            allKeywords.forEach(kw => {
                if (kw) aboutArr.push({ "@type": "Thing", "name": kw })
            })

            // Combine Content Text (Strip HTML to provide pure string for search engines)
            let combinedText = ''
            if (page.content && Array.isArray(page.content)) {
                combinedText = page.content
                    .map((c: any) => c.text || '')
                    .join(' ')
                    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
                    .replace(/\\n/g, ' ')      // Remove escaped newlines
                    .trim()
            }

            schemas.push({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "name": replaceKeywords(page.seo_title || page.title),
                "description": replaceKeywords(page.seo_desc),
                "url": "https://slotquest.com/",
                "about": aboutArr.length > 0 ? aboutArr : undefined,
                "keywords": allKeywords.length > 0 ? allKeywords.join(', ') : undefined,
                "text": combinedText ? replaceKeywords(combinedText) : undefined,
                "mainEntity": {
                    "@type": "ItemList",
                    "itemListElement": items
                }
            })
        } else if (page.jsonld_type === 'WebSite' && !page.jsonld_override_auto) {
             // Fallback if they only want basic WebSite
             schemas.push({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "SlotQuest",
                "url": "https://slotquest.com/",
                "description": replaceKeywords(page.seo_desc)
            })
        }

        // 3. Legacy overrides or specific page data
        if (page.json_schema && page.json_schema.trim() !== '') {
            try {
                const manualStr = replaceKeywords(page.json_schema)
                const manual = JSON.parse(manualStr)
                if (Array.isArray(manual)) {
                    schemas.push(...manual)
                } else {
                    schemas.push(manual)
                }
            } catch (e) {
                console.error('Failed to parse manual JSON-LD:', e)
            }
        }

        return schemas
    }

    return {
        getPageSchemas
    }
}
