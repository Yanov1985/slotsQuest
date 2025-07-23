-- Полный SQL скрипт для заполнения базы данных SlotQuest тестовыми данными
-- Выполните этот скрипт в SQL Editor дашборда Supabase

-- Очистка таблиц (опционально)
-- DELETE FROM user_ratings;
-- DELETE FROM reviews;
-- DELETE FROM casino_slots;
-- DELETE FROM articles;
-- DELETE FROM slots;ф
-- DELETE FROM casinos;
-- DELETE FROM slot_categories;
-- DELETE FROM providers;

-- 1. Вставка провайдеров
INSERT INTO providers (name, slug, description, founded_year, country, logo_url, website_url, is_active) VALUES
('NetEnt', 'netent', 'Leading provider of premium gaming solutions to the world\'s most successful online casino operators', 1996, 'Sweden', 'https://via.placeholder.com/150x80?text=NetEnt', 'https://www.netent.com', true),
('Microgaming', 'microgaming', 'Pioneer in online gaming software since 1994', 1994, 'Isle of Man', 'https://via.placeholder.com/150x80?text=Microgaming', 'https://www.microgaming.co.uk', true),
('Pragmatic Play', 'pragmatic-play', 'Multi-product content provider for the iGaming industry', 2015, 'Malta', 'https://via.placeholder.com/150x80?text=Pragmatic', 'https://www.pragmaticplay.com', true),
('Play\'n GO', 'playn-go', 'Swedish game developer and supplier', 1997, 'Sweden', 'https://via.placeholder.com/150x80?text=PlaynGO', 'https://www.playngo.com', true),
('Evolution Gaming', 'evolution-gaming', 'Leading provider of Live Casino solutions', 2006, 'Sweden', 'https://via.placeholder.com/150x80?text=Evolution', 'https://www.evolution.com', true)
ON CONFLICT (slug) DO NOTHING;

-- 2. Вставка категорий слотов
INSERT INTO slot_categories (name, slug, description, icon_url) VALUES
('Video Slots', 'video-slots', 'Modern video slot machines with advanced graphics and features', 'https://via.placeholder.com/64x64?text=🎰'),
('Classic Slots', 'classic-slots', 'Traditional 3-reel slot machines', 'https://via.placeholder.com/64x64?text=🍒'),
('Jackpot Slots', 'jackpot-slots', 'Progressive and fixed jackpot games', 'https://via.placeholder.com/64x64?text=💰'),
('Megaways', 'megaways', 'Slots with dynamic reel system', 'https://via.placeholder.com/64x64?text=⚡'),
('Bonus Buy', 'bonus-buy', 'Slots with feature buy option', 'https://via.placeholder.com/64x64?text=🎁')
ON CONFLICT (slug) DO NOTHING;

-- 3. Вставка казино
INSERT INTO casinos (name, slug, description, website_url, license, country, rating, is_active) VALUES
('Betsson Casino', 'betsson', 'Premium online casino with extensive game selection', 'https://www.betsson.com', 'Malta Gaming Authority', 'Malta', 9.2, true),
('LeoVegas', 'leovegas', 'Mobile-first casino experience', 'https://www.leovegas.com', 'UK Gambling Commission', 'Sweden', 8.8, true),
('Casumo', 'casumo', 'Gamified casino experience', 'https://www.casumo.com', 'Malta Gaming Authority', 'Malta', 8.5, true),
('Mr Green', 'mr-green', 'The gentleman among online casinos', 'https://www.mrgreen.com', 'Malta Gaming Authority', 'Malta', 8.7, true)
ON CONFLICT (slug) DO NOTHING;

-- 4. Вставка слотов
INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, paylines, theme, release_date, rating, play_count, is_active, features)
SELECT
    'Starburst', 'starburst', p.id, c.id,
    'Classic NetEnt slot with expanding wilds and both-ways-pay feature',
    'https://via.placeholder.com/300x200?text=Starburst',
    96.09, 'low', 0.10, 100.00, 5, 3, 10, 'Space',
    '2012-01-01', 8.5, 25000, true, '["Expanding Wilds", "Both Ways Pay"]'
FROM providers p, slot_categories c
WHERE p.slug = 'netent' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, paylines, theme, release_date, rating, play_count, is_active, features)
SELECT
    'Mega Moolah', 'mega-moolah', p.id, c.id,
    'Famous progressive jackpot slot with African safari theme',
    'https://via.placeholder.com/300x200?text=Mega+Moolah',
    88.12, 'medium', 0.25, 6.25, 5, 3, 25, 'Safari',
    '2006-01-01', 8.8, 32000, true, '["Progressive Jackpot", "Free Spins", "Multipliers"]'
FROM providers p, slot_categories c
WHERE p.slug = 'microgaming' AND c.slug = 'jackpot-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, paylines, theme, release_date, rating, play_count, is_active, features)
SELECT
    'Sweet Bonanza', 'sweet-bonanza', p.id, c.id,
    'Candy-themed slot with tumble feature and multipliers',
    'https://via.placeholder.com/300x200?text=Sweet+Bonanza',
    96.51, 'high', 0.20, 125.00, 6, 5, 0, 'Candy',
    '2019-01-01', 8.6, 16800, true, '["Tumble Feature", "Multipliers", "Free Spins"]'
FROM providers p, slot_categories c
WHERE p.slug = 'pragmatic-play' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, paylines, theme, release_date, rating, play_count, is_active, features)
SELECT
    'Book of Dead', 'book-of-dead', p.id, c.id,
    'Egyptian adventure slot with expanding symbols',
    'https://via.placeholder.com/300x200?text=Book+of+Dead',
    96.21, 'high', 0.01, 100.00, 5, 3, 10, 'Egyptian',
    '2016-01-01', 8.7, 28500, true, '["Expanding Symbols", "Free Spins", "Gamble Feature"]'
FROM providers p, slot_categories c
WHERE p.slug = 'playn-go' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, paylines, theme, release_date, rating, play_count, is_active, features)
SELECT
    'Gonzo\'s Quest', 'gonzos-quest', p.id, c.id,
    'Adventure slot with avalanche feature and multipliers',
    'https://via.placeholder.com/300x200?text=Gonzos+Quest',
    95.97, 'medium', 0.20, 50.00, 5, 3, 20, 'Adventure',
    '2010-01-01', 8.4, 31200, true, '["Avalanche Reels", "Multipliers", "Free Falls"]'
FROM providers p, slot_categories c
WHERE p.slug = 'netent' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, paylines, theme, release_date, rating, play_count, is_active, features)
SELECT
    'Immortal Romance', 'immortal-romance', p.id, c.id,
    'Vampire-themed slot with multiple bonus features',
    'https://via.placeholder.com/300x200?text=Immortal+Romance',
    96.86, 'medium', 0.30, 6.00, 5, 3, 243, 'Vampire',
    '2011-01-01', 8.9, 21300, true, '["Chamber of Spins", "Wild Desire", "Free Spins"]'
FROM providers p, slot_categories c
WHERE p.slug = 'microgaming' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

-- 5. Связь казино и слотов
INSERT INTO casino_slots (casino_id, slot_id, is_featured, added_date)
SELECT c.id, s.id, true, CURRENT_DATE
FROM casinos c, slots s
WHERE c.slug IN ('betsson', 'leovegas') AND s.slug IN ('starburst', 'mega-moolah', 'sweet-bonanza')
ON CONFLICT (casino_id, slot_id) DO NOTHING;

INSERT INTO casino_slots (casino_id, slot_id, is_featured, added_date)
SELECT c.id, s.id, false, CURRENT_DATE
FROM casinos c, slots s
WHERE c.slug IN ('casumo', 'mr-green') AND s.slug IN ('book-of-dead', 'gonzos-quest', 'immortal-romance')
ON CONFLICT (casino_id, slot_id) DO NOTHING;

-- 6. Отзывы
INSERT INTO reviews (slot_id, author_name, rating, title, content, is_verified, helpful_count)
SELECT s.id, 'Alex Johnson', 9, 'Amazing classic!', 'Starburst never gets old. Simple but engaging gameplay with decent wins.', true, 15
FROM slots s WHERE s.slug = 'starburst'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (slot_id, author_name, rating, title, content, is_verified, helpful_count)
SELECT s.id, 'Maria Garcia', 10, 'Jackpot dreams!', 'Hit the mini jackpot twice! This game can really pay out big.', true, 23
FROM slots s WHERE s.slug = 'mega-moolah'
ON CONFLICT DO NOTHING;

INSERT INTO reviews (slot_id, author_name, rating, title, content, is_verified, helpful_count)
SELECT s.id, 'John Smith', 8, 'Sweet wins', 'Love the tumble feature and the multipliers. High volatility but worth it.', false, 8
FROM slots s WHERE s.slug = 'sweet-bonanza'
ON CONFLICT DO NOTHING;

-- 7. Пользовательские рейтинги
INSERT INTO user_ratings (slot_id, user_id, rating)
SELECT s.id, 'user_' || generate_random_uuid(), (random() * 5 + 5)::numeric(3,1)
FROM slots s, generate_series(1, 10)
ON CONFLICT DO NOTHING;

-- 8. Статьи
INSERT INTO articles (title, slug, content, author, category, is_published, view_count, featured_image_url) VALUES
('Top 10 Slots of 2024', 'top-10-slots-2024', 'Discover the best slot games that dominated the casino floors this year...', 'SlotQuest Team', 'reviews', true, 1250, 'https://via.placeholder.com/800x400?text=Top+Slots+2024'),
('Understanding RTP in Slot Games', 'understanding-rtp-slots', 'Learn what Return to Player percentage means and how it affects your gameplay...', 'Casino Expert', 'guides', true, 890, 'https://via.placeholder.com/800x400?text=RTP+Guide'),
('Volatility Explained: High vs Low', 'slot-volatility-explained', 'A comprehensive guide to slot volatility and how to choose the right games...', 'Math Analyst', 'guides', true, 675, 'https://via.placeholder.com/800x400?text=Volatility+Guide')
ON CONFLICT (slug) DO NOTHING;

-- Проверка результатов
SELECT 'Providers' as table_name, COUNT(*) as count FROM providers
UNION ALL
SELECT 'Categories', COUNT(*) FROM slot_categories
UNION ALL
SELECT 'Casinos', COUNT(*) FROM casinos
UNION ALL
SELECT 'Slots', COUNT(*) FROM slots
UNION ALL
SELECT 'Casino Slots', COUNT(*) FROM casino_slots
UNION ALL
SELECT 'Reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'User Ratings', COUNT(*) FROM user_ratings
UNION ALL
SELECT 'Articles', COUNT(*) FROM articles;

SELECT '✅ Тестовые данные успешно добавлены в базу данных!' as result;