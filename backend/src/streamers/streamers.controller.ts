import { Controller, Get, Param, Query, UseInterceptors, Post, Patch, Delete, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/streamers')
@UseInterceptors(CacheInterceptor)
export class StreamersController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAllStreamers() {
    try {
      const data = await this.prisma.streamers.findMany({
        orderBy: { name: 'asc' },
        select: {
          id: true,
          slug: true,
          name: true,
          platform: true,
          avatar_url: true,
          localizations: true,
        },
      });
      return { data };
    } catch (error) {
      console.error('Failed to fetch streamers:', error.message);
      throw error;
    }
  }

  @Get(':slug')
  async getStreamerBySlug(@Param('slug') slug: string) {
    try {
      const data = await this.prisma.streamers.findUnique({
        where: { slug },
      });
      return { data };
    } catch (error) {
      console.error(`Failed to fetch streamer ${slug}:`, error.message);
      throw error;
    }
  }

  // Admin Endpoints
  @Post()
  async createStreamer(@Body() body: any) {
    try {
      const data = await this.prisma.streamers.create({
        data: {
          name: body.name,
          slug: body.slug,
          platform: body.platform || null,
          channel_url: body.channel_url || null,
          avatar_url: body.avatar_url || null,
          bio_markdown: body.bio_markdown || null,
          favorite_slots: body.favorite_slots || null,
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
  async updateStreamer(@Param('id') id: string, @Body() body: any) {
    try {
      const { id: _, ...updateData } = body;
      const data = await this.prisma.streamers.update({
        where: { id },
        data: updateData,
      });
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteStreamer(@Param('id') id: string) {
    try {
      await this.prisma.streamers.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
