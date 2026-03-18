import { useJsonLd } from './useJsonLd'

export const usePageJsonLd = () => {
    const { 
        generateFAQSchema, 
        generateReviewSchema, 
        generateBreadcrumbSchema 
    } = useJsonLd()

    /**
     * Generates a CollectionPage schema for the homepage/category pages
     * @param page Reference to the page data from API
     * @param slots Current list of slots displayed on the page
     */
    const generateCollectionSchema = (page: any, slots: any[] = []) => {
        if (!page) return null

        const items = slots.slice(0, 20).map((slot, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://slotquest.com/slots/${slot.slug}`,
            "name": slot.title,
            "image": slot.og_image || slot.icon_url
        }))

        const schema: any = {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": page.seo_title || page.title,
            "description": page.seo_desc,
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": items
            }
        }

        return schema
    }

    /**
     * Combines all enabled schemas for a general page
     */
    const getPageSchemas = (page: any, slots: any[] = [], replaceKeywords: (t: string) => string = (t) => t) => {
        if (!page || !page.jsonld_enabled) return []

        const schemas: any[] = []

        // 1. Base Collection / WebSite Schema
        if (page.jsonld_type === 'CollectionPage') {
            const schema = generateCollectionSchema(page, slots)
            if (schema) {
                schema.name = replaceKeywords(schema.name)
                schema.description = replaceKeywords(schema.description)
                schemas.push(schema)
            }
        } else if (page.jsonld_type === 'WebSite') {
            schemas.push({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "SlotQuest",
                "url": "https://slotquest.com/",
                "description": replaceKeywords(page.seo_desc)
            })
        }

        // 2. FAQ Schema
        if (page.jsonld_enable_faq && page.jsonld_faq_json?.length) {
            const faqItems = page.jsonld_faq_json.map((f: any) => ({
                question: replaceKeywords(f.question),
                answer: replaceKeywords(f.answer)
            }))
            schemas.push(generateFAQSchema(faqItems))
        }

        // 3. Review Schema
        if (page.jsonld_enable_review) {
            schemas.push(generateReviewSchema({
                name: replaceKeywords(page.title),
                author: page.jsonld_review_author || 'SlotQuest Team',
                rating: page.jsonld_review_rating || 5,
                reviewBody: replaceKeywords(page.jsonld_review_text || page.seo_desc),
                url: 'https://slotquest.com/'
            }))
        }

        // 4. Manual Overrides
        if (page.json_schema) {
            try {
                const manualStr = replaceKeywords(page.json_schema)
                const manual = JSON.parse(manualStr)
                schemas.push(manual)
            } catch (e) {
                console.error('Failed to parse manual JSON-LD:', e)
            }
        }

        return schemas
    }

    return {
        getPageSchemas,
        generateCollectionSchema
    }
}
