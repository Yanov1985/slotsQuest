-- Добавление колонки is_recommended в таблицу providers
ALTER TABLE providers ADD COLUMN IF NOT EXISTS is_recommended BOOLEAN DEFAULT false;