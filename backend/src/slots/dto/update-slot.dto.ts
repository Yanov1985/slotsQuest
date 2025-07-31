export class UpdateSlotDto {
  name?: string;
  description?: string;
  provider_id?: string;
  category_id?: string;
  rtp?: number;
  volatility?: string;
  max_win?: number;
  min_bet?: number;
  max_bet?: number;
  reels?: number;
  rows?: number;
  paylines?: number;
  theme?: string;
  thumbnail_url?: string;
  screenshots?: string[];
  features?: string[];
  is_active?: boolean;
  is_mobile_compatible?: boolean;
  is_demo_available?: boolean;
  release_date?: string;
}