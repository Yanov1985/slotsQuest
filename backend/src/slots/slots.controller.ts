import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SlotsService } from './slots.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('api/slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Get()
  async getAllSlots(
    @Query('provider') provider?: string,
    @Query('category') category?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    try {
      const data = await this.slotsService.getAllSlots({
        provider,
        category,
        limit: limit ? parseInt(limit) : undefined,
        offset: offset ? parseInt(offset) : undefined,
      });
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
}
