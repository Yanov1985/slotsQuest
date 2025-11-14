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
          slotThemes: {
            include: {
              themes: true,
            },
          },
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
          slotThemes: {
            include: {
              themes: true,
            },
          },
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
          slotThemes: {
            include: {
              themes: true,
            },
          },
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
          slotThemes: {
            include: {
              themes: true,
            },
          },
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
          slotThemes: {
            include: {
              themes: true,
            },
          },
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
          slotThemes: {
            include: {
              themes: true,
            },
          },
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

      // 🎯 ШАГ 1: Создаём слот без связей
      const slot = await this.prisma.slots.create({
        data: createData,
      });

      console.log('✅ Слот создан, ID:', slot.id);

      // 🎯 ШАГ 2: Создаём связи с механиками
      if (selected_mechanics && Array.isArray(selected_mechanics) && selected_mechanics.length > 0) {
        console.log('🔗 Создание связей с механиками:', selected_mechanics);
        await this.prisma.slot_mechanics.createMany({
          data: selected_mechanics.map((mechanic_id: number) => ({
            slot_id: slot.id,
            mechanic_id,
          })),
        });
        console.log('✅ Механики привязаны:', selected_mechanics.length);
      }

      // 🎯 ШАГ 3: Создаём связи с бонусами
      if (selected_bonuses && Array.isArray(selected_bonuses) && selected_bonuses.length > 0) {
        console.log('🔗 Создание связей с бонусами:', selected_bonuses);
        await this.prisma.slot_bonuses.createMany({
          data: selected_bonuses.map((bonus_id: number) => ({
            slot_id: slot.id,
            bonus_id,
          })),
        });
        console.log('✅ Бонусы привязаны:', selected_bonuses.length);
      }

      // 🎯 ШАГ 4: Создаём связи с тематиками (до 5)
      if (selected_themes && Array.isArray(selected_themes) && selected_themes.length > 0) {
        const themesToAdd = selected_themes.slice(0, 5); // Ограничиваем до 5
        console.log('🔗 Создание связей с тематиками:', themesToAdd);
        await this.prisma.slot_themes.createMany({
          data: themesToAdd.map((theme_id: string) => ({
            slot_id: slot.id,
            theme_id,
          })),
        });
        console.log('✅ Тематики привязаны:', themesToAdd.length);
      }

      // 🎯 ШАГ 5: Загружаем созданный слот со всеми связями
      const createdSlot = await this.prisma.slots.findUnique({
        where: { id: slot.id },
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
          slotThemes: {
            include: {
              themes: true,
            },
          },
        },
      });

      if (!createdSlot) {
        throw new Error('Не удалось загрузить созданный слот');
      }

      console.log('🎉 Слот создан со всеми связями:', {
        id: createdSlot.id,
        mechanics_count: createdSlot.slot_mechanics?.length || 0,
        bonuses_count: createdSlot.slot_bonuses?.length || 0,
        themes_count: createdSlot.slotThemes?.length || 0,
      });

      return createdSlot;
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
      // 🎯 ШАГ 1: Обновляем основные данные слота
      await this.prisma.slots.update({
        where: { id },
        data: updateData,
      });

      console.log('✅ Основные данные слота обновлены');

      // 🎯 ШАГ 2: Обновляем связи с механиками
      if (selected_mechanics !== undefined) {
        console.log('🔄 Обновление механик...');
        // Удаляем старые связи
        await this.prisma.slot_mechanics.deleteMany({
          where: { slot_id: id },
        });
        // Создаём новые связи
        if (Array.isArray(selected_mechanics) && selected_mechanics.length > 0) {
          await this.prisma.slot_mechanics.createMany({
            data: selected_mechanics.map((mechanic_id: number) => ({
              slot_id: id,
              mechanic_id,
            })),
          });
          console.log('✅ Механики обновлены:', selected_mechanics.length);
        }
      }

      // 🎯 ШАГ 3: Обновляем связи с бонусами
      if (selected_bonuses !== undefined) {
        console.log('🔄 Обновление бонусов...');
        // Удаляем старые связи
        await this.prisma.slot_bonuses.deleteMany({
          where: { slot_id: id },
        });
        // Создаём новые связи
        if (Array.isArray(selected_bonuses) && selected_bonuses.length > 0) {
          await this.prisma.slot_bonuses.createMany({
            data: selected_bonuses.map((bonus_id: number) => ({
              slot_id: id,
              bonus_id,
            })),
          });
          console.log('✅ Бонусы обновлены:', selected_bonuses.length);
        }
      }

      // 🎯 ШАГ 4: Обновляем связи с тематиками (до 5)
      if (selected_themes !== undefined) {
        console.log('🔄 Обновление тематик...');
        // Удаляем старые связи
        await this.prisma.slot_themes.deleteMany({
          where: { slot_id: id },
        });
        // Создаём новые связи
        if (Array.isArray(selected_themes) && selected_themes.length > 0) {
          const themesToAdd = selected_themes.slice(0, 5); // Ограничиваем до 5
          await this.prisma.slot_themes.createMany({
            data: themesToAdd.map((theme_id: string) => ({
              slot_id: id,
              theme_id,
            })),
          });
          console.log('✅ Тематики обновлены:', themesToAdd.length);
        }
      }

      // 🎯 ШАГ 5: Загружаем обновлённый слот со всеми связями
      const updatedSlot = await this.prisma.slots.findUnique({
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
          slotThemes: {
            include: {
              themes: true,
            },
          },
        },
      });

      if (!updatedSlot) {
        throw new Error('Не удалось загрузить обновлённый слот');
      }

      console.log('🎉 Слот обновлён со всеми связями:', {
        id: updatedSlot.id,
        name: updatedSlot.name,
        mechanics_count: updatedSlot.slot_mechanics?.length || 0,
        bonuses_count: updatedSlot.slot_bonuses?.length || 0,
        themes_count: updatedSlot.slotThemes?.length || 0,
      });

      return updatedSlot;

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
          slotThemes: {
            include: {
              themes: true,
            },
          },
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
          slotThemes: {
            include: {
              themes: true,
            },
          },
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
