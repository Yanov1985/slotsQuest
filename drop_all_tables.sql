-- SQL скрипт для полного удаления всех таблиц базы данных
-- ВНИМАНИЕ: Этот скрипт полностью удалит все таблицы и данные!
-- Используйте этот скрипт в Supabase Dashboard -> SQL Editor

-- ========================================
-- УДАЛЕНИЕ ВСЕХ ТАБЛИЦ
-- ========================================

-- Отключаем проверки внешних ключей для безопасного удаления
SET session_replication_role = replica;

-- Удаляем все таблицы в правильном порядке (учитывая зависимости)
-- Сначала удаляем таблицы связей и зависимые таблицы
DROP TABLE IF EXISTS review_votes CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS page_views CASCADE;
DROP TABLE IF EXISTS user_activity_logs CASCADE;
DROP TABLE IF EXISTS user_role_assignments CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS seo_pages CASCADE;
DROP TABLE IF EXISTS slot_feature_relations CASCADE;
DROP TABLE IF EXISTS slot_theme_relations CASCADE;
DROP TABLE IF EXISTS user_favorites CASCADE;
DROP TABLE IF EXISTS news_ratings CASCADE;
DROP TABLE IF EXISTS bonus_ratings CASCADE;
DROP TABLE IF EXISTS casino_ratings CASCADE;
DROP TABLE IF EXISTS slot_ratings CASCADE;
DROP TABLE IF EXISTS casino_payment_methods CASCADE;
DROP TABLE IF EXISTS casino_slots CASCADE;

-- Затем удаляем основные таблицы
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS payment_methods CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS bonuses CASCADE;
DROP TABLE IF EXISTS casinos CASCADE;
DROP TABLE IF EXISTS slots CASCADE;
DROP TABLE IF EXISTS slot_categories CASCADE;
DROP TABLE IF EXISTS slot_themes CASCADE;
DROP TABLE IF EXISTS slot_features CASCADE;
DROP TABLE IF EXISTS providers CASCADE;

-- Включаем обратно проверки внешних ключей
SET session_replication_role = DEFAULT;

-- Удаляем все последовательности (sequences) если они существуют
DROP SEQUENCE IF EXISTS providers_id_seq CASCADE;
DROP SEQUENCE IF EXISTS slot_categories_id_seq CASCADE;
DROP SEQUENCE IF EXISTS slots_id_seq CASCADE;
DROP SEQUENCE IF EXISTS slot_themes_id_seq CASCADE;
DROP SEQUENCE IF EXISTS slot_features_id_seq CASCADE;
DROP SEQUENCE IF EXISTS casinos_id_seq CASCADE;
DROP SEQUENCE IF EXISTS bonuses_id_seq CASCADE;
DROP SEQUENCE IF EXISTS news_id_seq CASCADE;
DROP SEQUENCE IF EXISTS payment_methods_id_seq CASCADE;
DROP SEQUENCE IF EXISTS users_id_seq CASCADE;
DROP SEQUENCE IF EXISTS user_roles_id_seq CASCADE;
DROP SEQUENCE IF EXISTS site_settings_id_seq CASCADE;
DROP SEQUENCE IF EXISTS seo_pages_id_seq CASCADE;
DROP SEQUENCE IF EXISTS reviews_id_seq CASCADE;
DROP SEQUENCE IF EXISTS page_views_id_seq CASCADE;
DROP SEQUENCE IF EXISTS user_activity_logs_id_seq CASCADE;

-- Удаляем все индексы если они существуют
DROP INDEX IF EXISTS idx_slots_provider_id CASCADE;
DROP INDEX IF EXISTS idx_slots_category_id CASCADE;
DROP INDEX IF EXISTS idx_slots_slug CASCADE;
DROP INDEX IF EXISTS idx_providers_slug CASCADE;
DROP INDEX IF EXISTS idx_slot_categories_slug CASCADE;
DROP INDEX IF EXISTS idx_slot_themes_slug CASCADE;
DROP INDEX IF EXISTS idx_slot_features_slug CASCADE;
DROP INDEX IF EXISTS idx_casinos_slug CASCADE;
DROP INDEX IF EXISTS idx_bonuses_casino_id CASCADE;
DROP INDEX IF EXISTS idx_news_slug CASCADE;
DROP INDEX IF EXISTS idx_users_email CASCADE;
DROP INDEX IF EXISTS idx_slot_ratings_slot_id CASCADE;
DROP INDEX IF EXISTS idx_casino_ratings_casino_id CASCADE;
DROP INDEX IF EXISTS idx_bonus_ratings_bonus_id CASCADE;
DROP INDEX IF EXISTS idx_news_ratings_news_id CASCADE;
DROP INDEX IF EXISTS idx_user_favorites_user_id CASCADE;
DROP INDEX IF EXISTS idx_slot_theme_relations_slot_id CASCADE;
DROP INDEX IF EXISTS idx_slot_theme_relations_theme_id CASCADE;
DROP INDEX IF EXISTS idx_slot_feature_relations_slot_id CASCADE;
DROP INDEX IF EXISTS idx_slot_feature_relations_feature_id CASCADE;
DROP INDEX IF EXISTS idx_casino_slots_casino_id CASCADE;
DROP INDEX IF EXISTS idx_casino_slots_slot_id CASCADE;
DROP INDEX IF EXISTS idx_casino_payment_methods_casino_id CASCADE;
DROP INDEX IF EXISTS idx_casino_payment_methods_payment_method_id CASCADE;
DROP INDEX IF EXISTS idx_user_role_assignments_user_id CASCADE;
DROP INDEX IF EXISTS idx_user_role_assignments_role_id CASCADE;
DROP INDEX IF EXISTS idx_reviews_slot_id CASCADE;
DROP INDEX IF EXISTS idx_reviews_casino_id CASCADE;
DROP INDEX IF EXISTS idx_reviews_bonus_id CASCADE;
DROP INDEX IF EXISTS idx_reviews_news_id CASCADE;
DROP INDEX IF EXISTS idx_reviews_user_id CASCADE;
DROP INDEX IF EXISTS idx_review_votes_review_id CASCADE;
DROP INDEX IF EXISTS idx_review_votes_user_id CASCADE;
DROP INDEX IF EXISTS idx_page_views_page_type CASCADE;
DROP INDEX IF EXISTS idx_page_views_page_id CASCADE;
DROP INDEX IF EXISTS idx_user_activity_logs_user_id CASCADE;

-- Сообщение об успешном завершении
SELECT 'Все таблицы, последовательности и индексы успешно удалены!' as status;
SELECT 'База данных полностью очищена и готова для создания новой схемы.' as message;