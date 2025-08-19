-- Добавление начальных данных для таблицы themes
INSERT INTO themes (name, description, icon, color, is_active, is_popular, is_featured, created_at, updated_at) VALUES
('Древний Египет', 'Мистические пирамиды, фараоны и сокровища древнего Египта', '🏺', '#D4AF37', true, true, true, datetime('now'), datetime('now')),
('Пираты', 'Морские приключения, сокровища и пиратские корабли', '🏴‍☠️', '#8B4513', true, true, false, datetime('now'), datetime('now')),
('Фрукты', 'Классические фруктовые слоты с яркими символами', '🍒', '#FF6B6B', true, false, false, datetime('now'), datetime('now')),
('Космос', 'Галактические приключения и космические путешествия', '🚀', '#4A90E2', true, true, true, datetime('now'), datetime('now')),
('Мифология', 'Боги и герои древних мифов и легенд', '⚡', '#9B59B6', true, false, true, datetime('now'), datetime('now')),
('Дикий Запад', 'Ковбои, салуны и золотая лихорадка', '🤠', '#CD853F', true, false, false, datetime('now'), datetime('now')),
('Азия', 'Восточная культура, драконы и традиции', '🐉', '#E74C3C', true, true, false, datetime('now'), datetime('now')),
('Сказки', 'Волшебные истории и сказочные персонажи', '🧚‍♀️', '#FF69B4', true, false, false, datetime('now'), datetime('now')),
('Животные', 'Дикая природа и животный мир', '🦁', '#2ECC71', true, false, false, datetime('now'), datetime('now')),
('Драгоценности', 'Блестящие камни и роскошные украшения', '💎', '#3498DB', true, true, true, datetime('now'), datetime('now'));