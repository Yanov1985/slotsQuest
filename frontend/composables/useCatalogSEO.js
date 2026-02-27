import { computed } from 'vue'
import { useHead, useServerSeoMeta } from '#imports'

export const useCatalogSEO = (catalogTitle, catalogDesc, canonicalUrl, slotsCount = 0) => {
    // Set precise SEO metadata via ServerSeoMeta
    useServerSeoMeta({
        title: catalogTitle,
        ogTitle: catalogTitle,
        description: catalogDesc,
        ogDescription: catalogDesc,
        ogUrl: canonicalUrl,
        ogType: 'website',
        twitterCard: 'summary_large_image',
        twitterTitle: catalogTitle,
        twitterDescription: catalogDesc,
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    })

    // Append Canonical & JSON-LD
    useHead(() => {
        // Generate CollectionPage Schema
        const schema = {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: catalogTitle,
            description: catalogDesc,
            url: canonicalUrl,
            isPartOf: {
                '@type': 'WebSite',
                name: 'SlotQuest',
                url: 'https://slotquest.com'
            },
            about: {
                '@type': 'Thing',
                name: 'Online Casino Slots'
            },
            numberOfItems: slotsCount
        }

        return {
            link: [
                { rel: 'canonical', href: canonicalUrl }
            ],
            script: [
                {
                    type: 'application/ld+json',
                    children: JSON.stringify(schema)
                }
            ]
        }
    })
}
