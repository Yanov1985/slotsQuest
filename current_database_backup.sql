-- Экспорт данных SlotQuest
-- Создано: 2025-08-20T13:53:54.138Z

-- Очистка существующих данных
DELETE FROM slots;
DELETE FROM themes;
DELETE FROM slot_categories;
DELETE FROM providers;

-- Провайдеры
INSERT INTO providers (id, name, slug, logo_url, website_url, description, created_at, updated_at) VALUES ('ec3e683d-5402-40ca-b74b-b3ff77a65c51', 'NetEnt', 'netent', NULL, NULL, 'Leading provider of premium gaming solutions', '2025-08-20T13:25:44.588Z', '2025-08-20T13:25:44.588Z');
INSERT INTO providers (id, name, slug, logo_url, website_url, description, created_at, updated_at) VALUES ('2d581f0c-c7ff-4723-abf3-2f15b7a181bb', 'Microgaming', 'microgaming', NULL, NULL, 'Pioneer in online gaming software', '2025-08-20T13:25:44.588Z', '2025-08-20T13:25:44.588Z');
INSERT INTO providers (id, name, slug, logo_url, website_url, description, created_at, updated_at) VALUES ('edc6b832-2b09-4134-a146-8d04cb0d4fe3', 'Pragmatic Play', 'pragmatic-play', NULL, NULL, 'Multi-product content provider', '2025-08-20T13:25:44.588Z', '2025-08-20T13:25:44.588Z');
INSERT INTO providers (id, name, slug, logo_url, website_url, description, created_at, updated_at) VALUES ('2f2b2209-dfc1-407b-bc24-6fb8ab2bde2d', 'Play''n GO', 'play-n-go', NULL, NULL, 'Swedish game developer', '2025-08-20T13:25:44.588Z', '2025-08-20T13:25:44.588Z');
INSERT INTO providers (id, name, slug, logo_url, website_url, description, created_at, updated_at) VALUES ('976a3d7f-e614-4b60-81ce-193a4b357ff1', 'Evolution Gaming', 'evolution-gaming', NULL, NULL, 'Live casino specialist', '2025-08-20T13:25:44.588Z', '2025-08-20T13:25:44.588Z');

-- Категории слотов
INSERT INTO slot_categories (id, name, slug, description, created_at, updated_at) VALUES ('bab06a7f-18ec-43cd-bfb4-7cd86e1d3109', 'Video Slots', 'video-slots', 'Modern video slot machines', '2025-08-20T13:25:44.588Z', '2025-08-20T13:53:54.139Z');
INSERT INTO slot_categories (id, name, slug, description, created_at, updated_at) VALUES ('2fb50c0c-7f29-41dc-8f27-01d64eb16511', 'Jackpot Slots', 'jackpot-slots', 'Progressive and fixed jackpot games', '2025-08-20T13:25:44.588Z', '2025-08-20T13:53:54.139Z');
INSERT INTO slot_categories (id, name, slug, description, created_at, updated_at) VALUES ('d8398457-91cc-40a5-8526-a6751c1abb53', 'Classic Slots', 'classic-slots', 'Traditional 3-reel slot machines', '2025-08-20T13:25:44.588Z', '2025-08-20T13:53:54.139Z');
INSERT INTO slot_categories (id, name, slug, description, created_at, updated_at) VALUES ('8dd4d01a-e4b2-4130-bc80-9a73a4a4f3e2', 'Megaways', 'megaways', 'Slots with Megaways mechanics', '2025-08-20T13:25:44.588Z', '2025-08-20T13:53:54.139Z');
INSERT INTO slot_categories (id, name, slug, description, created_at, updated_at) VALUES ('70129203-5953-4601-a722-4289ed51734e', 'Bonus Buy', 'bonus-buy', 'Slots with bonus buy feature', '2025-08-20T13:25:44.588Z', '2025-08-20T13:53:54.139Z');

-- Темы
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyncoa0000u5g01is12w90', 'Action', 'action', NULL, '2025-08-20T12:40:16.618Z', '2025-08-20T12:40:16.618Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejynctc0001u5g0rb8wnpp1', 'Adventure', 'adventure', NULL, '2025-08-20T12:40:16.801Z', '2025-08-20T12:40:16.801Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyncvy0002u5g0pv3tk3tn', 'Ancient', 'ancient', NULL, '2025-08-20T12:40:16.894Z', '2025-08-20T12:40:16.894Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyncyi0003u5g0nwaotta4', 'Animals', 'animals', NULL, '2025-08-20T12:40:16.987Z', '2025-08-20T12:40:16.987Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejynd110004u5g0j5yxess8', 'Anime', 'anime', NULL, '2025-08-20T12:40:17.078Z', '2025-08-20T12:40:17.078Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejynd3k0005u5g0op054n38', 'Apocalypse', 'apocalypse', NULL, '2025-08-20T12:40:17.169Z', '2025-08-20T12:40:17.169Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejynd680006u5g0szi9ce6i', 'Arabian', 'arabian', NULL, '2025-08-20T12:40:17.265Z', '2025-08-20T12:40:17.265Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejynd8r0007u5g0e14itmi1', 'Asian', 'asian', NULL, '2025-08-20T12:40:17.356Z', '2025-08-20T12:40:17.356Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyndbc0008u5g00a33fer7', 'Aztec', 'aztec', NULL, '2025-08-20T12:40:17.448Z', '2025-08-20T12:40:17.448Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyndlu0009u5g039amhfzc', 'Bars', 'bars', NULL, '2025-08-20T12:40:17.826Z', '2025-08-20T12:40:17.826Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyndoc000au5g05iez7ahz', 'Battle', 'battle', NULL, '2025-08-20T12:40:17.917Z', '2025-08-20T12:40:17.917Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyndqv000bu5g0yiwtdhxw', 'Beach', 'beach', NULL, '2025-08-20T12:40:18.007Z', '2025-08-20T12:40:18.007Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyndte000cu5g0tv45x9td', 'Bells', 'bells', NULL, '2025-08-20T12:40:18.098Z', '2025-08-20T12:40:18.098Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyndvw000du5g0ucl49b2d', 'Best American Style Slots', 'best-american-style-slots', NULL, '2025-08-20T12:40:18.189Z', '2025-08-20T12:40:18.189Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyndyf000eu5g0wk1sw34o', 'Bet Slip', 'bet-slip', NULL, '2025-08-20T12:40:18.280Z', '2025-08-20T12:40:18.280Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyne0z000fu5g0gbnsxgr7', 'Bombs', 'bombs', NULL, '2025-08-20T12:40:18.371Z', '2025-08-20T12:40:18.371Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyne3h000gu5g0tdaxijkj', 'Bonus Bet', 'bonus-bet', NULL, '2025-08-20T12:40:18.462Z', '2025-08-20T12:40:18.462Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyne60000hu5g00qoj9t3l', 'Bonus Buy', 'bonus-buy', NULL, '2025-08-20T12:40:18.553Z', '2025-08-20T12:40:18.553Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyne8j000iu5g0pqna9ixa', 'Bonus Multiplier', 'bonus-multiplier', NULL, '2025-08-20T12:40:18.643Z', '2025-08-20T12:40:18.643Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyneb4000ju5g0j5rc1hft', 'Bonus Wheel', 'bonus-wheel', NULL, '2025-08-20T12:40:18.736Z', '2025-08-20T12:40:18.736Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejynee4000ku5g07e4mnyb1', 'Books', 'books', NULL, '2025-08-20T12:40:18.844Z', '2025-08-20T12:40:18.844Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejynegl000lu5g0cq24t825', 'Branded', 'branded', NULL, '2025-08-20T12:40:18.933Z', '2025-08-20T12:40:18.933Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejynej4000mu5g01ghtqxgq', 'Buffalos', 'buffalos', NULL, '2025-08-20T12:40:19.024Z', '2025-08-20T12:40:19.024Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejynelm000nu5g0hijw996t', 'Candy', 'candy', NULL, '2025-08-20T12:40:19.114Z', '2025-08-20T12:40:19.114Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyneo4000ou5g0cee8f5le', 'Carnival', 'carnival', NULL, '2025-08-20T12:40:19.204Z', '2025-08-20T12:40:19.204Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyneqr000pu5g0mh8qykc8', 'Cars', 'cars', NULL, '2025-08-20T12:40:19.300Z', '2025-08-20T12:40:19.300Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejynet9000qu5g01wjcpvo2', 'Cascading Reels', 'cascading-reels', NULL, '2025-08-20T12:40:19.389Z', '2025-08-20T12:40:19.389Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejynevr000ru5g062t8ve6x', 'Cashpots', 'cashpots', NULL, '2025-08-20T12:40:19.479Z', '2025-08-20T12:40:19.479Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmejyneya000su5g0yh4xbk4t', 'Cats', 'cats', NULL, '2025-08-20T12:40:19.571Z', '2025-08-20T12:40:19.571Z');

-- Слоты
INSERT INTO slots (id, name, slug, provider_id, category_id, theme_id, description, image_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, release_date, is_active, is_featured, popularity_score, play_count, created_at, updated_at) VALUES ('cmek0c4dz0001u5cw0dacryjc', 'Starburst', 'starburst', 'ec3e683d-5402-40ca-b74b-b3ff77a65c51', 'bab06a7f-18ec-43cd-bfb4-7cd86e1d3109', NULL, 'Classic NetEnt slot with expanding wilds and re-spins', NULL, 96.09, 'low', 0.1, 100, 50000, 5, 3, '2012-01-01', true, undefined, undefined, 25000, '2025-08-20T13:27:31.893Z', '2025-08-20T13:27:31.893Z');
INSERT INTO slots (id, name, slug, provider_id, category_id, theme_id, description, image_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, release_date, is_active, is_featured, popularity_score, play_count, created_at, updated_at) VALUES ('cmek0c4j10003u5cwz5qqsmk1', 'Mega Moolah', 'mega-moolah', '2d581f0c-c7ff-4723-abf3-2f15b7a181bb', '2fb50c0c-7f29-41dc-8f27-01d64eb16511', NULL, 'Famous progressive jackpot slot with life-changing wins', NULL, 88.12, 'medium', 0.25, 6.25, 1000000, 5, 3, '2006-01-01', true, undefined, undefined, 32000, '2025-08-20T13:27:32.077Z', '2025-08-20T13:27:32.077Z');
INSERT INTO slots (id, name, slug, provider_id, category_id, theme_id, description, image_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, release_date, is_active, is_featured, popularity_score, play_count, created_at, updated_at) VALUES ('cmek0c4li0005u5cw4go0ff7q', 'Sweet Bonanza', 'sweet-bonanza', 'edc6b832-2b09-4134-a146-8d04cb0d4fe3', 'bab06a7f-18ec-43cd-bfb4-7cd86e1d3109', NULL, 'Candy-themed slot with tumble feature and multipliers', NULL, 96.51, 'high', 0.2, 125, 21100, 6, 5, '2019-01-01', true, undefined, undefined, 16800, '2025-08-20T13:27:32.167Z', '2025-08-20T13:27:32.167Z');
