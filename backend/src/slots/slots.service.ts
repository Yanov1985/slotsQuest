import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface SlotFilters {
  provider?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

interface ReviewData {
  title: string;
  content: string;
  rating: number;
  pros?: string[];
  cons?: string[];
  author_name?: string;
  author_email?: string;
}

interface RatingData {
  rating: number;
  userIp: string;
  userId?: string;
  comment?: string;
}

@Injectable()
export class SlotsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSlots(filters: SlotFilters = {}) {
    const data = await this.prisma.slots.findMany({
      where: {
        is_active: true,
      },
      include: {
        providers: true,
        slot_categories: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 50,
    });

    return data;
  }

  async getFeaturedSlots() {
    const data = await this.prisma.slots.findMany({
      where: {
        is_active: true,
        rating: {
          gte: 8.0,
        },
      },
      include: {
        providers: true,
        slot_categories: true,
      },
      orderBy: {
        rating: 'desc',
      },
      take: 12,
    });

    return data;
  }

  async getPopularSlots() {
    const data = await this.prisma.slots.findMany({
      where: {
        is_active: true,
      },
      include: {
        providers: true,
        slot_categories: true,
      },
      orderBy: {
        play_count: 'desc',
      },
      take: 12,
    });

    return data;
  }

  async searchSlots(searchQuery: string) {
    const data = await this.prisma.slots.findMany({
      where: {
        is_active: true,
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
          {
            theme: {
              contains: searchQuery,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        providers: true,
        slot_categories: true,
      },
      orderBy: {
        rating: 'desc',
      },
      take: 20,
    });

    return data;
  }

  async getSlotBySlug(slug: string) {
    const data = await this.prisma.slots.findFirst({
      where: {
        slug,
        is_active: true,
      },
      include: {
        providers: true,
        slot_categories: true,
      },
    });

    // Increment play count
    if (data) {
      await this.prisma.slots.update({
        where: { id: data.id },
        data: {
          play_count: (data.play_count || 0) + 1,
        },
      });
    }

    return data;
  }

  async getSlotReviews(slug: string) {
    // First get the slot ID
    const slot = await this.prisma.slots.findFirst({
      where: { slug },
      select: { id: true },
    });

    if (!slot) throw new Error('Slot not found');

    // Note: reviews table might not exist yet, returning empty array
    const reviews: any[] = [];
    // TODO: Implement when reviews table is available
    // const reviews = await this.prisma.reviews.findMany({
    //   where: {
    //     slot_id: slot.id,
    //     is_published: true,
    //   },
    //   orderBy: {
    //     created_at: 'desc',
    //   },
    // });

    return reviews;
  }

  async createSlotReview(slug: string, reviewData: ReviewData) {
    // First get the slot ID
    const slot = await this.prisma.slots.findFirst({
      where: { slug },
      select: { id: true },
    });

    if (!slot) throw new Error('Slot not found');

    // Note: reviews table might not exist yet, returning mock data
    const review = {
      id: 'temp-' + Date.now(),
      ...reviewData,
      slot_id: slot.id,
      is_published: false,
      created_at: new Date(),
    };
    // TODO: Implement when reviews table is available
    // const review = await this.prisma.reviews.create({
    //   data: {
    //     ...reviewData,
    //     slot_id: slot.id,
    //     is_published: false,
    //   },
    // });

    return review;
  }

  async addSlotRating(slug: string, ratingData: RatingData) {
    // First get the slot ID
    const slot = await this.prisma.slots.findFirst({
      where: { slug },
      select: { id: true },
    });

    if (!slot) throw new Error('Slot not found');

    // Note: slot_ratings table not available yet, returning mock data
    const rating = {
      id: 'temp-' + Date.now(),
      slot_id: slot.id,
      user_id: ratingData.userId || 'anonymous',
      user_ip: ratingData.userIp,
      rating: ratingData.rating,
      comment: ratingData.comment,
      created_at: new Date(),
    };
    // TODO: Implement when slot_ratings table is available
    // const rating = await this.prisma.slot_ratings.upsert({
    //   where: {
    //     user_id_slot_id: {
    //       user_id: ratingData.userId || 'anonymous',
    //       slot_id: slot.id,
    //     },
    //   },
    //   update: {
    //     rating: ratingData.rating,
    //     comment: ratingData.comment,
    //   },
    //   create: {
    //     slot_id: slot.id,
    //     user_id: ratingData.userId || 'anonymous',
    //     user_ip: ratingData.userIp,
    //     rating: ratingData.rating,
    //     comment: ratingData.comment,
    //   },
    // });

    // Update slot average rating
    // await this.updateSlotAverageRating(slot.id);

    return rating;
  }

  async getSlotRating(slug: string) {
    // First get the slot ID
    const slot = await this.prisma.slots.findFirst({
      where: { slug },
      select: { id: true, rating: true },
    });

    if (!slot) throw new Error('Slot not found');

    // Note: slot_ratings table not available yet, using slot.rating field
    const average = Number(slot.rating) || 0;
    // TODO: Implement when slot_ratings table is available
    // const ratings = await this.prisma.slot_ratings.findMany({
    //   where: { slot_id: slot.id },
    //   select: { rating: true },
    // });

    // if (ratings.length === 0) {
    //   return { average: 0, count: 0 };
    // }

    // const sum = ratings.reduce((acc, r) => acc + Number(r.rating), 0);
    // const average = sum / ratings.length;

    return { average: Math.round(average * 10) / 10, count: 1 };
  }

  private async updateSlotAverageRating(slotId: string) {
    // Note: slot_ratings table not available yet, skipping rating update
    // TODO: Implement when slot_ratings table is available
    // const ratings = await this.prisma.slot_ratings.findMany({
    //   where: { slot_id: slotId },
    //   select: { rating: true },
    // });

    // if (ratings.length === 0) {
    //   await this.prisma.slots.update({
    //     where: { id: slotId },
    //     data: { rating: 0 },
    //   });
    //   return;
    // }

    // const sum = ratings.reduce((acc, r) => acc + Number(r.rating), 0);
    // const average = sum / ratings.length;

    // await this.prisma.slots.update({
    //   where: { id: slotId },
    //   data: { rating: Math.round(average * 10) / 10 },
    // });
  }

  async getSlotsByProvider(providerSlug: string) {
    // First get the provider ID
    const provider = await this.prisma.providers.findFirst({
      where: { slug: providerSlug },
      select: { id: true },
    });

    if (!provider) throw new Error('Provider not found');

    const slots = await this.prisma.slots.findMany({
      where: {
        provider_id: provider.id,
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

    return slots;
  }

  async getSlotsByCategory(categorySlug: string) {
    // First get the category ID
    const category = await this.prisma.slot_categories.findFirst({
      where: { slug: categorySlug },
      select: { id: true },
    });

    if (!category) throw new Error('Category not found');

    const slots = await this.prisma.slots.findMany({
      where: {
        category_id: category.id,
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

    return slots;
  }
}
