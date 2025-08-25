import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProviders() {
    const data = await this.prisma.providers.findMany({
      where: {
        is_active: true,
      },
      include: {
        _count: {
          select: {
            slots: {
              where: {
                is_active: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    // Transform data to include slots_count
    const transformedData = data.map(provider => ({
      ...provider,
      slots_count: provider._count.slots,
      _count: undefined, // Remove _count from response
    }));
    
    return { data: transformedData };
  }

  async getProviderBySlug(slug: string) {
    const data = await this.prisma.providers.findFirst({
      where: {
        slug,
        is_active: true,
      },
    });
    if (!data) {
      throw new Error('Provider not found');
    }
    return { data };
  }

  async getProviderSlots(slug: string) {
    const data = await this.prisma.slots.findMany({
      where: {
        providers: {
          slug,
        },
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
  }
}
