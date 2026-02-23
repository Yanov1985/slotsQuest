import { computed, watchEffect } from 'vue'
import { useHead, useRoute } from '#imports'
import {
    replaceKeywordsInText,
    getSlotThemesFromDB,
    getDetailedDescription,
    getSlotNameWithKeyword
} from '~/utils/slotFormatters'

export const useSlotSEO = ({
    slot,
    parsedGeoRegions,
    computedFaq,
    computedHowToPlay,
    computedReviews,
    similarSlots,
    loading,
    error
}) => {
    const route = useRoute()
    const slug = route.params.slug

    // 🎯 JSON-LD Schemas for Enhanced Info Modal (FAQPage, HowTo, Review)
    const generateSeoSchemas = computed(() => {
        if (!slot.value?.name) return []
        const schemas = []
        const name = slot.value.name

        const faqItems = computedFaq.value
        if (faqItems?.length) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                'mainEntity': faqItems.map(item => ({
                    '@type': 'Question',
                    'name': item.question,
                    'acceptedAnswer': { '@type': 'Answer', 'text': item.answer }
                }))
            })
        }

        const howToSteps = computedHowToPlay.value
        if (howToSteps?.length) {
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'HowTo',
                'name': 'How to Play ' + name,
                'description': 'Step-by-step guide to playing ' + name + ' online slot',
                'step': howToSteps.map((s, i) => ({
                    '@type': 'HowToStep',
                    'position': i + 1,
                    'name': s.step,
                    'text': s.text
                }))
            })
        }

        const reviews = computedReviews.value
        if (reviews?.length) {
            const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
            schemas.push({
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                'name': name,
                'applicationCategory': 'GameApplication',
                'aggregateRating': {
                    '@type': 'AggregateRating',
                    'ratingValue': avgRating.toFixed(1),
                    'reviewCount': reviews.length,
                    'bestRating': '5',
                    'worstRating': '1'
                },
                'review': reviews.map(r => ({
                    '@type': 'Review',
                    'author': { '@type': 'Person', 'name': r.author },
                    'reviewRating': { '@type': 'Rating', 'ratingValue': r.rating, 'bestRating': '5' },
                    'reviewBody': r.text,
                    'datePublished': r.date
                })),
                ...(parsedGeoRegions.value?.length ? {
                    'areaServed': parsedGeoRegions.value.map(code => ({ '@type': 'Country', 'name': code }))
                } : {})
            })
        }

        return schemas
    })

    const generateSEODescription = (slotData) => {
        if (!slotData) return 'Play exciting online slots with great winning opportunities.'
        if (slotData.seo_description && slotData.seo_description.trim()) {
            let description = replaceKeywordsInText(slotData.seo_description.trim(), slotData, false)
            if (description.length > 160) description = description.substring(0, 157) + '...'
            return description
        }
        if (slotData.description && slotData.description.trim()) {
            let description = replaceKeywordsInText(slotData.description.trim(), slotData, false)
            const firstSentence = description.split('.')[0]
            if (firstSentence.length <= 160) return firstSentence + '.'
            return description.substring(0, 157) + '...'
        }
        const parts = []
        if (slotData.hero_keyword_2) parts.push(`Discover ${slotData.hero_keyword_2}`)
        else if (slotData.name) parts.push(`Play ${slotData.name}`)
        if (slotData.hero_keyword) parts.push(`- ${slotData.hero_keyword.toLowerCase()}`)
        if (slotData.rtp) parts.push(`RTP ${slotData.rtp}%`)
        if (slotData.max_win) parts.push(`Max win ${slotData.max_win}x`)
        if (slotData.hero_keyword_3) {
            const current = parts.join(', ')
            if (current.length + slotData.hero_keyword_3.length < 140) parts.push(`also try ${slotData.hero_keyword_3}`)
        }
        let description = parts.join(', ') + '.'
        if (description.length > 160) description = description.substring(0, 157) + '...'
        return description
    }

    const generateOptimizedKeywords = (slotData) => {
        if (!slotData) return ''
        const keywords = []
        if (slotData.hero_keyword) keywords.push(slotData.hero_keyword)
        if (slotData.hero_keyword_2) keywords.push(slotData.hero_keyword_2)
        if (slotData.hero_keyword_3) keywords.push(slotData.hero_keyword_3)
        if (slotData.seo_keywords_primary) keywords.push(slotData.seo_keywords_primary)
        if (slotData.seo_keywords_lsi) keywords.push(slotData.seo_keywords_lsi)
        if (slotData.seo_keywords_longtail) keywords.push(slotData.seo_keywords_longtail)

        if (slotData.seo_keywords_geo) {
            try {
                const geoData = typeof slotData.seo_keywords_geo === 'string' ? JSON.parse(slotData.seo_keywords_geo) : slotData.seo_keywords_geo
                if (geoData && typeof geoData === 'object') {
                    Object.values(geoData).forEach(geoKeywordStr => {
                        if (geoKeywordStr && geoKeywordStr.trim()) keywords.push(geoKeywordStr.trim())
                    })
                }
            } catch (e) {
                if (typeof slotData.seo_keywords_geo === 'string' && slotData.seo_keywords_geo.trim()) {
                    keywords.push(slotData.seo_keywords_geo.trim())
                }
            }
        }
        if (slotData.seo_keywords) keywords.push(slotData.seo_keywords)

        if (keywords.length === 0) {
            const autoKeywords = [
                slotData.hero_keyword, slotData.hero_keyword_2, slotData.hero_keyword_3,
                slotData.name, slotData.providers?.name, 'slot', 'slot machine', 'online casino',
                'demo game', 'free play', `RTP ${slotData.rtp || '96'}%`, `${slotData.volatility || 'medium'} volatility`,
                slotData.category?.name || 'slots', 'real money', 'bonuses', 'free spins', 'SlotQuest'
            ].filter(Boolean)
            return autoKeywords.join(', ')
        }
        return keywords.join(', ')
    }

    const generateRobotsContent = (slotData) => {
        if (!slotData) return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        const directives = []
        directives.push(slotData.robots_index !== false ? 'index' : 'noindex')
        directives.push(slotData.robots_follow !== false ? 'follow' : 'nofollow')
        const maxSnippet = slotData.robots_max_snippet ?? -1
        if (maxSnippet !== -1 || maxSnippet === 0) directives.push(`max-snippet:${maxSnippet}`)
        else directives.push('max-snippet:-1')
        directives.push(`max-image-preview:${slotData.robots_max_image_preview || 'large'}`)
        const maxVideoPreview = slotData.robots_max_video_preview ?? -1
        if (maxVideoPreview !== -1) directives.push(`max-video-preview:${maxVideoPreview}`)
        else directives.push('max-video-preview:-1')
        if (slotData.robots_notranslate) directives.push('notranslate')
        if (slotData.robots_noimageindex) directives.push('noimageindex')
        return directives.join(', ')
    }

    const generateHreflangLinks = (slotData) => {
        if (!slotData || slotData.hreflang_enabled === false) return []
        const baseUrl = 'https://slotquest.com'
        const slotUrl = `/slots/${slotData.slug || slug}`
        const links = []
        links.push({ rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}${slotUrl}` })
        links.push({ rel: 'alternate', hreflang: 'en', href: `${baseUrl}${slotUrl}` })

        if (slotData.hreflang_config) {
            try {
                const config = JSON.parse(slotData.hreflang_config)
                if (Array.isArray(config)) {
                    config.forEach(item => {
                        links.push({ rel: 'alternate', hreflang: `${item.lang}-${item.region}`, href: `${baseUrl}${item.url || slotUrl}` })
                    })
                    return links
                }
            } catch (e) { }
        }

        const targetRegions = [
            { lang: 'ru', region: 'RU' }, { lang: 'en', region: 'IN' }, { lang: 'pt', region: 'BR' },
            { lang: 'uz', region: 'UZ' }, { lang: 'az', region: 'AZ' }, { lang: 'tr', region: 'TR' },
            { lang: 'es', region: 'CL' }, { lang: 'es', region: 'AR' }, { lang: 'en', region: 'CA' },
            { lang: 'es', region: 'CO' }, { lang: 'id', region: 'ID' }, { lang: 'bn', region: 'BD' }
        ]
        const geoTargets = slotData.geo_target_regions?.split(',').map(r => r.trim()) || []
        targetRegions.forEach(({ lang, region }) => {
            if (geoTargets.length === 0 || geoTargets.includes(region)) {
                links.push({ rel: 'alternate', hreflang: `${lang}-${region}`, href: `${baseUrl}${slotUrl}` })
            }
        })
        return links
    }

    const getStructuredData = (slotData) => {
        if (!slotData || !slotData.name) return '{}'
        const baseUrl = 'https://slotquest.com'
        const slotUrl = `${baseUrl}/slots/${slotData.slug || slug}`
        const imageUrl = slotData.image_url || `${baseUrl}/images/slots/${slotData.slug || slug}.jpg`

        const organizationSlotQuest = {
            '@type': 'Organization', '@id': `${baseUrl}/#organization`, name: 'SlotQuest', url: baseUrl,
            logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png`, width: 200, height: 60 },
            sameAs: ['https://vk.com/slotquest', 'https://t.me/slotquest', 'https://twitter.com/slotquest']
        }

        const providerOrganization = {
            '@type': 'Organization', '@id': `${baseUrl}/provider/${slotData.providers?.slug || 'provider'}`,
            name: slotData.providers?.name || 'Game Provider', url: slotData.providers?.website || 'https://slotquest.com',
            description: slotData.providers?.description || `${slotData.providers?.name || 'Game Provider'} - online casino game developer`,
            logo: slotData.providers?.logo ? { '@type': 'ImageObject', url: slotData.providers.logo, width: 200, height: 100 } : undefined
        }

        const gameSchema = {
            '@context': 'https://schema.org', '@type': 'Game', '@id': slotUrl,
            name: slotData.name, description: getDetailedDescription(slotData), url: slotUrl,
            inLanguage: slotData.content_language || 'en', isAccessibleForFree: Boolean(slotData.demo_url),
            keywords: [slotData.hero_keyword, slotData.hero_keyword_2, slotData.hero_keyword_3, slotData.name, slotData.providers?.name, 'Online Slot', 'Casino Game'].filter(Boolean).join(', '),
            audience: slotData.geo_target_regions ? {
                '@type': 'Audience', audienceType: 'Online Casino Players',
                geographicArea: slotData.geo_target_regions.split(',').map(code => code.trim()).filter(Boolean).map(code => ({ '@type': 'Country', identifier: code }))
            } : undefined,
            image: { '@type': 'ImageObject', url: imageUrl, width: 1200, height: 630, caption: `${slotData.name} - slot machine screenshot` },
            datePublished: slotData.release_date || '2021-02-13',
            genre: getSlotThemesFromDB(slotData)?.length > 0 ? getSlotThemesFromDB(slotData).map(t => t.name) : (slotData.hero_keyword || 'Slot Game'),
            gamePlatform: ['Web Browser', 'Mobile', 'Desktop'], applicationCategory: 'Game', contentRating: '18+',
            gameItem: [
                { '@type': 'Thing', name: 'RTP', value: `${slotData.rtp || '96.5'}%`, description: `RTP ${slotData.rtp || '96.5'}%` },
                { '@type': 'Thing', name: 'Volatility', value: slotData.volatility || 'High', description: `${slotData.volatility || 'High'} volatility` },
                { '@type': 'Thing', name: 'Max Win', value: `${slotData.max_win || '5,000'}x`, description: `Max win ${slotData.max_win || '5,000'}x bet` }
            ],
            gameFeature: ['Free Spins', 'Multipliers', 'Wild Symbols', 'Scatter Pays', 'Bonus Buy', 'Mobile Compatible', slotData.theme, ...(slotData.mechanics?.map(m => m.name) || []), ...(slotData.bonus_types?.map(b => b.name) || [])].filter(Boolean),
            publisher: organizationSlotQuest, provider: providerOrganization,
            aggregateRating: { '@type': 'AggregateRating', ratingValue: slotData.rating || '4.8', bestRating: '5', ratingCount: slotData.reviews_count || '1247' },
            potentialAction: [
                { '@type': 'PlayAction', name: 'Play Demo', target: { '@type': 'EntryPoint', urlTemplate: slotData.demo_url || `${baseUrl}/slots/${slotData.slug || slug}/demo`, actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'] } },
                { '@type': 'PlayAction', name: 'Play for Real Money', target: { '@type': 'EntryPoint', urlTemplate: slotData.real_play_url || `${baseUrl}/casinos/best-for-${slotData.slug || slug}` } }
            ],
            offers: [
                { '@type': 'Offer', name: 'Demo Version', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: slotData.demo_url || slotUrl },
                { '@type': 'Offer', name: 'Real Money Play', priceRange: `${slotData.min_bet || '0.20'}-${slotData.max_bet || '100'}`, priceCurrency: 'EUR', availability: 'https://schema.org/InStock', url: slotData.real_play_url || `${baseUrl}/casino` }
            ]
        }

        if (slotData.video_url) {
            gameSchema.trailer = {
                '@type': 'VideoObject', '@id': `${slotUrl}#video`, name: `${slotData.name} - Gameplay Trailer`, alternateName: `${slotData.name} gameplay video`,
                description: `Watch ${slotData.name} slot gameplay from ${slotData.providers?.name || 'provider'}. Demonstration of game mechanics, bonus features and winning combinations.`,
                url: slotData.video_url, contentUrl: slotData.video_url, embedUrl: slotData.video_url, thumbnailUrl: imageUrl,
                uploadDate: slotData.release_date || '2021-02-13', datePublished: slotData.release_date || '2021-02-13', inLanguage: slotData.content_language || 'en',
                duration: slotData.video_duration || 'PT3M', videoQuality: 'HD', encodingFormat: 'video/mp4', width: 1920, height: 1080, genre: 'Gaming',
                keywords: `${slotData.name}, slot machine, gameplay, ${slotData.providers?.name || 'provider'}, online casino, demo`,
                creator: providerOrganization, publisher: organizationSlotQuest, copyrightHolder: providerOrganization, license: 'https://creativecommons.org/licenses/by-nc/4.0/', isAccessibleForFree: true, isFamilyFriendly: false, contentRating: '18+'
            }
        }

        const breadcrumbSchema = {
            '@context': 'https://schema.org', '@type': 'BreadcrumbList', '@id': `${slotUrl}#breadcrumb`,
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
                { '@type': 'ListItem', position: 2, name: 'Slots', item: `${baseUrl}/slots` },
                ...(slotData.providers?.name ? [{ '@type': 'ListItem', position: 3, name: slotData.providers.name, item: `${baseUrl}/provider/${slotData.providers.slug || 'provider'}` }] : []),
                { '@type': 'ListItem', position: slotData.providers?.name ? 4 : 3, name: slotData.name, item: slotUrl }
            ]
        }

        const websiteSchema = {
            '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${baseUrl}/#website`, name: 'SlotQuest', url: baseUrl,
            potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/search?q={search_term_string}` }, 'query-input': 'required name=search_term_string' }
        }

        const faqItems = computedFaq.value
        const faqSchema = faqItems && faqItems.length > 0 ? {
            '@context': 'https://schema.org', '@type': 'FAQPage', '@id': `${slotUrl}#faq`,
            mainEntity: faqItems.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } }))
        } : null

        const reviewSchema = {
            '@context': 'https://schema.org', '@type': 'Article', '@id': `${slotUrl}#review`,
            headline: slotData.overview_title || `${getSlotNameWithKeyword(slotData)} 2025`,
            description: slotData.overview_description_1 || `Complete review of ${slotData.name} slot from ${slotData.providers?.name || 'provider'}. RTP, volatility, bonus features analysis.`,
            articleBody: [slotData.overview_description_1, slotData.overview_description_2].filter(Boolean).join(' ') || `${slotData.name} is an innovative slot game with high win potential.`,
            url: slotUrl, image: imageUrl, author: organizationSlotQuest, publisher: organizationSlotQuest,
            datePublished: slotData.release_date || '2021-02-13', dateModified: slotData.updated_at || new Date().toISOString().split('T')[0], inLanguage: slotData.content_language || 'en',
            keywords: [slotData.hero_keyword, slotData.hero_keyword_2, slotData.hero_keyword_3, slotData.name, `${slotData.name} Review`, 'Slot Review', 'Casino Game Review'].filter(Boolean).join(', '),
            about: slotData.hero_keyword_2 ? { '@type': 'Thing', name: slotData.hero_keyword_2, description: `Detailed review and analysis of ${slotData.hero_keyword_2}` } : undefined,
            aggregateRating: { '@type': 'AggregateRating', ratingValue: slotData.rating || '4.8', bestRating: '5', ratingCount: slotData.reviews_count || '1247' }
        }

        const howToSteps = computedHowToPlay.value
        const howToSchema = howToSteps && howToSteps.length >= 2 ? {
            '@context': 'https://schema.org', '@type': 'HowTo', '@id': `${slotUrl}#howto`,
            name: `How to Play ${slotData.name} Slot`, description: `Step-by-step guide to playing ${slotData.name} online slot game`,
            step: howToSteps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.step, text: s.text })),
            totalTime: 'PT2M'
        } : null

        const similarSlotsSchema = similarSlots.value?.length > 0 ? {
            '@context': 'https://schema.org', '@type': 'ItemList', '@id': `${slotUrl}#similar`,
            name: `Similar Slots to ${slotData.name}`, description: `Other popular slot games similar to ${slotData.name}`,
            itemListElement: similarSlots.value.map((similarSlot, index) => ({
                '@type': 'ListItem', position: index + 1,
                item: { '@type': 'Game', name: similarSlot.name, url: `${baseUrl}/slots/${similarSlot.slug}`, image: similarSlot.image_url, aggregateRating: similarSlot.rating ? { '@type': 'AggregateRating', ratingValue: similarSlot.rating, bestRating: '5' } : undefined }
            }))
        } : null

        const gameFeaturesSchema = {
            '@context': 'https://schema.org', '@type': 'ItemList', '@id': `${slotUrl}#features`,
            name: `${slotData.name} Game Features, Themes & Bonuses`, description: `Complete list of themes, game mechanics and bonus features in ${slotData.name} slot by ${slotData.providers?.name || 'provider'}`,
            numberOfItems: (getSlotThemesFromDB(slotData)?.length || 0) + (slotData.slot_mechanics?.length || 0) + (slotData.slot_bonuses?.length || 0),
            itemListElement: [
                ...(getSlotThemesFromDB(slotData) || []).map((theme, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'DefinedTerm', '@id': `${slotUrl}#theme-${theme.slug || theme.id}`, name: theme.name, description: `${theme.name} theme in ${slotData.name} slot game`, inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Slot Game Themes' } } })),
                ...(slotData.slot_mechanics || []).map((slotMechanic, index) => ({ '@type': 'ListItem', position: (getSlotThemesFromDB(slotData)?.length || 0) + index + 1, item: { '@type': 'Thing', '@id': `${slotUrl}#mechanic-${slotMechanic.mechanics?.id || index}`, name: slotMechanic.mechanics?.name, description: `${slotMechanic.mechanics?.name} game mechanic feature`, additionalType: 'GameFeature' } })),
                ...(slotData.slot_bonuses || []).map((slotBonus, index) => ({ '@type': 'ListItem', position: (getSlotThemesFromDB(slotData)?.length || 0) + (slotData.slot_mechanics?.length || 0) + index + 1, item: { '@type': 'Offer', '@id': `${slotUrl}#bonus-${slotBonus.bonuses?.id || index}`, name: slotBonus.bonuses?.name, description: `${slotBonus.bonuses?.name} bonus feature in ${slotData.name}`, category: 'Bonus Feature' } }))
            ].filter(item => item.item?.name)
        }

        const allSchemas = [gameSchema, breadcrumbSchema, websiteSchema, faqSchema, reviewSchema, howToSchema, similarSlotsSchema, gameFeaturesSchema.itemListElement.length > 0 ? gameFeaturesSchema : null].filter(Boolean)
        return JSON.stringify(allSchemas)
    }

    const { getJsonLdScriptSync } = (typeof useJsonLd !== 'undefined') ? useJsonLd() : { getJsonLdScriptSync: () => null }

    watchEffect(() => {
        if (slot.value && !loading.value && !error.value) {
            let structuredData
            if (slot.value.jsonld_enabled !== false && slot.value.id && getJsonLdScriptSync) {
                const jsonLdScript = getJsonLdScriptSync(slot.value, 'https://slotquest.com')
                if (jsonLdScript) {
                    structuredData = jsonLdScript.innerHTML
                }
            }
            if (!structuredData) {
                structuredData = getStructuredData(slot.value)
            }

            useHead({
                title: slot.value.seo_title || `${slot.value.name}${slot.value.hero_keyword && slot.value.hero_keyword !== slot.value.name ? ' - ' + slot.value.hero_keyword : ''} 🎰 Play Free Demo & Real Money | SlotQuest`,
                meta: [
                    { name: 'description', content: slot.value.seo_description || generateSEODescription(slot.value) },
                    { name: 'keywords', content: generateOptimizedKeywords(slot.value) },
                    { name: 'author', content: 'SlotQuest Editorial Team' },
                    { name: 'robots', content: generateRobotsContent(slot.value) },
                    { name: 'theme-color', content: '#1a1a2e' },
                    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                    { property: 'og:title', content: slot.value.og_title || `${slot.value.name} 🎰 Play Free Demo & Real Money` },
                    { property: 'og:description', content: slot.value.og_description || slot.value.seo_description || generateSEODescription(slot.value) },
                    { property: 'og:type', content: slot.value.og_type || 'article' },
                    { property: 'og:site_name', content: slot.value.og_site_name || 'SlotQuest' },
                    { property: 'og:locale', content: slot.value.og_locale || 'en_US' },
                    { property: 'og:url', content: slot.value.og_url || `https://slotquest.com/slots/${slot.value.slug || slug}` },
                    { property: 'og:image', content: slot.value.og_image || slot.value.image_url || `https://slotquest.com/images/slots/${slot.value.slug || slug}.jpg` },
                    { property: 'og:image:alt', content: slot.value.og_image_alt || `${slot.value.name || 'Slot'} - screenshot of slot machine from ${slot.value.providers?.name || 'provider'}` },
                    { property: 'og:image:width', content: String(slot.value.og_image_width || 1200) },
                    { property: 'og:image:height', content: String(slot.value.og_image_height || 630) },
                    { property: 'og:image:type', content: 'image/jpeg' },
                    { property: 'og:image:secure_url', content: slot.value.og_image || slot.value.image_url || `https://slotquest.com/images/slots/${slot.value.slug || slug}.jpg` },
                    { property: 'og:updated_time', content: slot.value.updated_at || new Date().toISOString().split('T')[0] },
                    ...(slot.value.og_video ? [
                        { property: 'og:video', content: slot.value.og_video },
                        { property: 'og:video:type', content: slot.value.og_video_type || 'video/mp4' },
                        { property: 'og:video:width', content: String(slot.value.og_video_width || 1280) },
                        { property: 'og:video:height', content: String(slot.value.og_video_height || 720) },
                    ] : []),
                    ...(slot.value.og_locale_alternate ? slot.value.og_locale_alternate.split(',').map(locale => ({ property: 'og:locale:alternate', content: locale.trim() })) : []),
                    { property: 'article:published_time', content: slot.value.release_date || '2021-02-13' },
                    { property: 'article:modified_time', content: slot.value.updated_at || new Date().toISOString().split('T')[0] },
                    { property: 'article:author', content: slot.value.author_meta || 'SlotQuest Editorial Team' },
                    { property: 'article:section', content: 'Slot Machines' },
                    { property: 'article:tag', content: `${slot.value.name}, ${slot.value.providers?.name || 'provider'}, slot, slot machine` },
                    { name: 'twitter:card', content: slot.value.twitter_card || 'summary_large_image' },
                    { name: 'twitter:site', content: slot.value.twitter_site || '@SlotQuest' },
                    { name: 'twitter:title', content: slot.value.twitter_title || `${slot.value.name || 'Slot'} 🎰 Play Free Demo & Real Money` },
                    { name: 'twitter:description', content: slot.value.twitter_description || `🎰 ${slot.value.name || 'Slot'} from ${slot.value.providers?.name || 'provider'} - play free demo or real money. RTP: ${slot.value.rtp || '96'}%, rating: ${slot.value.rating || '4.8'}/5 ⭐` },
                    { name: 'twitter:image', content: slot.value.twitter_image || slot.value.image_url || `https://slotquest.com/images/slots/${slot.value.slug || slug}.jpg` },
                    { name: 'twitter:image:alt', content: slot.value.twitter_image_alt || `${slot.value.name} slot gameplay screenshot` },
                    { name: 'twitter:creator', content: slot.value.twitter_creator || '@SlotQuest' },
                    ...(slot.value.twitter_player ? [
                        { name: 'twitter:player', content: slot.value.twitter_player },
                        { name: 'twitter:player:width', content: String(slot.value.twitter_player_width || 1280) },
                        { name: 'twitter:player:height', content: String(slot.value.twitter_player_height || 720) },
                    ] : []),
                    { name: 'twitter:label1', content: 'RTP' }, { name: 'twitter:data1', content: `${slot.value.rtp || '96'}%` },
                    { name: 'twitter:label2', content: 'Volatility' }, { name: 'twitter:data2', content: slot.value.volatility || 'Medium' },
                    { name: 'rating', content: '18+' },
                    { 'http-equiv': 'content-language', content: slot.value.content_language || 'en' },
                    { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
                    { name: 'bingbot', content: 'index, follow' },
                    { name: 'yandex', content: 'index, follow' },
                    { name: 'geo.region', content: parsedGeoRegions.value?.length ? parsedGeoRegions.value.join(', ') : 'RU, IN, BR, UZ, AZ, TR, CL, AR, CA, CO, ID, BD' },
                    { name: 'distribution', content: 'global' }, { name: 'target', content: 'all' },
                    { name: 'game:type', content: 'slot_machine' }, { name: 'game:genre', content: 'casino_slot' },
                    { name: 'slot:provider', content: slot.value.providers?.name || 'Game Provider' },
                    { name: 'slot:rtp', content: `${slot.value.rtp || '96'}%` }, { name: 'slot:volatility', content: slot.value.volatility || 'medium' },
                    { name: 'slot:max_win', content: slot.value.max_win || '5000x' }, { name: 'slot:min_bet', content: slot.value.min_bet || '0.20' },
                    { name: 'slot:theme', content: slot.value.theme || slot.value.category?.name || 'casino' },
                    { name: 'casino:demo_available', content: slot.value.demo_url ? 'yes' : 'no' },
                    { name: 'casino:real_money', content: slot.value.real_play_url ? 'yes' : 'no' },
                    { name: 'alternative-name', content: slot.value.alternative_names || slot.value.name },
                    { name: 'rating', content: `${slot.value.rating || '4.8'}/5` }, { name: 'reviewCount', content: slot.value.reviews_count || '1247' },
                    { name: 'release_date', content: slot.value.release_date || '2021-02-13' },
                    { name: 'mobile-web-app-capable', content: 'yes' }, { name: 'apple-mobile-web-app-capable', content: 'yes' }, { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
                ],
                htmlAttrs: { lang: slot.value.content_language || 'en' },
                link: [
                    { rel: 'canonical', href: slot.value.canonical_url || `https://slotquest.com/slots/${slot.value.slug || slug}` },
                    ...generateHreflangLinks(slot.value),
                    { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: 'anonymous' },
                    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
                    { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
                    { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: 'anonymous' },
                    { rel: 'preload', href: slot.value.image_url || slot.value.og_image || '/images/default-slot.jpg', as: 'image', type: 'image/jpeg', media: '(min-width: 768px)' },
                    { rel: 'preload', href: slot.value.thumbnail_url || slot.value.image_url || '/images/default-slot-thumb.jpg', as: 'image', type: 'image/jpeg', media: '(max-width: 767px)' },
                    { rel: 'prefetch', href: slot.value.screenshot_url || slot.value.image_url || '/images/default-slot.jpg', as: 'image', type: 'image/jpeg' },
                ],
                script: [
                    { type: 'application/ld+json', children: structuredData },
                    ...generateSeoSchemas.value.map(schema => ({ type: 'application/ld+json', children: JSON.stringify(schema) }))
                ],
            })
        } else {
            useHead({
                title: 'Slot - SlotQuest',
                meta: [
                    { name: 'description', content: 'Play slot from leading provider. Great opportunities to win!' },
                    { property: 'og:title', content: 'Slot - SlotQuest' },
                    { property: 'og:description', content: 'Play slot from leading provider. Great opportunities to win!' },
                    { property: 'og:type', content: 'website' },
                    { property: 'og:url', content: 'https://slotquest.com/slots' },
                    { property: 'og:image', content: 'https://slotquest.com/og-default.jpg' },
                    { name: 'twitter:card', content: 'summary_large_image' },
                    { name: 'twitter:title', content: 'Slot - SlotQuest' },
                    { name: 'twitter:description', content: 'Play slot from leading provider. Great opportunities to win!' },
                    { name: 'twitter:image', content: 'https://slotquest.com/og-default.jpg' }
                ],
                link: [{ rel: 'canonical', href: 'https://slotquest.com/slots' }]
            })
        }
    })
}
