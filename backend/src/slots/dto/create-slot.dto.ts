export class CreateSlotDto {
  name: string;
  slug?: string;
  description?: string;
  // HERO: ключевые слова для Hero секции
  hero_keyword?: string; // Заголовок (например, "Slot Review")
  hero_keyword_2?: string; // Первая переменная в описании
  hero_keyword_3?: string; // Вторая переменная в описании
  provider_id: string;
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
  overview_description_1?: string;
  overview_description_2?: string;
  overview_features_1?: string;
  overview_features_2?: string;
  overview_features_3?: string;
  overview_features_4?: string;
  overview_features_5?: string;
  overview_features_6?: string;
  // Связи с другими сущностями
  selected_mechanics?: any[];
  selected_bonuses?: any[];
  selected_themes?: any[];
}
