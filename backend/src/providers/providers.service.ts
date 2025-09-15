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

  async createProvider(providerData: any) {
    // Generate slug from name
    const slug = providerData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const data = await this.prisma.providers.create({
      data: {
        ...providerData,
        slug,
      },
    });
    return { data };
  }

  async updateProvider(id: string, providerData: any) {
    // Update slug if name changed
    if (providerData.name) {
      const slug = providerData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      providerData.slug = slug;
    }

    const data = await this.prisma.providers.update({
      where: { id },
      data: providerData,
    });
    return { data };
  }

  async deleteProvider(id: string) {
    const data = await this.prisma.providers.delete({
      where: { id },
    });
    return { data };
  }

  async getAllProvidersForAdmin() {
    const data = await this.prisma.providers.findMany({
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
}
