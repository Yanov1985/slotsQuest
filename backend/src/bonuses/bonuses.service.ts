import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBonusDto, UpdateBonusDto, BonusQueryDto } from './dto/bonus.dto';

@Injectable()
export class BonusesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: BonusQueryDto) {
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

    const [bonuses, total] = await Promise.all([
      this.prisma.bonuses.findMany({
        where,
        orderBy,
        take: Number(limit),
        skip: Number(offset),
        include: {
          _count: {
            select: {
              slot_bonuses: true,
            },
          },
        },
      }),
      this.prisma.bonuses.count({ where }),
    ]);

    const bonusesWithCount = bonuses.map((bonus) => ({
      ...bonus,
      slots_count: (bonus as any)._count.slot_bonuses,
      _count: undefined,
    }));

    return {
      data: bonusesWithCount,
      total,
      limit: Number(limit),
      offset: Number(offset),
    };
  }

  async findOne(id: number) {
    const bonus = await this.prisma.bonuses.findUnique({
      where: { id },
      include: {
        _count: { select: { slot_bonuses: true } },
      },
    });

    if (!bonus) {
      throw new NotFoundException(`Bonus with ID ${id} not found`);
    }

    return {
      ...bonus,
      slots_count: (bonus as any)._count.slot_bonuses,
      _count: undefined,
    };
  }

  async findPopular(limit: number = 10) {
    const bonuses = await this.prisma.bonuses.findMany({
      where: { is_active: true, is_popular: true },
      orderBy: { sort_order: 'asc' },
      take: limit,
      include: { _count: { select: { slot_bonuses: true } } },
    });

    return bonuses.map((b) => ({
      ...b,
      slots_count: (b as any)._count.slot_bonuses,
      _count: undefined,
    }));
  }

  async findFeatured(limit: number = 10) {
    const bonuses = await this.prisma.bonuses.findMany({
      where: { is_active: true, is_featured: true },
      orderBy: { sort_order: 'asc' },
      take: limit,
      include: { _count: { select: { slot_bonuses: true } } },
    });

    return bonuses.map((b) => ({
      ...b,
      slots_count: (b as any)._count.slot_bonuses,
      _count: undefined,
    }));
  }

  async findSlotsByBonus(bonusId: number) {
    const bonus = await this.prisma.bonuses.findUnique({ where: { id: bonusId } });
    if (!bonus) {
      throw new NotFoundException(`Bonus with ID ${bonusId} not found`);
    }

    const slotBonuses = await this.prisma.slot_bonuses.findMany({
      where: { bonus_id: bonusId },
      include: {
        slots: {
          include: { providers: true, slot_categories: true },
        },
      },
    });

    return slotBonuses.map((sb) => sb.slots);
  }

  async create(createBonusDto: CreateBonusDto) {
    const existing = await this.prisma.bonuses.findUnique({ where: { slug: createBonusDto.slug } });
    if (existing) {
      throw new Error(`Bonus with slug '${createBonusDto.slug}' already exists`);
    }

    return this.prisma.bonuses.create({
      data: createBonusDto,
      include: { _count: { select: { slot_bonuses: true } } },
    });
  }

  async update(id: number, updateBonusDto: UpdateBonusDto) {
    const bonus = await this.prisma.bonuses.findUnique({ where: { id } });
    if (!bonus) {
      throw new NotFoundException(`Bonus with ID ${id} not found`);
    }

    if (updateBonusDto.slug && updateBonusDto.slug !== bonus.slug) {
      const existing = await this.prisma.bonuses.findUnique({ where: { slug: updateBonusDto.slug } });
      if (existing) {
        throw new Error(`Bonus with slug '${updateBonusDto.slug}' already exists`);
      }
    }

    return this.prisma.bonuses.update({
      where: { id },
      data: updateBonusDto,
      include: { _count: { select: { slot_bonuses: true } } },
    });
  }

  async remove(id: number) {
    const bonus = await this.prisma.bonuses.findUnique({ where: { id } });
    if (!bonus) {
      throw new NotFoundException(`Bonus with ID ${id} not found`);
    }

    await this.prisma.slot_bonuses.deleteMany({ where: { bonus_id: id } });
    return this.prisma.bonuses.delete({ where: { id } });
  }

  async addBonusToSlot(slotId: string, bonusId: number) {
    const slot = await this.prisma.slots.findUnique({ where: { id: slotId } });
    if (!slot) {
      throw new NotFoundException(`Slot with ID ${slotId} not found`);
    }

    const bonus = await this.prisma.bonuses.findUnique({ where: { id: bonusId } });
    if (!bonus) {
      throw new NotFoundException(`Bonus with ID ${bonusId} not found`);
    }

    const existing = await this.prisma.slot_bonuses.findUnique({
      where: { slot_id_bonus_id: { slot_id: slotId, bonus_id: bonusId } },
    });
    if (existing) {
      throw new Error('Bonus is already assigned to this slot');
    }

    return this.prisma.slot_bonuses.create({
      data: { slot_id: slotId, bonus_id: bonusId },
      include: { slots: true, bonuses: true },
    });
  }

  async removeBonusFromSlot(slotId: string, bonusId: number) {
    const relation = await this.prisma.slot_bonuses.findUnique({
      where: { slot_id_bonus_id: { slot_id: slotId, bonus_id: bonusId } },
    });

    if (!relation) {
      throw new NotFoundException('Bonus is not assigned to this slot');
    }

    return this.prisma.slot_bonuses.delete({
      where: { slot_id_bonus_id: { slot_id: slotId, bonus_id: bonusId } },
    });
  }
}