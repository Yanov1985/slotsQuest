import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMechanicDto, UpdateMechanicDto, MechanicQueryDto } from './dto/mechanic.dto';
import { Prisma, PrismaClient } from '@prisma/client';

type Mechanic = Awaited<ReturnType<PrismaClient['mechanics']['findFirst']>>;

@Injectable()
export class MechanicsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: MechanicQueryDto) {
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
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
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

    const [mechanics, total] = await Promise.all([
      this.prisma.mechanics.findMany({
        where,
        orderBy,
        take: Number(limit),
        skip: Number(offset),
        include: {
          _count: {
            select: {
              slot_mechanics: true,
            },
          },
        },
      }),
      this.prisma.mechanics.count({ where }),
    ]);

    return {
      data: mechanics,
      total,
      limit: Number(limit),
      offset: Number(offset),
      has_more: Number(offset) + Number(limit) < total,
    };
  }

  async findOne(id: number) {
    const mechanic = await this.prisma.mechanics.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            slot_mechanics: true,
          },
        },
      },
    });

    if (!mechanic) {
      throw new NotFoundException(`Mechanic with ID ${id} not found`);
    }

    return mechanic;
  }

  async findPopular(limit: number = 10) {
    const mechanics = await this.prisma.mechanics.findMany({
      where: {
        is_popular: true,
        is_active: true,
      },
      orderBy: [
        { sort_order: 'asc' },
        { name: 'asc' },
      ],
      take: limit,
      include: {
        _count: {
          select: {
            slot_mechanics: true,
          },
        },
      },
    });

    return {
      data: mechanics,
      total: mechanics.length,
    };
  }

  async findFeatured(limit: number = 10) {
    const mechanics = await this.prisma.mechanics.findMany({
      where: {
        is_featured: true,
        is_active: true,
      },
      orderBy: [
        { sort_order: 'asc' },
        { name: 'asc' },
      ],
      take: limit,
      include: {
        _count: {
          select: {
            slot_mechanics: true,
          },
        },
      },
    });

    return {
      data: mechanics,
      total: mechanics.length,
    };
  }

  async findSlotsByMechanic(mechanicId: number) {
    const mechanic = await this.findOne(mechanicId);
    
    const slots = await this.prisma.slots.findMany({
      where: {
        slot_mechanics: {
          some: {
            mechanic_id: mechanicId,
          },
        },
      },
      include: {
        providers: true,
        themes: true,
        slot_categories: true,
      },
    });

    return {
      mechanic,
      slots,
      total: slots.length,
    };
  }

  async create(createMechanicDto: CreateMechanicDto) {
    try {
      const mechanic = await this.prisma.mechanics.create({
        data: {
          ...createMechanicDto,
          created_at: new Date(),
          updated_at: new Date(),
        },
        include: {
          _count: {
            select: {
              slot_mechanics: true,
            },
          },
        },
      });

      return mechanic;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Mechanic with this name or slug already exists');
        }
      }
      throw error;
    }
  }

  async update(id: number, updateMechanicDto: UpdateMechanicDto) {
    await this.findOne(id);

    try {
      const mechanic = await this.prisma.mechanics.update({
        where: { id },
        data: {
          ...updateMechanicDto,
          updated_at: new Date(),
        },
        include: {
          _count: {
            select: {
              slot_mechanics: true,
            },
          },
        },
      });

      return mechanic;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Mechanic with this name or slug already exists');
        }
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.slot_mechanics.deleteMany({
          where: { mechanic_id: id },
        });

        await prisma.mechanics.delete({
          where: { id },
        });
      });

      return { message: 'Mechanic deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete mechanic');
    }
  }

  async addMechanicToSlot(slotId: string, mechanicId: number) {
    const mechanic = await this.findOne(mechanicId);
    
    const slot = await this.prisma.slots.findUnique({
      where: { id: slotId },
    });

    if (!slot) {
      throw new NotFoundException(`Slot with ID ${slotId} not found`);
    }

    const existingRelation = await this.prisma.slot_mechanics.findFirst({
      where: {
        slot_id: slotId,
        mechanic_id: mechanicId,
      },
    });

    if (existingRelation) {
      throw new Error('Mechanic is already associated with this slot');
    }

    try {
      const relation = await this.prisma.slot_mechanics.create({
        data: {
          slot_id: slotId,
          mechanic_id: mechanicId,
          created_at: new Date(),
        },
        include: {
          mechanics: true,
          slots: {
            include: {
              providers: true,
              themes: true,
              slot_categories: true,
            },
          },
        },
      });

      return relation;
    } catch (error) {
      throw new Error('Failed to add mechanic to slot');
    }
  }

  async removeMechanicFromSlot(slotId: string, mechanicId: number) {
    const relation = await this.prisma.slot_mechanics.findFirst({
      where: {
        slot_id: slotId,
        mechanic_id: mechanicId,
      },
    });

    if (!relation) {
      throw new NotFoundException('Mechanic is not associated with this slot');
    }

    try {
      await this.prisma.slot_mechanics.delete({
        where: {
          id: relation.id,
        },
      });

      return { message: 'Mechanic removed from slot successfully' };
    } catch (error) {
      throw new Error('Failed to remove mechanic from slot');
    }
  }
}