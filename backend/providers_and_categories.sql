-- Добавление провайдеров и категорий

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