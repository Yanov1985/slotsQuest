/**
 * 🎮 JSON-LD Controller - API эндпоинты для работы с JSON-LD схемами
 *
 * Контроллер - это как "ресепшен" в отеле.
 * Он принимает запросы от клиента (frontend) и направляет их
 * в нужный сервис для обработки, затем возвращает результат.
 *
 * API эндпоинты:
 * - GET  /api/jsonld/:slotId          - Получить JSON-LD для слота
 * - POST /api/jsonld/:slotId/validate - Валидация JSON-LD
 * - GET  /api/jsonld/:slotId/test     - Тест Google Rich Snippets
 * - PUT  /api/jsonld/:slotId/settings - Обновить настройки JSON-LD
 * - GET  /api/jsonld/:slotId/stats    - Статистика JSON-LD
 * - GET  /api/jsonld/summary          - Сводка по всем слотам
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JsonLdService } from './jsonld.service';
import { ValidateJsonLdDto, UpdateJsonLdSettingsDto } from './dto/jsonld.dto';

@Controller('api/jsonld')
export class JsonLdController {
  constructor(private readonly jsonLdService: JsonLdService) {}

  // ==========================================================================
  // 📥 ПОЛУЧЕНИЕ JSON-LD
  // ==========================================================================

  /**
   * 🎯 GET /api/jsonld/:slotId
   *
   * Получить полный JSON-LD для слота.
   * Возвращает все включённые схемы (Game, Review, FAQ и т.д.)
   *
   * Пример запроса:
   * GET /api/jsonld/cmeocg6gy0003u5doo0tcrpk4
   *
   * Пример ответа:
   * {
   *   "success": true,
   *   "slotId": "cmeocg6gy0003u5doo0tcrpk4",
   *   "slotName": "Gonzo's Quest",
   *   "schemas": {
   *     "game": { "@type": "Game", ... },
   *     "review": { "@type": "Review", ... },
   *     "combined": [...]
   *   },
   *   "meta": {
   *     "generatedAt": "2025-11-17T...",
   *     "enabledSchemas": ["Game", "Review", "Breadcrumb"],
   *     "totalSchemas": 3
   *   }
   * }
   */
  @Get(':slotId')
  async getJsonLd(@Param('slotId') slotId: string) {
    try {
      console.log(`📖 Запрос JSON-LD для слота: ${slotId}`);
      const result = await this.jsonLdService.generateJsonLd(slotId);
      console.log(`✅ JSON-LD сгенерирован. Схем: ${result.meta.totalSchemas}`);
      return result;
    } catch (error) {
      console.error('❌ Ошибка генерации JSON-LD:', error);
      throw new HttpException(
        {
          success: false,
          error: error.message || 'Ошибка генерации JSON-LD',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 🎯 GET /api/jsonld/:slotId/raw
   *
   * Получить "сырой" JSON-LD готовый для вставки в HTML.
   * Возвращает только массив схем без обёртки.
   *
   * Используется на фронтенде для вставки в <script type="application/ld+json">
   */
  @Get(':slotId/raw')
  async getRawJsonLd(@Param('slotId') slotId: string) {
    try {
      const result = await this.jsonLdService.generateJsonLd(slotId);

      if (!result.success || !result.schemas.combined) {
        return [];
      }

      // Возвращаем чистый массив схем
      return result.schemas.combined;
    } catch (error) {
      console.error('❌ Ошибка получения raw JSON-LD:', error);
      throw new HttpException(
        { error: error.message || 'Ошибка получения JSON-LD' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ==========================================================================
  // ✅ ВАЛИДАЦИЯ
  // ==========================================================================

  /**
   * 🔍 POST /api/jsonld/:slotId/validate
   *
   * Валидация JSON-LD схемы.
   * Проверяет соответствие стандартам schema.org.
   *
   * Пример запроса:
   * POST /api/jsonld/cmeocg6gy0003u5doo0tcrpk4/validate
   * Body: { "jsonld": "..." } // опционально, для проверки кастомной схемы
   *
   * Пример ответа:
   * {
   *   "isValid": true,
   *   "errors": [],
   *   "warnings": ["Review Schema: рекомендуется указать itemReviewed"],
   *   "suggestions": ["Добавьте FAQ для увеличения видимости"]
   * }
   */
  @Post(':slotId/validate')
  async validateJsonLd(
    @Param('slotId') slotId: string,
    @Body() body: ValidateJsonLdDto,
  ) {
    try {
      console.log(`🔍 Валидация JSON-LD для слота: ${slotId}`);
      const result = await this.jsonLdService.validateJsonLd(slotId, body.jsonld);

      console.log(`✅ Валидация завершена. Валидно: ${result.isValid}`);
      if (result.errors.length > 0) {
        console.log(`❌ Найдено ошибок: ${result.errors.length}`);
      }

      return result;
    } catch (error) {
      console.error('❌ Ошибка валидации:', error);
      throw new HttpException(
        {
          isValid: false,
          errors: [error.message || 'Ошибка валидации'],
          warnings: [],
          suggestions: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ==========================================================================
  // 🧪 ТЕСТИРОВАНИЕ
  // ==========================================================================

  /**
   * 🧪 GET /api/jsonld/:slotId/test
   *
   * Тест Google Rich Snippets.
   * Генерирует URL для проверки в Google Rich Results Test.
   *
   * Пример ответа:
   * {
   *   "success": true,
   *   "url": "https://search.google.com/test/rich-results?url=...",
   *   "detectedSchemas": ["Game", "Review", "FAQ"],
   *   "errors": [],
   *   "warnings": []
   * }
   */
  @Get(':slotId/test')
  async testRichSnippets(@Param('slotId') slotId: string) {
    try {
      console.log(`🧪 Тест Rich Snippets для слота: ${slotId}`);
      const result = await this.jsonLdService.testRichSnippets(slotId);
      console.log(`✅ Тест URL сгенерирован: ${result.url}`);
      return result;
    } catch (error) {
      console.error('❌ Ошибка теста Rich Snippets:', error);
      throw new HttpException(
        {
          success: false,
          error: error.message || 'Ошибка теста Rich Snippets',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ==========================================================================
  // ⚙️ НАСТРОЙКИ
  // ==========================================================================

  /**
   * ⚙️ PUT /api/jsonld/:slotId/settings
   *
   * Обновить настройки JSON-LD для слота.
   * Позволяет включить/выключить схемы, изменить данные и т.д.
   *
   * Пример запроса:
   * PUT /api/jsonld/cmeocg6gy0003u5doo0tcrpk4/settings
   * Body: {
   *   "jsonld_enabled": true,
   *   "jsonld_enable_faq": true,
   *   "jsonld_faq_json": "[{\"question\": \"...\", \"answer\": \"...\"}]"
   * }
   */
  @Put(':slotId/settings')
  async updateSettings(
    @Param('slotId') slotId: string,
    @Body() settings: UpdateJsonLdSettingsDto,
  ) {
    try {
      console.log(`⚙️ Обновление настроек JSON-LD для слота: ${slotId}`);
      console.log('📝 Настройки:', JSON.stringify(settings, null, 2));

      const result = await this.jsonLdService.updateJsonLdSettings(slotId, settings);

      console.log('✅ Настройки обновлены');
      return {
        success: true,
        message: 'Настройки JSON-LD успешно обновлены',
        slotId,
      };
    } catch (error) {
      console.error('❌ Ошибка обновления настроек:', error);
      throw new HttpException(
        {
          success: false,
          error: error.message || 'Ошибка обновления настроек',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ==========================================================================
  // 📊 СТАТИСТИКА
  // ==========================================================================

  /**
   * 📊 GET /api/jsonld/:slotId/stats
   *
   * Получить статистику JSON-LD для слота.
   * Показывает какие схемы включены, дату последней валидации и т.д.
   */
  @Get(':slotId/stats')
  async getStats(@Param('slotId') slotId: string) {
    try {
      console.log(`📊 Запрос статистики JSON-LD для слота: ${slotId}`);
      const stats = await this.jsonLdService.getJsonLdStats(slotId);
      return {
        success: true,
        stats,
      };
    } catch (error) {
      console.error('❌ Ошибка получения статистики:', error);
      throw new HttpException(
        {
          success: false,
          error: error.message || 'Ошибка получения статистики',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 📋 GET /api/jsonld/summary
   *
   * Получить сводку по JSON-LD для всех активных слотов.
   * Полезно для обзора состояния SEO всего сайта.
   */
  @Get('summary')
  async getSummary() {
    try {
      console.log('📋 Запрос сводки JSON-LD по всем слотам');
      const summary = await this.jsonLdService.getAllSlotsJsonLdSummary();

      return {
        success: true,
        totalSlots: summary.length,
        enabledSlots: summary.filter(s => s.enabled).length,
        summary,
      };
    } catch (error) {
      console.error('❌ Ошибка получения сводки:', error);
      throw new HttpException(
        {
          success: false,
          error: error.message || 'Ошибка получения сводки',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ==========================================================================
  // 📊 АНАЛИТИКА (ЭТАП 5)
  // ==========================================================================

  /**
   * 📊 GET /api/jsonld/analytics
   *
   * Получить расширенную аналитику JSON-LD.
   * Включает статистику, распределение схем, ошибки.
   */
  @Get('analytics')
  async getAnalytics() {
    try {
      console.log('📊 Запрос аналитики JSON-LD');
      const analytics = await this.jsonLdService.getAnalyticsSummary();

      return {
        success: true,
        ...analytics,
      };
    } catch (error) {
      console.error('❌ Ошибка получения аналитики:', error);
      throw new HttpException(
        {
          success: false,
          error: error.message || 'Ошибка получения аналитики',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * ❌ GET /api/jsonld/errors
   *
   * Получить список слотов с ошибками валидации JSON-LD.
   */
  @Get('errors')
  async getSlotsWithErrors() {
    try {
      console.log('❌ Запрос слотов с ошибками JSON-LD');
      const slots = await this.jsonLdService.getSlotsWithErrors();

      return {
        success: true,
        count: slots.length,
        slots,
      };
    } catch (error) {
      console.error('❌ Ошибка получения списка ошибок:', error);
      throw new HttpException(
        {
          success: false,
          error: error.message || 'Ошибка получения списка ошибок',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 🔍 GET /api/jsonld/needs-validation
   *
   * Получить список слотов требующих валидации.
   */
  @Get('needs-validation')
  async getSlotsNeedingValidation() {
    try {
      console.log('🔍 Запрос слотов требующих валидации');
      const slots = await this.jsonLdService.getSlotsNeedingValidation();

      return {
        success: true,
        count: slots.length,
        slots,
      };
    } catch (error) {
      console.error('❌ Ошибка получения списка:', error);
      throw new HttpException(
        {
          success: false,
          error: error.message || 'Ошибка получения списка',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 🔄 POST /api/jsonld/validate-all
   *
   * Массовая валидация всех слотов с JSON-LD.
   * ⚠️ Может занять много времени если слотов много!
   */
  @Post('validate-all')
  async validateAllSlots() {
    try {
      console.log('🔄 Запуск массовой валидации JSON-LD');
      const result = await this.jsonLdService.validateAllSlots();

      console.log(`✅ Валидация завершена: ${result.passed}/${result.total} прошли`);

      return {
        success: true,
        message: `Валидация завершена: ${result.passed} из ${result.total} слотов прошли проверку`,
        ...result,
      };
    } catch (error) {
      console.error('❌ Ошибка массовой валидации:', error);
      throw new HttpException(
        {
          success: false,
          error: error.message || 'Ошибка массовой валидации',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 📊 GET /api/jsonld/schema-stats/:schemaType
   *
   * Получить статистику по конкретному типу схемы.
   * Доступные типы: game, product, review, faq, howto, breadcrumb, video
   */
  @Get('schema-stats/:schemaType')
  async getSchemaStats(@Param('schemaType') schemaType: string) {
    try {
      console.log(`📊 Запрос статистики схемы: ${schemaType}`);
      const stats = await this.jsonLdService.getSchemaStats(schemaType);

      return {
        success: true,
        ...stats,
      };
    } catch (error) {
      console.error('❌ Ошибка получения статистики схемы:', error);
      throw new HttpException(
        {
          success: false,
          error: error.message || 'Ошибка получения статистики схемы',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ==========================================================================
  // 🔧 ОТДЕЛЬНЫЕ СХЕМЫ
  // ==========================================================================

  /**
   * 🎮 GET /api/jsonld/:slotId/game
   *
   * Получить только Game Schema для слота.
   */
  @Get(':slotId/game')
  async getGameSchema(@Param('slotId') slotId: string) {
    try {
      const result = await this.jsonLdService.generateJsonLd(slotId);
      return {
        success: true,
        schema: result.schemas.game,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * ⭐ GET /api/jsonld/:slotId/review
   *
   * Получить только Review Schema для слота.
   */
  @Get(':slotId/review')
  async getReviewSchema(@Param('slotId') slotId: string) {
    try {
      const result = await this.jsonLdService.generateJsonLd(slotId);
      return {
        success: true,
        schema: result.schemas.review,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * ❓ GET /api/jsonld/:slotId/faq
   *
   * Получить только FAQ Schema для слота.
   */
  @Get(':slotId/faq')
  async getFaqSchema(@Param('slotId') slotId: string) {
    try {
      const result = await this.jsonLdService.generateJsonLd(slotId);
      return {
        success: true,
        schema: result.schemas.faq || null,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 📋 GET /api/jsonld/:slotId/howto
   *
   * Получить только HowTo Schema для слота.
   */
  @Get(':slotId/howto')
  async getHowToSchema(@Param('slotId') slotId: string) {
    try {
      const result = await this.jsonLdService.generateJsonLd(slotId);
      return {
        success: true,
        schema: result.schemas.howTo || null,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 🍞 GET /api/jsonld/:slotId/breadcrumb
   *
   * Получить только Breadcrumb Schema для слота.
   */
  @Get(':slotId/breadcrumb')
  async getBreadcrumbSchema(@Param('slotId') slotId: string) {
    try {
      const result = await this.jsonLdService.generateJsonLd(slotId);
      return {
        success: true,
        schema: result.schemas.breadcrumb,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 🎬 GET /api/jsonld/:slotId/video
   *
   * Получить только Video Schema для слота.
   */
  @Get(':slotId/video')
  async getVideoSchema(@Param('slotId') slotId: string) {
    try {
      const result = await this.jsonLdService.generateJsonLd(slotId);
      return {
        success: true,
        schema: result.schemas.video || null,
      };
    } catch (error) {
      throw new HttpException(
        { success: false, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
