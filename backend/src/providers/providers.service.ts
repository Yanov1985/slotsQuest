import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProvidersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllProviders() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return { data };
  }

  async getProviderBySlug(slug: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return { data };
  }

  async getProviderSlots(slug: string) {
    const supabase = this.supabaseService.getClient();

    // First get the provider ID
    const { data: provider, error: providerError } = await supabase
      .from('providers')
      .select('id')
      .eq('slug', slug)
      .single();

    if (providerError) throw providerError;

    const { data, error } = await supabase
      .from('slots')
      .select(`
        *,
        provider:providers(*),
        category:slot_categories(*)
      `)
      .eq('provider_id', provider.id)
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (error) throw error;
    return { data };
  }
}