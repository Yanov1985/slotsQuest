import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and service role key must be provided');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Slots methods
  async getSlots() {
    const { data, error } = await this.supabase
      .from('slots')
      .select(`
        *,
        provider:providers(*),
        category:slot_categories(*)
      `)
      .eq('is_active', true)
      .order('rating', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async getSlotBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('slots')
      .select(`
        *,
        provider:providers(*),
        category:slot_categories(*),
        reviews(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();
    
    if (error) throw error;
    return data;
  }

  async getSlotsByProvider(providerId: string) {
    const { data, error } = await this.supabase
      .from('slots')
      .select(`
        *,
        provider:providers(*),
        category:slot_categories(*)
      `)
      .eq('provider_id', providerId)
      .eq('is_active', true)
      .order('rating', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Providers methods
  async getProviders() {
    const { data, error } = await this.supabase
      .from('providers')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (error) throw error;
    return data;
  }

  async getProviderBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('providers')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Categories methods
  async getCategories() {
    const { data, error } = await this.supabase
      .from('slot_categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  }

  // Casinos methods
  async getCasinos() {
    const { data, error } = await this.supabase
      .from('casinos')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Reviews methods
  async getReviewsBySlot(slotId: string) {
    const { data, error } = await this.supabase
      .from('reviews')
      .select('*')
      .eq('slot_id', slotId)
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async createReview(reviewData: any) {
    const { data, error } = await this.supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // User ratings methods
  async addUserRating(ratingData: any) {
    const { data, error } = await this.supabase
      .from('user_ratings')
      .insert(ratingData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async getSlotRating(slotId: string) {
    const { data, error } = await this.supabase
      .from('user_ratings')
      .select('rating')
      .eq('slot_id', slotId);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      const average = data.reduce((sum, rating) => sum + rating.rating, 0) / data.length;
      return {
        average: Math.round(average * 100) / 100,
        count: data.length
      };
    }
    
    return { average: 0, count: 0 };
  }

  // Articles methods
  async getArticles() {
    const { data, error } = await this.supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async getArticleBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    
    if (error) throw error;
    return data;
  }
}