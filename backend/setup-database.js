const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  console.log('Setting up database...');
  
  try {
    // Создание таблицы провайдеров
    console.log('Creating providers table...');
    const { error: providersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS providers (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          logo_url VARCHAR(500),
          website_url VARCHAR(500),
          founded_year INTEGER,
          country VARCHAR(100),
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        ALTER TABLE providers DISABLE ROW LEVEL SECURITY;
      `
    });
    
    if (providersError) {
      console.log('Providers table might already exist or RLS already disabled');
    }

    // Создание таблицы категорий
    console.log('Creating categories table...');
    const { error: categoriesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS slot_categories (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          icon VARCHAR(100),
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        ALTER TABLE slot_categories DISABLE ROW LEVEL SECURITY;
      `
    });
    
    if (categoriesError) {
      console.log('Categories table might already exist or RLS already disabled');
    }

    // Создание таблицы слотов
    console.log('Creating slots table...');
    const { error: slotsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS slots (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          provider_id UUID REFERENCES providers(id),
          category_id UUID REFERENCES slot_categories(id),
          description TEXT,
          thumbnail_url VARCHAR(500),
          image_url VARCHAR(500),
          demo_url VARCHAR(500),
          rtp DECIMAL(5,2),
          volatility VARCHAR(20) CHECK (volatility IN ('low', 'medium', 'high')),
          min_bet DECIMAL(10,2),
          max_bet DECIMAL(10,2),
          max_win VARCHAR(50),
          reels INTEGER,
          rows INTEGER,
          paylines INTEGER,
          theme VARCHAR(100),
          features TEXT[],
          release_date DATE,
          is_active BOOLEAN DEFAULT true,
          is_featured BOOLEAN DEFAULT false,
          rating DECIMAL(3,1),
          play_count INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        ALTER TABLE slots DISABLE ROW LEVEL SECURITY;
      `
    });
    
    if (slotsError) {
      console.log('Slots table might already exist or RLS already disabled');
    }

    // Добавление тестовых данных
    console.log('Adding test data...');
    
    // Провайдеры
    const providers = [
      { name: 'NetEnt', slug: 'netent', description: 'Leading provider of premium gaming solutions', founded_year: 1996, country: 'Sweden' },
      { name: 'Microgaming', slug: 'microgaming', description: 'Pioneer in online gaming software', founded_year: 1994, country: 'Isle of Man' },
      { name: 'Pragmatic Play', slug: 'pragmatic-play', description: 'Multi-product content provider', founded_year: 2015, country: 'Malta' },
      { name: 'Play\'n GO', slug: 'play-n-go', description: 'Swedish game developer', founded_year: 1997, country: 'Sweden' }
    ];

    for (const provider of providers) {
      const { error } = await supabase.from('providers').upsert(provider, { onConflict: 'slug' });
      if (error) console.log(`Provider ${provider.name} error:`, error.message);
      else console.log(`Provider ${provider.name} added successfully`);
    }

    // Категории
    const categories = [
      { name: 'Video Slots', slug: 'video-slots', description: 'Modern video slot machines' },
      { name: 'Jackpot Slots', slug: 'jackpot-slots', description: 'Progressive and fixed jackpot games' },
      { name: 'Classic Slots', slug: 'classic-slots', description: 'Traditional 3-reel slot machines' }
    ];

    for (const category of categories) {
      const { error } = await supabase.from('slot_categories').upsert(category, { onConflict: 'slug' });
      if (error) console.log(`Category ${category.name} error:`, error.message);
      else console.log(`Category ${category.name} added successfully`);
    }

    // Получение ID провайдеров и категорий
    const { data: providersData } = await supabase.from('providers').select('id, slug');
    const { data: categoriesData } = await supabase.from('slot_categories').select('id, slug');

    if (providersData && categoriesData) {
      const netentId = providersData.find(p => p.slug === 'netent')?.id;
      const microgamingId = providersData.find(p => p.slug === 'microgaming')?.id;
      const pragmaticId = providersData.find(p => p.slug === 'pragmatic-play')?.id;
      const videoSlotsId = categoriesData.find(c => c.slug === 'video-slots')?.id;
      const jackpotSlotsId = categoriesData.find(c => c.slug === 'jackpot-slots')?.id;

      // Слоты
      const slots = [
        {
          name: 'Starburst',
          slug: 'starburst',
          provider_id: netentId,
          category_id: videoSlotsId,
          description: 'Classic NetEnt slot with expanding wilds and re-spins',
          thumbnail_url: 'https://picsum.photos/300/200?random=1',
          rtp: 96.09,
          volatility: 'low',
          min_bet: 0.10,
          max_bet: 100.00,
          max_win: '50000x',
          reels: 5,
          rows: 3,
          theme: 'Space',
          release_date: '2012-01-01',
          rating: 8.5,
          play_count: 25000,
          is_featured: true
        },
        {
          name: 'Mega Moolah',
          slug: 'mega-moolah',
          provider_id: microgamingId,
          category_id: jackpotSlotsId,
          description: 'Famous progressive jackpot slot with life-changing wins',
          thumbnail_url: 'https://picsum.photos/300/200?random=2',
          rtp: 88.12,
          volatility: 'medium',
          min_bet: 0.25,
          max_bet: 6.25,
          max_win: 'Progressive',
          reels: 5,
          rows: 3,
          theme: 'Safari',
          release_date: '2006-01-01',
          rating: 8.8,
          play_count: 32000,
          is_featured: true
        },
        {
          name: 'Sweet Bonanza',
          slug: 'sweet-bonanza',
          provider_id: pragmaticId,
          category_id: videoSlotsId,
          description: 'Candy-themed slot with tumble feature and multipliers',
          thumbnail_url: 'https://picsum.photos/300/200?random=3',
          rtp: 96.51,
          volatility: 'high',
          min_bet: 0.20,
          max_bet: 125.00,
          max_win: '21100x',
          reels: 6,
          rows: 5,
          theme: 'Candy',
          release_date: '2019-01-01',
          rating: 8.6,
          play_count: 16800,
          is_featured: true
        }
      ];

      for (const slot of slots) {
        const { error } = await supabase.from('slots').upsert(slot, { onConflict: 'slug' });
        if (error) console.log(`Slot ${slot.name} error:`, error.message);
        else console.log(`Slot ${slot.name} added successfully`);
      }
    }

    console.log('\nDatabase setup completed successfully!');
    
    // Проверка данных
    const { data: slotsCount } = await supabase.from('slots').select('*', { count: 'exact', head: true });
    const { data: providersCount } = await supabase.from('providers').select('*', { count: 'exact', head: true });
    const { data: categoriesCount } = await supabase.from('slot_categories').select('*', { count: 'exact', head: true });
    
    console.log(`\nData summary:`);
    console.log(`- Providers: ${providersCount?.length || 0}`);
    console.log(`- Categories: ${categoriesCount?.length || 0}`);
    console.log(`- Slots: ${slotsCount?.length || 0}`);
    
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

setupDatabase();