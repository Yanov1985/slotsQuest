-- Проверка восстановленных данных
SELECT 'providers' as table_name, COUNT(*) as count FROM providers
UNION ALL
SELECT 'slot_categories' as table_name, COUNT(*) as count FROM slot_categories
UNION ALL
SELECT 'themes' as table_name, COUNT(*) as count FROM themes
UNION ALL
SELECT 'slots' as table_name, COUNT(*) as count FROM slots;