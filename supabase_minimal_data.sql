-- Минимальный SQL скрипт для быстрого тестирования
-- Выполните этот скрипт в SQL Editor дашборда Supabase

-- 1. Провайдеры
INSERT INTO providers (name, slug, description, founded_year, country, is_active) VALUES
('NetEnt', 'netent', 'Leading provider of premium gaming solutions', 1996, 'Sweden', true),
('Microgaming', 'microgaming', 'Pioneer in online gaming software', 1994, 'Isle of Man', true),
('Pragmatic Play', 'pragmatic-play', 'Multi-product content provider', 2015, 'Malta', true)
ON CONFLICT (slug) DO NOTHING;

-- 2. Категории
INSERT INTO slot_categories (name, slug, description) VALUES
('Video Slots', 'video-slots', 'Modern video slot machines'),
('Jackpot Slots', 'jackpot-slots', 'Progressive and fixed jackpot games')
ON CONFLICT (slug) DO NOTHING;

-- 3. Слоты
INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Starburst', 'starburst', p.id, c.id, 
    'Classic NetEnt slot with expanding wilds', 
    'https://via.placeholder.com/300x200?text=Starburst',
    96.09, 'low', 0.10, 100.00, 5, 3, 'Space', 
    '2012-01-01', 8.5, 25000, true
FROM providers p, slot_categories c 
WHERE p.slug = 'netent' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Mega Moolah', 'mega-moolah', p.id, c.id, 
    'Famous progressive jackpot slot', 
    'https://via.placeholder.com/300x200?text=Mega+Moolah',
    88.12, 'medium', 0.25, 6.25, 5, 3, 'Safari', 
    '2006-01-01', 8.8, 32000, true
FROM providers p, slot_categories c 
WHERE p.slug = 'microgaming' AND c.slug = 'jackpot-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Sweet Bonanza', 'sweet-bonanza', p.id, c.id, 
    'Candy-themed slot with tumble feature', 
    'https://via.placeholder.com/300x200?text=Sweet+Bonanza',
    96.51, 'high', 0.20, 125.00, 6, 5, 'Candy', 
    '2019-01-01', 8.6, 16800, true
FROM providers p, slot_categories c 
WHERE p.slug = 'pragmatic-play' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

-- Проверка
SELECT 'Providers' as table_name, COUNT(*) as count FROM providers
UNION ALL
SELECT 'Categories', COUNT(*) FROM slot_categories
UNION ALL
SELECT 'Slots', COUNT(*) FROM slots;

SELECT '✅ Минимальные тестовые данные добавлены!' as result;