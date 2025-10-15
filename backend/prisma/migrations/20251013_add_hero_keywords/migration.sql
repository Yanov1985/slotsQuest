-- Добавляем новые поля для hero keywords
ALTER TABLE slots
ADD COLUMN IF NOT EXISTS hero_keyword_2 VARCHAR(200),
ADD COLUMN IF NOT EXISTS hero_keyword_3 VARCHAR(200);



