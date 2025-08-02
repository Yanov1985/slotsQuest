-- Insert test data for themes
INSERT INTO "themes" ("id", "name", "slug", "description", "color", "icon", "is_featured", "is_active", "created_at", "updated_at") VALUES
('theme_1', 'Древний Египет', 'ancient-egypt', 'Слоты с тематикой Древнего Египта, фараонов и пирамид', '#FFD700', '🏺', true, true, NOW(), NOW()),
('theme_2', 'Фрукты', 'fruits', 'Классические фруктовые слоты', '#FF6B6B', '🍎', true, true, NOW(), NOW()),
('theme_3', 'Приключения', 'adventure', 'Приключенческие слоты с захватывающими сюжетами', '#4ECDC4', '🗺️', true, true, NOW(), NOW()),
('theme_4', 'Мифология', 'mythology', 'Слоты на тему древних мифов и легенд', '#45B7D1', '⚡', true, true, NOW(), NOW()),
('theme_5', 'Животные', 'animals', 'Слоты с животными и природой', '#96CEB4', '🦁', false, true, NOW(), NOW()),
('theme_6', 'Космос', 'space', 'Космические приключения и научная фантастика', '#6C5CE7', '🚀', false, true, NOW(), NOW()),
('theme_7', 'Пираты', 'pirates', 'Пиратские приключения и поиски сокровищ', '#A0522D', '🏴‍☠️', false, true, NOW(), NOW()),
('theme_8', 'Сказки', 'fairy-tales', 'Волшебные сказки и фэнтези', '#FF69B4', '🧚‍♀️', false, true, NOW(), NOW()),
('theme_9', 'Спорт', 'sports', 'Спортивная тематика', '#32CD32', '⚽', false, true, NOW(), NOW()),
('theme_10', 'Музыка', 'music', 'Музыкальные слоты', '#9370DB', '🎵', false, true, NOW(), NOW()),
('theme_11', 'Ретро', 'retro', 'Винтажные и ретро слоты', '#CD853F', '📻', false, true, NOW(), NOW()),
('theme_12', 'Азия', 'asia', 'Азиатская культура и традиции', '#DC143C', '🏮', false, true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;