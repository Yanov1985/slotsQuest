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
  // Связи с другими сущностями
  selected_mechanics?: any[];
  selected_bonuses?: any[];
  selected_themes?: any[];
}
