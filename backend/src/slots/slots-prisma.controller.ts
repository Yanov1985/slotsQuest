import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { SlotsPrismaService } from './slots-prisma.service';

@Controller('api/prisma/slots')
export class SlotsPrismaController {
  constructor(private readonly slotsPrismaService: SlotsPrismaService) {}

  @Get()
  async findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    const offsetNum = offset ? parseInt(offset, 10) : undefined;
    return this.slotsPrismaService.findAll(limitNum, offsetNum);
  }

  @Get('popular')
  async getPopular(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.slotsPrismaService.getPopularSlots(limitNum);
  }

  @Get('top-rated')
  async getTopRated(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.slotsPrismaService.getTopRatedSlots(limitNum);
  }

  @Get('category/:categorySlug')
  async findByCategory(
    @Param('categorySlug') categorySlug: string,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : undefined;
    return this.slotsPrismaService.findByCategory(categorySlug, limitNum);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.slotsPrismaService.findBySlug(slug);
  }

  @Post(':slug/play')
  async incrementPlayCount(@Param('slug') slug: string) {
    return this.slotsPrismaService.incrementPlayCount(slug);
  }

  @Post(':slug/rate')
  async updateRating(
    @Param('slug') slug: string,
    @Body('rating') rating: number,
  ) {
    return this.slotsPrismaService.updateRating(slug, rating);
  }
}