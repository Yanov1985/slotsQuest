import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Delete,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SlotsService } from './slots.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateRatingDto } from './dto/create-rating.dto';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';

@Controller('api/slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  async getAllSlots(
    @Query('provider') provider?: string,
    @Query('category') category?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('admin') admin?: string,
  ) {
    try {
      let data;
      if (admin === 'true') {
        data = await this.slotsService.getAllSlotsForAdmin();
      } else {
        data = await this.slotsService.getAllSlots({
          provider,
          category,
          limit: limit ? parseInt(limit) : undefined,
          offset: offset ? parseInt(offset) : undefined,
        });
      }
      return { data };
    } catch (error) {
      console.error('Error in getAllSlots:', error);
      throw new HttpException(
        `Failed to fetch slots: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('featured')
  async getFeaturedSlots() {
    try {
      const data = await this.slotsService.getFeaturedSlots();
      return { data };
    } catch {
      throw new HttpException(
        'Failed to fetch featured slots',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('popular')
  async getPopularSlots() {
    try {
      const data = await this.slotsService.getPopularSlots();
      return { data };
    } catch {
      throw new HttpException(
        'Failed to fetch popular slots',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  async searchSlots(@Query('q') query: string) {
    try {
      if (!query) {
        throw new HttpException(
          'Search query is required',
          HttpStatus.BAD_REQUEST,
        );
      }
      const data = await this.slotsService.searchSlots(query);
      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to search slots',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':slug')
  async getSlotBySlug(@Param('slug') slug: string) {
    try {
      const slot = await this.slotsService.getSlotBySlug(slug);
      if (!slot) {
        throw new HttpException('Slot not found', HttpStatus.NOT_FOUND);
      }
      return slot;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch slot',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':slug/reviews')
  async getSlotReviews(@Param('slug') slug: string) {
    try {
      const data = await this.slotsService.getSlotReviews(slug);
      return { data };
    } catch {
      throw new HttpException(
        'Failed to fetch slot reviews',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':slug/reviews')
  async createSlotReview(
    @Param('slug') slug: string,
    @Body() reviewData: CreateReviewDto,
  ) {
    try {
      const data = await this.slotsService.createSlotReview(slug, reviewData);
      return { data };
    } catch {
      throw new HttpException(
        'Failed to create review',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':slug/rating')
  async addSlotRating(
    @Param('slug') slug: string,
    @Body() ratingData: CreateRatingDto,
  ) {
    try {
      if (
        !ratingData.rating ||
        ratingData.rating < 1 ||
        ratingData.rating > 5
      ) {
        throw new HttpException(
          'Rating must be between 1 and 5',
          HttpStatus.BAD_REQUEST,
        );
      }
      const data = await this.slotsService.addSlotRating(slug, ratingData);
      return { data };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to add rating',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':slug/rating')
  async getSlotRating(@Param('slug') slug: string) {
    try {
      const data = await this.slotsService.getSlotRating(slug);
      return { data };
    } catch {
      throw new HttpException(
        'Failed to fetch slot rating',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createSlot(@Body() createSlotDto: CreateSlotDto) {
    try {
      const slot = await this.slotsService.createSlot(createSlotDto);
      return { data: slot };
    } catch (error) {
      console.error('Error creating slot:', error);
      throw new HttpException(
        `Failed to create slot: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateSlot(
    @Param('id') id: string,
    @Body() updateSlotDto: UpdateSlotDto,
  ) {
    try {
      console.log('🎯 Начало обновления слота');
      console.log('📝 ID слота:', id);
      console.log('📦 Данные для обновления:', JSON.stringify(updateSlotDto, null, 2));

      // Проверяем наличие слота перед обновлением
      const existingSlot = await this.slotsService.getSlotById(id);
      if (!existingSlot) {
        console.log('❌ Слот не найден:', id);
        throw new HttpException('Slot not found', HttpStatus.NOT_FOUND);
      }
      console.log('✅ Слот найден:', existingSlot.name);

      const slot = await this.slotsService.updateSlot(id, updateSlotDto);

      console.log('✅ Слот успешно обновлен:', {
        id: slot.id,
        name: slot.name
      });

      return { data: slot };
    } catch (error) {
      console.error('❌ Ошибка при обновлении слота:', {
        id,
        error: {
          name: error.name,
          message: error.message,
          code: error.code,
          stack: error.stack
        }
      });

      if (error.code === 'P2025') {
        throw new HttpException('Slot not found', HttpStatus.NOT_FOUND);
      }

      // Более подробное сообщение об ошибке
      const errorMessage = `Failed to update slot: ${error.message}. ${error.code ? `Code: ${error.code}.` : ''} ${error.meta ? `Details: ${JSON.stringify(error.meta)}` : ''}`;

      throw new HttpException(
        errorMessage,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteSlot(@Param('id') id: string) {
    try {
      const result = await this.slotsService.deleteSlot(id);
      return result;
    } catch (error) {
      console.error('Error deleting slot:', error);
      if (error.code === 'P2025') {
        throw new HttpException('Slot not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        `Failed to delete slot: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('admin/:id')
  async getSlotById(@Param('id') id: string) {
    try {
      const slot = await this.slotsService.getSlotById(id);
      if (!slot) {
        throw new HttpException('Slot not found', HttpStatus.NOT_FOUND);
      }
      return { data: slot };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch slot',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
