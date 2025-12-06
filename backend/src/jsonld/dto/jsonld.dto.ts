/**
 * 📦 DTO (Data Transfer Objects) для JSON-LD API
 *
 * Представь DTO как "формы" для данных - как бланки заявлений,
 * где каждое поле имеет своё место и тип.
 * Они помогают валидировать входящие данные и типизировать ответы.
 */

/**
 * 🎮 Тип схемы JSON-LD для игрового слота
 *
 * Разные типы схем нужны для разных целей:
 * - Game: основной тип для игр
 * - Product: если хотим показать цену/покупку
 * - WebApplication: для веб-приложений
 * - VideoGame: более специфичный тип игры
 */
export type JsonLdSchemaType = 'Game' | 'Product' | 'WebApplication' | 'VideoGame';

/**
 * 📝 Интерфейс FAQ вопроса-ответа
 *
 * Пример использования:
 * {
 *   question: "Какой RTP у слота?",
 *   answer: "RTP составляет 96.5%"
 * }
 */
export interface FaqItem {
  question: string;   // Вопрос пользователя
  answer: string;     // Ответ на вопрос
}

/**
 * 📋 Интерфейс шага инструкции HowTo
 *
 * Пример использования:
 * {
 *   step: 1,
 *   name: "Выберите ставку",
 *   text: "Используйте кнопки + и - для выбора размера ставки"
 * }
 */
export interface HowToStep {
  step: number;       // Номер шага (1, 2, 3...)
  name: string;       // Короткое название шага
  text: string;       // Подробное описание действия
}

/**
 * 🎯 DTO для валидации JSON-LD
 *
 * Запрос на валидацию JSON-LD схемы.
 * Позволяет проверить, соответствует ли схема стандартам schema.org
 */
export class ValidateJsonLdDto {
  jsonld?: string;    // Кастомный JSON-LD для валидации (опционально)
}

/**
 * ✅ Результат валидации JSON-LD
 *
 * Возвращается после проверки схемы:
 * - isValid: true если всё OK
 * - errors: массив найденных ошибок
 * - warnings: предупреждения (не критичные)
 * - suggestions: рекомендации по улучшению
 */
export interface ValidationResult {
  isValid: boolean;           // Валидна ли схема
  errors: string[];           // Критические ошибки
  warnings: string[];         // Предупреждения
  suggestions: string[];      // Рекомендации по SEO
  schema?: object;            // Проверенная схема (если валидна)
}

/**
 * 📊 Полный ответ JSON-LD API
 *
 * Включает все сгенерированные схемы и мета-информацию
 */
export interface JsonLdResponse {
  success: boolean;           // Успешность операции
  slotId: string;             // ID слота
  slotName: string;           // Название слота
  schemas: {                  // Объект со всеми схемами
    game?: object;            // Game Schema
    product?: object;         // Product Schema
    review?: object;          // Review Schema
    faq?: object;             // FAQ Schema
    howTo?: object;           // HowTo Schema
    breadcrumb?: object;      // BreadcrumbList Schema
    video?: object;           // VideoObject Schema
    combined?: object[];      // Все схемы в одном массиве
  };
  meta: {                     // Мета-информация
    generatedAt: string;      // Когда сгенерировано
    enabledSchemas: string[]; // Какие схемы включены
    totalSchemas: number;     // Всего схем
  };
}

/**
 * 🔧 DTO для обновления настроек JSON-LD слота
 *
 * Позволяет изменить настройки JSON-LD через API
 */
export class UpdateJsonLdSettingsDto {
  // Основные настройки
  jsonld_enabled?: boolean;
  jsonld_type?: JsonLdSchemaType;
  jsonld_game_genre?: string;
  jsonld_game_platform?: string;
  jsonld_content_rating?: string;
  jsonld_is_free?: boolean;

  // Включение дополнительных схем
  jsonld_enable_product?: boolean;
  jsonld_enable_review?: boolean;
  jsonld_enable_faq?: boolean;
  jsonld_enable_howto?: boolean;
  jsonld_enable_breadcrumb?: boolean;
  jsonld_enable_video?: boolean;

  // Product Schema
  jsonld_product_price?: number;
  jsonld_product_currency?: string;
  jsonld_product_availability?: string;
  jsonld_product_condition?: string;

  // Review Schema
  jsonld_review_author?: string;
  jsonld_review_date?: Date;
  jsonld_review_text?: string;
  jsonld_review_rating?: number;

  // FAQ Schema (JSON строка с массивом вопросов)
  jsonld_faq_json?: string;

  // HowTo Schema (JSON строка с массивом шагов)
  jsonld_howto_json?: string;

  // Video Schema
  jsonld_video_url?: string;
  jsonld_video_thumbnail?: string;
  jsonld_video_duration?: string;
  jsonld_video_upload_date?: Date;
  jsonld_video_description?: string;

  // Кастомная схема
  jsonld_custom?: string;
  jsonld_override_auto?: boolean;

  // SEO мета-теги
  seo_title?: string;
  seo_description?: string;
  seo_keywords_primary?: string;
  seo_keywords_lsi?: string;
  seo_keywords_geo?: string;
  content_language?: string;
  geo_target_regions?: string;
}

/**
 * 🧪 Результат теста Google Rich Snippets
 */
export interface RichSnippetTestResult {
  success: boolean;           // Успешность теста
  url: string;                // URL для тестирования в Google
  previewHtml?: string;       // Превью как это выглядит в поиске
  detectedSchemas: string[];  // Обнаруженные типы схем
  errors: string[];           // Ошибки
  warnings: string[];         // Предупреждения
}

/**
 * 📈 Статистика JSON-LD для слота
 */
export interface JsonLdStats {
  slotId: string;
  enabledSchemas: string[];
  lastValidated?: Date;
  validationStatus: 'valid' | 'invalid' | 'not_checked';
  errorCount: number;
  warningCount: number;
}
