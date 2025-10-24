-- Добавляем поля для редактируемых заголовков статистических блоков популярности
-- "Глобальный рейтинг", "Активные игроки", "RTP + Волатильность"
ALTER TABLE slots
ADD COLUMN IF NOT EXISTS popularity_global_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS popularity_players_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS popularity_rtp_title VARCHAR(255);

-- Комментарии для понимания
COMMENT ON COLUMN slots.popularity_global_title IS 'Заголовок блока "Глобальный рейтинг"';

COMMENT ON COLUMN slots.popularity_players_title IS 'Заголовок блока "Активные игроки"';

COMMENT ON COLUMN slots.popularity_rtp_title IS 'Заголовок блока "RTP + Волатильность"';
