export class UpdateSlotDto {
  slug?: string;
  name?: string;
  description?: string;
  // HERO: ключевые слова для Hero секции
  hero_keyword?: string; // Заголовок (например, "Slot Review")
  hero_keyword_2?: string; // Первая переменная в описании
  hero_keyword_3?: string; // Вторая переменная в описании
  provider_id?: string;
  category_id?: string;
  // HERO: медиа
  media_type?: string;
  image_url?: string;
  video_url?: string;
  demo_url?: string;
  real_play_url?: string;
  rtp?: number;
  volatility?: string;
  max_win?: number;
  // В БД числа, но можем принять строку и преобразовать
  min_bet?: number | string;
  max_bet?: number | string;
  reels?: number;
  rows?: number;
  // HERO: дополнительные поля отображения
  game_field?: string;
  paylines?: string;
  theme?: string;
  thumbnail_url?: string;
  screenshots?: string[];
  features?: string[];
  is_active?: boolean;
  is_mobile_compatible?: boolean;
  is_demo_available?: boolean;
  release_date?: string;
  // HERO: рейтинг и популярность
  rating?: number;
  rating_count?: number;
  popularity_rank?: number;
  popularity_percentage?: number;
  real_rtp?: number;
  bonus_frequency?: string;
  // HERO: награды
  show_awards?: boolean;
  awards?: any;
  // Полный обзор слота 2025
  overview_title?: string;
  overview_keyword_1?: string;
  overview_keyword_2?: string;
  overview_keyword_3?: string;
  overview_description_1?: string;
  overview_description_2?: string;
  overview_features_title?: string;
  overview_features_1?: string;
  overview_features_2?: string;
  overview_features_3?: string;
  overview_features_4?: string;
  overview_features_5?: string;
  overview_features_6?: string;
  // Раздел "Насколько популярен"
  popularity_title?: string;
  popularity_global_rank?: string;
  popularity_global_desc?: string;
  popularity_players_count?: string;
  popularity_players_desc?: string;
  popularity_rtp_score?: string;
  popularity_rtp_desc?: string;
  // Заголовки подразделов
  popularity_stats_title?: string;
  popularity_trend_title?: string;
  popularity_facts_title?: string;
  // Статистика популярности по годам
  popularity_year_1?: string;
  popularity_rank_1?: string;
  popularity_width_1?: number;
  popularity_label_1?: string;
  popularity_year_2?: string;
  // Strategies & Tips (dynamic content)
  strategy_title?: string;
  strategy_intro?: string;
  strategy_beginner_title?: string;
  strategy_beginner_1?: string;
  strategy_beginner_2?: string;
  strategy_beginner_3?: string;
  strategy_beginner_4?: string;
  strategy_advanced_title?: string;
  strategy_advanced_1?: string;
  strategy_advanced_2?: string;
  strategy_advanced_3?: string;
  strategy_advanced_4?: string;
  popularity_rank_2?: string;
  popularity_width_2?: number;
  popularity_label_2?: string;
  popularity_year_3?: string;
  popularity_rank_3?: string;
  popularity_width_3?: number;
  popularity_label_3?: string;
  popularity_year_4?: string;
  popularity_rank_4?: string;
  popularity_width_4?: number;
  popularity_label_4?: string;
  // Ключевые факты популярности
  popularity_fact_icon_1?: string;
  popularity_fact_text_1?: string;
  popularity_fact_icon_2?: string;
  popularity_fact_text_2?: string;
  popularity_fact_icon_3?: string;
  popularity_fact_text_3?: string;
  popularity_fact_icon_4?: string;
  popularity_fact_text_4?: string;
  // Тренд популярности (график)
  popularity_trend_y1?: number;
  popularity_trend_y2?: number;
  popularity_trend_y3?: number;
  popularity_trend_y4?: number;

  // Основные механики
  mechanics_title?: string;
  mechanics_intro?: string;
  mechanics_scatter_title?: string;
  mechanics_scatter_description?: string;
  mechanics_scatter_details?: string;
  mechanics_cascade_title?: string;
  mechanics_cascade_description?: string;
  mechanics_cascade_details?: string;
  mechanics_multipliers_title?: string;
  mechanics_multipliers_description?: string;
  mechanics_multipliers_details?: string;
  mechanics_multipliers_important_title?: string;
  mechanics_multipliers_important?: string;
  mechanics_freespins_title?: string;
  mechanics_freespins_description?: string;
  mechanics_freespins_details?: string;
  mechanics_wilds_title?: string;
  mechanics_wilds_description?: string;
  mechanics_wilds_details?: string;
  mechanics_bonus_title?: string;
  mechanics_bonus_description?: string;
  mechanics_bonus_details?: string;

  // Бесплатные спины
  free_spins_title?: string;
  free_spins_intro?: string;
  free_spins_instant_title?: string;
  free_spins_4_scatter_desc?: string;
  free_spins_4_scatter?: string;
  free_spins_5_scatter_desc?: string;
  free_spins_5_scatter?: string;
  free_spins_6_scatter_desc?: string;
  free_spins_6_scatter?: string;
  free_spins_features_title?: string;
  free_spins_feature_1?: string;
  free_spins_feature_2?: string;
  free_spins_feature_3?: string;
  free_spins_feature_4?: string;
  // Ante Bet и покупка бонуса
  free_spins_ante_title?: string;
  free_spins_ante_description?: string;
  free_spins_ante_bet_value?: string;
  free_spins_ante_bet_effect?: string;
  // Ante Bet (старые поля)
  ante_bet_title?: string;
  ante_bet_description?: string;
  ante_bet_warning?: string;

  // Info Popup Content (для модального окна ⓘ на клиенте)
  info_expert_verdict?: string;
  info_pros?: string;
  info_cons?: string;
  info_faq?: string;
  info_reviews?: string;
  info_how_to_play?: string;
  info_demo_cta?: string;

  // Связи с другими сущностями
  selected_mechanics?: any[];
  selected_bonuses?: any[];
  selected_themes?: any[];

  // FAQ (Часто задаваемые вопросы)
  faq_title?: string;
  // Вопрос 1
  faq_q1_emoji?: string;
  faq_q1_question?: string;
  faq_q1_answer?: string;
  // Вопрос 2
  faq_q2_emoji?: string;
  faq_q2_question?: string;
  faq_q2_answer?: string;
  // Вопрос 3
  faq_q3_emoji?: string;
  faq_q3_question?: string;
  faq_q3_answer?: string;
  // Вопрос 4
  faq_q4_emoji?: string;
  faq_q4_question?: string;
  faq_q4_answer?: string;

  // Отзывы игроков - заголовки и статистика
  reviews_title?: string;
  reviews_subtitle?: string;
  reviews_overall_rating?: string;
  reviews_total_count?: string;
  reviews_positive_percent?: string;
  reviews_recommend_percent?: string;
  // Распределение оценок (5-1 звезда)
  reviews_5_stars_percent?: string;
  reviews_5_stars_count?: string;
  reviews_4_stars_percent?: string;
  reviews_4_stars_count?: string;
  reviews_3_stars_percent?: string;
  reviews_3_stars_count?: string;
  reviews_2_stars_percent?: string;
  reviews_2_stars_count?: string;
  reviews_1_stars_percent?: string;
  reviews_1_stars_count?: string;
  // Ключевые моменты из отзывов (sentiment analysis)
  reviews_sentiment_1_title?: string;
  reviews_sentiment_1_desc?: string;
  reviews_sentiment_2_title?: string;
  reviews_sentiment_2_desc?: string;
  reviews_sentiment_3_title?: string;
  reviews_sentiment_3_desc?: string;
  reviews_sentiment_4_title?: string;
  reviews_sentiment_4_desc?: string;
  // Индивидуальные отзывы (3 основных отзыва)
  // Отзыв 1
  review_1_author?: string;
  review_1_avatar_letter?: string;
  review_1_rating?: string;
  review_1_badge?: string;
  review_1_text?: string;
  review_1_likes?: string;
  review_1_replies?: string;
  review_1_date?: string;
  // Отзыв 2
  review_2_author?: string;
  review_2_avatar_letter?: string;
  review_2_rating?: string;
  review_2_badge?: string;
  review_2_text?: string;
  review_2_likes?: string;
  review_2_replies?: string;
  review_2_date?: string;
  // Отзыв 3
  review_3_author?: string;
  review_3_avatar_letter?: string;
  review_3_rating?: string;
  review_3_badge?: string;
  review_3_text?: string;
  review_3_likes?: string;
  review_3_replies?: string;
  review_3_date?: string;

  // Профессиональная оценка - заголовки и общая информация
  prof_rating_title?: string;
  prof_rating_subtitle?: string;
  prof_rating_overall_title?: string;
  prof_rating_overall_desc?: string;
  prof_rating_overall_score?: string;
  prof_rating_overall_stars?: string;
  // Детальные метрики (5 категорий оценки)
  // Метрика 1 (например, Графика и анимация)
  prof_rating_metric_1_emoji?: string;
  prof_rating_metric_1_name?: string;
  prof_rating_metric_1_score?: string;
  // Метрика 2 (например, Геймплей)
  prof_rating_metric_2_emoji?: string;
  prof_rating_metric_2_name?: string;
  prof_rating_metric_2_score?: string;
  // Метрика 3 (например, Потенциал выигрыша)
  prof_rating_metric_3_emoji?: string;
  prof_rating_metric_3_name?: string;
  prof_rating_metric_3_score?: string;
  // Метрика 4 (например, Бонусные функции)
  prof_rating_metric_4_emoji?: string;
  prof_rating_metric_4_name?: string;
  prof_rating_metric_4_score?: string;
  // Метрика 5 (например, Частота выплат)
  prof_rating_metric_5_emoji?: string;
  prof_rating_metric_5_name?: string;
  prof_rating_metric_5_score?: string;
  // Экспертное заключение
  prof_rating_expert_quote?: string;

  // Секция "Заключение" (Conclusion)
  conclusion_title?: string;
  conclusion_text_1?: string;
  conclusion_text_2?: string;
  // Кому подходит (4 пункта)
  conclusion_suitable_1?: string;
  conclusion_suitable_2?: string;
  conclusion_suitable_3?: string;
  conclusion_suitable_4?: string;
  // Важно помнить (4 пункта)
  conclusion_warning_1?: string;
  conclusion_warning_2?: string;
  conclusion_warning_3?: string;
  conclusion_warning_4?: string;

  // Секция CTA "Время побеждать"
  cta_title?: string;
  cta_subtitle?: string;
  cta_potential?: string;
  // Фичи/Преимущества (3 блока по 3 поля)
  cta_feature_1_emoji?: string;
  cta_feature_1_title?: string;
  cta_feature_1_desc?: string;
  cta_feature_2_emoji?: string;
  cta_feature_2_title?: string;
  cta_feature_2_desc?: string;
  cta_feature_3_emoji?: string;
  cta_feature_3_title?: string;
  cta_feature_3_desc?: string;
  // Кнопки призыва к действию (2 кнопки по 3 поля)
  cta_button_demo_emoji?: string;
  cta_button_demo_text?: string;
  cta_button_demo_url?: string;
  cta_button_real_emoji?: string;
  cta_button_real_text?: string;
  cta_button_real_url?: string;
  // Элементы доверия (3 пункта)
  cta_trust_1_text?: string;
  cta_trust_2_text?: string;
  cta_trust_3_text?: string;

  // ========== 🎯 JSON-LD СТРУКТУРИРОВАННЫЕ ДАННЫЕ (SEO) ==========
  // Управление JSON-LD схемами для Google Rich Snippets и поисковой оптимизации

  // 1️⃣ ОСНОВНАЯ СХЕМА (Game/Product/WebApplication)
  jsonld_enabled?: boolean; // Включить/выключить JSON-LD для этого слота
  jsonld_type?: string; // Тип схемы: Game, Product, WebApplication, VideoGame
  jsonld_game_genre?: string; // Жанр игры: Casino, Arcade, Strategy, Puzzle
  jsonld_game_platform?: string; // Платформы: Web, Mobile, Desktop
  jsonld_content_rating?: string; // Возрастной рейтинг: 18+, 21+, Everyone
  jsonld_is_free?: boolean; // Доступна ли бесплатная версия

  // 2️⃣ ДОПОЛНИТЕЛЬНЫЕ СХЕМЫ (включить/выключить через чекбоксы)
  jsonld_enable_product?: boolean; // Включить Product Schema
  jsonld_enable_review?: boolean; // Включить Review Schema
  jsonld_enable_faq?: boolean; // Включить FAQ Schema
  jsonld_enable_howto?: boolean; // Включить HowTo Schema
  jsonld_enable_breadcrumb?: boolean; // Включить BreadcrumbList Schema
  jsonld_enable_video?: boolean; // Включить VideoObject Schema

  // 3️⃣ PRODUCT SCHEMA
  jsonld_product_price?: number;
  jsonld_product_currency?: string;
  jsonld_product_availability?: string;
  jsonld_product_condition?: string;

  // 4️⃣ REVIEW SCHEMA
  jsonld_review_author?: string;
  jsonld_review_date?: string;
  jsonld_review_text?: string;
  jsonld_review_rating?: number;

  // 5️⃣ FAQ SCHEMA
  jsonld_faq_json?: string;

  // 6️⃣ HOWTO SCHEMA
  jsonld_howto_json?: string;

  // 7️⃣ VIDEO SCHEMA
  jsonld_video_url?: string;
  jsonld_video_thumbnail?: string;
  jsonld_video_duration?: string;
  jsonld_video_upload_date?: string;
  jsonld_video_description?: string;

  // 8️⃣ КАСТОМНАЯ JSON-LD
  jsonld_custom?: string;
  jsonld_override_auto?: boolean;

  // 9️⃣ МЕТА-ИНФОРМАЦИЯ И АНАЛИТИКА
  jsonld_last_validated?: string;
  jsonld_validation_errors?: string;
  jsonld_rich_snippet_enabled?: boolean;

  // 🔟 SEO МЕТА-ТЕГИ
  seo_title?: string;
  seo_description?: string;
  seo_keywords_primary?: string;
  seo_keywords_lsi?: string;
  seo_keywords_geo?: string;
  content_language?: string;
  geo_target_regions?: string;

  // 1️⃣1️⃣ РАСШИРЕННЫЕ SEO ПОЛЯ
  seo_title_template?: string;
  seo_title_power_words?: string;
  search_intent?: string;
  canonical_url?: string;

  // 1️⃣2️⃣ OPEN GRAPH ТЕГИ
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_type?: string;
  og_url?: string;
  og_site_name?: string;
  og_locale?: string;
  og_locale_alternate?: string;
  og_video?: string;
  og_video_type?: string;
  og_video_width?: number;
  og_video_height?: number;
  og_image_width?: number;
  og_image_height?: number;
  og_image_alt?: string;

  // 1️⃣3️⃣ TWITTER CARD ТЕГИ
  twitter_card?: string;
  twitter_site?: string;
  twitter_creator?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  twitter_image_alt?: string;
  twitter_player?: string;
  twitter_player_width?: number;
  twitter_player_height?: number;

  // 1️⃣4️⃣ ADVANCED ROBOTS DIRECTIVES
  robots_index?: boolean;
  robots_follow?: boolean;
  robots_max_snippet?: number;
  robots_max_image_preview?: string;
  robots_max_video_preview?: number;
  robots_notranslate?: boolean;
  robots_noimageindex?: boolean;
  robots_unavailable_after?: string;

  // 1️⃣5️⃣ HREFLANG И МЕЖДУНАРОДНОЕ SEO
  hreflang_enabled?: boolean;
  hreflang_x_default?: string;
  hreflang_config?: string;
  hreflang_preset?: string;

  // 1️⃣6️⃣ ДОПОЛНИТЕЛЬНЫЕ ТЕХНИЧЕСКИЕ SEO
  author_meta?: string;
  publisher_meta?: string;
  copyright_meta?: string;
  last_reviewed_date?: string;
  content_updated_at?: string;

  // 1️⃣7️⃣ CORE WEB VITALS HINTS
  preconnect_urls?: string;
  preload_image?: boolean;
  dns_prefetch_urls?: string;

  // 1️⃣8️⃣ TITLE TEMPLATES
  seo_title_use_template?: boolean;

  // 1️⃣9️⃣ E-E-A-T СИГНАЛЫ
  eeat_experience_date?: string;
  eeat_experience_hours?: number;
  eeat_experience_sessions?: number;
  eeat_experience_screenshots?: string;
  eeat_author_name?: string;
  eeat_author_position?: string;
  eeat_author_bio?: string;
  eeat_author_avatar?: string;
  eeat_author_social?: string;
  eeat_expertise_years?: number;
  eeat_reviews_count?: number;
  eeat_certifications?: string;
  eeat_partnerships?: string;
  eeat_citations_count?: number;
  eeat_awards?: string;
  eeat_featured_in?: string;
  eeat_data_sources?: string;
  eeat_fact_checked?: boolean;
  eeat_fact_check_date?: string;
  eeat_methodology?: string;
  eeat_disclaimer?: string;
  eeat_license_info?: string;

  // 2️⃣0️⃣ CONTENT FRESHNESS
  content_published_date?: string;
  content_major_update?: string;
  content_minor_update?: string;
  content_reviewed_date?: string;
  content_version?: string;
  content_changelog?: string;
  content_update_frequency?: string;
  content_next_review?: string;
  content_freshness_score?: number;

  // 2️⃣1️⃣ SOCIAL SHARING OPTIMIZATION
  social_share_count?: number;
  social_facebook_shares?: number;
  social_twitter_shares?: number;
  social_pinterest_shares?: number;
  social_custom_hashtags?: string;
  social_cta_text?: string;

  // 2️⃣2️⃣ CONVERSION OPTIMIZATION
  cta_primary_text?: string;
  cta_primary_url?: string;
  cta_secondary_text?: string;
  cta_secondary_url?: string;
  cta_urgency_text?: string;
  cta_social_proof?: string;

  // 2️⃣3️⃣ KEYWORD DENSITY ANALYSIS
  keyword_primary_target?: number;
  keyword_density_score?: number;
  keyword_analysis_date?: string;
  keyword_analysis_result?: string;
  keyword_suggestions?: string;
  keyword_competitors?: string;

  // 2️⃣4️⃣ INDEXING STATUS
  indexing_status?: string;
  indexing_first_date?: string;
  indexing_last_crawl?: string;
  indexing_crawl_frequency?: string;
  indexing_impressions?: number;
  indexing_clicks?: number;
  indexing_position?: number;
  indexing_internal_links?: number;
  indexing_external_links?: number;
  indexing_last_check?: string;
  indexing_errors?: string;

  // 2️⃣5️⃣ PAGE SPEED / CORE WEB VITALS
  cwv_lcp?: number;
  cwv_fid?: number;
  cwv_cls?: number;
  cwv_ttfb?: number;
  cwv_fcp?: number;
  cwv_inp?: number;
  cwv_score_mobile?: number;
  cwv_score_desktop?: number;
  cwv_last_check?: string;
  cwv_issues?: string;
  cwv_opportunities?: string;

  // 2️⃣6️⃣ SITEMAP CONFIGURATION
  sitemap_include?: boolean;
  sitemap_priority?: number;
  sitemap_frequency?: string;
  sitemap_last_mod?: string;
  sitemap_images?: string;
  sitemap_videos?: string;
  sitemap_news?: boolean;

  // 2️⃣7️⃣ SEO HEALTH SCORE
  seo_health_score?: number;
  seo_health_issues?: string;
  seo_health_warnings?: string;
  seo_health_passed?: string;
  seo_health_last_audit?: string;
  seo_health_trend?: string;

  // 2️⃣8️⃣ COMPETITOR ANALYSIS
  competitor_urls?: string;
  competitor_positions?: string;
  competitor_last_check?: string;

  // Дополнительные поля из схемы
  popularity_title_keyword?: string;
  cta_subtitle_keyword?: string;
  cta_potential_prefix?: string;
  cta_potential_suffix?: string;

  // Важные предупреждения (2 карточки)
  strategy_warnings_title?: string;
  strategy_warning_1_title?: string;
  strategy_warning_1_text?: string;
  strategy_warning_2_title?: string;
  strategy_warning_2_text?: string;

  // Секция "В чем секрет успеха?"
  success_secret_title?: string;
  success_secret_intro?: string;
  success_secret_card_1_title?: string;
  success_secret_card_1_text?: string;
  success_secret_card_2_title?: string;
  success_secret_card_2_text?: string;
  success_secret_outro?: string;

  // Отзывы - заголовки лейблы
  reviews_overall_label?: string;
  reviews_overall_stars?: string;
  reviews_total_label?: string;
  reviews_total_desc?: string;
  reviews_positive_label?: string;
  reviews_positive_desc?: string;
  reviews_recommend_label?: string;
  reviews_recommend_desc?: string;
  reviews_distribution_title?: string;
  reviews_sentiments_title?: string;
  reviews_featured_title?: string;

  // Профессиональная оценка - дополнительные поля
  prof_rating_expert_title?: string;
  prof_rating_expert_name?: string;
  prof_rating_expert_position?: string;
  prof_rating_expert_quote_keyword?: string;
  prof_rating_warning_title?: string;
  prof_rating_warning_text?: string;
  prof_rating_pros_title?: string;
  prof_rating_pros_1_title?: string;
  prof_rating_pros_1_desc?: string;
  prof_rating_pros_2_title?: string;
  prof_rating_pros_2_desc?: string;
  prof_rating_pros_3_title?: string;
  prof_rating_pros_3_desc?: string;
  prof_rating_pros_4_title?: string;
  prof_rating_pros_4_desc?: string;
  prof_rating_pros_5_title?: string;
  prof_rating_pros_5_desc?: string;
  prof_rating_cons_title?: string;
  prof_rating_cons_1_title?: string;
  prof_rating_cons_1_desc?: string;
  prof_rating_cons_2_title?: string;
  prof_rating_cons_2_desc?: string;
  prof_rating_cons_3_title?: string;
  prof_rating_cons_3_desc?: string;
  prof_rating_cons_4_title?: string;
  prof_rating_cons_4_desc?: string;
  prof_rating_cons_5_title?: string;
  prof_rating_cons_5_desc?: string;
  prof_rating_recommendation_title?: string;
  prof_rating_recommendation_subtitle?: string;
  prof_rating_recommendation_text?: string;
  prof_rating_recommendation_keyword?: string;

  // Заключение - дополнительные поля
  conclusion_rating_title?: string;
  conclusion_rating_keyword?: string;
  conclusion_text_1_keyword?: string;
  conclusion_suitable_title?: string;
  conclusion_warning_title?: string;
  conclusion_verdict_title?: string;
  conclusion_verdict_text?: string;
  conclusion_verdict_keyword?: string;

  // ========== 👤 ИНФОРМАЦИЯ ОБ АВТОРЕ И ДАТЕ ОБНОВЛЕНИЯ ==========
  // Блок автора отображается между Hero секцией и основным контентом

  // Основная информация об авторе
  article_author_name?: string; // Имя автора: "Yanov Kyryl"
  article_author_role?: string; // Должность/роль: "основатель", "главный редактор", "SEO-специалист"
  article_author_photo?: string; // URL фото автора
  article_author_bio?: string; // Краткая биография (опционально)
  article_author_social_linkedin?: string; // Ссылка на LinkedIn
  article_author_social_twitter?: string; // Ссылка на Twitter/X
  article_author_social_website?: string; // Персональный сайт автора

  // Информация об обновлении статьи
  article_published_date?: string; // Дата первой публикации: "2025-01-01"
  article_updated_date?: string; // Дата последнего обновления: "2026-01-12"
  article_updated_time?: string; // Время обновления: "16:17"
  article_updated_by?: string; // Кто обновил (если отличается от автора)

  // Время чтения
  article_reading_time?: number; // Время чтения в минутах: 9
  article_reading_time_label?: string; // Метка: "мин", "минут", "min"

  // Дополнительные настройки отображения
  article_show_author_block?: boolean; // Показывать блок автора: true/false
  article_show_reading_time?: boolean; // Показывать время чтения: true/false
  article_show_update_date?: boolean; // Показывать дату обновления: true/false
}
