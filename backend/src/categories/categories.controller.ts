import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllCategories() {
    try {
      return await this.prismaService.slot_categories.findMany({
        orderBy: { name: 'asc' },
      });
    } catch (error) {
      console.error('Failed to fetch categories:', error.message);
      throw error;
    }
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    try {
      return await this.prismaService.slot_categories.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Failed to fetch category:', error.message);
      throw error;
    }
  }

  @Post()
  async createCategory(@Body() categoryData: any) {
    try {
      return await this.prismaService.slot_categories.create({
        data: categoryData,
      });
    } catch (error) {
      console.error('Failed to create category:', error.message);
      throw error;
    }
  }

  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() categoryData: any) {
    try {
      return await this.prismaService.slot_categories.update({
        where: { id },
        data: categoryData,
      });
    } catch (error) {
      console.error('Failed to update category:', error.message);
      throw error;
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    try {
      return await this.prismaService.slot_categories.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Failed to delete category:', error.message);
      throw error;
    }
  }
}
