import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';

interface SlotFilters {
  provider?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

@Injectable()
export class SlotsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSlots(filters: SlotFilters = {}) {
    try {
      const { provider, category, limit, offset } = filters;

      return await this.prisma.slots.findMany({
        where: {
          is_active: true,
          ...(provider && {
            providers: {
              slug: provider
            }
          }),
          ...(category && {
            slot_categories: {
              slug: category
            }
          })
        },
        include: {
          providers: true,
          slot_categories: true,
          slot_mechanics: {
            include: {
              mechanics: true,
            },
          },
          slot_bonuses: {
            include: {
              bonuses: true,
            },
          },
          themes: true,
        },
        orderBy: {
          created_at: 'desc',
        },
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });
    } catch (error) {
      console.error('❌ Ошибка при получении списка слотов:', error);
      throw error;
    }
  }

  async getFeaturedSlots() {
    try {
      return await this.prisma.slots.findMany({
        where: {
          is_active: true,
          rating: {
            gte: 4.5
          }
        },
        include: {
          providers: true,
          slot_categories: true,
          slot_mechanics: {
            include: {
              mechanics: true,
            },
          },
          slot_bonuses: {
            include: {
              bonuses: true,
            },
          },
          themes: true,
        },
        orderBy: {
          rating: 'desc',
        },
        take: 12,
      });
    } catch (error) {
      console.error('❌ Ошибка при получении featured слотов:', error);
      throw error;
    }
  }

  async getPopularSlots() {
    try {
      return await this.prisma.slots.findMany({
        where: {
          is_active: true,
        },
        include: {
          providers: true,
          slot_categories: true,
          slot_mechanics: {
            include: {
              mechanics: true,
            },
          },
          slot_bonuses: {
            include: {
              bonuses: true,
            },
          },
          themes: true,
        },
        orderBy: {
          play_count: 'desc',
        },
        take: 12,
      });
    } catch (error) {
      console.error('❌ Ошибка при получении популярных слотов:', error);
      throw error;
    }
  }

  async searchSlots(query: string) {
    try {
      return await this.prisma.slots.findMany({
        where: {
          is_active: true,
          OR: [
            { name: { contains: query } },
            { description: { contains: query } },
            { providers: { name: { contains: query } } },
          ],
        },
        include: {
          providers: true,
          slot_categories: true,
          slot_mechanics: {
            include: {
              mechanics: true,
            },
          },
          slot_bonuses: {
            include: {
              bonuses: true,
            },
          },
          themes: true,
        },
      });
    } catch (error) {
      console.error('❌ Ошибка при поиске слотов:', error);
      throw error;
    }
  }

  async getSlotBySlug(slug: string) {
    try {
      return await this.prisma.slots.findUnique({
        where: { slug },
        include: {
          providers: true,
          slot_categories: true,
          slot_mechanics: {
            include: {
              mechanics: true,
            },
          },
          slot_bonuses: {
            include: {
              bonuses: true,
            },
          },
          themes: true,
        },
      });
    } catch (error) {
      console.error('❌ Ошибка при получении слота по slug:', error);
      throw error;
    }
  }

  async getSlotById(id: string) {
    try {
      return await this.prisma.slots.findUnique({
        where: { id },
        include: {
          providers: true,
          slot_categories: true,
          slot_mechanics: {
            include: {
              mechanics: true,
            },
          },
          slot_bonuses: {
            include: {
              bonuses: true,
            },
          },
          themes: true,
        },
      });
    } catch (error) {
      console.error('❌ Ошибка при получении слота по ID:', error);
      throw error;
    }
  }

  async createSlot(createSlotDto: CreateSlotDto) {
    try {
      const {
        provider_id,
        selected_mechanics,
        selected_bonuses,
        selected_themes,
        hero_keyword,
        hero_keyword_2,
        hero_keyword_3,
        ...restDto
      } = createSlotDto;

      // Подготавливаем данные для создания
      const createData: any = {
        ...restDto,
        provider_id,
      };

      // Добавляем hero_keyword поля только если они предоставлены
      if (hero_keyword !== undefined) {
        createData.hero_keyword = hero_keyword;
      }
      if (hero_keyword_2 !== undefined) {
        createData.hero_keyword_2 = hero_keyword_2;
      }
      if (hero_keyword_3 !== undefined) {
        createData.hero_keyword_3 = hero_keyword_3;
      }

      console.log('📝 Данные для создания:', JSON.stringify(createData, null, 2));

      const slot = await this.prisma.slots.create({
        data: createData,
        include: {
          providers: true,
          slot_categories: true,
          slot_mechanics: true,
          slot_bonuses: true,
          themes: true,
        },
      });

      return slot;
    } catch (error) {
      console.error('❌ Ошибка при создании слота:', error);
      throw error;
    }
  }

  async updateSlot(id: string, updateSlotDto: UpdateSlotDto) {
    console.log('\n🔄 Начало обновления слота в сервисе');
    console.log('📝 ID слота:', id);
    console.log('📦 DTO данные:', JSON.stringify(updateSlotDto, null, 2));

    const {
      provider_id,
      selected_mechanics,
      selected_bonuses,
      selected_themes,
      hero_keyword,
      hero_keyword_2,
      hero_keyword_3,
      ...restDto
    } = updateSlotDto;

    // Подготавливаем данные для обновления
    const updateData: any = {
      ...restDto,
      updated_at: new Date(),
    };

    // Добавляем hero_keyword поля только если они предоставлены
    if (hero_keyword !== undefined) {
      updateData.hero_keyword = hero_keyword;
    }
    if (hero_keyword_2 !== undefined) {
      updateData.hero_keyword_2 = hero_keyword_2;
    }
    if (hero_keyword_3 !== undefined) {
      updateData.hero_keyword_3 = hero_keyword_3;
    };

    if (provider_id) {
      updateData.provider_id = provider_id;
    }

    if (updateSlotDto.release_date) {
      updateData.release_date = new Date(updateSlotDto.release_date);
    }

    console.log('📝 Данные для обновления:', JSON.stringify(updateData, null, 2));

    try {
      const slot = await this.prisma.slots.update({
        where: { id },
        data: updateData,
        include: {
          providers: true,
          slot_categories: true,
          slot_mechanics: {
            include: {
              mechanics: true,
            },
          },
          slot_bonuses: {
            include: {
              bonuses: true,
            },
          },
          themes: true,
        },
      });

      console.log('✅ Слот обновлен:', {
        id: slot.id,
        name: slot.name,
      });

      return slot;

    } catch (error) {
      console.error('❌ Ошибка при обновлении:', error);
      throw error;
    }
  }

  async deleteSlot(id: string) {
    try {
      const result = await this.prisma.slots.delete({
        where: { id },
        include: {
          providers: true,
          slot_categories: true,
          slot_mechanics: true,
          slot_bonuses: true,
          themes: true,
        },
      });
      return { success: true, data: result };
    } catch (error) {
      console.error('❌ Ошибка при удалении слота:', error);
      throw error;
    }
  }

  async getAllSlotsForAdmin() {
    try {
      return await this.prisma.slots.findMany({
        include: {
          providers: true,
          slot_categories: true,
          slot_mechanics: {
            include: {
              mechanics: true,
            },
          },
          slot_bonuses: {
            include: {
              bonuses: true,
            },
          },
          themes: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      });
    } catch (error) {
      console.error('❌ Ошибка при получении списка слотов для админки:', error);
      throw error;
    }
  }

  // Методы для рейтингов и отзывов
  async getSlotRating(slug: string) {
    try {
      const slot = await this.prisma.slots.findUnique({
        where: { slug },
        select: { rating: true, rating_count: true },
      });
      return slot;
    } catch (error) {
      console.error('❌ Ошибка при получении рейтинга:', error);
      throw error;
    }
  }

  async addSlotRating(slug: string, ratingData: any) {
    try {
      const slot = await this.prisma.slots.findUnique({
        where: { slug },
        select: { id: true, rating: true, rating_count: true },
      });

      if (!slot) {
        throw new Error('Слот не найден');
      }

      const currentRating = Number(slot.rating) || 0;
      const currentCount = slot.rating_count || 0;
      const newRating = Number(ratingData.rating);

      // Вычисляем новый средний рейтинг
      const updatedRating =
        ((currentRating * currentCount) + newRating) / (currentCount + 1);

      // Обновляем слот
      const updatedSlot = await this.prisma.slots.update({
        where: { slug },
        data: {
          rating: updatedRating,
          rating_count: { increment: 1 },
        },
      });

      return updatedSlot;
    } catch (error) {
      console.error('❌ Ошибка при добавлении рейтинга:', error);
      throw error;
    }
  }

  async getSlotReviews(slug: string) {
    try {
      const slot = await this.prisma.slots.findUnique({
        where: { slug },
        select: { id: true },
      });

      if (!slot) {
        throw new Error('Слот не найден');
      }

      // Здесь будет логика получения отзывов, когда добавим таблицу отзывов
      return [];
    } catch (error) {
      console.error('❌ Ошибка при получении отзывов:', error);
      throw error;
    }
  }

  async createSlotReview(slug: string, reviewData: any) {
    try {
      const slot = await this.prisma.slots.findUnique({
        where: { slug },
        select: { id: true },
      });

      if (!slot) {
        throw new Error('Слот не найден');
      }

      // Здесь будет логика создания отзыва, когда добавим таблицу отзывов
      return { success: true };
    } catch (error) {
      console.error('❌ Ошибка при создании отзыва:', error);
      throw error;
    }
  }
}
