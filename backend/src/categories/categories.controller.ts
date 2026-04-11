import { UseInterceptors, 
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
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
  @UseInterceptors(CacheInterceptor)
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

  @Get('slug/:slug')
  @UseInterceptors(CacheInterceptor)
  async getCategoryBySlug(@Param('slug') slug: string) {
    try {
      const data = await this.prismaService.slot_categories.findUnique({
        where: { slug },
      });
      return { data };
    } catch (error) {
      console.error('Failed to fetch category by slug:', error.message);
      throw error;
    }
  }

  @Get(':slug/slots')
  @UseInterceptors(CacheInterceptor)
  async getCategorySlots(@Param('slug') slug: string) {
    try {
      const data = await this.prismaService.slots.findMany({
        where: {
          slot_categories: { slug },
          is_active: true,
        },
        include: {
          providers: true,
          slot_categories: true,
        },
        orderBy: {
          rating: 'desc',
        },
      });
      return { data };
    } catch (error) {
      console.error('Failed to fetch category slots:', error.message);
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
