-- PostgreSQL Database Backup v005
-- Generated from v004 backup on 2025-11-03T17:18:15.527Z
-- Compatible with Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Disable foreign key checks
SET session_replication_role = replica;

-- Clear existing data
TRUNCATE TABLE slots CASCADE;
TRUNCATE TABLE slot_mechanics CASCADE;
TRUNCATE TABLE slot_categories CASCADE;
TRUNCATE TABLE themes CASCADE;
TRUNCATE TABLE mechanics CASCADE;
TRUNCATE TABLE providers CASCADE;


-- Enable foreign key checks
SET session_replication_role = DEFAULT;

-- Update sequences
SELECT setval(pg_get_serial_sequence('providers', 'id'), COALESCE(MAX(id::integer), 1), false) FROM providers WHERE id ~ '^[0-9]+$';
SELECT setval(pg_get_serial_sequence('mechanics', 'id'), COALESCE(MAX(id::integer), 1), false) FROM mechanics WHERE id ~ '^[0-9]+$';
SELECT setval(pg_get_serial_sequence('themes', 'id'), COALESCE(MAX(id::integer), 1), false) FROM themes WHERE id ~ '^[0-9]+$';
SELECT setval(pg_get_serial_sequence('slot_categories', 'id'), COALESCE(MAX(id::integer), 1), false) FROM slot_categories WHERE id ~ '^[0-9]+$';
SELECT setval(pg_get_serial_sequence('slots', 'id'), COALESCE(MAX(id::integer), 1), false) FROM slots WHERE id ~ '^[0-9]+$';

-- Backup completed successfully
-- Total INSERT statements: 0
