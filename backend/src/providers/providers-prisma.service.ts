import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

type Provider = Awaited<ReturnType<PrismaClient['providers']['findFirst']>>;
type ProviderWithSlots = Awaited<ReturnType<PrismaClient['providers']['findFirst']>> & {
  slots: Awaited<ReturnType<PrismaClient['slots']['findMany']>>;
};

@Injectable()
export class ProvidersPrismaService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Provider[]> {
    return this.prisma.providers.findMany({
      where: {
        is_active: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findBySlug(slug: string): Promise<Provider | null> {
    return this.prisma.providers.findUnique({
      where: { slug },
    });
  }

  async findWithSlots(slug: string): Promise<ProviderWithSlots | null> {
    return this.prisma.providers.findUnique({
      where: { slug },
      include: {
        slots: {
          where: {
            is_active: true,
          },
          orderBy: {
            rating: 'desc',
          },
        },
      },
    });
  }

  async getProviderStats(slug: string) {
    const provider = await this.prisma.providers.findUnique({
      where: { slug },
      include: {
        slots: {
          where: {
            is_active: true,
          },
        },
      },
    });

    if (!provider) {
      return null;
    }

    const totalSlots = provider.slots.length;
    const averageRating =
      provider.slots.reduce((sum, slot) => sum + Number(slot.rating || 0), 0) /
      totalSlots;
    const totalPlays = provider.slots.reduce(
      (sum, slot) => sum + (slot.play_count || 0),
      0,
    );
    const topRatedSlot = provider.slots.reduce((top, slot) =>
      Number(slot.rating || 0) > Number(top.rating || 0) ? slot : top,
    );
    const mostPlayedSlot = provider.slots.reduce((top, slot) =>
      (slot.play_count || 0) > (top.play_count || 0) ? slot : top,
    );

    return {
      provider: {
        id: provider.id,
        name: provider.name,
        slug: provider.slug,
        description: provider.description,
        logoUrl: provider.logo_url,
        websiteUrl: provider.website_url,
      },
      stats: {
        totalSlots,
        averageRating: Math.round(averageRating * 10) / 10,
        totalPlays,
        topRatedSlot: {
          name: topRatedSlot.name,
          slug: topRatedSlot.slug,
          rating: Number(topRatedSlot.rating || 0),
        },
        mostPlayedSlot: {
          name: mostPlayedSlot.name,
          slug: mostPlayedSlot.slug,
          playCount: mostPlayedSlot.play_count || 0,
        },
      },
    };
  }

  async getTopProviders(limit: number = 10): Promise<Provider[]> {
    // Get providers with their slot counts and average ratings
    const providersData = await this.prisma.providers.findMany({
      where: {
        is_active: true,
      },
      include: {
        slots: {
          where: {
            is_active: true,
          },
          select: {
            rating: true,
            play_count: true,
          },
        },
      },
    });

    // Calculate stats and sort
    const providersWithStats = providersData
      .map((provider) => {
        const totalSlots = provider.slots.length;
        const averageRating =
          totalSlots > 0
            ? provider.slots.reduce(
                (sum, slot) => sum + Number(slot.rating || 0),
                0,
              ) / totalSlots
            : 0;
        const totalPlays = provider.slots.reduce(
          (sum, slot) => sum + (slot.play_count || 0),
          0,
        );

        return {
          ...provider,
          stats: {
            totalSlots,
            averageRating,
            totalPlays,
          },
        };
      })
      .sort((a, b) => {
        // Sort by average rating first, then by total plays
        if (b.stats.averageRating !== a.stats.averageRating) {
          return b.stats.averageRating - a.stats.averageRating;
        }
        return b.stats.totalPlays - a.stats.totalPlays;
      })
      .slice(0, limit);

    // Return only provider data without stats
    return providersWithStats.map(item => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description: item.description,
      logo_url: item.logo_url,
      website_url: item.website_url,
      founded_year: item.founded_year,
      country: item.country,
      is_active: item.is_active,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  }
}
