-- Добавляем поле schema_keywords в таблицу slots
ALTER TABLE slots ADD COLUMN IF NOT EXISTS schema_keywords VARCHAR(500);