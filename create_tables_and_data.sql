-- Создание таблиц и добавление тестовых данных
-- Выполните этот скрипт в SQL Editor в Supabase Dashboard

-- Создание таблицы провайдеров
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

-- Создание таблицы категорий слотов
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

-- Создание таблицы слотов
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

-- Отключение RLS для всех таблиц (для упрощения)
ALTER TABLE providers DISABLE ROW LEVEL SECURITY;
ALTER TABLE slot_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE slots DISABLE ROW LEVEL SECURITY;

-- Добавление тестовых данных

-- Провайдеры
INSERT INTO providers (name, slug, description, founded_year, country) VALUES
('NetEnt', 'netent', 'Leading provider of premium gaming solutions', 1996, 'Sweden'),
('Microgaming', 'microgaming', 'Pioneer in online gaming software', 1994, 'Isle of Man'),
('Pragmatic Play', 'pragmatic-play', 'Multi-product content provider', 2015, 'Malta'),
('Play''n GO', 'play-n-go', 'Swedish game developer', 1997, 'Sweden'),
('Evolution Gaming', 'evolution-gaming', 'Live casino specialist', 2006, 'Sweden')
ON CONFLICT (slug) DO NOTHING;

-- Категории
INSERT INTO slot_categories (name, slug, description) VALUES
('Video Slots', 'video-slots', 'Modern video slot machines'),
('Jackpot Slots', 'jackpot-slots', 'Progressive and fixed jackpot games'),
('Classic Slots', 'classic-slots', 'Traditional 3-reel slot machines'),
('Megaways', 'megaways', 'Slots with Megaways mechanics'),
('Bonus Buy', 'bonus-buy', 'Slots with bonus buy feature')
ON CONFLICT (slug) DO NOTHING;

-- Слоты
INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
SELECT 
  'Starburst', 'starburst', p.id, c.id, 
  'Classic NetEnt slot with expanding wilds and re-spins', 
  'https://picsum.photos/300/200?random=1', 
  96.09, 'low', 0.10, 100.00, '50000x', 5, 3, 'Space', 
  '2012-01-01', 8.5, 25000
FROM providers p, slot_categories c 
WHERE p.slug = 'netent' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
SELECT 
  'Mega Moolah', 'mega-moolah', p.id, c.id, 
  'Famous progressive jackpot slot with life-changing wins', 
  'https://picsum.photos/300/200?random=2', 
  88.12, 'medium', 0.25, 6.25, 'Progressive', 5, 3, 'Safari', 
  '2006-01-01', 8.8, 32000
FROM providers p, slot_categories c 
WHERE p.slug = 'microgaming' AND c.slug = 'jackpot-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
SELECT 
  'Sweet Bonanza', 'sweet-bonanza', p.id, c.id, 
  'Candy-themed slot with tumble feature and multipliers', 
  'https://picsum.photos/300/200?random=3', 
  96.51, 'high', 0.20, 125.00, '21100x', 6, 5, 'Candy', 
  '2019-01-01', 8.6, 16800
FROM providers p, slot_categories c 
WHERE p.slug = 'pragmatic-play' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
SELECT 
  'Book of Dead', 'book-of-dead', p.id, c.id, 
  'Egyptian adventure with expanding symbols', 
  'https://picsum.photos/300/200?random=4', 
  96.21, 'high', 0.01, 100.00, '5000x', 5, 3, 'Egypt', 
  '2016-01-01', 8.7, 28500
FROM providers p, slot_categories c 
WHERE p.slug = 'play-n-go' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
SELECT 
  'Gonzo''s Quest', 'gonzos-quest', p.id, c.id, 
  'Adventure slot with avalanche feature', 
  'https://picsum.photos/300/200?random=5', 
  95.97, 'medium', 0.20, 50.00, '2500x', 5, 3, 'Adventure', 
  '2010-01-01', 8.4, 22100
FROM providers p, slot_categories c 
WHERE p.slug = 'netent' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
SELECT 
  'Gates of Olympus', 'gates-of-olympus', p.id, c.id, 
  'Greek mythology slot with multipliers', 
  'https://picsum.photos/300/200?random=6', 
  96.50, 'high', 0.20, 125.00, '5000x', 6, 5, 'Mythology', 
  '2021-01-01', 8.9, 19200
FROM providers p, slot_categories c 
WHERE p.slug = 'pragmatic-play' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

-- Обновление featured слотов
UPDATE slots SET is_featured = true WHERE slug IN ('starburst', 'mega-moolah', 'sweet-bonanza', 'gates-of-olympus');

-- Создание индексов для производительности
CREATE INDEX IF NOT EXISTS idx_slots_provider_id ON slots(provider_id);
CREATE INDEX IF NOT EXISTS idx_slots_category_id ON slots(category_id);
CREATE INDEX IF NOT EXISTS idx_slots_is_active ON slots(is_active);
CREATE INDEX IF NOT EXISTS idx_slots_is_featured ON slots(is_featured);
CREATE INDEX IF NOT EXISTS idx_slots_rating ON slots(rating);

SELECT 'Database setup completed successfully!' as result;