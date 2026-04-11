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

@Controller('api/glossary')
export class GlossaryController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAllTerms(
    @Query('letter') letter?: string,
    @Query('category') category?: string,
    @Query('admin') admin?: string,
  ) {
    try {
      const where: any = {};
      if (admin !== 'true') {
        where.is_published = true;
      }
      if (letter) where.letter = letter.toUpperCase();
      if (category) where.category = category;

      const data = await this.prismaService.glossary.findMany({
        where,
        orderBy: { term: 'asc' },
        select: {
          id: true,
          term: true,
          slug: true,
          brief_definition: true,
          category: true,
          letter: true,
          localizations: true,
        },
      });

      return { data };
    } catch (error) {
      console.error('Failed to fetch glossary terms:', error.message);
      throw error;
    }
  }

  @Get('letters')
  @UseInterceptors(CacheInterceptor)
  async getLetters() {
    try {
      const results = await this.prismaService.glossary.groupBy({
        by: ['letter'],
        where: { is_published: true, letter: { not: null } },
        _count: { id: true },
        orderBy: { letter: 'asc' },
      });
      return { data: results.map((r) => ({ letter: r.letter, count: r._count.id })) };
    } catch (error) {
      console.error('Failed to fetch glossary letters:', error.message);
      throw error;
    }
  }

  @Get(':slug')
  @UseInterceptors(CacheInterceptor)
  async getTermBySlug(@Param('slug') slug: string) {
    try {
      const data = await this.prismaService.glossary.findUnique({
        where: { slug },
      });
      return { data };
    } catch (error) {
      console.error('Failed to fetch glossary term:', error.message);
      throw error;
    }
  }

  // Admin Endpoints
  @Post()
  async createTerm(@Body() body: any) {
    try {
      const data = await this.prismaService.glossary.create({
        data: {
          term: body.term,
          slug: body.slug,
          brief_definition: body.brief_definition,
          detailed_explanation: body.detailed_explanation || null,
          related_terms: body.related_terms || null,
          seo_title: body.seo_title || null,
          seo_desc: body.seo_desc || null,
          localizations: body.localizations || {},
          category: body.category || null,
          is_published: body.is_published ?? true,
          letter: body.letter || (body.term ? body.term.charAt(0).toUpperCase() : null),
        },
      });
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateTerm(@Param('id') id: string, @Body() body: any) {
    try {
      const { id: _, ...updateData } = body;
      const data = await this.prismaService.glossary.update({
        where: { id },
        data: updateData,
      });
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteTerm(@Param('id') id: string) {
    try {
      await this.prismaService.glossary.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
