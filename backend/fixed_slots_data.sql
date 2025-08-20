-- Простые INSERT запросы для слотов
-- Сначала получим ID провайдеров и категорий

-- NetEnt + Video Slots
INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
VALUES (
  'Starburst', 'starburst', 
  (SELECT id FROM providers WHERE slug = 'netent' LIMIT 1),
  (SELECT id FROM slot_categories WHERE slug = 'video-slots' LIMIT 1),
  'Classic NetEnt slot with expanding wilds and re-spins', 
  'https://picsum.photos/300/200?random=1', 
  96.09, 'low', 0.10, 100.00, 50000.00, 5, 3, 'Space', 
  '2012-01-01', 8.5, 25000
)
ON CONFLICT (slug) DO NOTHING;

-- Microgaming + Jackpot Slots
INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
VALUES (
  'Mega Moolah', 'mega-moolah', 
  (SELECT id FROM providers WHERE slug = 'microgaming' LIMIT 1),
  (SELECT id FROM slot_categories WHERE slug = 'jackpot-slots' LIMIT 1),
  'Famous progressive jackpot slot with life-changing wins', 
  'https://picsum.photos/300/200?random=2', 
  88.12, 'medium', 0.25, 6.25, 1000000.00, 5, 3, 'Safari', 
  '2006-01-01', 8.8, 32000
)
ON CONFLICT (slug) DO NOTHING;

-- Pragmatic Play + Video Slots
INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
VALUES (
  'Sweet Bonanza', 'sweet-bonanza', 
  (SELECT id FROM providers WHERE slug = 'pragmatic-play' LIMIT 1),
  (SELECT id FROM slot_categories WHERE slug = 'video-slots' LIMIT 1),
  'Candy-themed slot with tumble feature and multipliers', 
  'https://picsum.photos/300/200?random=3', 
  96.51, 'high', 0.20, 125.00, 21100.00, 6, 5, 'Candy', 
  '2019-01-01', 8.6, 16800
)
ON CONFLICT (slug) DO NOTHING;

-- Play'n GO + Video Slots
INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
VALUES (
  'Book of Dead', 'book-of-dead', 
  (SELECT id FROM providers WHERE slug = 'play-n-go' LIMIT 1),
  (SELECT id FROM slot_categories WHERE slug = 'video-slots' LIMIT 1),
  'Egyptian adventure with expanding symbols', 
  'https://picsum.photos/300/200?random=4', 
  96.21, 'high', 0.01, 100.00, 5000.00, 5, 3, 'Egypt', 
  '2016-01-01', 8.7, 28500
)
ON CONFLICT (slug) DO NOTHING;

-- NetEnt + Video Slots
INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
VALUES (
  'Gonzos Quest', 'gonzos-quest', 
  (SELECT id FROM providers WHERE slug = 'netent' LIMIT 1),
  (SELECT id FROM slot_categories WHERE slug = 'video-slots' LIMIT 1),
  'Adventure slot with avalanche feature', 
  'https://picsum.photos/300/200?random=5', 
  95.97, 'medium', 0.20, 50.00, 2500.00, 5, 3, 'Adventure', 
  '2010-01-01', 8.4, 22100
)
ON CONFLICT (slug) DO NOTHING;

-- Pragmatic Play + Video Slots
INSERT INTO slots (name, slug, provider_id, category_id, description, thumbnail_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, theme, release_date, rating, play_count) 
VALUES (
  'Gates of Olympus', 'gates-of-olympus', 
  (SELECT id FROM providers WHERE slug = 'pragmatic-play' LIMIT 1),
  (SELECT id FROM slot_categories WHERE slug = 'video-slots' LIMIT 1),
  'Greek mythology slot with multipliers', 
  'https://picsum.photos/300/200?random=6', 
  96.50, 'high', 0.20, 125.00, 5000.00, 6, 5, 'Mythology', 
  '2021-01-01', 8.9, 19200
)
ON CONFLICT (slug) DO NOTHING;