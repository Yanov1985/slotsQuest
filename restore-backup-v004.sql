-- Восстановление backup версии 004 в Supabase PostgreSQL
-- Выполните этот скрипт в SQL Editor в Supabase Dashboard

-- Очистка существующих данных (в правильном порядке)
DELETE FROM slot_mechanics;
DELETE FROM slots;
DELETE FROM slot_categories;
DELETE FROM themes;
DELETE FROM mechanics;
DELETE FROM providers;

-- Восстановление данных mechanics
INSERT INTO mechanics (name, slug, description) VALUES
('Wild Symbols', 'wild-symbols', 'Символы, которые заменяют другие символы для создания выигрышных комбинаций'),
('Free Spins', 'free-spins', 'Бесплатные вращения, активируемые специальными символами'),
('Bonus Rounds', 'bonus-rounds', 'Дополнительные игровые раунды с особыми правилами'),
('Multipliers', 'multipliers', 'Множители, увеличивающие размер выигрыша'),
('Scatter Symbols', 'scatter-symbols', 'Символы, которые активируют бонусные функции независимо от линий выплат');

-- Восстановление данных providers
INSERT INTO providers (name, slug, website, description) VALUES
('NetEnt', 'netent', 'https://www.netent.com', 'Ведущий разработчик игр для онлайн-казино'),
('Microgaming', 'microgaming', 'https://www.microgaming.co.uk', 'Пионер в области разработки игрового программного обеспечения'),
('Play''n GO', 'playn-go', 'https://www.playngo.com', 'Инновационный разработчик мобильных казино игр'),
('Pragmatic Play', 'pragmatic-play', 'https://www.pragmaticplay.com', 'Многопрофильный поставщик игр для iGaming индустрии'),
('Yggdrasil', 'yggdrasil', 'https://yggdrasilgaming.com', 'Инновационный разработчик премиальных игровых решений');

-- Восстановление данных themes
INSERT INTO themes (name, slug, description) VALUES
('Древний Египет', 'ancient-egypt', 'Игры с тематикой древнего Египта, фараонов и пирамид'),
('Фэнтези', 'fantasy', 'Магические миры с драконами, волшебниками и мифическими существами'),
('Приключения', 'adventure', 'Захватывающие приключенческие сюжеты и исследования'),
('Фрукты', 'fruits', 'Классические фруктовые слоты в ретро стиле'),
('Животные', 'animals', 'Игры с различными животными и природной тематикой');

-- Восстановление данных slot_categories
INSERT INTO slot_categories (name, slug, description) VALUES
('Классические слоты', 'classic-slots', 'Традиционные слоты с простой механикой'),
('Видео слоты', 'video-slots', 'Современные слоты с продвинутой графикой и анимацией'),
('Прогрессивные джекпоты', 'progressive-jackpots', 'Слоты с накопительными джекпотами'),
('Мегавейс', 'megaways', 'Слоты с динамическим количеством способов выиграть'),
('3D слоты', '3d-slots', 'Слоты с трёхмерной графикой и эффектами');

-- Проверка восстановленных данных
SELECT 'mechanics' as table_name, COUNT(*) as count FROM mechanics
UNION ALL
SELECT 'providers' as table_name, COUNT(*) as count FROM providers
UNION ALL
SELECT 'themes' as table_name, COUNT(*) as count FROM themes
UNION ALL
SELECT 'slot_categories' as table_name, COUNT(*) as count FROM slot_categories;