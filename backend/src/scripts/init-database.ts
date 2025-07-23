import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function initDatabase() {
  try {
    console.log('🚀 Initializing database with test data...');

    // Check if data already exists
    const { data: existingSlots } = await supabase
      .from('slots')
      .select('id')
      .limit(1);

    if (existingSlots && existingSlots.length > 0) {
      console.log('✅ Database already has slot data.');
      return;
    }

    // Execute SQL directly to bypass RLS
    const initSQL = `
      -- Insert providers if they don't exist
      INSERT INTO providers (name, slug, description, founded_year, country, is_active)
      SELECT * FROM (
        VALUES 
          ('NetEnt', 'netent', 'Leading provider of premium gaming solutions', 1996, 'Sweden', true),
          ('Microgaming', 'microgaming', 'Pioneer in online gaming software', 1994, 'Isle of Man', true),
          ('Play''n GO', 'playngo', 'Mobile-first game developer', 1997, 'Sweden', true),
          ('Pragmatic Play', 'pragmatic-play', 'Multi-product content provider', 2015, 'Malta', true)
      ) AS v(name, slug, description, founded_year, country, is_active)
      WHERE NOT EXISTS (SELECT 1 FROM providers WHERE slug = v.slug);

      -- Insert categories if they don't exist
      INSERT INTO slot_categories (name, slug, description)
      SELECT * FROM (
        VALUES 
          ('Video Slots', 'video-slots', 'Modern video slot machines'),
          ('Classic Slots', 'classic-slots', 'Traditional 3-reel slots'),
          ('Jackpot Slots', 'jackpot-slots', 'Progressive and fixed jackpot games')
      ) AS v(name, slug, description)
      WHERE NOT EXISTS (SELECT 1 FROM slot_categories WHERE slug = v.slug);

      -- Insert slots if they don't exist
      INSERT INTO slots (name, slug, provider_id, category_id, description, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, is_active)
      SELECT 
        v.name, v.slug, p.id, c.id, v.description, v.rtp, v.volatility, v.min_bet, v.max_bet, v.reels, v.rows, v.theme, v.release_date, v.rating, v.is_active
      FROM (
        VALUES 
          ('Starburst', 'starburst', 'netent', 'video-slots', 'Classic NetEnt slot with expanding wilds and re-spins', 96.09, 'low', 0.10, 100.00, 5, 3, 'Space/Gems', '2012-01-01'::date, 8.5, true),
          ('Book of Dead', 'book-of-dead', 'playngo', 'video-slots', 'Egyptian-themed adventure slot with expanding symbols', 96.21, 'high', 0.01, 100.00, 5, 3, 'Ancient Egypt', '2016-01-01'::date, 9.0, true),
          ('Mega Moolah', 'mega-moolah', 'microgaming', 'jackpot-slots', 'Famous progressive jackpot slot with African safari theme', 88.12, 'medium', 0.25, 6.25, 5, 3, 'African Safari', '2006-01-01'::date, 8.8, true),
          ('Gonzo''s Quest', 'gonzos-quest', 'netent', 'video-slots', 'Adventure slot with cascading reels and multipliers', 95.97, 'medium', 0.20, 50.00, 5, 3, 'Adventure', '2010-01-01'::date, 8.7, true),
          ('Immortal Romance', 'immortal-romance', 'microgaming', 'video-slots', 'Vampire-themed slot with multiple bonus features', 96.86, 'medium', 0.30, 6.00, 5, 3, 'Vampire/Romance', '2011-01-01'::date, 8.9, true)
      ) AS v(name, slug, provider_slug, category_slug, description, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, is_active)
      JOIN providers p ON p.slug = v.provider_slug
      JOIN slot_categories c ON c.slug = v.category_slug
      WHERE NOT EXISTS (SELECT 1 FROM slots WHERE slug = v.slug);
    `;

    console.log('📦 Executing SQL initialization...');
    const { error } = await supabase.rpc('exec_sql', { sql: initSQL });

    if (error) {
      console.error('❌ Error executing SQL:', error);

      // Fallback: try inserting data step by step
      console.log('🔄 Trying alternative approach...');
      await insertDataStepByStep();
    } else {
      console.log('✅ Database initialized successfully!');
    }
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    console.log('🔄 Trying alternative approach...');
    await insertDataStepByStep();
  }
}

async function insertDataStepByStep() {
  try {
    // Create a simple test slot without foreign key constraints
    console.log('📦 Creating test data...');

    // First, let's just try to read from the tables to see what's available
    const { data: providers } = await supabase.from('providers').select('*');
    const { data: categories } = await supabase
      .from('slot_categories')
      .select('*');

    console.log('Existing providers:', providers?.length || 0);
    console.log('Existing categories:', categories?.length || 0);

    if (!providers || providers.length === 0) {
      console.log(
        '⚠️  No providers found. Database may need to be initialized manually.',
      );
      console.log(
        'Please run the SQL script from supabase_init.sql in your Supabase dashboard.',
      );
    }
  } catch (error) {
    console.error('❌ Alternative approach failed:', error);
  }
}

// Run the initialization
initDatabase();
