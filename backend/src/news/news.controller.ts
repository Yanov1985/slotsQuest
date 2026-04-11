import { Controller, Get, Param, Query, UseInterceptors, Post, Patch, Delete, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/news')
export class NewsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAllNews(@Query('admin') admin?: string) {
    try {
      const where: any = {};
      if (admin !== 'true') {
        where.is_published = true;
      }
      const data = await this.prisma.news.findMany({
        where,
        orderBy: { published_at: 'desc' },
        select: {
          id: true,
          slug: true,
          title: true,
          image_url: true,
          published_at: true,
          localizations: true,
        },
      });
      return { data };
    } catch (error) {
      console.error('Failed to fetch news list:', error.message);
      throw error;
    }
  }

  @Get(':slug')
  @UseInterceptors(CacheInterceptor)
  async getNewsBySlug(@Param('slug') slug: string) {
    try {
      const data = await this.prisma.news.findUnique({
        where: { slug },
      });
      return { data };
    } catch (error) {
      console.error(`Failed to fetch news ${slug}:`, error.message);
      throw error;
    }
  }

  // Admin Endpoints
  @Post()
  async createNews(@Body() body: any) {
    try {
      const data = await this.prisma.news.create({
        data: {
          title: body.title,
          slug: body.slug,
          content_markdown: body.content_markdown || body.content || null,
          image_url: body.image_url || null,
          source_url: body.source_url || null,
          author_name: body.author_name || null,
          is_published: body.is_published ?? false,
          published_at: body.published_at ? new Date(body.published_at) : new Date(),
          localizations: body.localizations || {},
        },
      });
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateNews(@Param('id') id: string, @Body() body: any) {
    try {
      const { id: _, ...updateData } = body;
      if (updateData.published_at) {
        updateData.published_at = new Date(updateData.published_at);
      }
      const data = await this.prisma.news.update({
        where: { id },
        data: updateData,
      });
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteNews(@Param('id') id: string) {
    try {
      await this.prisma.news.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
