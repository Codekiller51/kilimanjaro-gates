/*
  # Add slug support to tour packages

  1. Schema Changes
    - Add `slug` column to `tour_packages` table
    - Make slug unique and indexed for performance
    - Populate existing tours with sample slugs

  2. Security
    - Update RLS policies to work with slug queries
    - Maintain existing security model

  3. Data Migration
    - Add sample slugs for common Kilimanjaro routes
    - Ensure all existing tours have valid slugs
*/

-- Add slug column to tour_packages
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tour_packages' AND column_name = 'slug'
  ) THEN
    ALTER TABLE tour_packages ADD COLUMN slug text;
  END IF;
END $$;

-- Create unique index on slug
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'tour_packages' AND indexname = 'tour_packages_slug_key'
  ) THEN
    CREATE UNIQUE INDEX tour_packages_slug_key ON tour_packages (slug);
  END IF;
END $$;

-- Add constraint to make slug unique
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'tour_packages' AND constraint_name = 'tour_packages_slug_key'
  ) THEN
    ALTER TABLE tour_packages ADD CONSTRAINT tour_packages_slug_key UNIQUE (slug);
  END IF;
END $$;

-- Update existing tours with sample slugs (if any exist)
-- This is safe to run multiple times
UPDATE tour_packages 
SET slug = CASE 
  WHEN title ILIKE '%marangu%' THEN 'marangu'
  WHEN title ILIKE '%machame%' THEN 'machame'
  WHEN title ILIKE '%lemosho%' THEN 'lemosho'
  WHEN title ILIKE '%rongai%' THEN 'rongai'
  WHEN title ILIKE '%umbwe%' THEN 'umbwe'
  WHEN title ILIKE '%northern circuit%' THEN 'northern-circuit'
  WHEN title ILIKE '%serengeti%' THEN 'serengeti-safari'
  WHEN title ILIKE '%ngorongoro%' THEN 'ngorongoro-safari'
  WHEN title ILIKE '%tarangire%' THEN 'tarangire-safari'
  WHEN title ILIKE '%manyara%' THEN 'manyara-safari'
  WHEN title ILIKE '%zanzibar%' THEN 'zanzibar-day-trip'
  WHEN title ILIKE '%arusha%' THEN 'arusha-day-trip'
  ELSE LOWER(REGEXP_REPLACE(REGEXP_REPLACE(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
END
WHERE slug IS NULL;

-- Make slug NOT NULL after populating existing data
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tour_packages' AND column_name = 'slug' AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE tour_packages ALTER COLUMN slug SET NOT NULL;
  END IF;
END $$;

-- Add RLS policy for slug-based queries
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'tour_packages' AND policyname = 'Public can read active tours by slug'
  ) THEN
    CREATE POLICY "Public can read active tours by slug"
      ON tour_packages
      FOR SELECT
      TO anon, authenticated
      USING (active = true);
  END IF;
END $$;