import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { mockSlots } from './mock-data';

interface SlotFilters {
  provider?: string;
  category?: string;
  limit?: number;
  offset?: number;
}

interface ReviewData {
  title: string;
  content: string;
  rating: number;
  pros?: string[];
  cons?: string[];
  author_name?: string;
  author_email?: string;
}

interface RatingData {
  rating: number;
  userIp: string;
  comment?: string;
}

@Injectable()
export class SlotsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllSlots(filters: SlotFilters = {}) {
    const supabase = this.supabaseService.getClient();

    let query = supabase
      .from('slots')
      .select(
        `
        *,
        provider:providers(*),
        category:slot_categories(*)
      `,
      )
      .eq('is_active', true);

    // Apply filters
    if (filters.provider) {
      query = query.eq('providers.slug', filters.provider);
    }

    if (filters.category) {
      query = query.eq('slot_categories.slug', filters.category);
    }

    // Apply pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.range(
        filters.offset,
        filters.offset + (filters.limit || 20) - 1,
      );
    }

    query = query.order('rating', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    // Debug: log what we got from database
    console.log('Database query result:', {
      data,
      error,
      dataLength: data?.length,
    });

    return data;
  }

  async getFeaturedSlots() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('slots')
      .select(
        `
        *,
        provider:providers(*),
        category:slot_categories(*)
      `,
      )
      .eq('is_active', true)
      .gte('rating', 8.0)
      .order('rating', { ascending: false })
      .limit(12);

    if (error) throw error;

    // If no data from database, return mock featured slots
    if (!data || data.length === 0) {
      return mockSlots
        .filter((slot) => slot.rating >= 8.0)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 12);
    }

    return data;
  }

  async getPopularSlots() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('slots')
      .select(
        `
        *,
        provider:providers(*),
        category:slot_categories(*)
      `,
      )
      .eq('is_active', true)
      .order('play_count', { ascending: false })
      .limit(12);

    if (error) throw error;

    // If no data from database, return mock popular slots
    if (!data || data.length === 0) {
      return mockSlots.sort((a, b) => b.play_count - a.play_count).slice(0, 12);
    }

    return data;
  }

  async searchSlots(searchQuery: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('slots')
      .select(
        `
        *,
        provider:providers(*),
        category:slot_categories(*)
      `,
      )
      .eq('is_active', true)
      .or(
        `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,theme.ilike.%${searchQuery}%`,
      )
      .order('rating', { ascending: false })
      .limit(20);

    if (error) throw error;
    return data;
  }

  async getSlotBySlug(slug: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('slots')
      .select(
        `
        *,
        provider:providers(*),
        category:slot_categories(*)
      `,
      )
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;

    // Increment play count
    if (data) {
      await supabase
        .from('slots')
        .update({ play_count: (data.play_count || 0) + 1 })
        .eq('id', data.id);
    }

    return data;
  }

  async getSlotReviews(slug: string) {
    const supabase = this.supabaseService.getClient();

    // First get the slot ID
    const { data: slot, error: slotError } = await supabase
      .from('slots')
      .select('id')
      .eq('slug', slug)
      .single();

    if (slotError) throw slotError;

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('slot_id', slot.id)
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async createSlotReview(slug: string, reviewData: ReviewData) {
    const supabase = this.supabaseService.getClient();

    // First get the slot ID
    const { data: slot, error: slotError } = await supabase
      .from('slots')
      .select('id')
      .eq('slug', slug)
      .single();

    if (slotError) throw slotError;

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        ...reviewData,
        slot_id: slot.id,
        is_published: false, // Reviews need approval
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async addSlotRating(slug: string, ratingData: RatingData) {
    const supabase = this.supabaseService.getClient();

    // First get the slot ID
    const { data: slot, error: slotError } = await supabase
      .from('slots')
      .select('id')
      .eq('slug', slug)
      .single();

    if (slotError) throw slotError;

    const { data, error } = await supabase
      .from('user_ratings')
      .upsert({
        slot_id: slot.id,
        user_ip: ratingData.userIp,
        rating: ratingData.rating,
        comment: ratingData.comment,
      })
      .select()
      .single();

    if (error) throw error;

    // Update slot average rating
    await this.updateSlotAverageRating(slot.id);

    return data;
  }

  async getSlotRating(slug: string) {
    const supabase = this.supabaseService.getClient();

    // First get the slot ID
    const { data: slot, error: slotError } = await supabase
      .from('slots')
      .select('id')
      .eq('slug', slug)
      .single();

    if (slotError) throw slotError;

    return await this.supabaseService.getSlotRating(slot.id);
  }

  private async updateSlotAverageRating(slotId: string) {
    const rating = await this.supabaseService.getSlotRating(slotId);
    const supabase = this.supabaseService.getClient();

    await supabase
      .from('slots')
      .update({ rating: rating.average })
      .eq('id', slotId);
  }

  async getSlotsByProvider(providerSlug: string) {
    const supabase = this.supabaseService.getClient();

    // First get the provider ID
    const { data: provider, error: providerError } = await supabase
      .from('providers')
      .select('id')
      .eq('slug', providerSlug)
      .single();

    if (providerError) throw providerError;

    const { data, error } = await supabase
      .from('slots')
      .select(
        `
        *,
        provider:providers(*),
        category:slot_categories(*)
      `,
      )
      .eq('provider_id', provider.id)
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getSlotsByCategory(categorySlug: string) {
    const supabase = this.supabaseService.getClient();

    // First get the category ID
    const { data: category, error: categoryError } = await supabase
      .from('slot_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();

    if (categoryError) throw categoryError;

    const { data, error } = await supabase
      .from('slots')
      .select(
        `
        *,
        provider:providers(*),
        category:slot_categories(*)
      `,
      )
      .eq('category_id', category.id)
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data;
  }
}
