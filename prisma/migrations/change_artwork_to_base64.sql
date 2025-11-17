-- Migration: Change Artwork table to store base64 images
-- Date: 2025-11-17

-- Add new columns for base64 storage
ALTER TABLE "Artwork" 
ADD COLUMN IF NOT EXISTS "imageData" TEXT,
ADD COLUMN IF NOT EXISTS "mimeType" VARCHAR(100),
ADD COLUMN IF NOT EXISTS "fileSize" INTEGER;

-- Make old columns nullable temporarily (for data migration)
ALTER TABLE "Artwork" ALTER COLUMN "imageUrl" DROP NOT NULL;
ALTER TABLE "Artwork" ALTER COLUMN "imagePublicId" DROP NOT NULL;

-- After this migration, you need to:
-- 1. Migrate existing images from Cloudinary to base64 (if needed)
-- 2. Drop old columns after confirming data migration:
--    ALTER TABLE "Artwork" DROP COLUMN "imageUrl";
--    ALTER TABLE "Artwork" DROP COLUMN "imagePublicId";
-- 3. Make new columns NOT NULL:
--    ALTER TABLE "Artwork" ALTER COLUMN "imageData" SET NOT NULL;
--    ALTER TABLE "Artwork" ALTER COLUMN "mimeType" SET NOT NULL;
--    ALTER TABLE "Artwork" ALTER COLUMN "fileSize" SET NOT NULL;
