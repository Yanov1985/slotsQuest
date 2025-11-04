import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeatureDto, UpdateFeatureDto, FeatureQueryDto } from './dto/feature.dto';
import { Prisma, PrismaClient } from '@prisma/client';

type Feature = Awaited<ReturnType<PrismaClient['features']['findFirst']>>;

@Injectable()
export class FeaturesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: FeatureQueryDto) {
    const {
      search,
      type,
      is_active,
      is_popular,
      is_featured,
      limit = 50,
      offset = 0,
      sort_by = 'sort_order',
      sort_order = 'asc',
    } = query;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { slug: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (type) {
      where.type = type;
    }

    if (is_active !== undefined) {
      where.is_active = is_active === 'true';
    }

    if (is_popular !== undefined) {
      where.is_popular = is_popular === 'true';
    }

    if (is_featured !== undefined) {
      where.is_featured = is_featured === 'true';
    }

    const orderBy: any = {};

    switch (sort_by) {
      case 'name':
        orderBy.name = sort_order as 'asc' | 'desc';
        break;
      case 'created_at':
        orderBy.created_at = sort_order as 'asc' | 'desc';
        break;
      case 'sort_order':
        orderBy.sort_order = sort_order as 'asc' | 'desc';
        break;
      default:
        orderBy.sort_order = 'asc';
    }

    const [features, total] = await Promise.all([
      this.prisma.features.findMany({
        where,
        orderBy,
        take: Number(limit),
        skip: Number(offset),
        include: {
          _count: {
            select: {
              slot_features: true,
            },
          },
        },
      }),
      this.prisma.features.count({ where }),
    ]);

    // Add slots_count to each feature
    const featuresWithCount = features.map(feature => ({
      ...feature,
      slots_count: feature._count.slot_features,
      _count: undefined,
    }));

    return {
      data: featuresWithCount,
      total,
      limit: Number(limit),
      offset: Number(offset),
    };
  }

  async findOne(id: number) {
    const feature = await this.prisma.features.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            slot_features: true,
          },
        },
      },
    });

    if (!feature) {
      throw new NotFoundException(`Feature with ID ${id} not found`);
    }

    return {
      ...feature,
      slots_count: feature._count.slot_features,
      _count: undefined,
    };
  }

  async findPopular(limit: number = 10) {
    const features = await this.prisma.features.findMany({
      where: {
        is_active: true,
        is_popular: true,
      },
      orderBy: {
        sort_order: 'asc',
      },
      take: limit,
      include: {
        _count: {
          select: {
            slot_features: true,
          },
        },
      },
    });

    return features.map(feature => ({
      ...feature,
      slots_count: feature._count.slot_features,
      _count: undefined,
    }));
  }

  async findFeatured(limit: number = 10) {
    const features = await this.prisma.features.findMany({
      where: {
        is_active: true,
        is_featured: true,
      },
      orderBy: {
        sort_order: 'asc',
      },
      take: limit,
      include: {
        _count: {
          select: {
            slot_features: true,
          },
        },
      },
    });

    return features.map(feature => ({
      ...feature,
      slots_count: feature._count.slot_features,
      _count: undefined,
    }));
  }

  async findSlotsByFeature(featureId: number) {
    const feature = await this.prisma.features.findUnique({
      where: { id: featureId },
    });

    if (!feature) {
      throw new NotFoundException(`Feature with ID ${featureId} not found`);
    }

    const slotFeatures = await this.prisma.slot_features.findMany({
      where: { feature_id: featureId },
      include: {
        slots: {
          include: {
            providers: true,
            slot_categories: true,
          },
        },
      },
    });

    return slotFeatures.map(sf => sf.slots);
  }

  async create(createFeatureDto: CreateFeatureDto) {
    // Check if slug already exists
    const existingFeature = await this.prisma.features.findUnique({
      where: { slug: createFeatureDto.slug },
    });

    if (existingFeature) {
      throw new Error(`Feature with slug '${createFeatureDto.slug}' already exists`);
    }

    return this.prisma.features.create({
      data: createFeatureDto,
      include: {
        _count: {
          select: {
            slot_features: true,
          },
        },
      },
    });
  }

  async update(id: number, updateFeatureDto: UpdateFeatureDto) {
    const feature = await this.prisma.features.findUnique({
      where: { id },
    });

    if (!feature) {
      throw new NotFoundException(`Feature with ID ${id} not found`);
    }

    // Check if slug already exists (excluding current feature)
    if (updateFeatureDto.slug && updateFeatureDto.slug !== feature.slug) {
      const existingFeature = await this.prisma.features.findUnique({
        where: { slug: updateFeatureDto.slug },
      });

      if (existingFeature) {
        throw new Error(`Feature with slug '${updateFeatureDto.slug}' already exists`);
      }
    }

    return this.prisma.features.update({
      where: { id },
      data: updateFeatureDto,
      include: {
        _count: {
          select: {
            slot_features: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const feature = await this.prisma.features.findUnique({
      where: { id },
    });

    if (!feature) {
      throw new NotFoundException(`Feature with ID ${id} not found`);
    }

    // Delete all slot_features relationships first
    await this.prisma.slot_features.deleteMany({
      where: { feature_id: id },
    });

    // Then delete the feature
    return this.prisma.features.delete({
      where: { id },
    });
  }

  async addFeatureToSlot(slotId: string, featureId: number) {
    // Check if slot exists
    const slot = await this.prisma.slots.findUnique({
      where: { id: slotId },
    });

    if (!slot) {
      throw new NotFoundException(`Slot with ID ${slotId} not found`);
    }

    // Check if feature exists
    const feature = await this.prisma.features.findUnique({
      where: { id: featureId },
    });

    if (!feature) {
      throw new NotFoundException(`Feature with ID ${featureId} not found`);
    }

    // Check if relationship already exists
    const existingRelation = await this.prisma.slot_features.findUnique({
      where: {
        slot_id_feature_id: {
          slot_id: slotId,
          feature_id: featureId,
        },
      },
    });

    if (existingRelation) {
      throw new Error('Feature is already assigned to this slot');
    }

    return this.prisma.slot_features.create({
      data: {
        slot_id: slotId,
        feature_id: featureId,
      },
      include: {
        slots: true,
        features: true,
      },
    });
  }

  async removeFeatureFromSlot(slotId: string, featureId: number) {
    const relation = await this.prisma.slot_features.findUnique({
      where: {
        slot_id_feature_id: {
          slot_id: slotId,
          feature_id: featureId,
        },
      },
    });

    if (!relation) {
      throw new NotFoundException('Feature is not assigned to this slot');
    }

    return this.prisma.slot_features.delete({
      where: {
        slot_id_feature_id: {
          slot_id: slotId,
          feature_id: featureId,
        },
      },
    });
  }
}
