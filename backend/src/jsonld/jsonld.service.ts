/**
 * 🎯 JSON-LD Service - Сервис генерации структурированных данных
 *
 * Этот сервис - как "переводчик" для поисковых систем.
 * Он берёт данные о слоте из базы и превращает их в JSON-LD схемы,
 * которые Google, Яндекс и другие поисковики понимают и используют
 * для показа Rich Snippets (звёздочки, FAQ, видео и т.д.)
 *
 * Метафора: Представь, что слот - это товар в магазине.
 * JSON-LD - это этикетка с штрих-кодом, которую сканер на кассе
 * моментально считывает и понимает: цена, название, производитель.
 * Без этикетки кассир должен искать товар в каталоге вручную.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  ValidationResult,
  JsonLdResponse,
  FaqItem,
  HowToStep,
  RichSnippetTestResult,
  UpdateJsonLdSettingsDto,
} from './dto/jsonld.dto';

// ============================================================================
// 📦 ИНТЕРФЕЙСЫ ДЛЯ JSON-LD СХЕМ
// ============================================================================

/**
 * 🎮 Game Schema - Схема игры по стандарту schema.org/Game
 *
 * Это основная схема для слотов. Когда Google видит эту схему,
 * он понимает: "Ага, это игра! Могу показать её в карточке игр."
 */
interface GameSchema {
  '@context': 'https://schema.org';
  '@type': 'Game' | 'VideoGame' | 'WebApplication';
  name: string;                     // Название игры
  description?: string;             // Описание
  url: string;                      // URL страницы
  image?: string;                   // Изображение
  author?: {                        // Разработчик
    '@type': 'Organization';
    name: string;
  };
  genre?: string;                   // Жанр (Casino, Arcade...)
  gamePlatform?: string;            // Платформы (Web, Mobile...)
  contentRating?: string;           // Возрастной рейтинг
  isFree?: boolean;                 // Бесплатная ли игра
  aggregateRating?: {               // Агрегированный рейтинг
    '@type': 'AggregateRating';
    ratingValue: number;
    ratingCount: number;
    bestRating: number;
    worstRating: number;
  };
  offers?: {                        // Предложение (для Product)
    '@type': 'Offer';
    price: number;
    priceCurrency: string;
    availability: string;
    itemCondition: string;
  };
}

/**
 * ⭐ Review Schema - Экспертный обзор
 *
 * Позволяет показывать звёзды рейтинга прямо в поисковой выдаче!
 * Это очень важно для CTR (кликабельности).
 */
interface ReviewSchema {
  '@context': 'https://schema.org';
  '@type': 'Review';
  itemReviewed: {
    '@type': 'Game';
    name: string;
  };
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating: number;
    worstRating: number;
  };
  author: {
    '@type': 'Organization' | 'Person';
    name: string;
  };
  datePublished: string;
  reviewBody?: string;
}

/**
 * ❓ FAQ Schema - Часто задаваемые вопросы
 *
 * Google показывает FAQ прямо в выдаче в виде аккордеона.
 * Это увеличивает видимость страницы и занимает больше места в SERP.
 */
interface FaqSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

/**
 * 📋 HowTo Schema - Пошаговая инструкция
 *
 * Google показывает инструкцию как список шагов.
 * Отлично подходит для "Как играть в слот" разделов.
 */
interface HowToSchema {
  '@context': 'https://schema.org';
  '@type': 'HowTo';
  name: string;
  description?: string;
  step: Array<{
    '@type': 'HowToStep';
    position: number;
    name: string;
    text: string;
  }>;
}

/**
 * 🍞 BreadcrumbList Schema - Хлебные крошки
 *
 * Показывает путь к странице в поисковой выдаче:
 * Главная > Слоты > NetEnt > Gonzo's Quest
 */
interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

/**
 * 🎬 VideoObject Schema - Видео-обзор
 *
 * Позволяет показывать превью видео прямо в поисковой выдаче.
 * Очень привлекает внимание пользователей!
 */
interface VideoSchema {
  '@context': 'https://schema.org';
  '@type': 'VideoObject';
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}

// ============================================================================
// 🛠️ СЕРВИС JSON-LD
// ============================================================================

@Injectable()
export class JsonLdService {
  // 🌐 Базовый URL сайта (используется для генерации абсолютных URL)
  private readonly baseUrl = 'https://slotquest.com';

  constructor(private readonly prisma: PrismaService) { }

  // ==========================================================================
  // 📥 ОСНОВНЫЕ МЕТОДЫ API
  // ==========================================================================

  /**
   * 🎯 Получить полный JSON-LD для слота
   *
   * Это главный метод - собирает все включённые схемы в один объект.
   * Как конструктор LEGO: берёт нужные детали и собирает их вместе.
   *
   * @param slotId - ID слота в базе данных
   * @returns JsonLdResponse с всеми сгенерированными схемами
   */
  async generateJsonLd(slotId: string): Promise<JsonLdResponse> {
    // 📖 Шаг 1: Получаем данные слота из базы
    const slot = await this.getSlotWithRelations(slotId);

    if (!slot) {
      throw new NotFoundException(`Слот с ID ${slotId} не найден`);
    }

    // 🚫 Шаг 2: Проверяем, включён ли JSON-LD для этого слота
    if (!slot.jsonld_enabled) {
      return {
        success: false,
        slotId: slot.id,
        slotName: slot.name,
        schemas: {},
        meta: {
          generatedAt: new Date().toISOString(),
          enabledSchemas: [],
          totalSchemas: 0,
        },
      };
    }

    // 🔧 Шаг 3: Если есть кастомная схема и включён override - возвращаем её
    if (slot.jsonld_override_auto && slot.jsonld_custom) {
      try {
        const customSchema = JSON.parse(slot.jsonld_custom);
        return {
          success: true,
          slotId: slot.id,
          slotName: slot.name,
          schemas: {
            combined: Array.isArray(customSchema) ? customSchema : [customSchema],
          },
          meta: {
            generatedAt: new Date().toISOString(),
            enabledSchemas: ['custom'],
            totalSchemas: 1,
          },
        };
      } catch (e) {
        console.error('❌ Ошибка парсинга кастомной JSON-LD схемы:', e);
      }
    }

    // 🏗️ Шаг 4: Собираем все включённые схемы
    const schemas: JsonLdResponse['schemas'] = {};
    const enabledSchemas: string[] = [];

    // 🎮 Основная Game Schema (всегда генерируется)
    schemas.game = this.generateGameSchema(slot);
    enabledSchemas.push('Game');

    // 🛒 Product Schema (если включена)
    if (slot.jsonld_enable_product) {
      schemas.product = this.generateProductSchema(slot);
      enabledSchemas.push('Product');
    }

    // ⭐ Review Schema (если включена)
    if (slot.jsonld_enable_review) {
      schemas.review = this.generateReviewSchema(slot);
      enabledSchemas.push('Review');
    }

    // ❓ FAQ Schema (если включена и есть данные)
    if (slot.jsonld_enable_faq && slot.jsonld_faq_json) {
      const faqSchema = this.generateFaqSchema(slot);
      if (faqSchema) {
        schemas.faq = faqSchema;
        enabledSchemas.push('FAQ');
      }
    }

    // 📋 HowTo Schema (если включена и есть данные)
    if (slot.jsonld_enable_howto && slot.jsonld_howto_json) {
      const howToSchema = this.generateHowToSchema(slot);
      if (howToSchema) {
        schemas.howTo = howToSchema;
        enabledSchemas.push('HowTo');
      }
    }

    // 🍞 Breadcrumb Schema (если включена)
    if (slot.jsonld_enable_breadcrumb) {
      schemas.breadcrumb = this.generateBreadcrumbSchema(slot);
      enabledSchemas.push('Breadcrumb');
    }

    // 🎬 Video Schema (если включена и есть данные)
    if (slot.jsonld_enable_video && slot.jsonld_video_url) {
      schemas.video = this.generateVideoSchema(slot);
      enabledSchemas.push('Video');
    }

    // 📦 Шаг 5: Собираем все схемы в один массив для <script type="application/ld+json">
    schemas.combined = Object.values(schemas).filter(s => s && s !== schemas.combined);

    return {
      success: true,
      slotId: slot.id,
      slotName: slot.name,
      schemas,
      meta: {
        generatedAt: new Date().toISOString(),
        enabledSchemas,
        totalSchemas: enabledSchemas.length,
      },
    };
  }

  /**
   * ✅ Валидация JSON-LD схемы
   *
   * Проверяет, соответствует ли схема стандартам schema.org.
   * Как проверка орфографии - находит ошибки до публикации.
   *
   * @param slotId - ID слота
   * @param customJsonLd - Кастомный JSON-LD для проверки (опционально)
   */
  async validateJsonLd(slotId: string, customJsonLd?: string): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];

    let schemaToValidate: object;

    // 📝 Если передан кастомный JSON-LD - валидируем его
    if (customJsonLd) {
      try {
        schemaToValidate = JSON.parse(customJsonLd);
      } catch (e) {
        return {
          isValid: false,
          errors: ['Невалидный JSON формат. Проверьте синтаксис.'],
          warnings: [],
          suggestions: ['Используйте JSON валидатор для проверки синтаксиса'],
        };
      }
    } else {
      // 🔧 Иначе генерируем и валидируем автоматическую схему
      const response = await this.generateJsonLd(slotId);
      if (!response.success || !response.schemas.combined) {
        return {
          isValid: false,
          errors: ['Не удалось сгенерировать JSON-LD схему'],
          warnings: [],
          suggestions: ['Проверьте, что JSON-LD включён для этого слота'],
        };
      }
      schemaToValidate = response.schemas.combined;
    }

    // 🔍 Валидация структуры
    const schemas = Array.isArray(schemaToValidate) ? schemaToValidate : [schemaToValidate];

    for (const schema of schemas) {
      // Проверка @context
      if (!schema['@context']) {
        errors.push('Отсутствует @context. Добавьте "@context": "https://schema.org"');
      } else if (schema['@context'] !== 'https://schema.org') {
        warnings.push(`Нестандартный @context: ${schema['@context']}`);
      }

      // Проверка @type
      if (!schema['@type']) {
        errors.push('Отсутствует @type. Укажите тип схемы (Game, Review, FAQPage и т.д.)');
      }

      // Специфичные проверки по типу схемы
      const type = schema['@type'];

      if (type === 'Game' || type === 'VideoGame') {
        if (!schema['name']) {
          errors.push('Game Schema: отсутствует обязательное поле "name"');
        }
        if (!schema['description']) {
          suggestions.push('Game Schema: рекомендуется добавить "description" для лучшего SEO');
        }
        if (!schema['image']) {
          suggestions.push('Game Schema: рекомендуется добавить "image" для визуального превью');
        }
        if (!schema['aggregateRating']) {
          suggestions.push('Game Schema: добавьте "aggregateRating" для показа звёзд в поиске');
        }
      }

      if (type === 'Review') {
        if (!schema['reviewRating']) {
          errors.push('Review Schema: отсутствует обязательное поле "reviewRating"');
        }
        if (!schema['author']) {
          errors.push('Review Schema: отсутствует обязательное поле "author"');
        }
        if (!schema['itemReviewed']) {
          warnings.push('Review Schema: рекомендуется указать "itemReviewed"');
        }
      }

      if (type === 'FAQPage') {
        if (!schema['mainEntity'] || !Array.isArray(schema['mainEntity'])) {
          errors.push('FAQPage Schema: отсутствует массив "mainEntity" с вопросами');
        } else if (schema['mainEntity'].length === 0) {
          warnings.push('FAQPage Schema: массив вопросов пуст');
        } else if (schema['mainEntity'].length < 3) {
          suggestions.push('FAQPage Schema: рекомендуется минимум 3 вопроса для лучшей видимости');
        }
      }

      if (type === 'HowTo') {
        if (!schema['step'] || !Array.isArray(schema['step'])) {
          errors.push('HowTo Schema: отсутствует массив "step" с шагами');
        } else if (schema['step'].length === 0) {
          warnings.push('HowTo Schema: массив шагов пуст');
        }
      }

      if (type === 'VideoObject') {
        if (!schema['name']) {
          errors.push('VideoObject Schema: отсутствует обязательное поле "name"');
        }
        if (!schema['thumbnailUrl']) {
          errors.push('VideoObject Schema: отсутствует обязательное поле "thumbnailUrl"');
        }
        if (!schema['uploadDate']) {
          errors.push('VideoObject Schema: отсутствует обязательное поле "uploadDate"');
        }
      }
    }

    // 📊 Общие рекомендации
    if (schemas.length === 1) {
      suggestions.push('Рекомендуется использовать несколько схем (Game + Review + FAQ) для максимального охвата');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      schema: schemaToValidate,
    };
  }

  /**
   * 🧪 Тест Rich Snippets для Google
   *
   * Генерирует URL для тестирования в Google Rich Results Test.
   * Пользователь может открыть этот URL и проверить, как схема выглядит в поиске.
   */
  async testRichSnippets(slotId: string): Promise<RichSnippetTestResult> {
    const slot = await this.getSlotWithRelations(slotId);

    if (!slot) {
      throw new NotFoundException(`Слот с ID ${slotId} не найден`);
    }

    // Генерируем URL страницы слота
    const slotUrl = `${this.baseUrl}/slots/${slot.slug}`;

    // URL для Google Rich Results Test
    const googleTestUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(slotUrl)}`;

    // Валидируем текущую схему
    const validation = await this.validateJsonLd(slotId);

    // Определяем обнаруженные схемы
    const response = await this.generateJsonLd(slotId);
    const detectedSchemas = response.meta.enabledSchemas;

    return {
      success: validation.isValid,
      url: googleTestUrl,
      detectedSchemas,
      errors: validation.errors,
      warnings: validation.warnings,
    };
  }

  /**
   * 🔧 Обновить настройки JSON-LD для слота
   *
   * Позволяет через API изменить настройки генерации JSON-LD.
   */
  async updateJsonLdSettings(slotId: string, settings: UpdateJsonLdSettingsDto): Promise<{ success: boolean; slot: any }> {
    const slot = await this.prisma.slots.update({
      where: { id: slotId },
      data: {
        ...settings,
        updated_at: new Date(),
      },
    });

    return { success: true, slot };
  }

  // ==========================================================================
  // 🛠️ ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ДЛЯ ОБРАБОТКИ ТЕКСТА
  // ==========================================================================

  /**
   * 🔄 Обработка описания с заменой ключевых слов
   *
   * Заменяет [keyword_1], [keyword_2], [keyword_3] на значения из слота.
   * Удаляет HTML теги (JSON-LD не поддерживает HTML).
   *
   * @param slot - Объект слота с hero_keyword, hero_keyword_2, hero_keyword_3
   * @returns Обработанное описание без HTML и с замененными переменными
   */
  private processDescription(slot: any): string | null {
    if (!slot?.description) return null;

    let result = slot.description;

    // 🔑 Замена [keyword_1] на hero_keyword
    if (slot.hero_keyword) {
      result = result.replace(/\[keyword_1\]/g, slot.hero_keyword);
    }

    // 🔑 Замена [keyword_2] на hero_keyword_2
    if (slot.hero_keyword_2) {
      result = result.replace(/\[keyword_2\]/g, slot.hero_keyword_2);
    }

    // 🔑 Замена [keyword_3] на hero_keyword_3
    if (slot.hero_keyword_3) {
      result = result.replace(/\[keyword_3\]/g, slot.hero_keyword_3);
    }

    // 🧹 Удаление оставшихся незамененных переменных
    result = result.replace(/\[keyword_\d\]/g, '');

    // 🧹 Удаление HTML тегов (JSON-LD не поддерживает HTML)
    result = this.stripHtmlTags(result);

    // 🧹 Нормализация пробелов
    result = result.replace(/\s+/g, ' ').trim();

    return result;
  }

  /**
   * 🧹 Удаление HTML тегов из текста
   */
  private stripHtmlTags(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }

  // ==========================================================================
  // 🏭 МЕТОДЫ ГЕНЕРАЦИИ ОТДЕЛЬНЫХ СХЕМ
  // ==========================================================================

  /**
   * 🎮 Генерация Game Schema
   *
   * Основная схема для игрового слота.
   * Включает название, описание, рейтинг, платформы, механики, бонусы и тематики.
   */
  generateGameSchema(slot: any): GameSchema {
    const schema: GameSchema = {
      '@context': 'https://schema.org',
      '@type': (slot.jsonld_type as 'Game' | 'VideoGame' | 'WebApplication') || 'Game',
      name: slot.name,
      url: `${this.baseUrl}/slots/${slot.slug}`,
    };

    // 📝 Описание с заменой ключевых слов [keyword_1/2/3]
    const processedDescription = this.processDescription(slot);
    if (processedDescription) {
      schema.description = processedDescription;
    }

    // 🖼️ Изображение
    if (slot.image_url) {
      schema.image = slot.image_url;
    }

    // 🏢 Разработчик (провайдер)
    if (slot.providers) {
      schema.author = {
        '@type': 'Organization',
        name: slot.providers.name,
      };
    }

    // 🎭 Жанр - из тематик слота или кастомного поля
    if (slot.jsonld_game_genre) {
      schema.genre = slot.jsonld_game_genre;
    } else if (slot.slotThemes && slot.slotThemes.length > 0) {
      // Собираем жанры из связанных тематик
      const genres = slot.slotThemes
        .filter((st: any) => st.themes && st.themes.is_active)
        .map((st: any) => st.themes.name)
        .slice(0, 5); // Максимум 5 жанров
      if (genres.length > 0) {
        schema.genre = genres.join(', ');
      }
    }

    // 📱 Платформы
    if (slot.jsonld_game_platform) {
      schema.gamePlatform = slot.jsonld_game_platform;
    }

    // 🔞 Возрастной рейтинг
    if (slot.jsonld_content_rating) {
      schema.contentRating = slot.jsonld_content_rating;
    }

    // 🆓 Бесплатная игра
    if (slot.jsonld_is_free !== undefined) {
      schema.isFree = slot.jsonld_is_free;
    }

    // ⭐ Агрегированный рейтинг (если есть оценки)
    if (slot.rating && slot.rating_count && slot.rating_count > 0) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: Number(slot.rating),
        ratingCount: slot.rating_count,
        bestRating: 5,
        worstRating: 1,
      };
    }

    // 🎯 SEO: Дополнительные свойства для механик и бонусов
    const additionalProperties: any[] = [];

    // ⚙️ Механики слота
    if (slot.slot_mechanics && slot.slot_mechanics.length > 0) {
      const mechanics = slot.slot_mechanics
        .filter((sm: any) => sm.mechanics && sm.mechanics.is_active)
        .map((sm: any) => sm.mechanics);

      if (mechanics.length > 0) {
        additionalProperties.push({
          '@type': 'PropertyValue',
          name: 'Game Mechanics',
          value: mechanics.map((m: any) => m.name).join(', '),
        });
      }
    }

    // 🎁 Бонусы слота
    if (slot.slot_bonuses && slot.slot_bonuses.length > 0) {
      const bonuses = slot.slot_bonuses
        .filter((sb: any) => sb.bonuses && sb.bonuses.is_active)
        .map((sb: any) => sb.bonuses);

      if (bonuses.length > 0) {
        additionalProperties.push({
          '@type': 'PropertyValue',
          name: 'Bonus Features',
          value: bonuses.map((b: any) => b.name).join(', '),
        });
      }
    }

    // 📊 RTP и характеристики как PropertyValue
    if (slot.rtp) {
      additionalProperties.push({
        '@type': 'PropertyValue',
        name: 'Return to Player (RTP)',
        value: `${slot.rtp}%`,
        unitCode: 'P1',
      });
    }

    if (slot.volatility) {
      additionalProperties.push({
        '@type': 'PropertyValue',
        name: 'Volatility',
        value: slot.volatility,
      });
    }

    if (slot.max_win) {
      additionalProperties.push({
        '@type': 'PropertyValue',
        name: 'Maximum Win Multiplier',
        value: `${slot.max_win}x`,
        unitText: 'x bet',
      });
    }

    // 🎰 Структура игры
    if (slot.reels && slot.rows) {
      additionalProperties.push({
        '@type': 'PropertyValue',
        name: 'Game Layout',
        value: `${slot.reels}x${slot.rows}`,
      });
    }

    if (slot.paylines) {
      additionalProperties.push({
        '@type': 'PropertyValue',
        name: 'Paylines',
        value: String(slot.paylines),
      });
    }

    // 💰 Ставки
    if (slot.min_bet) {
      additionalProperties.push({
        '@type': 'PropertyValue',
        name: 'Minimum Bet',
        value: String(slot.min_bet),
        unitCode: 'currency',
      });
    }

    if (slot.max_bet) {
      additionalProperties.push({
        '@type': 'PropertyValue',
        name: 'Maximum Bet',
        value: String(slot.max_bet),
        unitCode: 'currency',
      });
    }

    // Добавляем дополнительные свойства если есть
    if (additionalProperties.length > 0) {
      (schema as any).additionalProperty = additionalProperties;
    }

    // 🎮 SEO: potentialAction для кнопок Demo и Real Money
    const potentialActions: any[] = [];

    // PlayAction для Demo кнопки (бесплатная игра)
    if (slot.demo_url || slot.is_demo_available) {
      potentialActions.push({
        '@type': 'PlayAction',
        name: 'Play Free Demo',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: slot.demo_url || `${this.baseUrl}/slots/${slot.slug}/demo`,
          actionPlatform: [
            'https://schema.org/DesktopWebPlatform',
            'https://schema.org/MobileWebPlatform',
            'https://schema.org/IOSPlatform',
            'https://schema.org/AndroidPlatform',
          ],
        },
        actionStatus: 'https://schema.org/PotentialActionStatus',
        description: `Play ${slot.name} slot for free in demo mode without registration`,
      });
    }

    // ViewAction для Real Money кнопки (ссылка на казино)
    if (slot.real_play_url) {
      potentialActions.push({
        '@type': 'ViewAction',
        name: 'Play for Real Money',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: slot.real_play_url,
          actionPlatform: [
            'https://schema.org/DesktopWebPlatform',
            'https://schema.org/MobileWebPlatform',
          ],
        },
        actionStatus: 'https://schema.org/PotentialActionStatus',
        description: `Play ${slot.name} slot for real money at licensed casino`,
      });
    }

    // Добавляем potentialAction если есть действия
    if (potentialActions.length > 0) {
      (schema as any).potentialAction = potentialActions;
    }

    return schema;
  }

  /**
   * 🛒 Генерация Product Schema
   *
   * Используется если слот предлагается как продукт с ценой.
   * Показывает цену и доступность в поисковой выдаче.
   */
  generateProductSchema(slot: any): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: slot.name,
      description: this.processDescription(slot) || `Play ${slot.name} online`,
      image: slot.image_url,
      brand: slot.providers ? {
        '@type': 'Brand',
        name: slot.providers.name,
      } : undefined,
      offers: {
        '@type': 'Offer',
        price: slot.jsonld_product_price || 0,
        priceCurrency: slot.jsonld_product_currency || 'USD',
        availability: `https://schema.org/${slot.jsonld_product_availability || 'InStock'}`,
        itemCondition: `https://schema.org/${slot.jsonld_product_condition || 'NewCondition'}`,
      },
      // Добавляем рейтинг если есть
      ...(slot.rating && slot.rating_count > 0 ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: Number(slot.rating),
          ratingCount: slot.rating_count,
          bestRating: 5,
          worstRating: 1,
        },
      } : {}),
    };
  }

  /**
   * ⭐ Генерация Review Schema
   *
   * Экспертный обзор с рейтингом.
   * Показывает звёзды в поисковой выдаче - очень важно для CTR!
   */
  generateReviewSchema(slot: any): ReviewSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Review',
      itemReviewed: {
        '@type': 'Game',
        name: slot.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: slot.jsonld_review_rating || slot.rating || 4.5,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        '@type': 'Organization',
        name: slot.jsonld_review_author || 'SlotQuest Editorial Team',
      },
      datePublished: slot.jsonld_review_date
        ? new Date(slot.jsonld_review_date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      // 🎯 SEO: reviewBody с замененными ключевыми словами
      reviewBody: slot.jsonld_review_text || this.processDescription(slot) || `Expert review of ${slot.name} slot game.`,
    };
  }

  /**
   * ❓ Генерация FAQ Schema
   *
   * Часто задаваемые вопросы.
   * Google показывает их в виде раскрывающегося списка в SERP.
   */
  generateFaqSchema(slot: any): FaqSchema | null {
    if (!slot.jsonld_faq_json) {
      return null;
    }

    try {
      const faqItems: FaqItem[] = JSON.parse(slot.jsonld_faq_json);

      if (!Array.isArray(faqItems) || faqItems.length === 0) {
        return null;
      }

      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };
    } catch (e) {
      console.error('❌ Ошибка парсинга FAQ JSON:', e);
      return null;
    }
  }

  /**
   * 📋 Генерация HowTo Schema
   *
   * Пошаговая инструкция "Как играть в слот".
   * Google показывает шаги прямо в поисковой выдаче.
   */
  generateHowToSchema(slot: any): HowToSchema | null {
    if (!slot.jsonld_howto_json) {
      return null;
    }

    try {
      const steps: HowToStep[] = JSON.parse(slot.jsonld_howto_json);

      if (!Array.isArray(steps) || steps.length === 0) {
        return null;
      }

      return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `Как играть в ${slot.name}`,
        description: `Пошаговая инструкция по игре в слот ${slot.name}`,
        step: steps.map((item, index) => ({
          '@type': 'HowToStep',
          position: item.step || index + 1,
          name: item.name,
          text: item.text,
        })),
      };
    } catch (e) {
      console.error('❌ Ошибка парсинга HowTo JSON:', e);
      return null;
    }
  }

  /**
   * 🍞 Генерация BreadcrumbList Schema
   *
   * Хлебные крошки - навигационный путь к странице.
   * Показывается в поисковой выдаче вместо URL.
   */
  generateBreadcrumbSchema(slot: any): BreadcrumbSchema {
    const items: BreadcrumbSchema['itemListElement'] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: this.baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Слоты',
        item: `${this.baseUrl}/slots`,
      },
    ];

    // Добавляем провайдера если есть
    if (slot.providers) {
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: slot.providers.name,
        item: `${this.baseUrl}/providers/${slot.providers.slug}`,
      });

      items.push({
        '@type': 'ListItem',
        position: 4,
        name: slot.name,
        item: `${this.baseUrl}/slots/${slot.slug}`,
      });
    } else {
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: slot.name,
        item: `${this.baseUrl}/slots/${slot.slug}`,
      });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
  }

  /**
   * 🎬 Генерация VideoObject Schema
   *
   * Схема для видео-обзора слота.
   * Google может показать превью видео прямо в поисковой выдаче.
   */
  generateVideoSchema(slot: any): VideoSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: `Обзор слота ${slot.name}`,
      description: slot.jsonld_video_description || `Видео-обзор и геймплей слота ${slot.name}`,
      thumbnailUrl: slot.jsonld_video_thumbnail || slot.image_url,
      uploadDate: slot.jsonld_video_upload_date
        ? new Date(slot.jsonld_video_upload_date).toISOString()
        : new Date().toISOString(),
      duration: slot.jsonld_video_duration, // ISO 8601 формат: PT2M30S
      contentUrl: slot.jsonld_video_url,
    };
  }

  // ==========================================================================
  // 🔧 ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
  // ==========================================================================

  /**
   * 📖 Получить слот со всеми связями из базы данных
   *
   * Загружает слот вместе с провайдером, категориями, механиками и т.д.
   * Это нужно для генерации полных JSON-LD схем.
   */
  private async getSlotWithRelations(slotId: string) {
    return this.prisma.slots.findUnique({
      where: { id: slotId },
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
  }

  /**
   * 📊 Получить статистику JSON-LD для слота
   */
  async getJsonLdStats(slotId: string) {
    const slot = await this.prisma.slots.findUnique({
      where: { id: slotId },
      select: {
        id: true,
        jsonld_enabled: true,
        jsonld_enable_product: true,
        jsonld_enable_review: true,
        jsonld_enable_faq: true,
        jsonld_enable_howto: true,
        jsonld_enable_breadcrumb: true,
        jsonld_enable_video: true,
        jsonld_last_validated: true,
        jsonld_validation_errors: true,
      },
    });

    if (!slot) {
      throw new NotFoundException(`Слот с ID ${slotId} не найден`);
    }

    const enabledSchemas: string[] = ['Game']; // Основная схема всегда включена

    if (slot.jsonld_enable_product) enabledSchemas.push('Product');
    if (slot.jsonld_enable_review) enabledSchemas.push('Review');
    if (slot.jsonld_enable_faq) enabledSchemas.push('FAQ');
    if (slot.jsonld_enable_howto) enabledSchemas.push('HowTo');
    if (slot.jsonld_enable_breadcrumb) enabledSchemas.push('Breadcrumb');
    if (slot.jsonld_enable_video) enabledSchemas.push('Video');

    let errorCount = 0;
    if (slot.jsonld_validation_errors) {
      try {
        const errors = JSON.parse(slot.jsonld_validation_errors);
        errorCount = Array.isArray(errors) ? errors.length : 0;
      } catch (e) {
        // Ignore parsing errors
      }
    }

    return {
      slotId: slot.id,
      enabled: slot.jsonld_enabled,
      enabledSchemas,
      lastValidated: slot.jsonld_last_validated,
      validationStatus: slot.jsonld_validation_errors
        ? 'invalid'
        : (slot.jsonld_last_validated ? 'valid' : 'not_checked'),
      errorCount,
      warningCount: 0, // Можно расширить позже
    };
  }

  /**
   * 📋 Получить JSON-LD для всех активных слотов (для sitemap)
   */
  async getAllSlotsJsonLdSummary(): Promise<Array<{ slotId: string; slug: string; enabled: boolean; schemas: string[] }>> {
    const slots = await this.prisma.slots.findMany({
      where: { is_active: true },
      select: {
        id: true,
        slug: true,
        jsonld_enabled: true,
        jsonld_enable_product: true,
        jsonld_enable_review: true,
        jsonld_enable_faq: true,
        jsonld_enable_howto: true,
        jsonld_enable_breadcrumb: true,
        jsonld_enable_video: true,
      },
    });

    return slots.map(slot => {
      const schemas: string[] = ['Game'];
      if (slot.jsonld_enable_product) schemas.push('Product');
      if (slot.jsonld_enable_review) schemas.push('Review');
      if (slot.jsonld_enable_faq) schemas.push('FAQ');
      if (slot.jsonld_enable_howto) schemas.push('HowTo');
      if (slot.jsonld_enable_breadcrumb) schemas.push('Breadcrumb');
      if (slot.jsonld_enable_video) schemas.push('Video');

      return {
        slotId: slot.id,
        slug: slot.slug,
        enabled: slot.jsonld_enabled,
        schemas,
      };
    });
  }

  // ==========================================================================
  // 📊 РАСШИРЕННАЯ АНАЛИТИКА (ЭТАП 5)
  // ==========================================================================

  /**
   * 📊 Получить расширенную статистику JSON-LD для всех слотов
   *
   * Возвращает:
   * - Общее количество слотов
   * - Количество с включённым JSON-LD
   * - Количество с ошибками валидации
   * - Распределение по схемам
   */
  async getAnalyticsSummary(): Promise<{
    total: number;
    enabled: number;
    disabled: number;
    withErrors: number;
    needsValidation: number;
    schemaDistribution: { [key: string]: number };
    recentlyValidated: number;
  }> {
    // Получаем все активные слоты
    const slots = await this.prisma.slots.findMany({
      where: { is_active: true },
      select: {
        id: true,
        name: true,
        jsonld_enabled: true,
        jsonld_enable_product: true,
        jsonld_enable_review: true,
        jsonld_enable_faq: true,
        jsonld_enable_howto: true,
        jsonld_enable_breadcrumb: true,
        jsonld_enable_video: true,
        jsonld_last_validated: true,
        jsonld_validation_errors: true,
      },
    });

    const total = slots.length;
    const enabled = slots.filter(s => s.jsonld_enabled).length;
    const disabled = total - enabled;

    // Слоты с ошибками валидации
    const withErrors = slots.filter(s => {
      if (!s.jsonld_validation_errors) return false;
      try {
        const errors = JSON.parse(s.jsonld_validation_errors);
        return Array.isArray(errors) && errors.length > 0;
      } catch {
        return s.jsonld_validation_errors && s.jsonld_validation_errors.length > 0;
      }
    }).length;

    // Слоты которые никогда не валидировались
    const needsValidation = slots.filter(s => s.jsonld_enabled && !s.jsonld_last_validated).length;

    // Слоты валидированные за последние 7 дней
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentlyValidated = slots.filter(s =>
      s.jsonld_last_validated && new Date(s.jsonld_last_validated) > sevenDaysAgo
    ).length;

    // Распределение по схемам
    const schemaDistribution: { [key: string]: number } = {
      Game: enabled, // Все включённые слоты имеют Game Schema
      Product: 0,
      Review: 0,
      FAQ: 0,
      HowTo: 0,
      Breadcrumb: 0,
      Video: 0,
    };

    slots.forEach(slot => {
      if (!slot.jsonld_enabled) return;
      if (slot.jsonld_enable_product) schemaDistribution.Product++;
      if (slot.jsonld_enable_review) schemaDistribution.Review++;
      if (slot.jsonld_enable_faq) schemaDistribution.FAQ++;
      if (slot.jsonld_enable_howto) schemaDistribution.HowTo++;
      if (slot.jsonld_enable_breadcrumb) schemaDistribution.Breadcrumb++;
      if (slot.jsonld_enable_video) schemaDistribution.Video++;
    });

    return {
      total,
      enabled,
      disabled,
      withErrors,
      needsValidation,
      schemaDistribution,
      recentlyValidated,
    };
  }

  /**
   * 📋 Получить список слотов с ошибками валидации
   */
  async getSlotsWithErrors(): Promise<Array<{
    id: string;
    name: string;
    slug: string;
    errors: string[];
    lastValidated: Date | null;
  }>> {
    const slots = await this.prisma.slots.findMany({
      where: {
        is_active: true,
        jsonld_enabled: true,
        jsonld_validation_errors: {
          not: null,
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        jsonld_validation_errors: true,
        jsonld_last_validated: true,
      },
    });

    return slots
      .map(slot => {
        let errors: string[] = [];
        if (slot.jsonld_validation_errors) {
          try {
            errors = JSON.parse(slot.jsonld_validation_errors);
          } catch {
            errors = [slot.jsonld_validation_errors];
          }
        }
        return {
          id: slot.id,
          name: slot.name,
          slug: slot.slug,
          errors,
          lastValidated: slot.jsonld_last_validated,
        };
      })
      .filter(slot => slot.errors.length > 0);
  }

  /**
   * 📋 Получить список слотов требующих валидации
   */
  async getSlotsNeedingValidation(): Promise<Array<{
    id: string;
    name: string;
    slug: string;
    lastValidated: Date | null;
    daysSinceValidation: number | null;
  }>> {
    const slots = await this.prisma.slots.findMany({
      where: {
        is_active: true,
        jsonld_enabled: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        jsonld_last_validated: true,
      },
      orderBy: {
        jsonld_last_validated: 'asc', // NULL values first, then oldest
      },
    });

    const now = new Date();
    return slots.map(slot => {
      let daysSinceValidation: number | null = null;
      if (slot.jsonld_last_validated) {
        const diff = now.getTime() - new Date(slot.jsonld_last_validated).getTime();
        daysSinceValidation = Math.floor(diff / (1000 * 60 * 60 * 24));
      }
      return {
        id: slot.id,
        name: slot.name,
        slug: slot.slug,
        lastValidated: slot.jsonld_last_validated,
        daysSinceValidation,
      };
    });
  }

  /**
   * 🔄 Массовая валидация всех слотов
   *
   * Валидирует все активные слоты с включённым JSON-LD.
   * Сохраняет результаты в базу данных.
   */
  async validateAllSlots(): Promise<{
    total: number;
    validated: number;
    passed: number;
    failed: number;
    results: Array<{
      slotId: string;
      name: string;
      isValid: boolean;
      errorCount: number;
    }>;
  }> {
    const slots = await this.prisma.slots.findMany({
      where: {
        is_active: true,
        jsonld_enabled: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const results: Array<{
      slotId: string;
      name: string;
      isValid: boolean;
      errorCount: number;
    }> = [];

    let passed = 0;
    let failed = 0;

    for (const slot of slots) {
      try {
        const validation = await this.validateJsonLd(slot.id);

        // Сохраняем результат валидации в БД
        await this.prisma.slots.update({
          where: { id: slot.id },
          data: {
            jsonld_last_validated: new Date(),
            jsonld_validation_errors: validation.errors.length > 0
              ? JSON.stringify(validation.errors)
              : null,
          },
        });

        if (validation.isValid) {
          passed++;
        } else {
          failed++;
        }

        results.push({
          slotId: slot.id,
          name: slot.name,
          isValid: validation.isValid,
          errorCount: validation.errors.length,
        });
      } catch (error) {
        console.error(`❌ Ошибка валидации слота ${slot.id}:`, error);
        failed++;
        results.push({
          slotId: slot.id,
          name: slot.name,
          isValid: false,
          errorCount: 1,
        });
      }
    }

    return {
      total: slots.length,
      validated: results.length,
      passed,
      failed,
      results,
    };
  }

  /**
   * 📊 Получить детальную статистику по конкретной схеме
   */
  async getSchemaStats(schemaType: string): Promise<{
    schemaType: string;
    totalSlots: number;
    enabledSlots: number;
    percentage: number;
    slots: Array<{ id: string; name: string; slug: string }>;
  }> {
    const enabledField = `jsonld_enable_${schemaType.toLowerCase()}`;

    // Для Game схемы - просто все включённые слоты
    if (schemaType.toLowerCase() === 'game') {
      const slots = await this.prisma.slots.findMany({
        where: {
          is_active: true,
          jsonld_enabled: true,
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      });

      const total = await this.prisma.slots.count({
        where: { is_active: true },
      });

      return {
        schemaType: 'Game',
        totalSlots: total,
        enabledSlots: slots.length,
        percentage: total > 0 ? Math.round((slots.length / total) * 100) : 0,
        slots,
      };
    }

    // Для остальных схем
    const whereClause: any = {
      is_active: true,
      jsonld_enabled: true,
    };

    // Добавляем фильтр по конкретной схеме
    switch (schemaType.toLowerCase()) {
      case 'product':
        whereClause.jsonld_enable_product = true;
        break;
      case 'review':
        whereClause.jsonld_enable_review = true;
        break;
      case 'faq':
        whereClause.jsonld_enable_faq = true;
        break;
      case 'howto':
        whereClause.jsonld_enable_howto = true;
        break;
      case 'breadcrumb':
        whereClause.jsonld_enable_breadcrumb = true;
        break;
      case 'video':
        whereClause.jsonld_enable_video = true;
        break;
      default:
        throw new Error(`Неизвестный тип схемы: ${schemaType}`);
    }

    const slots = await this.prisma.slots.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    const total = await this.prisma.slots.count({
      where: { is_active: true },
    });

    return {
      schemaType,
      totalSlots: total,
      enabledSlots: slots.length,
      percentage: total > 0 ? Math.round((slots.length / total) * 100) : 0,
      slots,
    };
  }
}
