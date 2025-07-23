const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function initializeDatabase() {
  console.log('Initializing database with service role key...');
  
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  try {
    // Insert providers
    console.log('Inserting providers...');
    const { data: providers, error: providersError } = await supabase
      .from('providers')
      .upsert([
        {
          name: 'NetEnt',
          slug: 'netent',
          description: 'Leading provider of premium gaming solutions',
          founded_year: 1996,
          country: 'Sweden'
        },
        {
          name: 'Microgaming',
          slug: 'microgaming',
          description: 'Pioneer in online gaming software',
          founded_year: 1994,
          country: 'Isle of Man'
        },
        {
          name: 'Pragmatic Play',
          slug: 'pragmatic-play',
          description: 'Multi-product content provider',
          founded_year: 2015,
          country: 'Malta'
        }
      ], { onConflict: 'slug' })
      .select();
    
    if (providersError) {
      console.error('Error inserting providers:', providersError);
      return;
    }
    console.log('Providers inserted:', providers);
    
    // Insert categories
    console.log('Inserting categories...');
    const { data: categories, error: categoriesError } = await supabase
      .from('slot_categories')
      .upsert([
        {
          name: 'Video Slots',
          slug: 'video-slots',
          description: 'Modern video slot machines'
        },
        {
          name: 'Jackpot Slots',
          slug: 'jackpot-slots',
          description: 'Progressive and fixed jackpot games'
        }
      ], { onConflict: 'slug' })
      .select();
    
    if (categoriesError) {
      console.error('Error inserting categories:', categoriesError);
      return;
    }
    console.log('Categories inserted:', categories);
    
    // Get provider and category IDs
    const netentProvider = providers.find(p => p.slug === 'netent');
    const microgamingProvider = providers.find(p => p.slug === 'microgaming');
    const pragmaticProvider = providers.find(p => p.slug === 'pragmatic-play');
    const videoCategory = categories.find(c => c.slug === 'video-slots');
    const jackpotCategory = categories.find(c => c.slug === 'jackpot-slots');
    
    // Insert slots
    console.log('Inserting slots...');
    const { data: slots, error: slotsError } = await supabase
      .from('slots')
      .upsert([
        {
          name: 'Starburst',
          slug: 'starburst',
          provider_id: netentProvider.id,
          category_id: videoCategory.id,
          description: 'Classic NetEnt slot with expanding wilds',
          thumbnail_url: 'https://via.placeholder.com/300x200?text=Starburst',
          rtp: 96.09,
          volatility: 'low',
          min_bet: 0.10,
          max_bet: 100.00,
          reels: 5,
          rows: 3,
          theme: 'Space',
          release_date: '2012-01-01',
          rating: 8.5,
          play_count: 25000
        },
        {
          name: 'Mega Moolah',
          slug: 'mega-moolah',
          provider_id: microgamingProvider.id,
          category_id: jackpotCategory.id,
          description: 'Famous progressive jackpot slot',
          thumbnail_url: 'https://via.placeholder.com/300x200?text=Mega+Moolah',
          rtp: 88.12,
          volatility: 'medium',
          min_bet: 0.25,
          max_bet: 6.25,
          reels: 5,
          rows: 3,
          theme: 'Safari',
          release_date: '2006-01-01',
          rating: 8.8,
          play_count: 32000
        },
        {
          name: 'Sweet Bonanza',
          slug: 'sweet-bonanza',
          provider_id: pragmaticProvider.id,
          category_id: videoCategory.id,
          description: 'Candy-themed slot with tumble feature',
          thumbnail_url: 'https://via.placeholder.com/300x200?text=Sweet+Bonanza',
          rtp: 96.51,
          volatility: 'high',
          min_bet: 0.20,
          max_bet: 125.00,
          reels: 6,
          rows: 5,
          theme: 'Candy',
          release_date: '2019-01-01',
          rating: 8.6,
          play_count: 16800
        }
      ], { onConflict: 'slug' })
      .select();
    
    if (slotsError) {
      console.error('Error inserting slots:', slotsError);
      return;
    }
    console.log('Slots inserted:', slots);
    
    console.log('\n✅ Database initialization completed successfully!');
    
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();