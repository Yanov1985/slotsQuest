-- Экспорт данных SlotQuest
-- Создано: 2025-08-20T15:34:11.740Z
-- Исправлено для текущей схемы

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

-- Категории слотов (убрано поле updated_at)
INSERT INTO slot_categories (id, name, slug, description, created_at) VALUES ('bab06a7f-18ec-43cd-bfb4-7cd86e1d3109', 'Video Slots', 'video-slots', 'Modern video slot machines', '2025-08-20T13:25:44.588Z');
INSERT INTO slot_categories (id, name, slug, description, created_at) VALUES ('2fb50c0c-7f29-41dc-8f27-01d64eb16511', 'Jackpot Slots', 'jackpot-slots', 'Progressive and fixed jackpot games', '2025-08-20T13:25:44.588Z');
INSERT INTO slot_categories (id, name, slug, description, created_at) VALUES ('d8398457-91cc-40a5-8526-a6751c1abb53', 'Classic Slots', 'classic-slots', 'Traditional 3-reel slot machines', '2025-08-20T13:25:44.588Z');
INSERT INTO slot_categories (id, name, slug, description, created_at) VALUES ('8dd4d01a-e4b2-4130-bc80-9a73a4a4f3e2', 'Megaways', 'megaways', 'Slots with Megaways mechanics', '2025-08-20T13:25:44.588Z');
INSERT INTO slot_categories (id, name, slug, description, created_at) VALUES ('70129203-5953-4601-a722-4289ed51734e', 'Bonus Buy', 'bonus-buy', 'Slots with bonus buy feature', '2025-08-20T13:25:44.588Z');

-- Темы
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo00000u5rceviwi27u', 'Action', 'action', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10001u5rc24pw4rgw', 'Adventure', 'adventure', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10002u5rcbxxyy9qn', 'Ancient', 'ancient', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10003u5rco2ctcepz', 'Animals', 'animals', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10004u5rc4putelas', 'Asia', 'asia', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10005u5rcnopaiolw', 'Autumn', 'autumn', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10006u5rc7vgmi28b', 'Aztec', 'aztec', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10007u5rc03uzcyi5', 'Baby', 'baby', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10008u5rc0j1vk70u', 'Beach', 'beach', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10009u5rciqs9s0xz', 'Bikes', 'bikes', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000au5rcv7pdg8sw', 'Birds', 'birds', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000bu5rc5dbs43qn', 'Bonus Game', 'bonus-game', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000cu5rcvwoaf1tr', 'Books', 'books', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000du5rc7w7nec8s', 'Boxing', 'boxing', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000eu5rc131rg2ob', 'Cars', 'cars', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000fu5rc44keirvp', 'Cartoon', 'cartoon', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000gu5rcooa9rei2', 'Casino', 'casino', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000hu5rcz6vrfbdp', 'Cats', 'cats', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000iu5rc1llwy3vd', 'Christmas', 'christmas', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000ju5rcejhlqyyc', 'Circus', 'circus', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000ku5rc93tesgex', 'City', 'city', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000lu5rcpx7wcpw7', 'Classic', 'classic', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000mu5rcxpwyfvl0', 'Cleopatra', 'cleopatra', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000nu5rcnzr2tl8l', 'Clowns', 'clowns', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000ou5rcj75z0ex2', 'Coffee', 'coffee', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000pu5rc2ejhjrvg', 'Coins', 'coins', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000qu5rcpnl3d65x', 'Comedy', 'comedy', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000ru5rch78pok7l', 'Cowboys', 'cowboys', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000su5rcolsfxaj1', 'Crime', 'crime', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000tu5rc2ju7p7qc', 'Crystal', 'crystal', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000uu5rc6vu56tld', 'Cute', 'cute', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000vu5rcfka5fijg', 'Dairy', 'dairy', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000wu5rci0yenokr', 'Dance', 'dance', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000xu5rcxlkjg6ya', 'Dazzling', 'dazzling', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000yu5rcmuqglv00', 'Desert', 'desert', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1000zu5rcidl4kx5k', 'Diamonds', 'diamonds', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10010u5rcoia351a7', 'Dice', 'dice', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10011u5rcoatg24qs', 'Dinosaurs', 'dinosaurs', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10012u5rcdtymgwet', 'Disco', 'disco', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10013u5rco0k2dnl7', 'Dogs', 'dogs', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10014u5rc2523i1vs', 'Dolphins', 'dolphins', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10015u5rcku5wpua9', 'Dragons', 'dragons', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10016u5rcgvt6nra9', 'Drinks', 'drinks', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10017u5rcxerjc33r', 'Egypt', 'egypt', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10018u5rc9n5zh8qb', 'Fairytale', 'fairytale', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10019u5rcp8dv0rnz', 'Fantasy', 'fantasy', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001au5rcc80ik4xo', 'Farm', 'farm', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001bu5rcu6kyvnc9', 'Fashion', 'fashion', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001cu5rclho3ebjn', 'Festivals', 'festivals', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001du5rciutvpeaj', 'Fighting', 'fighting', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001eu5rcc7vxa98u', 'Fishing', 'fishing', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001fu5rc3v305kju', 'Food', 'food', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001gu5rcp4sis9gq', 'Football', 'football', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001hu5rcx2wz43aj', 'Forest', 'forest', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001iu5rcha9btvpl', 'Fortune', 'fortune', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001ju5rc821sui0g', 'Fruits', 'fruits', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001ku5rczoas0nsf', 'Fun', 'fun', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001lu5rcl23alek4', 'Future', 'future', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001mu5rctgjxh70s', 'Galactic', 'galactic', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001nu5rcukv9qpm0', 'Game', 'game', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001ou5rcxohbet6d', 'Gangsters', 'gangsters', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001pu5rcm6oqqsw5', 'Garden', 'garden', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001qu5rc04y7xua1', 'Gems', 'gems', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001ru5rcikn480jl', 'Glittering', 'glittering', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001su5rcvy473dyk', 'Gold', 'gold', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001tu5rchab7pdmc', 'Gothic', 'gothic', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001uu5rch2pcvbg6', 'Halloween', 'halloween', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001vu5rcr6l0kr8t', 'Happy', 'happy', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001wu5rce1n4xse7', 'Hawaii', 'hawaii', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001xu5rcgtqff6u3', 'Holiday', 'holiday', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001yu5rcud0tryqh', 'Horror', 'horror', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1001zu5rcjnsxp537', 'Ice', 'ice', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10020u5rcx1ek39b3', 'India', 'india', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10021u5rcq94ehva0', 'Ireland', 'ireland', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10022u5rcvu45a9rr', 'Jungle', 'jungle', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10023u5rcidc90xfe', 'Kids', 'kids', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10024u5rcautdi246', 'Lake', 'lake', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10025u5rcbkyxt6h3', 'Las Vegas', 'las-vegas', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10026u5rcm1f9y8rn', 'Magic', 'magic', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10027u5rc2393ob79', 'Martial Arts', 'martial-arts', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10028u5rcv9ruyxzm', 'Mayan', 'mayan', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo10029u5rcv262ozkt', 'Medieval', 'medieval', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1002au5rcrxji06jl', 'Mexico', 'mexico', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1002bu5rchqu43fy6', 'Military', 'military', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1002cu5rcqpj65err', 'Mining', 'mining', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1002du5rc7l8vlm95', 'Money', 'money', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1002eu5rci8dbnm0m', 'Monsters', 'monsters', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');
INSERT INTO themes (id, name, slug, description, created_at, updated_at) VALUES ('cmek1xjo1002fu5rcm40vzlho', 'Motorbikes', 'motorbikes', NULL, '2025-08-20T14:12:11.088Z', '2025-08-20T14:12:11.088Z');