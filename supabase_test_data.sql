-- SQL скрипт для заполнения базы данных SlotQuest тестовыми данными
-- Выполните этот скрипт в SQL Editor дашборда Supabase

-- Очистка существующих данных (опционально)
-- DELETE FROM user_ratings;
-- DELETE FROM reviews;
-- DELETE FROM casino_slots;
-- DELETE FROM slots;
-- DELETE FROM casinos;
-- DELETE FROM slot_categories;
-- DELETE FROM providers;
-- DELETE FROM articles;

-- Вставка провайдеров
INSERT INTO providers (name, slug, description, founded_year, country, is_active) VALUES
('NetEnt', 'netent', 'Leading provider of premium gaming solutions', 1996, 'Sweden', true),
('Microgaming', 'microgaming', 'Pioneer in online gaming software', 1994, 'Isle of Man', true),
('Play''n GO', 'playngo', 'Mobile-first game developer', 1997, 'Sweden', true),
('Pragmatic Play', 'pragmatic-play', 'Multi-product content provider', 2015, 'Malta', true),
('Evolution Gaming', 'evolution-gaming', 'Live casino specialist', 2006, 'Sweden', true),
('Yggdrasil', 'yggdrasil', 'Innovative gaming solutions', 2013, 'Malta', true),
('Red Tiger', 'red-tiger', 'Creative slot developer', 2014, 'Isle of Man', true),
('Big Time Gaming', 'big-time-gaming', 'Creator of Megaways mechanics', 2011, 'Australia', true)
ON CONFLICT (slug) DO NOTHING;

-- Вставка категорий слотов
INSERT INTO slot_categories (name, slug, description) VALUES
('Video Slots', 'video-slots', 'Modern video slot machines'),
('Classic Slots', 'classic-slots', 'Traditional 3-reel slots'),
('Jackpot Slots', 'jackpot-slots', 'Progressive and fixed jackpot games'),
('Megaways', 'megaways', 'Slots with Megaways mechanics'),
('Branded Slots', 'branded-slots', 'Slots based on movies, TV shows, etc.'),
('Fruit Slots', 'fruit-slots', 'Classic fruit-themed slots'),
('Adventure Slots', 'adventure-slots', 'Adventure and exploration themed slots')
ON CONFLICT (slug) DO NOTHING;

-- Вставка казино
INSERT INTO casinos (name, slug, website_url, country, rating, languages, currencies, is_active) VALUES
('LeoVegas', 'leovegas', 'https://www.leovegas.com', 'Malta', 8.5, ARRAY['en', 'sv', 'fi', 'no'], ARRAY['EUR', 'USD', 'SEK'], true),
('Casumo', 'casumo', 'https://www.casumo.com', 'Malta', 8.2, ARRAY['en', 'sv', 'fi'], ARRAY['EUR', 'USD'], true),
('Mr Green', 'mr-green', 'https://www.mrgreen.com', 'Malta', 7.8, ARRAY['en', 'sv', 'de'], ARRAY['EUR', 'USD'], true),
('Betsson', 'betsson', 'https://www.betsson.com', 'Malta', 8.0, ARRAY['en', 'sv', 'fi', 'no'], ARRAY['EUR', 'USD'], true),
('Unibet', 'unibet', 'https://www.unibet.com', 'Malta', 7.9, ARRAY['en', 'sv', 'de', 'fr'], ARRAY['EUR', 'USD'], true),
('888 Casino', '888-casino', 'https://www.888casino.com', 'Gibraltar', 7.6, ARRAY['en', 'de', 'es'], ARRAY['EUR', 'USD', 'GBP'], true)
ON CONFLICT (slug) DO NOTHING;

-- Вставка слотов с использованием подзапросов для получения ID провайдеров и категорий
INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Starburst', 'starburst', p.id, c.id, 
    'Classic NetEnt slot with expanding wilds and re-spins', 
    'https://via.placeholder.com/300x200?text=Starburst',
    96.09, 'low', 0.10, 100.00, 5, 3, 'Space/Gems', 
    '2012-01-01', 8.5, 25000, true
FROM providers p, slot_categories c 
WHERE p.slug = 'netent' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Book of Dead', 'book-of-dead', p.id, c.id, 
    'Egyptian-themed adventure slot with expanding symbols', 
    'https://via.placeholder.com/300x200?text=Book+of+Dead',
    96.21, 'high', 0.01, 100.00, 5, 3, 'Ancient Egypt', 
    '2016-01-01', 9.0, 18500, true
FROM providers p, slot_categories c 
WHERE p.slug = 'playngo' AND c.slug = 'adventure-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Mega Moolah', 'mega-moolah', p.id, c.id, 
    'Famous progressive jackpot slot with African safari theme', 
    'https://via.placeholder.com/300x200?text=Mega+Moolah',
    88.12, 'medium', 0.25, 6.25, 5, 3, 'African Safari', 
    '2006-01-01', 8.8, 32000, true
FROM providers p, slot_categories c 
WHERE p.slug = 'microgaming' AND c.slug = 'jackpot-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Gonzo''s Quest', 'gonzos-quest', p.id, c.id, 
    'Adventure slot with cascading reels and multipliers', 
    'https://via.placeholder.com/300x200?text=Gonzo%27s+Quest',
    95.97, 'medium', 0.20, 50.00, 5, 3, 'Adventure', 
    '2010-01-01', 8.7, 19200, true
FROM providers p, slot_categories c 
WHERE p.slug = 'netent' AND c.slug = 'adventure-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Immortal Romance', 'immortal-romance', p.id, c.id, 
    'Vampire-themed slot with multiple bonus features', 
    'https://via.placeholder.com/300x200?text=Immortal+Romance',
    96.86, 'medium', 0.30, 6.00, 5, 3, 'Vampire/Romance', 
    '2011-01-01', 8.9, 21300, true
FROM providers p, slot_categories c 
WHERE p.slug = 'microgaming' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Sweet Bonanza', 'sweet-bonanza', p.id, c.id, 
    'Colorful candy-themed slot with tumble feature', 
    'https://via.placeholder.com/300x200?text=Sweet+Bonanza',
    96.51, 'high', 0.20, 125.00, 6, 5, 'Candy/Sweets', 
    '2019-01-01', 8.6, 16800, true
FROM providers p, slot_categories c 
WHERE p.slug = 'pragmatic-play' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Reactoonz', 'reactoonz', p.id, c.id, 
    'Alien-themed cluster pays slot with cascading wins', 
    'https://via.placeholder.com/300x200?text=Reactoonz',
    96.51, 'high', 0.20, 100.00, 7, 7, 'Aliens/Space', 
    '2017-01-01', 8.4, 14200, true
FROM providers p, slot_categories c 
WHERE p.slug = 'playngo' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Bonanza', 'bonanza', p.id, c.id, 
    'Mining-themed Megaways slot with up to 117,649 ways to win', 
    'https://via.placeholder.com/300x200?text=Bonanza',
    96.00, 'high', 0.20, 20.00, 6, 7, 'Mining/Gold Rush', 
    '2016-01-01', 9.1, 28500, true
FROM providers p, slot_categories c 
WHERE p.slug = 'big-time-gaming' AND c.slug = 'megaways'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Vikings Go Berzerk', 'vikings-go-berzerk', p.id, c.id, 
    'Viking-themed slot with sticky wilds and free spins', 
    'https://via.placeholder.com/300x200?text=Vikings+Go+Berzerk',
    96.10, 'medium', 0.25, 100.00, 5, 4, 'Vikings/Norse', 
    '2016-01-01', 8.3, 12700, true
FROM providers p, slot_categories c 
WHERE p.slug = 'yggdrasil' AND c.slug = 'video-slots'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, reels, rows, theme, release_date, rating, play_count, is_active) 
SELECT 
    'Pirates'' Plenty', 'pirates-plenty', p.id, c.id, 
    'Pirate adventure with expanding reels and wild islands', 
    'https://via.placeholder.com/300x200?text=Pirates+Plenty',
    96.12, 'medium', 0.20, 100.00, 5, 3, 'Pirates/Adventure', 
    '2018-01-01', 8.2, 11400, true
FROM providers p, slot_categories c 
WHERE p.slug = 'red-tiger' AND c.slug = 'adventure-slots'
ON CONFLICT (slug) DO NOTHING;

-- Связи казино и слотов
INSERT INTO casino_slots (casino_id, slot_id, is_available, demo_url, real_play_url)
SELECT c.id, s.id, true, 
       'https://demo.example.com/' || s.slug,
       'https://play.example.com/' || s.slug
FROM casinos c, slots s
WHERE c.slug IN ('leovegas', 'casumo', 'mr-green')
ON CONFLICT (casino_id, slot_id) DO NOTHING;

-- Обзоры слотов
INSERT INTO reviews (slot_id, title, content, rating, pros, cons, author_name, is_featured, is_published)
SELECT s.id, 
       'Обзор ' || s.name,
       'Подробный обзор слота ' || s.name || '. Этот слот предлагает отличную игровую механику и высокое качество графики.',
       s.rating,
       ARRAY['Высокий RTP', 'Отличная графика', 'Интересные бонусы'],
       ARRAY['Высокая волатильность', 'Долгие периоды без выигрышей'],
       'Игровой эксперт',
       CASE WHEN s.rating >= 8.5 THEN true ELSE false END,
       true
FROM slots s
WHERE s.slug IN ('starburst', 'book-of-dead', 'bonanza')
ON CONFLICT DO NOTHING;

-- Пользовательские рейтинги
INSERT INTO user_ratings (slot_id, user_ip, rating, comment)
SELECT s.id, 
       '192.168.1.' || (RANDOM() * 254 + 1)::INTEGER,
       (RANDOM() * 4 + 1)::INTEGER,
       'Отличный слот, рекомендую!'
FROM slots s
CROSS JOIN generate_series(1, 3)
ON CONFLICT (slot_id, user_ip) DO NOTHING;

-- Статьи
INSERT INTO articles (title, slug, content, excerpt, author_name, tags, is_published, is_featured, published_at) VALUES
('Лучшие слоты 2024 года', 'best-slots-2024', 
 'В этой статье мы рассмотрим лучшие игровые автоматы 2024 года, их особенности и преимущества.',
 'Обзор топовых слотов текущего года',
 'Редакция SlotQuest',
 ARRAY['слоты', 'обзор', '2024'],
 true, true, NOW()),
('Как выбрать онлайн казино', 'how-to-choose-casino',
 'Подробное руководство по выбору надежного онлайн казино для игры в слоты.',
 'Советы по выбору казино',
 'Игровой эксперт',
 ARRAY['казино', 'советы', 'безопасность'],
 true, false, NOW()),
('RTP в игровых автоматах', 'rtp-explained',
 'Что такое RTP и как этот показатель влияет на ваши шансы на выигрыш в слотах.',
 'Объяснение показателя возврата игроку',
 'Математик казино',
 ARRAY['RTP', 'математика', 'теория'],
 true, false, NOW() - INTERVAL '1 day')
ON CONFLICT (slug) DO NOTHING;

-- Обновление счетчиков play_count для реалистичности
UPDATE slots SET play_count = play_count + (RANDOM() * 5000)::INTEGER;

-- Обновление рейтингов слотов на основе пользовательских оценок
UPDATE slots SET rating = (
    SELECT AVG(rating::DECIMAL) 
    FROM user_ratings 
    WHERE user_ratings.slot_id = slots.id
) * 2 -- Умножаем на 2, так как пользовательские рейтинги от 1 до 5, а слоты от 1 до 10
WHERE id IN (
    SELECT DISTINCT slot_id FROM user_ratings
);

SELECT 'Тестовые данные успешно добавлены!' as result;