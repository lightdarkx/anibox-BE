-- DropIndex
DROP INDEX "show_lists_user_id_key";

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "dislikes" SET DEFAULT 0;
