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
}
