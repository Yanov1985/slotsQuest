import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PagesService {
    constructor(private prisma: PrismaService) { }

    async findOne(slug: string) {
        const page = await this.prisma.pages.findUnique({
            where: { slug },
        });

        if (!page) {
            throw new NotFoundException(`Page with slug ${slug} not found`);
        }

        // Try to parse the content JSON string if it exists
        let parsedContent: any = null;
        if (page.content) {
            try {
                parsedContent = JSON.parse(page.content);
            } catch (e) {
                console.error(`Failed to parse content for page ${slug}:`, e);
                parsedContent = page.content; // Fallback to raw string
            }
        }

        return {
            ...page,
            content: parsedContent,
        };
    }

    async update(slug: string, updateData: any) {
        // If the content is an object or array, stringify it before saving
        let contentString = updateData.content;
        if (updateData.content && typeof updateData.content === 'object') {
            contentString = JSON.stringify(updateData.content);
        }

        // Prepare exactly what we want to save, stripping unwanted / undefined fields
        const dataToUpdate = {
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

            // Open Graph / Social
            og_title: updateData.og_title !== undefined ? updateData.og_title : null,
            og_desc: updateData.og_desc !== undefined ? updateData.og_desc : null,
            og_image: updateData.og_image !== undefined ? updateData.og_image : null,
            twitter_card: updateData.twitter_card !== undefined ? updateData.twitter_card : null,

            // Advanced
            json_schema: updateData.json_schema !== undefined ? updateData.json_schema : null,

            content: contentString !== undefined ? contentString : null,
        };

        // Use upsert to create the page if it doesn't exist yet (e.g. first time saving the homepage)
        const page = await this.prisma.pages.upsert({
            where: { slug },
            update: dataToUpdate,
            create: {
                slug,
                ...dataToUpdate,
                title: dataToUpdate.title || 'New Page',
            },
        });

        let parsedContent = null;
        if (page.content) {
            try {
                parsedContent = JSON.parse(page.content);
            } catch (e) { }
        }

        return {
            ...page,
            content: parsedContent,
        };
    }
}
