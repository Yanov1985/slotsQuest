-- Migrate themes data to features table
INSERT INTO features (name, slug, description, type, icon, color, is_active, is_featured, sort_order, created_at, updated_at)
SELECT 
    name,
    slug,
    description,
    'theme' as type,
    icon,
    color,
    is_active,
    is_featured,
    0 as sort_order,
    created_at,
    updated_at
FROM themes
WHERE NOT EXISTS (
    SELECT 1 FROM features f WHERE f.slug = themes.slug
);

-- Update slot_features table with theme relationships
INSERT INTO slot_features (slot_id, feature_id, created_at)
SELECT 
    s.id as slot_id,
    f.id as feature_id,
    NOW() as created_at
FROM slots s
JOIN themes t ON s.theme_id = t.id
JOIN features f ON f.slug = t.slug AND f.type = 'theme'
WHERE s.theme_id IS NOT NULL
AND NOT EXISTS (
    SELECT 1 FROM slot_features sf 
    WHERE sf.slot_id = s.id AND sf.feature_id = f.id
);

-- Remove theme_id column from slots table
ALTER TABLE slots DROP COLUMN IF EXISTS theme_id;

-- Drop themes table
DROP TABLE IF EXISTS themes;