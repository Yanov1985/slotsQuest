import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PagesService {
    constructor(
        private prisma: PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    private jsonFields = [
        'content',
        'fast_filters',
        'hreflang_config',
        'jsonld_faq_json',
        'jsonld_how_to_json',
        'awards',
        'info_pros',
        'info_cons',
        'seo_keywords_list'
    ];

    private parseFields(page: any) {
        if (!page) return null;
        const result = { ...page };
        for (const field of this.jsonFields) {
            if (page[field]) {
                try {
                    result[field] = JSON.parse(page[field]);
                } catch (e) {
                    console.error(`Failed to parse ${field} for page ${page.slug}:`, e);
                    // Keep raw if failed
                }
            }
        }
        return result;
    }

    private stringifyFields(data: any) {
        const result = { ...data };
        for (const field of this.jsonFields) {
            if (data[field] !== undefined && data[field] !== null && typeof data[field] === 'object') {
                result[field] = JSON.stringify(data[field]);
            }
        }
        return result;
    }

    async findOne(slug: string) {
        const page = await this.prisma.pages.findUnique({
            where: { slug },
        });

        if (!page) {
            throw new NotFoundException(`Page with slug ${slug} not found`);
        }

        return this.parseFields(page);
    }

    async update(slug: string, updateData: any) {
        const stringifiedData = this.stringifyFields(updateData);

        // Prepare exactly what we want to save
        const dataToUpdate: any = {
            title: updateData.title,
            hero_title: updateData.hero_title !== undefined ? updateData.hero_title : null,
            hero_desc: updateData.hero_desc !== undefined ? updateData.hero_desc : null,

            // Basic SEO
            seo_title: updateData.seo_title !== undefined ? updateData.seo_title : null,
            seo_desc: updateData.seo_desc !== undefined ? updateData.seo_desc : null,
            seo_keywords: updateData.seo_keywords !== undefined ? updateData.seo_keywords : null,

            // Technical SEO
            seo_canonical_url: updateData.seo_canonical_url !== undefined ? updateData.seo_canonical_url : null,
            seo_robots: updateData.seo_robots !== undefined ? updateData.seo_robots : null,

            // Advanced Keywords System
            hero_keyword_1: updateData.hero_keyword_1 !== undefined ? updateData.hero_keyword_1 : null,
            hero_keyword_2: updateData.hero_keyword_2 !== undefined ? updateData.hero_keyword_2 : null,
            hero_keyword_3: updateData.hero_keyword_3 !== undefined ? updateData.hero_keyword_3 : null,
            seo_keywords_primary: updateData.seo_keywords_primary !== undefined ? updateData.seo_keywords_primary : null,
            seo_keywords_lsi: updateData.seo_keywords_lsi !== undefined ? updateData.seo_keywords_lsi : null,
            seo_keywords_longtail: updateData.seo_keywords_longtail !== undefined ? updateData.seo_keywords_longtail : null,
            seo_keywords_geo: updateData.seo_keywords_geo !== undefined ? updateData.seo_keywords_geo : null,
            seo_keywords_list: stringifiedData.seo_keywords_list !== undefined ? stringifiedData.seo_keywords_list : null,

            // Granular Robots
            robots_index: updateData.robots_index !== undefined ? updateData.robots_index : true,
            robots_follow: updateData.robots_follow !== undefined ? updateData.robots_follow : true,
            robots_max_snippet: updateData.robots_max_snippet !== undefined ? updateData.robots_max_snippet : -1,
            robots_max_image_preview: updateData.robots_max_image_preview !== undefined ? updateData.robots_max_image_preview : 'large',
            robots_max_video_preview: updateData.robots_max_video_preview !== undefined ? updateData.robots_max_video_preview : -1,
            robots_notranslate: updateData.robots_notranslate !== undefined ? updateData.robots_notranslate : false,
            robots_noimageindex: updateData.robots_noimageindex !== undefined ? updateData.robots_noimageindex : false,

            // Localization & Geo
            hreflang_enabled: updateData.hreflang_enabled !== undefined ? updateData.hreflang_enabled : false,
            hreflang_config: stringifiedData.hreflang_config !== undefined ? stringifiedData.hreflang_config : null,
            geo_target_enabled: updateData.geo_target_enabled !== undefined ? updateData.geo_target_enabled : false,
            geo_target_regions: updateData.geo_target_regions !== undefined ? updateData.geo_target_regions : null,

            // Structured Data / JSON-LD
            jsonld_enabled: updateData.jsonld_enabled !== undefined ? updateData.jsonld_enabled : true,
            jsonld_type: updateData.jsonld_type !== undefined ? updateData.jsonld_type : 'CollectionPage',
            jsonld_enable_faq: updateData.jsonld_enable_faq !== undefined ? updateData.jsonld_enable_faq : false,
            jsonld_faq_json: stringifiedData.jsonld_faq_json !== undefined ? stringifiedData.jsonld_faq_json : null,
            jsonld_enable_review: updateData.jsonld_enable_review !== undefined ? updateData.jsonld_enable_review : false,
            jsonld_review_author: updateData.jsonld_review_author !== undefined ? updateData.jsonld_review_author : null,
            jsonld_review_rating: updateData.jsonld_review_rating !== undefined ? updateData.jsonld_review_rating : null,
            jsonld_review_text: updateData.jsonld_review_text !== undefined ? updateData.jsonld_review_text : null,
            jsonld_enable_how_to: updateData.jsonld_enable_how_to !== undefined ? updateData.jsonld_enable_how_to : false,
            jsonld_how_to_json: stringifiedData.jsonld_how_to_json !== undefined ? stringifiedData.jsonld_how_to_json : null,
            jsonld_enable_breadcrumb: updateData.jsonld_enable_breadcrumb !== undefined ? updateData.jsonld_enable_breadcrumb : true,
            jsonld_override_auto: updateData.jsonld_override_auto !== undefined ? updateData.jsonld_override_auto : false,

            // Open Graph / Social
            og_title: updateData.og_title !== undefined ? updateData.og_title : null,
            og_desc: updateData.og_desc !== undefined ? updateData.og_desc : null,
            og_image: updateData.og_image !== undefined ? updateData.og_image : null,
            twitter_card: updateData.twitter_card !== undefined ? updateData.twitter_card : null,

            // Advanced
            json_schema: updateData.json_schema !== undefined ? updateData.json_schema : null,
            fast_filters: stringifiedData.fast_filters !== undefined ? stringifiedData.fast_filters : null,
            content: stringifiedData.content !== undefined ? stringifiedData.content : null,

            // Custom Content Sections
            show_awards: updateData.show_awards !== undefined ? updateData.show_awards : false,
            awards: stringifiedData.awards !== undefined ? stringifiedData.awards : null,
            info_pros: stringifiedData.info_pros !== undefined ? stringifiedData.info_pros : null,
            info_cons: stringifiedData.info_cons !== undefined ? stringifiedData.info_cons : null,

            // Dynamic Footer Settings
            footer_company_name: updateData.footer_company_name !== undefined ? updateData.footer_company_name : 'SlotQuest Inc.',
            footer_description: updateData.footer_description !== undefined ? updateData.footer_description : null,
            footer_facebook: updateData.footer_facebook !== undefined ? updateData.footer_facebook : null,
            footer_twitter: updateData.footer_twitter !== undefined ? updateData.footer_twitter : null,
            footer_instagram: updateData.footer_instagram !== undefined ? updateData.footer_instagram : null,
            footer_telegram: updateData.footer_telegram !== undefined ? updateData.footer_telegram : null,
            global_affiliate_link: updateData.global_affiliate_link !== undefined ? updateData.global_affiliate_link : null,
        };

        // Use upsert to create the page if it doesn't exist yet
        const page = await this.prisma.pages.upsert({
            where: { slug },
            update: dataToUpdate,
            create: {
                slug,
                ...dataToUpdate,
                title: dataToUpdate.title || 'New Page',
            },
        });

        // Invalidate backend cache so Admin sees updates instantly
        await this.cacheManager.del(`/api/pages/${slug}`);

        return this.parseFields(page);
    }
}
