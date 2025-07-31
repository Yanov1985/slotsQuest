import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllCategories() {
    try {
      return await this.prismaService.slot_categories.findMany({
        orderBy: { name: 'asc' }
      });
    } catch (error) {
      console.error('Failed to fetch categories:', error.message);
      throw error;
    }
  }
}