import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThemeDto, UpdateThemeDto, ThemeQueryDto } from './dto/theme.dto';

@Injectable()
export class ThemesService {
  constructor(private prisma: PrismaService) { }

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
              slotThemes: true, // Используем новую связь many-to-many
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
            slotThemes: true, // Используем новую связь many-to-many
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
            slotThemes: true, // Используем новую связь many-to-many
          },
        },
      },
      orderBy: {
        slotThemes: { // Сортируем по количеству связей
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
            slotThemes: true, // Используем новую связь many-to-many
          },
        },
      },
      orderBy: { created_at: 'desc' },
      take: 6,
    });
  }

  async findSlotsByTheme(themeId: string) {
    // Используем новую many-to-many связь через slot_themes
    const slotThemes = await this.prisma.slot_themes.findMany({
      where: {
        theme_id: themeId,
        slots: {
          is_active: true,
        },
      },
      include: {
        slots: {
          include: {
            providers: true,
            slot_categories: true,
          },
        },
      },
      orderBy: {
        slots: {
          created_at: 'desc',
        },
      },
    });

    // Возвращаем массив слотов из связей
    return slotThemes.map(st => st.slots);
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
    // Фильтруем только допустимые поля для обновления
    const allowedFields = [
      'name', 'slug', 'description', 'color', 'icon',
      'image_url', 'sort_order', 'is_active', 'is_featured', 'is_popular'
    ];

    const updateData: any = {};
    for (const field of allowedFields) {
      if (updateThemeDto[field] !== undefined) {
        updateData[field] = updateThemeDto[field];
      }
    }

    // Update slug if name is changed and slug is not provided
    if (updateThemeDto.name && !updateThemeDto.slug) {
      updateData.slug = updateThemeDto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    updateData.updated_at = new Date();

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
