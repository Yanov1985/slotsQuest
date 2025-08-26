-- Add popularity fields to slots table if they don't exist
ALTER TABLE slots 
ADD COLUMN IF NOT EXISTS popularity_rank INTEGER,
ADD COLUMN IF NOT EXISTS popularity_percentage INTEGER;

-- Update existing slots with sample popularity data
UPDATE slots 
SET 
  popularity_rank = CASE 
    WHEN rating >= 4.5 THEN FLOOR(RANDOM() * 10) + 1
    WHEN rating >= 4.0 THEN FLOOR(RANDOM() * 20) + 11
    WHEN rating >= 3.5 THEN FLOOR(RANDOM() * 30) + 31
    ELSE FLOOR(RANDOM() * 40) + 61
  END,
  popularity_percentage = CASE 
    WHEN rating >= 4.5 THEN FLOOR(RANDOM() * 20) + 80
    WHEN rating >= 4.0 THEN FLOOR(RANDOM() * 20) + 60
    WHEN rating >= 3.5 THEN FLOOR(RANDOM() * 20) + 40
    ELSE FLOOR(RANDOM() * 30) + 10
  END
WHERE popularity_rank IS NULL OR popularity_percentage IS NULL;