import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { slots, providers, slot_categories } from '@prisma/client';

type SlotWithRelations = slots & {
  providers: providers;
  slot_categories: slot_categories | null;
};

@Injectable()
export class SlotsPrismaService {
  constructor(private prisma: PrismaService) {}

  async findAll(limit?: number, offset?: number): Promise<SlotWithRelations[]> {
    return this.prisma.slots.findMany({
      take: limit,
      skip: offset,
      include: {
        providers: true,
        slot_categories: true,
      },
      where: {
        is_active: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findBySlug(slug: string): Promise<SlotWithRelations | null> {
    return this.prisma.slots.findUnique({
      where: { slug },
      include: {
        providers: true,
        slot_categories: true,
      },
    });
  }

  async findByProvider(providerSlug: string, limit?: number): Promise<SlotWithRelations[]> {
    return this.prisma.slots.findMany({
      take: limit,
      include: {
        providers: true,
        slot_categories: true,
      },
      where: {
        providers: {
          slug: providerSlug,
        },
        is_active: true,
      },
      orderBy: {
        rating: 'desc',
      },
    });
  }

  async findByCategory(categorySlug: string, limit?: number): Promise<SlotWithRelations[]> {
    return this.prisma.slots.findMany({
      take: limit,
      include: {
        providers: true,
        slot_categories: true,
      },
      where: {
        slot_categories: {
          slug: categorySlug,
        },
        is_active: true,
      },
      orderBy: {
        rating: 'desc',
      },
    });
  }

  async incrementPlayCount(slug: string): Promise<SlotWithRelations> {
    return this.prisma.slots.update({
      where: { slug },
      data: {
        play_count: {
          increment: 1,
        },
      },
      include: {
        providers: true,
        slot_categories: true,
      },
    });
  }

  async updateRating(slug: string, rating: number): Promise<SlotWithRelations> {
    return this.prisma.slots.update({
      where: { slug },
      data: { rating },
      include: {
        providers: true,
        slot_categories: true,
      },
    });
  }

  async getPopularSlots(limit: number = 10): Promise<SlotWithRelations[]> {
    return this.prisma.slots.findMany({
      take: limit,
      include: {
        providers: true,
        slot_categories: true,
      },
      where: {
        is_active: true,
      },
      orderBy: {
        play_count: 'desc',
      },
    });
  }

  async getTopRatedSlots(limit: number = 10): Promise<SlotWithRelations[]> {
    return this.prisma.slots.findMany({
      take: limit,
      include: {
        providers: true,
        slot_categories: true,
      },
      where: {
        is_active: true,
        rating: {
          gte: 8,
        },
      },
      orderBy: {
        rating: 'desc',
      },
    });
  }
}