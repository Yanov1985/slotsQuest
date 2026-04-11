import {
  UseInterceptors,
  Controller,
  Get,
  Param,
  Query,
  Post,
  Patch,
  Delete,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/blogs')
export class BlogsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAllBlogs(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('category') category?: string,
    @Query('tag') tag?: string,
    @Query('admin') admin?: string,
  ) {
    try {
      const defaultLimit = admin === 'true' ? '100' : '12';
      const take = Math.min(parseInt(limit || defaultLimit, 10), 1000);
      const skip = (Math.max(parseInt(page || '1', 10), 1) - 1) * take;

      const where: any = {};
      if (category) where.category = category;
      if (tag) where.tags = { contains: tag };
      // Always require seo_desc so we only show fully generated articles
      where.seo_desc = { not: null };

      if (admin !== 'true') {
        where.is_published = true;
      }

      const [data, total] = await Promise.all([
        this.prismaService.blogs.findMany({
          where,
          orderBy: { published_at: 'desc' },
          take,
          skip,
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            cover_image_url: true,
            author_name: true,
            tags: true,
            category: true,
            reading_time: true,
            is_featured: true,
            is_published: true,
            published_at: true,
            seo_title: true,
            seo_desc: true,
            localizations: true,
            content_markdown: true,
          },
        }),
        this.prismaService.blogs.count({ where }),
      ]);

      return { data, total, page: parseInt(page || '1', 10), pages: Math.ceil(total / take) };
    } catch (error) {
      console.error('Failed to fetch blogs:', error.message);
      throw error;
    }
  }

  @Get('featured')
  @UseInterceptors(CacheInterceptor)
  async getFeaturedBlogs() {
    try {
      const data = await this.prismaService.blogs.findMany({
        where: { is_published: true, is_featured: true, seo_desc: { not: null } },
        orderBy: { published_at: 'desc' },
        take: 6,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          cover_image_url: true,
          author_name: true,
          tags: true,
          category: true,
          reading_time: true,
          published_at: true,
          localizations: true,
        },
      });
      return { data };
    } catch (error) {
      console.error('Failed to fetch featured blogs:', error.message);
      throw error;
    }
  }

  @Get('categories')
  @UseInterceptors(CacheInterceptor)
  async getBlogCategories() {
    try {
      const results = await this.prismaService.blogs.groupBy({
        by: ['category'],
        where: { is_published: true, category: { not: null }, seo_desc: { not: null } },
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
      });
      return { data: results.map((r) => ({ name: r.category, count: r._count.id })) };
    } catch (error) {
      console.error('Failed to fetch blog categories:', error.message);
      throw error;
    }
  }

  @Get(':slug')
  @UseInterceptors(CacheInterceptor)
  async getBlogBySlug(@Param('slug') slug: string) {
    try {
      const data = await this.prismaService.blogs.findUnique({
        where: { slug },
      });
      return { data };
    } catch (error) {
      console.error('Failed to fetch blog by slug:', error.message);
      throw error;
    }
  }

  // Admin Endpoints
  @Post()
  async createBlog(@Body() body: any) {
    try {
      const data = await this.prismaService.blogs.create({
        data: {
          title: body.title,
          slug: body.slug,
          excerpt: body.excerpt || null,
          content_markdown: body.content_markdown || body.content || null,
          cover_image_url: body.cover_image_url || null,
          author_name: body.author_name || null,
          category: body.category || null,
          tags: body.tags || null,
          reading_time: body.reading_time || 5,
          is_published: body.is_published ?? false,
          is_featured: body.is_featured ?? false,
          published_at: body.published_at ? new Date(body.published_at) : new Date(),
          seo_title: body.seo_title || null,
          seo_desc: body.seo_desc || null,
          localizations: body.localizations || {},
        },
      });
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateBlog(@Param('id') id: string, @Body() body: any) {
    try {
      const { id: _, ...updateData } = body;
      if (updateData.published_at) {
        updateData.published_at = new Date(updateData.published_at);
      }
      const data = await this.prismaService.blogs.update({
        where: { id },
        data: updateData,
      });
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    try {
      await this.prismaService.blogs.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
