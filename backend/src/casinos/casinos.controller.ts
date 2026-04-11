import { Controller, Get, Param, Query, UseInterceptors, Post, Patch, Delete, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/casinos')
@UseInterceptors(CacheInterceptor)
export class CasinosController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAllCasinos() {
    try {
      const data = await this.prisma.casinos.findMany({
        orderBy: { rating: 'desc' },
        select: {
          id: true,
          slug: true,
          name: true,
          logo_url: true,
          rating: true,
          localizations: true,
        },
      });
      return { data };
    } catch (error) {
      console.error('Failed to fetch casinos:', error.message);
      throw error;
    }
  }

  @Get(':slug')
  async getCasinoBySlug(@Param('slug') slug: string) {
    try {
      const data = await this.prisma.casinos.findUnique({
        where: { slug },
      });
      return { data };
    } catch (error) {
      console.error(`Failed to fetch casino ${slug}:`, error.message);
      throw error;
    }
  }

  // Admin Endpoints
  @Post()
  async createCasino(@Body() body: any) {
    try {
      const data = await this.prisma.casinos.create({
        data: {
          name: body.name,
          slug: body.slug,
          logo_url: body.logo_url || null,
          website_url: body.website_url || null,
          affiliate_link: body.affiliate_link || null,
          rating: body.rating || 0,
          established_year: body.established_year || null,
          owner: body.owner || null,
          licensing: body.licensing || null,
          languages: body.languages || null,
          currencies: body.currencies || null,
          deposit_methods: body.deposit_methods || null,
          withdrawal_limit: body.withdrawal_limit || null,
          seo_title: body.seo_title || null,
          seo_desc: body.seo_desc || null,
          content_markdown: body.content_markdown || body.full_review_content || null,
          is_active: body.is_active ?? true,
          localizations: body.localizations || {},
        },
      });
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateCasino(@Param('id') id: string, @Body() body: any) {
    try {
      const { id: _, ...updateData } = body;
      const data = await this.prisma.casinos.update({
        where: { id },
        data: updateData,
      });
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteCasino(@Param('id') id: string) {
    try {
      await this.prisma.casinos.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
