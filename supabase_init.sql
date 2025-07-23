-- SlotQuest Database Schema for Supabase
-- Casino slots review platform similar to Casino Guru

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Providers table (игровые провайдеры)
CREATE TABLE providers (
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

-- Casinos table (онлайн казино)
CREATE TABLE casinos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    logo_url VARCHAR(500),
    website_url VARCHAR(500) NOT NULL,
    license_info TEXT,
    country VARCHAR(100),
    languages TEXT[], -- массив поддерживаемых языков
    currencies TEXT[], -- массив поддерживаемых валют
    rating DECIMAL(3,2) DEFAULT 0.00, -- рейтинг от 0.00 до 10.00
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Slot categories (категории слотов)
CREATE TABLE slot_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Slots table (игровые слоты)
CREATE TABLE slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    category_id UUID REFERENCES slot_categories(id),
    description TEXT,
    thumbnail_url VARCHAR(500),
    screenshots TEXT[], -- массив URL скриншотов
    rtp DECIMAL(5,2), -- Return to Player percentage (например, 96.50)
    volatility VARCHAR(20) CHECK (volatility IN ('low', 'medium', 'high')),
    min_bet DECIMAL(10,2),
    max_bet DECIMAL(10,2),
    max_win DECIMAL(15,2),
    paylines INTEGER,
    reels INTEGER DEFAULT 5,
    rows INTEGER DEFAULT 3,
    theme VARCHAR(255),
    features TEXT[], -- массив особенностей (free spins, bonus rounds, etc.)
    release_date DATE,
    is_mobile_compatible BOOLEAN DEFAULT true,
    is_demo_available BOOLEAN DEFAULT true,
    rating DECIMAL(3,2) DEFAULT 0.00,
    play_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Casino slots (связь казино и слотов)
CREATE TABLE casino_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    casino_id UUID NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
    slot_id UUID NOT NULL REFERENCES slots(id) ON DELETE CASCADE,
    is_available BOOLEAN DEFAULT true,
    demo_url VARCHAR(500),
    real_play_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(casino_id, slot_id)
);

-- Reviews table (обзоры слотов)
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slot_id UUID NOT NULL REFERENCES slots(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating DECIMAL(3,2) NOT NULL CHECK (rating >= 0 AND rating <= 10),
    pros TEXT[],
    cons TEXT[],
    author_name VARCHAR(255),
    author_email VARCHAR(255),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User ratings (пользовательские оценки)
CREATE TABLE user_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slot_id UUID NOT NULL REFERENCES slots(id) ON DELETE CASCADE,
    user_ip VARCHAR(45), -- для анонимных пользователей
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(slot_id, user_ip)
);

-- News/Articles table (новости и статьи)
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(500),
    author_name VARCHAR(255),
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_slots_provider_id ON slots(provider_id);
CREATE INDEX idx_slots_category_id ON slots(category_id);
CREATE INDEX idx_slots_rating ON slots(rating DESC);
CREATE INDEX idx_slots_rtp ON slots(rtp DESC);
CREATE INDEX idx_slots_release_date ON slots(release_date DESC);
CREATE INDEX idx_slots_is_active ON slots(is_active);
CREATE INDEX idx_casino_slots_casino_id ON casino_slots(casino_id);
CREATE INDEX idx_casino_slots_slot_id ON casino_slots(slot_id);
CREATE INDEX idx_reviews_slot_id ON reviews(slot_id);
CREATE INDEX idx_reviews_is_published ON reviews(is_published);
CREATE INDEX idx_user_ratings_slot_id ON user_ratings(slot_id);
CREATE INDEX idx_articles_is_published ON articles(is_published);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);

-- Insert sample data

-- Sample providers
INSERT INTO providers (name, slug, description, founded_year, country) VALUES
('NetEnt', 'netent', 'Leading provider of premium gaming solutions', 1996, 'Sweden'),
('Microgaming', 'microgaming', 'Pioneer in online gaming software', 1994, 'Isle of Man'),
('Play''n GO', 'playngo', 'Mobile-first game developer', 1997, 'Sweden'),
('Pragmatic Play', 'pragmatic-play', 'Multi-product content provider', 2015, 'Malta'),
('Evolution Gaming', 'evolution-gaming', 'Live casino specialist', 2006, 'Sweden');

-- Sample categories
INSERT INTO slot_categories (name, slug, description) VALUES
('Video Slots', 'video-slots', 'Modern video slot machines'),
('Classic Slots', 'classic-slots', 'Traditional 3-reel slots'),
('Jackpot Slots', 'jackpot-slots', 'Progressive and fixed jackpot games'),
('Megaways', 'megaways', 'Slots with Megaways mechanics'),
('Branded Slots', 'branded-slots', 'Slots based on movies, TV shows, etc.');

-- Sample casinos
INSERT INTO casinos (name, slug, website_url, country, rating) VALUES
('LeoVegas', 'leovegas', 'https://www.leovegas.com', 'Malta', 8.5),
('Casumo', 'casumo', 'https://www.casumo.com', 'Malta', 8.2),
('Mr Green', 'mr-green', 'https://www.mrgreen.com', 'Malta', 7.8),
('Betsson', 'betsson', 'https://www.betsson.com', 'Malta', 8.0),
('Unibet', 'unibet', 'https://www.unibet.com', 'Malta', 7.9);

-- Sample slots (using provider and category IDs)
INSERT INTO slots (name, slug, provider_id, category_id, description, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating) 
SELECT 
    'Starburst', 'starburst', p.id, c.id, 
    'Classic NetEnt slot with expanding wilds and re-spins', 
    96.09, 'low', 0.10, 100.00, 5, 3, 'Space/Gems', 
    '2012-01-01', 8.5
FROM providers p, slot_categories c 
WHERE p.slug = 'netent' AND c.slug = 'video-slots';

INSERT INTO slots (name, slug, provider_id, category_id, description, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating) 
SELECT 
    'Book of Dead', 'book-of-dead', p.id, c.id, 
    'Egyptian-themed adventure slot with expanding symbols', 
    96.21, 'high', 0.01, 100.00, 5, 3, 'Ancient Egypt', 
    '2016-01-01', 9.0
FROM providers p, slot_categories c 
WHERE p.slug = 'playngo' AND c.slug = 'video-slots';

INSERT INTO slots (name, slug, provider_id, category_id, description, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating) 
SELECT 
    'Mega Moolah', 'mega-moolah', p.id, c.id, 
    'Famous progressive jackpot slot with African safari theme', 
    88.12, 'medium', 0.25, 6.25, 5, 3, 'African Safari', 
    '2006-01-01', 8.8
FROM providers p, slot_categories c 
WHERE p.slug = 'microgaming' AND c.slug = 'jackpot-slots';

-- Update functions for timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_casinos_updated_at BEFORE UPDATE ON casinos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_slots_updated_at BEFORE UPDATE ON slots FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();