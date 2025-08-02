import { IsString, IsOptional, IsBoolean, IsInt, IsUrl, Min, Max, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateFeatureDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['bonus', 'special', 'multiplier', 'free_spins', 'wild', 'scatter', 'progressive'])
  type?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsUrl()
  image_url?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return value;
  })
  is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return value;
  })
  is_popular?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return value;
  })
  is_featured?: boolean;
}

export class UpdateFeatureDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['bonus', 'special', 'multiplier', 'free_spins', 'wild', 'scatter', 'progressive'])
  type?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsUrl()
  image_url?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sort_order?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return value;
  })
  is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return value;
  })
  is_popular?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return value;
  })
  is_featured?: boolean;
}

export class FeatureQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(['bonus', 'special', 'multiplier', 'free_spins', 'wild', 'scatter', 'progressive'])
  type?: string;

  @IsOptional()
  @IsString()
  is_active?: string;

  @IsOptional()
  @IsString()
  is_popular?: string;

  @IsOptional()
  @IsString()
  is_featured?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsString()
  @IsIn(['name', 'created_at', 'sort_order'])
  sort_by?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  sort_order?: string;
}

export class AddFeatureToSlotDto {
  @IsInt()
  feature_id: number;
}