-- Быстрая настройка базы данных SlotQuest
-- Выполните этот скрипт в SQL Editor дашборда Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Providers table (игровые провайдеры)
CREATE TABLE IF NOT EXISTS providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    founded_year INTEGER,
    country VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Slot categories (категории слотов)
CREATE TABLE IF NOT EXISTS slot_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Slots table (игровые слоты)
CREATE TABLE IF NOT EXISTS slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    category_id UUID REFERENCES slot_categories(id),
    description TEXT,
    thumbnail_url VARCHAR(500),
    screenshots TEXT[],
    rtp DECIMAL(5,2),
    volatility VARCHAR(20) CHECK (volatility IN ('low', 'medium', 'high')),
    min_bet DECIMAL(10,2),
    max_bet DECIMAL(10,2),
    max_win DECIMAL(15,2),
    paylines INTEGER,
    reels INTEGER DEFAULT 5,
    rows INTEGER DEFAULT 3,
    theme VARCHAR(255),
    features TEXT[],
    release_date DATE,
    is_mobile_compatible BOOLEAN DEFAULT true,
    is_demo_available BOOLEAN DEFAULT true,
    rating DECIMAL(3,2) DEFAULT 0.00,
    play_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_slots_provider_id ON slots(provider_id);
CREATE INDEX IF NOT EXISTS idx_slots_category_id ON slots(category_id);
CREATE INDEX IF NOT EXISTS idx_slots_rating ON slots(rating DESC);
CREATE INDEX IF NOT EXISTS idx_slots_is_active ON slots(is_active);

-- Insert sample data

-- Providers
INSERT INTO providers (name, slug, description, founded_year, country, is_active) VALUES
('NetEnt', 'netent', 'Leading provider of premium gaming solutions', 1996, 'Sweden', true),
('Microgaming', 'microgaming', 'Pioneer in online gaming software', 1994, 'Isle of Man', true),
('Pragmatic Play', 'pragmatic-play', 'Multi-product content provider', 2015, 'Malta', true),
('Play''n GO', 'playngo', 'Mobile-first game developer', 1997, 'Sweden', true)
ON CONFLICT (slug) DO NOTHING;

-- Categories
INSERT INTO slot_categories (name, slug, description) VALUES
('Video Slots', 'video-slots', 'Modern video slot machines'),
('Classic Slots', 'classic-slots', 'Traditional 3-reel slots'),
('Jackpot Slots', 'jackpot-slots', 'Progressive and fixed jackpot games')
ON CONFLICT (slug) DO NOTHING;

-- Slots
INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Starburst', 'starburst', p.id, c.id, 
    'Classic NetEnt slot with expanding wilds and re-spins', 
    'https://picsum.photos/300/200?random=1',
    96.09, 'low', 0.10, 100.00, 5, 3, 'Space/Gems', 
    '2012-01-01', 8.5, 25000, true
FROM providers p, slot_categories c 
WHERE p.slug = 'netent' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Book of Dead', 'book-of-dead', p.id, c.id, 
    'Egyptian-themed adventure slot with expanding symbols', 
    'https://picsum.photos/300/200?random=2',
    96.21, 'high', 0.01, 100.00, 5, 3, 'Ancient Egypt', 
    '2016-01-01', 9.0, 18500, true
FROM providers p, slot_categories c 
WHERE p.slug = 'playngo' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Mega Moolah', 'mega-moolah', p.id, c.id, 
    'Famous progressive jackpot slot with African safari theme', 
    'https://picsum.photos/300/200?random=3',
    88.12, 'medium', 0.25, 6.25, 5, 3, 'African Safari', 
    '2006-01-01', 8.8, 32000, true
FROM providers p, slot_categories c 
WHERE p.slug = 'microgaming' AND c.slug = 'jackpot-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Sweet Bonanza', 'sweet-bonanza', p.id, c.id, 
    'Candy-themed slot with tumble feature and multipliers', 
    'https://picsum.photos/300/200?random=6',
    96.51, 'high', 0.20, 125.00, 6, 5, 'Candy/Sweets', 
    '2019-01-01', 8.6, 16800, true
FROM providers p, slot_categories c 
WHERE p.slug = 'pragmatic-play' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Gonzo''s Quest', 'gonzos-quest', p.id, c.id, 
    'Adventure slot with avalanche feature and increasing multipliers', 
    'https://picsum.photos/300/200?random=4',
    95.97, 'medium', 0.20, 50.00, 5, 3, 'Adventure/Aztec', 
    '2010-01-01', 8.7, 22000, true
FROM providers p, slot_categories c 
WHERE p.slug = 'netent' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

-- Проверка результатов
SELECT 'Providers' as table_name, COUNT(*) as count FROM providers
UNION ALL
SELECT 'Categories', COUNT(*) FROM slot_categories
UNION ALL
SELECT 'Slots', COUNT(*) FROM slots;

SELECT '✅ База данных SlotQuest настроена! Теперь перезапустите backend сервер.' as result;