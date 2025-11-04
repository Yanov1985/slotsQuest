import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThemeDto, UpdateThemeDto, ThemeQueryDto } from './dto/theme.dto';

@Injectable()
export class ThemesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ThemeQueryDto) {
    const { search, status, limit = 1000, offset = 0 } = query;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (status !== undefined) {
      where.is_active = status === 'active';
    }

    const [themes, total] = await Promise.all([
      this.prisma.themes.findMany({
        where,
        include: {
          _count: {
            select: {
              slots: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
        take: Number(limit),
        skip: Number(offset),
      }),
      this.prisma.themes.count({ where }),
    ]);

    return themes;
  }

  async findOne(id: string) {
    return this.prisma.themes.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            slots: true,
          },
        },
      },
    });
  }

  async findPopular() {
    return this.prisma.themes.findMany({
      where: {
        is_active: true,
      },
      include: {
        _count: {
          select: {
            slots: true,
          },
        },
      },
      orderBy: {
        slots: {
          _count: 'desc',
        },
      },
      take: 10,
    });
  }

  async findFeatured() {
    return this.prisma.themes.findMany({
      where: {
        is_active: true,
        is_featured: true,
      },
      include: {
        _count: {
          select: {
            slots: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
      take: 6,
    });
  }

  async findSlotsByTheme(themeId: string) {
    const theme = await this.prisma.themes.findUnique({
      where: { id: themeId },
      include: {
        slots: {
          where: {
            is_active: true,
          },
          include: {
            providers: true,
            slot_categories: true,
          },
          orderBy: { created_at: 'desc' },
        },
      },
    });

    return theme?.slots || [];
  }

  async create(createThemeDto: CreateThemeDto) {
    const { name, description, color, icon, is_featured } = createThemeDto;

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return this.prisma.themes.create({
      data: {
        name,
        slug,
        description,
        color,
        icon,
        is_featured: is_featured || false,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
  }

  async update(id: string, updateThemeDto: UpdateThemeDto) {
    const updateData: any = { ...updateThemeDto };

    // Update slug if name is changed
    if (updateThemeDto.name) {
      updateData.slug = updateThemeDto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    return this.prisma.themes.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.themes.delete({
      where: { id },
    });
  }
}
